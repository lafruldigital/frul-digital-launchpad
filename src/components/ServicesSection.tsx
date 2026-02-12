import { AnimatedSection } from "@/components/AnimatedSection";
import { Share2, Target, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Share2,
    title: "Gestion des réseaux sociaux",
    description: "Stratégie, création de contenu et community management pour maximiser votre visibilité.",
  },
  {
    icon: Target,
    title: "Publicité en ligne",
    description: "Campagnes Meta, Google & TikTok Ads optimisées pour un ROI maximal.",
  },
  {
    icon: Palette,
    title: "Création de contenu",
    description: "Visuels, vidéos et copywriting qui captivent votre audience et convertissent.",
  },
  {
    icon: Globe,
    title: "Création de sites web",
    description: "Sites performants, optimisés SEO et conçus pour convertir vos visiteurs.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-darker py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Nos services</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground mt-3 mb-4">
            Des solutions complètes pour votre <span className="gradient-text">croissance digitale</span>
          </h2>
          <p className="text-surface-dark-foreground/60 max-w-2xl mx-auto">
            Une approche 360° pour propulser votre présence en ligne et générer des résultats concrets.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.1}>
              <div className="group relative bg-surface-dark border border-primary/10 rounded-2xl p-6 card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-surface-dark-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-surface-dark-foreground/60 leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/0 group-hover:bg-primary rounded-b-2xl transition-all duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12" delay={0.4}>
          <Button variant="hero-outline" size="lg" className="border-surface-dark-foreground/20 text-surface-dark-foreground">
            Voir tous nos services
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};
