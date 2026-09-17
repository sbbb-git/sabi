/**
 * Le lexique. Une fiche par notion que le cabinet pratique réellement.
 *
 * Pourquoi ces pages existent. Un dirigeant qui cherche « c'est quoi une
 * avance remboursable » ne cherche pas encore un cabinet. Il cherche à
 * comprendre. La fiche répond à sa question, et lui montre au passage qui
 * sait en parler. C'est la seule façon d'exister sur des recherches réelles
 * sans écrire de la publicité déguisée.
 *
 * Règles tenues sur chaque fiche :
 *
 * - La définition d'ouverture tient en une phrase. Elle doit pouvoir être
 *   citée telle quelle, hors contexte, sans devenir fausse.
 * - Seize mots par phrase au maximum.
 * - Aucun chiffre qui ne soit pas une règle publique et vérifiable. Aucun
 *   montant de mission, aucun tarif, aucun délai promis.
 * - Chaque fiche renvoie à l'expertise qui la met en œuvre, et à ses
 *   voisines. Une fiche isolée ne sert ni le lecteur ni le moteur.
 */
export type Fiche = {
  slug: string;
  /** Le terme, tel qu'il s'affiche en titre. */
  terme: string;
  /** Le titre de l'onglet, sans le suffixe de marque. */
  titreMeta: string;
  /** Autres façons de le chercher. Affichées, et utiles au moteur. */
  aussi?: string[];
  famille: 'Financement' | 'Structure' | 'Opérations' | 'Pilotage';
  /** Une phrase. Citable seule. */
  definition: string;
  corps: { titre: string; paragraphes: string[] }[];
  aRetenir: string[];
  expertise?: { libelle: string; href: string };
  voisins: string[];
};

export const FICHES: Fiche[] = [
  {
    slug: 'business-plan',
    terme: 'Le business plan',
    titreMeta: "Business plan : ce qu'un financeur y cherche",
    aussi: ["plan d'affaires", "BP"],
    famille: 'Financement',
    definition:
      "Le business plan traduit un projet d'entreprise en chiffres, sur trois à cinq ans.",
    corps: [
      {
        titre: "Ce qu'un financeur y cherche",
        paragraphes: [
          "Un financeur ne lit pas le business plan pour se laisser convaincre. Il le lit pour tester vos hypothèses.",
          "Chaque ligne doit pouvoir se défendre. D'où vient ce taux de croissance, ce prix moyen, ce délai d'encaissement.",
          "Une hypothèse sans source est une hypothèse qui tombera en réunion.",
        ],
      },
      {
        titre: "L'erreur la plus fréquente",
        paragraphes: [
          "Un plan trop optimiste décrédibilise tout le dossier, y compris ce qui était solide.",
          "Un plan prudent qui se réalise vaut mieux qu'un plan ambitieux raté au premier trimestre.",
        ],
      },
    ],
    aRetenir: [
      'Trois à cinq ans, avec le détail mois par mois sur la première année',
      'Chaque hypothèse adossée à une source ou à un comparable',
      'Le prévisionnel de trésorerie compte davantage que le résultat affiché',
    ],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisins: ["previsionnel-de-tresorerie", "plan-de-financement", "levee-de-fonds"],
  },

  {
    slug: 'plan-de-financement',
    terme: 'Le plan de financement',
    titreMeta: 'Plan de financement : besoins et ressources',
    famille: 'Financement',
    definition:
      "Le plan de financement met face à face les besoins d'un projet et ses ressources.",
    corps: [
      {
        titre: 'Les deux colonnes',
        paragraphes: [
          "À gauche, les besoins. L'investissement, le besoin en fonds de roulement, les frais de démarrage.",
          "À droite, les ressources. L'apport, l'emprunt, le crédit-bail, la subvention, la levée de fonds.",
          "Les deux colonnes doivent s'équilibrer. Un déséquilibre visible fait tomber le dossier en comité.",
        ],
      },
      {
        titre: 'Ce que le banquier vérifie en premier',
        paragraphes: [
          "Le niveau d'apport. Un projet financé sans apport se négocie mal.",
          "Et l'oubli classique : le besoin en fonds de roulement, absent d'un plan sur deux.",
        ],
      },
    ],
    aRetenir: [
      "Besoins et ressources doivent tomber juste, à l'euro près",
      "Le besoin en fonds de roulement est un besoin, pas un détail d'exploitation",
      "Une subvention obtenue renforce la partie bancaire du plan",
    ],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisins: ["besoin-en-fonds-de-roulement", "business-plan", "credit-bail"],
  },

  {
    slug: 'previsionnel-de-tresorerie',
    terme: 'Le prévisionnel de trésorerie',
    titreMeta: 'Prévisionnel de trésorerie : le tenir vraiment',
    aussi: ["plan de trésorerie", "cash flow prévisionnel"],
    famille: 'Pilotage',
    definition:
      "Le prévisionnel de trésorerie annonce, semaine par semaine, ce qui entrera et sortira du compte bancaire.",
    corps: [
      {
        titre: "Pourquoi il prime sur le compte de résultat",
        paragraphes: [
          "Une entreprise rentable peut se retrouver sans trésorerie. Le résultat ignore les délais de paiement.",
          "Le prévisionnel, lui, raisonne en encaissements et décaissements réels, à la date où ils tombent.",
          "C'est le document qui dit si vous passez la fin du mois.",
        ],
      },
      {
        titre: 'Le tenir utilement',
        paragraphes: [
          "Une maille hebdomadaire sur trois mois, puis mensuelle sur douze. Au-delà, la précision est illusoire.",
          "Il se met à jour chaque semaine, sinon il ne sert à rien.",
          "La TVA, les échéances sociales et les traites de crédit-bail y figurent à leur vraie date.",
        ],
      },
    ],
    aRetenir: [
      'Une entreprise rentable peut manquer de trésorerie',
      'Maille hebdomadaire sur trois mois, mensuelle ensuite',
      'Sans mise à jour hebdomadaire, le document devient décoratif',
    ],
    expertise: {
      libelle: 'Direction financière à temps partagé',
      href: '/expertises/direction-financiere-a-temps-partage',
    },
    voisins: ["besoin-en-fonds-de-roulement", "business-plan", "covenant-bancaire"],
  },

  {
    slug: 'besoin-en-fonds-de-roulement',
    terme: 'Le besoin en fonds de roulement',
    titreMeta: 'BFR : définition et pilotage',
    aussi: ["BFR"],
    famille: 'Pilotage',
    definition:
      "Le besoin en fonds de roulement est l'argent immobilisé entre l'achat et l'encaissement.",
    corps: [
      {
        titre: "D'où il vient",
        paragraphes: [
          "Vous payez vos fournisseurs et votre stock avant d'encaisser vos clients. L'écart se finance.",
          "Plus l'activité croît, plus cet écart grossit. La croissance consomme de la trésorerie.",
          "C'est ce qui explique qu'une entreprise en forte croissance puisse tomber en cessation de paiements.",
        ],
      },
      {
        titre: 'Les trois leviers',
        paragraphes: [
          "Réduire le stock, encaisser plus vite, négocier des délais fournisseurs plus longs.",
          "Chaque jour gagné sur le délai client libère de la trésorerie, immédiatement et durablement.",
        ],
      },
    ],
    aRetenir: [
      "La croissance consomme de la trésorerie avant d'en produire",
      "Le BFR se finance comme un investissement, pas au fil de l'eau",
      'Un jour de délai client gagné libère de la trésorerie pour de bon',
    ],
    expertise: {
      libelle: 'Pilotage de la performance',
      href: '/expertises/pilotage-de-la-performance',
    },
    voisins: ["previsionnel-de-tresorerie", "plan-de-financement"],
  },

  {
    slug: 'credit-bail',
    terme: 'Le crédit-bail',
    titreMeta: 'Crédit-bail mobilier et immobilier',
    aussi: ["leasing", "location avec option d'achat"],
    famille: 'Financement',
    definition:
      "Le crédit-bail finance un bien qu'un organisme achète et vous loue, avec option d'achat.",
    corps: [
      {
        titre: "Ce qu'il permet",
        paragraphes: [
          "Financer du matériel sans mobiliser d'apport et sans alourdir l'emprunt bancaire.",
          "Le bien reste la propriété du crédit-bailleur jusqu'à la levée de l'option. C'est sa garantie.",
          "Cette garantie explique qu'un dossier de crédit-bail passe parfois là où un prêt classique bloque.",
        ],
      },
      {
        titre: "Ce qu'il faut regarder",
        paragraphes: [
          "Le coût total, pas le loyer mensuel. Un loyer bas sur une durée longue coûte cher.",
          "La valeur de l'option finale, et les conditions de sortie anticipée.",
          "L'assurance du bien, souvent imposée, et son prix réel.",
        ],
      },
    ],
    aRetenir: [
      "Le bien appartient au financeur jusqu'à la levée de l'option",
      'Comparer le coût total, jamais la mensualité seule',
      'Un dossier de crédit-bail passe parfois là où un prêt bloque',
    ],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisins: ["plan-de-financement", "bpifrance"],
  },

  {
    slug: 'bpifrance',
    terme: 'Les financements Bpifrance',
    titreMeta: 'Bpifrance : prêts, aides et garanties',
    aussi: ["BPI", "banque publique d'investissement"],
    famille: 'Financement',
    definition:
      "Bpifrance est la banque publique d'investissement française, qui prête aux entreprises et garantit les prêts bancaires.",
    corps: [
      {
        titre: 'Quatre métiers, souvent confondus',
        paragraphes: [
          "Le prêt, accordé en propre, généralement sans garantie personnelle du dirigeant.",
          "La garantie, qui couvre une part du risque de votre banque et débloque son accord.",
          "L'aide à l'innovation, sous forme de subvention ou d'avance remboursable.",
          "Et l'investissement en fonds propres, sur des dossiers plus rares.",
        ],
      },
      {
        titre: 'Ce qui fait la différence dans un dossier',
        paragraphes: [
          "Bpifrance intervient presque toujours aux côtés d'une banque, rarement seule.",
          "L'ordre compte : la garantie se demande avant que la banque ait dit non.",
          "Les dispositifs changent. Celui qui existait l'an dernier n'est pas forcément ouvert aujourd'hui.",
        ],
      },
    ],
    aRetenir: [
      'Bpifrance accompagne une banque, elle ne la remplace pas',
      'La garantie se demande avant le refus, pas après',
      'Les dispositifs évoluent chaque année, y compris leurs critères',
    ],
    expertise: {
      libelle: 'Subventions et aides publiques',
      href: '/expertises/subventions-et-aides-publiques',
    },
    voisins: ["avance-remboursable", "pret-d-honneur", "credit-bail"],
  },

  {
    slug: 'pret-d-honneur',
    terme: "Le prêt d'honneur",
    titreMeta: "Prêt d'honneur : effet de levier au lancement",
    famille: 'Financement',
    definition:
      "Le prêt d'honneur est un prêt personnel, sans intérêt ni garantie, accordé au dirigeant.",
    corps: [
      {
        titre: "Pourquoi il pèse plus que son montant",
        paragraphes: [
          "Il est versé au dirigeant, qui le réinjecte en compte courant ou en capital.",
          "La banque le lit donc comme de l'apport personnel, et prête davantage en face.",
          "C'est un effet de levier : le prêt d'honneur déclenche souvent un financement bancaire bien supérieur.",
        ],
      },
      {
        titre: "Comment il s'obtient",
        paragraphes: [
          "Par des réseaux d'accompagnement à la création, qui l'accordent après passage devant un comité.",
          "Le comité juge le projet et le porteur. La qualité du business plan y décide beaucoup.",
        ],
      },
    ],
    aRetenir: [
      'Sans intérêt, sans garantie, accordé au dirigeant et non à la société',
      "La banque le compte comme de l'apport personnel",
      'Il se demande avant le dossier bancaire, jamais après',
    ],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisins: ["bpifrance", "levee-de-fonds", "plan-de-financement"],
  },

  {
    slug: 'avance-remboursable',
    terme: "L'avance remboursable",
    titreMeta: 'Avance remboursable : entre subvention et prêt',
    famille: 'Financement',
    definition:
      "L'avance remboursable est une somme versée en amont d'un projet, remboursée seulement si celui-ci réussit.",
    corps: [
      {
        titre: 'Sa place entre la subvention et le prêt',
        paragraphes: [
          "La subvention ne se rembourse jamais. Le prêt se rembourse toujours.",
          "L'avance remboursable se situe entre les deux. En cas d'échec constaté, elle s'annule souvent.",
          "Elle finance donc le risque, ce qu'une banque ne fait pas.",
        ],
      },
      {
        titre: 'Ce que cela implique',
        paragraphes: [
          "Le projet doit être défini avec précision, parce que son échec devra pouvoir se constater.",
          "Le versement est souvent étalé, par tranches liées à l'avancement.",
          "Elle compte comme quasi-fonds propres dans certains dossiers, ce qui améliore le levier bancaire.",
        ],
      },
    ],
    aRetenir: [
      "Remboursée en cas de succès, souvent annulée en cas d'échec constaté",
      "Elle finance le risque, là où la banque s'arrête",
      'Elle renforce le haut de bilan dans la lecture du banquier',
    ],
    expertise: {
      libelle: 'Subventions et aides publiques',
      href: '/expertises/subventions-et-aides-publiques',
    },
    voisins: ["bpifrance", "pret-d-honneur"],
  },

  {
    slug: 'levee-de-fonds',
    terme: 'La levée de fonds',
    titreMeta: 'Levée de fonds : préparation et déroulé',
    aussi: ["tour de table", "augmentation de capital"],
    famille: 'Financement',
    definition:
      "Une levée de fonds apporte de l'argent en échange d'une part du capital de la société.",
    corps: [
      {
        titre: "Ce qu'elle finance",
        paragraphes: [
          "Ce qu'une banque refuse de porter. Un développement long, une conquête de marché, une équipe à constituer.",
          "En échange, l'investisseur devient associé. Il vote, il regarde, et il attend une sortie.",
          "Le capital cédé ne revient pas. C'est le coût réel de l'opération.",
        ],
      },
      {
        titre: 'Le calendrier réel',
        paragraphes: [
          "Une levée se prépare des mois avant la première rencontre avec un fonds.",
          "Le dossier compte autant que la rencontre. Un fonds voit des centaines de projets par an.",
          "Les financements non dilutifs se sollicitent d'abord, pour lever moins et céder moins.",
        ],
      },
    ],
    aRetenir: [
      "L'argent s'échange contre une part définitive du capital",
      'La préparation se compte en mois, pas en semaines',
      'Sécuriser le non dilutif avant permet de céder moins de capital',
    ],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisins: ["table-de-capitalisation", "valorisation-d-entreprise", "business-plan"],
  },

  {
    slug: 'table-de-capitalisation',
    terme: 'La table de capitalisation',
    titreMeta: 'Table de capitalisation : lire la dilution',
    aussi: ["cap table"],
    famille: 'Structure',
    definition:
      "La table de capitalisation liste qui détient quoi dans la société, avant et après une opération.",
    corps: [
      {
        titre: "Ce qu'elle montre",
        paragraphes: [
          "La répartition du capital, les droits de vote, et ce que chaque tour a dilué.",
          "Elle se lit en deux états, avant l'opération et après l'émission des nouveaux titres.",
          "Un investisseur la demande au premier rendez-vous. Une table approximative inquiète.",
        ],
      },
      {
        titre: 'Ce qui la complique',
        paragraphes: [
          "Les instruments qui ne sont pas encore des actions. Bons de souscription, obligations convertibles, actions gratuites.",
          "Ils n'apparaissent pas dans la répartition actuelle, mais ils diluent le jour où ils s'exercent.",
        ],
      },
    ],
    aRetenir: [
      'Toujours deux états : avant et après opération',
      'Les instruments non encore convertis diluent quand même',
      'Un investisseur la demande dès le premier rendez-vous',
    ],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisins: ["levee-de-fonds", "valorisation-d-entreprise", "holding"],
  },

  {
    slug: 'valorisation-d-entreprise',
    terme: "La valorisation d'entreprise",
    titreMeta: "Valorisation d'entreprise : les méthodes",
    famille: 'Opérations',
    definition:
      "La valorisation estime ce que vaut une société, par comparaison ou par ses flux futurs.",
    corps: [
      {
        titre: 'Trois familles de méthodes',
        paragraphes: [
          "Les comparables appliquent un multiple observé sur des transactions du même secteur.",
          "L'actualisation des flux futurs part du prévisionnel et le ramène à sa valeur d'aujourd'hui.",
          "L'approche patrimoniale additionne les actifs et retranche les dettes. Elle donne souvent un plancher.",
        ],
      },
      {
        titre: 'Ce que vaut une valorisation',
        paragraphes: [
          "Une valorisation n'est pas un prix. Le prix se fixe à la négociation, entre deux parties.",
          "Elle sert à savoir d'où vous partez, et à défendre l'écart quand l'acquéreur propose moins.",
          "La qualité des comptes pèse plus que la méthode retenue.",
        ],
      },
    ],
    aRetenir: [
      'Une valorisation donne une fourchette, le prix se négocie',
      'La méthode se choisit selon le secteur et la taille',
      "Des comptes tenus valent plus qu'un modèle sophistiqué",
    ],
    expertise: {
      libelle: 'M&A et transmission',
      href: '/expertises/m-a-et-transmission',
    },
    voisins: ["due-diligence", "dataroom", "levee-de-fonds"],
  },

  {
    slug: 'due-diligence',
    terme: 'La due diligence',
    titreMeta: 'Due diligence : ce que cherche un acquéreur',
    aussi: ["audit d'acquisition"],
    famille: 'Opérations',
    definition:
      "La due diligence est l'audit mené par un acquéreur avant de confirmer son offre.",
    corps: [
      {
        titre: "Ce qu'elle cherche vraiment",
        paragraphes: [
          "Elle vérifie que ce qui a été présenté est exact. Et elle cherche de quoi renégocier.",
          "Un écart trouvé pendant l'audit vaut une baisse de prix, ou une garantie de passif élargie.",
          "Chaque zone floue devient un argument dans la main de l'acheteur.",
        ],
      },
      {
        titre: 'Comment on la traverse bien',
        paragraphes: [
          "En connaissant ses propres écarts avant que l'auditeur les trouve.",
          "En répondant vite, parce qu'une réponse qui traîne se lit comme un problème.",
          "En ayant préparé la dataroom avant l'ouverture des discussions.",
        ],
      },
    ],
    aRetenir: [
      "Elle sert autant à vérifier qu'à renégocier",
      "Un écart découvert par l'auditeur coûte plus cher qu'un écart annoncé",
      'La lenteur des réponses se paie au prix',
    ],
    expertise: {
      libelle: 'M&A et transmission',
      href: '/expertises/m-a-et-transmission',
    },
    voisins: ["dataroom", "valorisation-d-entreprise"],
  },

  {
    slug: 'dataroom',
    terme: 'La dataroom',
    titreMeta: "Dataroom : ce qu'elle doit contenir",
    aussi: ["data room", "salle de données"],
    famille: 'Opérations',
    definition:
      "La dataroom est l'espace où le vendeur dépose les documents que l'acquéreur examinera.",
    corps: [
      {
        titre: "Ce qu'elle contient",
        paragraphes: [
          "Les comptes des derniers exercices, les contrats clients et fournisseurs, les baux.",
          "Le social, avec les contrats de travail et les engagements. Le juridique, avec les statuts et les procès-verbaux.",
          "Tout ce que la due diligence demandera, rangé avant qu'elle le demande.",
        ],
      },
      {
        titre: "Ce qui fait une bonne dataroom",
        paragraphes: [
          "Un plan de classement lisible, qui suit l'ordre des questions d'audit.",
          "Des documents complets et signés. Un contrat non signé vaut un contrat manquant.",
          "Un suivi des accès, pour savoir qui a consulté quoi.",
        ],
      },
    ],
    aRetenir: [
      'Elle se prépare avant les discussions, pas pendant',
      'Un document non signé compte comme absent',
      "Le classement suit l'ordre des questions de l'auditeur",
    ],
    expertise: {
      libelle: 'M&A et transmission',
      href: '/expertises/m-a-et-transmission',
    },
    voisins: ["due-diligence", "valorisation-d-entreprise"],
  },

  {
    slug: 'consolidation-des-comptes',
    terme: 'La consolidation des comptes',
    titreMeta: 'Consolidation des comptes : à quoi elle sert',
    famille: 'Structure',
    definition:
      "La consolidation produit les comptes d'un groupe comme s'il ne formait qu'une seule entreprise.",
    corps: [
      {
        titre: "Ce qu'elle corrige",
        paragraphes: [
          "Additionner les comptes de plusieurs sociétés compte deux fois ce qu'elles se facturent entre elles.",
          "La consolidation élimine ces flux internes et donne le chiffre réel du groupe.",
          "Sans elle, le dirigeant lit un total qui n'existe pas.",
        ],
      },
      {
        titre: "Ce qu'elle demande avant",
        paragraphes: [
          "Un plan comptable commun à toutes les entités, sinon les postes ne s'additionnent pas.",
          "Des dates de clôture alignées, ou des retraitements pour les rapprocher.",
          "Un inventaire des flux intragroupe, avec leurs conventions.",
        ],
      },
    ],
    aRetenir: [
      "Additionner n'est pas consolider : les flux internes se comptent deux fois",
      'Le plan comptable commun vient avant la consolidation',
      "Le besoin apparaît souvent avant l'obligation légale",
    ],
    expertise: {
      libelle: 'Stratégie et développement',
      href: '/expertises/strategie-et-developpement',
    },
    voisins: ["holding", "covenant-bancaire"],
  },

  {
    slug: 'holding',
    terme: 'La holding',
    titreMeta: 'Holding : rôle et intérêt réel',
    aussi: ["société mère", "holding animatrice"],
    famille: 'Structure',
    definition:
      "Une holding est une société qui détient des participations dans d'autres sociétés.",
    corps: [
      {
        titre: "Ce qu'elle porte",
        paragraphes: [
          "Elle porte la dette d'acquisition, remboursée par les remontées de ses filiales.",
          "Elle organise la détention, ce qui simplifie l'entrée d'un associé et la transmission.",
          "Elle permet de mutualiser des fonctions entre filiales, avec une convention en face.",
        ],
      },
      {
        titre: "Le moment où on la crée",
        paragraphes: [
          "Avant la deuxième ou la troisième société, tant que la restructuration reste simple.",
          "Après, l'apport de titres à une holding nouvelle devient coûteux et lourd à documenter.",
        ],
      },
    ],
    aRetenir: [
      'Elle porte la dette et organise la détention',
      'Sa création coûte moins cher tôt que tard',
      'Chaque service rendu aux filiales exige une convention',
    ],
    expertise: {
      libelle: 'Stratégie et développement',
      href: '/expertises/strategie-et-developpement',
    },
    voisins: ["consolidation-des-comptes", "table-de-capitalisation"],
  },

  {
    slug: 'covenant-bancaire',
    terme: 'Le covenant bancaire',
    titreMeta: 'Covenant bancaire : engagement et rupture',
    aussi: ["ratio bancaire", "clause financière"],
    famille: 'Financement',
    definition:
      "Un covenant est un ratio financier que l'emprunteur s'engage à respecter jusqu'au remboursement.",
    corps: [
      {
        titre: 'Ce qui se mesure',
        paragraphes: [
          "Le plus souvent, le rapport entre la dette nette et l'excédent brut d'exploitation.",
          "Parfois le niveau de fonds propres, ou la capacité à couvrir les échéances de l'année.",
          "Le ratio se teste à chaque clôture, sur les comptes certifiés.",
        ],
      },
      {
        titre: "Ce qui se passe en cas de rupture",
        paragraphes: [
          "La banque peut exiger le remboursement immédiat. Elle le fait rarement, et elle renégocie.",
          "Mais elle négocie en position de force, et le coût du crédit monte.",
          "Un covenant qui va être rompu s'annonce avant la clôture, jamais après.",
        ],
      },
    ],
    aRetenir: [
      'Le ratio se teste à chaque clôture, sur les comptes certifiés',
      "Une rupture ouvre le droit d'exiger le remboursement",
      'Annoncer une rupture en amont vaut mieux que la subir',
    ],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisins: ["previsionnel-de-tresorerie", "consolidation-des-comptes"],
  },
];

export const parSlugFiche = (slug: string) => FICHES.find((f) => f.slug === slug);

export const FAMILLES = ['Financement', 'Structure', 'Opérations', 'Pilotage'] as const;
