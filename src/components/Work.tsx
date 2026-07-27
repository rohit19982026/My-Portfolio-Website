"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { caseStudies } from "@/lib/caseStudies";

const modelColor: Record<string, string> = {
  "T&M":          "var(--color-accent)",
  "FIXED-PRICE":  "var(--color-mint)",
  "MANAGED":      "var(--color-pink)",
};

const modelBg: Record<string, string> = {
  "T&M":          "color-mix(in srgb, var(--color-accent) 12%, transparent)",
  "FIXED-PRICE":  "color-mix(in srgb, var(--color-mint) 12%, transparent)",
  "MANAGED":      "color-mix(in srgb, var(--color-pink) 12%, transparent)",
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
      style={{ border: "1px solid color-mix(in srgb, var(--color-line) 6%, transparent)", background: "linear-gradient(180deg, var(--color-bg-2), var(--color-bg))" }}
    >
      {/* Row header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start gap-5 group"
      >
        {/* Number */}
        <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
          <span className="font-heading text-[11px] font-semibold tracking-[0.16em] text-text-3">
            {study.number}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="font-display text-[22px] font-bold leading-tight tracking-tight text-text group-hover:text-accent transition-colors">
              {study.title}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-heading text-text-3 tracking-[0.1em]">
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
              <div className="font-display text-[20px] font-bold tracking-tight text-accent leading-none">
                {m.value}
              </div>
              <div className="font-heading text-[9px] uppercase tracking-wider text-text-3 mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <span
          className="text-xl text-text-3 group-hover:text-accent transition-all shrink-0 mt-0.5"
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
              style={{ borderTop: "1px solid color-mix(in srgb, var(--color-accent) 10%, transparent)" }}
            >
              {/* Context */}
              <p className="text-[14px] leading-relaxed text-text-2 mb-6 max-w-3xl pt-4">
                {study.context}
              </p>

              {/* Key decisions */}
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-4">
                HOW I RAN IT
              </p>
              <div className="mb-6 max-w-3xl">
                {study.decisions.map((decision, i) => (
                  <div
                    key={i}
                    className={i > 0 ? "pt-5 mt-5" : ""}
                    style={i > 0 ? { borderTop: "1px solid color-mix(in srgb, var(--color-line) 6%, transparent)" } : undefined}
                  >
                    <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-text-3 mb-1.5">
                      THE PROBLEM
                    </p>
                    <p className="text-[13.5px] text-text-2 leading-relaxed mb-3">
                      {decision.problem}
                    </p>
                    <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-1.5">
                      WHAT I DID
                    </p>
                    <p className="text-[13.5px] text-text leading-relaxed">
                      {decision.action}
                    </p>
                  </div>
                ))}
              </div>

              {/* Trade-off — candor, not a win: neutral treatment */}
              <div className="mb-6 max-w-3xl px-4 py-3 rounded-xl"
                style={{ background: "color-mix(in srgb, var(--color-text-2) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--color-text-2) 22%, transparent)" }}>
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-text-2 mb-1.5">
                  THE TRADE-OFF
                </p>
                <p className="text-[13.5px] text-text-2 leading-relaxed">
                  {study.tradeoff}
                </p>
              </div>

              {/* Result */}
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-mint mb-6 px-3 py-2 rounded w-fit"
                style={{ background: "color-mix(in srgb, var(--color-mint) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--color-mint) 20%, transparent)" }}>
                {study.result}
              </p>

              {/* Metrics + stack */}
              <div className="flex flex-wrap gap-3 items-start">
                <div className="flex flex-wrap gap-2">
                  {study.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-4 py-3 rounded-xl text-center min-w-[80px]"
                      style={{ background: "var(--color-bg-3)", border: "1px solid color-mix(in srgb, var(--color-accent) 14%, transparent)" }}
                    >
                      <div className="font-display font-bold text-[20px] tracking-tight text-text leading-none">
                        {m.value}
                      </div>
                      <div className="font-heading text-[9px] font-bold uppercase tracking-wider text-text-3 mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 items-center pt-1">
                  {study.stack.map((s) => (
                    <span
                      key={s}
                      className="font-heading text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: "color-mix(in srgb, var(--color-accent) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--color-accent) 18%, transparent)", color: "var(--color-text-2)" }}
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
    <section id="work" className="py-24 bg-bg">
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
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              02 / WORK
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Six programs I{" "}
            <span className="gradient-text font-normal">ran</span>.
          </h2>
          <p className="text-[16px] text-text-2 max-w-2xl leading-relaxed">
            The budget, the constraint, and the decisions that changed the outcome on each
            one. Clients are anonymised.
          </p>
        </motion.div>

        {/* Case study cards */}
        <div className="space-y-4">
          {caseStudies.map((study, i) => (
            <CaseStudyRow key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
