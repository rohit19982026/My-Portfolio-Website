"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    company: "phData",
    role: "Technical Project Manager",
    period: "2022 — Present",
    type: "Full-time",
    color: "#2563eb",
    highlights: [
      "Led Coursera's Redshift → Databricks migration covering 2,300+ tables and views, delivering on schedule with zero data loss.",
      "Managed IR China's Snowflake implementation, designing schema architecture and RBAC for multi-region operations.",
      "Built the EOM Billing AI Skill using prompt engineering and LLM orchestration, reducing billing reconciliation time by 60%.",
      "Drove cross-functional alignment across data engineering, analytics, and business stakeholder teams on 10+ concurrent engagements.",
    ],
  },
  {
    company: "Previous Role",
    role: "Project Manager — Data & Analytics",
    period: "2019 — 2022",
    type: "Full-time",
    color: "#06b6d4",
    highlights: [
      "Managed end-to-end delivery of data warehouse modernization initiatives for mid-market clients.",
      "Established Agile delivery frameworks for data engineering squads, improving sprint predictability by 40%.",
      "Coordinated vendor relationships, SOW negotiations, and executive reporting for multi-million dollar programs.",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
            Experience
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3">
            Where I&apos;ve made{" "}
            <span className="gradient-text">measurable impact</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#bfdbfe] -translate-x-px hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute left-1/2 top-6 w-4 h-4 rounded-full border-4 border-white -translate-x-1/2 z-10"
                  style={{ backgroundColor: exp.color }}
                />

                {/* Card — alternates sides */}
                <div className={`${i % 2 === 0 ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10"}`}>
                  <div className="bg-white rounded-2xl border border-[#bfdbfe] p-6 shadow-sm hover:shadow-md hover:shadow-blue-100 transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-[#111827] text-xl">
                          {exp.role}
                        </h3>
                        <p className="font-semibold mt-0.5" style={{ color: exp.color }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#6b7280] block">{exp.period}</span>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block"
                          style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-[#374151] leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: exp.color }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
