"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const industries = [
  "EdTech", "Enterprise SaaS", "Investment Management",
  "MarTech / AdTech", "Software Intelligence", "Industrial Manufacturing",
  "Healthcare", "Filtration Technology",
];

const stats = [
  { value: "$3.5M+", label: "Portfolio Value", sub: "Multi-commercial · Active" },
  { value: "10+",   label: "Programs Delivered", sub: "End-to-end ownership" },
  { value: "99.98%", label: "Budget Execution", sub: "Avg. across all programs" },
  { value: "3×",    label: "Continents", sub: "Follow-the-sun governance" },
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
  stat,
  active,
  delay,
}: {
  stat: { value: string; label: string; sub: string };
  active: boolean;
  delay: number;
}) {
  const isNumeric = /^[\d.]+/.test(stat.value);
  const prefix = stat.value.startsWith("$") ? "$" : "";
  const suffix = stat.value.endsWith("+") ? "+" : stat.value.endsWith("%") ? "%" : stat.value.endsWith("×") ? "×" : "";
  const numericStr = stat.value.replace(/[$+%×]/g, "");
  const target = parseFloat(numericStr) || 0;
  const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0;
  const counted = useCounter(target, decimals, active && isNumeric);

  const display = isNumeric ? `${prefix}${counted}${suffix}` : stat.value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="p-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF]"
    >
      <div className="font-heading text-3xl font-bold gradient-text tracking-tight leading-none mb-1">
        {display}
      </div>
      <div className="text-xs font-semibold text-[#0F172A] mb-0.5">{stat.label}</div>
      <div className="text-[11px] text-[#64748B]">{stat.sub}</div>
    </motion.div>
  );
}

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="min-h-screen flex flex-col pt-16 bg-white hero-grid relative overflow-hidden">
      {/* Bottom fade */}
      <div className="absolute bottom-[80px] left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20 relative z-20">

        {/* Availability + location pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-xs font-semibold text-[#2563EB]">
            <span
              className="w-2 h-2 rounded-full bg-[#10B981]"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            Open to opportunities — globally
          </span>
          <span className="text-xs text-[#94A3B8] font-mono tracking-wider">
            Bengaluru, India · Remote-first · IST (UTC+5:30)
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left col — identity + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-heading font-bold shadow-lg">
              RKS
            </div>

            {/* Name + title */}
            <div>
              <h1 className="font-heading text-3xl font-bold text-[#0F172A] leading-tight mb-1">
                Rohit Kumar Singh
              </h1>
              <p className="text-sm font-semibold text-[#2563EB] tracking-wide uppercase mb-1">
                Technical Project Manager
              </p>
              <p className="text-xs text-[#64748B] font-medium">
                Data & AI Program Delivery · 5+ Years · phData
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2">
              {["PSM1", "ITIL", "Innovation Award"].map((c) => (
                <span
                  key={c}
                  className="text-xs font-semibold px-3 py-1 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Engagement models */}
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#94A3B8] mb-2">
                // ENGAGEMENT MODELS
              </p>
              <div className="flex flex-wrap gap-2">
                {["Fixed-Price", "Time & Materials", "Managed Services"].map((m) => (
                  <span
                    key={m}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-bold gradient-bg hover:opacity-90 transition-opacity"
              >
                See the Work →
              </a>
              <a
                href="mailto:singhrohit.25119@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] transition-colors"
              >
                Get in Touch ✉
              </a>
            </div>
          </motion.div>

          {/* Right col — value prop + stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Value prop headline */}
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#94A3B8] mb-4">
              // WHAT I DELIVER
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#0F172A] leading-snug mb-4">
              I take complex{" "}
              <span className="gradient-text">data & AI programs</span>{" "}
              from ambiguous brief to delivered outcome — on time, on budget, with full governance.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed mb-4">
              Most projects don&apos;t fail because of bad engineering. They fail because of{" "}
              <strong className="text-[#0F172A] font-semibold">unclear scope, untracked dependencies, unmanaged budget, and no one owning the critical path.</strong>{" "}
              That&apos;s exactly what I fix.
            </p>
            <p className="text-base text-[#64748B] leading-relaxed mb-8 border-l-4 border-[#2563EB] pl-4 italic">
              The engineering belongs to the team. The plan, the controls, the cross-functional
              alignment, and the outcome — that belongs to me.
            </p>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  active={statsInView}
                  delay={0.1 + i * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Industries marquee */}
      <div className="relative border-t border-[#E2E8F0] py-4 overflow-hidden bg-white z-20">
        {/* Fade masks */}
        <span className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <span className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        <div className="flex animate-marquee">
          {[...industries, ...industries].map((ind, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-5 shrink-0">
              <span className="text-sm font-semibold text-[#334155]">{ind}</span>
              <span className="text-[#2563EB]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
