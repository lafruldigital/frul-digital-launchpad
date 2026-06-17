import { Menu, X, ChevronDown, ArrowUpRight, User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import frulLogo from "@/assets/frul-digital-logo.jpg";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
  { label: "Résultats", href: "/resultats" },
  { label: "Témoignages", href: "/temoignages" },
  { label: "Processus", href: "/processus" },
  { label: "FRUL'LAB AI", href: "/frul-lab" },
  { label: "Contact", href: "/contact" },
];

const isActiveHref = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

/* ───────── Decorative HUD corners ───────── */
const HudCorner = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      "absolute w-3 h-3 border-primary/60 pointer-events-none",
      className,
    )}
  />
);

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "top-2" : "top-4",
      )}
    >
      <div className="mx-auto px-3 sm:px-6 max-w-[1400px]">
        <nav
          className={cn(
            "relative transition-all duration-500",
            scrolled ? "scale-[0.985]" : "scale-100",
          )}
        >
          {/* Outer ambient red glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-3 bg-[radial-gradient(60%_80%_at_0%_50%,hsl(0_85%_50%/0.18),transparent_70%),radial-gradient(60%_80%_at_100%_50%,hsl(0_85%_50%/0.18),transparent_70%)] blur-2xl"
          />

          <div
            className={cn(
              "relative flex items-stretch gap-2 sm:gap-3 transition-all duration-500",
              scrolled ? "h-16" : "h-[72px]",
            )}
          >
            {/* ── LOGO POD ───────────────────────────── */}
            <Link
              to="/"
              className="group relative shrink-0 flex items-center gap-3 pl-3 pr-5 sm:pr-7
                         bg-surface-darker/70 backdrop-blur-xl
                         border border-white/10
                         shadow-[0_10px_40px_-15px_hsl(0_85%_50%/0.35),inset_0_0_0_1px_hsl(0_0%_100%/0.03)]
                         [clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%,0_0)]
                         hover:border-primary/30 transition-colors"
            >
              <span aria-hidden className="absolute inset-y-2 left-0 w-[2px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
              <span className="relative">
                <span className="absolute inset-0 rounded-full bg-primary/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                <motion.img
                  src={frulLogo}
                  alt="FRUL'DIGITAL"
                  className="relative w-11 h-11 rounded-full object-cover border border-primary/50 shadow-[0_0_18px_hsl(0_85%_50%/0.55)]"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-heading font-bold tracking-[0.16em] text-[15px] text-surface-dark-foreground">
                  FRUL<span className="text-primary">'</span>DIGITAL
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-surface-dark-foreground/40 mt-1">
                  Agency · AI
                </span>
              </span>
              {/* HUD ticks */}
              <span aria-hidden className="absolute top-1.5 left-2 w-2 h-2 border-t border-l border-primary/60" />
              <span aria-hidden className="absolute bottom-1.5 left-2 w-2 h-2 border-b border-l border-primary/60" />
              <span aria-hidden className="absolute -bottom-px left-3 right-8 h-px bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
            </Link>

            {/* ── MAIN POD ───────────────────────────── */}
            <div
              className="relative flex-1 hidden lg:flex items-center justify-center
                         bg-surface-darker/70 backdrop-blur-xl
                         border border-white/10 rounded-[18px]
                         shadow-[0_10px_40px_-15px_hsl(0_85%_50%/0.25),inset_0_0_0_1px_hsl(0_0%_100%/0.03)]"
            >
              {/* HUD top center detail */}
              <span aria-hidden className="absolute -top-px left-1/2 -translate-x-1/2 flex items-center gap-1">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/70" />
                <span className="flex items-center gap-[3px] px-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary/80 shadow-[0_0_6px_hsl(0_85%_50%/0.9)]" />
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span className="w-1 h-1 rounded-full bg-primary/80 shadow-[0_0_6px_hsl(0_85%_50%/0.9)]" />
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span className="w-1 h-1 rounded-full bg-primary/80 shadow-[0_0_6px_hsl(0_85%_50%/0.9)]" />
                </span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/70" />
              </span>
              {/* HUD bottom ticks */}
              <span aria-hidden className="absolute -bottom-px left-12 h-px w-16 bg-gradient-to-r from-primary/70 to-transparent" />
              <span aria-hidden className="absolute -bottom-px right-12 h-px w-16 bg-gradient-to-l from-primary/70 to-transparent" />
              {/* HUD corners */}
              <HudCorner className="top-1 left-1 border-l border-t rounded-tl-md" />
              <HudCorner className="top-1 right-1 border-r border-t rounded-tr-md" />
              <HudCorner className="bottom-1 left-1 border-l border-b rounded-bl-md" />
              <HudCorner className="bottom-1 right-1 border-r border-b rounded-br-md" />

              <ul className="flex items-center gap-1 px-4">
                {navItems.map((item) => {
                  const active = isActiveHref(location.pathname, item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={cn(
                          "relative inline-flex items-center px-4 py-2 rounded-xl text-[13px] font-medium tracking-wide transition-all duration-300",
                          active
                            ? "text-primary-foreground bg-primary/95 shadow-[0_0_24px_hsl(0_85%_50%/0.65),inset_0_0_0_1px_hsl(0_85%_70%/0.6)]"
                            : "text-surface-dark-foreground/75 hover:text-surface-dark-foreground hover:bg-white/[0.04]",
                        )}
                      >
                        {item.label}
                        {item.label === "FRUL'LAB AI" && (
                          <Sparkles className="inline-block w-3 h-3 ml-1 -mt-0.5 text-primary" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ── RIGHT POD (Auth) ───────────────────── */}
            <div
              className="relative hidden lg:flex items-center gap-2 px-3
                         bg-surface-darker/70 backdrop-blur-xl
                         border border-white/10 rounded-[18px]
                         shadow-[0_10px_40px_-15px_hsl(0_85%_50%/0.35),inset_0_0_0_1px_hsl(0_0%_100%/0.03)]"
            >
              <HudCorner className="top-1 left-1 border-l border-t rounded-tl-md" />
              <HudCorner className="top-1 right-1 border-r border-t rounded-tr-md" />
              <HudCorner className="bottom-1 left-1 border-l border-b rounded-bl-md" />
              <HudCorner className="bottom-1 right-1 border-r border-b rounded-br-md" />
              <span aria-hidden className="absolute -bottom-px right-6 h-px w-20 bg-gradient-to-l from-primary/70 to-transparent" />

              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-surface-dark-foreground/85 hover:text-surface-dark-foreground hover:bg-white/[0.04] transition-all"
              >
                <User className="w-4 h-4" />
                Connexion
              </Link>
              <Link to="/signup" className="group">
                <Button
                  size="sm"
                  className="rounded-xl h-10 px-4 bg-primary hover:bg-primary text-primary-foreground border border-primary/70 shadow-[0_0_24px_hsl(0_85%_50%/0.6),inset_0_0_0_1px_hsl(0_85%_75%/0.5)] hover:shadow-[0_0_34px_hsl(0_85%_50%/0.85)] transition-all"
                >
                  S'inscrire
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden ml-auto flex items-center justify-center w-12 h-12 self-center rounded-2xl border border-white/10 bg-surface-darker/70 backdrop-blur-xl text-surface-dark-foreground hover:border-primary/40 hover:text-primary transition-colors shadow-[0_0_20px_-5px_hsl(0_85%_50%/0.4)]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-0 z-40 bg-surface-darker/95 backdrop-blur-xl pt-24 px-4 overflow-y-auto"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-w-md mx-auto pb-12"
            >
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const active = isActiveHref(location.pathname, item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block px-4 py-3.5 rounded-xl text-base font-medium transition-colors border",
                          active
                            ? "bg-primary/15 text-primary border-primary/40 shadow-[0_0_20px_-5px_hsl(0_85%_50%/0.6)]"
                            : "border-white/5 text-surface-dark-foreground/80 hover:text-primary hover:border-primary/20",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-white/10 bg-white/[0.02] text-surface-dark-foreground/80 hover:text-surface-dark-foreground"
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_hsl(0_85%_50%/0.45)]">
                    S'inscrire
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
