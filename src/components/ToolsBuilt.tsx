"use client";

import { motion } from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 90, damping: 20 };

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: SPRING },
};

const agents = [
  {
    category: "Health Check",
    title: "Project Health Agent",
    what: "Scans every active program at month-end — budget vs. plan, burn rate, billing readiness. Flags what needs attention. Ignores what doesn't.",
    proof: "Replaces a 2-hour manual checklist across 4+ programs",
    accent: "#A78BFA",
  },
  {
    category: "Daily Standups",
    title: "Delivery Pulse Agent",
    what: "Reads Jira, Slack, and meeting notes. Writes the standup summary — blockers, progress, decisions — before the meeting starts.",
    proof: "Standup prep: 15 min → under 2 min",
    accent: "#6EE7B7",
  },
  {
    category: "Weekly Brief",
    title: "Cross-Channel Brief",
    what: "Pulls 72 hours of emails, Slack, and calls into one prioritized action list. Sorted by urgency. Ready before Monday morning.",
    proof: "Used weekly across active portfolio",
    accent: "#67E8F9",
  },
  {
    category: "Client Comms",
    title: "Stakeholder Comms Engine",
    what: "Drafts steerco updates, escalation emails, and renewal talking points. Knows the audience — writes differently for a CFO vs. a VP Engineering.",
    proof: "Steerco deck drafted in under 20 min",
    accent: "#A78BFA",
  },
  {
    category: "Program Kickoff",
    title: "Discovery Co-Pilot",
    what: "Builds the RACI, stakeholder map, and interview plan for a new engagement. One session to go from blank page to structured kickoff.",
    proof: "Used on 3 program kickoffs",
    accent: "#6EE7B7",
  },
];

export default function ToolsBuilt() {
  return (
    <section id="tools" className="py-24 bg-[#0A0A12] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(110,231,183,0.05) 0%, transparent 65%)", filter: "blur(1px)" }} />

      <div className="max-w-5xl mx-auto px-6 relative">

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-5">
            03 / TOOLS I&apos;VE BUILT
          </p>
          <h2 className="font-heading font-bold tracking-tight leading-[0.97] mb-5 text-[#EDE9FE]" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
            I don&apos;t just use AI.{" "}
            <span className="italic font-normal" style={{ background: "linear-gradient(130deg, #6EE7B7 0%, #34D399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              I build it.
            </span>
          </h2>
          <p className="text-[15px] text-[#55557A] max-w-xl leading-relaxed mb-6">
            AI agents that automate the manual, repetitive parts of running programs — so I spend time on decisions, not formatting.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#6B6B8A]">Built with</span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-full cursor-default"
              style={{ color: "#C4B5FD", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)" }}
            >
              Claude · Anthropic
            </motion.span>
            <span className="text-[#35355A] font-mono text-[10px]">&amp;</span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-full cursor-default"
              style={{ color: "#6EE7B7", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)" }}
            >
              Glean
            </motion.span>
          </div>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.08 }}
          className="mb-5"
        >
          <div className="rounded-2xl p-px" style={{ background: "linear-gradient(135deg, rgba(110,231,183,0.4) 0%, rgba(110,231,183,0.1) 40%, transparent 70%)" }}>
            <div className="rounded-[15px] p-7 md:p-8" style={{ background: "linear-gradient(145deg, #0E0E1C 0%, #0A0A14 100%)" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ color: "#6EE7B7", background: "rgba(110,231,183,0.12)", border: "1px solid rgba(110,231,183,0.3)" }}>Featured Build</span>
                <motion.span
                  animate={{ boxShadow: ["0 0 0px rgba(252,211,77,0)", "0 0 12px rgba(252,211,77,0.4)", "0 0 0px rgba(252,211,77,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ color: "#FCD34D", background: "rgba(252,211,77,0.1)", border: "1px solid rgba(252,211,77,0.25)" }}
                >
                  🏆 phData Innovation Award
                </motion.span>
              </div>
              <div className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-3">
                  <h3 className="font-heading font-bold leading-tight mb-3" style={{ fontSize: "clamp(18px, 2.2vw, 24px)", color: "#EDE9FE" }}>EOM Billing Assistant</h3>
                  <p className="text-[14px] text-[#6A6A9A] leading-[1.75] mb-3">At the end of every month, PMs manually cross-check time entries, hunt for discrepancies, and write billing summaries for finance. It takes hours and it&apos;s the same process every time.</p>
                  <p className="text-[14px] text-[#6A6A9A] leading-[1.75]">This agent reads the raw time data, finds the issues, explains them, and writes the finance-ready summary — automatically. Deployed to the full phData PMO team in one month.</p>
                </div>
                <div className="md:col-span-2 grid grid-cols-2 gap-3">
                  {[
                    { value: "60%", label: "Time saved" },
                    { value: ">95%", label: "Accuracy" },
                    { value: "1 mo", label: "Full team adoption" },
                    { value: "100%", label: "PMO coverage" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 + i * 0.07 }}
                      className="text-center px-3 py-4 rounded-xl"
                      style={{ background: "rgba(110,231,183,0.07)", border: "1px solid rgba(110,231,183,0.18)" }}
                    >
                      <div className="font-mono font-black text-[20px] tabular-nums leading-none" style={{ color: "#6EE7B7" }}>{s.value}</div>
                      <div className="font-mono text-[8px] uppercase tracking-wider text-[#35355A] mt-2">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agent grid with stagger */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {agents.map((agent) => (
            <motion.div
              key={agent.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              className="group rounded-2xl p-6"
              style={{ background: "rgba(13,13,26,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-4" style={{ color: agent.accent, background: `${agent.accent}12`, border: `1px solid ${agent.accent}25` }}>{agent.category}</span>
              <h3 className="font-heading font-bold text-[16px] leading-snug mb-3 text-[#EDE9FE] group-hover:text-white transition-colors">{agent.title}</h3>
              <p className="text-[13px] text-[#55557A] leading-[1.7] mb-5">{agent.what}</p>
              <p className="font-mono text-[10px] font-semibold" style={{ color: agent.accent }}>→ {agent.proof}</p>
            </motion.div>
          ))}

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 25 } }}
            className="rounded-2xl p-6"
            style={{ background: "linear-gradient(145deg, rgba(167,139,250,0.08), rgba(10,10,18,0.9))", border: "1px solid rgba(167,139,250,0.15)" }}
          >
            <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-4" style={{ color: "#A78BFA", background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}>How I build these</span>
            <h3 className="font-heading font-bold text-[16px] leading-snug mb-3 text-[#EDE9FE]">Agentic Workflow Designer</h3>
            <p className="text-[13px] text-[#55557A] leading-[1.7] mb-5">A meta-skill that encodes how to design, build, and ship a new agent — prompt structure, model choice, validation. New agent design to deployed: under 4 hours.</p>
            <p className="font-mono text-[10px] font-semibold" style={{ color: "#A78BFA" }}>→ Underlies all 5 agents above</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
