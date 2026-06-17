
## Objectif
Dans la section **FRUL'LAB AI** de la page d'accueil, remplacer l'image 2D actuelle du cerveau (qui simule une rotation via CSS) par un **véritable cerveau en 3D** rendu avec WebGL, qui tourne réellement sur lui-même. Tous les éléments autour (cartes HUD, anneaux orbitaux, particules, gauges, lignes de connexion, halo rouge) restent intacts — seul le cœur central change.

## Direction visuelle
- Cerveau 3D rouge incandescent, look holographique / wireframe organique, cohérent avec la DA dark + rouge.
- Rotation lente continue sur l'axe Y (~20s/tour).
- Légère lévitation verticale (déjà présente sur le wrapper, conservée).
- Glow rouge interne + emissive material pour donner l'effet "noyau vivant".
- Réagit légèrement à la souris (tilt depth, déjà câblé via motion values).
- Fallback propre : si WebGL indisponible, on retombe sur l'image actuelle.

## Approche technique

**Stack** :
- `three@0.160` + `@react-three/fiber@^8.18` + `@react-three/drei@^9.122` (versions imposées par React 18).
- Modèle de cerveau : utilisation d'un **mesh procédural** basé sur une géométrie organique (IcosahedronGeometry très subdivisée + distorsion via `MeshDistortMaterial` de drei) — pas besoin de fichier .glb externe, performance maîtrisée, rendu "blob organique cérébral" qui fonctionne très bien en holographique rouge.
- Surcouche **wireframe** (second mesh légèrement plus grand, `wireframe: true`, opacité réduite) pour donner l'aspect "réseau neuronal / data".
- Lumière `pointLight` rouge au centre + `ambientLight` faible.
- `<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3], fov: 50 }}>` avec fond transparent.
- Auto-rotation via `useFrame` (rotation.y += delta * 0.3).

**Nouveau composant** : `src/components/Brain3D.tsx`
- Exporte `<Brain3D />` (Canvas + scène).
- Détecte WebGL ; sinon renvoie `<img src={frulLabAi} />` en fallback.
- Respecte `prefers-reduced-motion` (ralentit la rotation, désactive la distorsion animée).

**Modification** : `src/components/FrulLabSection.tsx`
- Dans `HolographicBrain`, remplacer le bloc `<img src={frulLabAi} ... />` (et ses overlays de scan/pulse internes) par `<Brain3D />`.
- Conserver : anneaux orbitaux SVG, particules, lignes SVG, cartes HUD (NEURAL_LOAD, DATA_STREAM, SYNAPSES/S, ANALYSE), brackets d'angle, halo, lévitation, tilt souris.
- Le tilt souris (`rx`/`ry`) reste appliqué au wrapper qui contient `<Brain3D />`.

**Dépendances à ajouter** (en build mode) :
```
bun add three@0.160.0 @react-three/fiber@^8.18.0 @react-three/drei@^9.122.0
bun add -d @types/three@0.160.0
```

## Performance
- `dpr={[1, 2]}` (pas plus).
- Géométrie : 64 subdivisions max.
- Pas de post-processing.
- Sur mobile (`useIsMobile`), réduire subdivisions à 32 et désactiver le wireframe layer.

## Fichiers touchés
- **Créé** : `src/components/Brain3D.tsx`
- **Modifié** : `src/components/FrulLabSection.tsx` (remplacement du bloc image central uniquement)
- **package.json** : ajout des 3 dépendances three.js
