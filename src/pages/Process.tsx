import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  Target,
  Rocket,
  TrendingUp,
  CheckCircle2,
  Brain,
  BarChart3,
  MessageSquare,
  Eye,
  Users,
  Zap,
  ShoppingCart,
  MapPin,
  Sparkles,
  FileText,
  Calendar,
  Shield,
  LineChart,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ───────── STEP DATA ───────── */
const methodology = [
  {
    num: "01",
    title: "Audit & Analyse",
    icon: Search,
    items: [
      "Analyse approfondie de votre présence digitale",
      "Étude de votre marché et de vos concurrents",
      "Identification des opportunités",
      "Diagnostic stratégique",
    ],
    aiNote: "Utilisation de FRUL'LAB AI pour un audit augmenté par l'intelligence artificielle.",
    benefit: "Vision claire de votre situation actuelle.",
  },
  {
    num: "02",
    title: "Stratégie Personnalisée",
    icon: Target,
    items: [
      "Définition des objectifs (leads, ventes, visibilité)",
      "Choix des canaux adaptés",
      "Élaboration d'un plan d'action",
      "Définition des KPIs",
    ],
    benefit: "Une roadmap claire et mesurable.",
  },
  {
    num: "03",
    title: "Déploiement & Exécution",
    icon: Rocket,
    items: [
      "Lancement des campagnes",
      "Création de contenu",
      "Mise en place des funnels",
      "Optimisation technique",
    ],
    benefit: "Mise en action rapide et professionnelle.",
  },
  {
    num: "04",
    title: "Optimisation & Croissance Continue",
    icon: TrendingUp,
    items: [
      "Analyse des performances",
      "A/B testing",
      "Ajustements stratégiques",
      "Scaling des campagnes performantes",
    ],
    benefit: "Croissance durable et amélioration constante.",
  },
];

/* ───────── ANIMATED PROGRESS BAR ───────── */
const ProgressBar = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-surface-dark-foreground/60">{label}</span>
        <span className="text-surface-dark-foreground/80 font-semibold">{value}%</span>
      </div>
      <div className="h-2.5 bg-surface-darker rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

/* ───────── PAGE ───────── */
const Process = () => {
  return (
    <div className="min-h-screen bg-surface-darker">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden animated-gradient-bg">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Méthodologie éprouvée
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-surface-dark-foreground leading-[1.05] mb-8 text-balance">
              Une méthode claire pour{" "}
              <span className="gradient-text">générer votre croissance.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-surface-dark-foreground/55 max-w-3xl mx-auto leading-relaxed mb-12">
              Chaque projet suit un processus structuré, orienté performance et résultats mesurables.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="px-10 py-7 text-lg">
                Réserver un audit gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              Un cadre stratégique,{" "}
              <span className="gradient-text">pas du hasard.</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed max-w-2xl mx-auto">
              Nous appliquons une méthodologie éprouvée qui combine analyse, stratégie, exécution et optimisation continue.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4-STEP METHODOLOGY ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Notre méthodologie en{" "}
              <span className="gradient-text">4 étapes</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto relative">
            {/* Glow line */}
            <div className="absolute left-8 md:left-10 top-0 bottom-0 w-0.5 glow-line hidden md:block" />

            <div className="space-y-16 md:space-y-20">
              {methodology.map((step, i) => {
                const Icon = step.icon;
                return (
                  <AnimatedSection key={step.num} delay={i * 0.1}>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start relative">
                      {/* Number */}
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-dark border border-primary/20 flex items-center justify-center shrink-0 z-10">
                        <span className="text-2xl md:text-3xl font-heading font-bold text-primary">{step.num}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-surface-dark border border-primary/10 rounded-2xl p-7 md:p-10 card-hover">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-heading font-bold text-surface-dark-foreground">
                            {step.title}
                          </h3>
                        </div>

                        <ul className="space-y-3 mb-6">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-base md:text-lg text-surface-dark-foreground/60">
                              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>

                        {step.aiNote && (
                          <div className="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-primary/5 border border-primary/15">
                            <Brain className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-primary/80">{step.aiNote}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-4 border-t border-primary/5">
                          <Zap className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-base font-medium text-surface-dark-foreground/70">{step.benefit}</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── DATA-DRIVEN ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <AnimatedSection className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
                Chaque décision est guidée par{" "}
                <span className="gradient-text">la donnée.</span>
              </h2>
              <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-8">
                Nous mesurons, analysons et optimisons en continu pour maximiser votre retour sur investissement.
              </p>
              <div className="space-y-4">
                {["Tracking avancé multi-canal", "Tableaux de bord en temps réel", "Tests A/B systématiques", "Optimisation continue des KPIs"].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base md:text-lg text-surface-dark-foreground/65">{t}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:w-1/2">
              <div className="bg-surface-dark/80 border border-primary/15 rounded-3xl p-8 backdrop-blur-md space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-xs text-surface-dark-foreground/25 ml-2 font-mono">dashboard.fruldigital.com</span>
                </div>
                <ProgressBar label="Trafic organique" value={85} delay={0} />
                <ProgressBar label="Taux de conversion" value={62} delay={0.15} />
                <ProgressBar label="ROI publicitaire" value={78} delay={0.3} />
                <ProgressBar label="Engagement social" value={92} delay={0.45} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TRANSPARENCY ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Une collaboration{" "}
              <span className="gradient-text">claire et transparente.</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: FileText, title: "Reporting régulier", desc: "Rapports clairs sur vos performances chaque mois." },
              { icon: Eye, title: "Accès aux données", desc: "Transparence totale sur toutes les métriques." },
              { icon: MessageSquare, title: "Points stratégiques", desc: "Réunions régulières pour aligner la stratégie." },
              { icon: Shield, title: "Accompagnement dédié", desc: "Un interlocuteur unique pour un suivi personnalisé." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 card-hover group h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-surface-dark-foreground mb-2">{item.title}</h3>
                  <p className="text-base text-surface-dark-foreground/50 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT TIMELINE ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Timeline{" "}
              <span className="gradient-text">projet type</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/50 max-w-2xl mx-auto">
              Un aperçu concret du déroulement de votre projet avec FRUL'DIGITAL.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { period: "Semaine 1", phase: "Audit", icon: Search, desc: "Analyse & diagnostic" },
                  { period: "Semaine 2", phase: "Stratégie", icon: Target, desc: "Plan d'action & KPIs" },
                  { period: "Semaine 3-4", phase: "Déploiement", icon: Rocket, desc: "Lancement & exécution" },
                  { period: "Mois 2+", phase: "Optimisation", icon: TrendingUp, desc: "Scaling & croissance" },
                ].map((t, i) => (
                  <motion.div
                    key={t.phase}
                    className="relative bg-surface-dark border border-primary/10 rounded-2xl p-6 text-center group hover:border-primary/25 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/20" />
                    )}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                      <t.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{t.period}</span>
                    <h4 className="text-lg font-heading font-bold text-surface-dark-foreground mt-1 mb-1">{t.phase}</h4>
                    <p className="text-sm text-surface-dark-foreground/40">{t.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Pour qui est{" "}
              <span className="gradient-text">notre méthode ?</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MapPin, title: "Entreprises locales", desc: "Restaurants, cliniques, commerces — développez votre clientèle locale." },
              { icon: ShoppingCart, title: "E-commerce", desc: "Boutiques en ligne qui veulent booster leurs ventes et leur acquisition." },
              { icon: Rocket, title: "Startups", desc: "Lancez-vous avec une stratégie digitale solide dès le premier jour." },
              { icon: Users, title: "PME ambitieuses", desc: "Structurez votre croissance digitale pour passer au niveau supérieur." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 card-hover group h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-surface-dark-foreground mb-2">{item.title}</h3>
                  <p className="text-base text-surface-dark-foreground/50 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 85% 45%), hsl(0 70% 35%))" }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(0 0% 100%), transparent 60%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-8 leading-tight text-balance">
              Prêt à suivre une méthode qui génère des résultats ?
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 leading-relaxed">
              Commencez par un audit stratégique gratuit et découvrez votre plan d'action personnalisé.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold px-12 py-8 text-xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Réserver mon audit stratégique
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Process;
