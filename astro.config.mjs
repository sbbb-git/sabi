// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO domaine : remplacer par https://sabi.fr une fois le nom de domaine acheté.
// Cette valeur alimente les URL canoniques, le sitemap et les balises Open Graph.
export const SITE_URL = 'https://sabi.fr';

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
