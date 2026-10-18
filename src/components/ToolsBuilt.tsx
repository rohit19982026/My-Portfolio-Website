"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import {
  BarChart3,
  ChevronDown,
  Clock,
  Compass,
  GitBranch,
  Cpu,
  LayoutGrid,
  MessageSquare,
  Package,
  Plus,
  Rocket,
  Send,
  Sparkle,
  Target,
  Users,
  Zap,
} from "lucide-react";
import BillingSkillDiagram from "./diagrams/BillingSkillDiagram";
import StandupBriefDiagram from "./diagrams/StandupBriefDiagram";
import ProjectSetupDiagram from "./diagrams/ProjectSetupDiagram";
import StatusBriefDiagram from "./diagrams/StatusBriefDiagram";
import StakeholderMessageDiagram from "./diagrams/StakeholderMessageDiagram";
import KickoffDiagram from "./diagrams/KickoffDiagram";
import DependencyTrackerDiagram from "./diagrams/DependencyTrackerDiagram";
import SwipeCarousel from "./ui/SwipeCarousel";

// Same dark system Hero.tsx/DeliveryExposure.tsx already established this
// session — kept as local literals here too, matching how both of those
// files define their own copies rather than sharing a module (a separate
// cleanup, not blocking here).
const NAVY = "var(--color-surface-alt)";
const CARD_BG = "var(--color-card)";
const CARD_BORDER = "var(--color-card-border)";
const DOT_PATTERN = "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)";

type IconType = ComponentType<{ size?: number; strokeWidth?: number; style?: CSSProperties; className?: string }>;
type AgentId = "billing" | "standup" | "setup" | "reports" | "messages" | "kickoff" | "tracker";

type Agent = {
  id: AgentId;
  title: string;
  cardTitle: string;
  body: string;
  cadence: string;
  builtWith: string;
  accent: string;
  icon: IconType;
  diagram: ComponentType;
};

// Body copy stays close to what's actually written on the resume's "AI
// and automation" bullets — no invented before/after timing figures.
// Only the billing agent's "17 checks" is a number the resume states;
// the rest describe what each agent does, not an unmeasured time saved.
const agents: Agent[] = [
  {
    id: "billing",
    title: "Month-end billing review",
    cardTitle: "Month-end Billing Review Agent",
    body: "At month-end it runs 17 checks on budget, billing readiness, and timecards, then lists every mismatch with what needs fixing. A second agent rolls the numbers up across all my programs.",
    cadence: "Monthly",
    builtWith: "Glean + Claude",
    accent: "#d7ff3f",
    icon: Package,
    diagram: BillingSkillDiagram,
  },
  {
    id: "standup",
    title: "Standup brief agent",
    cardTitle: "Standup Brief Agent",
    body: "Reads Jira, Slack, and meeting notes before standup and gives me one page: what moved, what's stuck, and whether the sprint is still on track.",
    cadence: "Daily",
    builtWith: "Claude",
    accent: "#8B7FF0",
    icon: MessageSquare,
    diagram: StandupBriefDiagram,
  },
  {
    id: "setup",
    title: "Project setup agent",
    cardTitle: "Project Setup Agent",
    body: "When a SOW is signed in Salesforce, it sets up the program with a Jira board, sprint cadence, risk log, RACI, and templates. It also sends the client their status updates by email and Slack.",
    cadence: "One-time",
    builtWith: "Glean + Claude",
    accent: "#5B9BF0",
    icon: Rocket,
    diagram: ProjectSetupDiagram,
  },
  {
    id: "reports",
    title: "Weekly status brief",
    cardTitle: "Weekly Status Agent",
    body: "Every Monday it pulls from Jira, Slack, and reports, scores each program's health, and drafts the update. I check it before it goes to Slack.",
    cadence: "Weekly",
    builtWith: "Glean + Claude",
    accent: "#2DD4BF",
    icon: BarChart3,
    diagram: StatusBriefDiagram,
  },
  {
    id: "messages",
    title: "Stakeholder message drafter",
    cardTitle: "Stakeholder Message Agent",
    body: "For the messages that are hard to start, like escalations or renewal talks, I describe the situation and it gives me a first draft to work from.",
    cadence: "On-demand",
    builtWith: "Claude",
    accent: "#f59e0b",
    icon: Send,
    diagram: StakeholderMessageDiagram,
  },
  {
    id: "kickoff",
    title: "Kickoff planning agent",
    cardTitle: "Kickoff Planning Agent",
    body: "Turns a kickoff brief into a stakeholder map, interview guide, and discovery plan, so the first sprint doesn't start from a blank page.",
    cadence: "Per-kickoff",
    builtWith: "Claude",
    accent: "#F0618B",
    icon: Compass,
    diagram: KickoffDiagram,
  },
  {
    id: "tracker",
    title: "Jira dependency tracker",
    cardTitle: "Jira Dependency Tracker",
    body: "Checks Jira on a schedule, maps which tickets are blocking others, and counts how long they've been stuck. One team replaced its weekly status meeting with its report.",
    cadence: "Scheduled",
    builtWith: "Apps Script + Jira API",
    accent: "#22c55e",
    icon: GitBranch,
    diagram: DependencyTrackerDiagram,
  },
];

const tabs: { id: "all" | AgentId; label: string; icon: IconType }[] = [
  { id: "all", label: "All Agents", icon: LayoutGrid },
  { id: "billing", label: "Billing", icon: Package },
  { id: "standup", label: "Standup", icon: MessageSquare },
  { id: "setup", label: "Setup", icon: Rocket },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "messages", label: "Messages", icon: Send },
  { id: "kickoff", label: "Kickoff", icon: Compass },
  { id: "tracker", label: "Tracker", icon: GitBranch },
];

function FilterTabs({ active, onChange }: { active: "all" | AgentId; onChange: (id: "all" | AgentId) => void }) {
  return (
    <>
      {/* Desktop — one pill container, active tab gets an inner sub-pill */}
      <div
        className="hidden lg:inline-flex items-center gap-1 rounded-pill p-1.5"
        style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className="flex min-h-11 items-center gap-2 rounded-pill px-4 py-2 font-heading text-[12.5px] font-semibold whitespace-nowrap transition-colors duration-[var(--duration-base)] cursor-pointer"
              style={{
                background: isActive ? "rgba(215,255,63,0.1)" : "transparent",
                color: isActive ? "var(--color-accent)" : "color-mix(in srgb, var(--color-fg) 60%, transparent)",
              }}
            >
              <Icon size={14} strokeWidth={2.25} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Mobile — horizontally-scrolling row, active tab gets its own box.
          The right-edge fade signals there's more to scroll to — without
          it, "Reports"/"Messages"/"Kickoff" just get silently clipped at
          the viewport edge with no hint they exist. */}
      <div className="relative lg:hidden">
        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6 [scrollbar-width:none]">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1.5 shrink-0 rounded-2xl px-4 py-2.5 min-w-[72px] cursor-pointer"
              style={{
                border: `1px solid ${isActive ? "var(--color-accent)" : CARD_BORDER}`,
                background: isActive ? "rgba(215,255,63,0.08)" : "transparent",
                boxShadow: isActive ? "0 0 16px rgba(215,255,63,0.22)" : "none",
              }}
            >
              <Icon size={17} strokeWidth={2} style={{ color: isActive ? "var(--color-accent)" : "color-mix(in srgb, var(--color-fg) 70%, transparent)" }} />
              <span
                className="font-heading text-[10px] font-semibold whitespace-nowrap"
                style={{ color: isActive ? "var(--color-accent)" : "color-mix(in srgb, var(--color-fg) 70%, transparent)" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8"
          style={{ background: `linear-gradient(to left, ${NAVY}, transparent)` }}
        />
      </div>
    </>
  );
}

// One component, `lg:` variants — desktop always shows the diagram with a
// static label; mobile wraps it in the same collapsible pattern this file
// already used, just defaulting open instead of closed.
function DiagramPanel({ label, Diagram }: { label: string; Diagram: ComponentType }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="hidden lg:block">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-fg/40 mb-3">{label}</p>
        <Diagram />
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full min-h-11 flex items-center justify-between gap-3 rounded-card px-3.5 py-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-fg/60 cursor-pointer"
          style={{ border: `1px solid ${CARD_BORDER}`, background: "var(--color-card-subtle)" }}
        >
          {label}
          <ChevronDown
            size={14}
            className="transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <Diagram />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatTile({ icon: Icon, color, value, label }: { icon: IconType; color: string; value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-card px-2 py-3 text-center"
      style={{ border: `1px solid ${CARD_BORDER}`, background: "var(--color-card-subtle)" }}
    >
      <Icon size={18} strokeWidth={2} style={{ color }} />
      <p className="font-heading text-[15px] font-bold text-fg leading-none mt-0.5">{value}</p>
      <p className="text-[9px] text-fg/50 leading-tight">{label}</p>
    </div>
  );
}

function Tag({ icon, label, color }: { icon: ReactNode; label: string; color: string }) {
  // `color` is a fixed brand hex chosen to pop on a dark card; mixed
  // toward the theme foreground so the same hue stays legible as small
  // text on a light card too, without touching it in dark mode (where
  // --accent-text-mix is 100%, i.e. the flat color, unchanged).
  const textColor = `color-mix(in srgb, ${color} var(--accent-text-mix), var(--color-fg))`;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-heading text-[10px] font-semibold whitespace-nowrap"
      style={{ border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`, color: textColor }}
    >
      {icon}
      {label}
    </span>
  );
}

function FeaturedAgentCard({ agent, inView }: { agent: Agent; inView: boolean }) {
  const isBilling = agent.id === "billing";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 rounded-2xl p-6 sm:p-8"
      style={{ background: CARD_BG, border: `1px solid ${isBilling ? "rgba(139,127,240,0.35)" : CARD_BORDER}` }}
    >
      <div>
        {isBilling && (
          <span
            className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.1em] mb-4"
            style={{ background: "rgba(139,127,240,0.15)", color: "color-mix(in srgb, #8B7FF0 var(--accent-text-mix), var(--color-fg))" }}
          >
            <Plus size={11} /> Featured
          </span>
        )}
        <h3 className="font-heading text-[22px] sm:text-[26px] font-bold text-fg leading-snug mb-3">{agent.cardTitle}</h3>
        <p className="text-[14px] leading-relaxed text-fg/70 mb-6">{agent.body}</p>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <StatTile icon={Clock} color="#5B9BF0" value={agent.cadence} label="Cadence" />
          <StatTile icon={Cpu} color="var(--color-accent)" value={agent.builtWith} label="Built With" />
        </div>

        {isBilling && (
          <div className="flex flex-wrap gap-2">
            <Tag icon={<span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />} label="Production" color="#22c55e" />
          </div>
        )}
      </div>

      <DiagramPanel label={isBilling ? "6-STEP WORKFLOW" : "WORKFLOW"} Diagram={agent.diagram} />
    </motion.div>
  );
}

function AgentCard({ agent, index, inView }: { agent: Agent; index: number; inView: boolean }) {
  const Icon = agent.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.08 + index * 0.07 }}
      className="rounded-2xl p-6"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
          style={{ background: `color-mix(in srgb, ${agent.accent} 18%, transparent)` }}
        >
          <Icon size={17} strokeWidth={2} style={{ color: agent.accent }} />
        </span>
        <h3 className="font-heading text-[15px] font-bold text-fg flex-1 leading-snug">{agent.title}</h3>
        <span
          className="rounded-pill px-2.5 py-1 font-heading text-[9.5px] font-bold uppercase tracking-[0.06em] shrink-0"
          style={{
            border: `1px solid color-mix(in srgb, ${agent.accent} 45%, transparent)`,
            color: `color-mix(in srgb, ${agent.accent} var(--accent-text-mix), var(--color-fg))`,
          }}
        >
          {agent.cadence}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-fg/65 mb-4">{agent.body}</p>
      <div
        className="flex items-center gap-1.5 mb-5 font-heading text-[11px] font-bold"
        style={{ color: `color-mix(in srgb, ${agent.accent} var(--accent-text-mix), var(--color-fg))` }}
      >
        <Cpu size={13} />
        <span>{agent.builtWith}</span>
      </div>
      <DiagramPanel label="WORKFLOW" Diagram={agent.diagram} />
    </motion.div>
  );
}

// Every figure here is stated on the resume — no rounded-up or
// estimated numbers standing in for metrics that were never measured.
const impactStats = [
  { Icon: Clock, value: "4–8 Hrs", label: "Saved / Week", color: "#5B9BF0" },
  { Icon: Target, value: "17", label: "Billing Checks", color: "var(--color-accent)" },
  { Icon: Zap, value: "4–5", label: "Programs at Once", color: "var(--color-accent)" },
  { Icon: Users, value: "7", label: "Agents Built", color: "#2DD4BF" },
] as const;

function ImpactStatIcon({ stat, active, delay }: { stat: (typeof impactStats)[number]; active: boolean; delay: number }) {
  const { Icon, value, label, color } = stat;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left px-2"
    >
      <Icon size={28} strokeWidth={1.6} style={{ color, filter: `drop-shadow(0 0 6px color-mix(in srgb, ${color} 65%, transparent))` }} />
      <p className="font-heading text-[24px] sm:text-[26px] font-bold text-fg leading-none mt-1">{value}</p>
      <p className="text-[12px] text-fg/55 leading-snug">{label}</p>
    </motion.div>
  );
}

function BusinessImpactPanel({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative mt-6 rounded-2xl p-6 sm:p-8 overflow-hidden"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <div
        className="absolute top-5 right-5 w-7 h-7 pointer-events-none"
        style={{ backgroundImage: DOT_PATTERN, backgroundSize: "8px 8px", opacity: 0.6 }}
        aria-hidden="true"
      />
      <p className="flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-7">
        Business Impact <Sparkle size={13} />
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {impactStats.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              "relative pl-5 -ml-5 lg:pl-6 lg:-ml-0",
              i % 2 === 1 ? "border-l border-fg/10" : "border-l border-transparent",
              i >= 2 ? "border-t border-fg/10 pt-6 -mt-px" : "",
              "lg:border-t-0 lg:pt-0 lg:mt-0",
              i === 0 ? "lg:border-l-0" : "lg:border-l lg:border-fg/10",
            ].join(" ")}
          >
            <ImpactStatIcon stat={stat} active={inView} delay={0.15 + i * 0.1} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ToolsBuilt() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<"all" | AgentId>("all");

  const featured = activeTab === "all" ? agents.find((a) => a.id === "billing")! : agents.find((a) => a.id === activeTab)!;
  const secondary = activeTab === "all" ? agents.filter((a) => a.id !== "billing") : [];

  return (
    <section id="tools" className="py-24" style={{ background: NAVY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] mb-5 text-accent"
          >
            04 / TOOLS BUILT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading normal-case font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight text-fg mb-5"
          >
            Small agents <span className="text-accent">for the work that repeats.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[15px] sm:text-[16px] text-fg/70 max-w-2xl leading-relaxed"
          >
            Running four or five programs means the same reports, checks, and setup every week. I automated the
            parts that didn&apos;t need me. Together they save{" "}
            <strong className="text-accent font-semibold">4–8 hours</strong> a week.
          </motion.p>
        </div>

        <div className="mb-10">
          <FilterTabs active={activeTab} onChange={setActiveTab} />
        </div>

        <div key={activeTab} className="space-y-5">
          <FeaturedAgentCard agent={featured} inView={inView} />
          {secondary.length > 0 && (
            <>
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {secondary.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} index={i} inView={inView} />
                ))}
              </div>
              <SwipeCarousel ariaLabel="More AI agents built for PM workflows, swipeable carousel" className="sm:hidden">
                {secondary.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} index={i} inView={inView} />
                ))}
              </SwipeCarousel>
            </>
          )}
        </div>

        <BusinessImpactPanel inView={inView} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 rounded-2xl p-6 sm:p-8"
          style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
        >
          <p className="font-display text-[36px] leading-none text-accent mb-2">&ldquo;</p>
          <p className="text-[15px] sm:text-[16px] text-fg/75 italic leading-relaxed mb-4 max-w-2xl">
            Every one of these started because I got tired of doing the same thing by hand.
          </p>
          <p className="text-right font-signature text-[28px] text-accent">Rohit Singh</p>
        </motion.div>
      </div>
    </section>
  );
}
