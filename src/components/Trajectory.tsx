"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    period: "2023 — PRESENT",
    title: "Technical Project Manager — PMO",
    org: "DATA & AI SERVICES · BENGALURU",
    body: "Lead enterprise data & AI engagements for Fortune 500 clients across EdTech, MarTech, Investment Management, Industrial Manufacturing, and Software Intelligence. Own delivery model design, financial governance, multi-region team coordination, and executive reporting. Build AI agents and skills that automate the operational parts of the role.",
    tags: ["$3.5M+ Portfolio", "Fortune 500", "Multi-region", "Fixed-price · T&M · Managed"],
    current: true,
  },
  {
    period: "EARLIER",
    title: "Delivery & Program Roles",
    org: "DATA & ANALYTICS PROGRAMS · MULTIPLE",
    body: "Background spanning program management, delivery operations, and process design across data and analytics engagements. Enough exposure to engineering teams to translate architecture trade-offs into schedule, cost, and rollback terms — and to make sure technical decisions and commercial reality stay aligned in the steerco.",
    tags: ["Program Management", "Delivery Operations", "Stakeholder Alignment"],
    current: false,
  },
];

export default function Trajectory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trajectory" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-5xl font-bold text-[#e5e7eb]">05</span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">/ TRAJECTORY</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#111827] mb-2">
            The seat{" "}
            <span className="gradient-text">I sit in.</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl leading-relaxed">
            Senior Technical Program Manager in a Data & AI services firm — owning enterprise
            programs end-to-end across the full PMI lifecycle: pre-sales scoping, SOW & commercial
            structuring, mobilization, governance, EVM, change control, and executive close-out.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[#bfdbfe]" />

          <div className="space-y-10">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.2 }}
                className="pl-8 relative"
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white -translate-x-1/2 ${
                    role.current ? "bg-[#2563eb]" : "bg-[#bfdbfe]"
                  }`}
                />

                {/* Period */}
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b7280] mb-2">
                  {role.period}
                  {role.current && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#10b981] border border-[#10b981]/30">
                      CURRENT
                    </span>
                  )}
                </p>

                <h3 className="font-heading text-xl font-bold text-[#111827] mb-0.5">{role.title}</h3>
                <p className="text-xs font-bold text-[#2563eb] uppercase tracking-wider mb-3">{role.org}</p>
                <p className="text-sm text-[#374151] leading-relaxed mb-4">{role.body}</p>

                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-[#bfdbfe] bg-[#f0f9ff] text-[#2563eb] font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
