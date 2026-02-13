import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection, CountUp } from "@/components/AnimatedSection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, TrendingUp, Shield, BarChart3, Users, Eye, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import omarPhoto from "@/assets/omar-founder.png";
import gabrielPhoto from "@/assets/gabriel-ceo.jpg";

/* ───── Particle dots background ───── */
const ParticleDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/20"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.4, 1] }}
        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
      />
    ))}
  </div>
);

/* ───── Stat card ───── */
const StatCard = ({ value, suffix, prefix, label, delay }: { value: number; suffix?: string; prefix?: string; label: string; delay: number }) => (
  <AnimatedSection delay={delay}>
    <div className="bg-surface-darker border border-primary/10 rounded-2xl p-8 text-center card-hover group">
      <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 group-hover:drop-shadow-[0_0_12px_hsl(0_85%_50%/0.5)] transition-all">
        <CountUp end={value} prefix={prefix} suffix={suffix} />
      </p>
      <p className="text-base text-surface-dark-foreground/55">{label}</p>
    </div>
  </AnimatedSection>
);

/* ───── Founder card (full bio) ───── */
const FounderCard = ({ name, role, badge, photo, bio, delay }: {
  name: string; role: string; badge: string; photo: string; bio: React.ReactNode; delay: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="bg-surface-darker border border-primary/10 rounded-3xl overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(0_85%_50%/0.12)]"
    >
      {/* Photo */}
      <div className="relative overflow-hidden h-80 md:h-[420px]">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-darker via-surface-darker/30 to-transparent" />
        <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </span>
      </div>

      {/* Info */}
      <div className="p-8 md:p-10">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-surface-dark-foreground">{name}</h3>
        <p className="text-primary font-medium text-lg mb-6">{role}</p>
        <div className="space-y-4 text-[15px] md:text-base text-surface-dark-foreground/60 leading-relaxed">
          {bio}
        </div>
      </div>
    </motion.div>
  );
};

/* ───── Value card ───── */
const values = [
  { icon: Heart, title: "Authenticité", desc: "Nous construisons des relations durables basées sur la confiance et la transparence." },
  { icon: Target, title: "Clarté", desc: "Chaque action a un objectif mesurable et un impact concret sur votre business." },
  { icon: TrendingUp, title: "Croissance", desc: "Votre performance est notre priorité — chaque décision vise vos résultats." },
  { icon: Shield, title: "Fiabilité", desc: "Transparence et engagement total, zéro zone d'ombre." },
];

const trustBlocks = [
  { icon: BarChart3, title: "Approche data-driven", desc: "Chaque décision est guidée par les données, pas par des suppositions." },
  { icon: Target, title: "Stratégies sur mesure", desc: "Pas de template — une approche 100% adaptée à votre marché." },
  { icon: Users, title: "Accompagnement humain", desc: "Un interlocuteur dédié qui comprend votre business." },
  { icon: Eye, title: "Résultats mesurables", desc: "Reporting clair, KPIs définis, ROI prouvé." },
];

/* ═══════════════════ PAGE ═══════════════════ */
const About = () => {
  return (
    <div className="min-h-screen bg-surface-darker text-surface-dark-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative animated-gradient-bg pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <ParticleDots />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.25em]">Qui sommes-nous</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mt-4 mb-6 leading-tight">
              À propos de <span className="gradient-text">FRUL'DIGITAL</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 max-w-2xl mx-auto leading-relaxed">
              Une équipe passionnée par le digital, dédiée à la croissance de votre entreprise.
            </p>
            <div className="mt-8">
              <a href="#vision" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
                Découvrir notre vision <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-dark py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value={150} suffix="+" label="Clients satisfaits" delay={0} />
            <StatCard value={200} suffix="+" label="Projets livrés" delay={0.1} />
            <StatCard value={250} suffix="%" label="ROI moyen" delay={0.2} />
            <StatCard value={4.9} suffix="/5" label="Note moyenne" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── HISTOIRE ── */}
      <section className="section-darker py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left visual */}
            <AnimatedSection>
              <div className="relative rounded-3xl overflow-hidden bg-surface-dark border border-primary/10 p-10 flex items-center justify-center min-h-[320px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center glow-red">
                    <TrendingUp className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-3xl font-heading font-bold gradient-text">Depuis 2025</p>
                  <p className="text-surface-dark-foreground/50 mt-2">Nous accélérons la croissance digitale</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right text */}
            <AnimatedSection delay={0.15}>
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Notre histoire</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6 leading-tight">
                Une conviction simple : le digital doit être un <span className="gradient-text">accélérateur</span>, pas un obstacle.
              </h2>
              <div className="space-y-5 text-lg text-surface-dark-foreground/55 leading-relaxed">
                <p>
                  FRUL'DIGITAL est né d'un constat : trop d'entreprises investissent dans le digital sans réelle stratégie, sans données fiables, sans vision claire.
                </p>
                <p>
                  Nous avons créé une agence différente — une agence obsédée par les résultats, guidée par la data, et capable de transformer chaque euro investi en croissance mesurable.
                </p>
                <p>
                  Notre ambition ? Devenir le partenaire digital de référence pour les entreprises ambitieuses qui veulent prendre une longueur d'avance.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FONDATEURS ── */}
      <section className="section-dark py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">L'équipe fondatrice</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4">
              Les visionnaires derrière <span className="gradient-text">FRUL'DIGITAL</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Omar à gauche */}
            <FounderCard
              name="Omar (Frulux)"
              role="Fondateur — Vision & Innovation"
              badge="Fondateur"
              photo={gabrielPhoto}
              delay={0}
              bio={
                <>
                  <p><span className="font-semibold text-surface-dark-foreground/80">Frulux</span> est né d'une conviction simple : dans un monde où tout va vite, seuls ceux qui comprennent réellement les codes du digital peuvent créer un <span className="font-semibold text-surface-dark-foreground/80">impact durable</span>.</p>
                  <p>Je m'appelle Omar, plus connu sous le nom de <span className="font-semibold text-surface-dark-foreground/80">Frulux</span> — d'où le nom de notre entreprise FRUL'DIGITAL.</p>
                  <p>Fondateur de FRUL'DIGITAL et créateur de communautés réunissant <span className="font-semibold text-surface-dark-foreground/80">plusieurs millions d'abonnés</span>, j'ai exploré pendant des années l'univers des réseaux sociaux comme un véritable laboratoire à ciel ouvert.</p>
                  <p>J'y ai appris :</p>
                  <ul className="space-y-1 pl-4">
                    <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />comment <span className="font-semibold text-surface-dark-foreground/80">capter l'attention</span></li>
                    <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />comment transformer une idée en <span className="font-semibold text-surface-dark-foreground/80">mouvement</span></li>
                    <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />comment bâtir une <span className="font-semibold text-surface-dark-foreground/80">marque qui résonne</span></li>
                  </ul>
                  <p>Ce parcours m'a permis de maîtriser les leviers qui font la différence : <span className="font-semibold text-surface-dark-foreground/80">stratégie, marketing, création de contenu, digital design</span>, mais aussi la compréhension fine de ce qui fait réellement fonctionner une entreprise en ligne.</p>
                  <p>J'ai accompagné des créateurs, des entrepreneurs et des marques à façonner leur image, raconter leur histoire et développer leur audience.</p>
                  <p className="text-primary/80 font-medium">FRUL'DIGITAL est la continuité naturelle de cette aventure.</p>
                  <p>Une startup pensée pour aider celles et ceux qui veulent créer, innover et s'imposer dans l'écosystème numérique.</p>
                  <p>Ici, nous transformons :</p>
                  <ul className="space-y-1 pl-4">
                    <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />l'expérience en <span className="font-semibold text-surface-dark-foreground/80">solutions</span></li>
                    <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />les idées en <span className="font-semibold text-surface-dark-foreground/80">stratégies</span></li>
                    <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />les visions en <span className="font-semibold text-surface-dark-foreground/80">résultats concrets</span></li>
                  </ul>
                  <p className="italic text-surface-dark-foreground/50 border-l-2 border-primary/50 pl-4 mt-4">L'histoire continue — et elle ne fait que commencer.</p>
                </>
              }
            />
            {/* Gabriel à droite */}
            <FounderCard
              name="Gabriel"
              role="CEO — Stratégie & Croissance"
              badge="CEO"
              photo={omarPhoto}
              delay={0.15}
              bio={
                <>
                  <p>Je suis Gabriel, <span className="font-semibold text-surface-dark-foreground/80">CEO</span>.</p>
                  <p>Calme, à l'écoute, mais avec une <span className="font-semibold text-surface-dark-foreground/80">vision très claire</span> : aider les entreprises à exister dans un monde où le digital n'attend personne.</p>
                  <p>Je n'ai pas cherché les projecteurs. J'ai cherché à <span className="font-semibold text-surface-dark-foreground/80">comprendre</span>.</p>
                  <p>Comprendre comment les réseaux évoluent, comment une stratégie fonctionne, comment un contenu peut transformer un simple regard en client. Avec le temps, j'ai développé une expertise concrète : <span className="font-semibold text-surface-dark-foreground/80">marketing, stratégie, création, vente</span>. Pas de théorie — du terrain.</p>
                  <p>J'ai vu trop d'entreprises passer à côté de leur potentiel parce qu'elles n'avaient pas les bons outils ou la bonne direction.</p>
                  <p className="text-primary/80 font-medium">C'est là que j'interviens.</p>
                  <p>En tant que CEO, je définis notre vision, j'oriente notre stratégie et j'accompagne nos clients pour qu'ils puissent enfin prendre leur place en ligne — celle qu'ils méritent.</p>
                  <p>Mon approche est simple : <span className="font-semibold text-surface-dark-foreground/80">authenticité, clarté, croissance, fiabilité</span>.</p>
                  <p>Pas de blabla, pas de faux semblants. Juste des résultats et une vraie compréhension du digital.</p>
                  <p className="italic text-surface-dark-foreground/50 border-l-2 border-primary/50 pl-4 mt-4">Le futur appartient à ceux qui s'y préparent. Et je suis là pour les y conduire.</p>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="section-darker py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Nos valeurs</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4">
              Ce qui nous <span className="gradient-text">définit</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-8 card-hover text-center h-full">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <v.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-3">{v.title}</h3>
                  <p className="text-[15px] text-surface-dark-foreground/50 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section id="vision" className="section-dark py-24 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Notre vision</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6 leading-tight">
              Construire les leaders digitaux de <span className="gradient-text">demain</span>.
            </h2>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed">
              Nous aidons les entreprises ambitieuses à prendre une longueur d'avance grâce à des stratégies intelligentes et des technologies innovantes — propulsées par notre propre IA.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── POURQUOI NOUS FAIRE CONFIANCE ── */}
      <section className="section-darker py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Confiance</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4">
              Pourquoi nous faire <span className="gradient-text">confiance</span> ?
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {trustBlocks.map((t, i) => (
              <AnimatedSection key={t.title} delay={i * 0.1}>
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-7 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <t.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2">{t.title}</h3>
                  <p className="text-[15px] text-surface-dark-foreground/50 leading-relaxed">{t.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section className="section-dark py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Culture</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-6">
              Plus qu'une agence — un <span className="gradient-text">partenaire</span>.
            </h2>
            <p className="text-lg text-surface-dark-foreground/55 leading-relaxed">
              Chez FRUL'DIGITAL, chaque projet est un engagement commun. Nous travaillons main dans la main avec nos clients, avec proximité, ambition et exigence — pour construire ensemble des succès durables.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
              Et si nous construisions votre <span className="gradient-text">succès</span> ensemble ?
            </h2>
            <p className="text-lg text-surface-dark-foreground/55 max-w-xl mx-auto mb-10">
              Faites le premier pas vers une croissance digitale mesurable.
            </p>
            <Button variant="hero" size="lg" className="text-lg px-10 py-6 glow-red">
              Obtenir un audit gratuit
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
