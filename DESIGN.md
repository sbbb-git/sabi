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

## Photographies

Des vues de **Paris** : toits, ciel, avenue. Jamais de bureau, jamais de
réunion, jamais de poignée de main. C'est la leçon de sateip.fr, qui illustre
à l'haussmannien et non au open space.

Deux images sous licence CC BY 2.0, créditées dans les mentions légales,
servies en local, converties en WebP par Astro, et désaturées par
`.tirage-photo` pour n'introduire aucune couleur parasite.

Le héros les pose sous un dégradé d'encre, de l'opaque à gauche vers le
translucide à droite, pour que le titre garde son contraste.

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

## Interdits, vérifiés contre ce projet

Issus du socle de qualité d'Impeccable :

- Pas de surtitre au-dessus d'un titre. Les `.cote` de rubrique sont des
  **repères de planche numérotés**, placés en colonne latérale, jamais en
  étiquette posée sur un titre.
- Pas de grille de cartes identiques. Les expertises sont des lignes cotées.
- Pas de bandeau de chiffres collé sous le héros. Les cotes de l'ouvrage vivent
  sur la page À propos.
- Pas de monospace en costume technique. Il n'y a pas de monospace sur ce site.
- **Pas d'apparition en fondu au scroll.** Une entrée identique sur chaque
  section est le réglage par défaut. Elle a été retirée.
- Ne jamais animer `width`, `height`, `padding` ou `margin`.

## Vérification avant de livrer

```bash
npm run build                                          # 0 erreur, 0 avertissement
sh .claude/skills/impeccable/scripts/impeccable detect --json <cibles>
```

Plus le contrôle maison, qui compose les fonds sur un canvas plutôt que de lire
la chaîne CSS : Tailwind 4 émet de l'`oklab()` dès qu'une opacité entre en jeu,
et un parseur naïf y lit n'importe quoi.

Outillage non versionné, réinstallable : `npx skills add pbakaus/impeccable`
