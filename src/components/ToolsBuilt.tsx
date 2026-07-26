"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tools = [
  {
    category: "MONTH-END BILLING",
    title: "Month-end billing review",
    body: "Every month I review the financial health of 4+ active programs — budget vs. spend, billing readiness, timecard compliance. I built a 6-step workflow that runs that review for me and flags what needs attention. 15 minutes instead of 2 hours. Now used across the team.",
    color: "#A78BFA",
    notes: ["2 hours → 15 minutes", "Used across the team"],
  },
  {
    category: "STANDUP PREP",
    title: "Standup brief agent",
    body: "Before every standup I need to know what was actually completed, what's blocked, and whether the sprint is on track. This agent pulls from Jira, Slack, and meeting notes and gives me a one-page brief. 30 seconds of reading instead of 30 minutes of digging.",
    color: "#6EE7B7",
    notes: ["30 minutes → 30 seconds", "Reads Jira, Slack, meeting notes"],
  },
  {
    category: "STATUS REPORTING",
    title: "Weekly status brief",
    body: "Writing status updates for 4+ programs every Monday used to take all morning. This agent reads 3 days of emails, Slack, and meeting notes per program and drafts the update. I review and edit — I don't write from scratch. Saves 5+ hours a week.",
    color: "#F0ABFC",
    notes: ["5+ hours saved per week", "Runs across 4+ programs"],
  },
  {
    category: "STAKEHOLDER MESSAGES",
    title: "Stakeholder message drafter",
    body: "Escalations, renewal conversations, steerco openers — some messages are hard to write and slow to get right. I describe what I need to say and who I'm talking to, and this agent drafts a first version I can edit.",
    color: "#A78BFA",
    notes: ["Drafts I edit, not messages I send"],
  },
  {
    category: "PROGRAM KICKOFF",
    title: "Kickoff planning agent",
    body: "New program kickoffs are chaotic — nobody knows who owns what, scope isn't clear, questions outnumber answers. I give this agent the kickoff brief and it outputs a stakeholder map, interview guide, and discovery plan. Sprint 1 starts with structure.",
    color: "#6EE7B7",
    notes: ["Discovery plan in one session"],
  },
  {
    category: "PROJECT SETUP",
    title: "Project setup agent",
    body: "Standing up a new program used to take 3 hours — Jira board, sprint structure, risk log, RACI, governance templates. Give this agent the program brief and it provisions everything in 15 minutes. This is the one that won phData's Innovation Award.",
    color: "#F0ABFC",
    notes: ["3 hours → 15 minutes", "phData Innovation Award"],
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
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              03 / TOOLS I&apos;VE BUILT
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Six tools I built to{" "}
            <span className="gradient-text font-normal">stop doing things manually</span>.
          </h2>
          <p className="text-[16px] text-[#A8A4C7] max-w-2xl leading-relaxed">
            Monthly financial reviews used to take{" "}
            <strong className="font-semibold text-[#EDE9FE]">2 hours</strong>. Standup prep took{" "}
            <strong className="font-semibold text-[#EDE9FE]">30 minutes</strong>. Status updates
            took all morning. I automated all of it.
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
                  className="font-heading text-[9.5px] font-bold uppercase tracking-[0.18em]"
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
                {tool.notes.map((n) => (
                  <li key={n} className="flex items-center gap-2 font-heading text-[10px]" style={{ color: tool.color }}>
                    <span className="shrink-0">·</span>
                    {n}
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
