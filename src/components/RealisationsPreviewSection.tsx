import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FrulCarsLogo3D } from "@/components/FrulCarsLogo3D";
import logoFrulImmo from "@/assets/logo-frulimmo.png.asset.json";

const projects = [
  { name: "FRUL'CARS", type: "Automobile", benefit: "Site vitrine + catalogue véhicules pour concessionnaire premium.", tone: "from-red-600/30 to-rose-900/20", href: "https://frulcars.fr", logo3d: true as const },
  { name: "FRUL'IMMO", type: "Immobilier", benefit: "Site vitrine premium pour agence immobilière haut de gamme.", tone: "from-red-600/30 to-zinc-900/30", href: "https://frulimmo.fr", logo3d: true as const, logoUrl: logoFrulImmo.url, domain: "frulimmo.fr" },
  { name: "RMA DISTRIBUTION", type: "Site B2B & identité", benefit: "Image structurée pour scaler la distribution.", tone: "from-zinc-700/30 to-red-900/20" },
  { name: "Restaurant Premium", type: "Site & contenu", benefit: "Expérience digitale qui inspire confiance.", tone: "from-amber-500/20 to-rose-900/20" },
  { name: "Identité Visuelle", type: "Logo & système graphique", benefit: "Une marque reconnaissable en 3 secondes.", tone: "from-rose-500/25 to-zinc-900/30" },
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
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading font-bold text-3xl md:text-4xl text-white/80 tracking-tight">{p.name}</span>
            </div>
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
        </h3>
        <p className="text-sm text-surface-dark-foreground/55 leading-relaxed">{p.benefit}</p>
      </div>
    </motion.div>
  );

  if (p.href) {
    return (
      <a href={p.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return inner;
};