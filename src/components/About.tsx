"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    icon: "🎯",
    title: "Outcome-First Thinking",
    desc: "Every sprint, migration, and pipeline decision is evaluated against business impact — not just technical completion.",
  },
  {
    icon: "🤖",
    title: "AI as a Force Multiplier",
    desc: "I build AI skills and prompt-engineered tools that eliminate repetitive PMO work and surface insights faster.",
  },
  {
    icon: "🔗",
    title: "Bridge Builder",
    desc: "I translate between engineering complexity and executive clarity, so the right people make the right decisions.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
              About Me
            </span>
            <h2 className="font-heading text-4xl font-bold mt-3 mb-6 leading-tight">
              I turn data chaos into{" "}
              <span className="gradient-text">production-grade platforms</span>
            </h2>
            <div className="space-y-4 text-[#374151] leading-relaxed">
              <p>
                I&apos;m Rohit Kumar Singh, a Technical Project Manager at{" "}
                <strong className="text-[#111827]">phData</strong>, where I lead
                end-to-end data platform migrations and ELT modernization projects
                for enterprise clients. My work sits at the intersection of cloud
                engineering, stakeholder alignment, and AI-powered delivery.
              </p>
              <p>
                I&apos;ve managed migrations of 2,300+ tables and views from
                Redshift to Databricks, built Snowflake implementations for global
                markets, and engineered AI skills that compress PMO overhead —
                all while keeping cross-functional teams aligned and delivery on track.
              </p>
              <p>
                My edge is translating deep technical complexity into clear business
                decisions — and knowing when to build, buy, or automate.
              </p>
            </div>
          </motion.div>

          {/* Values cards */}
          <div className="space-y-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="flex gap-4 p-5 rounded-2xl border border-[#bfdbfe] bg-[#f0f9ff] hover:shadow-md hover:shadow-blue-100 transition-shadow"
              >
                <span className="text-2xl mt-0.5">{v.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-[#111827] mb-1">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
