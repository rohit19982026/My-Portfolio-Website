"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";

/*
 * "My Journey" panel. The artwork (illustrations, the wavy path with its
 * stems and nodes, the BT logo) is cropped straight from the supplied
 * design into public/journey/. Everything is laid out on a canvas with the
 * design's own proportions (1156 x 680); every position below is a pixel
 * coordinate of that design, converted to percentages, and all type is sized
 * in container-width units so the whole panel scales as one picture.
 * Words are real text on top of the art.
 */

const W = 1156;
const H = 680;
const OX = 32; // the design has a 32px margin left of the panel
const pctX = (x: number) => `${((x - OX) / W) * 100}%`;
const pctY = (y: number) => `${(y / H) * 100}%`;
const pctW = (w: number) => `${(w / W) * 100}%`;
const pctH = (h: number) => `${(h / H) * 100}%`;
const cq = (px: number) => `${(px / W) * 100}cqw`;

const EASE = [0.16, 1, 0.3, 1] as const;

// Cropped art keeps a faint box of its own background; multiply blending on
// the near-white panel plus a feathered edge makes that box disappear.
const FEATHER =
  "linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 9%, #000 93%, transparent 100%)";
const blendStyle = {
  mixBlendMode: "multiply" as const,
  WebkitMaskImage: FEATHER,
  maskImage: FEATHER,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

type Milestone = {
  bubble: { cx: number; cy: number; w: number; h: number; text: string; bg: string; fg: string; glow: string; size: number };
  card: { x: number; y: number; w: number; h: number; tint: string; border: string; textTop: number };
  title: string[];
  sub: string[];
  art: { src: string; x: number; y: number; w: number; h: number };
  node: { x: number; y: number; color: string };
  float: number;
};

const milestones: Milestone[] = [
  {
    bubble: { cx: 123, cy: 301, w: 90, h: 90, text: "2014", bg: "linear-gradient(145deg,#ffd3de,#ffb9ca)", fg: "#d4204f", glow: "255,120,150", size: 22 },
    card: { x: 80, y: 320, w: 175, h: 128, tint: "255,214,224", border: "255,170,190", textTop: 28 },
    title: ["Class 10"],
    sub: ["Completed", "Class 10"],
    art: { src: "/journey/books-pink.png", x: 50, y: 440, w: 215, h: 122 },
    node: { x: 123, y: 622, color: "#ff5e8a" },
    float: 0,
  },
  {
    bubble: { cx: 357, cy: 298, w: 82, h: 82, text: "2016", bg: "linear-gradient(145deg,#e4d9ff,#cdbcff)", fg: "#6a3fd9", glow: "140,100,255", size: 21 },
    card: { x: 305, y: 315, w: 170, h: 113, tint: "224,214,255", border: "190,170,255", textTop: 26 },
    title: ["Class 12"],
    sub: ["Completed", "Class 12"],
    art: { src: "/journey/books-cap.png", x: 283, y: 420, w: 212, h: 125 },
    node: { x: 360, y: 570, color: "#7c4dff" },
    float: 1,
  },
  {
    bubble: { cx: 557, cy: 240, w: 82, h: 64, text: "2020", bg: "linear-gradient(145deg,#d9e7ff,#bcd4ff)", fg: "#2a5fd6", glow: "70,130,255", size: 21 },
    card: { x: 512, y: 255, w: 208, h: 148, tint: "214,228,255", border: "170,200,255", textTop: 31 },
    title: ["Bachelor of", "Computer Application"],
    sub: ["Brainware University,", "Kolkata"],
    art: { src: "/journey/laptop.png", x: 503, y: 395, w: 222, h: 130 },
    node: { x: 585, y: 555, color: "#1677ff" },
    float: 2,
  },
  {
    bubble: { cx: 795, cy: 290, w: 82, h: 72, text: "2020", bg: "linear-gradient(145deg,#ffedc9,#ffdc9a)", fg: "#9a6a12", glow: "255,180,60", size: 21 },
    card: { x: 757, y: 305, w: 188, h: 181, tint: "255,236,205", border: "255,210,150", textTop: 33 },
    title: ["Started my career", "at British Telecom"],
    sub: [],
    art: { src: "/journey/bt-building.png", x: 740, y: 478, w: 212, h: 124 },
    node: { x: 843, y: 635, color: "#ffb020" },
    float: 3,
  },
  {
    bubble: { cx: 1038, cy: 249, w: 105, h: 66, text: "Dec 2022", bg: "linear-gradient(145deg,#d9f6d9,#bdeebd)", fg: "#2a8a3a", glow: "80,200,100", size: 19 },
    card: { x: 982, y: 268, w: 181, h: 138, tint: "218,246,218", border: "170,230,175", textTop: 32 },
    title: ["Joined phData"],
    sub: ["Moved to phData", "in December 2022"],
    art: { src: "/journey/phdata-building.png", x: 965, y: 398, w: 215, h: 150 },
    node: { x: 1065, y: 594, color: "#4cd04c" },
    float: 4,
  },
];

// Wave centre line in design coordinates, measured from the cropped path.
const WAVE: [number, number][] = [
  [28, 590], [60, 602], [100, 618], [123, 622], [150, 623], [190, 618], [250, 594], [300, 573], [340, 568],
  [360, 569], [380, 570], [420, 581], [470, 598], [500, 595], [540, 574], [570, 564], [585, 556], [620, 555],
  [670, 568], [720, 596], [770, 622], [820, 634], [843, 635], [870, 635], [930, 629], [990, 616], [1040, 602],
  [1065, 594], [1090, 587], [1130, 574], [1166, 566],
];
const yAt = (x: number) => {
  for (let i = 1; i < WAVE.length; i++) {
    if (x <= WAVE[i][0]) {
      const [x0, y0] = WAVE[i - 1];
      const [x1, y1] = WAVE[i];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1);
    }
  }
  return WAVE[WAVE.length - 1][1];
};

const WAVE_IMG = { src: "/journey/timeline-wave.png", x: 28, y: 534, w: 1167, h: 121 };
const fractionAt = (x: number) => Math.min(1, (x - WAVE_IMG.x) / WAVE_IMG.w);

function Column({
  m,
  index,
  revealed,
  reduce,
  rootRef,
  onSeen,
}: {
  m: Milestone;
  index: number;
  revealed: boolean;
  reduce: boolean;
  rootRef: React.RefObject<HTMLDivElement | null>;
  onSeen: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { root: rootRef, amount: 0.4 });
  useEffect(() => {
    if (seen) onSeen(index);
  }, [seen, index, onSeen]);

  const state = revealed ? "show" : "hidden";
  const last = index === milestones.length - 1;
  const { bubble: b, card: c, art: a, node: n } = m;

  return (
    <>
      {/* hit area used only to know when this column scrolls into view */}
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: pctX(c.x), top: pctY(c.y), width: pctW(c.w), height: pctH(c.h + 80) }}
      />

      <li className="contents">
        {/* frosted card (top part; the crop below supplies the rest of it) */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={state}
          variants={{
            hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE, delay: 0.12 } },
          }}
          className="absolute transition-transform duration-300 hover:-translate-y-1"
          style={{ left: pctX(c.x), top: pctY(c.y), width: pctW(c.w), height: pctH(c.h) }}
        >
          <div
            className="h-full w-full"
            style={{
              borderRadius: `${cq(20)} ${cq(20)} 0 0`,
              background: `linear-gradient(180deg, rgba(${c.tint},0.34), rgba(255,255,255,0.28))`,
              border: `1px solid rgba(${c.border},0.45)`,
              borderBottom: "none",
              backdropFilter: "blur(2px)",
              padding: `${cq(c.textTop)} ${cq(16)} 0 ${cq(21)}`,
            }}
          >
            <h4 className="font-sans font-bold leading-snug" style={{ color: "#14122b", fontSize: cq(16.5) }}>
              {m.title.map((t, i) => (
                <span key={i} className="block whitespace-nowrap">
                  {t}
                </span>
              ))}
            </h4>
            {m.sub.length > 0 && (
              <p className="font-sans leading-snug" style={{ color: "#8a87a0", fontSize: cq(15.5), marginTop: cq(5) }}>
                {m.sub.map((t, i) => (
                  <span key={i} className="block whitespace-nowrap">
                    {t}
                  </span>
                ))}
              </p>
            )}
          </div>
        </motion.div>

        {/* illustration: rises in, then floats */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={state}
          variants={{
            hidden: { opacity: 0, y: 22, scale: 0.92, filter: "blur(8px)" },
            show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE, delay: 0.05 } },
          }}
          className="pointer-events-none absolute"
          style={{ left: pctX(a.x), top: pctY(a.y), width: pctW(a.w) }}
        >
          <motion.div
            animate={revealed && !reduce ? { y: [0, -5, 0] } : { y: 0 }}
            transition={revealed && !reduce ? { duration: 5.5 + m.float * 0.7, repeat: Infinity, ease: "easeInOut", delay: 1 + m.float * 0.3 } : { duration: 0 }}
          >
            <Image
              src={a.src}
              alt=""
              width={a.w}
              height={a.h}
              sizes="(min-width: 1024px) 215px, 200px"
              className="h-auto w-full select-none"
              style={blendStyle}
            />
          </motion.div>
        </motion.div>

        {index === 3 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="pointer-events-none absolute"
            style={{ left: pctX(815), top: pctY(410), width: pctW(73) }}
          >
            <Image src="/journey/bt-logo.png" alt="" width={73} height={68} className="h-auto w-full select-none" style={{ mixBlendMode: "multiply" }} />
          </motion.div>
        )}

        {/* year bubble */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.4 }}
          animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.3 }}
          className="absolute flex items-center justify-center rounded-full font-sans font-bold"
          style={{
            left: pctX(b.cx - b.w / 2),
            top: pctY(b.cy - b.h / 2),
            width: pctW(b.w),
            height: pctH(b.h),
            background: b.bg,
            color: b.fg,
            fontSize: cq(b.size),
            boxShadow: `0 ${cq(10)} ${cq(24)} -${cq(6)} rgba(${b.glow},0.55), inset 0 ${cq(2)} 0 rgba(255,255,255,0.85), 0 0 0 ${cq(3)} rgba(255,255,255,0.55)`,
          }}
        >
          <span className="sr-only">Year: </span>
          {b.text}
        </motion.div>

        {/* node pulse ring (the node itself is part of the wave artwork) */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            revealed && !reduce
              ? last
                ? { opacity: [0.7, 0], scale: [0.6, 2.8] }
                : { opacity: [0.7, 0], scale: [0.6, 2.6] }
              : { opacity: 0, scale: 0.6 }
          }
          transition={
            last
              ? { duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 0.8, delay: 0.3 }
              : { duration: 1.1, ease: "easeOut", delay: 0.15 }
          }
          className="pointer-events-none absolute rounded-full"
          style={{
            left: pctX(n.x - 15),
            top: pctY(n.y - 15),
            width: pctW(30),
            height: pctH(30),
            background: `${n.color}55`,
            border: `1.5px solid ${n.color}`,
          }}
        />
      </li>
    </>
  );
}

export default function JourneyTimeline() {
  const reduce = !!useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelIn = useInView(panelRef, { once: true, amount: 0.3 });

  const [revealedCount, setRevealedCount] = useState(0);
  const [seen, setSeen] = useState<boolean[]>(() => milestones.map(() => false));
  const wave = useMotionValue(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onSeen = (i: number) =>
    setSeen((s) => (s[i] ? s : s.map((v, j) => (j === i ? true : v))));

  // Reduced motion: show the finished timeline straight away.
  const total = milestones.length;
  const done = reduce ? total : revealedCount;

  // Reveal milestones one after another as the line reaches them.
  useEffect(() => {
    if (reduce || !panelIn) return;
    // a later column on screen means every earlier one is owed its reveal too
    const furthestSeen = seen.lastIndexOf(true);
    if (revealedCount >= total || furthestSeen < revealedCount) return;
    const delay = revealedCount === 0 ? 450 : 560;
    timer.current = setTimeout(() => setRevealedCount((c) => c + 1), delay);
    return () => clearTimeout(timer.current);
  }, [reduce, panelIn, seen, revealedCount, total]);

  // Draw the line up to the newest milestone.
  useEffect(() => {
    if (reduce || revealedCount === 0) return;
    const i = revealedCount - 1;
    const target = i === total - 1 ? 1 : Math.min(1, fractionAt(milestones[i].node.x + 34));
    const controls = animate(wave, target, {
      duration: i === 0 ? 1.1 : 0.95,
      ease: EASE,
    });
    return () => controls.stop();
  }, [reduce, revealedCount, total, wave]);

  const clip = useTransform(wave, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);
  const dotLeft = useTransform(wave, (v) => `${((WAVE_IMG.x + v * WAVE_IMG.w - OX) / W) * 100}%`);
  const dotTop = useTransform(wave, (v) => `${(yAt(WAVE_IMG.x + v * WAVE_IMG.w) / H) * 100}%`);
  const dotOpacity = useTransform(wave, [0, 0.03, 0.96, 1], [0, 1, 1, 0]);

  return (
    <div ref={panelRef} className="relative">
      <div
        ref={scrollRef}
        role="region"
        aria-label="Education and career journey, scrolls sideways on small screens"
        tabIndex={0}
        className="no-scrollbar overflow-x-auto rounded-[1.75rem] sm:rounded-[2rem]"
        style={{ border: "1px solid rgba(120,100,220,0.14)", boxShadow: "0 30px 60px -40px rgba(110,90,200,0.45)" }}
      >
        <div
          className="relative min-w-[920px] overflow-hidden"
          style={{
            aspectRatio: `${W} / ${H}`,
            containerType: "inline-size",
            background:
              "radial-gradient(55% 40% at 88% 10%, rgba(230,224,255,0.45), transparent 70%), radial-gradient(45% 35% at 6% 14%, rgba(222,232,255,0.4), transparent 70%), linear-gradient(180deg,#fcfbff 0%,#f9f7ff 100%)",
          }}
        >
          {/* soft hills */}
          <span aria-hidden className="pointer-events-none absolute" style={{ left: "-6%", top: pctY(500), width: "36%", height: pctH(240), borderRadius: "50%", background: "radial-gradient(closest-side, rgba(226,220,255,0.4), transparent)" }} />
          <span aria-hidden className="pointer-events-none absolute" style={{ right: "-8%", top: pctY(540), width: "34%", height: pctH(240), borderRadius: "50%", background: "radial-gradient(closest-side, rgba(220,226,255,0.4), transparent)" }} />
          <span aria-hidden className="pointer-events-none absolute" style={{ right: "-4%", top: pctY(130), width: "30%", height: pctH(220), borderRadius: "50%", background: "radial-gradient(closest-side, rgba(232,226,255,0.45), transparent)" }} />

          {/* header */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={panelIn || reduce ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span
              className="absolute flex items-center justify-center rounded-full"
              style={{ left: pctX(66), top: pctY(23), width: pctW(80), height: pctH(80), background: "#e4e9ff", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.8)" }}
            >
              <GraduationCap style={{ width: cq(40), height: cq(40), color: "#2a2f9a" }} strokeWidth={2} />
            </span>
            <div className="absolute" style={{ left: pctX(175), top: pctY(32), color: "#14122b" }}>
              <p className="font-sans font-semibold uppercase" style={{ fontSize: cq(15), letterSpacing: "0.2em", color: "#6b6880" }}>
                Education &amp; career journey
              </p>
              <h3
                className="font-sans font-extrabold leading-none"
                style={{ fontSize: cq(61), letterSpacing: "-0.035em", marginTop: cq(10) }}
              >
                My{" "}
                <span className="relative inline-block" style={{ color: "#0d22ee" }}>
                  Journey
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.9) 50%, transparent 65%)", mixBlendMode: "overlay" }}
                    initial={{ x: "-120%", opacity: 0 }}
                    animate={panelIn && !reduce ? { x: "120%", opacity: [0, 1, 1, 0] } : {}}
                    transition={{ duration: 1.4, ease: "easeInOut", delay: 0.9 }}
                  />
                </span>
                <span style={{ color: "#d7ff3f" }}>.</span>
              </h3>
            </div>
            <span aria-hidden className="absolute" style={{ left: pctX(813), top: pctY(45), width: 2, height: pctH(48), background: "#c9c2f2" }} />
            <p className="absolute font-sans leading-snug" style={{ left: pctX(840), top: pctY(44), width: pctW(300), fontSize: cq(18.5), color: "#8a87a0" }}>
              From a student to a professional, building a career in data and tech.
            </p>
          </motion.div>

          {/* the line through time: path + stems + nodes (artwork) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: pctX(WAVE_IMG.x),
              top: pctY(WAVE_IMG.y),
              width: pctW(WAVE_IMG.w),
              clipPath: reduce ? undefined : clip,
              WebkitClipPath: reduce ? undefined : (clip as unknown as string),
            }}
          >
            <Image src={WAVE_IMG.src} alt="" width={WAVE_IMG.w} height={WAVE_IMG.h} className="h-auto w-full select-none" priority={false} style={{ mixBlendMode: "multiply", WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 5%, #000 78%, transparent 100%)", maskImage: "linear-gradient(to bottom, transparent 0, #000 5%, #000 78%, transparent 100%)" }} />
          </motion.div>

          {/* glowing traveller riding the front of the line */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                left: dotLeft,
                top: dotTop,
                width: pctW(16),
                height: pctH(16),
                x: "-50%",
                y: "-50%",
                opacity: dotOpacity,
                background: "#fff",
                boxShadow: "0 0 0 4px rgba(150,120,255,0.35), 0 0 22px 8px rgba(150,120,255,0.55)",
              }}
            />
          )}

          <ol className="m-0 list-none p-0" aria-label="Timeline">
            {milestones.map((m, i) => (
              <Column
                key={m.title.join(" ")}
                m={m}
                index={i}
                revealed={i < done}
                reduce={reduce}
                rootRef={scrollRef}
                onSeen={onSeen}
              />
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-2 text-center font-sans text-[11px] text-fg/45 sm:hidden">Swipe to follow the timeline →</p>
    </div>
  );
}
