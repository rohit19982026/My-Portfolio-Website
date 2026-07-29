import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import ToolsBuilt from "@/components/ToolsBuilt";
import DeliveryExposure from "@/components/DeliveryExposure";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { skillMarqueeItems } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={skillMarqueeItems} variant="lime" tilt />
      <Experience />
      <Work />
      <ToolsBuilt />
      <DeliveryExposure />
      <Contact />
      <Footer />
    </>
  );
}
