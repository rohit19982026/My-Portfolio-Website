"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ComponentType, type CSSProperties, type ReactNode } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Database,
  GraduationCap,
  Package,
  RefreshCcw,
  ScanEye,
  Trophy,
} from "lucide-react";

// Same dark system Hero.tsx/ToolsBuilt.tsx/DeliveryExposure.tsx already
// established this session — kept as local literals here too, matching
// how each of those files defines its own copy rather than sharing a
// module (a separate cleanup, not blocking here).
const NAVY = "#070b18";
const CARD_BG = "rgba(255,255,255,0.035)";
const CARD_BORDER = "rgba(255,255,255,0.1)";

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
  quote: "Strong academic foundation in computer applications and problem solving.",
};

type CertItem = { name: string; issuer: string; icon: IconType; color: string };

const certifications: CertItem[] = [
  { name: "PSM I — Professional Scrum Master", issuer: "Scrum.org", icon: RefreshCcw, color: "#00ADEF" },
  { name: "ITIL Foundation", issuer: "Axelos", icon: ItilBadge, color: "#E6007E" },
  { name: "LandingLens Computer Vision Fundamentals", issuer: "LandingAI", icon: ScanEye, color: "#5B9BF0" },
  { name: "LandingLens on Snowflake", issuer: "LandingAI", icon: ScanEye, color: "#5B9BF0" },
  { name: "Deeply Practical Project Management", issuer: "PMP-track", icon: ClipboardList, color: "#8B7FF0" },
  { name: "Data Warehouse Fundamentals", issuer: "Course", icon: Database, color: "#5B9BF0" },
];

const award = {
  title: "phData Innovation Award",
  desc: "Recognised for building production AI agents (Glean + Claude + n8n) that automated project provisioning from signed SOWs, generated weekly program status reports, and sent automated client notifications to email and Slack.",
  stats: [
    { label: "Automated Provisioning", icon: Package },
    { label: "Weekly Program Reports", icon: BarChart3 },
    { label: "Client Notifications to Email & Slack", icon: Bell },
  ],
};

function CardNumberHeader({ number, label, headerIcon }: { number: string; label: string; headerIcon?: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-[18px] font-bold text-lime leading-none">{number}</span>
          <span className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{label}</span>
        </div>
        {headerIcon && <div className="lg:hidden">{headerIcon}</div>}
      </div>
      <div className="w-10 h-[3px] bg-lime rounded-full" />
    </div>
  );
}

function CornerIconBadge({ Icon, accentColor = "var(--color-lime)" }: { Icon: IconType; accentColor?: string }) {
  return (
    <span
      className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
      style={{
        background: `color-mix(in srgb, ${accentColor} 16%, transparent)`,
        border: `1px solid color-mix(in srgb, ${accentColor} 35%, transparent)`,
      }}
    >
      <Icon size={16} style={{ color: accentColor }} />
    </span>
  );
}

// Directly ports HeroPortrait.tsx's mobile ring-glow backdrop recipe (two
// concentric ring outlines, a soft centered radial glow, one small
// dark-fill/accent-stroke "port dot" marker on the outer ring — the same
// marker already used for edge endpoints in FlowDiagram.tsx) — generalized
// from a hardcoded lime tint into a parameterized accentColor so Recognition
// can reuse the exact same treatment in amber instead of inventing a
// second visual language.
function RingIconBadge({ Icon, accentColor = "var(--color-lime)", sparkle = false }: { Icon: IconType; accentColor?: string; sparkle?: boolean }) {
  return (
    <div className="relative w-28 h-28 mx-auto mb-5 flex items-center justify-center" aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `radial-gradient(circle, color-mix(in srgb, ${accentColor} 35%, transparent) 1px, transparent 1.6px)`,
          backgroundSize: "10px 10px",
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(60% 60% at 50% 45%, color-mix(in srgb, ${accentColor} 30%, transparent) 0%, transparent 75%)` }}
      />
      <div className="absolute rounded-full" style={{ inset: "10%", border: `1px solid color-mix(in srgb, ${accentColor} 30%, transparent)` }} />
      <div className="absolute rounded-full" style={{ inset: "22%", border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)` }} />
      <div
        className="absolute rounded-full"
        style={{ top: "14%", right: "18%", width: 6, height: 6, background: "#0d0d0f", border: `1.5px solid ${accentColor}` }}
      />
      {sparkle && (
        <>
          <span
            className="absolute rounded-full"
            style={{ top: "20%", left: "18%", width: 3, height: 3, background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
          />
          <span
            className="absolute rounded-full"
            style={{ bottom: "20%", right: "24%", width: 2.5, height: 2.5, background: accentColor, boxShadow: `0 0 5px ${accentColor}` }}
          />
        </>
      )}
      <Icon size={34} style={{ color: accentColor, filter: `drop-shadow(0 0 8px color-mix(in srgb, ${accentColor} 60%, transparent))` }} />
    </div>
  );
}

function CertItemRow({ item, variant }: { item: CertItem; variant: "grid" | "list" }) {
  const { icon: Icon, color, name, issuer } = item;
  return (
    <div
      className={
        variant === "grid"
          ? "flex items-start gap-2.5 rounded-card p-3"
          : "flex items-center gap-3 rounded-card px-3.5 py-3"
      }
      style={{ border: `1px solid ${CARD_BORDER}`, background: "rgba(255,255,255,0.02)" }}
    >
      <span
        className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
        style={{ background: `color-mix(in srgb, ${color} 18%, transparent)` }}
      >
        <Icon size={15} style={{ color }} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-heading text-[12.5px] font-bold text-white leading-snug">{name}</p>
        <p className="text-[10.5px] text-white/50 mt-0.5">{issuer}</p>
      </div>
      <CheckCircle2 size={14} className="text-lime shrink-0" />
    </div>
  );
}

function EducationCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="rounded-2xl p-6 sm:p-7"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <CardNumberHeader number="01" label="EDUCATION" headerIcon={<CornerIconBadge Icon={GraduationCap} />} />
      <div className="hidden lg:block">
        <RingIconBadge Icon={GraduationCap} />
      </div>
      <p className="font-heading text-white text-[17px] font-bold leading-snug mb-1">{education.degree}</p>
      <p className="text-lime text-[13px] font-semibold mb-3">{education.institution}</p>
      <div className="flex items-center gap-1.5 text-white/55 text-[12px] mb-6">
        <Calendar size={13} />
        <span>
          {education.year} · {education.grade}
        </span>
      </div>
      <div className="pt-5" style={{ borderTop: `1px solid ${CARD_BORDER}` }}>
        <p className="font-display text-[24px] leading-none text-lime mb-2">&ldquo;</p>
        <p className="italic text-white/70 text-[13px] leading-relaxed">{education.quote}</p>
      </div>
    </motion.div>
  );
}

function CertificationsCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.16 }}
      className="rounded-2xl p-6 sm:p-7"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <CardNumberHeader number="02" label="CERTIFICATIONS & COURSES" />
      <div className="hidden lg:grid lg:grid-cols-2 gap-3 mb-6">
        {certifications.map((c) => (
          <CertItemRow key={c.name} item={c} variant="grid" />
        ))}
      </div>
      <div className="lg:hidden flex flex-col gap-2.5 mb-6">
        {certifications.map((c) => (
          <CertItemRow key={c.name} item={c} variant="list" />
        ))}
      </div>
      <div className="hidden lg:flex items-center gap-2 text-white/60 text-[12.5px]">
        <BookOpen size={15} className="text-lime shrink-0" />
        <span>
          Continuously learning. <span className="text-lime font-semibold">Always building.</span>
        </span>
      </div>
      <div
        className="lg:hidden flex items-center justify-between rounded-card px-3.5 py-2.5"
        style={{ border: `1px solid ${CARD_BORDER}` }}
      >
        <div className="flex items-center gap-2 text-white/70 text-[12.5px]">
          <BookOpen size={15} className="text-lime shrink-0" />
          <span>
            Continuously learning. <span className="text-lime font-semibold">Always building.</span>
          </span>
        </div>
        <ChevronRight size={14} className="text-white/40 shrink-0" />
      </div>
    </motion.div>
  );
}

function RecognitionCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.24 }}
      className="rounded-2xl p-6 sm:p-7"
      style={{ background: CARD_BG, border: "1px solid color-mix(in srgb, var(--color-award) 30%, transparent)" }}
    >
      <CardNumberHeader
        number="03"
        label="RECOGNITION"
        headerIcon={<CornerIconBadge Icon={Trophy} accentColor="var(--color-award)" />}
      />
      <div className="hidden lg:block">
        <RingIconBadge Icon={Trophy} accentColor="var(--color-award)" sparkle />
      </div>
      <p className="font-heading text-white text-[16px] font-bold mb-2">{award.title}</p>
      <p className="text-[13px] text-white/70 leading-relaxed mb-6">{award.desc}</p>
      <div className="grid grid-cols-3 gap-2">
        {award.stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1.5 text-center rounded-card p-2.5"
            style={{ border: `1px solid ${CARD_BORDER}` }}
          >
            <s.icon size={16} style={{ color: "var(--color-award)" }} />
            <span className="text-[9.5px] text-white/60 leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CredentialsHeader() {
  return (
    <div className="relative mb-14">
      <svg className="hidden lg:block absolute top-0 right-0 w-40 h-16 opacity-[0.15]" aria-hidden="true" viewBox="0 0 160 64">
        <path d="M0,30 Q40,0 80,30 T160,30" stroke="var(--color-lime)" strokeWidth="1.5" fill="none" strokeDasharray="1 6" />
      </svg>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-lime mb-5"
      >
        02 / CREDENTIALS &amp; RECOGNITION
      </motion.p>
      <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-heading normal-case font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight text-white mb-5 lg:mb-0"
        >
          Built on learning. <span className="text-lime">Proven by impact.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[14px] sm:text-[15px] text-white/70 leading-relaxed lg:max-w-sm lg:text-right"
        >
          A strong academic foundation, continuous learning and real-world impact that creates value for teams and
          businesses.
        </motion.p>
      </div>
    </div>
  );
}

function PullQuote({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-6 rounded-2xl p-6 sm:p-8 lg:flex lg:items-center lg:gap-10"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <div className="lg:flex-1">
        <p className="font-display text-[36px] leading-none text-lime mb-2">&ldquo;</p>
        <p className="text-[15px] sm:text-[16px] text-white/75 italic leading-relaxed max-w-2xl">
          I believe in lifelong learning and applying it to solve real business problems through technology and
          automation.
        </p>
      </div>
      <div className="h-px w-full my-6 lg:hidden" style={{ background: "rgba(255,255,255,0.14)" }} />
      <div className="hidden lg:block w-px self-stretch mx-2" style={{ background: "rgba(255,255,255,0.14)" }} />
      <div className="lg:shrink-0 lg:w-56 text-right">
        <p className="font-signature text-[28px] text-lime">Rohit Singh</p>
        <p className="text-[12px] text-white/50 mt-1">Always shipping, always learning.</p>
      </div>
    </motion.div>
  );
}

export default function Credentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="credentials" className="py-24" style={{ background: NAVY }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <CredentialsHeader />

        <div className="hidden lg:grid lg:grid-cols-[1fr_1.5fr_1.15fr] gap-6">
          <EducationCard inView={inView} />
          <CertificationsCard inView={inView} />
          <RecognitionCard inView={inView} />
        </div>
        <div className="lg:hidden flex flex-col gap-6">
          <EducationCard inView={inView} />
          <CertificationsCard inView={inView} />
          <RecognitionCard inView={inView} />
        </div>

        <PullQuote inView={inView} />
      </div>
    </section>
  );
}
