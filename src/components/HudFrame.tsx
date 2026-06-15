"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface HudFrameProps {
  accent: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  scan?: boolean;
}

const BRACKET = 14;

const CORNERS: CSSProperties[] = [
  { top: -1, left: -1, borderWidth: "2px 0 0 2px", borderTopLeftRadius: 6 },
  { top: -1, right: -1, borderWidth: "2px 2px 0 0", borderTopRightRadius: 6 },
  { bottom: -1, left: -1, borderWidth: "0 0 2px 2px", borderBottomLeftRadius: 6 },
  { bottom: -1, right: -1, borderWidth: "0 2px 2px 0", borderBottomRightRadius: 6 },
];

// A HUD-style frame: square-ish panel with targeting-reticle corner
// brackets and a slow vertical scan sweep, replacing the generic
// rounded-2xl soft-card look in console sections.
export default function HudFrame({ accent, children, className = "", style, scan = true }: HudFrameProps) {
  const reduced = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {CORNERS.map((c, i) => (
        <span
          key={i}
          className="absolute pointer-events-none"
          style={{ width: BRACKET, height: BRACKET, borderColor: accent, borderStyle: "solid", ...c }}
        />
      ))}
      {scan && !reduced && (
        <motion.div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ height: "40%", background: `linear-gradient(to bottom, transparent, ${accent}12, transparent)` }}
          animate={{ top: ["-40%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}
      {children}
    </div>
  );
}
