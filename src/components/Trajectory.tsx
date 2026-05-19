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
      "At any given time I was running 4–5 active programs — mostly Snowflake and Databricks builds, some cloud migrations, some GenAI work. I owned each one from scoping through commercial close.",
      "The financial side was a real part of the job: EAC models, invoicing, margin tracking, budget variance on each program. Contracts I've worked on range from around $500K to $5M+.",
      "I was the main PM contact on 10+ enterprise accounts — running QBRs with VPs and Directors, writing the reporting so issues surfaced on the page before they came up in the meeting.",
      "Built PMO automation using Glean's agent builder and Google Apps Script: automated status reports, OKR tracking, Slack program health dashboards. Saved roughly 8 hours a week of manual admin across the team.",
      "On most accounts I was involved in pre-sales too — scoping delivery estimates, validating feasibility, working through commercial terms on extensions and new SOWs.",
      "Teams ranged from 15 to 30 people across data engineering, analytics, DevOps, and client stakeholders. Cross-timezone dependency management (US + India) was a constant part of the role.",
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

const sidebarVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const sidebarItem = {
  hidden: { opacity: 0, x: 30, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 90, damping: 20 } },
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
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA] block mb-5">
            03 / TRAJECTORY
          </span>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.1 }}
              className="font-display font-bold tracking-tight leading-[0.97] mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "#EDE9FE" }}
            >
              Where I&apos;ve{" "}<span style={{ background: "linear-gradient(135deg, #A78BFA, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} className="italic font-normal">worked</span>.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[16px] text-[#A8A4C7] max-w-xl leading-relaxed"
          >
            Five years across two companies — ITIL change governance at BT, then full program ownership across data platform and AI delivery at phData.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Animated timeline line */}
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{
                  background: "linear-gradient(180deg, #A78BFA, rgba(167,139,250,0.1))",
                  transformOrigin: "top",
                  scaleY: 0,
                }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
              <div className="space-y-12">
                {roles.map((role, i) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, x: -28, filter: "blur(10px)" }}
                    animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.45 + i * 0.2 }}
                    className="pl-8 relative"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.55 + i * 0.2 }}
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#0A0A12] -translate-x-1/2"
                      style={{ backgroundColor: role.color }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B8A]">{role.period}</p>
                      {role.current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide" style={{ background: "rgba(110,231,183,0.1)", color: "#6EE7B7", border: "1px solid rgba(110,231,183,0.25)" }}>CURRENT</span>
                      )}
                    </div>
                    <h3 className="font-display text-[22px] font-bold leading-tight tracking-tight text-[#EDE9FE] mb-1">{role.title}</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider mb-5" style={{ color: role.color }}>{role.org}</p>
                    <ul className="space-y-3 mb-5">
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-[13.5px] text-[#A8A4C7] leading-relaxed">
                          <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.05, y: -1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-full font-semibold cursor-default"
                          style={{ border: `1px solid ${role.color}35`, backgroundColor: `${role.color}0D`, color: role.color }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — stagger */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-5"
          >
            <motion.div
              variants={sidebarItem}
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mb-3">// EDUCATION</p>
              <p className="font-display font-bold text-[#EDE9FE] text-[15px] leading-snug mb-1">{education.degree}</p>
              <p className="font-mono text-[11px] text-[#A8A4C7] font-medium">{education.institution}</p>
              <p className="font-mono text-[11px] text-[#6B6B8A] mt-0.5">{education.year} · {education.grade}</p>
            </motion.div>

            <motion.div
              variants={sidebarItem}
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(167,139,250,0.18)", background: "rgba(167,139,250,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mb-3">// CERTIFICATIONS</p>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0" style={c.type === "cert" ? { background: "#A78BFA", color: "#0A0A12" } : { background: "rgba(255,255,255,0.07)", color: "#6B6B8A" }}>{c.type === "cert" ? "CERT" : "COURSE"}</span>
                    <div>
                      <p className="font-heading text-[12px] font-semibold text-[#EDE9FE] leading-tight">{c.name}</p>
                      <p className="font-mono text-[10px] text-[#6B6B8A]">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={sidebarItem}
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.05)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#FBBF24" }}>// AWARD</p>
              <p className="font-display font-bold text-[#EDE9FE] text-[14px] mb-2">🏆 {award.title}</p>
              <p className="text-[12.5px] text-[#A8A4C7] leading-relaxed">{award.desc}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
