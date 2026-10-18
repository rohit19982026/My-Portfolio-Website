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
import { ChevronsDown, ChevronsUp, Volume2, VolumeX } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  getSoundPref,
  primeZipSound,
  setSoundPref,
  subscribeSoundPref,
  zipRest,
  zipThunk,
  zipTick,
} from "@/lib/zipSound";

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
const TOOTH = 20; // px of slider travel per tooth (sound, buzz, shudder)
const SLIVER = 10; // px of fabric left at each side once fully open
const CLOSED_MOBILE = 480;
const CLOSED_DESKTOP = 560;

const FABRIC = "var(--color-shirt)";
const FABRIC_DARK = "var(--color-shirt-deep)";
const WEAVE = [
  "repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px)",
  "repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 1px, transparent 1px 3px)",
  "linear-gradient(180deg, rgba(255,255,255,.1), transparent 28%, rgba(0,0,0,.12))",
];
const SHADE_LEFT =
  "linear-gradient(90deg, rgba(0,0,0,.2) 0%, transparent 12%, transparent 40%, rgba(0,0,0,.15) 50%)";
const SHADE_RIGHT =
  "linear-gradient(90deg, rgba(0,0,0,.15) 50%, transparent 60%, transparent 88%, rgba(0,0,0,.2) 100%)";
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
    backgroundColor: "var(--color-shirt-deep)",
  } as const;
}

function ShirtButton({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" className={`absolute ${className}`} aria-hidden>
      <circle cx="8" cy="8" r="7" fill="var(--color-paper)" stroke="#b9b2a0" strokeWidth="1" />
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
  turn: ReturnType<typeof useTransform<number, number>>;
  jx: ReturnType<typeof useTransform<number, number>>;
  jy: ReturnType<typeof useTransform<number, number>>;
};

function Panel({ side, clip, tapeTop, tapeLen, Y, turn, jx, jy }: PanelProps) {
  const left = side === "left";
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: jx,
        y: jy,
        translate: left ? `calc(var(--b) * (${SLIVER}px - 50%)) 0` : `calc(var(--b) * (50% - ${SLIVER}px)) 0`,
        rotate: left ? "y calc(var(--b) * -17deg)" : "y calc(var(--b) * 17deg)",
        transformOrigin: left ? "0% 50%" : "100% 50%",
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
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, transparent 28%, rgba(255,255,255,.1) 40%, transparent 52%)" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ opacity: turn, background: left ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.24)" }}
        />
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
            style={{ background: "var(--color-paper)", color: "#4b463a", boxShadow: "0 1px 2px rgba(0,0,0,.4)", outline: "1px dashed rgba(75,70,58,.45)", outlineOffset: "-3px" }}
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

      {/* fabric puckering and shadow beside the tape */}
      <motion.div
        className="absolute"
        style={{
          top: tapeTop,
          height: tapeLen,
          width: 40,
          left: left ? "calc(50% - 40px)" : "50%",
          transformOrigin: left ? "100% 100%" : "0 100%",
          rotate: left ? -THETA : THETA,
          background: `linear-gradient(${left ? 90 : 270}deg, transparent, rgba(0,0,0,.26))`,
        }}
      />
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
          boxShadow: left
            ? "6px 0 10px rgba(0,0,0,.45), 16px 0 30px rgba(0,0,0,.28), inset 1px 0 0 rgba(255,255,255,.35)"
            : "-6px 0 10px rgba(0,0,0,.45), -16px 0 30px rgba(0,0,0,.28), inset -1px 0 0 rgba(255,255,255,.35)",
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

  const soundPref = useSyncExternalStore(subscribeSoundPref, getSoundPref, () => null);
  // hydration-safe copy of `reduce` (server renders as false)
  const reduceSafe = useSyncExternalStore(
    () => () => {},
    () => !!reduce,
    () => false,
  );
  const soundOn = soundPref ? soundPref === "on" : !reduceSafe;
  const soundRef = useRef(soundOn);
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
  const turnL = useTransform(b, (v) => v * 0.9);
  const turnR = useTransform(b, (v) => v * 0.9);
  const settle = useTransform(p, [0, PA], [0.985, 1]);
  const rise = useTransform(p, [0, PA], [10, 0]);
  const tapeLen = useTransform(Y, (y) => y * EDGE);
  const tapeTop = useTransform(Y, (y) => y - y * EDGE);

  const labelOpacity = useTransform(p, (v) => (v < 0.05 ? 1 - v / 0.05 : v > 0.95 ? (v - 0.95) / 0.05 : 0));
  const innerShadow = useTransform(p, [0, 0.7], [1, 0.35]);
  const velocity = useSpring(useVelocity(Y), { stiffness: 180, damping: 30 });
  const lag = useTransform(velocity, (v) => clamp(-v / 90, -10, 6));
  // one small shudder per tooth, decaying between teeth
  const kx = useMotionValue(0);
  const ky = useMotionValue(0);
  const jx = useTransform(kx, (v) => v * 1.4);
  const jy = useTransform(ky, (v) => v * 1.0);
  const wobble = useTransform(kx, (v) => v * 2.4);
  const tilt = useTransform(kx, (v) => v * 2.2);

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

  useEffect(() => {
    soundRef.current = soundOn;
    if (!soundOn) zipRest();
  }, [soundOn]);

  // Sound and haptics follow the slider itself, so drag, click and keyboard
  // all feel the same: one tooth tick per ~10px, a buzz every ~14px.
  useEffect(() => {
    if (reduce) return;
    let last = Y.get();
    let lastT = performance.now();
    let acc = 0;
    let sign = 1;
    let kickAnim: AnimationPlaybackControls[] = [];
    let lastHap = 0;
    let atEnd = false;
    let rest: ReturnType<typeof setTimeout> | undefined;
    const buzz = (ms: number) => {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms);
    };
    const unsub = Y.on("change", (y) => {
      const now = performance.now();
      const dy = y - last;
      const dist = Math.abs(dy);
      const speed = (dist / Math.max(1, now - lastT)) * 1000;
      last = y;
      lastT = now;

      const end = y >= Math.max(0, H.get() - BOT) - 0.5 || y <= 0.5;
      if (end && !atEnd && dist > 0) {
        atEnd = true;
        if (soundRef.current) zipThunk();
        buzz(24);
      } else if (!end) {
        atEnd = false;
      }

      acc += dist;
      let ticks = 0;
      while (acc >= TOOTH) {
        acc -= TOOTH;
        ticks++;
      }
      if (ticks > 0) {
        sign = -sign;
        kx.set(sign);
        ky.set(-sign * 0.7);
        kickAnim.forEach((a) => a.stop());
        kickAnim = [animate(kx, 0, { duration: 0.09, ease: "easeOut" }), animate(ky, 0, { duration: 0.09, ease: "easeOut" })];
        if (now - lastHap > 40) {
          lastHap = now;
          buzz(12);
        }
        if (soundRef.current) {
          for (let i = 0; i < Math.min(ticks, 3); i++) zipTick(speed, dy > 0 ? 1 : -1);
        }
      }
      if (soundRef.current) {
        clearTimeout(rest);
        rest = setTimeout(zipRest, 120);
      }
    });
    return () => {
      unsub();
      kickAnim.forEach((a) => a.stop());
      clearTimeout(rest);
      zipRest();
    };
  }, [Y, H, kx, ky, reduce]);

  useEffect(() => () => anim.current?.stop(), []);

  const goTo = useCallback(
    (next: boolean) => {
      anim.current?.stop();
      primeZipSound();
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
      // the slider covers its travel in PA of the run; aim for ~300px/s so each tooth lands on its own
      const secs = clamp((fullH.get() - BOT) / (300 * PA), 2.2, 5.5);
      anim.current = animate(p, to, {
        duration: Math.max(0.5, (next ? secs : secs * 0.75) * dist),
        ease: [0.4, 0, 0.6, 1],
      });
    },
    [p, fullH, reduce],
  );

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const box = boxRef.current;
    if (!box) return;
    suppressClick.current = false;
    primeZipSound();
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
        <motion.div
          ref={contentRef}
          id={contentId}
          className="px-4 sm:px-6 pt-8 pb-24"
          style={{ scale: settle, y: rise, transformOrigin: "50% 0%" }}
        >
          {children}
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ opacity: innerShadow, boxShadow: "inset 0 14px 22px -14px rgba(0,0,0,.45), inset 0 -10px 18px -12px rgba(0,0,0,.3)" }}
        />

        <motion.div
          className="zipper-overlay pointer-events-none absolute inset-0"
          style={{ "--b": b, perspective: 1400 } as MotionStyle}
        >
          <Panel side="left" clip={clipLeft} tapeTop={tapeTop} tapeLen={tapeLen} Y={Y} turn={turnL} jx={jx} jy={jy} />
          <Panel side="right" clip={clipRight} tapeTop={tapeTop} tapeLen={tapeLen} Y={Y} turn={turnR} jx={jx} jy={jy} />

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
            style={{ top: Y, x: wobble, rotate: tilt }}
          >
            <span
              className="relative mx-auto block h-9 w-[30px] rounded-t-[7px] rounded-b-[12px]"
              style={{
                background: "radial-gradient(ellipse at 28% 18%, rgba(255,255,255,.85), transparent 45%), linear-gradient(135deg, rgba(255,255,255,.4), transparent 42%, rgba(0,0,0,.35)), var(--color-lime)",
                boxShadow: "0 5px 10px rgba(0,0,0,.55), 0 14px 18px -6px rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,0,0,.2), inset 0 -3px 5px rgba(0,0,0,.2)",
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

          <button
            type="button"
            aria-pressed={soundOn}
            aria-label="Zip sound"
            title={soundOn ? "Zip sound on" : "Zip sound off"}
            onClick={() => {
              primeZipSound();
              setSoundPref(soundOn ? "off" : "on");
            }}
            className="pointer-events-auto absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-ink/70 text-white transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </motion.div>
      </motion.div>

      <p role="status" aria-live="polite" className="sr-only">
        {announce}
      </p>
    </div>
  );
}
