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
      "Own full project lifecycle — initiation to closure — for 4–6 concurrent Data Platform and AI programs ($3.5M+ combined contract value), held against agreed scope, timeline, budget, and quality KPIs.",
      "Maintain RACI, WBS, decision logs, dependency maps, and risk registers in Jira and Confluence, with milestone tracking dashboards keeping every active program visible from kickoff through delivery close.",
      "Manage full financial governance — monthly invoicing, budget forecast vs. actuals, burn-rate tracking, and variance reporting to client and internal leadership.",
      "Run the delivery cadence that keeps programs on track — standups, program syncs, and steering reviews — with focused retrospectives feeding fixes back into how the next sprint runs.",
      "Turn program data — burn rates, sprint velocity, ticket ages — into the weekly status, risk, and trade-off reporting leadership and clients act on, so problems surface before they're client-visible.",
      "Primary bridge between engineering delivery, QA, and client C-level/VP stakeholders — own weekly status reporting, quarterly business reviews, and escalation management; issues get root-caused and fixed systemically, not patched over.",
      "Drive account expansion through QBR-led discovery — grown multiple single-program engagements into multi-year platform relationships.",
      "Keep client satisfaction high by communicating progress, risk, and trade-offs before they're asked for, not after.",
      "Design, pilot, and scale AI-integrated PM processes — built AI agents (Glean + Claude + n8n) that generate status and risk reports, run financial reviews, and automate program setup, now standard workflow across the PMO team. Saves 5+ hours a week; won phData's Innovation Award.",
      "Manage scope discipline once a program is live — one engagement pushed 14 additions beyond the signed SOW; every one formally logged and resolved so none became free work.",
    ],
    tags: ["PMO Governance", "RACI · WBS · Risk Register", "Financial Management", "C-Level Stakeholder Mgmt", "Account Expansion", "Scrum Master (PSM1)", "AI Agent Builder", "Predictive Risk Reporting"],
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
