import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";

const before = [
  "Image brouillonne",
  "Site faible et lent",
  "Réseaux irréguliers",
  "Message flou",
  "Peu de demandes entrantes",
];
const after = [
  "Image premium et cohérente",
  "Site clair, rapide, performant",
  "Contenu régulier et stratégique",
  "Message puissant et différenciant",
  "Prospects plus qualifiés",
];

export const TransformationSection = () => (
  <section className="relative section-dark py-28 md:py-36 overflow-hidden">
    <motion.div
      animate={{ opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[160px]"
      style={{ background: "radial-gradient(ellipse, hsl(0 85% 50%), transparent)" }}
    />
    <div className="container mx-auto px-4 relative">
      <AnimatedSection className="text-center max-w-4xl mx-auto mb-20">
        <span className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">La transformation</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-5 mb-6 leading-[1.05] text-balance">
          Nous transformons votre image en <span className="gradient-text">système de conversion.</span>
        </h2>
        <p className="text-lg text-surface-dark-foreground/55 leading-relaxed">
          FRUL'DIGITAL ne se contente pas de rendre votre marque plus belle. Nous structurons votre
          présence digitale pour qu'elle attire l'attention, inspire confiance et pousse à l'action.
        </p>
      </AnimatedSection>

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-stretch max-w-6xl mx-auto">
        {/* BEFORE */}
        <AnimatedSection>
          <div className="h-full p-8 rounded-2xl border border-white/[0.06] bg-surface-darker/60 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[11px] uppercase tracking-[0.3em] text-surface-dark-foreground/40">Avant</span>
              <div className="flex-1 h-px bg-surface-dark-foreground/10" />
            </div>
            <ul className="space-y-4">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-3 text-surface-dark-foreground/50">
                  <span className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-surface-dark-foreground/40" />
                  </span>
                  <span className="text-base">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Arrow */}
        <div className="hidden lg:flex items-center justify-center">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_30px_hsl(0_85%_50%/0.4)]"
          >
            <ArrowRight className="w-6 h-6 text-primary" />
          </motion.div>
        </div>

        {/* AFTER */}
        <AnimatedSection delay={0.2}>
          <div className="relative h-full p-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] to-transparent backdrop-blur-sm shadow-[0_0_60px_-20px_hsl(0_85%_50%/0.5)]">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[11px] uppercase tracking-[0.3em] text-primary">Après FRUL'DIGITAL</span>
              <div className="flex-1 h-px bg-primary/20" />
            </div>
            <ul className="space-y-4">
              {after.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-surface-dark-foreground"
                >
                  <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_hsl(0_85%_50%/0.4)]">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-base">{a}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);