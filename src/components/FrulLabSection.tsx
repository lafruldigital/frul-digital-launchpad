import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import frulLabAi from "@/assets/frul-lab-ai.png";

const GaugeBar = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-surface-dark-foreground/60">{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-primary font-heading font-bold"
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-surface-dark overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(0 85% 50%), hsl(15 90% 55%))" }}
        />
      </div>
    </div>
  );
};

export const FrulLabSection = () => {
  return (
    <section id="frul-lab" className="relative py-28 md:py-36 overflow-hidden section-darker">
      {/* Glow backgrounds */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image + Gauges */}
          <AnimatedSection>
            <div className="relative">
              <img
                src={frulLabAi}
                alt="FRUL'LAB AI - Intelligence artificielle pour audit digital"
                className="rounded-2xl shadow-2xl w-full glow-red-strong"
              />
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-heading font-bold text-sm flex items-center gap-2 shadow-lg">
                <Sparkles className="w-4 h-4" /> Powered by AI
              </div>

              {/* Animated gauges overlay */}
              <div className="absolute -bottom-6 -left-4 right-8 bg-surface-dark/95 backdrop-blur-xl border border-primary/20 rounded-xl p-5 space-y-3 shadow-2xl">
                <GaugeBar label="SEO Score" value={87} delay={0.2} />
                <GaugeBar label="Social Media" value={62} delay={0.4} />
                <GaugeBar label="Maturité digitale" value={74} delay={0.6} />
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Produit signature</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-8">
              FRUL'LAB <span className="gradient-text">AI</span>
            </h2>

            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-8">
              Notre agent IA capable d'analyser votre présence digitale, de calculer votre score de maturité
              et de générer un plan d'action personnalisé pour accélérer votre croissance.
            </p>

            <ul className="space-y-4 mb-10">
              {["Analyse complète de votre présence en ligne", "Score de maturité digitale", "Plan d'action personnalisé", "Recommandations IA en temps réel"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-surface-dark-foreground/65 text-lg">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" className="px-10 py-7 text-lg animate-pulse-glow">
              Lancer mon audit IA
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
