"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ComponentType } from "react";

export type MainStep = {
  kind: "step";
  id: string;
  label: string;
  sub: string;
  tone?: "card" | "hero";
  icon?: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  iconColor?: string;
  /** "start"/"end" render as a small connector-cap dot only — no card, no
   *  badge, and (unlike every other MainStep) not counted in the numeral
   *  sequence. */
  marker?: "start" | "end";
};

export type BranchItem = {
  id: string;
  label: string;
  sub: string;
  eyebrow: string;
  icon?: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  iconColor?: string;
};

export type BranchGroup = {
  kind: "branch";
  id: string;
  /** One row for 5 of the 6 diagrams; two rows (e.g. 3-then-2) only for
   *  ProjectSetupDiagram, where a single parent fans out to two visually
   *  distinct rows that both converge into the same next step. */
  rows: BranchItem[][];
};

export type Step = MainStep | BranchGroup;

// A nested-card fill distinct from both the section's navy background and
// the translucent HTML card sitting behind the diagram, so "card" steps
// read as their own layer rather than blending into either.
const CARD_FILL = "#10152b";
const BADGE_BG = "#0d0d0f";

function useReducedMotionSafe() {
  const [motionEnabled, setMotionEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setMotionEnabled(!mq.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);
  return motionEnabled;
}

// The circular badge every main-chain step (trigger, tool-call, agent,
// output, human-review — everything that isn't a parallel branch item)
// shares: a dark circle straddling the card's top border, glowing in
// whatever color that step's icon is tinted. Badge treatment is always
// dark-bg + accent-ring regardless of the card's own tone (hero cards
// still get a plain dark badge above them, matching the reference — only
// the card fill changes between "card" and "hero", never the badge).
function StepBadge({
  Icon,
  color,
  size = 54,
  iconSize = 22,
}: {
  Icon?: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color: string;
  size?: number;
  iconSize?: number;
}) {
  return (
    <div
      className="absolute left-1/2 top-0 z-10 flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background: BADGE_BG,
        border: `2px solid ${color}`,
        boxShadow: `0 0 14px color-mix(in srgb, ${color} 55%, transparent)`,
      }}
    >
      {Icon && <Icon size={iconSize} color={color} strokeWidth={2} />}
    </div>
  );
}

// Breathing pulse-outline — the HTML equivalent of the old SVG stroke-pulse
// rect, same "still running" signal, gated behind reduced-motion + inView
// exactly like the traveling connector dots below.
function PulseOutline({ color, delay, active }: { color: string; delay: number; active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{ border: `2px solid ${color}` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, delay, ease: "easeInOut" }}
    />
  );
}

function MainStepCard({
  step,
  numeral,
  accent,
  heroTextColor,
  delay,
  inView,
  motionOn,
}: {
  step: MainStep;
  numeral: number | null;
  accent: string;
  heroTextColor: string;
  delay: number;
  inView: boolean;
  motionOn: boolean;
}) {
  const tone = step.tone ?? "card";
  const fill = tone === "hero" ? accent : CARD_FILL;
  const textColor = tone === "hero" ? heroTextColor : "#ffffff";
  const badgeColor = step.iconColor ?? accent;

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {step.icon && <StepBadge Icon={step.icon} color={badgeColor} />}
      <div
        className="relative w-full rounded-2xl pt-8 pb-4 px-5 flex items-center gap-3"
        style={{ background: fill, border: tone === "hero" ? "none" : "1px solid rgba(255,255,255,0.14)" }}
      >
        <PulseOutline color={accent} delay={delay + 0.5} active={motionOn} />
        {numeral !== null && (
          <>
            <span className="font-heading text-[18px] font-bold shrink-0" style={{ color: textColor }}>
              {numeral}
            </span>
            <span className="w-px self-stretch shrink-0" style={{ background: `color-mix(in srgb, ${textColor} 20%, transparent)` }} />
          </>
        )}
        <div className="min-w-0">
          <p className="font-heading text-[13px] font-bold leading-snug" style={{ color: textColor }}>
            {step.label}
          </p>
          {step.sub && (
            <p className="text-[10.5px] leading-snug mt-0.5" style={{ color: textColor, opacity: 0.75 }}>
              {step.sub}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function BranchItemCard({
  item,
  accent,
  delay,
  inView,
  motionOn,
}: {
  item: BranchItem;
  accent: string;
  delay: number;
  inView: boolean;
  motionOn: boolean;
}) {
  const badgeColor = item.iconColor ?? accent;
  return (
    <motion.div
      className="relative w-full min-h-[90px]"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {item.icon && <StepBadge Icon={item.icon} color={badgeColor} size={40} iconSize={17} />}
      <div
        className="relative w-full h-full rounded-2xl pt-7 pb-3 px-3 flex flex-col items-center text-center justify-center"
        style={{ background: CARD_FILL, border: "1px solid rgba(255,255,255,0.14)" }}
      >
        <PulseOutline color={accent} delay={delay + 0.5} active={motionOn} />
        <p
          className="font-heading text-[8.5px] font-bold uppercase tracking-[0.12em] mb-1"
          style={{ color: `color-mix(in srgb, ${accent} 80%, white)` }}
        >
          {item.eyebrow}
        </p>
        <p className="font-heading text-[12px] font-bold text-white leading-snug">{item.label}</p>
      </div>
    </motion.div>
  );
}

// Vertical connector between two consecutive full-width steps — a plain
// CSS line, not SVG. There's no elbow to round when both cards are
// already stacked and centered in normal document flow, so SVG adds
// nothing here (the curved connectors are reserved for the fan-out/
// fan-in branch regions below, where the routing genuinely branches).
function Connector({ accent, delay, inView, motionOn, height = 32 }: { accent: string; delay: number; inView: boolean; motionOn: boolean; height?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height }} aria-hidden="true">
      <motion.div
        className="w-px"
        style={{ height: "100%", background: accent, opacity: 0.5 }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.4, delay }}
      />
      <div
        className="absolute bottom-0 left-1/2"
        style={{
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: `6px solid ${accent}`,
        }}
      />
      {motionOn && (
        <motion.span
          className="absolute left-1/2 rounded-full"
          style={{ width: 6, height: 6, background: accent, boxShadow: `0 0 6px ${accent}`, translateX: "-50%" }}
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: delay + 0.6, ease: "linear" }}
        />
      )}
    </div>
  );
}

// Fan-out (or fan-in, mirrored) curved-connector overlay for one row of N
// siblings. Proportional 0-100 viewBox scaled to 100% width via CSS —
// the same technique this file already used before this rewrite — so
// sibling k's anchor sits at exactly ((k+0.5)/N)*100, matching a CSS grid
// of N equal columns without ever measuring real DOM geometry.
function FanConnector({ count, direction, accent, delay, inView }: { count: number; direction: "out" | "in"; accent: string; delay: number; inView: boolean }) {
  const parentX = 50;
  const childXs = Array.from({ length: count }, (_, k) => ((k + 0.5) / count) * 100);
  const paths =
    direction === "out"
      ? childXs.map((x) => `M${parentX},0 Q${parentX},20 ${(parentX + x) / 2},20 Q${x},20 ${x},40`)
      : childXs.map((x) => `M${x},0 Q${x},20 ${(parentX + x) / 2},20 Q${parentX},20 ${parentX},40`);

  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full" style={{ height: 32 }} aria-hidden="true">
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={accent}
          strokeWidth={0.6}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.06 }}
        />
      ))}
    </svg>
  );
}

function BranchGroupBlock({
  group,
  accent,
  delay,
  inView,
  motionOn,
}: {
  group: BranchGroup;
  accent: string;
  delay: number;
  inView: boolean;
  motionOn: boolean;
}) {
  const totalItems = group.rows.reduce((n, row) => n + row.length, 0);

  return (
    <div className="w-full">
      <FanConnector count={group.rows[0].length} direction="out" accent={accent} delay={delay} inView={inView} />
      {group.rows.map((row, ri) => (
        <div key={ri} className={`grid gap-3 ${ri > 0 ? "mt-6" : ""}`} style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
          {row.map((item, ii) => (
            <BranchItemCard
              key={item.id}
              item={item}
              accent={accent}
              delay={delay + 0.1 + (ri * group.rows[0].length + ii) * 0.05}
              inView={inView}
              motionOn={motionOn}
            />
          ))}
        </div>
      ))}
      <FanConnector count={group.rows[group.rows.length - 1].length} direction="in" accent={accent} delay={delay + 0.1 + totalItems * 0.05} inView={inView} />
    </div>
  );
}

export default function FlowDiagram({
  steps,
  ariaLabel,
  accent = "#d7ff3f",
  heroTextColor = "#ffffff",
}: {
  steps: Step[];
  ariaLabel: string;
  /** Drives every badge ring/icon default, connector color, and the fill
   *  of any "hero" step — this is what gives each agent's diagram its
   *  own identity color. */
  accent?: string;
  /** Text color on "hero" steps — pass a dark value when `accent` is a
   *  light fill (e.g. lime). */
  heroTextColor?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionOn = useReducedMotionSafe() && inView;

  // Precomputed, not accumulated via a mutable counter during render — each
  // entry's numeral (null for branches/markers) and stagger index are
  // derived purely from how many numeral-eligible steps preceded it.
  const entries = steps.map((step, i) => {
    const priorNumeralSteps = steps.slice(0, i).filter((s) => s.kind === "step" && !s.marker).length;
    const numeral = step.kind === "step" && !step.marker ? priorNumeralSteps + 1 : null;
    return { step, index: i, numeral, delay: 0.1 + i * 0.12 };
  });

  return (
    <div ref={ref} className="w-full flex flex-col" role="img" aria-label={ariaLabel}>
      {entries.map(({ step, index, numeral, delay }) => {
        const isLast = index === steps.length - 1;

        if (step.kind === "branch") {
          return (
            <div key={step.id}>
              <BranchGroupBlock group={step} accent={accent} delay={delay} inView={inView} motionOn={motionOn} />
              {!isLast && <Connector accent={accent} delay={delay + 0.3} inView={inView} motionOn={motionOn} />}
            </div>
          );
        }

        if (step.marker) {
          return (
            <div key={step.id} className="flex flex-col items-center" aria-hidden="true">
              <motion.div
                className="rounded-full shrink-0"
                style={{ width: 14, height: 14, background: BADGE_BG, border: `2px solid ${accent}` }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3 }}
              />
              {!isLast && <Connector accent={accent} delay={0.05} inView={inView} motionOn={motionOn} height={20} />}
            </div>
          );
        }

        return (
          <div key={step.id}>
            <MainStepCard
              step={step}
              numeral={numeral}
              accent={accent}
              heroTextColor={heroTextColor}
              delay={delay}
              inView={inView}
              motionOn={motionOn}
            />
            {!isLast && <Connector accent={accent} delay={delay + 0.15} inView={inView} motionOn={motionOn} />}
          </div>
        );
      })}
    </div>
  );
}
