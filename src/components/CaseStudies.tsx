"use client";

import { AnimatePresence, motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowRight, Building2, Check, UserRound, Users, Wrench } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import CaseDiagram from "./CaseDiagram";
import ScratchSeal, { type FoilPalette } from "./ScratchSeal";
import { getSoundPref, setSoundPref, subscribeSoundPref } from "@/lib/zipSound";
import { caseStudies, type CaseStudy, type OwnerKind } from "@/lib/caseStudies";

/*
 * Case studies as "case files": a tab per case, and the open case shows an
 * opening line, what made it hard, a small diagram, who did what, the steps
 * taken and how it
 * ended. A fixed light section in both themes, like the Stack section.
 */

const INK = "#0d0d1f";
const MUTED = "#5f6477";
const BLUE = "#3d36f5";
const EASE = [0.2, 0.7, 0.2, 1] as const;

// three tones of foil per case, from the case colours
const FOIL: Record<string, FoilPalette> = {
  "platform-build": ["#d9ccff", "#b9a6f2", "#f0c6e6"],
  migration: ["#fbe3b6", "#e9b66a", "#f0c0a0"],
  scope: ["#c9efd2", "#9fcfae", "#c4dfd6"],
  escalation: ["#cfe1ff", "#a7bdf0", "#d6dcee"],
};
const OPENED_KEY = "case-opened";
const subscribeNever = () => () => {};

// accents are tuned for fills; text uses a darker mix so it stays readable
const textOf = (accent: string) => `color-mix(in srgb, ${accent} 72%, ${INK})`;

const OWNER_ICON: Record<OwnerKind, typeof UserRound> = {
  me: UserRound,
  eng: Wrench,
  client: Building2,
  lead: Users,
};

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

function CaseFile({ c, onNext, sealed }: { c: CaseStudy; onNext: () => void; sealed: boolean }) {
  const accentText = textOf(c.accent);
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-10"
      style={{ background: `linear-gradient(160deg, ${c.tint}, #ffffff 62%)` }}
    >
      {/* left: what it was */}
      <div className="min-w-0">
        <motion.p
          variants={rise}
          aria-hidden
          className="font-display text-[54px] leading-none sm:text-[68px]"
          style={{ color: "transparent", WebkitTextStroke: `1.5px color-mix(in srgb, ${c.accent} 55%, transparent)` }}
        >
          {c.number}
        </motion.p>
        <motion.h3
          variants={rise}
          id="case-title"
          tabIndex={-1}
          className="mt-3 font-sans font-extrabold leading-[1.12] tracking-[-0.025em] outline-none"
          style={{ fontSize: "clamp(1.55rem, 5.6vw, 2.2rem)", color: INK }}
        >
          {c.title}
        </motion.h3>
        <motion.ul variants={rise} className="mt-4 flex flex-wrap gap-2">
          {c.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full bg-white px-3 py-1.5 font-sans text-[12.5px] font-semibold"
              style={{ color: accentText, border: `1px solid color-mix(in srgb, ${c.accent} 22%, #ffffff)` }}
            >
              {chip}
            </li>
          ))}
        </motion.ul>
        <motion.p variants={rise} className="mt-5 font-sans text-[16px] leading-relaxed sm:text-[17px]" style={{ color: "#3c3f52" }}>
          {c.opening}
        </motion.p>
        {c.challenge && (
          <motion.div variants={rise} className="mt-4 border-l-2 pl-4" style={{ borderColor: `color-mix(in srgb, ${c.accent} 45%, #ffffff)` }}>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accentText }}>
              What made it hard
            </p>
            <p className="mt-1 font-sans text-[15.5px] leading-relaxed sm:text-[16px]" style={{ color: MUTED }}>
              {c.challenge}
            </p>
          </motion.div>
        )}
        <motion.div
          variants={rise}
          className="mt-6 rounded-2xl bg-white p-4 sm:p-5"
          style={{ border: "1px solid rgba(13,13,31,0.08)", boxShadow: `0 18px 36px -30px ${c.accent}` }}
        >
          <CaseDiagram kind={c.diagram} accent={c.accent} />
        </motion.div>
      </div>

      {/* right: who did what, what I did, how it ended */}
      <div className="min-w-0">
        <motion.p variants={rise} className="font-sans text-[11.5px] font-bold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
          Who did what
        </motion.p>
        <motion.ul variants={stagger} className="mt-3 grid gap-2">
          {c.owners.map((o) => {
            const Icon = OWNER_ICON[o.kind];
            const me = o.kind === "me";
            return (
              <motion.li
                key={o.who}
                variants={rise}
                className="flex items-start gap-3 rounded-2xl px-3.5 py-3"
                style={{
                  background: me ? `color-mix(in srgb, ${c.accent} 9%, #ffffff)` : "rgba(255,255,255,0.7)",
                  border: `1px solid ${me ? `color-mix(in srgb, ${c.accent} 28%, #ffffff)` : "rgba(13,13,31,0.07)"}`,
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: me ? c.accent : "rgba(13,13,31,0.06)", color: me ? "#fff" : INK }}
                >
                  <Icon size={15} strokeWidth={2} />
                </span>
                <div className="min-w-0 pt-1">
                  <p className="font-sans text-[13px] font-bold" style={{ color: me ? accentText : INK }}>
                    {o.who}
                  </p>
                  <p className="mt-0.5 font-sans text-[14px] leading-snug" style={{ color: MUTED }}>
                    {o.items.join(" · ")}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.p variants={rise} className="mt-8 font-sans text-[11.5px] font-bold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
          {c.stepsLabel ?? "What I did"}
        </motion.p>
        <motion.ol variants={stagger} className="relative mt-4 grid gap-5">
          <motion.span
            aria-hidden
            className="absolute bottom-3 left-[15px] top-3 w-px origin-top"
            style={{ background: `color-mix(in srgb, ${c.accent} 30%, transparent)` }}
            variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.8, ease: EASE } } }}
          />
          {c.steps.map((step, i) => (
            <motion.li key={i} variants={rise} className="relative flex gap-4">
              <span
                className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-sans text-[13px] font-bold"
                style={{ border: `2px solid ${c.accent}`, color: accentText }}
              >
                {i + 1}
              </span>
              <p className="pt-1 font-sans text-[15px] leading-relaxed sm:text-[15.5px]" style={{ color: "#2b2b3d" }}>
                {step}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        {c.ending && (
          <motion.div
            variants={rise}
            className="mt-8 flex items-start gap-3 rounded-2xl px-4 py-3.5"
            style={{ background: "#f5ffd9", border: "1px solid #e1f5a3" }}
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: "#d7ff3f", color: INK }}>
              <Check size={15} strokeWidth={2.6} />
            </span>
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "#4d6a00" }}>
                {c.endingLabel ?? "How it ended"}
              </p>
              <p className="mt-1 font-sans text-[15px] font-medium leading-snug" style={{ color: INK }}>
                {c.ending}
              </p>
            </div>
          </motion.div>
        )}

        {c.keep && (
          <motion.p variants={rise} className="mt-5 flex items-baseline gap-3">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: MUTED }}>
              What I&apos;d keep
            </span>
            <span className="font-signature text-[26px] leading-none" style={{ color: accentText }}>
              {c.keep}
            </span>
          </motion.p>
        )}

        {!sealed && (
        <motion.div variants={rise} className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-sans text-[14px] font-semibold transition-colors hover:bg-white"
            style={{ color: accentText }}
          >
            Next case
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [height, setHeight] = useState<number | "auto">("auto");
  const ro = useRef<ResizeObserver | null>(null);
  const c = caseStudies[active];
  const n = caseStudies.length;

  // Scratch seals. `opened` flips the moment a case is opened (so it can grow);
  // `gone` flips when its foil has finished peeling and been removed. Cases
  // opened earlier in this visit come back from sessionStorage already open.
  // read once: cases opened earlier this visit start open, with no foil to peel
  const [saved] = useState<boolean[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const v = JSON.parse(sessionStorage.getItem(OPENED_KEY) ?? "[]");
      return Array.isArray(v) ? (v as boolean[]) : [];
    } catch {
      return [];
    }
  });
  const hintSeen = useSyncExternalStore(
    subscribeNever,
    () => {
      try {
        return sessionStorage.getItem("scratch-hint") === "1";
      } catch {
        return false;
      }
    },
    () => true,
  );
  const ready = useSyncExternalStore(subscribeNever, () => true, () => false);
  const canvasOk = useSyncExternalStore(
    subscribeNever,
    () => !!document.createElement("canvas").getContext?.("2d"),
    () => false,
  );
  const coarse = useSyncExternalStore(subscribeNever, () => window.matchMedia("(pointer: coarse)").matches, () => false);
  const sealedH = useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => Math.round(Math.min(560, Math.max(380, window.innerHeight * 0.62))),
    () => 520,
  );
  const [openedNow, setOpenedNow] = useState<boolean[]>(() => caseStudies.map(() => false));
  const [goneNow, setGoneNow] = useState<boolean[]>(() => caseStudies.map(() => false));
  const [hintDone, setHintDone] = useState(false);
  const opened = caseStudies.map((_, i) => saved[i] === true || openedNow[i]);
  const gone = caseStudies.map((_, i) => saved[i] === true || goneNow[i]);
  const hint = !hintSeen && !hintDone;
  const focusTitle = useRef(false);

  const prefersReduced = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const soundPref = useSyncExternalStore(subscribeSoundPref, getSoundPref, () => null);
  const soundOn = soundPref ? soundPref === "on" : !prefersReduced;

  const foilEnabled = ready && canvasOk && !prefersReduced;
  const sealed = foilEnabled && !opened[active];

  const markOpened = useCallback((idx: number[]) => {
    setOpenedNow((prev) => {
      const next = prev.map((o, i) => o || idx.includes(i));
      try {
        const old: boolean[] = JSON.parse(sessionStorage.getItem(OPENED_KEY) ?? "[]");
        sessionStorage.setItem(OPENED_KEY, JSON.stringify(next.map((o, i) => o || old[i] === true)));
      } catch {}
      return next;
    });
  }, []);

  const onReveal = (viaButton: boolean) => {
    markOpened([active]);
    try {
      sessionStorage.setItem("scratch-hint", "1");
    } catch {}
    setHintDone(true);
    focusTitle.current = viaButton;
  };

  // keyboard users land on the case once it has opened
  const activeOpen = opened[active];
  useEffect(() => {
    if (activeOpen && focusTitle.current) {
      focusTitle.current = false;
      const t = setTimeout(() => document.getElementById("case-title")?.focus({ preventScroll: true }), 600);
      return () => clearTimeout(t);
    }
  }, [activeOpen, active]);

  // the open case decides the card's height; it eases between cases instead of jumping
  const measure = useCallback((el: HTMLDivElement | null) => {
    ro.current?.disconnect();
    if (!el) return;
    const obs = new ResizeObserver(() => setHeight(el.offsetHeight));
    obs.observe(el);
    ro.current = obs;
  }, []);

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select((keys[e.key] + n) % n, true);
  };

  const next = () => {
    select((active + 1) % n);
    const top = tabsRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollTo({ top: window.scrollY + top - 100, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="case-studies"
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "#fefdfd", color: INK, borderTop: "2px solid rgba(13,13,31,0.06)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={stagger}
            className="mb-9 sm:mb-12"
          >
            <motion.p
              variants={rise}
              className="flex items-center gap-4 font-sans text-[12px] font-semibold uppercase tracking-[0.24em] sm:text-[13px]"
              style={{ color: "#6b7083" }}
            >
              <span aria-hidden className="h-[2px] w-9" style={{ background: BLUE }} />
              Case studies
            </motion.p>
            <motion.h2
              variants={rise}
              className="mt-4 font-sans font-extrabold leading-[1.05] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.1rem, 8.5vw, 3.5rem)" }}
            >
              A few <span style={{ color: BLUE }}>programs</span>{" "}I&apos;ve run
            </motion.h2>
            <motion.p variants={rise} className="mt-3 font-sans text-[15px] sm:text-[17px]" style={{ color: MUTED }}>
              From my work at phData, a data and AI consulting firm, where I run client programs. Client names are left out.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* tabs */}
            <div
              ref={tabsRef}
              role="tablist"
              aria-label="Case studies"
              onKeyDown={onTabKey}
              className="grid scroll-mt-28 grid-cols-4 gap-1 rounded-2xl bg-white p-1.5"
              style={{ border: "1px solid rgba(13,13,31,0.08)", boxShadow: "0 12px 30px -26px rgba(40,30,120,.45)" }}
            >
              {caseStudies.map((cs, i) => {
                const on = i === active;
                return (
                  <button
                    key={cs.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`case-tab-${cs.id}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="case-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    className="relative flex min-h-[58px] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-2 text-center font-sans transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-[60px] sm:flex-row sm:gap-2.5 sm:px-4"
                    style={{ color: on ? textOf(cs.accent) : MUTED }}
                  >
                    {on && (
                      <motion.span
                        layoutId="case-tab-indicator"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: cs.tint, border: `1px solid color-mix(in srgb, ${cs.accent} 25%, #ffffff)` }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5 text-[13px] font-bold tabular-nums sm:text-[14px]">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full transition-all"
                        style={
                          foilEnabled && !opened[i]
                            ? { background: "transparent", boxShadow: `inset 0 0 0 1.5px ${cs.accent}` }
                            : { background: cs.accent }
                        }
                      />
                      {cs.number}
                    </span>
                    <span className="relative text-[11.5px] font-semibold leading-tight sm:text-[14px]" style={{ color: on ? INK : MUTED }}>
                      {cs.tab}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* the open case */}
            <motion.div
              id="case-panel"
              role="tabpanel"
              aria-labelledby={`case-tab-${c.id}`}
              className="relative mt-4 overflow-hidden rounded-[1.8rem] bg-white"
              animate={{
                height: sealed ? (typeof height === "number" ? Math.min(height, sealedH) : sealedH) : height,
                borderColor: `color-mix(in srgb, ${c.accent} 22%, #ffffff)`,
              }}
              transition={{ height: { duration: 0.45, ease: EASE }, borderColor: { duration: 0.4 } }}
              style={{ borderWidth: 1, borderStyle: "solid", boxShadow: "0 30px 60px -44px rgba(40,30,120,.45)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={c.id}
                  ref={measure}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <CaseFile c={c} onNext={next} sealed={sealed} />
                </motion.div>
              </AnimatePresence>
              {foilEnabled && !gone[active] && (
                <ScratchSeal
                  key={c.id}
                  caseId={c.id}
                  number={c.number}
                  label={c.tab}
                  palette={FOIL[c.id]}
                  open={opened[active]}
                  onReveal={onReveal}
                  onGone={() => setGoneNow((g) => g.map((x, i) => x || i === active))}
                  soundOn={soundOn}
                  onToggleSound={() => setSoundPref(soundOn ? "off" : "on")}
                  coarse={coarse}
                  hint={hint && active === 0}
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
