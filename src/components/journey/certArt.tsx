import type { CSSProperties } from "react";

/*
 * Seven drawings, one per credential, each showing what the credential is
 * about rather than a generic badge. They live inside CertStage's lens and are
 * driven by two numbers CSS derives from the scroll position (see career.css):
 *
 *   --open   0 to 1 as the lens iris opens onto this drawing (it draws on)
 *   --dwell  0 to 1 while this drawing is the one in focus (it plays)
 *
 * Everything is transform, opacity or stroke-dashoffset, so it is cheap, and a
 * visitor with reduced motion simply gets the page's static fallback instead.
 */

const INK = "#0d0d0f";
const BLUE = "#0d22ee";
const LIME = "#d7ff3f";
const AMBER = "#f59e0b";
const ICE = "#cfe3ff";
const PAPER = "#fffefb";

const st = (n: number) => ({ "--st": n }) as CSSProperties;
const css = (o: Record<string, string | number>) => o as CSSProperties;

/* 1 · Claude Certified Architect: an orchestrator handing work to sub-agents
   and tools. Messages travel out along the edges while it is in focus. */
function Architect() {
  const N: [number, number][] = [[78, 92], [322, 92], [78, 308], [322, 308]];
  const T: [number, number][] = [[38, 38], [362, 38], [38, 362], [362, 362]];
  return (
    <g>
      <circle className="cl-spin" cx={200} cy={200} r={72} fill="none" stroke={BLUE} strokeWidth={2.5} strokeDasharray="3 10" strokeLinecap="round" />
      <g className="cl-px1">
        {N.map(([x, y], i) => (
          <line key={`e${i}`} className="cl-dr" pathLength={1} x1={200} y1={200} x2={x} y2={y} stroke={INK} strokeWidth={3} style={st(i)} />
        ))}
        {N.map(([x, y], i) => (
          <line key={`t${i}`} className="cl-dr" pathLength={1} x1={x} y1={y} x2={T[i][0]} y2={T[i][1]} stroke={INK} strokeWidth={2.5} style={st(i + 3)} />
        ))}
        {T.map(([x, y], i) => (
          <rect key={`k${i}`} className="cl-pop" x={x - 14} y={y - 14} width={28} height={28} rx={8} fill={LIME} stroke={INK} strokeWidth={3} style={st(i + 4)} />
        ))}
        {N.map(([x, y], i) => (
          <g key={`n${i}`} className="cl-pop" style={st(i + 2)}>
            <circle cx={x} cy={y} r={29} fill={BLUE} stroke={INK} strokeWidth={3.5} />
            <circle cx={x} cy={y} r={9} fill={PAPER} />
          </g>
        ))}
        <g className="cl-pop" style={st(0)}>
          <rect x={152} y={168} width={96} height={64} rx={18} fill={LIME} stroke={INK} strokeWidth={4} />
          {[0, 45, 90, 135].map((a) => (
            <line key={a} x1={200} y1={186} x2={200} y2={214} stroke={INK} strokeWidth={5} strokeLinecap="round" transform={`rotate(${a} 200 200)`} />
          ))}
        </g>
        {N.map(([x, y], i) => (
          <circle
            key={`m${i}`}
            cx={200}
            cy={200}
            r={7}
            fill={INK}
            style={css({
              translate: `calc(var(--dwell) * ${x - 200}px) calc(var(--dwell) * ${y - 200}px)`,
              opacity: "clamp(0, calc(var(--dwell) * 7), 1)",
            })}
          />
        ))}
      </g>
    </g>
  );
}

/* 2 · PSM I: a sprint as a ring of days that fill in, with the burndown
   falling inside it. */
function Sprint() {
  const CX = 200;
  const CY = 196;
  const ticks = Array.from({ length: 14 }, (_, k) => {
    const a = ((-90 + (k * 360) / 14) * Math.PI) / 180;
    return { k, x1: CX + 98 * Math.cos(a), y1: CY + 98 * Math.sin(a), x2: CX + 134 * Math.cos(a), y2: CY + 134 * Math.sin(a) };
  });
  const op = (k: number) => ({ opacity: `clamp(0, calc(var(--dwell) * 15 - ${k}), 1)` }) as CSSProperties;
  return (
    <g>
      <g style={css({ transformOrigin: `${CX}px ${CY}px`, rotate: "calc(var(--dwell) * 150deg)" })}>
        <path className="cl-dr" pathLength={1} d={`M ${CX} 38 A 158 158 0 0 1 ${CX + 158} ${CY}`} fill="none" stroke={BLUE} strokeWidth={3.5} strokeLinecap="round" />
        <path d={`M ${CX + 158} ${CY} l -9 -14 l 18 0 z`} fill={BLUE} className="cl-pop" />
        <path className="cl-dr" pathLength={1} d={`M ${CX} 354 A 158 158 0 0 1 ${CX - 158} ${CY}`} fill="none" stroke={BLUE} strokeWidth={3.5} strokeLinecap="round" />
        <path d={`M ${CX - 158} ${CY} l -9 14 l 18 0 z`} fill={BLUE} className="cl-pop" />
      </g>
      <g className="cl-px1">
        {ticks.map((t) => (
          <g key={t.k}>
            <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={INK} strokeOpacity={0.16} strokeWidth={11} strokeLinecap="round" />
            <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={INK} strokeWidth={15} strokeLinecap="round" style={op(t.k)} />
            <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={LIME} strokeWidth={8.5} strokeLinecap="round" style={op(t.k)} />
          </g>
        ))}
        <text x={CX} y={166} textAnchor="middle" fontSize={25} fontWeight={800} letterSpacing={5} fill={INK} style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}>
          SPRINT
        </text>
        <path className="cl-dr" pathLength={1} d="M 142 188 V 248 H 262" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" style={st(1)} />
        <path className="cl-dw" pathLength={1} d="M 148 196 L 172 204 L 194 218 L 216 224 L 238 240 L 258 244" fill="none" stroke={BLUE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        <circle className="cl-pop" cx={258} cy={244} r={7} fill={LIME} stroke={INK} strokeWidth={3} style={css({ "--st": 5, opacity: "clamp(0, calc(var(--dwell) * 5 - 3.6), 1)" })} />
      </g>
    </g>
  );
}

/* 3 · ITIL: a service lifecycle as a loop of six stages with the work
   travelling round it, lighting each stage as it passes. */
function Itil() {
  const CX = 200;
  const CY = 200;
  const R = 118;
  const pts = Array.from({ length: 6 }, (_, k) => {
    const a = ((-90 + k * 60) * Math.PI) / 180;
    return { k, x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
  });
  return (
    <g>
      <circle className="cl-dr" pathLength={1} cx={CX} cy={CY} r={158} fill="none" stroke={BLUE} strokeWidth={2.5} strokeDasharray="1" style={st(0)} transform={`rotate(-90 ${CX} ${CY})`} />
      <g className="cl-px1">
        <path className="cl-dr" pathLength={1} d={`M ${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ")} Z`} fill="none" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
        {pts.map((p) => (
          <line key={`s${p.k}`} className="cl-dr" pathLength={1} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={INK} strokeOpacity={0.22} strokeWidth={2.5} style={st(p.k)} />
        ))}
        {pts.map((p) => (
          <g key={p.k} className="cl-pop" style={st(p.k)}>
            <circle cx={p.x} cy={p.y} r={27} fill={PAPER} stroke={INK} strokeWidth={4} />
            <circle cx={p.x} cy={p.y} r={17} fill={LIME} style={css({ opacity: `clamp(0, calc(var(--dwell) * 7.5 - ${p.k}), 1)` })} />
          </g>
        ))}
        <g className="cl-pop" style={st(0)}>
          <circle cx={CX} cy={CY} r={56} fill={BLUE} stroke={INK} strokeWidth={4.5} />
          <text x={CX} y={CY + 24} textAnchor="middle" fontSize={76} fontStyle="italic" fontWeight={800} fill="#fff" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
            i
          </text>
        </g>
        <g style={css({ transformOrigin: `${CX}px ${CY}px`, rotate: "calc(var(--dwell) * 360deg)" })}>
          <circle cx={CX} cy={CY - R} r={11} fill={INK} />
          <circle cx={CX} cy={CY - R} r={5} fill={LIME} />
        </g>
      </g>
    </g>
  );
}

/* 4 · LandingLens Computer Vision: a scene where detection boxes snap onto
   objects and a scan line passes over them. */
function Vision() {
  const boxes = [
    { x: 80, y: 172, w: 84, h: 84, tag: "0.97", tx: 80 },
    { x: 168, y: 170, w: 80, h: 84, tag: "0.94", tx: 168 },
    { x: 276, y: 192, w: 66, h: 66, tag: "0.99", tx: 276 },
  ];
  return (
    <g>
      <g className="cl-px1">
        <rect className="cl-pop" x={52} y={84} width={296} height={216} rx={16} fill="#eef1ff" stroke={INK} strokeWidth={4} />
        <line className="cl-dr" pathLength={1} x1={52} y1={262} x2={348} y2={262} stroke={INK} strokeWidth={3} />
        <circle className="cl-pop" cx={122} cy={214} r={31} fill={AMBER} stroke={INK} strokeWidth={3.5} style={st(1)} />
        <rect className="cl-pop" x={176} y={178} width={64} height={66} rx={12} fill={ICE} stroke={INK} strokeWidth={3.5} style={st(2)} />
        <path className="cl-pop" d="M 286 258 L 340 258 L 313 208 Z" fill={LIME} stroke={INK} strokeWidth={3.5} strokeLinejoin="round" style={st(3)} />
        {boxes.map((b, i) => (
          <g key={b.tag}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={6}
              fill="none"
              stroke={BLUE}
              strokeWidth={4.5}
              style={css({
                transformBox: "fill-box",
                transformOrigin: "center",
                scale: `calc(1 + 0.65 * (1 - clamp(0, calc(var(--open) * 1.6 - ${i * 0.15}), 1)))`,
                opacity: "clamp(0, calc(var(--open) * 3), 1)",
              })}
            />
            <g style={css({ opacity: `clamp(0, calc((var(--dwell) - ${0.1 + i * 0.08}) * 6), 1)` })}>
              <rect x={b.tx} y={b.y - 24} width={46} height={22} rx={6} fill={BLUE} />
              <text x={b.tx + 23} y={b.y - 8} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fff" style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}>
                {b.tag}
              </text>
            </g>
          </g>
        ))}
        <g style={css({ translate: "0 calc(var(--dwell) * 206px)", opacity: "clamp(0, calc(var(--open) * 3), 1)" })}>
          <rect x={52} y={86} width={296} height={9} fill={LIME} stroke={INK} strokeWidth={2} />
        </g>
      </g>
    </g>
  );
}

/* 5 · LandingLens on Snowflake: a snowflake that draws and turns, over data
   bars rising from the base. */
function Snow() {
  const CX = 200;
  const CY = 156;
  const heights = [44, 70, 54, 92, 76, 106, 84];
  return (
    <g>
      <circle className="cl-pop" cx={CX} cy={CY} r={122} fill={ICE} stroke={INK} strokeWidth={3.5} />
      <g className="cl-px1">
        <g style={css({ transformOrigin: `${CX}px ${CY}px`, rotate: "calc(var(--dwell) * 70deg)" })}>
          {Array.from({ length: 6 }, (_, k) => (
            <g key={k} transform={`rotate(${k * 60} ${CX} ${CY})`} stroke={BLUE} strokeWidth={6.5} strokeLinecap="round" fill="none">
              <line className="cl-dr" pathLength={1} x1={CX} y1={CY} x2={CX} y2={CY - 98} style={st(k)} />
              <path className="cl-dr" pathLength={1} d={`M ${CX} ${CY - 62} L ${CX - 22} ${CY - 84} M ${CX} ${CY - 62} L ${CX + 22} ${CY - 84}`} style={st(k + 1)} />
              <path className="cl-dr" pathLength={1} d={`M ${CX} ${CY - 34} L ${CX - 15} ${CY - 49} M ${CX} ${CY - 34} L ${CX + 15} ${CY - 49}`} style={st(k + 2)} />
            </g>
          ))}
        </g>
        <circle className="cl-pop" cx={CX} cy={CY} r={11} fill={LIME} stroke={INK} strokeWidth={3.5} />
        <line className="cl-dr" pathLength={1} x1={52} y1={364} x2={348} y2={364} stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
        {heights.map((h, i) => (
          <rect
            key={i}
            x={62 + i * 40}
            y={364 - h}
            width={26}
            height={h}
            rx={5}
            fill={i % 3 === 2 ? LIME : i % 2 ? BLUE : INK}
            stroke={INK}
            strokeWidth={2.5}
            style={css({
              transformBox: "fill-box",
              transformOrigin: "50% 100%",
              scale: `1 clamp(0, calc(var(--dwell) * 1.7 - ${i * 0.12}), 1)`,
            })}
          />
        ))}
      </g>
    </g>
  );
}

/* 6 · Deeply Practical Project Management: a schedule that builds itself,
   a today line moving across it, the critical path in lime. */
function Gantt() {
  const rows = [
    { x: 56, w: 96, crit: true },
    { x: 118, w: 84, crit: false },
    { x: 152, w: 110, crit: true },
    { x: 214, w: 80, crit: false },
    { x: 262, w: 96, crit: true },
    { x: 296, w: 62, crit: false },
  ];
  const y = (i: number) => 74 + i * 46;
  return (
    <g>
      <g className="cl-px1">
        {Array.from({ length: 6 }, (_, k) => (
          <line key={k} className="cl-dr" pathLength={1} x1={56 + k * 60} y1={56} x2={56 + k * 60} y2={352} stroke={INK} strokeOpacity={0.14} strokeWidth={2} />
        ))}
        {rows.map((r, i) => (
          <rect
            key={i}
            x={r.x}
            y={y(i)}
            width={r.w}
            height={27}
            rx={9}
            fill={r.crit ? LIME : BLUE}
            stroke={INK}
            strokeWidth={3}
            style={css({
              transformBox: "fill-box",
              transformOrigin: "0 50%",
              scale: `clamp(0, calc(var(--open) * 2 - ${i * 0.2}), 1) 1`,
            })}
          />
        ))}
        {rows.slice(0, -1).map((r, i) => {
          const nx = rows[i + 1].x;
          const xe = r.x + r.w;
          const mx = Math.min(xe + 10, nx - 6);
          return (
            <path key={`c${i}`} className="cl-dw" pathLength={1} d={`M ${xe} ${y(i) + 13.5} H ${mx} V ${y(i + 1) + 13.5} H ${nx}`} fill="none" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" style={css({ "--dd": i })} />
          );
        })}
        <g style={css({ translate: "calc(var(--dwell) * 268px) 0" })}>
          <line x1={64} y1={46} x2={64} y2={356} stroke={INK} strokeWidth={8} strokeLinecap="round" />
          <line x1={64} y1={46} x2={64} y2={356} stroke={LIME} strokeWidth={3.5} strokeLinecap="round" />
        </g>
        <rect
          x={337}
          y={337}
          width={22}
          height={22}
          rx={3}
          fill={AMBER}
          stroke={INK}
          strokeWidth={3}
          transform="rotate(45 348 348)"
          style={css({ transformBox: "fill-box", transformOrigin: "center", scale: "clamp(0, calc((var(--dwell) - 0.7) * 6), 1)" })}
        />
      </g>
    </g>
  );
}

/* 7 · Data Warehouse Fundamentals: a star schema, a fact table joined to its
   dimensions, with a query highlight sweeping the fact rows. */
function Warehouse() {
  const dims = [
    { x: 28, y: 40 },
    { x: 280, y: 40 },
    { x: 28, y: 290 },
    { x: 280, y: 290 },
  ];
  const joins: [number, number, number, number][] = [
    [120, 96, 150, 158],
    [280, 96, 250, 158],
    [120, 304, 150, 242],
    [280, 304, 250, 242],
  ];
  return (
    <g>
      <g className="cl-px1">
        {joins.map(([x1, y1, x2, y2], i) => (
          <line key={`j${i}`} className="cl-dr" pathLength={1} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={3.5} strokeLinecap="round" style={st(i)} />
        ))}
        {dims.map((d, i) => (
          <g key={i} className="cl-pop" style={st(i + 1)}>
            <rect x={d.x} y={d.y} width={92} height={70} rx={11} fill={ICE} stroke={INK} strokeWidth={3.5} />
            <path d={`M ${d.x} ${d.y + 22} V ${d.y + 11} a 11 11 0 0 1 11 -11 H ${d.x + 81} a 11 11 0 0 1 11 11 V ${d.y + 22} Z`} fill={BLUE} stroke={INK} strokeWidth={3.5} />
            <path d={`M ${d.x + 46} ${d.y + 22} V ${d.y + 70} M ${d.x} ${d.y + 46} H ${d.x + 92}`} stroke={INK} strokeOpacity={0.5} strokeWidth={2} fill="none" />
          </g>
        ))}
        {joins.map(([, , x2, y2], i) => (
          <circle key={`k${i}`} className="cl-pop" cx={x2} cy={y2} r={7} fill={LIME} stroke={INK} strokeWidth={3} style={st(i + 5)} />
        ))}
        <g className="cl-pop" style={st(0)}>
          <rect x={136} y={146} width={128} height={108} rx={13} fill={PAPER} stroke={INK} strokeWidth={4.5} />
          <path d="M 136 174 V 159 a 13 13 0 0 1 13 -13 H 251 a 13 13 0 0 1 13 13 V 174 Z" fill={LIME} stroke={INK} strokeWidth={4.5} />
          <path d="M 178.7 174 V 254 M 221.3 174 V 254 M 136 202 H 264 M 136 228 H 264" stroke={INK} strokeOpacity={0.55} strokeWidth={2.5} fill="none" />
          <rect x={140} y={205} width={36} height={20} rx={4} fill={LIME} stroke={INK} strokeWidth={2.5} style={css({ translate: "calc(var(--dwell) * 84px) 0" })} />
        </g>
      </g>
    </g>
  );
}

const ART = [Architect, Sprint, Itil, Vision, Snow, Gantt, Warehouse];

export default function Art({ index }: { index: number }) {
  const Piece = ART[index];
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <Piece />
    </svg>
  );
}
