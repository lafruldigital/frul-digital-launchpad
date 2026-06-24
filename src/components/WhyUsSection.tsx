import { AnimatedSection } from "@/components/AnimatedSection";
import { BarChart3, Users, Eye, Shield } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Stratégies orientées résultats",
    description: "Chaque action est mesurée et optimisée pour maximiser votre retour sur investissement.",
  },
  {
    icon: Users,
    title: "Approche data-driven",
    description: "Nos décisions sont guidées par les données, pas par des suppositions.",
  },
  {
    icon: Eye,
    title: "Accompagnement personnalisé",
    description: "Un interlocuteur dédié et une stratégie sur mesure pour votre entreprise.",
  },
  {
    icon: Shield,
    title: "Transparence totale",
    description: "Rapports détaillés, accès aux données en temps réel, zéro zone d'ombre.",
  },
];

export const WhyUsSection = () => {
  return (
    <section id="why-us" className="section-dark py-28 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Pourquoi nous</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4 mb-8 leading-tight">
              L'agence qui fait la <span className="gradient-text">différence</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed">
              Nous ne sommes pas une agence de plus. Nous sommes votre partenaire de croissance, obsédés par vos résultats.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-8 mobile-carousel">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="bg-surface-darker border border-primary/10 rounded-2xl p-7 card-hover">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <f.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-surface-dark-foreground mb-3">{f.title}</h3>
                  <p className="text-base text-surface-dark-foreground/50 leading-relaxed">{f.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
