import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import frulLabAi from "@/assets/frul-lab-ai.png";

const GaugeBar = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-surface-dark-foreground/60">{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-primary font-heading font-bold"
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-surface-dark overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(0 85% 50%), hsl(15 90% 55%))" }}
        />
      </div>
    </div>
  );
};

/* ============================================================
   PREMIUM HOLOGRAPHIC BRAIN SCENE
   - Rotating 3D-feel brain with depth tilt + levitation
   - Holographic glow, scan lines, energy pulses
   - Orbital HUD rings, floating data cards, particles
   ============================================================ */

const TickingNumber = ({ base, jitter = 2, decimals = 0, suffix = "" }: { base: number; jitter?: number; decimals?: number; suffix?: string }) => {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setV(base + (Math.random() - 0.5) * 2 * jitter);
    }, 900 + Math.random() * 600);
    return () => clearInterval(id);
  }, [base, jitter]);
  return <span>{v.toFixed(decimals)}{suffix}</span>;
};

const MiniGraph = () => {
  const [pts, setPts] = useState<number[]>(() => Array.from({ length: 20 }, () => 30 + Math.random() * 40));
  useEffect(() => {
    const id = setInterval(() => {
      setPts((prev) => [...prev.slice(1), 30 + Math.random() * 40]);
    }, 700);
    return () => clearInterval(id);
  }, []);
  const d = pts.map((y, i) => `${(i / (pts.length - 1)) * 100},${y}`).join(" ");
  return (
    <svg viewBox="0 0 100 80" className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(0 85% 55%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(0 85% 55%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,80 ${d} 100,80`} fill="url(#g-area)" />
      <polyline points={d} fill="none" stroke="hsl(0 85% 60%)" strokeWidth="1.2" />
    </svg>
  );
};

const HolographicBrain = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 60, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-15, 15]), { stiffness: 60, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full aspect-square max-w-[560px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* ambient halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle at 50% 50%, hsl(0 85% 50% / 0.35), transparent 60%)" }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbital rings (SVG) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="ring-grad" x1="0" x2="1">
              <stop offset="0%" stopColor="hsl(0 85% 55%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(0 85% 60%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(0 85% 55%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="200" rx="190" ry="60" fill="none" stroke="url(#ring-grad)" strokeWidth="1" />
          <circle cx="390" cy="200" r="3" fill="hsl(0 85% 60%)" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <ellipse cx="200" cy="200" rx="170" ry="170" fill="none" stroke="hsl(0 85% 55% / 0.25)" strokeDasharray="2 6" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="140" fill="none" stroke="hsl(0 85% 55% / 0.18)" strokeWidth="0.8" />
          <circle cx="200" cy="60" r="4" fill="hsl(0 85% 65%)" />
          <circle cx="340" cy="200" r="2" fill="hsl(0 85% 65%)" />
          <circle cx="200" cy="340" r="3" fill="hsl(0 85% 65%)" />
        </svg>
      </motion.div>

      {/* Brain core - rotating, levitating, with depth tilt */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="relative w-[70%] h-[70%]"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* spinning rotation */}
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <img
              src={frulLabAi}
              alt="FRUL'LAB AI - Cerveau IA holographique"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_hsl(0_85%_50%/0.7)]"
              style={{ filter: "contrast(1.05) saturate(1.1)" }}
            />
            {/* energy overlay scan */}
            <motion.div
              aria-hidden
              className="absolute inset-0 mix-blend-screen pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, hsl(0 90% 60% / 0.35) 50%, transparent 100%)",
                maskImage: "radial-gradient(circle, black 60%, transparent 75%)",
              }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
            {/* pulse glow */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "inset 0 0 80px hsl(0 90% 55% / 0.5)",
              }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const radius = 42 + (i % 3) * 4;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        return (
          <motion.div
            key={i}
            aria-hidden
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{ left: `${x}%`, top: `${y}%`, boxShadow: "0 0 8px hsl(0 85% 60%)" }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
            transition={{ duration: 2 + (i % 5) * 0.3, repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}

      {/* Connection lines to data labels */}
      <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line x1="80" y1="90" x2="160" y2="160" stroke="hsl(0 85% 60% / 0.7)" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.line x1="320" y1="120" x2="240" y2="170" stroke="hsl(0 85% 60% / 0.7)" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 0.6 }} />
        <motion.line x1="330" y1="300" x2="240" y2="240" stroke="hsl(0 85% 60% / 0.7)" strokeWidth="0.8"
          initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1.2 }} />
      </svg>

      {/* HUD data cards */}
      <motion.div
        className="absolute top-[6%] left-[2%] bg-surface-dark/80 backdrop-blur-md border border-primary/30 rounded-lg px-3 py-2 text-[10px] font-mono text-surface-dark-foreground/80 shadow-[0_0_20px_hsl(0_85%_50%/0.25)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-primary/80 mb-0.5">NEURAL_LOAD</div>
        <div className="text-base font-heading font-bold text-primary">
          <TickingNumber base={87.4} jitter={1.5} decimals={1} suffix="%" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[12%] right-[2%] w-[34%] bg-surface-dark/80 backdrop-blur-md border border-primary/30 rounded-lg p-2 shadow-[0_0_20px_hsl(0_85%_50%/0.25)]"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between text-[9px] font-mono text-surface-dark-foreground/70 mb-1">
          <span>DATA_STREAM</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />LIVE
          </span>
        </div>
        <MiniGraph />
      </motion.div>

      <motion.div
        className="absolute bottom-[8%] left-[3%] bg-surface-dark/80 backdrop-blur-md border border-primary/30 rounded-lg px-3 py-2 text-[10px] font-mono text-surface-dark-foreground/80 shadow-[0_0_20px_hsl(0_85%_50%/0.25)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="text-primary/80 mb-0.5">SYNAPSES/S</div>
        <div className="text-base font-heading font-bold text-primary">
          <TickingNumber base={1284} jitter={40} />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[10%] right-[4%] bg-surface-dark/80 backdrop-blur-md border border-primary/30 rounded-lg px-3 py-2 text-[10px] font-mono shadow-[0_0_20px_hsl(0_85%_50%/0.25)]"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div className="text-primary/80 mb-0.5">ANALYSE</div>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span className="text-surface-dark-foreground/90">EN COURS...</span>
        </div>
      </motion.div>

      {/* Corner HUD brackets */}
      {[
        { c: "top-0 left-0", r: "border-t-2 border-l-2" },
        { c: "top-0 right-0", r: "border-t-2 border-r-2" },
        { c: "bottom-0 left-0", r: "border-b-2 border-l-2" },
        { c: "bottom-0 right-0", r: "border-b-2 border-r-2" },
      ].map((b, i) => (
        <div key={i} className={`absolute ${b.c} w-8 h-8 ${b.r} border-primary/50`} />
      ))}
    </div>
  );
};

export const FrulLabSection = () => {
  return (
    <section id="frul-lab" className="relative py-28 md:py-36 overflow-hidden section-darker">
      {/* Glow backgrounds */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Holographic Brain Scene */}
          <AnimatedSection>
            <div className="relative">
              <HolographicBrain />
              <div className="absolute -top-2 right-4 z-20 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-heading font-bold text-xs flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3.5 h-3.5" /> Powered by AI
              </div>

              {/* Animated gauges overlay - kept below brain */}
              <div className="mt-6 bg-surface-dark/90 backdrop-blur-xl border border-primary/20 rounded-xl p-5 space-y-3 shadow-2xl">
                <GaugeBar label="SEO Score" value={87} delay={0.2} />
                <GaugeBar label="Social Media" value={62} delay={0.4} />
                <GaugeBar label="Maturité digitale" value={74} delay={0.6} />
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Produit signature</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mb-8">
              FRUL'LAB <span className="gradient-text">AI</span>
            </h2>

            <p className="text-lg md:text-xl text-surface-dark-foreground/55 leading-relaxed mb-8">
              Notre agent IA capable d'analyser votre présence digitale, de calculer votre score de maturité
              et de générer un plan d'action personnalisé pour accélérer votre croissance.
            </p>

            <ul className="space-y-4 mb-10">
              {["Analyse complète de votre présence en ligne", "Score de maturité digitale", "Plan d'action personnalisé", "Recommandations IA en temps réel"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-surface-dark-foreground/65 text-lg">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/frul-lab#analyse-ia">
              <Button variant="hero" size="lg" className="px-10 py-7 text-lg animate-pulse-glow">
                Lancer mon audit IA
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
