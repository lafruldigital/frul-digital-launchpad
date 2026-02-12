import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pourquoi nous", href: "/#why-us" },
  { label: "FRUL'LAB AI", href: "/frul-lab" },
  { label: "Résultats", href: "/resultats" },
  { label: "Process", href: "/processus" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-darker/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="font-heading text-2xl font-bold text-primary-foreground">
          FRUL'<span className="text-primary">DIGITAL</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-surface-dark-foreground/70 hover:text-primary transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <Button variant="hero" size="sm">
            Audit gratuit
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-surface-dark-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface-darker/95 backdrop-blur-xl border-t border-primary/10 pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block px-6 py-3 text-surface-dark-foreground/70 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <Button variant="hero" size="sm" className="w-full">
              Audit gratuit
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
