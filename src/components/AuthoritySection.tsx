import { AnimatedSection } from "@/components/AnimatedSection";
import { Shield, Award, Zap, BadgeCheck } from "lucide-react";

const badges = [
  { icon: BadgeCheck, label: "Google Partner", sub: "Certifié" },
  { icon: Award, label: "Meta Business Partner", sub: "Certifié" },
  { icon: Zap, label: "TikTok Marketing", sub: "Partner" },
  { icon: Shield, label: "HubSpot Solutions", sub: "Partner" },
];

const techs = [
  "Google Ads", "Meta Ads", "TikTok Ads", "Google Analytics",
  "Semrush", "HubSpot", "Shopify", "WordPress",
  "Figma", "Notion", "Zapier", "Make",
];

export const AuthoritySection = () => {
  return (
    <section className="section-darker py-28 md:py-32 border-t border-primary/5">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Crédibilité</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-dark-foreground mt-4 mb-6">
            Certifiés & <span className="gradient-text">reconnus</span>
          </h2>
        </AnimatedSection>

        {/* Partner badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 mobile-carousel mobile-carousel-xs">
          {badges.map((b, i) => (
            <AnimatedSection key={b.label} delay={i * 0.1}>
              <div className="bg-surface-dark border border-primary/10 rounded-2xl p-6 text-center card-hover">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-surface-dark-foreground text-base">{b.label}</h3>
                <p className="text-sm text-surface-dark-foreground/40 mt-1">{b.sub}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Tech stack */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-heading font-semibold text-surface-dark-foreground/70">Technologies & outils maîtrisés</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {techs.map((t) => (
              <span
                key={t}
                className="px-5 py-2.5 rounded-full border border-primary/10 bg-surface-dark text-sm text-surface-dark-foreground/60 hover:border-primary/30 hover:text-primary transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
