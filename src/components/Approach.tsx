"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "I architect delivery,\nnot manage it.",
    body: "Most PMs execute the plan they're handed. I design the delivery model from scratch — WBS decomposition, parallel epic tracks, weighted % complete, critical-path mapping, float allocation — because that's usually what makes the impossible date reachable. Anyone can track a Gantt. Few can build one that actually holds under load.",
    accent: "#2563eb",
  },
  {
    number: "02",
    title: "Margin is\na feature.",
    body: "99.98% budget execution isn't luck — it's discipline. I instrument burn rate, EAC, ETC, CPI/SPI, rate cards and PO coverage the way an engineer instruments a system: modeled, monitored, predictable. When scope must grow, I build the change-order business case before the cliff. When it must hold, I find the trade through formal change control. P&L is part of the deliverable, not a finance afterthought.",
    accent: "#10b981",
  },
  {
    number: "03",
    title: "Anticipation\nbeats escalation.",
    body: "Risk is cheapest the day it appears, expensive the day it lands. I run a live RAID register, dependency map, and weighted-progress model backed by leading indicators — UAT aging, approval latency, blocker age, velocity drift — so trouble surfaces in steerco weeks before it would in a vanilla burndown. Most 'blockers' stop being blockers once you see them coming. The job is to design risk out, not to escalate it well.",
    accent: "#f59e0b",
  },
];

export default function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="approach" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
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
            Three things I do{" "}
            <span className="gradient-text">that most PMs don&apos;t.</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl leading-relaxed">
            A point of view shaped across $3.5M+ of delivered programs — applied consistently
            across fixed-price, T&M and managed-services commercials, regardless of stack or industry.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="bg-white rounded-2xl p-8 border border-[#e5e7eb] hover:shadow-lg transition-shadow"
            >
              <div
                className="font-heading text-6xl font-bold mb-6 leading-none"
                style={{ color: `${pillar.accent}20` }}
              >
                {pillar.number}
              </div>
              <h3
                className="font-heading text-xl font-bold text-[#111827] mb-4 whitespace-pre-line leading-snug border-l-4 pl-4"
                style={{ borderColor: pillar.accent }}
              >
                {pillar.title}
              </h3>
              <p className="text-sm text-[#374151] leading-relaxed">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
