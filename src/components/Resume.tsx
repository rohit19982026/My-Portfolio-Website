"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Download, Eye, GraduationCap, Layers } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";

const RESUME_PATH = "/resume/Rohit-Kumar-Singh-Resume.pdf";
const RESUME_FILENAME = "Rohit-Kumar-Singh-Resume.pdf";

const CARD_BORDER = "var(--color-card-border)";
const CARD_BG = "var(--color-card)";

// Same facts already verified against Experience.tsx/Credentials.tsx —
// a condensed "what's in the PDF" preview, not new claims.
const highlights = [
  { Icon: Layers, label: "6 years in IT delivery", sub: "BT, then phData" },
  { Icon: Award, label: "Claude Certified Architect – Foundations", sub: "Plus PSM I and ITIL Foundation" },
  { Icon: GraduationCap, label: "phData Innovation Award", sub: "For the PMO agents" },
];

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" className="py-24 bg-surface border-t-2 border-fg/10">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="05 / RESUME"
          segments={[
            { text: "Want the", style: "fill" },
            { text: "full picture?", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed mb-12">
          Everything on one page, if you&apos;d rather read it that way.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-card p-7 sm:p-10"
          style={{ border: `1px solid ${CARD_BORDER}`, background: CARD_BG }}
        >
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-3">
              PDF · ATS-FRIENDLY · 1 PAGE
            </p>
            <h3 className="font-heading text-[22px] sm:text-[26px] font-bold leading-snug text-fg mb-6 max-w-lg">
              Rohit Kumar Singh — Technical Project Manager
            </h3>

            <div className="grid sm:grid-cols-3 gap-3 mb-8 max-w-xl">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col gap-2 rounded-card p-3.5"
                  style={{ border: `1px solid ${CARD_BORDER}`, background: "var(--color-card-subtle)" }}
                >
                  <h.Icon size={16} className="text-accent shrink-0" />
                  <div>
                    <p className="font-heading text-[12px] font-bold text-fg leading-snug">{h.label}</p>
                    <p className="text-[10.5px] text-fg/50 mt-0.5 leading-snug">{h.sub}</p>
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

        </motion.div>
      </div>
    </section>
  );
}
