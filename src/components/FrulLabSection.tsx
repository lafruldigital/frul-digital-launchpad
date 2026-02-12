import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import frulLabAi from "@/assets/frul-lab-ai.png";

export const FrulLabSection = () => {
  return (
    <section id="frul-lab" className="relative py-24 overflow-hidden section-darker">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] -translate-y-1/2"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative">
              <img
                src={frulLabAi}
                alt="FRUL'LAB AI - Intelligence artificielle pour audit digital"
                className="rounded-2xl shadow-2xl w-full glow-red"
              />
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-heading font-bold text-sm flex items-center gap-2 shadow-lg">
                <Sparkles className="w-4 h-4" /> Powered by AI
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Produit signature</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground mb-6">
              FRUL'LAB <span className="gradient-text">AI</span>
            </h2>

            <p className="text-surface-dark-foreground/60 leading-relaxed mb-6 text-lg">
              Notre agent IA capable d'analyser votre présence digitale, de calculer votre score de maturité
              et de générer un plan d'action personnalisé pour accélérer votre croissance.
            </p>

            <ul className="space-y-3 mb-8">
              {["Analyse complète de votre présence en ligne", "Score de maturité digitale", "Plan d'action personnalisé", "Recommandations IA en temps réel"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-surface-dark-foreground/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" className="px-8 py-6 text-base animate-pulse-glow">
              Lancer mon audit IA
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
