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

const swipe = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
} as const;

export default function Hero() {
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-80px" });

  return (
    <section className="min-h-screen flex flex-col pt-[64px] bg-blue relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 w-full py-20 relative z-10"
      >
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] items-center gap-8 lg:gap-10">
          <div className="max-w-[680px]">
            {/* Mobile/tablet portrait — the leading visual, read before the
                greeting (face, then name, then bio) rather than dropped
                mid-paragraph. Enters in the same stagger cascade as the
                surrounding text via variants={fadeBlurUp} — no independent
                entrance timing. Desktop gets its own side-column portrait
                below instead. */}
            <motion.div variants={fadeBlurUp} className="lg:hidden flex justify-center mb-6">
              <div className="relative w-[210px] sm:w-[240px] aspect-[9/16]">
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

            {/* Name + Role — same treatment SectionHeading.tsx uses for
                every other section's headline (font-display/Anton,
                uppercase, same clamp(2.25rem,5vw,4.5rem) size, fill+lime
                two-segment pattern), so the hero reads as part of the same
                site instead of a one-off typographic choice. */}
            <motion.h1
              variants={fadeBlurUp}
              className="font-display font-normal uppercase tracking-tight leading-[0.97] mb-5 text-center lg:text-left"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
            >
              <span className="block text-white">Rohit Kumar Singh</span>
              <span className="relative inline-block">
                <span className="text-lime">Technical Project Manager</span>
                <motion.span
                  variants={swipe}
                  className="absolute left-0 -bottom-1 h-[3px] w-full bg-lime origin-left"
                />
              </span>
            </motion.h1>

            {/* Lead copy */}
            <motion.p
              variants={fadeBlurUp}
              className="leading-[1.55] text-white/80 max-w-[640px] mb-10"
              style={{ fontSize: "clamp(17px, 1.9vw, 20px)" }}
            >
              I&apos;m also an{" "}
              <strong className="font-semibold text-white">AI Builder</strong>. At
              phData, I run data and AI delivery programs for enterprise clients —{" "}
              <em className="not-italic text-lime font-semibold">platform migrations, lakehouses, AI deployments</em>.
              {" "}Ten so far, the largest $1.37M. I build the AI agents that handle
              the repetitive parts of my own job.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeBlurUp} className="flex flex-wrap gap-3">
              <Button href="#work">See the work →</Button>
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
