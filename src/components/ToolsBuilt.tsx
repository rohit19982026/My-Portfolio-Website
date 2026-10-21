"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Clock, Sparkle, Target, Users, Zap } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import SwipeCarousel from "./ui/SwipeCarousel";
import { agents, type Agent } from "@/lib/agents";

const NAVY = "var(--color-surface-alt)";
const CARD_BG = "var(--color-card)";
const CARD_BORDER = "var(--color-card-border)";
const DOT_PATTERN = "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)";

// Pick a readable icon color for a tile filled with the tool's accent.
function onAccent(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#0d0d0f" : "#ffffff";
}

// Tiny picture of the tool's own flow: one dot per step on a line.
function FlowDots({ steps, accent }: { steps: number; accent: string }) {
  return (
    <span aria-hidden className="flex items-center gap-2">
      <span className="flex items-center">
        {Array.from({ length: steps }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: i === 0 || i === steps - 1 ? accent : "transparent",
                border: `1.5px solid ${accent}`,
              }}
            />
            {i < steps - 1 && <span className="h-px w-3.5" style={{ background: `color-mix(in srgb, ${accent} 55%, transparent)` }} />}
          </span>
        ))}
      </span>
      <span className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-fg/45">{steps} steps</span>
    </span>
  );
}

// Card: the full story (problem, what I solved, the flow) lives on
// /tools/<slug>, so the home page only has to say what each tool is.
function AgentCard({ agent, index, inView, className = "" }: { agent: Agent; index: number; inView: boolean; className?: string }) {
  const Icon = agent.icon;
  const text = `color-mix(in srgb, ${agent.accent} var(--accent-text-mix), var(--color-fg))`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.05 }}
      className={`h-full ${className}`}
    >
      <Link
        href={`/tools/${agent.slug}`}
        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-5 transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-[var(--tool)] hover:shadow-[0_22px_44px_-24px_var(--tool)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tool)] sm:p-6"
        style={
          {
            "--tool": agent.accent,
            background: `radial-gradient(110% 80% at 0% 0%, color-mix(in srgb, ${agent.accent} 14%, transparent), transparent 60%), var(--color-card)`,
            border: `1px solid ${CARD_BORDER}`,
            boxShadow: `0 18px 40px -28px color-mix(in srgb, ${agent.accent} 60%, transparent)`,
          } as React.CSSProperties
        }
      >
        <div className="flex items-start justify-between">
          <span
            className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl"
            style={{
              transform: "translateX(calc(var(--p, 0) * -16px)) scale(calc(1 - var(--a, 0) * 0.18)) rotate(calc(var(--p, 0) * -10deg))",
              background: `linear-gradient(145deg, color-mix(in srgb, ${agent.accent} 100%, white 25%), ${agent.accent} 55%, color-mix(in srgb, ${agent.accent} 80%, black))`,
              boxShadow: `0 10px 22px -8px ${agent.accent}, inset 0 1px 0 rgba(255,255,255,.45)`,
              color: onAccent(agent.accent),
            }}
          >
            <Icon size={24} strokeWidth={2} />
          </span>
          <span
            aria-hidden
            className="font-display text-[44px] leading-none"
            style={{ color: "transparent", WebkitTextStroke: "1.5px color-mix(in srgb, var(--color-fg) 22%, transparent)", transform: "translateX(calc(var(--p, 0) * -22px))" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="font-heading text-[19px] font-bold leading-snug text-fg"
            style={{ transform: "translate(calc(var(--p, 0) * -8px), calc(var(--a, 0) * 10px))", opacity: "calc(1 - var(--a, 0) * 0.85)" }}>{agent.title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-fg/65"
            style={{ transform: "translate(calc(var(--p, 0) * -14px), calc(var(--a, 0) * 12px))", opacity: "calc(1 - var(--a, 0) * 0.9)" }}>{agent.summary}</p>
        </div>

        <div className="origin-left" style={{ transform: "translateX(calc(var(--p, 0) * -20px)) scaleX(calc(1 - var(--a, 0) * 0.5))", opacity: "calc(1 - var(--a, 0))" }}>
          <FlowDots steps={agent.flow.length} accent={agent.accent} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span
            className="inline-flex items-center gap-2 rounded-pill px-3 py-1.5 font-heading text-[10.5px] font-bold uppercase tracking-[0.08em]"
            style={{ background: `color-mix(in srgb, ${agent.accent} 12%, transparent)`, color: text }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: agent.accent }} />
            {agent.cadence}
          </span>
          <span className="flex items-center gap-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: text }}>
            <span className="hidden sm:inline">Case study</span>
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:bg-[var(--tool)] group-hover:text-[var(--on)]"
              style={{ borderColor: `color-mix(in srgb, ${agent.accent} 55%, transparent)`, "--on": onAccent(agent.accent) } as React.CSSProperties}
            >
              <ArrowUpRight size={17} className="transition-transform duration-300 motion-safe:group-hover:rotate-45" />
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// Every figure here is stated on the resume — no rounded-up or
// estimated numbers standing in for metrics that were never measured.
const impactStats = [
  { Icon: Clock, value: "4–8 Hrs", label: "Saved / Week", color: "#5B9BF0" },
  { Icon: Target, value: "17", label: "Billing Checks", color: "var(--color-accent)" },
  { Icon: Zap, value: "4–5", label: "Programs at Once", color: "var(--color-accent)" },
  { Icon: Users, value: "7", label: "Agents Built", color: "#2DD4BF" },
] as const;

function ImpactStatIcon({ stat, active, delay }: { stat: (typeof impactStats)[number]; active: boolean; delay: number }) {
  const { Icon, value, label, color } = stat;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left px-2"
    >
      <Icon size={28} strokeWidth={1.6} style={{ color, filter: `drop-shadow(0 0 6px color-mix(in srgb, ${color} 65%, transparent))` }} />
      <p className="font-heading text-[24px] sm:text-[26px] font-bold text-fg leading-none mt-1">{value}</p>
      <p className="text-[12px] text-fg/55 leading-snug">{label}</p>
    </motion.div>
  );
}

function BusinessImpactPanel({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative mt-6 rounded-2xl p-6 sm:p-8 overflow-hidden"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <div
        className="absolute top-5 right-5 w-7 h-7 pointer-events-none"
        style={{ backgroundImage: DOT_PATTERN, backgroundSize: "8px 8px", opacity: 0.6 }}
        aria-hidden="true"
      />
      <p className="flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-7">
        Business Impact <Sparkle size={13} />
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {impactStats.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              "relative pl-5 -ml-5 lg:pl-6 lg:-ml-0",
              i % 2 === 1 ? "border-l border-fg/10" : "border-l border-transparent",
              i >= 2 ? "border-t border-fg/10 pt-6 -mt-px" : "",
              "lg:border-t-0 lg:pt-0 lg:mt-0",
              i === 0 ? "lg:border-l-0" : "lg:border-l lg:border-fg/10",
            ].join(" ")}
          >
            <ImpactStatIcon stat={stat} active={inView} delay={0.15 + i * 0.1} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ToolsBuilt() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tools" className="py-24" style={{ background: NAVY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="mb-12">
          <SectionHeading
            eyebrow="04 / TOOLS BUILT"
            segments={[
              { text: "Small agents", style: "fill" },
              { text: "for the work that repeats.", style: "lime" },
            ]}
            className="mb-5"
          />
          <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed">
            Running four or five programs means the same reports, checks, and setup every week. I automated the
            parts that didn&apos;t need me. Together they save{" "}
            <strong className="text-accent font-semibold">4–8 hours</strong> a week.
          </p>
        </div>

        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, i) => (
            <AgentCard
              key={agent.slug}
              agent={agent}
              index={i}
              inView={inView}
              // seven cards: centre the last one instead of leaving it orphaned
              className={i === agents.length - 1 ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.625rem)] lg:col-span-1 lg:col-start-2 lg:w-full" : ""}
            />
          ))}
        </div>
        <SwipeCarousel ariaLabel="Tool case studies, swipeable" className="sm:hidden" autoPlay accents={agents.map((a) => a.accent)}>
          {agents.map((agent, i) => (
            <AgentCard key={agent.slug} agent={agent} index={i} inView={inView} />
          ))}
        </SwipeCarousel>

        <BusinessImpactPanel inView={inView} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 rounded-2xl p-6 sm:p-8"
          style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
        >
          <p className="font-display text-[36px] leading-none text-accent mb-2">&ldquo;</p>
          <p className="text-[15px] sm:text-[16px] text-fg/75 italic leading-relaxed mb-4 max-w-2xl">
            Every one of these started because I got tired of doing the same thing by hand.
          </p>
          <p className="text-right font-signature text-[28px] text-accent">Rohit Singh</p>
        </motion.div>
      </div>
    </section>
  );
}
