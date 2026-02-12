import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center section-darker overflow-hidden pt-16">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(0 85% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 50%) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Gradient orb */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-medium text-primary">Agence digitale nouvelle génération</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-surface-dark-foreground mb-6 text-balance">
              Développez votre entreprise à son{" "}
              <span className="gradient-text">plein potentiel</span>{" "}
              grâce au digital.
            </h1>

            <p className="text-lg text-surface-dark-foreground/60 max-w-xl mb-8 leading-relaxed">
              Nous aidons les marques à attirer plus de clients, convertir davantage et accélérer leur croissance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="px-8 py-6 text-base">
                Obtenez votre audit gratuit
              </Button>
              <Button variant="hero-outline" size="lg" className="px-8 py-6 text-base">
                Découvrir nos services
              </Button>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative animate-float">
              <img
                src={heroDashboard}
                alt="Dashboard marketing digital FRUL'DIGITAL"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-surface-dark-foreground/40 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-primary animate-scroll-hint" />
        </motion.div>
      </div>
    </section>
  );
};
