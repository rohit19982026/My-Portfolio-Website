"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const eomSkill = {
  title: "EOM Billing Assistant",
  desc: "End-to-end AI skill that ingests raw time-entry data from the PSA tool, runs it through a 6-prompt chain (discrepancy detection → narrative generation → exception explanation), and produces a finance-ready billing summary. Built, tested, and deployed to 100% of the phData PMO team within 1 month.",
  stats: [
    { value: "60%", label: "Time Saved" },
    { value: "6", label: "Chained Prompts" },
    { value: ">95%", label: "Accuracy" },
    { value: "1 mo", label: "Full Adoption" },
  ],
};

const tools = [
  {
    category: "DELIVERY ASSURANCE",
    title: "Project Health Intelligence Agent",
    body: "End-of-month financial controls across the active portfolio in one pass — EAC vs. SOW, burn rate, rate-card compliance, PO coverage, billing event readiness, timecard hygiene. Flags exactly what needs PM attention; ignores what doesn't.",
    proof: "Runs across 4+ active programs. Replaces a 2-hour manual EOM checklist.",
    color: "#2563EB",
    borderTop: "#2563EB",
  },
  {
    category: "ENGINEERING SIGNAL",
    title: "Delivery Pulse Agent",
    body: "Triangulates Jira velocity, Slack signal, and meeting outcomes into standup-ready summaries — per-engineer progress, sprint burndown delta, blocker age, and yesterday's decisions.",
    proof: "Deployed on 3 active programs. Standup prep: 15 min → under 2 min.",
    color: "#10B981",
    borderTop: "#10B981",
  },
  {
    category: "EXECUTIVE BRIEFING",
    title: "Cross-Channel Brief Generator",
    body: "Synthesizes 72 hours of email, Slack DMs, channel activity, and meeting transcripts into a prioritized action list per project — flagged by urgency, stakeholder, and decision dependency.",
    proof: "Used weekly across active portfolio. Monday brief ready before 8am.",
    color: "#06B6D4",
    borderTop: "#06B6D4",
  },
  {
    category: "STAKEHOLDER COMMS",
    title: "Communication Engine",
    body: "Context-aware talking points, escalation drafts, and follow-ups for every stakeholder touchpoint — kickoff, steerco, escalation, renewal. Calibrated to audience seniority and political reality.",
    proof: "Active on every client engagement. Steerco decks drafted in under 20 min.",
    color: "#2563EB",
    borderTop: "#2563EB",
  },
  {
    category: "DISCOVERY",
    title: "Discovery Co-Pilot",
    body: "Plans discovery goals, stakeholder maps, RACI drafts, and interview methodology for new engagements — tailored to engagement type, scope, and constraints.",
    proof: "Used on 3 program kickoffs. Full RACI + WBS skeleton produced in 1 session.",
    color: "#10B981",
    borderTop: "#10B981",
  },
  {
    category: "META-CAPABILITY",
    title: "Agentic Workflow Designer",
    body: "The skill I use to build new skills — encodes patterns for step design, model selection, memory strategy, and validation gates. Every new agent ships production-ready.",
    proof: "Underlies all 5 agents above. New agent design-to-deploy: under 4 hours.",
    color: "#06B6D4",
    borderTop: "#06B6D4",
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
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              03 / TOOLS I&apos;VE BUILT
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            <span className="gradient-text italic font-normal">I don&apos;t just use AI</span>.
            <br />I build it.
          </h2>
          <p className="text-[16px] text-[#64748B] max-w-2xl leading-relaxed">
            A growing toolbox of{" "}
            <strong className="font-semibold text-[#0F172A]">Glean agents and skills</strong> that
            automate the parts of program management that should never have been manual — EOM
            controls, standup synthesis, executive briefs, stakeholder comms, discovery, and agent
            design itself.
          </p>
        </motion.div>

        {/* EOM Billing Skill — featured lead */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-8 mb-8"
          style={{ border: "2px solid #10B981", background: "#ffffff" }}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="inline-block font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-[#10B981] text-white mb-4 uppercase tracking-wider">
                Featured Build · phData Innovation Award
              </span>
              <h3 className="font-heading text-[22px] font-bold text-[#0F172A] mb-3 tracking-tight">
                {eomSkill.title}
              </h3>
              <p className="text-[13.5px] text-[#64748B] leading-relaxed">{eomSkill.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {eomSkill.stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 rounded-xl"
                  style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <div className="font-heading text-[22px] font-bold text-[#10B981] leading-none">{s.value}</div>
                  <div className="font-mono text-[9px] text-[#64748B] mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tools grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.08 + i * 0.07 }}
              className="p-7 rounded-2xl card-hover transition-colors duration-250 flex flex-col"
              style={{
                background: "#ffffff",
                border: "1px solid #E2E8F0",
                borderTop: `3px solid ${tool.borderTop}`,
              }}
            >
              {/* Dot + category */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: tool.color }}
                />
                <p
                  className="font-mono text-[9.5px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: tool.color }}
                >
                  {tool.category}
                </p>
              </div>
              <h3 className="font-heading text-[21px] font-bold leading-tight tracking-tight text-[#0F172A] mb-3">
                {tool.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[#64748B] flex-1">{tool.body}</p>
              <p
                className="mt-4 font-mono text-[10px] font-semibold px-2.5 py-1.5 rounded-lg w-fit"
                style={{ color: tool.color, background: `${tool.color}10`, border: `1px solid ${tool.color}25` }}
              >
                → {tool.proof}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
