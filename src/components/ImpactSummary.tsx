"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { impactStats, transformation } from "@/lib/impactSummary";
import AnimatedCounter from "./AnimatedCounter";
import GlassSurface from "./GlassSurface";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STAT_ACCENTS = [
  "var(--color-accent)",
  "var(--color-teal)",
  "var(--color-orange)",
  "var(--color-green)",
  "var(--color-accent)",
];

const STAT_ACCENT_TEXTS = [
  "var(--color-accent-dk)",
  "var(--color-teal-text)",
  "var(--color-orange-text)",
  "var(--color-green-text)",
  "var(--color-accent-dk)",
];

export default function ImpactSummary() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" className="py-16 sm:py-24 relative overflow-hidden section-alt">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] block mb-5" style={{ color: "var(--color-accent-dk)" }}>
            03 / IMPACT
          </span>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(32px, 5.5vw, 68px)", color: "var(--color-text)" }}
          >
            Before the case studies,{" "}
            <span
              className="font-normal"
              style={{
                background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-teal) 50%, var(--color-green) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              what actually moved
            </span>
            .
          </h2>
          <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
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
            const accentText = STAT_ACCENT_TEXTS[i % STAT_ACCENT_TEXTS.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 + i * 0.07 }}
              >
                <GlassSurface accent={accent} interactive radius="lg" className="flex flex-col h-full" style={{ minHeight: 200 }}>
                  <div className="h-[3px]" style={{ background: accent }} />
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: accentText }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <AnimatedCounter
                      value={stat.value}
                      className="font-heading tracking-tight mb-3 tabular-nums"
                      style={{ fontSize: "clamp(28px, 3.2vw, 38px)", fontWeight: 700, lineHeight: 1, color: accentText }}
                    />
                    <p className="text-[12px] font-semibold mb-3" style={{ color: "var(--color-text)" }}>
                      {stat.label}
                    </p>
                    <p className="text-[12px] leading-relaxed mt-auto" style={{ color: "var(--color-text-secondary)" }}>
                      {stat.detail}
                    </p>
                  </div>
                </GlassSurface>
              </motion.div>
            );
          })}
        </div>

        {/* Block B — before/after transformation */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
        >
          <GlassSurface radius="lg">
            <div className="px-6 py-4 flex items-center gap-2.5" style={{ borderBottom: "1px solid var(--glass-border)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-teal)", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-teal-text)" }}>
                {transformation.label}
              </p>
            </div>
            <div className="grid md:grid-cols-2 relative">
              <div className="p-6 pb-10 md:pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "var(--color-text-secondary)" }}>
                  {transformation.before.heading}
                </p>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {transformation.before.body}
                </p>
              </div>
              <div className="p-6 pt-10 md:pt-6" style={{ background: "linear-gradient(145deg, rgba(10,132,255,0.08), rgba(100,210,255,0.08))" }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: "var(--color-accent-dk)" }}>
                  {transformation.after.heading}
                </p>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {transformation.after.body}
                </p>
              </div>

              {/* transformation arrow connector */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.75 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-teal))", color: "#FFFFFF", boxShadow: "0 6px 18px rgba(10,132,255,0.35)" }}
                >
                  <ArrowRight size={16} strokeWidth={2.5} className="hidden md:inline" />
                  <ArrowDown size={16} strokeWidth={2.5} className="md:hidden" />
                </motion.div>
              </div>
            </div>
          </GlassSurface>
        </motion.div>

      </div>
    </section>
  );
}
