"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Technologies Rohit leads projects on — not code he writes himself
const managedPlatforms = [
  {
    category: "Data Platforms",
    color: "#2563eb",
    bg: "bg-blue-50 border-blue-200",
    icon: "🏗️",
    context: "Led migrations & implementations on",
    items: [
      { name: "Databricks", note: "2,300+ object migration, Delta Lake architecture" },
      { name: "Snowflake", note: "Greenfield implementation, RBAC design" },
      { name: "Amazon Redshift", note: "Legacy platform → migration planning & execution" },
      { name: "Apache Spark", note: "Performance tuning oversight, cluster policy design" },
    ],
  },
  {
    category: "ELT & Pipelines",
    color: "#06b6d4",
    bg: "bg-cyan-50 border-cyan-200",
    icon: "🔄",
    context: "Scoped, managed delivery of teams building with",
    items: [
      { name: "dbt-core", note: "Model architecture reviews, testing strategy, docs standards" },
      { name: "Apache Airflow", note: "DAG delivery oversight, SLA monitoring" },
      { name: "Fivetran", note: "Connector selection, ingestion scope definition" },
      { name: "SQL", note: "Query review, data validation sign-off" },
    ],
  },
  {
    category: "Cloud Infrastructure",
    color: "#10b981",
    bg: "bg-emerald-50 border-emerald-200",
    icon: "☁️",
    context: "Directed cloud deployments and architecture decisions on",
    items: [
      { name: "AWS (S3, Glue, IAM)", note: "IAM policy review, cost management, infra decisions" },
      { name: "Azure (ADF, ADLS)", note: "Pipeline architecture oversight, access governance" },
      { name: "Git / CI-CD", note: "Branch strategy, PR workflow standards for data teams" },
      { name: "Terraform", note: "IaC delivery oversight, environment parity enforcement" },
    ],
  },
];

// Tools Rohit uses directly in his own day-to-day work
const directTools = [
  { name: "Jira & Confluence", icon: "📋", desc: "Sprint planning, backlog grooming, stakeholder docs" },
  { name: "Prompt Engineering", icon: "🧠", desc: "Chain-of-thought prompts, JSON schema output design" },
  { name: "AI Skill Building", icon: "🤖", desc: "Built EOM Billing Skill on phData's AI platform" },
  { name: "SQL (analysis)", icon: "🔍", desc: "Data validation, reconciliation queries, QA checks" },
  { name: "Python (scripting)", icon: "🐍", desc: "Automation scripts for reporting and data extraction" },
  { name: "Stakeholder Reporting", icon: "📊", desc: "Exec decks, risk registers, project health dashboards" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
            Technical Fluency
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3 mb-4">
            Platforms I lead,{" "}
            <span className="gradient-text">tools I use</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto text-base leading-relaxed">
            As a Technical PM, my value is knowing these platforms deeply enough to
            scope accurately, identify risk early, and bridge engineering teams with
            business stakeholders — not to write the code myself.
          </p>
        </motion.div>

        {/* Divider label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 my-10"
        >
          <div className="flex-1 h-px bg-[#bfdbfe]" />
          <span className="text-xs font-bold text-[#2563eb] uppercase tracking-widest px-3">
            Technologies I manage & lead projects on
          </span>
          <div className="flex-1 h-px bg-[#bfdbfe]" />
        </motion.div>

        {/* Managed platforms — 3 cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {managedPlatforms.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + gi * 0.1 }}
              className={`p-6 rounded-2xl border-2 ${group.bg}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{group.icon}</span>
                <h3 className="font-heading font-bold text-[#111827]" style={{ color: group.color }}>
                  {group.category}
                </h3>
              </div>
              <p className="text-xs text-[#6b7280] mb-4 italic">{group.context}:</p>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
                        style={{ backgroundColor: group.color }}
                      />
                      <span className="font-semibold text-sm text-[#111827]">{item.name}</span>
                    </div>
                    <p className="text-xs text-[#6b7280] leading-relaxed pl-3.5">{item.note}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 h-px bg-[#bfdbfe]" />
          <span className="text-xs font-bold text-[#10b981] uppercase tracking-widest px-3">
            Tools I use directly, every day
          </span>
          <div className="flex-1 h-px bg-[#bfdbfe]" />
        </motion.div>

        {/* Direct tools grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {directTools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.55 + i * 0.07 }}
              className="flex gap-4 items-start p-4 rounded-xl border border-[#bfdbfe] bg-[#f0f9ff] hover:shadow-md hover:shadow-blue-100 transition-shadow"
            >
              <span className="text-2xl shrink-0">{tool.icon}</span>
              <div>
                <p className="font-heading font-semibold text-sm text-[#111827] mb-0.5">
                  {tool.name}
                </p>
                <p className="text-xs text-[#6b7280] leading-relaxed">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
