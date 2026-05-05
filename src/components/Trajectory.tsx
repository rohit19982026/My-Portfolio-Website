"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Project Manager, Data Platform Analytics",
    org: "phData · Snowflake Elite Partner · Bengaluru",
    current: true,
    color: "#2563eb",
    bullets: [
      "Run PMO governance across 4–6 concurrent Data Platform and Analytics programs — RACI maintained from kickoff through delivery close, WBS tracked throughout, decision logs updated every sprint. PMO governance is what prevents conflicting commitments, scope confusion, and accountability gaps from spreading across accounts.",
      "Own full financial management for all active programs — monthly invoicing, budget forecast vs. actuals, burn-down reporting, and variance flags to client PMO and internal leadership. No program reaches a budget ceiling without a documented mitigation plan in motion two sprints earlier.",
      "Manage C-level, VP, and Technical Director stakeholders on the client side — weekly status reporting, QBR facilitation, and escalation management. Translate delivery status and technical trade-offs into financial and business outcomes both sides can act on and report upward in their own organisations.",
      "Own presales-to-delivery lifecycle — review technical scope with Principal Architects during presales, size engineering effort, structure SOWs for delivery governance from day one, and transition into delivery ownership without the handoff knowledge loss typical between sales and delivery teams.",
      "Identify and develop account expansion opportunities — QBRs consistently surface new Analytics, GenAI, and data platform workstreams through structured discovery. Multiple engagements grew from single-program scopes into multi-year platform delivery relationships.",
      "Built AI agents using Glean (Salesforce, Slack, Google Drive MCP connectors), Claude, and n8n — automated project provisioning from signed SOWs, cross-program financial status rollup, and executive Slack updates. Recognised with phData's Innovation Award for measurably reducing manual PMO overhead.",
      "Maintain program-level risk registers with escalation protocols — each risk documented with probability, impact, owner, mitigation plan, and escalation trigger. Risk reviews included in every sprint cycle; proactive governance has eliminated end-of-program surprises on all managed accounts.",
    ],
    tags: ["PMO Governance", "RACI · WBS · Risk Register", "Financial Management", "C-Level Stakeholder Mgmt", "Presales-to-Delivery", "Scrum Master (PSM1)", "AI Agent Builder"],
  },
  {
    period: "AUG 2020 — NOV 2022",
    title: "Change Manager — IT Infrastructure",
    org: "British Telecom (BT) · Kolkata",
    current: false,
    color: "#06b6d4",
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
  desc: "Recognised for building production AI agents (Glean + Claude + n8n) that automated project provisioning from signed SOWs, generated weekly program status reports, and sent automated client notifications to email and Slack — acknowledged by phData leadership for measurably reducing manual PMO overhead across all active programs.",
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
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-5xl font-bold text-[#e5e7eb]">05</span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">/ TRAJECTORY</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#111827] mb-3">
            The seat{" "}
            <span className="gradient-text">I sit in.</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl leading-relaxed">
            5+ years owning programs — not participating in them. Full PMO lifecycle from
            presales scoping through delivery close, with financial governance and
            cross-functional alignment at every stage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Work history */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-[#bfdbfe]" />

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
                      className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white -translate-x-1/2`}
                      style={{ backgroundColor: role.color }}
                    />

                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b7280]">
                        {role.period}
                      </p>
                      {role.current && (
                        <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#10b981] border border-[#10b981]/30 text-[10px] font-bold uppercase tracking-wide">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#111827] mb-0.5">{role.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: role.color }}>
                      {role.org}
                    </p>

                    <ul className="space-y-2.5 mb-5">
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2.5 text-sm text-[#374151] leading-relaxed">
                          <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full border font-semibold"
                          style={{ borderColor: `${role.color}40`, backgroundColor: `${role.color}08`, color: role.color }}
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

          {/* Right: Education, Certs, Award */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Education */}
            <div className="p-5 rounded-2xl border border-[#bfdbfe] bg-[#f0f9ff]">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563eb] mb-3">// EDUCATION</p>
              <p className="font-heading font-bold text-[#111827] text-sm leading-snug mb-1">{education.degree}</p>
              <p className="text-xs text-[#374151] font-medium">{education.institution}</p>
              <p className="text-xs text-[#6b7280] mt-0.5">{education.year} · {education.grade}</p>
            </div>

            {/* Certifications */}
            <div className="p-5 rounded-2xl border border-[#bfdbfe] bg-[#f0f9ff]">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563eb] mb-3">// CERTIFICATIONS & COURSES</p>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-2">
                    <span className={`mt-0.5 text-xs font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      c.type === "cert"
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#e5e7eb] text-[#6b7280]"
                    }`}>
                      {c.type === "cert" ? "CERT" : "COURSE"}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#111827] leading-tight">{c.name}</p>
                      <p className="text-[10px] text-[#6b7280]">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Award */}
            <div className="p-5 rounded-2xl border-2 border-[#f59e0b]/40 bg-[#fffbeb]">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#f59e0b] mb-2">// AWARD</p>
              <p className="font-heading font-bold text-[#111827] text-sm mb-2 flex items-center gap-2">
                🏆 {award.title}
              </p>
              <p className="text-xs text-[#374151] leading-relaxed">{award.desc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
