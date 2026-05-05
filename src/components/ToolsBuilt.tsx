"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tools = [
  {
    category: "DELIVERY ASSURANCE",
    title: "Project Health Intelligence Agent",
    body: "End-of-month financial controls across the active portfolio in one pass — EAC vs. SOW, burn rate, rate-card compliance, PO coverage, billing event readiness, timecard hygiene. Flags exactly what needs PM attention; ignores what doesn't.",
    color: "#2563eb",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    category: "ENGINEERING SIGNAL",
    title: "Delivery Pulse Agent",
    body: "Triangulates Jira velocity, Slack signal, and meeting outcomes into standup-ready summaries — per-engineer progress, sprint burndown delta, blocker age, and yesterday's decisions. Surfaces risk before it hits the daily.",
    color: "#06b6d4",
    bg: "bg-cyan-50 border-cyan-100",
  },
  {
    category: "EXECUTIVE BRIEFING",
    title: "Cross-Channel Brief Generator",
    body: "Synthesizes 72 hours of email, Slack DMs, channel activity, and meeting transcripts into a prioritized action list per project — flagged by urgency, stakeholder, and decision dependency. Monday morning already prepped.",
    color: "#10b981",
    bg: "bg-emerald-50 border-emerald-100",
  },
  {
    category: "STAKEHOLDER COMMS",
    title: "Communication Engine",
    body: "Context-aware talking points, openers, escalation drafts, and follow-ups for every stakeholder touchpoint — kickoff, steerco, 1:1, escalation, renewal. Calibrated to audience seniority, decision context, and political reality.",
    color: "#f59e0b",
    bg: "bg-amber-50 border-amber-100",
  },
  {
    category: "DISCOVERY",
    title: "Discovery Co-Pilot",
    body: "Plans discovery goals, stakeholder maps, RACI drafts, and interview methodology for new engagements — tailored to engagement type, scope, and constraints. Turns a kickoff into a plan, not a question dump.",
    color: "#2563eb",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    category: "META-CAPABILITY",
    title: "Agentic Workflow Designer",
    body: "The skill I use to build new skills — encodes patterns for step design, model selection, memory strategy, validation gates. Every new agent ships production-ready, with consistent QA built into the workflow.",
    color: "#10b981",
    bg: "bg-emerald-50 border-emerald-100",
  },
];

export default function ToolsBuilt() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tools" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-5xl font-bold text-[#e5e7eb]">03</span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">/ TOOLS I&apos;VE BUILT</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#111827] mb-4">
            I don&apos;t just use AI.{" "}
            <span className="gradient-text">I build it.</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl leading-relaxed">
            A growing toolbox of Glean agents and skills that automate the parts of program
            management that should never have been manual — EOM controls, standup synthesis,
            executive briefs, stakeholder comms, discovery, and agent design itself. Each one
            replaces hours of PM work I no longer have to do.
          </p>
        </motion.div>

        {/* Tools grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className={`p-6 rounded-2xl border ${tool.bg} hover:shadow-md transition-shadow`}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                style={{ color: tool.color }}
              >
                {tool.category}
              </p>
              <h3 className="font-heading font-bold text-[#111827] text-base mb-3 leading-snug">
                {tool.title}
              </h3>
              <p className="text-sm text-[#374151] leading-relaxed">{tool.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
