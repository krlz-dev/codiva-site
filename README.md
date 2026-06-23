# codiva® — site

Marketing site for **codiva®**, a Chilean registered trademark (INAPI N° 1481622,
Class 42) for web design & software development. Built with [Astro](https://astro.build/),
deployed to GitHub Pages at **[codiva.cl](https://codiva.cl)**.

## Stack

- **Astro** — static output, zero client-side framework JS.
- **Bilingual (es / en)** from a single content source. Spanish renders at `/`,
  English at `/en/`, matching the original URLs (and hreflang signals).
- Plain CSS design system (`src/styles/global.css`), IBM Plex fonts.

## Project structure

```
public/                 # served as-is (CNAME, logo, favicon, robots, sitemap, llms.txt, og-image)
src/
  components/           # Nav, Hero, Marquee, About, Services, Trademark, Faq, Contact, Footer
  layouts/
    BaseLayout.astro    # <head> (SEO + JSON-LD), nav, footer, client script
  pages/
    index.astro         # Spanish (/)
    en/index.astro      # English (/en/)
  i18n/
    content.ts          # all copy + SEO + Schema.org data, per locale (single source of truth)
  styles/
    global.css          # design system
scripts/
  generate-og-image.mjs # regenerates public/og-image.png
  fonts/                # IBM Plex Sans TTFs (OFL) used to render the OG image
.github/workflows/
  deploy.yml            # build + deploy to GitHub Pages
```

## Develop

```bash
npm install
npm run dev          # local dev server (http://localhost:4321)
npm run build        # static build to dist/
npm run preview      # preview the production build
```

## Editing content

All text, SEO metadata, and structured data live in `src/i18n/content.ts`
(`es` and `en` objects). Components are presentational and read from there, so a
copy change is made once and applies to the right locale — no duplicated markup.

To regenerate the social share image after a brand tweak:

```bash
node scripts/generate-og-image.mjs
```

The share image is rendered in **IBM Plex Sans** (the site typeface). The font
files are bundled under `scripts/fonts/` — licensed under the SIL Open Font
License (see `scripts/fonts/OFL.txt`) — and exposed to the renderer via a
temporary fontconfig, so no system font install is required.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. The custom domain (`codiva.cl`) is
kept via `public/CNAME`.

> **One-time setup:** in the repo's **Settings → Pages**, set **Source** to
> **GitHub Actions** (instead of "Deploy from a branch").
