# sabi-co.fr

Site vitrine du cabinet sabi&co. Astro en sortie statique, Tailwind CSS 4, TypeScript.
Aucun framework front, aucun backend.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # vérification de types puis build dans dist/
npm run preview  # sert dist/ en local
```

`npm run build` enchaîne `astro check` et `astro build`. Il doit rester à 0 erreur,
0 avertissement, 0 indication.

## Arborescence

```
src/
  consts.ts              coordonnées, navigation, marque
  data/contenu.ts        tout le texte éditorial, source unique
  layouts/Base.astro     head, SEO, JSON-LD, apparition au scroll
  components/            Header, Footer, Wordmark, Hero, Masthead,
                         SectionTitle, ExpertiseCard, ReferenceRow, DarkBand,
                         ContactForm, PageLegale
  pages/                 accueil, expertises, references, a-propos, contact,
                         mentions-legales, politique-de-confidentialite, 404
public/                  robots.txt, favicon.svg, og-image.png, apple-touch-icon.png
```

Le contenu ne vit pas dans les pages : il est dans `src/data/contenu.ts`. Pour
changer un texte d'expertise ou une référence, c'est le seul fichier à ouvrir.

## Design system

Défini une seule fois dans `src/styles/global.css`, bloc `@theme`.

Le site est construit sur le bleu nuit, pas sur le blanc. Chaque page ouvre sur
un aplat sombre, header compris, puis alterne nuit, blanc et crème.

| Jeton | Valeur | Usage |
|---|---|---|
| `--color-nuit` | `#0A2540` | aplats forts, header, titres sur fond clair |
| `--color-sable` | `#E3C57E` | accent, sur fond sombre uniquement |
| `--color-bronze` | `#7E6127` | le même accent, pour les fonds clairs |
| `--color-creme` | `#F4F1EA` | fonds de section clairs |
| `--color-ivoire` | `#FBF9F5` | fonds de carte |
| `--color-bord` | `#E2DDD2` | filets et bordures |
| `--color-texte` | `#131A22` | corps de texte |
| `--color-gris` | `#5F6B78` | légendes et mentions |
| `--color-sur-nuit` | `#B9C6D4` | texte secondaire sur aplat sombre |

Le sable ne passe pas le contraste sur fond clair : partout où l'accent doit
être lisible sur du blanc ou du crème, c'est `--color-bronze` qui sert. Le corps
de texte est toujours en `--color-texte`, jamais en gris.

Classes utilitaires maison : `.conteneur`, `.section`, `.mesure`, `.surtitre`,
`.titre-display`, `.titre-page`, `.titre-section`, `.chiffre`, `.accroche`,
`.action`, `.bouton`, `.bouton-contour`, `.filet`.

Deux polices, servies en local, aucun CDN. **Instrument Serif** porte les titres
et les chiffres, c'est elle qui donne la voix. **Inter** porte tout le reste,
corps de texte, navigation, formulaire.

## Marque et domaine

La marque s'écrit `sabi&co`, en minuscules, esperluette collée. Le domaine, lui,
porte un tiret : `sabi-co.fr`.

`MARQUE` dans `src/consts.ts` est la chaîne de référence. Elle sert partout où
il faut du texte brut : balise `title`, `og:site_name`, JSON-LD, attributs
`alt` et `aria-label`. Pour l'affichage, c'est le composant `Wordmark` qui rend
le logotype, avec l'esperluette en sable sur fond sombre et en bronze sur fond
clair. L'esperluette sert aussi de favicon et d'icône iOS.

Le domaine est posé dans `SITE_URL` (`astro.config.mjs`), d'où découlent les URL
canoniques, le sitemap et l'Open Graph, et dans `public/robots.txt` pour l'URL du
sitemap.

## Déploiement, Cloudflare Pages

Le déploiement est automatique. `.github/workflows/deploiement.yml` construit le
site et le publie sur Cloudflare Pages à chaque poussée sur la branche par
défaut, `claude/sabi-site-dev-95r6po`. Le workflow se lance aussi à la main
depuis l'onglet Actions, bouton Run workflow.

Le jeton Cloudflare ne vit que dans les secrets GitHub. Il n'apparaît nulle part
dans le dépôt.

### Les deux secrets à créer

Dans le dépôt GitHub, Settings puis Secrets and variables puis Actions,
bouton New repository secret :

| Nom du secret | Où le trouver |
|---|---|
| `CLOUDFLARE_API_TOKEN` | dash.cloudflare.com/profile/api-tokens, Create Token, Custom token, permission **Account > Cloudflare Pages > Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | dans l'URL du dashboard Cloudflare, ou en bas de la page Workers & Pages |

Le workflow vérifie leur présence avant de construire quoi que ce soit, et
s'arrête avec un message explicite s'il en manque un.

### Ce que fait le workflow

1. installe Node 22 et les dépendances avec `npm ci`
2. construit le site avec `npm run build`, qui inclut la vérification de types
3. crée le projet Pages `sabi-co` s'il n'existe pas encore, sans échouer s'il
   existe déjà
4. publie le contenu de `dist` sur la branche de production `production`

Le site sort alors sur `https://sabi-co.pages.dev`. Pour le servir sur
`sabi-co.fr`, ajouter le domaine une fois dans Workers & Pages, projet `sabi-co`,
onglet Custom domains. Cloudflare pose les enregistrements DNS tout seul
puisque la zone est dans le même compte.

Les en-têtes de sécurité et de cache sont dans `public/_headers`, que Cloudflare
Pages lit au déploiement. Rien à configurer dans l'interface.

### Le formulaire de contact

Le formulaire poste sur **Formspree**. Aucun backend, aucun secret dans le
dépôt : l'identifiant d'un formulaire Formspree est public par nature.

Une seule valeur à renseigner, `FORMSPREE_ID` dans `src/consts.ts` :

```ts
export const FORMSPREE_ID = 'xxxxxxxx';
```

C'est la fin de l'URL que Formspree donne, `https://formspree.io/f/xxxxxxxx`.

Tant que cette valeur est vide, **aucun formulaire n'est affiché** : la page
Contact montre à la place un encart renvoyant vers l'email et le téléphone.
Personne ne se retrouve devant un envoi qui échoue en silence.

Une fois l'identifiant posé, le formulaire fonctionne dans les deux cas :

- avec JavaScript, la requête annonce `Accept: application/json`, Formspree
  répond en JSON et la confirmation s'affiche sans rechargement
- sans JavaScript, le navigateur poste normalement et Formspree affiche sa
  propre page de confirmation

Le champ `_gotcha` est le piège à robots reconnu par Formspree, et `_subject`
fixe l'objet des emails reçus.

## Contrôle qualité, état au 16 septembre 2026

| Point | État |
|---|---|
| Rendu à 390, 768, 1280 et 1920 px | vérifié |
| Débordement horizontal | aucun, à ces 4 largeurs, sur les 8 pages |
| Liens internes | tous résolus |
| Lien Calendly | 200 |
| Lien LinkedIn | URL réelle, LinkedIn renvoie 999 aux robots, normal |
| Formulaire | balisage vérifié avec un identifiant de test, repli vérifié sans identifiant |
| Texte gris clair sur fond clair | aucun, contraste minimal mesuré 5.1:1 |
| Tiret cadratin ou double tiret | aucun |
| Chiffres hors cahier des charges | aucun, hors numérotation 01 à 06 des cartes |
| `npm run build` | 0 erreur, 0 avertissement |
| URL canoniques | vérifiées, sans `.html`, alignées sur le sitemap |
| Lighthouse mobile, 5 pages | 100 / 100 / 100 / 100 partout |
| Site lisible sans JavaScript | vérifié, tous les blocs visibles |
| `prefers-reduced-motion` | animations désactivées |

## TODO avant mise en ligne

1. **Les deux secrets GitHub.** `CLOUDFLARE_API_TOKEN` et
   `CLOUDFLARE_ACCOUNT_ID`, voir la section Déploiement. Sans eux le workflow
   s'arrête et le site n'est pas publié.
2. **Domaine sur le projet Pages.** Après le premier déploiement réussi,
   ajouter `sabi-co.fr` dans Custom domains.
3. **Identifiant Formspree.** Créer le formulaire sur Formspree et coller son
   identifiant dans `FORMSPREE_ID`, `src/consts.ts`. Tant qu'il est vide, la
   page Contact affiche les coordonnées directes au lieu du formulaire.
4. **Mentions légales.** Dans `src/pages/mentions-legales.astro`, les champs
   marqués « à compléter » : dénomination sociale, forme juridique, capital
   social, adresse du siège, SIREN, RCS, TVA intracommunautaire, puis raison
   sociale, adresse et téléphone de l'hébergeur retenu, ici Cloudflare.
5. **Politique de confidentialité.** Identité du responsable de traitement et
   adresse du siège, dans `src/pages/politique-de-confidentialite.astro`.
6. **Données structurées.** `streetAddress` et `postalCode` dans le JSON-LD de
   `src/layouts/Base.astro`, une fois l'adresse arrêtée.
7. **Analytics.** Cloudflare Web Analytics est le plus simple ici, il ne dépose
   aucun cookie, donc pas de bandeau de consentement. Plausible ou Umami font
   aussi l'affaire, à brancher dans `src/layouts/Base.astro`.

Aucune de ces informations n'a été inventée.

## Écarts assumés par rapport au cahier des charges

Le cahier des charges décrivait un site clair, en Inter seule, avec un accent
bleu. Après examen des cinq références citées (26 Advisory, Reggio Partners,
SATE, Smash, DAF Nation), toutes ouvrent sur un aplat sombre et portent une
couleur signature qui n'est pas du bleu corporate. La direction a été rebasculée
en conséquence, et validée : nuit et sable, titres en serif.

- **Accroche.** « Le bras droit financier des dirigeants » a été retiré : la
  formule parle d'une personne, pas d'un cabinet. Le titre est désormais
  « Structurer et financer la croissance. », qui figurait déjà au cahier des
  charges comme phrase d'accompagnement.
- **Fond sombre plutôt que clair.** Header, héros et bandeau d'ouverture de
  chaque page sont en `--color-nuit`. Les sections de contenu restent claires.
- **Deux familles au lieu d'une.** Instrument Serif pour les titres et les
  chiffres, Inter pour le reste. C'est le levier principal contre l'effet
  gabarit.
- **Accent sable plutôt que bleu.** Une seule couleur d'accent, déclinée en
  `--color-sable` sur fond sombre et `--color-bronze` sur fond clair, pour des
  raisons de contraste.
- **Astro 7 au lieu d'Astro 5.** Astro 5 traîne des vulnérabilités critiques non
  corrigées, dont plusieurs XSS et une exécution de code à distance. Astro 7
  passe `npm audit` à 0 vulnérabilité, avec le même code et la même
  configuration. Aucun autre point du cahier des charges n'est touché.
- **Taille du titre du héros.** L'échelle prévoit 48 px pour un titre de page.
  Le héros de l'accueil monte à 84 px en desktop, via `clamp()`. C'est le
  registre des références citées. Les titres des autres pages plafonnent à 56 px.
- **Numérotation 01 à 06 des cartes d'expertise.** Repère de lecture, pas une
  donnée chiffrée. À retirer si la règle doit se lire au pied de la lettre.
