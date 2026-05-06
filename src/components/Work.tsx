"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudies } from "@/lib/caseStudies";

const MODEL_ACCENT: Record<string, string> = {
  "T&M":         "#A78BFA",
  "FIXED-PRICE": "#6EE7B7",
  "MANAGED":     "#67E8F9",
};

const MODEL_GLOW: Record<string, string> = {
  "T&M":         "rgba(167,139,250,0.12)",
  "FIXED-PRICE": "rgba(110,231,183,0.12)",
  "MANAGED":     "rgba(103,232,249,0.12)",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function CaseStudyCard({ study, index }: { study: (typeof caseStudies)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const accent = MODEL_ACCENT[study.model];
  const glow   = MODEL_GLOW[study.model];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: "rgba(19,19,31,0.85)",
          border: `1px solid ${open ? accent + "30" : "rgba(255,255,255,0.06)"}`,
          boxShadow: open ? `0 0 0 1px ${accent}20, 0 12px 48px ${glow}` : "none",
        }}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
          style={{
            background: `linear-gradient(180deg, ${accent}, ${accent}60)`,
            opacity: open ? 1 : 0.25,
          }}
        />

        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left pl-7 pr-6 py-6 md:py-7"
        >
          <div className="flex items-start justify-between gap-4">
            {/* Left block */}
            <div className="flex items-start gap-4 min-w-0">
              {/* Number */}
              <span
                className="font-mono text-[12px] font-bold shrink-0 mt-1 tabular-nums"
                style={{ color: accent, opacity: 0.45 }}
              >
                {study.number}
              </span>

              <div className="min-w-0">
                {/* Badge row */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{
                      color: accent,
                      background: `${accent}15`,
                      border: `1px solid ${accent}28`,
                    }}
                  >
                    {study.type}
                  </span>
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{
                      color: "#6B6B8A",
                      background: "rgba(107,107,138,0.1)",
                      border: "1px solid rgba(107,107,138,0.18)",
                    }}
                  >
                    {study.model}
                  </span>
                  <span className="font-mono text-[10px] text-[#3D3D5C]">{study.year}</span>
                </div>

                {/* Title */}
                <h3
                  className="font-heading text-[15px] md:text-[18px] font-bold leading-snug mb-1.5 transition-colors duration-200"
                  style={{ color: open ? accent : "#EDE9FE" }}
                >
                  {study.title}
                </h3>

                {/* Outcome subtitle */}
                <p className="text-[12px] text-[#3D3D5C] leading-relaxed hidden sm:block">
                  {study.outcome}
                </p>
              </div>
            </div>

            {/* Right: metrics + arrow */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden lg:flex gap-5">
                {study.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="text-right">
                    <div
                      className="font-mono text-[16px] font-bold leading-none tabular-nums"
                      style={{ color: accent }}
                    >
                      {m.value}
                    </div>
                    <div className="font-mono text-[8px] uppercase tracking-wider text-[#3D3D5C] mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0 transition-colors duration-200"
                style={{
                  border: `1px solid ${accent}35`,
                  color: accent,
                  background: open ? `${accent}15` : "transparent",
                }}
              >
                ↗
              </motion.div>
            </div>
          </div>
        </button>

        {/* Expanded panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div
                className="mx-5 mb-6 rounded-xl p-5 md:p-6"
                style={{
                  background: "rgba(10,10,18,0.7)",
                  border: `1px solid ${accent}18`,
                }}
              >
                <p className="text-[13px] leading-relaxed text-[#7A7A9A] mb-6 max-w-3xl">
                  {study.context}
                </p>

                <p
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-4"
                  style={{ color: accent }}
                >
                  ◆ THE MOVE THAT MATTERED
                </p>

                <ul className="space-y-4 mb-7 max-w-3xl">
                  {study.moves.map((move, i) => (
                    <li key={i} className="flex gap-3 text-[13px] text-[#7A7A9A] leading-relaxed">
                      <span
                        className="font-bold shrink-0 mt-0.5"
                        style={{ color: accent }}
                      >
                        ›
                      </span>
                      {move}
                    </li>
                  ))}
                </ul>

                {/* Result pill */}
                <div
                  className="inline-flex items-center text-[9px] font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6"
                  style={{
                    background: `${accent}10`,
                    border: `1px solid ${accent}30`,
                    color: accent,
                  }}
                >
                  {study.result}
                </div>

                {/* Metrics grid */}
                <div className="flex flex-wrap gap-2.5 mb-5">
                  {study.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-4 py-3 rounded-xl text-center"
                      style={{
                        background: `${accent}08`,
                        border: `1px solid ${accent}20`,
                        minWidth: "76px",
                      }}
                    >
                      <div
                        className="font-mono font-bold text-[15px] tabular-nums leading-none"
                        style={{ color: accent }}
                      >
                        {m.value}
                      </div>
                      <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#3D3D5C] mt-1.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg text-[#5A5A7A]"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
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
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 bg-[#0A0A12]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              01 / WORK
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-6 text-[#EDE9FE]"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Six programs.{" "}
            <span
              className="italic font-normal"
              style={{
                background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Real numbers
            </span>
            .
          </h2>
          <p className="text-[15px] text-[#6B6B8A] max-w-2xl leading-relaxed">
            End-to-end across{" "}
            <span className="text-[#A78BFA]">
              scope baseline, governance cadence, EVM tracking, change control and executive close-out
            </span>{" "}
            — anonymized by industry, real on the numbers and the judgment calls behind them.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-3">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* Philosophy callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-14 p-8 md:p-12 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: "rgba(19,19,31,0.85)",
            border: "1px solid rgba(167,139,250,0.12)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(124,58,237,0.12) 0%, transparent 70%)",
            }}
          />
          <p
            className="font-heading font-normal leading-[1.25] tracking-tight text-[#EDE9FE] max-w-3xl mx-auto relative"
            style={{ fontSize: "clamp(20px, 2.8vw, 34px)" }}
          >
            Most PMs{" "}
            <em style={{ color: "#A78BFA" }}>coordinate</em>.{" "}
            <strong className="font-bold">I architect delivery</strong>, protect margin like a
            P&amp;L owner, and build AI tooling that{" "}
            <em style={{ color: "#6EE7B7" }}>compounds my own throughput</em>.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#3D3D5C] relative">
            — THE PHILOSOPHY
          </p>
        </motion.div>
      </div>
    </section>
  );
}
