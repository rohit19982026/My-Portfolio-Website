"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { caseStudies } from "@/lib/caseStudies";
import SectionHeading from "./ui/SectionHeading";
import ArrowCircle from "./ui/ArrowCircle";
import CardCover from "./ui/CardCover";

const modelColor: Record<string, string> = {
  "T&M":          "var(--color-white)",
  "FIXED-PRICE":  "var(--color-lime)",
  "MANAGED":      "var(--color-white)",
};

const modelTone: Record<string, "blue" | "lime" | "white"> = {
  "T&M":          "blue",
  "FIXED-PRICE":  "lime",
  "MANAGED":      "white",
};

const modelBg: Record<string, string> = {
  "T&M":          "color-mix(in srgb, var(--color-blue) 55%, transparent)",
  "FIXED-PRICE":  "color-mix(in srgb, var(--color-lime) 18%, transparent)",
  "MANAGED":      "color-mix(in srgb, var(--color-white) 14%, transparent)",
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
      className="relative group"
    >
      {/* Lime offset-shadow duplicate, Aurelia's signature card treatment */}
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-card bg-lime" aria-hidden="true" />

      <div
        className="relative rounded-card overflow-hidden border-2 transition-colors duration-[var(--duration-base)] border-white/15 group-hover:border-lime"
        style={{ background: "color-mix(in srgb, var(--color-ink) 78%, transparent)" }}
      >
        <button onClick={() => setOpen(!open)} className="w-full text-left p-5 sm:p-6 flex items-start gap-5">
          <CardCover number={study.number} label={study.industry} tone={modelTone[study.model]} size="sm" />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="font-display text-[20px] sm:text-[22px] leading-tight tracking-tight text-white group-hover:text-lime transition-colors">
                {study.title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-heading text-white/55 tracking-[0.1em]">
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
          <div className="hidden lg:flex gap-3 shrink-0 mr-2">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="text-right">
                <div className="font-display text-[20px] tracking-tight text-lime leading-none">
                  {m.value}
                </div>
                <div className="font-heading text-[9px] uppercase tracking-wider text-white/50 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <ArrowCircle open={open} className="mt-0.5" />
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
              <div className="px-5 sm:px-6 pb-8 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                {/* Context */}
                <p className="text-[14px] leading-relaxed text-white/70 mb-6 max-w-3xl pt-4">
                  {study.context}
                </p>

                {/* Key decisions */}
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-lime mb-4">
                  HOW I RAN IT
                </p>
                <div className="mb-6 max-w-3xl">
                  {study.decisions.map((decision, i) => (
                    <div
                      key={i}
                      className={i > 0 ? "pt-5 mt-5" : ""}
                      style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.1)" } : undefined}
                    >
                      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 mb-1.5">
                        THE PROBLEM
                      </p>
                      <p className="text-[13.5px] text-white/70 leading-relaxed mb-3">
                        {decision.problem}
                      </p>
                      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-lime mb-1.5">
                        WHAT I DID
                      </p>
                      <p className="text-[13.5px] text-white leading-relaxed">
                        {decision.action}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Trade-off — candor, not a win: neutral treatment */}
                <div
                  className="mb-6 max-w-3xl px-4 py-3 rounded-card"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 mb-1.5">
                    THE TRADE-OFF
                  </p>
                  <p className="text-[13.5px] text-white/70 leading-relaxed">
                    {study.tradeoff}
                  </p>
                </div>

                {/* Result */}
                <p
                  className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-lime mb-6 px-3 py-2 rounded-card w-fit"
                  style={{ background: "color-mix(in srgb, var(--color-lime) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--color-lime) 30%, transparent)" }}
                >
                  {study.result}
                </p>

                {/* Metrics + stack */}
                <div className="flex flex-wrap gap-3 items-start">
                  <div className="flex flex-wrap gap-2">
                    {study.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="px-4 py-3 rounded-card text-center min-w-[80px]"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid color-mix(in srgb, var(--color-blue) 40%, transparent)" }}
                      >
                        <div className="font-display text-[20px] tracking-tight text-white leading-none">
                          {m.value}
                        </div>
                        <div className="font-heading text-[9px] font-bold uppercase tracking-wider text-white/50 mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center pt-1">
                    {study.stack.map((s) => (
                      <span
                        key={s}
                        className="font-heading text-[11px] font-semibold px-2.5 py-1 rounded-card"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.75)" }}
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
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 bg-blue">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <SectionHeading
            eyebrow="02 / WORK"
            segments={[
              { text: "Six programs I", style: "fill" },
              { text: "ran.", style: "outline" },
            ]}
          />
          <p className="text-[16px] text-white/75 max-w-2xl leading-relaxed mt-5">
            The budget, the constraint, and the decisions that changed the outcome on each
            one. Clients are anonymised.
          </p>
        </div>

        {/* Case study cards — each with its own lime offset-shadow, not a horizontal
            carousel: these are prose-heavy accounts, not photography, so the accordion
            interaction stays and only the visual language is ported. */}
        <div className="space-y-8">
          {caseStudies.map((study, i) => (
            <CaseStudyRow key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
