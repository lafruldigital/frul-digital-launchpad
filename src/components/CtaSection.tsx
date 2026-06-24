import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const CtaSection = () => {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-[hsl(0_0%_3%)]">
      {/* Animated red flow background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent 60%)" }}
      />
      {/* Grid mask */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 85% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 50%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(0_85%_55%)] animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Prêt à transformer votre image ?</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-surface-dark-foreground mb-8 text-balance leading-[1.05]">
            Votre image digitale peut devenir <span className="gradient-text">votre meilleur commercial.</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-dark-foreground/65 mb-12 max-w-2xl mx-auto leading-relaxed">
            Parlez-nous de votre projet. On analyse votre présence actuelle et on vous montre comment la
            transformer en système clair, premium et orienté résultats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/frul-lab#analyse-ia">
              <Button variant="hero" size="lg" className="px-10 py-7 text-base group shadow-[0_0_40px_hsl(0_85%_50%/0.5)]">
                Demander mon audit gratuit
                <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/contact" state={{ reason: "general", source: "CTA global du site" }}>
              <Button variant="hero-outline" size="lg" className="px-10 py-7 text-base">
                <MessageCircle className="w-5 h-5 mr-1" />
                Nous contacter
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
