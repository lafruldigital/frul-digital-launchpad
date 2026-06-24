import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ecommerceMode from "@/assets/realisations/ecommerce-mode.png.asset.json";
import metaAdsSaas from "@/assets/realisations/meta-ads-saas.png.asset.json";
import socialRestaurant from "@/assets/realisations/social-restaurant.png.asset.json";
import coachingApp from "@/assets/realisations/coaching-app.png.asset.json";
import identiteStartup from "@/assets/realisations/identite-startup.png.asset.json";
import tunnelAcquisition from "@/assets/realisations/tunnel-acquisition.png.asset.json";
import frulCarsLogo from "@/assets/logo-gallery/frul-cars.jpg.asset.json";
import frulImmoLogo from "@/assets/logo-gallery/frul-immo.png.asset.json";
import fruluxLogo from "@/assets/logo-gallery/frulux.jpg.asset.json";
import smashDistrictFlyer from "@/assets/flyers/smash-district-flyer.png.asset.json";
import chicknFireFlyer from "@/assets/flyers/chickn-fire-flyer.png.asset.json";
import formaHabitatFlyer from "@/assets/flyers/forma-habitat-flyer.png.asset.json";
import atelierMietteFlyer from "@/assets/flyers/atelier-miette-flyer.png.asset.json";
import mininovaFlyer from "@/assets/flyers/mininova-flyer.png.asset.json";
import sentraSecureFlyer from "@/assets/flyers/sentra-secure-flyer.png.asset.json";
import pulseOneFlyer from "@/assets/flyers/pulse-one-flyer.png.asset.json";
import helionPatrimoineFlyer from "@/assets/flyers/helion-patrimoine-flyer.png.asset.json";
import azuraEscapeFlyer from "@/assets/flyers/azura-escape-flyer.png.asset.json";
import noxAtelierFlyer from "@/assets/flyers/nox-atelier-flyer.png.asset.json";
import bloomoraAtelierFlyer from "@/assets/flyers/bloomora-atelier-flyer.png.asset.json";
import kintaroLabFlyer from "@/assets/flyers/kintaro-lab-flyer.png.asset.json";
import aetherMetricsFlyer from "@/assets/flyers/aether-metrics-flyer.png.asset.json";
import lunaNoirFlyer from "@/assets/flyers/luna-noir-flyer.png.asset.json";
import veloraDriveFlyer from "@/assets/flyers/velora-drive-flyer.png.asset.json";
import nuveaLivingFlyer from "@/assets/flyers/nuvea-living-flyer.png.asset.json";
import metaAdsSaasFlyer from "@/assets/flyers/meta-ads-saas-flyer.png.asset.json";
import socialRestoLyonFlyer from "@/assets/flyers/social-resto-lyon-flyer.png.asset.json";

const categories = ["Tous", "Projets signature", "Sites web", "Publicité", "Réseaux sociaux", "Identité", "Expérience"];

type Project = {
  title: string;
  category: string;
  tag: string;
  image: string;
  objectFit?: "cover" | "contain";
  external?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "FRUL'CARS — Concessionnaire premium",
    category: "Projets signature",
    tag: "Site vitrine + catalogue",
    image: frulCarsLogo.url,
    objectFit: "contain",
    external: "https://frulcars.fr",
    featured: true,
  },
  {
    title: "FRUL'IMMO — Agence immobilière haut de gamme",
    category: "Projets signature",
    tag: "Site vitrine premium",
    image: frulImmoLogo.url,
    objectFit: "contain",
    external: "https://frulimmo.fr",
    featured: true,
  },
  {
    title: "FRULUX — Blog connecté éditorial",
    category: "Projets signature",
    tag: "Plateforme éditoriale",
    image: fruluxLogo.url,
    objectFit: "contain",
    external: "https://frulux.fr",
    featured: true,
  },
  {
    title: "Active Theory — Expérience WebGL immersive",
    category: "Expérience",
    tag: "Création la plus poussée",
    image: "/activetheory-preview.png",
    external: "https://activetheory.net/",
    featured: true,
  },
  {
    title: "Refonte e-commerce — Mode premium",
    category: "Sites web",
    tag: "+182% de conversions",
    image: ecommerceMode.url,
  },
  {
    title: "App mobile — Coaching sportif",
    category: "Sites web",
    tag: "Note 4.9 / 5",
    image: coachingApp.url,
  },
  {
    title: "Campagne Meta Ads — SaaS B2B",
    category: "Publicité",
    tag: "ROAS x4.7",
    image: metaAdsSaas.url,
  },
  {
    title: "Tunnel d'acquisition — Coach business",
    category: "Publicité",
    tag: "CPA -42%",
    image: tunnelAcquisition.url,
  },
  {
    title: "Stratégie social — Restaurant Lyon",
    category: "Réseaux sociaux",
    tag: "+38k followers",
    image: socialRestaurant.url,
  },
  {
    title: "Identité visuelle — Startup AI",
    category: "Identité",
    tag: "Brand premium",
    image: identiteStartup.url,
  },
];

const stats = [
  { label: "Projets livrés", value: "+150" },
  { label: "ROAS moyen", value: "x4.2" },
  { label: "Satisfaction", value: "4.9/5" },
  { label: "Secteurs couverts", value: "20+" },
];

type Flyer = { name: string; sector: string; image: string };

const flyers: Flyer[] = [
  { name: "Smash District", sector: "Fast Food", image: smashDistrictFlyer.url },
  { name: "Chick'n Fire", sector: "Fast Food", image: chicknFireFlyer.url },
  { name: "Atelier Miette", sector: "Boulangerie & lifestyle", image: atelierMietteFlyer.url },
  { name: "Forma Habitat", sector: "Immobilier", image: formaHabitatFlyer.url },
  { name: "Hélion Patrimoine", sector: "Finance & patrimoine", image: helionPatrimoineFlyer.url },
  { name: "Nuvéa Living", sector: "Immobilier d'exception", image: nuveaLivingFlyer.url },
  { name: "Mininova", sector: "Beauté & soin", image: mininovaFlyer.url },
  { name: "Bloomora Atelier", sector: "Beauté & lifestyle", image: bloomoraAtelierFlyer.url },
  { name: "Luna Noir", sector: "Événementiel premium", image: lunaNoirFlyer.url },
  { name: "Azura Escape", sector: "Voyage & hospitality", image: azuraEscapeFlyer.url },
  { name: "Nox Atelier", sector: "Mode & lifestyle", image: noxAtelierFlyer.url },
  { name: "Sentra Secure", sector: "Services & sécurité", image: sentraSecureFlyer.url },
  { name: "Pulse One", sector: "Fitness & coaching", image: pulseOneFlyer.url },
  { name: "Kintaro Lab", sector: "Tech & SaaS", image: kintaroLabFlyer.url },
  { name: "Aether Metrics", sector: "SaaS analytics", image: aetherMetricsFlyer.url },
  { name: "Pulse Ads SaaS", sector: "Acquisition Meta Ads", image: metaAdsSaasFlyer.url },
  { name: "Velora Drive", sector: "Automobile premium", image: veloraDriveFlyer.url },
  { name: "Maison Lyon Social", sector: "Restaurant gastronomique", image: socialRestoLyonFlyer.url },
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
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to="/contact"
                state={{ reason: "realisation", project: p.title, source: "Page Réalisations — carte projet" }}
                className="group block relative overflow-hidden rounded-3xl border border-white/10 bg-surface-dark/70 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_hsl(0_85%_50%/0.45)] transition-all duration-500 h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface-darker to-black">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full ${p.objectFit === "contain" ? "object-contain p-8" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.04]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-black/60 backdrop-blur border border-white/10 text-white/80">
                    {p.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/90 text-primary-foreground shadow-[0_0_14px_hsl(0_85%_50%/0.5)]">
                    {p.tag}
                  </span>
                  {p.featured && (
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-primary/15 border border-primary/40 text-primary backdrop-blur">
                      ★ Signature
                    </span>
                  )}
                </div>
                <div className="p-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-surface-dark-foreground font-heading font-semibold text-base leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-surface-dark-foreground/50 mt-1.5 group-hover:text-primary/80 transition-colors">
                      Discuter de ce projet →
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-surface-dark-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Affiches & Flyers */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-[11px] uppercase tracking-[0.25em] text-primary mb-5">
            <Sparkles className="w-3 h-3" /> Ad Gallery
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-surface-dark-foreground mb-4">
            Affiches & <span className="gradient-text">Flyers</span>
          </h2>
          <p className="text-surface-dark-foreground/60 text-base md:text-lg leading-relaxed">
            Une sélection d'affiches publicitaires fictives conçues pour différents secteurs : food, immobilier,
            beauté, événementiel, fitness, tech, automobile. Cliquez sur une création pour en parler avec nous.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {flyers.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 10) * 0.04 }}
            >
              <Link
                to="/contact"
                state={{ reason: "realisation", project: `Affiche ${f.name} — ${f.sector}`, source: "Page Réalisations — Ad Gallery" }}
                className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-surface-dark/70 hover:border-primary/40 hover:shadow-[0_18px_50px_-20px_hsl(0_85%_50%/0.5)] transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-surface-darker to-black">
                  <img
                    src={f.image}
                    alt={`Affiche ${f.name}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.18em] bg-black/60 backdrop-blur border border-white/10 text-white/80">
                    Affiche
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-heading font-semibold text-sm leading-tight">{f.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 mt-1">{f.sector}</p>
                </div>
              </Link>
            </motion.div>
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
            <Link to="/contact" state={{ reason: "general", source: "Page Réalisations — CTA final" }}>
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