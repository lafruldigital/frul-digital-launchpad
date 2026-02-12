import { AnimatedSection } from "@/components/AnimatedSection";

export const PositioningSection = () => {
  return (
    <section className="section-darker py-20 md:py-28 border-b border-primary/5">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
            FRUL'DIGITAL n'est pas une agence{" "}
            <span className="gradient-text">classique.</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-surface-dark-foreground/55 leading-relaxed max-w-3xl mx-auto">
            Nous combinons stratégie, data et intelligence artificielle pour générer une croissance
            mesurable et durable pour votre entreprise.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
