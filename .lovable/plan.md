Plan de correction de la modale galerie de logos

Problème constaté
- La modale Identité Visuelle s’ouvre sur la page d’accueil.
- Son header (titre, description + barre de filtres) occupe une très grande hauteur, notamment quand les filtres passent sur plusieurs lignes.
- Résultat : la zone scrollable devient trop petite (≈ 400 px sur un écran de 800 px, voire moins sur des viewports moyens), ce qui donne l’impression qu’on ne voit pas la galerie et qu’on ne peut pas scroller correctement.

Objectif
- Rendre la modale utilisable sur tous les viewports sans casser l’esthétique premium.
- Conserver le dark/rouge, les animations et la structure existante.

Actions prévues

1. Compactage du header
   - Réduire les paddings/margins sur mobile et tablette.
   - Diminuer la taille du titre en responsive (text-2xl → md:text-4xl au lieu de 3xl → md:text-5xl).
   - Supprimer ou réduire la description sur les petits écrans si nécessaire.
   - Transformer la barre de filtres en bande scrollable horizontale au lieu de la laisser wrapper sur plusieurs lignes. Garder le style existant des badges.

2. Optimisation de la zone scrollable
   - S’assurer que `.identity-portfolio-scroll` prend bien tout l’espace restant (`flex-1 min-h-0 overflow-y-auto`).
   - Vérifier que la coquille parente respecte `max-h-[96vh]` et que `h-full` ne force pas de dépassement.
   - Bloquer le scroll du body quand la modale est ouverte (`overflow-hidden` sur `<html>`/`<body>`) pour éviter que la page derrière prenne la main.

3. Ajustement de la grille de logos
   - Sur mobile : 1 colonne, cartes plus compactes.
   - Sur tablette : 2 colonnes.
   - Sur desktop : 3-4 colonnes comme actuellement.
   - Légère réduction des gaps et padding interne sur les petits écrans.

4. Validation
   - Test visuel sur desktop (1280×800), tablette (≈ 768×600) et mobile (≈ 390×844).
   - Vérifier que le scroll atteint bien le bas de la galerie et que les filtres restent accessibles.

Fichier concerné
- src/components/RealisationsPreviewSection.tsx
- Ajustements mineurs possibles dans src/index.css si nécessaire (scrollbar, classes utilitaires).