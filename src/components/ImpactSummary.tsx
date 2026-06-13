"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { impactStats, transformation } from "@/lib/impactSummary";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
            Five years, two companies, one pattern: get put in front of a program that&apos;s
            already moving, find the gap nobody&apos;s tracking, and close it — commercially,
            operationally, or by building the tool that closes it permanently.
          </p>
        </motion.div>

        {/* Block A — stat grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 + i * 0.07 }}
              className="flex flex-col p-5 rounded-2xl bg-white"
              style={{ border: "1px solid #E2E8F0", minHeight: 192 }}
            >
              <p className="font-display tracking-tight mb-3" style={{ fontSize: "clamp(28px, 3.2vw, 38px)", fontWeight: 700, lineHeight: 1, color: "#1D4ED8" }}>
                {stat.value}
              </p>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: "#0F172A" }}>
                {stat.label}
              </p>
              <p className="text-[12px] leading-relaxed mt-auto" style={{ color: "#94A3B8" }}>
                {stat.detail}
              </p>
            </motion.div>
          ))}
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
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:border-r" style={{ background: "#FFFFFF", borderColor: "#E2E8F0" }}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "#94A3B8" }}>
                {transformation.before.heading}
              </p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "#475569" }}>
                {transformation.before.body}
              </p>
            </div>
            <div className="p-6" style={{ background: "linear-gradient(145deg, rgba(29,78,216,0.05), rgba(8,145,178,0.04))" }}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "#1D4ED8" }}>
                {transformation.after.heading}
              </p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "#475569" }}>
                {transformation.after.body}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
