/**
 * Les questions qu'un dirigeant pose vraiment.
 *
 * Pourquoi cette section existe, et pourquoi elle ne ressemble pas au lexique.
 * Le lexique répond à « c'est quoi X ». Ici on répond à « est-ce que je peux »,
 * « à partir de quand », « faut-il ». Ce sont les formulations que les gens
 * tapent, et celles que les assistants recopient quand ils répondent.
 *
 * Régime factuel, contrairement aux pages d'expertise. Chaque règle affirmée
 * ici vient d'une source publique, citée en bas de page et vérifiée le jour de
 * l'écriture. Une page qui affirme sans source ne se fait pas reprendre, et
 * mérite de ne pas l'être.
 *
 * Règles tenues sur chaque question :
 *
 * - `reponseCourte` répond à la question posée, en trois phrases au plus. Elle
 *   doit rester vraie citée seule, sans le reste de la page. C'est le bloc
 *   qu'un moteur extrait, et la seule chose que lira un dirigeant pressé.
 * - Seize mots par phrase au maximum. Seule exception : les citations
 *   textuelles d'une source officielle, en `sources[].note`. Raccourcir une
 *   citation la falsifie, et une citation falsifiée ne vaut rien.
 * - Aucun chiffre de mission, aucun tarif, aucun délai promis. Les seuls
 *   chiffres admis sont des règles publiques, avec leur source.
 * - Aucune question à laquelle le cabinet ne saurait pas répondre en rendez-vous.
 */
import type { NomIcone } from '../components/Icone.astro';

export type Question = {
  slug: string;
  /** La question, écrite comme on la pose. C'est le titre de la page. */
  question: string;
  /** Le titre de l'onglet, sans le suffixe de marque. */
  titreMeta: string;
  /** Autres façons de poser la même question. Affichées, et utiles au moteur. */
  aussi?: string[];
  famille: Famille;
  /** La réponse. Trois phrases au plus, vraies hors contexte. */
  reponseCourte: string;
  corps: { titre: string; paragraphes: string[] }[];
  aRetenir: string[];
  /** Sources publiques. Obligatoires dès qu'une règle chiffrée est affirmée. */
  sources?: { libelle: string; href: string; note?: string }[];
  /** Fiches du lexique à mettre en regard. */
  lexique?: string[];
  expertise?: { libelle: string; href: string };
  voisines: string[];
  /** Date de dernière vérification des faits, au format ISO. */
  verifie: string;
};

export type Famille =
  | 'Financement public'
  | 'Levée de fonds'
  | 'Direction financière'
  | 'Structuration'
  | 'Transmission';

export const FAMILLES: Famille[] = [
  'Financement public',
  'Levée de fonds',
  'Direction financière',
  'Structuration',
  'Transmission',
];

export const ICONE_FAMILLE: Record<Famille, NomIcone> = {
  'Financement public': 'subvention',
  'Levée de fonds': 'financement',
  'Direction financière': 'direction',
  Structuration: 'groupe',
  Transmission: 'transmission',
};

export const QUESTIONS_PAGES: Question[] = [
  {
    slug: 'demander-une-subvention-avant-ou-apres-la-depense',
    question: "Faut-il demander une subvention avant d'engager la dépense ?",
    titreMeta: "Subvention : demander avant d'engager la dépense",
    aussi: [
      'peut-on demander une aide pour un projet déjà commencé',
      'antériorité de la dépense',
      'effet incitatif d’une aide publique',
    ],
    famille: 'Financement public',
    reponseCourte:
      "Avant, toujours. Une dépense engagée avant le dépôt du dossier n'est plus éligible. La règle ne souffre pas d'exception négociée.",
    corps: [
      {
        titre: "D'où vient cette règle",
        paragraphes: [
          "Une aide publique doit avoir un effet incitatif. Elle doit déclencher le projet, pas rembourser un projet déjà lancé.",
          "Le droit européen le formule ainsi. La demande écrite précède le début des travaux.",
          "Ce n'est donc pas une lubie de guichet. C'est la condition qui rend l'aide légale, et le guichet ne peut pas y déroger.",
        ],
      },
      {
        titre: "Ce que « engager » veut dire",
        paragraphes: [
          "Le point de bascule précède le paiement. C'est le premier engagement qui rend le projet irréversible.",
          "Un devis signé, un bon de commande, un acompte : tout cela engage.",
          "Une étude de marché, un échange fournisseur, un chiffrage interne : rien de cela n'engage.",
        ],
      },
      {
        titre: 'La date qui fait foi',
        paragraphes: [
          "Chez Bpifrance, la date retenue est celle de la réception du dossier complet, jugé recevable.",
          "Ni le premier contact, ni le rendez-vous, ni le jour où vous avez commencé.",
          "Un dossier déposé incomplet en septembre et complété en novembre ouvre les dépenses de novembre.",
        ],
      },
      {
        titre: 'Ce que ça change dans un calendrier',
        paragraphes: [
          "Le financement public se décide donc au moment du plan, pas au moment de la facture.",
          "Un projet qui a déjà démarré n'est pas perdu. La part déjà engagée l'est, le reste peut encore être présenté.",
          "Si le recrutement ou la commande pressent, arbitrez en connaissance de cause.",
        ],
      },
    ],
    aRetenir: [
      'Ne signez aucun devis lié au projet avant le dépôt du dossier.',
      "La date qui compte est celle du dossier complet, pas du premier contact.",
      "Un projet déjà commencé garde ses dépenses futures, jamais les passées.",
      'Le calendrier du financement se cale sur le plan, pas sur la facture.',
    ],
    sources: [
      {
        libelle: 'Bpifrance, FAQ pour les porteurs de projets France 2030',
        href: 'https://www.bpifrance.fr/faq-pour-les-porteurs-de-projets-france-2030',
        note: "« une aide est réputée avoir un effet incitatif si le bénéficiaire a présenté une demande d'aide écrite avant le début des travaux »",
      },
      {
        libelle: 'Bpifrance, fiche Subvention Innovation',
        href: 'https://www.bpifrance.fr/catalogue-offres/subvention-innovation',
        note: "« Aucune dépense engagée antérieurement à la date de dépôt de la demande d'aide ne peut être retenue »",
      },
    ],
    lexique: ['bpifrance', 'avance-remboursable'],
    expertise: {
      libelle: 'Subventions et aides publiques',
      href: '/expertises/subventions-et-aides-publiques',
    },
    voisines: [
      'une-subvention-reduit-elle-le-credit-impot-recherche',
      'la-garantie-bpifrance-protege-t-elle-le-dirigeant',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'une-subvention-reduit-elle-le-credit-impot-recherche',
    question: 'Une subvention réduit-elle mon crédit d’impôt recherche ?',
    titreMeta: 'Subvention et CIR : la règle de déduction',
    aussi: [
      'cumul subvention et CIR',
      'avance remboursable et crédit impôt recherche',
      'assiette du CIR',
    ],
    famille: 'Financement public',
    reponseCourte:
      "Oui. Les subventions publiques se déduisent de l'assiette du CIR. Les avances remboursables aussi, puis se réintègrent à mesure du remboursement.",
    corps: [
      {
        titre: 'La règle',
        paragraphes: [
          "Une aide publique reçue pour des travaux éligibles au CIR sort de l'assiette.",
          "Peu importe qu'elle soit définitivement acquise ou remboursable. Les deux se déduisent.",
          "La déduction porte sur l'année où les dépenses sont engagées, non sur celle de l'encaissement.",
        ],
      },
      {
        titre: "Le cas de l'avance remboursable",
        paragraphes: [
          "Une avance remboursable se déduit d'abord, comme une subvention. C'est souvent la mauvaise surprise.",
          "Mais elle se réintègre ensuite à l'assiette, l'année où elle est remboursée au financeur.",
          "Sur la durée du projet, l'effet s'annule donc. Sur une seule année fiscale, il peut coûter cher.",
        ],
      },
      {
        titre: 'Quand le chercheur ne fait pas que de la recherche',
        paragraphes: [
          "Une aide à l'embauche ne se déduit qu'à proportion du temps consacré aux travaux éligibles.",
          "Si l'ingénieur passe la moitié de son temps en R&D, la moitié se déduit.",
          "Cela suppose un suivi du temps sérieux, qui est aussi ce que demande un contrôle.",
        ],
      },
      {
        titre: 'Ce que ça change dans un arbitrage',
        paragraphes: [
          "Empiler les dispositifs ne produit pas la somme des dispositifs. Il faut chiffrer le net.",
          "Une subvention qui rabote le CIR peut rapporter moins qu'elle n'en a l'air.",
          "Le bon ordre consiste à modéliser les deux ensemble, avant de déposer, pas après.",
        ],
      },
    ],
    aRetenir: [
      "Subvention et avance remboursable sortent toutes deux de l'assiette du CIR.",
      "L'avance revient dans l'assiette l'année de son remboursement.",
      "Une aide à l'embauche se déduit au prorata du temps passé en recherche.",
      'Le gain réel se calcule sur les deux dispositifs ensemble, avant le dépôt.',
    ],
    sources: [
      {
        libelle: 'BOFiP, CIR, modalités de calcul particulières',
        href: 'https://bofip.impots.gouv.fr/bofip/4680-PGP.html',
        note: 'Traitement des subventions publiques, acquises ou remboursables, dans les bases de calcul',
      },
      {
        libelle: 'Code général des impôts, article 244 quater B',
        href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044989574',
      },
    ],
    lexique: ['avance-remboursable', 'bpifrance'],
    expertise: {
      libelle: 'Subventions et aides publiques',
      href: '/expertises/subventions-et-aides-publiques',
    },
    voisines: [
      'demander-une-subvention-avant-ou-apres-la-depense',
      'lever-des-fonds-ou-s-endetter',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'la-garantie-bpifrance-protege-t-elle-le-dirigeant',
    question: 'La garantie Bpifrance protège-t-elle le dirigeant ?',
    titreMeta: 'Garantie Bpifrance : qui est vraiment protégé',
    aussi: [
      'caution personnelle et garantie Bpifrance',
      'résidence principale et prêt professionnel',
      'modération des sûretés',
    ],
    famille: 'Financement public',
    reponseCourte:
      "Non, elle protège la banque. Elle encadre en revanche ce que la banque peut vous demander. La résidence principale reste hors d'atteinte.",
    corps: [
      {
        titre: 'Qui est couvert',
        paragraphes: [
          "La garantie couvre la banque contre la défaillance de l'entreprise, à hauteur d'une quotité.",
          "En cas de défaut, la banque réalise d'abord ses sûretés. Elle appelle Bpifrance sur le solde.",
          "Votre caution personnelle fait partie de ces sûretés. Elle est donc appelée avant la garantie, pas à sa place.",
        ],
      },
      {
        titre: 'La caution est plafonnée',
        paragraphes: [
          "Bpifrance assortit sa garantie d'une politique de modération des sûretés personnelles.",
          "Sauf cas très spécifiques, la caution des dirigeants est plafonnée. Elle ne porte pas sur plus de la moitié de l'encours.",
          "L'engagement suit l'amortissement du prêt. Il diminue donc à mesure que la dette est remboursée.",
        ],
      },
      {
        titre: 'La résidence principale est hors jeu',
        paragraphes: [
          "C'est la protection la plus forte, et la moins connue des dirigeants qui signent.",
          "Le logement qui sert de résidence principale est hors d'atteinte. Ni hypothèque, ni saisie immobilière pour ce crédit.",
          "Cette interdiction vaut en toutes circonstances et sans limite de temps. Elle survit au règlement de la garantie.",
        ],
      },
      {
        titre: 'La banque ne peut pas en rajouter',
        paragraphes: [
          "La banque doit s'en tenir aux sûretés mentionnées sur l'accord de garantie de Bpifrance.",
          "Tant que l'entreprise respecte ses engagements, elle ne peut pas en demander d'autres sans accord exprès.",
          "Savoir cela change une négociation. Beaucoup de dirigeants signent ce qu'on leur présente, faute de le savoir.",
        ],
      },
    ],
    aRetenir: [
      "La garantie couvre la banque, jamais le dirigeant caution.",
      "La caution des dirigeants est plafonnée à la moitié de l'encours, sauf exception.",
      'La résidence principale ne peut être ni hypothéquée ni saisie pour ce crédit.',
      "La banque ne peut pas exiger de sûretés absentes de l'accord de garantie.",
    ],
    sources: [
      {
        libelle: 'Bpifrance, le cadre de la garantie',
        href: 'https://www.bpifrance.fr/download/media-file/83131',
        note: 'Document non contractuel, décembre 2024. Le contrat de garantie signé fait seul foi.',
      },
      {
        libelle: 'Bpifrance Création, la caution',
        href: 'https://bpifrance-creation.fr/encyclopedie/financements/dispositifs-garantie/caution',
      },
    ],
    lexique: ['bpifrance', 'covenant-bancaire'],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisines: [
      'le-pret-d-honneur-se-cumule-t-il-avec-un-pret-bancaire',
      'demander-une-subvention-avant-ou-apres-la-depense',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'le-pret-d-honneur-se-cumule-t-il-avec-un-pret-bancaire',
    question: "Le prêt d'honneur se cumule-t-il avec un prêt bancaire ?",
    titreMeta: "Prêt d'honneur et prêt bancaire : le cumul",
    aussi: [
      "prêt d'honneur Initiative France",
      'Réseau Entreprendre prêt d’honneur',
      "effet de levier d'un prêt d'honneur",
    ],
    famille: 'Financement public',
    reponseCourte:
      "Oui, et c'est son principal intérêt. Il est prêté au dirigeant, sans intérêt ni garantie. Il renforce l'apport que la banque examine.",
    corps: [
      {
        titre: 'Il est prêté à vous, pas à la société',
        paragraphes: [
          "C'est la mécanique que peu de dirigeants comprennent, et qui fait toute la différence.",
          "Le prêt d'honneur est accordé à la personne physique. Vous l'apportez ensuite à votre société.",
          "Il grossit donc votre apport personnel. Il se lit en fonds propres, pas en dette.",
        ],
      },
      {
        titre: 'Ses conditions',
        paragraphes: [
          "Taux zéro, aucune garantie demandée, remboursement étalé sur plusieurs années.",
          "Chez Initiative France, le montant va de 3 000 à 50 000 euros. La moyenne tourne autour de 10 000 euros.",
          "Réseau Entreprendre prête en moyenne davantage, et jusqu'à des montants plus élevés selon les projets.",
        ],
      },
      {
        titre: "L'effet de levier",
        paragraphes: [
          "Initiative France annonce 9,5 euros prêtés par les banques pour 1 euro de prêt d'honneur accordé.",
          "Réseau Entreprendre annonce 13 euros de financement complémentaire pour 1 euro prêté.",
          "Ces réseaux se cumulent entre eux. Un même dirigeant peut solliciter les deux.",
        ],
      },
      {
        titre: 'Ce qu’on vous demande en retour',
        paragraphes: [
          "Un dossier, un passage en comité, et le plus souvent un accompagnement dans la durée.",
          "Le comité juge le dirigeant autant que le projet. Il faut donc savoir défendre les deux.",
          "L'accompagnement n'est pas un accessoire. C'est une partie de ce que le réseau vous apporte.",
        ],
      },
    ],
    aRetenir: [
      'Le prêt est accordé au dirigeant, pas à la société.',
      "Apporté en fonds propres, il renforce l'apport que la banque examine.",
      'Les réseaux se cumulent entre eux, et avec le financement bancaire.',
      'Le comité juge le dirigeant autant que le dossier.',
    ],
    sources: [
      {
        libelle: "Initiative France, le prêt d'honneur",
        href: 'https://www.initiative-france.fr/nos-solutions/financement-le-pret-d-honneur.html',
        note: 'Taux zéro, sans garantie, de 3 000 à 50 000 euros. Levier bancaire annoncé de 9,5.',
      },
      {
        libelle: 'Bpifrance Création, le prêt d’honneur',
        href: 'https://bpifrance-creation.fr/encyclopedie/financements/financement-fonds-propres/pret-dhonneur',
      },
    ],
    lexique: ['pret-d-honneur', 'plan-de-financement'],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisines: [
      'la-garantie-bpifrance-protege-t-elle-le-dirigeant',
      'racheter-une-entreprise-sans-apport-personnel',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'lever-des-fonds-ou-s-endetter',
    question: 'Faut-il lever des fonds ou s’endetter ?',
    titreMeta: 'Lever des fonds ou s’endetter : comment trancher',
    aussi: [
      'financement dilutif ou non dilutif',
      'dette ou capital',
      'quel financement pour ma croissance',
    ],
    famille: 'Levée de fonds',
    reponseCourte:
      "La dette se rembourse, le capital se partage pour toujours. La vraie question est ce que le projet peut rembourser, et quand.",
    corps: [
      {
        titre: 'Ce que la dette exige',
        paragraphes: [
          "Un prêteur ne parie pas sur votre récit. Il regarde ce qui remboursera, et avec quelle marge d'erreur.",
          "Il lui faut des flux, un historique, et souvent des garanties. Une entreprise qui perd de l'argent en a peu.",
          "En échange, il ne prend aucune part du capital. Il sort de votre vie à la dernière échéance.",
        ],
      },
      {
        titre: "Ce que le capital achète",
        paragraphes: [
          "Le capital finance ce que la dette refuse : des pertes assumées pour prendre un marché.",
          "Il achète du temps. C'est le seul financement qui ne demande rien le mois suivant.",
          "Il se paie en parts, donc en contrôle. L'associé entré reste tant qu'il n'a pas vendu.",
        ],
      },
      {
        titre: "L'ordre qui fonctionne",
        paragraphes: [
          "Le non dilutif se regarde d'abord. Il ne coûte aucun capital, et prépare sa valeur.",
          "Subventions, avances, crédits d'impôt et prêts financent souvent la première marche sans rien céder.",
          "Le capital arrive ensuite, sur ce qui reste. L'entreprise vaut alors plus cher.",
        ],
      },
      {
        titre: 'La question à se poser avant',
        paragraphes: [
          "Que se passe-t-il si le plan prend deux fois plus de temps que prévu ?",
          "Avec de la dette, la réponse est une échéance à honorer malgré tout.",
          "Avec du capital, c'est une dilution plus forte au tour suivant. Les deux se préparent, aucun ne s'improvise.",
        ],
      },
    ],
    aRetenir: [
      "La dette exige des flux, le capital achète du temps.",
      'Le non dilutif se regarde toujours en premier.',
      "Un associé entré au capital reste tant qu'il n'a pas vendu.",
      'Le bon test est le scénario où le plan prend du retard.',
    ],
    lexique: ['levee-de-fonds', 'avance-remboursable', 'plan-de-financement'],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisines: [
      'quelle-dilution-accepter-a-la-premiere-levee',
      'une-subvention-reduit-elle-le-credit-impot-recherche',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'quelle-dilution-accepter-a-la-premiere-levee',
    question: 'Quelle dilution accepter à la première levée ?',
    titreMeta: 'Première levée : quelle dilution accepter',
    aussi: [
      'combien de pourcentage céder à une levée',
      'valorisation première levée',
      'dilution fondateur',
    ],
    famille: 'Levée de fonds',
    reponseCourte:
      "La dilution n'est pas un objectif à viser, c'est une conséquence à subir. Ce qui se décide, c'est le montant et ce qu'il achète.",
    corps: [
      {
        titre: "Le montant vient du plan, pas de l'envie",
        paragraphes: [
          "Un tour se dimensionne sur ce qu'il doit permettre d'atteindre, et en combien de temps.",
          "Trop peu, et vous revenez chercher de l'argent en position de faiblesse, sans avoir rien prouvé.",
          "Trop, et vous cédez du capital pour financer une période où vous n'aviez rien à démontrer.",
        ],
      },
      {
        titre: "La valorisation n'est pas un prix",
        paragraphes: [
          "Elle se déduit du montant levé et du pourcentage cédé. Elle n'existe pas avant la négociation.",
          "Une valorisation élevée n'est pas une victoire si elle vous oblige à une performance impossible ensuite.",
          "Le tour suivant se fera sur les résultats, pas sur la valorisation obtenue au précédent.",
        ],
      },
      {
        titre: 'Ce qui dilue en plus du tour',
        paragraphes: [
          "Le pool d'actions réservé aux salariés se crée souvent avant l'entrée de l'investisseur.",
          "Il est alors supporté par les seuls fondateurs. C'est une dilution réelle, rarement calculée d'avance.",
          "Les instruments convertibles émis plus tôt se convertissent aussi, parfois avec une décote.",
        ],
      },
      {
        titre: 'Ce qui compte plus que le pourcentage',
        paragraphes: [
          "La liquidation préférentielle décide qui est payé en premier le jour d'une vente.",
          "Les droits de gouvernance décident de ce que vous ne pourrez plus faire seul.",
          "Un fondateur peut garder la majorité et avoir perdu la main. L'inverse se voit aussi.",
        ],
      },
    ],
    aRetenir: [
      'Le montant se déduit du plan, la dilution en découle.',
      'La valorisation est un résultat de négociation, pas une mesure de valeur.',
      'Le pool de salariés dilue souvent les seuls fondateurs.',
      'Les clauses pèsent parfois plus lourd que le pourcentage cédé.',
    ],
    lexique: ['levee-de-fonds', 'table-de-capitalisation', 'valorisation-d-entreprise'],
    expertise: { libelle: 'Financement', href: '/financement' },
    voisines: [
      'lever-des-fonds-ou-s-endetter',
      'quelles-clauses-comptent-vraiment-dans-un-pacte-d-associes',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'expert-comptable-ou-directeur-financier-a-temps-partage',
    question: 'Quelle différence entre un expert-comptable et un DAF à temps partagé ?',
    titreMeta: 'Expert-comptable ou DAF à temps partagé',
    aussi: [
      'différence expert-comptable directeur financier',
      'à quoi sert un DAF externalisé',
      'mon expert-comptable suffit-il',
    ],
    famille: 'Direction financière',
    reponseCourte:
      "L'expert-comptable atteste le passé, sous une responsabilité réglementée. Le directeur financier décide de l'avenir avec le dirigeant. Les deux sont nécessaires.",
    corps: [
      {
        titre: 'Deux métiers, deux horizons',
        paragraphes: [
          "L'expert-comptable produit des comptes justes, dans les formes, dans les délais légaux.",
          "Le directeur financier se sert de ces comptes pour décider ce que l'entreprise fera ensuite.",
          "L'un regarde l'exercice qui s'est écoulé. L'autre regarde les douze mois qui viennent.",
        ],
      },
      {
        titre: "Ce que l'expert-comptable ne fait pas",
        paragraphes: [
          "Il ne tient pas votre prévision de trésorerie semaine par semaine. Ce n'est pas sa mission.",
          "Il ne monte pas votre dossier bancaire, ne négocie pas, ne défend pas votre plan.",
          "Il ne construit pas le tableau de bord mensuel. C'est pourtant là qu'un dirigeant arbitre.",
        ],
      },
      {
        titre: 'Pourquoi « à temps partagé »',
        paragraphes: [
          "Beaucoup d'entreprises ont besoin d'un directeur financier, pas d'un poste à plein temps.",
          "Quelques jours par mois suffisent à tenir la trésorerie, le reporting et la relation bancaire.",
          "Le coût d'un recrutement, sa durée et son risque supposent une certaine taille.",
        ],
      },
      {
        titre: 'Les deux travaillent ensemble',
        paragraphes: [
          "Ce n'est pas un remplacement. L'expert-comptable garde sa mission, qui est légale et obligatoire.",
          "Le directeur financier lui donne des chiffres mieux tenus, et lui pose de meilleures questions.",
          "Les cabinets comptables sont d'ailleurs souvent ceux qui recommandent d'en mettre un en place.",
        ],
      },
    ],
    aRetenir: [
      "L'expert-comptable atteste, le directeur financier décide.",
      'La prévision de trésorerie et la relation bancaire ne relèvent pas du comptable.',
      "Le temps partagé donne le métier sans le coût d'un poste complet.",
      'Les deux fonctions se complètent, elles ne se remplacent pas.',
    ],
    lexique: ['previsionnel-de-tresorerie', 'consolidation-des-comptes'],
    expertise: {
      libelle: 'Direction financière à temps partagé',
      href: '/expertises/direction-financiere-a-temps-partage',
    },
    voisines: [
      'a-partir-de-quand-faut-il-un-directeur-financier',
      'pourquoi-une-entreprise-rentable-manque-de-tresorerie',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'a-partir-de-quand-faut-il-un-directeur-financier',
    question: 'À partir de quand faut-il un directeur financier ?',
    titreMeta: 'Quand faut-il un directeur financier',
    aussi: [
      'à quel chiffre d’affaires recruter un DAF',
      'quand externaliser la direction financière',
      'signes qu’il faut un DAF',
    ],
    famille: 'Direction financière',
    reponseCourte:
      "Pas à un chiffre d'affaires, mais à un moment. Quand les décisions engagent plus que ce que le dirigeant peut encore suivre de tête.",
    corps: [
      {
        titre: 'Pourquoi le seuil en chiffre d’affaires ne dit rien',
        paragraphes: [
          "Une société de services à cinq millions peut se piloter simplement. Une industrie à deux millions, non.",
          "Ce qui compte est le nombre de décisions engageantes par trimestre.",
          "Un même chiffre d'affaires recouvre des besoins de trésorerie qui n'ont rien à voir entre eux.",
        ],
      },
      {
        titre: 'Les signaux qui reviennent',
        paragraphes: [
          "La trésorerie se regarde sur le compte en banque, et les décisions attendent ce solde.",
          "Le banquier demande des prévisions, et personne en interne ne sait les produire.",
          "Une levée, un rachat ou un gros contrat arrive, et le dirigeant y passe ses nuits.",
        ],
      },
      {
        titre: 'Les signaux que les dirigeants ignorent',
        paragraphes: [
          "Plusieurs sociétés existent, et personne ne sait dire laquelle gagne de l'argent.",
          "Les marges se calculent globalement, jamais par client, par produit ou par chantier.",
          "Le budget de l'année est un document mort depuis février, et plus personne ne l'ouvre.",
        ],
      },
      {
        titre: 'Recruter ou partager',
        paragraphes: [
          "Un poste à plein temps se justifie quand le sujet occupe quelqu'un tous les jours.",
          "En dessous, le temps partagé apporte le même niveau d'expérience, sur un rythme plus court.",
          "Beaucoup d'entreprises commencent en partagé, puis recrutent quand le volume l'impose.",
        ],
      },
    ],
    aRetenir: [
      'Le déclencheur est la complexité des décisions, pas le chiffre d’affaires.',
      'Piloter la trésorerie sur le solde bancaire est un signal net.',
      "Ne pas connaître sa marge par client en est un autre.",
      'Le temps partagé précède souvent le recrutement, il ne s’y oppose pas.',
    ],
    lexique: ['previsionnel-de-tresorerie', 'besoin-en-fonds-de-roulement', 'business-plan'],
    expertise: {
      libelle: 'Direction financière à temps partagé',
      href: '/expertises/direction-financiere-a-temps-partage',
    },
    voisines: [
      'expert-comptable-ou-directeur-financier-a-temps-partage',
      'pourquoi-une-entreprise-rentable-manque-de-tresorerie',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'pourquoi-une-entreprise-rentable-manque-de-tresorerie',
    question: 'Pourquoi une entreprise rentable manque-t-elle de trésorerie ?',
    titreMeta: 'Rentable mais sans trésorerie : le BFR',
    aussi: [
      'bénéfice mais pas de cash',
      'la croissance consomme de la trésorerie',
      'besoin en fonds de roulement qui augmente',
    ],
    famille: 'Direction financière',
    reponseCourte:
      "Parce que le résultat se constate et la trésorerie se décaisse. Entre les deux se loge le besoin en fonds de roulement, que la croissance gonfle.",
    corps: [
      {
        titre: 'Résultat et trésorerie ne se mesurent pas au même moment',
        paragraphes: [
          "Une vente devient du résultat quand elle est facturée. Elle devient du cash quand elle est payée.",
          "Entre les deux, il peut s'écouler soixante jours, parfois davantage selon le secteur.",
          "Pendant ce temps, les salaires, les fournisseurs et les charges sont déjà partis du compte.",
        ],
      },
      {
        titre: "L'arithmétique du besoin en fonds de roulement",
        paragraphes: [
          "Il se calcule simplement. Les stocks, plus les créances clients, moins les dettes fournisseurs.",
          "C'est de l'argent immobilisé dans le cycle d'exploitation, qui n'est pas disponible sur le compte.",
          "Il n'apparaît pas au compte de résultat. C'est pourquoi un dirigeant rentable peut être surpris.",
        ],
      },
      {
        titre: 'Pourquoi la croissance aggrave tout',
        paragraphes: [
          "Doubler l'activité double les stocks et double les créances clients, tout de suite.",
          "La marge supplémentaire, elle, n'arrive que plus tard, après les délais de paiement.",
          "Une entreprise qui croît vite finance donc ses clients avec sa propre trésorerie.",
        ],
      },
      {
        titre: 'Ce sur quoi on peut agir',
        paragraphes: [
          "Facturer plus tôt, demander des acomptes, relancer avant l'échéance et non après.",
          "Négocier les délais fournisseurs, qui sont l'autre moitié de l'équation et qu'on oublie.",
          "Financer le poste clients quand le cycle est structurellement long, plutôt que de le subir.",
        ],
      },
    ],
    aRetenir: [
      'Le résultat se constate, la trésorerie se décaisse. Ce ne sont pas les mêmes dates.',
      'Le BFR vaut les stocks, plus les créances clients, moins les dettes fournisseurs.',
      'La croissance augmente le BFR avant de rapporter la marge.',
      'Les acomptes et les délais fournisseurs sont les leviers les plus rapides.',
    ],
    lexique: ['besoin-en-fonds-de-roulement', 'previsionnel-de-tresorerie'],
    expertise: {
      libelle: 'Pilotage de la performance',
      href: '/expertises/pilotage-de-la-performance',
    },
    voisines: [
      'a-partir-de-quand-faut-il-un-directeur-financier',
      'expert-comptable-ou-directeur-financier-a-temps-partage',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'faut-il-creer-une-holding-avant-une-levee-de-fonds',
    question: 'Faut-il créer une holding avant une levée de fonds ?',
    titreMeta: 'Holding avant ou après une levée de fonds',
    aussi: [
      'créer une holding avant de lever',
      'apport de titres à une holding',
      'holding animatrice ou patrimoniale',
    ],
    famille: 'Structuration',
    reponseCourte:
      "Si elle a une raison d'être, elle doit exister avant. Après une levée, l'opération devient plus chère et se négocie moins bien.",
    corps: [
      {
        titre: 'À quoi sert vraiment une holding',
        paragraphes: [
          "Elle regroupe des associés, pour qu'ils parlent d'une seule voix au capital.",
          "Elle porte la dette d'un rachat, remboursée par les dividendes que la cible fait remonter.",
          "Elle prépare une cession, en logeant les titres là où ils seront vendus un jour.",
        ],
      },
      {
        titre: 'À quoi elle ne sert pas',
        paragraphes: [
          "Elle ne crée pas d'économie par sa seule existence. Une structure vide coûte et ne rapporte rien.",
          "Elle ne protège pas mieux le dirigeant si celui-ci se porte caution en dessous.",
          "Elle ajoute des comptes, des assemblées et des déclarations. Ce n'est pas neutre pour une petite équipe.",
        ],
      },
      {
        titre: 'Pourquoi le moment change tout',
        paragraphes: [
          "Apporter ses titres à une holding avant la levée se fait sur une valeur encore basse.",
          "Après la levée, les mêmes titres valent ce que l'investisseur vient de payer.",
          "L'investisseur, lui, préfère une structure stable. Réorganiser pendant la négociation ralentit tout.",
        ],
      },
      {
        titre: 'Où s’arrête le rôle du financier',
        paragraphes: [
          "Le schéma se construit à plusieurs : l'avocat rédige, le fiscaliste tranche, le financier chiffre.",
          "Chacun de ces montages a un régime fiscal précis. Ses conditions se vérifient au cas par cas.",
          "Un cabinet qui vous promet un schéma standard sans regarder votre situation vous expose.",
        ],
      },
    ],
    aRetenir: [
      "Une holding sans objet clair est un coût, pas un avantage.",
      "L'apport de titres se fait plus simplement avant une levée qu'après.",
      "Un investisseur n'aime pas voir la structure bouger pendant la négociation.",
      'Le montage se valide avec un avocat et un fiscaliste, jamais seul.',
    ],
    lexique: ['holding', 'pacte-d-associes'],
    expertise: {
      libelle: 'Stratégie et développement',
      href: '/expertises/strategie-et-developpement',
    },
    voisines: [
      'quelles-clauses-comptent-vraiment-dans-un-pacte-d-associes',
      'racheter-une-entreprise-sans-apport-personnel',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'quelles-clauses-comptent-vraiment-dans-un-pacte-d-associes',
    question: "Quelles clauses comptent vraiment dans un pacte d'associés ?",
    titreMeta: "Pacte d'associés : les clauses qui comptent",
    aussi: [
      'clauses indispensables pacte associés',
      'bon de sortie associé',
      'que mettre dans un pacte',
    ],
    famille: 'Structuration',
    reponseCourte:
      "Celles qui organisent les départs. Un pacte ne sert à rien tant que tout va bien. Il sert à tout le jour où ça se gâte.",
    corps: [
      {
        titre: 'Les clauses de sortie',
        paragraphes: [
          "L'agrément décide qui peut entrer au capital, et donc qui vous ne subirez pas comme associé.",
          "La préemption donne aux associés en place la priorité sur les titres qu'un autre veut vendre.",
          "La sortie conjointe permet au minoritaire de vendre aux mêmes conditions que le majoritaire.",
        ],
      },
      {
        titre: 'La clause qui évite le procès',
        paragraphes: [
          "C'est la méthode de valorisation des titres en cas de départ, écrite à l'avance.",
          "Décidée à froid, c'est une formule. Décidée le jour du conflit, c'est une bataille d'experts.",
          "La plupart des contentieux entre associés portent sur le prix, jamais sur le principe.",
        ],
      },
      {
        titre: "Le travail, pas seulement le capital",
        paragraphes: [
          "Un associé part au bout de six mois. Sa part ne peut égaler celle d'un fondateur resté cinq ans.",
          "Les clauses d'acquisition progressive répondent à cela, en liant les titres à la présence.",
          "Elles distinguent aussi le départ choisi du départ subi, qui ne se traitent pas pareil.",
        ],
      },
      {
        titre: 'La gouvernance',
        paragraphes: [
          "Certaines décisions doivent exiger plus qu'une majorité simple pour être prises.",
          "Ouvrir le capital, vendre un fonds, s'endetter lourdement, embaucher un dirigeant.",
          "Une liste courte et claire vaut mieux qu'une liste longue que personne ne relit.",
        ],
      },
    ],
    aRetenir: [
      'Un pacte organise les départs, pas la bonne entente.',
      'La formule de prix écrite à froid évite le contentieux.',
      "L'acquisition progressive lie les titres au temps passé.",
      'Les décisions réservées doivent tenir en une liste courte.',
    ],
    lexique: ['pacte-d-associes', 'valorisation-d-entreprise'],
    expertise: {
      libelle: 'Stratégie et développement',
      href: '/expertises/strategie-et-developpement',
    },
    voisines: [
      'faut-il-creer-une-holding-avant-une-levee-de-fonds',
      'quelle-dilution-accepter-a-la-premiere-levee',
    ],
    verifie: '2026-09-19',
  },

  {
    slug: 'racheter-une-entreprise-sans-apport-personnel',
    question: 'Peut-on racheter une entreprise sans apport personnel ?',
    titreMeta: 'Racheter une entreprise sans apport',
    aussi: [
      'reprise entreprise sans apport',
      'financer un rachat avec un crédit vendeur',
      'montage LBO reprise',
    ],
    famille: 'Transmission',
    reponseCourte:
      "Sans rien, presque jamais. Avec beaucoup moins qu'on ne croit, souvent. L'apport se complète par d'autres sources, il ne se remplace pas.",
    corps: [
      {
        titre: 'Le montage habituel',
        paragraphes: [
          "Une société est créée pour acheter la cible. Elle s'endette, et la cible rembourse par ses dividendes.",
          "Le prêteur regarde donc une chose. La capacité de la cible à payer sa propre dette.",
          "Si cette capacité est mince, aucun apport raisonnable ne sauvera l'opération.",
        ],
      },
      {
        titre: "Ce qui complète l'apport",
        paragraphes: [
          "Le crédit vendeur : le cédant accepte d'être payé en partie plus tard, sur plusieurs années.",
          "Le complément de prix indexé sur les résultats futurs, qui décale une partie du paiement.",
          "Les prêts d'honneur reprise et les garanties publiques, qui rassurent la banque sur le reste.",
        ],
      },
      {
        titre: 'Pourquoi un cédant accepte',
        paragraphes: [
          "Parce qu'il vend plus cher, et plus vite, à un repreneur qui tient la route.",
          "Parce qu'un crédit vendeur signale sa propre confiance dans l'entreprise qu'il cède.",
          "Parce que sans cela, beaucoup de belles PME ne trouvent tout simplement pas d'acquéreur.",
        ],
      },
      {
        titre: 'Le point de rupture',
        paragraphes: [
          "Le montage tient si la cible dégage assez de trésorerie, après impôt, pour servir la dette.",
          "Il casse si le repreneur doit en plus financer la croissance. Un besoin en fonds de roulement qui gonfle suffit.",
          "C'est la raison pour laquelle le plan de reprise se chiffre avant de négocier le prix.",
        ],
      },
    ],
    aRetenir: [
      'La cible doit pouvoir rembourser la dette qui sert à la racheter.',
      'Crédit vendeur et complément de prix réduisent le besoin immédiat.',
      "Un cédant accepte le crédit vendeur parce qu'il vend mieux.",
      'Le plan se chiffre avant la négociation du prix, pas après.',
    ],
    lexique: ['croissance-externe', 'holding', 'besoin-en-fonds-de-roulement'],
    expertise: {
      libelle: 'M&A et transmission',
      href: '/expertises/m-a-et-transmission',
    },
    voisines: [
      'faut-il-creer-une-holding-avant-une-levee-de-fonds',
      'le-pret-d-honneur-se-cumule-t-il-avec-un-pret-bancaire',
    ],
    verifie: '2026-09-19',
  },
];

export const parSlugQuestion = (slug: string) =>
  QUESTIONS_PAGES.find((q) => q.slug === slug);
