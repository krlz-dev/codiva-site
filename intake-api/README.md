# Codiva Lena Intake API

Small, storage-only API for the website form. It accepts a confirmed intake, appends it to the Codiva Google Sheet, notifies the owner via Telegram, and auto-acknowledges the client by email.

## Contract

- `GET /health` — liveness only; no secrets or dependency probes.
- `POST /v1/intake` — validates a confirmed intake and appends it to Google Sheets.

The API does not accept orders, payments, quotes, credentials, or arbitrary spreadsheet operations.

## Runtime configuration

- `GOOGLE_TOKEN_FILE` — mounted authorized-user token JSON; default `/run/secrets/google_token.json`.
- `GOOGLE_SHEET_ID` — Codiva intake spreadsheet ID.
- `GOOGLE_APPEND_RANGE` — default `Sheet1!A:Q`.
- `INTAKE_WRITE_TOKEN` — optional shared token required by the website backend. Generate it outside Git.
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — optional; notify the owner on each confirmed intake.
- `RESEND_API_KEY` / `RESEND_FROM` — optional; send an auto-acknowledgement email to the client (skipped when the key is unset or the client left no email).

The Google Sheet must have the existing A:P headers plus `Submission ID` in Q1.

## Tests

```bash
uv sync --group test
uv run pytest -q
```
