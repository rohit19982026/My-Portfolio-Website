"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featured = [
  {
    num: "01 / ARCHITECTURE",
    title: <>I <em className="text-[#A78BFA] not-italic">architect</em> delivery, not manage it.</>,
    body: "Most PMs execute the plan they're handed. I design it from scratch — WBS decomposition, parallel epic tracks, weighted % complete, critical-path mapping, float allocation. Anyone can track a Gantt. Few can build one that holds under load.",
    highlights: ["WBS decomposition", "Parallel epic tracks", "Critical-path mapping"],
  },
  {
    num: "02 / FINANCE",
    title: <>Margin is a <em className="text-[#A78BFA] not-italic">feature</em>.</>,
    body: "99.98% budget execution isn't luck — it's discipline. I instrument burn rate, EAC, ETC, CPI/SPI, rate cards and PO coverage the way an engineer instruments a system. P&L is part of the deliverable, not a finance afterthought.",
    highlights: ["EAC / ETC / CPI / SPI", "Rate-card governance", "PO coverage"],
  },
  {
    num: "03 / RISK",
    title: <><em className="text-[#A78BFA] not-italic">Anticipation</em> beats escalation.</>,
    body: "Risk is cheapest the day it appears. I run a live RAID register, dependency map, and weighted-progress model backed by leading indicators — UAT aging, approval latency, blocker age, velocity drift — so trouble surfaces in steerco weeks before a vanilla burndown.",
    highlights: ["Live RAID register", "Dependency mapping", "Leading indicators"],
  },
];

const proofPoints = [
  {
    tag: "BLOCKER RESOLUTION",
    color: "#A78BFA",
    stat: "17 blockers cleared in 8 weeks",
    title: "Escalation with data, not complaints",
    desc: "Stalled $1.37M engagement. 17 external blockers, no resolution timeline. Built a live dependency map with named owners and aging data — triggered VP-level escalation that recovered engineering velocity within two sprints.",
  },
  {
    tag: "FINANCIAL GOVERNANCE",
    color: "#6EE7B7",
    stat: "$831K change order in 10 business days",
    title: "Identified the gap before the team felt it",
    desc: "Spotted a funding shortfall six weeks before SOW expiry. Built the executive business case, presented to client CFO and VP Engineering, and secured approval in 10 business days.",
  },
  {
    tag: "VELOCITY RECOVERY",
    color: "#F0ABFC",
    stat: "UAT cycle: 11 days → 4 days",
    title: "Made the bottleneck visible to people who could move it",
    desc: "Published approval-latency metrics to client leadership on a managed retainer. UAT cycle cut 64% — not by improving testing, but by making the delay undeniable to decision-makers.",
  },
  {
    tag: "SCOPE GOVERNANCE",
    color: "#A78BFA",
    stat: "14 scope additions · 0 revenue leaks",
    title: "SOWs that held under continuous pressure",
    desc: "Scoped 10+ engagements with change-control governance that absorbed 14 undocumented scope additions across one program — every one tracked, priced, or formally declined.",
  },
];

const philosophy = [
  { label: "Data", sub: "not narrative" },
  { label: "Structure", sub: "not heroics" },
  { label: "Margin", sub: "not just milestones" },
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
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              02 / APPROACH
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Three things I do<br />
            that <span className="gradient-text italic font-normal">most PMs don&apos;t</span>.
          </h2>
          <p className="text-[16px] text-[#A8A4C7] max-w-2xl leading-relaxed">
            Applied across{" "}
            <strong className="font-semibold text-[#EDE9FE]">
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
              style={{ background: "#1B1B2A", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseMove={handleSpotlight}
            >
              <span
                className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded mb-7"
                style={{ color: "#A78BFA", border: "1px solid rgba(167,139,250,0.4)" }}
              >
                {card.num}
              </span>
              <h3 className="font-display text-[26px] font-bold leading-tight tracking-tight mb-4 text-[#EDE9FE]">
                {card.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#A8A4C7] mb-5">{card.body}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(167,139,250,0.1)", color: "#A78BFA" }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proof points — 4 specific moments */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#A78BFA] mb-5"
        >
          // MOMENTS THAT PROVE IT
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-3 mb-14">
          {proofPoints.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.05 }}
              className="p-5 rounded-xl"
              style={{ background: "#1B1B2A", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded"
                  style={{ color: item.color, background: `${item.color}18` }}
                >
                  {item.tag}
                </span>
                <span className="font-mono text-[10px] font-bold" style={{ color: item.color }}>
                  {item.stat}
                </span>
              </div>
              <h3 className="font-heading font-bold text-[14px] text-[#EDE9FE] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[12.5px] text-[#A8A4C7] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Execution philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl p-8 md:p-10"
          style={{ border: "1px solid rgba(167,139,250,0.2)", background: "rgba(167,139,250,0.04)" }}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B6B8A] mb-7">
            // EXECUTION PHILOSOPHY
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {philosophy.map((item, i) => (
              <div key={item.label} className="flex items-center gap-5 md:flex-1">
                <div>
                  <p className="font-display text-[28px] font-bold gradient-text leading-none">
                    {item.label}
                  </p>
                  <p className="font-mono text-[11px] text-[#6B6B8A] mt-1">{item.sub}</p>
                </div>
                {i < 2 && (
                  <span className="text-[28px] text-[#6B6B8A] font-light md:mx-2">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
