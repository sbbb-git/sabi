/**
 * Constantes du site. Toute donnée affichée plus d'une fois vit ici.
 * Aucun chiffre ne doit être ajouté sans figurer au cahier des charges.
 */

export const MARQUE = 'sabi&co';

export const CONTACT = {
  email: 'sacha@sabi-co.fr',
  calendly: 'https://calendly.com/b00765209-essec/new-meeting',
  linkedin: 'https://www.linkedin.com/in/sachabitoun/',
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

/*
  TODO formulaire : coller ici l'identifiant du formulaire Formspree.
  Il se lit dans l'URL de l'endpoint, https://formspree.io/f/<identifiant>,
  c'est la suite de lettres à la fin.

  Tant que cette valeur est vide, la page Contact affiche les coordonnées
  directes au lieu d'un formulaire qui n'aboutirait pas. Aucun visiteur ne
  se retrouve devant un envoi qui échoue en silence.
*/
export const FORMSPREE_ID = '';
