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
  { libelle: 'Questions', href: '/questions' },
  { libelle: 'Références', href: '/references' },
  { libelle: 'À propos', href: '/a-propos' },
  { libelle: 'Contact', href: '/contact' },
] as const;

/*
  Le numéro de rubrique d'une page, calculé depuis le sommaire.

  Il a déjà menti une fois, écrit à la main : Références portait « Rubrique 02 »
  quand le sommaire la donnait en 04. Aucune page ne doit donc le coder en dur,
  sous peine de recommencer à la prochaine entrée ajoutée au sommaire.
*/
export function coteRubrique(href: string, objet: string) {
  const rang = NAV.findIndex((l) => l.href === href);
  if (rang < 0) return objet;
  return `Rubrique ${String(rang + 1).padStart(2, '0')} · ${objet}`;
}

/*
  Le sommaire du pied de page. Plus large que le bandeau, qui doit rester court.
  Le lexique y entre : c'est ce qui permet à un moteur d'atteindre les seize
  fiches depuis n'importe quelle page du site.
*/
export const NAV_PIED = [
  { libelle: 'Expertises', href: '/expertises' },
  { libelle: 'Financement', href: '/financement' },
  { libelle: 'Lexique', href: '/lexique' },
  { libelle: 'Questions', href: '/questions' },
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
  Google Analytics 4. Identifiant fourni par le client le 17 septembre 2026.

  ATTENTION, ce n'est pas le même régime qu'Ahrefs. GA4 dépose des cookies
  (`_ga`, `_ga_*`) et transmet des données à Google. En France, la CNIL ne le
  range pas parmi les outils exemptés de consentement : un bandeau est
  légalement requis pour le charger. Le site n'en a pas à ce jour.

  La politique de confidentialité dit la vérité sur ce point. Vider cette
  valeur retire la balise du site entier.
*/
export const GA_MESURE = 'G-G19LHMWVFN';

/*
  Formulaire de contact, chez Formspree. Identifiant fourni par le client le
  17 septembre 2026.

  Il est public par nature : il figure dans l'attribut `action` du formulaire,
  donc dans le HTML de la page Contact. Il n'ouvre aucun accès au compte et
  n'a rien à faire dans les secrets GitHub.

  Vider cette valeur retire le formulaire et affiche les coordonnées directes
  à la place. Mieux vaut cela qu'un envoi qui échoue en silence.
*/
export const FORMSPREE_ID = 'xljdeboa';
