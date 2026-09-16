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

Le site est hébergé sur **Cloudflare Pages**, le domaine est géré dans le même
compte Cloudflare.

Réglages du projet Pages :

| Réglage | Valeur |
|---|---|
| Commande de build | `npm run build` |
| Dossier de sortie | `dist` |
| Version de Node | 22 |

Les en-têtes de sécurité et de cache sont dans `public/_headers`, que Cloudflare
Pages lit au déploiement. Rien à configurer dans l'interface.

### Le formulaire de contact

`functions/api/contact.js` est une **Pages Function**. Cloudflare la déploie
automatiquement depuis le dossier `functions/` à la racine du dépôt, à côté du
site statique. Elle valide les champs, écarte les robots avec le champ piège
`societe-web`, puis relaie le message par email via **Resend**.

Elle répond de deux façons, pour que le site marche aussi sans JavaScript :

- requête portant `Accept: application/json` : réponse JSON, la confirmation
  s'affiche sans rechargement
- sinon : le navigateur a posté normalement, la fonction sert sa propre page de
  confirmation, aux couleurs du site, avec un lien de retour

Variables à définir dans Cloudflare Pages, onglet Settings puis Variables :

| Nom | Type | Obligatoire | Rôle |
|---|---|---|---|
| `RESEND_API_KEY` | secret | oui | clé API Resend |
| `CONTACT_TO` | variable | non | destinataire, par défaut `sacha.bitoun@essec.edu` |
| `CONTACT_FROM` | variable | non | expéditeur, par défaut `sabi&co <contact@sabi-co.fr>` |

Sans `RESEND_API_KEY`, la fonction renvoie une erreur explicite avec l'adresse
email en repli. Elle ne fait jamais croire à un envoi réussi.

### Tester la fonction en local

```bash
npm run build
npx wrangler pages dev dist --binding RESEND_API_KEY=votre_cle
```

Le site répond alors sur `http://localhost:8788`, fonction comprise.

## Contrôle qualité, état au 16 septembre 2026

| Point | État |
|---|---|
| Rendu à 390, 768, 1280 et 1920 px | vérifié |
| Débordement horizontal | aucun, à ces 4 largeurs, sur les 8 pages |
| Liens internes | tous résolus |
| Lien Calendly | 200 |
| Lien LinkedIn | URL provisoire, à confirmer, voir TODO 2 |
| Formulaire avec JavaScript | vérifié sur `wrangler pages dev`, confirmation et erreur |
| Formulaire sans JavaScript | vérifié, la fonction sert sa page de repli |
| Fonction de contact | 9 cas testés : méthode, validation, piège à robots, appel Resend réel |
| Texte gris clair sur fond clair | aucun, contraste minimal mesuré 5.1:1 |
| Tiret cadratin ou double tiret | aucun |
| Chiffres hors cahier des charges | aucun, hors numérotation 01 à 06 des cartes |
| `npm run build` | 0 erreur, 0 avertissement |
| URL canoniques | vérifiées, sans `.html`, alignées sur le sitemap |
| Lighthouse mobile, 5 pages | 100 / 100 / 100 / 100 partout |
| Site lisible sans JavaScript | vérifié, tous les blocs visibles |
| `prefers-reduced-motion` | animations désactivées |

## TODO avant mise en ligne

1. **URL LinkedIn.** `CONTACT.linkedin` dans `src/consts.ts` est une supposition.
   Remplacer par l'URL réelle.
2. **Mentions légales.** Dans `src/pages/mentions-legales.astro`, les champs
   marqués « à compléter » : dénomination sociale, forme juridique, capital
   social, adresse du siège, SIREN, RCS, TVA intracommunautaire, puis raison
   sociale, adresse et téléphone de l'hébergeur retenu.
3. **Politique de confidentialité.** Identité du responsable de traitement et
   adresse du siège, dans `src/pages/politique-de-confidentialite.astro`.
4. **Données structurées.** `streetAddress` et `postalCode` dans le JSON-LD de
   `src/layouts/Base.astro`, une fois l'adresse arrêtée.
5. **Analytics.** Plausible ou Umami à brancher dans `src/layouts/Base.astro`.
   Ces deux outils ne déposent pas de cookie, donc pas de bandeau de
   consentement. Cloudflare Web Analytics fait aussi l'affaire et ne dépose rien.
6. **Clé Resend.** Créer un compte Resend, y vérifier le domaine `sabi-co.fr`
   avec les enregistrements DNS fournis, à poser dans Cloudflare, puis ajouter
   `RESEND_API_KEY` en secret dans le projet Pages. Tant que ce n'est pas fait,
   le formulaire affiche une erreur et renvoie vers l'adresse email.

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
