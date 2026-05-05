"use client";

import { motion } from "framer-motion";

const industries = [
  "EdTech", "Enterprise SaaS", "Investment Mgmt", "MarTech / AdTech",
  "Software Intelligence", "Industrial Mfg", "Healthcare", "Filtration",
];

const stats = [
  { value: "$3.5M+", label: "PORTFOLIO MANAGED · MULTI-COMMERCIAL" },
  { value: "10+", label: "ENTERPRISE PROGRAMS LED · END-TO-END" },
  { value: "8+", label: "REGULATED INDUSTRIES SERVED" },
  { value: "3×", label: "CONTINENTS · FOLLOW-THE-SUN GOVERNANCE" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col pt-16 bg-white hero-grid">
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
            PORTFOLIO · MMXXVI
          </span>
          <span className="flex-1 h-px bg-[#e5e7eb]" />
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#10b981]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            AVAILABLE FOR PROGRAMS
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Left — identity */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold font-heading shadow-lg">
              RKS
            </div>

            <div>
              <h1 className="font-heading text-3xl font-bold text-[#111827] leading-tight mb-1">
                Rohit Kumar Singh
              </h1>
              <p className="text-sm text-[#6b7280] font-medium tracking-wide">BENGALURU, IN</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">
                TECHNICAL PROJECT MANAGER
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#111827]">
                AI & DATA ENGINEERING DELIVERY
              </p>
              <p className="text-xs text-[#6b7280] font-medium pt-0.5">PSM1 · ITIL · phData Innovation Award</p>
            </div>

            {/* Commercial models */}
            <div className="flex flex-wrap gap-2">
              {["FIXED-PRICE", "T&M", "MANAGED"].map((model) => (
                <span
                  key={model}
                  className="text-xs font-bold px-3 py-1 rounded-full border border-[#bfdbfe] text-[#2563eb] bg-[#f0f9ff]"
                >
                  {model}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-bold gradient-bg hover:opacity-90 transition-opacity w-fit"
              >
                SEE THE WORK
                <span className="text-base">→</span>
              </a>
              <a
                href="mailto:rsingh@phdata.io"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#f0f9ff] transition-colors w-fit"
              >
                EMAIL ME ✉
              </a>
            </div>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <p className="text-xl md:text-2xl text-[#111827] leading-relaxed font-light mb-6">
              I operate at the intersection of{" "}
              <span className="font-semibold text-[#111827]">
                technology, execution, and organizational alignment
              </span>{" "}
              — leading complex programs across data platforms, cloud ecosystems, and AI-driven products.
            </p>
            <p className="text-base text-[#374151] leading-relaxed mb-6">
              My focus is not just on delivery — but on{" "}
              <span className="font-semibold text-[#111827]">bringing structure to ambiguity</span>,
              aligning fragmented teams, and{" "}
              <span className="font-semibold text-[#111827]">accelerating execution in high-dependency environments</span>.
              I translate business strategy into engineering-ready roadmaps, own the critical path,
              and run program finance with the rigor of a P&L owner.
            </p>
            <p className="text-base text-[#374151] leading-relaxed mb-8 border-l-4 border-[#2563eb] pl-5 italic">
              The engineering belongs to the team. The plan, the controls, the cross-functional
              alignment, and the outcome belong to me.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="p-4 rounded-xl border border-[#bfdbfe] bg-[#f0f9ff]"
                >
                  <div className="font-heading text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6b7280] leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Industries marquee */}
      <div className="border-t border-[#e5e7eb] py-4 overflow-hidden bg-white">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...industries, ...industries, ...industries].map((ind, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-4">
              <span className="text-sm font-semibold text-[#374151]">{ind}</span>
              <span className="text-[#2563eb] text-lg">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
