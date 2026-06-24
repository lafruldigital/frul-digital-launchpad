## Objectif

Sortir le site de l'aspect "générique" en ajoutant une couche de décor ambiant cinématique présente sur toutes les pages (desktop + mobile, allégée), sans toucher au contenu existant ni casser la structure publique/SaaS.

## Concept créatif

Une atmosphère "studio sombre & braise rouge" cohérente avec l'identité FRUL'DIGITAL :

- une nappe lumineuse rouge qui respire doucement derrière le contenu
- des particules/étincelles très discrètes qui flottent
- une grille technique très estompée (signature "digital")
- un grain subtil pour casser le côté plat
- un halo qui suit légèrement le curseur (desktop uniquement)

Le tout en couche fixe `pointer-events-none` derrière le contenu — aucune interaction ni lecture ne sont impactées.

## Composants à créer

1. `**src/components/AmbientBackground.tsx**` — couche fixe globale :
  - 2-3 "blobs" radiaux rouges/orangés animés (translation + scale très lente, 20-30s)
  - Grille SVG ultra-faible opacité (mask radial pour fade sur les bords)
  - Canvas léger (~25 particules desktop / ~10 mobile) en `requestAnimationFrame`, pause si onglet caché
  - Halo curseur via CSS variable mise à jour sur `pointermove` (desktop uniquement, désactivé si `pointer: coarse`)
  - Overlay grain SVG en `mix-blend-overlay` à très faible opacité
  - Respect strict de `prefers-reduced-motion` : animations désactivées, blobs statiques
2. **Montage global** dans `src/App.tsx` (ou `src/main.tsx`) :
  - Rendu une seule fois, au-dessus du `<BrowserRouter>`, en `z-index: 0`
  - Le contenu existant reçoit `relative z-10` via wrapper minimal
3. **Tokens CSS** dans `src/index.css` :
  - keyframes `ambient-drift`, `ambient-pulse`
  - classe `.ambient-layer` (fixed inset-0, pointer-events-none, mix-blend modes)
  - variantes mobile (moins de blur, moins de blobs)

## Adaptations mobile

- Canvas particules : nombre divisé par ~2.5, taille réduite
- Halo curseur : désactivé (`@media (pointer: coarse)`)
- Blobs : 2 au lieu de 3, blur réduit pour préserver les FPS
- Grain : opacité réduite
- Tout reste `pointer-events-none` → zéro impact sur le scroll/tap

## Garde-fous

- Ne modifie **aucune section existante** (Hero, Services, Témoignages, dashboard SaaS, etc.)
- Ne change **aucun lien, CTA, formulaire, route**
- N'altère pas la structure publique vs SaaS (les deux héritent de la même couche ambiante)
- `prefers-reduced-motion` strictement respecté
- Performances : `will-change` ciblé, `transform/opacity` uniquement, pause hors-écran

## Détails techniques

- Pas de nouvelle dépendance (canvas natif + CSS + framer-motion déjà installé)
- Z-index : ambient = 0, contenu = 10, navbar/modales inchangés
- Couleurs via tokens HSL existants (`--primary` rouge)
- Composant testé via Playwright après build (screenshot desktop 1280 + mobile 390)

## Livrable

Une ambiance visuelle signature, discrète mais perceptible, qui donne immédiatement une sensation de site premium sans rien casser de l'existant. avec des image aussi si possible de temps en temps 