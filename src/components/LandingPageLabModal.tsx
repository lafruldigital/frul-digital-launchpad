import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles, Star, Target, X, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type LandingDemo = {
  name: string;
  sector: string;
  category: typeof landingFilters[number];
  objective: string;
  summary: string;
  tagline: string;
  headline: string;
  cta: string;
  proof: string;
  strengths: string[];
  structure: string[];
  variant: "auto" | "food" | "realty" | "school" | "beauty" | "saas" | "fitness" | "travel" | "japan" | "coworking";
  images: {
    hero: string;
    gallery?: [string, string, string];
  };
  palette: {
    bg: string;
    surface: string;
    text: string;
    sub: string;
    accent: string;
    accentText: string;
    border: string;
  };
};

const landingFilters = ["Tous", "Automobile", "Food", "Immobilier", "Formation", "Beauté", "Tech / IA", "Fitness", "Voyage", "Lifestyle", "Services"] as const;

const landings: LandingDemo[] = [
  {
    name: "Velora Drive",
    sector: "Automobile premium",
    category: "Automobile",
    objective: "Génération de leads / prise de rendez-vous",
    summary: "Page conçue pour vendre une expérience automobile haut de gamme avec collecte de prospects qualifiés.",
    tagline: "Concession premium",
    headline: "Le luxe automobile, livré à votre porte.",
    cta: "Réserver un essai",
    proof: "+320 essais qualifiés / mois",
    strengths: ["Hero cinématique avec essai immédiat", "Catalogue scrollable filtrable", "Formulaire de pré-qualification en 30s"],
    structure: ["Hero impactant", "Catalogue véhicules", "Configurateur", "Témoignages clients", "Garantie & SAV", "CTA prise de rendez-vous"],
    variant: "auto",
    images: {
      hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
      ],
    },
    palette: { bg: "#0a0a0d", surface: "#15151b", text: "#f5f5f7", sub: "#9ca3af", accent: "#ef4444", accentText: "#ffffff", border: "rgba(255,255,255,0.08)" },
  },
  {
    name: "Brasa House",
    sector: "Restaurant / brunch",
    category: "Food",
    objective: "Réservation en ligne",
    summary: "Landing chaleureuse, sensorielle, pensée pour pousser la réservation et la découverte du concept.",
    tagline: "Brunch & flame house",
    headline: "Le brunch fumé, version signature.",
    cta: "Réserver ma table",
    proof: "Note 4.9/5 — 1 200 avis",
    strengths: ["Galerie photo immersive", "Réservation intégrée en 2 clics", "Story de la maison pour créer du lien"],
    structure: ["Hero ambiance", "Carte signature", "Galerie", "Avis clients", "Le concept", "CTA réservation"],
    variant: "food",
    images: {
      hero: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&q=80",
      ],
    },
    palette: { bg: "#1a0f0a", surface: "#241510", text: "#fef3e8", sub: "#c8a888", accent: "#f97316", accentText: "#1a0f0a", border: "rgba(249,115,22,0.18)" },
  },
  {
    name: "Nuvéa Living",
    sector: "Immobilier / conciergerie",
    category: "Immobilier",
    objective: "Estimation gratuite / contact",
    summary: "Page épurée pensée pour rassurer le propriétaire et déclencher une estimation premium.",
    tagline: "Conciergerie haut de gamme",
    headline: "Votre bien mérite une gestion d'exception.",
    cta: "Estimer mon bien",
    proof: "92% d'occupation moyenne",
    strengths: ["Calculateur de revenus instantané", "Process en 4 étapes claires", "Wall of trust propriétaires"],
    structure: ["Hero rassurant", "Calculateur revenus", "Notre méthode", "Témoignages propriétaires", "Garanties", "CTA estimation"],
    variant: "realty",
    images: {
      hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
      ],
    },
    palette: { bg: "#f7f5f0", surface: "#ffffff", text: "#1a1a1f", sub: "#6b6b75", accent: "#1a1a1f", accentText: "#ffffff", border: "rgba(0,0,0,0.08)" },
  },
  {
    name: "Ascendia School",
    sector: "Formation / coaching",
    category: "Formation",
    objective: "Inscription / réservation appel découverte",
    summary: "Page structurée orientée conversion pour vendre un programme d'accompagnement premium.",
    tagline: "Membership business",
    headline: "Construis le business que tu mérites.",
    cta: "Réserver un appel",
    proof: "+ de 2 400 élèves accompagnés",
    strengths: ["Promesse claire dès le hero", "Programme détaillé module par module", "FAQ qui lève toutes les objections"],
    structure: ["Hero promesse forte", "Pour qui c'est", "Programme détaillé", "Résultats élèves", "Garantie", "FAQ", "CTA inscription"],
    variant: "school",
    images: {
      hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
      ],
    },
    palette: { bg: "#0b1220", surface: "#111a2e", text: "#f1f5f9", sub: "#94a3b8", accent: "#3b82f6", accentText: "#ffffff", border: "rgba(59,130,246,0.18)" },
  },
  {
    name: "Soléa Skin",
    sector: "Beauté / soin / esthétique",
    category: "Beauté",
    objective: "Achat produit / découverte routine",
    summary: "Landing douce et sensorielle, pensée pour transformer le visiteur en cliente fidèle.",
    tagline: "Skincare clean",
    headline: "Le rituel skin pensé pour votre peau.",
    cta: "Découvrir ma routine",
    proof: "Recommandé par 96% des testeuses",
    strengths: ["Quiz peau interactif", "Avant / après crédibles", "Routine personnalisée affichée"],
    structure: ["Hero sensoriel", "Quiz peau", "Ingrédients clés", "Avant / après", "Avis clients", "Routine recommandée", "CTA achat"],
    variant: "beauty",
    images: {
      hero: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&q=80",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80",
      ],
    },
    palette: { bg: "#f9f3ee", surface: "#ffffff", text: "#2a1f1a", sub: "#8a7568", accent: "#c47855", accentText: "#ffffff", border: "rgba(196,120,85,0.18)" },
  },
  {
    name: "Aether Audit",
    sector: "SaaS / IA / audit digital",
    category: "Tech / IA",
    objective: "Audit gratuit / démo produit",
    summary: "Page tech orientée data, conçue pour pousser à l'audit gratuit et capter les comptes B2B.",
    tagline: "AI Growth Audit",
    headline: "Pilotez votre acquisition avec l'IA.",
    cta: "Lancer mon audit gratuit",
    proof: "Utilisé par 180+ scale-ups",
    strengths: ["Dashboard preview live", "Cas clients chiffrés", "Démo gratuite sans CB"],
    structure: ["Hero produit", "Dashboard preview", "Use cases", "Logos clients", "Pricing", "FAQ technique", "CTA audit"],
    variant: "saas",
    images: {
      hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    },
    palette: { bg: "#070a12", surface: "#0e1320", text: "#e2e8f0", sub: "#8b94a8", accent: "#06b6d4", accentText: "#06121a", border: "rgba(6,182,212,0.18)" },
  },
  {
    name: "Kintaro Lab",
    sector: "Fitness / performance",
    category: "Fitness",
    objective: "Inscription challenge / coaching",
    summary: "Page énergique pensée pour vendre une transformation et déclencher l'inscription au programme.",
    tagline: "Performance lab",
    headline: "Transforme ton corps en 12 semaines.",
    cta: "Rejoindre le challenge",
    proof: "+ de 6 500 transformations",
    strengths: ["Hero choc émotionnel", "Programme jour par jour", "Témoignages vidéo intégrés"],
    structure: ["Hero énergie", "Le programme", "Coach présentation", "Transformations", "Pricing", "Garantie", "CTA challenge"],
    variant: "fitness",
    images: {
      hero: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
      ],
    },
    palette: { bg: "#0a0a0a", surface: "#151515", text: "#ffffff", sub: "#a3a3a3", accent: "#ef4444", accentText: "#ffffff", border: "rgba(239,68,68,0.22)" },
  },
  {
    name: "Velmora Travel",
    sector: "Voyage / expérience",
    category: "Voyage",
    objective: "Devis voyage sur mesure",
    summary: "Landing aspirationnelle pour vendre du voyage premium et déclencher la demande de devis.",
    tagline: "Maison de voyage",
    headline: "Des voyages dessinés pour vous.",
    cta: "Demander mon devis",
    proof: "Carnets signés par 1 100 voyageurs",
    strengths: ["Carrousel destinations cinématique", "Process sur mesure clair", "Conciergerie 24/7 mise en avant"],
    structure: ["Hero immersif", "Destinations signature", "Notre process", "Conciergerie", "Témoignages", "CTA devis"],
    variant: "travel",
    images: {
      hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
        "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80",
      ],
    },
    palette: { bg: "#0f1410", surface: "#1a221c", text: "#f0ebe1", sub: "#a89e8c", accent: "#d4a574", accentText: "#1a1410", border: "rgba(212,165,116,0.2)" },
  },
  {
    name: "Kaiyo House",
    sector: "Restaurant japonais",
    category: "Food",
    objective: "Réservation / commande en ligne",
    summary: "Landing immersive aux codes japonais, pensée pour la réservation et la commande premium.",
    tagline: "Sushi club signature",
    headline: "L'expérience sushi, repensée.",
    cta: "Réserver une table",
    proof: "Élu meilleur sushi club 2025",
    strengths: ["Carte interactive premium", "Univers de marque fort", "Réservation et delivery côte à côte"],
    structure: ["Hero univers", "Carte signature", "Le chef", "Le lieu", "Avis", "CTA réservation / delivery"],
    variant: "japan",
    images: {
      hero: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
        "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&q=80",
        "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=600&q=80",
      ],
    },
    palette: { bg: "#0a0a0a", surface: "#141414", text: "#f5f5f5", sub: "#9ca3af", accent: "#dc2626", accentText: "#ffffff", border: "rgba(220,38,38,0.2)" },
  },
  {
    name: "Halo District",
    sector: "Coworking / studio créatif",
    category: "Lifestyle",
    objective: "Visite des lieux / abonnement",
    summary: "Landing urbaine et énergique pour pousser à la visite et à l'abonnement coworking.",
    tagline: "Creative hub urbain",
    headline: "Le lieu où ta marque prend vie.",
    cta: "Réserver une visite",
    proof: "+ de 240 entrepreneurs membres",
    strengths: ["Visite virtuelle intégrée", "Plans d'abonnement clairs", "Événements communauté"],
    structure: ["Hero urbain", "Espaces & ambiance", "Abonnements", "Communauté", "Événements", "CTA visite"],
    variant: "coworking",
    images: {
      hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
      ],
    },
    palette: { bg: "#0a0d14", surface: "#131826", text: "#f1f5f9", sub: "#94a3b8", accent: "#fb923c", accentText: "#0a0d14", border: "rgba(251,146,60,0.2)" },
  },
];

/* ---------- Mini-mockup component ---------- */

const LandingMiniMockup = ({ landing, large = false }: { landing: LandingDemo; large?: boolean }) => {
  const { palette: c } = landing;
  // Scaling presets
  const s = large
    ? {
        title: "text-[22px] md:text-[28px]",
        sub: "text-[13px]",
        micro: "text-[11px]",
        nano: "text-[10px]",
        pad: "p-6 md:p-8",
        gap: "gap-5",
        cta: "px-4 py-2 text-[12px]",
        chip: "px-2.5 py-1 text-[10px]",
        heroH: "h-44 md:h-52",
        cardH: "h-16",
      }
    : {
        title: "text-[10px]",
        sub: "text-[7px]",
        micro: "text-[6.5px]",
        nano: "text-[5.5px]",
        pad: "p-2.5",
        gap: "gap-2",
        cta: "px-2 py-1 text-[6.5px]",
        chip: "px-1.5 py-0.5 text-[5.5px]",
        heroH: "h-14",
        cardH: "h-6",
      };

  const benefits = ["Hero impactant", "CTA clair", "Preuve sociale"];
  const rating = landing.proof.match(/[\d.,]+/)?.[0] ?? "4.9";

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: c.bg, color: c.text }}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: `radial-gradient(circle, ${c.accent}38, transparent 70%)` }}
      />
      {/* Browser chrome */}
      <div
        className="relative flex items-center gap-1 border-b px-2 py-1.5"
        style={{ borderColor: c.border, background: `${c.surface}cc` }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#ef4444" }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#f59e0b" }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#10b981" }} />
        <span className={`ml-2 truncate ${s.nano}`} style={{ color: c.sub }}>
          {landing.name.toLowerCase().replace(/\s+/g, "")}.fr
        </span>
      </div>

      <div className={`relative flex flex-col ${s.pad} ${s.gap}`}>
        {/* Navbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className={`flex items-center justify-center rounded ${large ? "h-5 w-5 text-[10px]" : "h-3 w-3 text-[5px]"} font-bold`}
              style={{ background: c.accent, color: c.accentText }}
            >
              {landing.name[0]}
            </span>
            <div className={`font-semibold tracking-tight ${s.sub}`} style={{ color: c.text }}>
              {landing.name}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {["Accueil", "Offre", "Contact"].map((m) => (
              <span key={m} className={s.nano} style={{ color: c.sub }}>
                {large ? m : "•"}
              </span>
            ))}
            <span className={`rounded font-medium ${s.chip}`} style={{ background: c.accent, color: c.accentText }}>
              {large ? landing.cta : "→"}
            </span>
          </div>
        </div>

        {/* Hero block */}
        <div
          className={`relative ${s.heroH} overflow-hidden rounded-md border`}
          style={{
            borderColor: c.border,
            background: `linear-gradient(135deg, ${c.accent}30, ${c.surface} 60%, ${c.bg})`,
          }}
        >
          <img
            src={landing.images.hero}
            alt={landing.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(115deg, ${c.bg}f2 0%, ${c.bg}b5 38%, ${c.bg}40 70%, transparent 100%)`,
            }}
          />
          <div
            className="absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl"
            style={{ background: `${c.accent}55` }}
          />
          <div className={`relative flex h-full flex-col justify-between ${large ? "p-5" : "p-2"}`}>
            <span
              className={`inline-flex w-fit items-center rounded-full border ${s.chip}`}
              style={{ borderColor: c.border, color: c.sub, background: `${c.bg}88` }}
            >
              {landing.tagline}
            </span>
            <div className="flex flex-col gap-1">
              <div className={`font-bold leading-tight ${s.title}`} style={{ color: c.text }}>
                {landing.headline}
              </div>
              {large && (
                <div className={`${s.sub} max-w-md`} style={{ color: c.sub }}>
                  {landing.summary}
                </div>
              )}
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={`rounded font-semibold shadow-lg ${s.cta}`}
                  style={{
                    background: c.accent,
                    color: c.accentText,
                    boxShadow: `0 6px 20px ${c.accent}55`,
                  }}
                >
                  {landing.cta}
                </span>
                <span className={`rounded border ${s.cta}`} style={{ borderColor: c.border, color: c.text }}>
                  {large ? "En savoir plus" : "Voir"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sector-specific block */}
        <VariantBlock landing={landing} c={c} large={large} />

        {/* Benefits row */}
        <div className="grid grid-cols-3 gap-1.5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`rounded border ${large ? "p-2.5" : "p-1.5"}`}
              style={{ borderColor: c.border, background: `${c.surface}88` }}
            >
              <div
                className={`mb-1 inline-flex items-center justify-center rounded ${large ? "h-5 w-5" : "h-2.5 w-2.5"}`}
                style={{ background: `${c.accent}25`, color: c.accent }}
              >
                <Check className={large ? "h-3 w-3" : "h-1.5 w-1.5"} />
              </div>
              <div className={`font-medium leading-tight ${s.nano}`} style={{ color: c.text }}>
                {large ? b : ""}
              </div>
              {large && (
                <div className={`${s.micro}`} style={{ color: c.sub }}>
                  Structure étudiée pour convertir.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social proof + testimonial */}
        <div className="grid grid-cols-5 gap-1.5">
          <div
            className={`col-span-3 rounded border ${large ? "p-3" : "p-1.5"}`}
            style={{ borderColor: c.border, background: `${c.surface}88` }}
          >
            <div className="flex items-center gap-0.5" style={{ color: c.accent }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className={large ? "h-3 w-3 fill-current" : "h-1.5 w-1.5 fill-current"} />
              ))}
            </div>
            <div className={`mt-1 italic leading-snug ${s.micro}`} style={{ color: c.text }}>
              {large
                ? `« Une expérience qui change tout. ${landing.name} a dépassé nos attentes. »`
                : "« Excellence et résultat. »"}
            </div>
            <div className={`mt-1 ${s.nano}`} style={{ color: c.sub }}>
              — Client vérifié
            </div>
          </div>
          <div
            className={`col-span-2 flex flex-col items-center justify-center rounded border ${large ? "p-3" : "p-1.5"}`}
            style={{
              borderColor: c.border,
              background: `linear-gradient(135deg, ${c.accent}22, ${c.surface})`,
            }}
          >
            <div className={`font-bold ${large ? "text-2xl" : "text-[10px]"}`} style={{ color: c.text }}>
              {rating}/5
            </div>
            <div className={s.nano} style={{ color: c.sub }}>
              {large ? "Note moyenne" : "Note"}
            </div>
          </div>
        </div>

        {/* Offer / form mini block */}
        <div
          className={`rounded-md border ${large ? "p-4" : "p-2"}`}
          style={{
            borderColor: c.border,
            background: `linear-gradient(135deg, ${c.surface}, ${c.accent}10)`,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <div className={`font-semibold ${s.sub}`} style={{ color: c.text }}>
                {large ? landing.objective : "Offre"}
              </div>
              {large && (
                <div className={`mt-0.5 ${s.micro}`} style={{ color: c.sub }}>
                  Réservez votre créneau — réponse sous 24h.
                </div>
              )}
            </div>
            <span
              className={`rounded font-semibold ${s.cta}`}
              style={{ background: c.accent, color: c.accentText }}
            >
              {landing.cta}
            </span>
          </div>
          {large && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div
                className={`rounded border ${s.micro}`}
                style={{ borderColor: c.border, background: `${c.bg}88`, color: c.sub, padding: "8px 10px" }}
              >
                Votre nom
              </div>
              <div
                className={`rounded border ${s.micro}`}
                style={{ borderColor: c.border, background: `${c.bg}88`, color: c.sub, padding: "8px 10px" }}
              >
                Votre email
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-between border-t pt-1.5 ${s.nano}`}
          style={{ borderColor: c.border, color: c.sub }}
        >
          <span>© {landing.name}</span>
          <span>{large ? "Mentions · Contact · CGU" : "•••"}</span>
        </div>
      </div>
    </div>
  );
};

const VariantBlock = ({ landing, c, large }: { landing: LandingDemo; c: LandingDemo["palette"]; large: boolean }) => {
  const variant = landing.variant;
  const gallery = landing.images.gallery;
  const blockSize = large ? "h-24 md:h-28" : "h-10";
  const microFont = large ? "text-[10px]" : "text-[6px]";

  // Variants with a real photo gallery (3 cards)
  if (gallery && (variant === "auto" || variant === "fitness" || variant === "japan" || variant === "food" || variant === "beauty" || variant === "travel" || variant === "realty" || variant === "coworking")) {
    const labels: Record<string, [string, string, string]> = {
      auto: ["GT Coupé", "Roadster", "SUV Sport"],
      fitness: ["Force", "Endurance", "Mobilité"],
      japan: ["Omakase", "Signature", "Sashimi"],
      food: ["Brunch", "Signature", "Dessert"],
      beauty: ["Sérum", "Rituel", "Soin"],
      travel: ["Bali", "Kyoto", "Maldives"],
      realty: ["Villa vue mer", "Loft design", "Appartement"],
      coworking: ["Open space", "Studio", "Lounge"],
    };
    const tagPrice: Record<string, [string, string, string]> = {
      auto: ["dès 89 000€", "dès 124 000€", "dès 76 000€"],
      fitness: ["12 sem.", "8 sem.", "6 sem."],
      japan: ["12 pièces", "Chef's table", "Premium"],
      food: ["Dès 24€", "Signature", "Maison"],
      beauty: ["49€", "Routine", "Best-seller"],
      travel: ["7 nuits", "5 nuits", "10 nuits"],
      realty: ["1 250 000€", "890 000€", "640 000€"],
      coworking: ["Dès 29€/j", "Mensuel", "Premium"],
    };
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`relative ${large ? "h-24 md:h-28" : "h-10"} overflow-hidden rounded border`}
            style={{ borderColor: c.border, background: c.surface }}
          >
            <img
              src={gallery[i]}
              alt={labels[variant][i]}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, transparent 35%, ${c.bg}e8 100%)` }}
            />
            {large && (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1 p-2">
                <span className={`font-semibold leading-tight ${microFont}`} style={{ color: c.text }}>
                  {labels[variant][i]}
                </span>
                <span
                  className="rounded px-1.5 py-0.5 text-[8px] font-semibold"
                  style={{ background: c.accent, color: c.accentText }}
                >
                  {tagPrice[variant][i]}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "saas") {
    // Crédible dashboard preview with KPIs + chart
    return (
      <div className={`${large ? "min-h-[7rem]" : ""} rounded-md border ${large ? "p-3" : "p-1.5"}`} style={{ borderColor: c.border, background: c.surface }}>
        <div className={`grid grid-cols-3 ${large ? "gap-2" : "gap-1"}`}>
          {[
            { k: "MRR", v: "84,2k€", d: "+18%" },
            { k: "Leads", v: "1 248", d: "+24%" },
            { k: "Conv.", v: "4,9%", d: "+0,8" },
          ].map((kpi) => (
            <div key={kpi.k} className={`rounded border ${large ? "p-2" : "p-1"}`} style={{ borderColor: c.border, background: `${c.bg}88` }}>
              <div className={microFont} style={{ color: c.sub }}>{large ? kpi.k : ""}</div>
              <div className={`font-bold ${large ? "text-base" : "text-[8px]"}`} style={{ color: c.text }}>{kpi.v}</div>
              <div className={microFont} style={{ color: c.accent }}>{large ? kpi.d : "▲"}</div>
            </div>
          ))}
        </div>
        <div className={`mt-1.5 flex items-end gap-0.5 ${large ? "h-10" : "h-4"}`}>
          {[0.4, 0.55, 0.45, 0.7, 0.6, 0.78, 0.65, 0.88, 0.72, 0.95, 0.82, 1].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h * 100}%`, background: c.accent, opacity: 0.45 + h * 0.55 }} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "school") {
    return (
      <div className="flex flex-col gap-1">
        {["Module 1 — Mindset", "Module 2 — Acquisition", "Module 3 — Conversion"].map((m, i) => (
          <div key={i} className={`flex items-center justify-between rounded border ${large ? "px-3 py-2" : "px-1.5 py-1"}`} style={{ borderColor: c.border, background: c.surface }}>
            <div className="flex items-center gap-2">
              <span className={`flex items-center justify-center rounded ${large ? "h-6 w-6 text-[10px]" : "h-3 w-3 text-[5px]"} font-bold`} style={{ background: `${c.accent}25`, color: c.accent }}>{i + 1}</span>
              <span className={microFont} style={{ color: c.text }}>{large ? m : `M${i + 1}`}</span>
            </div>
            <span className={microFont} style={{ color: c.accent }}>✓ Acquis</span>
          </div>
        ))}
      </div>
    );
  }

  // Fallback (no gallery available)
  return (
    <div className={`${blockSize} rounded-md border`} style={{ borderColor: c.border, background: `linear-gradient(135deg, ${c.accent}30, ${c.surface})` }} />
  );
};

/* ---------- Modal ---------- */

export const LandingPageLabModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [activeFilter, setActiveFilter] = useState<typeof landingFilters[number]>("Tous");
  const [active, setActive] = useState<LandingDemo | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    if (activeFilter === "Tous") return landings;
    return landings.filter((l) => l.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (active) setActive(null);
        else onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, onOpenChange]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Scroll to top when opening a detail
  useEffect(() => {
    if (active && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-2 py-2 backdrop-blur-md sm:px-4 sm:py-4 md:px-6 md:py-6"
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
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-7xl overflow-hidden rounded-[22px] border border-white/10 bg-surface-darker shadow-[0_30px_120px_rgba(0,0,0,0.65)] sm:rounded-[28px]"
            style={{ maxHeight: "calc(100vh - 16px)" }}
          >
            {/* Sticky close button */}
            <button
              type="button"
              aria-label="Fermer le Landing Page Lab"
              onClick={() => onOpenChange(false)}
              className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-surface-dark-foreground/85 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-primary md:h-11 md:w-11"
            >
              <X className="h-5 w-5" />
            </button>

            {/* SINGLE scroll container — everything scrolls together */}
            <div
              ref={scrollRef}
              className="lp-lab-scroll overflow-y-auto overscroll-contain"
              style={{ maxHeight: "calc(100vh - 16px)" }}
            >
              {!active ? (
                <>
                  {/* Header */}
                  <div className="relative border-b border-white/8 px-4 pb-5 pt-5 sm:px-6 md:px-8 md:pb-6 md:pt-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_58%)]" />
                    <div className="relative max-w-3xl pr-12">
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-primary/80">
                    <Zap className="h-3.5 w-3.5" /> Landing Page Lab
                  </span>
                      <h3 className="mt-3 text-2xl font-heading font-bold leading-tight text-surface-dark-foreground sm:text-3xl md:text-5xl">
                    Démonstrations de pages à <span className="gradient-text">fort potentiel</span>
                  </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-surface-dark-foreground/62 md:text-base">
                    Une sélection de landing pages fictives imaginées pour montrer notre capacité à créer des pages pensées pour capter l'attention, rassurer, structurer une offre et pousser à l'action.
                  </p>
                </div>
                    <div className="relative mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
                {landingFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                          className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] transition-all duration-300 md:px-3.5 md:py-2 md:text-[11px] md:tracking-[0.24em] ${activeFilter === filter ? "border-primary/45 bg-primary/12 text-primary shadow-[0_0_24px_rgba(239,68,68,0.12)]" : "border-white/10 bg-white/5 text-surface-dark-foreground/50 hover:border-white/20 hover:text-surface-dark-foreground/80"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
                    <p className="relative mt-4 max-w-3xl text-xs italic text-surface-dark-foreground/45 md:text-sm">
                « Une landing page efficace ne se contente pas d'être belle. Elle guide l'attention, renforce la confiance et pousse à l'action. »
              </p>
            </div>

                  {/* Grid (no inner scroll — uses parent) */}
                  <div className="px-4 pb-10 pt-6 sm:px-6 md:px-8">
              <motion.div layout className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visible.map((landing, idx) => (
                    <motion.button
                      key={landing.name}
                      type="button"
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.32, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setActive(landing)}
                      className="group relative flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:bg-white/[0.04] hover:shadow-[0_22px_70px_rgba(239,68,68,0.18)]"
                    >
                            {/* Mockup window — taller to show full mini-page */}
                            <div className="relative aspect-[4/5] overflow-hidden border-b border-white/8">
                        <LandingMiniMockup landing={landing} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100">
                                Voir la structure <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary/85">{landing.category}</span>
                          <span className="text-[10px] uppercase tracking-[0.22em] text-surface-dark-foreground/42">{landing.sector}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-heading font-semibold text-surface-dark-foreground">{landing.name}</h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-surface-dark-foreground/58">{landing.summary}</p>
                        </div>
                        <div className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-surface-dark-foreground/50">
                          <Target className="h-3 w-3 text-primary/80" /> {landing.objective}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
                </>
              ) : (
                /* INLINE detail view — same scroll container */
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/8 bg-surface-darker/85 px-4 py-3 backdrop-blur-md sm:px-6 md:px-8">
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-surface-dark-foreground/80 transition-all hover:border-primary/40 hover:text-primary"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Retour
                    </button>
                    <span className="truncate text-[11px] uppercase tracking-[0.28em] text-surface-dark-foreground/55">
                      {active.category} · {active.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-8 px-4 py-7 sm:px-6 md:px-8 md:py-10 lg:grid-cols-[1.4fr_1fr]">
                    {/* Large preview */}
                    <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                      <LandingMiniMockup landing={active} large />
                    </div>

                    {/* Side info */}
                    <div className="flex flex-col">
                      <span className="inline-flex w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-primary/80">
                        <Sparkles className="h-3.5 w-3.5" /> {active.category}
                      </span>
                      <h3 className="mt-3 text-3xl font-heading font-bold text-surface-dark-foreground md:text-4xl">{active.name}</h3>
                      <p className="mt-1.5 text-sm uppercase tracking-[0.24em] text-surface-dark-foreground/45">{active.sector}</p>
                      <p className="mt-5 text-base leading-relaxed text-surface-dark-foreground/68">{active.summary}</p>

                      <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/8 p-4">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-primary/85">
                          <Target className="h-3.5 w-3.5" /> Objectif de conversion
                        </div>
                        <div className="mt-2 text-base font-semibold text-surface-dark-foreground">{active.objective}</div>
                      </div>

                      <div className="mt-7">
                        <div className="text-[11px] uppercase tracking-[0.26em] text-surface-dark-foreground/55">Points forts</div>
                        <ul className="mt-3 space-y-2">
                          {active.strengths.map((s) => (
                            <li key={s} className="flex items-start gap-2.5 text-sm text-surface-dark-foreground/72">
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-7">
                        <div className="text-[11px] uppercase tracking-[0.26em] text-surface-dark-foreground/55">Structure de conversion</div>
                        <ol className="mt-3 space-y-1.5">
                          {active.structure.map((s, i) => (
                            <li key={s} className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2 text-sm text-surface-dark-foreground/75">
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-[11px] font-semibold text-primary">{i + 1}</span>
                              {s}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <p className="mt-7 text-xs italic leading-relaxed text-surface-dark-foreground/45">
                        Chaque démo illustre une architecture pensée pour capter, rassurer et convertir — pas une simple vitrine.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
