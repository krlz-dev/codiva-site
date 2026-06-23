// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://codiva.cl',
  // Spanish is served at the root, English under /en/ — matches the original URLs
  // so existing SEO / hreflang signals are preserved.
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    // Emit /en/index.html (directory style) so canonical URLs stay trailing-slash.
    format: 'directory',
  },
});
