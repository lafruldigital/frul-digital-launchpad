import { Menu, X, ChevronDown, ArrowUpRight, User, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import frulLogo from "@/assets/frul-emblem.png.asset.json";

type DropdownItem = { label: string; href: string; description?: string };
type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "dropdown"; label: string; intro?: string; items: DropdownItem[] };

const navItems: NavItem[] = [
  {
    type: "dropdown",
    label: "Services",
    intro: "Des solutions concrètes pour accélérer votre présence digitale.",
    items: [
      { label: "Création de sites web", href: "/services", description: "Sites premium, rapides, sur-mesure." },
      { label: "Publicité en ligne", href: "/services", description: "Meta & Google Ads, ROAS optimisé." },
      { label: "Gestion des réseaux sociaux", href: "/services", description: "Stratégie & community management." },
      { label: "Création de contenu", href: "/services", description: "Photo, vidéo, motion design." },
    ],
  },
  {
    type: "dropdown",
    label: "Preuves",
    intro: "Des résultats concrets, vérifiables et inspirants.",
    items: [
      { label: "Résultats", href: "/resultats", description: "Études de cas chiffrées." },
      { label: "Témoignages", href: "/temoignages", description: "Ils nous ont fait confiance." },
      { label: "Nos réalisations", href: "/realisations", description: "Portfolio & nos créations." },
    ],
  },
  {
    type: "dropdown",
    label: "Agence",
    intro: "Notre méthode, notre vision, notre manière de travailler.",
    items: [
      { label: "À propos de nous", href: "/a-propos", description: "L'équipe & l'ADN Frul'digital." },
      { label: "Processus", href: "/processus", description: "Notre méthode étape par étape." },
    ],
  },
  { type: "link", label: "FRUL'LAB AI", href: "/frul-lab" },
  { type: "link", label: "Contact", href: "/contact" },
];

const isActiveHref = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

const isActiveItem = (pathname: string, item: NavItem) =>
  item.type === "link"
    ? isActiveHref(pathname, item.href)
    : item.items.some((i) => isActiveHref(pathname, i.href));

/* HUD micro-detail (purely decorative, coded) */
const HudCorner = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn("absolute w-2.5 h-2.5 border-primary/60 pointer-events-none", className)}
  />
);

/* Heartbeat core + energy-flow border styles (scoped via class names) */
const NavbarFxStyles = () => (
  <style>{`
    @keyframes frul-heartbeat {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px hsl(0 85% 55% / 0.7)); }
      14% { transform: scale(1.55); filter: drop-shadow(0 0 10px hsl(0 85% 60% / 1)); }
      28% { transform: scale(1); filter: drop-shadow(0 0 6px hsl(0 85% 55% / 0.8)); }
      42% { transform: scale(1.35); filter: drop-shadow(0 0 8px hsl(0 85% 60% / 0.95)); }
      70% { transform: scale(1); filter: drop-shadow(0 0 4px hsl(0 85% 55% / 0.7)); }
    }
    .frul-core-dot { animation: frul-heartbeat 1.9s ease-in-out infinite; transform-origin: center; }
    .frul-core-dot.d2 { animation-delay: .08s; }
    .frul-core-dot.d3 { animation-delay: .16s; }
    .frul-core-dot.d4 { animation-delay: .24s; }
    .frul-core-dot.d5 { animation-delay: .32s; }

    @keyframes frul-energy-flow {
      0%   { stroke-dashoffset: 0;    opacity: 0; }
      6%   { opacity: 1; }
      55%  { opacity: 1; }
      70%  { stroke-dashoffset: -1000; opacity: 0; }
      100% { stroke-dashoffset: -1000; opacity: 0; }
    }
    .frul-energy-path {
      stroke-dasharray: 180 1000;
      animation: frul-energy-flow 5.2s cubic-bezier(.55,.1,.25,1) infinite;
      filter: drop-shadow(0 0 6px hsl(0 85% 55% / 0.9));
    }
    .frul-energy-path.reverse { animation-direction: reverse; }

    @media (prefers-reduced-motion: reduce) {
      .frul-core-dot { animation: none !important; }
      .frul-energy-path { animation: none !important; opacity: .35; stroke-dasharray: none; }
    }
  `}</style>
);

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>("Services");
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const mobilePanelVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            hidden: { opacity: 0, x: "100%" },
            visible: {
              opacity: 1,
              x: 0,
              transition: { type: "spring", damping: 28, stiffness: 260, opacity: { duration: 0.2 } },
            },
            exit: { opacity: 0, x: "100%", transition: { duration: 0.25, ease: "easeIn" } },
          },
    [prefersReducedMotion],
  );

  const mobileListContainerVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.08 },
            },
            exit: { opacity: 0, transition: { duration: 0.15 } },
          },
    [prefersReducedMotion],
  );

  const mobileListItemVariants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", damping: 24, stiffness: 280 },
            },
            exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
          },
    [prefersReducedMotion],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "top-2" : "top-3",
      )}
    >
      <NavbarFxStyles />
      <div className="mx-auto px-3 sm:px-4 max-w-[1320px]">
        <nav
          className={cn(
            "relative rounded-2xl border backdrop-blur-xl transition-all duration-500",
            "border-white/[0.08] bg-[hsl(0_0%_6%/0.78)]",
            scrolled
              ? "shadow-[0_8px_30px_-12px_hsl(0_85%_50%/0.35),inset_0_0_0_1px_hsl(0_0%_100%/0.03)] bg-[hsl(0_0%_5%/0.88)]"
              : "shadow-[0_10px_40px_-18px_hsl(0_85%_50%/0.4),inset_0_0_0_1px_hsl(0_0%_100%/0.03)]",
          )}
        >
          {/* Energy flow around the navbar border */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <rect
              x="0.5" y="0.5"
              width="calc(100% - 1px)" height="calc(100% - 1px)"
              rx="16" ry="16"
              fill="none"
              stroke="hsl(0 85% 55% / 0.95)"
              strokeWidth="1.2"
              pathLength="1000"
              className="frul-energy-path"
            />
            <rect
              x="0.5" y="0.5"
              width="calc(100% - 1px)" height="calc(100% - 1px)"
              rx="16" ry="16"
              fill="none"
              stroke="hsl(0 85% 60% / 0.8)"
              strokeWidth="1.2"
              pathLength="1000"
              className="frul-energy-path reverse"
            />
          </svg>

          {/* Subtle red glow underline */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-80"
          />
          {/* HUD top center detail */}
          <span aria-hidden className="pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1.5">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/70" />
            <span className="flex items-center gap-[3px]">
              <span className="frul-core-dot d1 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_hsl(0_85%_55%/0.95)]" />
              <span className="frul-core-dot d2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_hsl(0_85%_55%/0.95)]" />
              <span className="frul-core-dot d3 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(0_85%_60%/1)]" />
              <span className="frul-core-dot d4 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_hsl(0_85%_55%/0.95)]" />
              <span className="frul-core-dot d5 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_hsl(0_85%_55%/0.95)]" />
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/70" />
          </span>
          {/* HUD corners */}
          <HudCorner className="top-1.5 left-1.5 border-l border-t rounded-tl" />
          <HudCorner className="top-1.5 right-1.5 border-r border-t rounded-tr" />
          <HudCorner className="bottom-1.5 left-1.5 border-l border-b rounded-bl" />
          <HudCorner className="bottom-1.5 right-1.5 border-r border-b rounded-br" />

          <div
            className={cn(
              "relative flex items-center justify-between gap-3 px-3 sm:px-4 transition-all duration-500",
              scrolled ? "h-14" : "h-16",
            )}
          >
            {/* Logo */}
            <Link
              to="/"
              className="group/logo relative flex items-center shrink-0 outline-none"
              aria-label="FRUL'DIGITAL"
            >
              {/* Retro-reflection glow behind */}
              <span
                aria-hidden
                className="absolute -inset-6 rounded-full bg-[radial-gradient(circle_at_50%_40%,hsl(0_85%_55%/0.35),hsl(0_85%_55%/0.08)_40%,transparent_70%)] blur-2xl opacity-60 group-hover/logo:opacity-100 transition-opacity duration-700"
              />
              <span
                aria-hidden
                className="absolute -inset-4 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] bg-[radial-gradient(ellipse_at_50%_0%,hsl(0_0%_100%/0.12),transparent_60%)] blur-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"
              />

              {/* Icon with float */}
              <motion.span
                className="relative shrink-0 flex items-center justify-center w-11 h-11"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Reflection floor */}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,hsl(0_85%_55%/0.35),transparent_70%)] blur-sm opacity-60"
                />
                {/* Halo glow (intensifies on hover) */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle,hsl(0_85%_55%/0.55),transparent_70%)] blur-xl opacity-50 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100 transition-opacity duration-500"
                />
                {/* Speed streaks on hover */}
                <span
                  aria-hidden
                  className="absolute inset-[-4px] rounded-full opacity-0 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, hsl(0 85% 55% / 0.6) 40deg, transparent 80deg, transparent 180deg, hsl(0 85% 55% / 0.6) 220deg, transparent 260deg, transparent 360deg)",
                    maskImage: "radial-gradient(circle, transparent 55%, black 60%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 60%, transparent 75%)",
                  }}
                />
                <motion.span
                  className="relative inline-block"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <img
                    src={frulLogo.url}
                    alt=""
                    aria-hidden
                    className="relative h-9 w-auto object-contain drop-shadow-[0_0_10px_hsl(0_85%_50%/0.5)] transition-[transform,filter] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover/logo:[transform:rotate(720deg)] group-focus-visible/logo:[transform:rotate(720deg)] group-hover/logo:drop-shadow-[0_0_18px_hsl(0_85%_55%/0.9)] motion-reduce:group-hover/logo:[transform:none] motion-reduce:transition-[filter]"
                  />
                </motion.span>
              </motion.span>

              {/* Expanding wordmark */}
              <span
                aria-hidden
                className="relative ml-0 overflow-hidden whitespace-nowrap max-w-0 opacity-0 -translate-x-1 group-hover/logo:max-w-[220px] group-hover/logo:opacity-100 group-hover/logo:translate-x-0 group-hover/logo:ml-2 group-focus-visible/logo:max-w-[220px] group-focus-visible/logo:opacity-100 group-focus-visible/logo:translate-x-0 group-focus-visible/logo:ml-2 transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
              >
                <span className="relative inline-flex items-baseline text-[15px] font-semibold tracking-[0.18em] text-white drop-shadow-[0_0_8px_hsl(0_0%_100%/0.25)]">
                  FRUL
                  <span className="text-primary drop-shadow-[0_0_8px_hsl(0_85%_55%/0.9)]">'</span>
                  DIGITAL
                  {/* Sweeping shine across the text on reveal */}
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full group-hover/logo:translate-x-full group-focus-visible/logo:translate-x-full transition-transform duration-[900ms] ease-out bg-gradient-to-r from-transparent via-white/60 to-transparent mix-blend-overlay"
                  />
                </span>
                {/* Underline accent */}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover/logo:w-full group-focus-visible/logo:w-full bg-gradient-to-r from-primary/80 via-white/60 to-transparent transition-[width] duration-700 ease-out"
                />
              </span>

              {/* Screen reader text */}
              <span className="sr-only">FRUL'DIGITAL</span>
            </Link>

            {/* Desktop nav */}
            <ul
              className="hidden lg:flex flex-1 items-center justify-center gap-0.5"
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {navItems.map((item) => {
                const active = isActiveItem(location.pathname, item);
                if (item.type === "link") {
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        onMouseEnter={() => setOpenDropdown(null)}
                        className={cn(
                          "relative inline-flex items-center px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-300 whitespace-nowrap",
                          active
                            ? "text-primary-foreground bg-primary/95 shadow-[0_0_22px_hsl(0_85%_50%/0.6),inset_0_0_0_1px_hsl(0_85%_70%/0.55)]"
                            : "text-surface-dark-foreground/75 hover:text-surface-dark-foreground hover:bg-white/[0.05]",
                        )}
                      >
                        {item.label}
                        {item.label === "FRUL'LAB AI" && (
                          <Sparkles className="inline-block w-3 h-3 ml-1 -mt-0.5 text-primary" />
                        )}
                      </Link>
                    </li>
                  );
                }
                const open = openDropdown === item.label;
                return (
                  <li key={item.label} className="relative" onMouseEnter={() => setOpenDropdown(item.label)}>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(open ? null : item.label)}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-300 whitespace-nowrap",
                        active || open
                          ? "text-surface-dark-foreground bg-white/[0.05]"
                          : "text-surface-dark-foreground/75 hover:text-surface-dark-foreground hover:bg-white/[0.05]",
                      )}
                      aria-expanded={open}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300",
                          open ? "rotate-180 text-primary" : "text-surface-dark-foreground/40",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[340px]"
                        >
                          <div className="relative rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_5%/0.96)] backdrop-blur-xl p-2 shadow-[0_24px_60px_-12px_hsl(0_0%_0%/0.7),0_0_30px_-8px_hsl(0_85%_50%/0.25)]">
                            <span
                              aria-hidden
                              className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                            />
                            {item.intro && (
                              <p className="px-3 pt-2 pb-3 text-[10px] uppercase tracking-[0.18em] text-surface-dark-foreground/40 border-b border-white/5 mb-2">
                                {item.intro}
                              </p>
                            )}
                            <ul className="space-y-0.5">
                              {item.items.map((sub) => {
                                const subActive = isActiveHref(location.pathname, sub.href);
                                return (
                                  <li key={sub.href + sub.label}>
                                    <Link
                                      to={sub.href}
                                      onClick={() => setOpenDropdown(null)}
                                      className={cn(
                                        "group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                        subActive
                                          ? "bg-primary/10 text-surface-dark-foreground"
                                          : "hover:bg-white/[0.04] text-surface-dark-foreground/85 hover:text-surface-dark-foreground",
                                      )}
                                    >
                                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/70 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(0_85%_50%/0.85)] transition-all" />
                                      <span className="flex-1 min-w-0">
                                        <span className="block text-sm font-medium">{sub.label}</span>
                                        {sub.description && (
                                          <span className="block text-[11px] text-surface-dark-foreground/45 mt-0.5">
                                            {sub.description}
                                          </span>
                                        )}
                                      </span>
                                      <ArrowUpRight className="w-3.5 h-3.5 mt-1 text-surface-dark-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            {/* Right cluster */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-surface-dark-foreground/85 hover:text-surface-dark-foreground hover:bg-white/[0.05] transition-all"
              >
                <User className="w-3.5 h-3.5" />
                Connexion
              </Link>
              <Link to="/signup" className="group">
                <Button
                  size="sm"
                  className="h-9 rounded-lg px-3.5 bg-primary hover:bg-primary text-primary-foreground border border-primary/70 shadow-[0_0_22px_hsl(0_85%_50%/0.55),inset_0_0_0_1px_hsl(0_85%_75%/0.45)] hover:shadow-[0_0_30px_hsl(0_85%_50%/0.8)] transition-all"
                >
                  S'inscrire
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] text-surface-dark-foreground hover:border-primary/40 hover:text-primary transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobilePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed inset-0 top-0 z-40 bg-[hsl(0_0%_4%/0.96)] backdrop-blur-xl pt-24 px-4 overflow-y-auto"
          >
            <motion.div
              variants={mobileListContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-md mx-auto pb-12 relative"
            >
              <motion.button
                type="button"
                onClick={() => setMobileOpen(false)}
                variants={mobileListItemVariants}
                className="absolute -top-2 right-0 inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] text-surface-dark-foreground hover:border-primary/40 hover:text-primary transition-colors"
                aria-label="Fermer le menu"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
              >
                <X size={18} />
              </motion.button>

              <motion.ul className="space-y-1 pt-12" variants={mobileListContainerVariants} initial="hidden" animate="visible" exit="exit">
                <motion.li variants={mobileListItemVariants}>
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-3.5 rounded-xl text-base font-medium transition-colors border",
                      location.pathname === "/"
                        ? "bg-primary/15 text-primary border-primary/40 shadow-[0_0_20px_-5px_hsl(0_85%_50%/0.6)]"
                        : "border-white/5 text-surface-dark-foreground/85 hover:text-primary hover:border-primary/20",
                    )}
                  >
                    Accueil
                  </Link>
                </motion.li>

                {navItems.map((item) => {
                  if (item.type === "link") {
                    const active = isActiveItem(location.pathname, item);
                    return (
                      <motion.li key={item.label} variants={mobileListItemVariants}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block px-4 py-3.5 rounded-xl text-base font-medium transition-colors border",
                            active
                              ? "bg-primary/15 text-primary border-primary/40 shadow-[0_0_20px_-5px_hsl(0_85%_50%/0.6)]"
                              : "border-white/5 text-surface-dark-foreground/85 hover:text-primary hover:border-primary/20",
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  }
                  const open = mobileSection === item.label;
                  return (
                    <motion.li key={item.label} variants={mobileListItemVariants}>
                      <button
                        type="button"
                        onClick={() => setMobileSection(open ? null : item.label)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium border transition-colors",
                          open
                            ? "border-primary/25 bg-white/[0.04] text-surface-dark-foreground"
                            : "border-white/5 text-surface-dark-foreground/85",
                        )}
                        aria-expanded={open}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            open ? "rotate-180 text-primary" : "text-surface-dark-foreground/40",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden pl-3"
                          >
                            {item.items.map((sub) => (
                              <li key={sub.href + sub.label}>
                                <Link
                                  to={sub.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3 text-sm text-surface-dark-foreground/75 hover:text-primary transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div variants={mobileListItemVariants} className="mt-6 grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-white/10 bg-white/[0.03] text-surface-dark-foreground/85 hover:text-surface-dark-foreground"
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_hsl(0_85%_50%/0.5)]">
                    S'inscrire
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;