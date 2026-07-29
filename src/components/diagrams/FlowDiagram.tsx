"use client";

import { motion, useInView } from "framer-motion";
import { useId, useRef } from "react";

export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Use "\n" to wrap onto a second line in narrow (e.g. side-by-side
   *  parallel) nodes. */
  label: string;
  sub: string;
  tone?: "ink" | "blue" | "lime" | "white";
  /** Small tag above the label (e.g. "SKILL", "TOOL CALL") — used instead
   *  of prefixing the label itself when a node is too narrow for both. */
  eyebrow?: string;
  /** "marker" renders a small unlabeled circle — used for graph-style
   *  start/end nodes, not a content node. */
  shape?: "rect" | "marker";
};
export type DiagramEdge = { d: string; delay: number };
export type DiagramBadge = { x: number; y: number; w: number; h: number; label: string };
export type DiagramPhase = { x: number; y: number; label: string };

const toneStyle: Record<string, { fill: string; text: string }> = {
  ink:   { fill: "#1c1c22", text: "#ffffff" },
  blue:  { fill: "#0d22ee", text: "#ffffff" },
  lime:  { fill: "#d7ff3f", text: "#0d0d0f" },
  white: { fill: "#efeee8", text: "#0d0d0f" },
};

/**
 * Turns a waypoint polyline into a path with each interior corner rounded —
 * a graph/node-editor-style smooth elbow connector instead of a sharp right
 * angle. The route (and therefore its guarantee of not crossing through
 * unrelated nodes) is unchanged from the straight-line polyline; only the
 * corners are softened, each by at most half its shortest adjacent segment
 * so the curve never overshoots into a neighboring segment.
 */
export function roundedPath(points: [number, number][], radius = 14): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M${points[0][0]} ${points[0][1]} L${points[1][0]} ${points[1][1]}`;
  }
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const dIn = Math.hypot(cx - px, cy - py);
    const dOut = Math.hypot(nx - cx, ny - cy);
    const rIn = Math.min(radius, dIn / 2);
    const rOut = Math.min(radius, dOut / 2);
    const inX = cx + ((px - cx) / dIn) * rIn;
    const inY = cy + ((py - cy) / dIn) * rIn;
    const outX = cx + ((nx - cx) / dOut) * rOut;
    const outY = cy + ((ny - cy) / dOut) * rOut;
    d += ` L${inX} ${inY} Q${cx} ${cy} ${outX} ${outY}`;
  }
  const [lx, ly] = points[points.length - 1];
  d += ` L${lx} ${ly}`;
  return d;
}

export default function FlowDiagram({
  viewBox,
  nodes,
  edges,
  badge,
  phases,
  ariaLabel,
}: {
  viewBox: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  badge?: DiagramBadge;
  phases?: DiagramPhase[];
  ariaLabel: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const arrowId = useId();

  // The reveal (below) plays once. The execution loop is the "it's still
  // running" signal — a pulse traveling each edge, a faint breathing glow
  // on each node — so the diagram doesn't read as a static picture once
  // revealed. It's only rendered once `inView` flips true, so a plain
  // mount-effect would run before that element exists; a ref callback
  // fires exactly when the node is actually attached, whenever that is.
  // Hidden outright under reduced-motion, same as MagneticCursor/
  // SmoothScrollProvider elsewhere in this codebase.
  const hideIfReducedMotion = (el: SVGGElement | null) => {
    if (el && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
    }
  };

  return (
    <div ref={ref} className="w-full">
      <svg viewBox={viewBox} className="w-full h-auto" aria-label={ariaLabel}>
        <defs>
          <marker id={arrowId} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#d7ff3f" />
          </marker>
        </defs>

        {edges.map((e, i) => (
          <motion.path
            key={i}
            d={e.d}
            fill="none"
            stroke="#d7ff3f"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd={`url(#${arrowId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: e.delay }}
          />
        ))}

        {nodes.map((n, i) => {
          const tone = toneStyle[n.tone ?? "ink"];

          if (n.shape === "marker") {
            const cx = n.x + n.w / 2;
            const cy = n.y + n.h / 2;
            const r = Math.min(n.w, n.h) / 2;
            return (
              <motion.circle
                key={n.id}
                cx={cx}
                cy={cy}
                r={r}
                fill="#0d0d0f"
                stroke="#d7ff3f"
                strokeWidth={2}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            );
          }

          // Label supports "\n" (compact side-by-side nodes wrap to a 2nd
          // line); an optional eyebrow tag stacks above it. Every line is
          // laid out from one line-height table so a plain single-line
          // label+sub node and a compact eyebrow+2-line node use the same
          // vertical-centering math.
          const lines: { text: string; size: number; weight: string; opacity: number; isEyebrow?: boolean }[] = [];
          if (n.eyebrow) lines.push({ text: n.eyebrow, size: 8, weight: "700", opacity: 0.65, isEyebrow: true });
          n.label.split("\n").forEach((l) => lines.push({ text: l, size: 12, weight: "700", opacity: 1 }));
          if (n.sub) lines.push({ text: n.sub, size: 9.5, weight: "400", opacity: 0.75 });
          const lineH = 13;
          const startY = n.y + n.h / 2 - (lines.length * lineH) / 2 + lineH * 0.72;

          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
            >
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={4} fill={tone.fill} stroke="rgba(255,255,255,0.12)" />
              {lines.map((ln, li) => (
                <text
                  key={li}
                  x={n.x + n.w / 2}
                  y={startY + li * lineH}
                  textAnchor="middle"
                  fill={tone.text}
                  fontSize={ln.size}
                  fontWeight={ln.weight}
                  opacity={ln.opacity}
                  letterSpacing={ln.isEyebrow ? "0.08em" : undefined}
                >
                  {ln.text}
                </text>
              ))}
            </motion.g>
          );
        })}

        {badge && (
          <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}>
            <rect x={badge.x} y={badge.y} width={badge.w} height={badge.h} rx={4} fill="#2b1f04" stroke="#f59e0b" strokeWidth={1} />
            <text x={badge.x + badge.w / 2} y={badge.y + badge.h / 2 + 4} textAnchor="middle" fontSize="10.5" fill="#f59e0b" fontWeight="700">
              {"⚠"} {badge.label}
            </text>
          </motion.g>
        )}

        {phases?.map((ph) => (
          <motion.text
            key={ph.label}
            x={ph.x}
            y={ph.y}
            textAnchor="middle"
            fontSize="10.5"
            fill="rgba(255,255,255,0.45)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            {ph.label}
          </motion.text>
        ))}

        {/* Execution loop — only once the reveal has actually started */}
        {inView && (
          <g ref={hideIfReducedMotion}>
            {edges.map((e, i) => (
              <circle key={i} r={3.5} fill="#d7ff3f" opacity={0.9}>
                <animateMotion
                  dur="2.2s"
                  begin={`${e.delay + 0.6}s`}
                  repeatCount="indefinite"
                  path={e.d}
                />
              </circle>
            ))}

            {nodes
              .filter((n) => n.shape !== "marker")
              .map((n, i) => (
                <motion.rect
                  key={n.id}
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={4}
                  fill="none"
                  stroke="#d7ff3f"
                  strokeWidth={2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    delay: 0.5 + i * 0.07,
                    ease: "easeInOut",
                  }}
                />
              ))}
          </g>
        )}
      </svg>
    </div>
  );
}
