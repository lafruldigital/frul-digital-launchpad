import { AnimatedSection } from "@/components/AnimatedSection";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const cases = [
  {
    name: "E-commerce Mode",
    metric: "+340%",
    description: "de trafic organique en 6 mois",
    kpi: [
      { label: "ROAS", value: "5.2x" },
      { label: "Conversions", value: "+280%" },
      { label: "CPA", value: "-45%" },
    ],
  },
  {
    name: "Startup SaaS",
    metric: "+520%",
    description: "de leads qualifiés en 4 mois",
    kpi: [
      { label: "MQL", value: "+520%" },
      { label: "Pipeline", value: "x4" },
      { label: "CAC", value: "-60%" },
    ],
  },
  {
    name: "Restaurant Premium",
    metric: "+180%",
    description: "de réservations en ligne",
    kpi: [
      { label: "Visibilité", value: "+300%" },
      { label: "Avis Google", value: "4.9★" },
      { label: "Engagement", value: "+250%" },
    ],
  },
];

export const CaseStudiesSection = () => {
  return (
    <section id="results" className="section-dark py-28 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Résultats</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4 mb-6">
            Ils ont accéléré leur croissance avec <span className="gradient-text">FRUL'DIGITAL</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <AnimatedSection key={c.name} delay={i * 0.15}>
              <div className="group bg-surface-darker border border-primary/10 rounded-2xl p-8 card-hover h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-base font-medium text-surface-dark-foreground/50">{c.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-end gap-3 mb-3">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold gradient-text">{c.metric}</span>
                  <TrendingUp className="w-7 h-7 text-primary mb-2" />
                </div>
                <p className="text-base text-surface-dark-foreground/50 mb-8">{c.description}</p>

                {/* Mini KPI bar */}
                <div className="grid grid-cols-3 gap-4 pt-5 border-t border-primary/10">
                  {c.kpi.map((k) => (
                    <div key={k.label} className="text-center">
                      <div className="text-base font-bold text-primary">{k.value}</div>
                      <div className="text-sm text-surface-dark-foreground/40 mt-1">{k.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
