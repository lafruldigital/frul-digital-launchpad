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
    <section className="section-darker py-28 md:py-32">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-20">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Témoignages</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-surface-dark border border-primary/10 rounded-2xl p-10 md:p-16">
              <Quote className="w-12 h-12 text-primary/20 absolute top-8 left-8" />

              <p className="text-xl md:text-2xl text-surface-dark-foreground/80 leading-relaxed mb-10 text-center italic">
                "{t.quote}"
              </p>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-heading font-bold text-xl">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <p className="font-heading font-semibold text-surface-dark-foreground text-lg">{t.name}</p>
                <p className="text-base text-surface-dark-foreground/50 mt-1">{t.role}, {t.company}</p>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-surface-dark-foreground/50 hover:border-primary hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === active ? "bg-primary w-8" : "bg-surface-dark-foreground/20"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-surface-dark-foreground/50 hover:border-primary hover:text-primary transition-colors"
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
