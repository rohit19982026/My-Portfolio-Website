"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    icon: "🧠",
    title: "Prompt Engineering",
    color: "#10b981",
    bg: "bg-emerald-50 border-emerald-200",
    points: [
      "Chain-of-thought scaffolding for multi-step reasoning tasks",
      "JSON schema enforcement to guarantee parseable LLM output",
      "Role + context + constraint prompting for domain accuracy",
      "Fallback and guardrail design for production reliability",
    ],
  },
  {
    icon: "⚙️",
    title: "AI Skill Architecture",
    color: "#2563eb",
    bg: "bg-blue-50 border-blue-200",
    points: [
      "Decompose complex workflows into discrete, automatable sub-tasks",
      "Chained prompt pipelines with structured I/O between steps",
      "Human-in-the-loop approval gates for high-stakes outputs",
      "Schema validation layer to catch hallucinations before delivery",
    ],
  },
  {
    icon: "📋",
    title: "PMO Automation",
    color: "#f59e0b",
    bg: "bg-amber-50 border-amber-200",
    points: [
      "Automated billing reconciliation (EOM Billing Skill — 60% time saved)",
      "AI-generated project status narratives from raw data inputs",
      "Risk flag detection across sprint data and SOW milestones",
      "Standardized output templates accepted directly by finance teams",
    ],
  },
  {
    icon: "🔗",
    title: "Integration Approach",
    color: "#06b6d4",
    bg: "bg-cyan-50 border-cyan-200",
    points: [
      "PSA tool → structured JSON → prompt orchestrator pipeline",
      "LLM API (GPT-4 / Claude) with deterministic output contracts",
      "Results surfaced in existing PM tooling (no workflow disruption)",
      "Version-controlled prompts treated as production code artifacts",
    ],
  },
];

const tools = [
  { name: "Claude / GPT-4", category: "LLM" },
  { name: "Prompt Chaining", category: "Technique" },
  { name: "JSON Schema", category: "Output Control" },
  { name: "phData AI Skills", category: "Platform" },
  { name: "Python", category: "Scripting" },
  { name: "Jira Automation", category: "PMO" },
  { name: "CoT Prompting", category: "Technique" },
  { name: "Guardrails", category: "Reliability" },
];

export default function AIPMOSkills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ai-pmo" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-[#10b981] uppercase tracking-widest">
            AI & PMO Skills
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3 mb-4">
            AI that <span className="gradient-text">works for the PM,</span>
            <br className="hidden sm:block" /> not just the engineer
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            I don&apos;t just manage AI projects — I build the tools. From prompt
            design to production deployment, here&apos;s how I approach AI enablement.
          </p>
        </motion.div>

        {/* Skill cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`p-6 rounded-2xl border-2 ${skill.bg} transition-shadow hover:shadow-md`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{skill.icon}</span>
                <h3
                  className="font-heading font-bold text-lg"
                  style={{ color: skill.color }}
                >
                  {skill.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {skill.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-[#374151] leading-relaxed">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: skill.color }}
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Featured AI Skill callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border-2 border-[#10b981] bg-white p-8 mb-14"
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#10b981] text-white mb-4 inline-block">
                Featured Build
              </span>
              <h3 className="font-heading text-2xl font-bold text-[#111827] mb-3">
                EOM Billing Assistant AI Skill
              </h3>
              <p className="text-[#374151] leading-relaxed mb-4">
                An end-to-end AI skill that ingests raw time-entry data from the PSA
                tool, runs it through a 6-prompt chain (discrepancy detection →
                narrative generation → exception explanation), and produces a
                finance-ready billing summary — in under 75 minutes vs. 3–4 hours manually.
              </p>
              <p className="text-sm text-[#6b7280]">
                Built, tested, and deployed to 100% of the phData PMO team within 1 month.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "60%", label: "Time Saved" },
                { value: "6", label: "Chained Prompts" },
                { value: ">95%", label: "Accuracy" },
                { value: "1 mo", label: "Full Adoption" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-[#ecfdf5] border border-[#10b981]/30"
                >
                  <div className="font-heading text-2xl font-bold text-[#10b981]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#6b7280] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tools used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-5">
            Tools & Techniques
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#bfdbfe] bg-white text-sm font-medium text-[#374151]"
              >
                {tool.name}
                <span className="text-xs text-[#6b7280] border-l border-[#bfdbfe] pl-2">
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
