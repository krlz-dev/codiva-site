FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

COPY pyproject.toml ./
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir \
      "fastapi>=0.115,<1" \
      "google-api-python-client>=2.160,<3" \
      "google-auth>=2.37,<3" \
      "python-multipart>=0.0.9" \
      "uvicorn[standard]>=0.34,<1"

COPY app ./app

RUN addgroup --system app && adduser --system --ingroup app app \
    && mkdir -p /data /run/secrets \
    && chown -R app:app /app /data /run/secrets

USER app
EXPOSE 8787

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8787", "--proxy-headers", "--forwarded-allow-ips", "127.0.0.1"]
