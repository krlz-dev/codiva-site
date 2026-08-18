# Codiva Edge Proxy

Single Caddy reverse proxy that terminates TLS for two hostnames on the VPS:

```text
Internet :80/:443
   └─ codiva-edge (Caddy, auto-HTTPS via Let's Encrypt)
        ├─ plane.codiva.cl → 127.0.0.1:8080 (Plane proxy, plain HTTP)
        └─ api.codiva.cl   → 127.0.0.1:8787 (Lena intake API)
```

## Why this exists

Both `plane.codiva.cl` and `api.codiva.cl` resolve to the same VPS IP, so a
single process must own ports 80/443 and route by hostname. The Plane stack's
own Caddy (`plane-proxy`) previously owned those ports for `plane.codiva.cl`
only. This edge proxy moves TLS termination into one place so a second
hostname can be served without a second public IP.

## Plane repoint

Two changes to `/root/plane/` (outside this repo) move Plane behind the edge:

- `docker-compose.yml` — proxy `ports` changed to `"127.0.0.1:8080:80"` so it
  stops binding public 80/443.
- `docker-compose.override.yml` — proxy `environment` adds
  `SITE_ADDRESS: "http://plane.codiva.cl"` so Plane's Caddy serves plain HTTP
  instead of terminating TLS itself.

Plane's `trusted_proxies static 0.0.0.0/0` preserves the edge's
`X-Forwarded-Proto: https`, so Plane still sees HTTPS for cookies/redirects.

## Run

```bash
cd infra/edge
docker compose up -d
docker compose logs -f
```

## Verify

```bash
curl -I https://plane.codiva.cl/
curl https://api.codiva.cl/health
```

## Rollback (restore Plane as its own TLS edge)

```bash
cd infra/edge && docker compose down
# revert the two /root/plane changes above
cd /root/plane && docker compose up -d proxy
```
