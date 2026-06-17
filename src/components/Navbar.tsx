import { Menu, X, ChevronDown, ArrowUpRight, User, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import frulLogo from "@/assets/frul-digital-logo.jpg";

type DropdownItem = { label: string; href: string; description?: string };
type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "dropdown"; label: string; intro?: string; items: DropdownItem[] };

const navItems: NavItem[] = [
  { type: "link", label: "Accueil", href: "/" },
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
      { label: "Nos créations", href: "/realisations", description: "Portfolio & réalisations." },
    ],
  },
  {
    type: "dropdown",
    label: "Agence",
    intro: "Découvrez notre méthode, notre vision et notre manière de travailler.",
    items: [
      { label: "À propos", href: "/a-propos", description: "L'équipe & l'ADN Frul'digital." },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>("Services");
  const location = useLocation();

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
        scrolled ? "top-2" : "top-4",
      )}
    >
      <div className="mx-auto px-3 sm:px-6 max-w-[1320px]">
        <nav
          className={cn(
            "relative rounded-2xl border border-white/10 bg-surface-darker/70 backdrop-blur-xl",
            "shadow-[0_10px_40px_-15px_hsl(0_85%_50%/0.25),0_0_0_1px_hsl(0_0%_100%/0.04)_inset]",
            "transition-all duration-500",
            scrolled
              ? "bg-surface-darker/85 border-white/15"
              : "bg-surface-darker/60",
          )}
        >
          {/* Subtle red glow underline */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-70"
          />
          {/* HUD corners */}
          <HudCorner className="top-1 left-1 border-l border-t rounded-tl-md" />
          <HudCorner className="top-1 right-1 border-r border-t rounded-tr-md" />
          <HudCorner className="bottom-1 left-1 border-l border-b rounded-bl-md" />
          <HudCorner className="bottom-1 right-1 border-r border-b rounded-br-md" />

          <div
            className={cn(
              "relative flex items-center justify-between px-3 sm:px-4 transition-all duration-500",
              scrolled ? "h-14" : "h-16",
            )}
          >
            {/* Logo block */}
            <Link to="/" className="flex items-center gap-3 group shrink-0 pl-1">
              <span className="relative">
                <span className="absolute inset-0 rounded-full bg-primary/30 blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
                <motion.img
                  src={frulLogo}
                  alt="FRUL'DIGITAL"
                  className="relative w-10 h-10 rounded-full object-cover border border-primary/40 shadow-[0_0_12px_hsl(0_85%_50%/0.35)]"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-heading font-bold tracking-[0.18em] text-[13px] text-surface-dark-foreground">
                  FRUL<span className="text-primary">'</span>DIGITAL
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-surface-dark-foreground/40 mt-0.5">
                  Agency · AI
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <ul
              className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
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
                          "relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300",
                          active
                            ? "text-primary-foreground bg-primary/90 shadow-[0_0_20px_hsl(0_85%_50%/0.5)]"
                            : "text-surface-dark-foreground/70 hover:text-surface-dark-foreground hover:bg-white/5",
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
                        "flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300",
                        active || open
                          ? "text-surface-dark-foreground bg-white/5"
                          : "text-surface-dark-foreground/70 hover:text-surface-dark-foreground hover:bg-white/5",
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
                          initial={{ opacity: 0, y: -8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[340px]"
                        >
                          <div className="relative rounded-2xl border border-white/10 bg-surface-darker/95 backdrop-blur-xl p-2 shadow-[0_20px_50px_-10px_hsl(0_0%_0%/0.6),0_0_30px_-5px_hsl(0_85%_50%/0.15)]">
                            <span
                              aria-hidden
                              className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                            />
                            {item.intro && (
                              <p className="px-3 pt-2 pb-3 text-[11px] uppercase tracking-[0.18em] text-surface-dark-foreground/40 border-b border-white/5 mb-2">
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
                                          : "hover:bg-white/5 text-surface-dark-foreground/80 hover:text-surface-dark-foreground",
                                      )}
                                    >
                                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(0_85%_50%/0.8)] transition-all" />
                                      <span className="flex-1">
                                        <span className="block text-sm font-medium">{sub.label}</span>
                                        {sub.description && (
                                          <span className="block text-[11px] text-surface-dark-foreground/40 mt-0.5">
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[13px] text-surface-dark-foreground/80 hover:text-surface-dark-foreground hover:border-white/20 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                Connexion
              </Link>
              <Link to="/signup" className="group">
                <Button
                  size="sm"
                  className="rounded-full bg-primary hover:bg-primary text-primary-foreground border border-primary/60 shadow-[0_0_20px_hsl(0_85%_50%/0.45)] hover:shadow-[0_0_28px_hsl(0_85%_50%/0.7)] transition-all"
                >
                  S'inscrire
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] text-surface-dark-foreground hover:border-primary/40 hover:text-primary transition-colors"
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
                  if (item.type === "link") {
                    const active = isActiveItem(location.pathname, item);
                    return (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block px-4 py-3.5 rounded-xl text-base font-medium transition-colors border",
                            active
                              ? "bg-primary/10 text-primary border-primary/30"
                              : "border-white/5 text-surface-dark-foreground/80 hover:text-primary hover:border-primary/20",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const open = mobileSection === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobileSection(open ? null : item.label)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium border transition-colors",
                          open
                            ? "border-primary/20 bg-white/[0.03] text-surface-dark-foreground"
                            : "border-white/5 text-surface-dark-foreground/80",
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
                                  className="flex items-center gap-3 px-4 py-3 text-sm text-surface-dark-foreground/70 hover:text-primary transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
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
