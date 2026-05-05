"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const whatIDo = [
  {
    icon: "🗺️",
    title: "Translate strategy into executable roadmaps",
    desc: "Break down ambiguous business goals into epics, milestones, WBS structures, and engineering-ready deliverables — so teams know exactly what they're building and why.",
    color: "#2563eb",
  },
  {
    icon: "🔗",
    title: "Drive cross-functional execution at scale",
    desc: "Align engineering, data, product, and business teams across competing priorities, time zones, and timelines. Facilitate the decisions that fragmented teams avoid.",
    color: "#06b6d4",
  },
  {
    icon: "🔍",
    title: "Own dependency mapping and critical path",
    desc: "Identify upstream/downstream blockers before they land. Map cross-team dependencies, surface them in governance forums, and actively unblock engineering to maintain velocity.",
    color: "#10b981",
  },
  {
    icon: "⚠️",
    title: "Build and operationalize risk frameworks",
    desc: "Proactively track risks, quantify impact in schedule and cost terms, and drive mitigation through structured RAID logs, escalation channels, and formal change control.",
    color: "#f59e0b",
  },
  {
    icon: "📢",
    title: "Run high-signal leadership communication",
    desc: "Lead executive reviews, steerco sessions, and cross-org stakeholder syncs with clear visibility on progress, risks, and trade-offs — calibrated to the decision-maker's context.",
    color: "#2563eb",
  },
  {
    icon: "⚡",
    title: "Optimize Agile execution beyond ceremonies",
    desc: "Ensure sprints drive outcomes, not just activity. Set measurable sprint goals, track velocity with intent, run retrospectives that actually change behavior, and eliminate blockers between sessions.",
    color: "#06b6d4",
  },
  {
    icon: "💰",
    title: "Establish financial governance and control",
    desc: "Track budget vs. burn rate, model EAC/ETC/CPI, manage rate cards and PO coverage, and build change-order business cases before teams see a funding cliff.",
    color: "#10b981",
  },
  {
    icon: "🛠️",
    title: "Actively remove engineering friction",
    desc: "Work hands-on with teams to resolve blockers, clarify requirements, untangle cross-team ambiguity, and streamline workflows — so engineering velocity is protected, not just tracked.",
    color: "#f59e0b",
  },
];

const howIWork = [
  {
    principle: "I organize chaos into structured execution systems",
    detail: "Ambiguity is the default state of any complex program. My job is to impose structure — RAID logs, dependency maps, WBS, governance cadences — before the chaos imposes itself.",
  },
  {
    principle: "I prioritize clarity over process overhead",
    detail: "Process is a tool, not a goal. Every artifact I create — status update, RACI, risk register — earns its existence by reducing decision latency, not by satisfying a template.",
  },
  {
    principle: "I drive accountability without slowing teams down",
    detail: "Accountability doesn't require micromanagement. It requires clear ownership, visible commitments, and a PM who removes friction faster than it accumulates.",
  },
  {
    principle: "I focus on outcomes, not just deliverables",
    detail: "Stories closed is a vanity metric. I track what actually matters: scope delivered against commercial commitments, velocity against critical path, and risk exposure against budget.",
  },
];

export default function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="approach" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-5xl font-bold text-[#e5e7eb]">02</span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">/ APPROACH</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#111827] mb-4">
            What I actually do —{" "}
            <span className="gradient-text">and how I do it.</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl leading-relaxed">
            Technical program management is not coordination. It is structured execution
            under uncertainty — with real accountability for scope, cost, risk, and
            cross-functional alignment.
          </p>
        </motion.div>

        {/* What I do — 8 items */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563eb] mb-6"
        >
          // WHAT I ACTUALLY DO
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {whatIDo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="flex gap-4 p-5 rounded-xl bg-white border border-[#e5e7eb] hover:shadow-md hover:border-[#bfdbfe] transition-all"
            >
              <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h3
                  className="font-heading font-bold text-sm text-[#111827] mb-1.5"
                  style={{ borderLeft: `3px solid ${item.color}`, paddingLeft: "8px" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How I work — 4 principles */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#10b981] mb-6"
        >
          // HOW I WORK
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {howIWork.map((item, i) => (
            <motion.div
              key={item.principle}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
              className="p-6 rounded-xl bg-white border border-[#e5e7eb]"
            >
              <p className="font-heading font-bold text-[#111827] mb-2 text-sm leading-snug">
                {item.principle}
              </p>
              <p className="text-xs text-[#6b7280] leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Execution philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl border-2 border-[#bfdbfe] bg-white p-8 md:p-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280] mb-6">
            // EXECUTION PHILOSOPHY
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
            {[
              { label: "Visibility", sub: "drives alignment" },
              { label: "Alignment", sub: "drives speed" },
              { label: "Speed", sub: "drives outcomes" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-4 md:flex-1">
                <div>
                  <p className="font-heading text-2xl font-bold gradient-text">{item.label}</p>
                  <p className="text-xs text-[#6b7280] font-medium">{item.sub}</p>
                </div>
                {i < 2 && (
                  <span className="text-2xl text-[#bfdbfe] font-light md:mx-4">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
