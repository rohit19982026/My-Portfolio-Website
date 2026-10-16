"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Download, Eye, GraduationCap, Layers } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";

const RESUME_PATH = "/resume/Rohit-Kumar-Singh-Resume.pdf";
const RESUME_FILENAME = "Rohit-Kumar-Singh-Resume.pdf";

const CARD_BORDER = "rgba(255,255,255,0.15)";
const CARD_BG = "rgba(255,255,255,0.03)";

// Same facts already verified against Experience.tsx/Credentials.tsx —
// a condensed "what's in the PDF" preview, not new claims.
const highlights = [
  { Icon: Layers, label: "6 years in IT delivery", sub: "Infra change mgmt → data & AI programs" },
  { Icon: Award, label: "Claude Certified Architect", sub: "Anthropic · PSM I · ITIL Foundation" },
  { Icon: GraduationCap, label: "phData Innovation Award", sub: "AI agents saving 4–8 hrs/week" },
];

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" className="py-24 bg-ink border-t-2 border-white/10">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="05 / RESUME"
          segments={[
            { text: "Want the", style: "fill" },
            { text: "full picture?", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-white/70 max-w-xl leading-relaxed mb-12">
          Every role, program and certification in one document — built for
          recruiters and hiring managers who need the full history, not just
          the highlights.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-card p-7 sm:p-10 lg:flex lg:items-center lg:gap-12"
          style={{ border: `1px solid ${CARD_BORDER}`, background: CARD_BG }}
        >
          <div className="lg:flex-1">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-lime mb-3">
              PDF · ATS-FRIENDLY · 1 PAGE
            </p>
            <h3 className="font-heading text-[22px] sm:text-[26px] font-bold leading-snug text-white mb-6 max-w-lg">
              Rohit Kumar Singh — Technical Project Manager
            </h3>

            <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-xl">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col gap-2 rounded-card p-3.5"
                  style={{ border: `1px solid ${CARD_BORDER}`, background: "rgba(255,255,255,0.02)" }}
                >
                  <h.Icon size={16} className="text-lime shrink-0" />
                  <div>
                    <p className="font-heading text-[12px] font-bold text-white leading-snug">{h.label}</p>
                    <p className="text-[10.5px] text-white/50 mt-0.5 leading-snug">{h.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row flex-wrap gap-3">
              <Button href={RESUME_PATH} download={RESUME_FILENAME}>
                <Download size={15} /> Download Resume
              </Button>
              <Button href={RESUME_PATH} target="_blank" rel="noopener noreferrer" variant="secondary">
                <Eye size={15} /> View in Browser
              </Button>
            </div>
          </div>

          <div className="hidden lg:block w-px self-stretch mx-2" style={{ background: "rgba(255,255,255,0.14)" }} />
          <div className="h-px w-full my-8 lg:hidden" style={{ background: "rgba(255,255,255,0.14)" }} />

          <div className="lg:shrink-0 lg:w-56">
            <p className="text-[13px] text-white/60 leading-relaxed">
              Prefer the short version? The <a href="#experience" className="text-lime font-semibold hover:underline">Experience</a> and{" "}
              <a href="#credentials" className="text-lime font-semibold hover:underline">Credentials</a> sections above cover the
              same ground, interactively.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
