"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

// Each icon image has its own colour; the card's wash and icon tile take that colour, so they match.
const ICON_HUE: Record<number, string> = { 1: "#6d3fe0", 2: "#d98a00", 3: "#1f9d4a", 4: "#e0334f", 5: "#2563eb", 6: "#6d3fe0", 7: "#1f9d4a" };

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
      { title: "Program Delivery", icon: 1, text: "Manage four to five data and AI programs at once for US Fortune 500 clients. Each is worth $500K to $2M and has its own team of 12 to 15 engineers. Most move a client's older systems onto Snowflake or AWS and their reporting to Tableau or Sigma." },
      { title: "Requirements and Planning", icon: 2, text: "Review client requirements and effort estimates with the Principal Architects before the SOW is signed. Then break the agreed scope into a WBS, RACI and Jira backlog for the engineering team." },
      { title: "Sprint and Risk Management", icon: 3, text: "Run sprint planning, stand-ups and retrospectives for each program. Keep the risk register and decision log current, and track progress and blockers in Jira dashboards." },
      { title: "Dependency Management", icon: 2, text: "Chase client-side dependencies such as system access, data and approvals from kickoff onward." },
      { title: "Client and Stakeholder Management", icon: 4, text: "Main contact for client VPs, directors and C-level sponsors, with weekly status updates across a 10–12 hour India–US time gap. Keep sales, engineering, architects and leadership aligned on goals, status and open risks." },
      { title: "Scope and Expectations", icon: 5, text: "Set expectations on scope, timelines and trade-offs, and work out a middle ground with engineering when a request isn't feasible as asked. Assess mid-project changes against the SOW and raise change orders for out-of-scope work." },
      { title: "Commercial and Reporting", icon: 6, text: "Run monthly invoicing, forecast vs actuals and burn-down for each program, and flag budget variance early. Use quarterly reviews to go through problems openly with sponsors. Three clients have extended into analytics or AI/ML work after their migration." },
      { title: "Process Automation", icon: 7, text: "Built a Jira dependency tracker with Google Apps Script and the Jira REST API. It pulls active stories on a schedule, maps which tickets block each other and counts days blocked. Its reports took the place of one team's weekly status meeting." },
      { title: "AI Agents", icon: 1, text: "Built three PMO agents with Glean and Claude. One sets up a new project from a signed SOW in Salesforce and sends client status updates by email and Slack. One posts a weekly program-health summary to Slack. One runs 17 checks on month-end billing data and lists each issue with a fix, which cut a 10-hour manual review to under 30 minutes. I also built a few smaller Claude helpers, listed under Tools below. I estimate the tools save 4–8 hours of PMO work a week, and the work earned phData's Innovation Award." },
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
      { title: "Change Delivery", icon: 3, text: "Managed 50+ changes a year to live IT systems, such as network, server and application updates, working with the network, systems and application teams under ITIL." },
      { title: "Risk and Rollback", icon: 2, text: "For each change I checked the risk, set the date, prepared a rollback plan and confirmed it worked after release, so systems kept running without disruption." },
      { title: "Approvals and Communication", icon: 5, text: "Presented each change to the Change Advisory Board, a panel of senior IT leaders who approve or reject changes. Told the affected teams what was changing and when, before and during the change." },
    ],
    tags: ["ITIL Foundation", "CAB Governance", "Change Risk Assessment", "Stakeholder Communication"],
  },
];

// How long each role lasted, in the same words as the intro line below.
const TENURE = ["Almost four years", "About two years"];

const INK = "#0d0d1f";
const MUTED = "#5f6477";
const BLUE = "#3d36f5";
const ACCENT = "#6d3fe0";
const EASE = [0.22, 1, 0.36, 1] as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const cardV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, staggerChildren: 0.07, delayChildren: 0.08 } },
};
const partV: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** A number on the rail. Its fill comes from the same progress value as the line, at the node's own position. */
function Node({ n, t, fill }: { n: number; t: number; fill: MotionValue<number> }) {
  // opacity only, so the fill never repaints
  const on = useTransform(fill, (v) => clamp((v - t) / 0.02 + 0.5, 0, 1));
  const off = useTransform(on, (v) => 1 - v);
  const label = String(n).padStart(2, "0");
  return (
    <span
      aria-hidden
      className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white font-sans text-[12.5px] font-bold tabular-nums sm:top-5 sm:h-11 sm:w-11"
      style={{ border: "1.5px solid #d9d2ee" }}
    >
      <motion.span className="absolute -inset-[1.5px] rounded-full" style={{ background: ACCENT, opacity: on }} />
      <motion.span className="relative" style={{ color: "#8f8aa8", opacity: off }}>
        {label}
      </motion.span>
      <motion.span className="absolute inset-0 flex items-center justify-center text-white" style={{ opacity: on }}>
        {label}
      </motion.span>
    </span>
  );
}

function Card({
  point,
  i,
  hue,
  t,
  fill,
  liRef,
}: {
  point: Point;
  i: number;
  hue: string;
  t: number;
  fill: MotionValue<number>;
  liRef: (el: HTMLLIElement | null) => void;
}) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <motion.li
      ref={liRef}
      variants={cardV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -48px 0px" }}
      className="relative pl-[3.4rem] sm:pl-[4.2rem]"
    >
      <Node n={i + 1} t={t} fill={fill} />
      <div
        onPointerMove={onMove}
        className="group relative overflow-hidden rounded-[1.25rem] border bg-white p-4 transition-[transform,box-shadow,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--hue)_38%,#e6e2f2)] hover:shadow-[0_1px_2px_rgba(13,13,31,.05),0_18px_34px_-18px_rgba(13,13,31,.2)] active:scale-[0.995] sm:rounded-[1.4rem] sm:p-6"
        style={
          {
            "--hue": hue,
            "--sx": "50%",
            "--sy": "0%",
            borderColor: "rgba(13,13,31,.08)",
            boxShadow: "0 1px 2px rgba(13,13,31,.04), 0 12px 28px -20px rgba(13,13,31,.16)",
            color: INK,
          } as CSSProperties
        }
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(120% 90% at 0% 0%, color-mix(in srgb, ${hue} 7%, #ffffff), transparent 55%)` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(260px circle at var(--sx) var(--sy), color-mix(in srgb, ${hue} 8%, transparent), transparent 65%)` }}
        />
        <div className="relative grid grid-cols-[1fr_auto] items-start gap-x-4 sm:gap-x-6">
          <div className="min-w-0">
            <motion.h4 variants={partV} className="font-sans text-[16.5px] font-bold leading-snug tracking-[-0.02em] sm:text-[19px]">
              {point.title}
            </motion.h4>
            <motion.p variants={partV} className="mt-1.5 font-sans text-[14px] leading-relaxed sm:text-[15px]" style={{ color: MUTED }}>
              {point.text}
            </motion.p>
          </div>
          <motion.span
            variants={partV}
            className="block h-10 w-10 shrink-0 overflow-hidden rounded-xl transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] sm:h-16 sm:w-16 sm:rounded-2xl"
            style={{ border: `1px solid color-mix(in srgb, ${hue} 16%, #ffffff)` }}
          >
            <Image
              src={`/experience/icon-${point.icon}.png`}
              alt=""
              width={106}
              height={106}
              className="h-full w-full select-none object-cover"
            />
          </motion.span>
        </div>
      </div>
    </motion.li>
  );
}

function Role({ role, index }: { role: (typeof roles)[number]; index: number }) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [ts, setTs] = useState<number[]>(() => role.points.map(() => 2));
  const [active, setActive] = useState(0);

  // the line's tip sits on one fixed line of the screen, 60% down; each node is lit
  // by the same value, so a node fills exactly as the line reaches its centre
  const { scrollYProgress: fill } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });

  const measure = useCallback(() => {
    const ol = listRef.current;
    if (!ol || !ol.offsetHeight) return;
    const next = liRefs.current.map((li) => (li ? (li.offsetTop + (li.offsetWidth > 700 ? 40 : 36)) / ol.offsetHeight : 2));
    setTs((prev) => (prev.length === next.length && prev.every((v, k) => Math.abs(v - next[k]) < 0.001) ? prev : next));
  }, []);

  useLayoutEffect(() => {
    measure();
    const ol = listRef.current;
    if (!ol) return;
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, [measure]);

  useMotionValueEvent(fill, "change", (v) => {
    const n = ts.filter((t) => v >= t).length;
    setActive((prev) => (prev === n ? prev : n));
  });

  const shown = Math.max(1, active);

  return (
    <article className="grid gap-9 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
      <motion.header
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <motion.div variants={rise} className="flex flex-wrap items-center gap-3">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#5b5878" }}>
            {role.period}
          </p>
          {role.current && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ background: "#f1ecff", color: ACCENT }}
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: ACCENT }}
                    animate={{ scale: [1, 3], opacity: [0.35, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              </span>
              Current
            </span>
          )}
        </motion.div>
        <motion.p variants={rise} className="mt-1.5 font-sans text-[13px]" style={{ color: MUTED }}>
          {TENURE[index]}
        </motion.p>
        <motion.h3
          variants={rise}
          className="mt-4 font-sans font-extrabold leading-[1.1] tracking-[-0.03em]"
          style={{ fontSize: "clamp(1.6rem, 5vw, 2.1rem)", color: INK }}
        >
          {role.titleMain}
          {role.titleSub && (
            <>
              <br />
              <span style={{ color: ACCENT }}>{role.titleSub}</span>
            </>
          )}
        </motion.h3>
        <motion.p variants={rise} className="mt-3 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#6b6880" }}>
          {role.org}
        </motion.p>

        <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-2">
          {role.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full px-3 py-1.5 font-sans text-[11.5px] font-semibold"
              style={{ background: "#f7f5fd", border: "1px solid #e9e4f7", color: "#5a3bc0" }}
            >
              {tag}
            </li>
          ))}
        </motion.ul>

        {/* where you are in the list, following the scroll */}
        <motion.div variants={rise} className="mt-7 hidden items-baseline gap-2 lg:flex" aria-hidden>
          <span className="relative inline-block h-[1.4em] w-[1.6em] overflow-hidden font-sans text-[20px] font-bold tabular-nums" style={{ color: INK }}>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={shown}
                className="absolute inset-0 block"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {String(shown).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="font-sans text-[13px] font-medium tabular-nums" style={{ color: "#9a96b3" }}>
            / {String(role.points.length).padStart(2, "0")}
          </span>
        </motion.div>
      </motion.header>

      <ol ref={listRef} className="relative grid gap-4 sm:gap-5">
        {/* the rail: a hairline, and a line in the brand colour that follows the scroll exactly */}
        <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px sm:left-[21.5px]" style={{ background: "#e6e1f4" }} />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-[18.5px] top-0 w-[2px] origin-top sm:left-[21px]"
          style={{ scaleY: fill, background: `linear-gradient(180deg, ${ACCENT}, ${BLUE})` }}
        />
        {role.points.map((p, i) => (
          <Card
            key={p.title}
            point={p}
            i={i}
            hue={ICON_HUE[p.icon] ?? ACCENT}
            t={ts[i] ?? 2}
            fill={fill}
            liRef={(el) => {
              liRefs.current[i] = el;
            }}
          />
        ))}
      </ol>
    </article>
  );
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

const WORDS_A = ["Where", "I've"];
const WORDS_B = ["worked."];

export default function Trajectory() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="experience"
        className="relative overflow-x-clip py-20 sm:py-24"
        style={{
          background: "radial-gradient(60% 38% at 92% 0%, rgba(109,63,224,.055), transparent 70%), #fefdfd",
          color: INK,
          borderTop: "2px solid rgba(13,13,31,0.06)",
        }}
      >
        <noscript>
          <style>{"#experience li,#experience header,#experience h2 span,#experience .reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-12 sm:mb-16"
          >
            <p className="flex items-center gap-4 font-sans text-[12px] font-semibold uppercase tracking-[0.24em] sm:text-[13px]" style={{ color: "#6b7083" }}>
              <motion.span
                aria-hidden
                className="h-[2px] w-9 origin-left"
                style={{ background: BLUE }}
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease: EASE } } }}
              />
              <motion.span className="reveal" variants={rise}>
                02 / Experience
              </motion.span>
            </p>
            <h2 className="mt-4 font-sans font-extrabold leading-[1.05] tracking-[-0.035em]" style={{ fontSize: "clamp(2.1rem, 8.5vw, 3.5rem)" }}>
              {[...WORDS_A.map((w) => ({ w, c: INK })), ...WORDS_B.map((w) => ({ w, c: BLUE }))].map(({ w, c }, i) => (
                <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className="inline-block"
                    style={{ color: c }}
                    variants={{
                      hidden: { y: "110%" },
                      show: { y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.06 * i } },
                    }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.p variants={rise} className="mt-4 max-w-xl font-sans text-[16px] leading-relaxed" style={{ color: MUTED }}>
              Six years in IT delivery: almost four at phData running data and AI programs, and two
              before that managing infrastructure changes at British Telecom.
            </motion.p>
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
