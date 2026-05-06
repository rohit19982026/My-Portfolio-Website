"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featured = [
  {
    num: "01 / ARCHITECTURE",
    title: <>I <em className="text-[#2563EB] not-italic">architect</em> delivery, not manage it.</>,
    body: "Most PMs execute the plan they're handed. I design it from scratch — WBS decomposition, parallel epic tracks, weighted % complete, critical-path mapping, float allocation. Anyone can track a Gantt. Few can build one that holds under load.",
    highlights: ["WBS decomposition", "Parallel epic tracks", "Critical-path mapping"],
  },
  {
    num: "02 / FINANCE",
    title: <>Margin is a <em className="text-[#2563EB] not-italic">feature</em>.</>,
    body: "99.98% budget execution isn't luck — it's discipline. I instrument burn rate, EAC, ETC, CPI/SPI, rate cards and PO coverage the way an engineer instruments a system. P&L is part of the deliverable, not a finance afterthought.",
    highlights: ["EAC / ETC / CPI / SPI", "Rate-card governance", "PO coverage"],
  },
  {
    num: "03 / RISK",
    title: <><em className="text-[#2563EB] not-italic">Anticipation</em> beats escalation.</>,
    body: "Risk is cheapest the day it appears. I run a live RAID register, dependency map, and weighted-progress model backed by leading indicators — UAT aging, approval latency, blocker age, velocity drift — so trouble surfaces in steerco weeks before a vanilla burndown.",
    highlights: ["Live RAID register", "Dependency mapping", "Leading indicators"],
  },
];

const whatIDo = [
  { icon: "🗺️", title: "Translate strategy into executable roadmaps", color: "#2563EB", desc: "Break down ambiguous business goals into epics, milestones, WBS structures, and engineering-ready deliverables — so teams know exactly what they're building and why." },
  { icon: "🔗", title: "Drive cross-functional execution at scale", color: "#10B981", desc: "Align engineering, data, product, and business teams across competing priorities, time zones, and timelines. Facilitate the decisions that fragmented teams avoid." },
  { icon: "🔍", title: "Own dependency mapping and critical path", color: "#2563EB", desc: "Identify upstream/downstream blockers before they land. Map cross-team dependencies, surface them in governance forums, and actively unblock engineering to maintain velocity." },
  { icon: "⚠️", title: "Build and operationalize risk frameworks", color: "#06B6D4", desc: "Proactively track risks, quantify impact in schedule and cost terms, and drive mitigation through structured RAID logs, escalation channels, and formal change control." },
  { icon: "📢", title: "Run high-signal leadership communication", color: "#10B981", desc: "Lead executive reviews, steerco sessions, and cross-org stakeholder syncs with clear visibility on progress, risks, and trade-offs — calibrated to the decision-maker's context." },
  { icon: "⚡", title: "Optimize Agile execution beyond ceremonies", color: "#2563EB", desc: "Ensure sprints drive outcomes, not just activity. Set measurable sprint goals, track velocity with intent, run retrospectives that actually change behavior." },
  { icon: "💰", title: "Establish financial governance and control", color: "#10B981", desc: "Track budget vs. burn rate, model EAC/ETC/CPI, manage rate cards and PO coverage, and build change-order business cases before teams see a funding cliff." },
  { icon: "🛠️", title: "Actively remove engineering friction", color: "#06B6D4", desc: "Work hands-on with teams to resolve blockers, clarify requirements, untangle cross-team ambiguity, and streamline workflows — so engineering velocity is protected." },
];

const philosophy = [
  { label: "Visibility", sub: "drives alignment" },
  { label: "Alignment", sub: "drives speed" },
  { label: "Speed", sub: "drives outcomes" },
];

export default function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="approach" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              02 / APPROACH
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Three things I do<br />
            that <span className="gradient-text italic font-normal">most PMs don&apos;t</span>.
          </h2>
          <p className="text-[16px] text-[#64748B] max-w-2xl leading-relaxed">
            Applied across{" "}
            <strong className="font-semibold text-[#0F172A]">
              fixed-price, T&amp;M, and managed-services
            </strong>{" "}
            commercials, regardless of stack or industry.
          </p>
        </motion.div>

        {/* 3 featured approach cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {featured.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="approach-card p-7 rounded-2xl transition-all duration-400 card-hover"
              style={{ background: "#ffffff", border: "1px solid #E2E8F0" }}
              onMouseMove={handleSpotlight}
            >
              <span
                className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded mb-7"
                style={{ color: "#2563EB", border: "1px solid rgba(37,99,235,0.35)" }}
              >
                {card.num}
              </span>
              <h3 className="font-heading text-[26px] font-bold leading-tight tracking-tight mb-4 text-[#0F172A]">
                {card.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#64748B] mb-5">{card.body}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(37,99,235,0.06)", color: "#2563EB" }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* What I actually do — 8 items */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-5"
        >
          // WHAT I ACTUALLY DO
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-3 mb-14">
          {whatIDo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.05 }}
              className="flex gap-4 p-5 rounded-xl transition-all duration-250"
              style={{ background: "#ffffff", border: "1px solid #E2E8F0" }}
            >
              <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h3
                  className="font-heading font-bold text-[13px] text-[#0F172A] mb-1.5"
                  style={{ borderLeft: `2px solid ${item.color}`, paddingLeft: "8px" }}
                >
                  {item.title}
                </h3>
                <p className="text-[12.5px] text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Execution philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl p-8 md:p-10"
          style={{ border: "1px solid #BFDBFE", background: "rgba(37,99,235,0.04)" }}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] mb-7">
            // EXECUTION PHILOSOPHY
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {philosophy.map((item, i) => (
              <div key={item.label} className="flex items-center gap-5 md:flex-1">
                <div>
                  <p className="font-heading text-[28px] font-bold gradient-text leading-none">
                    {item.label}
                  </p>
                  <p className="font-mono text-[11px] text-[#94A3B8] mt-1">{item.sub}</p>
                </div>
                {i < 2 && (
                  <span className="text-[28px] text-[#94A3B8] font-light md:mx-2">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
