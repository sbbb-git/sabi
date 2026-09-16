# DESIGN.md — sabi&co

Le monde visuel du site. Ce fichier a autorité sur toute décision esthétique.
En cas de doute, il tranche. La vérité produit vit dans `PRODUCT.md`.

## Le registre

Boutique de conseil financier parisienne, version nette et contemporaine.
Le texte fait le design. Aucune photo, aucune illustration.

Références retenues, dans cet ordre :

- **Reggio Partners** pour l'aplomb : aplat sombre plein écran, une couleur
  signature assumée, titre énorme.
- **SATE Investment Partners** pour la structure : bandeau de données dense,
  hiérarchie nette, graisses légères en grand.
- **26 Advisory** pour la tenue : sobriété de cabinet, rien de tape-à-l'œil.

Rejeté explicitement : le registre des cabinets de DAF externalisé français
(Financyal, Acsio, Auvalie, Référence DAF). Contenu proche, exécution datée.

## Ce que le site ne doit jamais être

Rejets prononcés par le client, ils ne se rediscutent pas :

- **Aucun serif.** Une direction serif a été construite puis rejetée. Les cinq
  références sont toutes en sans-serif.
- **Rien qui sente le gabarit.** Le mot employé est « vibe codé ».
- **Le bleu corporate générique** du premier jet, `#1660C9` sur fond blanc.

## Typographie

| Usage | Police | Détail |
|---|---|---|
| Titres et corps | **Schibsted Grotesk** | variable, servie en local |
| Chiffres et mesures | **Geist Mono** | variable, servie en local |

Le monospace ne sert **que** là où il y a une mesure : montants, comptages,
volumes. Jamais sur une étiquette ou un intitulé, ce serait un costume.

Échelle, desktop puis mobile :

| Rôle | Desktop | Mobile | Graisse | Interlettrage |
|---|---|---|---|---|
| Titre de héros | 78px | 40px | 450 | -0.03em |
| Titre de page | 56px | 32px | 450 | -0.03em |
| Titre de section | 44px | 28px | 450 | -0.03em |
| Titre de ligne | 21px | 17px | 600 | -0.02em |
| Corps | 17px | 16px | 400 | 0 |

Plafond d'interlettrage : -0.03em. Ne jamais descendre à -0.04em.
Mesure du corps de texte : 65 à 75 caractères.
Titre d'affichage plafonné à 6rem.

## Palette

```
--nuit        #07111F   aplats sombres, héros, bandeaux
--bleu        #2563EB   accent unique, boutons, liens, icônes
--bleu-clair  #7FB0FF   accent sur fond sombre, contraste tenu
--doux        #8FA0B4   texte secondaire sur fond sombre, teinté bleu
--ardoise     #55636F   texte secondaire sur fond clair, teinté bleu
--texte       #0B1219   corps de texte
--bord        #E3E6EA   filets sur fond clair
--bord-nuit   rgba(143,160,180,.2)   filets sur fond sombre
--clair       #F5F6F8   fonds de section clairs
--blanc       #FFFFFF
```

Règle de contraste : le texte secondaire est **toujours teinté depuis la
couleur du fond**, jamais un gris neutre. Corps et placeholders à 4.5:1
minimum, grand texte à 3:1.

## Structure

- Conteneur 1280px, marges 20px en mobile et 72px en desktop.
- Le filet de 1px est le seul outil de structure. Pas de carte bordée.
- Élévation déclarée une seule fois : bordure **ou** ombre, jamais les deux.
- Rayon de bordure : 0. Les angles sont nets partout.

## Interdits de mise en page

Tirés du socle de qualité d'Impeccable, vérifiés contre ce projet :

- **Pas de surtitre au-dessus d'un titre.** Interdiction ferme, aucun brief ne
  la rachète. Le titre porte son propre poids.
- **Pas de numérotation 01 / 02 / 03** si la séquence ne porte pas
  d'information. Nos six expertises sont un ensemble, pas une progression.
- **Pas de grille de cartes identiques** icône plus titre plus texte. Les
  expertises sont des lignes séparées par des filets.
- **Pas de bandeau de chiffres collé sous le héros**, c'est le gabarit
  « hero-metric ». Les chiffres vivent sur la page À propos.
- **Pas de dégradé sur du texte.** L'emphase vient de la graisse ou de la taille.
- **Pas de bordure gauche colorée** de plus de 1px.
- **Pas de glyphe Unicode ni d'emoji** en guise d'icône.

## Icônes

Jeu dessiné à la main, pas de bibliothèque, pas d'emoji.

- Grille 24, trait 1.5, `stroke-linecap: square`, `stroke-linejoin: miter`.
- Angles nets, cohérents avec le rayon 0 du reste.
- Chaque icône désigne le dispositif concret dont parle l'expertise, pas une
  idée vague. Un tableau de bord a une ligne de relevé, la mise en concurrence
  a plusieurs sources de hauteurs différentes.
- Couleur : `--bleu`. Taille 28px desktop, 26px mobile.

## Mouvement

Un seul moment animé sur la page, pas une entrée identique sur chaque section.
Sortie exponentielle, depuis un état déjà visible. `prefers-reduced-motion`
coupe tout. Ne jamais animer `width`, `height`, `padding` ou `margin` : passer
par `transform` ou `opacity`.

## Surfaces du navigateur

Elles portent le design autant que le reste, et c'est le signal le moins cher
qu'une page a été construite et non assemblée. À thématiser depuis la palette :

- sélection de texte
- couleur du caret
- anneau de focus
- barres de défilement
- décalage des soulignements
- chiffres tabulaires dans les données

## Vérification avant de livrer

```bash
npm run build                                   # 0 erreur, 0 avertissement
sh .agents/skills/impeccable/scripts/impeccable detect --json <cibles>
```

Plus les contrôles maison : rendu à 390, 768, 1280 et 1920, aucun débordement
horizontal, contraste mesuré sur chaque nœud de texte, canonicals conformes,
Lighthouse mobile à 100.

Le skill Impeccable n'est pas versionné. Pour le réinstaller :
`npx skills add pbakaus/impeccable`
