"use client";

import { motion } from "framer-motion";
import type { CaseDiagramKind } from "@/lib/caseStudies";

/*
 * One small picture per case study, drawn in when the case opens. They show
 * the shape of the problem only; there are no numbers in them.
 */

const INK = "#0d0d1f";
const SOFT = "rgba(13,13,31,0.55)";
const LINE = "rgba(13,13,31,0.14)";
const EASE = [0.2, 0.7, 0.2, 1] as const;

const draw = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { duration: 0.9, ease: EASE, delay }, opacity: { duration: 0.2, delay } },
});
const pop = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring" as const, stiffness: 320, damping: 18, delay },
});
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const label = { fontSize: 10.5, fill: SOFT, fontWeight: 500 } as const;

function Lanes({ accent }: { accent: string }) {
  return (
    <>
      <motion.text x={10} y={46} style={{ ...label, fill: INK, fontWeight: 600 }} {...fade(0.05)}>Account setup</motion.text>
      <motion.text x={10} y={122} style={{ ...label, fill: INK, fontWeight: 600 }} {...fade(0.1)}>Data pipelines</motion.text>
      <motion.path d="M10 62 H196 C236 62 238 94 268 94" fill="none" stroke={accent} strokeWidth={2.5} strokeLinecap="round" {...draw(0.1)} />
      <motion.path d="M10 138 H196 C236 138 238 106 268 106" fill="none" stroke={accent} strokeOpacity={0.55} strokeWidth={2.5} strokeLinecap="round" {...draw(0.25)} />

      {/* where the unmasked HR data was found */}
      <motion.g {...pop(0.55)} style={{ transformOrigin: "86px 62px" }}>
        <path d="M86 50 L97 54 V62 C97 69 92 73 86 76 C80 73 75 69 75 62 V54 Z" fill="#fff" stroke={accent} strokeWidth={2} />
        <path d="M81.5 62 L85 65.5 L91 59" fill="none" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      <motion.text x={86} y={92} textAnchor="middle" style={label} {...fade(0.7)}>HR data found</motion.text>

      {/* tasks the client ran themselves */}
      <motion.g {...pop(0.75)} style={{ transformOrigin: "154px 62px" }}>
        <rect x={148} y={56} width={12} height={12} rx={2} fill="#fff" stroke={INK} strokeWidth={1.6} transform="rotate(45 154 62)" />
      </motion.g>
      <motion.text x={154} y={44} textAnchor="middle" style={label} {...fade(0.85)}>Client sets up access</motion.text>
      <motion.g {...pop(0.85)} style={{ transformOrigin: "134px 138px" }}>
        <rect x={128} y={132} width={12} height={12} rx={2} fill="#fff" stroke={INK} strokeWidth={1.6} transform="rotate(45 134 138)" />
      </motion.g>
      <motion.text x={134} y={162} textAnchor="middle" style={label} {...fade(0.95)}>SAP, lab and plant data</motion.text>

      <motion.circle cx={284} cy={100} r={12} fill={accent} {...pop(1)} />
      <motion.text x={284} y={130} textAnchor="middle" style={{ ...label, fill: INK, fontWeight: 600 }} {...fade(1.1)}>One update</motion.text>
      <motion.text x={284} y={143} textAnchor="middle" style={label} {...fade(1.15)}>to leadership</motion.text>
    </>
  );
}

function Trade({ accent }: { accent: string }) {
  return (
    <>
      <defs>
        <pattern id="wait-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#fff" />
          <rect width="2.5" height="6" fill={accent} fillOpacity={0.35} />
        </pattern>
      </defs>
      <motion.g {...pop(0.05)} style={{ transformOrigin: "70px 36px" }}>
        <rect x={8} y={18} width={124} height={36} rx={18} fill="#fff" stroke={LINE} />
        <text x={70} y={40} textAnchor="middle" style={{ ...label, fill: INK, fontWeight: 600 }}>Jira kept current</text>
      </motion.g>
      <motion.g {...pop(0.2)} style={{ transformOrigin: "250px 36px" }}>
        <rect x={188} y={18} width={124} height={36} rx={18} fill="#fff" stroke={LINE} />
        <text x={250} y={40} textAnchor="middle" style={{ ...label, fill: INK, fontWeight: 600 }}>No status meeting</text>
      </motion.g>
      <motion.path d="M140 30 H180" stroke={accent} strokeWidth={2} strokeLinecap="round" fill="none" {...draw(0.35)} />
      <motion.path d="M174 25 L180 30 L174 35" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" {...draw(0.55)} />
      <motion.path d="M180 42 H140" stroke={accent} strokeWidth={2} strokeLinecap="round" fill="none" {...draw(0.45)} />
      <motion.path d="M146 37 L140 42 L146 47" stroke={accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" {...draw(0.65)} />

      <motion.text x={8} y={98} style={{ ...label, fill: INK, fontWeight: 600 }} {...fade(0.6)}>Time a ticket takes</motion.text>
      <motion.rect x={8} y={108} width={168} height={24} rx={6} fill={accent} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease: EASE, delay: 0.7 }} style={{ transformOrigin: "8px 120px" }} />
      <motion.rect x={180} y={108} width={132} height={24} rx={6} fill="url(#wait-hatch)" stroke={accent} strokeOpacity={0.5} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, ease: EASE, delay: 1.1 }} style={{ transformOrigin: "180px 120px" }} />
      <motion.text x={92} y={152} textAnchor="middle" style={label} {...fade(1.2)}>Being worked on</motion.text>
      <motion.text x={246} y={152} textAnchor="middle" style={label} {...fade(1.5)}>Stuck, waiting on others</motion.text>
    </>
  );
}

function Fork({ accent }: { accent: string }) {
  const branches = [
    { y: 30, a: "In scope", b: "we do it" },
    { y: 90, a: "Out of scope", b: "change order" },
    { y: 150, a: "Not feasible", b: "an alternative" },
  ];
  return (
    <>
      <motion.g {...pop(0.05)} style={{ transformOrigin: "52px 90px" }}>
        <rect x={6} y={72} width={92} height={36} rx={18} fill={accent} />
        <text x={52} y={94} textAnchor="middle" style={{ ...label, fill: "#fff", fontWeight: 700 }}>New request</text>
      </motion.g>
      {branches.map((br, i) => (
        <g key={br.a}>
          <motion.path
            d={`M98 90 C130 90 124 ${br.y} 156 ${br.y}`}
            fill="none"
            stroke={accent}
            strokeOpacity={0.6}
            strokeWidth={2}
            strokeLinecap="round"
            {...draw(0.25 + i * 0.15)}
          />
          <motion.g {...pop(0.6 + i * 0.15)} style={{ transformOrigin: `234px ${br.y}px` }}>
            <rect x={158} y={br.y - 16} width={156} height={32} rx={10} fill="#fff" stroke={LINE} />
            <text x={170} y={br.y + 4} style={{ ...label, fill: INK, fontWeight: 700 }}>
              {br.a}
              <tspan style={{ fontWeight: 500, fill: SOFT }}>{`  ${br.b}`}</tspan>
            </text>
          </motion.g>
        </g>
      ))}
    </>
  );
}

function Board({ accent }: { accent: string }) {
  const tiles = [0, 1, 2, 3, 4];
  const hot = 2;
  return (
    <>
      {tiles.map((i) => {
        const x = 12 + i * 61;
        const isHot = i === hot;
        return (
          <g key={i}>
            <motion.path
              d={`M160 138 L${x + 26} 62`}
              stroke={isHot ? "#e5484d" : accent}
              strokeOpacity={isHot ? 0.9 : 0.35}
              strokeWidth={isHot ? 2.2 : 1.5}
              strokeDasharray={isHot ? undefined : "4 4"}
              fill="none"
              {...draw(0.35 + i * 0.08)}
            />
            <motion.g {...pop(0.05 + i * 0.07)} style={{ transformOrigin: `${x + 26}px 40px` }}>
              <rect x={x} y={20} width={52} height={42} rx={9} fill="#fff" stroke={isHot ? "#e5484d" : LINE} strokeWidth={isHot ? 1.6 : 1} />
              <rect x={x + 9} y={40} width={34} height={4} rx={2} fill="rgba(13,13,31,0.12)" />
              <rect x={x + 9} y={49} width={22} height={4} rx={2} fill="rgba(13,13,31,0.08)" />
              <circle cx={x + 12} cy={30} r={4} fill={isHot ? "#e5484d" : "#22a55a"} />
            </motion.g>
            {isHot && (
              <motion.circle
                cx={x + 12}
                cy={30}
                r={4}
                fill="none"
                stroke="#e5484d"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                style={{ transformOrigin: `${x + 12}px 30px` }}
              />
            )}
          </g>
        );
      })}
      <motion.text x={12 + hot * 61 + 26} y={12} textAnchor="middle" style={{ ...label, fill: "#c4363b", fontWeight: 700 }} {...fade(0.5)}>Escalated</motion.text>
      <motion.circle cx={160} cy={146} r={17} fill={accent} {...pop(0.7)} />
      <motion.text x={160} y={150} textAnchor="middle" style={{ ...label, fill: "#fff", fontWeight: 700 }} {...fade(0.85)}>Me</motion.text>
    </>
  );
}

const DESCRIPTIONS: Record<CaseDiagramKind, string> = {
  lanes:
    "Two projects, the account setup and the data pipelines, meeting in one update to the client's leadership. The account setup marks where unmasked HR data was found and the access the client set up.",
  trade:
    "Keeping Jira current traded for no status meetings. Below, the time a ticket takes split into time being worked on and time stuck waiting on others.",
  fork: "A new request splits three ways: in scope we do it, out of scope gets a change order, not feasible gets an alternative.",
  board: "Five program tiles, one marked as escalated, all connected to me.",
};

export default function CaseDiagram({ kind, accent }: { kind: CaseDiagramKind; accent: string }) {
  return (
    <svg viewBox="0 0 320 172" role="img" aria-label={DESCRIPTIONS[kind]} className="h-auto w-full font-sans">
      {kind === "lanes" && <Lanes accent={accent} />}
      {kind === "trade" && <Trade accent={accent} />}
      {kind === "fork" && <Fork accent={accent} />}
      {kind === "board" && <Board accent={accent} />}
    </svg>
  );
}
