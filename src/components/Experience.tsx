"use client";

import { motion, MotionConfig, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type CSSProperties, type PointerEvent } from "react";

// Card palettes: [tint, border, soft fill, accent]
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

// How long each role lasted, for the little tenure bar. Stated in the same
// words as the intro line ("almost four at phData ... two before"), not new claims.
const TENURE = [
  { label: "Almost four years", share: 1 },
  { label: "About two years", share: 0.56 },
];

const INK = "#0d0d1f";
const MUTED = "#5f6477";
const BLUE = "#3d36f5";
const ACCENT = "#6d3fe0";
const EASE = [0.2, 0.7, 0.2, 1] as const;

function Card({ point, i, palette }: { point: Point; i: number; palette: (typeof PALETTES)[number] }) {
  const [tint, border, soft, accent] = palette;
  const ref = useRef<HTMLDivElement>(null);
  const lit = useInView(ref, { once: true, margin: "-42% 0px -42% 0px" });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className="relative pl-[3.4rem] sm:pl-[4.2rem]"
    >
      {/* numbered node on the rail: lights up as the card reaches the middle of the screen */}
      <span
        ref={ref as unknown as React.RefObject<HTMLSpanElement>}
        aria-hidden
        className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-full font-sans text-[13px] font-bold tabular-nums transition-all duration-500 sm:top-5 sm:h-11 sm:w-11"
        style={{
          background: lit ? accent : "#ffffff",
          color: lit ? "#ffffff" : accent,
          border: `2px solid ${lit ? accent : border}`,
          boxShadow: lit ? `0 0 0 6px color-mix(in srgb, ${accent} 16%, transparent), 0 10px 22px -8px ${accent}` : "none",
          transform: lit ? "scale(1.06)" : "scale(1)",
        }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      <div
        onPointerMove={onMove}
        className="group relative overflow-hidden rounded-[1.4rem] p-4 transition-all duration-300 hover:-translate-y-1 sm:rounded-[1.6rem] sm:p-6"
        style={
          {
            "--sx": "50%",
            "--sy": "0%",
            "--accent": accent,
            background: `linear-gradient(135deg, ${tint}, #ffffff 85%)`,
            border: `1px solid ${border}`,
            boxShadow: `0 14px 30px -24px color-mix(in srgb, ${accent} 55%, transparent)`,
            color: INK,
          } as CSSProperties
        }
      >
        {/* a soft light that follows the mouse */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(280px circle at var(--sx) var(--sy), color-mix(in srgb, ${accent} 16%, transparent), transparent 65%)` }}
        />
        <div className="relative grid grid-cols-[1fr_auto] items-start gap-x-4 sm:gap-x-6">
          <div className="min-w-0">
            <h4 className="font-sans text-[16.5px] font-bold leading-snug tracking-[-0.02em] sm:text-[19px]">{point.title}</h4>
            <p className="mt-1.5 font-sans text-[14px] leading-relaxed sm:text-[15px]" style={{ color: MUTED }}>
              {point.text}
            </p>
          </div>
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:-rotate-6 sm:h-[68px] sm:w-[68px] sm:rounded-2xl"
            style={{ background: soft }}
          >
            <Image
              src={`/experience/icon-${point.icon}.png`}
              alt=""
              width={106}
              height={106}
              className="h-8 w-8 select-none sm:h-14 sm:w-14"
              style={{ mixBlendMode: "multiply" }}
            />
          </span>
        </div>
      </div>
    </motion.li>
  );
}

function Role({ role, index }: { role: (typeof roles)[number]; index: number }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 62%", "end 58%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const dot = useTransform(fill, (v) => `${v * 100}%`);
  const tenure = TENURE[index];

  return (
    <article className="grid gap-9 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
      {/* role panel: stays in view beside the cards on large screens */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#5b5878" }}>
            {role.period}
          </p>
          {role.current && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ background: "#e9e2ff", color: ACCENT }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: ACCENT }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: ACCENT }} />
              </span>
              Current
            </span>
          )}
        </div>
        <h3
          className="mt-3 font-sans font-extrabold leading-[1.1] tracking-[-0.03em]"
          style={{ fontSize: "clamp(1.6rem, 5vw, 2.1rem)", color: INK }}
        >
          {role.titleMain}
          {role.titleSub && (
            <>
              <br />
              <span style={{ color: ACCENT }}>{role.titleSub}</span>
            </>
          )}
        </h3>
        <p className="mt-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#6b6880" }}>
          {role.org}
        </p>

        <div className="mt-5 max-w-[260px]">
          <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#ece8fa" }}>
            <motion.span
              className="block h-full origin-left rounded-full"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, ${BLUE})`, width: `${tenure.share * 100}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            />
          </div>
          <p className="mt-2 font-sans text-[12.5px] font-medium" style={{ color: MUTED }}>
            {tenure.label}
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full px-3 py-1.5 font-sans text-[11.5px] font-semibold"
              style={{ background: "#f1edff", border: "1px solid #e1d9ff", color: "#5a3bc0" }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </motion.header>

      <ol ref={listRef} className="relative grid gap-4 sm:gap-5">
        {/* the rail: fills with colour as you scroll past the cards */}
        <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-[2px] rounded-full sm:left-[21px]" style={{ background: "#e6e1f6" }} />
        <motion.span
          aria-hidden
          className="absolute bottom-6 left-[19px] top-6 w-[2px] origin-top rounded-full sm:left-[21px]"
          style={{ scaleY: fill, background: `linear-gradient(180deg, ${ACCENT}, ${BLUE})` }}
        />
        <motion.span
          aria-hidden
          className="absolute left-[14px] top-6 h-[12px] w-[12px] rounded-full sm:left-[16px]"
          style={{
            top: dot,
            marginTop: "1.5rem",
            background: "#ffffff",
            border: `3px solid ${BLUE}`,
            boxShadow: `0 0 0 5px color-mix(in srgb, ${BLUE} 18%, transparent), 0 0 18px ${BLUE}`,
          }}
        />
        {role.points.map((p, i) => (
          <Card key={p.title} point={p} i={i} palette={PALETTES[i % PALETTES.length]} />
        ))}
      </ol>
    </article>
  );
}

export default function Trajectory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobA = useTransform(scrollYProgress, [0, 1], [-40, 120]);
  const blobB = useTransform(scrollYProgress, [0, 1], [60, -140]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="experience"
        className="relative overflow-x-clip py-20 sm:py-24"
        style={{ background: "#fefdfd", color: INK, borderTop: "2px solid rgba(13,13,31,0.06)" }}
      >
        <noscript>
          <style>{"#experience li,#experience header{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {/* soft pastel light that drifts as you scroll */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-24 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
          style={{ y: blobA, background: "radial-gradient(closest-side, #e6defd, transparent)" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-[55%] h-[460px] w-[460px] rounded-full opacity-60 blur-3xl"
          style={{ y: blobB, background: "radial-gradient(closest-side, #ffedd0, transparent)" }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 sm:mb-16"
          >
            <p className="flex items-center gap-4 font-sans text-[12px] font-semibold uppercase tracking-[0.24em] sm:text-[13px]" style={{ color: "#6b7083" }}>
              <span aria-hidden className="h-[2px] w-9" style={{ background: BLUE }} />
              02 / Experience
            </p>
            <h2 className="mt-4 font-sans font-extrabold leading-[1.05] tracking-[-0.035em]" style={{ fontSize: "clamp(2.1rem, 8.5vw, 3.5rem)" }}>
              Role history. <span style={{ color: BLUE }}>What shipped.</span>
            </h2>
            <p className="mt-4 max-w-xl font-sans text-[16px] leading-relaxed" style={{ color: MUTED }}>
              Six years in IT delivery: almost four at phData running data and AI programs, and two
              before that managing infrastructure changes at British Telecom.
            </p>
          </motion.div>

          {roles.map((role, i) => (
            <div key={role.titleMain}>
              {i > 0 && (
                <div className="my-14 flex items-center gap-4 sm:my-20" aria-hidden>
                  <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, #d9d3ee)" }} />
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: "#6b6880" }}>
                    Before phData
                  </span>
                  <span className="h-px flex-1" style={{ background: "linear-gradient(270deg, transparent, #d9d3ee)" }} />
                </div>
              )}
              <Role role={role} index={i} />
            </div>
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
