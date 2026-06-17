"use client";

import { useState, type Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/caseStudies";
import MobileCarousel from "./MobileCarousel";
import GlassSurface from "./GlassSurface";
import CaseStudyExperience from "./CaseStudyExperience";
import { useTilt } from "@/hooks/useTilt";

const ACCENT: Record<string, string> = {
  "T&M":         "#0A84FF",
  "FIXED-PRICE": "#30D158",
  "MANAGED":     "#64D2FF",
  "INTERNAL":    "#FF9F0A",
};

const ACCENT_TEXT: Record<string, string> = {
  "T&M":         "#0066CC",
  "FIXED-PRICE": "#248A3D",
  "MANAGED":     "#0A7EA6",
  "INTERNAL":    "#B25C00",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 90, damping: 20, delay: i * 0.07 },
  }),
};

function CaseStudyCard({ study, index }: { study: (typeof caseStudies)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT[study.model];
  const accentText = ACCENT_TEXT[study.model];
  const active = open || hovered;
  const tilt = useTilt(1.5);

  // Top 3 scale tiles for the card face
  const topScale = study.scale.slice(0, 3);

  return (
    <motion.div
      ref={tilt.ref as Ref<HTMLDivElement>}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      whileHover={!open ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      style={!open ? {
        rotateX: tilt.style.rotateX,
        rotateY: tilt.style.rotateY,
        transformPerspective: tilt.style.transformPerspective,
      } : {}}
    >
      <GlassSurface
        accent={accent}
        radius="lg"
        className="overflow-hidden"
        style={{
          boxShadow: open
            ? `0 24px 64px rgba(15,23,42,0.08), 0 0 0 1px ${accent}20, 0 0 80px ${accent}10`
            : hovered
            ? `0 12px 40px rgba(15,23,42,0.06), 0 0 40px ${accent}08`
            : "0 4px 24px rgba(0,0,0,0.04)",
        }}
      >
        {/* Live status strip — mission-control bar */}
        <div className="flex items-center justify-between px-5 md:px-7 pt-4 pb-2.5"
          style={{ borderBottom: `1px solid var(--glass-border)` }}>
          <div className="flex items-center gap-2">
            <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: "#30D158" }}
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }} />
            <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: "var(--color-text-secondary)" }}>
              CASE {study.number}
            </span>
            <span className="text-[9px]" style={{ color: "var(--color-faint)" }}>·</span>
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "var(--color-faint)" }}>
              {study.variant === "ai-agents" ? "AGENTIC SYSTEM" : "DATA PLATFORM"}
            </span>
          </div>
          <span className="font-mono text-[9px] tabular-nums" style={{ color: "var(--color-faint)" }}>
            {study.year}
          </span>
        </div>

        {/* Card face — strategic snapshot */}
        <button onClick={() => setOpen(!open)} className="w-full text-left">
          <div className="px-5 pt-5 pb-5 md:px-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{ color: accentText, background: `${accent}15`, border: `1px solid ${accent}30` }}>
                    {study.type}
                  </span>
                  <span className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
                    style={{ color: "var(--color-text-secondary)", background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
                    {study.industry}
                  </span>
                </div>
                <p className="text-[10.5px] font-semibold mb-2 uppercase tracking-[0.15em]" style={{ color: accentText }}>
                  {study.domain}
                </p>
                <h3 className="font-heading font-bold leading-[1.2] mb-3 transition-colors duration-300"
                  style={{
                    fontSize: "clamp(16px, 2vw, 22px)",
                    color: open ? accentText : "var(--color-text)",
                  }}>
                  {study.headline}
                </h3>
                <p className="text-[12.5px] leading-[1.55] max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
                  {study.capability}
                </p>
              </div>
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  border: `1.5px solid ${accent}40`,
                  color: accentText,
                  background: open ? `${accent}18` : hovered ? `${accent}0C` : "transparent",
                }}>
                <Plus size={16} strokeWidth={2.5} />
              </motion.div>
            </div>

            {/* Scale tiles — mission control snapshot */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {topScale.map((s, i) => (
                <motion.div key={s.label}
                  initial={false}
                  animate={{ background: active ? `${accent}10` : "var(--color-bg-secondary)" }}
                  transition={{ duration: 0.3 }}
                  className="px-3 py-2.5 rounded-lg"
                  style={{ border: `1px solid ${active ? `${accent}28` : "var(--glass-border)"}` }}>
                  <div className="font-heading font-black tabular-nums leading-none text-[14px] mb-1" style={{ color: accentText }}>
                    {s.value}
                  </div>
                  <div className="text-[8.5px] font-medium uppercase tracking-wider leading-tight"
                    style={{ color: "var(--color-text-secondary)" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Open cockpit affordance */}
            <div className="flex items-center gap-1.5 mt-4 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: accentText }}>
              {open ? "Close cockpit" : "Open cockpit view"}
              <ArrowUpRight size={12} strokeWidth={2.5} />
              <span className="text-[9px] font-normal" style={{ color: "var(--color-faint)" }}>
                · 8 screens · the insight · what was actually hard · the calls I made
              </span>
            </div>
          </div>
        </button>

        {/* Cockpit experience — full 8-screen multi-screen view */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="overflow-hidden"
            >
              <div className="mx-5 md:mx-7" style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }} />
              <div className="px-5 md:px-7 pt-7 pb-8">
                <CaseStudyExperience study={study} accent={accent} accentText={accentText} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassSurface>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "var(--color-accent-dk)" }}>04 / WORK</p>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.95] mb-5"
            style={{ fontSize: "clamp(32px, 5.5vw, 68px)", color: "var(--color-text)" }}>
            The work.{" "}
            <span className="font-normal" style={{
              background: "linear-gradient(130deg, var(--color-accent) 0%, var(--color-teal) 55%, var(--color-purple) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              What it actually taught me.
            </span>
          </h2>
          <p className="text-[16px] max-w-2xl leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
            Four programs. Each card is the real story — the non-obvious thing that made each one hard, and what I did about it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5"
              style={{ color: "var(--color-accent-dk)", borderRadius: "var(--radius-pill)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent)" }} />
              3 Data Platforms
            </span>
            <span className="glass inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5"
              style={{ color: "var(--color-orange-text)", borderRadius: "var(--radius-pill)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-orange)" }} />
              1 Agentic System
            </span>
          </div>
        </motion.div>

        {/* Mobile: swipeable carousel */}
        <div className="md:hidden">
          <MobileCarousel>
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </MobileCarousel>
        </div>
        {/* Desktop: vertical stack */}
        <div className="hidden md:block space-y-4">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
