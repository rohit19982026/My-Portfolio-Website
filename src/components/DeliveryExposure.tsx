"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Wrench, LayoutDashboard, Bot } from "lucide-react";
import GlassSurface from "./GlassSurface";
import IconBadge from "./IconBadge";
import MobileCarousel from "./MobileCarousel";

const stacks = [
  {
    label: "Data platforms delivered on",
    color: "#0A84FF",
    textColor: "#0066CC",
    icon: Database,
    items: ["Snowflake", "Databricks", "Amazon Redshift", "SQL Server", "Hadoop / HDFS", "SigmaBI"],
  },
  {
    label: "Engineering tooling in-program",
    color: "#30D158",
    textColor: "#248A3D",
    icon: Wrench,
    items: ["dbt", "Airflow / MWAA", "ETL / ELT Pipelines", "Qlik Replicate", "Spark SQL", "LandingAI / Computer Vision", "AWS", "Azure"],
  },
  {
    label: "Delivery tools I run daily",
    color: "#64D2FF",
    textColor: "#0A7EA6",
    icon: LayoutDashboard,
    items: ["Jira", "Confluence", "PSA / Time Tracking", "Delivery Reporting Dashboard", "Azure DevOps", "Performance & Feedback Tools", "Salesforce", "Slack / Google Drive"],
  },
  {
    label: "AI & automation layer I've built",
    color: "#FF9F0A",
    textColor: "#B25C00",
    icon: Bot,
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
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] block mb-5" style={{ color: "var(--color-accent-dk)" }}>
            06 / DELIVERY EXPOSURE
          </span>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "var(--color-text)" }}
          >
            Programs I&apos;ve delivered<br />
            across <span className="gradient-text font-normal">these stacks</span>.
          </h2>
          <p className="text-[15px] max-w-2xl leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
            I&apos;m a Program Manager, not a hands-on engineer. What follows is the
            technology surface area I&apos;ve owned delivery across — enough to scope, sequence,
            and govern risk without needing the engineering team to translate everything.
          </p>
          <GlassSurface accent="#0A84FF" radius="md" className="w-fit">
            <p className="text-[14px] font-semibold italic px-4 py-2.5" style={{ color: "var(--color-text-secondary)" }}>
              The engineering belongs to the team. The plan, the controls, and the outcome belong to me.
            </p>
          </GlassSurface>
        </motion.div>

        {/* Stack pipeline */}
        {(() => {
          const stackCard = (stack: typeof stacks[number], si: number) => {
            const Icon = stack.icon;
            return (
              <motion.div
                key={stack.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + si * 0.1 }}
              >
                <GlassSurface accent={stack.color} radius="lg" className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                    <IconBadge icon={Icon} color={stack.color} size={36} iconSize={15} />
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] flex-1 min-w-0" style={{ color: stack.textColor }}>
                      {stack.label}
                    </p>
                    {si === stacks.length - 1 && (
                      <span
                        className="glass inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 shrink-0"
                        style={{ color: "var(--color-green-text)", borderRadius: "var(--radius-pill)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }} />
                        Live
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="text-[12px] font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: `${stack.color}14`,
                          border: `1px solid ${stack.color}33`,
                          color: stack.textColor,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {"note" in stack && stack.note && (
                    <p className="text-[10px] mt-3 pt-3" style={{ color: "var(--color-faint)", borderTop: "1px solid var(--glass-border)" }}>
                      {stack.note}
                    </p>
                  )}
                </GlassSurface>
              </motion.div>
            );
          };
          const cards = stacks.map(stackCard);
          return (
            <>
              {/* Mobile: swipeable carousel */}
              <div className="md:hidden mb-10">
                <MobileCarousel>{cards}</MobileCarousel>
              </div>
              {/* Desktop: connector spine + vertical stack */}
              <div className="hidden md:block relative mb-10">
                <div
                  className="absolute left-[19px] top-8 bottom-8 w-px"
                  style={{ background: "linear-gradient(to bottom, #0A84FF, #30D158, #64D2FF, #FF9F0A)" }}
                />
                <div className="space-y-4">
                  {stacks.map((stack, si) => {
                    const Icon = stack.icon;
                    return (
                      <motion.div
                        key={stack.label}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.08 + si * 0.1 }}
                        className="relative pl-14"
                      >
                        <div className="absolute left-0 top-6">
                          <IconBadge icon={Icon} color={stack.color} size={40} iconSize={16} />
                        </div>
                        <GlassSurface accent={stack.color} radius="lg" className="p-6">
                          <div className="flex items-center justify-between gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: stack.textColor }}>
                              {stack.label}
                            </p>
                            {si === stacks.length - 1 && (
                              <span
                                className="glass inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 shrink-0"
                                style={{ color: "var(--color-green-text)", borderRadius: "var(--radius-pill)" }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }} />
                                Live in production
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {stack.items.map((item) => (
                              <span
                                key={item}
                                className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                                style={{
                                  backgroundColor: `${stack.color}14`,
                                  border: `1px solid ${stack.color}33`,
                                  color: stack.textColor,
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          {"note" in stack && stack.note && (
                            <p className="text-[10px] mt-3 pt-3" style={{ color: "var(--color-faint)", borderTop: "1px solid var(--glass-border)" }}>
                              {stack.note}
                            </p>
                          )}
                        </GlassSurface>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })()}

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <GlassSurface radius="md" className="max-w-3xl">
            <p className="text-[11px] p-4" style={{ color: "var(--color-faint)" }}>
              Read this as delivery surface area, not a technical skills inventory. My value is in
              program design, financial governance, and risk anticipation across these technologies
              — not in writing the code that runs on them.
            </p>
          </GlassSurface>
        </motion.div>
      </div>
    </section>
  );
}
