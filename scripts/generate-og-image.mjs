/**
 * Generates public/og-image.png (1200×630) referenced by the OG/Twitter meta
 * tags. Run with: node scripts/generate-og-image.mjs
 *
 * Renders an inline SVG with sharp (already a dependency of Astro). The site's
 * IBM Plex Sans TTFs are bundled in scripts/fonts/ and exposed to the SVG text
 * renderer (librsvg/fontconfig) via a generated fontconfig file, so the share
 * image matches the site typography without any system font install.
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, 'fonts');
const out = join(__dirname, '..', 'public', 'og-image.png');

// Point fontconfig at the bundled IBM Plex Sans fonts (with system fonts kept
// as fallback). Must be set before sharp/librsvg initializes fontconfig.
const fcDir = mkdtempSync(join(tmpdir(), 'codiva-fc-'));
const cacheDir = join(fcDir, 'cache');
mkdirSync(cacheDir, { recursive: true });
const fcConfig = join(fcDir, 'fonts.conf');
writeFileSync(
  fcConfig,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontsDir}</dir>
  <cachedir>${cacheDir}</cachedir>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
</fontconfig>
`
);
process.env.FONTCONFIG_FILE = fcConfig;

const { default: sharp } = await import('sharp');

const BG = '#0a0a0a';
const ACCENT = '#BEFF00';
const TEXT = '#f0f0f0';
const MUTED = '#888888';
const DIM = '#555555';
const FONT = 'IBM Plex Sans';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M80 0 L0 0 0 80" fill="none" stroke="${ACCENT}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="42%" r="60%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.10"/>
      <stop offset="70%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <text x="600" y="270" text-anchor="middle"
        font-family="${FONT}" font-weight="700"
        font-size="180" letter-spacing="-8" fill="${ACCENT}">codiva<tspan
        font-size="64" baseline-shift="super" fill="${ACCENT}">®</tspan></text>

  <text x="600" y="362" text-anchor="middle"
        font-family="${FONT}" font-weight="300"
        font-size="42" letter-spacing="1" fill="${TEXT}">Software · Web · Apps · Services</text>

  <text x="600" y="470" text-anchor="middle"
        font-family="${FONT}" font-weight="500"
        font-size="26" letter-spacing="6" fill="${MUTED}">DISEÑO Y DESARROLLO DE PÁGINAS WEB · CHILE</text>

  <text x="600" y="540" text-anchor="middle"
        font-family="${FONT}" font-weight="500"
        font-size="22" letter-spacing="4" fill="${DIM}">MARCA REGISTRADA INAPI N° 1481622 · CLASE 42</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote', out);
