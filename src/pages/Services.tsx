import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection, CountUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Share2,
  MessageCircle,
  Target,
  Search,
  Camera,
  Video,
  Palette,
  Mail,
  Globe,
  BarChart3,
  Brain,
  Users,
  TrendingUp,
  Zap,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Star,
  Award,
  Rocket,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ───────── SERVICES DATA ───────── */
const services = [
  {
    icon: Share2,
    title: "Gestion des réseaux sociaux",
    description:
      "Nous développons votre présence sur les réseaux sociaux avec une stratégie sur mesure, créative et axée sur les résultats.",
    bullets: [
      "Stratégie éditoriale personnalisée",
      "Planification des publications",
      "Reporting mensuel",
      "Interaction avec la communauté",
      "Optimisation de l'engagement",
    ],
    benefits: ["Notoriété renforcée", "Audience qualifiée", "Image de marque solide"],
    cta: "Booster mes réseaux sociaux",
  },
  {
    icon: MessageCircle,
    title: "Community Management",
    description:
      "Nous animons et protégeons votre communauté au quotidien pour créer un lien authentique avec votre audience.",
    bullets: [
      "Modération des commentaires",
      "Réponses aux messages",
      "Gestion quotidienne",
      "Animation de communauté",
      "Support client social",
    ],
    benefits: ["Engagement renforcé", "Satisfaction client", "Fidélité accrue"],
    cta: "Confier ma communauté",
  },
  {
    icon: Target,
    title: "Publicité digitale (Meta, Google, TikTok)",
    description:
      "Des campagnes publicitaires ultra-ciblées pour générer des leads qualifiés et maximiser votre retour sur investissement.",
    bullets: [
      "Création de campagnes",
      "Ciblage avancé",
      "A/B testing",
      "Retargeting",
      "Optimisation du ROI",
    ],
    benefits: ["Leads qualifiés", "Croissance rapide", "Acquisition rentable"],
    cta: "Lancer une campagne performante",
  },
  {
    icon: Search,
    title: "SEO & Référencement",
    description:
      "Dominez les résultats de recherche grâce à une stratégie SEO complète, technique et sémantique.",
    bullets: [
      "Audit SEO technique",
      "Optimisation on-site",
      "Stratégie de mots-clés",
      "Netlinking",
      "SEO local",
    ],
    benefits: ["Visibilité durable", "Trafic qualifié", "Autorité renforcée"],
    cta: "Améliorer mon référencement",
  },
  {
    icon: Camera,
    title: "Création de contenu",
    description:
      "Du contenu qui capte, engage et convertit — photos, vidéos, graphismes et textes pensés pour performer.",
    bullets: [
      "Photos professionnelles",
      "Vidéos marketing",
      "Design graphique",
      "Copywriting",
      "Direction artistique",
    ],
    benefits: ["Impact visuel fort", "Engagement élevé", "Cohérence de marque"],
    cta: "Créer du contenu impactant",
  },
  {
    icon: Video,
    title: "Vidéos courtes (Reels / TikTok / Shorts)",
    description:
      "Des formats courts percutants qui exploitent les algorithmes pour maximiser votre portée organique.",
    bullets: [
      "Concepts viraux",
      "Montage dynamique",
      "Hooks performants",
      "Adaptation aux algorithmes",
    ],
    benefits: ["Forte portée", "Engagement élevé", "Image moderne"],
    cta: "Produire mes vidéos",
  },
  {
    icon: Palette,
    title: "Branding / Identité visuelle",
    description:
      "Construisez une marque mémorable et différenciante qui reflète vos valeurs et attire vos clients idéaux.",
    bullets: ["Logo", "Charte graphique", "Ton de voix", "Brand guidelines"],
    benefits: ["Marque mémorable", "Différenciation", "Cohérence visuelle"],
    cta: "Construire ma marque",
  },
  {
    icon: Mail,
    title: "Email marketing & automation",
    description:
      "Transformez vos contacts en clients grâce à des séquences email intelligentes et personnalisées.",
    bullets: [
      "Newsletters",
      "Séquences automatisées",
      "Segmentation",
      "Funnels",
      "Optimisation des conversions",
    ],
    benefits: ["Conversion améliorée", "Acquisition automatisée", "Fidélisation"],
    cta: "Automatiser mon acquisition",
  },
  {
    icon: Globe,
    title: "Développement web",
    description:
      "Des sites et applications web performants, esthétiques et optimisés pour la conversion.",
    bullets: [
      "Sites vitrines",
      "E-commerce",
      "Landing pages",
      "Applications web",
      "Optimisation des performances",
    ],
    benefits: ["Conversion améliorée", "UX premium", "Site rapide"],
    cta: "Créer un site performant",
  },
  {
    icon: BarChart3,
    title: "Stratégie digitale",
    description:
      "Une vision claire et un plan d'action structuré pour transformer votre présence digitale en levier de croissance.",
    bullets: [
      "Audit complet",
      "Analyse concurrentielle",
      "Positionnement",
      "Roadmap",
      "KPIs",
    ],
    benefits: ["Vision claire", "Décisions data-driven", "Croissance structurée"],
    cta: "Construire ma stratégie",
  },
];

/* ───────── METHODOLOGY ───────── */
const steps = [
  {
    num: "01",
    title: "Audit & Analyse",
    desc: "Nous analysons votre présence digitale, vos concurrents et votre marché.",
  },
  {
    num: "02",
    title: "Stratégie",
    desc: "Nous construisons un plan d'action personnalisé aligné sur vos objectifs.",
  },
  {
    num: "03",
    title: "Déploiement",
    desc: "Nous exécutons les actions avec agilité, créativité et rigueur.",
  },
  {
    num: "04",
    title: "Optimisation continue",
    desc: "Nous mesurons, ajustons et améliorons en continu pour maximiser vos résultats.",
  },
];

/* ───────── SERVICE BLOCK ───────── */
const ServiceBlock = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <AnimatedSection>
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-10 lg:gap-16 items-center`}
      >
        {/* Visual card */}
        <div className="w-full lg:w-1/2">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="relative bg-surface-dark border border-primary/10 rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center min-h-[320px] transition-all duration-500 group-hover:border-primary/25">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-10 h-10 text-primary" />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {service.benefits.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/10"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground leading-tight">
            {service.title}
          </h3>
          <p className="text-lg md:text-xl text-surface-dark-foreground/60 leading-relaxed">
            {service.description}
          </p>
          <ul className="space-y-3">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-surface-dark-foreground/70">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-base md:text-lg">{b}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact">
            <Button variant="hero" size="lg" className="mt-4 group/btn">
              {service.cta}
              <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ───────── GAUGE COMPONENT ───────── */
const AnimatedGauge = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(0 0% 15%)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={264}
            initial={{ strokeDashoffset: 264 }}
            animate={isInView ? { strokeDashoffset: 264 - (264 * value) / 100 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-heading font-bold text-surface-dark-foreground">
          {isInView ? value : 0}
        </span>
      </div>
      <span className="text-sm text-surface-dark-foreground/60">{label}</span>
    </div>
  );
};

/* ───────── PAGE ───────── */
const Services = () => {
  return (
    <div className="min-h-screen bg-surface-darker">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden animated-gradient-bg">
        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Solutions digitales complètes
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-bold text-surface-dark-foreground leading-[1.05] mb-8 text-balance">
              Nos Services{" "}
              <span className="gradient-text">Digitaux</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-surface-dark-foreground/60 max-w-3xl mx-auto leading-relaxed mb-12">
              Des solutions complètes pour accélérer votre croissance, renforcer votre
              visibilité et transformer votre présence digitale en levier de performance.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/frul-lab#analyse-ia">
                <Button variant="hero" size="lg" className="px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg w-full sm:w-auto">
                  Obtenir un audit gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="https://calendly.com/lafrul-digital/rendez-vous" target="_blank" rel="noopener noreferrer">
                <Button variant="hero-outline" size="lg" className="px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg w-full sm:w-auto">
                  Parler à un expert
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── POSITIONING ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              Bien plus que des services —{" "}
              <span className="gradient-text">un moteur de croissance.</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed max-w-2xl mx-auto">
              Chaque solution que nous proposons est conçue pour générer un impact réel sur
              votre chiffre d'affaires, votre acquisition client et votre positionnement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 space-y-28 md:space-y-36">
          {services.map((s, i) => (
            <ServiceBlock key={s.title} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ── FRUL'LAB AI SIGNATURE ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-darker via-surface-dark to-surface-darker" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Intelligence Artificielle
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              FRUL'LAB AI
            </h2>
            <p className="text-xl md:text-2xl text-surface-dark-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Votre consultant digital intelligent.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-4xl mx-auto bg-surface-dark/80 border border-primary/15 rounded-3xl p-8 md:p-14 backdrop-blur-md">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Left — features */}
                <div className="space-y-5">
                  {[
                    "Analyse complète de votre présence en ligne",
                    "Score de maturité digitale",
                    "Détection des freins à la conversion",
                    "Plan d'action priorisé",
                    "Recommandations IA",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <span className="text-base md:text-lg text-surface-dark-foreground/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right — gauges */}
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="flex gap-6">
                    <AnimatedGauge label="SEO" value={72} color="hsl(0 85% 50%)" />
                    <AnimatedGauge label="Social" value={58} color="hsl(15 90% 55%)" />
                    <AnimatedGauge label="Maturité" value={64} color="hsl(0 70% 45%)" />
                  </div>
                  <div className="mt-4 px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-pulse-glow">
                    Score global : 65/100
                  </div>
                </div>
              </div>

              <div className="text-center mt-10">
                <Link to="/frul-lab#analyse-ia">
                  <Button variant="hero" size="lg" className="px-10 py-7 text-lg glow-red">
                    <Brain className="w-5 h-5 mr-2" />
                    Lancer mon audit IA
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Comment nous générons{" "}
              <span className="gradient-text">votre croissance</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto relative">
            {/* Glow line */}
            <div className="absolute left-8 md:left-10 top-0 bottom-0 w-0.5 glow-line" />

            <div className="space-y-14">
              {steps.map((step, i) => (
                <AnimatedSection key={step.num} delay={i * 0.15}>
                  <div className="flex gap-8 items-start relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-dark border border-primary/20 flex items-center justify-center shrink-0 z-10">
                      <span className="text-2xl md:text-3xl font-heading font-bold text-primary">
                        {step.num}
                      </span>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-surface-dark-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-surface-dark-foreground/55 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Des résultats qui{" "}
              <span className="gradient-text">parlent d'eux-mêmes</span>
            </h2>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
              {[
                { value: 250, suffix: "+", label: "Campagnes lancées" },
                { value: 120, suffix: "+", label: "Entreprises accompagnées" },
                { value: 3, prefix: "x", suffix: "", label: "ROI moyen" },
                { value: 95, suffix: "%", label: "Clients satisfaits" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                    <CountUp end={s.value} prefix={s.prefix || ""} suffix={s.suffix} />
                  </div>
                  <p className="text-sm md:text-base text-surface-dark-foreground/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Mini case studies */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                company: "E-commerce Mode",
                result: "+340% de trafic organique",
                detail: "En 6 mois grâce à une stratégie SEO complète.",
                icon: TrendingUp,
              },
              {
                company: "Restaurant Premium",
                result: "x5 de leads",
                detail: "Campagnes Meta & Google Ads optimisées en continu.",
                icon: Rocket,
              },
              {
                company: "SaaS B2B",
                result: "+180% d'engagement",
                detail: "Stratégie social media et création de contenu vidéo.",
                icon: Users,
              },
            ].map((cs, i) => (
              <AnimatedSection key={cs.company} delay={i * 0.15}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-8 card-hover group">
                  <cs.icon className="w-8 h-8 text-primary mb-4" />
                  <p className="text-sm text-primary font-medium mb-2">{cs.company}</p>
                  <h4 className="text-2xl font-heading font-bold text-surface-dark-foreground mb-3">
                    {cs.result}
                  </h4>
                  <p className="text-base text-surface-dark-foreground/50">{cs.detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Testimonial */}
          <AnimatedSection delay={0.3} className="mt-16">
            <div className="max-w-2xl mx-auto text-center bg-surface-dark/50 border border-primary/10 rounded-2xl p-10">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-surface-dark-foreground/70 italic leading-relaxed mb-6">
                "FRUL'DIGITAL a transformé notre présence en ligne. Résultats concrets dès le
                premier mois. Une équipe réactive et vraiment experte."
              </p>
              <div>
                <p className="font-heading font-semibold text-surface-dark-foreground">
                  Marie Laurent
                </p>
                <p className="text-sm text-surface-dark-foreground/40">CEO — Luxe & Co</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(0 85% 45%), hsl(0 70% 35%))",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, hsl(0 0% 100%), transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-8 leading-tight text-balance">
              Et si votre entreprise devenait la prochaine success story ?
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 leading-relaxed">
              Réservez un audit gratuit et découvrez votre potentiel de croissance.
            </p>
            <Link to="/frul-lab#analyse-ia">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold px-12 py-8 text-xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Réserver un audit gratuit
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

export default Services;
