import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection, CountUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  Target,
  Star,
  Brain,
  CheckCircle2,
  Zap,
  Globe,
  Share2,
  Search,
  Megaphone,
  ShoppingCart,
  Rocket,
  MapPin,
  Quote,
  ArrowUpRight,
  LineChart,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ───────── ANIMATED BAR ───────── */
const AnimBar = ({ label, value, suffix = "%" }: { label: string; value: number; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-surface-dark-foreground/60">{label}</span>
        <span className="text-surface-dark-foreground/80 font-semibold">+{value}{suffix}</span>
      </div>
      <div className="h-2.5 bg-surface-darker rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.min(value, 100)}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

/* ───────── CASE STUDY DATA ───────── */
const caseStudies = [
  {
    sector: "E-commerce Mode",
    size: "PME — 25 employés",
    problem: "Trafic en stagnation, taux de conversion faible, acquisition client coûteuse.",
    objectives: ["Augmenter le trafic organique", "Réduire le coût d'acquisition", "Booster les ventes en ligne"],
    strategies: ["SEO technique & sémantique", "Campagnes Meta & Google Ads", "Refonte UX du tunnel de conversion", "Stratégie de contenu"],
    results: [
      { label: "Trafic organique", value: "+340%", color: "text-primary" },
      { label: "Chiffre d'affaires", value: "+280%", color: "text-primary" },
      { label: "ROAS", value: "x5.2", color: "text-primary" },
      { label: "CPA", value: "-45%", color: "text-green-400" },
    ],
    before: { visits: "2 400/mois", leads: "45/mois", ca: "18K€/mois" },
    after: { visits: "10 500/mois", leads: "235/mois", ca: "68K€/mois" },
    testimonial: {
      name: "Sophie Marchand",
      role: "Fondatrice — Atelier Élégance",
      quote: "FRUL'DIGITAL a transformé notre boutique en ligne. En 6 mois, nous avons triplé notre chiffre d'affaires. L'équipe est réactive, stratégique et orientée résultats.",
    },
    icon: ShoppingCart,
  },
  {
    sector: "Startup SaaS B2B",
    size: "Startup — 12 employés",
    problem: "Peu de leads entrants, notoriété quasi inexistante, cycle de vente trop long.",
    objectives: ["Générer des leads qualifiés", "Construire la notoriété", "Réduire le cycle de vente"],
    strategies: ["LinkedIn Ads & content", "Funnel d'acquisition automatisé", "SEO & blog stratégique", "Email marketing automation"],
    results: [
      { label: "Leads qualifiés", value: "+520%", color: "text-primary" },
      { label: "Notoriété LinkedIn", value: "+890%", color: "text-primary" },
      { label: "Cycle de vente", value: "-35%", color: "text-green-400" },
      { label: "MRR", value: "+210%", color: "text-primary" },
    ],
    before: { visits: "800/mois", leads: "8/mois", ca: "12K€ MRR" },
    after: { visits: "6 200/mois", leads: "52/mois", ca: "37K€ MRR" },
    testimonial: {
      name: "Thomas Durand",
      role: "CEO — DataFlow",
      quote: "L'approche data-driven de FRUL'DIGITAL a été un game changer pour nous. Notre pipeline commercial a été multiplié par 5 en quelques mois.",
    },
    icon: Rocket,
  },
  {
    sector: "Restaurant Premium",
    size: "Business local — 3 établissements",
    problem: "Réservations en baisse, peu de visibilité locale, image digitale inexistante.",
    objectives: ["Augmenter les réservations", "Développer la présence locale", "Créer une communauté engagée"],
    strategies: ["Google My Business optimization", "Social media & création de contenu", "Campagnes locales Meta Ads", "Gestion e-réputation"],
    results: [
      { label: "Réservations", value: "+185%", color: "text-primary" },
      { label: "Engagement social", value: "+420%", color: "text-primary" },
      { label: "Avis Google", value: "4.8/5", color: "text-primary" },
      { label: "Visibilité locale", value: "+310%", color: "text-primary" },
    ],
    before: { visits: "150/mois", leads: "30 résa/sem", ca: "Visibilité faible" },
    after: { visits: "1 800/mois", leads: "85 résa/sem", ca: "Top 3 local" },
    testimonial: {
      name: "Marie Laurent",
      role: "Directrice — Le Comptoir Doré",
      quote: "Nos réservations ont explosé depuis que FRUL'DIGITAL gère notre présence digitale. Le retour sur investissement est incroyable.",
    },
    icon: MapPin,
  },
];

/* ───────── CASE STUDY BLOCK ───────── */
const CaseStudyBlock = ({ cs, index }: { cs: (typeof caseStudies)[0]; index: number }) => {
  const Icon = cs.icon;
  return (
    <AnimatedSection>
      <div className="bg-surface-dark border border-primary/10 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-8 md:p-12 border-b border-primary/5">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-surface-dark-foreground">{cs.sector}</h3>
              <p className="text-base text-surface-dark-foreground/40">{cs.size}</p>
            </div>
          </div>
          <p className="text-lg text-surface-dark-foreground/55 leading-relaxed mb-6">
            <span className="text-surface-dark-foreground/70 font-medium">Problématique :</span> {cs.problem}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-heading font-semibold text-primary mb-3 uppercase tracking-wider">Objectifs</h4>
              <ul className="space-y-2">
                {cs.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-base text-surface-dark-foreground/60">
                    <Target className="w-4 h-4 text-primary mt-1 shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-heading font-semibold text-primary mb-3 uppercase tracking-wider">Stratégie</h4>
              <ul className="space-y-2">
                {cs.strategies.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-base text-surface-dark-foreground/60">
                    <Zap className="w-4 h-4 text-primary mt-1 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-8 md:p-12 border-b border-primary/5">
          <h4 className="text-sm font-heading font-semibold text-primary mb-6 uppercase tracking-wider">Résultats</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cs.results.map((r) => (
              <div key={r.label} className="text-center">
                <div className={`text-3xl md:text-4xl font-heading font-bold ${r.color} mb-1`}>{r.value}</div>
                <p className="text-sm text-surface-dark-foreground/40">{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After */}
        <div className="p-8 md:p-12 border-b border-primary/5">
          <h4 className="text-sm font-heading font-semibold text-primary mb-6 uppercase tracking-wider">Avant / Après</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface-darker/80 rounded-xl p-6 border border-primary/5">
              <span className="text-xs font-semibold text-surface-dark-foreground/30 uppercase tracking-wider">Avant</span>
              <div className="space-y-3 mt-4">
                {Object.entries(cs.before).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-sm text-surface-dark-foreground/40 capitalize">{k}</span>
                    <span className="text-sm text-surface-dark-foreground/60 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/15">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Après</span>
              <div className="space-y-3 mt-4">
                {Object.entries(cs.after).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-sm text-surface-dark-foreground/50 capitalize">{k}</span>
                    <span className="text-sm text-primary font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="p-8 md:p-12">
          <div className="flex gap-4 items-start">
            <Quote className="w-8 h-8 text-primary/30 shrink-0 mt-1" />
            <div>
              <p className="text-lg md:text-xl text-surface-dark-foreground/65 italic leading-relaxed mb-4">
                "{cs.testimonial.quote}"
              </p>
              <p className="font-heading font-semibold text-surface-dark-foreground">{cs.testimonial.name}</p>
              <p className="text-sm text-surface-dark-foreground/40">{cs.testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

/* ───────── PAGE ───────── */
const Results = () => {
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
              <BarChart3 className="w-4 h-4" />
              Résultats prouvés
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-bold text-surface-dark-foreground leading-[1.05] mb-8 text-balance">
              Des résultats mesurables.{" "}
              <span className="gradient-text">Une croissance réelle.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-surface-dark-foreground/55 max-w-3xl mx-auto leading-relaxed mb-12">
              Découvrez comment nous aidons les entreprises à générer plus de visibilité, plus de clients et plus de chiffre d'affaires.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="px-10 py-7 text-lg">
                Obtenir mon audit gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 md:py-20 border-y border-primary/10 section-darker">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { value: 340, suffix: "%", label: "Croissance moyenne" },
              { value: 12, suffix: "M+", label: "Impressions générées" },
              { value: 120, suffix: "+", label: "Entreprises accompagnées" },
              { value: 3, prefix: "x", suffix: "", label: "ROI moyen" },
            ].map((s) => (
              <AnimatedSection key={s.label}>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-heading font-bold text-primary mb-2">
                    <CountUp end={s.value} prefix={s.prefix || ""} suffix={s.suffix} />
                  </div>
                  <p className="text-sm md:text-base text-surface-dark-foreground/45">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Nos{" "}
              <span className="gradient-text">études de cas</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/50 max-w-2xl mx-auto">
              Chaque projet est une preuve concrète de notre expertise et de notre capacité à générer des résultats.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-12">
            {caseStudies.map((cs, i) => (
              <CaseStudyBlock key={cs.sector} cs={cs} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS BY EXPERTISE ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Résultats par{" "}
              <span className="gradient-text">expertise</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Share2, title: "Social Media", result: "+420%", desc: "engagement moyen" },
              { icon: Megaphone, title: "Publicité Ads", result: "x5.2", desc: "ROAS moyen" },
              { icon: Search, title: "SEO", result: "+340%", desc: "trafic organique" },
              { icon: Globe, title: "Développement Web", result: "+65%", desc: "taux de conversion" },
            ].map((e, i) => (
              <AnimatedSection key={e.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 card-hover group text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <e.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm text-surface-dark-foreground/40 mb-1">{e.title}</p>
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">{e.result}</div>
                  <p className="text-sm text-surface-dark-foreground/45">{e.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA-DRIVEN METHOD ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <AnimatedSection className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
                Chaque décision est guidée par{" "}
                <span className="gradient-text">la donnée.</span>
              </h2>
              <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-8">
                Nous analysons, testons et optimisons en continu pour maximiser votre performance.
              </p>
              <div className="space-y-4">
                {["Tracking avancé multi-canal", "Tests A/B systématiques", "Reporting transparent en temps réel", "Optimisation continue des KPIs"].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
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
                  <span className="text-xs text-surface-dark-foreground/25 ml-2 font-mono">analytics.fruldigital.com</span>
                </div>
                <AnimBar label="Trafic organique" value={85} />
                <AnimBar label="Taux de conversion" value={62} />
                <AnimBar label="ROI publicitaire" value={78} />
                <AnimBar label="Engagement social" value={92} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-6">
              Ce que disent{" "}
              <span className="gradient-text">nos clients</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Pierre Martin", role: "DG — TechVision", quote: "ROI de x4 en 3 mois. L'équipe la plus data-driven avec laquelle j'ai travaillé.", rating: 5 },
              { name: "Amina Bensaid", role: "CMO — GreenLux", quote: "Notre acquisition client a été divisée par 2 tout en doublant le volume de leads.", rating: 5 },
              { name: "Lucas Petit", role: "Fondateur — FitPro", quote: "Nos réseaux sociaux sont passés de 2K à 45K abonnés en 6 mois. Incroyable.", rating: 5 },
            ].map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-base text-surface-dark-foreground/60 italic leading-relaxed mb-6">"{t.quote}"</p>
                  <div>
                    <p className="font-heading font-semibold text-surface-dark-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-surface-dark-foreground/35">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRUL'LAB LINK ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[140px]" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              Des résultats amplifiés par{" "}
              <span className="gradient-text">notre IA.</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-10">
              Grâce à FRUL'LAB AI, nous identifions rapidement les opportunités de croissance et priorisons les actions à fort impact.
            </p>
            <Link to="/frul-lab">
              <Button variant="hero" size="lg" className="px-10 py-7 text-lg glow-red">
                <Brain className="w-5 h-5 mr-2" />
                Découvrir FRUL'LAB
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 85% 45%), hsl(0 70% 35%))" }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(0 0% 100%), transparent 60%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-8 leading-tight text-balance">
              Et si votre entreprise devenait notre prochain succès ?
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-4 leading-relaxed">
              Réservez un audit gratuit et découvrez votre potentiel de croissance.
            </p>
            <p className="text-base text-primary-foreground/60 mb-12">
              ⏰ Places limitées chaque mois — ne manquez pas votre opportunité.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Réserver mon audit gratuit
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

export default Results;
