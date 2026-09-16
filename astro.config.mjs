// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Domaine du cabinet. Alimente les URL canoniques, le sitemap et l'Open Graph.
// Le domaine porte un tiret, la marque une esperluette : sabi-co.fr pour sabi&co.
export const SITE_URL = 'https://sabi-co.fr';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/mentions-legales') &&
        !page.includes('/politique-de-confidentialite'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
