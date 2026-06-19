"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  AlertCircle,
  GitMerge,
  BarChart2,
  Globe,
  Repeat2,
  Bot,
  ShieldCheck,
  Plug,
  Users,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

const tpmSkills = [
  {
    icon: AlertCircle,
    label: "Risk & Escalation",
    detail: "RAID discipline — never surprise leadership on a miss",
  },
  {
    icon: GitMerge,
    label: "Scope & Budget Control",
    detail: "Change control on fixed-price contracts, every addition in writing",
  },
  {
    icon: BarChart2,
    label: "Executive Communication",
    detail: "CFO-ready framing, signal + ask, arm leadership to act",
  },
  {
    icon: Globe,
    label: "Cross-Regional Delivery",
    detail: "US · India · China teams, async protocols, 11-hour gap managed",
  },
  {
    icon: Repeat2,
    label: "Account Growth",
    detail: "Delivery-to-renewal, QBR ownership, two contracts extended",
  },
];

const aiSkills = [
  {
    icon: Bot,
    label: "Agent Architecture",
    detail: "6 agents in production on Claude, n8n, and Glean",
  },
  {
    icon: ShieldCheck,
    label: "Governance Design",
    detail: "Accountability chains and audit trails Finance actually approves",
  },
  {
    icon: Plug,
    label: "MCP Integration",
    detail: "Jira · Salesforce · Google Workspace · Glean connectors",
  },
  {
    icon: Users,
    label: "Cohort Adoption",
    detail: "Sequenced rollout, usage instrumented from week one, 14 adopters",
  },
  {
    icon: BookOpen,
    label: "Pattern Documentation",
    detail: "Two more agents built by others using my design docs",
  },
];

const credentials = [
  { label: "PSM I", sub: "Scrum.org" },
  { label: "ITIL 4", sub: "AXELOS" },
  { label: "5+ yrs", sub: "phData" },
  { label: "4 programs", sub: "delivered" },
];

function SkillRow({
  skill,
  accentColor,
}: {
  skill: (typeof tpmSkills)[0];
  accentColor: string;
}) {
  const Icon = skill.icon;
  return (
    <div className="flex items-start gap-2.5 px-3 md:px-4 py-2 md:py-2.5 rounded-xl hover:bg-black/[0.03] transition-colors duration-150">
      <div
        className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
        style={{ background: `${accentColor}14` }}
      >
        <Icon size={12} strokeWidth={2} style={{ color: accentColor }} />
      </div>
      <div className="min-w-0">
        <p
          className="text-[11.5px] md:text-[12.5px] font-semibold leading-none mb-0.5"
          style={{ color: "#1d1d1f" }}
        >
          {skill.label}
        </p>
        <p
          className="text-[9.5px] md:text-[10.5px] leading-snug"
          style={{ color: "#6e6e73" }}
        >
          {skill.detail}
        </p>
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
              Two disciplines.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One rare overlap.
              </span>
            </h2>
            <p
              className="text-[13px] md:text-[15px] max-w-lg mx-auto leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Most TPMs run programs. Most AI builders don't run programs. I've
              been doing both for three years.
            </p>
          </div>
        }
      >
        {/* Light Apple-style skills dashboard */}
        <div className="h-full flex flex-col" style={{ background: "#f5f5f7" }}>

          {/* Window header */}
          <div
            className="flex items-center justify-between px-3 md:px-5 py-2 md:py-2.5 shrink-0 bg-white/70"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", backdropFilter: "blur(8px)" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <span
                className="font-mono text-[10px] md:text-[11px] font-medium ml-2"
                style={{ color: "#6e6e73" }}
              >
                rohit.singh — skill overview
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: "rgba(52,199,89,0.10)", border: "1px solid rgba(52,199,89,0.25)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#34C759", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="font-mono text-[8.5px] md:text-[9px] font-bold" style={{ color: "#248A3D" }}>
                Open to roles
              </span>
            </div>
          </div>

          {/* Two-column skill panels */}
          <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden min-h-0">

            {/* Left: Technical PM */}
            <div
              className="flex flex-col overflow-hidden"
              style={{ borderRight: "1px solid rgba(0,0,0,0.07)" }}
            >
              <div
                className="px-3 md:px-4 py-2 md:py-2.5 shrink-0"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#0A84FF" }}
                  />
                  <span
                    className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: "#0A84FF" }}
                  >
                    Technical PM
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden py-1 md:py-1.5">
                {tpmSkills.map((skill) => (
                  <SkillRow key={skill.label} skill={skill} accentColor="#0A84FF" />
                ))}
              </div>
            </div>

            {/* Right: Agentic AI */}
            <div className="flex flex-col overflow-hidden">
              <div
                className="px-3 md:px-4 py-2 md:py-2.5 shrink-0"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#BF5AF2" }}
                  />
                  <span
                    className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: "#BF5AF2" }}
                  >
                    Agentic AI
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden py-1 md:py-1.5">
                {aiSkills.map((skill) => (
                  <SkillRow key={skill.label} skill={skill} accentColor="#BF5AF2" />
                ))}
              </div>
            </div>
          </div>

          {/* Credentials footer */}
          <div
            className="shrink-0 grid grid-cols-4 bg-white/60"
            style={{
              borderTop: "1px solid rgba(0,0,0,0.07)",
              backdropFilter: "blur(8px)",
            }}
          >
            {credentials.map((cred) => (
              <div
                key={cred.label}
                className="flex flex-col items-center justify-center gap-0.5 py-2 md:py-3"
                style={{ borderRight: "1px solid rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-1">
                  <BadgeCheck size={9} strokeWidth={2.5} style={{ color: "#34C759" }} />
                  <span
                    className="font-heading font-black text-[12px] md:text-[15px] tabular-nums leading-none"
                    style={{ color: "#1d1d1f" }}
                  >
                    {cred.label}
                  </span>
                </div>
                <span
                  className="text-[8px] md:text-[9px] uppercase tracking-wider"
                  style={{ color: "#8e8e93" }}
                >
                  {cred.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
