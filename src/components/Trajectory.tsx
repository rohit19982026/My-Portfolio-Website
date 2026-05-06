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
      "Run PMO governance across 4–6 concurrent Data Platform and Analytics programs — RACI maintained from kickoff through delivery close, WBS tracked throughout, decision logs updated every sprint.",
      "Own full financial management for all active programs — monthly invoicing, budget forecast vs. actuals, burn-down reporting, and variance flags to client PMO and internal leadership.",
      "Manage C-level, VP, and Technical Director stakeholders on the client side — weekly status reporting, QBR facilitation, and escalation management.",
      "Own presales-to-delivery lifecycle — review technical scope with Principal Architects during presales, size engineering effort, structure SOWs for delivery governance from day one.",
      "Identify and develop account expansion opportunities — QBRs consistently surface new Analytics, GenAI, and data platform workstreams through structured discovery.",
      "Built AI agents using Glean (Salesforce, Slack, Google Drive MCP connectors), Claude, and n8n — automated project provisioning from signed SOWs, cross-program financial status rollup, and executive Slack updates.",
      "Maintain program-level risk registers with escalation protocols — each risk documented with probability, impact, owner, mitigation plan, and escalation trigger.",
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
      "Managed ITIL-compliant IT infrastructure change programs — CAB governance, risk assessment frameworks, rollback planning, and post-implementation validation for 50+ changes annually. Maintained 99.9% uptime across critical telecom infrastructure.",
      "Owned cross-functional stakeholder communication for all change events — pre-change briefings, real-time status updates during change windows, and post-implementation reports to business and technology leadership.",
      "ITIL governance, PMO documentation standards, structured change delivery discipline, and financial impact assessment frameworks all carried directly into data platform program management.",
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
  desc: "Recognised for building production AI agents (Glean + Claude + n8n) that automated project provisioning from signed SOWs, generated weekly program status reports, and sent automated client notifications to email and Slack.",
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
