"use client";

import { animate } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Matches the surface-alt token used by Hero.tsx/DeliveryExposure.tsx/
// ToolsBuilt.tsx — the edge fades need the section's own background color
// to blend in.
const NAVY = "var(--color-surface-alt)";
const GAP_PX = 16; // must stay in sync with the track's gap-4 class
const INTERVAL_MS = 2000; // time between card changes
const HOP_MS = INTERVAL_MS - 250; // the timer restarts mid-glide, so shave the glide off
const MOVE_S = 0.55;
const RESUME_MS = 3000;

function DotRow({ count, activeIndex }: { count: number; activeIndex: number }) {
  if (count <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-center gap-1.5" role="presentation">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="h-1.5 rounded-full transition-all motion-safe:transition-all duration-300"
          style={{
            width: i === activeIndex ? 20 : 6,
            background: i === activeIndex ? "var(--color-accent)" : "color-mix(in srgb, var(--color-fg) 25%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Mobile swipe carousel: native CSS scroll-snap, no library. Each slide is a
 * fixed percentage of the track's width so the next card always peeks.
 *
 * With `autoPlay` it becomes a depth carousel: it glides to the next card every
 * couple of seconds, the card in focus is full size while its neighbours
 * recede (scale, blur, tilt), a progress rail shows the timer, and the glow
 * behind the track takes the focused card's accent colour. Everything pauses
 * on touch, hover and focus, while offscreen or hidden, and never runs with
 * reduced motion.
 */
export default function SwipeCarousel({
  children,
  ariaLabel,
  className = "",
  autoPlay = false,
  accents,
}: {
  children: ReactNode[];
  ariaLabel: string;
  className?: string;
  autoPlay?: boolean;
  accents?: string[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafPending = useRef(false);
  const moveAnim = useRef<{ stop: () => void } | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(children.length > 1);
  const [reduce, setReduce] = useState(true); // assume reduced until measured, so SSR/first paint is calm
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false); // touch / hover / focus
  const [userPaused, setUserPaused] = useState(false);
  const count = children.length;
  const alive = autoPlay && !reduce;
  const playing = alive && visible && !held && !userPaused;

  const applyDepth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    slideRefs.current.forEach((s) => {
      if (!s) return;
      const w = s.offsetWidth + GAP_PX;
      const d = (s.offsetLeft + s.offsetWidth / 2 - mid) / w; // 0 = centred
      const a = Math.min(1, Math.abs(d));
      const sign = d === 0 ? 0 : d > 0 ? 1 : -1;
      s.style.transform = `perspective(1000px) translateY(${(-6 * (1 - a)).toFixed(2)}px) scale(${(1 - 0.08 * a).toFixed(3)}) rotateY(${(-sign * 7 * a).toFixed(2)}deg)`;
      s.style.opacity = String(1 - 0.45 * a);
      s.style.filter = a > 0.02 ? `blur(${(1.5 * a).toFixed(2)}px)` : "none";
      s.style.setProperty("--p", d.toFixed(3));
    });
  }, []);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const first = slideRefs.current[0] ?? (el.children[0] as HTMLElement);
    const step = first.offsetWidth + GAP_PX;
    const max = el.scrollWidth - el.clientWidth;
    // the last card can't reach the centre, so map the end of the track to the last index
    const idx = el.scrollLeft >= max - 4 ? count - 1 : Math.round(el.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(count - 1, idx)));
    setShowLeftFade(el.scrollLeft > 8);
    setShowRightFade(el.scrollLeft < max - 8);
    if (alive) applyDepth();
  }, [alive, applyDepth, count]);

  const onScroll = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      update();
    });
  }, [update]);

  useLayoutEffect(() => {
    update();
    window.addEventListener("resize", onScroll);
    return () => window.removeEventListener("resize", onScroll);
  }, [update, onScroll]);

  // reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // clear depth styling when it is not active
  useEffect(() => {
    if (alive) {
      applyDepth();
      return;
    }
    slideRefs.current.forEach((s) => {
      if (!s) return;
      s.style.transform = "";
      s.style.opacity = "";
      s.style.filter = "";
    });
  }, [alive, applyDepth]);

  // on screen? tab visible?
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !autoPlay) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden), { threshold: 0.5 });
    io.observe(root);
    const onVis = () => document.hidden && setVisible(false);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [autoPlay]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      const s = slideRefs.current[i];
      if (!el || !s) return;
      const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, s.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft)));
      moveAnim.current?.stop();
      const from = el.scrollLeft;
      el.style.scrollSnapType = "none"; // our own glide, snap restored after
      moveAnim.current = animate(0, 1, {
        duration: MOVE_S,
        ease: [0.65, 0, 0.2, 1],
        onUpdate: (v) => {
          el.scrollLeft = from + (target - from) * v;
        },
        onComplete: () => {
          el.style.scrollSnapType = "";
        },
      });
    },
    [],
  );

  // the timer: one hop per interval while playing
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => goTo((activeIndex + 1) % count), HOP_MS);
    return () => clearTimeout(id);
  }, [playing, activeIndex, count, goTo]);

  useEffect(
    () => () => {
      moveAnim.current?.stop();
      clearTimeout(resumeTimer.current);
    },
    [],
  );

  const hold = () => {
    clearTimeout(resumeTimer.current);
    moveAnim.current?.stop();
    if (trackRef.current) trackRef.current.style.scrollSnapType = "";
    setHeld(true);
  };
  const release = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setHeld(false), RESUME_MS);
  };

  const accent = accents?.[activeIndex] ?? "var(--color-accent)";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {alive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 rounded-full blur-3xl transition-colors duration-700"
          style={{ background: `color-mix(in srgb, ${accent} 22%, transparent)` }}
        />
      )}
      {!alive && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 transition-opacity duration-200"
            style={{ background: `linear-gradient(to right, ${NAVY}, transparent)`, opacity: showLeftFade ? 1 : 0 }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 transition-opacity duration-200"
            style={{ background: `linear-gradient(to left, ${NAVY}, transparent)`, opacity: showRightFade ? 1 : 0 }}
          />
        </>
      )}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={alive ? hold : undefined}
        onPointerUp={alive ? release : undefined}
        onPointerCancel={alive ? release : undefined}
        onTouchStart={alive ? hold : undefined}
        onTouchEnd={alive ? release : undefined}
        onMouseEnter={alive ? hold : undefined}
        onMouseLeave={alive ? release : undefined}
        onFocus={alive ? hold : undefined}
        onBlur={alive ? release : undefined}
        role="region"
        aria-label={ariaLabel}
        aria-live="off"
        tabIndex={0}
        className="relative flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-6 no-scrollbar -mx-4 px-4 py-3 sm:-mx-6 sm:px-6"
      >
        {children.map((child, i) => (
          <div
            key={i}
            ref={(n) => {
              slideRefs.current[i] = n;
            }}
            data-active={alive ? i === activeIndex : undefined}
            className="group/slide w-[84%] shrink-0 snap-start will-change-transform"
            style={{ transition: "none" } as CSSProperties}
          >
            {child}
          </div>
        ))}
      </div>

      {alive ? (
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Play carousel" : "Pause carousel"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg/70 transition-colors hover:text-accent"
          >
            {userPaused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <div className="flex flex-1 items-center justify-center gap-1.5" role="group" aria-label="Choose a card">
            {Array.from({ length: count }).map((_, i) => {
              const on = i === activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    goTo(i);
                  }}
                  aria-label={`Go to card ${i + 1}`}
                  aria-current={on || undefined}
                  className="group flex h-11 items-center"
                >
                  <span
                    className="relative block h-1.5 overflow-hidden rounded-full transition-all duration-300"
                    style={{ width: on ? 28 : 7, background: "color-mix(in srgb, var(--color-fg) 22%, transparent)" }}
                  >
                    {on && (
                      <span
                        key={`${activeIndex}-${playing}`}
                        className="absolute inset-y-0 left-0 block rounded-full"
                        style={{
                          background: accent,
                          width: playing ? "100%" : "100%",
                          animation: playing ? `carouselFill ${HOP_MS}ms linear forwards` : undefined,
                          transform: playing ? undefined : "scaleX(1)",
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="min-w-[3.75rem] shrink-0 whitespace-nowrap text-right font-heading text-[11px] font-bold tabular-nums text-fg/55" aria-hidden="true">
            <span key={activeIndex} className="inline-block animate-[carouselDigit_.35s_ease-out]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-fg/30"> / {String(count).padStart(2, "0")}</span>
          </p>
        </div>
      ) : (
        <DotRow count={count} activeIndex={activeIndex} />
      )}
    </div>
  );
}
