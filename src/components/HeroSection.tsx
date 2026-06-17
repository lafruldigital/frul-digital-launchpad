import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

/* Premium hero — interactive digital core + floating dashboard cards */
export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });
  const tiltX = useTransform(py, [-1, 1], [6, -6]);
  const tiltY = useTransform(px, [-1, 1], [-6, 6]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const N = Math.min(70, Math.floor(window.innerWidth / 20));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
    }));
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.fillStyle = "hsla(0,85%,55%,0.7)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 * dpr, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          const max = 130 * dpr;
          if (d2 < max * max) {
            const a = 1 - Math.sqrt(d2) / max;
            ctx.strokeStyle = `hsla(0,85%,55%,${a * 0.18})`;
            ctx.lineWidth = 0.6 * dpr;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32 pb-20 animated-gradient-bg"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 85% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 85% 50%) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 80%)",
        }}
      />
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" />
      {/* Red orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 left-1/3 w-[720px] h-[720px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 85% 50%), transparent)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/[0.06] backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(0_85%_55%)] animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase text-primary/90">Agence digitale nouvelle génération</span>
            </motion.div>

            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-bold leading-[1.02] text-surface-dark-foreground mb-8 text-balance tracking-tight">
              On ne crée pas des sites.{" "}
              <span className="block">On construit des </span>
              <span className="gradient-text">présences digitales qui vendent.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-surface-dark-foreground/60 max-w-2xl mb-10 leading-relaxed">
              FRUL'DIGITAL accompagne les marques ambitieuses dans la création d'une image premium,
              d'un écosystème digital performant et d'une stratégie capable d'attirer, rassurer et convertir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/frul-lab#analyse-ia">
                <Button variant="hero" size="lg" className="px-8 py-7 text-base w-full sm:w-auto group">
                  Obtenir mon audit gratuit
                  <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/realisations">
                <Button variant="hero-outline" size="lg" className="px-8 py-7 text-base w-full sm:w-auto">
                  Voir nos créations
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: digital core */}
          <motion.div
            className="lg:col-span-5 hidden lg:block"
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <DigitalCore />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[hsl(0_0%_4%)] pointer-events-none" />
    </section>
  );
};

const DigitalCore = () => (
  <div className="relative aspect-square w-full max-w-md mx-auto">
    {/* Central glow */}
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute inset-1/4 rounded-full blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(0 85% 55%), transparent 70%)" }}
    />
    {/* Orbiting rings */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 24 + i * 8, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border border-primary/20"
        style={{ inset: `${10 + i * 8}%` }}
      >
        <span className="absolute -top-1 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_hsl(0_85%_55%)]" />
      </motion.div>
    ))}
    {/* Center emblem */}
    <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-primary to-[hsl(15_90%_55%)] shadow-[0_0_80px_hsl(0_85%_50%/0.6)] flex items-center justify-center">
      <Sparkles className="w-8 h-8 text-white" />
    </div>
    {/* Floating data cards */}
    <FloatingCard className="-left-6 top-8" delay={0} label="Conversion" value="+187%" />
    <FloatingCard className="-right-4 top-1/3" delay={0.4} label="ROAS" value="5.2x" />
    <FloatingCard className="left-2 bottom-6" delay={0.8} label="Maturité" value="84/100" />
  </div>
);

const FloatingCard = ({ className, label, value, delay }: { className: string; label: string; value: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: [0, -8, 0] }}
    transition={{ opacity: { delay: 0.6 + delay }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay } }}
    className={`absolute ${className} px-4 py-2.5 rounded-xl bg-white/[0.04] border border-primary/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]`}
  >
    <div className="text-[10px] uppercase tracking-wider text-surface-dark-foreground/50">{label}</div>
    <div className="text-lg font-heading font-bold text-primary">{value}</div>
  </motion.div>
);
