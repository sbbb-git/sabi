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
      /*
        Une priorité déclarée ne force rien : elle dit au robot dans quel ordre
        explorer quand il ne peut pas tout prendre. L'accueil et les pages qui
        décrivent une prestation passent devant les fiches du lexique.
      */
      serialize(item) {
        const chemin = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const priorite =
          chemin === '/' ? 1
          : chemin === '/financement' || chemin.startsWith('/expertises') ? 0.9
          : chemin === '/lexique' || chemin === '/references' ? 0.8
          : chemin.startsWith('/lexique/') ? 0.6
          : 0.7;
        // `changefreq` est typé par une énumération de la bibliothèque sitemap,
        // et Google l'ignore de toute façon. Priorité et date suffisent.
        return { ...item, priority: priorite, lastmod: new Date().toISOString() };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
