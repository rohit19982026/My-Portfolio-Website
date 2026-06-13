"use client";

import { motion } from "framer-motion";

export default function TimelineStrip({
  milestones,
  accent,
}: {
  milestones: { label: string; detail: string }[];
  accent: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 max-w-3xl">
      {milestones.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.18 + i * 0.08 }}
          className="relative pl-4"
          style={{ borderLeft: `2px solid ${accent}40` }}
        >
          <div
            className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
            style={{ background: accent }}
          />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: accent }}>
            {m.label}
          </p>
          <p className="text-[12px] leading-[1.6] text-[#3D3358]">{m.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}
