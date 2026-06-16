"use client";

import { useState, type Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { caseStudies } from "@/lib/caseStudies";
import TimelineStrip from "./TimelineStrip";
import MobileCarousel from "./MobileCarousel";
import GlassSurface from "./GlassSurface";
import { useTilt } from "@/hooks/useTilt";

const ACCENT: Record<string, string> = {
  "T&M":         "#0A84FF",
  "FIXED-PRICE": "#30D158",
  "MANAGED":     "#64D2FF",
  "INTERNAL":    "#FF9F0A",
};

// Darker, text-safe counterparts of ACCENT — used wherever the accent
// renders as readable text/icons on light surfaces (the vibrant ACCENT
// values fail contrast at small sizes).
const ACCENT_TEXT: Record<string, string> = {
  "T&M":         "#0066CC",
  "FIXED-PRICE": "#248A3D",
  "MANAGED":     "#0A7EA6",
  "INTERNAL":    "#B25C00",
};

const MODE_LABEL: Record<string, string> = {
  kickoff:   "DAY-ONE ASSIGNMENT",
  assigned:  "MID-PROGRAM RESCUE",
  inherited: "INHERITED AT HANDOVER",
  built:     "SELF-INITIATED",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 90, damping: 20, delay: i * 0.07 },
  }),
};

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT[study.model];
  const accentText = ACCENT_TEXT[study.model];
  const active = open || hovered;
  const [hi1, hi2] = study.headlineMetrics ?? [0, 1];
  const headlineMetrics = [study.metrics[hi1], study.metrics[hi2]];
  const tilt = useTilt(1.5);

  return (
    <motion.div
      ref={tilt.ref as Ref<HTMLDivElement>}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      whileHover={!open ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      style={
        !open
          ? {
              rotateX: tilt.style.rotateX,
              rotateY: tilt.style.rotateY,
              transformPerspective: tilt.style.transformPerspective,
            }
          : {}
      }
    >
      <GlassSurface
        accent={accent}
        radius="lg"
        className="overflow-hidden"
        style={{
          boxShadow: open
            ? `0 24px 64px rgba(15,23,42,0.08), 0 0 0 1px ${accent}20, 0 0 80px ${accent}10`
            : hovered
            ? `0 12px 40px rgba(15,23,42,0.06), 0 0 40px ${accent}08`
            : "0 4px 24px rgba(0,0,0,0.04)",
        }}
      >
        <div
          className="h-px w-full transition-all duration-500"
          style={{
            background: active
              ? `linear-gradient(90deg, transparent 0%, ${accent}70 35%, ${accent}45 65%, transparent 100%)`
              : "linear-gradient(90deg, transparent 0%, var(--glass-border) 50%, transparent 100%)",
          }}
        />

        <button onClick={() => setOpen(!open)} className="w-full text-left group">
          <div className="relative px-5 pt-6 pb-5 md:px-8 md:pt-7">
            <div
              className="absolute right-0 top-0 bottom-0 hidden md:flex items-center justify-end pr-6 select-none pointer-events-none overflow-hidden"
              style={{ width: "160px" }}
            >
              <span
                className="font-heading font-black"
                style={{
                  fontSize: "clamp(100px, 12vw, 148px)",
                  lineHeight: 1,
                  color: accent,
                  opacity: active ? 0.06 : 0.028,
                  transition: "opacity 0.4s",
                  letterSpacing: "-0.05em",
                }}
              >
                {study.number}
              </span>
            </div>

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ color: accentText, background: `${accent}15`, border: `1px solid ${accent}28` }}
                >
                  {study.type}
                </span>
                <span
                  className="glass text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ color: "var(--color-faint)" }}
                >
                  {study.model}
                </span>
                <span
                  className="text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest hidden sm:inline-block"
                  style={{ color: "var(--color-faint)", background: "transparent", border: "1px dashed var(--glass-border)" }}
                >
                  {MODE_LABEL[study.entry.mode]}
                </span>
                <span className="text-[10px]" style={{ color: "var(--color-faint)" }}>{study.year}</span>
              </div>
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  border: `1.5px solid ${accent}40`,
                  color: accentText,
                  background: open ? `${accent}18` : hovered ? `${accent}0C` : "transparent",
                }}
              >
                <Plus size={18} strokeWidth={2.5} />
              </motion.div>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="flex-1 min-w-0">
                <h3
                  className="font-heading font-bold leading-snug mb-2 transition-colors duration-300"
                  style={{
                    fontSize: "clamp(16px, 2vw, 21px)",
                    color: open ? accentText : "var(--color-text)",
                  }}
                >
                  {study.title}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-faint)" }}>{study.outcome}</p>
              </div>

              <div className="hidden lg:flex gap-7 shrink-0 pb-1">
                {headlineMetrics.map((m) => (
                  <div key={m.label} className="text-right">
                    <div
                      className="font-heading font-black tabular-nums leading-none transition-colors duration-300"
                      style={{ fontSize: "clamp(22px, 2.5vw, 30px)", color: active ? accentText : "var(--color-faint)" }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[8px] uppercase tracking-wider mt-1.5" style={{ color: "var(--color-faint)" }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mt-5 pt-5" style={{ borderTop: "1px solid var(--glass-border)" }}>
              <div className="flex flex-wrap gap-1.5">
                {study.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-full transition-colors duration-300"
                    style={{
                      color: active ? "var(--color-text-secondary)" : "var(--color-faint)",
                      background: active ? `${accent}0A` : "var(--color-bg-secondary)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    {s}
                  </span>
                ))}
                {study.stack.length > 4 && (
                  <span className="text-[10px] px-1 py-1" style={{ color: "var(--color-faint)" }}>+{study.stack.length - 4}</span>
                )}
              </div>
              <div className="flex lg:hidden gap-5 shrink-0">
                {headlineMetrics.map((m) => (
                  <div key={m.label} className="text-right">
                    <div className="font-heading font-black tabular-nums text-[16px] leading-none" style={{ color: accentText }}>
                      {m.value}
                    </div>
                    <div className="text-[8px] uppercase tracking-wider mt-1" style={{ color: "var(--color-faint)" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="overflow-hidden"
            >
              <div
                className="mx-5 md:mx-7"
                style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }}
              />
              <div className="px-5 md:px-8 pt-6 pb-7 space-y-7">

                {/* How I came into the picture */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.02 }}
                  className="pl-5 max-w-3xl"
                  style={{ borderLeft: `3px solid ${accent}50` }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-2" style={{ color: "var(--color-faint)" }}>
                    How I came into the picture
                  </p>
                  <p className="text-[14px] md:text-[15px] leading-[1.7] italic" style={{ color: "var(--color-text)" }}>
                    {study.entry.narrative}
                  </p>
                </motion.div>

                {/* 1. Context */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-2.5" style={{ color: "#0066CC" }}>
                    01 · Context
                  </p>
                  <p className="text-[13px] leading-[1.8] max-w-3xl" style={{ color: "var(--color-text-secondary)" }}>{study.context}</p>
                </motion.div>

                {/* 2. Your Role */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-2.5" style={{ color: "#248A3D" }}>
                    02 · Your Role
                  </p>
                  <p className="text-[13px] leading-[1.75] max-w-3xl" style={{ color: "var(--color-text-secondary)" }}>{study.role}</p>
                </motion.div>

                {/* 3 & 4. Actions / Decisions */}
                {study.spotlight === "decisions" ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#C7174A" }}>
                        03 · The Call I Had to Make
                      </p>
                      <ul className="space-y-2.5 max-w-3xl">
                        {study.decisions.map((d, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.18 + i * 0.06 }}
                            className="flex gap-3 text-[13px] leading-[1.7]"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#FF375F", opacity: 0.7 }} />
                            {d}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#0066CC" }}>
                        04 · Key Actions
                      </p>
                      <ul className="space-y-3 max-w-3xl">
                        {study.actions.map((a, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.22 + i * 0.06 }}
                            className="flex gap-3 text-[13px] leading-[1.75]"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            <span className="shrink-0 font-bold mt-0.5 text-sm" style={{ color: "#0066CC" }}>›</span>
                            {a}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#0066CC" }}>
                        03 · {study.spotlight === "timeline" && study.timeline ? "How It Unfolded" : "Key Actions"}
                      </p>
                      {study.spotlight === "timeline" && study.timeline ? (
                        <TimelineStrip milestones={study.timeline} accent={accent} textAccent={accentText} />
                      ) : (
                        <ul className="space-y-3 max-w-3xl">
                          {study.actions.map((a, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.18 + i * 0.06 }}
                              className="flex gap-3 text-[13px] leading-[1.75]"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              <span className="shrink-0 font-bold mt-0.5 text-sm" style={{ color: "#0066CC" }}>›</span>
                              {a}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#C7174A" }}>
                        04 · {study.spotlight === "stakeholder" ? "Stakeholder Realignment" : "Challenges & Decisions"}
                      </p>
                      <ul className="space-y-2.5 max-w-3xl">
                        {study.decisions.map((d, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.22 + i * 0.06 }}
                            className="flex gap-3 text-[13px] leading-[1.7]"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#FF375F", opacity: 0.7 }} />
                            {d}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </>
                )}

                {/* 5. Outcome */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.28 }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#B25C00" }}>
                    05 · Outcome
                  </p>
                  <div
                    className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full mb-4"
                    style={{ background: `${accent}0E`, border: `1px solid ${accent}28`, color: accentText }}
                  >
                    {study.result}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {study.metrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, scale: 0.85, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.3 + i * 0.05 }}
                        className="px-5 py-4 rounded-2xl text-center"
                        style={{ background: `linear-gradient(145deg, ${accent}0A, ${accent}05)`, border: `1px solid ${accent}20`, minWidth: "80px" }}
                      >
                        <div className="font-heading font-black text-[16px] tabular-nums leading-none" style={{ color: accentText }}>
                          {m.value}
                        </div>
                        <div className="text-[8px] font-bold uppercase tracking-wider mt-2" style={{ color: "var(--color-faint)" }}>{m.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 6. Learnings */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.34 }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#0A7EA6" }}>
                    06 · Looking Back
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
                    <div className="rounded-2xl p-4" style={{ background: "rgba(100,210,255,0.06)", border: "1px solid rgba(100,210,255,0.25)" }}>
                      <p className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: "#0A7EA6" }}>
                        What Worked
                      </p>
                      <p className="text-[13px] leading-[1.7]" style={{ color: "var(--color-text-secondary)" }}>{study.learnings.worked}</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
                      <p className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-faint)" }}>
                        Next Time
                      </p>
                      <p className="text-[13px] leading-[1.7]" style={{ color: "var(--color-text-secondary)" }}>{study.learnings.differently}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {study.stack.map((s) => (
                    <span key={s} className="text-[11px] font-medium px-3 py-1.5 rounded-full" style={{ color: "var(--color-faint)", background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
                      {s}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassSurface>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "var(--color-accent-dk)" }}>04 / WORK</p>
          <h2 className="font-heading font-bold tracking-tight leading-[0.95] mb-5" style={{ fontSize: "clamp(32px, 5.5vw, 68px)", color: "var(--color-text)" }}>
            Four programs.{" "}
            <span className="font-normal" style={{ background: "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              What actually happened
            </span>.
          </h2>
          <p className="text-[16px] max-w-2xl leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
            Client names anonymized, contract figures left out — those are AE territory.
            What&apos;s here is the part that was mine: the calls I made when something was
            about to go sideways, alongside the everyday work of keeping four very
            different programs on track. The architecture is the engineering team&apos;s
            story to tell.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="glass inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5"
              style={{ color: "var(--color-accent-dk)", borderRadius: "var(--radius-pill)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent)" }} />
              3 Client Engagements
            </span>
            <span
              className="glass inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5"
              style={{ color: "var(--color-orange-text)", borderRadius: "var(--radius-pill)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-orange)" }} />
              1 Self-Initiated Build
            </span>
          </div>
        </motion.div>

        {/* Mobile: swipeable carousel — each card expands in-place */}
        <div className="md:hidden">
          <MobileCarousel>
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </MobileCarousel>
        </div>
        {/* Desktop: vertical stack */}
        <div className="hidden md:block space-y-4">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
