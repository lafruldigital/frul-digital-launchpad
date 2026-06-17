import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { TransformationSection } from "@/components/TransformationSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FrulLabSection } from "@/components/FrulLabSection";
import { RealisationsPreviewSection } from "@/components/RealisationsPreviewSection";
import { CredibilityBar } from "@/components/CredibilityBar";
import { ProcessSection } from "@/components/ProcessSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-surface-darker overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <TransformationSection />
      <ServicesSection />
      <FrulLabSection />
      <RealisationsPreviewSection />
      <CredibilityBar />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
