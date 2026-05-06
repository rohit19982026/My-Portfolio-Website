"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featured = [
  {
    num: "01 / ARCHITECTURE",
    title: <>I <em className="text-[#2563EB] not-italic">architect</em> delivery, not manage it.</>,
    body: "On a 19-week regulated migration with a 3-week compliance blackout in the middle, a flat delivery plan would have serialised work that could run in parallel. I decomposed the WBS into 6 parallel epic tracks with explicit float at every handoff. Float held for 14 of 19 weeks. The contractual date was met on the day it was signed for. That's what delivery architecture looks like under a fixed constraint.",
    highlights: ["WBS decomposition", "Parallel epic tracks", "Float allocation"],
  },
  {
    num: "02 / FINANCE",
    title: <>Margin is a <em className="text-[#2563EB] not-italic">feature</em>.</>,
    body: "On a $1.37M T&M program, my EAC model flagged a 74%-budget / 51%-scope gap six weeks before SOW expiry — caused by 23% scope growth with no change orders. I built the commercial case, presented to the client CFO and VP Engineering, and closed an $831K change order in 10 business days. Budget execution finished at 99.98% of SOW target. P&L is part of the deliverable.",
    highlights: ["EAC / ETC / CPI / SPI", "Change-order business cases", "Rate-card governance"],
  },
  {
    num: "03 / RISK",
    title: <><em className="text-[#2563EB] not-italic">Anticipation</em> beats escalation.</>,
    body: "On a fixed-price M&A cutover, a factory-model burndown flagged a pacing risk in week 5 with 11 weeks of runway remaining — before any engineer felt it. On a managed retainer, publishing UAT aging metrics to client leadership cut sign-off time from 11 days to 4. Both times: the data surfaced the problem. The intervention happened while there was still time to act.",
    highlights: ["Leading indicators", "UAT aging metrics", "Live RAID register"],
  },
];

const failurePatterns = [
  {
    pattern: "Programs that fail on blockers",
    signal: "Nobody owns them. They age silently.",
    fix: "A live dependency register with named owners and aging counters, made the first agenda item in every steerco. 17 blockers cleared in 8 weeks — the final three through VP-level escalation triggered with data, not complaints.",
    color: "#2563EB",
  },
  {
    pattern: "Programs that fail on scope",
    signal: "Growth arrives undocumented and unpriced.",
    fix: "Change control framework requiring every addition to carry a cost estimate, timeline impact, and risk assessment before sponsor sign-off. 14 additions processed through it. Margin protected to 99.98% of SOW target.",
    color: "#10B981",
  },
  {
    pattern: "Programs that fail on stakeholders",
    signal: "Three people, three priority lists, zero shared language.",
    fix: "A weighted intake framework — RICE-style scoring with transparent trade-off matrices visible to all stakeholders. Intake decisions went from 2 weeks to 48 hours. The PM stopped being the bottleneck.",
    color: "#06B6D4",
  },
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

        {/* Three failure patterns I solve */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-5"
        >
          // THREE PATTERNS THAT KILL PROGRAMS — AND WHAT I DO ABOUT EACH
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {failurePatterns.map((item, i) => (
            <motion.div
              key={item.pattern}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              className="p-5 rounded-xl"
              style={{ background: "#ffffff", border: "1px solid #E2E8F0", borderTop: `3px solid ${item.color}` }}
            >
              <p className="font-heading font-bold text-[13px] text-[#0F172A] mb-2">{item.pattern}</p>
              <p
                className="font-mono text-[10px] font-semibold mb-3 px-2 py-1 rounded w-fit"
                style={{ color: item.color, background: `${item.color}10` }}
              >
                {item.signal}
              </p>
              <p className="text-[12.5px] text-[#64748B] leading-relaxed">{item.fix}</p>
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
