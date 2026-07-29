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
export type DiagramPhase = { x: number; label: string };

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

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg viewBox={viewBox} className="w-full min-w-[560px]" aria-label={ariaLabel}>
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
              <text x={n.x + n.w / 2} y={n.y + 16} textAnchor="middle" fill={tone.text} fontSize="11" fontWeight="700">
                {n.label}
              </text>
              <text x={n.x + n.w / 2} y={n.y + 30} textAnchor="middle" fill={tone.text} fontSize="9.5" opacity={0.75}>
                {n.sub}
              </text>
            </motion.g>
          );
        })}

        {badge && (
          <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}>
            <rect x={badge.x} y={badge.y} width={badge.w} height={badge.h} rx={4} fill="#2b1f04" stroke="#f59e0b" strokeWidth={1} />
            <text x={badge.x + badge.w / 2} y={badge.y + badge.h / 2 + 4} textAnchor="middle" fontSize="10" fill="#f59e0b" fontWeight="700">
              {"⚠"} {badge.label}
            </text>
          </motion.g>
        )}

        {phases?.map((ph) => (
          <motion.text
            key={ph.label}
            x={ph.x}
            y={220}
            textAnchor="middle"
            fontSize="10"
            fill="rgba(255,255,255,0.45)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            {ph.label}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}
