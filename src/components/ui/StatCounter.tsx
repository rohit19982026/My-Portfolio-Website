"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function useCounter(target: number, decimals: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(parseFloat((target * eased).toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, decimals]);
  return val;
}

export default function StatCounter({
  label,
  target,
  decimals,
  prefix,
  suffix,
  delta,
  active,
  delay,
}: {
  label: string;
  target: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  delta: string;
  active: boolean;
  delay: number;
}) {
  const val = useCounter(target, decimals, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="p-4 relative rounded-card"
      style={{ background: "color-mix(in srgb, var(--color-white) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--color-white) 12%, transparent)" }}
    >
      <span className="absolute bottom-0 left-0 h-[2px] w-[60%]" style={{ background: "linear-gradient(90deg, var(--color-lime), transparent)" }} />
      <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-white/60 mb-3">{label}</p>
      <p className="font-display text-[38px] leading-none font-bold tracking-tight text-white">
        {prefix}{val}{suffix}
      </p>
      <p className="mt-2 font-heading text-[10px] tracking-[0.1em] text-white/60">{delta}</p>
    </motion.div>
  );
}
