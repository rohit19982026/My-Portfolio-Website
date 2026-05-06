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
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="p-4 relative"
      style={{
        background: "rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
      }}
    >
      <span
        className="absolute bottom-0 left-0 h-[2px] w-[55%] rounded-bl-[10px]"
        style={{ background: "linear-gradient(90deg, #A78BFA, transparent)" }}
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B6B8A] mb-2">{label}</p>
      <p className="font-display text-[34px] leading-none font-bold tracking-tight text-[#EDE9FE]">
        {prefix}{val}{suffix}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.08em] text-[#6B6B8A]">{sub}</p>
    </motion.div>
  );
}

export default function Hero() {
  const proofRef = useRef(null);
  const statsRef = useRef(null);
  const proofInView = useInView(proofRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section className="min-h-screen flex flex-col pt-[64px] bg-[#0A0A12] relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 560, height: 560,
          background: "#8B5CF6", opacity: 0.1,
          filter: "blur(90px)", top: -180, left: -80,
          animation: "orb-float 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 440, height: 440,
          background: "#F0ABFC", opacity: 0.07,
          filter: "blur(80px)", top: 340, right: -120,
          animation: "orb-float-2 18s ease-in-out infinite",
        }}
      />

      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20 relative z-10">

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.16em] text-[#A8A4C7] w-fit"
          style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.06)" }}
        >
          <span
            className="w-2 h-2 rounded-full bg-[#6EE7B7]"
            style={{ boxShadow: "0 0 10px #6EE7B7", animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          OPEN TO ROLES · BENGALURU IN · UTC+5:30
        </motion.div>

        {/* Headline — two lines, distinct treatment */}
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display leading-[0.92] tracking-[-0.03em] text-[#EDE9FE]"
            style={{ fontSize: "clamp(52px, 9vw, 120px)" }}
          >
            Not a coordinator.
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-display leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(52px, 9vw, 120px)" }}
          >
            <span
              className="italic font-normal"
              style={{
                background: "linear-gradient(90deg, #A78BFA 0%, #F0ABFC 50%, #A78BFA 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 6s linear infinite",
              }}
            >
              A delivery architect.
            </span>
          </motion.h1>
        </div>

        {/* One-line context */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-[17px] leading-[1.6] text-[#A8A4C7] max-w-[640px] mb-10"
        >
          Six data platform programs.{" "}
          <span className="text-[#EDE9FE] font-semibold">$3.5M+ in contract value.</span>{" "}
          Every delivery date met, every margin target protected.
        </motion.p>

        {/* ── PROOF OF WORK CARD ── */}
        <motion.div
          ref={proofRef}
          initial={{ opacity: 0, y: 28 }}
          animate={proofInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mb-10 relative rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(167,139,250,0.07), rgba(167,139,250,0.02))",
            border: "1px solid rgba(167,139,250,0.18)",
          }}
        >
          {/* Top accent */}
          <span
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, #A78BFA, transparent 60%)" }}
          />
          {/* Left accent bar */}
          <span
            className="absolute top-0 left-0 bottom-0 w-[3px]"
            style={{ background: "linear-gradient(180deg, #A78BFA, rgba(167,139,250,0.1))" }}
          />

          <div className="pl-8 pr-6 py-6">
            {/* Card header */}
            <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B8A]">
                // PROOF OF WORK ·{" "}
                <span className="text-[#A78BFA]">EVM IN PRACTICE</span>
              </p>
              <span
                className="font-mono text-[10px] tracking-[0.12em] text-[#6EE7B7] flex items-center gap-2"
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#6EE7B7]"
                  style={{ animation: "ticker-blink 1.4s ease-in-out infinite" }}
                />
                RESOLVED
              </span>
            </div>

            {/* Story body */}
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
              <div className="space-y-4 font-mono text-[13px] leading-[1.7]">
                <p className="text-[#6B6B8A]">
                  <span className="text-[#A8A4C7]">Program ·</span>{" "}
                  $1.37M Snowflake data platform migration
                </p>

                <div>
                  <p className="text-[#6B6B8A] mb-1">EAC model surfaced, six weeks before SOW expiry:</p>
                  <div className="pl-4 space-y-1" style={{ borderLeft: "2px solid rgba(167,139,250,0.25)" }}>
                    <p>
                      <span className="text-[#F0ABFC] font-bold">74%</span>
                      <span className="text-[#6B6B8A]"> budget consumed</span>
                    </p>
                    <p>
                      <span className="text-[#F0ABFC] font-bold">51%</span>
                      <span className="text-[#6B6B8A]"> scope delivered</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[#6B6B8A] mb-1">Response:</p>
                  <div className="pl-4 space-y-1" style={{ borderLeft: "2px solid rgba(110,231,183,0.25)" }}>
                    <p className="text-[#A8A4C7]">→ Built the commercial case</p>
                    <p className="text-[#A8A4C7]">→ Presented to client CFO</p>
                    <p className="text-[#A8A4C7]">→ Closed{" "}
                      <span className="text-[#6EE7B7] font-bold">$831K change order</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Outcome callout */}
              <div
                className="shrink-0 rounded-lg p-4 text-center min-w-[140px]"
                style={{
                  background: "rgba(110,231,183,0.06)",
                  border: "1px solid rgba(110,231,183,0.15)",
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B6B8A] mb-2">Change order</p>
                <p className="font-display text-[40px] font-bold leading-none text-[#6EE7B7] tracking-tight">$831K</p>
                <p className="font-mono text-[10px] text-[#6B6B8A] mt-2">no scope cuts</p>
              </div>
            </div>

            {/* Closing line */}
            <p
              className="mt-5 pt-4 font-mono text-[11px] tracking-[0.08em] text-[#6B6B8A] italic"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              That&apos;s what financial governance looks like in practice.
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#0A0A12] transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: "#A78BFA", boxShadow: "0 0 28px rgba(167,139,250,0.35)" }}
          >
            See all six programs →
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#EDE9FE] transition-all duration-200 hover:bg-[rgba(167,139,250,0.08)]"
            style={{ border: "1px solid rgba(167,139,250,0.3)" }}
          >
            Email me ✉
          </a>
        </motion.div>

        {/* Stats panel */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-xl p-5 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(167,139,250,0.04), rgba(167,139,250,0.01))",
            border: "1px solid rgba(167,139,250,0.1)",
          }}
        >
          <span
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #A78BFA, transparent)" }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCell label="Portfolio Value"   target={3.5}   decimals={1} prefix="$" suffix="M+" sub="across 6 programs"           active={statsInView} delay={0.1} />
            <StatCell label="Data Programs"      target={6}     decimals={0}             suffix=""   sub="end-to-end ownership"        active={statsInView} delay={0.2} />
            <StatCell label="Budget Execution"   target={99.98} decimals={2}            suffix="%"  sub="avg. across portfolio"        active={statsInView} delay={0.3} />
            <StatCell label="Largest CO Closed"  target={831}   decimals={0} prefix="$" suffix="K"  sub="from EAC catch, no scope cut" active={statsInView} delay={0.4} />
          </div>
        </motion.div>

      </div>

      {/* Industries marquee */}
      <div
        className="relative py-5 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #0A0A12, transparent)" }} />
        <span className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #0A0A12, transparent)" }} />
        <div className="flex animate-marquee">
          {[...industries, ...industries].map(([name, sub], i) => (
            <span key={i} className="inline-flex items-center gap-2 px-6 shrink-0">
              <span className="font-display text-[19px] font-normal text-[#A8A4C7] tracking-[-0.01em]">{name}</span>
              <span className="font-display italic text-[15px] text-[#A78BFA]">{sub}</span>
              <span className="text-[#6B6B8A] ml-4">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
