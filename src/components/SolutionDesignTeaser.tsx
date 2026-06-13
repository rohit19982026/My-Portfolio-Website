"use client";

import { motion } from "framer-motion";

export default function SolutionDesignTeaser() {
  return (
    <section id="solution-design" className="py-24 relative overflow-hidden" style={{ background: "#F7F4FF" }}>
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 600, height: 600, background: "#7C3AED", opacity: 0.04, filter: "blur(100px)", top: -100, right: -100 }}
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
            06 / SOLUTION DESIGN
          </p>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(34px, 4.5vw, 56px)", color: "#1A0A2E" }}
          >
            How I{" "}
            <span
              style={{
                background: "linear-gradient(130deg, #A78BFA 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              design from zero
            </span>.
          </h2>
          <p className="text-[15px] text-[#7A6E9A] max-w-lg leading-relaxed">
            The PMO agent platform above is shipped and in production. This is the other half of how I work with AI — architecting a new agent from a blank page: trust model, rollout sequencing, and the judgment calls before a single line of automation runs.
          </p>
        </motion.div>

        {/* Feature card */}
        <motion.a
          href="/agents/deal-desk"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="block rounded-3xl overflow-hidden group"
          style={{
            background: "linear-gradient(145deg, #FFFFFF 0%, #FAF8FF 100%)",
            border: "1px solid rgba(124,58,237,0.18)",
            boxShadow: "0 10px 40px rgba(109,40,217,0.06)",
          }}
        >
          {/* top accent */}
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #7C3AED, #A78BFA, #7C3AED)" }} />

          <div className="grid md:grid-cols-5 gap-0">
            {/* LEFT — content */}
            <div className="md:col-span-3 p-8 md:p-10">
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span
                  className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ color: "#7C3AED", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)" }}
                >
                  Glean Agent
                </span>
                <span
                  className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ color: "#7A6E9A", background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.1)" }}
                >
                  Enterprise Sales
                </span>
                <span
                  className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ color: "#7A6E9A", background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.1)" }}
                >
                  Solution Design
                </span>
              </div>

              <h3
                className="font-heading font-bold leading-tight tracking-tight mb-4"
                style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "#1A0A2E" }}
              >
                Deal Desk Acceleration Agent
              </h3>

              <p className="text-[14px] text-[#3D3358] leading-relaxed mb-6 max-w-md">
                A Glean-based agent that answers the three questions a sales rep needs before saying yes to a deal —
                what we discounted on similar deals, which template applies, and who has to approve it — with sources, in minutes.
              </p>

              {/* mini-stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="font-mono font-black tabular-nums text-[20px] leading-none" style={{ color: "#7C3AED" }}>3</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#7A6E9A] mt-1.5">Data sources</p>
                </div>
                <div>
                  <p className="font-mono font-black tabular-nums text-[20px] leading-none" style={{ color: "#7C3AED" }}>8</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#7A6E9A] mt-1.5">Workflow steps</p>
                </div>
                <div>
                  <p className="font-mono font-black tabular-nums text-[20px] leading-none" style={{ color: "#7C3AED" }}>4</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#7A6E9A] mt-1.5">LLMs assigned</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "#7C3AED" }}>
                Read the design walkthrough
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* RIGHT — architecture preview */}
            <div
              className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.04), rgba(167,139,250,0.02))", borderLeft: "1px solid rgba(124,58,237,0.08)" }}
            >
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#7C3AED] mb-4">
                // ARCHITECTURE
              </p>

              {/* sources → glean → agent → rep */}
              <div className="space-y-2.5">
                {[
                  { label: "Salesforce", sub: "deals, customers", color: "#3B6EF0" },
                  { label: "SharePoint", sub: "templates, legal", color: "#129B86" },
                  { label: "Email", sub: "approval threads", color: "#E0743A" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(124,58,237,0.1)" }}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold leading-none text-[#1A0A2E]">{s.label}</p>
                      <p className="font-mono text-[9px] text-[#7A6E9A] mt-1">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-[#7C3AED] my-2 text-lg leading-none">↓</p>

              <div
                className="px-3 py-2.5 rounded-lg text-center"
                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", color: "#FFFFFF" }}
              >
                <p className="text-[12px] font-bold leading-none">Glean Unified Index</p>
                <p className="font-mono text-[9px] opacity-85 mt-1">permissions · citations</p>
              </div>

              <p className="text-center text-[#7C3AED] my-2 text-lg leading-none">↓</p>

              <div
                className="px-3 py-2 rounded-lg flex items-center gap-3"
                style={{ background: "#FFFFFF", border: "1.5px solid #7C3AED" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#7C3AED] shrink-0" />
                <div>
                  <p className="text-[12px] font-semibold leading-none text-[#1A0A2E]">Agent Workflow</p>
                  <p className="font-mono text-[9px] text-[#7A6E9A] mt-1">8 steps · Slack/chat</p>
                </div>
              </div>
            </div>
          </div>
        </motion.a>

        {/* disclosure note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] text-[#7A6E9A] mt-6 text-center"
        >
          // A design walkthrough, not a delivered program — the PMO agent platform (above) is where the delivered numbers live. This shows the architecture and rollout thinking behind a new agent, end to end.
        </motion.p>
      </div>
    </section>
  );
}
