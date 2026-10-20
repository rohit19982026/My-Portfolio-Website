"use client";

import {
  animate,
  useInView,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type AnimationPlaybackControls,
  type MotionValue,
  type MotionStyle,
} from "framer-motion";
import Image from "next/image";
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
  installAudioUnlock,
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
const TAN = 0.52; // V opening: horizontal run per px of slider travel
const THETA = (Math.atan(TAN) * 180) / Math.PI;
const EDGE = Math.sqrt(1 + TAN * TAN);
const L1 = 64; // px of the V's narrow throat just behind the pull
const T1 = 0.16; // the throat's slope: the two rows are still closing up here
const THETA1 = (Math.atan(T1) * 180) / Math.PI;
const EDGE1 = Math.sqrt(1 + T1 * T1);
const BOT = 150; // gap between slider rest position and the bottom of the box (pull is ~126px tall)
const TOOTH = 20; // px of slider travel per tooth (sound, buzz, shudder)
const SLIVER = 0;
const SCOOP = 110; // px depth of the hem's scoop once fully open // px of fabric left at each side once fully open
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// A hand-pulled zip is never a smooth ramp: a tug, a little slack, then pulls
// with short stalls, and the end stop. These curves (time, progress) are joined
// with a cardinal spline so the motion stays smooth but irregular.
function curve(points: [number, number][]) {
  const n = points.length;
  const m = points.map((pt, i) => {
    if (i === 0 || i === n - 1) return 0;
    return ((points[i + 1][1] - points[i - 1][1]) / (points[i + 1][0] - points[i - 1][0])) * 0.85;
  });
  return (t: number) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let i = 0;
    while (i < n - 2 && t > points[i + 1][0]) i++;
    const [t0, p0] = points[i];
    const [t1, p1] = points[i + 1];
    const h = t1 - t0;
    const u = (t - t0) / h;
    const u2 = u * u;
    const u3 = u2 * u;
    const v = (2 * u3 - 3 * u2 + 1) * p0 + (u3 - 2 * u2 + u) * h * m[i] + (-2 * u3 + 3 * u2) * p1 + (u3 - u2) * h * m[i + 1];
    return clamp(v, 0, 1);
  };
}
const OPEN_EASE = curve([
  [0, 0], [0.05, 0.018], [0.09, 0.01], [0.2, 0.13], [0.25, 0.14], [0.4, 0.33], [0.45, 0.345],
  [0.58, 0.55], [0.63, 0.565], [0.74, 0.76], [0.78, 0.78], [0.86, 0.87], [0.93, 0.975], [1, 1],
]);
const CLOSE_EASE = curve([
  [0, 0], [0.14, 0.22], [0.2, 0.28], [0.35, 0.4], [0.4, 0.42], [0.58, 0.62], [0.64, 0.64],
  [0.8, 0.86], [0.86, 0.9], [0.95, 0.985], [1, 1],
]);

// Closed shirt height: grows with the screen width, capped by the screen
// height (so a landscape phone never gets a shirt taller than itself). The
// same formula is repeated as CSS on the box so the first paint matches.
const closedHeight = (width: number, height: number) =>
  Math.round(Math.min(clamp(width * 1.18, 380, 560), Math.max(320, height * 0.78)));
const CLOSED_CSS = "h-[min(clamp(380px,118vw,560px),max(320px,78svh))]";

// Everything below is cut from the supplied design (public/shirt/): fabric
// tile, zipper strips, the pull, the patch and the pocket.
const FABRIC_IMG = "url(/shirt/fabric.jpg)";
const ZIP_EDGE = "url(/shirt/zip-edge.svg)";
const ZIP_CLOSED = "url(/shirt/zip-closed.svg)";
const EDGE_W = 44; // px, width of the open-zip strip
const EDGE_FADE = "linear-gradient(to right, #000 0, #000 62%, transparent 100%)";
const PATCH_MASK =
  "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%)";

type PanelProps = {
  side: "left" | "right";
  clip: ReturnType<typeof useTransform<number, string>>;
  Y: ReturnType<typeof useMotionValue<number>>;
  turn: ReturnType<typeof useTransform<number, number>>;
  jx: ReturnType<typeof useTransform<number, number>>;
  jy: ReturnType<typeof useTransform<number, number>>;
  sweep: ReturnType<typeof useTransform<number, string>>;
  hardware: MotionValue<number>;
};

// One straight run of the V edge: stitching, the fabric bulge, and the zipper
// teeth, all anchored at the run's lower end and rotated up along it.
function Segment({
  side,
  anchorX,
  anchorY,
  len,
  angle,
}: {
  side: "left" | "right";
  anchorX: MotionValue<number>;
  anchorY: MotionValue<number>;
  len: MotionValue<number>;
  angle: number;
}) {
  const left = side === "left";
  const top = useTransform([anchorY, len], (v: number[]) => v[0] - v[1]);
  const xStitch = useTransform(anchorX, (v) => (left ? `calc(50% - ${v + 30}px)` : `calc(50% + ${v + 28.5}px)`));
  const xPucker = useTransform(anchorX, (v) => (left ? `calc(50% - ${v + 46}px)` : `calc(50% + ${v}px)`));
  const xTeeth = useTransform(anchorX, (v) => (left ? `calc(50% - ${v}px)` : `calc(50% - ${v + EDGE_W}px)`));
  const rot = left ? -angle : angle;
  return (
    <>
      <motion.div
        className="absolute"
        style={{
          top,
          height: len,
          width: 1.5,
          left: xStitch,
          transformOrigin: left ? "100% 100%" : "0 100%",
          rotate: rot,
          backgroundImage: "repeating-linear-gradient(180deg, rgba(235,238,255,.85) 0 6px, transparent 6px 11px)",
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top,
          height: len,
          width: 46,
          left: xPucker,
          transformOrigin: left ? "100% 100%" : "0 100%",
          rotate: rot,
          background: `linear-gradient(${left ? 90 : 270}deg, transparent, rgba(0,0,30,.42))`,
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top,
          height: len,
          width: EDGE_W,
          left: xTeeth,
          transformOrigin: left ? "0 100%" : "100% 100%",
          rotate: rot,
          filter: "drop-shadow(0 5px 6px rgba(10,10,60,.4))",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: ZIP_EDGE,
            backgroundSize: `${EDGE_W}px ${EDGE_W * (40 / 48)}px`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "0 100%",
            transform: left ? undefined : "scaleX(-1)",
            WebkitMaskImage: EDGE_FADE,
            maskImage: EDGE_FADE,
          }}
        />
      </motion.div>
    </>
  );
}

function Panel({ side, clip, Y, turn, jx, jy, sweep, hardware }: PanelProps) {
  const left = side === "left";
  const zero = useMotionValue(0);
  const lenA = useTransform(Y, (y) => Math.min(y, L1) * EDGE1);
  const lenB = useTransform(Y, (y) => Math.max(0, y - L1) * EDGE);
  const jointOff = useTransform(Y, (y) => Math.min(y, L1) * T1);
  const jointY = useTransform(Y, (y) => Math.max(0, y - L1));
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: jx,
        y: jy,
        willChange: "transform",
        filter: "drop-shadow(0 8px 10px rgba(0,0,40,.4))",
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: clip,
          backgroundColor: "#0d22ee",
          backgroundImage: [
            left
              ? "linear-gradient(90deg, rgba(0,0,0,.28) 0%, transparent 14%, transparent 38%, rgba(0,0,20,.45) 50%)"
              : "linear-gradient(90deg, rgba(0,0,20,.45) 50%, transparent 62%, transparent 86%, rgba(0,0,0,.28) 100%)",
            "linear-gradient(180deg, rgba(255,255,255,.1), transparent 22%, rgba(0,0,20,.22))",
            FABRIC_IMG,
          ].join(","),
          backgroundSize: "auto, auto, 168px 600px",
        }}
      >
        {/* light that sweeps across the cloth as the pull travels */}
        <motion.div
          className="absolute inset-y-0 -inset-x-1/2"
          style={{
            x: sweep,
            background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,.16) 50%, transparent 62%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ opacity: turn, background: left ? "rgba(255,255,255,.12)" : "rgba(0,0,30,.28)" }}
        />
        {left ? (
          <Image
            src="/shirt/patch-raw.png"
            alt=""
            width={500}
            height={420}
            className="pointer-events-none absolute select-none"
            style={{ left: "-1%", bottom: "6%", width: "clamp(100px, 25%, 250px)", height: "auto", WebkitMaskImage: PATCH_MASK, maskImage: PATCH_MASK, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
          />
        ) : (
          <Image
            src="/shirt/pocket-raw.png"
            alt=""
            width={350}
            height={480}
            className="pointer-events-none absolute select-none"
            style={{ right: 0, bottom: "8%", width: "clamp(78px, 17.5%, 175px)", height: "auto", WebkitMaskImage: PATCH_MASK, maskImage: PATCH_MASK, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
          />
        )}
      </motion.div>

      <motion.div className="absolute inset-0" style={{ opacity: hardware }}>
      {/* the two straight runs of the V edge (see `edge` in the parent) */}
      <Segment side={side} anchorX={zero} anchorY={Y} len={lenA} angle={THETA1} />
      <Segment side={side} anchorX={jointOff} anchorY={jointY} len={lenB} angle={THETA} />
      </motion.div>
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
  const closedH = useMotionValue(560);
  const fullH = useMotionValue(0);

  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState<boolean | null>(null);
  const [dragging, setDragging] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [needTap, setNeedTap] = useState(false);

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
  const touched = useRef(false);
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

  // The V has a narrow throat right behind the pull (the rows are still
  // closing up there) and then opens at the main angle.
  const edge = (y: number) => ({
    top: y <= L1 ? y * T1 : L1 * T1 + (y - L1) * TAN,
    jy: Math.max(0, y - L1),
    jo: Math.min(y, L1) * T1,
  });
  // Phase B: the V eases into a "scoop": plain bands at the screen edges that
  // curve in at the bottom and meet under the pull, so the opened shirt keeps a
  // hem with the zip attached to it. Samples run from the top of the V (g = 1)
  // to the apex (g = 0); at b = 0 they sit exactly on the V, at b = 1 on the scoop.
  const scoopPoints = (y: number, bb: number, sign: 1 | -1) => {
    const gk = y > 0 ? Math.min(1, L1 / y) : 1;
    const gs = [1, 1 - (1 - gk) * 0.33, 1 - (1 - gk) * 0.66, gk, gk * 0.55, 0];
    const k = 1 - bb;
    const sc = Math.min(SCOOP, y);
    const pts = gs.map((g) => {
      const d = g * y;
      const offV = d <= L1 ? d * T1 : L1 * T1 + (d - L1) * TAN;
      const yy = (y - d) * k + (y - sc * g) * bb;
      const share = (bb * (2 * g - g * g)).toFixed(4);
      const x = `calc(50% ${sign > 0 ? "+" : "-"} ${(offV * k).toFixed(1)}px ${sign > 0 ? "+" : "-"} ${share} * (50% - ${SLIVER}px))`;
      return { x, y: `${yy.toFixed(1)}px` };
    });
    const e = edge(y);
    const topX = `calc(50% ${sign > 0 ? "+" : "-"} ${(e.top * k).toFixed(1)}px ${sign > 0 ? "+" : "-"} ${bb.toFixed(4)} * (50% - ${SLIVER}px))`;
    return { pts, topX };
  };
  const clipLeft = useTransform([Y, b], (v: number[]) => {
    const { pts, topX } = scoopPoints(v[0], v[1], -1);
    return `polygon(0 0, ${topX} 0, ${pts.map((q) => `${q.x} ${q.y}`).join(", ")}, 50% 100%, 0 100%)`;
  });
  const clipRight = useTransform([Y, b], (v: number[]) => {
    const { pts, topX } = scoopPoints(v[0], v[1], 1);
    return `polygon(${topX} 0, 100% 0, 100% 100%, 50% 100%, ${[...pts].reverse().map((q) => `${q.x} ${q.y}`).join(", ")})`;
  });
  const hardware = useTransform(b, (v) => Math.max(0, 1 - v * 2.2)); // zip pieces fade as the halves part
  const sweep = useTransform(p, [0, 1], ["-35%", "35%"]);
  const turnL = useTransform(b, (v) => v * 0.9);
  const turnR = useTransform(b, (v) => v * 0.9);
  const settle = useTransform(p, [0, PA], [0.985, 1]);
  const rise = useTransform(p, [0, PA], [10, 0]);

  const labelOpacity = useTransform(p, (v) => (v < 0.05 ? 1 - v / 0.05 : v > 0.95 ? (v - 0.95) / 0.05 : 0));
  const innerShadow = useTransform(p, [0, 0.7], [1, 0.35]);
  const velocity = useSpring(useVelocity(Y), { stiffness: 180, damping: 30 });
  const swing = useSpring(useTransform(velocity, (v) => clamp(-v / 70, -14, 14)), { stiffness: 140, damping: 7 });
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
    // Screen height is only re-read when the width changes (rotation, resize),
    // so the mobile URL bar collapsing never nudges the shirt mid-scroll.
    let lastW = -1;
    let vh = window.innerHeight;
    const measure = () => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        vh = window.innerHeight;
      }
      closedH.set(closedHeight(lastW, vh));
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

  useEffect(() => installAudioUnlock(), []);

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
      const secs = clamp((fullH.get() - BOT) / (300 * PA), 3.2, 5.5);
      anim.current = animate(p, to, {
        duration: Math.max(0.6, (next ? secs : secs * 0.75) * dist),
        ease: next ? OPEN_EASE : CLOSE_EASE,
      });
    },
    [p, fullH, reduce],
  );

  // The shirt unzips by itself the first time it scrolls into view (the
  // visitor can still grab the pull at any point, or close it again).
  const seen = useInView(boxRef, { once: true, amount: 0.35 });
  useEffect(() => {
    if (!seen || reduce || !ready) return;
    const id = setTimeout(() => {
      // Browsers keep sound and vibration off until the visitor has tapped the
      // page once; scrolling alone doesn't count. Say so, so it isn't a mystery.
      const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
      if (ua && !ua.hasBeenActive && soundRef.current) {
        setNeedTap(true);
        const clear = () => setNeedTap(false);
        window.addEventListener("pointerdown", clear, { once: true, capture: true });
        window.addEventListener("keydown", clear, { once: true, capture: true });
        setTimeout(clear, 7000);
      }
      if (!touched.current && !openRef.current) goTo(true);
    }, 450);
    return () => clearTimeout(id);
  }, [seen, reduce, ready, goTo]);

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    touched.current = true;
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
    touched.current = true;
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
        className={`zipper-box relative overflow-hidden rounded-2xl ${CLOSED_CSS}`}
        style={{
          ...(ready ? { height: H } : {}),
          background:
            "radial-gradient(70% 38% at 85% 2%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%), radial-gradient(60% 30% at 15% 40%, color-mix(in srgb, #ffb020 8%, transparent), transparent 70%), #fcfbf9",
        }}
      >
        <motion.div
          ref={contentRef}
          id={contentId}
          className="px-3 pt-8 pb-72 sm:px-8"
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
          <Panel side="left" clip={clipLeft} Y={Y} turn={turnL} jx={jx} jy={jy} sweep={sweep} hardware={hardware} />
          <Panel side="right" clip={clipRight} Y={Y} turn={turnR} jx={jx} jy={jy} sweep={sweep} hardware={hardware} />

          {needTap && (
            <div
              role="status"
              className="pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/25 bg-ink/85 px-3.5 py-2 font-heading text-[10.5px] font-bold uppercase tracking-wider text-white"
            >
              Tap anywhere for zip sound
            </div>
          )}

          {/* closed chain below the pull, ending in a metal stop */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              top: Y,
              bottom: 12,
              width: 30,
              left: "calc(50% - 15px)",
              marginTop: 8,
              backgroundImage: ZIP_CLOSED,
              backgroundSize: "30px 33.3px",
              backgroundRepeat: "repeat-y",
              boxShadow: "0 0 12px rgba(0,0,40,.45)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[6px] left-[calc(50%-12px)] h-[9px] w-6 rounded-[3px]"
            style={{ background: "linear-gradient(180deg,#fff,#b4bac6 60%,#7f8696)", boxShadow: "0 1px 3px rgba(0,0,40,.5)" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2"
            style={{
              top: Y,
              width: 150,
              height: 210,
              x: "-50%",
              y: -44,
              background: "radial-gradient(ellipse 50% 46% at 50% 38%, rgba(0,0,50,.5), transparent 100%)",
            }}
          />
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
            className="pointer-events-auto absolute left-1/2 -ml-8 h-[134px] w-16 touch-none select-none cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime rounded-lg"
            style={{ top: Y, x: wobble, rotate: tilt }}
          >
            <motion.span
              className="relative mx-auto -mt-[22px] block w-[56px] origin-[50%_14%]"
              style={{ rotate: swing }}
              animate={idle ? { y: [0, 5, 0] } : { y: 0 }}
              transition={idle ? { duration: 1.8, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" } : { duration: 0.2 }}
            >
              <Image
                src="/shirt/slider.svg"
                alt=""
                width={100}
                height={236}
                priority
                unoptimized
                className="h-auto w-full select-none"
              />
            </motion.span>

            <motion.span
              className="absolute left-[calc(50%+34px)] top-[48px] flex items-center gap-1 whitespace-nowrap rounded-full border border-white/20 bg-ink/85 px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-white"
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
            className="pointer-events-auto absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-ink/70 text-white transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
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
