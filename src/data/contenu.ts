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
    phrase:
      'Vos comptes sont suivis, votre trésorerie tenue et vos décisions chiffrées, sans recrutement.',
    developpe:
      "Un directeur financier à temps partagé coûte une fraction d'un recrutement et arrive déjà formé. Nous tenons le prévisionnel de trésorerie, nous produisons le reporting mensuel, nous préparons les points banque et les conseils. Quand une décision engage l'entreprise, elle est chiffrée avant d'être prise. L'intervention se règle en jours par mois et se réduit dès que vos équipes reprennent la main.",
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
    phrase:
      'Nous montons le dossier et mettons les financeurs en concurrence, quelle que soit la source.',
    developpe:
      "La plupart des dirigeants ne sollicitent qu'une seule source et acceptent la première proposition. Nous construisons le business plan et le modèle financier, nous préparons le dossier tel qu'un comité de crédit l'attend, puis nous interrogeons plusieurs financeurs en parallèle. Chaque source a ses propres critères d'analyse, et le dossier se prépare différemment selon celle que l'on vise. Nous couvrons les deux voies. Le financement dilutif ouvre le capital à des investisseurs. Le financement non dilutif laisse le capital intact et passe par la dette, le crédit-bail ou les dispositifs publics.",
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
    phrase:
      'Nous identifions les dispositifs auxquels vous avez droit et déposons avant la dépense.',
    developpe:
      "Le financement public se perd presque toujours pour la même raison : le dossier est déposé après l'engagement de la dépense, ce qui rend l'aide irrecevable. Nous cartographions les dispositifs ouverts à votre activité et à votre territoire, nous vérifions l'éligibilité, puis nous déposons dans les délais. Nous reprenons aussi les aides déjà ouvertes qui n'ont jamais été demandées.",
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
    phrase: "Nous préparons la cession ou l'acquisition, de la valorisation jusqu'au closing.",
    developpe:
      "Une opération se gagne avant la négociation, dans la qualité de la préparation. Côté vendeur, nous mettons les comptes au propre, nous construisons la valorisation et nous montons la dataroom pour que la due diligence ne fasse pas baisser le prix. Côté acheteur, nous chiffrons la cible, nous cadrons la lettre d'intention et nous suivons l'intégration une fois l'acte signé.",
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
    phrase: "Nous organisons les entités et consolidons les comptes d'un groupe qui grandit.",
    developpe:
      "Une entreprise qui ouvre des sites ou rachète des sociétés accumule des entités plus vite qu'elle n'organise leur lecture. Nous mettons en place la structure juridique et comptable qui suit la croissance : holding, filiales, flux entre entités, conventions, et surtout une consolidation qui donne enfin une vision de groupe. L'objectif est qu'un seul état permette de décider.",
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
    phrase: 'Nous automatisons vos reportings et construisons les outils qui vous manquent.',
    developpe:
      "Beaucoup d'équipes passent plusieurs jours par mois à refaire à la main un reporting qui pourrait se produire seul. Nous branchons les sources, nous automatisons la collecte et nous construisons le tableau de bord qui manque, avec les indicateurs qui comptent pour votre activité. Le temps récupéré retourne à l'analyse.",
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
export const SITUATIONS = [
  {
    titre: 'Vous lancez et vous cherchez vos premiers financements',
    texte:
      "Le projet existe, l'activité démarre, et le financement conditionne tout le reste. Amorçage, premiers dispositifs publics, prêts d'honneur, ouverture du capital. Chaque voie se prépare différemment et se joue sur la qualité du dossier.",
  },
  {
    titre: 'Votre croissance dépasse votre structure financière',
    texte:
      "Le chiffre d'affaires progresse, mais personne ne sait dire où en est la trésorerie avant la fin du mois. Les décisions se prennent au ressenti faute de chiffres à jour, et le sujet finit toujours sur le bureau du dirigeant.",
  },
  {
    titre: 'Vous devez financer un projet et vous ne savez pas par où commencer',
    texte:
      "Une ouverture, un rachat, du matériel, du stock. Le besoin est identifié. Le montage financier reste à construire. Une seule banque a été sollicitée, et la réponse conditionne tout le projet.",
  },
  {
    titre: 'Votre groupe a grandi plus vite que son organisation',
    texte:
      "Les entités se sont multipliées au fil des opérations. Chacune a ses comptes, aucune ne donne la vision d'ensemble, et la consolidation reste un chantier repoussé.",
  },
  {
    titre: 'Vous préparez une cession ou une acquisition',
    texte:
      "L'opération se prépare des mois à l'avance. Des comptes mal tenus et une dataroom improvisée coûtent en négociation bien plus cher que le travail de préparation.",
  },
];

/** Questions posées en premier rendez-vous. Page d'accueil. */
export const QUESTIONS = [
  {
    q: "Qu'est-ce qu'une direction financière à temps partagé ?",
    r: "Un directeur financier expérimenté intervient quelques jours par mois dans votre entreprise, au lieu d'être recruté à plein temps. Vous obtenez le même niveau d'expertise sur les sujets qui le demandent, sans en supporter le coût complet ni le délai de recrutement.",
  },
  {
    q: 'À partir de quelle taille est-ce pertinent ?',
    r: "Le besoin apparaît quand les sujets financiers ne tiennent plus dans le temps du dirigeant, et avant qu'ils ne justifient un recrutement à plein temps. La complexité du dossier décide, davantage que le chiffre d'affaires. Plusieurs entités à consolider, ou une opération de financement à monter.",
  },
  {
    q: 'En quoi est-ce différent de mon expert-comptable ?',
    r: "L'expert-comptable produit et certifie les comptes passés. Nous travaillons sur les décisions à venir, comme le prévisionnel de trésorerie ou le montage d'un financement. Les deux rôles sont complémentaires. Nous travaillons avec le vôtre.",
  },
  {
    q: 'Comment se déroule une intervention ?',
    r: "L'intervention se fait en temps partagé, aux côtés des équipes en place. Autour, un réseau d'experts-comptables, d'avocats et de spécialistes est mobilisé au cas par cas selon le dossier. Elle se réduit dès que le sujet tourne seul.",
  },
  {
    q: 'Peut-on ne prendre qu\'une seule expertise ?',
    r: "Oui. Les six expertises se prennent séparées ou combinées. Vous prenez ce dont vous avez besoin, au moment où vous en avez besoin.",
  },
  {
    q: 'Accompagnez-vous les créations et les amorçages ?',
    r: "Oui. Le financement de l'amorçage fait partie du travail, au même titre que celui d'une entreprise installée. Un projet qui démarre a besoin d'un business plan tenu par ses hypothèses et d'un plan de financement crédible, avant même de rencontrer un financeur.",
  },
  {
    q: 'Quelle différence entre financement dilutif et non dilutif ?',
    r: "Le financement dilutif apporte de l'argent en échange d'une part du capital. Le non dilutif laisse le capital intact et passe par la dette bancaire, le crédit-bail ou les dispositifs publics comme ceux de Bpifrance. Les deux se combinent souvent sur un même projet, et l'ordre dans lequel on les sollicite change beaucoup le résultat.",
  },
  {
    q: 'Intervenez-vous en dehors de Paris ?',
    r: "Le cabinet est basé à Paris et intervient sur toute la France. Une grande partie du travail se fait à distance, avec des points sur site aux moments qui le demandent.",
  },
];

/** Les deux voies du financement. Section « Financer votre ambition ». */
export const VOIES_FINANCEMENT = [
  {
    titre: 'Non dilutif',
    accroche: 'Vous gardez la totalité de votre capital.',
    texte:
      "La dette bancaire, le crédit-bail et les dispositifs publics financent un projet sans toucher à la répartition du capital. Ce sont souvent les sources les moins sollicitées, parce qu'elles demandent un dossier plus construit et un calendrier tenu.",
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
    accroche: 'Vous ouvrez le capital pour aller plus vite.',
    texte:
      "Une levée de fonds finance ce qu'une banque refuse de porter, un développement long ou une conquête de marché. L'investisseur prend en échange une part de l'entreprise. Un tour se prépare des mois à l'avance, et sa réussite tient au dossier autant qu'à la rencontre avec le bon fonds.",
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
export const ETAPES_FINANCEMENT = [
  {
    titre: 'Cadrer le besoin',
    texte:
      "Combien, pour quoi, à quelle échéance. Un besoin de trésorerie court, un investissement matériel et une accélération commerciale n'appellent pas les mêmes financeurs. Le cadrage détermine la suite.",
  },
  {
    titre: 'Construire le dossier',
    texte:
      "Business plan, modèle financier, plan de financement, prévisionnel de trésorerie. Chaque hypothèse doit se défendre devant un analyste qui la testera. Un dossier solide raccourcit la négociation.",
  },
  {
    titre: 'Ouvrir plusieurs portes en parallèle',
    texte:
      "Nous sollicitons en même temps les banques, Bpifrance, les guichets régionaux et, selon le projet, les investisseurs. Interroger une seule source revient à accepter ses conditions. Plusieurs discussions menées de front changent le rapport de force.",
  },
  {
    titre: 'Négocier et boucler',
    texte:
      "Le taux, la durée, les garanties et les covenants se discutent, comme la valorisation et le pacte d'associés dans un tour de table. Ces conditions pèsent longtemps après la signature. Nous restons en face du financeur jusqu'au déblocage des fonds.",
  },
];

/** Le financement de l'amorçage. Page /financement. */
export const AMORCAGE = {
  titre: "L'amorçage",
  chapo:
    "Un projet qui démarre se finance différemment d'une entreprise installée. Il n'a pas d'historique comptable à présenter, et le financeur regarde alors le dossier, le marché et le porteur.",
  texte:
    "Nous accompagnons le lancement et les premiers tours de table. Le travail commence avant la recherche de fonds, par un business plan dont les hypothèses tiennent devant un investisseur ou un comité d'engagement. Beaucoup de dispositifs existent au démarrage, et rares sont les créateurs qui les connaissent tous.",
  lignes: [
    "Prêts d'honneur et réseaux d'accompagnement à la création",
    "Subventions à l'innovation et aides au lancement",
    'Bourse French Tech et dispositifs Bpifrance pour les jeunes entreprises',
    'Premier tour de table et entrée de business angels',
    'Articulation entre apport personnel, dette et capital',
  ],
};
