"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudies } from "@/lib/caseStudies";

const modelColor: Record<string, string> = {
  "T&M":         "#2563EB",
  "FIXED-PRICE": "#10B981",
  "MANAGED":     "#06B6D4",
};

const modelBg: Record<string, string> = {
  "T&M":         "rgba(37,99,235,0.08)",
  "FIXED-PRICE": "rgba(16,185,129,0.08)",
  "MANAGED":     "rgba(6,182,212,0.08)",
};

function CaseStudyRow({ study }: { study: typeof caseStudies[0] }) {
  const [open, setOpen] = useState(false);
  const accentColor = modelColor[study.model];

  return (
    <div
      className="rounded-2xl overflow-hidden bg-white transition-shadow duration-200 hover:shadow-md"
      style={{
        border: "1px solid #E2E8F0",
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      {/* Collapsed header */}
      <button onClick={() => setOpen(!open)} className="w-full text-left group">
        <div className="p-5 md:p-6">
          {/* Top row */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                style={{ color: accentColor, background: modelBg[study.model] }}
              >
                {study.type}
              </span>
              <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest bg-[#F1F5F9] text-[#64748B]">
                {study.model}
              </span>
              <span className="text-[11px] text-[#94A3B8]">{study.year}</span>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <div className="hidden lg:flex gap-6">
                {study.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="text-right">
                    <div className="font-heading text-[19px] font-bold leading-none" style={{ color: accentColor }}>
                      {m.value}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <span
                className="text-lg text-[#CBD5E1] group-hover:text-[#2563EB] transition-all"
                style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.25s, color 0.2s", display: "block" }}
              >
                ↗
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading text-[17px] md:text-[20px] font-bold leading-snug text-[#0F172A] group-hover:text-[#2563EB] transition-colors mb-1.5">
            {study.title}
          </h3>

          {/* Outcome */}
          <p className="text-[13px] text-[#64748B] leading-relaxed">{study.outcome}</p>
        </div>
      </button>

      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-7" style={{ borderTop: "1px solid #F1F5F9" }}>
              <p className="text-[13.5px] leading-relaxed text-[#64748B] pt-5 mb-6 max-w-3xl">
                {study.context}
              </p>

              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: accentColor }}>
                // THE MOVE THAT MATTERED
              </p>
              <ul className="space-y-4 mb-6 max-w-3xl">
                {study.moves.map((move, i) => (
                  <li key={i} className="flex gap-3 text-[13px] text-[#64748B] leading-relaxed">
                    <span className="font-bold shrink-0 mt-0.5 text-sm" style={{ color: accentColor }}>→</span>
                    {move}
                  </li>
                ))}
              </ul>

              <div
                className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6"
                style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}35`, color: accentColor }}
              >
                {study.result}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-4 py-3 rounded-xl text-center min-w-[76px]"
                    style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}25` }}
                  >
                    <div className="font-heading font-bold text-[18px] tracking-tight leading-none" style={{ color: accentColor }}>
                      {m.value}
                    </div>
                    <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#94A3B8] mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {study.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg text-[#64748B]"
                    style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 reveal" style={{ animationDelay: "0.05s" }}>
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
              scope baseline, governance cadence, EVM tracking, change control and executive close-out
            </strong>{" "}
            — anonymized by industry, real on the numbers and the judgment calls behind them.
          </p>
        </div>

        <div className="space-y-3">
          {caseStudies.map((study, i) => (
            <CaseStudyRow key={study.id} study={study} index={i} />
          ))}
        </div>

        <div
          className="reveal mt-14 p-8 md:p-10 rounded-2xl text-center"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", animationDelay: "0.3s" }}
        >
          <p
            className="font-heading font-normal leading-[1.2] tracking-tight text-[#0F172A] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
          >
            Most PMs{" "}
            <em className="text-[#2563EB]">coordinate</em>.{" "}
            <strong className="font-bold">I architect delivery</strong>, protect margin like a
            P&amp;L owner, and build AI tooling that{" "}
            <em className="text-[#2563EB]">compounds my own throughput</em>.
          </p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
            — THE PHILOSOPHY
          </p>
        </div>
      </div>
    </section>
  );
}
