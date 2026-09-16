# sabi.fr

Site vitrine du cabinet sabi. Astro en sortie statique, Tailwind CSS 4, TypeScript.
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
  components/            Header, Footer, Hero, Masthead, SectionTitle,
                         ExpertiseCard, ReferenceRow, DarkBand, ContactForm,
                         PageLegale
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

## Déploiement

`netlify.toml` est prêt : commande `npm run build`, dossier `dist`, en-têtes de
sécurité et cache long sur `/_astro/*`.

Le formulaire de contact utilise **Netlify Forms** (`data-netlify="true"`, champ
piège `societe-web`). Il fonctionne sans JavaScript, le navigateur poste et
Netlify affiche sa page de confirmation. Avec JavaScript, la confirmation
s'affiche sans rechargement. Pour partir sur Vercel, remplacer l'attribut
`data-netlify` par une action Formspree dans `src/components/ContactForm.astro`,
le reste du balisage ne change pas.

## Contrôle qualité, état au 15 septembre 2026

| Point | État |
|---|---|
| Rendu à 390, 768, 1280 et 1920 px | vérifié |
| Débordement horizontal | aucun, à ces 4 largeurs, sur les 8 pages |
| Liens internes | tous résolus |
| Lien Calendly | 200 |
| Lien LinkedIn | URL provisoire, à confirmer, voir TODO 2 |
| Formulaire, envoi et confirmation | vérifié, envoi simulé |
| Texte gris clair sur fond clair | aucun, contraste minimal mesuré 5.1:1 |
| Tiret cadratin ou double tiret | aucun |
| Chiffres hors cahier des charges | aucun, hors numérotation 01 à 06 des cartes |
| `npm run build` | 0 erreur, 0 avertissement |
| Lighthouse mobile, accueil | 100 / 100 / 100 / 100 |
| Lighthouse mobile, expertises | 100 / 100 / 100 / 100 |
| Lighthouse mobile, à propos | 100 / 100 / 100 / 100 |
| Lighthouse mobile, contact | 100 / 100 / 100 / 100 |
| Site lisible sans JavaScript | vérifié, tous les blocs visibles |
| `prefers-reduced-motion` | animations désactivées |

## TODO avant mise en ligne

1. **Nom de domaine.** `SITE_URL` dans `astro.config.mjs` et l'URL du sitemap
   dans `public/robots.txt` pointent sur `https://sabi.fr`. À confirmer une fois
   le domaine acheté.
2. **URL LinkedIn.** `CONTACT.linkedin` dans `src/consts.ts` est une supposition.
   Remplacer par l'URL réelle.
3. **Mentions légales.** Dans `src/pages/mentions-legales.astro`, les champs
   marqués « à compléter » : dénomination sociale, forme juridique, capital
   social, adresse du siège, SIREN, RCS, TVA intracommunautaire, puis raison
   sociale, adresse et téléphone de l'hébergeur retenu.
4. **Politique de confidentialité.** Identité du responsable de traitement et
   adresse du siège, dans `src/pages/politique-de-confidentialite.astro`.
5. **Données structurées.** `streetAddress` et `postalCode` dans le JSON-LD de
   `src/layouts/Base.astro`, une fois l'adresse arrêtée.
6. **Analytics.** Plausible ou Umami à brancher dans `src/layouts/Base.astro`.
   Ces deux outils ne déposent pas de cookie, donc pas de bandeau de
   consentement. Si un autre outil est retenu et qu'il dépose un cookie, il faut
   ajouter un bandeau conforme.

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
