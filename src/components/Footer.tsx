import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const services = [
  { label: "Réseaux sociaux", href: "/services" },
  { label: "Publicité digitale", href: "/services" },
  { label: "Création de contenu", href: "/services" },
  { label: "Développement web", href: "/services" },
  { label: "SEO", href: "/services" },
];

const entreprise = [
  { label: "À propos", href: "/a-propos" },
  { label: "Témoignages", href: "/#testimonials" },
  { label: "Processus", href: "/processus" },
  { label: "Résultats", href: "/resultats" },
];

const socialLinks = [
  { label: "FRUL'DIGITAL", href: "#" },
  { label: "FRULUX", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="section-darker border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 — Brand */}
          <div>
            <a href="/" className="font-heading text-2xl font-bold text-surface-dark-foreground inline-block">
              FRUL'<span className="text-primary drop-shadow-[0_0_8px_hsl(0_85%_50%/0.4)]">DIGITAL</span>
            </a>
            <p className="text-surface-dark-foreground/50 mt-4 leading-relaxed text-sm">
              L'innovation au service de votre croissance.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="px-4 py-2 rounded-lg border border-primary/10 text-sm text-surface-dark-foreground/50 hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_hsl(0_85%_50%/0.15)] transition-all duration-300 flex items-center gap-1.5"
                >
                  {s.label} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="font-heading font-semibold text-surface-dark-foreground mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-surface-dark-foreground/50 hover:text-primary transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Entreprise */}
          <div>
            <h4 className="font-heading font-semibold text-surface-dark-foreground mb-4">Entreprise</h4>
            <ul className="space-y-2.5">
              {entreprise.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-surface-dark-foreground/50 hover:text-primary transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-heading font-semibold text-surface-dark-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-surface-dark-foreground/50">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Paris, France
              </li>
              <li className="flex items-center gap-2 text-sm text-surface-dark-foreground/50">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +33 X XX XX XX XX
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:contact@fruldigital.com" className="text-surface-dark-foreground/50 hover:text-primary transition-colors duration-200">
                  contact@fruldigital.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-surface-dark-foreground/30">
            © {new Date().getFullYear()} FRUL'DIGITAL — Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-surface-dark-foreground/30 hover:text-primary transition-colors duration-200">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-surface-dark-foreground/30 hover:text-primary transition-colors duration-200">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
