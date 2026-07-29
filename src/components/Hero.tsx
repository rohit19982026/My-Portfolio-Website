"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HeroBackdrop from "./HeroBackdrop";
import Button from "./ui/Button";
import StatCounter from "./ui/StatCounter";

export default function Hero() {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section className="min-h-screen flex flex-col pt-[64px] bg-blue relative overflow-hidden">
      {/* Agent-orchestration loop, composited behind the content */}
      <HeroBackdrop />

      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20 relative z-10">
        {/* Available pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-pill font-heading text-[11px] tracking-[0.16em] text-white/80 w-fit"
          style={{ border: "1px solid color-mix(in srgb, var(--color-lime) 30%, transparent)", background: "color-mix(in srgb, var(--color-lime) 10%, transparent)" }}
        >
          <span
            className="w-2 h-2 rounded-full bg-lime"
            style={{ boxShadow: "0 0 10px var(--color-lime)", animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          AVAILABLE FOR PROGRAMS · BENGALURU · UTC+5:30
        </motion.div>

        {/* Byline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-heading text-[13px] font-bold uppercase tracking-[0.2em] text-lime mb-4"
        >
          Rohit Kumar Singh
        </motion.p>

        {/* Headline — the hero visual, Aurelia-style */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display uppercase leading-[0.88] mb-8"
          style={{ fontSize: "clamp(3.25rem, 11vw, 8.5rem)" }}
        >
          <span className="block text-outline">Technical</span>
          <span className="block text-white">Project Manager</span>
        </motion.h1>

        {/* Lead copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="leading-[1.55] text-white/80 max-w-[740px] mb-10"
          style={{ fontSize: "clamp(19px, 2.3vw, 25px)" }}
        >
          I&apos;m a technical project manager at phData. I run data and AI delivery programs
          for enterprise clients —{" "}
          <em className="not-italic text-lime font-semibold">platform migrations, lakehouses, AI deployments</em>.
          {" "}Ten so far, the largest $1.37M. I also{" "}
          <strong className="font-semibold text-white">
            build the AI agents that handle the repetitive parts of my own job
          </strong>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          <Button href="#work">See the work →</Button>
          <Button href="#contact" variant="secondary">Email me ✉</Button>
        </motion.div>

        {/* Live status panel */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 24 }}
          animate={panelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-card p-6 overflow-hidden"
          style={{
            background: "color-mix(in srgb, var(--color-white) 6%, transparent)",
            border: "1px solid color-mix(in srgb, var(--color-white) 16%, transparent)",
          }}
        >
          {/* Top accent line */}
          <span
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-lime), transparent)" }}
          />

          <div className="mb-5 pb-4" style={{ borderBottom: "1px solid color-mix(in srgb, var(--color-white) 12%, transparent)" }}>
            <p className="font-heading text-[11px] uppercase tracking-[0.18em] text-white/60">
              The numbers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCounter label="Programs delivered"     target={10}   decimals={0}             suffix="+"   delta="scoped end to end"       active={panelInView} delay={0.15} />
            <StatCounter label="Largest program"        target={1.37} decimals={2} prefix="$" suffix="M"   delta="two-year engagement"     active={panelInView} delay={0.25} />
            <StatCounter label="Combined contract value" target={3.5} decimals={1} prefix="$" suffix="M+"  delta="across all programs"     active={panelInView} delay={0.35} />
            <StatCounter label="Largest pod managed"    target={11}   decimals={0}             suffix=""    delta="engineers, two regions"  active={panelInView} delay={0.45} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
