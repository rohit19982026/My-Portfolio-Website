"use client";

import { motion } from "framer-motion";
import { SiJira, SiClaude, SiCursor } from "react-icons/si";
import {
  Terminal,
  Briefcase,
  Plus,
  MessageCircle,
  Sparkle,
  Cpu,
  Users,
  Brain,
  BarChart3,
  Network,
  Zap,
  Clock,
  Target,
  Bot,
  CheckCircle2,
  FileText,
  DollarSign,
  Bell,
  ArrowRight,
} from "lucide-react";
import HeroPortrait from "./HeroPortrait";
import GithubMark from "./icons/GithubMark";
import SalesforceMark from "./icons/SalesforceMark";
import SlackMark from "./icons/SlackMark";
import GleanMark from "./icons/GleanMark";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const;

const fadeBlurUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
} as const;

const pop = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
} as const;

const NAVY = "#070b18";
const CARD_BG = "rgba(255,255,255,0.035)";
const CARD_BORDER = "rgba(255,255,255,0.1)";

const tools = [
  { name: "Jira", Icon: SiJira, color: "#2684FF" },
  { name: "GitHub", Icon: GithubMark, color: "#ffffff" },
  { name: "Salesforce", Icon: SalesforceMark, color: "#00A1E0" },
  { name: "Claude", Icon: SiClaude, color: "#D97757" },
  { name: "Claude Code", Icon: Terminal, color: "#D97757", accentBorder: true },
  { name: "Cursor", Icon: SiCursor, color: "#e5e7eb" },
  { name: "Glean", Icon: GleanMark, color: "#8B7FF0" },
  { name: "Slack", Icon: SlackMark, color: null },
] as const;

// Impact stats — shared by both breakpoints (per explicit confirmation),
// swapped to the automation-impact figures from the newest reference
// designs. These replace the previous experience/impact figures rather
// than supplementing them, to avoid two different "at a glance" stat rows.
const mobileStats = [
  { Icon: Zap, value: "15+", label: "Workflows Automated" },
  { Icon: Clock, value: "300+", label: "Hours Saved / Month" },
  { Icon: Target, value: "95%", label: "Manual Effort Cut" },
  { Icon: CheckCircle2, value: "100%", label: "On-time Reporting" },
] as const;

// Floating icon badges over the mobile photo — 4 now (was 3), matching
// the newest reference design's brain/chart/lightning/network ring.
const photoBadges = [
  { Icon: Brain, position: "-left-3 -top-3" },
  { Icon: BarChart3, position: "-right-3 -top-3" },
  { Icon: Zap, position: "-left-3 bottom-8" },
  { Icon: Network, position: "-right-3 bottom-8" },
] as const;

// 4-tile capability strip — a leaner icon+label restatement of the bio,
// per feedback that paragraph-heavy sections read as too bulky. Mobile
// renders label only; desktop has room for the description too.
const capabilityTiles = [
  {
    label: "Lead Enterprise Programs",
    description: "Drive strategic programs that deliver business impact.",
    Icon: Users,
    color: "var(--color-lime)",
  },
  {
    label: "Drive Delivery Excellence",
    description: "Ensure on-time delivery with quality and clarity.",
    Icon: Target,
    color: "#8B7FF0",
  },
  {
    label: "Build AI Agents & Automations",
    description: "Design intelligent agents that save time and scale.",
    Icon: Bot,
    color: "#8B7FF0",
  },
  {
    label: "Improve Operations with Data & AI",
    description: "Unlock insights and efficiency using data and AI.",
    Icon: Cpu,
    color: "var(--color-lime)",
  },
] as const;

// Labeled floating badges over the desktop photo — same 4 themes as the
// mobile icon-only badges, with room for a text label at this width.
const desktopPhotoBadges = [
  { label: "AI Systems Builder", Icon: Brain, position: "-left-5 top-8" },
  { label: "Data Driven Decisions", Icon: BarChart3, position: "-right-5 top-8" },
  { label: "Automate Workflows", Icon: Zap, position: "-left-5 bottom-12" },
  { label: "Project Leadership", Icon: Network, position: "-right-5 bottom-12" },
] as const;

// Two capability cards — condensed checklists standing in for a
// paragraph description. Each item restates an already-verified fact
// from Experience.tsx (PMO/financial governance, full-lifecycle
// delivery, the Glean+Claude agent work) in shorthand form.
const capabilityCards = [
  {
    title: "Enterprise Delivery",
    Icon: Briefcase,
    color: "var(--color-lime)",
    items: ["Program Management", "Stakeholder Management", "Financial Governance", "End-to-End Delivery"],
  },
  {
    title: "AI Systems & Automation",
    Icon: Bot,
    color: "#8B7FF0",
    items: ["AI Agents (Glean + Claude)", "Workflow Automation", "Internal Tools & Integrations", "Operational Intelligence"],
  },
] as const;

// "What I automate" mini pipeline — a condensed teaser; the full 6 agent
// architectures live in the Tools section further down the page.
const automateSteps = [
  { label: "Project Initiation", Icon: FileText },
  { label: "Delivery Workflows", Icon: Network },
  { label: "Financial Reviews", Icon: DollarSign },
  { label: "Reporting & Updates", Icon: BarChart3 },
  { label: "Notifications & Briefs", Icon: Bell },
] as const;

function ToolIcon({ tool }: { tool: (typeof tools)[number] }) {
  const { Icon, color, name } = tool;
  const accentBorder = "accentBorder" in tool && tool.accentBorder;
  return (
    <div
      className="flex flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-4 sm:py-5 text-center"
      style={{
        background: CARD_BG,
        border: `1px solid ${accentBorder ? "color-mix(in srgb, #D97757 45%, transparent)" : CARD_BORDER}`,
      }}
    >
      <Icon size={26} color={color ?? undefined} style={{ color: color ?? undefined }} />
      <span className="font-heading text-[11px] sm:text-[12px] text-white/70">{name}</span>
    </div>
  );
}

function MobileStatIcon({ stat }: { stat: (typeof mobileStats)[number] }) {
  const { Icon, value, label } = stat;
  return (
    <div className="flex flex-col items-center gap-1.5 text-center px-1">
      <Icon
        size={22}
        strokeWidth={1.6}
        style={{ color: "var(--color-lime)", filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-lime) 55%, transparent))" }}
      />
      <p className="font-heading text-[17px] font-bold text-white leading-none mt-0.5">{value}</p>
      <p className="text-[10px] text-white/55 leading-tight">{label}</p>
    </div>
  );
}

function PhotoBadge({ Icon, position }: { Icon: (typeof photoBadges)[number]["Icon"]; position: string }) {
  return (
    <div
      className={`absolute ${position} z-10 flex items-center justify-center w-11 h-11 rounded-xl`}
      style={{ background: "rgba(8,12,26,0.85)", border: `1px solid ${CARD_BORDER}`, backdropFilter: "blur(6px)" }}
    >
      <Icon size={18} strokeWidth={1.75} className="text-white/80" />
    </div>
  );
}

function DesktopPhotoBadge({
  Icon,
  label,
  position,
}: {
  Icon: (typeof desktopPhotoBadges)[number]["Icon"];
  label: string;
  position: string;
}) {
  return (
    <div
      className={`absolute ${position} z-10 flex flex-col items-center gap-2 w-[112px] rounded-2xl px-3 py-3.5 text-center`}
      style={{ background: "rgba(8,12,26,0.85)", border: `1px solid ${CARD_BORDER}`, backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "color-mix(in srgb, var(--color-lime) 14%, transparent)" }}
      >
        <Icon size={18} strokeWidth={1.75} className="text-white/85" />
      </div>
      <p className="font-heading text-[10.5px] font-semibold text-white/80 leading-tight">{label}</p>
    </div>
  );
}


export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[64px]" style={{ background: NAVY }}>
      {/* Faint site-wide dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />

      {/* Desktop/tablet hero. The new mobile-only hero below has genuinely
          different content (headline, bio, stats, AI card), not just
          different styling, so it's a full sibling block rather than
          threaded through this one via props.

          Like the mobile block, this pulls back the section's own
          pt-[64px] — sized long ago to clear a fixed navbar, but Navbar is
          `sticky`, not `fixed`, so it already occupies its own space in
          normal flow and that padding was pure dead space stacked on top
          of it. -mt-16 cancels it back out, pt-10 restores real breathing
          room (this block only ever renders at lg:+, since it's
          `hidden lg:block`, so the old py-14/sm:py-16 steps below that
          were dead weight — lg:py-20 was the only value that ever actually
          applied). */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="hidden lg:block max-w-6xl mx-auto px-6 -mt-16 pt-10 pb-20 relative z-10"
      >
        <div className="grid grid-cols-[1.3fr_1fr] lg:grid-cols-[1.15fr_440px] gap-x-6 sm:gap-x-10 gap-y-8 items-start lg:items-stretch">
          {/* Text column */}
          <div>
            <motion.div
              variants={pop}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-pill mb-6 whitespace-nowrap"
              style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
            >
              <Sparkle size={13} className="text-lime shrink-0" />
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-white/75">
                Technical Project Manager &bull; AI Systems Builder
              </span>
            </motion.div>

            <motion.h1
              variants={fadeBlurUp}
              className="font-heading font-bold leading-[1.18] mb-5"
              style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.85rem)" }}
            >
              <span className="block text-white">I lead enterprise programs</span>
              <span className="block text-white">
                and build <span className="text-lime">AI systems</span> that
              </span>
              <span className="block text-white">drive impact.</span>
            </motion.h1>

            <motion.p
              variants={fadeBlurUp}
              className="leading-[1.6] text-white/65 max-w-[520px] mb-7"
              style={{ fontSize: "clamp(13.5px, 1.6vw, 16px)" }}
            >
              I lead enterprise data &amp; AI programs at <span className="text-white font-semibold">phData</span> —
              from <span className="text-lime font-semibold">platform migrations</span> and data warehouses to{" "}
              <span className="text-lime font-semibold">AI deployments</span> — and build AI agents and systems that
              automate my own repetitive work and save time for teams.
            </motion.p>

            <motion.div variants={fadeBlurUp} className="flex flex-row flex-wrap gap-3">
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime text-ink font-heading font-bold text-[13px] px-6 py-3.5 hover:brightness-95 transition"
              >
                <Briefcase size={15} /> View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-white/25 text-white font-heading font-bold text-[13px] px-6 py-3.5 hover:border-lime hover:text-lime transition"
              >
                <MessageCircle size={15} /> Let&apos;s Talk
              </a>
            </motion.div>
          </div>

          {/* Photo column — 4 labeled floating badges replace the old
              AI Enthusiast / "Turning Ideas Into Impact" cards, whose
              messages are now covered by the capability strip below. */}
          <div className="relative h-[340px] sm:h-[400px] lg:h-auto lg:min-h-[440px]">
            <HeroPortrait variant="desktop" />
            {desktopPhotoBadges.map((b) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="hidden lg:block"
              >
                <DesktopPhotoBadge Icon={b.Icon} label={b.label} position={b.position} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4-tile capability strip — icon + title + description, standing
            in for another paragraph of "what I do." */}
        <motion.div
          variants={fadeBlurUp}
          className="mt-12 lg:mt-14 rounded-2xl overflow-hidden"
          style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
        >
          <div className="grid grid-cols-4">
            {capabilityTiles.map((tile, i) => (
              <div
                key={tile.label}
                className="p-6"
                style={i > 0 ? { borderLeft: `1px solid ${CARD_BORDER}` } : undefined}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: `color-mix(in srgb, ${tile.color} 16%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${tile.color} 32%, transparent)`,
                  }}
                >
                  <tile.Icon size={20} strokeWidth={1.75} style={{ color: tile.color }} />
                </div>
                <p className="font-heading text-[15px] font-bold text-white mb-1.5 leading-snug">{tile.label}</p>
                <p className="text-[12.5px] text-white/55 leading-snug">{tile.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Two capability cards (left) + a combined automation-pipeline
            and impact-stats panel (right), matching the reference's
            near-even split between the checklist pair and the panel. */}
        <motion.div variants={fadeBlurUp} className="grid lg:grid-cols-2 gap-5 mt-6">
          <div className="relative grid grid-cols-2 gap-5">
            {capabilityCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-6"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <card.Icon size={18} style={{ color: card.color }} />
                  <p className="font-heading text-[13px] font-bold uppercase tracking-wide text-white leading-tight">
                    {card.title}
                  </p>
                </div>
                <span className="block w-8 h-0.5 rounded-full mb-4" style={{ background: card.color }} />
                <ul className="space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-white/65 leading-snug">
                      <CheckCircle2 size={15} className="shrink-0 mt-[1px]" style={{ color: card.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: NAVY, border: `1px solid ${CARD_BORDER}` }}
              aria-hidden="true"
            >
              <Plus size={16} className="text-white/50" />
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-lime mb-6">
              What I Automate
            </p>
            <div className="flex items-start justify-between mb-7">
              {automateSteps.map((step, i) => (
                <div key={step.label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-2 text-center w-[74px] shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: NAVY, border: `1px solid ${CARD_BORDER}` }}
                    >
                      <step.Icon size={18} strokeWidth={1.75} className="text-white/80" />
                    </div>
                    <p className="text-[10.5px] leading-tight text-white/55">{step.label}</p>
                  </div>
                  {i < automateSteps.length - 1 && (
                    <ArrowRight size={14} className="text-white/25 shrink-0 mx-0.5 mt-5" />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3 pt-6" style={{ borderTop: `1px solid ${CARD_BORDER}` }}>
              {mobileStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center gap-1.5">
                  <stat.Icon
                    size={22}
                    strokeWidth={1.6}
                    style={{
                      color: "var(--color-lime)",
                      filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-lime) 55%, transparent))",
                    }}
                  />
                  <p className="font-heading text-[20px] font-bold text-white leading-none">{stat.value}</p>
                  <p className="text-[10.5px] text-white/55 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>


        {/* Tools & platforms — my own personal AI tool stack, distinct
            from the client-delivery/employer logos above. */}
        <div className="mt-12 lg:mt-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.14)" }} />
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/45 shrink-0">
              Trusted Tools &amp; Platforms
            </p>
            <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.14)" }} />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            {tools.map((tool) => (
              <ToolIcon key={tool.name} tool={tool} />
            ))}
            <button
              type="button"
              aria-label="More tools"
              className="flex flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-4 sm:py-5 col-span-2 sm:col-span-1 mx-auto w-full"
              style={{ border: "1px dashed rgba(255,255,255,0.25)", background: "transparent" }}
            >
              <Plus size={22} className="text-white/50" />
              <span className="font-heading text-[11px] sm:text-[12px] text-white/50">+ More</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile-only hero — leaner, icon/pointer-driven reference design:
          badge, punchy 2-line headline, ring-glow photo with 4 floating
          badges, a capability tile strip, two checklist cards, a
          condensed automation pipeline, impact stats, a trusted-by logo
          strip, and the tools row. Genuinely different content from
          desktop above, not a restyle of it. */}
      <div className="lg:hidden">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          // The section itself carries pt-[64px] (originally sized to clear
          // a fixed navbar) but the navbar is `sticky`, not `fixed` — it
          // already occupies its own space in normal flow, so that padding
          // is pure dead space stacked on top of the navbar's real height.
          // Left alone for desktop (untouched, out of scope here), but
          // mobile pulls it back out with a negative margin so the headline
          // sits right under the header instead of ~90px below it.
          //
          // Badge pill is back (unlike the previous mobile design), because
          // the headline below no longer opens with "I am a Technical
          // Project Manager" — it leads with "I lead enterprise programs,"
          // so the two no longer restate the same words in a row.
          className="max-w-6xl mx-auto px-6 -mt-16 pt-3 pb-14 sm:pb-16 relative z-10"
        >
          <motion.div
            variants={pop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill mb-5"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <Sparkle size={11} className="text-lime shrink-0" />
            <span className="font-heading text-[9.5px] font-bold uppercase tracking-[0.1em] text-white/75">
              Technical Project Manager &bull; AI Systems Builder
            </span>
          </motion.div>

          <div className="grid grid-cols-[1.2fr_1fr] gap-x-4 sm:gap-x-6 items-start">
            <motion.h1
              variants={fadeBlurUp}
              className="font-heading font-bold leading-[1.2]"
              style={{ fontSize: "clamp(1.35rem, 6.5vw, 1.85rem)" }}
            >
              <span className="block text-white">I lead enterprise programs.</span>
              <span className="block text-white mt-2">
                I build <span className="text-lime">AI systems</span> that run project operations.
              </span>
            </motion.h1>

            <motion.div variants={fadeBlurUp} className="relative h-[240px] sm:h-[320px]">
              <HeroPortrait variant="mobile" />
              {photoBadges.map((b, i) => (
                <PhotoBadge key={i} Icon={b.Icon} position={b.position} />
              ))}
            </motion.div>
          </div>

          <motion.p
            variants={fadeBlurUp}
            className="leading-[1.6] text-white/65 mt-5 mb-6"
            style={{ fontSize: "clamp(13.5px, 3.6vw, 15px)" }}
          >
            I lead enterprise data &amp; AI programs at <span className="text-white font-semibold">phData</span> —
            from <span className="text-lime font-semibold">platform migrations</span> and data warehouses to{" "}
            <span className="text-lime font-semibold">AI deployments</span> — and build AI agents and systems that
            automate my own repetitive work and save time for teams.
          </motion.p>

          <motion.div variants={fadeBlurUp} className="flex flex-row flex-wrap gap-3 mb-8">
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime text-ink font-heading font-bold text-[13px] px-6 py-3.5 hover:brightness-95 transition"
            >
              <Briefcase size={15} /> View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-white/25 text-white font-heading font-bold text-[13px] px-6 py-3.5 hover:border-lime hover:text-lime transition"
            >
              <MessageCircle size={15} /> Let&apos;s Talk
            </a>
          </motion.div>

          {/* 4-tile capability strip — a leaner icon+label restatement of
              "what I do," standing in for another paragraph. */}
          <motion.div variants={fadeBlurUp} className="grid grid-cols-4 gap-2 mb-6">
            {capabilityTiles.map((tile) => (
              <div key={tile.label} className="flex flex-col items-center gap-2 text-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${tile.color} 16%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${tile.color} 32%, transparent)`,
                  }}
                >
                  <tile.Icon size={19} strokeWidth={1.75} style={{ color: tile.color }} />
                </div>
                <p className="text-[10px] leading-tight text-white/70 font-medium">{tile.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Two capability cards with checklists, replacing what used to
              be a second paragraph of description. */}
          <motion.div variants={fadeBlurUp} className="relative grid grid-cols-2 gap-3 mb-6">
            {capabilityCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-4"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <card.Icon size={15} style={{ color: card.color }} />
                  <p className="font-heading text-[10px] font-bold uppercase tracking-wide text-white leading-tight">
                    {card.title}
                  </p>
                </div>
                <span className="block w-6 h-0.5 rounded-full mb-2.5" style={{ background: card.color }} />
                <ul className="space-y-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[10.5px] text-white/65 leading-snug">
                      <CheckCircle2 size={12} className="shrink-0 mt-[1.5px]" style={{ color: card.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: NAVY, border: `1px solid ${CARD_BORDER}` }}
              aria-hidden="true"
            >
              <Plus size={13} className="text-white/50" />
            </div>
          </motion.div>

          {/* "What I automate" mini pipeline — a condensed teaser; the full
              6 agent architectures live in the Tools section below. The
              circle backgrounds are solid NAVY (not the translucent
              CARD_BG) so they fully occlude the dashed connector line
              behind them at each step, the standard "line behind, nodes
              on top" stepper trick. */}
          <motion.div
            variants={fadeBlurUp}
            className="rounded-2xl p-5 mb-6"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-lime mb-4">
              What I Automate
            </p>
            <div className="relative mb-2">
              <div
                className="absolute left-5 right-5 top-5 h-px"
                style={{ borderTop: "1.5px dashed rgba(255,255,255,0.22)" }}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between">
                {automateSteps.map((step) => (
                  <div
                    key={step.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: NAVY, border: `1px solid ${CARD_BORDER}` }}
                  >
                    <step.Icon size={15} strokeWidth={1.75} className="text-white/80" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {automateSteps.map((step) => (
                <p key={step.label} className="text-[8.5px] leading-tight text-white/55 text-center">
                  {step.label}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeBlurUp}
            className="rounded-2xl p-5 mb-8"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <div className="grid grid-cols-4 gap-2">
              {mobileStats.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? "border-l border-white/10 pl-2" : ""}>
                  <MobileStatIcon stat={stat} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeBlurUp} className="mt-2">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/60 whitespace-nowrap">
                Tools &amp; Platforms I Work With
              </p>
              <p className="flex items-center gap-1.5 font-heading text-[10px] text-white/45 whitespace-nowrap">
                and many more <span className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
              </p>
            </div>
            <div className="flex gap-3 overflow-x-auto -mx-6 px-6 no-scrollbar">
              {tools.map((tool) => (
                <div key={tool.name} className="shrink-0 w-[86px]">
                  <ToolIcon tool={tool} />
                </div>
              ))}
              <button
                type="button"
                aria-label="More tools"
                className="shrink-0 w-[86px] flex flex-col items-center justify-center gap-2.5 rounded-2xl px-3 py-4"
                style={{ border: "1px dashed rgba(255,255,255,0.25)", background: "transparent" }}
              >
                <Plus size={22} className="text-white/50" />
                <span className="font-heading text-[11px] text-white/50">+ More</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
