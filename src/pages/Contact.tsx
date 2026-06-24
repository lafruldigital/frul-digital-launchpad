import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedSection, CountUp } from "@/components/AnimatedSection";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Zap, Users, Target, Cpu, Mail, Phone, Clock, ShieldCheck, Lock, Star,
  ChevronDown, ArrowRight, Send, Sparkles, MessageSquare, BarChart3, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/* ───── Particle dots ───── */
const ParticleDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
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

/* ───── FAQ Accordion Item ───── */
const FaqItem = ({ q, a, delay }: { q: string; a: string; delay: number }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="border border-primary/10 rounded-2xl overflow-hidden bg-surface-darker"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
      >
        <span className="text-lg font-heading font-semibold text-surface-dark-foreground pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 text-surface-dark-foreground/55 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
};

/* ───── Quick choice card ───── */
const ChoiceCard = ({ icon: Icon, title, text, cta, delay, onSelect }: {
  icon: React.ElementType; title: string; text: string; cta: string; delay: number; onSelect: () => void;
}) => (
  <AnimatedSection delay={delay} className="h-full">
    <button type="button" onClick={onSelect} className="text-left w-full h-full">
      <div className="bg-surface-darker border border-primary/10 rounded-3xl p-6 sm:p-8 md:p-10 h-full flex flex-col card-hover group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(0_85%_50%/0.12)]">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_hsl(0_85%_50%/0.3)] transition-shadow">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-heading font-bold mb-4">{title}</h3>
        <p className="text-surface-dark-foreground/55 leading-relaxed mb-8 flex-1">{text}</p>
        <Button variant="hero" className="w-full group/btn" asChild={false}>
          <span className="inline-flex items-center justify-center w-full">
            {cta} <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </Button>
      </div>
    </button>
  </AnimatedSection>
);

/* ───── Reassurance item ───── */
const reassuranceItems = [
  { icon: Clock, text: "Réponse sous 24h" },
  { icon: ShieldCheck, text: "Aucun engagement" },
  { icon: Lock, text: "Échange confidentiel" },
  { icon: Sparkles, text: "Analyse personnalisée" },
];

/* ───── Why contact blocks ───── */
const whyBlocks = [
  { icon: Target, title: "Stratégies sur mesure", desc: "Chaque entreprise est unique — votre stratégie doit l'être aussi." },
  { icon: BarChart3, title: "Approche orientée résultats", desc: "Nous parlons performance et ROI, pas promesses vagues." },
  { icon: Users, title: "Accompagnement humain", desc: "Un expert dédié qui comprend votre business et vos enjeux." },
  { icon: Cpu, title: "Technologie avancée", desc: "Propulsé par FRUL'LAB AI pour des décisions data-driven." },
];

/* ═══════════════════ PAGE ═══════════════════ */
const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const location = useLocation();

  type ContactState = {
    reason?: "expert" | "audit" | "premium" | "realisation" | "service" | "temoignage" | "general";
    project?: string;
    service?: string;
    source?: string;
  };

  const stateFromNav = (location.state || null) as ContactState | null;
  const [prefill, setPrefill] = useState<ContactState | null>(stateFromNav);
  const [formKey, setFormKey] = useState(0);

  const objectifMap: Record<NonNullable<ContactState["reason"]>, string> = {
    expert: "autre",
    audit: "visibilite",
    premium: "autre",
    realisation: "branding",
    service: "leads",
    temoignage: "leads",
    general: "autre",
  };

  const buildMessage = (s: ContactState | null): string => {
    if (!s || !s.reason) return "";
    const ctxProject = s.project ? ` "${s.project}"` : "";
    const ctxService = s.service ? ` "${s.service}"` : "";
    const ctxSource = s.source ? ` (depuis : ${s.source})` : "";
    switch (s.reason) {
      case "expert":
        return `Bonjour,\n\nJe souhaite échanger avec un expert FRUL'DIGITAL pour discuter de mes enjeux digitaux${ctxSource}.\n\nMerci de me recontacter pour fixer un créneau.`;
      case "audit":
        return `Bonjour,\n\nJe souhaite recevoir un audit gratuit et personnalisé de ma présence digitale${ctxSource}.\n\nVoici un aperçu de mon activité :`;
      case "premium":
        return `Bonjour,\n\nJe souhaite passer au plan Premium FRUL'LAB${ctxSource} et être accompagné par votre équipe.\n\nPouvez-vous me présenter les prochaines étapes ?`;
      case "realisation":
        return `Bonjour,\n\nJ'ai découvert votre réalisation${ctxProject} et je souhaite discuter d'un projet similaire avec votre équipe.\n\nVoici quelques précisions sur mon besoin :`;
      case "service":
        return `Bonjour,\n\nJe suis intéressé(e) par votre service${ctxService} et je souhaite obtenir plus d'informations${ctxSource}.\n\nVoici le contexte de mon projet :`;
      case "temoignage":
        return `Bonjour,\n\nVos témoignages clients m'ont convaincu(e) et je souhaite démarrer un projet avec FRUL'DIGITAL${ctxSource}.\n\nVoici le contexte de mon besoin :`;
      default:
        return `Bonjour,\n\nJe souhaite être recontacté(e) par FRUL'DIGITAL${ctxSource}.`;
    }
  };

  const defaultObjectif = useMemo(
    () => (prefill?.reason ? objectifMap[prefill.reason] : ""),
    [prefill]
  );
  const defaultMessage = useMemo(() => buildMessage(prefill), [prefill]);

  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const triggerPrefill = (next: ContactState) => {
    setPrefill(next);
    setFormKey((k) => k + 1);
    setTimeout(scrollToForm, 80);
  };

  useEffect(() => {
    if (stateFromNav?.reason) {
      setTimeout(scrollToForm, 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const nom = (formData.get("nom") as string) || "";
    const email = (formData.get("email") as string) || "";
    const telephone = (formData.get("telephone") as string) || "";
    const entreprise = (formData.get("entreprise") as string) || "";
    const site = (formData.get("site") as string) || "";
    const budget = (formData.get("budget") as string) || "";
    const objectif = (formData.get("objectif") as string) || "";
    const message = (formData.get("message") as string) || "";

    const subject = encodeURIComponent(`Nouvelle demande de ${nom} — ${entreprise || "Particulier"}`);
    const body = encodeURIComponent(
      `Nom : ${nom}\nEmail : ${email}\nTéléphone : ${telephone}\nEntreprise : ${entreprise}\nSite web : ${site}\nBudget : ${budget}\nObjectif : ${objectif}\n\nMessage :\n${message}`
    );

    window.open(`mailto:contactfruldigital@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setSending(false);
    toast({ title: "Redirection vers votre boîte mail !", description: "Envoyez l'email pré-rempli pour nous contacter." });
    form.reset();
  };

  const inputClass =
    "w-full bg-surface-dark border border-primary/10 rounded-xl px-5 py-4 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_16px_hsl(0_85%_50%/0.15)] transition-all duration-300 text-base";

  return (
    <div className="min-h-screen bg-surface-darker text-surface-dark-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative animated-gradient-bg pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <ParticleDots />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.25em]">Contact</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold mt-4 mb-6 leading-tight">
              Parlons de votre <span className="gradient-text">croissance</span>.
            </h1>
            <p className="text-lg md:text-xl text-surface-dark-foreground/55 max-w-2xl mx-auto leading-relaxed">
              Chaque grande réussite commence par une conversation. Dites-nous où vous voulez aller — nous vous aidons à y parvenir.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CHOIX RAPIDE ── */}
      <section className="section-dark py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ChoiceCard
              icon={Zap}
              title="Obtenir un audit gratuit"
              text="Recevez une analyse claire de votre présence digitale et découvrez vos opportunités de croissance."
              cta="Lancer mon audit"
              delay={0}
            />
            <AnimatedSection delay={0.1} className="h-full">
              <a
                href="https://calendly.com/lafrul-digital/rendez-vous"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-surface-darker border border-primary/10 rounded-3xl p-6 sm:p-8 md:p-10 h-full flex flex-col card-hover group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_hsl(0_85%_50%/0.12)]">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_hsl(0_85%_50%/0.3)] transition-shadow">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4">Parler à un expert</h3>
                  <p className="text-surface-dark-foreground/55 leading-relaxed mb-8 flex-1">Un échange rapide pour comprendre vos enjeux et identifier les meilleures stratégies.</p>
                  <Button variant="hero" className="w-full group/btn">
                    Prendre rendez-vous <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section className="section-darker py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Formulaire</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4">
              Dites-nous en plus sur <span className="gradient-text">votre projet</span>
            </h2>
          </AnimatedSection>

          <form key={formKey} onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatedSection delay={0}>
                <input type="text" name="nom" placeholder="Nom *" required className={inputClass} maxLength={100} />
              </AnimatedSection>
              <AnimatedSection delay={0.05}>
                <input type="email" name="email" placeholder="Email professionnel *" required className={inputClass} maxLength={255} />
              </AnimatedSection>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatedSection delay={0.1}>
                <input type="tel" name="telephone" placeholder="Téléphone" className={inputClass} maxLength={20} />
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <input type="text" name="entreprise" placeholder="Nom de l'entreprise" className={inputClass} maxLength={100} />
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.2}>
              <input type="url" name="site" placeholder="Site web (optionnel)" className={inputClass} maxLength={200} />
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatedSection delay={0.25}>
                <select name="budget" className={inputClass + " appearance-none"} defaultValue="">
                  <option value="" disabled>Budget estimé</option>
                  <option value="< 1 000€">&lt; 1 000€</option>
                  <option value="1 000€ - 3 000€">1 000€ - 3 000€</option>
                  <option value="3 000€ - 5 000€">3 000€ - 5 000€</option>
                  <option value="5 000€ - 10 000€">5 000€ - 10 000€</option>
                  <option value="> 10 000€">&gt; 10 000€</option>
                </select>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <select name="objectif" className={inputClass + " appearance-none"} defaultValue={defaultObjectif}>
                  <option value="" disabled>Objectif principal</option>
                  <option value="leads">Générer des leads</option>
                  <option value="ventes">Augmenter les ventes</option>
                  <option value="visibilite">Améliorer la visibilité</option>
                  <option value="branding">Développer ma marque</option>
                  <option value="autre">Autre</option>
                </select>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.35}>
              <textarea
                name="message"
                placeholder="Votre message *"
                required
                rows={6}
                className={inputClass + " resize-none"}
                maxLength={1000}
                defaultValue={defaultMessage}
              />
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full text-lg py-6 glow-red"
                disabled={sending}
              >
                {sending ? (
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                    Envoi en cours...
                  </motion.span>
                ) : (
                  <>Recevoir mon audit <Send className="w-5 h-5 ml-2" /></>
                )}
              </Button>
            </AnimatedSection>
          </form>

          {/* Réassurance */}
          <div className="max-w-3xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {reassuranceItems.map((r, i) => (
              <AnimatedSection key={r.text} delay={0.1 * i}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <r.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-surface-dark-foreground/60 font-medium">{r.text}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS CONTACTER ── */}
      <section className="section-dark py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Avantages</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4">
              Pourquoi nous <span className="gradient-text">contacter</span> ?
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyBlocks.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <div className="bg-surface-darker border border-primary/10 rounded-2xl p-8 card-hover h-full text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-3">{b.title}</h3>
                  <p className="text-[15px] text-surface-dark-foreground/50 leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT DIRECT ── */}
      <section className="section-darker py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="bg-surface-dark border border-primary/10 rounded-2xl p-8 card-hover text-center h-full">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Email</h3>
                <a href="mailto:contactfruldigital@gmail.com" className="text-primary hover:text-primary/80 transition-colors text-sm">
                  contactfruldigital@gmail.com
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-surface-dark border border-primary/10 rounded-2xl p-8 card-hover text-center h-full">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Téléphone</h3>
                <div className="flex flex-col gap-1">
                  <a href="tel:0652237736" className="text-surface-dark-foreground/60 hover:text-primary transition-colors">06 52 23 77 36</a>
                  <a href="tel:0630563019" className="text-surface-dark-foreground/60 hover:text-primary transition-colors">06 30 56 30 19</a>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <a
                href="https://calendly.com/lafrul-digital/rendez-vous"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="bg-surface-dark border border-primary/10 rounded-2xl p-8 card-hover text-center h-full hover:border-primary/30 hover:shadow-[0_0_24px_hsl(0_85%_50%/0.15)] transition-all duration-300">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">Rendez-vous</h3>
                  <span className="text-primary hover:text-primary/80 transition-colors text-sm">
                    Réserver un créneau
                  </span>
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PREUVE SOCIALE ── */}
      <section className="section-dark py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-heading font-bold mb-2">
              <CountUp end={4.9} suffix="/5" /> — <CountUp end={150} suffix="+" /> entreprises accompagnées
            </p>
            <p className="text-surface-dark-foreground/50 max-w-lg mx-auto italic">
              "FRUL'DIGITAL a transformé notre présence en ligne. Des résultats concrets, une équipe réactive et à l'écoute."
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-darker py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">FAQ</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-4">
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-4">
            <FaqItem q="Combien de temps pour être contacté ?" a="Nous répondons sous 24h, du lundi au vendredi. Les demandes urgentes sont traitées en priorité." delay={0} />
            <FaqItem q="L'audit est-il vraiment gratuit ?" a="Oui, 100% gratuit et sans engagement. C'est notre manière de vous montrer ce que nous pouvons accomplir ensemble." delay={0.1} />
            <FaqItem q="Travaillez-vous avec tous les secteurs ?" a="Nous sélectionnons les projets où nous pouvons générer un réel impact : e-commerce, startups, PME ambitieuses, business locaux." delay={0.2} />
            <FaqItem q="Quel budget prévoir ?" a="Nos stratégies sont adaptées à vos ambitions. Nous proposons des solutions à partir de 1 000€, toujours avec un objectif de ROI clair." delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
              Votre croissance commence <span className="gradient-text">maintenant</span>.
            </h2>
            <p className="text-lg text-surface-dark-foreground/55 max-w-xl mx-auto mb-10">
              Ne laissez pas vos concurrents prendre de l'avance. Passez à l'action.
            </p>
            <Link to="/frul-lab#analyse-ia">
              <Button variant="hero" size="lg" className="text-lg px-10 py-6 glow-red">
                Obtenir mon audit gratuit
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
