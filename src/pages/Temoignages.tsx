import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection, CountUp } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  Star,
  ArrowRight,
  Quote,
  Play,
  CheckCircle2,
  Users,
  TrendingUp,
  Heart,
  Brain,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ───────── STARS ───────── */
const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-surface-dark-foreground/15"}`}
      />
    ))}
  </div>
);

/* ───────── AVATAR ───────── */
const Avatar = ({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) => {
  const gradients = [
    "from-red-500 to-orange-500",
    "from-primary to-red-400",
    "from-orange-500 to-yellow-500",
    "from-red-600 to-rose-500",
    "from-rose-500 to-pink-500",
    "from-red-500 to-red-700",
    "from-orange-600 to-red-500",
    "from-rose-600 to-red-400",
    "from-amber-500 to-red-500",
    "from-pink-500 to-red-600",
  ];
  const sizeMap = { sm: "w-10 h-10 text-sm", md: "w-14 h-14 text-lg", lg: "w-20 h-20 text-2xl" };
  const idx = name.charCodeAt(0) % gradients.length;
  return (
    <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br ${gradients[idx]} flex items-center justify-center shrink-0`}>
      <span className="text-primary-foreground font-heading font-bold">{name.charAt(0)}</span>
    </div>
  );
};

/* ───────── DATA: FEATURED TESTIMONIALS ───────── */
const featured = [
  {
    name: "Julien R.",
    role: "CEO",
    company: "NovaTech",
    sector: "E-commerce",
    quote: "FRUL'DIGITAL a transformé notre acquisition. En 3 mois, nous avons doublé nos leads qualifiés et réduit notre CPA de 40%.",
    result: "+210% de leads",
    rating: 5,
  },
  {
    name: "Amina K.",
    role: "Directrice Marketing",
    company: "BelleVie",
    sector: "Beauté & Bien-être",
    quote: "L'approche data-driven nous a ouvert les yeux. On voit enfin clairement ce qui fonctionne. Notre ROAS a été multiplié par 4 en 5 mois.",
    result: "ROAS x4",
    rating: 5,
  },
  {
    name: "Thomas G.",
    role: "Co-fondateur",
    company: "GreenScale",
    sector: "SaaS B2B",
    quote: "Avant FRUL'DIGITAL, notre présence digitale était quasi inexistante. Aujourd'hui, nous générons des leads chaque semaine grâce à un funnel solide.",
    result: "+520% de trafic",
    rating: 5,
  },
];

/* ───────── DATA: WALL OF REVIEWS ───────── */
const wallReviews = [
  { name: "Marc D.", role: "Gérant", sector: "E-commerce", quote: "On hésitait à investir dans la pub en ligne, mais l'équipe nous a vraiment bien guidés. En 4 mois, nos ventes en ligne ont doublé.", rating: 5 },
  { name: "Sarah L.", role: "Directrice Marketing", sector: "SaaS", quote: "Ce que j'apprécie le plus, c'est la transparence. Chaque euro dépensé est justifié.", rating: 5 },
  { name: "Nadia L.", role: "Gérante", sector: "Retail", quote: "Équipe ultra pro. Résultats rapides.", rating: 5 },
  { name: "Karim B.", role: "Co-fondateur", sector: "Food Tech", quote: "Le FRUL'LAB AI nous a ouvert les yeux sur des trucs qu'on ignorait complètement. Le plan d'action était concret.", rating: 5 },
  { name: "Julie M.", role: "Fondatrice", sector: "Décoration", quote: "Nos réseaux sociaux étaient un désert avant. Maintenant on reçoit des messages de clients potentiels presque tous les jours.", rating: 5 },
  { name: "Antoine R.", role: "CEO", sector: "Santé", quote: "Ils ont su comprendre notre secteur. Les leads qu'on reçoit sont vraiment qualifiés, c'est ça qui change tout.", rating: 5 },
  { name: "Fatima Z.", role: "Gérante", sector: "Restauration", quote: "Nos réservations en ligne ont explosé. Et le suivi est top.", rating: 4 },
  { name: "Nicolas P.", role: "Directeur", sector: "Formation", quote: "On a testé 2 agences avant. La différence c'est la transparence : on voit exactement où va notre budget et ce que ça rapporte.", rating: 5 },
  { name: "Clara V.", role: "Esthéticienne", sector: "Beauté", quote: "Je recommande les yeux fermés. L'équipe est réactive, les résultats sont là.", rating: 5 },
  { name: "Youssef M.", role: "CEO", sector: "Immobilier", quote: "On cherchait une vraie stratégie. On l'a trouvée. ROI visible dès les premières campagnes.", rating: 5 },
  { name: "Laura B.", role: "Fondatrice", sector: "Mode", quote: "Le contenu qu'ils créent est magnifique. Notre image de marque a pris un autre niveau.", rating: 5 },
  { name: "David T.", role: "Directeur commercial", sector: "B2B", quote: "Pipeline multiplié par 3. Les leads arrivent, qualifiés et prêts à acheter.", rating: 5 },
  { name: "Samia H.", role: "Responsable digitale", sector: "Tourisme", quote: "Réactivité exceptionnelle. On se sent accompagnés, pas juste livrés.", rating: 5 },
  { name: "Pierre C.", role: "Gérant", sector: "Auto", quote: "Simple, efficace, rentable. Pas de blabla.", rating: 5 },
  { name: "Léa R.", role: "CMO", sector: "Tech", quote: "L'audit FRUL'LAB nous a permis de corriger des erreurs qu'on traînait depuis des mois. Impact immédiat sur nos conversions.", rating: 5 },
  { name: "Mehdi A.", role: "Fondateur", sector: "Fitness", quote: "Mes abonnements ont triplé depuis qu'on bosse ensemble. Et ça continue de monter.", rating: 5 },
];

/* ───────── DATA: CLIENT RESULTS ───────── */
const clientResults = [
  { name: "Sophie M.", company: "Atelier Élégance", metric: "+340%", label: "Trafic organique", quote: "Notre visibilité a complètement changé." },
  { name: "Lucas D.", company: "DataFlow", metric: "ROAS x5.2", label: "Retour pub", quote: "Chaque euro investi en rapporte 5." },
  { name: "Marie L.", company: "Le Comptoir Doré", metric: "+185%", label: "Réservations", quote: "On refuse du monde le week-end maintenant." },
  { name: "Romain K.", company: "FormaPro", metric: "-45%", label: "Coût par lead", quote: "On paie moins pour de meilleurs prospects." },
];

/* ───────── DATA: PLACEHOLDER LOGOS ───────── */
const clientLogos = [
  "Bloom Fashion", "TechNova", "GreenBite", "Studio Déco", "MedConnect",
  "Le Jardin d'Épices", "FormaPro", "Skin Therapy", "NovaTech", "BelleVie",
  "GreenScale", "DataFlow",
];

/* ───────── WHY CLIENTS STAY ───────── */
const whyStay = [
  { icon: TrendingUp, title: "Approche orientée résultats", desc: "Chaque action est mesurée. On ne fait rien au hasard." },
  { icon: Heart, title: "Accompagnement humain", desc: "Un vrai interlocuteur dédié qui connaît votre business." },
  { icon: Sparkles, title: "Stratégies sur mesure", desc: "Pas de template. Chaque plan est unique à votre entreprise." },
  { icon: Brain, title: "Technologie FRUL'LAB", desc: "L'IA au service de votre croissance. Audit, insights, optimisation." },
];

/* ───────── PAGE ───────── */
const Temoignages = () => {
  return (
    <div className="min-h-screen bg-surface-darker">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden animated-gradient-bg">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Star className="w-4 h-4 fill-current" />
              Témoignages clients
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-heading font-bold text-surface-dark-foreground leading-[1.05] mb-8 text-balance">
              Ils nous ont fait confiance.{" "}
              <span className="gradient-text">Voici leurs résultats.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-surface-dark-foreground/55 max-w-3xl mx-auto leading-relaxed mb-10">
              Des entreprises ambitieuses, des stratégies performantes et des résultats mesurables.
            </p>
          </AnimatedSection>

          {/* Stats hero */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className="text-4xl md:text-5xl font-heading font-bold text-surface-dark-foreground">4.9</span>
                  <span className="text-lg text-surface-dark-foreground/40 self-end mb-1">/5</span>
                </div>
                <p className="text-sm text-surface-dark-foreground/40">Note moyenne</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">
                  <CountUp end={150} suffix="+" />
                </div>
                <p className="text-sm text-surface-dark-foreground/40">Entreprises accompagnées</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">
                  <CountUp end={98} suffix="%" />
                </div>
                <p className="text-sm text-surface-dark-foreground/40">Taux de satisfaction</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURED TESTIMONIALS ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Avis vedettes</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4">
              Ceux qui ont tout <span className="gradient-text">changé</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mobile-carousel">
            {featured.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="relative bg-surface-dark border border-primary/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between h-full group hover:border-primary/25 transition-all duration-500 hover:shadow-[0_0_40px_hsl(0_85%_50%/0.08)]">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <Stars count={t.rating} />
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{t.result}</span>
                    </div>
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    <p className="text-lg md:text-xl text-surface-dark-foreground/70 leading-relaxed mb-8 italic">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-primary/5">
                    <Avatar name={t.name} size="md" />
                    <div>
                      <p className="font-heading font-semibold text-surface-dark-foreground">{t.name}</p>
                      <p className="text-sm text-surface-dark-foreground/40">{t.role}, {t.company}</p>
                      <span className="inline-block mt-1 text-[11px] text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full">{t.sector}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WALL OF REVIEWS ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Preuve sociale</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4">
              +150 entreprises, <span className="gradient-text">un seul verdict</span>
            </h2>
            <p className="text-lg text-surface-dark-foreground/45 mt-4 max-w-2xl mx-auto">
              Des retours authentiques de vrais entrepreneurs.
            </p>
          </AnimatedSection>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 max-w-7xl mx-auto space-y-5">
            {wallReviews.map((r, i) => (
              <AnimatedSection key={r.name} delay={Math.min(i * 0.03, 0.3)}>
                <div className="break-inside-avoid bg-surface-dark border border-primary/8 rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 group">
                  <Stars count={r.rating} />
                  <p className="text-surface-dark-foreground/65 leading-relaxed mt-4 mb-5 text-[15px]">
                    "{r.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} size="sm" />
                    <div>
                      <p className="font-heading font-semibold text-surface-dark-foreground text-sm">{r.name}</p>
                      <p className="text-xs text-surface-dark-foreground/35">{r.role}</p>
                      <span className="text-[10px] text-primary/60">{r.sector}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>



      {/* ── CLIENT RESULTS ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Résultats concrets</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4">
              L'émotion + <span className="gradient-text">la data</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mobile-carousel mobile-carousel-xs">
            {clientResults.map((cr, i) => (
              <AnimatedSection key={cr.name} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 text-center card-hover group h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-500">{cr.metric}</div>
                    <p className="text-sm text-surface-dark-foreground/40 mb-4">{cr.label}</p>
                    <p className="text-sm text-surface-dark-foreground/55 italic mb-4">"{cr.quote}"</p>
                  </div>
                  <div className="pt-4 border-t border-primary/5">
                    <p className="text-sm font-heading font-semibold text-surface-dark-foreground">{cr.name}</p>
                    <p className="text-xs text-surface-dark-foreground/35">{cr.company}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <section className="py-16 md:py-20 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm text-surface-dark-foreground/35 uppercase tracking-[0.2em]">
              Ils nous font confiance
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
            {clientLogos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="px-6 py-3 border border-primary/8 rounded-xl bg-surface-dark/50 text-surface-dark-foreground/25 text-sm font-heading font-medium hover:text-primary/50 hover:border-primary/15 transition-all duration-300"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL RATING ── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center bg-surface-dark border border-primary/15 rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/[0.02]" />
              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-6xl md:text-7xl font-heading font-bold text-surface-dark-foreground mb-2">
                  4.9<span className="text-2xl text-surface-dark-foreground/30">/5</span>
                </div>
                <p className="text-surface-dark-foreground/40 text-lg mb-6">
                  Basé sur <span className="text-surface-dark-foreground/60 font-semibold">+150 clients</span>
                </p>
                <div className="w-16 h-px bg-primary/20 mx-auto mb-6" />
                <p className="text-xl md:text-2xl text-surface-dark-foreground/55 italic leading-relaxed">
                  "Notre priorité : générer un impact réel pour chaque entreprise que nous accompagnons."
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY CLIENTS STAY ── */}
      <section className="py-24 md:py-32 section-darker">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Fidélité</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4">
              Pourquoi nos clients <span className="gradient-text">restent</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mobile-carousel mobile-carousel-xs">
            {whyStay.map((w, i) => (
              <AnimatedSection key={w.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 h-full card-hover group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <w.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-surface-dark-foreground text-lg mb-2">{w.title}</h3>
                  <p className="text-sm text-surface-dark-foreground/45 leading-relaxed">{w.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-darker via-primary/5 to-surface-darker" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-surface-dark-foreground mb-6 leading-tight">
              Et si votre entreprise devenait{" "}
              <span className="gradient-text">notre prochain succès ?</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-xl md:text-2xl text-surface-dark-foreground/50 max-w-2xl mx-auto mb-10">
              Rejoignez les +150 entreprises qui nous font confiance.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Link to="/contact" state={{ reason: "temoignage", source: "Page Témoignages" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Button variant="hero" size="lg" className="px-12 py-7 text-lg glow-red">
                  Obtenir mon audit gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Temoignages;
