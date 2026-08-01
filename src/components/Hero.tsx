"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SiJira, SiClaude, SiCursor } from "react-icons/si";
import { Terminal, Briefcase, Layers, Gauge, Cpu, Plus, Mail, BrainCircuit, TrendingUp, Sparkle } from "lucide-react";
import HeroPortrait from "./HeroPortrait";
import GithubMark from "./icons/GithubMark";
import SalesforceMark from "./icons/SalesforceMark";
import SlackMark from "./icons/SlackMark";
import GleanMark from "./icons/GleanMark";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const;

const fadeBlurUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
} as const;

const pop = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
} as const;

const NAVY = "#070b18";
const CARD_BG = "rgba(255,255,255,0.035)";
const CARD_BORDER = "rgba(255,255,255,0.1)";

const tools = [
  { name: "Jira", Icon: SiJira, color: "#2684FF" },
  { name: "GitHub", Icon: GithubMark, color: "#ffffff" },
  { name: "Salesforce", Icon: SalesforceMark, color: "#00A1E0" },
  { name: "Claude", Icon: SiClaude, color: "#D97757" },
  { name: "Claude Code", Icon: Terminal, color: "#D97757", accentBorder: true },
  { name: "Cursor", Icon: SiCursor, color: "#e5e7eb" },
  { name: "Glean", Icon: GleanMark, color: "#8B7FF0" },
  { name: "Slack", Icon: SlackMark, color: null },
] as const;

const stats = [
  { Icon: Briefcase, value: "4.5+", label: "Years of Experience", color: "#8B7FF0" },
  { Icon: Layers, value: "15+", label: "Enterprise Projects", color: "#5B9BF0" },
  { Icon: Gauge, value: "100%", label: "On-time Delivery", color: "#e5e7eb" },
  { Icon: Cpu, value: "AI", label: "Automation First Mindset", color: "var(--color-lime)" },
] as const;

function ToolIcon({ tool }: { tool: (typeof tools)[number] }) {
  const { Icon, color, name } = tool;
  const accentBorder = "accentBorder" in tool && tool.accentBorder;
  return (
    <div
      className="flex flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-4 sm:py-5 text-center"
      style={{
        background: CARD_BG,
        border: `1px solid ${accentBorder ? "color-mix(in srgb, #D97757 45%, transparent)" : CARD_BORDER}`,
      }}
    >
      <Icon size={26} color={color ?? undefined} style={{ color: color ?? undefined }} />
      <span className="font-heading text-[11px] sm:text-[12px] text-white/70">{name}</span>
    </div>
  );
}

function StatIcon({ stat, active, delay }: { stat: (typeof stats)[number]; active: boolean; delay: number }) {
  const { Icon, value, label, color } = stat;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left px-2"
    >
      <Icon
        size={30}
        strokeWidth={1.6}
        style={{ color, filter: `drop-shadow(0 0 6px color-mix(in srgb, ${color} 65%, transparent))` }}
      />
      <p className="font-heading text-[26px] sm:text-[28px] font-bold text-white leading-none mt-1">{value}</p>
      <p className="text-[12.5px] text-white/55 leading-snug">{label}</p>
    </motion.div>
  );
}

function AIEnthusiastCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 ${className}`}
      style={{ background: "rgba(8,12,26,0.75)", border: `1px solid ${CARD_BORDER}`, backdropFilter: "blur(6px)" }}
    >
      <BrainCircuit size={30} strokeWidth={1.5} style={{ color: "var(--color-lime)", filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-lime) 60%, transparent))" }} />
      <div>
        <p className="font-heading text-[13.5px] font-bold text-white leading-snug">AI Enthusiast</p>
        <p className="text-[11.5px] text-white/55 leading-snug">Builder of AI Agents &amp; Automations</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden pt-[64px]" style={{ background: NAVY }}>
      {/* Faint site-wide dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-6xl mx-auto px-6 py-14 sm:py-16 lg:py-20 relative z-10"
      >
        <div className="grid grid-cols-[1.3fr_1fr] lg:grid-cols-[1.15fr_420px] gap-x-6 sm:gap-x-10 gap-y-8 items-start">
          {/* Text column */}
          <div>
            <motion.div
              variants={pop}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-pill mb-6 whitespace-nowrap"
              style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
            >
              <span
                className="w-2 h-2 rounded-full bg-lime shrink-0"
                style={{ boxShadow: "0 0 8px var(--color-lime)", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="font-heading text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.16em] text-white/75">
                Technical Project Manager
              </span>
            </motion.div>

            <motion.p variants={fadeBlurUp} className="font-heading text-[16px] sm:text-[19px] text-white/70 mb-1">
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeBlurUp}
              className="font-heading font-bold leading-[1.1] mb-4"
              style={{ fontSize: "clamp(1.75rem, 5.2vw, 3.25rem)" }}
            >
              <span className="block text-white">Rohit</span>
              <span className="block text-lime">Kumar Singh</span>
            </motion.h1>

            <motion.p
              variants={fadeBlurUp}
              className="pl-3 mb-5 font-heading font-medium text-lime leading-snug"
              style={{ borderLeft: "3px solid var(--color-lime)", fontSize: "clamp(13px, 1.6vw, 16px)" }}
            >
              Driving Data. Building AI. Automating Tomorrow.
            </motion.p>

            <motion.p
              variants={fadeBlurUp}
              className="leading-[1.6] text-white/65 max-w-[520px] mb-6"
              style={{ fontSize: "clamp(13.5px, 1.6vw, 16px)" }}
            >
              I lead enterprise data &amp; AI programs at phData —{" "}
              <span className="text-lime font-semibold">platform migrations</span>, data warehouses,{" "}
              <span className="text-lime font-semibold">AI deployments</span> — and build{" "}
              <span className="text-lime font-semibold">AI agents</span> that automate my own repetitive work.
            </motion.p>

            {/* AI Enthusiast card — inline on mobile/tablet, floats on the photo at lg: */}
            <motion.div variants={fadeBlurUp} className="lg:hidden mb-6 max-w-[420px]">
              <AIEnthusiastCard />
            </motion.div>

            <motion.div variants={fadeBlurUp} className="flex flex-col sm:flex-row gap-3 max-w-[420px] lg:max-w-none">
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime text-ink font-heading font-bold text-[13px] px-6 py-3.5 hover:brightness-95 transition"
              >
                See My Work <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-white/25 text-white font-heading font-bold text-[13px] px-6 py-3.5 hover:border-lime hover:text-lime transition"
              >
                <Mail size={15} /> Let&apos;s Talk
              </a>
            </motion.div>
          </div>

          {/* Photo column */}
          <div className="relative h-[300px] sm:h-[360px] lg:h-[480px]">
            <HeroPortrait variant="desktop" />

            {/* Floating cards — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="hidden lg:block absolute -right-6 top-10 w-[230px]"
            >
              <AIEnthusiastCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="hidden lg:block absolute -right-2 bottom-6 w-[190px] rounded-2xl px-4 py-3.5"
              style={{ background: "rgba(8,12,26,0.75)", border: `1px solid ${CARD_BORDER}`, backdropFilter: "blur(6px)" }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp size={15} style={{ color: "var(--color-lime)" }} />
                <p className="font-heading text-[12.5px] font-bold text-white leading-snug">
                  Turning Ideas<br />Into Impact
                </p>
              </div>
              <div className="flex items-end gap-1 h-6">
                {[3, 6, 10, 14, 20].map((h, i) => (
                  <span key={i} className="w-1.5 rounded-sm bg-lime" style={{ height: `${h}px` }} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tools & platforms — full width */}
        <div className="mt-12 lg:mt-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.14)" }} />
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/45 shrink-0">
              Trusted Tools &amp; Platforms
            </p>
            <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.14)" }} />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            {tools.map((tool) => (
              <ToolIcon key={tool.name} tool={tool} />
            ))}
            <button
              type="button"
              aria-label="More tools"
              className="flex flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-4 sm:py-5 col-span-2 sm:col-span-1 mx-auto w-full"
              style={{ border: "1px dashed rgba(255,255,255,0.25)", background: "transparent" }}
            >
              <Plus size={22} className="text-white/50" />
              <span className="font-heading text-[11px] sm:text-[12px] text-white/50">+ More</span>
            </button>
          </div>
        </div>

        {/* The numbers */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 24 }}
          animate={panelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 lg:mt-14 rounded-2xl p-6 sm:p-8"
          style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
        >
          <p className="flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-lime mb-7">
            The Numbers <Sparkle size={13} />
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "relative pl-5 -ml-5 lg:pl-6 lg:-ml-0",
                  i % 2 === 1 ? "border-l border-white/10" : "border-l border-transparent",
                  i >= 2 ? "border-t border-white/10 pt-6 -mt-px" : "",
                  "lg:border-t-0 lg:pt-0 lg:mt-0",
                  i === 0 ? "lg:border-l-0" : "lg:border-l lg:border-white/10",
                ].join(" ")}
              >
                <StatIcon stat={stat} active={panelInView} delay={0.15 + i * 0.1} />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
