"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * No card, no border, no rounded rectangle — a bordered panel is a dated
 * pattern for a hero portrait; nothing about a personal photo should read
 * as "form field." Instead: an organic, heavily-blurred multi-tone gradient
 * aura (three overlapping radial gradients at different offsets, so the
 * combined shape has no geometric outline) sits behind the cutout, dense
 * enough at its core to fully obscure HeroBackdrop's orchestration graphic
 * in this region, dissolving into open blue at the margins with no visible
 * edge anywhere. A soft blurred contact shadow grounds him at the base
 * instead of a "floor." The cutout itself (real alpha transparency, from
 * @imgly/background-removal-node) keeps its natural silhouette — no
 * recolor, no filter on the photo besides a drop-shadow that traces the
 * actual alpha channel. The aura breathes and the portrait floats, both
 * subtle and continuous, gated off under prefers-reduced-motion like every
 * other loop in this codebase.
 *
 * Desktop only: under ~1024px there isn't room for a second column without
 * crowding the greeting text, so this stays a progressive enhancement.
 */
export default function HeroPortrait() {
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setMotionEnabled(!mq.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  return (
    <div className="hidden lg:block relative h-full w-full" aria-hidden="true">
      <motion.div
        className="absolute inset-[-14%]"
        animate={motionEnabled ? { scale: [1, 1.05, 1], opacity: [0.92, 1, 0.92] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: [
            "radial-gradient(60% 64% at 50% 42%, color-mix(in srgb, var(--color-ink) 62%, var(--color-blue) 38%) 0%, color-mix(in srgb, var(--color-ink) 62%, var(--color-blue) 38%) 46%, transparent 84%)",
            "radial-gradient(32% 32% at 74% 56%, color-mix(in srgb, var(--color-lime) 24%, transparent) 0%, transparent 72%)",
          ].join(", "),
          filter: "blur(32px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full"
      >
        {/* Contact shadow — grounds him without a floor or frame */}
        <div
          className="absolute left-1/2 bottom-[8%] -translate-x-1/2 w-[58%] h-[6%] rounded-full"
          style={{ background: "rgba(0,0,0,0.4)", filter: "blur(20px)" }}
        />

        <motion.div
          animate={motionEnabled ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <Image
            src="/hero/rohit-portrait-cutout.png"
            alt="Rohit Kumar Singh"
            fill
            priority
            sizes="(min-width: 1280px) 440px, 400px"
            className="object-contain object-bottom"
            style={{
              filter:
                "drop-shadow(0 18px 26px rgba(0,0,0,0.45)) drop-shadow(0 0 42px color-mix(in srgb, var(--color-lime) 22%, transparent))",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
