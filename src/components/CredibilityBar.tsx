import { AnimatedSection, CountUp } from "@/components/AnimatedSection";

const stats = [
  { value: 250, prefix: "+", suffix: "", label: "Campagnes lancées" },
  { value: 120, prefix: "+", suffix: "", label: "Entreprises accompagnées" },
  { value: 3, prefix: "x", suffix: "", label: "ROI moyen" },
  { value: 98, prefix: "", suffix: "%", label: "Clients satisfaits" },
];

export const CredibilityBar = () => {
  return (
    <section className="section-dark py-16 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                  <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-surface-dark-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
