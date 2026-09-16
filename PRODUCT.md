# PRODUCT.md — sabi&co

Vérité produit. Ce fichier ne décide rien de visuel, il dit ce qui est vrai.
Toute décision esthétique vit dans `DESIGN.md`.

## Ce que c'est

sabi&co est un cabinet indépendant de direction financière à temps partagé,
basé à Paris. Le site est une vitrine : il ne vend rien en ligne, il amène à un
premier échange.

La marque s'écrit `sabi&co`, en minuscules, esperluette collée, jamais
capitalisée. Le domaine porte un tiret : `sabi-co.fr`.

## Qui on sert

Des dirigeants de PME et de scale-up dont l'entreprise grandit plus vite que sa
structure financière. Le déclencheur typique : un sujet financier que personne
en interne ne porte vraiment, et qui devient bloquant.

Aucun secteur n'est affiché comme spécialité, même si les missions conduites
viennent majoritairement de la santé.

## Ce qu'on vend

Six expertises, prises séparément ou combinées :

1. Direction financière à temps partagé
2. Financement
3. Subventions et aides publiques
4. M&A et transmission
5. Structuration du développement
6. Pilotage de la performance

L'angle qui n'appartient qu'à nous : personne sur le marché ne couvre à la fois
le financement public et la direction financière à temps partagé. Les cabinets
de subventions font le public, les réseaux de DAF font le temps partagé.

## Objectif du site

Un seul : obtenir un premier échange. Trois chemins, tous équivalents, email,
téléphone, créneau de 30 minutes. Le formulaire est un confort, pas le passage
obligé.

## Ce qui est vrai, et rien d'autre

Les seuls chiffres autorisés sur le site, tous vérifiés :

| Chiffre | Sens |
|---|---|
| 3 à 13 centres en 5 ans | croissance du groupe de santé dirigé |
| 6 M€ | levés en fonds propres |
| 7 M€ | structurés en dette et crédit-bail |
| 3 | acquisitions menées |
| 15 entités | consolidées, mission imagerie médicale |
| 200 000 patients | analysés par an, même mission |
| 500 000 € | recherchés, mission distribution d'équipements |

Aucun autre chiffre ne doit apparaître. Aucun nom de client. Aucun témoignage
tant qu'il n'y en a pas de réel.

## Interdits de rédaction

- Aucun prix, aucun tarif, aucun modèle de rémunération. Ne jamais écrire
  « au succès ».
- Jamais de tiret cadratin ni de double tiret.
- Les nombres s'écrivent en chiffres.
- Phrases courtes, une idée par phrase.
- Aucune répétition d'une page à l'autre.
- La marque apparaît le moins souvent possible dans les textes.
- Le site parle au nom d'un cabinet, jamais d'une personne. « Le bras droit
  financier des dirigeants » a été rejeté pour cette raison.

## Le fondateur

Sacha Bitoun. ESSEC Grande École, Finance Track. Paris-Dauphine, mathématiques
appliquées. LinkedIn : https://www.linkedin.com/in/sachabitoun/

Il apparaît sur la page À propos, comme fondateur du cabinet, pas comme le sujet
du site.

## Contraintes techniques

- Astro en sortie statique, Tailwind CSS 4, TypeScript. Aucun framework front.
- Hébergé sur Cloudflare Pages, déployé par GitHub Actions à chaque poussée.
- Le formulaire passe par Formspree, sans backend.
- Le site doit rester lisible sans JavaScript.
- Lighthouse mobile visé à 100 sur les 4 catégories, tenu aujourd'hui.

## Ce qui manque encore

- Identifiant Formspree, `FORMSPREE_ID` dans `src/consts.ts`
- Mentions légales : dénomination, forme juridique, capital, SIREN, RCS, TVA,
  adresse du siège
- Responsable de traitement pour la politique de confidentialité
