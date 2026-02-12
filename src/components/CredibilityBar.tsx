import { AnimatedSection, CountUp } from "@/components/AnimatedSection";

const stats = [
  { value: 250, prefix: "+", suffix: "", label: "Campagnes lancées" },
  { value: 120, prefix: "+", suffix: "", label: "Entreprises accompagnées" },
  { value: 3, prefix: "x", suffix: "", label: "ROI moyen" },
  { value: 98, prefix: "", suffix: "%", label: "Clients satisfaits" },
];

export const CredibilityBar = () => {
  return (
    <section className="section-dark py-20 md:py-24 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary mb-3">
                  <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-base md:text-lg text-surface-dark-foreground/50 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
