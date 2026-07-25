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
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
      }}
    >
      {/* Bottom accent line */}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-[60%] rounded-bl-[10px]"
        style={{ background: "linear-gradient(90deg, #A78BFA, transparent)" }}
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B6B8A] mb-3">{label}</p>
      <p className="font-display text-[38px] leading-none font-bold tracking-tight text-[#EDE9FE]">
        {prefix}{val}{suffix}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.1em] text-[#6EE7B7] flex items-center gap-2">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-[#6EE7B7]"
          style={{ animation: "ticker-blink 1.4s ease-in-out infinite" }}
        />
        {delta}
      </p>
    </motion.div>
  );
}

// Word-rise: each word clips from overflow:hidden container
function WordRise({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        paddingBottom: "0.08em",
        marginBottom: "-0.08em",
        verticalAlign: "bottom",
      }}
    >
      <motion.span
        className={className}
        style={{ display: "inline-block" }}
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section className="min-h-screen flex flex-col pt-[64px] bg-[#0A0A12] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "#8B5CF6",
          opacity: 0.12,
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
          background: "#F0ABFC",
          opacity: 0.08,
          filter: "blur(80px)",
          top: 300,
          right: -150,
          animation: "orb-float-2 18s ease-in-out infinite",
        }}
      />

      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20 relative z-10">
        {/* Available pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.16em] text-[#A8A4C7] w-fit"
          style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.06)" }}
        >
          <span
            className="w-2 h-2 rounded-full bg-[#6EE7B7]"
            style={{ boxShadow: "0 0 10px #6EE7B7", animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          AVAILABLE FOR PROGRAMS · BENGALURU IN · UTC+5:30
        </motion.div>

        {/* H1 — word rise */}
        <h1
          className="font-display leading-[0.93] tracking-[-0.04em] mb-8"
          style={{ fontSize: "clamp(64px, 11vw, 148px)" }}
        >
          <WordRise delay={0.05}>Programs</WordRise>
          <br />
          <WordRise delay={0.17}>that </WordRise>
          <WordRise delay={0.22}>
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
              hold
            </span>
          </WordRise>
          <br />
          <WordRise delay={0.36}>under load.</WordRise>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-[17px] leading-[1.65] text-[#A8A4C7] max-w-[680px] mb-10"
        >
          I manage data and AI delivery programs for enterprise companies —{" "}
          <em className="not-italic text-[#A78BFA] font-semibold">migrations, lakehouses, AI deployments</em>.
          {" "}$3.5M+ portfolio, 10+ programs, 99.98% budget accuracy. I also{" "}
          <strong className="font-semibold text-[#EDE9FE]">
            build AI agents that handle the routine work — so I can focus on the things that
            actually require judgment
          </strong>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#0A0A12] transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: "#A78BFA", boxShadow: "0 0 28px rgba(167,139,250,0.4)" }}
          >
            See the work →
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#EDE9FE] transition-all duration-200 hover:bg-[rgba(167,139,250,0.08)]"
            style={{ border: "1px solid rgba(167,139,250,0.3)" }}
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
            background: "linear-gradient(180deg, rgba(167,139,250,0.05), rgba(167,139,250,0.01))",
            border: "1px solid rgba(167,139,250,0.14)",
          }}
        >
          {/* Top accent line */}
          <span
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #A78BFA, transparent)" }}
          />

          <div className="flex justify-between items-center mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B6B8A]">
              // ACTIVE PORTFOLIO ·{" "}
              <span className="text-[#A78BFA]">LIVE NUMBERS</span>
            </p>
            <div className="hidden sm:flex gap-4 font-mono text-[10px] tracking-[0.14em] text-[#6B6B8A]">
              <span>STATUS · <span className="text-[#6EE7B7]">GREEN</span></span>
              <span>SYNC · LIVE</span>
              <span>VER · 26.5.1</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCell label="Portfolio Value"  target={3.5}  decimals={1} prefix="$" suffix="M+" delta="multi-commercial"       active={panelInView} delay={0.15} />
            <StatCell label="Programs Owned"   target={10}   decimals={0}             suffix="+"   delta="end-to-end"             active={panelInView} delay={0.25} />
            <StatCell label="Budget Execution" target={99.98} decimals={2}            suffix="%"   delta="avg. across portfolio"  active={panelInView} delay={0.35} />
            <StatCell label="Geo Coverage"     target={3}    decimals={0}             suffix="×"   delta="continents · FTS gov"   active={panelInView} delay={0.45} />
          </div>
        </motion.div>
      </div>

      {/* Industries marquee */}
      <div
        className="relative py-5 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Fade masks */}
        <span className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #0A0A12, transparent)" }} />
        <span className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #0A0A12, transparent)" }} />

        <div className="flex animate-marquee">
          {[...industries, ...industries].map(([name, sub], i) => (
            <span key={i} className="inline-flex items-center gap-2 px-6 shrink-0">
              <span className="font-display text-[20px] font-normal text-[#A8A4C7] tracking-[-0.01em]">{name}</span>
              <span className="font-display italic text-[16px] text-[#A78BFA]">{sub}</span>
              <span className="text-[#6B6B8A] ml-4">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
