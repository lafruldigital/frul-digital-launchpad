import { AnimatedSection } from "@/components/AnimatedSection";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Marc D.",
    company: "Bloom Fashion",
    quote: "On hésitait à investir dans la pub en ligne, mais l'équipe nous a vraiment bien guidés. En 4 mois, nos ventes en ligne ont doublé. Honnêtement, on ne s'y attendait pas.",
    role: "Gérant",
    rating: 5,
    sector: "E-commerce",
  },
  {
    name: "Sarah L.",
    company: "TechNova",
    quote: "Ce que j'apprécie le plus, c'est qu'ils ne vendent pas du rêve. Ils nous ont montré les données, expliqué chaque décision. Le ROI parle de lui-même.",
    role: "Directrice Marketing",
    rating: 5,
    sector: "SaaS",
  },
  {
    name: "Karim B.",
    company: "GreenBite",
    quote: "Le FRUL'LAB AI nous a ouvert les yeux sur des trucs qu'on ignorait complètement. Le plan d'action était concret, pas juste un PDF de 50 pages qu'on ne lit jamais.",
    role: "Co-fondateur",
    rating: 5,
    sector: "Food Tech",
  },
  {
    name: "Julie M.",
    company: "Studio Déco",
    quote: "Nos réseaux sociaux étaient un désert avant. Maintenant on reçoit des messages de clients potentiels presque tous les jours. Le changement a été progressif mais très net.",
    role: "Fondatrice",
    rating: 5,
    sector: "Décoration",
  },
  {
    name: "Antoine R.",
    company: "MedConnect",
    quote: "Ils ont su comprendre notre secteur, qui n'est pas le plus simple. Les leads qu'on reçoit sont vraiment qualifiés, c'est ça qui change tout pour nous.",
    role: "CEO",
    rating: 5,
    sector: "Santé",
  },
  {
    name: "Fatima Z.",
    company: "Le Jardin d'Épices",
    quote: "Depuis qu'on travaille avec eux, nos réservations en ligne ont explosé. Et le suivi est top, on a un vrai interlocuteur qui connaît notre resto.",
    role: "Gérante",
    rating: 4,
    sector: "Restauration",
  },
  {
    name: "Nicolas P.",
    company: "FormaPro",
    quote: "On a testé 2 agences avant. La différence avec FRUL'DIGITAL c'est la transparence : on voit exactement où va notre budget et ce que ça rapporte.",
    role: "Directeur",
    rating: 5,
    sector: "Formation",
  },
  {
    name: "Clara V.",
    company: "Skin Therapy",
    quote: "Je recommande les yeux fermés. L'équipe est réactive, les résultats sont là, et surtout ils s'adaptent à notre rythme. Pas de pression inutile.",
    role: "Esthéticienne",
    rating: 5,
    sector: "Beauté",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-surface-dark-foreground/20"}`}
      />
    ))}
  </div>
);

const Avatar = ({ name }: { name: string }) => {
  const colors = [
    "from-red-500 to-orange-500",
    "from-primary to-red-400",
    "from-orange-500 to-yellow-500",
    "from-red-600 to-rose-500",
    "from-rose-500 to-pink-500",
    "from-red-500 to-red-700",
    "from-orange-600 to-red-500",
    "from-rose-600 to-red-400",
  ];
  const colorIdx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[colorIdx]} flex items-center justify-center flex-shrink-0`}>
      <span className="text-primary-foreground font-heading font-bold text-lg">
        {name.charAt(0)}
      </span>
    </div>
  );
};

export const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const next = useCallback(() => setActive((a) => (a + 1) % totalPages), [totalPages]);
  const prev = () => setActive((a) => (a - 1 + totalPages) % totalPages);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const currentTestimonials = testimonials.slice(
    active * itemsPerPage,
    active * itemsPerPage + itemsPerPage
  );

  return (
    <section id="testimonials" className="section-darker py-28 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Témoignages</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
          <p className="text-lg text-surface-dark-foreground/50 mt-4 max-w-2xl mx-auto">
            +150 entreprises nous font confiance. Voici leurs retours.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {currentTestimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-surface-dark border border-primary/10 rounded-2xl p-8 flex flex-col justify-between hover:border-primary/25 transition-colors duration-300"
                >
                  <div>
                    <Stars count={t.rating} />
                    <p className="text-base text-surface-dark-foreground/75 leading-relaxed mt-5 mb-8">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar name={t.name} />
                    <div>
                      <p className="font-heading font-semibold text-surface-dark-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-surface-dark-foreground/45">{t.role}, {t.company}</p>
                      <span className="inline-block mt-1 text-[11px] text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full">{t.sector}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-surface-dark-foreground/50 hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? "bg-primary w-8" : "bg-surface-dark-foreground/20 w-2.5"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-surface-dark-foreground/50 hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
