"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight, Download } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import AgentConsole from "./AgentConsole";
import GlassButton from "./GlassButton";
import IconBadge from "./IconBadge";

function LinkedInIcon({ size = 18, color = "currentColor" }: { size?: number; strokeWidth?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/", icon: LinkedInIcon, color: "var(--color-accent)" },
  { label: "Email", href: "mailto:singhrohit.25119@gmail.com", icon: Mail, color: "var(--color-purple)" },
  { label: "Phone", href: "tel:+918967725119", icon: Phone, color: "var(--color-green)" },
];

const SPRING = { type: "spring" as const, stiffness: 80, damping: 18 };
const SPRING_FAST = { type: "spring" as const, stiffness: 120, damping: 20 };

const socialVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.55 } },
};
const socialItem = {
  hidden: { opacity: 0, y: 16, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING_FAST },
};

export default function Hero() {
  const magneticWork = useMagnetic(0.25);
  const magneticCV = useMagnetic(0.25);

  return (
    <section className="min-h-screen flex flex-col pt-[64px] relative overflow-hidden gradient-mesh">
      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 w-full py-16">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left column — identity */}
            <div>
              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="glass inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ borderRadius: "var(--radius-pill)", color: "var(--color-green-text)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                Open to new roles
              </motion.div>

              {/* Name */}
              <div style={{ overflow: "hidden", marginBottom: "16px" }}>
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ ...SPRING, delay: 0.12 }}
                  className="text-[22px] font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Rohit Kumar Singh
                </motion.h2>
              </div>

              {/* Title */}
              <div style={{ overflow: "hidden", marginBottom: "20px" }}>
                <motion.h1
                  initial={{ y: "105%", rotate: 2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.2 }}
                  className="font-heading font-bold leading-[1.0] tracking-[-0.02em]"
                  style={{
                    fontSize: "clamp(38px, 5.5vw, 68px)",
                    background: "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Technical PM
                  <br />
                  · AI Builder
                </motion.h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] leading-[1.7] max-w-[520px] mb-7"
                style={{ color: "var(--color-text-secondary)" }}
              >
                I built six AI agents on Claude, Glean, and n8n — billing
                reconciliation, delivery tracking, exec briefing. The billing
                agent cut month-end time by 60% with &gt;95% accuracy and went
                PMO-wide inside a month. The other side: multi-year Databricks,
                Snowflake, and Redshift programs across US, India, and China
                teams — fixed-price cutover commitments, multi-region pods,
                stakeholder situations where the technical problem and the
                political problem aren&apos;t the same thing. Building the tooling
                changes how I run those programs — you see the data differently
                when you&apos;ve also written the code that processes it.
              </motion.p>

              {/* Social icons */}
              <motion.div
                variants={socialVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-3 mb-8"
              >
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    variants={socialItem}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="block"
                  >
                    <IconBadge icon={s.icon} color={s.color} size={40} iconSize={18} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.65 } } }}
                className="flex flex-wrap gap-3"
              >
                <motion.div
                  ref={magneticWork.ref as React.RefObject<HTMLDivElement>}
                  onMouseMove={magneticWork.onMouseMove}
                  onMouseLeave={magneticWork.onMouseLeave}
                  style={magneticWork.style}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_FAST },
                  }}
                >
                  <GlassButton href="#work" variant="primary" icon={<ArrowUpRight size={15} strokeWidth={2.5} />}>
                    See My Work
                  </GlassButton>
                </motion.div>
                <motion.div
                  ref={magneticCV.ref as React.RefObject<HTMLDivElement>}
                  onMouseMove={magneticCV.onMouseMove}
                  onMouseLeave={magneticCV.onMouseLeave}
                  style={magneticCV.style}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_FAST },
                  }}
                >
                  <GlassButton href="/resume.pdf" target="_blank" variant="secondary" icon={<Download size={15} strokeWidth={2.5} />}>
                    Download CV
                  </GlassButton>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column — live agent console */}
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: "var(--color-accent-dk)" }}
              >
                Live — PMO Agent Fleet
              </div>
              <AgentConsole />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
