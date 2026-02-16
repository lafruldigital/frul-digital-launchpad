import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection, CountUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Scan,
  BarChart3,
  Zap,
  Target,
  Shield,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  LineChart,
  Globe,
  Share2,
  Search,
  Eye,
  Gauge,
  Layers,
  Rocket,
  Star,
  Crown,
  X,
  Check,
  Download,
  History,
  FileText,
  Users,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

/* ───────── ANIMATED GAUGE ───────── */
const AnimGauge = ({ label, value, size = 100 }: { label: string; value: number; size?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(0 0% 12%)" strokeWidth="6" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="hsl(0 85% 50%)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - (circ * value) / 100 } : {}}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </svg>
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-heading font-bold text-surface-dark-foreground"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {value}
        </motion.span>
      </div>
      <span className="text-sm text-surface-dark-foreground/50 font-medium">{label}</span>
    </div>
  );
};

/* ───────── PARTICLE FIELD (CSS-only) ───────── */
const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ───────── TIMELINE STEP ───────── */
const TimelineStep = ({ num, title, children, delay }: { num: string; title: string; children: React.ReactNode; delay: number }) => (
  <AnimatedSection delay={delay}>
    <div className="flex gap-6 md:gap-10 items-start relative">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-surface-dark border border-primary/20 flex items-center justify-center shrink-0 z-10">
        <span className="text-2xl md:text-3xl font-heading font-bold text-primary">{num}</span>
      </div>
      <div className="pt-1 flex-1">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-surface-dark-foreground mb-3">{title}</h3>
        <div className="text-base md:text-lg text-surface-dark-foreground/55 leading-relaxed">{children}</div>
      </div>
    </div>
  </AnimatedSection>
);

/* ───────── SEVERITY BADGE ───────── */
const SeverityBadge = ({ level }: { level: "critique" | "moyen" | "faible" }) => {
  const cls = level === "critique"
    ? "bg-red-500/15 text-red-400 border-red-500/20"
    : level === "moyen"
    ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
    : "bg-green-500/15 text-green-400 border-green-500/20";
  return <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cls}`}>{level}</span>;
};

/* ───────── PAGE ───────── */
const FrulLab = () => {
  return (
    <div className="min-h-screen bg-surface-darker">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-28 md:pt-44 md:pb-40 overflow-hidden animated-gradient-bg">
        <ParticleField />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-sm font-medium mb-8 animate-pulse-glow">
                <Brain className="w-4 h-4" />
                Technologie propriétaire
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-surface-dark-foreground leading-[1.05] mb-8 text-balance">
                FRUL'LAB AI —{" "}
                <span className="gradient-text">Transformez vos données en moteur de croissance.</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-xl md:text-2xl text-surface-dark-foreground/55 max-w-3xl mx-auto leading-relaxed mb-12">
                Notre agent intelligent analyse votre présence digitale, calcule votre score de maturité et génère un plan d'action pour accélérer votre performance.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#analyse-ia" onClick={(e) => { e.preventDefault(); document.getElementById('analyse-ia')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <Button variant="hero" size="lg" className="px-10 py-7 text-lg glow-red">
                    <Brain className="w-5 h-5 mr-2" />
                    Obtenir mon score digital gratuit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="#analyse-ia" onClick={(e) => { e.preventDefault(); document.getElementById('analyse-ia')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <Button variant="hero-outline" size="lg" className="px-10 py-7 text-lg">
                    Découvrir comment ça fonctionne
                  </Button>
                </a>
              </div>
            </AnimatedSection>

            {/* Mini dashboard preview */}
            <AnimatedSection delay={0.5}>
              <div className="mt-16 max-w-3xl mx-auto">
                <div className="bg-surface-dark/60 backdrop-blur-xl border border-primary/15 rounded-3xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm text-surface-dark-foreground/40 font-mono">frul-lab-ai v2.0 — analyse en cours...</span>
                  </div>
                  <div className="flex justify-center gap-8 md:gap-14 flex-wrap">
                    <AnimGauge label="Site web" value={68} size={110} />
                    <AnimGauge label="Social" value={45} size={110} />
                    <AnimGauge label="Maturité" value={57} size={110} />
                  </div>
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                      <Gauge className="w-4 h-4" />
                      Score global : 57/100 — Niveau : Moyenne
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── WHAT IS FRUL'LAB AI ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              Qu'est-ce que{" "}
              <span className="gradient-text">FRUL'LAB AI</span> ?
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed max-w-3xl mx-auto">
              FRUL'LAB AI est un agent intelligent capable d'analyser, évaluer et améliorer la performance digitale et commerciale d'une entreprise.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Scan, title: "Analyse automatique", desc: "Scan complet de votre présence en ligne en quelques minutes." },
              { icon: Gauge, title: "Score de maturité", desc: "Un score clair et actionnable pour comprendre votre niveau digital." },
              { icon: AlertTriangle, title: "Freins à la conversion", desc: "Identification précise des obstacles qui bloquent vos résultats." },
              { icon: Target, title: "Recommandations IA", desc: "Des suggestions personnalisées basées sur vos données réelles." },
              { icon: Layers, title: "Plan d'action priorisé", desc: "Une feuille de route structurée, du plus urgent au plus stratégique." },
              { icon: TrendingUp, title: "Projection de croissance", desc: "Estimez l'impact de chaque action sur votre chiffre d'affaires." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 card-hover group h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-surface-dark-foreground mb-2">{item.title}</h3>
                  <p className="text-base text-surface-dark-foreground/50 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS DECISION TOOL ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[140px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <AnimatedSection className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
                Un outil de{" "}
                <span className="gradient-text">décision business.</span>
              </h2>
              <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-8">
                FRUL'LAB AI ne se contente pas d'auditer. Il interprète les données, priorise les actions et projette les opportunités de croissance.
              </p>
              <div className="space-y-4">
                {[
                  "Interprétation contextuelle des données",
                  "Priorisation intelligente des actions",
                  "Projection des résultats attendus",
                  "Alignement avec vos objectifs business",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-base md:text-lg text-surface-dark-foreground/70">{t}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:w-1/2">
              <div className="bg-surface-dark/80 border border-primary/15 rounded-3xl p-8 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-xs text-surface-dark-foreground/30 ml-2 font-mono">dashboard.frullab.ai</span>
                </div>
                {/* Mock dashboard bars */}
                <div className="space-y-4">
                  {[
                    { label: "Performance SEO", val: 72, color: "bg-primary" },
                    { label: "Engagement Social", val: 45, color: "bg-primary/70" },
                    { label: "UX & Conversion", val: 83, color: "bg-primary" },
                    { label: "Tracking & Data", val: 38, color: "bg-primary/50" },
                  ].map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-surface-dark-foreground/60">{b.label}</span>
                        <span className="text-surface-dark-foreground/80 font-medium">{b.val}%</span>
                      </div>
                      <div className="h-2 bg-surface-darker rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${b.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${b.val}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Comment fonctionne{" "}
              <span className="gradient-text">l'IA</span> ?
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-8 md:left-10 top-0 bottom-0 w-0.5 glow-line" />
            <div className="space-y-16">
              <TimelineStep num="01" title="Collecte des informations" delay={0}>
                <p className="mb-4">L'utilisateur fournit les données clés :</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Nom de l'entreprise", "URL du site", "Réseaux sociaux", "Secteur d'activité", "Objectifs", "Email"].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm md:text-base">{i}</span>
                    </div>
                  ))}
                </div>
              </TimelineStep>

              <TimelineStep num="02" title="Scan automatique" delay={0.15}>
                <p className="mb-4">L'IA analyse en profondeur :</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Performance & UX", "SEO technique", "Réseaux sociaux", "Signaux de crédibilité", "Conversion", "Conformité RGPD"].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Scan className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm md:text-base">{i}</span>
                    </div>
                  ))}
                </div>
              </TimelineStep>

              <TimelineStep num="03" title="Scoring intelligent" delay={0.3}>
                <div className="flex flex-wrap gap-6 mt-4">
                  <AnimGauge label="Site web" value={68} size={90} />
                  <AnimGauge label="Social" value={45} size={90} />
                  <AnimGauge label="Global" value={57} size={90} />
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {[
                    { label: "En retard", active: false },
                    { label: "Moyenne", active: true },
                    { label: "Avancée", active: false },
                    { label: "Leader", active: false },
                  ].map((l) => (
                    <span
                      key={l.label}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                        l.active
                          ? "bg-primary/15 text-primary border-primary/25"
                          : "bg-surface-darker text-surface-dark-foreground/30 border-primary/5"
                      }`}
                    >
                      {l.label}
                    </span>
                  ))}
                </div>
              </TimelineStep>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTELLIGENT ANALYSIS ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Analyse{" "}
              <span className="gradient-text">intelligente</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/50 max-w-2xl mx-auto">
              Pour chaque problème détecté, FRUL'LAB AI fournit une analyse complète et actionnable.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-4xl mx-auto bg-surface-dark/80 border border-primary/10 rounded-3xl p-6 md:p-10 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-surface-dark-foreground/30">frul-lab — problèmes détectés : 12</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Temps de chargement > 4s", sev: "critique" as const, impact: "Perte estimée de 23% des visiteurs", urgence: "Immédiate" },
                  { title: "Absence de balises Open Graph", sev: "moyen" as const, impact: "Partage social non optimisé", urgence: "Court terme" },
                  { title: "Pas de CTA visible au-dessus de la ligne de flottaison", sev: "critique" as const, impact: "Conversion potentielle réduite de 40%", urgence: "Immédiate" },
                  { title: "Fréquence de publication irrégulière", sev: "faible" as const, impact: "Engagement en baisse progressive", urgence: "Moyen terme" },
                ].map((p) => (
                  <div key={p.title} className="bg-surface-darker/80 border border-primary/5 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-base font-heading font-semibold text-surface-dark-foreground">{p.title}</h4>
                        <SeverityBadge level={p.sev} />
                      </div>
                      <p className="text-sm text-surface-dark-foreground/45">{p.impact}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-surface-dark-foreground/40 shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                      {p.urgence}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── RECOMMENDATIONS ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <AnimatedSection className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
                Recommandations &{" "}
                <span className="gradient-text">plan d'action</span>
              </h2>
              <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-8">
                Chaque recommandation est compréhensible, exploitable et directement orientée business.
              </p>
              <div className="space-y-4">
                {[
                  "Recommandations personnalisées",
                  "Plan structuré étape par étape",
                  "Ordre de priorité clair",
                  "Solutions adaptées à votre budget",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-base md:text-lg text-surface-dark-foreground/70">{t}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:w-1/2">
              <div className="bg-surface-dark/80 border border-primary/10 rounded-3xl p-7 space-y-3">
                {[
                  { prio: "P1", label: "Optimiser les Core Web Vitals", tag: "Technique" },
                  { prio: "P2", label: "Ajouter des CTA au-dessus de la ligne de flottaison", tag: "Conversion" },
                  { prio: "P3", label: "Implémenter une stratégie de contenu régulière", tag: "Social" },
                  { prio: "P4", label: "Configurer le tracking GA4 + Meta Pixel", tag: "Data" },
                ].map((r) => (
                  <div key={r.prio} className="flex items-center gap-4 bg-surface-darker/80 rounded-xl p-4 border border-primary/5">
                    <span className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary font-heading font-bold text-sm shrink-0">
                      {r.prio}
                    </span>
                    <span className="flex-1 text-base text-surface-dark-foreground/75">{r.label}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/8 text-primary/70 border border-primary/10 hidden sm:block">{r.tag}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FREE VS PREMIUM ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Gratuit vs{" "}
              <span className="gradient-text">Premium</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Free */}
              <div className="bg-surface-dark border border-primary/10 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl font-heading font-bold text-surface-dark-foreground mb-2">Gratuit</h3>
                <p className="text-surface-dark-foreground/40 mb-8 text-base">Découvrez votre score</p>
                <ul className="space-y-4">
                  {[
                    { text: "Analyse limitée", yes: true },
                    { text: "Score global", yes: true },
                    { text: "Quelques problèmes détectés", yes: true },
                    { text: "Recommandations génériques", yes: true },
                    { text: "Scores détaillés", yes: false },
                    { text: "Plan d'action priorisé", yes: false },
                    { text: "Export PDF", yes: false },
                    { text: "Tableau de bord avancé", yes: false },
                  ].map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      {f.yes ? (
                        <Check className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-surface-dark-foreground/20 shrink-0" />
                      )}
                      <span className={`text-base ${f.yes ? "text-surface-dark-foreground/70" : "text-surface-dark-foreground/25"}`}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <a href="#analyse-ia" onClick={(e) => { e.preventDefault(); document.getElementById('analyse-ia')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <Button variant="hero-outline" size="lg" className="w-full mt-8 py-6 text-base">
                    Lancer l'audit gratuit
                  </Button>
                </a>
              </div>

              {/* Premium */}
              <div className="relative bg-surface-dark border-2 border-primary/30 rounded-3xl p-8 md:p-10 glow-red">
                <div className="absolute -top-4 right-6">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    <Crown className="w-3.5 h-3.5" />
                    Recommandé
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-surface-dark-foreground mb-2">Premium</h3>
                <p className="text-surface-dark-foreground/40 mb-8 text-base">Analyse complète & plan d'action</p>
                <ul className="space-y-4">
                  {[
                    "Analyse complète",
                    "Scores détaillés par catégorie",
                    "Plan d'action priorisé",
                    "Historique des audits",
                    "Export PDF",
                    "Comparaison sectorielle",
                    "Tableau de bord avancé",
                    "Support prioritaire",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-base text-surface-dark-foreground/70">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="w-full mt-8 py-6 text-base glow-red">
                    Passer au Premium
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── AI LEARNING ── */}
      <section className="py-24 md:py-32 section-darker relative overflow-hidden">
        <ParticleField />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              Une IA qui{" "}
              <span className="gradient-text">s'améliore</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed">
              FRUL'LAB AI apprend continuellement grâce aux données collectées pour rendre chaque audit plus pertinent que le précédent.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── LONG-TERM VISION ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Vision{" "}
              <span className="gradient-text">long terme</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Search, title: "Moteur de diagnostic", desc: "Analysez n'importe quelle entreprise en quelques clics." },
              { icon: Users, title: "Qualification prospects", desc: "Identifiez instantanément le niveau de maturité digitale." },
              { icon: BarChart3, title: "Base stratégique", desc: "Construisez une base de données business décisionnelle." },
              { icon: Star, title: "Produit différenciant", desc: "Un avantage concurrentiel à forte valeur ajoutée." },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 card-hover group text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <v.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-surface-dark-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-surface-dark-foreground/50">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="text-center mt-12">
            <p className="text-2xl md:text-3xl font-heading font-bold gradient-text">
              "Votre consultant digital autonome."
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FORMULAIRE D'ANALYSE IA ── */}
      <section id="analyse-ia" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark/40" />
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent)" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-sm font-medium mb-8">
              <Brain className="w-4 h-4" />
              Analyse personnalisée
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              Lancez votre analyse IA{" "}
              <span className="gradient-text">personnalisée</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-6">
              Notre agent IA analyse votre présence digitale et identifie vos opportunités de croissance.
            </p>
            <p className="text-base text-surface-dark-foreground/40 leading-relaxed max-w-2xl mx-auto">
              Les champs ne sont pas tous obligatoires. Cependant, <span className="text-primary font-medium">plus vous fournissez de liens, plus l'analyse sera précise</span>.
              Un manque d'informations peut entraîner une analyse partielle ou plus critique.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                try {
                  const res = await fetch("https://gabriel77229.app.n8n.cloud/webhook-test/audit-request", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      company_name: data.company || "",
                      email: data.email || "",
                      website_url: data.website || "",
                      social_instagram: data.instagram || "",
                      social_facebook: data.facebook || "",
                      social_linkedin: data.linkedin || "",
                    }),
                  });
                  if (!res.ok) throw new Error("Erreur réseau");
                  toast({ title: "Analyse en cours !", description: "Vérifiez vos emails dans 2 minutes." });
                  form.reset();
                } catch {
                  toast({ title: "Erreur", description: "Une erreur est survenue. Réessayez.", variant: "destructive" });
                }
              }}
              className="max-w-2xl mx-auto bg-surface-dark/80 backdrop-blur-xl border border-primary/15 rounded-3xl p-8 md:p-10 space-y-6"
            >
              {/* Required fields */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-surface-dark-foreground/80">
                  Nom de l'entreprise ou du projet <span className="text-primary">*</span>
                </label>
                <input
                  name="company"
                  required
                  placeholder="Ex : Mon Entreprise"
                  className="w-full h-12 rounded-xl border border-primary/15 bg-surface-darker/80 px-4 text-base text-surface-dark-foreground placeholder:text-surface-dark-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-surface-dark-foreground/80">
                  Email professionnel <span className="text-primary">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="contact@monentreprise.com"
                  className="w-full h-12 rounded-xl border border-primary/15 bg-surface-darker/80 px-4 text-base text-surface-dark-foreground placeholder:text-surface-dark-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              </div>

              {/* Optional fields */}
              <div className="pt-4 border-t border-primary/10">
                <p className="text-sm text-surface-dark-foreground/40 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Champs optionnels — améliorent la précision de l'analyse
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "website", label: "Site web", placeholder: "https://monsite.com", icon: Globe },
                    { name: "instagram", label: "Instagram", placeholder: "URL ou @compte", icon: Eye },
                    { name: "facebook", label: "Facebook", placeholder: "URL de la page", icon: Share2 },
                    { name: "twitter", label: "X / Twitter", placeholder: "URL ou @compte", icon: Zap },
                    { name: "tiktok", label: "TikTok", placeholder: "URL ou @compte", icon: Sparkles },
                    { name: "linkedin", label: "LinkedIn", placeholder: "URL du profil / page", icon: Users },
                  ].map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="text-sm font-medium text-surface-dark-foreground/60">{field.label}</label>
                      <div className="relative">
                        <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-dark-foreground/25" />
                        <input
                          name={field.name}
                          placeholder={field.placeholder}
                          className="w-full h-11 rounded-xl border border-primary/10 bg-surface-darker/60 pl-10 pr-4 text-sm text-surface-dark-foreground placeholder:text-surface-dark-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-surface-dark-foreground/30 mt-4">
                  ⚠️ Ces informations ne sont pas obligatoires, mais leur absence peut réduire la précision de l'analyse.
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full py-7 text-lg glow-red group"
              >
                <Brain className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Lancer l'analyse IA
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(0 85% 45%), hsl(0 70% 35%))" }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(0 0% 100%), transparent 60%)" }} />
        <ParticleField />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary-foreground mb-8 leading-tight text-balance">
              Découvrez votre véritable potentiel digital.
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-4 leading-relaxed">
              Obtenez votre score de maturité et votre plan d'action personnalisé.
            </p>
            <p className="text-base text-primary-foreground/60 mb-12">
              ⏰ Audit gratuit — places limitées chaque mois.
            </p>
            <a href="#analyse-ia" onClick={(e) => { e.preventDefault(); document.getElementById('analyse-ia')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold px-12 py-8 text-xl shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Brain className="w-6 h-6 mr-3" />
                Lancer mon audit IA
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FrulLab;
