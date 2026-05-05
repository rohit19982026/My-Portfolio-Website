"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import MigrationDiagram from "./diagrams/MigrationDiagram";
import ELTPipelineDiagram from "./diagrams/ELTPipelineDiagram";
import AISkillDiagram from "./diagrams/AISkillDiagram";

const diagrams = [
  {
    id: "migration",
    title: "Redshift → Databricks Migration",
    description:
      "End-to-end architecture for migrating 2,300+ objects from Amazon Redshift to Databricks Delta Lake using a phased, zero-downtime approach.",
    tags: ["Redshift", "Databricks", "Delta Lake", "dbt", "Unity Catalog"],
    color: "#2563eb",
    component: MigrationDiagram,
  },
  {
    id: "elt",
    title: "ELT Pipeline Architecture",
    description:
      "Multi-source ingestion pipeline using Fivetran → Bronze landing → dbt Silver/Gold transformation → BI consumption layer.",
    tags: ["Fivetran", "dbt", "Snowflake", "Tableau", "Sigma"],
    color: "#06b6d4",
    component: ELTPipelineDiagram,
  },
  {
    id: "ai",
    title: "EOM Billing AI Skill Architecture",
    description:
      "6-prompt chained AI skill that processes PSA billing data, detects discrepancies, generates narratives, and produces finance-ready output with PM review gate.",
    tags: ["LLM", "Prompt Chaining", "JSON Schema", "Guardrails", "PMO"],
    color: "#10b981",
    component: AISkillDiagram,
  },
];

export default function Diagrams() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const ActiveDiagram = diagrams[active].component;

  return (
    <section id="diagrams" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
            Architecture Diagrams
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3 mb-4">
            How the systems <span className="gradient-text">actually connect</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Architecture diagrams from real projects — drawn from the discovery and
            design artifacts delivered to clients.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {diagrams.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === i
                  ? "text-white shadow-md"
                  : "bg-[#f0f9ff] text-[#6b7280] border border-[#bfdbfe] hover:border-[#2563eb] hover:text-[#2563eb]"
              }`}
              style={active === i ? { backgroundColor: d.color } : {}}
            >
              {d.title}
            </button>
          ))}
        </motion.div>

        {/* Diagram card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border-2 bg-white p-6 md:p-10"
          style={{ borderColor: `${diagrams[active].color}40` }}
        >
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div>
              <h3 className="font-heading font-bold text-xl text-[#111827] mb-2">
                {diagrams[active].title}
              </h3>
              <p className="text-sm text-[#6b7280] max-w-lg leading-relaxed">
                {diagrams[active].description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {diagrams[active].tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                  style={{ backgroundColor: diagrams[active].color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Diagram canvas */}
          <div className="rounded-xl bg-[#f8faff] border border-[#e8f0fe] p-4 md:p-6">
            <ActiveDiagram key={active} />
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#6b7280]">
            <span className="flex items-center gap-1.5">
              <span className="w-8 h-0.5 bg-[#bfdbfe] inline-block" />
              Data flow
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#2563eb] inline-block" />
              Platform / core layer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#10b981] inline-block" />
              Transform / output
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#f59e0b] inline-block" />
              Source / input
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
