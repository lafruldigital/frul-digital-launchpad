import { AnimatedSection } from "@/components/AnimatedSection";
import { Share2, Target, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <section id="services" className="section-darker py-28 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Nos services</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4 mb-6">
            Des solutions complètes pour votre <span className="gradient-text">croissance digitale</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-dark-foreground/55 max-w-2xl mx-auto leading-relaxed">
            Une approche 360° pour propulser votre présence en ligne et générer des résultats concrets.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.1}>
              <div className="group relative bg-surface-dark border border-primary/10 rounded-2xl p-8 card-hover h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(0_85%_50%/0.2)] transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-base text-surface-dark-foreground/55 leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/0 group-hover:bg-primary rounded-b-2xl transition-all duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-14" delay={0.4}>
          <Link to="/services">
            <Button variant="hero-outline" size="lg" className="border-surface-dark-foreground/20 text-surface-dark-foreground px-10 py-7 text-lg">
              Voir tous nos services
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};
