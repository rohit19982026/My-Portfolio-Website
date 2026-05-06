"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Technical Project Manager — Data & AI",
    org: "phData · Snowflake Elite Partner · Kolkata",
    current: true,
    color: "#A78BFA",
    bullets: [
      "Governed 4–5 concurrent data platform, cloud migration, and GenAI programs (Snowflake, AWS, Databricks, dbt) — full SDLC ownership from initiation through closure; program roadmaps, delivery governance, and executive stakeholder alignment across all workstreams.",
      "Owned P&L from $500K to $5M+ — financial forecasting, revenue recognition, margin management, budget variance control, and invoicing approvals; maintained target margins across all active programs.",
      "Served as primary executive stakeholder liaison — ran QBRs with VP and Director-level clients across 10+ enterprise accounts; translated engineering delivery into business-language reporting. Issues surfaced in the report, not on the call.",
      "Engineered PMO automation using Glean AI agents and Google Apps Script — eliminated manual status reporting, automated OKR tracking, deployed real-time Slack program health dashboards; recovered ~8 hours/week of delivery team capacity.",
      "Led SOW negotiation and pre-sales scoping — defined delivery estimates, validated technical feasibility, and drove commercial terms on contract extensions and new statements of work.",
      "Managed cross-functional teams of 15–30 across data engineering, analytics, DevOps, and client stakeholders — resource allocation, capacity planning, and dependency management across concurrent workstreams.",
      "No program missed a critical delivery milestone across 15+ engagements over 3 years.",
    ],
    tags: ["PMO Governance", "Financial Management ($5M+ P&L)", "C-Level Stakeholder Mgmt", "Presales-to-Delivery", "AI Agent Builder", "Scrum Master (PSM1)", "Risk Register"],
  },
  {
    period: "AUG 2020 — DEC 2022",
    title: "Change Management Specialist",
    org: "British Telecom (BT) · Kolkata",
    current: false,
    color: "#6EE7B7",
    bullets: [
      "Progressed from Trainee Associate (Aug 2020) → Associate (Nov 2021) → Change Management Specialist (Jul 2022) within BT GBS over 2.5 years.",
      "Managed ITIL-compliant IT infrastructure change programs — CAB governance, risk assessment, rollback planning, and post-implementation validation for 50+ changes annually. Maintained 99.9% uptime across critical telecom infrastructure.",
      "Managed firewall, SSL, inter-switch link, and ACL change requests for corporate and public sector BT customers — reviewed and approved Standard, Normal, Expedited, and Emergency changes.",
      "Owned cross-functional communication for all change events — pre-change briefings, real-time status updates during change windows, and post-implementation reports to business and technology leadership.",
    ],
    tags: ["ITIL Foundation", "CAB Governance", "99.9% Uptime", "Change Risk Assessment", "Infrastructure Change Mgmt"],
  },
];

const education = {
  degree: "Bachelor of Computer Application",
  institution: "Brainware University, Kolkata",
  year: "2017 – 2020",
  grade: "CGPA: 7.5 / 10",
};

const certifications = [
  { name: "PSM1 — Professional Scrum Master", issuer: "Scrum.org", type: "cert" },
  { name: "ITIL 4 Foundation", issuer: "Axelos", type: "cert" },
  { name: "Building Systems with the ChatGPT API", issuer: "DeepLearning.AI", type: "cert" },
  { name: "LandingLens Computer Vision Fundamentals", issuer: "LandingAI", type: "cert" },
  { name: "Briefing to Big Data & Hadoop Ecosystem", issuer: "Coursera", type: "course" },
  { name: "Programming in Java", issuer: "NPTEL", type: "course" },
];

const award = {
  title: "phData Innovation Award",
  desc: "Recognised for building production AI agents (Glean + Claude + n8n) that automated project provisioning from signed SOWs, generated weekly program status reports, and sent automated client notifications to email and Slack — saving ~8 hours/week across active programs.",
};

export default function Trajectory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trajectory" className="py-24 bg-[#0A0A12]">
      <div className="max-w-6xl mx-auto px-6">
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
            5+ years owning programs end-to-end — not participating in them. From ITIL change governance at BT to
            full P&L ownership across 15+ data platform and AI programs at phData.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
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
                            border: `1px solid ${role.color}35`,
                            backgroundColor: `${role.color}0D`,
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

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
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

            <div
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mb-3">
                // CERTIFICATIONS
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

            <div
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#FBBF24" }}>
                // AWARD
              </p>
              <p className="font-display font-bold text-[#EDE9FE] text-[14px] mb-2">
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
