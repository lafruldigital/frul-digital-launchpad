import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 animated-gradient-bg">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(0 85% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 50%) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Multiple gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent)" }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(15 90% 55%), transparent)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Propulsé par l'intelligence artificielle</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[1.05] text-surface-dark-foreground mb-8 text-balance">
              Nous transformons votre présence digitale en{" "}
              <span className="gradient-text">machine à croissance.</span>
            </h1>

            <p className="text-xl md:text-2xl text-surface-dark-foreground/60 max-w-xl mb-10 leading-relaxed">
              Nous aidons les marques à attirer plus de clients, convertir davantage et accélérer leur croissance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/frul-lab#analyse-ia">
                <Button variant="hero" size="lg" className="px-10 py-7 text-lg">
                  Obtenir mon audit gratuit
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="hero-outline" size="lg" className="px-10 py-7 text-lg">
                  Découvrir nos services
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <img
                src={heroDashboard}
                alt="Dashboard marketing digital FRUL'DIGITAL"
                className="rounded-2xl shadow-2xl w-full glow-red-strong"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
