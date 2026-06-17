import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Layers, Globe2, Sparkles, FileText, Brain, RefreshCw } from "lucide-react";

const credibility = [
  { icon: Globe2, label: "Identité digitale complète", text: "Logo, charte, ton, univers." },
  { icon: Layers, label: "Expérience web immersive", text: "Sites premium et animés." },
  { icon: Sparkles, label: "Système de conversion", text: "Pensé pour transformer." },
  { icon: FileText, label: "Stratégie de contenu", text: "Visibilité et crédibilité." },
  { icon: Brain, label: "Audit IA", text: "Diagnostic intelligent." },
  { icon: RefreshCw, label: "Refonte premium", text: "Réinventer votre image." },
];

export const CredibilityBar = () => (
  <section className="relative section-darker py-24 md:py-32 overflow-hidden border-y border-primary/10">
    <div className="container mx-auto px-4 relative">
      <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">Notre savoir-faire</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-surface-dark-foreground mt-5 leading-tight">
          Des expertises concrètes au service de <span className="gradient-text">votre image</span>
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {credibility.map((c, i) => (
          <AnimatedSection key={c.label} delay={(i % 3) * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group h-full p-5 md:p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_hsl(0_85%_50%/0.4)] transition-shadow">
                  <c.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-surface-dark-foreground text-sm md:text-base">{c.label}</h3>
                  <p className="text-xs md:text-sm text-surface-dark-foreground/50 mt-1">{c.text}</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);
