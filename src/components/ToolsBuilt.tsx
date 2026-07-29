"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ComponentType } from "react";
import SectionHeading from "./ui/SectionHeading";
import BillingSkillDiagram from "./diagrams/BillingSkillDiagram";
import StandupBriefDiagram from "./diagrams/StandupBriefDiagram";
import ProjectSetupDiagram from "./diagrams/ProjectSetupDiagram";

// Raw blue reads as near-invisible foreground text on the dark ink card
// (contrast ~1.7:1) — it works as a fill/background, not as small text on
// ink, so this rotation stays lime/white only.
const tones = ["lime", "white", "lime", "white", "lime", "white"] as const;
const toneVar: Record<string, string> = {
  blue: "var(--color-blue)",
  lime: "var(--color-lime)",
  white: "var(--color-white)",
};

// The three diagrammed tools lead (row 1 in the 3-col grid); the three
// single-LLM-call tools without a diagram follow (row 2) — keeps each grid
// row a consistent height instead of interleaving tall/short cards.
const tools: {
  category: string;
  title: string;
  body: string;
  notes: string[];
  diagram?: ComponentType;
}[] = [
  {
    category: "MONTH-END BILLING",
    title: "Month-end billing review",
    body: "Every month I review the financial health of 4+ active programs — budget vs. spend, billing readiness, timecard compliance. I built a 6-step workflow that runs that review for me and flags what needs attention. 15 minutes instead of 2 hours. Now used across the team.",
    notes: ["2 hours → 15 minutes", "Used across the team"],
    diagram: BillingSkillDiagram,
  },
  {
    category: "STANDUP PREP",
    title: "Standup brief agent",
    body: "Before every standup I need to know what was actually completed, what's blocked, and whether the sprint is on track. This agent pulls from Jira, Slack, and meeting notes and gives me a one-page brief. 30 seconds of reading instead of 30 minutes of digging.",
    notes: ["30 minutes → 30 seconds", "Reads Jira, Slack, meeting notes"],
    diagram: StandupBriefDiagram,
  },
  {
    category: "PROJECT SETUP",
    title: "Project setup agent",
    body: "Standing up a new program used to take 3 hours — Jira board, sprint structure, risk log, RACI, governance templates. Give this agent the program brief and it provisions everything in 15 minutes. This is the one that won phData's Innovation Award.",
    notes: ["3 hours → 15 minutes", "phData Innovation Award"],
    diagram: ProjectSetupDiagram,
  },
  {
    category: "STATUS REPORTING",
    title: "Weekly status brief",
    body: "Writing status updates for 4+ programs every Monday used to take all morning. This agent reads 3 days of emails, Slack, and meeting notes per program and drafts the update. I review and edit — I don't write from scratch. Saves 5+ hours a week.",
    notes: ["5+ hours saved per week", "Runs across 4+ programs"],
  },
  {
    category: "STAKEHOLDER MESSAGES",
    title: "Stakeholder message drafter",
    body: "Escalations, renewal conversations, steerco openers — some messages are hard to write and slow to get right. I describe what I need to say and who I'm talking to, and this agent drafts a first version I can edit.",
    notes: ["Drafts I edit, not messages I send"],
  },
  {
    category: "PROGRAM KICKOFF",
    title: "Kickoff planning agent",
    body: "New program kickoffs are chaotic — nobody knows who owns what, scope isn't clear, questions outnumber answers. I give this agent the kickoff brief and it outputs a stakeholder map, interview guide, and discovery plan. Sprint 1 starts with structure.",
    notes: ["Discovery plan in one session"],
  },
];

function ToolCard({ tool, tone, index, inView }: { tool: (typeof tools)[number]; tone: string; index: number; inView: boolean }) {
  const Diagram = tool.diagram;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.07 }}
      className="p-7 transition-colors duration-[var(--duration-base)]"
      style={{ background: "color-mix(in srgb, var(--color-white) 3%, transparent)" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: toneVar[tone], boxShadow: `0 0 8px ${toneVar[tone]}` }}
        />
        <p className="font-heading text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: toneVar[tone] }}>
          {tool.category}
        </p>
      </div>
      <h3 className="font-heading text-[18px] font-bold leading-snug text-white mb-3">
        {tool.title}
      </h3>
      <p className="text-[13px] leading-relaxed text-white/70 mb-5">{tool.body}</p>
      <ul className="space-y-1.5 mb-2">
        {tool.notes.map((n) => (
          <li key={n} className="flex items-center gap-2 font-heading text-[10px]" style={{ color: toneVar[tone] }}>
            <span className="shrink-0">·</span>
            {n}
          </li>
        ))}
      </ul>

      {Diagram && (
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="font-heading text-[9.5px] font-bold uppercase tracking-[0.16em] text-white/50 mb-3">
            How it flows
          </p>
          <Diagram />
        </div>
      )}
    </motion.div>
  );
}

export default function ToolsBuilt() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tools" className="py-24 bg-ink">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-14">
          <SectionHeading
            eyebrow="03 / TOOLS I'VE BUILT"
            segments={[
              { text: "Six tools I built to", style: "fill" },
              { text: "stop doing things manually.", style: "lime" },
            ]}
          />
          <p className="text-[16px] text-white/70 max-w-2xl leading-relaxed mt-5">
            Monthly financial reviews used to take{" "}
            <strong className="font-semibold text-white">2 hours</strong>. Standup prep took{" "}
            <strong className="font-semibold text-white">30 minutes</strong>. Status updates
            took all morning. I automated all of it.
          </p>
        </div>

        {/* Tools grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-card"
          style={{ border: "1px solid rgba(255,255,255,0.14)", gap: "1px", background: "rgba(255,255,255,0.08)" }}
        >
          {tools.map((tool, i) => (
            <ToolCard key={tool.title} tool={tool} tone={tones[i]} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
