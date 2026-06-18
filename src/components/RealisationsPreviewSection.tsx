import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Search, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { FrulCarsLogo3D } from "@/components/FrulCarsLogo3D";
import logoFrulImmo from "@/assets/logo-frulimmo.png.asset.json";
import casaNuvea from "@/assets/logo-gallery/casa-nuvea.png.asset.json";
import vertikLabs from "@/assets/logo-gallery/vertik-labs.png.asset.json";
import noirMuse from "@/assets/logo-gallery/noir-muse.png.asset.json";
import aetherAudio from "@/assets/logo-gallery/aether-audio.png.asset.json";
import kaiyo from "@/assets/logo-gallery/kaiyo.png.asset.json";
import bloomora from "@/assets/logo-gallery/bloomora.png.asset.json";
import monteza from "@/assets/logo-gallery/monteza.png.asset.json";
import mimiPop from "@/assets/logo-gallery/mimi-pop.png.asset.json";
import helionStudio from "@/assets/logo-gallery/helion-studio.png.asset.json";
import pixelHarbor from "@/assets/logo-gallery/pixel-harbor.png.asset.json";

const identityLogos = [
  { name: "Bloomora", category: "Lifestyle", sector: "Floral Atelier", style: "Éditorial floral", description: "Concept identitaire fictif imaginé pour une maison florale premium à l'élégance sensible.", imageUrl: bloomora.url, accent: "from-rose-500/18 via-transparent to-amber-500/12" },
  { name: "Aether Audio", category: "Créatif", sector: "Sound Production", style: "Immersion sonore", description: "Direction visuelle fictive pensée pour un studio audio premium orienté production et expérience immersive.", imageUrl: aetherAudio.url, accent: "from-violet-500/18 via-transparent to-sky-500/12" },
  { name: "Casa Nuvéa", category: "Architecture", sector: "Interior Architecture", style: "Minéral haut de gamme", description: "Territoire de marque fictif conçu pour un studio d'architecture intérieure raffiné et contemporain.", imageUrl: casaNuvea.url, accent: "from-amber-500/18 via-transparent to-stone-300/12" },
  { name: "Kaiyo", category: "Food", sector: "Sushi Club", style: "Signature japonaise", description: "Direction visuelle premium pensée pour une marque de restauration japonaise haut de gamme.", imageUrl: kaiyo.url, accent: "from-red-500/16 via-transparent to-yellow-500/10" },
  { name: "Vertik Labs", category: "Tech", sector: "Sustainable Systems", style: "Tech organique", description: "Concept identitaire fictif mêlant innovation technologique et promesse durable pour une marque de systèmes intelligents.", imageUrl: vertikLabs.url, accent: "from-emerald-500/18 via-transparent to-cyan-500/12" },
  { name: "Mimi Pop", category: "Kids", sector: "Kids Concept Store", style: "Pop joyeux", description: "Concept identitaire fictif imaginé pour une enseigne lifestyle enfantine colorée, douce et mémorable.", imageUrl: mimiPop.url, accent: "from-pink-500/18 via-transparent to-cyan-400/12" },
  { name: "Monteza", category: "Aventure", sector: "Adventure Brand", style: "Exploration premium", description: "Univers de marque fictif dessiné pour une enseigne outdoor aspirante, premium et inspirante.", imageUrl: monteza.url, accent: "from-emerald-700/18 via-transparent to-amber-500/10" },
  { name: "Pixel Harbor", category: "Gaming", sector: "Gaming / Streaming", style: "Néon communautaire", description: "Direction identitaire fictive pensée pour une plateforme gaming orientée stream, communauté et culture digitale.", imageUrl: pixelHarbor.url, accent: "from-fuchsia-500/18 via-transparent to-sky-500/12" },
  { name: "Hélion Studio", category: "Créatif", sector: "Motion Design", style: "Cinétique éditorial", description: "Signature fictive conçue pour un studio créatif focalisé sur le motion design, la direction et la précision graphique.", imageUrl: helionStudio.url, accent: "from-amber-500/18 via-transparent to-red-500/10" },
  { name: "Noir Muse", category: "Luxe", sector: "Parfum & Beauté", style: "Luxe sculptural", description: "Concept identitaire fictif développé pour une maison beauté haut de gamme à l'aura couture.", imageUrl: noirMuse.url, accent: "from-amber-400/16 via-transparent to-rose-500/10" },
] as const;

const identityFilters = ["Tous", "Luxe", "Tech", "Food", "Architecture", "Kids", "Créatif", "Lifestyle", "Gaming", "Aventure"] as const;

const projects = [
  { name: "FRUL'CARS", type: "Automobile", benefit: "Site vitrine + catalogue véhicules pour concessionnaire premium.", tone: "from-red-600/30 to-rose-900/20", href: "https://frulcars.fr", logo3d: true as const },
  { name: "FRUL'IMMO", type: "Immobilier", benefit: "Site vitrine premium pour agence immobilière haut de gamme.", tone: "from-red-600/30 to-zinc-900/30", href: "https://frulimmo.fr", logo3d: true as const, logoUrl: logoFrulImmo.url, domain: "frulimmo.fr" },
  { name: "RMA DISTRIBUTION", type: "Site B2B & identité", benefit: "Image structurée pour scaler la distribution.", tone: "from-zinc-700/30 to-red-900/20" },
  { name: "Restaurant Premium", type: "Site & contenu", benefit: "Expérience digitale qui inspire confiance.", tone: "from-amber-500/20 to-rose-900/20" },
  { name: "Identité Visuelle", type: "Logo & système graphique", benefit: "Une marque reconnaissable en 3 secondes.", tone: "from-rose-500/25 to-zinc-900/30", portfolioModal: true as const },
  { name: "Landing Page", type: "Tunnel de conversion", benefit: "Visiteurs transformés en prospects qualifiés.", tone: "from-red-500/25 to-fuchsia-900/20" },
];

export const RealisationsPreviewSection = () => (
  <section className="relative section-dark py-28 md:py-36 overflow-hidden">
    <div className="container mx-auto px-4 relative">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
        <AnimatedSection className="max-w-3xl">
          <span className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">Nos créations</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-5 mb-5 leading-[1.05]">
            Regardez ce qu'on est <span className="gradient-text">capables de construire.</span>
          </h2>
          <p className="text-lg text-surface-dark-foreground/55 leading-relaxed">
            Sites, identités, contenus, systèmes digitaux : chaque projet est pensé pour donner plus d'impact à une marque.
          </p>
        </AnimatedSection>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => {
          return (
            <AnimatedSection key={p.name} delay={(i % 3) * 0.1}>
              <ProjectCard project={p} />
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection className="text-center mt-14" delay={0.2}>
        <Link to="/realisations">
          <Button variant="hero-outline" size="lg" className="px-10 py-7 text-base">
            Voir toutes nos créations
          </Button>
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

type Project = (typeof projects)[number];

const ProjectCard = ({ project: p }: { project: Project }) => {
  const [hovered, setHovered] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const inner = (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-surface-darker hover:border-primary/30 transition-all duration-500 h-full"
    >
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.tone} overflow-hidden`}>
        {"logo3d" in p && p.logo3d ? (
          <>
            {/* radial spotlight */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 55%, rgba(239,68,68,0.22), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />
            {/* Browser chrome */}
            <div className="absolute top-0 left-0 right-0 h-7 bg-black/70 backdrop-blur-md border-b border-white/10 flex items-center px-3 gap-1.5 z-10">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="ml-3 text-[10px] text-white/50 font-mono tracking-wide truncate">{"domain" in p && p.domain ? p.domain : "frulcars.fr"}</span>
            </div>
            {/* 3D logo */}
            <div className="absolute inset-0 pt-7">
              <FrulCarsLogo3D hovered={hovered} logoUrl={"logoUrl" in p ? p.logoUrl : undefined} alt={p.name} />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "linear-gradient(hsl(0 85% 50% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 50% / 0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }} />
            {"portfolioModal" in p && p.portfolioModal ? (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(239,68,68,0.18),transparent_56%)]" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/6 to-transparent" />
                <div className="absolute inset-0 px-5 py-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/55">
                    <span>Logo Gallery</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 text-primary/80">
                      <Sparkles className="h-3 w-3" /> Explorer
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {identityLogos.slice(0, 6).map((logo) => (
                      <div key={logo.name} className="relative overflow-hidden rounded-xl border border-white/10 bg-black/35 backdrop-blur-sm">
                        <div className={`absolute inset-0 bg-gradient-to-br ${logo.accent} opacity-70`} />
                        <img src={logo.imageUrl} alt={logo.name} className="relative z-10 aspect-square w-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-primary/80">
                      <Search className="h-3.5 w-3.5" /> Voir la galerie
                    </span>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                      <span className="rounded-full border border-white/10 px-2.5 py-1">Luxe</span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1">Tech</span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1">Kids</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading font-bold text-3xl md:text-4xl text-white/80 tracking-tight">{p.name}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        )}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500 z-20">
          {p.href ? <ExternalLink className="w-4 h-4 text-primary" /> : <ArrowUpRight className="w-4 h-4 text-primary" />}
        </div>
      </div>
      <div className="p-6">
        <div className="text-xs uppercase tracking-wider text-primary/70 mb-2">{p.type}</div>
        <h3 className="font-heading font-semibold text-surface-dark-foreground text-lg mb-2 flex items-center gap-2">
          {p.name}
          {p.href && <span className="text-[10px] font-normal text-primary/70 uppercase tracking-wider">↗ Visiter</span>}
          {"portfolioModal" in p && p.portfolioModal && <span className="text-[10px] font-normal text-primary/70 uppercase tracking-wider">↗ Explorer</span>}
        </h3>
        <p className="text-sm text-surface-dark-foreground/55 leading-relaxed">{p.benefit}</p>
      </div>
    </motion.div>
  );

  if ("portfolioModal" in p && p.portfolioModal) {
    return (
      <>
        <button type="button" onClick={() => setPortfolioOpen(true)} className="block h-full w-full text-left">
          {inner}
        </button>
        <IdentityPortfolioModal open={portfolioOpen} onOpenChange={setPortfolioOpen} />
      </>
    );
  }

  if (p.href) {
    return (
      <a href={p.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return inner;
};

const IdentityPortfolioModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [activeFilter, setActiveFilter] = useState<(typeof identityFilters)[number]>("Tous");
  const [selectedLogo, setSelectedLogo] = useState<(typeof identityLogos)[number]>(identityLogos[0]);

  const visibleLogos = useMemo(() => {
    if (activeFilter === "Tous") return identityLogos;
    return identityLogos.filter((logo) => logo.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!visibleLogos.some((logo) => logo.name === selectedLogo.name)) {
      setSelectedLogo(visibleLogos[0]);
    }
  }, [visibleLogos, selectedLogo.name]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/72 px-3 py-3 backdrop-blur-md md:px-6 md:py-6"
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
            className="identity-portfolio-shell relative flex h-full max-h-[96vh] w-full max-w-7xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-surface-darker/92 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
          >
            <div className="identity-portfolio-header relative border-b border-white/8 px-5 pb-5 pt-5 md:px-8 md:pb-6 md:pt-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.16),transparent_58%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-primary/80">
                    <Sparkles className="h-3.5 w-3.5" /> Sélection portfolio
                  </span>
                  <h3 className="mt-4 text-3xl font-heading font-bold leading-tight text-surface-dark-foreground md:text-5xl">
                    Exploration créative — Logos & identités
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-surface-dark-foreground/62 md:text-base">
                    Une sélection de directions créatives fictives imaginées pour illustrer la polyvalence de FRUL’DIGITAL à travers différents univers de marque.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Fermer la galerie"
                  onClick={() => onOpenChange(false)}
                  className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-surface-dark-foreground/80 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-2.5">
                {identityFilters.map((filter) => (
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
            </div>

            <div className="identity-portfolio-scroll grid min-h-0 flex-1 gap-5 overflow-y-auto px-5 pb-5 pt-5 md:grid-cols-[minmax(0,1.25fr)_320px] md:px-8 md:pb-8 md:pt-6 xl:grid-cols-[minmax(0,1.4fr)_360px]">
              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visibleLogos.map((logo, index) => {
                  const isActive = selectedLogo.name === logo.name;

                  return (
                    <motion.button
                      key={logo.name}
                      type="button"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: index * 0.03 }}
                      onClick={() => setSelectedLogo(logo)}
                      className={`identity-logo-card group relative overflow-hidden rounded-[22px] border text-left transition-all duration-300 ${isActive ? "border-primary/35 bg-white/[0.045] shadow-[0_18px_60px_rgba(239,68,68,0.12)]" : "border-white/10 bg-white/[0.03] hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.045]"}`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${logo.accent} opacity-70`} />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_30%,rgba(0,0,0,0.34))]" />
                      <div className="relative flex h-full flex-col p-3.5">
                        <div className="overflow-hidden rounded-[18px] border border-white/10 bg-black/30">
                          <img src={logo.imageUrl} alt={`${logo.name} — ${logo.sector}`} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                        </div>
                        <div className="mt-4 space-y-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary/80">{logo.category}</span>
                            <span className="text-[10px] uppercase tracking-[0.22em] text-surface-dark-foreground/42">{logo.style}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-heading font-semibold text-surface-dark-foreground">{logo.name}</h4>
                            <p className="mt-1 text-sm text-surface-dark-foreground/58">{logo.sector}</p>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.aside
                key={selectedLogo.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.24 }}
                className="identity-preview-panel sticky top-0 h-fit overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedLogo.accent} opacity-75`} />
                <div className="relative p-4 md:p-5">
                  <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/30">
                    <img src={selectedLogo.imageUrl} alt={selectedLogo.name} className="aspect-square w-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary/85">{selectedLogo.category}</span>
                      <span className="rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-surface-dark-foreground/52">{selectedLogo.style}</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-heading font-semibold text-surface-dark-foreground">{selectedLogo.name}</h4>
                      <p className="mt-1 text-sm uppercase tracking-[0.24em] text-surface-dark-foreground/46">{selectedLogo.sector}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-surface-dark-foreground/62">{selectedLogo.description}</p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};