"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { id: "redshift", x: 30, y: 110, w: 110, h: 44, label: "Amazon Redshift", sub: "2,300+ objects", color: "#f59e0b", textColor: "#fff" },
  { id: "catalog",  x: 190, y: 60,  w: 110, h: 44, label: "Discovery &", sub: "Catalog", color: "#2563eb", textColor: "#fff" },
  { id: "translate",x: 190, y: 160, w: 110, h: 44, label: "SQL", sub: "Translation", color: "#2563eb", textColor: "#fff" },
  { id: "bronze",   x: 360, y: 110, w: 110, h: 44, label: "Bronze Layer", sub: "Delta Lake", color: "#06b6d4", textColor: "#fff" },
  { id: "silver",   x: 530, y: 60,  w: 110, h: 44, label: "Silver Layer", sub: "dbt models", color: "#10b981", textColor: "#fff" },
  { id: "gold",     x: 530, y: 160, w: 110, h: 44, label: "Gold Layer", sub: "Business ready", color: "#10b981", textColor: "#fff" },
  { id: "unity",    x: 700, y: 85,  w: 110, h: 44, label: "Unity Catalog", sub: "Governance", color: "#2563eb", textColor: "#fff" },
  { id: "bi",       x: 700, y: 145, w: 110, h: 44, label: "BI & Data Sci", sub: "End consumers", color: "#6b7280", textColor: "#fff" },
];

const edges = [
  { x1: 140, y1: 132, x2: 190, y2: 82,  d: "M 140 132 Q 165 107 190 82" },
  { x1: 140, y1: 132, x2: 190, y2: 182, d: "M 140 132 Q 165 157 190 182" },
  { x1: 300, y1: 82,  x2: 360, y2: 122, d: "M 300 82 Q 330 102 360 122" },
  { x1: 300, y1: 182, x2: 360, y2: 142, d: "M 300 182 Q 330 162 360 142" },
  { x1: 470, y1: 122, x2: 530, y2: 82,  d: "M 470 122 Q 500 102 530 82" },
  { x1: 470, y1: 142, x2: 530, y2: 162, d: "M 470 142 Q 500 152 530 162" },
  { x1: 640, y1: 82,  x2: 700, y2: 100, d: "M 640 82 Q 670 91 700 100" },
  { x1: 640, y1: 182, x2: 700, y2: 162, d: "M 640 182 Q 670 172 700 162" },
];

export default function MigrationDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 840 240"
        className="w-full min-w-[600px]"
        aria-label="Redshift to Databricks migration architecture diagram"
      >
        {/* Animated edges */}
        {edges.map((e, i) => (
          <motion.path
            key={i}
            d={e.d}
            fill="none"
            stroke="#bfdbfe"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: "easeInOut" }}
            markerEnd="url(#arrow-blue)"
          />
        ))}

        {/* Arrow marker */}
        <defs>
          <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#bfdbfe" />
          </marker>
        </defs>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
          >
            <rect
              x={n.x} y={n.y} width={n.w} height={n.h}
              rx={10} fill={n.color}
            />
            <text
              x={n.x + n.w / 2} y={n.y + 16}
              textAnchor="middle" fill={n.textColor}
              fontSize="11" fontWeight="600" fontFamily="inherit"
            >
              {n.label}
            </text>
            <text
              x={n.x + n.w / 2} y={n.y + 31}
              textAnchor="middle" fill={n.textColor}
              fontSize="9.5" opacity={0.85} fontFamily="inherit"
            >
              {n.sub}
            </text>
          </motion.g>
        ))}

        {/* Phase labels */}
        {[
          { x: 85, label: "Source" },
          { x: 245, label: "Assess" },
          { x: 415, label: "Ingest" },
          { x: 585, label: "Transform" },
          { x: 755, label: "Serve" },
        ].map((ph) => (
          <motion.text
            key={ph.label}
            x={ph.x} y={220}
            textAnchor="middle"
            fontSize="10" fill="#9ca3af" fontFamily="inherit"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.4 }}
          >
            {ph.label}
          </motion.text>
        ))}
      </svg>
    </div>
  );
}
