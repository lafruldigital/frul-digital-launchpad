import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CredibilityBar } from "@/components/CredibilityBar";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { FrulLabSection } from "@/components/FrulLabSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-surface-darker">
      <Navbar />
      <HeroSection />
      <CredibilityBar />
      <ServicesSection />
      <WhyUsSection />
      <FrulLabSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ProcessSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
