/**
 * Constantes du site. Toute donnée affichée plus d'une fois vit ici.
 * Aucun chiffre ne doit être ajouté sans figurer au cahier des charges.
 */

export const MARQUE = 'sabi&co';

export const CONTACT = {
  email: 'sacha@sabi-co.fr',
  linkedin: 'https://www.linkedin.com/in/sachabitoun/',
  ville: 'Paris',
  pays: 'France',
} as const;

export const NAV = [
  { libelle: 'Expertises', href: '/expertises' },
  { libelle: 'Financement', href: '/financement' },
  { libelle: 'Lexique', href: '/lexique' },
  { libelle: 'Références', href: '/references' },
  { libelle: 'À propos', href: '/a-propos' },
  { libelle: 'Contact', href: '/contact' },
] as const;

/*
  Le sommaire du pied de page. Plus large que le bandeau, qui doit rester court.
  Le lexique y entre : c'est ce qui permet à un moteur d'atteindre les seize
  fiches depuis n'importe quelle page du site.
*/
export const NAV_PIED = [
  { libelle: 'Expertises', href: '/expertises' },
  { libelle: 'Financement', href: '/financement' },
  { libelle: 'Lexique', href: '/lexique' },
  { libelle: 'Références', href: '/references' },
  { libelle: 'À propos', href: '/a-propos' },
  { libelle: 'Contact', href: '/contact' },
] as const;

export const NAV_LEGAL = [
  { libelle: 'Mentions légales', href: '/mentions-legales' },
  { libelle: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
] as const;

/*
  L'action du site. Elle mène à la page Contact, pas à un agenda en ligne :
  le créneau réservé sans échange préalable amène des rendez-vous mal cadrés.
*/
export const RDV = 'Contactez-nous';
export const RDV_HREF = '/contact';

/*
  Mesure d'audience Ahrefs.

  Cette clé est publique par construction : elle est lue dans le HTML de chaque
  page par le script de mesure. Elle n'ouvre aucun accès au compte et n'a rien
  à faire dans les secrets GitHub.

  L'outil ne dépose aucun cookie et ne collecte aucune donnée personnelle, ce
  qui dispense de bandeau de consentement. Vider cette valeur retire le script
  du site entier, sans autre modification.
*/
export const AHREFS_CLE = 'HLcj3ovruUDoXZUpzayq6g';

/*
  TODO formulaire : coller ici l'identifiant du formulaire Formspree.
  Il se lit dans l'URL de l'endpoint, https://formspree.io/f/<identifiant>,
  c'est la suite de lettres à la fin.

  Tant que cette valeur est vide, la page Contact affiche les coordonnées
  directes au lieu d'un formulaire qui n'aboutirait pas. Aucun visiteur ne
  se retrouve devant un envoi qui échoue en silence.
*/
export const FORMSPREE_ID = '';
