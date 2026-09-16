/**
 * Les pages d'expertise, une par prestation.
 *
 * Régime rédactionnel, pas factuel. Ces pages expliquent un métier : elles
 * n'introduisent aucun chiffre de mission, aucun nom de client, aucun tarif et
 * aucun délai promis. Les chiffres du portfolio restent dans les références.
 *
 * Le financement a déjà sa page, `/financement`, plus large que les autres :
 * elle couvre les deux voies, l'amorçage et le financement public. Elle n'est
 * donc pas dupliquée ici, et la liste des expertises pointe vers elle.
 *
 * Contrainte d'écriture tenue partout : seize mots par phrase au maximum.
 */
import type { NomIcone } from '../components/Icone.astro';

export type PageExpertise = {
  slug: string;
  icone: NomIcone;
  /** Le titre de la page, tel qu'il s'affiche en h1. */
  titre: string;
  /** Le titre de l'onglet, sans le suffixe de marque. */
  titreMeta: string;
  description: string;
  chapo: string;
  pourQui: string[];
  sections: { titre: string; paragraphes: string[] }[];
  livrables: string[];
  questions: { q: string; r: string }[];
  /** Fiches du lexique à mettre en regard. */
  lexique: string[];
};

export const PAGES_EXPERTISE: PageExpertise[] = [
  {
    slug: 'direction-financiere-a-temps-partage',
    icone: 'direction',
    titre: 'Direction financière à temps partagé',
    titreMeta: 'DAF à temps partagé à Paris',
    description:
      "Un directeur financier expérimenté quelques jours par mois. Trésorerie, reporting, budget et relation bancaire, sans recrutement à plein temps.",
    chapo:
      "Un directeur financier expérimenté intervient quelques jours par mois. Il arrive formé, sur les sujets que personne en interne ne porte.",
    pourQui: [
      'Un dirigeant qui porte encore seul les sujets financiers',
      'Une entreprise qui grandit plus vite que ses outils de pilotage',
      "Un groupe qui a besoin d'un DAF sans pouvoir en financer un à plein temps",
      'Une société entre deux directeurs financiers',
    ],
    sections: [
      {
        titre: 'Ce que change un DAF à temps partagé',
        paragraphes: [
          "Le dirigeant récupère du temps. Les sujets financiers sortent de sa liste et reviennent traités.",
          "Les décisions se chiffrent avant d'être prises. Un investissement, un recrutement, une ouverture de site.",
          "La banque trouve en face un interlocuteur qui parle sa langue. Les dossiers passent mieux, et plus vite.",
        ],
      },
      {
        titre: "Le rythme de l'intervention",
        paragraphes: [
          "Le volume se règle en jours par mois. Il monte pendant une opération, il redescend ensuite.",
          "Un rendez-vous mensuel tient le cap. Le reporting arrive avant la réunion, jamais pendant.",
          "L'intervention se réduit dès que vos équipes reprennent la main. C'est le but, pas un accident.",
        ],
      },
      {
        titre: 'Ce qui le distingue du conseil',
        paragraphes: [
          "Un consultant remet une recommandation. Un directeur financier à temps partagé tient un poste.",
          "Il signe les chiffres, il va devant la banque, il porte le sujet jusqu'au bout.",
          "Il travaille avec vos équipes et votre expert-comptable. Pas à côté d'eux, ni à leur place.",
        ],
      },
    ],
    livrables: [
      'Prévisionnel de trésorerie tenu à jour',
      'Reporting mensuel et tableau de bord de pilotage',
      'Budget annuel, atterrissage et analyse des écarts',
      'Préparation des comités, des conseils et des points bancaires',
      "Relation avec l'expert-comptable et le commissaire aux comptes",
    ],
    questions: [
      {
        q: 'À partir de quel moment un DAF à temps partagé se justifie ?',
        r: "Quand les sujets financiers débordent du temps du dirigeant. Et avant qu'un plein temps se justifie.",
      },
      {
        q: 'Combien de jours par mois ?',
        r: "Le volume dépend du dossier. Il se fixe au départ, puis se révise. Il baisse quand le sujet tourne seul.",
      },
      {
        q: "Remplacez-vous l'expert-comptable ?",
        r: "Non. Il produit et certifie les comptes passés. Nous travaillons sur les décisions à venir, avec lui.",
      },
      {
        q: 'Travaillez-vous avec les équipes en place ?',
        r: "Oui. L'intervention se fait à leurs côtés. Un réseau d'experts-comptables et d'avocats vient en appui.",
      },
    ],
    lexique: ['previsionnel-de-tresorerie', 'besoin-en-fonds-de-roulement', 'business-plan'],
  },

  {
    slug: 'subventions-et-aides-publiques',
    icone: 'subvention',
    titre: 'Subventions et aides publiques',
    titreMeta: 'Subventions et aides publiques',
    description:
      "Cartographie des dispositifs ouverts à votre activité, vérification de l'éligibilité et dépôt dans les délais. Avant la dépense.",
    chapo:
      "Le financement public se perd presque toujours de la même façon. Le dossier part après la dépense, et l'aide devient irrecevable.",
    pourQui: [
      'Une entreprise qui prépare un investissement ou un recrutement',
      "Un projet d'innovation, de transition ou d'équipement",
      "Une société qui n'a jamais sollicité de dispositif public",
      'Une entreprise qui soupçonne avoir laissé passer des aides',
    ],
    sections: [
      {
        titre: "La règle qui décide de tout : l'antériorité",
        paragraphes: [
          "Un dispositif public finance un projet à venir. Il ne rembourse pas une dépense déjà engagée.",
          "Un bon de commande signé avant le dépôt suffit à rendre un dossier irrecevable.",
          "Le calendrier passe donc avant le montage. Nous déposons d'abord, vous engagez ensuite.",
        ],
      },
      {
        titre: 'Où se trouvent les dispositifs',
        paragraphes: [
          "Les aides se répartissent entre le national, le régional et les filières professionnelles.",
          "Bpifrance couvre le national, avec des dispositifs lisibles et des critères stables.",
          "Les régions publient leurs propres aides. Elles changent chaque année, et personne ne les recense pour vous.",
        ],
      },
      {
        titre: 'Les aides ouvertes et jamais demandées',
        paragraphes: [
          "Beaucoup d'entreprises remplissent les critères d'un dispositif sans jamais l'avoir su.",
          "Nous reprenons l'historique récent et vérifions ce qui reste récupérable.",
        ],
      },
    ],
    livrables: [
      'Cartographie des dispositifs nationaux, régionaux et sectoriels',
      "Vérification de l'éligibilité avant tout engagement de dépense",
      'Montage et dépôt du dossier',
      "Suivi de l'instruction jusqu'au versement effectif",
      'Articulation entre subvention, avance remboursable et prêt',
    ],
    questions: [
      {
        q: "Peut-on demander une aide après avoir engagé la dépense ?",
        r: "Presque jamais. La plupart des dispositifs exigent que le projet n'ait pas démarré. C'est le premier motif de rejet.",
      },
      {
        q: 'Une subvention se cumule-t-elle avec un prêt ?',
        r: "Souvent, oui. Et l'ordre compte : une subvention obtenue renforce le dossier présenté à la banque.",
      },
      {
        q: 'Combien de temps prend un dossier ?',
        r: "Cela dépend du guichet. Le montage se compte en semaines, l'instruction en mois.",
      },
      {
        q: 'Récupérez-vous des aides anciennes ?',
        r: "Parfois. Certains dispositifs restent ouverts après le fait générateur. Nous vérifions l'historique récent.",
      },
    ],
    lexique: ['bpifrance', 'avance-remboursable', 'pret-d-honneur'],
  },

  {
    slug: 'm-a-et-transmission',
    icone: 'transmission',
    titre: 'M&A et transmission',
    titreMeta: "M&A et transmission d'entreprise",
    description:
      "Cession ou acquisition, de la valorisation au closing. Comptes tenus, dataroom, réponses à la due diligence et protocole.",
    chapo:
      "Une opération se gagne dans la préparation. Des comptes mal tenus coûtent cher au moment de la négociation.",
    pourQui: [
      'Un dirigeant qui prépare la cession de sa société',
      'Un repreneur qui veut chiffrer une cible',
      'Un groupe en croissance externe',
      'Un associé qui organise sa sortie',
    ],
    sections: [
      {
        titre: 'Côté vendeur',
        paragraphes: [
          "La due diligence cherche des raisons de baisser le prix. Elle en trouve quand les comptes sont approximatifs.",
          "Nous mettons les comptes au propre et construisons la valorisation. La dataroom se monte avant les premières discussions.",
          "Un dossier tenu raccourcit l'audit et protège le prix annoncé.",
        ],
      },
      {
        titre: 'Côté acheteur',
        paragraphes: [
          "Nous chiffrons la cible et testons les hypothèses du vendeur, une par une.",
          "Le plan de financement de l'acquisition se monte en parallèle de la lettre d'intention.",
          "L'intégration commence le jour du closing. Pas six mois après, quand les écarts sont installés.",
        ],
      },
      {
        titre: 'Ce qui fait échouer une opération',
        paragraphes: [
          "Un vendeur qui découvre ses propres chiffres pendant l'audit perd la main sur le prix.",
          "Un acheteur dont le financement n'est pas sécurisé fait traîner, et le doute s'installe.",
        ],
      },
    ],
    livrables: [
      'Valorisation et travaux préparatoires à la cession',
      'Dataroom, documentation et réponses à la due diligence',
      "Lettre d'intention, protocole et accompagnement jusqu'au closing",
      "Analyse de cible et plan de financement de l'acquisition",
      'Intégration post-acquisition et consolidation des comptes',
    ],
    questions: [
      {
        q: 'Quand commencer à préparer une cession ?',
        r: "Des mois avant la mise en vente. Les exercices que l'acquéreur examinera se préparent en amont.",
      },
      {
        q: "Faut-il un banquier d'affaires ?",
        r: "Sur une grande opération, oui. Sur une PME, la préparation financière pèse souvent plus que l'intermédiation.",
      },
      {
        q: 'Intervenez-vous côté acheteur ?',
        r: "Oui. Chiffrage de la cible, plan de financement de l'acquisition, puis intégration.",
      },
      {
        q: 'Que contient une dataroom ?',
        r: "Les comptes, les contrats, les baux, le social et le juridique. Tout ce que l'audit demandera.",
      },
    ],
    lexique: ['valorisation-d-entreprise', 'due-diligence', 'dataroom'],
  },

  {
    slug: 'structuration-du-developpement',
    icone: 'structuration',
    titre: 'Structuration du développement',
    titreMeta: 'Structuration de groupe et consolidation',
    description:
      "Holding, filiales, flux intragroupe et consolidation des comptes. Une vision de groupe qui permet enfin de décider.",
    chapo:
      "Les entités s'accumulent plus vite qu'on n'organise leur lecture. Chacune a ses comptes, aucune ne donne la vision d'ensemble.",
    pourQui: [
      'Un groupe né de plusieurs opérations successives',
      'Une entreprise qui ouvre des sites',
      'Un dirigeant qui additionne des tableaux au lieu de lire un état',
      'Une société qui prépare une levée ou une cession',
    ],
    sections: [
      {
        titre: "Poser la structure avant d'en avoir besoin",
        paragraphes: [
          "Une holding se crée plus facilement avant la troisième filiale qu'après la sixième.",
          "Le schéma de détention décide de la fiscalité, du financement et des conditions de sortie.",
          "Une restructuration tardive coûte en temps, en frais et en impôt.",
        ],
      },
      {
        titre: 'Faire parler les entités ensemble',
        paragraphes: [
          "La consolidation produit un seul état pour l'ensemble du groupe.",
          "Sans elle, le dirigeant additionne des tableaux qui ne se comparent pas.",
          "Les plans comptables s'harmonisent d'abord. La consolidation vient après, et elle tient.",
        ],
      },
      {
        titre: 'Les flux entre sociétés',
        paragraphes: [
          "Refacturation, management fees, convention de trésorerie. Chaque flux doit avoir sa convention.",
          "Et une justification économique, parce que c'est ce que regarde l'administration.",
          "Un acquéreur regarde la même chose, avec la même attention.",
        ],
      },
    ],
    livrables: [
      'Schéma de détention, holding et organisation des filiales',
      'Consolidation des comptes et vision de groupe',
      'Flux intragroupe, conventions et refacturation',
      'Harmonisation des plans comptables et des référentiels',
      "Ouverture de sites, plan d'investissement et suivi des travaux",
    ],
    questions: [
      {
        q: "À partir de combien d'entités faut-il consolider ?",
        r: "Dès que deux sociétés se financent l'une l'autre. Le besoin arrive avant l'obligation légale.",
      },
      {
        q: 'Une holding sert-elle seulement à la fiscalité ?',
        r: "Non. Elle porte la dette, organise la détention et prépare la transmission.",
      },
      {
        q: 'Faut-il un logiciel de consolidation ?',
        r: "Pas toujours. Sur un petit groupe, un référentiel commun et un modèle tenu suffisent.",
      },
      {
        q: 'Qui produit les comptes consolidés ?',
        r: "L'expert-comptable ou le commissaire aux comptes les certifie. Nous préparons la matière et le référentiel.",
      },
    ],
    lexique: ['holding', 'consolidation-des-comptes', 'covenant-bancaire'],
  },

  {
    slug: 'pilotage-de-la-performance',
    icone: 'pilotage',
    titre: 'Pilotage de la performance',
    titreMeta: 'Pilotage, reporting et tableaux de bord',
    description:
      "Automatisation de la collecte, tableaux de bord et indicateurs adaptés à votre activité. Le temps récupéré retourne à l'analyse.",
    chapo:
      "Beaucoup d'équipes refont à la main un reporting qui pourrait se produire seul. Le temps passé à produire le chiffre ne sert pas à le comprendre.",
    pourQui: [
      'Une équipe qui perd des jours par mois en ressaisie',
      'Un dirigeant qui reçoit ses chiffres trop tard pour agir',
      "Une activité dont aucun logiciel du marché ne suit la marge",
      'Un groupe dont les entités ne se comparent pas',
    ],
    sections: [
      {
        titre: 'Automatiser la collecte',
        paragraphes: [
          "Les données existent déjà, dans la comptabilité, la facturation et la paie.",
          "Nous branchons les sources et supprimons les ressaisies.",
          "Une donnée saisie deux fois finit toujours par diverger.",
        ],
      },
      {
        titre: 'Choisir les indicateurs qui décident',
        paragraphes: [
          "Un tableau de bord utile tient sur un écran.",
          "Les indicateurs se choisissent selon les décisions à prendre, jamais selon la facilité de mesure.",
          "Marge par activité, délai de règlement client, point mort. Le reste attend son tour.",
        ],
      },
      {
        titre: 'Construire quand rien ne convient',
        paragraphes: [
          "Certains métiers n'ont pas de logiciel adapté, et le tableur finit par tout porter.",
          "Nous construisons l'outil qui manque, avec les données de l'entreprise.",
        ],
      },
    ],
    livrables: [
      'Automatisation de la collecte et de la consolidation des données',
      "Tableaux de bord et indicateurs adaptés à l'activité",
      "Suivi de la marge, du chiffre d'affaires et des coûts",
      'Outils sur mesure quand aucun logiciel du marché ne convient',
      'Fiabilisation et contrôle de cohérence des données',
    ],
    questions: [
      {
        q: 'Faut-il changer de logiciel comptable ?',
        r: "Rarement. La plupart des outils exportent ce qu'il faut. Le problème se situe en aval.",
      },
      {
        q: 'Combien de temps pour un premier tableau de bord ?',
        r: "Quelques semaines pour une première version utile. Elle se corrige ensuite à l'usage.",
      },
      {
        q: "Qui maintient l'outil ensuite ?",
        r: "Vos équipes. L'outil est construit pour tenir sans nous.",
      },
      {
        q: 'Travaillez-vous avec les données de la paie ?',
        r: "Oui, quand la masse salariale pèse dans le pilotage de la marge.",
      },
    ],
    lexique: ['besoin-en-fonds-de-roulement', 'consolidation-des-comptes'],
  },
];

export const parSlugExpertise = (slug: string) =>
  PAGES_EXPERTISE.find((p) => p.slug === slug);
