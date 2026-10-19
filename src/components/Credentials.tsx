"use client";

import { motion, useInView } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { useId, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { SiClaude } from "react-icons/si";
import {
  Calendar,
  ChevronDown,
  ClipboardList,
  Database,
  GraduationCap,
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

const education = {
  degree: "Bachelor of Computer Application",
  institution: "Brainware University, Kolkata",
  year: "Jun 2020",
  grade: "CGPA: 7.5 / 10",
};

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
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-fg/60 transition-colors hover:text-accent"
      >
        Other certifications and courses ({moreCourses.length})
        <ChevronDown
          size={15}
          className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <ul className="grid gap-2 pt-2 sm:grid-cols-2">
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="credentials" className="py-14 sm:py-24" style={{ background: NAVY }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 / RECOGNITION & EDUCATION"
          segments={[
            { text: "Recognition", style: "fill" },
            { text: "and education.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="mb-8 max-w-xl text-[16px] leading-relaxed text-fg/70 sm:mb-12">
          An award from phData and my degree.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div
              className="flex items-start gap-3 rounded-2xl p-4"
              style={{ background: CARD_BG, border: "1px solid color-mix(in srgb, var(--color-award) 30%, transparent)" }}
            >
              <IconDisc color="var(--color-award)">
                <Trophy size={18} style={{ color: "var(--color-award)" }} />
              </IconDisc>
              <div className="min-w-0">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-fg/50">Recognition</p>
                <p className="mt-0.5 font-heading text-[14px] font-bold text-fg">{award.title}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-fg/65">{award.desc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl p-4" style={BOX}>
              <IconDisc color="var(--color-accent)">
                <GraduationCap size={18} style={{ color: "var(--color-accent)" }} />
              </IconDisc>
              <div className="min-w-0">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-fg/50">Education</p>
                <p className="mt-0.5 font-heading text-[14px] font-bold text-fg">{education.degree}</p>
                <p className="text-[12.5px] font-semibold text-accent">{education.institution}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-fg/55">
                  <Calendar size={12} />
                  {education.year} · {education.grade}
                </p>
              </div>
            </div>
          </div>

          <MoreCourses />
        </motion.div>
      </div>
    </section>
  );
}
