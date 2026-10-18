"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type AnimationPlaybackControls,
  type MotionStyle,
} from "framer-motion";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

/*
 * A shirt laid over its own content. One progress value `p` (0 → 1) drives
 * everything:
 *   0 → PA   the slider travels down; the shirt height grows from its compact
 *            closed size to the full height of the content, and the two
 *            panels peel apart in a V that starts at the slider.
 *   PA → 1   the opened panels slide outwards so the bottom corners clear too.
 * The content is always in the DOM and the accessibility tree; the shirt is a
 * purely visual layer on top of it.
 */

const PA = 0.78;
const TAN = 0.42; // V opening: horizontal run per px of slider travel
const THETA = (Math.atan(TAN) * 180) / Math.PI;
const EDGE = Math.sqrt(1 + TAN * TAN);
const BOT = 80; // gap between slider rest position and the bottom of the box
const SLIVER = 10; // px of fabric left at each side once fully open
const CLOSED_MOBILE = 480;
const CLOSED_DESKTOP = 560;

const FABRIC = "#2b4068";
const FABRIC_DARK = "#223457";
const WEAVE = [
  "repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px)",
  "repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 1px, transparent 1px 3px)",
  "linear-gradient(180deg, rgba(255,255,255,.09), transparent 28%, rgba(0,0,0,.2))",
];
const SHADE_LEFT =
  "linear-gradient(90deg, rgba(0,0,0,.32) 0%, transparent 12%, transparent 40%, rgba(0,0,0,.24) 50%)";
const SHADE_RIGHT =
  "linear-gradient(90deg, rgba(0,0,0,.24) 50%, transparent 60%, transparent 88%, rgba(0,0,0,.32) 100%)";
const CREASES =
  "linear-gradient(112deg, transparent 18%, rgba(255,255,255,.045) 26%, transparent 34%), linear-gradient(68deg, transparent 52%, rgba(0,0,0,.09) 60%, transparent 68%)";

const METAL = "linear-gradient(90deg, #8e97a6, #e8ecf2 45%, #aab2c0)";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function teeth(side: "left" | "right") {
  // Tape with metal teeth along the inner edge; the right half is offset by
  // half a tooth so a closed zipper looks interlocked.
  const pattern =
    side === "left"
      ? "repeating-linear-gradient(180deg, #d9dee7 0 4px, transparent 4px 8px)"
      : "repeating-linear-gradient(180deg, transparent 0 4px, #d9dee7 4px 8px)";
  return {
    backgroundImage: pattern,
    backgroundSize: "5px 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: side === "left" ? "right top" : "left top",
    backgroundColor: "#18253f",
  } as const;
}

function ShirtButton({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" className={`absolute ${className}`} aria-hidden>
      <circle cx="8" cy="8" r="7" fill="#e9e4d6" stroke="#b9b2a0" strokeWidth="1" />
      <circle cx="8" cy="8" r="4.6" fill="none" stroke="#b9b2a0" strokeWidth=".8" />
      <circle cx="6.4" cy="6.4" r=".9" fill="#6d675a" />
      <circle cx="9.6" cy="6.4" r=".9" fill="#6d675a" />
      <circle cx="6.4" cy="9.6" r=".9" fill="#6d675a" />
      <circle cx="9.6" cy="9.6" r=".9" fill="#6d675a" />
    </svg>
  );
}

function Collar({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  const pts = left ? "0,0 128,0 126,64 64,30" : "0,0 128,0 64,30 2,64";
  const stitch = left ? "8,5 122,5 120,50 66,26" : "6,5 120,5 62,26 8,50";
  return (
    <svg
      viewBox="0 0 128 66"
      width="128"
      height="66"
      className={`absolute top-0 ${left ? "right-1/2" : "left-1/2"}`}
      aria-hidden
    >
      <polygon points={pts} fill={FABRIC_DARK} stroke="rgba(0,0,0,.35)" strokeWidth="1" />
      <polygon
        points={stitch}
        fill="none"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

type PanelProps = {
  side: "left" | "right";
  clip: ReturnType<typeof useTransform<number, string>>;
  tapeTop: ReturnType<typeof useTransform<number, number>>;
  tapeLen: ReturnType<typeof useTransform<number, number>>;
  Y: ReturnType<typeof useMotionValue<number>>;
};

function Panel({ side, clip, tapeTop, tapeLen, Y }: PanelProps) {
  const left = side === "left";
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        translate: left ? `calc(var(--b) * (${SLIVER}px - 50%)) 0` : `calc(var(--b) * (50% - ${SLIVER}px)) 0`,
        willChange: "transform",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: clip,
          backgroundColor: FABRIC,
          backgroundImage: [left ? SHADE_LEFT : SHADE_RIGHT, CREASES, ...WEAVE].join(","),
        }}
      >
        <Collar side={side} />
        <ShirtButton className={left ? "top-[40px] right-[calc(50%+16px)]" : "top-[40px] left-[calc(50%+16px)]"} />

        {/* placket stitching either side of the zip */}
        <div
          className={`absolute top-0 bottom-0 w-px ${left ? "right-[calc(50%+26px)]" : "left-[calc(50%+26px)]"}`}
          style={{ backgroundImage: "repeating-linear-gradient(180deg, rgba(255,255,255,.34) 0 4px, transparent 4px 8px)" }}
        />
        {/* hem */}
        <div
          className="absolute left-0 right-0 bottom-[14px] h-px"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.32) 0 4px, transparent 4px 8px)" }}
        />

        {left ? (
          <div
            className="absolute left-[12%] bottom-[44px] w-[74px] h-[24px] rounded-[2px] flex items-center justify-center font-heading text-[7.5px] font-bold tracking-[0.18em]"
            style={{ background: "#e9e4d6", color: "#4b463a", boxShadow: "0 1px 2px rgba(0,0,0,.4)", outline: "1px dashed rgba(75,70,58,.45)", outlineOffset: "-3px" }}
          >
            SINCE 2020
          </div>
        ) : (
          <svg
            viewBox="0 0 76 90"
            width="76"
            height="90"
            className="absolute top-[132px] right-[10%]"
            aria-hidden
          >
            <path d="M1 1 H75 V70 L38 89 L1 70 Z" fill={FABRIC_DARK} fillOpacity=".55" stroke="rgba(0,0,0,.4)" />
            <path
              d="M6 6 H70 V67 L38 83 L6 67 Z"
              fill="none"
              stroke="rgba(255,255,255,.38)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        )}
        {!left && <ShirtButton className="top-[198px] right-[calc(10%+30px)]" />}
      </motion.div>

      {/* zipper tape, V-shaped above the slider */}
      <motion.div
        className="absolute"
        style={{
          top: tapeTop,
          height: tapeLen,
          width: 11,
          left: left ? "calc(50% - 11px)" : "50%",
          transformOrigin: left ? "100% 100%" : "0 100%",
          rotate: left ? -THETA : THETA,
          boxShadow: left ? "5px 0 9px rgba(0,0,0,.5)" : "-5px 0 9px rgba(0,0,0,.5)",
          ...teeth(side),
        }}
      />
      {/* closed zipper below the slider */}
      <motion.div
        className="absolute"
        style={{
          top: Y,
          bottom: 44,
          width: 8,
          left: left ? "calc(50% - 8px)" : "50%",
          ...teeth(side),
        }}
      />
      <div
        className="absolute bottom-[34px] h-[12px] w-[9px]"
        style={{ left: left ? "calc(50% - 9px)" : "50%", background: METAL, borderRadius: left ? "3px 0 0 3px" : "0 3px 3px 0" }}
      />
    </motion.div>
  );
}

export default function ShirtZipperReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const contentId = `${uid}-experience`;
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const p = useMotionValue(0);
  const closedH = useMotionValue(CLOSED_DESKTOP);
  const fullH = useMotionValue(0);

  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState<boolean | null>(null);
  const [dragging, setDragging] = useState(false);
  const [announce, setAnnounce] = useState("");

  const openRef = useRef(false);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const suppressClick = useRef(false);
  const drag = useRef<{
    id: number;
    startY: number;
    grab: number;
    moved: boolean;
    settling: boolean;
    startedOpen: boolean;
    t: number;
  } | null>(null);

  const b = useTransform(p, (v) => Math.max(0, (v - PA) / (1 - PA)));
  const H = useTransform([p, closedH, fullH], (v: number[]) => {
    const [pv, c, f] = v;
    return c + Math.max(0, f - c) * Math.min(pv / PA, 1);
  });
  const Y = useTransform([p, H], (v: number[]) => Math.min(v[0] / PA, 1) * Math.max(0, v[1] - BOT));

  const clipLeft = useTransform(
    Y,
    (y) => `polygon(0 0, calc(50% - ${(y * TAN).toFixed(1)}px) 0, calc(50% + .5px) ${y.toFixed(1)}px, calc(50% + .5px) 100%, 0 100%)`,
  );
  const clipRight = useTransform(
    Y,
    (y) => `polygon(calc(50% + ${(y * TAN).toFixed(1)}px) 0, 100% 0, 100% 100%, calc(50% - .5px) 100%, calc(50% - .5px) ${y.toFixed(1)}px)`,
  );
  const tapeLen = useTransform(Y, (y) => y * EDGE);
  const tapeTop = useTransform(Y, (y) => y - y * EDGE);

  const labelOpacity = useTransform(p, (v) => (v < 0.05 ? 1 - v / 0.05 : v > 0.95 ? (v - 0.95) / 0.05 : 0));
  const innerShadow = useTransform(p, [0, 0.7], [1, 0.35]);
  const lag = useTransform(useSpring(useVelocity(Y), { stiffness: 180, damping: 30 }), (v) => clamp(-v / 90, -10, 6));

  useEffect(() => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return;
    const measure = () => {
      closedH.set(window.innerWidth < 768 ? CLOSED_MOBILE : CLOSED_DESKTOP);
      fullH.set(content.offsetHeight);
    };
    measure();
    setReady(true);
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ro.observe(content);
    return () => ro.disconnect();
  }, [closedH, fullH]);

  // Reduced motion: no unzipping to do, so show the content straight away.
  useEffect(() => {
    if (reduce) {
      anim.current?.stop();
      p.set(1);
      openRef.current = true;
    }
  }, [reduce, p]);

  useEffect(() => () => anim.current?.stop(), []);

  const goTo = useCallback(
    (next: boolean) => {
      anim.current?.stop();
      openRef.current = next;
      setOpen(next);
      setAnnounce(next ? "Shirt unzipped. Experience shown." : "Shirt zipped up.");
      const to = next ? 1 : 0;
      if (reduce) {
        p.set(to);
        return;
      }
      const dist = Math.abs(to - p.get());
      if (dist < 0.001) return;
      anim.current = animate(p, to, {
        duration: Math.max(0.45, (next ? 1.7 : 1.3) * dist),
        ease: [0.6, 0, 0.3, 1],
      });
    },
    [p, reduce],
  );

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const box = boxRef.current;
    if (!box) return;
    suppressClick.current = false;
    anim.current?.stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = box.getBoundingClientRect();
    drag.current = {
      id: e.pointerId,
      startY: e.clientY,
      grab: e.clientY - rect.top - Y.get(),
      moved: false,
      settling: false,
      startedOpen: openRef.current,
      t: Math.min(p.get() / PA, 1),
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    const box = boxRef.current;
    if (!d || d.id !== e.pointerId || !box) return;
    if (!d.moved) {
      if (Math.abs(e.clientY - d.startY) < 6) return;
      d.moved = true;
      setDragging(true);
      if (p.get() > PA) {
        // pull the panels back in before the slider starts following the finger
        d.settling = true;
        anim.current = animate(p, PA, {
          duration: 0.3,
          ease: "easeOut",
          onComplete: () => {
            if (drag.current) drag.current.settling = false;
          },
        });
      }
    }
    if (d.settling) return;
    const rect = box.getBoundingClientRect();
    const y = Math.max(0, e.clientY - rect.top - d.grab);
    const c = closedH.get();
    const a = Math.max(0, fullH.get() - c);
    const lin = c - BOT;
    const t = clamp(a > 1 ? (-lin + Math.sqrt(lin * lin + 4 * a * y)) / (2 * a) : y / lin, 0, 1);
    d.t = t;
    p.set(t * PA);
  };

  const endDrag = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!d.moved) return; // a tap; onClick handles it
    suppressClick.current = true;
    anim.current?.stop();
    goTo(d.startedOpen ? d.t > 0.8 : d.t > 0.25);
  };

  const onClick = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    goTo(!openRef.current);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      goTo(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      goTo(false);
    }
  };

  const isOpen = open ?? !!reduce;
  const idle = ready && !isOpen && !dragging && !reduce;

  return (
    <div className="relative">
      <noscript>
        <style>{".zipper-box{height:auto!important}.zipper-overlay{display:none!important}"}</style>
      </noscript>

      <motion.div
        ref={boxRef}
        className="zipper-box relative overflow-hidden rounded-2xl h-[480px] md:h-[560px]"
        style={ready ? { height: H } : undefined}
      >
        <div ref={contentRef} id={contentId} className="px-4 sm:px-6 pt-8 pb-24">
          {children}
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ opacity: innerShadow, boxShadow: "inset 0 14px 22px -14px rgba(0,0,0,.45), inset 0 -10px 18px -12px rgba(0,0,0,.3)" }}
        />

        <motion.div
          className="zipper-overlay pointer-events-none absolute inset-0"
          style={{ "--b": b } as MotionStyle}
        >
          <Panel side="left" clip={clipLeft} tapeTop={tapeTop} tapeLen={tapeLen} Y={Y} />
          <Panel side="right" clip={clipRight} tapeTop={tapeTop} tapeLen={tapeLen} Y={Y} />

          <motion.button
            type="button"
            aria-expanded={isOpen}
            aria-controls={contentId}
            aria-label={isOpen ? "Zip the shirt back up and hide the experience" : "Unzip the shirt to reveal the experience"}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClick={onClick}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute left-1/2 -ml-8 h-[96px] w-16 touch-none select-none cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime rounded-lg"
            style={{ top: Y }}
          >
            <span
              className="relative mx-auto block h-9 w-[30px] rounded-t-[7px] rounded-b-[12px]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,.6), transparent 42%, rgba(0,0,0,.28)), var(--color-lime)",
                boxShadow: "0 3px 7px rgba(0,0,0,.5), inset 0 0 0 1px rgba(0,0,0,.18)",
              }}
            >
              <span className="absolute left-1/2 top-[7px] h-[10px] w-[8px] -translate-x-1/2 rounded-full bg-black/25" />
            </span>
            <motion.span
              className="relative -mt-0.5 mx-auto block h-[38px] w-[20px] origin-top"
              animate={idle ? { y: [0, 6, 0] } : { y: 0 }}
              transition={idle ? { duration: 1.7, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" } : { duration: 0.2 }}
            >
              <motion.span
                className="block h-full w-full rounded-b-[10px] rounded-t-[3px]"
                style={{
                  y: lag,
                  background: "linear-gradient(100deg, rgba(255,255,255,.55), transparent 45%, rgba(0,0,0,.3)), var(--color-lime)",
                  boxShadow: "0 4px 8px rgba(0,0,0,.5), inset 0 0 0 1px rgba(0,0,0,.18)",
                }}
              >
                <span className="absolute left-1/2 top-[8px] h-[8px] w-[8px] -translate-x-1/2 rounded-full bg-black/30" />
              </motion.span>
            </motion.span>

            <motion.span
              className="absolute left-[calc(50%+24px)] top-[34px] flex items-center gap-1 whitespace-nowrap rounded-full border border-white/20 bg-ink/85 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-white"
              style={{ opacity: labelOpacity }}
              suppressHydrationWarning
            >
              {isOpen ? "Zip back up" : "Pull to unzip"}
              {isOpen ? <ChevronsUp size={12} className="text-lime" /> : <ChevronsDown size={12} className="text-lime" />}
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      <p role="status" aria-live="polite" className="sr-only">
        {announce}
      </p>
    </div>
  );
}
