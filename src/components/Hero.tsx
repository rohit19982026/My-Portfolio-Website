"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const industries = [
  ["EdTech", "K-12 to higher-ed"],
  ["Enterprise SaaS", "Fortune 500"],
  ["Investment Mgmt", "regulated"],
  ["MarTech / AdTech", "B2B2C"],
  ["Software Intelligence", "code analytics"],
  ["Industrial Mfg", "PIPL · global"],
  ["Healthcare", "HIPAA"],
  ["Filtration", "OT / IoT"],
];

function useCounter(target: number, decimals: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1400;
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

function StatCard({
  label,
  target,
  decimals,
  prefix = "",
  suffix = "",
  sub,
  active,
  delay,
}: {
  label: string;
  target: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  sub: string;
  active: boolean;
  delay: number;
}) {
  const val = useCounter(target, decimals, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl p-5"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EAE6F4",
        boxShadow: "0 1px 4px rgba(109,40,217,0.05), 0 2px 12px rgba(0,0,0,0.03)",
      }}
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#9090A8] mb-2">{label}</p>
      <p className="font-display text-[32px] leading-none font-bold tracking-tight text-[#111118]">
        {prefix}{val}{suffix}
      </p>
      <p className="mt-2 text-[11px] text-[#9090A8]">{sub}</p>
    </motion.div>
  );
}

export default function Hero() {
  const proofRef = useRef(null);
  const statsRef = useRef(null);
  const proofInView = useInView(proofRef, { once: true, margin: "-40px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section
      className="min-h-screen flex flex-col pt-[64px] relative overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      {/* Faint ambient glow — top right, barely visible */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)",
          top: -200,
          right: -200,
        }}
      />

      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20 relative z-10">

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-mono tracking-[0.14em] text-[#5A5A78] w-fit"
          style={{ background: "#F0EDFB", border: "1px solid #DDD6FE" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#059669",
              boxShadow: "0 0 8px rgba(5,150,105,0.5)",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          OPEN TO ROLES · BENGALURU IN · UTC+5:30
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-[0.93] tracking-[-0.03em] text-[#111118]"
          style={{ fontSize: "clamp(48px, 8.5vw, 112px)" }}
        >
          Not a coordinator.
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="font-display leading-[0.93] tracking-[-0.03em] mb-8"
          style={{
            fontSize: "clamp(48px, 8.5vw, 112px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#6D28D9",
          }}
        >
          A delivery architect.
        </motion.h1>

        {/* One-line context */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[17px] leading-[1.65] max-w-[620px] mb-10"
          style={{ color: "#4A4A62" }}
        >
          Six data platform programs.{" "}
          <strong className="font-semibold" style={{ color: "#111118" }}>$3.5M+ in contract value.</strong>{" "}
          Every delivery date met, every margin target protected.
        </motion.p>

        {/* ── PROOF OF WORK CARD ── */}
        <motion.div
          ref={proofRef}
          initial={{ opacity: 0, y: 24 }}
          animate={proofInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.05 }}
          className="mb-10 rounded-2xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E4DFF5",
            borderLeft: "4px solid #6D28D9",
            boxShadow: "0 4px 24px rgba(109,40,217,0.07), 0 1px 6px rgba(0,0,0,0.04)",
          }}
        >
          <div className="px-7 py-6 md:px-8 md:py-7">
            {/* Card label */}
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5" style={{ color: "#9090A8" }}>
              A recent example
            </p>

            {/* Story — plain prose, their exact words */}
            <p className="text-[16px] md:text-[17px] leading-[1.75] mb-5" style={{ color: "#111118" }}>
              On a{" "}
              <span className="font-semibold">$1.37M program</span>, my EAC model caught a{" "}
              <span className="font-semibold" style={{ color: "#6D28D9" }}>74%&#8209;budget&nbsp;/&nbsp;51%&#8209;scope mismatch</span>{" "}
              six weeks before SOW expiry — long enough to build the commercial case, present to
              the client CFO, and close an{" "}
              <span className="font-semibold" style={{ color: "#059669" }}>$831K change order</span>{" "}
              before anyone had to cut scope.
            </p>

            <p
              className="text-[14px] italic mb-6"
              style={{ color: "#9090A8" }}
            >
              That&apos;s what financial governance looks like in practice.
            </p>

            {/* Outcome metrics row */}
            <div
              className="flex flex-wrap gap-x-8 gap-y-3 pt-5"
              style={{ borderTop: "1px solid #F0EDF8" }}
            >
              <div>
                <p className="font-display text-[28px] font-bold leading-none tracking-tight" style={{ color: "#059669" }}>$831K</p>
                <p className="text-[11px] mt-1" style={{ color: "#9090A8" }}>change order closed</p>
              </div>
              <div>
                <p className="font-display text-[28px] font-bold leading-none tracking-tight" style={{ color: "#6D28D9" }}>6 weeks</p>
                <p className="text-[11px] mt-1" style={{ color: "#9090A8" }}>before SOW expiry</p>
              </div>
              <div>
                <p className="font-display text-[28px] font-bold leading-none tracking-tight" style={{ color: "#111118" }}>Zero</p>
                <p className="text-[11px] mt-1" style={{ color: "#9090A8" }}>scope cuts</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[12px] font-mono font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "#6D28D9",
              color: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(109,40,217,0.3)",
            }}
          >
            See all six programs →
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[12px] font-mono font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:bg-[#F0EDFB]"
            style={{
              border: "1px solid #C4B5FD",
              color: "#4A4A62",
            }}
          >
            Email me ✉
          </a>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <StatCard label="Portfolio Value"  target={3.5}   decimals={1} prefix="$" suffix="M+" sub="across 6 programs"            active={statsInView} delay={0.08} />
          <StatCard label="Data Programs"    target={6}     decimals={0}                         sub="end-to-end ownership"         active={statsInView} delay={0.16} />
          <StatCard label="Budget Execution" target={99.98} decimals={2}             suffix="%"  sub="avg. across portfolio"         active={statsInView} delay={0.24} />
          <StatCard label="Largest CO"       target={831}   decimals={0} prefix="$" suffix="K"  sub="no scope cuts"                active={statsInView} delay={0.32} />
        </motion.div>

      </div>

      {/* Industries marquee */}
      <div
        className="relative py-4 overflow-hidden"
        style={{
          borderTop: "1px solid #EAE6F4",
          borderBottom: "1px solid #EAE6F4",
          background: "#F5F3FF",
        }}
      >
        <span
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #F5F3FF, transparent)" }}
        />
        <span
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #F5F3FF, transparent)" }}
        />
        <div className="flex animate-marquee">
          {[...industries, ...industries].map(([name, sub], i) => (
            <span key={i} className="inline-flex items-center gap-2 px-5 shrink-0">
              <span className="font-display text-[17px] font-normal tracking-tight" style={{ color: "#4A4A62" }}>{name}</span>
              <span className="font-display italic text-[14px]" style={{ color: "#6D28D9" }}>{sub}</span>
              <span className="ml-3" style={{ color: "#C4B5FD" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
