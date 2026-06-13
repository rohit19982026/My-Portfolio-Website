"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Parses strings like "$5M+", "99.98%", "10+", "60%", ">95%" into
 * a numeric target plus prefix/suffix so the number can be animated
 * while the surrounding characters stay static.
 */
function parseValue(raw: string) {
  const match = raw.match(/(-?\d+(?:\.\d+)?)/);
  if (!match) return { prefix: raw, target: 0, suffix: "", decimals: 0 };

  const numStr = match[0];
  const target = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice((match.index ?? 0) + numStr.length);

  return { prefix, target, suffix, decimals };
}

export default function AnimatedCounter({
  value,
  className,
  style,
  duration = 1.4,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const { prefix, target, suffix, decimals } = parseValue(value);

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) =>
    `${prefix}${decimals ? v.toFixed(decimals) : Math.round(v)}${suffix}`
  );

  useEffect(() => {
    if (inView) {
      motionVal.set(reduceMotion ? target : target);
    }
  }, [inView, motionVal, target, reduceMotion]);

  if (reduceMotion) {
    return (
      <span ref={ref} className={className} style={style}>
        {value}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className} style={style}>
      {display}
    </motion.span>
  );
}
