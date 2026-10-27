"use client";

import { animate, motion, MotionConfig, useMotionValue, useTransform, type PanInfo, type TargetAndTransition, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/** true on the card at the front of the deck, false behind it, null outside a deck */
export const DeckFrontContext = createContext<boolean | null>(null);

const INTERVAL_MS = 1300; // between deals
const DEAL_S = 0.75;
const RESUME_MS = 3000;
const PEEK = 3; // cards that show behind the front one
const OFFSET_Y = 15;
const OFFSET_PAD = OFFSET_Y * 2 + 6;

// resting pose of a card by its distance from the front
function rest(r: number, n: number) {
  const k = Math.min(r, PEEK);
  return {
    x: 0,
    y: k * OFFSET_Y,
    scale: 1 - k * 0.055,
    rotate: r === 0 ? 0 : r % 2 ? 1.4 : -1.4,
    opacity: r >= PEEK ? 0 : 1,
    zIndex: n - r,
  };
}

/**
 * A deck of cards that deals itself. The front card is dealt away every couple
 * of seconds: a small wind-up, an arc out to the side, then it drops behind the
 * stack while the cards underneath rise one level. Drag or flick the front card
 * to deal it yourself. Everything pauses on touch, hover, focus, off-screen and
 * hidden tabs, and autoplay never runs with reduced motion.
 */
export default function CardDeck({
  children,
  ariaLabel,
  className = "",
  accents,
}: {
  children: ReactNode[];
  ariaLabel: string;
  className?: string;
  accents?: string[];
}) {
  const n = children.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<{ id: number; dir: 1 | -1; key: number } | null>(null);
  const [reduce, setReduce] = useState(true); // calm until measured
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const alive = !reduce;
  const playing = alive && visible && !held && !userPaused;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden), { threshold: 0.5 });
    io.observe(root);
    const onVis = () => document.hidden && setVisible(false);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const goTo = useCallback(
    (i: number, dir: 1 | -1 = 1) => {
      const next = ((i % n) + n) % n;
      if (next === active) return;
      setLeaving((l) => ({ id: active, dir, key: (l?.key ?? 0) + 1 }));
      setActive(next);
    },
    [active, n],
  );

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => goTo(active + 1), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [playing, active, goTo]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const hold = () => {
    clearTimeout(resumeTimer.current);
    setHeld(true);
  };
  const release = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setHeld(false), RESUME_MS);
  };

  // the dealt card's flight: wind-up, arc out, drop behind (starts from wherever it is, so a drag carries on)
  const flight = useMemo(() => {
    if (!leaving) return null;
    const { dir, key } = leaving;
    const end = rest(n - 1, n);
    return {
      key,
      animate: {
        x: [null, dir * -8, dir * 170, end.x],
        y: [null, -8, -34, end.y],
        rotate: [null, dir * -2, dir * 15, end.rotate],
        scale: [null, 1.025, 1.01, end.scale],
        opacity: [1, 1, 1, end.opacity],
        zIndex: [n + 1, n + 1, 0, 0],
      },
      transition: {
        duration: DEAL_S,
        times: [0, 0.18, 0.52, 1],
        ease: [0.45, 0, 0.2, 1] as [number, number, number, number],
        zIndex: { duration: DEAL_S, times: [0, 0.5, 0.56, 1], ease: "linear" as const },
        opacity: { duration: DEAL_S, times: [0, 0.6, 0.6, 1], ease: "linear" as const },
      },
    };
  }, [leaving, n]);

  const accent = accents?.[active] ?? "var(--color-accent)";

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(active + 1, 1);
        if (e.key === "ArrowLeft") goTo(active - 1, -1);
      }}
    >
      <MotionConfig reducedMotion="user">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-4 h-64 rounded-full blur-3xl transition-colors duration-700"
          style={{ background: `color-mix(in srgb, ${accent} 24%, transparent)` }}
        />
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={ariaLabel}
          aria-live="off"
          onPointerEnter={alive ? hold : undefined}
          onPointerLeave={alive ? release : undefined}
          onFocus={alive ? hold : undefined}
          onBlur={alive ? release : undefined}
          className="relative grid"
          style={{ paddingBottom: OFFSET_PAD, perspective: 1200 }}
        >
          {children.map((child, i) => {
            const r = (i - active + n) % n;
            const isLeaving = alive && flight && leaving?.id === i;
            return (
              <DeckSlide
                key={i}
                r={r}
                n={n}
                front={r === 0}
                alive={alive}
                flight={isLeaving ? flight : null}
                onDeal={(dir) => goTo(active + 1, dir)}
                onHold={hold}
                onRelease={release}
                label={`${i + 1} of ${n}`}
              >
                {child}
              </DeckSlide>
            );
          })}
        </div>
      </MotionConfig>

      <div className="mt-1 flex items-center gap-3">
        {alive ? (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play carousel" : "Pause carousel"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg/70 transition-colors hover:text-accent"
          >
            {userPaused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        ) : (
          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              onClick={() => goTo(active - 1, -1)}
              aria-label="Previous card"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-fg/15 text-fg/70 hover:text-accent"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1, 1)}
              aria-label="Next card"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-fg/15 text-fg/70 hover:text-accent"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
        <div className="flex flex-1 items-center justify-center gap-1.5" role="group" aria-label="Choose a card">
          {Array.from({ length: n }).map((_, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i, i > active ? 1 : -1)}
                aria-label={`Go to card ${i + 1}`}
                aria-current={on || undefined}
                className="flex h-11 items-center"
              >
                <span
                  className="relative block h-1.5 overflow-hidden rounded-full transition-all duration-300"
                  style={{ width: on ? 28 : 7, background: "color-mix(in srgb, var(--color-fg) 22%, transparent)" }}
                >
                  {on && (
                    <span
                      key={`${active}-${playing}`}
                      className="absolute inset-y-0 left-0 block w-full rounded-full"
                      style={{
                        background: accent,
                        animation: playing ? `carouselFill ${INTERVAL_MS}ms linear forwards` : undefined,
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <p className="min-w-[3.75rem] shrink-0 whitespace-nowrap text-right font-heading text-[11px] font-bold tabular-nums text-fg/55" aria-hidden="true">
          <span key={active} className="inline-block animate-[carouselDigit_.35s_ease-out]">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="text-fg/30"> / {String(n).padStart(2, "0")}</span>
        </p>
      </div>
    </div>
  );
}

function DeckSlide({
  children,
  r,
  n,
  front,
  alive,
  flight,
  onDeal,
  onHold,
  onRelease,
  label,
}: {
  children: ReactNode;
  r: number;
  n: number;
  front: boolean;
  alive: boolean;
  flight: { key: number; animate: TargetAndTransition; transition: Transition } | null;
  onDeal: (dir: 1 | -1) => void;
  onHold: () => void;
  onRelease: () => void;
  label: string;
}) {
  const x = useMotionValue(0); // drag offset of the front card
  const tilt = useTransform(x, [-180, 0, 180], [-8, 0, 8]);
  const lift = useTransform(x, (v) => -Math.min(14, Math.abs(v) * 0.08));
  const dragged = useRef(false);

  const pose = rest(r, n);
  // cards behind rise on a staggered spring once the front card has cleared
  const spring = { type: "spring" as const, stiffness: 150, damping: 19, mass: 0.9, delay: alive ? 0.07 + r * 0.035 : 0 };
  const target = flight ? flight.animate : pose;
  const transition = flight ? flight.transition : alive ? { ...spring, zIndex: { duration: 0 } } : { duration: 0.2 };

  const settle = () => animate(x, 0, { type: "spring", stiffness: 260, damping: 22 });

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const dir = info.offset.x > 0 ? 1 : -1;
    if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 450) onDeal(dir);
    settle();
    window.setTimeout(() => (dragged.current = false), 80);
  };

  return (
    <motion.div
      initial={false}
      animate={target}
      transition={transition}
      className="relative will-change-transform"
      style={{ gridArea: "1 / 1", transformOrigin: "50% 100%", pointerEvents: front ? "auto" : "none" }}
      inert={front ? undefined : true}
      aria-hidden={front ? undefined : true}
      role="group"
      aria-roledescription="slide"
      aria-label={label}
    >
      {/* the card surface is translucent, so give it a solid base to hide the cards behind */}
      <span aria-hidden="true" className="absolute inset-0 rounded-3xl" style={{ background: "var(--color-surface-alt)" }} />
      <motion.div
        drag={front && alive ? "x" : false}
        dragElastic={0.55}
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => {
          dragged.current = true;
          onHold();
        }}
        onDragEnd={onDragEnd}
        onClickCapture={(e) => {
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onPointerUp={onRelease}
        style={{ x, rotate: tilt, y: lift }}
        className="relative h-full cursor-grab select-none active:cursor-grabbing [&_a]:[-webkit-user-drag:none]"
      >
        <DeckFrontContext.Provider value={front}>{children}</DeckFrontContext.Provider>
      </motion.div>

      {/* shade for the cards behind, so the front one reads as lit */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ opacity: Math.min(0.55, r * 0.22) }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background: "var(--color-surface-alt)" }}
      />
    </motion.div>
  );
}
