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
const BOT = 150; // gap between slider rest position and the bottom of the box (pull is ~126px tall)
const TOOTH = 20; // px of slider travel per tooth (sound, buzz, shudder)
const SLIVER = 10; // px of fabric left at each side once fully open
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Closed shirt height: grows with the screen width, capped by the screen
// height (so a landscape phone never gets a shirt taller than itself). The
// same formula is repeated as CSS on the box so the first paint matches.
const closedHeight = (width: number, height: number) =>
  Math.round(Math.min(clamp(width * 1.18, 380, 560), Math.max(320, height * 0.78)));
const CLOSED_CSS = "h-[min(clamp(380px,118vw,560px),max(320px,78svh))]";

// Everything below is cut from the supplied design (public/shirt/): fabric
// tile, zipper strips, the pull, the patch and the pocket.
const FABRIC_IMG = "url(/shirt/fabric.jpg)";
const ZIP_EDGE = "url(/shirt/zip-edge.png)";
const ZIP_CLOSED = "url(/shirt/zip-closed.png)";
const EDGE_W = 44; // px, width of the open-zip strip
const EDGE_FADE = "linear-gradient(to right, #000 0, #000 62%, transparent 100%)";
const PATCH_MASK =
  "linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 12%, #000 88%, transparent 100%)";

type PanelProps = {
  side: "left" | "right";
  clip: ReturnType<typeof useTransform<number, string>>;
  tapeTop: ReturnType<typeof useTransform<number, number>>;
  tapeLen: ReturnType<typeof useTransform<number, number>>;
  Y: ReturnType<typeof useMotionValue<number>>;
  turn: ReturnType<typeof useTransform<number, number>>;
  jx: ReturnType<typeof useTransform<number, number>>;
  jy: ReturnType<typeof useTransform<number, number>>;
  sweep: ReturnType<typeof useTransform<number, string>>;
};

function Panel({ side, clip, tapeTop, tapeLen, Y, turn, jx, jy, sweep }: PanelProps) {
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

      {/* white stitching parallel to the zip, as on the real shirt */}
      <motion.div
        className="absolute"
        style={{
          top: tapeTop,
          height: tapeLen,
          width: 1.5,
          left: left ? "calc(50% - 30px)" : "calc(50% + 28.5px)",
          transformOrigin: left ? "100% 100%" : "0 100%",
          rotate: left ? -THETA : THETA,
          backgroundImage: "repeating-linear-gradient(180deg, rgba(235,238,255,.85) 0 6px, transparent 6px 11px)",
        }}
      />
      {/* fabric puckering and shadow beside the tape */}
      <motion.div
        className="absolute"
        style={{
          top: tapeTop,
          height: tapeLen,
          width: 46,
          left: left ? "calc(50% - 46px)" : "50%",
          transformOrigin: left ? "100% 100%" : "0 100%",
          rotate: left ? -THETA : THETA,
          background: `linear-gradient(${left ? 90 : 270}deg, transparent, rgba(0,0,30,.4))`,
        }}
      />
      {/* open zipper: teeth hang over the edge into the opening */}
      <motion.div
        className="absolute"
        style={{
          top: tapeTop,
          height: tapeLen,
          width: EDGE_W,
          left: left ? "50%" : `calc(50% - ${EDGE_W}px)`,
          transformOrigin: left ? "0 100%" : "100% 100%",
          rotate: left ? -THETA : THETA,
          filter: "drop-shadow(0 6px 8px rgba(20,20,60,.35))",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: ZIP_EDGE,
            backgroundSize: `${EDGE_W}px ${EDGE_W * (228 / 132)}px`,
            backgroundRepeat: "repeat-y",
            transform: left ? undefined : "scaleX(-1)",
            WebkitMaskImage: EDGE_FADE,
            maskImage: EDGE_FADE,
          }}
        />
      </motion.div>
      {/* closed zipper below the pull (drawn once, with the left panel) */}
      {left && (
        <motion.div
          className="absolute"
          style={{
            top: Y,
            bottom: 12,
            width: 26,
            left: "calc(50% - 13px)",
            backgroundImage: ZIP_CLOSED,
            backgroundSize: "26px 79px",
            backgroundRepeat: "repeat-y",
            boxShadow: "0 0 10px rgba(0,0,30,.5)",
          }}
        />
      )}
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
  const sweep = useTransform(p, [0, 1], ["-35%", "35%"]);
  const turnL = useTransform(b, (v) => v * 0.9);
  const turnR = useTransform(b, (v) => v * 0.9);
  const settle = useTransform(p, [0, PA], [0.985, 1]);
  const rise = useTransform(p, [0, PA], [10, 0]);
  const tapeLen = useTransform(Y, (y) => y * EDGE);
  const tapeTop = useTransform(Y, (y) => y - y * EDGE);

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
        className={`zipper-box relative overflow-hidden rounded-2xl ${CLOSED_CSS}`}
        style={{
          ...(ready ? { height: H } : {}),
          background:
            "radial-gradient(70% 38% at 85% 2%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%), radial-gradient(60% 30% at 15% 40%, color-mix(in srgb, #ffb020 8%, transparent), transparent 70%), var(--color-surface-alt)",
        }}
      >
        <motion.div
          ref={contentRef}
          id={contentId}
          className="px-4 sm:px-6 pt-8 pb-40"
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
          <Panel side="left" clip={clipLeft} tapeTop={tapeTop} tapeLen={tapeLen} Y={Y} turn={turnL} jx={jx} jy={jy} sweep={sweep} />
          <Panel side="right" clip={clipRight} tapeTop={tapeTop} tapeLen={tapeLen} Y={Y} turn={turnR} jx={jx} jy={jy} sweep={sweep} />

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
              className="relative mx-auto block w-[56px] origin-top"
              style={{ rotate: swing }}
              animate={idle ? { y: [0, 5, 0] } : { y: 0 }}
              transition={idle ? { duration: 1.8, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" } : { duration: 0.2 }}
            >
              <Image
                src="/shirt/slider.png"
                alt=""
                width={192}
                height={432}
                priority
                className="h-auto w-full select-none"
                style={{ filter: "drop-shadow(0 8px 8px rgba(0,0,30,.55)) drop-shadow(0 0 14px rgba(215,255,63,.35))" }}
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
