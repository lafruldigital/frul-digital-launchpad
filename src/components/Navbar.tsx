import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
  { label: "Témoignages", href: "/#testimonials" },
  { label: "Processus", href: "/processus" },
  { label: "Résultats", href: "/resultats" },
  { label: "FRUL'LAB IA", href: "/frul-lab" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-darker/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/" className="flex items-center">
          <motion.img
            src={frulLogo}
            alt="FRUL'DIGITAL"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/30 shadow-[0_0_12px_hsl(0_85%_50%/0.3)]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px hsl(0 85% 50% / 0.5)" }}
          />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-surface-dark-foreground/70 hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a href="/contact">
            <Button variant="hero" size="sm">
              Contact
            </Button>
          </a>
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
            <a
              key={l.href}
              href={l.href}
              className="block px-6 py-3 text-surface-dark-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <a href="/contact">
              <Button variant="hero" size="sm" className="w-full">
                Contact
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
