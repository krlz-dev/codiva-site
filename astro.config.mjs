// @ts-check
import { defineConfig } from 'astro/config';

// Fully static bilingual site (SSG, no SSR).
//   /     -> Spanish  (src/pages/index.astro)
//   /en/  -> English  (src/pages/en/index.astro)
// Deployed to GitHub Pages on the custom domain codiva.cl (see public/CNAME).
export default defineConfig({
  site: 'https://codiva.cl',
  // Keep clean URLs without trailing-slash surprises on GitHub Pages.
  trailingSlash: 'ignore',
  build: {
    // Emit /en/index.html (not /en.html) so the existing /en/ URL is preserved.
    format: 'directory',
  },
});
