import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, hsl(0 85% 45%), hsl(0 70% 35%))",
      }} />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, hsl(0 0% 100%), transparent 60%)`,
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-6 text-balance">
            Prêt à faire passer votre entreprise au niveau supérieur ?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Réservez un audit gratuit et découvrez comment nous pouvons accélérer votre croissance.
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold px-10 py-7 text-lg shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Réserver un audit gratuit
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};
