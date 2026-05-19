"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "15+",    label: "Programs Delivered" },
  { value: "$5M+",   label: "Largest P&L Owned" },
  { value: "99.98%", label: "Budget Execution" },
  { value: "10+",    label: "Enterprise Accounts" },
];

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

const statVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } },
};
const statItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...SPRING_FAST, duration: 0.5 } },
};

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col pt-[64px] relative overflow-hidden bg-[#0A0A12]">
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(110,231,183,0.04) 0%, transparent 70%)",
          top: "20%",
          left: "-80px",
        }}
      />

      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              {/* Name — clip reveal */}
              <div style={{ overflow: "hidden", marginBottom: "16px" }}>
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ ...SPRING, delay: 0.12 }}
                  className="text-[22px] font-semibold"
                  style={{ color: "#EDE9FE" }}
                >
                  Rohit Kumar Singh
                </motion.h2>
              </div>

              {/* Title — clip reveal */}
              <div style={{ overflow: "hidden", marginBottom: "20px" }}>
                <motion.h1
                  initial={{ y: "105%", rotate: 2 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.2 }}
                  className="font-display font-bold leading-[1.0] tracking-[-0.02em]"
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
                  Technical Project
                  <br />
                  Manager
                </motion.h1>
              </div>

              {/* Description — blur fade */}
              <motion.p
                initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15px] leading-[1.7] max-w-[480px] mb-7"
                style={{ color: "#6B6B8A" }}
              >
                Five years running data and AI programs at phData — Snowflake
                migrations, Databricks builds, cloud data warehouses, GenAI tooling.
                Contracts from $500K to $5M+. My job is keeping the commercial
                model honest and the delivery on track.
              </motion.p>

              {/* Social icons — stagger spring */}
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
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.25)",
                      color: "#A78BFA",
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </motion.div>

              {/* Buttons — stagger spring */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.65 } } }}
                className="flex flex-wrap gap-3"
              >
                <motion.a
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: SPRING_FAST },
                  }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="#work"
                  className="px-7 py-3.5 rounded-lg text-[13px] font-semibold tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(109,40,217,0.4)",
                  }}
                >
                  See My Work
                </motion.a>
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
                  className="px-7 py-3.5 rounded-lg text-[13px] font-semibold tracking-wide"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(124,58,237,0.4)",
                    color: "#A78BFA",
                  }}
                >
                  Download CV
                </motion.a>
              </motion.div>
            </div>

            {/* RIGHT — Photo frame — spring tilt */}
            <motion.div
              initial={{ opacity: 0, scale: 0.78, rotate: -6, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.15 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative" style={{ width: 380, height: 420 }}>
                <motion.div
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(124,58,237,0.15)" }}
                />
                <div
                  className="absolute rounded-full"
                  style={{ inset: "16px", border: "1px dashed rgba(124,58,237,0.12)" }}
                />
                <div
                  className="absolute overflow-hidden rounded-full"
                  style={{
                    inset: "32px",
                    background: "linear-gradient(160deg, #1A1A2E 0%, #0F0F18 100%)",
                    border: "2px solid rgba(124,58,237,0.2)",
                    boxShadow: "0 0 60px rgba(124,58,237,0.12) inset",
                  }}
                >
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
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute rounded-full"
                  style={{ width: 12, height: 12, background: "#7C3AED", top: 48, right: 28, boxShadow: "0 0 12px rgba(124,58,237,0.8)" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute rounded-full"
                  style={{ width: 8, height: 8, background: "#A78BFA", bottom: 60, left: 20, boxShadow: "0 0 10px rgba(167,139,250,0.6)" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute rounded-full"
                  style={{ width: 5, height: 5, background: "#6EE7B7", top: 90, left: 14, boxShadow: "0 0 8px rgba(110,231,183,0.6)" }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={statItem}
                className="py-6 px-5"
                style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
              >
                <p className="font-display text-[28px] font-bold leading-none tracking-tight mb-1" style={{ color: "#A78BFA" }}>
                  {s.value}
                </p>
                <p className="text-[12px]" style={{ color: "#6B6B8A" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
