# codiva.cl

Sitio bilingüe de **codiva®**, construido con [Astro](https://astro.build).
**100% estático (SSG, sin SSR)**, desplegado en GitHub Pages sobre el dominio `codiva.cl`.

- `/`    → Español (`src/pages/index.astro`)
- `/en/` → English (`src/pages/en/index.astro`)

## Comandos

```bash
npm install      # instalar dependencias (una vez)
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # previsualiza el build
```

## Estructura

```
src/
  pages/
    index.astro        → página ES (usa i18n/es.js)
    en/index.astro     → página EN (usa i18n/en.js)
  components/
    Page.astro         → arma la página completa (compartida por ambos idiomas)
    Nav, Hero, Marquee, About, Services, Trademark, Faq, Contact, Footer
  layouts/Layout.astro → <head>, SEO, Schema.org JSON-LD, fuentes, scripts
  i18n/
    es.js / en.js      → TODO el texto + metadatos SEO + datos Schema.org por idioma
  styles/global.css    → estilos (antes style.css)
public/                → se copian tal cual a la raíz del sitio:
  CNAME, favicon.svg, codiva-magic.svg, robots.txt, sitemap.xml, llms.txt
legacy/                → versión original (HTML/CSS/JS) como respaldo
```

### Editar contenido

Para cambiar textos, traducciones, FAQ, servicios o datos SEO/Schema, edita
**`src/i18n/es.js`** y **`src/i18n/en.js`**. No hace falta tocar los componentes.
Las dos páginas comparten la misma estructura (`components/Page.astro`), así que un
cambio de diseño se aplica a ambos idiomas a la vez.

## Intake API

The website assistant's storage API lives in `intake-api/` and runs separately from the static Astro build. It is intentionally bound to localhost on the VPS until a controlled HTTPS route is configured.

```bash
cd intake-api
uv sync --group test
uv run pytest -q
docker compose up -d --build
curl http://127.0.0.1:8787/health
```

Runtime credentials belong in `intake-api/.env` and `intake-api/secrets/`; both are ignored by Git. The API accepts only validated, explicitly confirmed intake payloads and appends to the Codiva Google Sheet. It does not accept payments, contracts, arbitrary spreadsheet operations, or secrets from clients.

For public use, route `api.codiva.cl` to the API through a named HTTPS tunnel or an explicitly configured reverse proxy. Do not bind port 8787 to `0.0.0.0`.

## Deploy

Push a `main` dispara `.github/workflows/deploy.yml`, que construye con Astro y publica
`dist/` en GitHub Pages. El archivo `public/CNAME` mantiene el dominio `codiva.cl`.

> En GitHub: **Settings → Pages → Source = GitHub Actions** (una sola vez).
