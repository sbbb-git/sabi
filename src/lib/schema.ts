/**
 * Fabriques de données structurées.
 *
 * Un seul endroit décide de la forme des schémas, pour que les pages ne
 * recopient pas des objets à la main. Chaque fabrique rend un objet prêt à
 * passer dans la propriété `schemas` de `Base`.
 *
 * Règle de fond : un schéma décrit ce que la page affiche réellement. Une FAQ
 * déclarée mais absente de la page est une fausse déclaration, et Google la
 * sanctionne. Les fabriques prennent donc les mêmes données que le rendu.
 */
import { CONTACT, MARQUE } from '../consts';

const SITE = 'https://sabi-co.fr';

export const absolu = (chemin: string) => new URL(chemin, SITE).href;

/** Le cabinet, référencé par les autres schémas plutôt que recopié. */
export const CABINET = {
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#cabinet`,
  name: MARQUE,
  url: SITE,
  email: CONTACT.email,
  areaServed: CONTACT.pays,
  address: {
    '@type': 'PostalAddress',
    addressLocality: CONTACT.ville,
    addressCountry: 'FR',
  },
} as const;

/** Le chemin dans l'ouvrage, tel que le moteur l'affiche sous le résultat. */
export function filAriane(maillons: { libelle: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: maillons.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.libelle,
      ...(m.href ? { item: absolu(m.href) } : {}),
    })),
  };
}

/** Une prestation du cabinet. Sans prix : le site n'en affiche aucun. */
export function service(opts: {
  nom: string;
  description: string;
  chemin: string;
  couvre: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.nom,
    description: opts.description,
    url: absolu(opts.chemin),
    serviceType: opts.nom,
    provider: CABINET,
    areaServed: { '@type': 'Country', name: 'France' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Ce que couvre ${opts.nom.toLowerCase()}`,
      itemListElement: opts.couvre.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c },
      })),
    },
  };
}

/** Les questions de la page, telles qu'elles y sont écrites. */
export function faq(questions: { q: string; r: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.r },
    })),
  };
}

/** Une fiche du lexique : un terme, sa définition, son ensemble. */
export function termeDefini(opts: {
  terme: string;
  definition: string;
  chemin: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: opts.terme,
    description: opts.definition,
    url: absolu(opts.chemin),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Lexique du financement et de la direction financière',
      url: absolu('/lexique'),
    },
  };
}

/** Une liste de pages, pour un index. */
export function listePages(items: { nom: string; chemin: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.nom,
      url: absolu(x.chemin),
    })),
  };
}
