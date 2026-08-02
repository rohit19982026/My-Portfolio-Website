"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SiJira, SiClaude, SiCursor } from "react-icons/si";
import {
  Terminal,
  Briefcase,
  Layers,
  Gauge,
  Cpu,
  Plus,
  Mail,
  BrainCircuit,
  TrendingUp,
  Sparkle,
  ArrowUpRight,
  ChevronRight,
  CalendarDays,
  Users,
  Brain,
  BarChart3,
  Network,
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

const stats = [
  { Icon: Briefcase, value: "4.5+", label: "Years of Experience", color: "#8B7FF0" },
  { Icon: Layers, value: "15+", label: "Enterprise Projects", color: "#5B9BF0" },
  { Icon: Gauge, value: "100%", label: "On-time Delivery", color: "#e5e7eb" },
  { Icon: Cpu, value: "AI", label: "Automation First Mindset", color: "var(--color-lime)" },
] as const;

// Mobile-only stats per the new reference design — deliberately its own
// array, not a mobile-styling variant of `stats` above: two of the four
// values genuinely differ ("$3.5M+ Impact Delivered" and "100% Client
// Focused" replace "On-time Delivery" and "Automation First Mindset").
// "$3.5M+" already appears verified elsewhere on the site (skillMarqueeItems
// in src/lib/content.ts), so it isn't a new/fabricated figure.
const mobileStats = [
  { Icon: CalendarDays, value: "4.5+", label: "Years Experience" },
  { Icon: Layers, value: "15+", label: "Enterprise Projects" },
  { Icon: TrendingUp, value: "$3.5M+", label: "Impact Delivered" },
  { Icon: Users, value: "100%", label: "Client Focused" },
] as const;

// Floating icon badges over the mobile photo — new to this design, no
// existing precedent to extend (desktop's floating cards are rectangular
// info cards, not small icon badges).
const photoBadges = [
  { Icon: Brain, position: "-left-3 -top-3" },
  { Icon: BarChart3, position: "-right-3 -top-3" },
  { Icon: Network, position: "-right-3 bottom-8" },
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

function StatIcon({ stat, active, delay }: { stat: (typeof stats)[number]; active: boolean; delay: number }) {
  const { Icon, value, label, color } = stat;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left px-2"
    >
      <Icon
        size={30}
        strokeWidth={1.6}
        style={{ color, filter: `drop-shadow(0 0 6px color-mix(in srgb, ${color} 65%, transparent))` }}
      />
      <p className="font-heading text-[26px] sm:text-[28px] font-bold text-white leading-none mt-1">{value}</p>
      <p className="text-[12.5px] text-white/55 leading-snug">{label}</p>
    </motion.div>
  );
}

function AIEnthusiastCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 ${className}`}
      style={{ background: "rgba(8,12,26,0.75)", border: `1px solid ${CARD_BORDER}`, backdropFilter: "blur(6px)" }}
    >
      <BrainCircuit size={30} strokeWidth={1.5} style={{ color: "var(--color-lime)", filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-lime) 60%, transparent))" }} />
      <div>
        <p className="font-heading text-[13.5px] font-bold text-white leading-snug">AI Enthusiast</p>
        <p className="text-[11.5px] text-white/55 leading-snug">Builder of AI Agents &amp; Automations</p>
      </div>
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

// The new mobile design's larger "AI Enthusiast" card wants a photorealistic
// glowing-brain image (per the reference mockup) — no such asset exists in
// this repo and this sandboxed environment blocks outbound fetches to
// external image hosts (confirmed: even a plain curl to example.com is
// rejected at the proxy), so sourcing one wasn't possible here. This is a
// stylized stand-in using the same dot/glow language already established
// site-wide (DOT_PATTERN, FlowDiagram's port-dots) instead of a real photo —
// swap in a sourced image later by replacing this function's contents with
// a positioned <Image>.
function BrainGraphic() {
  const dots = [
    { top: "22%", left: "30%", size: 5, delay: 0 },
    { top: "62%", left: "22%", size: 4, delay: 0.4 },
    { top: "38%", left: "68%", size: 4, delay: 0.8 },
    { top: "72%", left: "60%", size: 5, delay: 1.2 },
  ];
  return (
    <div
      className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        background: "radial-gradient(60% 60% at 50% 50%, rgba(215,255,63,0.16) 0%, transparent 75%)",
        border: `1px solid ${CARD_BORDER}`,
      }}
    >
      <Brain
        size={40}
        strokeWidth={1.3}
        style={{ color: "var(--color-lime)", filter: "drop-shadow(0 0 8px color-mix(in srgb, var(--color-lime) 60%, transparent))" }}
      />
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: "var(--color-lime)",
            boxShadow: "0 0 6px var(--color-lime)",
            animation: `pulse-dot 2.2s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

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
        <div className="grid grid-cols-[1.3fr_1fr] lg:grid-cols-[1.15fr_420px] gap-x-6 sm:gap-x-10 gap-y-8 items-start lg:items-stretch">
          {/* Text column */}
          <div>
            <motion.div
              variants={pop}
              className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-pill mb-6 whitespace-nowrap"
              style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
            >
              <span
                className="w-2 h-2 rounded-full bg-lime shrink-0"
                style={{ boxShadow: "0 0 8px var(--color-lime)", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="font-heading text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.16em] text-white/75">
                Technical Project Manager
              </span>
            </motion.div>

            <motion.p variants={fadeBlurUp} className="font-heading text-[16px] sm:text-[19px] text-white/70 mb-1">
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeBlurUp}
              className="font-heading font-bold leading-[1.1] mb-4"
              style={{ fontSize: "clamp(1.75rem, 5.2vw, 3.25rem)" }}
            >
              <span className="block text-white">Rohit</span>
              <span className="block text-lime">Kumar Singh</span>
            </motion.h1>

            <motion.p
              variants={fadeBlurUp}
              className="pl-3 mb-5 font-heading font-medium text-lime leading-snug"
              style={{ borderLeft: "3px solid var(--color-lime)", fontSize: "clamp(13px, 1.6vw, 16px)" }}
            >
              Driving Data. Building AI. Automating Tomorrow.
            </motion.p>

            <motion.p
              variants={fadeBlurUp}
              className="leading-[1.6] text-white/65 max-w-[520px] mb-6"
              style={{ fontSize: "clamp(13.5px, 1.6vw, 16px)" }}
            >
              I lead enterprise data &amp; AI programs at phData —{" "}
              <span className="text-lime font-semibold">platform migrations</span>, data warehouses,{" "}
              <span className="text-lime font-semibold">AI deployments</span> — and build{" "}
              <span className="text-lime font-semibold">AI agents</span> that automate my own repetitive work.
            </motion.p>

          </div>

          {/* Photo column — comes right after the text column in DOM order
              so grid auto-placement lands it in row 1's second column; the
              CTA row below (col-span-2) then correctly starts a fresh row
              instead of grid auto-placement pushing the photo down. At lg:
              the CTA row collapses back to column 1 only, so the photo
              needs row-span-2 there to keep covering column 2 alongside
              it — otherwise that column-2 cell next to the CTA row would
              sit empty, the exact bug being fixed, just moved to desktop. */}
          <div className="relative h-[300px] sm:h-[360px] lg:h-auto lg:row-span-2">
            <HeroPortrait variant="desktop" />

            {/* Floating cards — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="hidden lg:block absolute -right-6 top-10 w-[230px]"
            >
              <AIEnthusiastCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="hidden lg:block absolute -right-2 bottom-6 w-[190px] rounded-2xl px-4 py-3.5"
              style={{ background: "rgba(8,12,26,0.75)", border: `1px solid ${CARD_BORDER}`, backdropFilter: "blur(6px)" }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp size={15} style={{ color: "var(--color-lime)" }} />
                <p className="font-heading text-[12.5px] font-bold text-white leading-snug">
                  Turning Ideas<br />Into Impact
                </p>
              </div>
              <div className="flex items-end gap-1 h-6">
                {[3, 6, 10, 14, 20].map((h, i) => (
                  <span key={i} className="w-1.5 rounded-sm bg-lime" style={{ height: `${h}px` }} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI card + CTAs — a separate grid row spanning BOTH columns below
              lg:, so it gets the section's full width to lay out in rather
              than being trapped in the text column's ~55% while the photo
              column (fixed height, often shorter than the text column on
              tablet-ish widths) leaves dead space beside it. At lg: it
              collapses back to the text column's width, matching the
              reference where CTAs sit under the paragraph, not full width. */}
          <div className="col-span-2 lg:col-span-1">
            <motion.div variants={fadeBlurUp} className="lg:hidden mb-6 max-w-[420px]">
              <AIEnthusiastCard />
            </motion.div>

            <motion.div variants={fadeBlurUp} className="flex flex-row flex-wrap gap-3 max-w-[420px] lg:max-w-none">
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime text-ink font-heading font-bold text-[13px] px-6 py-3.5 hover:brightness-95 transition"
              >
                See My Work <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-white/25 text-white font-heading font-bold text-[13px] px-6 py-3.5 hover:border-lime hover:text-lime transition"
              >
                <Mail size={15} /> Let&apos;s Talk
              </a>
            </motion.div>
          </div>
        </div>

        {/* Tools & platforms — full width */}
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

        {/* The numbers */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 24 }}
          animate={panelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 lg:mt-14 rounded-2xl p-6 sm:p-8"
          style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
        >
          <p className="flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-lime mb-7">
            The Numbers <Sparkle size={13} />
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {stats.map((stat, i) => (
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
                <StatIcon stat={stat} active={panelInView} delay={0.15 + i * 0.1} />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile-only hero — new reference design (role-first headline, a
          different bio, a lime ring-glow photo with floating badges, an
          all-lime single-row stats strip, a larger AI Enthusiast card, and
          a horizontal-scroll tools row). Genuinely different content from
          desktop above, not a restyle of it — see Hero.tsx's own git
          history/plan notes for why that's an intentional, stated tradeoff
          of a mobile-only redesign rather than an oversight. */}
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
          // mobile pulls it back out with a negative margin so the badge
          // sits right under the header instead of ~90px below it.
          className="max-w-6xl mx-auto px-6 -mt-16 pt-3 pb-14 sm:pb-16 relative z-10"
        >
          <motion.div
            variants={pop}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-pill mb-6 whitespace-nowrap"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <span
              className="w-2 h-2 rounded-full bg-lime shrink-0"
              style={{ boxShadow: "0 0 8px var(--color-lime)", animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <span className="font-heading text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-white/75">
              Technical Project Manager
            </span>
          </motion.div>

          <div className="grid grid-cols-[1.2fr_1fr] gap-x-4 sm:gap-x-6 items-start">
            <motion.h1 variants={fadeBlurUp} className="font-heading leading-[1.15]">
              <span className="block font-medium text-white/70" style={{ fontSize: "clamp(0.95rem, 4vw, 1.1rem)" }}>
                I am a
              </span>
              <span className="block font-bold text-white" style={{ fontSize: "clamp(1.7rem, 8.5vw, 2.4rem)" }}>
                Technical
              </span>
              <span className="block font-bold text-white" style={{ fontSize: "clamp(1.7rem, 8.5vw, 2.4rem)" }}>
                Project Manager
              </span>
              <span
                className="block font-medium text-white mt-2"
                style={{ fontSize: "clamp(0.95rem, 4vw, 1.1rem)" }}
              >
                and good at building
              </span>
              <span
                className="block font-bold text-lime whitespace-nowrap"
                style={{ fontSize: "clamp(0.9rem, 3.7vw, 1.15rem)" }}
              >
                AI agents &amp; systems
              </span>
              <span className="block font-medium text-white" style={{ fontSize: "clamp(0.95rem, 4vw, 1.1rem)" }}>
                that drive impact.
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

          <motion.div variants={fadeBlurUp} className="flex flex-row flex-wrap gap-3 mb-10">
            <a
              href="#experience"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime text-ink font-heading font-bold text-[13px] px-6 py-3.5 hover:brightness-95 transition"
            >
              See My Work <ArrowUpRight size={15} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-white/25 text-white font-heading font-bold text-[13px] px-6 py-3.5 hover:border-lime hover:text-lime transition"
            >
              <Mail size={15} /> Let&apos;s Talk
            </a>
          </motion.div>

          <motion.div
            variants={fadeBlurUp}
            className="rounded-2xl p-5 mb-6"
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

          <motion.div
            variants={fadeBlurUp}
            className="flex items-center gap-4 rounded-2xl p-5 mb-10"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
          >
            <BrainGraphic />
            <div className="flex-1 min-w-0">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-lime mb-1.5">
                AI Enthusiast &bull; Builder &bull; Automator
              </p>
              <p className="text-[13px] text-white leading-snug">
                I design AI agents and systems that turn manual work into intelligent automation.
              </p>
            </div>
            <ChevronRight size={18} className="text-white/40 shrink-0" />
          </motion.div>

          <motion.div variants={fadeBlurUp}>
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
