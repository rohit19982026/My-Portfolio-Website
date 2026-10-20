"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { GraduationCap } from "lucide-react";

/*
 * Education & career journey.
 *
 * Artwork (illustrations, the wavy path with its stems and nodes, the BT
 * logo) is cropped from the supplied design into public/journey/. Words are
 * real text on top.
 *
 *  - lg and up: a canvas with the design's own proportions (1156 x 680, all
 *    positions are design pixels turned into percentages, type in container
 *    units). The story is scrubbed by scroll: the line draws as you scroll,
 *    a comet rides its front, milestones spring in as it reaches them, and
 *    everything reverses when you scroll back. Pointer parallax and 3D card
 *    tilt add depth.
 *  - below lg: a vertical timeline made for thumbs: a gradient line draws
 *    down the page and each milestone slides in as you reach it.
 *  - reduced motion: both layouts render finished and still.
 */

const W = 1156;
const H = 680;
const OX = 32;
const pctX = (x: number) => `${((x - OX) / W) * 100}%`;
const pctY = (y: number) => `${(y / H) * 100}%`;
const pctW = (w: number) => `${(w / W) * 100}%`;
const pctH = (h: number) => `${(h / H) * 100}%`;
const cq = (px: number) => `${(px / W) * 100}cqw`;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

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
  year: number;
  prefix?: string;
  bubble: { cx: number; cy: number; w: number; h: number; bg: string; fg: string; glow: string; size: number };
  card: { x: number; y: number; w: number; h: number; tint: string; border: string; textTop: number };
  title: string[];
  sub: string[];
  art: { src: string; x: number; y: number; w: number; h: number };
  node: { x: number; y: number; color: string };
  float: number;
};

const milestones: Milestone[] = [
  {
    year: 2014,
    bubble: { cx: 123, cy: 301, w: 90, h: 90, bg: "linear-gradient(145deg,#c9f2ea,#9fe3d6)", fg: "#0b7d70", glow: "20,184,166", size: 22 },
    card: { x: 80, y: 320, w: 175, h: 128, tint: "190,240,230", border: "120,215,200", textTop: 28 },
    title: ["Class 10"],
    sub: ["Completed", "Class 10"],
    art: { src: "/journey/books-pink.png", x: 50, y: 440, w: 215, h: 122 },
    node: { x: 123, y: 622, color: "#14b8a6" },
    float: 0,
  },
  {
    year: 2016,
    bubble: { cx: 357, cy: 298, w: 82, h: 82, bg: "linear-gradient(145deg,#eefbb8,#dcf26a)", fg: "#4d6200", glow: "170,210,20", size: 21 },
    card: { x: 305, y: 315, w: 170, h: 113, tint: "238,250,170", border: "205,230,90", textTop: 26 },
    title: ["Class 12"],
    sub: ["Completed", "Class 12"],
    art: { src: "/journey/books-cap.png", x: 283, y: 420, w: 212, h: 125 },
    node: { x: 360, y: 570, color: "#a8d400" },
    float: 1,
  },
  {
    year: 2020,
    bubble: { cx: 557, cy: 240, w: 82, h: 64, bg: "linear-gradient(145deg,#dbe3ff,#b9c9ff)", fg: "#0d22ee", glow: "13,34,238", size: 21 },
    card: { x: 512, y: 255, w: 208, h: 148, tint: "205,216,255", border: "150,170,255", textTop: 31 },
    title: ["Bachelor of", "Computer Application"],
    sub: ["Brainware University,", "Kolkata"],
    art: { src: "/journey/laptop.png", x: 503, y: 395, w: 222, h: 130 },
    node: { x: 585, y: 555, color: "#0d22ee" },
    float: 2,
  },
  {
    year: 2020,
    bubble: { cx: 795, cy: 290, w: 82, h: 72, bg: "linear-gradient(145deg,#ffedc9,#ffdc9a)", fg: "#9a6a12", glow: "255,180,60", size: 21 },
    card: { x: 757, y: 305, w: 188, h: 181, tint: "255,236,205", border: "255,210,150", textTop: 33 },
    title: ["Started my career", "at British Telecom"],
    sub: [],
    art: { src: "/journey/bt-building.png", x: 740, y: 478, w: 212, h: 124 },
    node: { x: 843, y: 635, color: "#ffb020" },
    float: 3,
  },
  {
    year: 2022,
    prefix: "Dec ",
    bubble: { cx: 1038, cy: 249, w: 105, h: 66, bg: "linear-gradient(145deg,#d6f5dc,#b3e8c0)", fg: "#17703a", glow: "40,170,90", size: 19 },
    card: { x: 982, y: 268, w: 181, h: 138, tint: "205,243,215", border: "140,215,160", textTop: 32 },
    title: ["Joined phData"],
    sub: ["Moved to phData", "in December 2022"],
    art: { src: "/journey/phdata-building.png", x: 965, y: 398, w: 215, h: 150 },
    node: { x: 1065, y: 594, color: "#22c55e" },
    float: 4,
  },
];

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

/* ---------- shared bits ---------- */

// Odometer-style year: counts up from 2000 as `r` goes 0 to 1.
function useYear(r: MotionValue<number>, year: number) {
  return useTransform(r, (v) => String(Math.round(2000 + (year - 2000) * clamp01(v))));
}

function Motes() {
  const motes = [
    { x: "12%", y: "30%", s: 7, d: 9 },
    { x: "28%", y: "62%", s: 5, d: 11 },
    { x: "47%", y: "22%", s: 6, d: 10 },
    { x: "63%", y: "70%", s: 8, d: 12 },
    { x: "78%", y: "34%", s: 5, d: 9.5 },
    { x: "90%", y: "58%", s: 6, d: 13 },
    { x: "38%", y: "46%", s: 4, d: 8.5 },
  ];
  return (
    <>
      {motes.map((m, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: m.x,
            top: m.y,
            width: m.s,
            height: m.s,
            background: "rgba(13,34,238,0.35)",
            filter: "blur(1.5px)",
            boxShadow: "0 0 12px 3px rgba(13,34,238,0.35)",
          }}
          animate={{ y: [0, -22, 0], x: [0, i % 2 ? 10 : -10, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: m.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}
    </>
  );
}

/* ---------- desktop: scroll-scrubbed canvas ---------- */

function DesktopColumn({
  m,
  index,
  wave,
  p,
  mx,
  my,
  reduce,
}: {
  m: Milestone;
  index: number;
  wave: MotionValue<number>;
  p: MotionValue<number>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduce: boolean;
}) {
  const f = fractionAt(m.node.x);
  const raw = useTransform(wave, (v) => clamp01((v - (f - 0.13)) / 0.11));
  const r = useSpring(raw, { stiffness: 130, damping: 20, mass: 0.7 });
  const rPop = useSpring(useTransform(raw, [0.25, 1], [0, 1]), { stiffness: 260, damping: 14 });

  const parCard = useTransform(p, [0, 1], [8, -8]);
  const parArt = useTransform(p, [0, 1], [14, -14]);
  const parBub = useTransform(p, [0, 1], [20, -20]);
  const mxs = useSpring(mx, { stiffness: 60, damping: 18 });
  const mys = useSpring(my, { stiffness: 60, damping: 18 });
  const cardX = useTransform(mxs, (v) => v * 5);
  const artX = useTransform(mxs, (v) => v * 11);
  const bubX = useTransform(mxs, (v) => v * 16);
  const cardY = useTransform([parCard, mys], ([a, b]: number[]) => a + b * 4);
  const artY = useTransform([parArt, mys], ([a, b]: number[]) => a + b * 9);
  const bubY = useTransform([parBub, mys], ([a, b]: number[]) => a + b * 13);

  // reveal transforms
  const cardOpacity = r;
  const cardRise = useTransform(r, [0, 1], [30, 0]);
  const cardBlur = useTransform(r, [0, 1], [8, 0]);
  const cardFilter = useMotionTemplate`blur(${cardBlur}px)`;
  const artRise = useTransform(r, [0, 1], [26, 0]);
  const artScale = useTransform(r, [0, 1], [0.9, 1]);
  const artBlur = useTransform(r, [0, 1], [10, 0]);
  const artFilter = useMotionTemplate`blur(${artBlur}px)`;
  const ringOpacity = useTransform(raw, [0.2, 0.45, 1], [0, 0.85, 0]);
  const ringScale = useTransform(raw, [0.2, 1], [0.6, 2.7]);
  const year = useYear(rPop, m.year);
  const btScale = useTransform(r, [0, 1], [0.8, 1]);
  const bubOpacity = useTransform(rPop, [0, 0.4], [0, 1]);
  const lastRing = useTransform(wave, [0.9, 1], [0, 1]);

  // 3D tilt (cards only, pointer devices)
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const stx = useSpring(tx, { stiffness: 180, damping: 18 });
  const sty = useSpring(ty, { stiffness: 180, damping: 18 });
  const rotY = useTransform(stx, [-0.5, 0.5], [-9, 9]);
  const rotX = useTransform(sty, [-0.5, 0.5], [8, -8]);
  const glareX = useTransform(stx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sty, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.85), transparent 55%)`;
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 24 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const b = e.currentTarget.getBoundingClientRect();
    tx.set((e.clientX - b.left) / b.width - 0.5);
    ty.set((e.clientY - b.top) / b.height - 0.5);
    glareOpacity.set(0.35);
  };
  const onLeave = () => {
    tx.set(0);
    ty.set(0);
    glareOpacity.set(0);
  };

  const { bubble: b, card: c, art: a, node: n } = m;
  const live = !reduce;

  return (
    <li className="contents">
      {/* card (top part; the crop below supplies the rest of it) */}
      <motion.div
        className="absolute"
        style={{
          left: pctX(c.x),
          top: pctY(c.y),
          width: pctW(c.w),
          height: pctH(c.h),
          x: live ? cardX : 0,
          y: live ? cardY : 0,
          perspective: 900,
        }}
      >
        <motion.div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative h-full w-full"
          style={{
            opacity: cardOpacity,
            y: cardRise,
            filter: cardFilter,
            rotateX: live ? rotX : 0,
            rotateY: live ? rotY : 0,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full overflow-hidden"
            style={{
              borderRadius: `${cq(20)} ${cq(20)} 0 0`,
              background: `linear-gradient(180deg, rgba(${c.tint},0.36), rgba(255,255,255,0.3))`,
              border: `1px solid rgba(${c.border},0.5)`,
              borderBottom: "none",
              backdropFilter: "blur(2px)",
              boxShadow: `0 ${cq(18)} ${cq(40)} -${cq(24)} rgba(${b.glow},0.55)`,
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
            {live && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: glare, opacity: glareOpacity, mixBlendMode: "soft-light" }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* illustration */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          left: pctX(a.x),
          top: pctY(a.y),
          width: pctW(a.w),
          x: live ? artX : 0,
          y: live ? artY : 0,
        }}
      >
        <motion.div style={{ opacity: r, y: artRise, scale: artScale, filter: artFilter, transformOrigin: "50% 100%" }}>
          <motion.div
            animate={live ? { y: [0, -5, 0] } : { y: 0 }}
            transition={live ? { duration: 5.5 + m.float * 0.7, repeat: Infinity, ease: "easeInOut", delay: m.float * 0.4 } : { duration: 0 }}
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
      </motion.div>

      {index === 3 && (
        <motion.div
          className="pointer-events-none absolute"
          style={{ left: pctX(815), top: pctY(410), width: pctW(73), opacity: r, scale: btScale }}
        >
          <Image src="/journey/bt-logo.png" alt="" width={73} height={68} className="h-auto w-full select-none" style={{ mixBlendMode: "multiply" }} />
        </motion.div>
      )}

      {/* year bubble */}
      <motion.div
        className="absolute"
        style={{
          left: pctX(b.cx - b.w / 2),
          top: pctY(b.cy - b.h / 2),
          width: pctW(b.w),
          height: pctH(b.h),
          x: live ? bubX : 0,
          y: live ? bubY : 0,
        }}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center rounded-full font-sans font-bold tabular-nums"
          style={{
            scale: rPop,
            opacity: bubOpacity,
            background: b.bg,
            color: b.fg,
            fontSize: cq(b.size),
            boxShadow: `0 ${cq(10)} ${cq(24)} -${cq(6)} rgba(${b.glow},0.55), inset 0 ${cq(2)} 0 rgba(255,255,255,0.85), 0 0 0 ${cq(3)} rgba(255,255,255,0.55)`,
          }}
        >
          <span className="sr-only">Year: {m.prefix ?? ""}{m.year}</span>
          <span aria-hidden>
            {m.prefix}
            <motion.span>{reduce ? String(m.year) : year}</motion.span>
          </span>
        </motion.div>
      </motion.div>

      {/* node dot in this milestone's own colour, drawn over the artwork's node */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          left: pctX(n.x - 15),
          top: pctY(n.y - 15),
          width: pctW(30),
          height: pctH(30),
          opacity: bubOpacity,
          scale: rPop,
          background: n.color,
          boxShadow: `0 0 0 ${cq(5)} #fff, 0 0 ${cq(16)} ${cq(3)} ${n.color}88`,
        }}
      />

      {/* node burst ring */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          left: pctX(n.x - 15),
          top: pctY(n.y - 15),
          width: pctW(30),
          height: pctH(30),
          background: `${n.color}44`,
          border: `1.5px solid ${n.color}`,
          opacity: live ? ringOpacity : 0,
          scale: ringScale,
        }}
      />
      {index === milestones.length - 1 && live && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{ left: pctX(n.x - 15), top: pctY(n.y - 15), width: pctW(30), height: pctH(30), border: `1.5px solid ${n.color}`, opacity: lastRing }}
          animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </li>
  );
}

function Desktop({ reduce }: { reduce: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ["start 88%", "center 42%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });
  const one = useMotionValue(1);
  const p = reduce ? one : smooth;
  const waveRaw = useTransform(p, (v) => clamp01((v - 0.06) / 0.86));
  const wave = reduce ? one : waveRaw;

  const clip = useTransform(wave, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);
  const headX = (v: number) => WAVE_IMG.x + v * WAVE_IMG.w;
  const lx = (v: number, k: number) => `${((headX(Math.max(0, v - k * 0.015)) - OX) / W) * 100}%`;
  const ty = (v: number, k: number) => `${(yAt(headX(Math.max(0, v - k * 0.015))) / H) * 100}%`;
  const cometOpacity = useTransform(wave, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);
  const headLeft = useTransform(wave, (v) => lx(v, 0));
  const headTop = useTransform(wave, (v) => ty(v, 0));
  const t1 = { left: useTransform(wave, (v) => lx(v, 1)), top: useTransform(wave, (v) => ty(v, 1)), o: useTransform(cometOpacity, (o) => o * 0.5) };
  const t2 = { left: useTransform(wave, (v) => lx(v, 2)), top: useTransform(wave, (v) => ty(v, 2)), o: useTransform(cometOpacity, (o) => o * 0.41) };
  const t3 = { left: useTransform(wave, (v) => lx(v, 3)), top: useTransform(wave, (v) => ty(v, 3)), o: useTransform(cometOpacity, (o) => o * 0.32) };
  const t4 = { left: useTransform(wave, (v) => lx(v, 4)), top: useTransform(wave, (v) => ty(v, 4)), o: useTransform(cometOpacity, (o) => o * 0.23) };
  const t5 = { left: useTransform(wave, (v) => lx(v, 5)), top: useTransform(wave, (v) => ty(v, 5)), o: useTransform(cometOpacity, (o) => o * 0.14) };
  const trail = [t1, t2, t3, t4, t5];
  const flare = useTransform(wave, [0.94, 1], [0, 1]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const b = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - b.left) / b.width - 0.5) * 2);
    my.set(((e.clientY - b.top) / b.height - 0.5) * 2);
  };

  return (
    <div
      ref={panelRef}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative hidden overflow-hidden rounded-[2rem] lg:block"
      style={{
        aspectRatio: `${W} / ${H}`,
        containerType: "inline-size",
        border: "1px solid rgba(13,34,238,0.12)",
        boxShadow: "0 30px 60px -40px rgba(13,34,238,0.22)",
        background:
          "radial-gradient(55% 40% at 88% 10%, rgba(215,255,63,0.16), transparent 70%), radial-gradient(45% 35% at 6% 14%, rgba(13,34,238,0.06), transparent 70%), linear-gradient(180deg,#fefefd 0%,#f6f7f4 100%)",
      }}
    >
      <span aria-hidden className="pointer-events-none absolute" style={{ left: "-6%", top: pctY(500), width: "36%", height: pctH(240), borderRadius: "50%", background: "radial-gradient(closest-side, rgba(13,34,238,0.05), transparent)" }} />
      <span aria-hidden className="pointer-events-none absolute" style={{ right: "-8%", top: pctY(540), width: "34%", height: pctH(240), borderRadius: "50%", background: "radial-gradient(closest-side, rgba(215,255,63,0.12), transparent)" }} />
      {!reduce && <Motes />}

      {/* small label + subtitle (the section heading above carries the title) */}
      <div>
        <span
          className="absolute flex items-center gap-3"
          style={{ left: pctX(66), top: pctY(36), color: "#6b6880" }}
        >
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: cq(64), height: cq(64), background: "#e3e8ff", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.8)" }}
          >
            <GraduationCap style={{ width: cq(32), height: cq(32), color: "#2a2f9a" }} strokeWidth={2} />
          </span>
          <span className="font-sans font-semibold uppercase" style={{ fontSize: cq(15), letterSpacing: "0.2em" }}>
            Education &amp; career journey
          </span>
        </span>
        <span aria-hidden className="absolute" style={{ left: pctX(813), top: pctY(40), width: 2, height: pctH(48), background: "#c9c2f2" }} />
        <p className="absolute font-sans leading-snug" style={{ left: pctX(840), top: pctY(40), width: pctW(300), fontSize: cq(18.5), color: "#8a87a0" }}>
          From a student to a professional, building a career in data and tech.
        </p>
      </div>

      {/* path + stems + nodes */}
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
        <Image
          src={WAVE_IMG.src}
          alt=""
          width={WAVE_IMG.w}
          height={WAVE_IMG.h}
          className="h-auto w-full select-none"
          style={{
            mixBlendMode: "multiply",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 5%, #000 78%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0, #000 5%, #000 78%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* comet */}
      {!reduce && (
        <>
          {trail.map((t, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                left: t.left,
                top: t.top,
                width: pctW(14 - i * 2),
                aspectRatio: "1",
                x: "-50%",
                y: "-50%",
                opacity: t.o,
                background: "rgba(13,34,238,0.9)",
                filter: "blur(1px)",
              }}
            />
          ))}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: headLeft,
              top: headTop,
              width: pctW(17),
              aspectRatio: "1",
              x: "-50%",
              y: "-50%",
              opacity: cometOpacity,
              background: "#fff",
              boxShadow: "0 0 0 4px rgba(13,34,238,0.35), 0 0 26px 10px rgba(13,34,238,0.6)",
            }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: pctX(1160),
              top: pctY(566),
              width: pctW(60),
              aspectRatio: "1",
              x: "-50%",
              y: "-50%",
              opacity: flare,
              background: "radial-gradient(closest-side, rgba(13,34,238,0.45), transparent)",
            }}
          />
        </>
      )}

      <ol className="m-0 list-none p-0" aria-label="Timeline">
        {milestones.map((m, i) => (
          <DesktopColumn key={m.title.join(" ")} m={m} index={i} wave={wave} p={p} mx={mx} my={my} reduce={reduce} />
        ))}
      </ol>
    </div>
  );
}

/* ---------- phones and tablets: vertical timeline ---------- */

function MobileItem({ m, index, reduce }: { m: Milestone; index: number; reduce: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 52%"] });
  const rRaw = useTransform(scrollYProgress, (v) => clamp01(v));
  const one = useMotionValue(1);
  const r = useSpring(reduce ? one : rRaw, { stiffness: 120, damping: 20, mass: 0.7 });
  const rPop = useSpring(useTransform(reduce ? one : rRaw, [0.35, 1], [0, 1]), { stiffness: 260, damping: 14 });

  const side = index % 2 === 0 ? 1 : -1;
  const x = useTransform(r, [0, 1], [34 * side, 0]);
  const rot = useTransform(r, [0, 1], [1.8 * side, 0]);
  const blur = useTransform(r, [0, 1], [8, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const { scrollYProgress: full } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const artY = useTransform(full, [0, 1], [8, -8]);
  const year = useYear(rPop, m.year);
  const ringOpacity = useTransform(rRaw, [0.5, 0.75, 1], [0, 0.85, 0]);
  const ringScale = useTransform(rRaw, [0.5, 1], [0.6, 2.8]);
  const { bubble: b, art: a, node: n } = m;
  const live = !reduce;

  return (
    <li ref={ref} className="relative pb-3 last:pb-0">
      {/* node on the line */}
      <span className="absolute -left-[38px] top-5 flex h-5 w-5 items-center justify-center" aria-hidden>
        {live && (
          <motion.span
            className="absolute h-5 w-5 rounded-full"
            style={{ background: `${n.color}44`, border: `1.5px solid ${n.color}`, opacity: ringOpacity, scale: ringScale }}
          />
        )}
        <motion.span
          className="h-3.5 w-3.5 rounded-full"
          style={{
            background: n.color,
            boxShadow: `0 0 0 3px #fff, 0 0 14px 2px ${n.color}`,
            scale: live ? rPop : 1,
          }}
        />
      </span>

      <motion.div
        className="relative overflow-hidden rounded-3xl p-3.5"
        style={{
          x: live ? x : 0,
          rotate: live ? rot : 0,
          opacity: live ? r : 1,
          filter: live ? filter : undefined,
          background: `linear-gradient(180deg, rgba(${m.card.tint},0.45), rgba(255,255,255,0.7))`,
          border: `1px solid rgba(${m.card.border},0.55)`,
          boxShadow: `0 22px 40px -28px rgba(${b.glow},0.6)`,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <motion.span
              className="inline-flex h-8 items-center justify-center rounded-full px-3 font-sans text-[14px] font-bold tabular-nums"
              style={{
                background: b.bg,
                color: b.fg,
                boxShadow: `0 8px 18px -8px rgba(${b.glow},0.7), inset 0 2px 0 rgba(255,255,255,0.85)`,
                scale: live ? rPop : 1,
              }}
            >
              <span className="sr-only">Year: {m.prefix ?? ""}{m.year}</span>
              <span aria-hidden>
                {m.prefix}
                <motion.span>{reduce ? String(m.year) : year}</motion.span>
              </span>
            </motion.span>
            <h4 className="mt-2 font-sans text-[15.5px] font-bold leading-snug" style={{ color: "#14122b" }}>
              {m.title.join(" ")}
            </h4>
            {m.sub.length > 0 && (
              <p className="mt-0.5 font-sans text-[13px] leading-snug" style={{ color: "#7d7a95" }}>
                {m.sub.join(" ")}
              </p>
            )}
            {index === 3 && (
              <Image src="/journey/bt-logo.png" alt="" width={73} height={68} className="mt-2 h-8 w-auto select-none" style={{ mixBlendMode: "multiply" }} />
            )}
          </div>

          <motion.div className="pointer-events-none -my-2 -mr-2 w-[42%] shrink-0" style={{ y: live ? artY : 0 }}>
            <motion.div
              animate={live ? { y: [0, -3, 0] } : { y: 0 }}
              transition={live ? { duration: 5.5 + m.float * 0.6, repeat: Infinity, ease: "easeInOut", delay: m.float * 0.3 } : { duration: 0 }}
            >
              <Image
                src={a.src}
                alt=""
                width={a.w}
                height={a.h}
                sizes="(min-width: 640px) 220px, 42vw"
                className="h-auto w-full select-none"
                style={blendStyle}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </li>
  );
}

function Vertical({ reduce }: { reduce: boolean }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const one = useMotionValue(1);
  const prog = reduce ? one : smooth;
  const dotTop = useTransform(prog, (v) => `${clamp01(v) * 100}%`);
  const dotOpacity = useTransform(prog, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div
      className="relative mx-auto max-w-[34rem] overflow-hidden rounded-[1.75rem] p-4 lg:hidden"
      style={{
        border: "1px solid rgba(13,34,238,0.12)",
        boxShadow: "0 30px 60px -40px rgba(13,34,238,0.22)",
        background:
          "radial-gradient(70% 30% at 90% 4%, rgba(215,255,63,0.18), transparent 70%), linear-gradient(180deg,#fefefd 0%,#f6f7f4 100%)",
      }}
    >
      {!reduce && <Motes />}
      <div className="relative mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: "#e3e8ff", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.8)" }}>
          <GraduationCap className="h-5 w-5" style={{ color: "#2a2f9a" }} strokeWidth={2} />
        </span>
        <div>
          <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#6b6880" }}>
            Education &amp; career journey
          </p>
          <p className="mt-0.5 font-sans text-[13px] leading-snug" style={{ color: "#7d7a95" }}>
            From a student to a professional, building a career in data and tech.
          </p>
        </div>
      </div>

      <ol ref={listRef} className="relative m-0 list-none p-0 pl-10" aria-label="Timeline">
        {/* line: faint track plus the gradient that draws with scroll */}
        <span aria-hidden className="absolute bottom-0 left-[12px] top-3 w-[3px] rounded-full" style={{ background: "rgba(13,34,238,0.18)" }} />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[12px] top-3 w-[3px] origin-top rounded-full"
          style={{
            scaleY: prog,
            background: "linear-gradient(180deg,#14b8a6 0%,#a8d400 28%,#0d22ee 52%,#ffb020 76%,#22c55e 100%)",
            boxShadow: "0 0 12px rgba(13,34,238,0.6)",
          }}
        />
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-[13.5px] h-4 w-4 rounded-full"
            style={{
              top: dotTop,
              x: "-50%",
              y: "-50%",
              opacity: dotOpacity,
              background: "#fff",
              boxShadow: "0 0 0 4px rgba(13,34,238,0.35), 0 0 22px 8px rgba(13,34,238,0.6)",
            }}
          />
        )}
        {milestones.map((m, i) => (
          <MobileItem key={m.title.join(" ")} m={m} index={i} reduce={reduce} />
        ))}
      </ol>
    </div>
  );
}

export default function JourneyTimeline() {
  const reduce = !!useReducedMotion();
  return (
    <>
      <Desktop reduce={reduce} />
      <Vertical reduce={reduce} />
    </>
  );
}
