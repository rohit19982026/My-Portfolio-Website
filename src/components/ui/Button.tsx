"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  target?: string;
  rel?: string;
};

function useMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.4);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { style: { x: springX, y: springY }, handleMove, handleLeave };
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  target,
  rel,
}: ButtonProps) {
  const { style, handleMove, handleLeave } = useMagnetic();

  const sizeClasses = size === "sm" ? "px-4 py-2 text-[11px]" : "px-6 py-3.5 text-[12px]";
  const variantClasses =
    variant === "primary"
      ? "bg-lime text-ink"
      : "bg-transparent text-white border-2 border-white/30 hover:border-lime hover:text-lime";
  const classes = `inline-flex items-center gap-2 rounded-pill font-heading font-bold uppercase tracking-[0.12em] transition-colors duration-[var(--duration-base)] ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.97 }}
        style={style}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      style={style}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
