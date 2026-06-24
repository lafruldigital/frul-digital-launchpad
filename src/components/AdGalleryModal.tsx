import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Search, Sparkles, Target, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import smashDistrictFlyer from "@/assets/flyers/smash-district-flyer.png.asset.json";
import chicknFireFlyer from "@/assets/flyers/chickn-fire-flyer.png.asset.json";
import formaHabitatFlyer from "@/assets/flyers/forma-habitat-flyer.png.asset.json";
import atelierMietteFlyer from "@/assets/flyers/atelier-miette-flyer.png.asset.json";
import mininovaFlyer from "@/assets/flyers/mininova-flyer.png.asset.json";
import sentraSecureFlyer from "@/assets/flyers/sentra-secure-flyer.png.asset.json";
import pulseOneFlyer from "@/assets/flyers/pulse-one-flyer.png.asset.json";
import helionPatrimoineFlyer from "@/assets/flyers/helion-patrimoine-flyer.png.asset.json";
import azuraEscapeFlyer from "@/assets/flyers/azura-escape-flyer.png.asset.json";
import noxAtelierFlyer from "@/assets/flyers/nox-atelier-flyer.png.asset.json";
import bloomoraAtelierFlyer from "@/assets/flyers/bloomora-atelier-flyer.png.asset.json";
import kintaroLabFlyer from "@/assets/flyers/kintaro-lab-flyer.png.asset.json";
import aetherMetricsFlyer from "@/assets/flyers/aether-metrics-flyer.png.asset.json";
import lunaNoirFlyer from "@/assets/flyers/luna-noir-flyer.png.asset.json";
import veloraDriveFlyer from "@/assets/flyers/velora-drive-flyer.png.asset.json";
import nuveaLivingFlyer from "@/assets/flyers/nuvea-living-flyer.png.asset.json";
import metaAdsSaasFlyer from "@/assets/flyers/meta-ads-saas-flyer.png.asset.json";
import socialRestoLyonFlyer from "@/assets/flyers/social-resto-lyon-flyer.png.asset.json";

const adFilters = [
  "Tous",
  "Restauration",
  "Fast Food",
  "Beauté",
  "Automobile",
  "Immobilier",
  "Fitness",
  "Tech",
  "Événementiel",
  "Lifestyle",
  "Services",
] as const;

type AdFilter = (typeof adFilters)[number];

type FlyerProject = {
  name: string;
  sector: string;
  filter: AdFilter;
  support: string;
  strategicTag: string;
  objective: string;
  summary: string;
  strengths: string[];
  structure: string[];
  imageUrl: string;
  accent: string;
};

const flyerProjects: FlyerProject[] = [
  {
    name: "Smash District",
    sector: "Fast Food",
    filter: "Fast Food",
    support: "Flyer menu signature",
    strategicTag: "Offre immédiate",
    objective: "Attirer l'œil en 2 secondes et pousser la commande sur place, à emporter ou en livraison.",
    summary: "Création fictive pensée pour combiner faim visuelle, clarté de l'offre et CTA instantané.",
    strengths: ["Accroche XXL", "Produit ultra dominant", "Prix immédiatement lisible", "Réassurance produit", "CTA ultra visible", "Codes social & livraison"],
    structure: ["Accroche", "Visuel principal", "Offre", "Bénéfices", "Réassurance", "Call-to-action", "Contact / réseaux"],
    imageUrl: smashDistrictFlyer.url,
    accent: "from-red-500/24 via-orange-500/14 to-transparent",
  },
  {
    name: "Chick’n Fire",
    sector: "Chicken / Fast Food",
    filter: "Fast Food",
    support: "Affiche promo lancement",
    strategicTag: "Drive to order",
    objective: "Créer une sensation de gourmandise immédiate et déclencher la commande autour d'un menu star.",
    summary: "Direction fictive à forte intensité visuelle conçue pour performer en street marketing comme en social ads statiques.",
    strengths: ["Promesse forte", "Univers feu cohérent", "Hiérarchie prix / menu claire", "Multiples points de commande", "Icônes de bénéfices", "QR code d'action"],
    structure: ["Accroche", "Produit signature", "Menu / prix", "Arguments rapides", "Canaux de commande", "CTA", "Infos pratiques"],
    imageUrl: chicknFireFlyer.url,
    accent: "from-amber-500/24 via-orange-500/18 to-transparent",
  },
  {
    name: "Atelier Miette",
    sector: "Boulangerie / Food",
    filter: "Restauration",
    support: "Affiche vitrine premium",
    strategicTag: "Image de marque",
    objective: "Valoriser le savoir-faire artisanal et donner envie de commander ou réserver dès la première lecture.",
    summary: "Composition fictive éditoriale orientée désir, élégance produit et réassurance locale.",
    strengths: ["Palette sensorielle cohérente", "Produits mis en scène", "Preuves d'artisanat", "Bloc spécialités lisible", "CTA sobre mais clair", "Infos pratiques intégrées"],
    structure: ["Signature de marque", "Promesse", "Visuels matières", "Spécialités", "Infos utiles", "CTA", "Coordonnées"],
    imageUrl: atelierMietteFlyer.url,
    accent: "from-amber-300/24 via-orange-300/12 to-transparent",
  },
  {
    name: "Forma Habitat",
    sector: "Architecture intérieure",
    filter: "Services",
    support: "Affiche institutionnelle",
    strategicTag: "Preuve de savoir-faire",
    objective: "Montrer la qualité de transformation avant / après et générer une prise de contact haut de gamme.",
    summary: "Support fictif pensé pour rassurer, inspirer et projeter le prospect dans un accompagnement premium.",
    strengths: ["Univers raffiné", "Avant / après crédible", "Services bien structurés", "Matières et détails premium", "Réassurance artisanale", "CTA de contact"],
    structure: ["Promesse", "Visuel aspirationnel", "Avant / après", "Prestations", "Réassurance", "Call-to-action", "Contact"],
    imageUrl: formaHabitatFlyer.url,
    accent: "from-stone-300/20 via-amber-500/10 to-transparent",
  },
  {
    name: "Mininova",
    sector: "Concept Store Kids",
    filter: "Lifestyle",
    support: "Affiche commerciale",
    strategicTag: "Trafic magasin",
    objective: "Créer une affiche joyeuse qui attire parents et enfants et pousse à découvrir l'offre en boutique.",
    summary: "Création fictive pensée pour faire rayonner un univers enfantin sans perdre la lisibilité commerciale.",
    strengths: ["Direction visuelle très mémorable", "Codes âge & activités", "Offre de lancement visible", "Produits mis en avant", "CTA doux mais clair", "Univers cohérent de bout en bout"],
    structure: ["Identité", "Promesse", "Activités", "Offre", "Sélection produits", "CTA", "Informations magasin"],
    imageUrl: mininovaFlyer.url,
    accent: "from-sky-400/24 via-cyan-300/16 to-transparent",
  },
  {
    name: "Sentra Secure",
    sector: "Cybersécurité",
    filter: "Tech",
    support: "Affiche acquisition B2B",
    strategicTag: "Lead magnet",
    objective: "Rendre une offre complexe immédiatement lisible et pousser la demande de contact autour d'un audit offert.",
    summary: "Support fictif orienté performance B2B : bénéfices, réassurance, crédibilité et CTA sans friction.",
    strengths: ["Hero techno-impactant", "Offre gratuite centrale", "Services clarifiés", "Badges de confiance", "CTA visible", "Univers visuel cohérent"],
    structure: ["Accroche", "Visuel principal", "Services", "Offre", "Réassurance", "CTA", "Contact"],
    imageUrl: sentraSecureFlyer.url,
    accent: "from-emerald-400/24 via-cyan-500/16 to-transparent",
  },
  {
    name: "Pulse One",
    sector: "Produit audio",
    filter: "Tech",
    support: "Affiche lancement produit",
    strategicTag: "Précommande",
    objective: "Créer de la désirabilité produit et faire basculer le visiteur vers une précommande immédiate.",
    summary: "Création fictive de lancement premium qui combine aspiration, specs produit et urgence commerciale.",
    strengths: ["Hero produit très fort", "Codes néon premium", "Bénéfices techniques scannables", "Prix / offre visibles", "Edition limitée mise en avant", "CTA central"],
    structure: ["Signature de marque", "Hero produit", "Features", "Offre de lancement", "Réassurance", "CTA", "Social proof / réseaux"],
    imageUrl: pulseOneFlyer.url,
    accent: "from-violet-500/24 via-fuchsia-500/14 to-transparent",
  },
  {
    name: "Helion Patrimoine",
    sector: "Gestion de patrimoine",
    filter: "Services",
    support: "Affiche prestige",
    strategicTag: "Crédibilité premium",
    objective: "Inspirer confiance, présenter l'expertise et déclencher la prise de rendez-vous privée.",
    summary: "Support fictif pensé pour marier codes institutionnels, aspiration haut de gamme et conversion sobre.",
    strengths: ["Univers statutaire fort", "4 piliers d'expertise", "Preuves chiffrées", "Bénéfices clients lisibles", "Gros bloc de rendez-vous", "Coordonnées très claires"],
    structure: ["Promesse", "Piliers", "Preuves", "Bénéfices", "Réassurance", "CTA", "Contact"],
    imageUrl: helionPatrimoineFlyer.url,
    accent: "from-amber-400/18 via-blue-500/12 to-transparent",
  },
  {
    name: "Azura Escape",
    sector: "Retraites premium",
    filter: "Lifestyle",
    support: "Affiche prestige",
    strategicTag: "Désir d'évasion",
    objective: "Projeter immédiatement dans une expérience haut de gamme et déclencher une demande de réservation sur une offre signature.",
    summary: "Création fictive orientée voyage premium, bien-être et aspiration visuelle, pensée pour vendre une retraite d'exception en un seul regard.",
    strengths: ["Hero ultra immersif", "Codes luxe & sérénité", "Offre packagée très lisible", "Bloc bénéfices rassurant", "Destination star mise en avant", "CTA de réservation premium"],
    structure: ["Univers de marque", "Promesse émotionnelle", "Destination phare", "Bénéfices", "Offre / prix", "CTA", "Contacts & destinations"],
    imageUrl: azuraEscapeFlyer.url,
    accent: "from-cyan-400/20 via-amber-300/10 to-transparent",
  },
  {
    name: "NOX Atelier",
    sector: "Streetwear / Techwear",
    filter: "Lifestyle",
    support: "Affiche drop produit",
    strategicTag: "Drop limité",
    objective: "Créer de la rareté, imposer un univers de marque fort et pousser le trafic vers un lancement produit daté.",
    summary: "Concept fictif à forte tension graphique conçu pour un drop streetwear premium avec logique de collection limitée.",
    strengths: ["Direction mode très distinctive", "Hiérarchie typographique impactante", "Produits additionnels visibles", "Date de lancement dominante", "Signal de rareté crédible", "CTA e-commerce direct"],
    structure: ["Marque", "Nom du drop", "Promesse", "Highlights produit", "Mini catalogue", "Date / rareté", "CTA boutique"],
    imageUrl: noxAtelierFlyer.url,
    accent: "from-orange-500/24 via-red-500/12 to-transparent",
  },
  {
    name: "Bloomora Atelier",
    sector: "Maison florale premium",
    filter: "Lifestyle",
    support: "Affiche collection saisonnière",
    strategicTag: "Collection signature",
    objective: "Mettre en scène une collection florale avec assez d'élégance pour susciter la visite, la commande et l'attachement à la marque.",
    summary: "Affiche fictive éditoriale et sensible, conçue pour une boutique florale haut de gamme entre art d'offrir et désir de saison.",
    strengths: ["Composition éditoriale premium", "Palette douce très cohérente", "Offre promotionnelle élégante", "Produits secondaires bien intégrés", "Infos boutique claires", "Forte désirabilité visuelle"],
    structure: ["Signature de marque", "Collection", "Argumentaire", "Offre", "Produits associés", "Infos boutique", "Commande & réseaux"],
    imageUrl: bloomoraAtelierFlyer.url,
    accent: "from-rose-300/20 via-emerald-300/10 to-transparent",
  },
  {
    name: "Kintaro Lab",
    sector: "Coaching fitness",
    filter: "Fitness",
    support: "Affiche challenge transformation",
    strategicTag: "Programme 12 semaines",
    objective: "Rendre une promesse de transformation crédible et énergique pour déclencher l'inscription à un challenge limité dans le temps.",
    summary: "Création fictive performance-first pensée pour un coach premium : impact visuel, preuve, programme et CTA sans friction.",
    strengths: ["Visuel athlétique ultra fort", "Offre challenge immédiatement lisible", "Dashboard produit crédible", "Preuves sociales chiffrées", "Avant / après intégré", "CTA très agressif"],
    structure: ["Promesse", "Offre challenge", "Accompagnement", "Preuves", "Date de départ", "CTA", "Mentions & infos"],
    imageUrl: kintaroLabFlyer.url,
    accent: "from-lime-400/24 via-yellow-400/12 to-transparent",
  },
  {
    name: "Aether Metrics",
    sector: "Data & IA",
    filter: "Tech",
    support: "Affiche audit B2B",
    strategicTag: "Audit offert",
    objective: "Transformer une offre data/IA en promesse business claire, premium et directement actionnable par un décideur.",
    summary: "Support fictif B2B conçu pour valoriser expertise, clarté stratégique et valeur perçue autour d'un audit offert.",
    strengths: ["Dashboard très crédible", "Bénéfice business explicite", "Offre gratuite centrale", "Services structurés", "Codes tech premium", "CTA décisionnel net"],
    structure: ["Accroche", "Visuel data", "Offre", "Expertises", "Valeur perçue", "CTA", "Réassurance marque"],
    imageUrl: aetherMetricsFlyer.url,
    accent: "from-cyan-500/22 via-violet-500/14 to-transparent",
  },
  {
    name: "Luna Noir",
    sector: "Event luxury nightlife",
    filter: "Événementiel",
    support: "Affiche lancement soirée",
    strategicTag: "Billetterie événement",
    objective: "Créer un sentiment d'événement rare, désirable et immédiatement réservable autour d'une soirée premium scénarisée.",
    summary: "Création fictive immersive mêlant codes nocturnes, luxe, mystère et urgence pour vendre une expérience événementielle signature.",
    strengths: ["Aura visuelle mémorable", "Date et heure ultra visibles", "Univers émotionnel fort", "Line-up et ambiance structurés", "Lieu premium valorisé", "CTA billetterie évident"],
    structure: ["Teasing", "Nom événement", "Promesse", "Programme", "Lieu", "Réservation", "Mentions pratiques"],
    imageUrl: lunaNoirFlyer.url,
    accent: "from-fuchsia-500/20 via-purple-500/14 to-transparent",
  },
  {
    name: "Velora Drive",
    sector: "Location automobile premium",
    filter: "Automobile",
    support: "Affiche offre de réservation",
    strategicTag: "Réservation immédiate",
    objective: "Donner envie de conduire un véhicule d'exception et pousser une réservation rapide via une offre lisible et statutaire.",
    summary: "Support fictif automobile premium pensé pour mélanger aspiration, performance, réassurance et offre claire.",
    strengths: ["Hero automobile cinématique", "Offres tarifaires bien hiérarchisées", "Bénéfices service visibles", "Statut premium crédible", "Témoignage intégré", "CTA réservation central"],
    structure: ["Marque", "Promesse", "Bénéfices", "Offres", "Preuve sociale", "CTA", "Coordonnées"],
    imageUrl: veloraDriveFlyer.url,
    accent: "from-sky-500/18 via-blue-500/12 to-transparent",
  },
  {
    name: "Nuvéa Living",
    sector: "Immobilier d'exception",
    filter: "Immobilier",
    support: "Affiche collection propriétés",
    strategicTag: "Rendez-vous privé",
    objective: "Présenter une sélection immobilière très haut de gamme avec assez de prestige pour déclencher une prise de rendez-vous confidentielle.",
    summary: "Affiche fictive conçue pour l'immobilier premium, avec codes architecturaux, lumière luxe et offre discrète.",
    strengths: ["Visuel intérieur aspirationnel", "Galerie propriétés élégante", "Piliers d'expertise rassurants", "Codes luxe intemporels", "Contact discret mais clair", "Très forte cohérence premium"],
    structure: ["Signature", "Promesse", "Sélection biens", "Bénéfices", "Invitation à visiter", "Contact", "Brand block final"],
    imageUrl: nuveaLivingFlyer.url,
    accent: "from-amber-300/20 via-stone-300/12 to-transparent",
  },
  {
    name: "Pulse Ads SaaS",
    sector: "SaaS marketing & acquisition Meta Ads",
    filter: "SaaS & Tech",
    support: "Affiche campagne acquisition",
    strategicTag: "Démo produit",
    objective: "Mettre en avant une plateforme SaaS d'acquisition Meta Ads avec une promesse data-driven et un CTA démo immédiat.",
    summary: "Création fictive premium SaaS mêlant dashboard analytics, univers Meta Ads et iconographie performance pour incarner un outil expert.",
    strengths: ["Hero dashboard crédible", "Univers Meta Ads reconnaissable", "KPIs et courbes lisibles", "Cards créas publicitaires", "Promesse acquisition claire", "CTA démo bien identifié"],
    structure: ["Marque", "Promesse", "Preuves data", "Fonctionnalités", "Bénéfices", "CTA démo", "Réassurance"],
    imageUrl: metaAdsSaasFlyer.url,
    accent: "from-blue-500/22 via-indigo-500/14 to-transparent",
  },
  {
    name: "Maison Lyon Social",
    sector: "Restaurant gastronomique lyonnais",
    filter: "Restaurant",
    support: "Affiche stratégie social media",
    strategicTag: "Communauté Instagram",
    objective: "Vendre une prestation social media premium pour restaurants en montrant un feed Instagram crédible, un calendrier éditorial et de la data d'engagement.",
    summary: "Support fictif gastronomie & social media inspiré de Lyon, pensé pour rassurer un restaurateur sur la qualité de l'image, du contenu et de la régularité éditoriale.",
    strengths: ["Feed Instagram cinématique", "Mise en scène ambiance restaurant", "Calendrier de publication clair", "Courbes d'engagement intégrées", "Codes premium chaleureux", "Identité locale lyonnaise"],
    structure: ["Univers", "Feed", "Calendrier éditorial", "Stats engagement", "Bénéfices", "Offre", "Contact"],
    imageUrl: socialRestoLyonFlyer.url,
    accent: "from-amber-500/22 via-orange-500/14 to-transparent",
  },
];

const adUniverseCount = new Set(flyerProjects.map((project) => project.filter)).size;

const previewCards = [
  { project: flyerProjects[8], className: "left-2 top-10 w-[28%] -rotate-[12deg] md:left-4 md:top-12" },
  { project: flyerProjects[10], className: "left-[24%] top-4 w-[30%] rotate-[-5deg] md:left-[22%]" },
  { project: flyerProjects[12], className: "left-[46%] top-12 z-10 w-[33%] rotate-[4deg] md:left-[44%] md:top-10" },
  { project: flyerProjects[13], className: "right-3 top-4 w-[28%] rotate-[11deg] md:right-5" },
  { project: flyerProjects[15], className: "left-[34%] bottom-4 z-20 w-[34%] rotate-[1deg] md:bottom-6" },
] as const;

export const AdGalleryPreview = ({ hovered }: { hovered: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_45%),linear-gradient(145deg,rgba(10,10,10,0.96),rgba(20,20,20,0.92))]">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(239,68,68,0.22),transparent_36%)]" />

      <div className="absolute left-4 top-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/70 backdrop-blur-md">
        <Sparkles className="h-3 w-3 text-primary/80" /> Ad Gallery
      </div>

      {previewCards.map(({ project, className }, index) => (
        <motion.div
          key={project.name}
          className={`absolute ${className}`}
          animate={{
            y: hovered ? [-2, index % 2 === 0 ? -8 : -5, -2] : [0, index % 2 === 0 ? -4 : -2, 0],
            rotate: hovered ? undefined : undefined,
          }}
          transition={{ duration: 4.8 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.07] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.02]">
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.accent} opacity-70`} />
            <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-black/45">
              <img
                src={project.imageUrl}
                alt={project.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-contain bg-black/55 transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-4 z-30 right-4 flex items-end justify-between gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-md">
          <div className="text-[10px] uppercase tracking-[0.26em] text-white/55">Creative advertising</div>
          <div className="mt-1 text-sm font-semibold text-white/90">Flyers, affiches, campagnes</div>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5 text-[10px] uppercase tracking-[0.24em] text-white/78">
          <span className="rounded-full border border-white/12 bg-black/40 px-2 py-1 backdrop-blur-md">Luxe</span>
          <span className="rounded-full border border-white/12 bg-black/40 px-2 py-1 backdrop-blur-md">Tech</span>
          <span className="rounded-full border border-primary/35 bg-primary/12 px-2 py-1 text-primary/90">+{adUniverseCount} univers</span>
        </div>
      </div>
    </div>
  );
};

export const AdGalleryModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [activeFilter, setActiveFilter] = useState<AdFilter>("Tous");
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerProject | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "Tous") return flyerProjects;
    return flyerProjects.filter((project) => project.filter === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedFlyer) setSelectedFlyer(null);
        else onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange, selectedFlyer]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/72 px-2 py-2 backdrop-blur-md md:px-6 md:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-7xl overflow-hidden rounded-[20px] border border-white/10 bg-surface-darker/95 shadow-[0_30px_120px_rgba(0,0,0,0.62)] md:rounded-[28px]"
            style={{ maxHeight: "calc(100vh - 16px)" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%)]" />

            <button
              type="button"
              aria-label="Fermer la galerie d'affiches"
              onClick={() => onOpenChange(false)}
              className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-surface-dark-foreground/85 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-primary md:h-11 md:w-11"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            <div className="ad-gallery-scroll overflow-y-auto overscroll-contain" style={{ maxHeight: "calc(100vh - 16px)" }}>
              <div className="relative border-b border-white/8 px-4 pb-4 pt-4 md:px-8 md:pb-6 md:pt-7">
                <div className="max-w-4xl pr-12">
                  <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-primary/80 md:text-[11px]">
                    <Sparkles className="h-3.5 w-3.5" /> Ad Gallery — Affiches & Flyers
                  </span>
                  <h3 className="mt-3 text-xl font-heading font-bold leading-tight text-surface-dark-foreground sm:text-2xl md:mt-4 md:text-4xl lg:text-5xl">
                    Affiches, flyers & campagnes visuelles
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-surface-dark-foreground/62 md:mt-4 md:text-base">
                    Une sélection de créations publicitaires fictives imaginées pour montrer la capacité de FRUL’DIGITAL à concevoir des visuels qui attirent l’œil, structurent une offre et donnent envie de passer à l’action.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-surface-dark-foreground/48 md:mt-5">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Multi-secteurs</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Conversion first</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Supports premium</span>
                  </div>
                </div>

                <div className="relative mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-6 md:mx-0 md:flex-wrap md:px-0">
                  {adFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`shrink-0 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 md:px-3.5 md:text-[11px] ${
                        activeFilter === filter
                          ? "border-primary/45 bg-primary/12 text-primary shadow-[0_0_24px_rgba(239,68,68,0.12)]"
                          : "border-white/10 bg-white/5 text-surface-dark-foreground/50 hover:border-white/20 hover:text-surface-dark-foreground/80"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-10 pt-4 md:px-8 md:pb-12 md:pt-6">
                {visibleProjects.length ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {visibleProjects.map((project, index) => (
                      <motion.button
                        key={project.name}
                        type="button"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: index * 0.035 }}
                        onClick={() => setSelectedFlyer(project)}
                        className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.045]"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70`} />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_32%,rgba(0,0,0,0.34))]" />

                        <div className="relative flex h-full flex-col p-3.5">
                          <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black/35 shadow-[0_14px_42px_rgba(0,0,0,0.24)]">
                            <img
                              src={project.imageUrl}
                              alt={`${project.name} — ${project.sector}`}
                              className="aspect-[4/5] w-full object-contain bg-black/55 transition-transform duration-500 group-hover:scale-[1.025]"
                              loading="lazy"
                            />
                          </div>

                          <div className="mt-4 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary/85">
                                {project.filter}
                              </span>
                              <span className="rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-surface-dark-foreground/46">
                                {project.support}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-lg font-heading font-semibold text-surface-dark-foreground">{project.name}</h4>
                              <p className="mt-1 text-sm text-surface-dark-foreground/58">{project.sector}</p>
                            </div>

                            <p className="text-sm leading-relaxed text-surface-dark-foreground/62">{project.summary}</p>

                            <div className="flex items-center justify-between gap-3 pt-1">
                              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
                                {project.strategicTag}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.24em] text-primary/82">
                                Explorer <ArrowUpRight className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-10 text-center">
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                      <Search className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-heading font-semibold text-surface-dark-foreground">Aucune création dans cette catégorie</h4>
                    <p className="mt-2 text-sm text-surface-dark-foreground/58">Sélectionne un autre filtre pour explorer les autres univers publicitaires.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {selectedFlyer && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/88 px-3 py-3 backdrop-blur-lg md:px-6 md:py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFlyer(null)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.985 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(event) => event.stopPropagation()}
                  className="relative w-full max-w-6xl overflow-y-auto rounded-[24px] border border-white/10 bg-surface-darker/96 shadow-[0_40px_140px_rgba(0,0,0,0.72)] md:rounded-[30px]"
                  style={{ maxHeight: "calc(100vh - 24px)" }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedFlyer.accent} opacity-65`} />

                  <button
                    type="button"
                    aria-label="Fermer le détail du flyer"
                    onClick={() => setSelectedFlyer(null)}
                    className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-surface-dark-foreground/80 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-primary"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="relative grid gap-6 p-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-8 md:p-8">
                    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/35 shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
                      <img
                        src={selectedFlyer.imageUrl}
                        alt={selectedFlyer.name}
                        className="w-full object-contain bg-black/60"
                      />
                    </div>

                    <div className="flex flex-col gap-5 pb-2 text-left md:pr-4">
                      <div className="flex flex-wrap items-center gap-2 pr-10">
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-primary/85">
                          {selectedFlyer.filter}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-surface-dark-foreground/52">
                          {selectedFlyer.support}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-surface-dark-foreground/52">
                          {selectedFlyer.strategicTag}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-3xl font-heading font-bold text-surface-dark-foreground md:text-4xl">{selectedFlyer.name}</h4>
                        <p className="mt-1 text-sm uppercase tracking-[0.24em] text-surface-dark-foreground/46">{selectedFlyer.sector}</p>
                      </div>

                      <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-primary/78">
                          <Target className="h-4 w-4" /> Objectif
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-surface-dark-foreground/68">{selectedFlyer.objective}</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-primary/78">
                            <Sparkles className="h-4 w-4" /> Points forts visuels
                          </div>
                          <ul className="mt-3 space-y-2.5">
                            {selectedFlyer.strengths.map((strength) => (
                              <li key={strength} className="flex items-start gap-2 text-sm leading-relaxed text-surface-dark-foreground/66">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" />
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-primary/78">
                            <Search className="h-4 w-4" /> Structure commerciale
                          </div>
                          <ol className="mt-3 space-y-2.5">
                            {selectedFlyer.structure.map((item, index) => (
                              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-surface-dark-foreground/66">
                                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-[11px] font-medium text-primary/90">
                                  {index + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};