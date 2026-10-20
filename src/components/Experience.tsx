"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";
import ShirtZipperReveal from "./ui/ShirtZipperReveal";

// Card palettes from the supplied design: [tint, border, number-pill bg, number colour]
const PALETTES = [
  ["#f3efff", "#e3dcff", "#e9e2ff", "#6d3fe0"],
  ["#fff5e3", "#fde6bf", "#ffeccc", "#e08a00"],
  ["#eaf8ec", "#cfeed4", "#d9f3dd", "#1f9d4a"],
  ["#ffecf0", "#fbd2db", "#ffdde4", "#e0334f"],
  ["#e9f0ff", "#d0defc", "#dbe6ff", "#2563eb"],
  ["#f3efff", "#e3dcff", "#e9e2ff", "#6d3fe0"],
  ["#eaf8ec", "#cfeed4", "#d9f3dd", "#1f9d4a"],
  ["#f3efff", "#e3dcff", "#e9e2ff", "#6d3fe0"],
] as const;

type Point = { title: string; text: string; icon: number };

const roles: {
  period: string;
  current: boolean;
  titleMain: string;
  titleSub?: string;
  org: string;
  points: Point[];
  tags: string[];
}[] = [
  {
    period: "DEC 2022 TO PRESENT",
    current: true,
    titleMain: "Technical Project Manager",
    titleSub: "Data & AI",
    org: "phData · Snowflake Elite Partner · Bengaluru",
    points: [
      { title: "Program Delivery", icon: 1, text: "Run four to five programs at once for US Fortune 500 clients, each with 12–15 engineers and a budget between $250K and $1M." },
      { title: "Requirements and Planning", icon: 2, text: "Work through requirements and estimates with our Principal Architects before the SOW is signed, then turn the scope into a plan and backlog the team can start on." },
      { title: "Sprint and Risk Management", icon: 3, text: "Run the sprint rhythm and keep the risk register and decision log current, with Jira dashboards showing lead time, throughput, and where work is stuck." },
      { title: "Client and Stakeholder Management", icon: 4, text: "Act as the main contact for client VPs and C-level sponsors across a 10–12 hour time difference, and bring their priorities back to our sales, engineering, and leadership teams." },
      { title: "Expectations and Scope Control", icon: 5, text: "Tell clients early when a request won't work as asked, and find the version that will. On one engagement that meant handling 14 requests outside the signed SOW without any of it becoming free work." },
      { title: "Commercial and Reporting", icon: 6, text: "Own invoicing, forecasts, and burn-down for each program. Quarterly reviews with sponsors have turned into follow-on work and larger accounts." },
      { title: "Process Automation", icon: 7, text: "Built a Jira dependency tracker in Apps Script that shows which tickets block each other and for how long. One engineering team dropped its weekly status meeting because of it." },
      { title: "AI Agents", icon: 1, text: "Built Glean and Claude agents for project setup, program health reports, and month-end billing audits. They save 4–8 hours of PMO work a week and won phData's Innovation Award." },
    ],
    tags: ["Program Delivery", "Risk & Budget Control", "Stakeholder Management", "Change Orders", "Account Expansion", "Scrum (PSM I)", "AI Agents"],
  },
  {
    period: "AUG 2020 TO NOV 2022",
    current: false,
    titleMain: "Change Manager",
    titleSub: "IT Infrastructure",
    org: "British Telecom (BT) · Kolkata",
    points: [
      { title: "Change Delivery", icon: 3, text: "Managed 50+ infrastructure changes a year across network, systems, and application teams, with 99.9% uptime." },
      { title: "Risk and Rollback", icon: 2, text: "Took each change through risk assessment and rollback planning, and presented them to senior IT leadership at the Change Advisory Board." },
      { title: "Communication", icon: 5, text: "Kept everyone affected informed before, during, and after each change window." },
    ],
    tags: ["ITIL Foundation", "CAB Governance", "99.9% Uptime", "Change Risk Assessment", "Stakeholder Communication"],
  },
];

const INK = "#0d0d1f";
const ACCENT = "#6d3fe0";

export default function Trajectory() {
  return (
    <section id="experience" className="py-24 bg-surface border-t-2 border-fg/10">
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
          <div className="space-y-20">
            {roles.map((role) => (
              <div key={role.titleMain}>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#5b5878" }}>
                    {role.period}
                  </p>
                  {role.current && (
                    <span
                      className="rounded-full px-3.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ background: "#e9e2ff", color: ACCENT }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <h3
                  className="mt-2.5 font-sans font-extrabold leading-[1.12] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(1.35rem, 4.6vw, 1.9rem)", color: INK }}
                >
                  {role.titleMain}
                  {role.titleSub && (
                    <>
                      <br />
                      <span style={{ color: ACCENT }}>{role.titleSub}</span>
                    </>
                  )}
                </h3>
                <p className="mt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#6b6880" }}>
                  {role.org}
                </p>

                <ol className="mt-7 grid gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
                  {role.points.map((p, i) => {
                    const [tint, border, pillBg, pillFg] = PALETTES[i % PALETTES.length];
                    return (
                      <motion.li
                        key={p.title}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3.5 rounded-[1.6rem] p-4 sm:gap-x-5 sm:p-6"
                        style={{
                          background: `linear-gradient(135deg, ${tint}, #ffffff 85%)`,
                          border: `1px solid ${border}`,
                          boxShadow: "0 14px 30px -24px rgba(80,60,160,0.35)",
                          color: INK,
                        }}
                      >
                        <span
                          className="flex h-11 w-11 items-center justify-center self-start rounded-full font-sans text-[17px] font-bold tabular-nums sm:h-14 sm:w-14 sm:text-[21px]"
                          style={{ background: pillBg, color: pillFg }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-sans text-[16.5px] font-bold leading-snug tracking-[-0.02em] sm:text-[19px]">{p.title}</h4>
                          <p className="mt-1 font-sans text-[13.5px] leading-relaxed sm:text-[14.5px]" style={{ color: "#6b6880" }}>
                            {p.text}
                          </p>
                        </div>
                        <Image
                          src={`/experience/icon-${p.icon}.png`}
                          alt=""
                          width={106}
                          height={106}
                          className="h-12 w-12 select-none rounded-2xl sm:h-[68px] sm:w-[68px]"
                          style={{ mixBlendMode: "multiply" }}
                        />
                      </motion.li>
                    );
                  })}
                </ol>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full px-3 py-1.5 font-sans text-[11px] font-semibold"
                      style={{ background: "#f1edff", border: "1px solid #e1d9ff", color: "#5a3bc0" }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ShirtZipperReveal>
      </div>
    </section>
  );
}
