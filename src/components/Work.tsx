"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { caseStudies } from "@/lib/caseStudies";

const modelColor: Record<string, string> = {
  "T&M":          "#2563EB",
  "FIXED-PRICE":  "#10B981",
  "MANAGED":      "#06B6D4",
};

const modelBg: Record<string, string> = {
  "T&M":          "rgba(37,99,235,0.10)",
  "FIXED-PRICE":  "rgba(16,185,129,0.10)",
  "MANAGED":      "rgba(6,182,212,0.10)",
};

function CaseStudyRow({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="rounded-xl overflow-hidden card-hover"
      style={{ border: "1px solid #E2E8F0", background: "#ffffff" }}
    >
      {/* Row header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start gap-5 group"
      >
        {/* Number + badge */}
        <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
          <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[#94A3B8]">
            {study.number}
          </span>
          <span
            className="text-[9px] font-mono font-bold px-2 py-0.5 rounded"
            style={{ background: "rgba(16,185,129,0.10)", color: "#10B981" }}
          >
            ● LIVE
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg md:text-[22px] font-bold leading-tight tracking-tight text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-1">
            {study.title}
          </h3>
          <p className="text-xs text-[#64748B] mb-2 leading-snug">{study.outcome}</p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#94A3B8] tracking-[0.1em]">
            <span className="uppercase">{study.industry}</span>
            <span>·</span>
            <span>{study.year}</span>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{ color: modelColor[study.model], backgroundColor: modelBg[study.model] }}
            >
              {study.model}
            </span>
          </div>
        </div>

        {/* Quick metrics (desktop) */}
        <div className="hidden lg:flex gap-3 shrink-0 mr-4">
          {study.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="text-right">
              <div className="font-heading text-[20px] font-bold tracking-tight text-[#2563EB] leading-none">
                {m.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <span
          className="text-xl text-[#94A3B8] group-hover:text-[#2563EB] transition-all shrink-0 mt-0.5"
          style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.25s, color 0.2s" }}
        >
          ↗
        </span>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-8 pt-2"
              style={{ borderTop: "1px solid #E2E8F0" }}
            >
              {/* Context */}
              <p className="text-[14px] leading-relaxed text-[#64748B] mb-6 max-w-3xl pt-4">
                {study.context}
              </p>

              {/* The move that mattered */}
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563EB] mb-4">
                // THE MOVE THAT MATTERED
              </p>
              <ul className="space-y-3 mb-6 max-w-3xl">
                {study.moves.map((move, i) => (
                  <li key={i} className="flex gap-3 text-[13.5px] text-[#64748B] leading-relaxed">
                    <span className="text-[#2563EB] font-bold shrink-0 mt-0.5">→</span>
                    {move}
                  </li>
                ))}
              </ul>

              {/* Result */}
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#10B981] mb-6 px-3 py-2 rounded w-fit"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                {study.result}
              </p>

              {/* Metrics + stack */}
              <div className="flex flex-wrap gap-3 items-start">
                <div className="flex flex-wrap gap-2">
                  {study.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-4 py-3 rounded-xl text-center min-w-[80px]"
                      style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
                    >
                      <div className="font-heading font-bold text-[20px] tracking-tight text-[#0F172A] leading-none">
                        {m.value}
                      </div>
                      <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#94A3B8] mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 items-center pt-1">
                  {study.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#64748B" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              01 / WORK
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Six programs.{" "}
            <span className="gradient-text italic font-normal">Real numbers</span>.
          </h2>
          <p className="text-[16px] text-[#64748B] max-w-2xl leading-relaxed">
            End-to-end across{" "}
            <strong className="font-semibold text-[#0F172A]">
              scope baseline, governance cadence, EVM tracking, change control and executive
              close-out
            </strong>{" "}
            — anonymized by industry, real on the numbers and the judgment calls behind them.
          </p>
        </motion.div>

        {/* Case study cards */}
        <div className="space-y-4">
          {caseStudies.map((study, i) => (
            <CaseStudyRow key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-10 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(37,99,235,0.07), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(6,182,212,0.05), transparent 60%), #EFF6FF",
            border: "1px solid #BFDBFE",
          }}
        >
          <p
            className="font-heading font-normal leading-[1.18] tracking-tight text-[#0F172A] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}
          >
            Most PMs{" "}
            <em className="text-[#2563EB]">coordinate</em>.{" "}
            <strong className="font-bold">I architect delivery</strong>, protect margin like a
            P&amp;L owner, and build AI tooling that{" "}
            <em className="text-[#2563EB]">compounds my own throughput</em>.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
            — THE PHILOSOPHY
          </p>
        </motion.div>
      </div>
    </section>
  );
}
