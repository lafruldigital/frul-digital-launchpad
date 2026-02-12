import { Mail, MapPin, Phone, ExternalLink, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import frulLogo from "@/assets/frul-digital-logo.jpg";

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
  { label: "FRUL'DIGITAL", links: [
    { platform: "Instagram", href: "https://www.instagram.com/lafruldigital/?utm_source=ig_web_button_share_sheet" },
    { platform: "TikTok", href: "https://www.tiktok.com/@fruldigital2?_r=1&_t=ZN-93s2t30jBaw" },
  ]},
  { label: "FRULUX", links: [
    { platform: "Instagram", href: "https://www.instagram.com/frulux_off?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { platform: "TikTok", href: "https://www.tiktok.com/@frulux_off?lang=fr" },
  ]},
];

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="section-darker border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="inline-block">
              <motion.img
                src={frulLogo}
                alt="FRUL'DIGITAL"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 shadow-[0_0_12px_hsl(0_85%_50%/0.3)]"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.15, boxShadow: "0 0 20px hsl(0 85% 50% / 0.5)" }}
              />
            </Link>
            <p className="text-surface-dark-foreground/50 mt-4 leading-relaxed text-sm">
              L'innovation au service de votre croissance.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex flex-col gap-4 mt-6">
              {socialLinks.map((group) => (
                <div key={group.label}>
                  <p className="text-xs text-surface-dark-foreground/40 mb-2 font-semibold uppercase tracking-wider">{group.label}</p>
                  <div className="flex gap-2">
                    {group.links.map((s) => (
                      <a
                        key={s.platform + group.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/10 bg-primary/5 text-sm text-surface-dark-foreground/60 hover:text-primary hover:border-primary/30 hover:bg-primary/10 hover:shadow-[0_0_16px_hsl(0_85%_50%/0.15)] transition-all duration-300"
                      >
                        {s.platform === "Instagram" ? (
                          <Instagram className="w-4 h-4" />
                        ) : (
                          <TikTokIcon className="w-4 h-4" />
                        )}
                        {s.platform}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="font-heading font-semibold text-surface-dark-foreground mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-surface-dark-foreground/50 hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
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
                  <Link to={l.href} className="text-sm text-surface-dark-foreground/50 hover:text-primary transition-colors duration-200">
                    {l.label}
                  </Link>
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
                <a href="https://maps.google.com/?q=60+avenue+François+1er+75008+Paris" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
                  60 avenue François 1er, 75008 Paris
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-surface-dark-foreground/50">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:0652237736" className="hover:text-primary transition-colors duration-200">06 52 23 77 36</a>
                  <a href="tel:0630563019" className="hover:text-primary transition-colors duration-200">06 30 56 30 19</a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:contactfruldigital@gmail.com" className="text-surface-dark-foreground/50 hover:text-primary transition-colors duration-200">
                  contactfruldigital@gmail.com
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
            <Link to="/mentions-legales" className="text-xs text-surface-dark-foreground/30 hover:text-primary transition-colors duration-200">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="text-xs text-surface-dark-foreground/30 hover:text-primary transition-colors duration-200">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
