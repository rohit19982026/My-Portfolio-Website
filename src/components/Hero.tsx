"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroBackdrop from "./HeroBackdrop";

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

function StatCell({
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
      className="p-4 relative"
      style={{
        background: "var(--color-bg-3)",
        border: "1px solid color-mix(in srgb, var(--color-line) 6%, transparent)",
        borderRadius: 10,
      }}
    >
      {/* Bottom accent line */}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-[60%] rounded-bl-[10px]"
        style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}
      />
      <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-text-3 mb-3">{label}</p>
      <p className="font-display text-[38px] leading-none font-bold tracking-tight text-text">
        {prefix}{val}{suffix}
      </p>
      <p className="mt-2 font-heading text-[10px] tracking-[0.1em] text-text-3">{delta}</p>
    </motion.div>
  );
}

export default function Hero() {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section className="min-h-screen flex flex-col pt-[64px] bg-bg relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "var(--color-glow)",
          opacity: "var(--orb-opacity)",
          filter: "blur(80px)",
          top: -200,
          left: -100,
          animation: "orb-float 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "var(--color-pink)",
          opacity: "calc(var(--orb-opacity) * 0.67)",
          filter: "blur(80px)",
          top: 300,
          right: -150,
          animation: "orb-float-2 18s ease-in-out infinite",
        }}
      />

      {/* Agent-orchestration loop, composited behind the content */}
      <HeroBackdrop />

      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20 relative z-10">
        {/* Available pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-heading text-[11px] tracking-[0.16em] text-text-2 w-fit"
          style={{ border: "1px solid color-mix(in srgb, var(--color-accent) 18%, transparent)", background: "color-mix(in srgb, var(--color-accent) 6%, transparent)" }}
        >
          <span
            className="w-2 h-2 rounded-full bg-mint"
            style={{ boxShadow: "0 0 10px var(--color-mint)", animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          AVAILABLE FOR PROGRAMS · BENGALURU · UTC+5:30
        </motion.div>

        {/* The orchestration backdrop carries the hero visually; the heading stays
            in the document for search engines and screen readers. */}
        <h1 className="sr-only">
          Rohit Kumar Singh — Technical Project Manager, Data &amp; AI
        </h1>

        {/* Lead copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="leading-[1.55] text-text-2 max-w-[740px] mb-10"
          style={{ fontSize: "clamp(19px, 2.3vw, 25px)" }}
        >
          I&apos;m a technical project manager at phData. I run data and AI delivery programs
          for enterprise clients —{" "}
          <em className="not-italic text-accent font-semibold">platform migrations, lakehouses, AI deployments</em>.
          {" "}Ten so far, the largest $1.37M. I also{" "}
          <strong className="font-semibold text-text">
            build the AI agents that handle the repetitive parts of my own job
          </strong>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading text-[12px] font-bold uppercase tracking-[0.12em] text-bg transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: "var(--color-accent)", boxShadow: "0 0 28px color-mix(in srgb, var(--color-accent) 40%, transparent)" }}
          >
            See the work →
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-heading text-[12px] font-bold uppercase tracking-[0.12em] text-text transition-all duration-200 hover:bg-accent/8"
            style={{ border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)" }}
          >
            Email me ✉
          </a>
        </motion.div>

        {/* Live status panel */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 24 }}
          animate={panelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-xl p-6 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 5%, transparent), color-mix(in srgb, var(--color-accent) 1%, transparent))",
            border: "1px solid color-mix(in srgb, var(--color-accent) 14%, transparent)",
          }}
        >
          {/* Top accent line */}
          <span
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
          />

          <div className="mb-5 pb-4" style={{ borderBottom: "1px solid color-mix(in srgb, var(--color-line) 5%, transparent)" }}>
            <p className="font-heading text-[11px] uppercase tracking-[0.18em] text-text-3">
              The numbers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCell label="Programs delivered"     target={10}   decimals={0}             suffix="+"   delta="scoped end to end"       active={panelInView} delay={0.15} />
            <StatCell label="Largest program"        target={1.37} decimals={2} prefix="$" suffix="M"   delta="two-year engagement"     active={panelInView} delay={0.25} />
            <StatCell label="Combined contract value" target={3.5} decimals={1} prefix="$" suffix="M+"  delta="across all programs"     active={panelInView} delay={0.35} />
            <StatCell label="Largest pod managed"    target={11}   decimals={0}             suffix=""    delta="engineers, two regions"  active={panelInView} delay={0.45} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
