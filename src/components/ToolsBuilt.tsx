"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tools = [
  {
    category: "EOM CONTROLS",
    title: "EOM Billing Skill",
    body: "End-of-month financial review across the full portfolio — EAC vs. SOW, burn rate, rate-card compliance, PO coverage, billing event readiness, timecard hygiene — in a single 6-prompt workflow. Flags exactly what needs PM attention.",
    color: "#A78BFA",
    proof: ["60% time saved on EOM controls", ">95% accuracy, first pass", "Adopted team-wide in 1 month"],
  },
  {
    category: "ENGINEERING SIGNAL",
    title: "Delivery Pulse Agent",
    body: "Pulls Jira velocity, Slack activity, and meeting transcripts into a single standup-ready brief — per-engineer progress, sprint burndown delta, and blocker age. Surfaces what's lagging before the daily standup.",
    color: "#6EE7B7",
    proof: ["30+ min saved per standup prep", "Triangulates 3 signal sources", "Blocker detection before escalation"],
  },
  {
    category: "EXECUTIVE BRIEFING",
    title: "Weekly Status Brief Generator",
    body: "Synthesizes 72 hours of email, Slack, and meeting transcripts into a prioritized per-project action list — flagged by urgency and decision dependency. Monday morning status already written.",
    color: "#F0ABFC",
    proof: ["5+ hrs saved per week, PM overhead", "Covers 4+ active programs in parallel", "Used in live client reporting"],
  },
  {
    category: "STAKEHOLDER COMMS",
    title: "Stakeholder Message Designer",
    body: "Drafts context-aware talking points, escalation messages, steerco openers, and renewal closes — calibrated to audience seniority, political context, and the specific decision at stake.",
    color: "#A78BFA",
    proof: ["Covers kickoff → renewal lifecycle", "Seniority-calibrated drafts", "Saves 20+ min per high-stakes message"],
  },
  {
    category: "DISCOVERY",
    title: "Discovery Co-Pilot",
    body: "Generates stakeholder maps, RACI drafts, interview guides, and a phased discovery plan from a single kickoff brief. Turns an ambiguous scope conversation into a structured plan before Sprint 1.",
    color: "#6EE7B7",
    proof: ["Full discovery plan in 1 session", "Covers RACI, risk, and interview methodology", "Tailored to engagement type and scope"],
  },
  {
    category: "PROVISIONING",
    title: "Project Setup Agent",
    body: "Provisions Jira boards, sprint structure, RAID logs, RACI matrices, and governance templates for a new engagement — end to end. Cut project onboarding from 3 hours to 15 minutes.",
    color: "#F0ABFC",
    proof: ["3 hrs → 15 min onboarding", "Won phData Innovation Award", "Triggers Slack notifications automatically"],
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
              <p className="text-[13px] leading-relaxed text-[#A8A4C7] mb-5">{tool.body}</p>
              <ul className="space-y-1.5">
                {tool.proof.map((p) => (
                  <li key={p} className="flex items-center gap-2 font-mono text-[10px]" style={{ color: tool.color }}>
                    <span className="shrink-0">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
