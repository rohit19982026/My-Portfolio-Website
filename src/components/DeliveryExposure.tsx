"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stacks = [
  {
    label: "// DATA PLATFORMS DELIVERED ON",
    color: "#1D4ED8",
    pillBg: "rgba(29,78,216,0.08)",
    pillBorder: "rgba(29,78,216,0.2)",
    items: ["Snowflake", "Databricks", "Amazon Redshift", "SQL Server", "Hadoop / HDFS", "SigmaBI"],
  },
  {
    label: "// ENGINEERING TOOLING IN-PROGRAM",
    color: "#059669",
    pillBg: "rgba(5,150,105,0.08)",
    pillBorder: "rgba(5,150,105,0.2)",
    items: ["dbt", "Airflow / MWAA", "ETL / ELT Pipelines", "Qlik Replicate", "Spark SQL", "LandingAI / Computer Vision", "AWS", "Azure"],
  },
  {
    label: "// PMO & DELIVERY STACK I OPERATE DAILY",
    color: "#0891B2",
    pillBg: "rgba(8,145,178,0.08)",
    pillBorder: "rgba(8,145,178,0.2)",
    items: ["Jira", "Confluence", "PSA / Time Tracking", "Delivery Reporting Dashboard", "Azure DevOps", "Performance & Feedback Tools", "Salesforce", "Slack / Google Drive"],
  },
  {
    label: "// AI & AUTOMATION LAYER I'VE BUILT",
    color: "#D97706",
    pillBg: "rgba(217,119,6,0.08)",
    pillBorder: "rgba(217,119,6,0.2)",
    items: ["Glean Agent Builder", "Claude (Anthropic)", "n8n (workflow automation)", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Google Drive MCP"],
    note: "This stack powers the 6 AI agents currently running in production across the phData PMO.",
  },
];

export default function DeliveryExposure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="exposure" className="py-16 sm:py-24 section-alt">
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
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
              06 / DELIVERY EXPOSURE
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Programs I&apos;ve delivered<br />
            across <span className="gradient-text font-normal">these stacks</span>.
          </h2>
          <p className="text-[15px] text-[#475569] max-w-2xl leading-relaxed mb-4">
            I&apos;m a Technical Program Manager, not a hands-on engineer. What follows is the
            technology surface area I&apos;ve owned delivery across — enough to scope, sequence,
            and govern risk without needing the engineering team to translate everything.
          </p>
          <p
            className="text-[14px] text-[#475569] font-semibold italic px-4 py-2.5 rounded-lg w-fit"
            style={{ borderLeft: "3px solid #1D4ED8", background: "rgba(29,78,216,0.04)" }}
          >
            The engineering belongs to the team. The plan, the controls, and the outcome belong to me.
          </p>
        </motion.div>

        {/* Stack pipeline */}
        <div className="relative mb-10">
          {/* connector spine */}
          <div
            className="absolute left-[19px] top-8 bottom-8 w-px hidden sm:block"
            style={{ background: "linear-gradient(to bottom, #1D4ED8, #059669, #0891B2, #D97706)" }}
          />

          <div className="space-y-4">
            {stacks.map((stack, si) => (
              <motion.div
                key={stack.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + si * 0.1 }}
                className="relative sm:pl-14"
              >
                {/* node */}
                <div
                  className="absolute left-0 top-6 hidden sm:flex w-10 h-10 rounded-full items-center justify-center font-mono text-[11px] font-bold"
                  style={{ background: stack.pillBg, border: `2px solid ${stack.color}`, color: stack.color }}
                >
                  {String(si + 1).padStart(2, "0")}
                </div>

                <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid #E2E8F0" }}>
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid #E2E8F0" }}>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: stack.color }}>
                      {stack.label}
                    </p>
                    {si === stacks.length - 1 && (
                      <span
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0"
                        style={{ color: "#34D399", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D399", animation: "pulse-dot 2s ease-in-out infinite" }} />
                        Live in production
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[12px] font-semibold px-3 py-1.5 rounded-md transition-colors"
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
                    <p className="font-mono text-[10px] mt-3 pt-3" style={{ color: "#94A3B8", borderTop: "1px solid #E2E8F0" }}>
                      → {stack.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="font-mono text-[11px] text-[#94A3B8] rounded-xl p-4 max-w-3xl"
          style={{ border: "1px dashed rgba(29,78,216,0.2)" }}
        >
          <span className="text-[#1D4ED8]">// </span>
          Read this as delivery surface area, not a technical skills inventory. My value is in
          program design, financial governance, and risk anticipation across these technologies
          — not in writing the code that runs on them.
        </motion.div>
      </div>
    </section>
  );
}
