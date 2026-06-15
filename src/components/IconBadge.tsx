"use client";

import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface IconBadgeProps {
  icon: ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  color: string;
  size?: number;
  iconSize?: number;
  strokeWidth?: number;
  className?: string;
  pulse?: boolean;
}

// Apple-style "app icon" badge — glossy gradient continuous-corner square
// with a white monoline glyph and a color-tinted ambient glow, as seen
// throughout Settings/Health/share sheets. Optional `pulse` adds a soft
// breathing glow ring for "live" status indicators.
export default function IconBadge({ icon: Icon, color, size = 36, iconSize, strokeWidth = 2, className = "", pulse = false }: IconBadgeProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.32),
        background: `linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 55%), ${color}`,
        boxShadow: `0 6px 16px -4px ${color}, inset 0 1px 1px rgba(255,255,255,0.45), inset 0 -1px 1px rgba(0,0,0,0.08)`,
      }}
      whileHover={{ scale: 1.08, rotate: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {pulse && !reduced && (
        <motion.span
          className="absolute pointer-events-none"
          style={{ inset: -4, borderRadius: "inherit", background: color }}
          animate={{ opacity: [0.35, 0, 0.35], scale: [1, 1.25, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      )}
      <Icon size={iconSize ?? Math.round(size * 0.46)} strokeWidth={strokeWidth} color="#FFFFFF" />
    </motion.span>
  );
}
