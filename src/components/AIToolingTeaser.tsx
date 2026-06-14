"use client";

import { motion } from "framer-motion";

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
  { value: "3-4 hrs → ~60 min", label: "Per PM, per program, at month-end", accent: "#059669" },
  { value: ">95%", label: "Accuracy on the billing discrepancy check", accent: "#1D4ED8" },
  { value: "100%", label: "PMO adoption within ~1 month of shipping", accent: "#D97706" },
];

const tools = [
  {
    award: true,
    category: "EOM Automation",
    title: "Billing Compliance Agent",
    proof: "60% time saved · >95% accuracy · PMO-wide deployment in 1 month",
    accent: "#059669",
  },
  {
    category: "Sprint Intelligence",
    title: "Velocity & Blocker Tracker",
    proof: "CSV → ranked scorecard + PM action items in under 2 min",
    accent: "#1D4ED8",
  },
  {
    category: "Program Health",
    title: "Project Health Scanner",
    proof: "Replaces a 2-hour manual checklist across 4+ active programs",
    accent: "#0891B2",
  },
  {
    category: "Stakeholder Comms",
    title: "Steerco Comms Engine",
    proof: "Steerco deck drafted in under 20 min · CFO vs VP Engineering tone",
    accent: "#D97706",
  },
];

export default function AIToolingTeaser() {
  return (
    <section id="tools" className="py-24 bg-[#FFFFFF] relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(29,78,216,0.03) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1D4ED8] mb-5">
            05 / AI TOOLING I&apos;VE SHIPPED
          </p>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(34px, 4.5vw, 56px)", color: "#0F172A" }}
          >
            I automated{" "}
            <span
              style={{
                background: "linear-gradient(130deg, #60A5FA 0%, #1D4ED8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              my own job
            </span>{" "}
            first.
          </h2>
          <p className="text-[15px] text-[#94A3B8] max-w-lg leading-relaxed">
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
          style={{ border: "1px solid #E2E8F0" }}
        >
          {proofStrip.map((p) => (
            <div key={p.label} className="p-5" style={{ background: "#F8FAFC" }}>
              <div className="font-mono font-black tabular-nums mb-1.5" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", color: p.accent }}>
                {p.value}
              </div>
              <div className="text-[12px] leading-snug" style={{ color: "#64748B" }}>
                {p.label}
              </div>
            </div>
          ))}
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
              className="rounded-2xl p-6"
              style={{
                background: "#FFFFFF",
                border: `1px solid ${tool.accent}20`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest"
                  style={{ color: tool.accent, background: `${tool.accent}12`, border: `1px solid ${tool.accent}30` }}
                >
                  {tool.category}
                </span>
                {tool.award && (
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest"
                    style={{ color: "#D97706", background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }}
                  >
                    🏆 Innovation Award
                  </span>
                )}
              </div>
              <h3 className="font-heading font-bold text-[16px] leading-snug mb-3 text-[#0F172A]">{tool.title}</h3>
              <p className="font-mono text-[11px] leading-relaxed" style={{ color: tool.accent }}>
                → {tool.proof}
              </p>
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
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#0891B2" }}>
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
                style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: "#1D4ED8" }}>
                  {p.label}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#475569" }}>
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
          className="flex items-center gap-6"
        >
          <a
            href="/ai-skills"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #1D4ED8, #1E40AF)",
              boxShadow: "0 4px 20px rgba(30,64,175,0.3)",
            }}
          >
            See full capability diagrams
            <span style={{ fontSize: 14 }}>→</span>
          </a>
          <p className="font-mono text-[10px] text-[#CBD5E1] uppercase tracking-wider">
            Animated flow diagrams · Architecture · Tech stack
          </p>
        </motion.div>

      </div>
    </section>
  );
}
