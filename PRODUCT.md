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

Aucun secteur n'est affiché comme spécialité. Le client a demandé que le site
ne se lise pas comme un cabinet de santé : ni compte de centres ouverts, ni
volume de patients, ni mention de l'ARS.

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

### Le financement, dans toute son étendue

Périmètre élargi par le client le 16 septembre 2026, à sa demande et sur ses
mots. Le portfolio ne le couvrait pas : la source ici, c'est lui.

- **Les deux voies.** Financement **dilutif**, qui ouvre le capital, et
  financement **non dilutif**, qui le laisse intact. Le site doit le dire
  explicitement, parce que c'est le premier arbitrage que pose un dirigeant.
- **L'amorçage.** Le cabinet finance aussi les projets qui démarrent :
  accompagnement au lancement, prêts d'honneur, premiers tours de table,
  entrée de business angels.
- **Bpifrance** est nommé, avec les guichets régionaux et sectoriels.

Ce périmètre a sa page, `/financement`, qui porte la ligne du client en titre et
entre au sommaire de navigation en rubrique 02.

## La ligne

> « Financer votre ambition »
> « Pour enfin avoir les moyens de son ambition »

Deux formulations du client, reprises **telles qu'il les a écrites**. La
première titre la page Financement et la section d'accueil qui lui correspond.
La seconde ferme l'accueil et la page Financement.

Le détecteur maison signale d'ordinaire l'adverbe d'insistance dans « pour
enfin ». Ici la formulation du client prime, et elle est conservée.

Le titre d'accueil, « Structurer et financer la croissance », ne bouge pas : il
a été validé, et la ligne d'ambition vient à côté de lui, pas à sa place.

## Objectif du site

Un seul : obtenir un premier échange. Deux chemins, email et créneau de
30 minutes. Le formulaire est un confort, pas le passage
obligé.

## Ce qui est vrai, et rien d'autre

Les seuls chiffres autorisés sur le site, tous vérifiés :

| Chiffre | Sens |
|---|---|
| 15 entités | consolidées, mission structuration de groupe |
| 500 000 € | recherchés, mission distribution d'équipements |

Les chiffres n'apparaissent plus que dans les références, attachés à une
mission. **Le bandeau de statistiques de la page À propos a été supprimé** sur
demande du client, avec les montants levés, structurés et le nombre
d'acquisitions.

Retirés également : le compte de centres ouverts, le volume de patients, et
toute mention de l'ARS. Le site ne doit pas se lire comme un cabinet de santé.

Aucun autre chiffre ne doit apparaître. Aucun nom de client. Aucun témoignage
tant qu'il n'y en a pas de réel.

## Relecture avant publication

Tout texte rédactionnel passe par le skill maison `anti-slop-fr`, dans
`.claude/skills/anti-slop-fr/`. Les skills anglais du même genre, `stop-slop` et
`avoid-ai-writing`, attrapent les structures mais pas les phrases bateaux
françaises : « véritable levier », « il est essentiel de », « au cœur de ».

```bash
node .claude/skills/anti-slop-fr/detecte.mjs <fichiers texte>
```

Le détecteur porte sur le **texte rendu**, pas sur le code : les commentaires
de source ne sont pas du contenu. Deux passes, la seconde attrape ce que la
réécriture a introduit.

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

**Il n'est pas nommé sur le site.** Le client a demandé qu'on ne parle pas de
lui comme fondateur : le site parle au nom du cabinet, point. Le bloc signataire
de la page À propos a été supprimé.

Le lien LinkedIn reste dans le pied de page et dans les données structurées.

## Contraintes techniques

- Astro en sortie statique, Tailwind CSS 4, TypeScript. Aucun framework front.
- Hébergé sur Cloudflare Pages, déployé par GitHub Actions à chaque poussée.
- Le formulaire passe par Formspree, sans backend.
- Le site doit rester lisible sans JavaScript.
- Lighthouse mobile visé à 100 sur les 4 catégories, tenu aujourd'hui.

## Contenu rédactionnel et contenu factuel

Deux régimes, à ne pas confondre.

**Le factuel** vient du portfolio `sabi-co_Portfolio.pptx`, et de lui seul :
les sept missions conduites, leurs secteurs, leurs objets, leurs chiffres. Le
portfolio contient exactement sept missions, pas une de plus. Toute mission
supplémentaire doit venir du client.

**Le rédactionnel** explique l'offre : le développé des six expertises, les
quatre situations qui déclenchent un appel, les six questions de premier
rendez-vous. Il a été écrit pour le lecteur et pour les moteurs, à la demande
du client, sur le constat que le site tenait 337 mots quand 26advisory.com en
tient 481 et smashgroup.fr 1 356.

Ce contenu n'introduit **aucun chiffre, aucun nom de client, aucun tarif et
aucun délai promis**. Il n'emploie que le vocabulaire réel du métier, qui est
aussi celui que les dirigeants tapent dans un moteur.

## Ce qui manque encore

- **D'autres missions.** Le portfolio n'en contient que sept, toutes déjà en
  ligne. Le client en a évoqué d'autres : elles doivent être fournies.
- Identifiant Formspree, `FORMSPREE_ID` dans `src/consts.ts`
- Mentions légales : dénomination, forme juridique, capital, SIREN, RCS, TVA,
  adresse du siège
- Responsable de traitement pour la politique de confidentialité
