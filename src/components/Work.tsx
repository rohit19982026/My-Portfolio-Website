"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudies } from "@/lib/caseStudies";

const ACCENT: Record<string, string> = {
  "T&M":         "#A78BFA",
  "FIXED-PRICE": "#6EE7B7",
  "MANAGED":     "#67E8F9",
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
  const active = open || hovered;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={!open ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
    >
      <div
        className="rounded-2xl p-px transition-all duration-500"
        style={{
          background: active
            ? `linear-gradient(135deg, ${accent}55 0%, ${accent}15 40%, transparent 70%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: open
            ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20, 0 0 80px ${accent}10`
            : hovered
            ? `0 12px 40px rgba(0,0,0,0.35), 0 0 40px ${accent}08`
            : "none",
        }}
      >
        <div
          className="rounded-[15px] overflow-hidden"
          style={{ background: "linear-gradient(145deg, #0E0E1C 0%, #0A0A14 60%, #0C0C18 100%)" }}
        >
          <div
            className="h-px w-full transition-all duration-500"
            style={{
              background: active
                ? `linear-gradient(90deg, transparent 0%, ${accent}70 35%, ${accent}45 65%, transparent 100%)`
                : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
            }}
          />

          <button onClick={() => setOpen(!open)} className="w-full text-left group">
            <div className="relative px-7 pt-6 pb-5 md:px-8 md:pt-7">
              <div
                className="absolute right-0 top-0 bottom-0 flex items-center justify-end pr-6 select-none pointer-events-none overflow-hidden"
                style={{ width: "160px" }}
              >
                <span
                  className="font-mono font-black"
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
                    className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                    style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}28` }}
                  >
                    {study.type}
                  </span>
                  <span
                    className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                    style={{ color: "#6B6B8A", background: "rgba(107,107,138,0.1)", border: "1px solid rgba(107,107,138,0.18)" }}
                  >
                    {study.model}
                  </span>
                  <span className="font-mono text-[10px] text-[#35355A]">{study.year}</span>
                </div>
                <motion.div
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 transition-all duration-300"
                  style={{
                    border: `1.5px solid ${accent}40`,
                    color: accent,
                    background: open ? `${accent}18` : hovered ? `${accent}0C` : "transparent",
                  }}
                >
                  ↗
                </motion.div>
              </div>

              <div className="flex items-end justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-heading font-bold leading-snug mb-2 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(16px, 2vw, 21px)",
                      color: open ? accent : hovered ? "#F5F0FF" : "#EDE9FE",
                    }}
                  >
                    {study.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-[#35355A]">{study.outcome}</p>
                </div>

                <div className="hidden lg:flex gap-7 shrink-0 pb-1">
                  {study.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-right">
                      <div
                        className="font-mono font-black tabular-nums leading-none transition-colors duration-300"
                        style={{ fontSize: "clamp(22px, 2.5vw, 30px)", color: active ? accent : "#5A5A8A" }}
                      >
                        {m.value}
                      </div>
                      <div className="font-mono text-[8px] uppercase tracking-wider text-[#35355A] mt-1.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 mt-5 pt-5 border-t border-white/[0.04]">
                <div className="flex flex-wrap gap-1.5">
                  {study.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-lg transition-colors duration-300"
                      style={{
                        color: active ? "#7070A0" : "#4A4A6A",
                        background: active ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {study.stack.length > 4 && (
                    <span className="text-[10px] text-[#35355A] px-1 py-1">+{study.stack.length - 4}</span>
                  )}
                </div>
                <div className="flex lg:hidden gap-5 shrink-0">
                  {study.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-right">
                      <div className="font-mono font-black tabular-nums text-[16px] leading-none" style={{ color: accent }}>
                        {m.value}
                      </div>
                      <div className="font-mono text-[8px] uppercase tracking-wider text-[#35355A] mt-1">{m.label}</div>
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
                  className="mx-7"
                  style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }}
                />
                <div className="px-7 md:px-8 pt-6 pb-7 space-y-7">

                  {/* 1. Context */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] mb-2.5" style={{ color: accent }}>
                      01 · CONTEXT
                    </p>
                    <p className="text-[13px] leading-[1.8] text-[#6A6A9A] max-w-3xl">{study.context}</p>
                  </motion.div>

                  {/* 2. Your Role */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] mb-2.5" style={{ color: "#6EE7B7" }}>
                      02 · YOUR ROLE
                    </p>
                    <p className="text-[13px] leading-[1.75] text-[#6A6A9A] max-w-3xl">{study.role}</p>
                  </motion.div>

                  {/* 3. Key Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#60A5FA" }}>
                      03 · KEY ACTIONS
                    </p>
                    <ul className="space-y-3 max-w-3xl">
                      {study.actions.map((a, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.18 + i * 0.06 }}
                          className="flex gap-3 text-[13px] text-[#6A6A9A] leading-[1.75]"
                        >
                          <span className="shrink-0 font-bold mt-0.5 text-sm" style={{ color: "#60A5FA" }}>›</span>
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* 4. Challenges & Decisions */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#F87171" }}>
                      04 · CHALLENGES &amp; DECISIONS
                    </p>
                    <ul className="space-y-2.5 max-w-3xl">
                      {study.decisions.map((d, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.22 + i * 0.06 }}
                          className="flex gap-3 text-[13px] text-[#6A6A9A] leading-[1.7]"
                        >
                          <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F87171] opacity-70" />
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* 5. Outcome */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.28 }}
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#FCD34D" }}>
                      05 · OUTCOME
                    </p>
                    <div
                      className="inline-flex items-center text-[9px] font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded-full mb-4"
                      style={{ background: `${accent}0E`, border: `1px solid ${accent}28`, color: accent }}
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
                          className="px-5 py-4 rounded-xl text-center"
                          style={{ background: `linear-gradient(145deg, ${accent}0A, ${accent}05)`, border: `1px solid ${accent}20`, minWidth: "80px" }}
                        >
                          <div className="font-mono font-black text-[16px] tabular-nums leading-none" style={{ color: accent }}>
                            {m.value}
                          </div>
                          <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#35355A] mt-2">{m.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {study.stack.map((s) => (
                      <span key={s} className="text-[11px] font-medium px-3 py-1.5 rounded-lg text-[#5A5A7A]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {s}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 bg-[#0A0A12] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)", filter: "blur(1px)" }} />
        <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(110,231,183,0.04) 0%, transparent 65%)", filter: "blur(1px)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#A78BFA] mb-5">01 / WORK</p>
          <h2 className="font-heading font-bold tracking-tight leading-[0.95] mb-6" style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "#EDE9FE" }}>
            Six programs.{" "}
            <span className="italic font-normal" style={{ background: "linear-gradient(130deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Real numbers
            </span>.
          </h2>
          <p className="text-[15px] text-[#55557A] max-w-2xl leading-relaxed">
            Client names are anonymized. The contracts, timelines, and outcomes are real.
          </p>
        </motion.div>

        <div className="space-y-4">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
