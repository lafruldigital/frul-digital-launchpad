import {
  Code2,
  Compass,
  Palette,
  Mail,
  Film,
  Video,
  Megaphone,
  Search,
  Share2,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

export type ServiceKey =
  | "dev_web"
  | "strategie_digitale"
  | "branding"
  | "email_marketing"
  | "creation_contenu"
  | "videos_courtes"
  | "publicite_digitale"
  | "seo"
  | "gestion_reseaux"
  | "community_management";

export interface ServiceDef {
  key: ServiceKey;
  label: string;
  short: string;
  icon: LucideIcon;
  gradient: string;
}

export const SERVICES: ServiceDef[] = [
  { key: "dev_web", label: "Développement web", short: "Site web", icon: Code2, gradient: "from-rose-500/30 to-red-600/20" },
  { key: "strategie_digitale", label: "Stratégie digitale", short: "Stratégie", icon: Compass, gradient: "from-amber-500/30 to-red-600/20" },
  { key: "branding", label: "Branding / Identité visuelle", short: "Branding", icon: Palette, gradient: "from-pink-500/30 to-red-600/20" },
  { key: "email_marketing", label: "Email marketing & automation", short: "Email", icon: Mail, gradient: "from-violet-500/30 to-red-600/20" },
  { key: "creation_contenu", label: "Création de contenu", short: "Contenu", icon: Film, gradient: "from-fuchsia-500/30 to-red-600/20" },
  { key: "videos_courtes", label: "Vidéos courtes (Reels / TikTok / Shorts)", short: "Reels", icon: Video, gradient: "from-cyan-500/30 to-red-600/20" },
  { key: "publicite_digitale", label: "Publicité digitale (Meta, Google, TikTok)", short: "Ads", icon: Megaphone, gradient: "from-orange-500/30 to-red-600/20" },
  { key: "seo", label: "SEO & Référencement", short: "SEO", icon: Search, gradient: "from-emerald-500/30 to-red-600/20" },
  { key: "gestion_reseaux", label: "Gestion des réseaux sociaux", short: "Réseaux", icon: Share2, gradient: "from-sky-500/30 to-red-600/20" },
  { key: "community_management", label: "Community Management", short: "Community", icon: MessagesSquare, gradient: "from-indigo-500/30 to-red-600/20" },
];

export const SERVICE_BY_KEY: Record<ServiceKey, ServiceDef> = SERVICES.reduce(
  (acc, s) => ({ ...acc, [s.key]: s }),
  {} as Record<ServiceKey, ServiceDef>,
);

export const STATUS_LABELS: Record<"open" | "in_progress" | "closed", string> = {
  open: "Ouvert",
  in_progress: "En cours",
  closed: "Clôturé",
};

export const STATUS_STYLES: Record<"open" | "in_progress" | "closed", string> = {
  open: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  in_progress: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  closed: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
};