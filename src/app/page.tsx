import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";
import Experience from "@/components/Experience";
import ToolsBuilt from "@/components/ToolsBuilt";
import DeliveryExposure from "@/components/DeliveryExposure";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { skillMarqueeItems } from "@/lib/content";

// <Work /> (case studies) is temporarily unrendered — several of its
// specific figures/stories turned out to be fabricated and need a
// fact-check + rewrite pass before going back live. Component and data
// (src/components/Work.tsx, src/lib/caseStudies.ts) are untouched, just
// not mounted here.

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={skillMarqueeItems} variant="lime" tilt />
      <Experience />
      <ToolsBuilt />
      <DeliveryExposure />
      <Contact />
      <Footer />
    </>
  );
}
