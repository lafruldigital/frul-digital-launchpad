import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "FRUL'CARS", type: "Site & branding auto", benefit: "Présence premium pour une agence automobile.", tone: "from-red-600/30 to-rose-900/20" },
  { name: "FRUL'SCHOOL", type: "Plateforme éducation", benefit: "Écosystème digital pour la formation.", tone: "from-orange-500/25 to-red-900/20" },
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
        {projects.map((p, i) => (
          <AnimatedSection key={p.name} delay={(i % 3) * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-surface-darker hover:border-primary/30 transition-all duration-500"
            >
              {/* Visual placeholder */}
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.tone} overflow-hidden`}>
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "linear-gradient(hsl(0 85% 50% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 50% / 0.4) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading font-bold text-3xl md:text-4xl text-white/80 tracking-tight">{p.name}</span>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-wider text-primary/70 mb-2">{p.type}</div>
                <h3 className="font-heading font-semibold text-surface-dark-foreground text-lg mb-2">{p.name}</h3>
                <p className="text-sm text-surface-dark-foreground/55 leading-relaxed">{p.benefit}</p>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
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