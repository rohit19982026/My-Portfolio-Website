import Hero from "@/components/Hero";
import ImpactSummary from "@/components/ImpactSummary";
import Work from "@/components/Work";
import Approach from "@/components/Approach";
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
      <ImpactSummary />
      <Work />
      <Approach />
      <AIToolingTeaser />
      <DeliveryExposure />
      <SolutionDesignTeaser />
      <Trajectory />
      <Contact />
      <Footer />
    </>
  );
}
