"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Clock, Sparkle, Target, Users, Zap } from "lucide-react";
import { agents, type Agent } from "@/lib/agents";

const NAVY = "var(--color-surface-alt)";
const CARD_BG = "var(--color-card)";
const CARD_BORDER = "var(--color-card-border)";
const DOT_PATTERN = "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)";

// Short card: the full story (problem, what I solved, the flow) lives on
// /tools/<slug>, so the home page only has to say what each tool is.
function AgentCard({ agent, index, inView }: { agent: Agent; index: number; inView: boolean }) {
  const Icon = agent.icon;
  const color = `color-mix(in srgb, ${agent.accent} var(--accent-text-mix), var(--color-fg))`;
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.05 }}
    >
      <Link
        href={`/tools/${agent.slug}`}
        className="group flex h-full min-h-11 items-center gap-4 rounded-2xl p-4 transition-colors hover:border-accent sm:flex-col sm:items-start sm:gap-3 sm:p-5"
        style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderTop: `3px solid ${agent.accent}` }}
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: `color-mix(in srgb, ${agent.accent} 18%, transparent)` }}
        >
          <Icon size={18} strokeWidth={2} style={{ color: agent.accent }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="font-heading text-[15px] font-bold leading-snug text-fg">{agent.title}</span>
            <span
              className="shrink-0 rounded-pill px-2 py-0.5 font-heading text-[9.5px] font-bold uppercase tracking-[0.06em]"
              style={{ border: `1px solid color-mix(in srgb, ${agent.accent} 45%, transparent)`, color }}
            >
              {agent.cadence}
            </span>
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-fg/65">{agent.summary}</span>
          <span
            className="mt-3 hidden items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] transition-transform group-hover:translate-x-0.5 sm:inline-flex"
            style={{ color }}
          >
            Read case study <ArrowRight size={13} />
          </span>
        </span>
        <ArrowRight size={18} className="shrink-0 text-fg/40 sm:hidden" aria-hidden />
      </Link>
    </motion.li>
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
        <div ref={ref} className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] mb-5 text-accent"
          >
            04 / TOOLS BUILT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading normal-case font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight text-fg mb-5"
          >
            Small agents <span className="text-accent">for the work that repeats.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[15px] sm:text-[16px] text-fg/70 max-w-2xl leading-relaxed"
          >
            Running four or five programs means the same reports, checks, and setup every week. I automated the
            parts that didn&apos;t need me. Together they save{" "}
            <strong className="text-accent font-semibold">4–8 hours</strong> a week.
          </motion.p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {agents.map((agent, i) => (
            <AgentCard key={agent.slug} agent={agent} index={i} inView={inView} />
          ))}
        </ul>

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
