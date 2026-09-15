/**
 * Contenu éditorial. Texte définitif du cahier des charges, repris tel quel.
 * Ne rien ajouter ici sans validation : aucun chiffre, aucun nom de client,
 * aucun tarif qui ne figure pas au cahier des charges.
 */

export type Pilier = { titre: string; phrase: string };
export type Expertise = { titre: string; phrase: string };
export type Reference = {
  secteur: string;
  objet: string;
  phrase: string;
  chiffre?: string;
};

/** Accueil, section « Qui sommes-nous ». */
export const PILIERS: Pilier[] = [
  { titre: 'Les chiffres', phrase: "Savoir où l'entreprise en est, chaque mois." },
  { titre: 'La structure', phrase: 'Des sociétés et des comptes qui suivent la croissance.' },
  { titre: 'Les projets', phrase: 'Ouvrir, acquérir ou céder sans improviser.' },
  { titre: 'Les financements', phrase: "Aller chercher l'argent au moment où il en faut." },
  { titre: 'Les outils', phrase: "Automatiser ce qui n'a pas à être refait à la main." },
];

/** Accueil, bande sombre. */
export const BANDE_ACCUEIL =
  "Intervention en temps partagé, aux côtés des équipes en place. Autour, un réseau d'experts-comptables, d'avocats et de spécialistes, mobilisé au cas par cas.";

/** Page Expertises. */
export const EXPERTISES: Expertise[] = [
  {
    titre: 'Direction financière à temps partagé',
    phrase:
      'Vos comptes sont suivis, votre trésorerie tenue et vos décisions chiffrées, sans recrutement.',
  },
  {
    titre: 'Financement',
    phrase:
      'Nous montons le dossier et mettons les financeurs en concurrence, quelle que soit la source.',
  },
  {
    titre: 'Subventions et aides publiques',
    phrase:
      'Nous identifions les dispositifs auxquels vous avez droit et déposons avant la dépense.',
  },
  {
    titre: 'M&A et transmission',
    phrase: "Nous préparons la cession ou l'acquisition, de la valorisation jusqu'au closing.",
  },
  {
    titre: 'Structuration du développement',
    phrase: "Nous organisons les entités et consolidons les comptes d'un groupe qui grandit.",
  },
  {
    titre: 'Pilotage de la performance',
    phrase: 'Nous automatisons vos reportings et construisons les outils qui vous manquent.',
  },
];

/** Page Références. Aucun nom de client, aucun témoignage. */
export const REFERENCES: Reference[] = [
  {
    secteur: 'Imagerie médicale',
    objet: "Structuration et pilotage d'un groupe multi-entités",
    phrase: 'Consolidation de 15 entités, 200 000 patients analysés par an.',
    chiffre: '3 à 13 centres',
  },
  {
    secteur: "Distribution d'équipements",
    objet: 'Financement du développement et du stock',
    phrase: 'Business plan, modèle financier et dossier bancaire portés aux financeurs.',
    chiffre: '500 000 € recherchés',
  },
  {
    secteur: 'Réseau de santé de la femme',
    objet: "Financement de l'ouverture d'un centre",
    phrase: 'Crédit-bail sur les équipements et emprunt bancaire.',
    chiffre: '2 financements combinés',
  },
  {
    secteur: 'Plateforme numérique',
    objet: 'Structuration du financement de la croissance',
    phrase: 'Business plan redéfini et besoin de trésorerie chiffré.',
    chiffre: '3 voies comparées',
  },
  {
    secteur: 'Centre de santé pluridisciplinaire',
    objet: "Accompagnement complet, de l'étude au dossier ARS",
    phrase: "De l'étude du territoire au dossier ARS et au financement.",
    chiffre: '6 volets traités',
  },
  {
    secteur: 'Laboratoire de prothèses dentaires',
    objet: 'Cession de la société',
    phrase: 'Valorisation, dossier de cession et dataroom.',
  },
  {
    secteur: 'Exploitant de santé',
    objet: 'Récupération de subventions non appelées',
    phrase: 'Subventions ouvertes jamais demandées, identifiées puis sécurisées.',
  },
];

/** Page À propos, chiffres affichés en grand. */
export const CHIFFRES = [
  { valeur: '3 à 13', libelle: 'centres en 5 ans' },
  { valeur: '6 M€', libelle: 'levés en fonds propres' },
  { valeur: '7 M€', libelle: 'structurés en dette et crédit-bail' },
  { valeur: '3', libelle: 'acquisitions menées' },
] as const;

/** Page À propos, bloc fondateur. */
export const FONDATEUR = {
  nom: 'Sacha Bitoun',
  role: 'fondateur',
  formations: [
    'ESSEC Grande École, Finance Track',
    'Paris-Dauphine, mathématiques appliquées',
  ],
} as const;
