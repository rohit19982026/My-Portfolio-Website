"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sources = [
  { x: 20,  y: 20,  label: "CRM",         color: "#f59e0b" },
  { x: 140, y: 20,  label: "Trade Data",  color: "#f59e0b" },
  { x: 260, y: 20,  label: "Fund Admin",  color: "#f59e0b" },
  { x: 380, y: 20,  label: "APIs",        color: "#f59e0b" },
];

const midNodes = [
  { x: 170, y: 110, w: 140, h: 40, label: "Fivetran", sub: "Ingestion layer",    color: "#06b6d4" },
  { x: 370, y: 110, w: 140, h: 40, label: "Bronze / Raw",  sub: "As-is landing", color: "#2563eb" },
  { x: 560, y: 80,  w: 140, h: 40, label: "Silver Layer",  sub: "dbt cleaned",   color: "#10b981" },
  { x: 560, y: 150, w: 140, h: 40, label: "Gold Layer",    sub: "dbt aggregated", color: "#10b981" },
];

const sinks = [
  { x: 740, y: 68,  label: "Tableau",  color: "#2563eb" },
  { x: 740, y: 120, label: "Sigma",    color: "#2563eb" },
  { x: 740, y: 172, label: "Data Sci", color: "#6b7280" },
];

const sourceEdges = [
  "M 55 50 Q 55 130 170 130",
  "M 175 50 Q 175 130 200 130",
  "M 295 50 Q 295 130 280 130",
  "M 415 50 Q 415 130 310 130",
];

const midEdges = [
  { d: "M 310 130 L 370 130", delay: 0.5 },
  { d: "M 510 120 Q 535 100 560 100", delay: 0.65 },
  { d: "M 510 140 Q 535 160 560 170", delay: 0.7 },
];

const sinkEdges = [
  { d: "M 700 100 Q 720 88 740 88", delay: 0.85 },
  { d: "M 700 100 L 740 130", delay: 0.9 },
  { d: "M 700 170 Q 720 180 740 182", delay: 0.95 },
];

export default function ELTPipelineDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 860 230"
        className="w-full min-w-[600px]"
        aria-label="ELT pipeline architecture diagram"
      >
        <defs>
          <marker id="arrow-elt" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#bfdbfe" />
          </marker>
        </defs>

        {/* Source → Fivetran edges */}
        {sourceEdges.map((d, i) => (
          <motion.path key={i} d={d} fill="none" stroke="#fde68a" strokeWidth={1.5}
            strokeLinecap="round" markerEnd="url(#arrow-elt)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
          />
        ))}

        {/* Source nodes */}
        {sources.map((s, i) => (
          <motion.g key={s.label}
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <rect x={s.x} y={s.y} width={90} height={30} rx={8} fill={s.color} />
            <text x={s.x + 45} y={s.y + 19} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="inherit">{s.label}</text>
          </motion.g>
        ))}

        {/* Mid → sink edges */}
        {midEdges.map((e, i) => (
          <motion.path key={i} d={e.d} fill="none" stroke="#bfdbfe" strokeWidth={2}
            strokeLinecap="round" markerEnd="url(#arrow-elt)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: e.delay }}
          />
        ))}

        {/* Middle nodes */}
        {midNodes.map((n, i) => (
          <motion.g key={n.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
            style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
          >
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={10} fill={n.color} />
            <text x={n.x + n.w / 2} y={n.y + 15} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="inherit">{n.label}</text>
            <text x={n.x + n.w / 2} y={n.y + 29} textAnchor="middle" fill="#fff" fontSize="9.5" opacity={0.85} fontFamily="inherit">{n.sub}</text>
          </motion.g>
        ))}

        {/* Sink edges */}
        {sinkEdges.map((e, i) => (
          <motion.path key={i} d={e.d} fill="none" stroke="#bfdbfe" strokeWidth={2}
            strokeLinecap="round" markerEnd="url(#arrow-elt)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: e.delay }}
          />
        ))}

        {/* Sink nodes */}
        {sinks.map((s, i) => (
          <motion.g key={s.label}
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}
          >
            <rect x={s.x} y={s.y} width={90} height={30} rx={8} fill={s.color} />
            <text x={s.x + 45} y={s.y + 19} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="inherit">{s.label}</text>
          </motion.g>
        ))}

        {/* Layer labels */}
        {[
          { x: 200, label: "Sources" },
          { x: 240, label: "Ingest" },
          { x: 440, label: "Raw" },
          { x: 630, label: "Transform" },
          { x: 785, label: "Serve" },
        ].map((ph) => (
          <motion.text key={ph.label} x={ph.x} y={215}
            textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="inherit"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1, duration: 0.4 }}
          >{ph.label}</motion.text>
        ))}
      </svg>
    </div>
  );
}
