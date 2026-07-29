"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";

const stacks = [
  {
    label: "DATA PLATFORMS I'VE DELIVERED ON",
    color: "blue",
    items: ["Snowflake", "Databricks", "Amazon Redshift", "SQL Server", "Hadoop / HDFS", "Sigma"],
  },
  {
    label: "ENGINEERING TOOLING ON THOSE PROGRAMS",
    color: "ink",
    items: ["dbt", "Airflow / MWAA", "ETL / ELT Pipelines", "Qlik Replicate", "Spark SQL", "LandingAI / Computer Vision", "AWS", "Azure"],
  },
  {
    label: "PMO & DELIVERY TOOLS I USE DAILY",
    color: "blue",
    items: ["Jira", "Confluence", "Kantata (PSA)", "MS Project", "Azure DevOps", "Asana", "Salesforce", "Slack / Teams"],
  },
  {
    label: "AI & AUTOMATION I'VE BUILT",
    color: "ink",
    items: ["Glean Agent Builder", "Claude (Anthropic)", "n8n (workflow automation)", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Google Drive MCP"],
  },
];

export default function DeliveryExposure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="py-24 bg-paper text-ink">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-14">
          <SectionHeading
            eyebrow="04 / STACK"
            tone="light"
            segments={[
              { text: "The tools and platforms I've", style: "fill" },
              { text: "delivered on.", style: "lime" },
            ]}
          />
          <p className="text-[15px] text-ink/65 max-w-2xl leading-relaxed mt-5">
            I&apos;m a project manager, not an engineer. This is what I&apos;ve run programs on,
            not a list of things I can build with — enough to scope the work, sequence it, and
            follow the technical conversation without needing everything translated.
          </p>
        </div>

        {/* Stack cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {stacks.map((stack, si) => (
            <motion.div
              key={stack.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + si * 0.1 }}
              className="p-6 rounded-card"
              style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(13,13,15,0.12)" }}
            >
              <p
                className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] mb-4 pb-3"
                style={{ color: stack.color === "blue" ? "var(--color-blue)" : "var(--color-ink)", borderBottom: "1px solid rgba(13,13,15,0.1)" }}
              >
                {stack.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="font-heading text-[12px] font-semibold px-3 py-1.5 rounded-card transition-colors"
                    style={
                      stack.color === "blue"
                        ? { border: "1px solid color-mix(in srgb, var(--color-blue) 35%, transparent)", background: "color-mix(in srgb, var(--color-blue) 8%, transparent)", color: "var(--color-blue)" }
                        : { border: "1px solid rgba(13,13,15,0.18)", background: "rgba(13,13,15,0.04)", color: "var(--color-ink)" }
                    }
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
