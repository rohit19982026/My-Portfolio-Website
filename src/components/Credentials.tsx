"use client";

import SectionHeading from "./ui/SectionHeading";
import JourneyTimeline from "./JourneyTimeline";
import { useId, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { SiClaude } from "react-icons/si";
import {
  ChevronDown,
  ClipboardList,
  Database,
  RefreshCcw,
  ScanEye,
  Trophy,
} from "lucide-react";

// Same dark system Hero.tsx/ToolsBuilt.tsx/DeliveryExposure.tsx already
// established this session — kept as local literals here too, matching
// how each of those files defines its own copy rather than sharing a
// module (a separate cleanup, not blocking here).
const NAVY = "var(--color-surface-alt)";
const CARD_BG = "var(--color-card)";
const CARD_BORDER = "var(--color-card-border)";

type IconType = ComponentType<{ size?: number; strokeWidth?: number; style?: CSSProperties; className?: string }>;

// ITIL's real mark is a stylized circular "i" — no react-icons/si entry
// exists, so this follows the exact substitute convention already
// established in DeliveryExposure.tsx's KantataBadge: a small bordered
// initial badge rather than an invented logo shape.
function ItilBadge({ size = 15, style }: { size?: number; style?: CSSProperties }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        fontSize: size * 0.68,
        fontWeight: 800,
        fontStyle: "italic",
        color: "#E6007E",
        border: "1.5px solid currentColor",
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        ...style,
      }}
    >
      i
    </span>
  );
}

type CertItem = { name: string; issuer: string; icon: IconType; color: string };

const certifications: CertItem[] = [
  { name: "Claude Certified Architect – Foundations", issuer: "Anthropic", icon: SiClaude, color: "#D97757" },
  { name: "PSM I — Professional Scrum Master", issuer: "Scrum.org", icon: RefreshCcw, color: "#00ADEF" },
  { name: "ITIL Foundation", issuer: "Axelos", icon: ItilBadge, color: "#E6007E" },
  { name: "LandingLens Computer Vision Fundamentals", issuer: "LandingAI", icon: ScanEye, color: "#5B9BF0" },
  { name: "LandingLens on Snowflake", issuer: "LandingAI", icon: ScanEye, color: "#5B9BF0" },
  { name: "Deeply Practical Project Management", issuer: "Course", icon: ClipboardList, color: "#8B7FF0" },
  { name: "Data Warehouse Fundamentals", issuer: "Course", icon: Database, color: "#5B9BF0" },
];

const award = {
  title: "phData Innovation Award",
  desc: "Given for the agents that set up new projects from signed SOWs and sent weekly status reports to clients by email and Slack.",
};

// Claude and PSM I are already shown as verified Credly badges in the hero, so
// only the rest (ITIL and the courses) live behind the toggle here.
const moreCourses = certifications.slice(2);

const BOX = { background: CARD_BG, border: `1px solid ${CARD_BORDER}` } as const;

function IconDisc({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{ background: `color-mix(in srgb, ${color} 16%, transparent)` }}
    >
      {children}
    </span>
  );
}

function MoreCourses() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div style={{ borderTop: `1px solid ${CARD_BORDER}` }}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-14 w-full items-center justify-between gap-3 px-5 text-left transition-colors hover:bg-fg/[0.03] sm:px-6"
      >
        <span className="font-heading text-[12px] font-bold text-fg/75">
          Other certifications and courses
          <span className="ml-2 rounded-full bg-fg/10 px-2 py-0.5 text-[10.5px] font-bold text-fg/65">{moreCourses.length}</span>
        </span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-fg/55 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <ul className="grid gap-2 px-5 pb-5 sm:grid-cols-2 sm:px-6">
            {moreCourses.map((c) => (
              <li key={c.name} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={BOX}>
                <c.icon size={15} style={{ color: c.color }} />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[12.5px] font-bold leading-snug text-fg">{c.name}</span>
                  <span className="block text-[10.5px] text-fg/50">{c.issuer}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Credentials() {
  return (
    <section id="credentials" data-flow="sheet" className="py-14 sm:py-24" style={{ background: NAVY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 / MY JOURNEY"
          segments={[
            { text: "My", style: "fill" },
            { text: "journey.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p data-flow="ink" className="mb-8 max-w-xl text-[16px] leading-relaxed text-fg/70 sm:mb-12">
          Education and career, from 2014 to today.
        </p>

        <JourneyTimeline />

        <section
          aria-labelledby="recognition-title"
          data-flow="dev"
          className="mx-auto mt-6 max-w-[34rem] overflow-hidden rounded-3xl lg:mt-8 lg:max-w-none"
          style={{
            background:
              "radial-gradient(90% 120% at 0% 0%, color-mix(in srgb, var(--color-award) 12%, transparent), transparent 60%), var(--color-card)",
            border: "1px solid color-mix(in srgb, var(--color-award) 32%, transparent)",
          }}
        >
          <div className="flex items-start gap-4 p-5 sm:p-6">
            <IconDisc color="var(--color-award)">
              <Trophy size={19} style={{ color: "var(--color-award)" }} />
            </IconDisc>
            <div className="min-w-0">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-fg/50">Recognition</p>
              <h3 id="recognition-title" className="mt-1 font-heading text-[18px] font-bold leading-snug text-fg">
                {award.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-fg/65">{award.desc}</p>
            </div>
          </div>
          <MoreCourses />
        </section>
      </div>
    </section>
  );
}
