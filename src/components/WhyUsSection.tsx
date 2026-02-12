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
    <section id="why-us" className="section-dark py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Pourquoi nous</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground mt-3 mb-6">
              L'agence qui fait la <span className="gradient-text">différence</span>
            </h2>
            <p className="text-surface-dark-foreground/60 leading-relaxed mb-8">
              Nous ne sommes pas une agence de plus. Nous sommes votre partenaire de croissance, obsédés par vos résultats.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="bg-surface-darker border border-primary/10 rounded-2xl p-5 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-surface-dark-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-surface-dark-foreground/50 leading-relaxed">{f.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
