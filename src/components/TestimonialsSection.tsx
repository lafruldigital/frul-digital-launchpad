import { AnimatedSection } from "@/components/AnimatedSection";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    company: "Bloom Fashion",
    quote: "FRUL'DIGITAL a transformé notre présence en ligne. Nos ventes ont triplé en 6 mois grâce à leur expertise en publicité digitale.",
    role: "CEO",
  },
  {
    name: "Thomas Dubois",
    company: "TechNova",
    quote: "Leur approche data-driven et leur réactivité font toute la différence. Le meilleur investissement marketing que nous ayons fait.",
    role: "Directeur Marketing",
  },
  {
    name: "Amina Leclerc",
    company: "GreenBite",
    quote: "Le FRUL'LAB AI nous a donné une vision claire de nos forces et faiblesses. Le plan d'action était redoutablement efficace.",
    role: "Fondatrice",
  },
];

export const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[active];

  return (
    <section className="section-darker py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground mt-3">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-surface-dark border border-primary/10 rounded-2xl p-8 md:p-12">
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />

              <p className="text-lg md:text-xl text-surface-dark-foreground/80 leading-relaxed mb-8 text-center italic">
                "{t.quote}"
              </p>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-heading font-bold text-lg">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <p className="font-heading font-semibold text-surface-dark-foreground">{t.name}</p>
                <p className="text-sm text-surface-dark-foreground/50">{t.role}, {t.company}</p>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-surface-dark-foreground/50 hover:border-primary hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === active ? "bg-primary w-6" : "bg-surface-dark-foreground/20"
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
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
