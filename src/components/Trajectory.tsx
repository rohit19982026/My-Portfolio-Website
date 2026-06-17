"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Trophy, ChevronDown } from "lucide-react";
import GlassSurface from "./GlassSurface";
import IconBadge from "./IconBadge";

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Technical Project Manager — Data & AI",
    org: "phData · Snowflake Elite Partner · Kolkata",
    current: true,
    color: "var(--color-accent)",
    accent: "var(--color-teal)",
    textAccent: "var(--color-teal-text)",
    bullets: [
      "Own end-to-end delivery on strategic data and AI programs at phData — typically 4–5 running at once, each at a different stage. Scope, budget, risk, and the client relationship are all mine. The engineering team owns the build; I own whether the engagement succeeds.",
      "The engineers and architects own the build; I own making sure nothing falls through the cracks between them — reading what's actually going on behind a green status, deciding what gets escalated and when, and having the harder conversation before it becomes the client's problem.",
      "Run the weekly rhythm that keeps the account team and the client sponsor reading from the same page — status, financials, and a live risk register, but the real work is the judgment call about what gets said out loud and when.",
      "Built and shipped 6 AI agents (Glean, Claude, n8n) that took the most repeatable parts of the PM job — billing reconciliation, sprint health, leadership deck drafting, program health scans — off the desks of the whole delivery team, not just my own. Recognised with phData's Innovation Award.",
      "Lead cross-functional teams of 15–30 across engineering, architecture, and client-side stakeholders — keep standups, grooming, and sprint ceremonies honest enough that the board can be trusted without me micromanaging it.",
      "Worked across a 10.5-hour timezone spread on one program — a US delivery lead to a China factory site — and redesigned the cadence around the gap instead of forcing live meetings that were never going to happen.",
      "Spot scope creep and access blockers early enough to route them through the right conversation — a change request, an escalation, a heads-up to the account lead — rather than absorb them quietly and hope they don't compound.",
      "Onboard new team members mid-program without disrupting the active sprint, and build out-of-office coverage into every PTO so nothing on an active program depends on me being online.",
    ],
    tags: ["Multi-Program Delivery (4–5 Concurrent)", "Cross-Timezone Delivery", "Stakeholder & Executive Comms", "AI Agent Builder", "Risk & Escalation Management", "Agile Delivery (PSM1)", "Team Leadership (15–30)", "Delivery Process Design"],
  },
  {
    period: "AUG 2020 — DEC 2022",
    title: "Change Management Specialist",
    org: "British Telecom (BT) · Kolkata",
    current: false,
    color: "var(--color-green)",
    accent: "var(--color-green)",
    textAccent: "var(--color-green-text)",
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
  desc: "Recognised for building the delivery team's AI agent platform — Glean + Claude + n8n agents handling month-end billing reconciliation, sprint health scoring, project health scans, and leadership deck drafting. Recovers about 8 hours a week across the team.",
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

// Mobile-only: collapsible role card
function MobileRoleCard({ role, inView, index }: { role: typeof roles[0]; inView: boolean; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 + index * 0.15 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid var(--glass-border)`, background: "var(--color-bg-secondary)" }}
    >
      {/* Header — always visible, tap to expand */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-4 py-4 flex items-start justify-between gap-3"
        style={{ background: "none", border: "none" }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[9.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-text-secondary)" }}>
              {role.period}
            </span>
            {role.current && (
              <span
                className="glass inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                style={{ borderRadius: "var(--radius-pill)", color: "var(--color-green-text)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }} />
                CURRENT
              </span>
            )}
          </div>
          <h3 className="font-heading text-[16px] font-bold leading-snug tracking-tight mb-0.5" style={{ color: "var(--color-text)" }}>
            {role.title}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: role.textAccent }}>{role.org}</p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="shrink-0 mt-1"
          style={{ color: "var(--color-faint)" }}
        >
          <ChevronDown size={16} strokeWidth={2} />
        </motion.div>
      </button>

      {/* Expandable body */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 22 }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-4 pb-4">
          <div style={{ height: "1px", background: "var(--glass-border)", marginBottom: "14px" }} />
          <ul className="space-y-2.5 mb-4">
            {role.bullets.map((b, bi) => (
              <li key={bi} className="flex gap-2.5 text-[12.5px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.accent }} />
                {b}
              </li>
            ))}
          </ul>
          {/* Tags: horizontal scroll */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {role.tags.map((tag, ti) => (
              ti === 0 ? (
                <span
                  key={tag}
                  className="shrink-0 text-[10.5px] px-3 py-1.5 rounded-full font-bold uppercase tracking-[0.04em]"
                  style={{ backgroundColor: role.color, color: "#FFFFFF" }}
                >
                  {tag}
                </span>
              ) : (
                <span
                  key={tag}
                  className="glass shrink-0 inline-flex items-center gap-1.5 text-[10.5px] px-3 py-1.5 rounded-full font-semibold"
                  style={{ color: role.textAccent }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: role.accent }} />
                  {tag}
                </span>
              )
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Trajectory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trajectory" className="py-16 sm:py-24 relative overflow-hidden section-alt">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] block mb-5" style={{ color: "var(--color-accent-dk)" }}>
            02 / TRAJECTORY
          </span>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.1 }}
              className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "var(--color-text)" }}
            >
              Where I&apos;ve{" "}
              <span
                className="font-normal"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-teal) 50%, var(--color-green) 100%)",
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
            className="text-[15px] max-w-xl leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Two roles, one throughline: the work that keeps a program on track is rarely the work that&apos;s written down. Process governance at BT, full program ownership at phData — different domains, same instinct for spotting what&apos;s about to go wrong before it does.
          </motion.p>
        </motion.div>

        {/* ── MOBILE layout ───────────────────────────────────────── */}
        <div className="lg:hidden space-y-4 mb-8">
          {roles.map((role, i) => (
            <MobileRoleCard key={role.title} role={role} inView={inView} index={i} />
          ))}

          {/* Mobile sidebar — horizontal scroll strip */}
          <div
            className="flex gap-3 overflow-x-auto pb-1 pt-2"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="shrink-0 w-[260px]"
            >
              <GlassSurface radius="lg" className="p-4 flex items-start gap-3 h-full">
                <IconBadge icon={GraduationCap} color="var(--color-accent)" size={32} iconSize={15} />
                <div className="min-w-0">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: "var(--color-accent-dk)" }}>Education</p>
                  <p className="font-heading font-bold text-[13px] leading-snug mb-0.5" style={{ color: "var(--color-text)" }}>{education.degree}</p>
                  <p className="text-[10px] font-medium" style={{ color: "var(--color-text-secondary)" }}>{education.institution}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{education.year} · {education.grade}</p>
                </div>
              </GlassSurface>
            </motion.div>

            {/* Award card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="shrink-0 w-[240px]"
            >
              <GlassSurface accent="#FF9F0A" specular radius="lg" className="p-4 h-full">
                <p className="flex items-center gap-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: "var(--color-orange-text)" }}>
                  <Trophy size={11} strokeWidth={2.5} />
                  Award
                </p>
                <p className="font-heading font-bold text-[13px] mb-1.5" style={{ color: "var(--color-text)" }}>{award.title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{award.desc}</p>
              </GlassSurface>
            </motion.div>

            {/* Certs card — abbreviated on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.72, duration: 0.5 }}
              className="shrink-0 w-[260px]"
            >
              <GlassSurface radius="lg" className="p-4 h-full">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] mb-2.5" style={{ color: "var(--color-teal-text)" }}>Certifications</p>
                <div className="space-y-2">
                  {certifications.slice(0, 4).map((c) => {
                    const accent = c.type === "cert" ? "var(--color-accent)" : "var(--color-teal)";
                    const accentText = c.type === "cert" ? "var(--color-accent-dk)" : "var(--color-teal-text)";
                    return (
                      <div
                        key={c.name}
                        className="flex items-start gap-2 p-2 rounded-xl"
                        style={{ border: "1px solid var(--glass-border)" }}
                      >
                        <span
                          className="mt-0.5 text-[8.5px] font-bold px-1.5 py-0.5 rounded-full shrink-0 uppercase tracking-wider"
                          style={c.type === "cert" ? { background: accent, color: "#FFFFFF" } : { background: "rgba(100,210,255,0.15)", color: accentText }}
                        >
                          {c.type === "cert" ? "CERT" : "COURSE"}
                        </span>
                        <div className="min-w-0">
                          <p className="font-heading text-[11px] font-semibold leading-tight" style={{ color: "var(--color-text)" }}>{c.name}</p>
                          <p className="text-[9.5px]" style={{ color: "var(--color-text-secondary)" }}>{c.issuer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassSurface>
            </motion.div>
          </div>
        </div>

        {/* ── DESKTOP layout (lg+) ────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{
                  background: "linear-gradient(180deg, var(--color-accent), rgba(10,132,255,0.08))",
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
                      style={{ backgroundColor: role.accent, border: "2px solid var(--color-bg-secondary)" }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--color-text-secondary)" }}>{role.period}</p>
                      {role.current && (
                        <span
                          className="glass inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                          style={{ borderRadius: "var(--radius-pill)", color: "var(--color-green-text)" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }} />
                          CURRENT
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-[22px] font-bold leading-tight tracking-tight mb-1" style={{ color: "var(--color-text)" }}>{role.title}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-5" style={{ color: role.textAccent }}>{role.org}</p>
                    <ul className="space-y-3 mb-5">
                      {role.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 text-[13.5px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
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
                            className="text-[11.5px] px-3.5 py-2 rounded-full font-bold uppercase tracking-[0.04em] cursor-default"
                            style={{ backgroundColor: role.color, color: "#FFFFFF" }}
                          >
                            {tag}
                          </motion.span>
                        ) : (
                          <motion.span
                            key={tag}
                            variants={tagItemVariants}
                            whileHover={{ scale: 1.06, y: -2, boxShadow: `0 6px 16px ${role.accent}26` }}
                            transition={{ type: "spring", stiffness: 400, damping: 18 }}
                            className="glass inline-flex items-center gap-2 text-[11.5px] px-3.5 py-2 rounded-full font-semibold cursor-default"
                            style={{ color: role.textAccent }}
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

          {/* Desktop Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-5"
          >
            <motion.div variants={sidebarItem}>
              <GlassSurface interactive radius="lg" className="p-5 flex items-start gap-3">
                <IconBadge icon={GraduationCap} color="var(--color-accent)" size={36} iconSize={18} />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: "var(--color-accent-dk)" }}>Education</p>
                  <p className="font-heading font-bold text-[15px] leading-snug mb-1" style={{ color: "var(--color-text)" }}>{education.degree}</p>
                  <p className="text-[11px] font-medium" style={{ color: "var(--color-text-secondary)" }}>{education.institution}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{education.year} · {education.grade}</p>
                </div>
              </GlassSurface>
            </motion.div>

            <motion.div variants={sidebarItem}>
              <GlassSurface radius="lg" className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--color-teal-text)" }}>Certifications</p>
                <div className="space-y-2">
                  {certifications.map((c) => {
                    const accent = c.type === "cert" ? "var(--color-accent)" : "var(--color-teal)";
                    const accentText = c.type === "cert" ? "var(--color-accent-dk)" : "var(--color-teal-text)";
                    return (
                      <motion.div
                        key={c.name}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className="flex items-start gap-2.5 p-2.5 rounded-2xl"
                        style={{ border: "1px solid var(--glass-border)" }}
                      >
                        <span
                          className="mt-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 uppercase tracking-wider"
                          style={c.type === "cert" ? { background: accent, color: "#FFFFFF" } : { background: "rgba(100,210,255,0.15)", color: accentText }}
                        >
                          {c.type === "cert" ? "CERT" : "COURSE"}
                        </span>
                        <div className="min-w-0">
                          <p className="font-heading text-[12px] font-semibold leading-tight" style={{ color: "var(--color-text)" }}>{c.name}</p>
                          <p className="text-[10px]" style={{ color: "var(--color-text-secondary)" }}>{c.issuer}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassSurface>
            </motion.div>

            <motion.div variants={sidebarItem}>
              <GlassSurface accent="#FF9F0A" interactive specular radius="lg" className="p-5">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "var(--color-orange-text)" }}>
                  <Trophy size={13} strokeWidth={2.5} />
                  Award
                </p>
                <p className="font-heading font-bold text-[14px] mb-2" style={{ color: "var(--color-text)" }}>{award.title}</p>
                <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{award.desc}</p>
              </GlassSurface>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
