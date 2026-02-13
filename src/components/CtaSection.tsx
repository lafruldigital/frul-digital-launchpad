import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CtaSection = () => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, hsl(0 85% 45%), hsl(0 70% 35%))",
      }} />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, hsl(0 0% 100%), transparent 60%)`,
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-8 text-balance leading-tight">
            Prêt à prendre une longueur d'avance sur vos concurrents ?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 leading-relaxed">
            Réservez un audit gratuit et découvrez comment nous pouvons accélérer votre croissance.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold px-12 py-8 text-xl shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Réserver mon audit gratuit
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
