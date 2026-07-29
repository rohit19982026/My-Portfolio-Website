"use client";

import { motion, useInView } from "framer-motion";
import { useId, useRef } from "react";

export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
  tone?: "ink" | "blue" | "lime" | "white";
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
            markerEnd={`url(#${arrowId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: e.delay }}
          />
        ))}

        {nodes.map((n, i) => {
          const tone = toneStyle[n.tone ?? "ink"];
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
            >
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={4} fill={tone.fill} stroke="rgba(255,255,255,0.12)" />
              <text x={n.x + n.w / 2} y={n.y + n.h / 2 - 2} textAnchor="middle" fill={tone.text} fontSize="13" fontWeight="700">
                {n.label}
              </text>
              <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 14} textAnchor="middle" fill={tone.text} fontSize="10.5" opacity={0.75}>
                {n.sub}
              </text>
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

            {nodes.map((n, i) => (
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
