"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight, Download, ChevronDown } from "lucide-react";
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
    <section className="min-h-screen flex flex-col pt-[64px] relative overflow-hidden">

      {/* ── Cinematic video background — dimmed so it reads as atmosphere,
           not as a competing dark canvas behind white UI ── */}
      <motion.video
        key="hero-bg-video"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.38, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          zIndex: 0,
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </motion.video>

      {/* ── Uniform white wash: keeps page light, video reads as texture ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "rgba(255,255,255,0.62)",
        }}
      />

      {/* ── Left text guard: extra opacity on the text column ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* ── Bottom dissolve into page ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "28%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,1) 100%)",
          zIndex: 3,
        }}
      />

      {/* ── Main content ── */}
      <div className="flex-1 flex items-center" style={{ position: "relative", zIndex: 4 }}>
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
                  Program Manager
                  <br />
                  · AI Builder
                </motion.h1>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="mb-7"
              >
                <p className="lg:hidden text-[15px] leading-[1.65] max-w-[520px]" style={{ color: "var(--color-text-secondary)" }}>
                  Most PMs run programs. I also build the tools the team uses to run them.
                  <br /><br />
                  Five years running data and AI programs end to end. Six AI agents in
                  production, adopted across the full team in under a month.
                </p>
                <p className="hidden lg:block text-[15px] leading-[1.7] max-w-[520px]" style={{ color: "var(--color-text-secondary)" }}>
                  Most PMs run programs. I also build the tools the team uses to run them.
                  <br /><br />
                  At phData I run data and AI programs end to end — not as a coordinator,
                  but as the person accountable for scope, budget, risk, and the client
                  relationship when things go sideways. I&apos;ve managed the stakeholders
                  most likely to derail an engagement, and turned completed programs into
                  renewals.
                  <br /><br />
                  I also built six AI agents now running across the delivery team. Billing,
                  sprint health, risk tracking, executive decks — automated so the team&apos;s
                  time goes to the work that actually moves programs forward: catching problems
                  early, keeping clients informed, and growing the account.
                </p>
              </motion.div>

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

            {/* Right column — agent console floating over video */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Mobile divider */}
              <div
                className="lg:hidden mb-6"
                style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--glass-border), transparent)" }}
              />
              <div
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: "var(--color-accent-dk)" }}
              >
                Live — PMO Agent Fleet
              </div>
              {/* Stronger glass wrap so console reads clearly over the video */}
              <div
                style={{
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  background: "rgba(255,255,255,0.78)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,1) inset",
                }}
              >
                <AgentConsole />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="flex flex-col items-center pb-7 gap-1"
        style={{ position: "relative", zIndex: 4 }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--color-faint)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={13} style={{ color: "var(--color-faint)" }} />
        </motion.div>
      </motion.div>

    </section>
  );
}
