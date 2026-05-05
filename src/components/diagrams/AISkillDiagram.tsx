"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { id: "psa",      x: 20,  y: 108, w: 100, h: 40, label: "PSA Tool",        sub: "Raw time data",      color: "#6b7280" },
  { id: "json",     x: 170, y: 108, w: 100, h: 40, label: "JSON Input",      sub: "Structured payload", color: "#f59e0b" },
  { id: "orch",     x: 330, y: 108, w: 120, h: 40, label: "Prompt Chain",    sub: "Orchestrator",       color: "#2563eb" },
  { id: "disc",     x: 510, y: 50,  w: 120, h: 40, label: "Discrepancy",     sub: "Detector prompt",    color: "#10b981" },
  { id: "narr",     x: 510, y: 108, w: 120, h: 40, label: "Narrative",       sub: "Generator prompt",   color: "#10b981" },
  { id: "expl",     x: 510, y: 166, w: 120, h: 40, label: "Exception",       sub: "Explainer prompt",   color: "#10b981" },
  { id: "llm",      x: 690, y: 108, w: 100, h: 40, label: "LLM API",         sub: "GPT-4 / Claude",     color: "#6366f1" },
  { id: "review",   x: 690, y: 60,  w: 100, h: 40, label: "PM Review",       sub: "Human gate",         color: "#f59e0b" },
  { id: "finance",  x: 690, y: 156, w: 100, h: 40, label: "Finance Out",     sub: "Sign-off ready",     color: "#2563eb" },
];

const edges = [
  { d: "M 120 128 L 170 128", delay: 0.1 },
  { d: "M 270 128 L 330 128", delay: 0.25 },
  { d: "M 450 118 Q 480 88 510 70",  delay: 0.4 },
  { d: "M 450 128 L 510 128",        delay: 0.45 },
  { d: "M 450 138 Q 480 168 510 186", delay: 0.5 },
  { d: "M 630 70 Q 660 80 690 80",   delay: 0.65 },
  { d: "M 630 128 L 690 128",        delay: 0.7 },
  { d: "M 630 186 Q 660 176 690 176", delay: 0.75 },
  { d: "M 790 80 Q 800 90 790 118",  delay: 0.9 },
  { d: "M 790 148 Q 800 158 790 168", delay: 0.95 },
];

export default function AISkillDiagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 830 230"
        className="w-full min-w-[600px]"
        aria-label="EOM Billing AI Skill architecture diagram"
      >
        <defs>
          <marker id="arrow-ai" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#bfdbfe" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((e, i) => (
          <motion.path key={i} d={e.d} fill="none" stroke="#bfdbfe" strokeWidth={2}
            strokeLinecap="round" markerEnd="url(#arrow-ai)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: e.delay }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g key={n.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + n.h / 2}px` }}
          >
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={10} fill={n.color} />
            <text x={n.x + n.w / 2} y={n.y + 15} textAnchor="middle" fill="#fff"
              fontSize="11" fontWeight="600" fontFamily="inherit">{n.label}</text>
            <text x={n.x + n.w / 2} y={n.y + 29} textAnchor="middle" fill="#fff"
              fontSize="9.5" opacity={0.85} fontFamily="inherit">{n.sub}</text>
          </motion.g>
        ))}

        {/* Guard rail badge */}
        <motion.g
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
        >
          <rect x={310} y={165} width={160} height={26} rx={6} fill="#fef3c7" stroke="#f59e0b" strokeWidth={1} />
          <text x={390} y={182} textAnchor="middle" fontSize="10" fill="#92400e" fontFamily="inherit" fontWeight="600">
            ⚠ Schema validation guardrail
          </text>
        </motion.g>

        {/* Step labels */}
        {[
          { x: 70,  label: "Input" },
          { x: 220, label: "Prep" },
          { x: 390, label: "Prompts" },
          { x: 570, label: "LLM" },
          { x: 740, label: "Output" },
        ].map((ph) => (
          <motion.text key={ph.label} x={ph.x} y={215}
            textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="inherit"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.4 }}
          >{ph.label}</motion.text>
        ))}
      </svg>
    </div>
  );
}
