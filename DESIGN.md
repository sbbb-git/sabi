# DESIGN.md — sabi&co

Le monde visuel du site, décrit **depuis ce qui est construit**, pas depuis ce
qui était prévu. Ce fichier a autorité sur toute décision esthétique. La vérité
produit vit dans `PRODUCT.md`. Le contrat de direction de l'accueil vit dans
`.impeccable/surfaces/src-pages-index-astro.md`, seed `e0ddb9ea`.

## Le monde : le plan de masse

Le site est une planche de dessin technique : trame, cotes, repères, cartouche.
Le monde dit « on trace et on fait construire » là où la catégorie dit « on
conseille ». La photographie y apporte la structure réelle.

Le plan d'implantation du premier jet a été retiré : il chiffrait des ouvertures
de centres, ce que le client ne veut plus voir mentionné.

Directions rejetées, elles ne se rediscutent pas :

- **Aucun serif.** Une direction serif a été construite puis rejetée.
- **Pas d'aplat marine plein écran** avec grosse grotesque centrée. Livré deux
  fois, rejeté deux fois comme « fade et lisse ».
- **Pas de bleu corporate générique**, ni son opposé prévisible, le noir avec
  un néon.

## Typographie

Un seul alphabet : **Archivo Variable**, servi en local, jamais de CDN. Il porte
un axe de largeur de 62 à 125 %, ce qui en fait l'équivalent d'une boîte de
lettrage de dessinateur : la même lettre, resserrée selon le rôle.

| Rôle | Largeur | Graisse | Détail |
|---|---|---|---|
| `.nom-ouvrage` | 86 % | 600 | `clamp(2.5rem, 7.2vw, 5.5rem)`, interlignage 0.94 |
| `.titre-planche` | 86 % | 600 | `clamp(1.875rem, 4vw, 3rem)` |
| `.titre-rubrique` | 92 % | 600 | `clamp(1.125rem, 1.6vw, 1.375rem)` |
| `.cote` | 78 % | 500 | 11px, capitales, interlettrage 0.18em |
| Corps | 100 % | 400 | 17px, interlignage 1.6 |

Interlettrage plafonné à -0.03em. Chiffres en `tabular-nums` sur tout le site.

La fonte est **préchargée** dans `Base.astro`. Sans ce préchargement, le
basculement depuis la police système décale la mise en page : 0,083 de CLS
mesuré avant correction.

## Palette

Relevée sur les références du client, pas choisie au jugé. Mesure des surfaces
réellement peintes sur leurs pages :

| Source | Valeur | Ce qu'elle couvre chez eux |
|---|---|---|
| sateip.fr | `#0B1728` | 6,5 M px², la couleur dominante du site |
| 26advisory.com | `#18509E` | 5,9 M px², devant leur propre marine |

```
--papier        #FFFFFF   fond des sections de contenu
--papier-clair  #F6F7F9   sections en retrait
--encre         #0B1728   héros, bandes fortes, cartouche, texte
--tirage        #18509E   accent unique : cotes, repères, action, renvois
--tirage-clair  #8FB6E8   le même, sur fond encre
--tirage-pale   #D4DFEC   filets uniquement, jamais du texte
--graphite      #5A6A7D   texte secondaire sur blanc
```

Contrastes : `--tirage` sur blanc 7,8:1, `--graphite` sur blanc 5,6:1,
`--tirage-clair` sur `--encre` 8,7:1.

## Les pictogrammes

Ce ne sont pas des icônes d'interface. Chacune est un **détail de dessin
technique** : une forme construite, sa ligne de construction en trait fin sous
l'encre, et une cote quand elle dit quelque chose. C'est le vocabulaire de
`.ligne-cote` et de `.repere`, à l'échelle du picto.

Un seul composant, `Icone.astro`, porte les dix-sept glyphes. Le nom du picto
vit dans la donnée, pas dans la page : `PILIERS`, `EXPERTISES`, `SITUATIONS`,
`VOIES_FINANCEMENT` et `ETAPES_FINANCEMENT` portent chacun son `icone`, typé
`NomIcone`. Une faute de frappe casse la compilation.

| Règle | Valeur |
|---|---|
| Grille | 32 × 32, jamais redimensionnée dans le tracé |
| Trait porteur | 1.25 |
| Ligne de construction | 0.75, opacité 0.4 à 0.55 |
| Bouts et angles | `square` et `miter`, **jamais d'arrondi** |
| Remplissage | aucun, `fill="none"` sans exception |
| Couleur | `currentColor`, posée par `text-tirage` ou `text-tirage-clair` |
| Tirets | `stroke-dasharray` pour ce qui est hypothétique ou extérieur |

Deux directions écartées à l'essai : une flèche de lancement qui se lisait
comme une loupe, et une négociation dont les têtes de flèche mangeaient l'axe.

Le picto ne remplace jamais le numéro de repère, il se pose à côté.

## Photographies

Des vues de **Paris** : toits, ciel, avenue, pont, viaduc. Jamais de bureau,
jamais de réunion, jamais de poignée de main. C'est la leçon de sateip.fr, qui
illustre à l'haussmannien et non au open space.

Cinq images sous licence CC BY ou CC0, créditées dans les mentions légales,
servies en local, converties en WebP par Astro, et désaturées par
`.tirage-photo` pour n'introduire aucune couleur parasite.

Le héros les pose sous un dégradé d'encre, de l'opaque à gauche vers le
translucide à droite, pour que le titre garde son contraste.

**La planche photo**, `BandePhoto.astro`, est autre chose : une vue pleine
largeur qui **coupe une page de texte**, comme une feuille photographique
glissée entre deux feuilles de dessin. Elle porte sa légende cotée en pied.

La photographie y reste une photographie. Un premier essai la posait à 62 %
sur l'encre : la vue disparaissait dans l'aplat. L'encre ne revient plus que
dans les 42 % du bas, en dégradé, pour tenir la légende lisible.

## Le vocabulaire de la planche

Aucune carte, aucun rayon de bordure, aucune ombre. La structure vient du trait.

| Élément | Rôle |
|---|---|
| `.planche` | le conteneur, 1320px, marges 20px puis 56px |
| `.trait` | filet de séparation, 1px de `--tirage-pale` |
| `.ligne-cote` | segment à empattements, se termine sur une arête réelle |
| `.repere` | pastille circulaire numérotée |
| `.cartouche` | le bloc en pied, seul aplat de la planche, porte l'action |
| `.etiquette` | l'action, en étiquette de cartouche, capitales resserrées |
| `.renvoi` | lien annoté, sa ligne de rappel se déploie au survol |
| `.hachure` | hachure d'emprise bâtie, jamais une texture de fond |
| `Icone` | le détail technique, 32 × 32, posé à côté du repère |
| `BandePhoto` | la feuille photographique qui coupe une page de texte |

## Interdits, vérifiés contre ce projet

Issus du socle de qualité d'Impeccable :

- Pas de surtitre au-dessus d'un titre. Les `.cote` de rubrique sont des
  **repères de planche numérotés**, placés en colonne latérale, jamais en
  étiquette posée sur un titre.
- Pas de grille de cartes identiques. Les expertises sont des lignes cotées.
- ~~Pas de bandeau de chiffres collé sous le héros.~~ **Levé par le client**,
  qui le demande explicitement, sur le modèle de sateip.fr. Les cotes de
  l'ouvrage sont revenues juste sous le héros.
- Pas de monospace en costume technique. Il n'y a pas de monospace sur ce site.
- **Pas d'icône d'interface générique.** Un jeu tiré d'une bibliothèque, avec
  ses bouts arrondis et ses formes pleines, casse la planche. Les pictos sont
  dessinés pour ce site et ne sortent pas de `Icone.astro`.
- ~~Pas d'apparition en fondu au scroll.~~ **Levé par le client**, qui demande
  du mouvement au défilement. La règle qui la remplace est plus dure : voir
  « Le mouvement » ci-dessous. Une entrée identique sur chaque section reste
  interdite.
- Ne jamais animer `width`, `height`, `padding` ou `margin`.

## Le mouvement

Sur une planche, rien n'apparaît en fondu. Un trait se trace, une cote se pose,
une ligne se tire. Le mouvement suit cette logique, pas le fondu générique.

Tout vit dans `src/scripts/mouvement.ts`. GSAP, ScrollTrigger, SplitText et
Lenis, servis en local, jamais en CDN.

| Effet | Ce qui bouge | Où |
|---|---|---|
| Défilement fluide | Lenis, dans le ticker de GSAP | tout le site |
| Titre mot par mot | chaque mot monte dans sa fenêtre | `h1`, `h2` |
| Phrase d'un bloc | `y` et `opacity` | `p.titre-planche` |
| Filet qui se trace | `scaleX` depuis l'origine gauche | `.ligne-cote`, `.trait` |
| Picto dessiné | `stroke-dashoffset` | les dix-sept glyphes |
| Rangée qui monte | `y` et `opacity`, par paquets | `[data-rangee]` |
| Cote qui s'incrémente | le texte, chiffre par chiffre | `[data-compteur]` |
| Photo qui glisse | `yPercent`, lié au défilement | `[data-parallaxe]` |
| Bandeau escamotable | `yPercent` du `header` | tout le site |
| Bande figée | `pin` plus `scrub` | une seule par page |

Quatre règles, tenues partout :

1. **Le contenu est lisible sans JavaScript.** Les états de départ sont dans la
   feuille de style, sous `html.js`, classe écrite avant la peinture par un
   script en ligne. Et un filet : si le module ne s'annonce pas en 2,6 s, la
   classe `mouvement-abandon` rend tout visible.
2. **`prefers-reduced-motion` coupe tout.** Aucune branche animée n'est créée,
   et les états cachés vivent tous dans `@media (prefers-reduced-motion:
   no-preference)`.
3. **Jamais de `width`, `height`, `margin` ni `padding` animés.** Uniquement
   `transform`, `opacity` et `stroke-dashoffset`.
4. **Un seul rythme.** Lenis tourne dans le ticker de GSAP. Deux boucles
   concurrentes font dériver les repères et sauter les sections figées.

Deux pièges rencontrés, à ne pas refaire :

- `SplitText` pose un `aria-label` sur l'élément découpé. Cet attribut est
  interdit sur un `<p>`, qui n'a pas de rôle : Lighthouse tombe à 96. La
  découpe est donc réservée aux vrais titres.
- `getTotalLength()` force un calcul de mise en page. Mesurer les dix-sept
  pictos au démarrage coûtait 100 ms de blocage. La mesure se fait à l'entrée
  du picto, un seul à la fois.

Le mouvement coûte un point de performance : 99 au lieu de 100, pour 53 Ko
compressés de bibliothèque. Le blocage reste à 110 ms, sous le seuil de 200.

## Vérification avant de livrer

```bash
npm run build                                          # 0 erreur, 0 avertissement
sh .claude/skills/impeccable/scripts/impeccable detect --json <cibles>
```

Plus le contrôle maison, qui compose les fonds sur un canvas plutôt que de lire
la chaîne CSS : Tailwind 4 émet de l'`oklab()` dès qu'une opacité entre en jeu,
et un parseur naïf y lit n'importe quoi.

Outillage non versionné, réinstallable : `npx skills add pbakaus/impeccable`
