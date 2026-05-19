"use client";

import { motion } from "framer-motion";

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
    accent: "#7C3AED",
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
          background: "radial-gradient(ellipse, rgba(124,58,237,0.03) 0%, transparent 65%)",
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
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#7C3AED] mb-5">
            02 / AI TOOLING I&apos;VE SHIPPED
          </p>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(34px, 4.5vw, 56px)", color: "#1A0A2E" }}
          >
            Built with{" "}
            <span
              style={{
                background: "linear-gradient(130deg, #A78BFA 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Claude + Glean.
            </span>
            <br />
            Runs in production.
          </h2>
          <p className="text-[15px] text-[#7A6E9A] max-w-lg leading-relaxed">
            6 AI agents deployed across the phData PMO. Each encodes a domain workflow that used to run manually — now they run on demand, in seconds.
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
                  className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                  style={{ color: tool.accent, background: `${tool.accent}12`, border: `1px solid ${tool.accent}30` }}
                >
                  {tool.category}
                </span>
                {tool.award && (
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{ color: "#D97706", background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }}
                  >
                    🏆 Innovation Award
                  </span>
                )}
              </div>
              <h3 className="font-heading font-bold text-[16px] leading-snug mb-3 text-[#1A0A2E]">{tool.title}</h3>
              <p className="font-mono text-[11px] leading-relaxed" style={{ color: tool.accent }}>
                → {tool.proof}
              </p>
            </motion.div>
          ))}
        </div>

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
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              boxShadow: "0 4px 20px rgba(109,40,217,0.35)",
            }}
          >
            See full capability diagrams
            <span style={{ fontSize: 14 }}>→</span>
          </a>
          <p className="font-mono text-[10px] text-[#AAA0C8] uppercase tracking-wider">
            Animated flow diagrams · Architecture · Tech stack
          </p>
        </motion.div>

      </div>
    </section>
  );
}
