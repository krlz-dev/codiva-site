from __future__ import annotations

import asyncio
import io
import json
import os
import re
import time
import urllib.parse
import urllib.request
from collections import defaultdict, deque
from datetime import UTC, datetime
from pathlib import Path
from typing import Annotated

from fastapi import FastAPI, File, Form, Header, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from google.auth.transport.requests import Request as GoogleAuthRequest
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from pydantic import BaseModel, ConfigDict, Field, field_validator

MAX_JSON_BYTES = 16_384
MAX_FILE_BYTES = 5 * 1024 * 1024
PDF_MAGIC = b"%PDF"
RATE_LIMIT_COUNT = 10
RATE_LIMIT_WINDOW_SECONDS = 600
PHONE_RE = re.compile(r"^[+0-9 ()-]{7,32}$")
ATTACHMENTS_FOLDER = "Codiva Intake Attachments"
TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


def env(name: str, default: str | None = None) -> str | None:
    value = os.getenv(name, default)
    return value.strip() if value else value


class IntakePayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    submission_id: Annotated[str, Field(min_length=16, max_length=96, pattern=r"^[A-Za-z0-9_-]+$")]
    client_name: Annotated[str, Field(min_length=2, max_length=120)]
    phone: Annotated[str, Field(min_length=7, max_length=32)]
    email: Annotated[str | None, Field(default=None, max_length=254)]
    company: Annotated[str | None, Field(default=None, max_length=160)]
    request_type: Annotated[str, Field(min_length=2, max_length=40)]
    service_area: Annotated[str, Field(min_length=2, max_length=100)]
    problem_goal: Annotated[str, Field(min_length=10, max_length=2_000)]
    scope: Annotated[str | None, Field(default=None, max_length=1_000)]
    timeline: Annotated[str | None, Field(default=None, max_length=300)]
    budget: Annotated[str | None, Field(default=None, max_length=200)]
    preferred_next_step: Annotated[str, Field(min_length=2, max_length=120)]
    conversation_summary: Annotated[str, Field(min_length=10, max_length=3_000)]
    client_confirmed: bool
    locale: Annotated[str, Field(default="en", pattern=r"^(en|es)$")]

    @field_validator("phone")
    @classmethod
    def valid_phone(cls, value: str) -> str:
        if not PHONE_RE.fullmatch(value):
            raise ValueError("phone contains unsupported characters")
        return value

    @field_validator("client_confirmed")
    @classmethod
    def must_be_confirmed(cls, value: bool) -> bool:
        if not value:
            raise ValueError("client confirmation is required")
        return value


class GoogleServices:
    """Lazily built Google API clients shared across sheets + drive."""

    def __init__(self, token_file: Path) -> None:
        self.token_file = token_file
        self._lock = asyncio.Lock()

    def _credentials(self) -> Credentials:
        if not self.token_file.is_file():
            raise RuntimeError("Google token file is not configured")
        credentials = Credentials.from_authorized_user_info(json.loads(self.token_file.read_text(encoding="utf-8")))
        if credentials.expired and credentials.refresh_token:
            credentials.refresh(GoogleAuthRequest())
            self.token_file.write_text(credentials.to_json(), encoding="utf-8")
            self.token_file.chmod(0o600)
        if not credentials.valid:
            raise RuntimeError("Google credentials are invalid")
        return credentials

    async def sheets(self):
        return await asyncio.to_thread(
            lambda: build("sheets", "v4", credentials=self._credentials(), cache_discovery=False)
        )

    async def drive(self):
        return await asyncio.to_thread(
            lambda: build("drive", "v3", credentials=self._credentials(), cache_discovery=False)
        )


class SheetsWriter:
    def __init__(self, services: GoogleServices, spreadsheet_id: str, append_range: str) -> None:
        self.services = services
        self.spreadsheet_id = spreadsheet_id
        self.append_range = append_range
        self._lock = asyncio.Lock()

    def _values(self, item: IntakePayload, attachment: str | None) -> list[str]:
        return [
            datetime.now(UTC).isoformat(),
            "New",
            item.client_name,
            item.phone,
            item.email or "",
            item.company or "",
            item.request_type,
            item.service_area,
            item.problem_goal,
            item.scope or "",
            item.timeline or "",
            item.budget or "",
            item.preferred_next_step,
            item.conversation_summary,
            "Yes",
            "",
            item.submission_id,
            attachment or "",
        ]

    async def append(self, item: IntakePayload, attachment: str | None) -> dict[str, object]:
        async with self._lock:
            service = await self.services.sheets()
            existing = await asyncio.to_thread(
                lambda: service.spreadsheets().values().get(
                    spreadsheetId=self.spreadsheet_id,
                    range="Sheet1!Q:Q",
                ).execute()
            )
            rows = existing.get("values", [])
            if any(row and row[0] == item.submission_id for row in rows):
                return {"duplicate": True, "submission_id": item.submission_id}

            result = await asyncio.to_thread(
                lambda: service.spreadsheets().values().append(
                    spreadsheetId=self.spreadsheet_id,
                    range=self.append_range,
                    valueInputOption="RAW",
                    insertDataOption="INSERT_ROWS",
                    body={"values": [self._values(item, attachment)]},
                ).execute()
            )
            return {
                "duplicate": False,
                "submission_id": item.submission_id,
                "updated_range": result.get("updates", {}).get("updatedRange"),
            }


class DriveUploader:
    def __init__(self, services: GoogleServices) -> None:
        self.services = services
        self._lock = asyncio.Lock()

    def _sanitize_name(self, submission_id: str, original: str | None) -> str:
        base = re.sub(r"[^A-Za-z0-9._-]+", "_", original or "attachment.pdf").strip("._-")
        base = (base or "attachment.pdf")[:80]
        if not base.lower().endswith(".pdf"):
            base += ".pdf"
        return f"{submission_id}_{base}"

    async def _folder_id(self, service) -> str:
        result = await asyncio.to_thread(
            lambda: service.files().list(
                q=f"name = '{ATTACHMENTS_FOLDER}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
                spaces="drive",
                fields="files(id)",
                pageSize=1,
            ).execute()
        )
        files = result.get("files", [])
        if files:
            return files[0]["id"]
        created = await asyncio.to_thread(
            lambda: service.files().create(
                body={"name": ATTACHMENTS_FOLDER, "mimeType": "application/vnd.google-apps.folder"},
                fields="id",
            ).execute()
        )
        return created["id"]

    async def upload(self, content: bytes, submission_id: str, original_name: str | None) -> str:
        async with self._lock:
            service = await self.services.drive()
            folder_id = await self._folder_id(service)
            name = self._sanitize_name(submission_id, original_name)
            media = MediaIoBaseUpload(io.BytesIO(content), mimetype="application/pdf", resumable=False)
            uploaded = await asyncio.to_thread(
                lambda: service.files().create(
                    body={"name": name, "parents": [folder_id], "mimeType": "application/pdf"},
                    media_body=media,
                    fields="id, webViewLink",
                ).execute()
            )
            return f"{name} — {uploaded.get('webViewLink', uploaded.get('id', ''))}"


class RateLimiter:
    def __init__(self) -> None:
        self._events: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        events = self._events[key]
        while events and now - events[0] > RATE_LIMIT_WINDOW_SECONDS:
            events.popleft()
        if len(events) >= RATE_LIMIT_COUNT:
            return False
        events.append(now)
        return True


def verify_turnstile_sync(secret: str, token: str, remote_ip: str) -> bool:
    data = urllib.parse.urlencode({"secret": secret, "response": token, "remoteip": remote_ip}).encode()
    request = urllib.request.Request(TURNSTILE_VERIFY_URL, data=data, method="POST")
    with urllib.request.urlopen(request, timeout=10) as response:
        result = json.loads(response.read().decode("utf-8"))
    return bool(result.get("success"))


app = FastAPI(title="Codiva Lena Intake API", version="0.2.0", docs_url=None, redoc_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://codiva.cl", "https://www.codiva.cl"],
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["content-type", "x-intake-token"],
)

limiter = RateLimiter()
_services: GoogleServices | None = None
_writer: SheetsWriter | None = None
_uploader: DriveUploader | None = None


def get_services() -> GoogleServices:
    global _services
    if _services is None:
        _services = GoogleServices(Path(env("GOOGLE_TOKEN_FILE") or "/run/secrets/google_token.json"))
    return _services


def get_writer() -> SheetsWriter:
    global _writer
    if _writer is None:
        spreadsheet_id = env("GOOGLE_SHEET_ID")
        if not spreadsheet_id:
            raise RuntimeError("GOOGLE_SHEET_ID is not configured")
        _writer = SheetsWriter(get_services(), spreadsheet_id, env("GOOGLE_APPEND_RANGE") or "Sheet1!A:R")
    return _writer


def get_uploader() -> DriveUploader:
    global _uploader
    if _uploader is None:
        _uploader = DriveUploader(get_services())
    return _uploader


def telegram_notify(bot_token: str, chat_id: str, text: str) -> None:
    """Send a Telegram message. Blocking; best-effort; never raises."""
    try:
        body = urllib.parse.urlencode(
            {"chat_id": chat_id, "text": text, "disable_web_page_preview": True}
        ).encode()
        req = urllib.request.Request(
            f"https://api.telegram.org/bot{bot_token}/sendMessage", data=body, method="POST"
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
    except Exception:
        # Notifications must never affect the intake response.
        pass


def build_notification_text(item: IntakePayload, attachment: str | None) -> str:
    lines = ["🔔 Nueva consulta — codiva.cl", ""]
    if item.client_name:
        lines.append(f"👤 {item.client_name}")
    if item.company:
        lines.append(f"🏢 {item.company}")
    if item.request_type:
        lines.append(f"📋 {item.request_type}")
    if item.service_area:
        lines.append(f"🔧 {item.service_area}")
    if item.problem_goal:
        problem = item.problem_goal.strip()
        lines.append("")
        lines.append(problem[:300] + ("…" if len(problem) > 300 else ""))
    contact = " · ".join(x for x in [item.email, item.phone] if x)
    if contact:
        lines.append("")
        lines.append(f"📞 {contact}")
    if attachment:
        lines.append(f"📎 {attachment}")
    if item.preferred_next_step:
        lines.append("")
        lines.append(f"➡️ {item.preferred_next_step}")
    return "\n".join(lines)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "codiva-lena-intake"}


@app.post("/v1/intake")
async def create_intake(
    request: Request,
    payload: Annotated[str, Form()],
    file: Annotated[UploadFile | None, File()] = None,
    turnstile_token: Annotated[str | None, Form()] = None,
    website: Annotated[str | None, Form()] = None,
    x_intake_token: Annotated[str | None, Header()] = None,
) -> dict[str, object]:
    client_ip = request.client.host if request.client else "unknown"

    # Honeypot: humans never see or fill this field; bots do. Discard silently.
    if website and website.strip():
        return {"status": "accepted", "duplicate": False}

    if len(payload.encode("utf-8")) > MAX_JSON_BYTES:
        raise HTTPException(status_code=413, detail="request too large")

    try:
        data = IntakePayload.model_validate_json(payload)
    except Exception as exc:
        raise HTTPException(status_code=422, detail="invalid intake payload") from exc

    # Auth precedence: write token (trusted clients) → Turnstile (website).
    expected_token = env("INTAKE_WRITE_TOKEN")
    turnstile_secret = env("TURNSTILE_SECRET_KEY")
    if expected_token and x_intake_token == expected_token:
        pass
    elif turnstile_secret:
        if not turnstile_token:
            raise HTTPException(status_code=401, detail="turnstile token required")
        try:
            ok = await asyncio.to_thread(verify_turnstile_sync, turnstile_secret, turnstile_token, client_ip)
        except Exception:
            ok = False
        if not ok:
            raise HTTPException(status_code=401, detail="turnstile verification failed")
    elif expected_token:
        raise HTTPException(status_code=401, detail="invalid intake token")

    if not limiter.allow(client_ip):
        raise HTTPException(status_code=429, detail="too many requests")

    attachment: str | None = None
    if file is not None and file.filename:
        content = await file.read()
        if len(content) > MAX_FILE_BYTES:
            raise HTTPException(status_code=413, detail="file too large")
        if not content.startswith(PDF_MAGIC):
            raise HTTPException(status_code=422, detail="only PDF files are accepted")
        try:
            attachment = await get_uploader().upload(content, data.submission_id, file.filename)
        except Exception:
            raise HTTPException(status_code=503, detail="attachment storage is temporarily unavailable")

    try:
        result = await get_writer().append(data, attachment)
    except Exception:
        raise HTTPException(status_code=503, detail="intake storage is temporarily unavailable")

    # Best-effort Telegram notification to the owner, never blocking the response.
    bot_token = env("TELEGRAM_BOT_TOKEN")
    chat_id = env("TELEGRAM_CHAT_ID")
    if bot_token and chat_id:
        asyncio.create_task(
            asyncio.to_thread(telegram_notify, bot_token, chat_id, build_notification_text(data, attachment))
        )

    return {"status": "accepted", "booking_url": env("CAL_BOOKING_URL") or "", **result}
