/**
 * Contenu éditorial. Texte définitif du cahier des charges, repris tel quel.
 * Ne rien ajouter ici sans validation : aucun chiffre, aucun nom de client,
 * aucun tarif qui ne figure pas au cahier des charges.
 */

import type { NomIcone } from '../components/Icone.astro';

export type Pilier = { titre: string; phrase: string; icone: NomIcone };
/** Un bloc coté : un picto, un titre, un texte court. */
export type Bloc = { titre: string; icone: NomIcone; texte: string };
export type Expertise = { titre: string; phrase: string; icone: NomIcone };
export type Reference = {
  secteur: string;
  objet: string;
  phrase: string;
  chiffre?: string;
};

/** Accueil, section « Qui sommes-nous ». */
export const PILIERS: Pilier[] = [
  { titre: 'Les chiffres', phrase: "Savoir où l'entreprise en est, chaque mois.", icone: 'donnee' },
  { titre: 'La structure', phrase: 'Des sociétés et des comptes qui suivent la croissance.', icone: 'groupe' },
  { titre: 'Les projets', phrase: 'Ouvrir, acquérir ou céder sans improviser.', icone: 'operation' },
  { titre: 'Les financements', phrase: "Aller chercher l'argent au moment où il en faut.", icone: 'financement' },
  { titre: 'Les outils', phrase: "Automatiser ce qui n'a pas à être refait à la main.", icone: 'pilotage' },
];


/*
  Les cotes de l'ouvrage, en haut de l'accueil.

  ATTENTION. Chaque valeur ci-dessous se vérifie dans le portfolio, et nulle
  part ailleurs. Aucun total cumulé n'y figure : ni montant levé global, ni
  nombre d'entreprises accompagnées, ni années d'expérience. Ces trois chiffres
  doivent venir du client avant d'apparaître ici.

  Toute valeur ajoutée sans source vérifiable est une invention, et une
  invention sur une page d'accueil est un faux.
*/
export type ChiffreCle = {
  valeur: string;
  libelle: string;
  /** D'où sort le chiffre. Obligatoire. */
  source: string;
};

export const CHIFFRES_CLES: ChiffreCle[] = [
  { valeur: '7', libelle: 'missions conduites', source: 'portfolio, sept missions' },
  { valeur: '7', libelle: "secteurs d'activité", source: 'portfolio, un secteur par mission' },
  { valeur: '15', libelle: 'entités consolidées', source: 'portfolio, mission imagerie médicale' },
  {
    valeur: '500 000 €',
    libelle: 'recherchés sur une opération',
    source: 'portfolio, mission distribution',
  },
];

/** Accueil, bande sombre. */
export const BANDE_ACCUEIL =
  "Intervention en temps partagé, aux côtés des équipes en place. Autour, un réseau d'experts-comptables et d'avocats, mobilisé au cas par cas.";

/** Page Expertises. */
export const EXPERTISES: Expertise[] = [
  {
    titre: 'Direction financière à temps partagé',
    icone: 'direction',
    phrase:
      'Vos comptes sont suivis et votre trésorerie tenue, sans recrutement.',
  },
  {
    titre: 'Financement',
    icone: 'financement',
    phrase:
      'Nous montons le dossier et mettons les financeurs en concurrence.',
  },
  {
    titre: 'Subventions et aides publiques',
    icone: 'subvention',
    phrase:
      'Nous trouvons les dispositifs ouverts et déposons avant la dépense.',
  },
  {
    titre: 'M&A et transmission',
    icone: 'transmission',
    phrase: "Nous préparons la cession ou l'acquisition, jusqu'au closing.",
  },
  {
    titre: 'Structuration du développement',
    icone: 'structuration',
    phrase: "Nous organisons les entités et consolidons les comptes du groupe.",
  },
  {
    titre: 'Pilotage de la performance',
    icone: 'pilotage',
    phrase: 'Nous automatisons vos reportings et construisons les outils manquants.',
  },
];

/** Page Références. Aucun nom de client, aucun témoignage. */
export const REFERENCES: Reference[] = [
  {
    secteur: 'Imagerie médicale',
    objet: "Structuration et pilotage d'un groupe multi-entités",
    phrase: 'Consolidation de 15 entités.',
    chiffre: '15 entités',
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
    objet: "Accompagnement complet, de l'étude au financement",
    phrase: "De l'étude du territoire au financement.",
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

/*
  ==================================================================
  CONTENU RÉDACTIONNEL ÉTENDU

  Le portfolio reste la seule source pour les données, les chiffres et les
  missions. Ce qui suit n'est pas de la donnée : c'est l'explication de
  l'offre, écrite pour le lecteur et pour les moteurs.

  Aucun chiffre nouveau, aucun nom de client, aucun tarif, aucun délai promis.
  Uniquement le vocabulaire réel du métier, qui est aussi le vocabulaire que
  les dirigeants tapent dans un moteur de recherche.
  ==================================================================
*/

/** Développé de chaque expertise, pour la page Expertises. */
export type ExpertiseDetail = Expertise & {
  developpe: string;
  couvre: string[];
  /** Renvoi vers une page qui développe l'expertise, quand elle existe. */
  renvoi?: { libelle: string; href: string };
};

export const EXPERTISES_DETAIL: ExpertiseDetail[] = [
  {
    titre: 'Direction financière à temps partagé',
    icone: 'direction',
    phrase:
      'Vos comptes sont suivis et votre trésorerie tenue, sans recrutement.',
    developpe:
      "Un DAF à temps partagé arrive déjà formé. Il coûte une fraction d'un recrutement. Nous tenons la trésorerie, le reporting et les points banque. Chaque décision est chiffrée avant d'être prise.",
    couvre: [
      'Prévisionnel de trésorerie et suivi du besoin en fonds de roulement',
      'Reporting mensuel, tableau de bord et indicateurs de pilotage',
      'Préparation des comités, des conseils et des points bancaires',
      'Budget annuel, atterrissage et analyse des écarts',
      'Relation avec l\'expert-comptable et le commissaire aux comptes',
    ],
  },
  {
    titre: 'Financement',
    icone: 'financement',
    phrase:
      'Nous montons le dossier et mettons les financeurs en concurrence.',
    developpe:
      "La plupart des dirigeants sollicitent une seule source. Ils acceptent la première proposition. Nous préparons le dossier comme un comité de crédit l'attend. Puis nous interrogeons plusieurs financeurs de front. Dilutif ou non dilutif, chaque voie a ses critères.",
    couvre: [
      'Financement de l\'amorçage et du lancement d\'une activité',
      'Levée de fonds en capital, du business plan à la table de capitalisation',
      'Dispositifs Bpifrance, prêts d\'honneur et avances remboursables',
      'Dossier bancaire, prévisionnel et plan de financement',
      'Mise en concurrence des banques et des organismes de financement',
      'Crédit-bail mobilier et immobilier pour le matériel',
      'Financement du besoin en fonds de roulement et du stock',
    ],
    renvoi: { libelle: 'Financer votre ambition', href: '/financement' },
  },
  {
    titre: 'Subventions et aides publiques',
    icone: 'subvention',
    phrase:
      'Nous trouvons les dispositifs ouverts et déposons avant la dépense.',
    developpe:
      "Le financement public se perd presque toujours de la même façon. Le dossier part après la dépense, et l'aide devient irrecevable. Nous cartographions les dispositifs ouverts à votre activité. Nous vérifions l'éligibilité, puis nous déposons dans les délais.",
    couvre: [
      'Cartographie des dispositifs nationaux, régionaux et sectoriels',
      'Vérification de l\'éligibilité avant tout engagement de dépense',
      'Montage et dépôt du dossier, suivi jusqu\'au versement',
      'Récupération des aides ouvertes et jamais sollicitées',
      'Articulation entre subvention, avance remboursable et prêt',
    ],
  },
  {
    titre: 'M&A et transmission',
    icone: 'transmission',
    phrase: "Nous préparons la cession ou l'acquisition, jusqu'au closing.",
    developpe:
      "Une opération se gagne dans la préparation. Côté vendeur, des comptes au propre tiennent le prix pendant la due diligence. Côté acheteur, nous chiffrons la cible et cadrons la lettre d'intention.",
    couvre: [
      'Valorisation et travaux préparatoires à la cession',
      'Dataroom, documentation et réponses à la due diligence',
      'Lettre d\'intention, protocole et accompagnement jusqu\'au closing',
      'Analyse de cible et plan de financement de l\'acquisition',
      'Intégration post-acquisition et consolidation des comptes',
    ],
  },
  {
    titre: 'Structuration du développement',
    icone: 'structuration',
    phrase: "Nous organisons les entités et consolidons les comptes du groupe.",
    developpe:
      "Les entités s'accumulent plus vite qu'on n'organise leur lecture. Nous posons la structure juridique et comptable qui suit la croissance. Puis la consolidation, qui donne enfin une vision de groupe.",
    couvre: [
      'Schéma de détention, holding et organisation des filiales',
      'Consolidation des comptes et vision de groupe',
      'Flux intragroupe, conventions et refacturation',
      'Ouverture de sites, plan d\'investissement et suivi des travaux',
      'Harmonisation des plans comptables et des référentiels',
    ],
  },
  {
    titre: 'Pilotage de la performance',
    icone: 'pilotage',
    phrase: 'Nous automatisons vos reportings et construisons les outils manquants.',
    developpe:
      "Beaucoup d'équipes refont à la main un reporting qui pourrait se produire seul. Nous branchons les sources et automatisons la collecte. Le temps récupéré retourne à l'analyse.",
    couvre: [
      'Automatisation de la collecte et de la consolidation des données',
      'Tableaux de bord et indicateurs adaptés à l\'activité',
      'Suivi de la marge, du chiffre d\'affaires et des coûts',
      'Outils sur mesure quand aucun logiciel du marché ne convient',
      'Fiabilisation et contrôle de cohérence des données',
    ],
  },
];

/** Les situations qui déclenchent un appel. Page d'accueil. */
export const SITUATIONS: Bloc[] = [
  {
    titre: 'Vous lancez et vous cherchez vos premiers financements',
    icone: 'lancement',
    texte:
      "Le projet existe et l'activité démarre. Le financement conditionne le reste. Amorçage, dispositifs publics ou ouverture du capital : tout se joue sur le dossier.",
  },
  {
    titre: 'Votre croissance dépasse votre structure financière',
    icone: 'croissance',
    texte:
      "Le chiffre d'affaires progresse. Personne ne sait dire où en est la trésorerie avant la fin du mois. Les décisions se prennent au ressenti.",
  },
  {
    titre: 'Vous devez financer un projet et vous ne savez pas par où commencer',
    icone: 'financement',
    texte:
      "Une ouverture, un rachat, du matériel. Le besoin est identifié. Le montage reste à construire, et une seule banque a été sollicitée.",
  },
  {
    titre: 'Votre groupe a grandi plus vite que son organisation',
    icone: 'groupe',
    texte:
      "Les entités se sont multipliées au fil des opérations. Chacune a ses comptes, aucune ne donne la vision d'ensemble.",
  },
  {
    titre: 'Vous préparez une cession ou une acquisition',
    icone: 'operation',
    texte:
      "L'opération se prépare des mois à l'avance. Des comptes mal tenus coûtent cher en négociation.",
  },
];

/** Questions posées en premier rendez-vous. Page d'accueil. */
export const QUESTIONS = [
  {
    q: "Qu'est-ce qu'une direction financière à temps partagé ?",
    r: "Un directeur financier expérimenté intervient quelques jours par mois. Vous avez le même niveau d'expertise. Sans le coût d'un plein temps, ni le délai d'un recrutement.",
  },
  {
    q: 'À partir de quelle taille est-ce pertinent ?',
    r: "Le besoin apparaît quand les sujets financiers débordent du temps du dirigeant. C'est souvent avant qu'un plein temps se justifie. La complexité du dossier décide, davantage que le chiffre d'affaires.",
  },
  {
    q: 'En quoi est-ce différent de mon expert-comptable ?',
    r: "L'expert-comptable produit et certifie les comptes passés. Nous travaillons sur les décisions à venir. Et avec le vôtre.",
  },
  {
    q: 'Comment se déroule une intervention ?',
    r: "Elle se fait en temps partagé, aux côtés des équipes en place. Un réseau d'experts-comptables et d'avocats vient en appui. Elle se réduit dès que le sujet tourne seul.",
  },
  {
    q: 'Peut-on ne prendre qu\'une seule expertise ?',
    r: "Oui. Les six expertises se prennent séparées ou combinées.",
  },
  {
    q: 'Accompagnez-vous les créations et les amorçages ?',
    r: "Oui, au même titre qu'une entreprise installée. Un projet qui démarre a besoin d'un business plan tenu. Et d'un plan de financement crédible, avant la première rencontre.",
  },
  {
    q: 'Quelle différence entre financement dilutif et non dilutif ?',
    r: "Le dilutif apporte de l'argent contre une part du capital. Le non dilutif le laisse intact : dette bancaire, crédit-bail, dispositifs Bpifrance. L'ordre dans lequel on les sollicite change le résultat.",
  },
  {
    q: 'Intervenez-vous en dehors de Paris ?',
    r: "Le cabinet est basé à Paris et intervient partout en France. Une grande partie du travail se fait à distance.",
  },
];

/** Les deux voies du financement. Section « Financer votre ambition ». */
export const VOIES_FINANCEMENT: (Bloc & { accroche: string; lignes: string[] })[] = [
  {
    titre: 'Non dilutif',
    icone: 'nondilutif',
    accroche: 'Vous gardez la totalité de votre capital.',
    texte:
      "La dette, le crédit-bail et les dispositifs publics ne touchent pas au capital. Ce sont les sources les moins sollicitées. Elles demandent un dossier construit et un calendrier tenu.",
    lignes: [
      'Prêts bancaires et plan de financement',
      'Dispositifs Bpifrance et avances remboursables',
      'Subventions et aides publiques régionales ou sectorielles',
      'Crédit-bail mobilier et immobilier',
      "Prêts d'honneur au lancement",
    ],
  },
  {
    titre: 'Dilutif',
    icone: 'dilutif',
    accroche: 'Vous ouvrez le capital pour aller plus vite.',
    texte:
      "Une levée finance ce qu'une banque refuse de porter. L'investisseur prend en échange une part de l'entreprise. Le tour se prépare des mois avant la première rencontre.",
    lignes: [
      'Business plan et modèle financier investisseur',
      "Préparation de l'amorçage et du premier tour",
      'Valorisation et table de capitalisation',
      'Documentation et réponses aux questions des fonds',
      'Articulation avec les financements non dilutifs',
    ],
  },
];

/** Les étapes d'une recherche de financement. Page /financement. */
export const ETAPES_FINANCEMENT: Bloc[] = [
  {
    titre: 'Cadrer le besoin',
    icone: 'cadrer',
    texte:
      "Combien, pour quoi, à quelle échéance. Un besoin de trésorerie et un achat de matériel n'appellent pas les mêmes financeurs.",
  },
  {
    titre: 'Construire le dossier',
    icone: 'dossier',
    texte:
      "Business plan, modèle financier, plan de financement. Chaque hypothèse sera testée par un analyste.",
  },
  {
    titre: 'Ouvrir plusieurs portes en parallèle',
    icone: 'parallele',
    texte:
      "Nous ouvrons plusieurs portes en même temps : banques, Bpifrance, guichets régionaux. Plusieurs discussions de front changent le rapport de force.",
  },
  {
    titre: 'Négocier et boucler',
    icone: 'negocier',
    texte:
      "Le taux, la durée et les garanties se discutent. Nous restons en face du financeur jusqu'au déblocage des fonds.",
  },
];

/** Le financement de l'amorçage. Page /financement. */
export const AMORCAGE = {
  icone: 'lancement' as const,
  titre: "L'amorçage",
  chapo:
    "Un projet qui démarre se finance autrement. Il n'a pas d'historique comptable à montrer. Le financeur regarde le dossier, le marché et le porteur.",
  texte:
    "Nous accompagnons le lancement et les premiers tours de table. Le travail commence avant la recherche de fonds. Un business plan doit tenir devant un comité d'engagement.",
  lignes: [
    "Prêts d'honneur et réseaux d'accompagnement à la création",
    "Subventions à l'innovation et aides au lancement",
    'Bourse French Tech et dispositifs Bpifrance pour les jeunes entreprises',
    'Premier tour de table et entrée de business angels',
    'Articulation entre apport personnel, dette et capital',
  ],
};
