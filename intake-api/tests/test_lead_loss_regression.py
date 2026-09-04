"""
Regression tests for the 2026-08/09 lead-loss incident.

A revoked Google refresh token made every intake fail with a mute
503 "intake storage is temporarily unavailable". Real prospects filled the
form, saw "No se pudo enviar", and NOTHING was persisted anywhere — even though
Telegram was configured and working, because the notification only ran AFTER a
successful Sheets write.

Current model (decided with Carlos):
  • disk spool  = source of truth
  • Telegram    = the lead inbox
  • Sheets      = optional mirror, must never reject a lead
"""

import json

import pytest
from fastapi.testclient import TestClient

from app import main
from app.main import app

client = TestClient(app)

PDF_BYTES = b"%PDF-1.4\n% test attachment\n"


def valid_payload(**overrides):
    value = {
        "submission_id": "lead_20260830_999001",
        "client_name": "Carlos Rojas",
        "phone": "+56957173936",
        "email": "carlos@example.cl",
        "company": "Carlos Rojas",
        "request_type": "Sales",
        "service_area": "Aplicaciones a medida",
        "problem_goal": "Necesito una app urgente para mi negocio.",
        "scope": None,
        "timeline": "2 meses",
        "budget": None,
        "preferred_next_step": "Formulario web",
        "conversation_summary": "El cliente necesita una app a medida con urgencia.",
        "client_confirmed": True,
        "locale": "es",
    }
    value.update(overrides)
    return value


def submit(payload, file=None):
    data = {"payload": json.dumps(payload), "website": ""}
    files = {"file": ("cv.pdf", file, "application/pdf")} if file else None
    return client.post("/v1/intake", data=data, files=files)


class BrokenWriter:
    """Simulates exactly what a revoked Google token does."""

    async def append(self, item, attachment):
        raise RuntimeError("invalid_grant: Token has been expired or revoked.")


class WorkingWriter:
    def __init__(self):
        self.rows = []

    async def append(self, item, attachment):
        self.rows.append(item.submission_id)
        return {"stored": "sheet", "row": len(self.rows)}


@pytest.fixture
def env(tmp_path, monkeypatch):
    """Clean baseline: spool on disk, no Telegram, no Sheets, no auth gates."""
    monkeypatch.setenv("INTAKE_SPOOL_DIR", str(tmp_path))
    for key in ("TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID", "INTAKE_TOKEN",
                "TURNSTILE_SECRET", "GOOGLE_SHEET_ID", "RESEND_API_KEY"):
        monkeypatch.delenv(key, raising=False)
    # the rate limiter is a module-level singleton shared by every test:
    # leaving our requests in it makes unrelated tests fail with 429
    main.limiter._events.clear()
    yield tmp_path
    main.limiter._events.clear()


def read_spooled(spool):
    files = list(spool.glob("*.json"))
    assert len(files) == 1, f"expected exactly one spooled lead, got {len(files)}"
    return json.loads(files[0].read_text(encoding="utf-8"))


# --- the core regression ------------------------------------------------

def test_lead_is_saved_to_disk(env):
    assert submit(valid_payload()).status_code == 200
    saved = read_spooled(env)
    assert saved["payload"]["client_name"] == "Carlos Rojas"
    assert saved["payload"]["phone"] == "+56957173936"
    assert saved["payload"]["problem_goal"].startswith("Necesito una app")


def test_dead_google_credential_no_longer_rejects_the_lead(env, monkeypatch):
    """THE incident: this exact scenario used to return 503 and lose the lead."""
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-123")
    monkeypatch.setattr(main, "get_writer", lambda: BrokenWriter())

    response = submit(valid_payload())

    assert response.status_code == 200, "the client must not see 'No se pudo enviar'"
    assert read_spooled(env)["payload"]["client_name"] == "Carlos Rojas"


def test_sheets_is_not_called_when_not_configured(env, monkeypatch):
    """Sheets is opt-in now; with no sheet id it must not even be attempted."""
    def explode():
        raise AssertionError("Sheets must not be called when GOOGLE_SHEET_ID is unset")

    monkeypatch.setattr(main, "get_writer", explode)

    assert submit(valid_payload()).status_code == 200


def test_sheets_mirror_still_works_when_healthy(env, monkeypatch):
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-123")
    writer = WorkingWriter()
    monkeypatch.setattr(main, "get_writer", lambda: writer)

    response = submit(valid_payload())

    assert response.status_code == 200
    assert writer.rows == ["lead_20260830_999001"]
    assert read_spooled(env)  # disk copy exists regardless


# --- Telegram is the inbox ---------------------------------------------

def test_owner_is_notified_on_every_lead(env, monkeypatch):
    monkeypatch.setenv("TELEGRAM_BOT_TOKEN", "test-token")
    monkeypatch.setenv("TELEGRAM_CHAT_ID", "12345")
    sent = []
    monkeypatch.setattr(main, "telegram_notify", lambda t, c, text: sent.append(text) or True)

    assert submit(valid_payload()).status_code == 200

    assert sent, "the owner was never notified"
    assert "Carlos Rojas" in sent[0]


def test_notification_happens_even_when_the_sheet_fails(env, monkeypatch):
    """Telegram used to run only after a successful write, so it stayed silent."""
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-123")
    monkeypatch.setenv("TELEGRAM_BOT_TOKEN", "test-token")
    monkeypatch.setenv("TELEGRAM_CHAT_ID", "12345")
    monkeypatch.setattr(main, "get_writer", lambda: BrokenWriter())
    sent = []
    monkeypatch.setattr(main, "telegram_notify", lambda t, c, text: sent.append(text) or True)

    assert submit(valid_payload()).status_code == 200
    assert sent and "Carlos Rojas" in sent[0]


def test_telegram_alone_is_enough_when_the_disk_fails(env, monkeypatch):
    """Two independent destinations: losing one must not lose the lead."""
    monkeypatch.setenv("TELEGRAM_BOT_TOKEN", "test-token")
    monkeypatch.setenv("TELEGRAM_CHAT_ID", "12345")
    monkeypatch.setattr(main, "spool_lead", lambda data, attachment, reason: None)
    sent = []
    monkeypatch.setattr(main, "telegram_notify", lambda t, c, text: sent.append(text) or True)

    assert submit(valid_payload()).status_code == 200
    assert "única copia" in sent[0]


def test_client_sees_an_error_only_when_nothing_could_keep_the_lead(env, monkeypatch):
    monkeypatch.setattr(main, "spool_lead", lambda data, attachment, reason: None)
    assert submit(valid_payload()).status_code == 503


# --- attachments no longer depend on Google Drive ----------------------

def test_pdf_attachment_is_stored_on_our_own_disk(env):
    response = submit(valid_payload(), file=PDF_BYTES)

    assert response.status_code == 200
    files = list((env / "attachments").glob("*.pdf"))
    assert len(files) == 1
    assert files[0].read_bytes() == PDF_BYTES
    assert read_spooled(env)["attachment"] is not None


def test_a_lead_with_an_attachment_survives_a_dead_google_credential(env, monkeypatch):
    """This path used to 503 on Drive before the lead was ever stored."""
    monkeypatch.setenv("GOOGLE_SHEET_ID", "sheet-123")
    monkeypatch.setattr(main, "get_writer", lambda: BrokenWriter())

    assert submit(valid_payload(), file=PDF_BYTES).status_code == 200
    assert read_spooled(env)["payload"]["client_name"] == "Carlos Rojas"


def test_non_pdf_upload_is_still_rejected(env):
    assert submit(valid_payload(), file=b"not a pdf at all").status_code == 422


# --- health ------------------------------------------------------------

def test_deep_health_is_ok_while_leads_can_be_captured(env):
    body = client.get("/health/deep").json()
    assert body["status"] == "ok"
    assert body["spool"]["ok"] is True


def test_deep_health_degrades_when_no_destination_works(monkeypatch):
    monkeypatch.setattr(main, "spool_dir", lambda: None)
    for key in ("TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"):
        monkeypatch.delenv(key, raising=False)

    assert client.get("/health/deep").json()["status"] == "degraded"


def test_plain_health_stays_simple():
    assert client.get("/health").json()["status"] == "ok"
