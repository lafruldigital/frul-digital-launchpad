### Objectif
Corriger le fond du **prévisuel de la carte "Identité Visuelle"** dans la grille des projets (section "Nos créations"). L'erreur précédente a modifié le fond de la modal au lieu du prévisuel.

### Problème identifié
Dans `src/components/RealisationsPreviewSection.tsx`, le prévisuel de la carte "Identité Visuelle" utilise actuellement :
- Une grille rouge (`hsl(0 85% 50% / 0.4)`) en fond
- Un dégradé radial rouge (`rgba(239,68,68,0.18)`) comme spotlight

### Changements prévus
1. **Lignes 169-172** — Remplacer la grille rouge par une grille noire/grise subtile (`rgba(255,255,255,0.06)` ou équivalent).
2. **Ligne 175** — Remplacer le dégradé radial rouge par un dégradé radial noir avec un léger glow blanc/gris (`rgba(255,255,255,0.04)` ou équivalent).

Le reste de la carte (mini-logos, typographie, comportements hover) reste inchangé.

### Fichier concerné
- `src/components/RealisationsPreviewSection.tsx`