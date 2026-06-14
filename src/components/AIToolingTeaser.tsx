"use client";

import { motion } from "framer-motion";

const pov = [
  {
    label: "Governance",
    body: "AI-assisted development earns the same audit trail as anything else in a delivery program. On a recent migration engagement, Copilot ran inside client compliance constraints — per-sprint review checklists and output audit trails — alongside the normal sprint cadence. The point isn't a flashy uplift number; it's that AI-in-delivery work gets governed the same way the rest of the work does.",
  },
  {
    label: "Build vs. buy",
    body: "Build on the platform that's already the org's knowledge layer, not the flashiest API. The agent platform runs on Glean — already the PMO's search and permissions layer — so agents could draw on live program data, Salesforce, and Drive without a separate integration build. Less impressive on paper, far faster to ship.",
  },
  {
    label: "Adoption sequencing",
    body: "Ship the highest-pain, most-measurable agent first to earn the right to build the rest. The Billing Compliance Agent went PMO-wide inside a month — that was the credibility the next five agents needed to land.",
  },
  {
    label: "Measurement discipline",
    body: "The >95% accuracy figure on the billing agent is worth citing because it's backed by per-run accuracy logs against a test set — the same rigor I'd apply to a Certinia budget variance report. Numbers without that kind of audit trail don't go on a slide.",
  },
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
            Built with{" "}
            <span
              style={{
                background: "linear-gradient(130deg, #60A5FA 0%, #1D4ED8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Claude + Glean.
            </span>
            <br />
            Runs in production.
          </h2>
          <p className="text-[15px] text-[#94A3B8] max-w-lg leading-relaxed">
            6 AI agents in production across the phData PMO. Four highlighted below — each replaced a manual workflow that was consuming PM time with zero judgment value.
          </p>
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
            // HOW I THINK ABOUT AI IN DELIVERY
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
