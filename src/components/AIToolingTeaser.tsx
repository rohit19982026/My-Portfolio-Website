"use client";

import { motion } from "framer-motion";
import HudFrame from "./HudFrame";

const pov = [
  {
    label: "Why I built it",
    body: "End-of-month billing reconciliation was 3-4 hours of copy-paste between the time-tracking tool and the SOW budget, every program, every month. I'd done it by hand for two years. The data was structured and the process was identical every time — that's not PM work, that's a script that hasn't been written yet.",
  },
  {
    label: "Build vs. buy",
    body: "Built on Glean, not a custom API integration — it was already the PMO's knowledge and permissions layer, so an agent there could see live program data, Salesforce, and Drive without a separate integration build. Less impressive on paper, far faster to ship and far easier for the rest of the PMO to pick up.",
  },
  {
    label: "Adoption sequencing",
    body: "Shipped the billing agent first because it was the highest-pain, most-measurable win — if it didn't hold up, nothing after it would get adopted either. Once it was running PMO-wide inside a month, the next five had an easier path in.",
  },
  {
    label: "Why the accuracy number is real",
    body: "The >95% figure on the billing agent isn't a vibe — it's backed by per-run accuracy logs checked against a test set of past reconciliations, the same way I'd back up any number before it went into a status report to a client.",
  },
];

const proofStrip = [
  { value: "3-4 hrs → ~60 min", label: "Per PM, per program, at month-end", accent: "#34D399" },
  { value: ">95%", label: "Accuracy on the billing discrepancy check", accent: "#60A5FA" },
  { value: "100%", label: "PMO adoption within ~1 month of shipping", accent: "#FBBF24" },
];

const tools = [
  {
    award: true,
    status: "ok" as const,
    category: "EOM Automation",
    title: "Billing Compliance Agent",
    proof: "60% time saved · >95% accuracy · PMO-wide deployment in 1 month",
    accent: "#34D399",
  },
  {
    status: "warn" as const,
    category: "Sprint Intelligence",
    title: "Velocity & Blocker Tracker",
    proof: "CSV → ranked scorecard + PM action items in under 2 min",
    accent: "#FBBF24",
  },
  {
    status: "ok" as const,
    category: "Program Health",
    title: "Project Health Scanner",
    proof: "Replaces a 2-hour manual checklist across 4+ active programs",
    accent: "#22D3EE",
  },
  {
    status: "ok" as const,
    category: "Stakeholder Comms",
    title: "Steerco Comms Engine",
    proof: "Steerco deck drafted in under 20 min · CFO vs VP Engineering tone",
    accent: "#60A5FA",
  },
];

const STATUS_COLOR = { ok: "#34D399", warn: "#FBBF24" };

export default function AIToolingTeaser() {
  return (
    <section id="tools" className="py-16 sm:py-24 relative overflow-hidden" style={{ background: "var(--color-ink)" }}>
      {/* Instrument-panel grid texture */}
      <div className="absolute inset-0 console-grid pointer-events-none" />

      {/* Fade in from the light section above */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #FFFFFF, transparent)" }}
      />
      {/* Fade out into the light section below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #F8FAFC, transparent)" }}
      />

      <div
        className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(29,78,216,0.08) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "#60A5FA" }}>
            05 / AI TOOLING I&apos;VE SHIPPED
          </p>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(34px, 4.5vw, 56px)", color: "var(--color-ink-text)" }}
          >
            I automated{" "}
            <span
              style={{
                background: "linear-gradient(130deg, #93C5FD 0%, #60A5FA 55%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              my own job
            </span>{" "}
            first.
          </h2>
          <p className="text-[15px] max-w-lg leading-relaxed" style={{ color: "var(--color-ink-text-2)" }}>
            It started with one agent that did my own end-of-month billing reconciliation
            — the most boring, most error-prone hour of my month. Once that one held up,
            the rest of the PMO wanted their hours back too. Six agents now run on Glean,
            Claude, and n8n across the whole PMO; four are highlighted below.
          </p>
        </motion.div>

        {/* Proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid sm:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-10"
          style={{ border: "1px solid var(--color-ink-border)" }}
        >
          {proofStrip.map((p) => (
            <div key={p.label} className="p-5" style={{ background: "var(--color-ink-2)" }}>
              <div className="font-mono font-black tabular-nums mb-1.5" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", color: p.accent }}>
                {p.value}
              </div>
              <div className="text-[12px] leading-snug" style={{ color: "var(--color-ink-text-2)" }}>
                {p.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Agent registry label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] mb-4"
          style={{ color: "var(--color-ink-text-2)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#34D399", animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          // agent registry — 4 of 6 deployed agents
        </motion.div>

        {/* Tool cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              style={{ perspective: 800 }}
            >
              <HudFrame
                accent={tool.accent}
                className="rounded-lg p-6 h-full"
                style={{
                  background: "var(--color-ink-2)",
                  border: `1px solid ${tool.accent}30`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest"
                    style={{ color: tool.accent, background: `${tool.accent}14`, border: `1px solid ${tool.accent}30` }}
                  >
                    {tool.category}
                  </span>
                  {tool.award && (
                    <span
                      className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest"
                      style={{ color: "#FBBF24", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}
                    >
                      🏆 Innovation Award
                    </span>
                  )}
                  <span
                    className="ml-auto w-2 h-2 rounded-full shrink-0"
                    style={{ background: STATUS_COLOR[tool.status], animation: "pulse-dot 2s ease-in-out infinite" }}
                    aria-hidden
                  />
                </div>
                <h3 className="font-heading font-bold text-[16px] leading-snug mb-3" style={{ color: "var(--color-ink-text)" }}>
                  {tool.title}
                </h3>
                <p className="font-mono text-[11px] leading-relaxed" style={{ color: tool.accent }}>
                  └─ {tool.proof}
                </p>
              </HudFrame>
            </motion.div>
          ))}
        </div>

        {/* AI point of view */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#22D3EE" }}>
            // THE STORY BEHIND IT
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {pov.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="p-5 rounded-2xl"
                style={{ background: "var(--color-ink-2)", border: "1px solid var(--color-ink-border)" }}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: "#60A5FA" }}>
                  {p.label}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-ink-text-2)" }}>
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
        >
          <a
            href="/ai-skills"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:opacity-90 self-start"
            style={{
              background: "linear-gradient(135deg, #1D4ED8, #0891B2)",
              boxShadow: "0 4px 20px rgba(8,145,178,0.35)",
            }}
          >
            See full capability diagrams
            <span style={{ fontSize: 14 }}>→</span>
          </a>
          <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--color-ink-text-2)" }}>
            Animated flow diagrams · Architecture · Tech stack
          </p>
        </motion.div>

      </div>
    </section>
  );
}
