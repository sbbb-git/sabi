# DESIGN.md — sabi&co

Le monde visuel du site, décrit **depuis ce qui est construit**, pas depuis ce
qui était prévu. Ce fichier a autorité sur toute décision esthétique. La vérité
produit vit dans `PRODUCT.md`. Le contrat de direction de l'accueil vit dans
`.impeccable/surfaces/src-pages-index-astro.md`, seed `e0ddb9ea`.

## Le monde : le plan de masse

Le site est une planche de dessin technique. Ce n'est pas une métaphore
décorative : sabi&co a réellement implanté treize centres en cinq ans, et le
plan est le document que ce travail produit. Le monde dit « on trace et on fait
construire » là où la catégorie dit « on conseille ».

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

```
--papier        #F2EFE6   fond général, jamais de blanc écran
--papier-clair  #F8F6F0   sections en retrait
--calque        #E8E4D8   fond de barre de défilement
--encre         #14263D   texte, cartouche, traits forts
--tirage        #2F5D92   cotes, filets de cote, repères
--tirage-pale   #9DB4CC   filets uniquement, jamais du texte
--sanguine      #B23A1F   cotes actives, action, repères nommés
--sanguine-clair #E8734F  la même, sur fond encre
--graphite      #5A6472   texte secondaire sur papier
```

Deux pièges vérifiés et corrigés :

- `--tirage-pale` tombe à **1,9:1** sur le papier. Il ne sert qu'aux filets.
  Pour du texte pâle sur papier, c'est `--tirage` qui sert, à 5,9:1.
- `--sanguine` tombe à **2,6:1** sur l'encre. Sur le cartouche, c'est
  `--sanguine-clair` qui sert, à 5,1:1.

## Le vocabulaire de la planche

Aucune carte, aucun rayon de bordure, aucune ombre. La structure vient du trait.

| Élément | Rôle |
|---|---|
| `.planche` | le conteneur, 1320px, marges 20px puis 56px |
| `.trait` | filet de séparation, 1px de `--tirage-pale` |
| `.ligne-cote` | segment à empattements, se termine sur une arête réelle |
| `.repere` | pastille circulaire d'implantation |
| `.cartouche` | le bloc en pied, seul aplat de la planche, porte l'action |
| `.etiquette` | l'action, en étiquette de cartouche, capitales resserrées |
| `.renvoi` | lien annoté, sa ligne de rappel se déploie au survol |
| `.hachure` | hachure d'emprise bâtie, jamais une texture de fond |

Le composant `PlanImplantation` dessine les treize implantations en géométrie
fixe. Il porte un nom accessible et une légende. Le blanc de réserve derrière
la cote suit la convention du dessin : la cote interrompt son trait.

## Interdits, vérifiés contre ce projet

Issus du socle de qualité d'Impeccable :

- Pas de surtitre au-dessus d'un titre. Les `.cote` de rubrique sont des
  **repères de planche numérotés**, placés en colonne latérale, jamais en
  étiquette posée sur un titre.
- Pas de grille de cartes identiques. Les expertises sont des lignes cotées.
- Pas de bandeau de chiffres collé sous le héros. Les quatre cotes de l'ouvrage
  vivent sur la page À propos.
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
