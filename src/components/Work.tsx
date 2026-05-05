"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { caseStudies } from "@/lib/caseStudies";

const modelColor: Record<string, string> = {
  "T&M": "#2563eb",
  "FIXED-PRICE": "#10b981",
  "MANAGED": "#f59e0b",
};

function CaseStudyRow({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-[#e5e7eb] last:border-0"
    >
      {/* Row header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-6 flex items-start gap-6 group"
      >
        <span className="font-heading text-xs font-bold text-[#6b7280] tracking-widest mt-1 shrink-0 w-8">
          {study.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="font-heading text-lg font-bold text-[#111827] group-hover:text-[#2563eb] transition-colors">
              {study.title}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6b7280] font-medium">
            <span>{study.industry}</span>
            <span>·</span>
            <span>{study.year}</span>
            <span
              className="px-2 py-0.5 rounded-full text-white font-bold text-[10px]"
              style={{ backgroundColor: modelColor[study.model] }}
            >
              {study.model}
            </span>
          </div>
        </div>
        <span
          className="text-xl font-light text-[#6b7280] group-hover:text-[#2563eb] transition-all shrink-0"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}
        >
          ↗
        </span>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-4 sm:pl-14">
              {/* Context */}
              <p className="text-[#374151] leading-relaxed mb-6 max-w-3xl">{study.context}</p>

              {/* The move that mattered */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb] mb-4">
                  // THE MOVE THAT MATTERED
                </p>
                <ul className="space-y-3 max-w-3xl">
                  {study.moves.map((move, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#374151] leading-relaxed">
                      <span className="text-[#2563eb] font-bold shrink-0 mt-0.5">→</span>
                      {move}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#10b981] mb-6">
                {study.result}
              </p>

              {/* Metrics + stack row */}
              <div className="flex flex-wrap gap-3 items-start">
                {/* Metrics */}
                <div className="flex flex-wrap gap-2">
                  {study.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-4 py-3 rounded-xl bg-[#f0f9ff] border border-[#bfdbfe] text-center min-w-[80px]"
                    >
                      <div className="font-heading font-bold text-lg text-[#111827]">{m.value}</div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#6b7280] leading-tight mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 items-center pt-1">
                  {study.stack.map((s) => (
                    <span key={s} className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#f8faff] border border-[#e0e7ff] text-[#374151]">
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
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-5xl font-bold text-[#e5e7eb]">01</span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">/ WORK</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#111827] mb-4 max-w-2xl">
            Selected case studies,{" "}
            <span className="gradient-text">told honestly.</span>
          </h2>
          <p className="text-[#6b7280] max-w-2xl leading-relaxed">
            Six enterprise programs owned end-to-end across discovery, scope baseline,
            governance cadence, EVM tracking, change control and executive close-out —
            anonymized by industry, real on the numbers and the judgment calls behind them.
          </p>
        </motion.div>

        {/* Case study list */}
        <div className="border-t border-[#e5e7eb]">
          {caseStudies.map((study, i) => (
            <CaseStudyRow key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* Philosophy pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border-l-4 border-[#2563eb] pl-6 py-2"
        >
          <p className="text-xl font-light text-[#374151] leading-relaxed italic mb-3">
            &ldquo;Most PMs coordinate. I architect delivery, protect margin like a P&L
            owner, and build AI tooling that compounds my own throughput.&rdquo;
          </p>
          <cite className="text-xs font-bold uppercase tracking-widest text-[#6b7280] not-italic">
            THE PHILOSOPHY
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
