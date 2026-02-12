import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Pourquoi nous", href: "#why-us" },
  { label: "FRUL'LAB AI", href: "#frul-lab" },
  { label: "Résultats", href: "#results" },
  { label: "Process", href: "#process" },
];

const socials = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="section-darker border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="font-heading text-2xl font-bold text-surface-dark-foreground">
              FRUL'<span className="text-primary">DIGITAL</span>
            </a>
            <p className="text-surface-dark-foreground/50 mt-4 max-w-sm leading-relaxed text-sm">
              Agence de marketing digital nouvelle génération. Nous aidons les entreprises à atteindre leur plein potentiel grâce au digital.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.displayName}
                  href={href}
                  className="w-9 h-9 rounded-lg border border-primary/10 flex items-center justify-center text-surface-dark-foreground/40 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-surface-dark-foreground mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-surface-dark-foreground/50 hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-surface-dark-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-surface-dark-foreground/50">
                <Mail className="w-4 h-4 text-primary" />
                contact@fruldigital.com
              </li>
              <li className="flex items-center gap-2 text-sm text-surface-dark-foreground/50">
                <Phone className="w-4 h-4 text-primary" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-sm text-surface-dark-foreground/50">
                <MapPin className="w-4 h-4 text-primary" />
                Paris, France
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-surface-dark-foreground/30">
            © 2026 FRUL'DIGITAL. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-surface-dark-foreground/30 hover:text-primary transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-surface-dark-foreground/30 hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
