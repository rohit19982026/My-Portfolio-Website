import type { CSSProperties, ReactNode } from "react";
import { SiClaude, SiSnowflake } from "react-icons/si";
import { ClipboardList, Database, RefreshCcw, ScanEye } from "lucide-react";
import { certs } from "@/lib/career";

/*
 * The certifications as enamel medals on lanyard ribbons.
 *
 * Each medal is one drawn object: a shadowed enamel disc with a stitched
 * edge, the issuer set round its top edge, an icon in the middle, a metal ring
 * and a strap. Two ribbons sag across the screen (four medals, then three).
 * As a ribbon arrives it draws across and its medals drop from the strap and
 * swing to rest, a damped pendulum scrubbed by scroll (see career.css, so it
 * reverses if you scroll back). Phones get shorter ribbons, two medals each.
 */

type Tone = { fill: string; icon: string };

// One enamel colour per medal, alternating the site's lime, blue, amber, ink
// and paper so no two neighbours match.
const LOOK: { tone: Tone; icon: ReactNode }[] = [
  { tone: { fill: "#d7ff3f", icon: "#0d0d0f" }, icon: <SiClaude /> },
  { tone: { fill: "#0d22ee", icon: "#ffffff" }, icon: <RefreshCcw strokeWidth={2.2} /> },
  {
    tone: { fill: "#f59e0b", icon: "#0d0d0f" },
    icon: <span className="cl-itil">i</span>,
  },
  { tone: { fill: "#0d0d0f", icon: "#d7ff3f" }, icon: <ScanEye strokeWidth={2} /> },
  { tone: { fill: "#cfe3ff", icon: "#0d22ee" }, icon: <SiSnowflake /> },
  { tone: { fill: "#fffefb", icon: "#0d0d0f" }, icon: <ClipboardList strokeWidth={2} /> },
  { tone: { fill: "#e6ff7d", icon: "#0d0d0f" }, icon: <Database strokeWidth={2} /> },
];

const INK = "#0d0d0f";
const BLUE = "#0d22ee";
const LIME = "#d7ff3f";

function Medal({ id, tone, label }: { id: string; tone: Tone; label: string }) {
  return (
    <svg className="cl-pin" viewBox="0 0 140 172" aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M 29 104 A 41 41 0 0 1 111 104" />
      </defs>
      {/* strap and ring */}
      <rect x={61} y={0} width={18} height={40} fill={BLUE} />
      <path d="M70,2 V38" stroke={LIME} strokeWidth={2} strokeDasharray="4 4" />
      <circle cx={70} cy={42} r={9} fill="none" stroke={INK} strokeWidth={4} />
      {/* medal: offset shadow, rim, enamel, stitched edge */}
      <circle cx={70} cy={112} r={62} fill={INK} opacity={0.14} />
      <circle cx={70} cy={104} r={62} fill={INK} />
      <circle cx={70} cy={104} r={56} fill={tone.fill} />
      <circle cx={70} cy={104} r={51} fill="none" stroke={tone.icon} strokeOpacity={0.4} strokeWidth={2} strokeDasharray="1.5 5.5" strokeLinecap="round" />
      {/* issuer on the top edge */}
      <text fill={tone.icon} fontSize={10.5} fontWeight={800} letterSpacing={2.4} textAnchor="middle" style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}>
        <textPath href={`#${id}`} startOffset="50%">
          {label}
        </textPath>
      </text>
      {/* small star at the foot */}
      <path d="M70,138 c.8,5 4,8.2 9,9 c-5,.8 -8.2,4 -9,9 c-.8,-5 -4,-8.2 -9,-9 c5,-.8 8.2,-4 9,-9Z" fill={tone.icon} opacity={0.85} transform="translate(0,-3) scale(1)" />
      {/* enamel highlight */}
      <path d="M32,84 A44,44 0 0 1 78,58" fill="none" stroke="#ffffff" strokeOpacity={0.55} strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
}

function Rail({ variant, row, start, count, sag }: { variant: string; row: number; start: number; count: number; sag: number }) {
  const top = 24;
  const h = top + sag + 26;
  return (
    <div
      className="cl-rail"
      data-flow="head"
      style={{ "--n": count, "--h": `${h}px` } as CSSProperties}
    >
      <svg className="cl-ribbon" viewBox={`0 0 1000 ${h}`} preserveAspectRatio="none" aria-hidden="true" focusable="false" style={{ height: h }}>
        <path d={`M-20,${top} Q500,${top + sag * 2} 1020,${top}`} fill="none" stroke={BLUE} strokeWidth={24} vectorEffect="non-scaling-stroke" />
        <path d={`M-20,${top} Q500,${top + sag * 2} 1020,${top}`} fill="none" stroke={LIME} strokeWidth={2.5} strokeDasharray="9 8" vectorEffect="non-scaling-stroke" />
      </svg>
      <ul className="cl-badges">
        {Array.from({ length: count }, (_, i) => {
          const idx = start + i;
          const c = certs[idx];
          const t = (i + 0.5) / count;
          const ry = top + sag * 4 * t * (1 - t);
          return (
            <li
              key={c.name}
              className="cl-badge"
              style={
                {
                  "--i": i,
                  "--t": t,
                  "--ry": `${ry}px`,
                  "--dir": i % 2 ? -1 : 1,
                } as CSSProperties
              }
            >
              <div className="cl-pin-wrap">
                <Medal id={`m-${variant}-${row}-${i}`} tone={LOOK[idx].tone} label={c.issuer.toUpperCase()} />
                <span className="cl-pin-icon" style={{ color: LOOK[idx].tone.icon }} aria-hidden="true">
                  {LOOK[idx].icon}
                </span>
              </div>
              <p className="cl-pin-txt">
                <strong>{c.name}</strong>
                <span>{c.issuer}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Desktop: ribbons of 4 and 3. Phones: ribbons of 2, 2, 2 and 1. */
export default function Medals() {
  return (
    <>
      <div className="cl-rails cl-rails-wide">
        <Rail variant="w" row={0} start={0} count={4} sag={74} />
        <Rail variant="w" row={1} start={4} count={3} sag={74} />
      </div>
      <div className="cl-rails cl-rails-tall">
        <Rail variant="t" row={0} start={0} count={2} sag={40} />
        <Rail variant="t" row={1} start={2} count={2} sag={40} />
        <Rail variant="t" row={2} start={4} count={2} sag={40} />
        <Rail variant="t" row={3} start={6} count={1} sag={40} />
      </div>
    </>
  );
}
