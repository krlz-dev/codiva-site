from __future__ import annotations

import asyncio
import os
import re
import time
from collections import defaultdict, deque
from datetime import UTC, datetime
from pathlib import Path
from typing import Annotated

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from google.auth.transport.requests import Request as GoogleAuthRequest
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from pydantic import BaseModel, ConfigDict, Field, field_validator

MAX_BODY_BYTES = 16_384
RATE_LIMIT_COUNT = 10
RATE_LIMIT_WINDOW_SECONDS = 600
PHONE_RE = re.compile(r"^[+0-9 ()-]{7,32}$")


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


class SheetsWriter:
    def __init__(self, token_file: Path, spreadsheet_id: str, append_range: str) -> None:
        self.token_file = token_file
        self.spreadsheet_id = spreadsheet_id
        self.append_range = append_range
        self._lock = asyncio.Lock()

    def _credentials(self) -> Credentials:
        if not self.token_file.is_file():
            raise RuntimeError("Google token file is not configured")
        info = self.token_file.read_text(encoding="utf-8")
        import json

        credentials = Credentials.from_authorized_user_info(json.loads(info))
        if credentials.expired and credentials.refresh_token:
            credentials.refresh(GoogleAuthRequest())
            self.token_file.write_text(credentials.to_json(), encoding="utf-8")
            self.token_file.chmod(0o600)
        if not credentials.valid:
            raise RuntimeError("Google credentials are invalid")
        return credentials

    def _values(self, item: IntakePayload) -> list[str]:
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
        ]

    def _sheet(self):
        return build("sheets", "v4", credentials=self._credentials(), cache_discovery=False)

    async def append(self, item: IntakePayload) -> dict[str, object]:
        async with self._lock:
            service = await asyncio.to_thread(self._sheet)
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
                    valueInputOption="USER_ENTERED",
                    insertDataOption="INSERT_ROWS",
                    body={"values": [self._values(item)]},
                ).execute()
            )
            return {
                "duplicate": False,
                "submission_id": item.submission_id,
                "updated_range": result.get("updates", {}).get("updatedRange"),
            }


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


app = FastAPI(title="Codiva Lena Intake API", version="0.1.0", docs_url=None, redoc_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://codiva.cl", "https://www.codiva.cl"],
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["content-type", "x-intake-token"],
)

limiter = RateLimiter()
writer: SheetsWriter | None = None


def get_writer() -> SheetsWriter:
    global writer
    if writer is None:
        token_file = Path(env("GOOGLE_TOKEN_FILE", "/run/secrets/google_token.json"))
        spreadsheet_id = env("GOOGLE_SHEET_ID")
        if not spreadsheet_id:
            raise RuntimeError("GOOGLE_SHEET_ID is not configured")
        writer = SheetsWriter(token_file, spreadsheet_id, env("GOOGLE_APPEND_RANGE", "Sheet1!A:Q"))
    return writer


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "codiva-lena-intake"}


@app.post("/v1/intake")
async def create_intake(
    request: Request,
    payload: IntakePayload,
    x_intake_token: Annotated[str | None, Header()] = None,
) -> dict[str, object]:
    if request.headers.get("content-length") and int(request.headers["content-length"]) > MAX_BODY_BYTES:
        raise HTTPException(status_code=413, detail="request too large")
    expected_token = env("INTAKE_WRITE_TOKEN")
    if expected_token and x_intake_token != expected_token:
        raise HTTPException(status_code=401, detail="invalid intake token")
    client_ip = request.client.host if request.client else "unknown"
    if not limiter.allow(client_ip):
        raise HTTPException(status_code=429, detail="too many requests")
    try:
        result = await get_writer().append(payload)
    except Exception:
        raise HTTPException(status_code=503, detail="intake storage is temporarily unavailable")
    return {"status": "accepted", **result}
