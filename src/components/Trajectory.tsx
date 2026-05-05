"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Project Manager, Data Platform Analytics",
    org: "phData · Snowflake Elite Partner · Bengaluru",
    current: true,
    color: "#A78BFA",
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
    color: "#6EE7B7",
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
    <section id="trajectory" className="py-24 bg-[#0A0A12]">
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
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              05 / TRAJECTORY
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            The <span className="gradient-text italic font-normal">seat</span><br />I sit in.
          </h2>
          <p className="text-[16px] text-[#A8A4C7] max-w-xl leading-relaxed">
            5+ years owning programs — not participating in them. Full PMO lifecycle from
            presales scoping through delivery close.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Work history */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{ background: "linear-gradient(180deg, #A78BFA, rgba(167,139,250,0.1))" }}
              />

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
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#0A0A12] -translate-x-1/2"
                      style={{ backgroundColor: role.color }}
                    />

                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B8A]">
                        {role.period}
                      </p>
                      {role.current && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide"
                          style={{ background: "rgba(110,231,183,0.1)", color: "#6EE7B7", border: "1px solid rgba(110,231,183,0.25)" }}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-[22px] font-bold leading-tight tracking-tight text-[#EDE9FE] mb-1">
                      {role.title}
                    </h3>
                    <p
                      className="font-mono text-[11px] font-bold uppercase tracking-wider mb-5"
                      style={{ color: role.color }}
                    >
                      {role.org}
                    </p>

                    <ul className="space-y-3 mb-5">
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-[13.5px] text-[#A8A4C7] leading-relaxed">
                          <span
                            className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: role.color }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-full font-semibold"
                          style={{
                            borderColor: `${role.color}35`,
                            backgroundColor: `${role.color}0D`,
                            border: `1px solid ${role.color}35`,
                            color: role.color,
                          }}
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
            <div
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mb-3">
                // EDUCATION
              </p>
              <p className="font-display font-bold text-[#EDE9FE] text-[15px] leading-snug mb-1">
                {education.degree}
              </p>
              <p className="font-mono text-[11px] text-[#A8A4C7] font-medium">{education.institution}</p>
              <p className="font-mono text-[11px] text-[#6B6B8A] mt-0.5">{education.year} · {education.grade}</p>
            </div>

            {/* Certifications */}
            <div
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mb-3">
                // CERTIFICATIONS & COURSES
              </p>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0"
                      style={
                        c.type === "cert"
                          ? { background: "#A78BFA", color: "#0A0A12" }
                          : { background: "rgba(255,255,255,0.07)", color: "#6B6B8A" }
                      }
                    >
                      {c.type === "cert" ? "CERT" : "COURSE"}
                    </span>
                    <div>
                      <p className="font-heading text-[12px] font-semibold text-[#EDE9FE] leading-tight">{c.name}</p>
                      <p className="font-mono text-[10px] text-[#6B6B8A]">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Award */}
            <div
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#FBBF24" }}>
                // AWARD
              </p>
              <p className="font-display font-bold text-[#EDE9FE] text-[14px] mb-2 flex items-center gap-2">
                🏆 {award.title}
              </p>
              <p className="text-[12.5px] text-[#A8A4C7] leading-relaxed">{award.desc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
