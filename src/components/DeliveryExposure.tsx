"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stacks = [
  {
    label: "DATA PLATFORMS I'VE DELIVERED ON",
    color: "#A78BFA",
    items: ["Snowflake", "Databricks", "Amazon Redshift", "SQL Server", "Hadoop / HDFS", "Sigma"],
  },
  {
    label: "ENGINEERING TOOLING ON THOSE PROGRAMS",
    color: "#6EE7B7",
    items: ["dbt", "Airflow / MWAA", "ETL / ELT Pipelines", "Qlik Replicate", "Spark SQL", "LandingAI / Computer Vision", "AWS", "Azure"],
  },
  {
    label: "PMO & DELIVERY TOOLS I USE DAILY",
    color: "#F0ABFC",
    items: ["Jira", "Confluence", "Kantata (PSA)", "MS Project", "Azure DevOps", "Asana", "Salesforce", "Slack / Teams"],
  },
  {
    label: "AI & AUTOMATION I'VE BUILT",
    color: "#A78BFA",
    items: ["Glean Agent Builder", "Claude (Anthropic)", "n8n (workflow automation)", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Google Drive MCP"],
  },
];

export default function DeliveryExposure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="py-24 section-alt">
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
              04 / STACK
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            The tools and platforms<br />
            I&apos;ve <span className="gradient-text font-normal">delivered on</span>.
          </h2>
          <p className="text-[15px] text-[#A8A4C7] max-w-2xl leading-relaxed">
            I&apos;m a project manager, not an engineer. This is what I&apos;ve run programs on,
            not a list of things I can build with — enough to scope the work, sequence it, and
            follow the technical conversation without needing everything translated.
          </p>
        </motion.div>

        {/* Stack cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {stacks.map((stack, si) => (
            <motion.div
              key={stack.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + si * 0.1 }}
              className="p-6 rounded-2xl"
              style={{ background: "#1B1B2A", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] mb-4 pb-3"
                style={{ color: stack.color, borderBottom: `1px solid rgba(255,255,255,0.06)` }}
              >
                {stack.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="font-heading text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      borderColor: `${stack.color}30`,
                      backgroundColor: `${stack.color}0D`,
                      border: `1px solid ${stack.color}30`,
                      color: "#A8A4C7",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
