import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Globe, Palette, Megaphone, Cpu, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Globe,
    num: "01",
    title: "Création Web Premium",
    description:
      "Sites vitrines, landing pages, tunnels de conversion et expériences web immersives pensées pour rassurer, captiver et convertir.",
  },
  {
    icon: Palette,
    num: "02",
    title: "Branding & Image Digitale",
    description:
      "Direction artistique, identité visuelle, storytelling et positionnement pour donner à votre marque une présence forte et mémorable.",
  },
  {
    icon: Megaphone,
    num: "03",
    title: "Contenu & Réseaux Sociaux",
    description:
      "Création de contenus, scripts, visuels, vidéos courtes et stratégie éditoriale pour augmenter votre visibilité et votre crédibilité.",
  },
  {
    icon: Cpu,
    num: "04",
    title: "Acquisition & Automatisation IA",
    description:
      "Publicité, formulaires intelligents, analyse de données, automatisations et systèmes d'acquisition pour générer plus d'opportunités.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="relative section-darker py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <AnimatedSection className="max-w-4xl mb-20">
          <span className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">Nos pôles</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-5 mb-6 leading-[1.05]">
            Des pôles digitaux pensés pour <span className="gradient-text">accélérer votre croissance.</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative h-full p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/40"
              >
                {/* glow */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), hsl(0 85% 50% / 0.15), transparent 40%)" }}
                />
                {/* corner number */}
                <span className="absolute top-6 right-7 text-5xl font-heading font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {s.num}
                </span>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-7 group-hover:shadow-[0_0_30px_hsl(0_85%_50%/0.4)] transition-shadow">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-surface-dark-foreground mb-4">{s.title}</h3>
                  <p className="text-base text-surface-dark-foreground/55 leading-relaxed mb-8">{s.description}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary group/cta"
                  >
                    Découvrir
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </Link>
                </div>
                {/* bottom line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
