import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { AlertCircle, Eye, Layers, MousePointerClick } from "lucide-react";

const problems = [
  { icon: Eye, title: "Votre site ne donne pas assez confiance", text: "Design daté, lenteur, message flou — vos visiteurs partent avant d'agir." },
  { icon: Layers, title: "Vos réseaux ne reflètent pas votre vrai niveau", text: "Un feed irrégulier ou amateur tire votre image vers le bas." },
  { icon: AlertCircle, title: "Votre marque manque de cohérence", text: "Identité, ton, visuels : tout doit converger pour marquer les esprits." },
  { icon: MousePointerClick, title: "Vos visiteurs ne deviennent pas des clients", text: "Sans parcours pensé pour convertir, le trafic ne sert à rien." },
];

export const ProblemSection = () => (
  <section className="relative section-darker py-28 md:py-36 overflow-hidden">
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div className="container mx-auto px-4 relative">
      <AnimatedSection className="text-center max-w-4xl mx-auto mb-20">
        <span className="text-primary text-xs font-semibold uppercase tracking-[0.3em]">Le constat</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-5 mb-6 leading-[1.05] text-balance">
          Votre entreprise existe. Mais est-ce qu'elle <span className="gradient-text">marque les esprits ?</span>
        </h2>
        <p className="text-lg text-surface-dark-foreground/55 leading-relaxed">
          Aujourd'hui, avoir un site ou poster sur Instagram ne suffit plus. Vos clients jugent
          votre sérieux, votre niveau et votre valeur en quelques secondes. Si votre image digitale
          ne suit pas, vous perdez des opportunités avant même d'avoir parlé.
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mobile-carousel">
        {problems.map((p, i) => (
          <AnimatedSection key={p.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative h-full p-7 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_hsl(0_85%_50%/0.5)]"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%, hsl(0 85% 50% / 0.12), transparent 70%)" }}
              />
              <div className="relative">
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-surface-dark-foreground text-base leading-snug mb-3">{p.title}</h3>
                <p className="text-sm text-surface-dark-foreground/55 leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);