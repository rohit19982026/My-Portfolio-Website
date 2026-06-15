"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: ReactNode;
  target?: string;
}

const BASE =
  "relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[14px] overflow-hidden whitespace-nowrap";

// Capsule control with the Liquid Glass material — filled accent glass for
// primary actions, translucent frosted capsule for secondary actions.
export default function GlassButton({ href, onClick, children, variant = "primary", className = "", icon, target }: GlassButtonProps) {
  const style =
    variant === "primary"
      ? {
          background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dk))",
          color: "#FFFFFF",
          boxShadow: "0 6px 20px rgba(10,132,255,0.35)",
        }
      : {
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          color: "var(--color-text)",
          backdropFilter: "blur(var(--glass-blur)) saturate(160%)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(160%)",
        };

  const content = (
    <>
      <span className="absolute inset-0 pointer-events-none" style={{ background: "var(--glass-specular)" }} aria-hidden />
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${BASE} ${className}`}
        style={style}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${BASE} ${className}`}
      style={style}
    >
      {content}
    </motion.button>
  );
}
