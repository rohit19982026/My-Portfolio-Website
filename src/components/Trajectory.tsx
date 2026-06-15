"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Technical Project Manager — Data & AI",
    org: "phData · Snowflake Elite Partner · Kolkata",
    current: true,
    color: "#1D4ED8",
    accent: "#60A5FA",
    bullets: [
      "Run delivery on 4–5 concurrent data and AI programs at a time for phData's Snowflake Elite Partner practice — picking each one up at kickoff, carrying it through a steady weekly cadence, and handing it off clean at closure, often switching between very different clients and timezones in the same afternoon.",
      "The engineers and architects own the build; I own making sure nothing falls through the cracks between them — reading what's actually going on behind a green status, deciding what gets escalated and when, and having the harder conversation before it becomes the client's problem.",
      "Run the weekly rhythm that keeps the account team and the client sponsor reading from the same page — status, financials, and a live risk register, but the real work is the judgment call about what gets said out loud and when.",
      "Built and shipped 6 AI agents (Glean, Claude, n8n) that took the most repeatable parts of the PM job — billing reconciliation, sprint health, steerco prep, program health scans — off the desks of the whole PMO, not just my own. Recognised with phData's Innovation Award.",
      "Lead cross-functional teams of 15–30 across engineering, architecture, and client-side stakeholders — keep standups, grooming, and sprint ceremonies honest enough that the board can be trusted without me micromanaging it.",
      "Worked across a 10.5-hour timezone spread on one program — a US delivery lead to a China factory site — and redesigned the cadence around the gap instead of forcing live meetings that were never going to happen.",
      "Spot scope creep and access blockers early enough to route them through the right conversation — a change order, an escalation, a heads-up to the AE — rather than absorb them quietly and hope they don't compound.",
      "Onboard new team members mid-program without disrupting the active sprint, and build out-of-office coverage into every PTO so nothing on an active program depends on me being online.",
    ],
    tags: ["Multi-Program Delivery (4–5 Concurrent)", "Cross-Timezone Delivery", "Stakeholder & Executive Comms", "AI Agent Builder", "Risk & Escalation Management", "Agile Delivery (PSM1)", "Team Leadership (15–30)", "PMO Process Design"],
  },
  {
    period: "AUG 2020 — DEC 2022",
    title: "Change Management Specialist",
    org: "British Telecom (BT) · Kolkata",
    current: false,
    color: "#059669",
    accent: "#34D399",
    bullets: [
      "CAB governance, risk assessment, rollback planning, and post-implementation validation across 50+ changes a year — ITIL-compliant throughout, against a 99.9% uptime SLA on telecom infrastructure.",
      "Change authorisation on firewall, SSL, inter-switch link, and ACL requests — corporate and public sector accounts. Standard, Normal, Expedited, and Emergency change categories all owned.",
      "Communication across all change windows — pre-change briefings, real-time status during execution, and post-implementation reports to business and technology leadership.",
    ],
    tags: ["ITIL Foundation", "CAB Governance", "99.9% Uptime SLA", "Change Risk Assessment", "Infrastructure Change Mgmt"],
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
  desc: "Recognised for the PMO AI agent platform — Glean + Claude + n8n agents handling EOM billing reconciliation, sprint health scoring, project health scans, and steerco deck drafting. Recovers about 8 hours a week across the delivery org.",
};

const sidebarVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const sidebarItem = {
  hidden: { opacity: 0, x: 30, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 90, damping: 20 } },
};

const tagListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const tagItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 320, damping: 22 } },
};

export default function Trajectory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trajectory" className="py-16 sm:py-24 relative overflow-hidden" style={{ background: "var(--color-ink)" }}>
      {/* Instrument-panel grid texture */}
      <div className="absolute inset-0 console-grid pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] block mb-5" style={{ color: "#60A5FA" }}>
            02 / TRAJECTORY
          </span>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.1 }}
              className="font-display font-bold tracking-tight leading-[0.97] mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "var(--color-ink-text)" }}
            >
              Where I&apos;ve{" "}
              <span
                className="font-normal"
                style={{
                  background: "linear-gradient(135deg, #93C5FD 0%, #60A5FA 50%, #34D399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                worked
              </span>
              .
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[16px] max-w-xl leading-relaxed"
            style={{ color: "var(--color-ink-text-2)" }}
          >
            Two roles, one throughline: the work that keeps a program on track is rarely the work that&apos;s written down. Process governance at BT, full program ownership at phData — different domains, same instinct for spotting what&apos;s about to go wrong before it does.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{
                  background: "linear-gradient(180deg, #60A5FA, rgba(96,165,250,0.1))",
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
                      className="absolute left-0 top-1.5 w-3 h-3 rounded-full -translate-x-1/2"
                      style={{ backgroundColor: role.accent, border: "2px solid var(--color-ink)" }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--color-ink-text-2)" }}>{role.period}</p>
                      {role.current && (
                        <span
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wide"
                          style={{ background: "rgba(52,211,153,0.1)", color: "#34D399", border: "1px solid rgba(52,211,153,0.3)" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D399", animation: "pulse-dot 2s ease-in-out infinite" }} />
                          CURRENT
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-[22px] font-bold leading-tight tracking-tight mb-1" style={{ color: "var(--color-ink-text)" }}>{role.title}</h3>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-wider mb-5" style={{ color: role.accent }}>{role.org}</p>
                    <ul className="space-y-3 mb-5">
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-[13.5px] leading-relaxed" style={{ color: "var(--color-ink-text-2)" }}>
                          <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.accent }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <motion.div
                      variants={tagListVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="flex flex-wrap gap-2"
                    >
                      {role.tags.map((tag, ti) =>
                        ti === 0 ? (
                          <motion.span
                            key={tag}
                            variants={tagItemVariants}
                            whileHover={{ scale: 1.06, y: -2, boxShadow: `0 8px 20px ${role.color}45` }}
                            transition={{ type: "spring", stiffness: 400, damping: 18 }}
                            className="font-mono text-[11.5px] px-3.5 py-2 rounded-md font-bold uppercase tracking-[0.04em] cursor-default"
                            style={{ backgroundColor: role.color, color: "#FFFFFF" }}
                          >
                            // {tag}
                          </motion.span>
                        ) : (
                          <motion.span
                            key={tag}
                            variants={tagItemVariants}
                            whileHover={{ scale: 1.06, y: -2, backgroundColor: `${role.accent}1F`, borderColor: role.accent, boxShadow: `0 6px 16px ${role.accent}26` }}
                            transition={{ type: "spring", stiffness: 400, damping: 18 }}
                            className="inline-flex items-center gap-2 font-mono text-[11.5px] px-3.5 py-2 rounded-md font-semibold cursor-default"
                            style={{ border: `1px solid ${role.accent}35`, backgroundColor: `${role.accent}0D`, color: role.accent }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: role.accent }} />
                            {tag}
                          </motion.span>
                        )
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-5"
          >
            <motion.div
              variants={sidebarItem}
              className="p-5 rounded-2xl"
              style={{ border: "1px solid var(--color-ink-border)", background: "var(--color-ink-2)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#60A5FA" }}>// EDUCATION</p>
              <p className="font-display font-bold text-[15px] leading-snug mb-1" style={{ color: "var(--color-ink-text)" }}>{education.degree}</p>
              <p className="font-mono text-[11px] font-medium" style={{ color: "var(--color-ink-text-2)" }}>{education.institution}</p>
              <p className="font-mono text-[11px] mt-0.5" style={{ color: "var(--color-ink-text-2)" }}>{education.year} · {education.grade}</p>
            </motion.div>

            <motion.div
              variants={sidebarItem}
              className="p-5 rounded-2xl"
              style={{ border: "1px solid var(--color-ink-border)", background: "var(--color-ink-2)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#22D3EE" }}>// CERTIFICATIONS</p>
              <ul className="space-y-2.5">
                {certifications.map((c) => (
                  <li key={c.name} className="flex items-start gap-2">
                    <span
                      className="mt-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0"
                      style={c.type === "cert" ? { background: "#1D4ED8", color: "#FFFFFF" } : { background: "rgba(96,165,250,0.12)", color: "var(--color-ink-text-2)" }}
                    >
                      {c.type === "cert" ? "CERT" : "COURSE"}
                    </span>
                    <div>
                      <p className="font-heading text-[12px] font-semibold leading-tight" style={{ color: "var(--color-ink-text)" }}>{c.name}</p>
                      <p className="font-mono text-[10px]" style={{ color: "var(--color-ink-text-2)" }}>{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={sidebarItem}
              className="p-5 rounded-2xl"
              style={{ border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.06)" }}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "#FBBF24" }}>// AWARD</p>
              <p className="font-display font-bold text-[14px] mb-2" style={{ color: "var(--color-ink-text)" }}>🏆 {award.title}</p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--color-ink-text-2)" }}>{award.desc}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
