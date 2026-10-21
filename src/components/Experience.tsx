"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";
import { useContext, useEffect, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import ShirtZipperReveal, { ZipRevealContext } from "./ui/ShirtZipperReveal";

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
    org: "phData · Bengaluru",
    points: [
      { title: "Program Delivery", icon: 1, text: "Manage four to five data and AI programs at once for US Fortune 500 clients, each with its own engineering team." },
      { title: "Requirements and Planning", icon: 2, text: "Review client requirements and effort estimates with the Principal Architects before the SOW is signed. Then break the agreed scope into a WBS, RACI and Jira backlog for the engineering team." },
      { title: "Sprint and Risk Management", icon: 3, text: "Run sprint planning, stand-ups and retrospectives for each program. Keep the risk register and decision log current, and track progress and blockers in Jira dashboards." },
      { title: "Dependency Management", icon: 2, text: "Chase client-side dependencies such as system access, data and approvals from kickoff onward." },
      { title: "Client and Stakeholder Management", icon: 4, text: "Main contact for client VPs, directors and C-level sponsors, with weekly status updates across a 10–12 hour India–US time gap. Keep sales, engineering, architects and leadership aligned on goals, status and open risks." },
      { title: "Scope and Expectations", icon: 5, text: "Set expectations on scope, timelines and trade-offs, and work out a middle ground with engineering when a request isn't feasible as asked. Assess mid-project changes against the SOW and raise change orders for out-of-scope work." },
      { title: "Commercial and Reporting", icon: 6, text: "Run monthly invoicing, forecast vs actuals and burn-down for each program, and flag budget variance early. Use QBRs to review challenges with sponsors and look for follow-on work." },
      { title: "Process Automation", icon: 7, text: "Built a Jira dependency tracker with Google Apps Script and the Jira REST API. It pulls active stories on a schedule, maps which tickets block each other and counts days blocked. Its reports took the place of one team's weekly status meeting." },
      { title: "AI Agents", icon: 1, text: "Built three PMO agents with Glean and Claude. One sets up new projects from signed SOWs in Salesforce and sends client status updates by email and Slack, one posts a weekly program-health summary to Slack, and one checks billing data at month-end and lists each inconsistency with an action item. They save an estimated 4–8 hours of PMO work a week, and the work earned phData's Innovation Award." },
    ],
    tags: ["Program Delivery", "Budget Tracking", "Stakeholder Management", "Change Orders", "Scrum (PSM I)", "AI Agents"],
  },
  {
    period: "AUG 2020 TO NOV 2022",
    current: false,
    titleMain: "Change Manager",
    titleSub: "IT Infrastructure",
    org: "British Telecom (BT) · Kolkata",
    points: [
      { title: "Change Delivery", icon: 3, text: "Managed infrastructure changes across network, systems and application teams under ITIL." },
      { title: "Risk and Rollback", icon: 2, text: "Took each change from intake through risk assessment, rollback planning and post-implementation review." },
      { title: "CAB and Communication", icon: 5, text: "Presented changes at Change Advisory Board sessions to senior IT leadership, and ran stakeholder communication for each change window." },
    ],
    tags: ["ITIL Foundation", "CAB Governance", "Change Risk Assessment", "Stakeholder Communication"],
  },
];


// A card that appears when the zipper's opening reaches it, not when it
// scrolls into view: each card turns the shared apex position into its own
// 0..1 progress from its distance below the top of the shirt.
function RevealCard({ className, style, children }: { className: string; style: CSSProperties; children: ReactNode }) {
  const ctx = useContext(ZipRevealContext);
  const prefersReduced = useReducedMotion();
  // hydration-safe: the server always renders the animated state
  const reduce = useSyncExternalStore(
    () => () => {},
    () => !!prefersReduced,
    () => false,
  );
  const ref = useRef<HTMLLIElement>(null);
  const top = useMotionValue(0);
  const fallback = useMotionValue(1);
  // measured once per layout change (not per frame): the card's offset from the top of the shirt
  useEffect(() => {
    const el = ref.current;
    const box = ctx?.box.current;
    const content = ctx?.content.current;
    if (!el || !box || !content) return;
    const measure = () => {
      let t = 0;
      let n: HTMLElement | null = el;
      while (n && n !== box) {
        t += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      top.set(t);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(content);
    return () => ro.disconnect();
  }, [ctx, top]);
  const apex = ctx?.apex ?? fallback;
  const r = useTransform([apex, top], (v: number[]) => (ctx && !reduce ? Math.min(1, Math.max(0, (v[0] - v[1] + 40) / 200)) : 1));
  const y = useTransform(r, [0, 1], [26, 0]);
  const scale = useTransform(r, [0, 1], [0.97, 1]);
  return (
    <motion.li ref={ref} className={className} style={{ ...style, opacity: r, y, scale }}>
      {children}
    </motion.li>
  );
}

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
          Six years in IT delivery: almost four at phData running data and AI programs, and two
          before that managing infrastructure changes at British Telecom.
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
                      <RevealCard
                        key={p.title}
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
                      </RevealCard>
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
