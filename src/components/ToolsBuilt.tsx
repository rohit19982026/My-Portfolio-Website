"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tools = [
  {
    category: "DELIVERY ASSURANCE",
    title: "Project Health Intelligence Agent",
    body: "End-of-month financial controls across the active portfolio in one pass — EAC vs. SOW, burn rate, rate-card compliance, PO coverage, billing event readiness, timecard hygiene. Flags exactly what needs PM attention; ignores what doesn't.",
    color: "#A78BFA",
  },
  {
    category: "ENGINEERING SIGNAL",
    title: "Delivery Pulse Agent",
    body: "Triangulates Jira velocity, Slack signal, and meeting outcomes into standup-ready summaries — per-engineer progress, sprint burndown delta, blocker age, and yesterday's decisions. Surfaces risk before it hits the daily.",
    color: "#6EE7B7",
  },
  {
    category: "EXECUTIVE BRIEFING",
    title: "Cross-Channel Brief Generator",
    body: "Synthesizes 72 hours of email, Slack DMs, channel activity, and meeting transcripts into a prioritized action list per project — flagged by urgency, stakeholder, and decision dependency. Monday morning already prepped.",
    color: "#F0ABFC",
  },
  {
    category: "STAKEHOLDER COMMS",
    title: "Communication Engine",
    body: "Context-aware talking points, openers, escalation drafts, and follow-ups for every stakeholder touchpoint — kickoff, steerco, 1:1, escalation, renewal. Calibrated to audience seniority, decision context, and political reality.",
    color: "#A78BFA",
  },
  {
    category: "DISCOVERY",
    title: "Discovery Co-Pilot",
    body: "Plans discovery goals, stakeholder maps, RACI drafts, and interview methodology for new engagements — tailored to engagement type, scope, and constraints. Turns a kickoff into a plan, not a question dump.",
    color: "#6EE7B7",
  },
  {
    category: "META-CAPABILITY",
    title: "Agentic Workflow Designer",
    body: "The skill I use to build new skills — encodes patterns for step design, model selection, memory strategy, validation gates. Every new agent ships production-ready, with consistent QA built into the workflow.",
    color: "#F0ABFC",
  },
];

export default function ToolsBuilt() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tools" className="py-24 bg-[#0A0A12]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              03 / TOOLS I&apos;VE BUILT
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            <span className="gradient-text italic font-normal">I don&apos;t just use AI</span>.
            <br />I build it.
          </h2>
          <p className="text-[16px] text-[#A8A4C7] max-w-2xl leading-relaxed">
            A growing toolbox of{" "}
            <strong className="font-semibold text-[#EDE9FE]">Glean agents and skills</strong> that
            automate the parts of program management that should never have been manual — EOM
            controls, standup synthesis, executive briefs, stakeholder comms, discovery, and agent
            design itself.
          </p>
        </motion.div>

        {/* Tools grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(167,139,250,0.14)", gap: "1px", background: "rgba(167,139,250,0.1)" }}
        >
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.07 }}
              className="p-7 transition-colors duration-250"
              style={{ background: "#13131F" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1B1B2A"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#13131F"; }}
            >
              {/* Glowing dot + category */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: tool.color, boxShadow: `0 0 8px ${tool.color}` }}
                />
                <p
                  className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: tool.color }}
                >
                  {tool.category}
                </p>
              </div>
              <h3 className="font-display text-[21px] font-bold leading-tight tracking-tight text-[#EDE9FE] mb-3">
                {tool.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[#A8A4C7]">{tool.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
