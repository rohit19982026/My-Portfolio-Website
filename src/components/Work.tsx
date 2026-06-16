"use client";

import { useState, type Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { caseStudies } from "@/lib/caseStudies";
import MobileCarousel from "./MobileCarousel";
import GlassSurface from "./GlassSurface";
import { useTilt } from "@/hooks/useTilt";

const ACCENT: Record<string, string> = {
  "T&M":         "#0A84FF",
  "FIXED-PRICE": "#30D158",
  "MANAGED":     "#64D2FF",
  "INTERNAL":    "#FF9F0A",
};

const ACCENT_TEXT: Record<string, string> = {
  "T&M":         "#0066CC",
  "FIXED-PRICE": "#248A3D",
  "MANAGED":     "#0A7EA6",
  "INTERNAL":    "#B25C00",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 90, damping: 20, delay: i * 0.07 },
  }),
};

// 3 visual chips per case — instant scope signal for the reader
const CASE_CHIPS: Record<string, { dot: string; text: string }[]> = {
  "redshift-databricks": [
    { dot: "#30D158", text: "~2,300 objects migrated" },
    { dot: "#0A84FF", text: "US + India pod" },
    { dot: "#FF9F0A", text: "Skeptic signed off UAT" },
  ],
  "marketing-data-platform": [
    { dot: "#0A84FF", text: "2+ year retainer" },
    { dot: "#30D158", text: "Renewed twice" },
    { dot: "#FF375F", text: "One stakeholder I never won" },
  ],
  "snowflake-china": [
    { dot: "#64D2FF", text: "3 timezones · 10.5hr gap" },
    { dot: "#FF9F0A", text: "6 weeks · Lunar New Year" },
    { dot: "#BF5AF2", text: "One 15-min miss that cost a week" },
  ],
  "pmo-ai-agent-platform": [
    { dot: "#FF9F0A", text: "6 agents in production" },
    { dot: "#30D158", text: "~8 hrs/week recovered team-wide" },
    { dot: "#BF5AF2", text: "phData Innovation Award" },
  ],
};

// Key single decision per case — replaces the text-heavy decisions list
const CASE_DECISION: Record<string, { chosen: string; alt: string; tradeoff: string }> = {
  "redshift-databricks": {
    chosen: "Moved skeptic's objects to final sprint — their validation first",
    alt: "Dependency-optimal sprint order",
    tradeoff: "Political risk outweighs technical elegance on a fixed-price contract",
  },
  "marketing-data-platform": {
    chosen: "Accepted in year 2 they weren't winnable — routed work around them",
    alt: "Keep investing in the relationship",
    tradeoff: "Structural role conflicts aren't fixed by patience",
  },
  "snowflake-china": {
    chosen: "1:1 with China-site PO before the leadership meeting (week 3)",
    alt: "Announce in the group — what I did in week 2",
    tradeoff: "Any change to working rhythm is a stakeholder conversation first",
  },
  "pmo-ai-agent-platform": {
    chosen: "Build on Glean's existing permissions layer",
    alt: "Custom API integration from scratch",
    tradeoff: "Speed to adoption the team trusts > architectural purity",
  },
};

// Abstract SVG illustrations — visual identity per case
function CaseIllustration({ id, accent, accentText }: { id: string; accent: string; accentText: string }) {

  if (id === "redshift-databricks") {
    return (
      <svg viewBox="0 0 360 72" fill="none" className="w-full" style={{ maxHeight: 72 }}>
        <circle cx="38" cy="36" r="18" fill={`${accent}18`} stroke={`${accent}55`} strokeWidth="1.5" />
        <text x="38" y="40" textAnchor="middle" fontSize="9" fontWeight="700" fill={accentText}>RS</text>
        <motion.path d="M56 36 H138" stroke={`${accent}50`} strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }} />
        <motion.polygon points="158,20 178,36 158,52 138,36"
          fill={`${accent}12`} stroke={accent} strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }} />
        <text x="158" y="40" textAnchor="middle" fontSize="10" fill={accentText}>⚑</text>
        <motion.path d="M178 36 Q220 10 264 36" stroke={accent} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.85, ease: "easeOut" }} />
        <motion.path d="M264 36 H318" stroke={accent} strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }} />
        <motion.circle cx="322" cy="36" r="18" fill={`${accent}30`} stroke={accent} strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }} />
        <text x="322" y="40" textAnchor="middle" fontSize="9" fontWeight="700" fill={accentText}>DB</text>
      </svg>
    );
  }

  if (id === "marketing-data-platform") {
    const ticks = [60, 140, 220, 300];
    const labels = ["Start", "Year 1", "Renewal ×1", "Renewal ×2"];
    return (
      <svg viewBox="0 0 360 72" fill="none" className="w-full" style={{ maxHeight: 72 }}>
        <motion.path d="M40 36 H320" stroke={`${accent}25`} strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.05 }} />
        <motion.path d="M40 36 H320" stroke={accent} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }} />
        {ticks.map((x, i) => (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}>
            <line x1={x} y1="28" x2={x} y2="44" stroke={i >= 2 ? accent : `${accent}50`} strokeWidth={i >= 2 ? 2 : 1.5} />
            {i >= 2 && <path d={`M${x - 7} 22 L${x} 14 L${x + 7} 22`} fill={`${accent}25`} stroke={accent} strokeWidth="1" />}
            <text x={x} y="58" textAnchor="middle" fontSize="8" fill={i >= 2 ? accentText : "var(--color-faint)"}
              fontWeight={i >= 2 ? "700" : "400"}>{labels[i]}</text>
          </motion.g>
        ))}
        <circle cx="40" cy="36" r="5" fill={`${accent}40`} stroke={accent} strokeWidth="1.5" />
        <motion.circle cx="320" cy="36" r="6" fill={accent}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.55 }} />
      </svg>
    );
  }

  if (id === "snowflake-china") {
    const nodes = [
      { x: 68, y: 22, label: "US" },
      { x: 180, y: 54, label: "IND" },
      { x: 292, y: 22, label: "CHN" },
    ];
    const connections: [number, number][] = [[0, 1], [1, 2], [0, 2]];
    return (
      <svg viewBox="0 0 360 72" fill="none" className="w-full" style={{ maxHeight: 72 }}>
        {connections.map(([a, b], i) => (
          <motion.path key={i}
            d={`M${nodes[a].x} ${nodes[a].y} L${nodes[b].x} ${nodes[b].y}`}
            stroke={`${accent}35`} strokeWidth="1"
            strokeDasharray={i === 2 ? "4 3" : undefined}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }} />
        ))}
        <text x="228" y="44" fontSize="8" fontWeight="700" fill={accentText} textAnchor="middle">10.5hr</text>
        {nodes.map((n, i) => (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.2, duration: 0.4 }}>
            <circle cx={n.x} cy={n.y} r="17" fill={`${accent}18`} stroke={`${accent}50`} strokeWidth="1.5" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={accentText}>{n.label}</text>
          </motion.g>
        ))}
      </svg>
    );
  }

  // pmo-ai-agent-platform — radial agent network
  const agentLabels = ["Billing", "Sprint", "Risk", "Briefing", "Budget", "Forecast"];
  const cx = 180, cy = 36, r = 27;
  return (
    <svg viewBox="0 0 360 72" fill="none" className="w-full" style={{ maxHeight: 72 }}>
      {agentLabels.map((label, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}>
            <motion.path d={`M${cx} ${cy} L${x} ${y}`}
              stroke={`${accent}40`} strokeWidth="1"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.1 }} />
            <circle cx={x} cy={y} r="11" fill={`${accent}18`} stroke={`${accent}50`} strokeWidth="1" />
            <text x={x} y={y + 3} textAnchor="middle" fontSize="6.5" fontWeight="600" fill={accentText}>{label}</text>
          </motion.g>
        );
      })}
      <circle cx={cx} cy={cy} r="13" fill={`${accent}30`} stroke={accent} strokeWidth="1.5" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fontWeight="700" fill={accentText}>AI</text>
    </svg>
  );
}

// Visual decision fork — replaces the text-heavy decisions list
function DecisionBranch({ chosen, alt, tradeoff, accent, accentText }: {
  chosen: string; alt: string; tradeoff: string; accent: string; accentText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#C7174A" }}>
        The Call I Made
      </p>
      <div className="flex gap-3 items-start">
        <svg width="22" height="76" viewBox="0 0 22 76" fill="none" className="shrink-0 mt-0.5">
          <line x1="11" y1="0" x2="11" y2="20" stroke={`${accent}60`} strokeWidth="1.5" />
          <circle cx="11" cy="20" r="2.5" fill={accent} />
          <path d="M11 20 Q5 30 3 40" stroke={accent} strokeWidth="1.5" />
          <path d="M11 20 Q17 30 19 40" stroke={`${accent}45`} strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="3" cy="40" r="3.5" fill={accent} />
          <circle cx="19" cy="40" r="3" fill="none" stroke={`${accent}60`} strokeWidth="1" />
        </svg>
        <div className="flex-1 grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl p-3.5" style={{ background: `${accent}09`, border: `1px solid ${accent}28` }}>
            <p className="text-[8px] font-bold uppercase tracking-widest mb-1.5" style={{ color: accentText }}>✓ What I Did</p>
            <p className="text-[12px] leading-[1.55]" style={{ color: "var(--color-text)" }}>{chosen}</p>
          </div>
          <div className="rounded-xl p-3.5" style={{ background: "var(--color-bg-secondary)", border: "1px dashed var(--glass-border)" }}>
            <p className="text-[8px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--color-faint)" }}>↗ Alternative</p>
            <p className="text-[12px] leading-[1.55]" style={{ color: "var(--color-text-secondary)" }}>{alt}</p>
          </div>
        </div>
      </div>
      <p className="text-[11px] mt-2.5 pl-8 italic" style={{ color: "var(--color-faint)" }}>
        → {tradeoff}
      </p>
    </motion.div>
  );
}

function CaseStudyCard({ study, index }: { study: (typeof caseStudies)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT[study.model];
  const accentText = ACCENT_TEXT[study.model];
  const active = open || hovered;
  const tilt = useTilt(1.5);
  const chips = CASE_CHIPS[study.id] ?? [];
  const decision = CASE_DECISION[study.id];

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
      style={!open ? {
        rotateX: tilt.style.rotateX,
        rotateY: tilt.style.rotateY,
        transformPerspective: tilt.style.transformPerspective,
      } : {}}
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
        {/* Top accent bar */}
        <div className="h-[3px] w-full transition-all duration-500"
          style={{
            background: active
              ? `linear-gradient(90deg, transparent 0%, ${accent}80 35%, ${accent}50 65%, transparent 100%)`
              : `linear-gradient(90deg, transparent, ${accent}30, transparent)`,
          }}
        />

        {/* Illustration strip */}
        <motion.div
          className="px-6 pt-5 pb-4"
          style={{ borderBottom: `1px solid var(--glass-border)` }}
          animate={{ opacity: open ? 0.55 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <CaseIllustration id={study.id} accent={accent} accentText={accentText} />
        </motion.div>

        {/* Card body — click to expand */}
        <button onClick={() => setOpen(!open)} className="w-full text-left">
          <div className="px-5 pt-5 pb-5 md:px-7">
            {/* Meta row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
                  style={{ color: accentText, background: `${accent}15`, border: `1px solid ${accent}28` }}>
                  {study.type}
                </span>
                <span className="text-[10px]" style={{ color: "var(--color-faint)" }}>{study.year}</span>
              </div>
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  border: `1.5px solid ${accent}40`,
                  color: accentText,
                  background: open ? `${accent}18` : hovered ? `${accent}0C` : "transparent",
                }}
              >
                <Plus size={16} strokeWidth={2.5} />
              </motion.div>
            </div>

            {/* Title */}
            <h3
              className="font-heading font-bold leading-snug mb-4 transition-colors duration-300"
              style={{
                fontSize: "clamp(15px, 2vw, 20px)",
                color: open ? accentText : "var(--color-text)",
              }}
            >
              {study.title}
            </h3>

            {/* 3 Visual chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {chips.map((chip, i) => (
                <span key={i}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full transition-all duration-300"
                  style={{
                    color: "var(--color-text-secondary)",
                    background: active ? `${accent}08` : "var(--color-bg-secondary)",
                    border: `1px solid ${active ? `${accent}25` : "var(--glass-border)"}`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: chip.dot }} />
                  {chip.text}
                </span>
              ))}
            </div>

            {/* Stack preview */}
            <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: "1px solid var(--glass-border)" }}>
              {study.stack.slice(0, 4).map((s) => (
                <span key={s}
                  className="text-[10px] font-medium px-2.5 py-1 rounded-full transition-all duration-300"
                  style={{
                    color: active ? "var(--color-text-secondary)" : "var(--color-faint)",
                    background: active ? `${accent}0A` : "var(--color-bg-secondary)",
                    border: "1px solid var(--glass-border)",
                  }}
                >{s}</span>
              ))}
              {study.stack.length > 4 && (
                <span className="text-[10px] px-1 py-1" style={{ color: "var(--color-faint)" }}>+{study.stack.length - 4}</span>
              )}
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="overflow-hidden"
            >
              <div className="mx-5 md:mx-7" style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }} />
              <div className="px-5 md:px-7 pt-6 pb-7 space-y-6">

                {/* Metrics grid */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.03 }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: accentText }}>
                    Outcome
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {study.metrics.map((m, i) => (
                      <motion.div key={m.label}
                        initial={{ opacity: 0, scale: 0.88, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.06 + i * 0.06 }}
                        className="px-4 py-3.5 rounded-xl text-center"
                        style={{
                          background: `linear-gradient(145deg, ${accent}0D, ${accent}06)`,
                          border: `1px solid ${accent}22`,
                          minWidth: "76px",
                        }}
                      >
                        <div className="font-heading font-black text-[15px] tabular-nums leading-none mb-1.5" style={{ color: accentText }}>
                          {m.value}
                        </div>
                        <div className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "var(--color-faint)" }}>
                          {m.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Timeline — for cases with timeline spotlight */}
                {study.spotlight === "timeline" && study.timeline && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#0066CC" }}>
                      How It Unfolded
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
                      {study.timeline.map((t, i) => (
                        <motion.div key={t.label}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + i * 0.07 }}
                          className="pl-4 relative"
                          style={{ borderLeft: `2px solid ${accent}40` }}>
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ background: accent }} />
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: accentText }}>{t.label}</p>
                          <p className="text-[12px] leading-[1.6]" style={{ color: "var(--color-text-secondary)" }}>{t.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Decision branch */}
                {decision && (
                  <DecisionBranch {...decision} accent={accent} accentText={accentText} />
                )}

                {/* Learnings — side by side */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#0A7EA6" }}>
                    Looking Back
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
                    <div className="rounded-xl p-4" style={{ background: "rgba(100,210,255,0.06)", border: "1px solid rgba(100,210,255,0.2)" }}>
                      <p className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: "#0A7EA6" }}>What Worked</p>
                      <p className="text-[12px] leading-[1.6]" style={{ color: "var(--color-text-secondary)" }}>{study.learnings.worked}</p>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
                      <p className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--color-faint)" }}>Next Time</p>
                      <p className="text-[12px] leading-[1.6]" style={{ color: "var(--color-text-secondary)" }}>{study.learnings.differently}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Full stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {study.stack.map((s) => (
                    <span key={s} className="text-[11px] font-medium px-3 py-1.5 rounded-full"
                      style={{ color: "var(--color-faint)", background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
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
          <h2
            className="font-heading font-bold tracking-tight leading-[0.95] mb-5"
            style={{ fontSize: "clamp(32px, 5.5vw, 68px)", color: "var(--color-text)" }}
          >
            Four programs.{" "}
            <span className="font-normal" style={{
              background: "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              What actually happened
            </span>.
          </h2>
          <p className="text-[16px] max-w-2xl leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
            Client names anonymized, commercial terms left out. What&apos;s here is the part
            that was mine: the calls I made when something was about to go sideways, alongside
            the everyday work of keeping four very different programs on track.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5"
              style={{ color: "var(--color-accent-dk)", borderRadius: "var(--radius-pill)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent)" }} />
              3 Programs
            </span>
            <span className="glass inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5"
              style={{ color: "var(--color-orange-text)", borderRadius: "var(--radius-pill)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-orange)" }} />
              1 Self-Initiated Build
            </span>
          </div>
        </motion.div>

        {/* Mobile: swipeable carousel */}
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
