"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Script from "next/script";
import {
  Briefcase,
  Plus,
  MessageCircle,
  Cpu,
  Users,
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
import ToolsPanel from "./ToolsPanel";
import HeroPortrait from "./HeroPortrait";

/** Intro stagger slot (see `data-intro` in globals.css). */
const D = (n: number) => ({ "--d": n }) as React.CSSProperties;

const NAVY = "var(--color-surface-alt)";
const CARD_BG = "var(--color-card)";
const CARD_BORDER = "var(--color-card-border)";

// Impact stats — shared by both breakpoints. Every value is a figure
// stated on the resume (years in delivery, program count, team size,
// PMO hours saved), not an estimated or rounded-up one.
const mobileStats = [
  { Icon: Clock, value: "6 Yrs", label: "IT Delivery" },
  { Icon: Target, value: "4–5", label: "Concurrent Programs" },
  { Icon: CheckCircle2, value: "12–15", label: "Engineers / Program" },
  { Icon: Zap, value: "4–8 Hrs", label: "Hours Saved / Week" },
] as const;

// 4-tile capability strip — a leaner icon+label restatement of the bio,
// per feedback that paragraph-heavy sections read as too bulky. Mobile
// renders label only; desktop has room for the description too. Each
// description is a condensed version of an actual resume bullet, not a
// generic restatement.
const capabilityTiles = [
  {
    label: "Own Program Delivery",
    description: "From signed SOW to final handover, across four or five programs at a time.",
    Icon: Users,
    color: "var(--color-accent)",
  },
  {
    label: "Run Financial Governance",
    description: "Monthly invoicing and burn tracking, so budget problems show up early.",
    Icon: Target,
    color: "#8B7FF0",
  },
  {
    label: "Build PMO Agents",
    description: "Glean and Claude agents that write the reports and run the checks.",
    Icon: Bot,
    color: "#8B7FF0",
  },
  {
    label: "Bridge Client & Engineering",
    description: "Client VPs in the US, engineers in India, and me keeping them in sync.",
    Icon: Cpu,
    color: "var(--color-accent)",
  },
] as const;

// Two capability cards — condensed checklists standing in for a
// paragraph description. Items are the resume's own Skills lines
// (Core Skills / AI & Automation), not a restatement.
const capabilityCards = [
  {
    title: "Core Skills",
    Icon: Briefcase,
    color: "var(--color-accent)",
    items: ["Stakeholder Management", "Cross-Team Coordination", "Executive Communication", "Risk & Budget Control"],
  },
  {
    title: "AI & Automation",
    Icon: Bot,
    color: "#8B7FF0",
    items: ["Claude & Claude Code", "Glean Agents", "n8n", "MCP · Jira REST API"],
  },
] as const;

// Automation pipeline mini-teaser; the full 6 agent architectures live
// in the Tools section further down the page.
const automateSteps = [
  { label: "Project Initiation", Icon: FileText },
  { label: "Delivery Workflows", Icon: Network },
  { label: "Financial Reviews", Icon: DollarSign },
  { label: "Reporting & Updates", Icon: BarChart3 },
  { label: "Notifications & Briefs", Icon: Bell },
] as const;

function MobileStatIcon({ stat }: { stat: (typeof mobileStats)[number] }) {
  const { Icon, value, label } = stat;
  return (
    <div className="flex flex-col items-center gap-1.5 text-center px-1">
      <Icon
        size={22}
        strokeWidth={1.6}
        style={{ color: "var(--color-accent)", filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent) 55%, transparent))" }}
      />
      <p className="font-heading text-[17px] font-bold text-fg leading-none mt-0.5">{value}</p>
      <p className="text-[10px] text-fg/55 leading-tight">{label}</p>
    </div>
  );
}

// Credly's public badge-sharing embed — a fixed-size (150x270) iframe
// that embed.js swaps the div for once it loads. The script only needs
// to be included once per page; it scans the whole DOM for matching
// data-share-badge-id divs, so this single component instance covers
// both the desktop and mobile badge placements below.
function CredlyBadge({ badgeId }: { badgeId: string }) {
  return (
    <div
      className="inline-flex flex-col items-center gap-2 rounded-2xl p-3 shrink-0"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      <p className="font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-accent whitespace-nowrap">
        Verified Credential
      </p>
      <div
        data-iframe-width="150"
        data-iframe-height="270"
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      />
    </div>
  );
}

export default function Hero() {
  // Desktop depth: as the hero scrolls away its planes separate. The dot
  // texture and portrait (far/mid) trail the page, the headline (near) leads
  // it slightly. Mapped over the hero's own exit so it resolves cleanly, and
  // flat for reduced motion. The phone hero below has no scroll parallax.
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -36]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-[64px]" style={{ background: NAVY }}>
      {/* Faint site-wide dot texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)",
          backgroundSize: "26px 26px",
          y: dotsY,
        }}
        aria-hidden="true"
      />

      {/* Desktop hero (lg and up). Its top part is the same design as the
          phone and tablet hero below (headline, subtitle, arch portrait),
          just scaled up; underneath it keeps a roomier layout for the
          capability strip, cards, pipeline and tools. The block pulls back
          the section's pt-[64px] with -mt-16 because the navbar is sticky,
          not fixed, and already takes its own space. */}
      <div
        className="hidden lg:block max-w-6xl mx-auto px-6 -mt-16 pt-10 pb-20 relative z-10"
      >
        <div className="grid grid-cols-[1.15fr_1fr] items-start gap-x-12 xl:gap-x-20">
          {/* Same hero as the phone and tablet layout: tight Inter headline
              with the lime full stop, the quieter two-tone line under it,
              and the arch portrait. Only the scale changes here. */}
          <motion.div style={{ y: headlineY }}>
            <h1 className="font-sans">
              <span
                className="block font-extrabold tracking-[-0.035em] leading-[1.02] text-fg"
                style={{ fontSize: "clamp(3.4rem, 5.8vw, 5.6rem)" }}
              >
                <span className="intro-line"><span data-intro="rise" style={D(0)}>Technical</span></span>
                <span className="intro-line"><span data-intro="rise" style={D(1)}>Project</span></span>
                <span className="intro-line">
                  <span data-intro="rise" style={D(2)}>
                    Manager<span data-intro="stamp" style={D(5)} className="text-lime">.</span>
                  </span>
                </span>
              </span>
              <span
                className="mt-[1.1em] block font-medium leading-[1.25] tracking-[-0.01em] text-fg/60"
                style={{ fontSize: "clamp(1.4rem, 2.3vw, 2.1rem)" }}
              >
                <span className="intro-line"><span data-intro="rise" style={D(3)}>Data, analytics, and</span></span>
                <span className="intro-line"><span data-intro="rise" style={D(4)}><span className="font-semibold text-accent">AI programs</span> for</span></span>
                <span className="intro-line"><span data-intro="rise" style={D(5)}>enterprise clients.</span></span>
              </span>
            </h1>

            <p
              data-intro="wipe"
              style={D(7)}
              className="mt-8 mb-7 max-w-[540px] text-[17px] leading-[1.6] text-fg/65"
            >
              I run <span className="text-accent font-semibold">data and AI programs</span> for US Fortune 500
              clients at <span className="text-fg font-semibold">phData</span>, usually four or five at once.
              Along the way I&apos;ve built the <span className="text-accent font-semibold">agents</span> that
              take the repetitive reporting off my plate.
            </p>

            <div data-intro="wipe" style={D(8)} className="flex flex-row flex-wrap items-start gap-3">
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime text-ink font-heading font-bold text-[13px] px-6 py-3.5 hover:brightness-95 transition"
              >
                <Briefcase size={15} /> View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-fg/25 text-fg font-heading font-bold text-[13px] px-6 py-3.5 hover:border-accent hover:text-accent transition"
              >
                <MessageCircle size={15} /> Let&apos;s Talk
              </a>
              <p className="basis-full pt-2 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-fg/55">
                My certification credentials via Credly
              </p>
              <CredlyBadge badgeId="a388e87c-806c-4686-ad52-6b0703386abe" />
              <CredlyBadge badgeId="dbedad99-3dcb-4d10-b727-53574049235d" />
            </div>
          </motion.div>

          <motion.div style={{ y: portraitY }} className="w-full max-w-[460px] justify-self-end">
            <div data-intro="arch" className="relative aspect-[5/7] w-full">
              <HeroPortrait />
            </div>
          </motion.div>
        </div>

        {/* 4-tile capability strip — icon + title + description, standing
            in for another paragraph of "what I do." */}
        <div
          data-flow="dev"
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
                <p className="font-heading text-[15px] font-bold text-fg mb-1.5 leading-snug">{tile.label}</p>
                <p className="text-[12.5px] text-fg/55 leading-snug">{tile.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two capability cards (left) + a combined automation-pipeline
            and impact-stats panel (right), matching the reference's
            near-even split between the checklist pair and the panel. */}
        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          <div data-flow="dev" className="relative grid grid-cols-2 gap-5">
            {capabilityCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-6"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <card.Icon size={18} style={{ color: card.color }} />
                  <p className="font-heading text-[13px] font-bold uppercase tracking-wide text-fg leading-tight">
                    {card.title}
                  </p>
                </div>
                <span className="block w-8 h-0.5 rounded-full mb-4" style={{ background: card.color }} />
                <ul className="space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-fg/65 leading-snug">
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
              <Plus size={16} className="text-fg/50" />
            </div>
          </div>

          <div data-flow="dev" className="rounded-2xl p-6" style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-accent mb-6">
              Automation Pipeline
            </p>
            <div className="flex items-start justify-between mb-7">
              {automateSteps.map((step, i) => (
                <div key={step.label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-2 text-center w-[74px] shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: NAVY, border: `1px solid ${CARD_BORDER}` }}
                    >
                      <step.Icon size={18} strokeWidth={1.75} className="text-fg/80" />
                    </div>
                    <p className="text-[10.5px] leading-tight text-fg/55">{step.label}</p>
                  </div>
                  {i < automateSteps.length - 1 && (
                    <ArrowRight size={14} className="text-fg/25 shrink-0 mx-0.5 mt-5" />
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
                      color: "var(--color-accent)",
                      filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent) 55%, transparent))",
                    }}
                  />
                  <p className="font-heading text-[20px] font-bold text-fg leading-none whitespace-nowrap">{stat.value}</p>
                  <p className="text-[10.5px] text-fg/55 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div data-flow="dev" className="mt-12 lg:mt-16">
          <ToolsPanel />
        </div>
      </div>

      {/* Mobile-only hero — leaner, icon/pointer-driven reference design:
          badge, punchy 2-line headline, ring-glow photo with 4 floating
          badges, a capability tile strip, two checklist cards, a
          condensed automation pipeline, impact stats, a trusted-by logo
          strip, and the tools row. Genuinely different content from
          desktop above, not a restyle of it. */}
      <div className="lg:hidden">
        <div
          // The section itself carries pt-[64px] (originally sized to clear
          // a fixed navbar) but the navbar is `sticky`, not `fixed` — it
          // already occupies its own space in normal flow, so that padding
          // is pure dead space stacked on top of the navbar's real height.
          // Left alone for desktop (untouched, out of scope here), but
          // mobile pulls it back out with a negative margin so the headline
          // sits right under the header instead of ~90px below it.
          //
          // Badge pill carries location + availability, not a restatement
          // of the role title the headline already leads with directly
          // below it.
          className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 pt-9 pb-14 sm:pb-16 relative z-10"
        >
          <div className="grid grid-cols-[1fr_1.1fr] items-center gap-x-[clamp(0.75rem,3vw,2rem)]">
            <h1 className="font-sans">
              <span
                className="block font-extrabold tracking-[-0.035em] leading-[1.02] text-fg"
                style={{ fontSize: "clamp(1.75rem, 8vw, 3.4rem)" }}
              >
                <span className="intro-line"><span data-intro="rise" style={D(0)}>Technical</span></span>
                <span className="intro-line"><span data-intro="rise" style={D(1)}>Project</span></span>
                <span className="intro-line">
                  <span data-intro="rise" style={D(2)}>
                    Manager<span data-intro="stamp" style={D(5)} className="text-lime">.</span>
                  </span>
                </span>
              </span>
              <span
                className="mt-[1.1em] block whitespace-nowrap font-medium leading-[1.25] tracking-[-0.01em] text-fg/60"
                style={{ fontSize: "clamp(0.8rem, 4vw, 1.9rem)" }}
              >
                <span className="intro-line"><span data-intro="rise" style={D(3)}>Data, analytics, and</span></span>
                <span className="intro-line"><span data-intro="rise" style={D(4)}><span className="font-semibold text-accent">AI programs</span> for</span></span>
                <span className="intro-line"><span data-intro="rise" style={D(5)}>enterprise clients.</span></span>
              </span>
            </h1>

            <div data-intro="arch" className="relative aspect-[5/7] w-full">
              <HeroPortrait />
            </div>
          </div>

          <p
            data-intro="wipe"
            style={{ ...D(7), fontSize: "clamp(13.5px, 3.6vw, 15px)" }}
            className="leading-[1.6] text-fg/65 mt-5 mb-6"
          >
            I run <span className="text-accent font-semibold">data and AI programs</span> for US Fortune 500
            clients at <span className="text-fg font-semibold">phData</span>, usually four or five at once.
            Along the way I&apos;ve built the <span className="text-accent font-semibold">agents</span> that
            take the repetitive reporting off my plate.
          </p>

          <div data-intro="wipe" style={D(8)} className="flex flex-row flex-wrap items-start gap-3 mb-8">
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime text-ink font-heading font-bold text-[13px] px-6 py-3.5 hover:brightness-95 transition"
            >
              <Briefcase size={15} /> View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-fg/25 text-fg font-heading font-bold text-[13px] px-6 py-3.5 hover:border-accent hover:text-accent transition"
            >
              <MessageCircle size={15} /> Let&apos;s Talk
            </a>
            <p className="basis-full pt-2 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-fg/55">
              My certification credentials via Credly
            </p>
            <CredlyBadge badgeId="a388e87c-806c-4686-ad52-6b0703386abe" />
            <CredlyBadge badgeId="dbedad99-3dcb-4d10-b727-53574049235d" />
          </div>

          {/* 4-tile capability strip — a leaner icon+label restatement of
              "what I do," standing in for another paragraph. */}
          <div data-flow="dev" className="grid grid-cols-4 gap-2 mb-6">
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
                <p className="text-[10px] leading-tight text-fg/70 font-medium">{tile.label}</p>
              </div>
            ))}
          </div>

          {/* Two capability cards with checklists, replacing what used to
              be a second paragraph of description. */}
          <div data-flow="dev" className="relative grid grid-cols-2 gap-3 mb-6">
            {capabilityCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-4"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <card.Icon size={15} style={{ color: card.color }} />
                  <p className="font-heading text-[10px] font-bold uppercase tracking-wide text-fg leading-tight">
                    {card.title}
                  </p>
                </div>
                <span className="block w-6 h-0.5 rounded-full mb-2.5" style={{ background: card.color }} />
                <ul className="space-y-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[10.5px] text-fg/65 leading-snug">
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
              <Plus size={13} className="text-fg/50" />
            </div>
          </div>

          {/* "What I automate" mini pipeline — a condensed teaser; the full
              6 agent architectures live in the Tools section below. The
              circle backgrounds are solid NAVY (not the translucent
              CARD_BG) so they fully occlude the dashed connector line
              behind them at each step, the standard "line behind, nodes
              on top" stepper trick. */}
          <div
            data-flow="dev"
            className="rounded-2xl p-5 mb-6"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-accent mb-4">
              Automation Pipeline
            </p>
            <div className="relative mb-2">
              <div
                className="absolute left-5 right-5 top-5 h-px"
                style={{ borderTop: "1.5px dashed var(--color-divider)" }}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between">
                {automateSteps.map((step) => (
                  <div
                    key={step.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: NAVY, border: `1px solid ${CARD_BORDER}` }}
                  >
                    <step.Icon size={15} strokeWidth={1.75} className="text-fg/80" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {automateSteps.map((step) => (
                <p key={step.label} className="text-[8.5px] leading-tight text-fg/55 text-center">
                  {step.label}
                </p>
              ))}
            </div>
          </div>

          <div
            data-flow="dev"
            className="rounded-2xl p-5 mb-8"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <div className="grid grid-cols-4 gap-2">
              {mobileStats.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? "border-l border-fg/10 pl-2" : ""}>
                  <MobileStatIcon stat={stat} />
                </div>
              ))}
            </div>
          </div>

          <div data-flow="dev" className="mt-2">
            <ToolsPanel />
          </div>
        </div>
      </div>

      <Script src="https://cdn.credly.com/assets/utilities/embed.js" strategy="lazyOnload" />
    </section>
  );
}
