"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HeroPortrait from "./HeroPortrait";
import Button from "./ui/Button";
import StatCounter from "./ui/StatCounter";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
} as const;

const fadeBlurUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
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

export default function Hero() {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section className="lg:min-h-screen flex flex-col pt-[64px] bg-blue relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="flex-1 flex flex-col justify-start lg:justify-center max-w-6xl mx-auto px-6 w-full py-10 lg:py-20 relative z-10"
      >
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] items-center gap-8 lg:gap-10">
          <div className="max-w-[680px]">
            {/* Mobile/tablet portrait — a modest supporting element, not
                the lead visual (that was the previous approach; too much
                space for what it is). Enters in the same stagger cascade
                as the surrounding text via variants={fadeBlurUp} — no
                independent entrance timing. Desktop gets its own
                side-column portrait below instead. */}
            <motion.div variants={fadeBlurUp} className="lg:hidden flex justify-center mb-4">
              <div className="relative w-[130px] sm:w-[150px] aspect-[9/16]">
                <HeroPortrait variant="mobile" />
              </div>
            </motion.div>

            {/* Greeting — centered with the portrait/name/role on mobile
                (one header block), left-aligned on desktop where it sits
                beside its own photo column. */}
            <motion.p
              variants={pop}
              className="font-heading text-[16px] sm:text-[18px] font-medium text-white/65 mb-4 text-center lg:text-left"
            >
              Welcome, hi — I&apos;m
            </motion.p>

            {/* Name + Role. Desktop (lg:) matches SectionHeading.tsx's
                treatment (font-display/Anton, uppercase, clamp size) so the
                hero reads as part of the same site. Mobile gets its own
                human-scale tier — same font-heading family used site-wide
                for UI text, but mixed case at a modest size, not a shrunk
                copy of the desktop display block (a big condensed all-caps
                block stacked across several lines reads very differently —
                heavier, more "poster" — on a narrow phone than on one wide
                desktop line). */}
            <motion.h1 variants={fadeBlurUp} className="mb-3 lg:mb-5 text-center lg:text-left">
              <span
                className="block text-white font-heading font-bold normal-case leading-[1.15] text-[28px] sm:text-[32px]
                           lg:font-display lg:font-normal lg:uppercase lg:tracking-tight lg:leading-[0.97] lg:text-[clamp(2.25rem,5vw,4.5rem)]"
              >
                Rohit Kumar Singh
              </span>
              <span
                className="block text-lime font-heading font-semibold normal-case leading-[1.3] text-[18px] sm:text-[20px] mt-1
                           lg:font-display lg:font-normal lg:uppercase lg:mt-0 lg:leading-[0.97] lg:text-[clamp(2.25rem,5vw,4.5rem)]"
              >
                Technical Project Manager
              </span>
            </motion.h1>

            {/* Lead copy */}
            <motion.p
              variants={fadeBlurUp}
              className="leading-[1.55] text-white/80 max-w-[640px] mb-10"
              style={{ fontSize: "clamp(17px, 1.9vw, 20px)" }}
            >
              At phData, I run enterprise data and AI programs —{" "}
              <em className="not-italic text-lime font-semibold">platform migrations, lakehouses, AI deployments</em>
              {" "}— and build the{" "}
              <strong className="font-semibold text-white">AI agents</strong> that
              automate my own repetitive work.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeBlurUp} className="flex flex-wrap gap-3">
              <Button href="#experience">See the work →</Button>
              <Button href="#contact" variant="secondary">Email me ✉</Button>
            </motion.div>
          </div>

          <div className="hidden lg:block relative h-[460px] xl:h-[520px]">
            <HeroPortrait variant="desktop" />
          </div>
        </div>

        {/* Live status panel */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 24 }}
          animate={panelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-card p-6 overflow-hidden mt-14"
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
      </motion.div>
    </section>
  );
}
