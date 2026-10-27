import Hero from "@/components/Hero";
import Marquee from "@/components/ui/Marquee";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Credentials from "@/components/Credentials";
import ToolsBuilt from "@/components/ToolsBuilt";
import DeliveryExposure from "@/components/DeliveryExposure";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import { skillMarqueeItems } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={skillMarqueeItems} variant="lime" tilt />
      <Resume />
      <Experience />
      <CaseStudies />
      <Credentials />
      <ToolsBuilt />
      <DeliveryExposure />
      <Footer />
    </>
  );
}
