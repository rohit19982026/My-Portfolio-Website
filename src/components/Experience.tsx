"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";
import ShirtZipperReveal from "./ui/ShirtZipperReveal";

const alpha = (token: string, pct: number) =>
  `color-mix(in srgb, var(--color-${token}) ${pct}%, transparent)`;

const roles = [
  {
    period: "DEC 2022 — PRESENT",
    title: "Technical Project Manager — Data & AI",
    org: "phData · Snowflake Elite Partner · Bengaluru",
    current: true,
    color: "fg",
    bullets: [
      "Run four to five programs at once for US Fortune 500 clients, each with 12–15 engineers and a budget between $250K and $1M.",
      "Work through requirements and estimates with our Principal Architects before the SOW is signed, then turn the scope into a plan and backlog the team can start on.",
      "Run the sprint rhythm and keep the risk register and decision log current, with Jira dashboards showing lead time, throughput, and where work is stuck.",
      "Act as the main contact for client VPs and C-level sponsors across a 10–12 hour time difference, and bring their priorities back to our sales, engineering, and leadership teams.",
      "Tell clients early when a request won't work as asked, and find the version that will. On one engagement that meant handling 14 requests outside the signed SOW without any of it becoming free work.",
      "Own invoicing, forecasts, and burn-down for each program. Quarterly reviews with sponsors have turned into follow-on work and larger accounts.",
      "Built a Jira dependency tracker in Apps Script that shows which tickets block each other and for how long. One engineering team dropped its weekly status meeting because of it.",
      "Built Glean and Claude agents for project setup, program health reports, and month-end billing audits. They save 4–8 hours of PMO work a week and won phData's Innovation Award.",
    ],
    tags: ["Program Delivery", "Risk & Budget Control", "Stakeholder Management", "Change Orders", "Account Expansion", "Scrum (PSM I)", "AI Agents"],
  },
  {
    period: "AUG 2020 — NOV 2022",
    title: "Change Manager — IT Infrastructure",
    org: "British Telecom (BT) · Kolkata",
    current: false,
    color: "accent",
    bullets: [
      "Managed 50+ infrastructure changes a year across network, systems, and application teams, with 99.9% uptime.",
      "Took each change through risk assessment and rollback planning, and presented them to senior IT leadership at the Change Advisory Board.",
      "Kept everyone affected informed before, during, and after each change window.",
    ],
    tags: ["ITIL Foundation", "CAB Governance", "99.9% Uptime", "Change Risk Assessment", "Stakeholder Communication"],
  },
];

export default function Trajectory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="experience" className="py-24 bg-surface border-t-2 border-fg/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="02 / EXPERIENCE"
          segments={[
            { text: "Role history.", style: "fill" },
            { text: "What shipped.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed mb-12">
          Six years in delivery. Almost four at phData running data and AI programs, and two
          before that at British Telecom, making sure UK network changes didn&apos;t take
          anything down.
        </p>

        <ShirtZipperReveal>
        <div className="relative">
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: `linear-gradient(180deg, var(--color-accent), ${alpha("accent", 10)})` }}
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
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-surface -translate-x-1/2"
                  style={{ backgroundColor: `var(--color-${role.color})` }}
                />

                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-fg/55">
                    {role.period}
                  </p>
                  {role.current && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide"
                      style={{ background: alpha("accent", 12), color: "var(--color-accent)", border: `1px solid ${alpha("accent", 30)}` }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-[19px] font-bold leading-snug text-fg mb-1">
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
                    <li key={bi} className="flex gap-3 text-[13.5px] text-fg/70 leading-relaxed">
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
        </ShirtZipperReveal>
      </div>
    </section>
  );
}
