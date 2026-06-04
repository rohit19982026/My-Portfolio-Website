"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stacks = [
  {
    label: "// DATA PLATFORMS DELIVERED ON",
    color: "#7C3AED",
    pillBg: "rgba(124,58,237,0.08)",
    pillBorder: "rgba(124,58,237,0.2)",
    items: ["Snowflake", "Databricks", "Amazon Redshift", "SQL Server", "Hadoop / HDFS", "SigmaBI"],
  },
  {
    label: "// ENGINEERING TOOLING IN-PROGRAM",
    color: "#10B981",
    pillBg: "rgba(16,185,129,0.08)",
    pillBorder: "rgba(16,185,129,0.2)",
    items: ["dbt", "Airflow / MWAA", "ETL / ELT Pipelines", "Qlik Replicate", "Spark SQL", "LandingAI / Computer Vision", "AWS", "Azure"],
  },
  {
    label: "// PMO & DELIVERY STACK I OPERATE DAILY",
    color: "#06B6D4",
    pillBg: "rgba(6,182,212,0.08)",
    pillBorder: "rgba(6,182,212,0.2)",
    items: ["Jira", "Confluence", "Kantata (PSA)", "MS Project", "Azure DevOps", "Asana", "Salesforce", "Slack / Teams"],
  },
  {
    label: "// AI & AUTOMATION LAYER I'VE BUILT",
    color: "#7C3AED",
    pillBg: "rgba(124,58,237,0.08)",
    pillBorder: "rgba(124,58,237,0.2)",
    items: ["Glean Agent Builder", "Claude (Anthropic)", "n8n (workflow automation)", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Google Drive MCP"],
    note: "This stack powers the 6 AI agents currently running in production across the phData PMO.",
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
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
              05 / DELIVERY EXPOSURE
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Programs I&apos;ve delivered<br />
            across <span className="gradient-text italic font-normal">these stacks</span>.
          </h2>
          <p className="text-[15px] text-[#3D3358] max-w-2xl leading-relaxed mb-4">
            I&apos;m a Technical Program Manager, not a hands-on engineer. What follows is the
            technology surface area I&apos;ve owned delivery across — enough to scope, sequence,
            and govern risk without needing the engineering team to translate everything.
          </p>
          <p
            className="text-[14px] text-[#3D3358] font-semibold italic px-4 py-2.5 rounded-lg w-fit"
            style={{ borderLeft: "3px solid #7C3AED", background: "rgba(124,58,237,0.04)" }}
          >
            The engineering belongs to the team. The plan, the controls, and the outcome belong to me.
          </p>
        </motion.div>

        {/* Stack cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {stacks.map((stack, si) => (
            <motion.div
              key={stack.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + si * 0.1 }}
              className="p-6 rounded-2xl bg-white"
              style={{ border: "1px solid #E2E8F0" }}
            >
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-4 pb-3"
                style={{ color: stack.color, borderBottom: "1px solid #E2E8F0" }}
              >
                {stack.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: stack.pillBg,
                      border: `1px solid ${stack.pillBorder}`,
                      color: stack.color,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {"note" in stack && stack.note && (
                <p className="font-mono text-[10px] mt-3 pt-3" style={{ color: "#7A6E9A", borderTop: "1px solid #E2E8F0" }}>
                  → {stack.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="font-mono text-[11px] text-[#7A6E9A] rounded-xl p-4 max-w-3xl"
          style={{ border: "1px dashed rgba(124,58,237,0.2)" }}
        >
          <span className="text-[#7C3AED]">// </span>
          Read this as delivery surface area, not a technical skills inventory. My value is in
          program design, financial governance, and risk anticipation across these technologies
          — not in writing the code that runs on them.
        </motion.div>
      </div>
    </section>
  );
}
