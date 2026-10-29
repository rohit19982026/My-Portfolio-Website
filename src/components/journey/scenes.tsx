import type { CSSProperties } from "react";

/*
 * The landscape. Everything here is drawn in code (no photographs), in the
 * site's own palette: ink, lime, blue, paper and the one amber. Each piece is
 * its own full-stage <svg> layer so CareerLandscape can move, raise and fade
 * them independently with transforms only. All maths is deterministic so the
 * server and client markup match.
 *
 * Two compositions share the same pieces: "wide" (1600 x 900) for desktop and
 * "tall" (600 x 1000) for phones, where the landmarks are recomposed into the
 * lower half and the copy takes the top.
 */

const INK = "#0d0d0f";
const LIME = "#d7ff3f";
const PAPER = "#fffefb";
const AMBER = "#f59e0b";
const BLUE = "#0d22ee";

const f = (n: number) => n.toFixed(1);

/** A soft ridge line made from three sines, closed along the bottom. */
function ridge(w: number, base: number, amp: number, seed: number, bottom: number, step = 40) {
  const pts: [number, number][] = [];
  for (let x = -step; x <= w + step * 2; x += step) {
    const n =
      Math.sin(x * 0.0042 + seed) * 0.55 + Math.sin(x * 0.0113 + seed * 2.3) * 0.3 + Math.sin(x * 0.027 + seed * 4.1) * 0.15;
    pts.push([x, base - n * amp]);
  }
  let d = `M${f(pts[0][0])},${f(bottom)} L${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q${f(pts[i][0])},${f(pts[i][1])} ${f(mx)},${f(my)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${f(last[0])},${f(bottom)} Z`;
  // the same line without the closing edges, for rim lights
  const crest = d.replace(/^M[^L]+L/, "M").replace(/ L[^L]+,[^L]+ Z$/, "");
  return { fill: d, crest };
}

type Variant = "wide" | "tall";

const BOX: Record<Variant, { w: number; h: number }> = {
  wide: { w: 1600, h: 900 },
  tall: { w: 600, h: 1000 },
};

// Where each landmark stands, per composition. x/y is the foot of the object,
// s its scale. The wide layout keeps landmarks on the side opposite the copy.
const PLACE = {
  wide: {
    ground: 690,
    school: { x: 1150, y: 706, s: 1.55 },
    uni: { x: 440, y: 706, s: 1.5 },
    bt: { x: 1000, y: 720, s: 0.92 },
    city: { x: 30, y: 724, s: 0.86 },
  },
  tall: {
    ground: 770,
    school: { x: 300, y: 786, s: 1.2 },
    uni: { x: 300, y: 786, s: 1.1 },
    bt: { x: 20, y: 800, s: 0.78 },
    city: { x: 10, y: 806, s: 0.72 },
  },
} as const;

function Svg({ v, className, children, style }: { v: Variant; className: string; children: React.ReactNode; style?: CSSProperties }) {
  const { w, h } = BOX[v];
  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      {children}
    </svg>
  );
}

/* ---------- landmarks (each drawn with its foot at 0,0) ---------- */

function School() {
  return (
    <g>
      {/* trees */}
      <rect x={150} y={-44} width={9} height={44} fill={INK} />
      <circle cx={154} cy={-66} r={30} fill={INK} />
      <circle cx={134} cy={-52} r={20} fill={INK} />
      <circle cx={176} cy={-54} r={21} fill={INK} />
      {/* hall */}
      <rect x={-120} y={-84} width={240} height={84} fill={INK} />
      <path d="M-134,-84 L0,-148 L134,-84Z" fill={INK} />
      {/* bell tower with clock */}
      <rect x={-22} y={-200} width={44} height={70} fill={INK} />
      <path d="M-28,-200 L0,-238 L28,-200Z" fill={INK} />
      <circle cx={0} cy={-170} r={12} fill={PAPER} />
      <path d="M0,-170 V-178 M0,-170 L6,-166" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
      {/* flag */}
      <rect x={-2} y={-278} width={3} height={42} fill={INK} />
      <path d="M1,-278 L30,-269 L1,-260Z" fill={LIME} />
      {/* lit windows and door */}
      {[-92, -58, -24, 24, 58, 92].map((x) => (
        <rect key={x} x={x - 8} y={-64} width={16} height={26} fill={LIME} />
      ))}
      <path d="M-13,0 V-28 A13,13 0 0 1 13,-28 V0Z" fill={LIME} />
    </g>
  );
}

function University() {
  const cols = [-132, -79, -26, 26, 79, 132];
  return (
    <g stroke={INK} strokeWidth={2.5} strokeLinejoin="round">
      {/* wings */}
      <rect x={-250} y={-84} width={112} height={84} fill={PAPER} />
      <rect x={138} y={-84} width={112} height={84} fill={PAPER} />
      {[-226, -190, -154, 154, 190, 226].map((x) => (
        <rect key={x} x={x - 7} y={-62} width={14} height={30} fill={INK} stroke="none" />
      ))}
      {/* dome on its drum */}
      <rect x={-56} y={-214} width={112} height={26} fill={PAPER} />
      <path d="M-62,-214 A62,62 0 0 1 62,-214Z" fill={PAPER} />
      <path d="M0,-286 V-300 M-6,-293 H6" strokeLinecap="round" />
      <circle cx={0} cy={-276} r={8} fill={LIME} />
      {/* pediment */}
      <path d="M-170,-194 L0,-244 L170,-194Z" fill={PAPER} transform="translate(0,52)" />
      <rect x={-170} y={-142} width={340} height={18} fill={PAPER} />
      {/* columns */}
      {cols.map((x) => (
        <rect key={x} x={x - 11} y={-124} width={22} height={112} fill={PAPER} />
      ))}
      {/* steps */}
      <rect x={-190} y={-12} width={380} height={12} fill={PAPER} />
      <rect x={-204} y={-2} width={408} height={4} fill={PAPER} />
    </g>
  );
}

const TOWERS_BT = [
  { x: 0, w: 74, h: 176 },
  { x: 86, w: 58, h: 250 },
  { x: 156, w: 86, h: 150 },
  { x: 254, w: 64, h: 318 },
  { x: 330, w: 92, h: 214 },
  { x: 434, w: 56, h: 262 },
  { x: 502, w: 80, h: 168 },
];

function Skyline({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <pattern id={id} width="16" height="20" patternUnits="userSpaceOnUse">
          <rect x="4" y="5" width="7" height="9" fill={AMBER} />
        </pattern>
      </defs>
      {TOWERS_BT.map((t) => (
        <g key={t.x}>
          <rect x={t.x} y={-t.h} width={t.w} height={t.h} fill={INK} />
          <rect x={t.x + 4} y={-t.h + 10} width={t.w - 8} height={t.h - 14} fill={`url(#${id})`} opacity={0.9} />
        </g>
      ))}
      {/* the tallest carries a mast and a lit ring */}
      <path d="M286,-318 V-392" stroke={INK} strokeWidth={4} />
      <circle cx={286} cy={-352} r={14} fill="none" stroke={LIME} strokeWidth={4} />
      <path d="M462,-262 V-306" stroke={INK} strokeWidth={3} />
    </g>
  );
}

const TOWERS_CITY = [
  { x: 0, w: 70, h: 210 },
  { x: 80, w: 96, h: 330 },
  { x: 188, w: 62, h: 190 },
  { x: 262, w: 110, h: 408 },
  { x: 384, w: 70, h: 260 },
  { x: 466, w: 98, h: 350 },
  { x: 576, w: 60, h: 200 },
  { x: 648, w: 88, h: 290 },
  { x: 748, w: 72, h: 180 },
];

function DataCity({ id }: { id: string }) {
  const roofs = TOWERS_CITY.map((t) => [t.x + t.w / 2, -t.h] as const);
  // arcs between neighbouring rooftops, drawn on as the act arrives
  const arcs = roofs.slice(0, -1).map(([x, y], i) => {
    const [nx, ny] = roofs[i + 1];
    const mx = (x + nx) / 2;
    const my = Math.min(y, ny) - 70;
    return `M${f(x)},${f(y)} Q${f(mx)},${f(my)} ${f(nx)},${f(ny)}`;
  });
  return (
    <g>
      <defs>
        <pattern id={id} width="14" height="18" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="6" height="8" fill={LIME} />
        </pattern>
      </defs>
      {TOWERS_CITY.map((t) => (
        <g key={t.x}>
          <rect x={t.x} y={-t.h} width={t.w} height={t.h} fill={INK} />
          <rect x={t.x + 5} y={-t.h + 12} width={t.w - 10} height={t.h - 16} fill={`url(#${id})`} opacity={0.75} />
        </g>
      ))}
      {arcs.map((d, i) => (
        <path key={i} className="cl-arc" d={d} pathLength={1} fill="none" stroke={BLUE} strokeWidth={3.5} strokeLinecap="round" />
      ))}
      {roofs.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={8} fill={LIME} stroke={INK} strokeWidth={2.5} />
      ))}
    </g>
  );
}

/* ---------- stage layers ---------- */

function stars(v: Variant) {
  const { w, h } = BOX[v];
  const out: { x: number; y: number; r: number }[] = [];
  let seed = v === "wide" ? 7 : 11;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const n = v === "wide" ? 70 : 44;
  for (let i = 0; i < n; i++) out.push({ x: rnd() * w, y: rnd() * h * 0.62, r: 0.9 + rnd() * 1.9 });
  return out;
}

/** Everything behind the copy: skies, sun and moon, stars, far ridge,
 *  landmarks, near ridge. */
export function BackScene({ v }: { v: Variant }) {
  const p = PLACE[v];
  const { w, h } = BOX[v];
  const far = ridge(w * 1.2, p.ground - (v === "wide" ? 150 : 170), v === "wide" ? 150 : 130, 1.3, h, 36);
  const mid = ridge(w * 1.2, p.ground + 8, v === "wide" ? 44 : 40, 4.2, h, 30);
  const id = v === "wide" ? "w" : "t";
  return (
    <div className={`cl-scene cl-${v}`}>
      <Svg v={v} className="cl-layer cl-stars">
        {stars(v).map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={BLUE} />
        ))}
      </Svg>
      <Svg v={v} className="cl-layer cl-far">
        <g transform={`translate(${-w * 0.1},0)`}>
          <path d={far.fill} fill={BLUE} fillOpacity={0.15} />
          <path className="cl-rim cl-rim-night" d={far.crest} fill="none" stroke={BLUE} strokeWidth={2.5} />
          <path className="cl-rim cl-rim-dusk" d={far.crest} fill="none" stroke={AMBER} strokeWidth={2.5} />
        </g>
      </Svg>
      <Svg v={v} className="cl-layer cl-lm cl-lm-school">
        <g transform={`translate(${p.school.x},${p.school.y}) scale(${p.school.s})`}>
          <School />
        </g>
      </Svg>
      <Svg v={v} className="cl-layer cl-lm cl-lm-uni">
        <g transform={`translate(${p.uni.x},${p.uni.y}) scale(${p.uni.s})`}>
          <University />
        </g>
      </Svg>
      <Svg v={v} className="cl-layer cl-lm cl-lm-bt">
        <g transform={`translate(${p.bt.x},${p.bt.y}) scale(${p.bt.s})`}>
          <Skyline id={`win-bt-${id}`} />
        </g>
      </Svg>
      <Svg v={v} className="cl-layer cl-lm cl-lm-city">
        <g transform={`translate(${p.city.x},${p.city.y}) scale(${p.city.s})`}>
          <DataCity id={`win-city-${id}`} />
        </g>
      </Svg>
      <Svg v={v} className="cl-layer cl-mid">
        <g transform={`translate(${-w * 0.1},0)`}>
          <path d={mid.fill} fill={BLUE} fillOpacity={0.3} />
          <path className="cl-rim cl-rim-night" d={mid.crest} fill="none" stroke={BLUE} strokeWidth={2.5} />
          <path className="cl-rim cl-rim-dusk" d={mid.crest} fill="none" stroke={AMBER} strokeWidth={2.5} />
        </g>
      </Svg>
    </div>
  );
}

/** Things in front of the copy: the near ridge the type rises from behind,
 *  and at the very end a ridge in the next section's own colour, so the scene
 *  hands over to the page instead of ending on a hard edge. */
export function FrontScene({ v }: { v: Variant }) {
  const p = PLACE[v];
  const { w, h } = BOX[v];
  const near = ridge(w * 1.2, p.ground + (v === "wide" ? 108 : 120), v === "wide" ? 38 : 34, 7.7, h, 34);
  const end = ridge(w * 1.2, p.ground + (v === "wide" ? 92 : 104), v === "wide" ? 30 : 26, 2.1, h, 34);
  return (
    <div className={`cl-scene cl-${v}`}>
      <Svg v={v} className="cl-layer cl-near">
        <g transform={`translate(${-w * 0.1},0)`}>
          <path d={near.fill} fill={BLUE} />
          <path d={near.crest} fill="none" stroke={LIME} strokeWidth={4} />
        </g>
      </Svg>
      <Svg v={v} className="cl-layer cl-handoff">
        <g transform={`translate(${-w * 0.1},0)`}>
          <path d={end.fill} fill="var(--color-surface-alt)" />
        </g>
      </Svg>
    </div>
  );
}
