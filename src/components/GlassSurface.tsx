"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  radius?: "sm" | "md" | "lg" | "pill";
  accent?: string;
  interactive?: boolean;
  specular?: boolean;
}

const RADIUS: Record<NonNullable<GlassSurfaceProps["radius"]>, string> = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  pill: "var(--radius-pill)",
};

// Liquid Glass panel: translucent frosted surface with a specular highlight
// sheen, continuous-corner radius, and an optional idle shimmer sweep.
export default function GlassSurface({
  children,
  className = "",
  style,
  radius = "md",
  accent,
  interactive = false,
  specular = false,
}: GlassSurfaceProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden glass ${className}`}
      style={{
        borderRadius: RADIUS[radius],
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        background: accent ? `linear-gradient(160deg, ${accent}14, var(--glass-bg))` : undefined,
        ...style,
      }}
      whileHover={
        interactive
          ? { y: -2, boxShadow: "0 12px 40px rgba(0,0,0,0.08)", transition: { type: "spring", stiffness: 300, damping: 22 } }
          : undefined
      }
    >
      <span className="absolute inset-0 pointer-events-none" style={{ background: "var(--glass-specular)" }} aria-hidden />
      {specular && !reduced && (
        <motion.span
          className="absolute pointer-events-none specular-sheen"
          style={{
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.6) 50%, transparent 65%)",
          }}
          aria-hidden
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
