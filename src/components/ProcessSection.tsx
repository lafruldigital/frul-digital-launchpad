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
    <section id="process" className="section-dark py-28 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Notre process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4 mb-6">
            Comment nous <span className="gradient-text">travaillons</span>
          </h2>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline glowing line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 glow-line" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.15}>
                <div className={`md:flex items-center gap-10 mb-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                    <div className="bg-surface-darker border border-primary/10 rounded-2xl p-8 card-hover inline-block w-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm font-heading font-bold text-primary/40">{step.number}</span>
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-surface-dark-foreground mb-3">{step.title}</h3>
                      <p className="text-base text-surface-dark-foreground/50 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex items-center justify-center w-10 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-primary border-4 border-surface-dark shadow-[0_0_12px_hsl(0_85%_50%/0.5)]" />
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
