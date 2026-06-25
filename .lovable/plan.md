# Espace Client & Espace Admin — Frul'digital

## Vue d'ensemble
Mise en place d'un système complet de tickets/dossiers clients avec messagerie temps réel, classé par les 10 services Frul'digital, plus un back-office d'administration avec workflow de clôture/SAV.

## 1. Navigation & Authentification

- Ajout dans `Navbar.tsx` (desktop + mobile) de deux boutons : **Connexion** et **S'inscrire** (style rouge accentué).
- Pages dédiées : `/connexion` et `/inscription` (refonte / réutilisation des pages Login/Signup existantes, design dark + accents rouges).
- Sous le formulaire de connexion : lien discret **"Espace administrateur"** → ouvre un modal/page dédié avec un second formulaire qui vérifie les identifiants codés en dur côté Edge Function (pas exposés au client) :
  - `lafrul.digital@gmail.com` / `KoffietFrulux229212`
  - En cas de succès, attribution du rôle `admin` au compte (via table `user_roles` + fonction `has_role`) puis redirection vers `/admin`.

## 2. Modèle de données (Lovable Cloud / Supabase)

Migration unique avec GRANTs + RLS :

- **enum `app_role`** : `admin`, `client`
- **enum `service_category`** : 10 valeurs strictes correspondant aux services
- **enum `request_status`** : `open`, `in_progress`, `closed`
- **table `user_roles`** (id, user_id, role) + fonction `has_role(uuid, app_role)` SECURITY DEFINER
- **table `requests`** : id, client_id, service (enum), title, form_data (jsonb — récap du formulaire soumis), status, closed_at, reopened_for_sav (bool), created_at, updated_at
- **table `messages`** : id, request_id, sender_id, sender_role, content, created_at
- **RLS** :
  - `requests` : client voit/édite ses propres dossiers ; admin voit tout
  - `messages` : lecture si propriétaire du dossier ou admin ; insertion bloquée si `status = 'closed'` ET pas `reopened_for_sav` (via policy WITH CHECK)
- Realtime activé sur `requests` et `messages`.

## 3. Espace Client (`/dashboard`)

- Vue d'ensemble groupée par les **10 catégories de services** (sections collapsibles ou tabs), avec compteurs et badges de statut.
- Bouton **"Nouvelle demande"** → formulaire en 2 étapes : choix du service (10 cartes), puis formulaire générique (titre, description, budget, deadline, détails libres) — payload stocké dans `form_data`.
- Clic sur une demande → page `/dashboard/demande/:id` :
  - Récapitulatif du formulaire soumis (lecture seule)
  - Interface **Tchat** en dessous (bulles, scroll auto, indicateur "envoi…", realtime)
  - Si `status = 'closed'` et pas rouvert : tchat grisé + bouton **"Rouvrir pour SAV"** → passe `reopened_for_sav = true`, `status = 'open'`.

## 4. Espace Admin (`/admin`)

- Accès gardé par `has_role(uid, 'admin')`.
- Tableau de bord type **liste filtrable + Kanban** :
  - Filtres par service (10), par statut (ouvert / en cours / clôturé), recherche par client/titre
  - Vue Kanban avec colonnes Ouvert / En cours / Clôturé
  - Compteurs par service dans la sidebar
- Détail dossier `/admin/dossier/:id` :
  - Infos client + formulaire soumis
  - Tchat identique côté admin (envoi de messages)
  - Toggle **"Dossier traité / Terminé"** :
    - Coché → `status = 'closed'`, `reopened_for_sav = false` → UI grisée des deux côtés, historique préservé
    - Si client clique "Rouvrir SAV" → notification (toast + indicateur dans la liste admin) + tchat redevient actif

## 5. UI / UX

- Dark mode existant + accents **rouge** Frul'digital (tokens déjà définis dans `index.css`).
- Sidebar admin dédiée avec navigation par service.
- Cards de dossiers : badge service coloré, badge statut, dernier message preview, timestamp.
- Tchat : bulles différenciées admin/client, avatar/initiales, état "clôturé" avec bandeau explicatif.
- Responsive mobile (sliders horizontaux pour les colonnes Kanban, sheet pour détail dossier).
- Respect de `prefers-reduced-motion`.

## 6. Détails techniques

- **Auth** : Email/password (déjà en place) + Google par défaut (Lovable Cloud).
- **Sécurité** : identifiants admin vérifiés dans une Edge Function `admin-login` (jamais dans le bundle client). À la réussite, insertion du rôle `admin` dans `user_roles` pour ce compte (ou validation à chaque requête via secret).
- **Realtime** : subscription Supabase channels (`postgres_changes`) sur `messages` filtré par `request_id` et sur `requests` pour notifs admin.
- **Notifications SAV** : toast côté admin via subscription sur `requests` où `reopened_for_sav = true`.
- **Composants nouveaux** : `RequestCard`, `RequestForm`, `ServiceCategoryGrid`, `ChatThread`, `ChatMessage`, `ChatComposer`, `AdminKanban`, `AdminRequestList`, `AdminSidebar`, `CloseToggle`, `ReopenSavButton`.
- **Routes ajoutées** : `/connexion`, `/inscription`, `/dashboard`, `/dashboard/demande/:id`, `/admin`, `/admin/dossier/:id`.

## 7. Hors scope (à confirmer ensuite)
- Pas de notifications email (uniquement in-app).
- Pas d'upload de fichiers dans le tchat (peut être ajouté plus tard via Storage).
- Pas de modification du formulaire après soumission par le client.
