"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";

const alpha = (token: string, pct: number) =>
  `color-mix(in srgb, var(--color-${token}) ${pct}%, transparent)`;

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Technical Project Manager — Data & AI",
    org: "phData · Snowflake Elite Partner · Bengaluru",
    current: true,
    color: "white",
    bullets: [
      "Run PMO governance across 4–6 concurrent Data Platform and AI programs — fixed-price migrations, T&M, managed retainers, $3.5M+ combined contract value. RACI, WBS, decision logs, and budget variance stay current from kickoff to close; risk gets flagged two sprints before it becomes a real problem.",
      "17 external approvals had stalled for weeks with no owner watching them. I put a name and a day-count on each, visible to the people who could actually clear them — the wait stopped being invisible, and so did the delay.",
      "A managed retainer's UAT was running 11 days. I traced exactly where the pipeline stalled and put the specific items, owners, and wait times in front of the people who could act. The cycle dropped to 4 days.",
      "I'm the bridge between the engineering team and the client's business leadership — weekly status, quarterly business reviews, and scoping new programs with Principal Architects during presales, then carrying them through delivery myself. Those relationships have grown single-program work into multi-year platform engagements more than once.",
      "Built AI agents (Glean + Claude + n8n) for monthly financial reviews, weekly status briefs, and new program setup. Saves 5+ hours a week. Won phData's Innovation Award.",
      "Scoped 10+ programs end to end. One client pushed 14 scope additions beyond the agreed contract. Every one formally logged and resolved — none became free work.",
    ],
    tags: ["PMO Governance", "RACI · WBS · Risk Register", "Financial Management", "C-Level Stakeholder Mgmt", "Presales-to-Delivery", "Account Expansion", "Scrum Master (PSM1)", "AI Agent Builder"],
  },
  {
    period: "AUG 2020 — NOV 2022",
    title: "Change Manager — IT Infrastructure",
    org: "British Telecom (BT) · Kolkata",
    current: false,
    color: "lime",
    bullets: [
      "Change governance for critical UK telecom infrastructure — formal review, rollback planning, approval gating for 50+ changes a year. 99.9% uptime.",
      "Owned all stakeholder communication around change events: brief before, live status during, report after.",
    ],
    tags: ["ITIL Foundation", "CAB Governance", "99.9% Uptime", "Change Risk Assessment", "Cross-functional Communication"],
  },
];

export default function Trajectory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 bg-ink">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="01 / EXPERIENCE"
          segments={[
            { text: "Where I've worked.", style: "fill" },
            { text: "What I delivered.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p ref={ref} className="text-[16px] text-white/70 max-w-xl leading-relaxed mb-14">
          Six years in delivery. Three and a half at phData running data and AI programs,
          two and a half before that at British Telecom running change for UK network
          infrastructure.
        </p>

        <div className="relative">
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: `linear-gradient(180deg, var(--color-lime), ${alpha("lime", 10)})` }}
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
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-ink -translate-x-1/2"
                  style={{ backgroundColor: `var(--color-${role.color})` }}
                />

                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-white/55">
                    {role.period}
                  </p>
                  {role.current && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide"
                      style={{ background: alpha("lime", 12), color: "var(--color-lime)", border: `1px solid ${alpha("lime", 30)}` }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-[19px] font-bold leading-snug text-white mb-1">
                  {role.title}
                </h3>
                <p
                  className="font-heading text-[11px] font-bold uppercase tracking-wider mb-5"
                  style={{ color: `var(--color-${role.color})` }}
                >
                  {role.org}
                </p>

                <ul className="space-y-3 mb-5">
                  {role.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-[13.5px] text-white/70 leading-relaxed">
                      <span
                        className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: `var(--color-${role.color})` }}
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
                        border: `1px solid ${alpha(role.color, 25)}`,
                        backgroundColor: alpha(role.color, 8),
                        color: `var(--color-${role.color})`,
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
    </section>
  );
}
