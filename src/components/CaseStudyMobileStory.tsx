"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, GitBranch, ChevronLeft, ChevronRight, Wand2 } from "lucide-react";
import type { CaseStudy } from "@/lib/caseStudies";

// ── shared ──────────────────────────────────────────────────────────────────

const SEVERITY_COLOR = { high: "#FF375F", med: "#FF9F0A", low: "#64D2FF" };
const TONE_COLOR = { primary: "var(--color-accent)", ok: "#30D158", ai: "#BF5AF2" };

const SLIDES = [
  { id: "overview",    label: "Overview" },
  { id: "hard",        label: "Hard Part" },
  { id: "journey",     label: "Journey" },
  { id: "calls",       label: "Calls" },
  { id: "impact",      label: "Impact" },
  { id: "beforeafter", label: "B → A" },
] as const;

type SlideId = "overview" | "hard" | "journey" | "agents" | "calls" | "impact" | "beforeafter";

// ── Slide components ─────────────────────────────────────────────────────────

function OverviewSlide({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  return (
    <div className="flex flex-col gap-3 p-5">
      <div>
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
            style={{ color: accentText, background: `${accent}15`, border: `1px solid ${accent}30` }}
          >
            {study.type}
          </span>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{ color: "var(--color-text-secondary)", background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}
          >
            {study.year}
          </span>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1.5" style={{ color: accentText }}>
          {study.domain}
        </p>
        <h3 className="font-heading font-bold text-[17px] leading-[1.25] mb-2" style={{ color: "var(--color-text)" }}>
          {study.headline}
        </h3>
        <p className="text-[12.5px] leading-[1.55]" style={{ color: "var(--color-text-secondary)" }}>
          {study.capability}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {study.scale.slice(0, 4).map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 130, damping: 20 }}
            className="rounded-2xl p-3.5 flex flex-col gap-1.5 overflow-hidden relative"
            style={{
              background: `linear-gradient(145deg, ${accent}24 0%, ${accent}0C 100%)`,
              border: `1px solid ${accent}38`,
              boxShadow: `inset 0 1px 0 ${accent}28, 0 4px 16px ${accent}10`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40)` }}
            />
            <div
              className="font-heading font-black tabular-nums text-[22px] leading-none"
              style={{ color: accent }}
            >
              {s.value}
            </div>
            <div
              className="text-[9.5px] font-semibold uppercase tracking-[0.12em] leading-tight"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HardSlide({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  return (
    <div className="p-5 h-full flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentText }}>
        What was actually hard
      </p>
      <div className="flex flex-col gap-2">
        {study.challenges.slice(0, 4).map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="flex items-start gap-2.5 p-3 rounded-xl"
            style={{ background: "var(--color-bg-secondary)", border: `1px solid ${SEVERITY_COLOR[c.severity]}22` }}
          >
            <AlertTriangle size={12} strokeWidth={2.5} className="shrink-0 mt-0.5" style={{ color: SEVERITY_COLOR[c.severity] }} />
            <p className="text-[12px] leading-[1.45] flex-1" style={{ color: "var(--color-text)" }}>
              {c.label}
            </p>
            <span className="shrink-0 text-[7px] font-bold uppercase tracking-widest mt-0.5" style={{ color: SEVERITY_COLOR[c.severity] }}>
              {c.severity}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function JourneySlide({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  return (
    <div className="p-5 h-full flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentText }}>
        How it moved
      </p>
      <div className="flex flex-col gap-3">
        {study.journey.map((j, i) => (
          <motion.div
            key={j.stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="flex gap-3 items-start"
          >
            <div
              className="shrink-0 flex items-center justify-center font-heading font-black text-[11px] text-white w-8 h-8 rounded-xl"
              style={{ background: `linear-gradient(140deg, ${accent}, ${accent}BB)`, boxShadow: `0 3px 8px ${accent}40` }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: accentText }}>{j.stage}</p>
              <p className="text-[12.5px] font-semibold leading-snug mb-1" style={{ color: "var(--color-text)" }}>{j.title}</p>
              <p className="text-[11px] leading-[1.45] line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>{j.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AgentFleetSlide({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  const agents = study.agents ?? [];
  return (
    <div className="p-5 h-full flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentText }}>
        The agent fleet
      </p>
      <div className="flex flex-col gap-2">
        {agents.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className="rounded-xl p-3 flex items-start gap-2.5"
            style={{ background: `linear-gradient(155deg, ${accent}08, var(--color-bg-secondary))`, border: `1px solid ${accent}20` }}
          >
            <Wand2 size={11} className="shrink-0 mt-0.5" style={{ color: accentText, opacity: 0.7 }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[12px] font-semibold leading-tight" style={{ color: "var(--color-text)" }}>{a.name}</p>
                <span
                  className="shrink-0 text-[7.5px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                  style={{ color: a.status === "live" ? "#248A3D" : "#B25C00", background: a.status === "live" ? "rgba(48,209,88,0.12)" : "rgba(255,159,10,0.12)" }}
                >
                  {a.status}
                </span>
              </div>
              <p className="text-[10.5px] leading-[1.4]" style={{ color: "var(--color-text-secondary)" }}>{a.replaces}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CallsSlide({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  const top = study.decisions.slice(0, 2);
  return (
    <div className="p-5 h-full flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentText }}>
        The calls I made
      </p>
      <div className="flex flex-col gap-3">
        {top.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="rounded-2xl p-4"
            style={{ background: `linear-gradient(155deg, ${accent}08, var(--color-bg-secondary))`, border: `1px solid ${accent}25` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <GitBranch size={12} strokeWidth={2.5} style={{ color: accentText }} />
              <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: accentText }}>
                DECISION · {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-[12.5px] font-semibold leading-[1.4] mb-3" style={{ color: "var(--color-text)" }}>
              {d.decision}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2.5" style={{ borderTop: `1px dashed ${accent}30` }}>
              <div>
                <p className="text-[7.5px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#FF375F" }}>Risk</p>
                <p className="text-[10px] leading-[1.4]" style={{ color: "var(--color-text-secondary)" }}>{d.risk}</p>
              </div>
              <div>
                <p className="text-[7.5px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#30D158" }}>Outcome</p>
                <p className="text-[10px] leading-[1.4]" style={{ color: "var(--color-text-secondary)" }}>{d.outcome}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {study.decisions.length > 2 && (
          <p className="text-[10.5px] text-center" style={{ color: "var(--color-faint)" }}>
            +{study.decisions.length - 2} more decisions
          </p>
        )}
      </div>
    </div>
  );
}

function ImpactSlide({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  return (
    <div className="p-5 h-full flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentText }}>
        What changed
      </p>
      <div className="grid grid-cols-2 gap-2">
        {study.impact.map((m, i) => {
          const c = m.tone ? TONE_COLOR[m.tone] : accentText;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.06 }}
              className="px-3 py-4 rounded-2xl"
              style={{ background: `linear-gradient(155deg, ${accent}10, ${accent}03)`, border: `1px solid ${accent}28` }}
            >
              <div
                className="font-heading font-black tabular-nums text-[17px] leading-none mb-1.5"
                style={{ color: c }}
              >
                {m.value}
              </div>
              <div className="text-[8.5px] font-bold uppercase tracking-wider leading-snug" style={{ color: "var(--color-text-secondary)" }}>
                {m.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function BeforeAfterSlide({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  return (
    <div className="p-5 h-full flex flex-col gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accentText }}>
        Before → After
      </p>
      <div className="rounded-2xl p-3.5" style={{ background: "rgba(255,55,95,0.04)", border: "1px solid rgba(255,55,95,0.2)" }}>
        <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "#C7174A" }}>▣ Before</p>
        <ul className="space-y-1.5">
          {study.beforeAfter.before.slice(0, 3).map((b, i) => (
            <li key={i} className="flex gap-2 text-[11.5px] leading-[1.4]" style={{ color: "var(--color-text-secondary)" }}>
              <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: "#FF375F", opacity: 0.5 }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)`, boxShadow: `0 3px 8px ${accent}40` }}
        >
          <ArrowRight size={13} strokeWidth={2.5} color="white" />
        </div>
      </div>
      <div className="rounded-2xl p-3.5" style={{ background: `${accent}08`, border: `1px solid ${accent}30` }}>
        <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: accentText }}>▣ After</p>
        <ul className="space-y-1.5">
          {study.beforeAfter.after.slice(0, 3).map((a, i) => (
            <li key={i} className="flex gap-2 text-[11.5px] leading-[1.4]" style={{ color: "var(--color-text)" }}>
              <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ background: accent }} />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export default function CaseStudyMobileStory({
  study,
  accent,
  accentText,
}: {
  study: CaseStudy;
  accent: string;
  accentText: string;
}) {
  const [slide, setSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAI = study.variant === "ai-agents";

  // Swap "journey" slide for "agents" on AI variant
  const slides = SLIDES.map((s) =>
    s.id === "journey" && isAI ? { id: "agents" as SlideId, label: "Agents" } : s
  );

  const goTo = (i: number) => {
    const next = Math.max(0, Math.min(i, slides.length - 1));
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
    setSlide(Math.max(0, Math.min(idx, slides.length - 1)));
  }, [slides.length]);

  const p = { study, accent, accentText };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ type: "spring", stiffness: 100, damping: 22 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--color-bg-secondary)", border: `1px solid ${accent}22` }}
    >
      {/* Tab strip */}
      <div
        className="flex overflow-x-auto"
        style={{ borderBottom: "1px solid var(--glass-border)", scrollbarWidth: "none" }}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="shrink-0 px-3.5 py-2.5 text-[9.5px] font-bold uppercase tracking-widest cursor-pointer"
            style={{
              color: slide === i ? accentText : "var(--color-faint)",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: slide === i ? `2px solid ${accent}` : "2px solid transparent",
              transition: "color 0.2s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Slide track */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          alignItems: "flex-start",
        }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            style={{ flex: "0 0 100%", scrollSnapAlign: "start", minWidth: 0 }}
          >
            {s.id === "overview"    && <OverviewSlide    {...p} />}
            {s.id === "hard"        && <HardSlide        {...p} />}
            {s.id === "journey"     && <JourneySlide     {...p} />}
            {s.id === "agents"      && <AgentFleetSlide  {...p} />}
            {s.id === "calls"       && <CallsSlide       {...p} />}
            {s.id === "impact"      && <ImpactSlide      {...p} />}
            {s.id === "beforeafter" && <BeforeAfterSlide {...p} />}
          </div>
        ))}
      </div>

      {/* Nav footer */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: "1px solid var(--glass-border)" }}
      >
        <button
          onClick={() => goTo(slide - 1)}
          disabled={slide === 0}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest cursor-pointer disabled:opacity-30"
          style={{ color: accentText, background: "none", border: "none" }}
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          Prev
        </button>
        <span className="font-mono text-[9px]" style={{ color: "var(--color-faint)" }}>
          {slide + 1} / {slides.length}
        </span>
        <button
          onClick={() => goTo(slide + 1)}
          disabled={slide === slides.length - 1}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest cursor-pointer disabled:opacity-30"
          style={{ color: accentText, background: "none", border: "none" }}
        >
          Next
          <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}
