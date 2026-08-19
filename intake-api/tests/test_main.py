import json

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def valid_payload(**overrides):
    value = {
        "submission_id": "lead_20260818_123456",
        "client_name": "Ana Pérez",
        "phone": "+56912345678",
        "email": "ana@example.com",
        "company": "Example Ltda.",
        "request_type": "Sales",
        "service_area": "Software modernization",
        "problem_goal": "We need to modernize our legacy business application.",
        "scope": "One application and three integrations",
        "timeline": "This quarter",
        "budget": "To be discussed",
        "preferred_next_step": "Discovery call",
        "conversation_summary": "Client wants a discovery call about modernizing a legacy application.",
        "client_confirmed": True,
        "locale": "en",
    }
    value.update(overrides)
    return value


def submit(payload, *, token=None, file=None, turnstile=None, website=None):
    data = {"payload": json.dumps(payload)}
    if token is not None:
        data["x-intake-token"] = token
    if turnstile is not None:
        data["turnstile_token"] = turnstile
    if website is not None:
        data["website"] = website
    files = {}
    if file is not None:
        name, content, mime = file
        files = {"file": (name, content, mime)}
    return client.post("/v1/intake", data=data, files=files, headers={"x-intake-token": token} if token else {})


def test_health_is_public_and_minimal():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "codiva-lena-intake"}


def test_unconfirmed_intake_is_rejected_before_storage(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)
    response = submit(valid_payload(client_confirmed=False))
    assert response.status_code == 422


def test_unknown_fields_are_rejected(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)
    response = submit(valid_payload(secret="do-not-accept"))
    assert response.status_code == 422


def test_invalid_phone_is_rejected(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)
    response = submit(valid_payload(phone="not-a-phone"))
    assert response.status_code == 422


def test_write_token_is_required_when_configured(monkeypatch):
    monkeypatch.setenv("INTAKE_WRITE_TOKEN", "test-token")
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)
    response = submit(valid_payload())
    assert response.status_code == 401


def test_turnstile_is_verified_when_configured(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.setenv("TURNSTILE_SECRET_KEY", "turnstile-secret")
    response = submit(valid_payload(), turnstile="bad-token")
    assert response.status_code == 401


def test_honeypot_is_discarded_silently(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)

    calls = []

    class FakeWriter:
        async def append(self, item, attachment):
            calls.append(item)

    monkeypatch.setattr("app.main._writer", FakeWriter())
    response = submit(valid_payload(), website="https://spam.example")
    assert response.status_code == 200
    assert response.json()["status"] == "accepted"
    assert calls == []


def test_non_pdf_file_is_rejected(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)
    response = submit(valid_payload(), file=("evil.exe", b"MZ not a pdf", "application/octet-stream"))
    assert response.status_code == 422


def test_oversized_file_is_rejected(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)
    monkeypatch.setattr("app.main.MAX_FILE_BYTES", 8)
    response = submit(valid_payload(), file=("big.pdf", b"%PDF-1.4 too big", "application/pdf"))
    assert response.status_code == 413


def test_confirmed_intake_is_forwarded_to_storage(monkeypatch):
    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.delenv("TURNSTILE_SECRET_KEY", raising=False)

    class FakeWriter:
        async def append(self, item, attachment):
            assert item.client_confirmed is True
            assert attachment is None
            return {"duplicate": False, "submission_id": item.submission_id, "updated_range": "Sheet1!A2:R2"}

    monkeypatch.setattr("app.main._writer", FakeWriter())
    response = submit(valid_payload())
    assert response.status_code == 200
    assert response.json()["status"] == "accepted"
    assert "booking_url" not in response.json()
    assert response.json()["updated_range"] == "Sheet1!A2:R2"


def test_ack_email_skips_without_email():
    from app.main import IntakePayload, send_ack_email

    item = IntakePayload.model_validate(valid_payload(email=None))
    assert send_ack_email("test-key", "Codiva <contactos@codiva.cl>", item) is None


def test_ack_email_builds_resend_request(monkeypatch):
    import app.main as m

    item = m.IntakePayload.model_validate(valid_payload(email="client@example.com", locale="es"))
    captured = {}

    def fake_urlopen(request, timeout=None):
        captured["url"] = request.full_url
        captured["auth"] = request.get_header("Authorization")
        captured["body"] = json.loads(request.data.decode("utf-8"))

        class Resp:
            def read(self):
                return b"{}"

        return Resp()

    monkeypatch.setattr(m.urllib.request, "urlopen", fake_urlopen)
    m.send_ack_email("test-key", "Codiva <contactos@codiva.cl>", item)

    assert captured["url"] == "https://api.resend.com/emails"
    assert captured["auth"] == "Bearer test-key"
    assert captured["body"]["to"] == ["client@example.com"]
    assert captured["body"]["from"] == "Codiva <contactos@codiva.cl>"
    assert "Recibimos tu consulta" in captured["body"]["subject"]
