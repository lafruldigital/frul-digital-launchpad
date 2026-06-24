import { useEffect, useRef } from "react";

/**
 * Ambient cinematic background layer rendered once site-wide.
 * Pure visual decor — pointer-events-none, never blocks UI.
 * Respects prefers-reduced-motion and coarse pointers (mobile).
 */
export const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  // Cursor halo (desktop only)
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    const el = layerRef.current;
    if (!el) return;
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const COUNT = isMobile ? 12 : 28;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; tw: number };
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.05 - Math.random() * 0.15,
      r: 0.6 + Math.random() * 1.6,
      a: 0.15 + Math.random() * 0.35,
      tw: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const alpha = p.a * (0.6 + Math.sin(p.tw) * 0.4);
        ctx.beginPath();
        ctx.fillStyle = `hsla(0, 85%, 60%, ${alpha})`;
        ctx.shadowColor = "hsla(0, 90%, 55%, 0.6)";
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={layerRef} className="ambient-root" aria-hidden="true">
      {/* Base radial wash */}
      <div className="ambient-wash" />
      {/* Drifting blobs */}
      <div className="ambient-blob ambient-blob-1" />
      <div className="ambient-blob ambient-blob-2" />
      <div className="ambient-blob ambient-blob-3" />
      {/* Technical grid */}
      <div className="ambient-grid" />
      {/* Particles canvas */}
      <canvas ref={canvasRef} className="ambient-canvas" />
      {/* Cursor halo (desktop) */}
      <div className="ambient-cursor" />
      {/* Grain */}
      <div className="ambient-grain" />
    </div>
  );
};

export default AmbientBackground;