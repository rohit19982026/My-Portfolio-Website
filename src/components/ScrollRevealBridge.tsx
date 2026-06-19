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
  Signal,
  Search,
  SquareKanban,
  Cloud,
  Hash,
  FileSpreadsheet,
  Mail,
  GitFork,
} from "lucide-react";

const pmSkills = [
  { icon: Users,          label: "Cross-Functional Leadership", detail: "Engineering, finance, product, client — all moving in the same direction",           color: "#007AFF" },
  { icon: Zap,            label: "Blocker Removal",             detail: "Find what's slowing teams down and clear it before it shows as a delay",             color: "#FF9500" },
  { icon: ArrowLeftRight, label: "Cross-Team Communication",    detail: "Translate between teams who don't naturally speak the same language",                color: "#5856D6" },
  { icon: Eye,            label: "Delivery Awareness",          detail: "Know where every track actually stands, not just what's been reported up",           color: "#32ADE6" },
  { icon: Compass,        label: "Navigating Chaos",            detail: "When things go sideways: diagnose fast, decide, keep the team moving",              color: "#FF3B30" },
  { icon: AlertTriangle,  label: "Escalation Path Design",      detail: "Right person called at the right time. Severity classified before it gets raised.", color: "#FF9500" },
  { icon: GitBranch,      label: "Change Impact Assessment",    detail: "Downstream effects across all tracks evaluated before any change gets signed off",   color: "#34C759" },
];

const dockApps = [
  { icon: SquareKanban,   label: "Jira",       color: "#0052CC" },
  { icon: Cloud,          label: "Salesforce", color: "#00A1E0" },
  { icon: Hash,           label: "Slack",      color: "#4A154B" },
  { icon: Bot,            label: "Claude",     color: "#D97706" },
  { icon: FileSpreadsheet,label: "Sheets",     color: "#34A853" },
  { icon: Mail,           label: "Gmail",      color: "#EA4335" },
  { icon: GitFork,        label: "GitHub",     color: "#1d1d1f" },
];

const aiSkills = [
  { icon: Bot,            label: "Claude Agent Building",       detail: "Built billing, sprint health, risk, status, and budget agents for PM teams",        color: "#BF5AF2" },
  { icon: CalendarClock,  label: "Weekly Task Automation",      detail: "Automated 4–6 hrs/week of manual PM work per person via scheduled agents",          color: "#FF9500" },
  { icon: Link2,          label: "MCP Tool Integration",        detail: "Jira · Salesforce · Glean · Google Workspace connected and running",                color: "#32ADE6" },
  { icon: TrendingUp,     label: "AI Adoption",                 detail: "0 to 14 PM adopters. Cohort rollout, 1:1 onboarding, usage tracked per person.",  color: "#34C759" },
  { icon: GraduationCap,  label: "AI Skilling",                 detail: "Taught team to use and build agents; two built independently from my docs",      color: "#FF2D55" },
  { icon: Server,         label: "Agent Output Review Design",  detail: "Human review checkpoints built in. Wrong outputs caught before they reach anyone.", color: "#5856D6" },
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
      className="flex items-center bg-white"
      style={{ minHeight: "50px", paddingLeft: "14px" }}
    >
      {/* iOS icon square — 36px, proper corner radius */}
      <div
        className="shrink-0 flex items-center justify-center"
        style={{
          width: "34px",
          height: "34px",
          background: color,
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
        }}
      >
        <Icon size={17} strokeWidth={1.8} color="#fff" />
      </div>

      {/* Text + separator — inset from icon like real iOS */}
      <div
        className="flex-1 flex items-center min-w-0 ml-3 pr-3"
        style={{
          minHeight: "50px",
          borderBottom: isLast ? "none" : "0.5px solid rgba(60,60,67,0.16)",
        }}
      >
        <div className="flex-1 min-w-0 py-2">
          <p
            className="text-[12px] md:text-[13px] font-medium leading-tight truncate"
            style={{ color: "#1d1d1f", letterSpacing: "-0.01em" }}
          >
            {label}
          </p>
          <p
            className="text-[10px] md:text-[11px] leading-tight truncate mt-0.5"
            style={{ color: "#8e8e93" }}
          >
            {detail}
          </p>
        </div>
        <ChevronRight size={13} strokeWidth={2} className="shrink-0 ml-2" style={{ color: "#c7c7cc" }} />
      </div>
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

          {/* iPadOS status bar — time left, indicators right */}
          <div
            className="flex items-center justify-between px-4 md:px-6 shrink-0"
            style={{ paddingTop: "10px", paddingBottom: "3px", background: "#f2f2f7" }}
          >
            <span
              className="font-semibold tabular-nums"
              style={{ fontSize: "12px", color: "#1d1d1f", letterSpacing: "-0.01em" }}
            >
              9:41
            </span>
            <div className="flex items-center gap-2">
              <Signal size={12} strokeWidth={2} style={{ color: "#1d1d1f" }} />
              {/* Battery pill */}
              <div style={{ position: "relative", width: "24px", height: "12px" }}>
                <div style={{
                  position: "absolute", inset: 0,
                  border: "1.5px solid rgba(0,0,0,0.35)", borderRadius: "3px",
                  padding: "1.5px",
                }}>
                  <div style={{ width: "78%", height: "100%", background: "#1d1d1f", borderRadius: "1px" }} />
                </div>
                <div style={{
                  position: "absolute", right: "-3.5px", top: "50%", transform: "translateY(-50%)",
                  width: "2px", height: "6px", background: "rgba(0,0,0,0.3)", borderRadius: "0 1px 1px 0",
                }} />
              </div>
            </div>
          </div>

          {/* iPadOS Navigation bar */}
          <div
            className="relative flex items-center px-3 md:px-5 shrink-0"
            style={{
              paddingTop: "5px",
              paddingBottom: "7px",
              borderBottom: "0.5px solid rgba(60,60,67,0.22)",
              background: "rgba(242,242,247,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <button className="flex items-center gap-0.5 z-10" style={{ color: "#007AFF" }}>
              <ChevronLeft size={18} strokeWidth={2.5} />
              <span className="text-[14px] font-normal" style={{ color: "#007AFF" }}>
                Profile
              </span>
            </button>
            <span
              className="absolute left-1/2 -translate-x-1/2 text-[14px] md:text-[15px] font-semibold"
              style={{ color: "#1d1d1f", letterSpacing: "-0.01em" }}
            >
              Skills Overview
            </span>
          </div>

          {/* iPadOS Search bar */}
          <div style={{ padding: "6px 14px 4px", background: "#f2f2f7" }}>
            <div
              style={{
                background: "rgba(118,118,128,0.12)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 10px",
              }}
            >
              <Search size={12} strokeWidth={2.5} style={{ color: "#8e8e93" }} />
              <span style={{ fontSize: "12px", color: "#8e8e93", letterSpacing: "-0.01em" }}>Search</span>
            </div>
          </div>

          {/* Two-column skills layout */}
          <div className="flex-1 flex gap-0 overflow-hidden min-h-0 pt-1.5 md:pt-2 px-2 md:px-3 pb-0">

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

          {/* Credentials strip */}
          <div className="shrink-0 px-2 md:px-3 pt-1.5">
            <div
              className="rounded-xl flex items-center overflow-hidden"
              style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
            >
              {[
                { value: "PSM I", sub: "Scrum.org" },
                { value: "ITIL 4", sub: "Axelos" },
                { value: "5+ yrs", sub: "phData" },
                { value: "4", sub: "programs" },
              ].map((c, i) => (
                <div
                  key={c.value}
                  className="flex-1 text-center py-1.5 md:py-2"
                  style={{ borderRight: i < 3 ? "0.5px solid rgba(60,60,67,0.12)" : "none" }}
                >
                  <p className="font-bold tabular-nums text-[11px] md:text-[12px] leading-none" style={{ color: "#1d1d1f" }}>
                    {c.value}
                  </p>
                  <p className="text-[8px] mt-0.5 uppercase tracking-wide" style={{ color: "#8e8e93" }}>
                    {c.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* iPadOS Dock */}
          <div className="shrink-0 flex justify-center px-4 pt-2 pb-1">
            <div
              style={{
                background: "rgba(255,255,255,0.38)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "20px",
                border: "0.5px solid rgba(255,255,255,0.65)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
                padding: "7px 10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {dockApps.map((app) => (
                <div
                  key={app.label}
                  title={app.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    background: app.color,
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.1) inset",
                    flexShrink: 0,
                  }}
                >
                  <app.icon size={20} strokeWidth={1.7} color="#fff" />
                </div>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2 shrink-0">
            <div style={{ width: "88px", height: "4px", background: "rgba(60,60,67,0.22)", borderRadius: "4px" }} />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
