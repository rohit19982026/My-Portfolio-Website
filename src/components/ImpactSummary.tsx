"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { impactStats, transformation } from "@/lib/impactSummary";
import AnimatedCounter from "./AnimatedCounter";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STAT_ACCENTS = ["#1D4ED8", "#0891B2", "#D97706", "#059669", "#1D4ED8"];

export default function ImpactSummary() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D4ED8] block mb-5">
            03 / IMPACT
          </span>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "#0F172A" }}
          >
            Before the case studies,{" "}
            <span className="gradient-text font-normal">the shape of it</span>.
          </h2>
          <p className="text-[15px] text-[#475569] max-w-2xl leading-relaxed">
            Five years across BT and phData. The shape is the same on every engagement:
            pick it up at kickoff, run the cadence week after week, hand it off cleanly at
            closure. The numbers below are the steady state, not the heroic moments.
          </p>
        </motion.div>

        {/* Block A — stat grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {impactStats.map((stat, i) => {
            const accent = STAT_ACCENTS[i % STAT_ACCENTS.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 + i * 0.07 }}
                className="flex flex-col rounded-2xl bg-white overflow-hidden"
                style={{ border: "1px solid #E2E8F0", minHeight: 200 }}
              >
                <div className="h-[3px]" style={{ background: accent }} />
                <div className="flex flex-col flex-1 p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: accent }}>
                    {String(i + 1).padStart(2, "0")} //
                  </p>
                  <AnimatedCounter
                    value={stat.value}
                    className="font-display tracking-tight mb-3 tabular-nums"
                    style={{ fontSize: "clamp(28px, 3.2vw, 38px)", fontWeight: 700, lineHeight: 1, color: accent }}
                  />
                  <p className="text-[12px] font-semibold mb-3" style={{ color: "#0F172A" }}>
                    {stat.label}
                  </p>
                  <p className="text-[12px] leading-relaxed mt-auto" style={{ color: "#94A3B8" }}>
                    {stat.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Block B — before/after transformation */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E2E8F0" }}
        >
          <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#0891B2" }} />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#0891B2" }}>
              {transformation.label}
            </p>
          </div>
          <div className="grid md:grid-cols-2 relative">
            <div className="p-6 pb-10 md:pb-6" style={{ background: "#F8FAFC" }}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "#64748B" }}>
                {transformation.before.heading}
              </p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "#475569" }}>
                {transformation.before.body}
              </p>
            </div>
            <div className="p-6 pt-10 md:pt-6" style={{ background: "linear-gradient(145deg, rgba(29,78,216,0.06), rgba(8,145,178,0.05))" }}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "#1D4ED8" }}>
                {transformation.after.heading}
              </p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "#475569" }}>
                {transformation.after.body}
              </p>
            </div>

            {/* transformation arrow connector */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.75 }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[13px] font-bold"
                style={{ background: "#1D4ED8", color: "#FFFFFF", boxShadow: "0 6px 18px rgba(29,78,216,0.35)" }}
              >
                <span className="inline-block rotate-90 md:rotate-0">→</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
