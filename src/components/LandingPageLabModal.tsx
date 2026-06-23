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
    palette: { bg: "#0a0d14", surface: "#131826", text: "#f1f5f9", sub: "#94a3b8", accent: "#fb923c", accentText: "#0a0d14", border: "rgba(251,146,60,0.2)" },
  },
];

/* ---------- Mini-mockup component ---------- */

const LandingMiniMockup = ({ landing, large = false }: { landing: LandingDemo; large?: boolean }) => {
  const { palette: c, variant } = landing;
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
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `linear-gradient(${c.text}10 1px, transparent 1px), linear-gradient(90deg, ${c.text}10 1px, transparent 1px)`,
              backgroundSize: large ? "24px 24px" : "8px 8px",
            }}
          />
          <div
            className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
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
        <VariantBlock variant={variant} c={c} large={large} />

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

const VariantBlock = ({ variant, c, large }: { variant: LandingDemo["variant"]; c: LandingDemo["palette"]; large: boolean }) => {
  const blockSize = large ? "h-24 md:h-28" : "h-10";
  const microFont = large ? "text-[10px]" : "text-[6px]";

  if (variant === "auto" || variant === "fitness" || variant === "japan") {
    // Cinematic dark hero block
    return (
      <div className={`relative ${blockSize} overflow-hidden rounded-md border`} style={{ borderColor: c.border, background: `linear-gradient(135deg, ${c.accent}26, ${c.surface})` }}>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(${c.text}10 1px, transparent 1px), linear-gradient(90deg, ${c.text}10 1px, transparent 1px)`,
          backgroundSize: large ? "20px 20px" : "8px 8px",
        }} />
        <div className="absolute inset-0 flex items-end p-2">
          <span className={microFont} style={{ color: c.text }}>{variant === "auto" ? "GT 2026 — Premium" : variant === "fitness" ? "12 semaines — Pro" : "Omakase — 12 pièces"}</span>
        </div>
      </div>
    );
  }

  if (variant === "food" || variant === "beauty" || variant === "travel") {
    // Visual grid (gallery)
    return (
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${large ? "h-16 md:h-20" : "h-8"} rounded border`} style={{
            borderColor: c.border,
            background: `linear-gradient(${135 + i * 30}deg, ${c.accent}${i === 1 ? "55" : "33"}, ${c.surface})`,
          }} />
        ))}
      </div>
    );
  }

  if (variant === "saas") {
    // Dashboard preview
    return (
      <div className={`${blockSize} rounded-md border p-1.5`} style={{ borderColor: c.border, background: c.surface }}>
        <div className="flex h-full items-end gap-0.5">
          {[0.4, 0.7, 0.3, 0.85, 0.55, 0.95, 0.65, 0.8].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h * 100}%`, background: c.accent, opacity: 0.6 + h * 0.4 }} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "realty") {
    // Calculator card
    return (
      <div className={`${blockSize} rounded-md border p-2 flex flex-col justify-between`} style={{ borderColor: c.border, background: c.surface }}>
        <span className={microFont} style={{ color: c.sub }}>Revenus estimés / an</span>
        <span className={`font-bold ${large ? "text-2xl" : "text-[10px]"}`} style={{ color: c.text }}>32 400 €</span>
        <div className="h-1 rounded-full" style={{ background: `${c.accent}33` }}>
          <div className="h-full w-3/4 rounded-full" style={{ background: c.accent }} />
        </div>
      </div>
    );
  }

  if (variant === "school") {
    // Module list
    return (
      <div className="flex flex-col gap-1">
        {["Module 1 — Mindset", "Module 2 — Acquisition", "Module 3 — Conversion"].map((m, i) => (
          <div key={i} className="flex items-center justify-between rounded border px-1.5 py-1" style={{ borderColor: c.border, background: c.surface }}>
            <span className={microFont} style={{ color: c.text }}>{large ? m : `M${i + 1}`}</span>
            <span className={microFont} style={{ color: c.accent }}>✓</span>
          </div>
        ))}
      </div>
    );
  }

  // coworking
  return (
    <div className={`${blockSize} grid grid-cols-2 gap-1`}>
      {[0, 1].map((i) => (
        <div key={i} className="relative overflow-hidden rounded border" style={{
          borderColor: c.border,
          background: `linear-gradient(${i === 0 ? 135 : 45}deg, ${c.accent}55, ${c.surface})`,
        }}>
          <div className="absolute bottom-1 left-1">
            <span className={microFont} style={{ color: c.text }}>{i === 0 ? "Open space" : "Studios"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------- Modal ---------- */

export const LandingPageLabModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [activeFilter, setActiveFilter] = useState<typeof landingFilters[number]>("Tous");
  const [active, setActive] = useState<LandingDemo | null>(null);

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-3 py-3 backdrop-blur-md md:px-6 md:py-6"
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
            className="relative flex h-full max-h-[96vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-surface-darker shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
          >
            {/* Header */}
            <div className="relative border-b border-white/8 px-5 pb-5 pt-5 md:px-8 md:pb-6 md:pt-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_58%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-primary/80">
                    <Zap className="h-3.5 w-3.5" /> Landing Page Lab
                  </span>
                  <h3 className="mt-4 text-3xl font-heading font-bold leading-tight text-surface-dark-foreground md:text-5xl">
                    Démonstrations de pages à <span className="gradient-text">fort potentiel</span>
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-surface-dark-foreground/62 md:text-base">
                    Une sélection de landing pages fictives imaginées pour montrer notre capacité à créer des pages pensées pour capter l'attention, rassurer, structurer une offre et pousser à l'action.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Fermer le Landing Page Lab"
                  onClick={() => onOpenChange(false)}
                  className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-surface-dark-foreground/80 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-2.5">
                {landingFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-3.5 py-2 text-[11px] uppercase tracking-[0.24em] transition-all duration-300 ${activeFilter === filter ? "border-primary/45 bg-primary/12 text-primary shadow-[0_0_24px_rgba(239,68,68,0.12)]" : "border-white/10 bg-white/5 text-surface-dark-foreground/50 hover:border-white/20 hover:text-surface-dark-foreground/80"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <p className="relative mt-5 max-w-3xl text-xs italic text-surface-dark-foreground/45 md:text-sm">
                « Une landing page efficace ne se contente pas d'être belle. Elle guide l'attention, renforce la confiance et pousse à l'action. »
              </p>
            </div>

            {/* Grid */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-6 md:px-8">
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
                      {/* Mockup window */}
                      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/8">
                        <LandingMiniMockup landing={landing} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100">
                          Explorer <ArrowRight className="h-3 w-3" />
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
          </motion.div>
        </motion.div>
      )}

      {/* Detail lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lp-detail"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 px-3 py-3 backdrop-blur-lg md:px-6 md:py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-full max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-surface-darker shadow-[0_40px_140px_rgba(0,0,0,0.75)]"
            >
              <button
                type="button"
                aria-label="Fermer l'aperçu"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/55 text-surface-dark-foreground/80 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1.35fr_1fr]">
                {/* Large mockup */}
                <div className="relative min-h-[320px] overflow-y-auto border-b border-white/8 lg:border-b-0 lg:border-r">
                  <div className="h-full min-h-full">
                    <LandingMiniMockup landing={active} large />
                  </div>
                </div>

                {/* Side info */}
                <div className="flex min-h-0 flex-col overflow-y-auto px-6 py-7 md:px-8 md:py-9">
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
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
