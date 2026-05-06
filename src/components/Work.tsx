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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        transform: hovered && !open ? "translateY(-4px)" : "translateY(0px)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Gradient border shell */}
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
          style={{
            background:
              "linear-gradient(145deg, #0E0E1C 0%, #0A0A14 60%, #0C0C18 100%)",
          }}
        >
          {/* Top gradient line */}
          <div
            className="h-px w-full transition-all duration-500"
            style={{
              background: active
                ? `linear-gradient(90deg, transparent 0%, ${accent}70 35%, ${accent}45 65%, transparent 100%)`
                : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
            }}
          />

          {/* Main button area */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left group"
          >
            <div className="relative px-7 pt-6 pb-5 md:px-8 md:pt-7">
              {/* Watermark number */}
              <div
                className="absolute right-6 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden"
                style={{ width: "160px" }}
              >
                <span
                  className="font-mono font-black"
                  style={{
                    fontSize: "clamp(100px, 12vw, 148px)",
                    lineHeight: 1,
                    color: accent,
                    opacity: active ? 0.055 : 0.028,
                    transition: "opacity 0.4s",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {study.number}
                </span>
              </div>

              {/* Top row: badges + arrow */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                    style={{
                      color: accent,
                      background: `${accent}15`,
                      border: `1px solid ${accent}28`,
                    }}
                  >
                    {study.type}
                  </span>
                  <span
                    className="font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                    style={{
                      color: "#6B6B8A",
                      background: "rgba(107,107,138,0.1)",
                      border: "1px solid rgba(107,107,138,0.18)",
                    }}
                  >
                    {study.model}
                  </span>
                  <span className="font-mono text-[10px] text-[#35355A]">
                    {study.year}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
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

              {/* Two-column: title+outcome left, hero metrics right */}
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
                  <p className="text-[12px] leading-relaxed text-[#35355A]">
                    {study.outcome}
                  </p>
                </div>

                {/* Hero metrics — right column */}
                <div className="hidden lg:flex gap-7 shrink-0 pb-1">
                  {study.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-right">
                      <div
                        className="font-mono font-black tabular-nums leading-none transition-colors duration-300"
                        style={{
                          fontSize: "clamp(22px, 2.5vw, 30px)",
                          color: active ? accent : "#5A5A8A",
                        }}
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

              {/* Stack + mobile metrics row */}
              <div className="flex items-center justify-between gap-3 mt-5 pt-5 border-t border-white/[0.04]">
                <div className="flex flex-wrap gap-1.5">
                  {study.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-lg transition-colors duration-300"
                      style={{
                        color: active ? "#7070A0" : "#4A4A6A",
                        background: active
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {study.stack.length > 4 && (
                    <span className="text-[10px] text-[#35355A] px-1 py-1">
                      +{study.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Mobile metrics */}
                <div className="flex lg:hidden gap-5 shrink-0">
                  {study.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="text-right">
                      <div
                        className="font-mono font-black tabular-nums text-[16px] leading-none"
                        style={{ color: accent }}
                      >
                        {m.value}
                      </div>
                      <div className="font-mono text-[8px] uppercase tracking-wider text-[#35355A] mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </button>

          {/* ── Expanded detail panel ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                {/* Separator */}
                <div
                  className="mx-7"
                  style={{
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${accent}30, transparent)`,
                  }}
                />

                <div className="px-7 md:px-8 pt-6 pb-7 space-y-6">
                  {/* Context */}
                  <p className="text-[13px] leading-[1.8] text-[#6A6A9A] max-w-3xl">
                    {study.context}
                  </p>

                  {/* Moves */}
                  <div>
                    <p
                      className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] mb-4"
                      style={{ color: accent }}
                    >
                      ◆  THE MOVE THAT MATTERED
                    </p>
                    <ul className="space-y-4 max-w-3xl">
                      {study.moves.map((move, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.08 + i * 0.07,
                            duration: 0.4,
                            ease: EASE,
                          }}
                          className="flex gap-3 text-[13px] text-[#6A6A9A] leading-[1.75]"
                        >
                          <span
                            className="shrink-0 font-bold mt-0.5 text-base"
                            style={{ color: accent }}
                          >
                            ›
                          </span>
                          {move}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Result pill */}
                  <div
                    className="inline-flex items-center text-[9px] font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded-full"
                    style={{
                      background: `${accent}0E`,
                      border: `1px solid ${accent}28`,
                      color: accent,
                    }}
                  >
                    {study.result}
                  </div>

                  {/* Full metrics grid */}
                  <div className="flex flex-wrap gap-3">
                    {study.metrics.map((m) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="px-5 py-4 rounded-xl text-center"
                        style={{
                          background: `linear-gradient(145deg, ${accent}0A, ${accent}05)`,
                          border: `1px solid ${accent}20`,
                          minWidth: "80px",
                        }}
                      >
                        <div
                          className="font-mono font-black text-[16px] tabular-nums leading-none"
                          style={{ color: accent }}
                        >
                          {m.value}
                        </div>
                        <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#35355A] mt-2">
                          {m.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* All stack */}
                  <div className="flex flex-wrap gap-2">
                    {study.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-lg text-[#5A5A7A]"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
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
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 bg-[#0A0A12] relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-20 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)",
            filter: "blur(1px)",
          }}
        />
        <div
          className="absolute bottom-0 -right-20 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(110,231,183,0.04) 0%, transparent 65%)",
            filter: "blur(1px)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#A78BFA] mb-5">
            01 / WORK
          </p>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.95] mb-6"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "#EDE9FE" }}
          >
            Six programs.{" "}
            <span
              className="italic font-normal"
              style={{
                background: "linear-gradient(130deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Real numbers
            </span>
            .
          </h2>
          <p className="text-[15px] text-[#55557A] max-w-2xl leading-relaxed">
            End-to-end across{" "}
            <span className="text-[#A78BFA] font-medium">
              scope baseline, governance cadence, EVM tracking, change control
              and executive close-out
            </span>{" "}
            — anonymized by industry, real on the numbers.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="space-y-4">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* ── Philosophy block ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-16"
        >
          <div
            className="rounded-2xl p-px"
            style={{
              background:
                "linear-gradient(135deg, rgba(167,139,250,0.35) 0%, rgba(124,58,237,0.15) 35%, rgba(110,231,183,0.2) 100%)",
            }}
          >
            <div
              className="rounded-[15px] px-8 py-12 md:px-14 md:py-14 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, #0E0E1C 0%, #0A0A14 100%)",
              }}
            >
              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 50% 115%, rgba(124,58,237,0.14) 0%, transparent 65%)",
                }}
              />
              {/* Decorative top-right orb */}
              <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(110,231,183,0.08) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Large open-quote */}
              <div
                className="font-heading font-black leading-none select-none mb-4 relative"
                style={{
                  fontSize: "clamp(80px, 10vw, 110px)",
                  background:
                    "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.18,
                  lineHeight: 0.7,
                }}
              >
                “
              </div>

              <p
                className="font-heading font-light leading-[1.3] tracking-tight text-[#EDE9FE] max-w-3xl mx-auto relative"
                style={{ fontSize: "clamp(19px, 2.5vw, 30px)" }}
              >
                Most PMs{" "}
                <em
                  className="not-italic font-normal"
                  style={{ color: "#A78BFA" }}
                >
                  coordinate
                </em>
                .{" "}
                <strong className="font-bold text-white">
                  I architect delivery
                </strong>
                , protect margin like a P&amp;L owner, and build AI tooling
                that{" "}
                <em
                  className="not-italic font-normal"
                  style={{ color: "#6EE7B7" }}
                >
                  compounds my own throughput
                </em>
                .
              </p>

              <div className="mt-8 flex items-center justify-center gap-3 relative">
                <div
                  className="h-px w-12"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(167,139,250,0.4))",
                  }}
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#35355A]">
                  The Philosophy
                </p>
                <div
                  className="h-px w-12"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(167,139,250,0.4), transparent)",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
