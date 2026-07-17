"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Trophy, ArrowUpRight } from "lucide-react";
import GlassSurface from "./GlassSurface";
import GlassButton from "./GlassButton";
import MobileCarousel from "./MobileCarousel";

const AgentNetworkScene = dynamic(() => import("./three/AgentNetworkScene"), { ssr: false });

const pov = [
  {
    label: "Why I built it",
    body: "End-of-month billing reconciliation was 3-4 hours of copy-paste between the time-tracking tool and the project budget, every program, every month. I'd done it by hand for two years. The data was structured and the process was identical every time — that's not PM work, that's a script that hasn't been written yet.",
  },
  {
    label: "Build vs. buy",
    body: "Built on Glean, not a custom API integration — it was already the team's knowledge and permissions layer, so an agent there could see live program data, Salesforce, and Drive without a separate integration build. Less impressive on paper, far faster to ship and far easier for the rest of the team to pick up.",
  },
  {
    label: "Adoption sequencing",
    body: "Shipped the billing agent first because it was the highest-pain, most-measurable win — if it didn't hold up, nothing after it would get adopted either. Once it was running team-wide inside a month, the next five had an easier path in.",
  },
  {
    label: "Why the accuracy number is real",
    body: "The >95% figure on the billing agent isn't a vibe — it's backed by per-run accuracy logs checked against a test set of past reconciliations, the same way I'd back up any number before it went into a status report to a client.",
  },
];

const proofStrip = [
  { value: "3-4 hrs → ~60 min", label: "Per PM, per program, at month-end", accent: "var(--color-green)", textAccent: "var(--color-green-text)" },
  { value: ">95%", label: "Accuracy on the billing discrepancy check", accent: "var(--color-accent)", textAccent: "var(--color-accent-dk)" },
  { value: "100%", label: "Team-wide adoption within one month of shipping", accent: "var(--color-orange)", textAccent: "var(--color-orange-text)" },
];

const tools = [
  {
    award: true,
    status: "ok" as const,
    category: "Billing Automation",
    title: "Month-End Billing Reconciler",
    proof: "60% time saved · >95% accuracy · adopted team-wide in under a month",
    accent: "#30D158",
    textAccent: "#248A3D",
  },
  {
    status: "warn" as const,
    category: "Delivery Tracking",
    title: "Delivery Progress Monitor",
    proof: "CSV → ranked scorecard + PM action items in under 2 min",
    accent: "#FF9F0A",
    textAccent: "#B25C00",
  },
  {
    status: "ok" as const,
    category: "Program Risk",
    title: "Risk & Escalation Scanner",
    proof: "Replaces a 2-hour manual checklist across 4+ active programs",
    accent: "#64D2FF",
    textAccent: "#0A7EA6",
  },
  {
    status: "ok" as const,
    category: "Executive Comms",
    title: "Executive Briefing Writer",
    proof: "Executive deck drafted in under 20 min · CFO vs VP Engineering tone",
    accent: "#0A84FF",
    textAccent: "#0066CC",
  },
];

const STATUS_COLOR = { ok: "#30D158", warn: "#FF9F0A" };

export default function AIToolingTeaser() {
  return (
    <section id="tools" className="py-16 sm:py-24 relative overflow-hidden section-alt">
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "var(--color-accent-dk)" }}>
              05 / AI AGENTS
            </p>
            <h2
              className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)", color: "var(--color-text)" }}
            >
              Six production{" "}
              <span
                style={{
                  background: "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI agents
              </span>
              , built from scratch.
            </h2>
            <p className="text-[15px] max-w-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Month-end billing reconciliation was 3–4 hours of copy-paste per PM, per program —
              no judgment required, just a machine that hadn&apos;t been written yet.
              Built with accuracy checks and human-review fallbacks before it touched a live
              client invoice. Cut billing time by 60%, accurate above 95%, adopted team-wide
              inside a month. Five more agents followed. Running programs while building the
              tooling means every agent gets built for the real problem — not the documented version of it.
            </p>
          </motion.div>

          {/* Flagship 3D moment — a literal orbiting network of 6 nodes
              around a core, standing in for the 6 agents described in the
              copy. Desktop only: the mobile carousel below is already
              content-dense and this needs room to breathe. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block shrink-0"
            style={{ width: "260px", height: "260px" }}
          >
            <AgentNetworkScene accent="#0A84FF" accent2="#BF5AF2" nodeCount={6} />
          </motion.div>
        </div>

        {/* Proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          {/* Mobile: stacked cards */}
          <div className="sm:hidden flex flex-col gap-2">
            {proofStrip.map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
                style={{ background: `${p.accent}08`, border: `1px solid ${p.accent}25` }}
              >
                <div className="font-bold tabular-nums text-[22px] leading-none" style={{ color: p.textAccent }}>
                  {p.value}
                </div>
                <div className="text-[11.5px] leading-snug text-right max-w-[55%]" style={{ color: "var(--color-text-secondary)" }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
          {/* Desktop: 3-column glass panel */}
          <div className="hidden sm:block">
            <GlassSurface radius="lg">
              <div className="grid sm:grid-cols-3">
                {proofStrip.map((p, i) => (
                  <div
                    key={p.label}
                    className="p-5"
                    style={{ borderLeft: i > 0 ? "1px solid var(--glass-border)" : undefined }}
                  >
                    <div className="font-bold tabular-nums mb-1.5" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", color: p.textAccent }}>
                      {p.value}
                    </div>
                    <div className="text-[12px] leading-snug" style={{ color: "var(--color-text-secondary)" }}>
                      {p.label}
                    </div>
                  </div>
                ))}
              </div>
            </GlassSurface>
          </div>
        </motion.div>

        {/* Agent registry label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] mb-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          Agent registry — 4 of 6 deployed agents
        </motion.div>

        {/* Tool cards */}
        {(() => {
          const cards = tools.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              <GlassSurface accent={tool.accent} interactive specular radius="lg" className="p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{ color: tool.textAccent, background: `${tool.accent}14`, border: `1px solid ${tool.accent}30` }}
                  >
                    {tool.category}
                  </span>
                  {tool.award && (
                    <span
                      className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                      style={{ color: "#B25C00", background: "rgba(255,159,10,0.1)", border: "1px solid rgba(255,159,10,0.3)" }}
                    >
                      <Trophy size={11} strokeWidth={2.5} />
                      Innovation Award
                    </span>
                  )}
                  <span
                    className="ml-auto w-2 h-2 rounded-full shrink-0"
                    style={{ background: STATUS_COLOR[tool.status], animation: "pulse-dot 2s ease-in-out infinite" }}
                    aria-hidden
                  />
                </div>
                <h3 className="font-heading font-bold text-[16px] leading-snug mb-3" style={{ color: "var(--color-text)" }}>
                  {tool.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {tool.proof}
                </p>
              </GlassSurface>
            </motion.div>
          ));
          return (
            <>
              {/* Mobile: swipeable carousel */}
              <div className="md:hidden mb-10">
                <MobileCarousel>{cards}</MobileCarousel>
              </div>
              {/* Desktop: grid */}
              <div className="hidden md:grid md:grid-cols-2 gap-4 mb-10">
                {cards}
              </div>
            </>
          );
        })()}

        {/* AI point of view */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "var(--color-purple-text)" }}>
            The story behind it
          </p>
          {/* Mobile: swipeable carousel */}
          <div className="sm:hidden">
            <MobileCarousel>
              {pov.map((p) => (
                <GlassSurface key={p.label} radius="lg" className="p-5 h-full">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: "var(--color-accent-dk)" }}>
                    {p.label}
                  </p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {p.body}
                  </p>
                </GlassSurface>
              ))}
            </MobileCarousel>
          </div>
          {/* Desktop: 2-column grid */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-4">
            {pov.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <GlassSurface radius="lg" className="p-5 h-full">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: "var(--color-accent-dk)" }}>
                    {p.label}
                  </p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {p.body}
                  </p>
                </GlassSurface>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
        >
          <GlassButton href="/ai-skills" variant="primary" icon={<ArrowUpRight size={15} strokeWidth={2.5} />}>
            See full capability diagrams
          </GlassButton>
          <p className="text-[12px]" style={{ color: "var(--color-text-secondary)" }}>
            Animated flow diagrams · Architecture · Tech stack
          </p>
        </motion.div>

      </div>
    </section>
  );
}
