"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Award, Download, Eye, GraduationCap, Layers, Store } from "lucide-react";
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

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" className="relative overflow-hidden py-24 bg-surface border-t-2 border-fg/10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent)" }}
      />
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 / RESUME & CODE"
          segments={[
            { text: "The resume.", style: "fill" },
            { text: "The code.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed mb-10 sm:mb-12">
          Everything on one page if you&apos;d rather read it that way, and where my code lives on GitHub.
        </p>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-card p-6 sm:p-8"
            style={{ border: `1px solid ${CARD_BORDER}`, background: CARD_BG }}
          >
            <div className="flex items-start gap-8">
              <div className="min-w-0 flex-1">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-3">
                  PDF · ATS-FRIENDLY · 1 PAGE
                </p>
                <h3 className="font-heading text-[20px] sm:text-[24px] font-bold leading-snug text-fg mb-5">
                  Rohit Kumar Singh — Technical Project Manager
                </h3>
                <ul className="mb-6 space-y-3">
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
              </div>
              <PaperPreview />
            </div>
            <div className="flex flex-row flex-wrap gap-3">
              <Button href={RESUME_PATH} download={RESUME_FILENAME}>
                <Download size={15} /> Download Resume
              </Button>
              <Button href={RESUME_PATH} target="_blank" rel="noopener noreferrer" variant="secondary">
                <Eye size={15} /> View in Browser
              </Button>
            </div>
          </motion.div>

          {/* Code */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex flex-col overflow-hidden rounded-card"
            style={{ background: "#0d0d0f", border: "1px solid rgba(255,255,255,.12)", color: "#fff" }}
          >
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
              <span className="ml-2 min-w-0 truncate font-mono text-[11px] text-white/55">github.com/rohit19982026</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-lime)" }}>
                Also a builder
              </p>
              <p className="text-[14px] leading-relaxed text-white/75">
                I build things outside work too, mostly with Claude Code.
              </p>
              <ul className="flex flex-col gap-2.5">
                {projects.map((p) => {
                  const inner = (
                    <>
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: "rgba(255,255,255,.08)" }}
                      >
                        <p.Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 font-mono text-[12.5px] font-bold">
                          <span className="truncate">{p.name}</span>
                          {p.href && <ArrowUpRight size={13} className="shrink-0 text-white/50 transition group-hover:text-[color:var(--color-lime)]" />}
                        </span>
                        <span className="mt-0.5 block text-[12px] leading-snug text-white/60">{p.note}</span>
                        <span className="mt-2 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full px-2 py-0.5 font-heading text-[9.5px] font-semibold text-white/70"
                              style={{ border: "1px solid rgba(255,255,255,.14)" }}
                            >
                              {t}
                            </span>
                          ))}
                        </span>
                      </span>
                    </>
                  );
                  const cls = "group flex items-start gap-3 rounded-lg p-3";
                  const style = { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" };
                  return (
                    <li key={p.name}>
                      {p.href ? (
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:bg-white/[0.08]`} style={style}>
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
              <div className="mt-auto pt-2">
                <Button href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <GithubMark className="h-4 w-4 shrink-0" />
                  View my repositories →
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
