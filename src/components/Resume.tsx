"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Award, Code2, Download, Eye, FileText, GraduationCap, Layers, Store } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import GithubMark from "./icons/GithubMark";

const RESUME_PATH = "/resume/Rohit-Kumar-Singh-Resume.pdf";
const RESUME_FILENAME = "Rohit-Kumar-Singh-Resume.pdf";
const GITHUB_URL = "https://github.com/rohit19982026?tab=repositories";
const SITE_REPO_URL = "https://github.com/rohit19982026/my-portfolio-website";

const CARD_BORDER = "var(--color-card-border)";
const CARD_BG = "var(--color-card)";

// Same facts already verified against Experience.tsx/Credentials.tsx —
// a condensed "what's in the PDF" preview, not new claims.
const highlights = [
  { Icon: Layers, label: "6 years in IT delivery", sub: "BT, then phData" },
  { Icon: Award, label: "Claude Certified Architect – Foundations", sub: "Plus PSM I and ITIL Foundation" },
  { Icon: GraduationCap, label: "phData Innovation Award", sub: "For the PMO agents" },
];

const projects = [
  {
    name: "my-portfolio-website",
    note: "This site, built with Claude Code.",
    tags: ["Next.js", "Tailwind", "Claude Code"],
    href: SITE_REPO_URL,
    Icon: GithubMark,
  },
  {
    name: "Online store",
    note: "A store running on Vercel and Supabase, built with Claude Code.",
    tags: ["Vercel", "Supabase", "Claude Code"],
    href: undefined,
    Icon: Store,
  },
];

// Decorative one-page preview; the real document is the PDF.
function PaperPreview() {
  const bar = (w: string, strong = false) => (
    <span
      className="block h-1.5 rounded-full"
      style={{ width: w, background: strong ? "#0d0d0f" : "rgba(13,13,15,.16)" }}
    />
  );
  return (
    <div aria-hidden className="relative hidden sm:block w-[148px] shrink-0">
      <div
        className="absolute inset-0 translate-x-2 translate-y-2 rotate-[4deg] rounded-md"
        style={{ background: "color-mix(in srgb, var(--color-accent) 22%, transparent)" }}
      />
      <div
        className="relative -rotate-[3deg] space-y-2.5 rounded-md p-3.5"
        style={{ background: "#fbfaf6", boxShadow: "0 14px 28px -12px rgba(0,0,0,.35), 0 0 0 1px rgba(13,13,15,.08)", aspectRatio: "3 / 4" }}
      >
        <span className="block h-2 w-3/5 rounded-full" style={{ background: "#0d22ee" }} />
        {bar("45%", true)}
        <div className="h-px w-full" style={{ background: "rgba(13,13,15,.12)" }} />
        {bar("30%", true)}
        {bar("100%")}
        {bar("92%")}
        {bar("96%")}
        <div className="pt-1">{bar("28%", true)}</div>
        {bar("100%")}
        {bar("84%")}
        <div className="pt-1">{bar("34%", true)}</div>
        {bar("90%")}
        {bar("70%")}
      </div>
    </div>
  );
}

type TabId = "resume" | "code";
const tabs: { id: TabId; label: string; Icon: typeof FileText }[] = [
  { id: "resume", label: "Resume", Icon: FileText },
  { id: "code", label: "Code", Icon: Code2 },
];

function ResumePanel() {
  return (
    <div className="flex items-start gap-8">
      <div className="min-w-0 flex-1">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-3">
          PDF · ATS-FRIENDLY · 1 PAGE
        </p>
        <h3 className="font-heading text-[20px] sm:text-[24px] font-bold leading-snug text-fg mb-5">
          Rohit Kumar Singh — Technical Project Manager
        </h3>
        <ul className="mb-7 space-y-3">
          {highlights.map((h) => (
            <li key={h.label} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: "color-mix(in srgb, var(--color-accent) 12%, transparent)" }}
              >
                <h.Icon size={15} className="text-accent" />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-[12.5px] font-bold leading-snug text-fg">{h.label}</span>
                <span className="block text-[11px] leading-snug text-fg/55">{h.sub}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-row flex-wrap gap-3">
          <Button href={RESUME_PATH} download={RESUME_FILENAME}>
            <Download size={15} /> Download Resume
          </Button>
          <Button href={RESUME_PATH} target="_blank" rel="noopener noreferrer" variant="secondary">
            <Eye size={15} /> View in Browser
          </Button>
        </div>
      </div>
      <PaperPreview />
    </div>
  );
}

function CodePanel() {
  return (
    <div>
      <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-3">
        ALSO A BUILDER
      </p>
      <h3 className="font-heading text-[20px] sm:text-[24px] font-bold leading-snug text-fg mb-2">
        I build things outside work too.
      </h3>
      <p className="mb-6 max-w-lg text-[14px] leading-relaxed text-fg/65">
        Mostly with Claude Code. The code for this site is on GitHub.
      </p>
      <ul className="mb-7 grid gap-3 sm:grid-cols-2">
        {projects.map((p) => {
          const inner = (
            <>
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "color-mix(in srgb, var(--color-accent) 12%, transparent)", color: "var(--color-accent)" }}
              >
                <p.Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 font-heading text-[14px] font-bold text-fg">
                  <span className="truncate">{p.name}</span>
                  {p.href && <ArrowUpRight size={14} className="shrink-0 text-fg/40 transition group-hover:text-accent" />}
                </span>
                <span className="mt-1 block text-[12.5px] leading-snug text-fg/60">{p.note}</span>
                <span className="mt-2.5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2 py-0.5 font-heading text-[10px] font-semibold text-fg/65"
                      style={{ border: `1px solid ${CARD_BORDER}` }}
                    >
                      {t}
                    </span>
                  ))}
                </span>
              </span>
            </>
          );
          const cls = "group flex h-full items-start gap-3.5 rounded-xl p-4";
          const style = { background: "var(--color-card-subtle)", border: `1px solid ${CARD_BORDER}` };
          return (
            <li key={p.name}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:border-accent`} style={style}>
                  {inner}
                </a>
              ) : (
                <div className={cls} style={style}>
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <Button href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <GithubMark className="h-4 w-4 shrink-0" />
        View my repositories →
      </Button>
    </div>
  );
}

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const uid = useId();
  const [tab, setTab] = useState<TabId>("resume");

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const i = tabs.findIndex((t) => t.id === tab);
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    document.getElementById(`${uid}-tab-${tabs[next].id}`)?.focus();
  };

  return (
    <section id="resume" className="relative overflow-hidden py-24 bg-surface border-t-2 border-fg/10">
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 / RESUME & CODE"
          segments={[
            { text: "The resume.", style: "fill" },
            { text: "The code.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed mb-10">
          Everything on one page if you&apos;d rather read it that way, and where my code lives on GitHub.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl overflow-hidden rounded-2xl"
          style={{ border: `1px solid ${CARD_BORDER}`, background: CARD_BG }}
        >
          <div
            role="tablist"
            aria-label="Resume or code"
            onKeyDown={onKeyDown}
            className="flex gap-1 p-2"
            style={{ borderBottom: `1px solid ${CARD_BORDER}`, background: "var(--color-card-subtle)" }}
          >
            {tabs.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  id={`${uid}-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`${uid}-panel`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  className={`relative flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 font-heading text-[12px] font-bold uppercase tracking-[0.14em] transition-colors sm:flex-none sm:px-6 ${
                    active ? "text-ink" : "text-fg/60 hover:text-fg"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={`${uid}-pill`}
                      className="absolute inset-0 rounded-xl bg-lime"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <t.Icon size={15} className="relative" />
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>

          <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="p-6 sm:p-8 sm:min-h-[330px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.18 }}
              >
                {tab === "resume" ? <ResumePanel /> : <CodePanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
