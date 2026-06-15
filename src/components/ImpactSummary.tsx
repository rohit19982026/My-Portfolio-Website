"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { impactStats, transformation } from "@/lib/impactSummary";
import AnimatedCounter from "./AnimatedCounter";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STAT_ACCENTS = ["#60A5FA", "#22D3EE", "#FBBF24", "#34D399", "#60A5FA"];

export default function ImpactSummary() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" className="py-16 sm:py-24 relative overflow-hidden" style={{ background: "var(--color-ink)" }}>
      {/* Instrument-panel grid texture */}
      <div className="absolute inset-0 console-grid pointer-events-none" />

      {/* Fade out into the light section below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FFFFFF, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] block mb-5" style={{ color: "#60A5FA" }}>
            03 / IMPACT
          </span>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(32px, 5.5vw, 68px)", color: "var(--color-ink-text)" }}
          >
            Before the case studies,{" "}
            <span
              className="font-normal"
              style={{
                background: "linear-gradient(135deg, #93C5FD 0%, #60A5FA 50%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              what actually moved
            </span>
            .
          </h2>
          <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: "var(--color-ink-text-2)" }}>
            Most of what makes a program succeed doesn&apos;t show up as a number — it&apos;s
            a conversation that happened a week earlier than it had to, or a cadence
            redesigned around a problem instead of fought. These four are the closest
            thing to a paper trail for that kind of work.
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
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--color-ink-border)", background: "var(--color-ink-2)", minHeight: 200 }}
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
                  <p className="text-[12px] font-semibold mb-3" style={{ color: "var(--color-ink-text)" }}>
                    {stat.label}
                  </p>
                  <p className="text-[12px] leading-relaxed mt-auto" style={{ color: "var(--color-ink-text-2)" }}>
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
          style={{ border: "1px solid var(--color-ink-border)" }}
        >
          <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: "var(--color-ink-2)", borderBottom: "1px solid var(--color-ink-border)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22D3EE", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#22D3EE" }}>
              {transformation.label}
            </p>
          </div>
          <div className="grid md:grid-cols-2 relative">
            <div className="p-6 pb-10 md:pb-6" style={{ background: "var(--color-ink)" }}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "var(--color-ink-text-2)" }}>
                {transformation.before.heading}
              </p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--color-ink-text-2)" }}>
                {transformation.before.body}
              </p>
            </div>
            <div className="p-6 pt-10 md:pt-6" style={{ background: "linear-gradient(145deg, rgba(96,165,250,0.08), rgba(34,211,238,0.06))" }}>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "#60A5FA" }}>
                {transformation.after.heading}
              </p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--color-ink-text-2)" }}>
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
                style={{ background: "linear-gradient(135deg, #1D4ED8, #0891B2)", color: "#FFFFFF", boxShadow: "0 6px 18px rgba(8,145,178,0.4)" }}
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
