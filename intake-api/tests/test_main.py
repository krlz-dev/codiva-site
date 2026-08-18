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


def test_health_is_public_and_minimal():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "codiva-lena-intake"}


def test_unconfirmed_intake_is_rejected_before_storage():
    response = client.post("/v1/intake", json=valid_payload(client_confirmed=False))
    assert response.status_code == 422


def test_unknown_fields_are_rejected():
    response = client.post("/v1/intake", json=valid_payload(secret="do-not-accept"))
    assert response.status_code == 422


def test_invalid_phone_is_rejected():
    response = client.post("/v1/intake", json=valid_payload(phone="not-a-phone"))
    assert response.status_code == 422


def test_write_token_is_required_when_configured(monkeypatch):
    monkeypatch.setenv("INTAKE_WRITE_TOKEN", "test-token")
    response = client.post("/v1/intake", json=valid_payload())
    assert response.status_code == 401


def test_confirmed_intake_is_forwarded_to_storage(monkeypatch):
    class FakeWriter:
        async def append(self, item):
            assert item.client_confirmed is True
            return {"duplicate": False, "submission_id": item.submission_id, "updated_range": "Sheet1!A2:Q2"}

    monkeypatch.delenv("INTAKE_WRITE_TOKEN", raising=False)
    monkeypatch.setattr("app.main.writer", FakeWriter())
    response = client.post("/v1/intake", json=valid_payload())
    assert response.status_code == 200
    assert response.json()["status"] == "accepted"
    assert response.json()["updated_range"] == "Sheet1!A2:Q2"
