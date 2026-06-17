"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, FileText, Mail, Workflow } from "lucide-react";
import GlassSurface from "./GlassSurface";
import IconBadge from "./IconBadge";

export default function SolutionDesignTeaser() {
  return (
    <section id="solution-design" className="py-16 sm:py-24 relative overflow-hidden section-alt">
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "var(--color-accent-dk)" }}>
            07 / SOLUTION DESIGN
          </p>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(34px, 4.5vw, 56px)", color: "var(--color-text)" }}
          >
            How I{" "}
            <span
              style={{
                background: "linear-gradient(130deg, var(--color-accent) 0%, var(--color-purple) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              design from zero
            </span>.
          </h2>
          <p className="text-[15px] max-w-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            The PMO agent platform above is shipped and in production. This is the other half of how I work with AI — architecting a new agent from a blank page: trust model, rollout sequencing, and the judgment calls before a single line of automation runs.
          </p>
        </motion.div>

        {/* Feature card */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a href="/agents/deal-desk" whileHover={{ y: -4 }} className="block group">
            <GlassSurface accent="#0A84FF" interactive specular radius="lg" className="overflow-hidden">
              {/* top accent */}
              <div className="h-[3px]" style={{ background: "linear-gradient(90deg, var(--color-accent), var(--color-teal), var(--color-accent))" }} />

              <div className="grid md:grid-cols-5 gap-0">
                {/* LEFT — content */}
                <div className="md:col-span-3 p-5 md:p-10">
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <span
                      className="text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                      style={{ color: "var(--color-accent-dk)", background: "rgba(10,132,255,0.1)", border: "1px solid rgba(10,132,255,0.25)" }}
                    >
                      Glean Agent
                    </span>
                    <span className="glass text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ color: "var(--color-faint)" }}>
                      Enterprise Sales
                    </span>
                    <span className="glass text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ color: "var(--color-faint)" }}>
                      Solution Design
                    </span>
                  </div>

                  <h3
                    className="font-heading font-bold leading-tight tracking-tight mb-4"
                    style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "var(--color-text)" }}
                  >
                    Deal Desk Acceleration Agent
                  </h3>

                  <p className="text-[14px] leading-relaxed mb-6 max-w-md" style={{ color: "var(--color-text-secondary)" }}>
                    A Glean-based agent that answers the three questions a sales rep needs before saying yes to a deal —
                    what we discounted on similar deals, which template applies, and who has to approve it — with sources, in minutes.
                  </p>

                  {/* mini-stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div>
                      <p className="font-heading font-black tabular-nums text-[20px] leading-none" style={{ color: "var(--color-accent-dk)" }}>3</p>
                      <p className="text-[10px] md:text-[9px] uppercase tracking-wider mt-1.5" style={{ color: "var(--color-faint)" }}>Data sources</p>
                    </div>
                    <div>
                      <p className="font-heading font-black tabular-nums text-[20px] leading-none" style={{ color: "var(--color-accent-dk)" }}>8</p>
                      <p className="text-[10px] md:text-[9px] uppercase tracking-wider mt-1.5" style={{ color: "var(--color-faint)" }}>Workflow steps</p>
                    </div>
                    <div>
                      <p className="font-heading font-black tabular-nums text-[20px] leading-none" style={{ color: "var(--color-accent-dk)" }}>4</p>
                      <p className="text-[10px] md:text-[9px] uppercase tracking-wider mt-1.5" style={{ color: "var(--color-faint)" }}>LLMs assigned</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--color-accent-dk)" }}>
                    Read the design walkthrough
                    <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* RIGHT — architecture preview */}
                <div
                  className="md:col-span-2 p-5 md:p-10 flex flex-col justify-center relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, rgba(10,132,255,0.05), rgba(100,210,255,0.04))" }}
                >
                  {/* Separator: horizontal on mobile (stacked), vertical on desktop (side-by-side) */}
                  <div className="md:hidden h-px -mx-5 mb-5" style={{ background: "var(--glass-border)" }} />
                  <div className="hidden md:block absolute inset-y-0 left-0 w-px" style={{ background: "var(--glass-border)" }} />
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-4 relative z-10" style={{ color: "var(--color-accent-dk)" }}>
                    Architecture
                  </p>

                  <div className="space-y-2.5 relative z-10">
                    {[
                      { label: "Salesforce", sub: "deals, customers", color: "#0A84FF", icon: Database },
                      { label: "SharePoint", sub: "templates, legal", color: "#30D158", icon: FileText },
                      { label: "Email", sub: "approval threads", color: "#FF9F0A", icon: Mail },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.label}
                          className="glass flex items-center gap-3 px-3 py-2 rounded-2xl"
                        >
                          <IconBadge icon={Icon} color={s.color} size={28} iconSize={13} />
                          <div className="min-w-0">
                            <p className="text-[12px] font-semibold leading-none" style={{ color: "var(--color-text)" }}>{s.label}</p>
                            <p className="text-[9px] mt-1" style={{ color: "var(--color-faint)" }}>{s.sub}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* connector with traveling data-flow pulse */}
                  <div className="relative h-7 flex items-center justify-center z-10">
                    <div className="absolute h-full w-px" style={{ background: "linear-gradient(to bottom, rgba(10,132,255,0.35), rgba(10,132,255,0.08))" }} />
                    <motion.span
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-accent)", boxShadow: "0 0 8px 2px rgba(10,132,255,0.5)" }}
                      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear", times: [0, 0.15, 0.85, 1] }}
                    />
                  </div>

                  <div
                    className="px-3 py-2.5 rounded-2xl text-center relative z-10"
                    style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dk))", color: "#FFFFFF", boxShadow: "0 8px 24px rgba(10,132,255,0.3)" }}
                  >
                    <p className="text-[12px] font-bold leading-none">Glean Unified Index</p>
                    <p className="text-[9px] opacity-85 mt-1">permissions · citations</p>
                  </div>

                  {/* connector with traveling data-flow pulse */}
                  <div className="relative h-7 flex items-center justify-center z-10">
                    <div className="absolute h-full w-px" style={{ background: "linear-gradient(to bottom, rgba(10,132,255,0.35), rgba(10,132,255,0.08))" }} />
                    <motion.span
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-accent)", boxShadow: "0 0 8px 2px rgba(10,132,255,0.5)" }}
                      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear", times: [0, 0.15, 0.85, 1], delay: 0.8 }}
                    />
                  </div>

                  <div
                    className="glass px-3 py-2 rounded-2xl flex items-center justify-between gap-3 relative z-10"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <IconBadge icon={Workflow} color="var(--color-accent)" size={28} iconSize={13} />
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold leading-none" style={{ color: "var(--color-text)" }}>Agent Workflow</p>
                        <p className="text-[9px] mt-1" style={{ color: "var(--color-faint)" }}>8 steps · Slack/chat</p>
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0"
                      style={{ color: "var(--color-orange-text)", background: "rgba(255,159,10,0.1)", border: "1px solid rgba(255,159,10,0.3)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-orange)", animation: "pulse-dot 2s ease-in-out infinite" }} />
                      In design
                    </span>
                  </div>
                </div>
              </div>
            </GlassSurface>
          </motion.a>
        </motion.div>

        {/* disclosure note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-[10px] mt-6 text-center"
          style={{ color: "var(--color-faint)" }}
        >
          A design walkthrough, not a delivered program — the PMO agent platform (above) is where the delivered numbers live. This shows the architecture and rollout thinking behind a new agent, end to end.
        </motion.p>
      </div>
    </section>
  );
}
