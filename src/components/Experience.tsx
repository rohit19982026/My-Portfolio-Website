"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Technical Project Manager — Data & AI",
    org: "phData · Snowflake Elite Partner · Bengaluru",
    current: true,
    color: "#A78BFA",
    bullets: [
      "At any point I'm running 4–6 active programs — fixed-price migrations, T&M engagements, managed retainers. Different clients, different stacks, no two look the same. $3.5M+ in combined contract value.",
      "I forecast where a program will land rather than only reporting what it has spent. That's the difference between finding a funding gap with six weeks to act on it and finding it with one.",
      "Forecasting the burn-down on a $1.37M program surfaced a funding gap six weeks out — early enough to act. Framed the extension around what stopping half-finished would cost the business, not around spend. $831K change order approved in 10 business days.",
      "On the same program, 17 external approvals had stalled for weeks with no owner watching them. Made the cost of waiting visible — a name and a day count on each, in front of the people who could clear them. Once the aging was in their terms, they moved, and the team stopped idling on dependencies it didn't control.",
      "A managed retainer's UAT was running 11 days. Root-caused where the pipeline actually stalled and put the specific items, owners, and wait times in front of the people who could act. The cycle dropped to 4 days.",
      "Built AI agents (Glean + Claude + n8n) for monthly financial reviews, weekly status briefs, and new program setup. Saves 5+ hours a week. Won phData's Innovation Award.",
      "Scoped 10+ programs end to end. One client pushed 14 scope additions beyond the agreed contract. Every one formally logged and resolved — none became free work.",
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
      "Change governance for critical UK telecom infrastructure — formal review, rollback planning, approval gating for 50+ changes a year. 99.9% uptime.",
      "Owned all stakeholder communication around change events: brief before, live status during, report after.",
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
    <section id="experience" className="py-24 bg-[#0A0A12]">
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
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              01 / EXPERIENCE
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Where I&apos;ve worked.{" "}
            <span className="gradient-text font-normal">What I delivered</span>.
          </h2>
          <p className="text-[16px] text-[#A8A4C7] max-w-xl leading-relaxed">
            Six years in delivery. Three and a half at phData running data and AI programs,
            two and a half before that at British Telecom running change for UK network
            infrastructure.
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
                      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B8A]">
                        {role.period}
                      </p>
                      {role.current && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide"
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
                      className="font-heading text-[11px] font-bold uppercase tracking-wider mb-5"
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
                          className="font-heading text-[10px] px-2.5 py-1 rounded-full font-semibold"
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
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mb-3">
                EDUCATION
              </p>
              <p className="font-display font-bold text-[#EDE9FE] text-[15px] leading-snug mb-1">
                {education.degree}
              </p>
              <p className="font-heading text-[11px] text-[#A8A4C7] font-medium">{education.institution}</p>
              <p className="font-heading text-[11px] text-[#6B6B8A] mt-0.5">{education.year} · {education.grade}</p>
            </div>

            {/* Certifications */}
            <div
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.05)" }}
            >
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mb-3">
                CERTIFICATIONS & COURSES
              </p>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-[10px] font-heading font-bold px-1.5 py-0.5 rounded shrink-0"
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
                      <p className="font-heading text-[10px] text-[#6B6B8A]">{c.issuer}</p>
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
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#FBBF24" }}>
                AWARD
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
