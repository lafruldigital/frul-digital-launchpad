import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Sparkles, Globe, Smartphone, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["Tous", "Sites web", "Publicité", "Réseaux sociaux", "Identité"];

const projects = [
  {
    title: "Refonte e-commerce — Mode premium",
    category: "Sites web",
    tag: "+182% de conversions",
    icon: Globe,
    gradient: "from-rose-500/30 via-primary/20 to-transparent",
  },
  {
    title: "Campagne Meta Ads — SaaS B2B",
    category: "Publicité",
    tag: "ROAS x4.7",
    icon: Megaphone,
    gradient: "from-amber-500/30 via-primary/20 to-transparent",
  },
  {
    title: "Stratégie social — Restaurant Lyon",
    category: "Réseaux sociaux",
    tag: "+38k followers",
    icon: Sparkles,
    gradient: "from-fuchsia-500/30 via-primary/20 to-transparent",
  },
  {
    title: "App mobile — Coaching sportif",
    category: "Sites web",
    tag: "Note 4.9 / 5",
    icon: Smartphone,
    gradient: "from-sky-500/30 via-primary/20 to-transparent",
  },
  {
    title: "Identité visuelle — Startup AI",
    category: "Identité",
    tag: "Brand premium",
    icon: Sparkles,
    gradient: "from-emerald-500/30 via-primary/20 to-transparent",
  },
  {
    title: "Tunnel d'acquisition — Coach business",
    category: "Publicité",
    tag: "CPA -42%",
    icon: TrendingUp,
    gradient: "from-primary/40 via-primary/15 to-transparent",
  },
];

const stats = [
  { label: "Projets livrés", value: "+150" },
  { label: "ROAS moyen", value: "x4.2" },
  { label: "Satisfaction", value: "4.9/5" },
  { label: "Secteurs couverts", value: "20+" },
];

const Realisations = () => {
  return (
    <div className="min-h-screen section-darker">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-[11px] uppercase tracking-[0.25em] text-primary mb-6">
              <Sparkles className="w-3 h-3" /> Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-surface-dark-foreground mb-6">
              Nos <span className="gradient-text">créations</span>.
              <br />
              Des résultats qui parlent.
            </h1>
            <p className="text-surface-dark-foreground/60 text-lg leading-relaxed">
              Sites premium, campagnes publicitaires performantes, identités fortes : un aperçu de ce que
              nous construisons pour des marques qui veulent passer un cap.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="rounded-2xl border border-white/5 bg-surface-dark/60 backdrop-blur p-5 text-center"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary">{s.value}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-surface-dark-foreground/40 mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter chips (visuels) */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                i === 0
                  ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_18px_hsl(0_85%_50%/0.25)]"
                  : "border-white/10 text-surface-dark-foreground/60 hover:text-surface-dark-foreground hover:border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface-dark/70 hover:border-primary/30 transition-all duration-500"
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(0_85%_50%/0.25),transparent_50%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p.icon className="w-16 h-16 text-surface-dark-foreground/30 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-surface-darker/70 backdrop-blur border border-white/10 text-surface-dark-foreground/70">
                  {p.category}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/90 text-primary-foreground shadow-[0_0_14px_hsl(0_85%_50%/0.5)]">
                  {p.tag}
                </span>
              </div>
              <div className="p-5 flex items-start justify-between gap-3">
                <h3 className="text-surface-dark-foreground font-heading font-semibold text-base leading-snug">
                  {p.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-surface-dark-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-surface-dark to-surface-darker p-10 md:p-16 text-center">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/15 blur-[100px] rounded-full" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground mb-4">
              Et si le prochain projet, c'était <span className="gradient-text">le vôtre</span> ?
            </h2>
            <p className="text-surface-dark-foreground/60 max-w-xl mx-auto mb-8">
              Parlons de votre marque et identifions le levier de croissance le plus puissant à activer.
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground shadow-[0_0_28px_hsl(0_85%_50%/0.5)]">
                Démarrer un projet
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Realisations;