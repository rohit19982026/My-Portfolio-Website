"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const domains = [
  {
    icon: "⚡",
    title: "Databricks & Lakehouse",
    desc: "End-to-end platform migrations to Databricks Delta Lake. Unity Catalog, medallion architecture, and performance-tuned ELT at enterprise scale.",
    color: "bg-blue-50 border-blue-200 hover:border-[#2563eb]",
    tag: "Primary Platform",
    tagColor: "bg-[#2563eb] text-white",
  },
  {
    icon: "❄️",
    title: "Snowflake",
    desc: "Greenfield Snowflake implementations, schema design, role-based access control, and cross-region data sharing for global operations.",
    color: "bg-cyan-50 border-cyan-200 hover:border-[#06b6d4]",
    tag: "Cloud DW",
    tagColor: "bg-[#06b6d4] text-white",
  },
  {
    icon: "🔴",
    title: "Amazon Redshift",
    desc: "Legacy Redshift architecture analysis, migration planning, and cutover execution. Specialized in Redshift → Databricks lift-and-shift.",
    color: "bg-orange-50 border-orange-200 hover:border-[#f59e0b]",
    tag: "Migration Source",
    tagColor: "bg-[#f59e0b] text-white",
  },
  {
    icon: "🔄",
    title: "ELT Pipelines",
    desc: "dbt-core modeling, Airflow orchestration, and CI/CD for data pipelines. Incremental loading strategies, data quality contracts, and lineage tracking.",
    color: "bg-emerald-50 border-emerald-200 hover:border-[#10b981]",
    tag: "Transformation",
    tagColor: "bg-[#10b981] text-white",
  },
  {
    icon: "☁️",
    title: "Cloud Infrastructure",
    desc: "AWS and Azure cloud architecture for data workloads. IAM, VPC networking, cost optimization, and infrastructure-as-code for data platform deployments.",
    color: "bg-blue-50 border-blue-200 hover:border-[#2563eb]",
    tag: "AWS / Azure",
    tagColor: "bg-[#2563eb] text-white",
  },
  {
    icon: "🤖",
    title: "AI / ML Enablement",
    desc: "Building LLM-powered PMO tools, prompt engineering frameworks, and AI skills that automate reporting, status updates, and risk identification.",
    color: "bg-emerald-50 border-emerald-200 hover:border-[#10b981]",
    tag: "AI Tooling",
    tagColor: "bg-[#10b981] text-white",
  },
];

export default function Expertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="expertise" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
            Domain Knowledge
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3">
            Where I deliver <span className="gradient-text">the most value</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-default ${d.color}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{d.icon}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.tagColor}`}>
                  {d.tag}
                </span>
              </div>
              <h3 className="font-heading font-bold text-[#111827] text-lg mb-2">
                {d.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
