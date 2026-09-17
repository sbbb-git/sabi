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

**Le périmètre n'est pas que financier.** Le client l'a redit le 17 septembre
2026 : « je fais aussi conseil en stratégie et développement, ça doit pas être
que financement à chaque fois, il doit y avoir structurer organiser,
juridique ». La cinquième expertise a donc été réécrite : « Structuration du
développement » devient **« Stratégie et développement »**, et couvre le plan
chiffré, la structure juridique et l'organisation.

Six expertises :

1. Direction financière à temps partagé
2. Financement
3. Subventions et aides publiques
4. M&A et transmission
5. Stratégie et développement
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

Le titre d'accueil porte depuis le mot demandé par le client : « Structurer,
financer et accompagner la croissance. » La ligne d'ambition vient à côté de
lui, sur la section Financement, pas à sa place.

## Objectif du site

Un seul : obtenir un premier échange.

**L'agenda en ligne a été retiré** le 17 septembre 2026, sur demande du client.
Toute action du site mène désormais à `/contact`, sous le libellé
« Contactez-nous ». Le lien Calendly ne figure plus nulle part, ni dans les
pages, ni dans le bandeau, ni dans le pied.

Le raisonnement tient : un créneau réservé sans échange préalable amène des
rendez-vous mal cadrés, et le brief du client dit que ce qui compte est la
qualité des rendez-vous, pas leur nombre.

La page Contact propose l'adresse email et le profil LinkedIn. Le formulaire
reste un confort, pas le passage obligé.

## Mesure d'audience

**Ahrefs Web Analytics**, branché le 17 septembre 2026. Sans cookie, sans
identifiant persistant, sans donnée personnelle, donc **sans bandeau de
consentement** au sens des lignes directrices de la CNIL.

La clé `AHREFS_CLE` vit dans `src/consts.ts`. Elle est publique par
construction, puisqu'elle est lue dans le HTML de chaque page : elle n'a rien à
faire dans les secrets GitHub. La vider retire le script du site entier.

La politique de confidentialité nomme l'outil, son éditeur et le lien vers sa
propre politique. Si un outil déposant un cookie le remplace un jour, le
bandeau de consentement devient obligatoire et cette page doit être réécrite.

## Ce qui est vrai, et rien d'autre

Les seuls chiffres autorisés sur le site, tous vérifiés :

| Chiffre | Sens |
|---|---|
| 15 entités | consolidées, mission structuration de groupe |
| 500 000 € | recherchés, mission distribution d'équipements |

### Revirement du client, 16 septembre 2026

Le bandeau de statistiques avait été supprimé sur sa demande, en termes nets.
Il en redemande un, en haut de l'accueil, sur le modèle de sateip.fr : « mets
des gros chiffres vers le début, nombre de dossiers, montant levé, entreprises
accompagnées ».

C'est sa décision, elle est appliquée. Mais elle ne change rien à la source :
**seuls les chiffres du portfolio peuvent être affichés.** Le bandeau
`CHIFFRES_CLES` ne porte donc que du vérifiable, et chaque entrée déclare sa
provenance dans le code.

### Les chiffres donnés par le client, 17 septembre 2026

Il les a fournis, ils remplacent ceux tirés du portfolio. Ils couvrent toute
son activité, que le portfolio ne représente qu'en partie.

| Affiché | Source |
|---|---|
| +25 missions conduites | client |
| +20 M€ levés, en dilutif ou non dilutif | client |
| 100 % d'entrepreneurs satisfaits | client |

**Réserve signalée.** « 100 % d'entrepreneurs satisfaits » est une allégation
commerciale. En droit français, elle doit pouvoir s'appuyer sur une mesure si
elle est contestée. Aucune enquête ne la documente à ce jour. Le client en a
été informé ; la décision lui appartient.

Les chiffres de mission restent attachés à leur mission dans les références.

Retirés également : le compte de centres ouverts, le volume de patients, et
toute mention de l'ARS. Le site ne doit pas se lire comme un cabinet de santé.

Aucun autre chiffre ne doit apparaître. Aucun nom de client. Aucun témoignage
tant qu'il n'y en a pas de réel.

## L'architecture du site

Trente pages, en quatre niveaux.

| Niveau | Pages | Ce qu'il répond |
|---|---|---|
| Accueil | 1 | « Que fait ce cabinet » en dix secondes |
| Rubriques | 5 | Expertises, Financement, Lexique, Références, À propos |
| Expertises | 6 | « Savez-vous faire ceci » |
| Lexique | 16 | « C'est quoi ceci » |

**Les six expertises ont chacune leur page.** Cinq sous `/expertises/<slug>`, la
sixième est `/financement`, plus large que les autres parce qu'elle couvre les
deux voies, l'amorçage et le financement public. Elle n'est pas dupliquée.

**Le lexique existe pour une raison précise.** Un dirigeant qui cherche « c'est
quoi une avance remboursable » ne cherche pas un cabinet. Il cherche à
comprendre. La fiche répond, et lui montre qui sait en parler. C'est la seule
façon d'exister sur des recherches réelles sans écrire de la publicité.

Chaque fiche renvoie à l'expertise qui la met en œuvre, et à ses voisines. Une
fiche isolée ne sert ni le lecteur ni le moteur.

### Ce que porte chaque page

- Un fil d'ariane, visible et déclaré en `BreadcrumbList`.
- Un titre d'onglet sous 60 caractères et une description sous 160.
- Une URL canonique sans extension.
- Les données structurées de ce que la page montre vraiment : `Service` sur une
  expertise, `FAQPage` là où une FAQ est affichée, `DefinedTerm` sur une fiche.

Une FAQ déclarée mais absente de la page est une fausse déclaration. Les
fabriques de `src/lib/schema.ts` prennent donc les mêmes données que le rendu.

### Les cinq piliers ont été retirés

« Les chiffres / La structure / Les projets / Les financements / Les outils »
redisaient les six expertises, placées juste au-dessus, en plus vague. C'est
exactement le texte creux que le client désigne comme ce qui fait échouer un
site de cabinet. Récupérables dans l'historique.

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

## Densité de texte

Le client a demandé **plus de mots et plus de mots clefs**, puis, une fois
livré, a trouvé que ça faisait **trop de texte**. Les deux sont vrais, et ce
n'est pas le nombre de mots qui gênait : c'était le gris, des paragraphes de
quatre ou cinq phrases sans rien pour les couper.

La règle qui en sort :

- **Trois phrases maximum** dans un paragraphe de corps. Deux valent mieux.
- Les mots clefs vivent dans les **listes cotées**, qui se balayent, plutôt que
  dans la prose, qui se lit ou se saute. Le référencement ne perd rien, le
  lecteur gagne.
- Un chapô de section ne redit pas la liste qui le suit.
- Une page de texte se coupe par une **planche photo** ou par une bande
  d'encre, pas par un titre de plus.

Repères : 10 070 mots rédigés sur 28 pages indexables. Aucune phrase de plus de
seize mots. Aucun signalement du détecteur.

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
- Lighthouse mobile : 100 en accessibilité, bonnes pratiques et référencement.
  **99 en performance** depuis l'arrivée du mouvement, pour 53 Ko compressés de
  bibliothèque. C'est un arbitrage assumé, pas une dérive : le client a demandé
  les animations en connaissance de cause.
- Le mouvement s'appuie sur GSAP, ScrollTrigger, SplitText et Lenis, servis en
  local. Voir la section « Le mouvement » de `DESIGN.md`.

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
