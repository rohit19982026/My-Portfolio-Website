"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stacks = [
  {
    label: "// DATA PLATFORMS DELIVERED ON",
    color: "#2563eb",
    items: ["Snowflake", "Databricks", "Amazon Redshift", "SQL Server", "Hadoop / HDFS", "SigmaBI"],
  },
  {
    label: "// ENGINEERING TOOLING IN-PROGRAM",
    color: "#06b6d4",
    items: ["dbt", "Airflow / MWAA", "ETL / ELT Pipelines", "Qlik Replicate", "Spark SQL", "LandingAI / Computer Vision", "AWS", "Azure"],
  },
  {
    label: "// PMO & DELIVERY STACK I OPERATE DAILY",
    color: "#10b981",
    items: ["Jira", "Confluence", "Kantata (PSA)", "MS Project", "Azure DevOps", "Asana", "Salesforce", "Slack / Teams"],
  },
  {
    label: "// AI & AUTOMATION LAYER I'VE BUILT",
    color: "#f59e0b",
    items: ["Glean Agent Builder", "Claude (Anthropic)", "n8n (workflow automation)", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Google Drive MCP"],
  },
];

export default function DeliveryExposure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="exposure" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-5xl font-bold text-[#e5e7eb]">04</span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">/ DELIVERY EXPOSURE</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#111827] mb-4">
            Programs I&apos;ve delivered{" "}
            <span className="gradient-text">across these stacks.</span>
          </h2>
          <p className="text-[#374151] max-w-2xl leading-relaxed mb-4">
            I&apos;m a Technical Program Manager, not a hands-on engineer. What follows is the
            technology surface area I&apos;ve owned delivery across — enough fluency to scope,
            sequence, govern risk, and make defensible trade-offs in architecture conversations.
          </p>
          <p className="text-sm text-[#6b7280] font-semibold border-l-4 border-[#2563eb] pl-4 py-1 italic">
            The engineering belongs to the team. The plan, the controls, and the outcome belong to me.
          </p>
        </motion.div>

        {/* Stack groups */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {stacks.map((stack, si) => (
            <motion.div
              key={stack.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + si * 0.1 }}
              className="bg-white rounded-2xl border border-[#e5e7eb] p-6"
            >
              <p
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4"
                style={{ color: stack.color }}
              >
                {stack.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm font-semibold px-3 py-1.5 rounded-lg border text-[#374151]"
                    style={{ borderColor: `${stack.color}40`, backgroundColor: `${stack.color}08` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-xs font-mono text-[#9ca3af] border border-dashed border-[#e5e7eb] rounded-xl p-4 max-w-3xl"
        >
          <span className="text-[#2563eb]">// </span>
          Read this as delivery surface area, not a technical skills inventory. My value is in
          program design, financial governance, and risk anticipation across these technologies
          — not in writing the code that runs on them.
        </motion.div>
      </div>
    </section>
  );
}
