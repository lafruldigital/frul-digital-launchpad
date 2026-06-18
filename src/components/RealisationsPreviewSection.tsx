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
import velmoraTravel from "@/assets/logo-gallery/velmora-travel.png.asset.json";
import orbynStudio from "@/assets/logo-gallery/orbyn-studio.png.asset.json";
import solenne from "@/assets/logo-gallery/solenne.png.asset.json";
import kintaroFit from "@/assets/logo-gallery/kintaro-fit.png.asset.json";
import cimaCoffee from "@/assets/logo-gallery/cima-coffee.png.asset.json";
import riveo from "@/assets/logo-gallery/riveo.png.asset.json";
import drivion from "@/assets/logo-gallery/drivion.png.asset.json";
import noxora from "@/assets/logo-gallery/noxora.png.asset.json";
import atelierVera from "@/assets/logo-gallery/atelier-vera.png.asset.json";
import altisRealty from "@/assets/logo-gallery/altis-realty.png.asset.json";
import frulImmoLogo from "@/assets/logo-gallery/frul-immo.png.asset.json";
import frulCarsLogo from "@/assets/logo-gallery/frul-cars.jpg.asset.json";
import rmaDistributionLogo from "@/assets/logo-gallery/rma-distribution.jpeg.asset.json";
import nomadPeakExpeditions from "@/assets/logo-gallery/nomad-peak-expeditions.png.asset.json";
import haloDistrict from "@/assets/logo-gallery/halo-district.png.asset.json";
import velvetEmber from "@/assets/logo-gallery/velvet-ember.png.asset.json";
import circuitBloom from "@/assets/logo-gallery/circuit-bloom.png.asset.json";
import ironValeSecurity from "@/assets/logo-gallery/iron-vale-security.png.asset.json";
import nomaTerraSpa from "@/assets/logo-gallery/noma-terra-spa.png.asset.json";
import lyseaJoaillerie from "@/assets/logo-gallery/lysea-joaillerie.png.asset.json";
import atelierBrasa from "@/assets/logo-gallery/atelier-brasa.png.asset.json";
import virelioCapital from "@/assets/logo-gallery/virelio-capital.png.asset.json";
import soraPetCare from "@/assets/logo-gallery/sora-pet-care.png.asset.json";

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
  { name: "Velmora Travel", category: "Voyage", sector: "Luxury Travel", style: "Voyage prestige", description: "Concept identitaire fictif imaginé pour une maison de voyage premium orientée expériences rares et destinations signature.", imageUrl: velmoraTravel.url, accent: "from-amber-400/18 via-transparent to-red-500/10" },
  { name: "Orbyn Studio", category: "Mode", sector: "Fashion & Streetwear", style: "Streetwear premium", description: "Direction de marque fictive pensée pour un label mode à l'esthétique urbaine, structurée et haut de gamme.", imageUrl: orbynStudio.url, accent: "from-zinc-100/10 via-transparent to-red-500/14" },
  { name: "Solenne", category: "Luxe", sector: "Jewelry & Luxury Accessories", style: "Bijou signature", description: "Identité fictive conçue pour une maison d'accessoires précieux mêlant élégance intemporelle et détail couture.", imageUrl: solenne.url, accent: "from-amber-300/18 via-transparent to-stone-200/10" },
  { name: "Kintaro Fit", category: "Sport", sector: "Fitness Performance", style: "Performance athlétique", description: "Concept identitaire fictif développé pour une marque sport orientée discipline, puissance et performance premium.", imageUrl: kintaroFit.url, accent: "from-red-500/20 via-transparent to-zinc-100/10" },
  { name: "Cima Coffee", category: "Food", sector: "Coffee House", style: "Coffee alpine", description: "Direction visuelle fictive pensée pour une enseigne café premium à l'univers chaleureux, minéral et sensoriel.", imageUrl: cimaCoffee.url, accent: "from-orange-400/16 via-transparent to-stone-300/12" },
  { name: "Riveo", category: "Food", sector: "Restaurant & Lounge", style: "Table élégante", description: "Concept fictif imaginé pour un restaurant lounge raffiné, entre gastronomie, soirée et art de recevoir.", imageUrl: riveo.url, accent: "from-rose-500/16 via-transparent to-zinc-100/10" },
  { name: "Drivion", category: "Automobile", sector: "Mobility Brand", style: "Vitesse premium", description: "Identité fictive conçue pour une marque mobilité à la narration rapide, technologique et impactante.", imageUrl: drivion.url, accent: "from-red-500/20 via-transparent to-zinc-100/10" },
  { name: "Noxora", category: "Tech", sector: "AI Automation", style: "Tech futuriste", description: "Direction de marque fictive conçue pour une structure IA premium mêlant automatisation, précision et ambition futuriste.", imageUrl: noxora.url, accent: "from-red-500/18 via-transparent to-slate-200/10" },
  { name: "Atelier Véra", category: "Beauté", sector: "Beauty & Skincare", style: "Beauté éditoriale", description: "Univers fictif imaginé pour une maison skincare élégante, sensible et hautement premium.", imageUrl: atelierVera.url, accent: "from-amber-200/18 via-transparent to-rose-300/10" },
  { name: "Altis Realty", category: "Immobilier", sector: "Luxury Realty", style: "Immobilier signature", description: "Concept identitaire fictif pensé pour une structure immobilière premium, architecturée et rassurante.", imageUrl: altisRealty.url, accent: "from-zinc-100/10 via-transparent to-red-500/14" },
  { name: "FRUL'IMMO", category: "Immobilier", sector: "Agence Immobilière Premium", style: "Immobilier signature", description: "Identité de marque conçue pour FRUL'IMMO, agence immobilière haut de gamme à la signature rouge sculpturale.", imageUrl: frulImmoLogo.url, accent: "from-red-600/20 via-transparent to-zinc-200/10" },
  { name: "FRUL'CARS", category: "Automobile", sector: "Concessionnaire Premium", style: "Automobile cinétique", description: "Identité visuelle imaginée pour FRUL'CARS, concessionnaire premium au territoire racing et rouge signature.", imageUrl: frulCarsLogo.url, accent: "from-red-600/22 via-transparent to-zinc-900/10" },
  { name: "RMA Distribution", category: "Luxe", sector: "Grossiste Premium", style: "Or éditorial", description: "Direction de marque pensée pour RMA Distribution, grossiste nouvelle génération à l'image or et noire haut de gamme.", imageUrl: rmaDistributionLogo.url, accent: "from-amber-400/20 via-transparent to-zinc-900/10" },
  { name: "Nomad Peak Expeditions", category: "Aventure", sector: "Outdoor Expeditions", style: "Exploration emblématique", description: "Concept identitaire fictif pensé pour une marque d'expédition premium, entre esprit outdoor, robustesse et aspiration haut de gamme.", imageUrl: nomadPeakExpeditions.url, accent: "from-emerald-700/18 via-transparent to-amber-500/12" },
  { name: "Halo District", category: "Créatif", sector: "Coworking & Creative Hub", style: "Signal urbain", description: "Direction visuelle fictive conçue pour un hub créatif premium, avec une énergie graphique forte, collaborative et métropolitaine.", imageUrl: haloDistrict.url, accent: "from-blue-500/20 via-transparent to-orange-500/14" },
  { name: "Velvet Ember", category: "Luxe", sector: "Parfum Maison", style: "Velours couture", description: "Univers de marque fictif développé pour une maison de parfum au langage visuel sensuel, profond et résolument premium.", imageUrl: velvetEmber.url, accent: "from-rose-900/30 via-transparent to-amber-300/12" },
  { name: "Circuit Bloom", category: "Tech", sector: "Green Robotics", style: "Nature augmentée", description: "Concept identitaire fictif imaginé pour une marque tech orientée robotique, innovation durable et esthétique néon organique.", imageUrl: circuitBloom.url, accent: "from-cyan-500/20 via-transparent to-lime-400/14" },
  { name: "Iron Vale Security", category: "Tech", sector: "Cybersecurity", style: "Défense digitale", description: "Identité fictive conçue pour une marque cybersécurité premium, à la présence métallique, défensive et technologique.", imageUrl: ironValeSecurity.url, accent: "from-cyan-500/18 via-transparent to-slate-200/12" },
  { name: "Noma Terra Spa", category: "Bien-être", sector: "Spa & Wellbeing", style: "Rituel minéral", description: "Concept visuel fictif imaginé pour une maison bien-être premium, portée par une esthétique apaisée, naturelle et sensorielle.", imageUrl: nomaTerraSpa.url, accent: "from-stone-300/20 via-transparent to-amber-300/10" },
  { name: "Lyséa Joaillerie", category: "Luxe", sector: "Fine Jewelry", style: "Joaillerie noire", description: "Direction identitaire fictive pensée pour une maison joaillière haut de gamme mêlant minimalisme noir et finitions dorées précieuses.", imageUrl: lyseaJoaillerie.url, accent: "from-amber-300/16 via-transparent to-zinc-900/20" },
  { name: "Atelier Brasa", category: "Food", sector: "Bakery & Bistro", style: "Artisan chic", description: "Univers fictif conçu pour une boulangerie-bistrot premium, chaleureuse, artisanale et finement éditorialisée.", imageUrl: atelierBrasa.url, accent: "from-orange-400/18 via-transparent to-stone-200/12" },
  { name: "Virelio Capital", category: "Finance", sector: "Wealth & Strategy", style: "Finance statutaire", description: "Concept de marque fictif pensé pour un cabinet de gestion de patrimoine premium, avec codes institutionnels, précision et autorité.", imageUrl: virelioCapital.url, accent: "from-blue-500/18 via-transparent to-slate-200/12" },
  { name: "Sora Pet Care", category: "Santé", sector: "Veterinary & Wellness", style: "Soin rassurant", description: "Identité fictive développée pour une structure vétérinaire premium, douce, accessible et immédiatement rassurante.", imageUrl: soraPetCare.url, accent: "from-emerald-300/18 via-transparent to-rose-300/12" },
] as const;

const identityFilters = ["Tous", "Luxe", "Tech", "Food", "Architecture", "Immobilier", "Beauté", "Mode", "Sport", "Voyage", "Kids", "Créatif", "Lifestyle", "Gaming", "Aventure", "Automobile", "Bien-être", "Finance", "Santé"] as const;

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
  const [lightboxLogo, setLightboxLogo] = useState<(typeof identityLogos)[number] | null>(null);

  const visibleLogos = useMemo(() => {
    if (activeFilter === "Tous") return identityLogos;
    return identityLogos.filter((logo) => logo.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxLogo) setLightboxLogo(null);
        else onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange, lightboxLogo]);

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

            <div className="identity-portfolio-scroll min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-5 md:px-8 md:pb-8 md:pt-6">
              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleLogos.map((logo, index) => (
                  <motion.button
                    key={logo.name}
                    type="button"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.03 }}
                    onClick={() => setLightboxLogo(logo)}
                    className="identity-logo-card group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.045]"
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
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxLogo && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 px-4 py-4 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxLogo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-surface-darker shadow-[0_40px_140px_rgba(0,0,0,0.7)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${lightboxLogo.accent} opacity-60`} />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setLightboxLogo(null)}
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-surface-dark-foreground/80 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex flex-col items-center gap-6 p-6 md:flex-row md:gap-8 md:p-8">
                {/* Large logo image */}
                <div className="w-full flex-shrink-0 overflow-hidden rounded-[24px] border border-white/10 bg-black/30 md:w-[55%]">
                  <img
                    src={lightboxLogo.imageUrl}
                    alt={lightboxLogo.name}
                    className="aspect-square w-full object-cover"
                  />
                </div>

                {/* Logo info */}
                <div className="flex flex-1 flex-col items-start gap-4 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-primary/85">{lightboxLogo.category}</span>
                    <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-surface-dark-foreground/52">{lightboxLogo.style}</span>
                  </div>
                  <div>
                    <h4 className="text-3xl font-heading font-bold text-surface-dark-foreground md:text-4xl">{lightboxLogo.name}</h4>
                    <p className="mt-1 text-sm uppercase tracking-[0.24em] text-surface-dark-foreground/46">{lightboxLogo.sector}</p>
                  </div>
                  <p className="text-base leading-relaxed text-surface-dark-foreground/65">{lightboxLogo.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
