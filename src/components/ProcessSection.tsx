import { AnimatedSection } from "@/components/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Compass, Palette, Rocket, LineChart } from "lucide-react";

const steps = [
  { icon: Search, number: "01", title: "Diagnostic", description: "On analyse votre présence actuelle, votre marché, votre image et vos points de friction." },
  { icon: Compass, number: "02", title: "Stratégie", description: "On définit une direction claire : positionnement, messages, parcours client et priorités." },
  { icon: Palette, number: "03", title: "Création", description: "On conçoit votre site, vos visuels, vos contenus et votre univers digital." },
  { icon: Rocket, number: "04", title: "Déploiement", description: "On met en ligne, on connecte les outils, on prépare les campagnes et les parcours." },
  { icon: LineChart, number: "05", title: "Optimisation", description: "On mesure, on ajuste et on améliore pour transformer votre présence en actif durable." },
];

export const ProcessSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative section-dark py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">Notre méthode</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-5 leading-[1.05]">
            Notre protocole de <span className="gradient-text">transformation digitale.</span>
          </h2>
        </AnimatedSection>

        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Static rail */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-white/[0.06]" />
          {/* Animated red rail */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-primary via-primary to-primary/0 shadow-[0_0_16px_hsl(0_85%_50%/0.6)]"
          />

          <div className="space-y-10 md:space-y-14">
            {steps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <AnimatedSection key={step.number} delay={i * 0.08}>
                  <div className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${right ? "md:[&>*:first-child]:col-start-2" : ""}`}>
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                      <motion.div
                        whileInView={{ scale: [0.6, 1.3, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-4 h-4 rounded-full bg-primary border-2 border-[hsl(0_0%_4%)] shadow-[0_0_16px_hsl(0_85%_55%)]"
                      />
                    </div>
                    <div className={`pl-16 md:pl-0 ${right ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="inline-block w-full p-7 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
                      >
                        <div className={`flex items-center gap-4 mb-4 ${right ? "" : "md:flex-row-reverse"}`}>
                          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <step.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary/50">{step.number}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-surface-dark-foreground mb-3">{step.title}</h3>
                        <p className="text-sm md:text-base text-surface-dark-foreground/55 leading-relaxed">{step.description}</p>
                      </motion.div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
