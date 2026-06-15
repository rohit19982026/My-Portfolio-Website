"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import AgentConsole from "./AgentConsole";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:singhrohit.25119@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+918967725119",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
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
    <section
      className="min-h-screen flex flex-col pt-[64px] relative overflow-hidden"
      style={{ background: "var(--color-ink)" }}
    >
      {/* Instrument-panel grid texture */}
      <div className="absolute inset-0 console-grid pointer-events-none" />

      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)",
          top: "50%",
          right: "-160px",
          transform: "translateY(-50%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%)",
          top: "20%",
          left: "-80px",
        }}
      />

      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left column — identity */}
            <div>
              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  background: "rgba(52,211,153,0.06)",
                  border: "1px solid var(--color-ink-border)",
                  color: "#34D399",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#34D399", animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                Open for new programs
              </motion.div>

              {/* Name */}
              <div style={{ overflow: "hidden", marginBottom: "16px" }}>
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ ...SPRING, delay: 0.12 }}
                  className="text-[22px] font-semibold"
                  style={{ color: "var(--color-ink-text)" }}
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
                  className="font-display font-bold leading-[1.0] tracking-[-0.02em]"
                  style={{
                    fontSize: "clamp(38px, 5.5vw, 68px)",
                    background: "linear-gradient(135deg, #93C5FD 0%, #60A5FA 40%, #34D399 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradient-shift 6s linear infinite",
                  }}
                >
                  Technical Project
                  <br />
                  Manager
                </motion.h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] leading-[1.7] max-w-[520px] mb-7"
                style={{ color: "var(--color-ink-text-2)" }}
              >
                The best week on a program is the one nobody remembers — nothing
                escalated, nothing surprised the client, the platform shipped on
                schedule. Getting there is mostly about noticing the thing that&apos;s
                about to go wrong before it does, and having the conversation that
                fixes it while it&apos;s still small. I run four or five data and AI
                programs like that at a time, working alongside the engineers and
                architects who build the platforms themselves. The console on the
                right is the kind of thing I build to buy myself more time for that
                part of the job — live, right now, in your browser.
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
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(96,165,250,0.08)",
                      border: "1px solid rgba(96,165,250,0.2)",
                      color: "#60A5FA",
                    }}
                  >
                    {s.icon}
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
                >
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, scale: 0.85, y: 10 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_FAST },
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    href="#work"
                    className="block px-7 py-3.5 rounded-lg text-[13px] font-semibold tracking-wide"
                    style={{
                      background: "linear-gradient(135deg, #1D4ED8, #0891B2)",
                      color: "#FFFFFF",
                      boxShadow: "0 4px 24px rgba(8,145,178,0.35)",
                    }}
                  >
                    See My Work
                  </motion.a>
                </motion.div>
                <motion.div
                  ref={magneticCV.ref as React.RefObject<HTMLDivElement>}
                  onMouseMove={magneticCV.onMouseMove}
                  onMouseLeave={magneticCV.onMouseLeave}
                  style={magneticCV.style}
                >
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, scale: 0.85, y: 10 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_FAST },
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-7 py-3.5 rounded-lg text-[13px] font-semibold tracking-wide"
                    style={{
                      background: "transparent",
                      border: "1px solid var(--color-ink-border)",
                      color: "var(--color-ink-text)",
                    }}
                  >
                    Download CV
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            {/* Right column — live agent console */}
            <div>
              <div
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] mb-3"
                style={{ color: "var(--color-ink-text-2)" }}
              >
                // live — pmo agent fleet
              </div>
              <AgentConsole />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
