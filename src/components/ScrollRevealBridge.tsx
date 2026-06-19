"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Users,
  Zap,
  ArrowLeftRight,
  Eye,
  Compass,
  AlertTriangle,
  GitBranch,
  Bot,
  CalendarClock,
  Link2,
  TrendingUp,
  GraduationCap,
  Server,
  ChevronRight,
  ChevronLeft,
  Wifi,
  BatteryFull,
} from "lucide-react";

const pmSkills = [
  { icon: Users,          label: "Cross-Functional Leadership", detail: "Engineering, finance, product, client — all moving in the same direction",           color: "#007AFF" },
  { icon: Zap,            label: "Blocker Removal",             detail: "Find what's slowing teams down and clear it before it shows as a delay",             color: "#FF9500" },
  { icon: ArrowLeftRight, label: "Cross-Team Communication",    detail: "Translate between teams who don't naturally speak the same language",                color: "#5856D6" },
  { icon: Eye,            label: "Delivery Awareness",          detail: "Know where every track actually stands — not just what's been reported up",          color: "#32ADE6" },
  { icon: Compass,        label: "Navigating Chaos",            detail: "When things go sideways: diagnose fast, decide, keep the team moving",              color: "#FF3B30" },
  { icon: AlertTriangle,  label: "Escalation Path Design",      detail: "Right person called at the right time — severity classified before it gets raised",  color: "#FF9500" },
  { icon: GitBranch,      label: "Change Impact Assessment",    detail: "Downstream effects across all tracks evaluated before any change gets signed off",   color: "#34C759" },
];

const aiSkills = [
  { icon: Bot,            label: "Claude Agent Building",       detail: "Built billing, sprint health, risk, status, and budget agents for PM teams",        color: "#BF5AF2" },
  { icon: CalendarClock,  label: "Weekly Task Automation",      detail: "Automated 4–6 hrs/week of manual PM work per person via scheduled agents",          color: "#FF9500" },
  { icon: Link2,          label: "MCP Tool Integration",        detail: "Jira · Salesforce · Glean · Google Workspace connected and running",                color: "#32ADE6" },
  { icon: TrendingUp,     label: "AI Adoption",                 detail: "0 → 14 PM adopters — cohort rollout, 1:1 onboarding, usage tracked per person",    color: "#34C759" },
  { icon: GraduationCap,  label: "AI Skilling",                 detail: "Taught team to use and build agents; two built independently from my docs",         color: "#FF2D55" },
  { icon: Server,         label: "Agent Service Management",    detail: "Agents run as managed services — ownership, monitoring, and SLA defined per agent", color: "#5856D6" },
];

function IOSRow({
  icon: Icon,
  label,
  detail,
  color,
  isLast,
}: {
  icon: typeof Bot;
  label: string;
  detail: string;
  color: string;
  isLast: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2.5 px-3 md:px-4 bg-white"
      style={{
        paddingTop: "7px",
        paddingBottom: "7px",
        borderBottom: isLast ? "none" : "1px solid rgba(60,60,67,0.1)",
      }}
    >
      {/* iOS colored icon square */}
      <div
        className="shrink-0 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center"
        style={{ background: color, borderRadius: "8px" }}
      >
        <Icon size={14} strokeWidth={2} color="#fff" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[11px] md:text-[12.5px] font-semibold leading-tight truncate"
          style={{ color: "#1d1d1f" }}
        >
          {label}
        </p>
        <p
          className="text-[9px] md:text-[10px] leading-tight truncate"
          style={{ color: "#8e8e93" }}
        >
          {detail}
        </p>
      </div>

      {/* Chevron */}
      <ChevronRight size={12} strokeWidth={2.5} className="shrink-0" style={{ color: "#c7c7cc" }} />
    </div>
  );
}

export default function ScrollRevealBridge() {
  return (
    <div className="relative overflow-hidden bg-white">
      <ContainerScroll
        titleComponent={
          <div className="mb-6 md:mb-10">
            <p
              className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] mb-4"
              style={{ color: "var(--color-accent-dk)" }}
            >
              Core Competencies
            </p>
            <h2
              className="font-heading font-bold tracking-tight leading-[0.97] mb-4"
              style={{
                fontSize: "clamp(30px, 4.5vw, 56px)",
                color: "var(--color-text)",
              }}
            >
              Run programs.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Build the agents that run them.
              </span>
            </h2>
            <p
              className="text-[13px] md:text-[15px] max-w-lg mx-auto leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Five years leading cross-functional teams through chaos. Three years building AI agents that automate the work no one should be doing manually.
            </p>
          </div>
        }
      >
        {/* iPadOS-style app screen */}
        <div className="h-full flex flex-col" style={{ background: "#f2f2f7" }}>

          {/* iOS status bar */}
          <div
            className="flex items-center justify-between px-4 md:px-5 shrink-0 bg-[#f2f2f7]"
            style={{ paddingTop: "8px", paddingBottom: "4px" }}
          >
            <span
              className="font-semibold tabular-nums"
              style={{ fontSize: "11px", color: "#1d1d1f" }}
            >
              9:41
            </span>
            <div className="flex items-center gap-1.5">
              <Wifi size={12} strokeWidth={2} style={{ color: "#1d1d1f" }} />
              <BatteryFull size={14} strokeWidth={2} style={{ color: "#1d1d1f" }} />
            </div>
          </div>

          {/* Navigation bar */}
          <div
            className="flex items-center px-3 md:px-4 shrink-0 bg-[#f2f2f7]"
            style={{
              paddingTop: "6px",
              paddingBottom: "6px",
              borderBottom: "1px solid rgba(60,60,67,0.18)",
            }}
          >
            <button className="flex items-center gap-0.5 mr-auto" style={{ color: "#007AFF" }}>
              <ChevronLeft size={16} strokeWidth={2.5} />
              <span className="text-[13px] font-normal" style={{ color: "#007AFF" }}>
                Profile
              </span>
            </button>
            <span
              className="absolute left-1/2 -translate-x-1/2 text-[13px] md:text-[14px] font-semibold"
              style={{ color: "#1d1d1f" }}
            >
              Skills Overview
            </span>
          </div>

          {/* Two-column skills layout */}
          <div className="flex-1 flex gap-0 overflow-hidden min-h-0 pt-2 md:pt-3 px-2 md:px-3 pb-0">

            {/* Left: Program Manager */}
            <div className="flex-1 flex flex-col min-w-0 mr-1.5 md:mr-2">
              <p
                className="px-3 pb-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#8e8e93" }}
              >
                Program Manager
              </p>
              <div className="overflow-hidden rounded-xl" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                {pmSkills.map((skill, i) => (
                  <IOSRow
                    key={skill.label}
                    icon={skill.icon}
                    label={skill.label}
                    detail={skill.detail}
                    color={skill.color}
                    isLast={i === pmSkills.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Right: Agentic AI Specialist */}
            <div className="flex-1 flex flex-col min-w-0 ml-1.5 md:ml-2">
              <p
                className="px-3 pb-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#8e8e93" }}
              >
                Agentic AI Specialist
              </p>
              <div className="overflow-hidden rounded-xl" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                {aiSkills.map((skill, i) => (
                  <IOSRow
                    key={skill.label}
                    icon={skill.icon}
                    label={skill.label}
                    detail={skill.detail}
                    color={skill.color}
                    isLast={i === aiSkills.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Credentials section */}
          <div className="shrink-0 px-2 md:px-3 pt-2 md:pt-3">
            <p
              className="px-3 pb-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "#8e8e93" }}
            >
              Credentials
            </p>
            <div
              className="rounded-xl flex items-center divide-x overflow-hidden"
              style={{
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              {[
                { value: "PSM I", sub: "Scrum.org" },
                { value: "ITIL 4", sub: "Axelos" },
                { value: "5+ yrs", sub: "phData" },
                { value: "4", sub: "programs" },
              ].map((c, i) => (
                <div
                  key={c.value}
                  className="flex-1 text-center py-2 md:py-2.5"
                  style={{ borderRight: i < 3 ? "1px solid rgba(60,60,67,0.1)" : "none" }}
                >
                  <p
                    className="font-bold tabular-nums text-[11px] md:text-[13px] leading-none"
                    style={{ color: "#1d1d1f" }}
                  >
                    {c.value}
                  </p>
                  <p
                    className="text-[8px] md:text-[9px] mt-0.5 uppercase tracking-wide"
                    style={{ color: "#8e8e93" }}
                  >
                    {c.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-1.5 md:py-2 shrink-0">
            <div
              className="rounded-full"
              style={{ width: "80px", height: "4px", background: "rgba(60,60,67,0.25)" }}
            />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
