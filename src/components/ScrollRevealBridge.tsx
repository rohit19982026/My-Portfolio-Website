"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CheckCircle2, Clock, Zap, Bot, ArrowUpRight } from "lucide-react";

const programs = [
  {
    id: "001",
    name: "EdTech Databricks Migration",
    domain: "EdTech · US + India · 18 wks",
    metric: "Zero knowledge lost at cutover",
    type: "DATA MIGRATION",
    status: "closed" as const,
    color: "#30D158",
  },
  {
    id: "002",
    name: "Marketing Data Platform",
    domain: "Enterprise SaaS · 3-year retainer",
    metric: "2 renewals · 40% scope growth",
    type: "DATA PLATFORM",
    status: "closed" as const,
    color: "#0A84FF",
  },
  {
    id: "003",
    name: "Snowflake Industrial Build",
    domain: "Manufacturing · US + India + China",
    metric: "6 weeks · zero days behind",
    type: "FAST DELIVERY",
    status: "closed" as const,
    color: "#64D2FF",
  },
  {
    id: "004",
    name: "PMO AI Agent Platform",
    domain: "phData Internal · self-initiated",
    metric: "6 agents live · 14 PM adopters",
    type: "AGENTIC SYSTEM",
    status: "live" as const,
    color: "#FF9F0A",
  },
];

const agentStats = [
  { label: "Agents online", value: "6", color: "#30D158" },
  { label: "Programs delivered", value: "4", color: "#0A84FF" },
  { label: "Years at phData", value: "5+", color: "#BF5AF2" },
  { label: "Certs", value: "PSM1 · ITIL", color: "#FF9F0A" },
];

function ProgramRow({ program, index }: { program: typeof programs[0]; index: number }) {
  const isLive = program.status === "live";
  const StatusIcon = isLive ? Zap : CheckCircle2;

  return (
    <div
      className="flex items-center gap-3 md:gap-4 px-3 md:px-5 py-2.5 md:py-3 border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* ID */}
      <span
        className="font-mono text-[9px] md:text-[10px] font-bold tracking-widest shrink-0 w-7 md:w-8"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        {program.id}
      </span>

      {/* Status dot */}
      <div className="shrink-0">
        <StatusIcon
          size={13}
          strokeWidth={2}
          style={{ color: program.color }}
        />
      </div>

      {/* Name + domain */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[12px] md:text-[13px] font-semibold leading-none truncate"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {program.name}
        </p>
        <p
          className="text-[9px] md:text-[10px] mt-0.5 truncate hidden sm:block"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {program.domain}
        </p>
      </div>

      {/* Type badge */}
      <span
        className="shrink-0 text-[7px] md:text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full hidden md:inline-flex"
        style={{
          color: program.color,
          background: `${program.color}18`,
          border: `1px solid ${program.color}35`,
        }}
      >
        {program.type}
      </span>

      {/* Metric */}
      <span
        className="text-[10px] md:text-[11px] font-medium shrink-0 hidden lg:inline"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {program.metric}
      </span>

      {/* Live indicator */}
      {isLive && (
        <span
          className="shrink-0 flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest"
          style={{ color: program.color }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: program.color, animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="hidden sm:inline">Live</span>
        </span>
      )}
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
              Program Portfolio
            </p>
            <h2
              className="font-heading font-bold tracking-tight leading-[0.97] mb-4"
              style={{
                fontSize: "clamp(30px, 4.5vw, 56px)",
                color: "var(--color-text)",
              }}
            >
              Four programs.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Every decision tracked.
              </span>
            </h2>
            <p
              className="text-[13px] md:text-[15px] max-w-lg mx-auto leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Scroll to reveal the full case studies below.
            </p>
          </div>
        }
      >
        {/* Dark dashboard inside the 3D card */}
        <div className="h-full flex flex-col" style={{ background: "#1a1a1a" }}>

          {/* Terminal header bar */}
          <div
            className="flex items-center justify-between px-3 md:px-5 py-2.5 md:py-3 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <span
                className="font-mono text-[10px] md:text-[11px] font-semibold ml-2"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                rohit.singh — program-tracker
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bot size={12} strokeWidth={2} style={{ color: "#FF9F0A" }} />
              <span
                className="font-mono text-[9px] md:text-[10px] font-bold"
                style={{ color: "#FF9F0A" }}
              >
                6 agents online
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full ml-1"
                style={{ background: "#30D158", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
            </div>
          </div>

          {/* Column headers */}
          <div
            className="flex items-center gap-3 md:gap-4 px-3 md:px-5 py-1.5 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="font-mono text-[8px] tracking-widest w-7 md:w-8 shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>ID</span>
            <span className="font-mono text-[8px] tracking-widest shrink-0 w-4" style={{ color: "rgba(255,255,255,0.2)" }} />
            <span className="font-mono text-[8px] tracking-widest flex-1" style={{ color: "rgba(255,255,255,0.2)" }}>PROGRAM</span>
            <span className="font-mono text-[8px] tracking-widest hidden md:inline" style={{ color: "rgba(255,255,255,0.2)" }}>TYPE</span>
            <span className="font-mono text-[8px] tracking-widest hidden lg:inline" style={{ color: "rgba(255,255,255,0.2)" }}>KEY RESULT</span>
            <span className="font-mono text-[8px] tracking-widest w-8 shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>STATUS</span>
          </div>

          {/* Program rows */}
          <div className="flex-1 overflow-hidden">
            {programs.map((program, i) => (
              <ProgramRow key={program.id} program={program} index={i} />
            ))}
          </div>

          {/* Stats footer */}
          <div
            className="shrink-0 grid grid-cols-4 divide-x divide-white/[0.06]"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {agentStats.map((stat) => (
              <div key={stat.label} className="px-3 md:px-4 py-2.5 md:py-3 text-center">
                <p
                  className="font-heading font-black tabular-nums text-[14px] md:text-[18px] leading-none"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[8px] md:text-[9px] mt-1 uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="shrink-0 flex items-center justify-center gap-2 py-2 md:py-2.5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,132,255,0.06)" }}
          >
            <ArrowUpRight size={11} strokeWidth={2.5} style={{ color: "rgba(10,132,255,0.7)" }} />
            <span
              className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(10,132,255,0.7)" }}
            >
              Scroll to open case studies
            </span>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
