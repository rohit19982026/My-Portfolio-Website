"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "$3.5M+", label: "Portfolio Value" },
  { value: "6",      label: "Programs Delivered" },
  { value: "99.98%", label: "Budget Execution" },
  { value: "$831K",  label: "Largest CO Closed" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rohit-kumar-singh",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/rohit19982026",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "#contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col pt-[64px] relative overflow-hidden"
      style={{ background: "#0F0F14" }}
    >
      {/* Subtle ambient glow behind the photo side */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          top: "50%",
          right: "-100px",
          transform: "translateY(-50%)",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* ── LEFT ── */}
            <div>
              {/* Greeting */}
              <motion.p
                {...fade(0.05)}
                className="text-[15px] mb-1"
                style={{ color: "#9090A8" }}
              >
                Hi, I am
              </motion.p>

              {/* Name */}
              <motion.h2
                {...fade(0.12)}
                className="text-[22px] font-semibold mb-4"
                style={{ color: "#EDE9FE" }}
              >
                Rohit Kumar Singh
              </motion.h2>

              {/* Role — big accent title */}
              <motion.h1
                {...fade(0.2)}
                className="font-display font-bold leading-[1.0] tracking-[-0.02em] mb-5"
                style={{
                  fontSize: "clamp(38px, 5.5vw, 68px)",
                  background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 60%, #A78BFA 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 6s linear infinite",
                }}
              >
                Technical Program
                <br />
                Manager
              </motion.h1>

              {/* One-liner */}
              <motion.p
                {...fade(0.28)}
                className="text-[15px] leading-[1.7] max-w-[480px] mb-7"
                style={{ color: "#6B6B8A" }}
              >
                I own scope baseline, EVM, change control, and exec reporting
                end-to-end — and build AI agents that automate the parts that
                should never have been manual.
              </motion.p>

              {/* Social icons */}
              <motion.div {...fade(0.34)} className="flex gap-3 mb-8">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.25)",
                      color: "#A78BFA",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div {...fade(0.4)} className="flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="px-7 py-3.5 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(109,40,217,0.4)",
                  }}
                >
                  See My Work
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(124,58,237,0.4)",
                    color: "#A78BFA",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  Download CV
                </a>
              </motion.div>
            </div>

            {/* ── RIGHT — Photo frame ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative" style={{ width: 380, height: 420 }}>
                {/* Outer decorative ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(124,58,237,0.15)" }}
                />
                {/* Second ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "16px",
                    border: "1px dashed rgba(124,58,237,0.12)",
                  }}
                />

                {/* Main circle */}
                <div
                  className="absolute overflow-hidden rounded-full"
                  style={{
                    inset: "32px",
                    background: "linear-gradient(160deg, #1A1A2E 0%, #0F0F18 100%)",
                    border: "2px solid rgba(124,58,237,0.2)",
                    boxShadow: "0 0 60px rgba(124,58,237,0.12) inset",
                  }}
                >
                  {/*
                    REPLACE THIS BLOCK with your photo:
                    <img src="/photo.jpg" alt="Rohit Kumar Singh"
                         className="w-full h-full object-cover object-top" />
                  */}
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: 88, lineHeight: 1, color: "#7C3AED", opacity: 0.9 }}
                    >
                      R
                    </span>
                    <span
                      className="font-mono text-[11px] tracking-[0.22em] uppercase"
                      style={{ color: "#6B6B8A" }}
                    >
                      Add your photo
                    </span>
                  </div>
                </div>

                {/* Accent dots */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 12, height: 12,
                    background: "#7C3AED",
                    top: 48, right: 28,
                    boxShadow: "0 0 12px rgba(124,58,237,0.8)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 8, height: 8,
                    background: "#A78BFA",
                    bottom: 60, left: 20,
                    boxShadow: "0 0 10px rgba(167,139,250,0.6)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 5, height: 5,
                    background: "#6EE7B7",
                    top: 90, left: 14,
                    boxShadow: "0 0 8px rgba(110,231,183,0.6)",
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                className="py-6 px-5"
                style={{
                  borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <p
                  className="font-display text-[28px] font-bold leading-none tracking-tight mb-1"
                  style={{ color: "#A78BFA" }}
                >
                  {s.value}
                </p>
                <p className="text-[12px]" style={{ color: "#6B6B8A" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
