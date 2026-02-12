import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, number: "01", title: "Audit", description: "Analyse approfondie de votre présence digitale et identification des opportunités." },
  { icon: Lightbulb, number: "02", title: "Stratégie", description: "Élaboration d'un plan d'action sur mesure aligné sur vos objectifs business." },
  { icon: Rocket, number: "03", title: "Déploiement", description: "Mise en œuvre des campagnes et actions avec suivi en temps réel." },
  { icon: TrendingUp, number: "04", title: "Croissance", description: "Optimisation continue et scaling des résultats pour une croissance durable." },
];

export const ProcessSection = () => {
  return (
    <section id="process" className="section-dark py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Notre process</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground mt-3 mb-4">
            Comment nous <span className="gradient-text">travaillons</span>
          </h2>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.15}>
                <div className={`md:flex items-center gap-8 mb-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                    <div className={`bg-surface-darker border border-primary/10 rounded-2xl p-6 card-hover inline-block w-full`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-heading font-bold text-primary/50">{step.number}</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-surface-dark-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-surface-dark-foreground/50 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-surface-dark" />
                  </div>

                  <div className="flex-1" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
