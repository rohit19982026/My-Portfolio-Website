"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Project Manager, Data Platform Analytics",
    org: "phData · Snowflake Elite Partner · Bengaluru",
    current: true,
    color: "#2563EB",
    bullets: [
      "Managed 4–6 concurrent data platform programs simultaneously — $3.5M+ total portfolio value, zero programs in red status across 3+ years of delivery.",
      "Maintained 99.98% average budget execution across all active programs — EAC/ETC/CPI tracking, monthly burn forecasting, and variance escalations before they became client conversations.",
      "Closed $831K in mid-engagement scope expansion on a single program — built the commercial case, presented to client CFO and VP Engineering, secured approval in 10 business days.",
      "Cleared 17 external blockers in 8 weeks on a stalled $1.37M engagement — triggered VP-level escalation with data, not complaints; engineering velocity recovered within two sprints.",
      "Cut UAT cycle from 11 to 4 days on a managed retainer by publishing approval-latency metrics to client leadership — not by improving testing, but by making the delay visible to people with authority to act.",
      "Built production AI agents (Glean + Claude + n8n) that cut project provisioning from 3 hours to 15 minutes, automated weekly cross-program status reporting, and triggered client Slack notifications without manual intervention — saving 5+ hours per week in PM overhead.",
      "Owned presales-to-delivery scoping on 10+ engagements — reviewed technical scope with Principal Architects, sized engineering effort, and structured SOWs with change-control governance that held under 14 undocumented scope additions.",
    ],
    tags: ["PMO Governance", "RACI · WBS · Risk Register", "Financial Management", "C-Level Stakeholder Mgmt", "Presales-to-Delivery", "Scrum Master (PSM1)", "AI Agent Builder"],
  },
  {
    period: "AUG 2020 — NOV 2022",
    title: "Change Manager — IT Infrastructure",
    org: "British Telecom (BT) · Kolkata",
    current: false,
    color: "#06B6D4",
    bullets: [
      "Maintained 99.9% uptime across critical telecom infrastructure — CAB governance, risk assessment, and rollback planning for 50+ changes annually with zero unplanned outages attributable to change events.",
      "Owned stakeholder communication across all change events — pre-change briefings, real-time status during windows, and post-implementation reports to business and technology leadership.",
    ],
    tags: ["ITIL Foundation", "CAB Governance", "99.9% Uptime", "Change Risk Assessment", "Cross-functional Communication"],
  },
];

const education = {
  degree: "Bachelor of Computer Application",
  institution: "Brainware University, Kolkata",
  year: "Jun 2020",
  grade: "CGPA: 7.5 / 10",
};

const certifications = [
  { name: "PSM1 — Professional Scrum Master", issuer: "Scrum.org", type: "cert" },
  { name: "ITIL Foundation", issuer: "Axelos", type: "cert" },
  { name: "LandingLens Computer Vision Fundamentals", issuer: "LandingAI", type: "cert" },
  { name: "LandingLens on Snowflake", issuer: "LandingAI", type: "cert" },
  { name: "Deeply Practical Project Management", issuer: "PMP-track", type: "course" },
  { name: "Data Warehouse Fundamentals", issuer: "Course", type: "course" },
];

const award = {
  title: "phData Innovation Award",
  desc: "Recognised for building production AI agents (Glean + Claude + n8n) that cut project provisioning from 3 hours to 15 minutes, automated weekly status reporting across 4+ active programs, and triggered client Slack notifications without manual intervention — saving 5+ hours of PM overhead per week.",
};

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
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              05 / TRAJECTORY
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            Where I&apos;ve been,{" "}
            <span className="gradient-text">what I built.</span>
          </h2>
          <p className="text-base text-[#64748B] max-w-xl leading-relaxed">
            5+ years owning programs — not participating in them. Full lifecycle from
            presales scoping through delivery close, with financial governance at every stage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Work history */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-[#BFDBFE]" />
              <div className="space-y-12">
                {roles.map((role, i) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.2 }}
                    className="pl-8 relative"
                  >
                    <div
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white -translate-x-1/2"
                      style={{ backgroundColor: role.color }}
                    />

                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#94A3B8]">
                        {role.period}
                      </p>
                      {role.current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide bg-[#ECFDF5] text-[#10B981] border border-[#10B981]/30">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-0.5">{role.title}</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: role.color }}>
                      {role.org}
                    </p>

                    <ul className="space-y-2.5 mb-5">
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2.5 text-sm text-[#64748B] leading-relaxed">
                          <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-full font-semibold border"
                          style={{ borderColor: `${role.color}35`, backgroundColor: `${role.color}0D`, color: role.color }}
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

          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            {/* Education */}
            <div className="p-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563EB] mb-3">// EDUCATION</p>
              <p className="font-heading font-bold text-[#0F172A] text-sm leading-snug mb-1">{education.degree}</p>
              <p className="text-xs text-[#334155] font-medium">{education.institution}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{education.year} · {education.grade}</p>
            </div>

            {/* Certifications */}
            <div className="p-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563EB] mb-3">// CERTIFICATIONS & COURSES</p>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-2">
                    <span className={`mt-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      c.type === "cert" ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#64748B]"
                    }`}>
                      {c.type === "cert" ? "CERT" : "COURSE"}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#0F172A] leading-tight">{c.name}</p>
                      <p className="font-mono text-[10px] text-[#94A3B8]">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Award */}
            <div className="p-5 rounded-2xl border-2 border-[#F59E0B]/40 bg-[#FFFBEB]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#F59E0B] mb-2">// AWARD</p>
              <p className="font-heading font-bold text-[#0F172A] text-sm mb-2 flex items-center gap-2">
                🏆 {award.title}
              </p>
              <p className="text-xs text-[#64748B] leading-relaxed">{award.desc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
