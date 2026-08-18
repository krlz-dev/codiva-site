# Codiva Lena Intake API

Small, storage-only API for the website assistant. It accepts a confirmed intake and appends it to the Codiva Google Sheet.

## Contract

- `GET /health` — liveness only; no secrets or dependency probes.
- `POST /v1/intake` — validates a confirmed intake and appends it to Google Sheets.

The API does not accept orders, payments, quotes, credentials, or arbitrary spreadsheet operations.

## Runtime configuration

- `GOOGLE_TOKEN_FILE` — mounted authorized-user token JSON; default `/run/secrets/google_token.json`.
- `GOOGLE_SHEET_ID` — Codiva intake spreadsheet ID.
- `GOOGLE_APPEND_RANGE` — default `Sheet1!A:Q`.
- `INTAKE_WRITE_TOKEN` — optional shared token required by the website backend. Generate it outside Git.

The Google Sheet must have the existing A:P headers plus `Submission ID` in Q1.

## Tests

```bash
uv sync --group test
uv run pytest -q
```
