"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import {
  BarChart3,
  ChevronDown,
  Clock,
  Compass,
  LayoutGrid,
  MessageSquare,
  Package,
  Plus,
  Rocket,
  Send,
  Sparkle,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import BillingSkillDiagram from "./diagrams/BillingSkillDiagram";
import StandupBriefDiagram from "./diagrams/StandupBriefDiagram";
import ProjectSetupDiagram from "./diagrams/ProjectSetupDiagram";
import StatusBriefDiagram from "./diagrams/StatusBriefDiagram";
import StakeholderMessageDiagram from "./diagrams/StakeholderMessageDiagram";
import KickoffDiagram from "./diagrams/KickoffDiagram";
import SwipeCarousel from "./ui/SwipeCarousel";

// Same dark system Hero.tsx/DeliveryExposure.tsx already established this
// session — kept as local literals here too, matching how both of those
// files define their own copies rather than sharing a module (a separate
// cleanup, not blocking here).
const NAVY = "#070b18";
const CARD_BG = "rgba(255,255,255,0.035)";
const CARD_BORDER = "rgba(255,255,255,0.1)";
const DOT_PATTERN = "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)";

type IconType = ComponentType<{ size?: number; strokeWidth?: number; style?: CSSProperties; className?: string }>;
type AgentId = "billing" | "standup" | "setup" | "reports" | "messages" | "kickoff";

type Agent = {
  id: AgentId;
  title: string;
  cardTitle: string;
  body: string;
  cadence: string;
  accent: string;
  icon: IconType;
  timeBefore: string;
  timeAfter: string;
  percentSaved: string;
  diagram: ComponentType;
};

const agents: Agent[] = [
  {
    id: "billing",
    title: "Month-end billing review",
    cardTitle: "Month-end Billing Review Agent",
    body: "Every month I review the financial health of 4+ active programs — budget vs. spend, billing readiness, timecard compliance. I built a 6-step workflow that runs that review for me and flags what needs attention. 15 minutes instead of 2 hours. Now used across the team.",
    cadence: "Monthly",
    accent: "#d7ff3f",
    icon: Package,
    timeBefore: "2 hrs",
    timeAfter: "15 min",
    percentSaved: "87%",
    diagram: BillingSkillDiagram,
  },
  {
    id: "standup",
    title: "Standup brief agent",
    cardTitle: "Standup Brief Agent",
    body: "Before every standup I need to know what was actually completed, what's blocked, and whether the sprint is on track. This agent pulls from Jira, Slack, and meeting notes and gives me a one-page brief. 30 seconds of reading instead of 30 minutes of digging.",
    cadence: "Daily",
    accent: "#8B7FF0",
    icon: MessageSquare,
    timeBefore: "30 min",
    timeAfter: "30 sec",
    percentSaved: "99%",
    diagram: StandupBriefDiagram,
  },
  {
    id: "setup",
    title: "Project setup agent",
    cardTitle: "Project Setup Agent",
    body: "Standing up a new program used to take 3 hours — Jira board, sprint structure, risk log, RACI, governance templates. Give this agent the program brief and it provisions everything in 15 minutes. This is the one that won phData's Innovation Award.",
    cadence: "One-time",
    accent: "#5B9BF0",
    icon: Rocket,
    timeBefore: "3 hrs",
    timeAfter: "15 min",
    percentSaved: "92%",
    diagram: ProjectSetupDiagram,
  },
  {
    id: "reports",
    title: "Weekly status brief",
    cardTitle: "Weekly Status Agent",
    body: "Writing status updates for 4+ programs every Monday used to take all morning. This agent reads 3 days of emails, Slack, and meeting notes per program and drafts the update. I review and edit — I don't write from scratch. Saves 5+ hours a week.",
    cadence: "Weekly",
    accent: "#2DD4BF",
    icon: BarChart3,
    timeBefore: "5+ hrs",
    timeAfter: "20 min",
    percentSaved: "85%",
    diagram: StatusBriefDiagram,
  },
  {
    id: "messages",
    title: "Stakeholder message drafter",
    cardTitle: "Stakeholder Message Agent",
    body: "Escalations, renewal conversations, steerco openers — some messages are hard to write and slow to get right. I describe what I need to say and who I'm talking to, and this agent drafts a first version I can edit.",
    cadence: "On-demand",
    accent: "#f59e0b",
    icon: Send,
    // Estimated, not measured — the existing copy doesn't give a timing
    // figure for this agent. Flagging for Rohit to confirm before shipping.
    timeBefore: "~25 min",
    timeAfter: "~5 min",
    percentSaved: "80%",
    diagram: StakeholderMessageDiagram,
  },
  {
    id: "kickoff",
    title: "Kickoff planning agent",
    cardTitle: "Kickoff Planning Agent",
    body: "New program kickoffs are chaotic — nobody knows who owns what, scope isn't clear, questions outnumber answers. I give this agent the kickoff brief and it outputs a stakeholder map, interview guide, and discovery plan. Sprint 1 starts with structure.",
    cadence: "Per-kickoff",
    accent: "#F0618B",
    icon: Compass,
    // Estimated, not measured — same flag as above.
    timeBefore: "~4 hrs",
    timeAfter: "~30 min",
    percentSaved: "88%",
    diagram: KickoffDiagram,
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
              className="flex items-center gap-2 rounded-pill px-4 py-2 font-heading text-[12.5px] font-semibold whitespace-nowrap transition-colors duration-[var(--duration-base)] cursor-pointer"
              style={{
                background: isActive ? "rgba(215,255,63,0.1)" : "transparent",
                color: isActive ? "var(--color-lime)" : "rgba(255,255,255,0.6)",
              }}
            >
              <Icon size={14} strokeWidth={2.25} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Mobile — horizontally-scrolling row, active tab gets its own box */}
      <div className="flex lg:hidden gap-2.5 overflow-x-auto pb-1 -mx-6 px-6 [scrollbar-width:none]">
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
                border: `1px solid ${isActive ? "var(--color-lime)" : CARD_BORDER}`,
                background: isActive ? "rgba(215,255,63,0.08)" : "transparent",
                boxShadow: isActive ? "0 0 16px rgba(215,255,63,0.22)" : "none",
              }}
            >
              <Icon size={17} strokeWidth={2} style={{ color: isActive ? "var(--color-lime)" : "rgba(255,255,255,0.7)" }} />
              <span
                className="font-heading text-[10px] font-semibold whitespace-nowrap"
                style={{ color: isActive ? "var(--color-lime)" : "rgba(255,255,255,0.7)" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
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
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">{label}</p>
        <Diagram />
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-3 rounded-card px-3.5 py-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 cursor-pointer"
          style={{ border: `1px solid ${CARD_BORDER}`, background: "rgba(255,255,255,0.03)" }}
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
      style={{ border: `1px solid ${CARD_BORDER}`, background: "rgba(255,255,255,0.02)" }}
    >
      <Icon size={18} strokeWidth={2} style={{ color }} />
      <p className="font-heading text-[15px] font-bold text-white leading-none mt-0.5">{value}</p>
      <p className="text-[9px] text-white/50 leading-tight">{label}</p>
    </div>
  );
}

function Tag({ icon, label, color }: { icon: ReactNode; label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-heading text-[10px] font-semibold whitespace-nowrap"
      style={{ border: `1px solid color-mix(in srgb, ${color} 40%, transparent)`, color }}
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
            style={{ background: "rgba(139,127,240,0.15)", color: "#8B7FF0" }}
          >
            <Plus size={11} /> Featured
          </span>
        )}
        <h3 className="font-heading text-[22px] sm:text-[26px] font-bold text-white leading-snug mb-3">{agent.cardTitle}</h3>
        <p className="text-[14px] leading-relaxed text-white/70 mb-6">{agent.body}</p>

        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <StatTile icon={Clock} color="#5B9BF0" value={agent.timeBefore} label="Manual Effort" />
          <StatTile icon={Zap} color="var(--color-lime)" value={agent.timeAfter} label="With Agent" />
          <StatTile icon={TrendingUp} color="#8B7FF0" value={agent.percentSaved} label="Time Saved" />
        </div>

        {isBilling && (
          <div className="flex flex-wrap gap-2">
            <Tag icon={<span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />} label="Production" color="#22c55e" />
            <Tag icon={<Plus size={11} />} label="Used Across Team" color="var(--color-lime)" />
            <Tag icon={<Sparkle size={11} />} label="High Impact" color="#8B7FF0" />
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
        <h3 className="font-heading text-[15px] font-bold text-white flex-1 leading-snug">{agent.title}</h3>
        <span
          className="rounded-pill px-2.5 py-1 font-heading text-[9.5px] font-bold uppercase tracking-[0.06em] shrink-0"
          style={{ border: `1px solid color-mix(in srgb, ${agent.accent} 45%, transparent)`, color: agent.accent }}
        >
          {agent.cadence}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-white/65 mb-4">{agent.body}</p>
      <div className="flex items-center justify-between mb-5 font-heading text-[11px] font-bold" style={{ color: agent.accent }}>
        <span>
          {agent.timeBefore} → {agent.timeAfter}
        </span>
        <span>{agent.percentSaved} time saved</span>
      </div>
      <DiagramPanel label="WORKFLOW" Diagram={agent.diagram} />
    </motion.div>
  );
}

const impactStats = [
  { Icon: Clock, value: "50+", label: "Hours Saved / Week", color: "#5B9BF0" },
  { Icon: Target, value: "97%", label: "Automation Accuracy", color: "var(--color-lime)" },
  { Icon: Zap, value: "4+", label: "Active Programs Supported", color: "var(--color-lime)" },
  { Icon: Users, value: "100%", label: "Team Adoption", color: "#2DD4BF" },
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
      <p className="font-heading text-[24px] sm:text-[26px] font-bold text-white leading-none mt-1">{value}</p>
      <p className="text-[12px] text-white/55 leading-snug">{label}</p>
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
      <p className="flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-lime mb-7">
        Business Impact <Sparkle size={13} />
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {impactStats.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              "relative pl-5 -ml-5 lg:pl-6 lg:-ml-0",
              i % 2 === 1 ? "border-l border-white/10" : "border-l border-transparent",
              i >= 2 ? "border-t border-white/10 pt-6 -mt-px" : "",
              "lg:border-t-0 lg:pt-0 lg:mt-0",
              i === 0 ? "lg:border-l-0" : "lg:border-l lg:border-white/10",
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
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] mb-5 text-lime"
          >
            03 / TOOLS I&apos;VE BUILT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading normal-case font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight text-white mb-5"
          >
            AI Agents I&apos;ve Built to <span className="text-lime">Automate PM Workflows</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[15px] sm:text-[16px] text-white/70 max-w-2xl leading-relaxed"
          >
            These AI-powered agents automate my most repetitive PM workflows, save{" "}
            <strong className="text-lime font-semibold">50+ hours</strong> every week, and help teams ship faster with
            accuracy and consistency.
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
              <SwipeCarousel ariaLabel="More AI agents I've built, swipeable carousel" className="sm:hidden">
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
          <p className="font-display text-[36px] leading-none text-lime mb-2">&ldquo;</p>
          <p className="text-[15px] sm:text-[16px] text-white/75 italic leading-relaxed mb-4 max-w-2xl">
            I build AI agents that handle the busywork, so teams can focus on what actually moves the needle.
          </p>
          <p className="text-right font-signature text-[28px] text-lime">Rohit Singh</p>
        </motion.div>
      </div>
    </section>
  );
}
