import Hero from "@/components/Hero";
import ScrollRevealBridge from "@/components/ScrollRevealBridge";
import ImpactSummary from "@/components/ImpactSummary";
import AIToolingTeaser from "@/components/AIToolingTeaser";
import SolutionDesignTeaser from "@/components/SolutionDesignTeaser";
import DeliveryExposure from "@/components/DeliveryExposure";
import Trajectory from "@/components/Trajectory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Work (case studies) is intentionally not rendered in production —
// component and content kept in the repo for later use. See Work.tsx,
// CaseStudyExperience.tsx, CaseStudyMobileStory.tsx, caseStudies.ts.

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollRevealBridge />
      <Trajectory />
      <ImpactSummary />
      <AIToolingTeaser />
      <DeliveryExposure />
      <SolutionDesignTeaser />
      <Contact />
      <Footer />
    </>
  );
}
