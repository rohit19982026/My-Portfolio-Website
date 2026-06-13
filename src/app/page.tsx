import Hero from "@/components/Hero";
import ImpactSummary from "@/components/ImpactSummary";
import Work from "@/components/Work";
import AIToolingTeaser from "@/components/AIToolingTeaser";
import SolutionDesignTeaser from "@/components/SolutionDesignTeaser";
import DeliveryExposure from "@/components/DeliveryExposure";
import Trajectory from "@/components/Trajectory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Trajectory />
      <ImpactSummary />
      <Work />
      <AIToolingTeaser />
      <DeliveryExposure />
      <SolutionDesignTeaser />
      <Contact />
      <Footer />
    </>
  );
}
