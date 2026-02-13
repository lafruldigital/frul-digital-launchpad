import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
  { label: "Témoignages", href: "/temoignages" },
  { label: "Processus", href: "/processus" },
  { label: "Résultats", href: "/resultats" },
  { label: "FRUL'LAB IA", href: "/frul-lab" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (location.pathname === path || (path === "/" && location.pathname === "/")) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-darker/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center">
          <motion.img
            src={frulLogo}
            alt="FRUL'DIGITAL"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/30 shadow-[0_0_12px_hsl(0_85%_50%/0.3)]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px hsl(0 85% 50% / 0.5)" }}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => handleNavClick(l.href)}
              className="text-sm text-surface-dark-foreground/70 hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button variant="hero" size="sm">
              Contact
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-surface-dark-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-surface-darker/95 backdrop-blur-xl border-t border-primary/10 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="block px-6 py-3 text-surface-dark-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
              onClick={() => handleNavClick(l.href)}
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Link to="/contact" onClick={() => setOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
