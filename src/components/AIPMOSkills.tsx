"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const PURPLE = "#7C3AED";
const PURPLE_SOFT = "#A78BFA";
const PURPLE_BG = "#EDE9FF";

const skills = [
  {
    id: "sprint",
    icon: "⚡",
    label: "Sprint Intelligence",
    title: "Velocity & Blocker Analytics Engine",
    color: PURPLE,
    accentBg: "#F5F3FF",
    accentBorder: "#DDD6FE",
    summary:
      "Transforms raw ticket export CSVs into a ranked team velocity report — per-engineer scorecards, week-on-week trends, and auto-generated PM action items.",
    capabilities: [
      "Ranked scorecards sorted by gap-to-weekly-target with trend arrows",
      "Blocker age tiers (Fresh → Monitor → Escalate → Critical) using status-change timestamps",
      "Cascade unblock detection — which closes freed upstream blockers this week",
      "Delivery pattern health: flags end-of-sprint bunching vs. steady throughput",
      "Stale In Progress detection with validation coverage check",
      "Auto PM action items: escalation drafts, coaching nudges, 1-on-1 flags, recognition",
    ],
    output: "Weekly markdown report + per-person scorecard table",
  },
  {
    id: "billing",
    icon: "📊",
    label: "Billing Compliance",
    title: "End-of-Month Financial Compliance Auditor",
    color: "#059669",
    accentBg: "#ECFDF5",
    accentBorder: "#A7F3D0",
    summary:
      "Multi-phase audit that queries live project management data, validates rate card alignment, surfaces timecard approval gaps, and checks purchase order compliance — producing an action-first HTML dashboard.",
    capabilities: [
      "Rate card validation: flags zero rates, bill-above-list anomalies, OTD discount consistency",
      "Opportunity cross-validation: assignment rates checked against what was sold",
      "Timecard approval gap analysis: approved-not-in-financials, submitted-not-approved, missing",
      "BE-aware budget affordability: avoids double-counting in-period timecards",
      "Purchase order verification across project, opportunity, and budget records",
      "Structured HTML compliance dashboard with severity tiers (Critical / Warning / OK)",
    ],
    output: "HTML audit dashboard + inline action table grouped by financial impact",
  },
  {
    id: "agent",
    icon: "🤖",
    label: "Agent Orchestration",
    title: "Agentic Workflow Design System",
    color: "#0891B2",
    accentBg: "#ECFEFF",
    accentBorder: "#A5F3FC",
    summary:
      "Complete reference and decision system for designing, prompting, and debugging multi-step AI agents — covering mode selection, step-type rules, memory management, and model routing.",
    capabilities: [
      "Mode selection guide: Auto vs Workflow with production-readiness checklist",
      "Step-type decision matrix: Think / Respond / Plan & Execute / Branch / Sub-agent",
      "Memory management rules: 128K limit, per-step isolation for large data retrieval",
      "Model routing table: cost-vs-capability assignment for 5 frontier models",
      "Count-Then-Verify pattern for reliable multi-row data extraction",
      "List-Then-Sum-Then-Recount pattern for accurate financial aggregations",
    ],
    output: "Step-by-step agent blueprint + QA checklist before publication",
  },
  {
    id: "optimizer",
    icon: "💡",
    label: "Token Optimizer",
    title: "AI Workflow Cost Optimization Engine",
    color: "#D97706",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    summary:
      "Audits skills, prompts, and Claude Code workflows for token efficiency — applying a 4-question triage gate and 5 optimization levers to deliver realized vs theoretical savings with honest trade-off reporting.",
    capabilities: [
      "Triage gate: size, invocation frequency, architecture soundness, cache reuse viability",
      "Progressive disclosure: push reference content out of always-loaded layer into on-demand files",
      "Cache-friendly structure: stable-before-volatile ordering to maximize prefix cache hits",
      "Scripts over instructions: deterministic work in scripts = zero context cost until called",
      "Model right-sizing: Opus 4.7 / Sonnet 4.6 / Haiku 4.5 decision matrix with breakeven math",
      "BEFORE/AFTER token delta report with realized vs theoretical savings clearly separated",
    ],
    output: "Optimization report + rewritten skill/prompt with preserved judgment context",
  },
];

const flowSteps = [
  {
    step: "01",
    label: "Trigger",
    desc: "PM invokes a skill via natural language — a CSV upload, a question, or a scheduled run.",
    icon: "⌨️",
  },
  {
    step: "02",
    label: "Route",
    desc: "The skill router matches the intent to the correct domain engine based on trigger keywords and context.",
    icon: "🔀",
  },
  {
    step: "03",
    label: "Process",
    desc: "Domain logic runs: data queries, validation rules, computation scripts, and verification patterns.",
    icon: "⚙️",
  },
  {
    step: "04",
    label: "Output",
    desc: "Action-first report delivered inline — ranked tables, severity flags, and specific PM next steps.",
    icon: "📋",
  },
];

const ASCII_DIAGRAM = `
┌──────────────────────────────────────────────────────────────────┐
│                  AI PM Automation Platform                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INPUT                  SKILL ENGINE            OUTPUT           │
│  ─────                  ────────────            ──────           │
│                                                                  │
│  Ticket CSV    ──►  Sprint Intelligence   ──►  Velocity Report   │
│  CRM/PSA API   ──►  Billing Auditor       ──►  Compliance Dash   │
│  Agent Query   ──►  Workflow Designer     ──►  Blueprint + QA    │
│  Prompt/Skill  ──►  Token Optimizer       ──►  Savings Report    │
│                                                                  │
│           ▼                                       ▼              │
│     [Deterministic                     [PM Action Items +        │
│      Scripts + Queries]                 Auto-Escalations]        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘`;

const techStack = [
  { name: "Claude Code", category: "Runtime" },
  { name: "Anthropic SDK", category: "LLM API" },
  { name: "Glean Platform", category: "Agent Host" },
  { name: "Python", category: "Scripting" },
  { name: "SOQL", category: "Data Query" },
  { name: "Framer Motion", category: "UI" },
  { name: "Prompt Caching", category: "Efficiency" },
  { name: "Markdown / HTML", category: "Output" },
];

export default function AIPMOSkills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const diagramRef = useRef(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "-60px" });
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-60px" });

  const [activeSkill, setActiveSkill] = useState(0);

  return (
    <section
      id="ai-skills"
      style={{ background: "#F3F1FF" }}
      className="py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full inline-block mb-5"
            style={{ background: PURPLE_BG, color: PURPLE }}
          >
            AI Engineering
          </span>
          <h2
            className="font-heading text-4xl sm:text-5xl font-bold mb-5"
            style={{ color: "#1A1040" }}
          >
            AI Agent Skills{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${PURPLE} 0%, #6D28D9 60%, ${PURPLE_SOFT} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Platform
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#5B4F8A" }}
          >
            A suite of custom agent skills — sprint velocity tracking, billing
            compliance auditing, agentic workflow design, and AI cost
            optimization — each encoding domain logic that used to live only in
            people's heads.
          </p>
        </motion.div>

        {/* ── Skill Tabs + Detail ── */}
        <div className="mb-16">
          {/* Tab strip */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {skills.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveSkill(i)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200"
                style={{
                  background: activeSkill === i ? s.color : "white",
                  borderColor: activeSkill === i ? s.color : "#DDD6FE",
                  color: activeSkill === i ? "white" : "#5B4F8A",
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {/* Active skill card */}
          <AnimatePresence mode="wait">
            {skills.map(
              (s, i) =>
                activeSkill === i && (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-3xl p-8 border-2"
                    style={{
                      background: s.accentBg,
                      borderColor: s.accentBorder,
                    }}
                  >
                    <div className="grid md:grid-cols-5 gap-8">
                      {/* Left: title + summary + output */}
                      <div className="md:col-span-2">
                        <div
                          className="text-4xl mb-4 w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ background: "white", fontSize: "1.8rem" }}
                        >
                          {s.icon}
                        </div>
                        <h3
                          className="font-heading text-2xl font-bold mb-3"
                          style={{ color: "#1A1040" }}
                        >
                          {s.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed mb-6"
                          style={{ color: "#5B4F8A" }}
                        >
                          {s.summary}
                        </p>
                        <div
                          className="text-xs font-bold uppercase tracking-widest mb-1.5"
                          style={{ color: s.color }}
                        >
                          Output
                        </div>
                        <div
                          className="text-sm px-4 py-3 rounded-xl font-medium"
                          style={{ background: "white", color: "#374151" }}
                        >
                          {s.output}
                        </div>
                      </div>

                      {/* Right: capabilities */}
                      <div className="md:col-span-3">
                        <div
                          className="text-xs font-bold uppercase tracking-widest mb-4"
                          style={{ color: s.color }}
                        >
                          Key Capabilities
                        </div>
                        <ul className="space-y-3">
                          {s.capabilities.map((cap, ci) => (
                            <motion.li
                              key={ci}
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ci * 0.07, duration: 0.3 }}
                              className="flex gap-3 items-start"
                            >
                              <span
                                className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                                style={{ background: s.color }}
                              >
                                {ci + 1}
                              </span>
                              <span
                                className="text-sm leading-relaxed"
                                style={{ color: "#374151" }}
                              >
                                {cap}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* ── ASCII System Diagram ── */}
        <motion.div
          ref={diagramRef}
          initial={{ opacity: 0, y: 28 }}
          animate={diagramInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <div className="text-center mb-6">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: PURPLE_SOFT }}
            >
              System Architecture
            </span>
          </div>
          <div
            className="rounded-2xl overflow-hidden border-2"
            style={{ borderColor: "#312E81" }}
          >
            {/* Terminal title bar */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{ background: "#1E1B4B" }}
            >
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span
                className="ml-3 text-xs font-mono"
                style={{ color: "#A5B4FC" }}
              >
                ai-pm-platform / architecture.txt
              </span>
            </div>
            {/* Diagram content */}
            <div style={{ background: "#0F0C29" }} className="px-6 py-6">
              <pre
                className="text-xs font-mono leading-relaxed overflow-x-auto"
                style={{ color: "#C4B5FD" }}
              >
                {ASCII_DIAGRAM}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* ── Animated Flow Walkthrough ── */}
        <motion.div
          ref={flowRef}
          initial={{ opacity: 0, y: 28 }}
          animate={flowInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#5B4F8A" }}
            >
              How It Works
            </span>
            <h3
              className="font-heading text-2xl font-bold mt-2"
              style={{ color: "#1A1040" }}
            >
              From trigger to PM action — in seconds
            </h3>
          </div>

          {/* Flow steps */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5"
              style={{ background: "linear-gradient(90deg, #DDD6FE, #A78BFA, #7C3AED, #DDD6FE)" }}
            />

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {flowSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  animate={flowInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 border-4 z-10"
                    style={{
                      background: "white",
                      borderColor: PURPLE_SOFT,
                      boxShadow: `0 0 0 6px #F3F1FF`,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: PURPLE }}
                  >
                    Step {step.step}
                  </div>
                  <div
                    className="font-heading font-bold text-base mb-2"
                    style={{ color: "#1A1040" }}
                  >
                    {step.label}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#5B4F8A" }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={flowInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {[
            { value: "4", label: "Skill Domains" },
            { value: "60%+", label: "Time Saved on EOM" },
            { value: "<2 min", label: "Sprint Report Run Time" },
            { value: "90%+", label: "Token Reduction (on optimized skills)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center border"
              style={{ background: "white", borderColor: "#DDD6FE" }}
            >
              <div
                className="font-heading text-2xl font-bold mb-1"
                style={{ color: PURPLE }}
              >
                {stat.value}
              </div>
              <div className="text-xs leading-tight" style={{ color: "#7B6BAB" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Tech Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={flowInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: "#9E92C8" }}
          >
            Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tool) => (
              <span
                key={tool.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                style={{
                  background: "white",
                  borderColor: "#DDD6FE",
                  color: "#374151",
                }}
              >
                {tool.name}
                <span
                  className="text-xs border-l pl-2"
                  style={{ color: "#9E92C8", borderColor: "#DDD6FE" }}
                >
                  {tool.category}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
