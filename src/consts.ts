/**
 * Constantes du site. Toute donnée affichée plus d'une fois vit ici.
 * Aucun chiffre ne doit être ajouté sans figurer au cahier des charges.
 */

export const MARQUE = 'sabi';

export const CONTACT = {
  email: 'sacha.bitoun@essec.edu',
  telephone: '+33 6 19 87 80 96',
  telephoneLien: '+33619878096',
  calendly: 'https://calendly.com/b00765209-essec/new-meeting',
  // TODO réseaux : confirmer l'URL LinkedIn définitive du cabinet.
  linkedin: 'https://www.linkedin.com/in/sacha-bitoun',
  ville: 'Paris',
  pays: 'France',
} as const;

export const NAV = [
  { libelle: 'Expertises', href: '/expertises' },
  { libelle: 'Références', href: '/references' },
  { libelle: 'À propos', href: '/a-propos' },
  { libelle: 'Contact', href: '/contact' },
] as const;

export const NAV_LEGAL = [
  { libelle: 'Mentions légales', href: '/mentions-legales' },
  { libelle: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
] as const;

export const RDV = 'Prendre rendez-vous';
