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

## Deploy

Push a `main` dispara `.github/workflows/deploy.yml`, que construye con Astro y publica
`dist/` en GitHub Pages. El archivo `public/CNAME` mantiene el dominio `codiva.cl`.

> En GitHub: **Settings → Pages → Source = GitHub Actions** (una sola vez).
