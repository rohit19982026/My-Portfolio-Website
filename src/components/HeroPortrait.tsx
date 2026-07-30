"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Just the photo: real alpha-transparent cutout (from
 * @imgly/background-removal-node), true colors, no recolor. The hero no
 * longer renders any backdrop graphic behind it (HeroBackdrop was removed
 * from Hero.tsx entirely, not just hidden here), so there's nothing left to
 * mask or block — the neon-lime rim glow via stacked `drop-shadow()` (which
 * traces the image's real alpha silhouette) is purely a brand-accent touch
 * now, not doing double duty as camouflage.
 *
 * The source photo is a waist-up shot — its bottom edge is where the
 * camera's own framing cut him off, not a natural taper like a shoulder or
 * sleeve line. Background removal preserves that straight edge exactly, and
 * a silhouette-hugging glow around a perfectly straight line is what reads
 * as "cut with scissors." A bottom mask fade (linear-gradient to
 * transparent over the last ~14% of the frame) dissolves that edge into the
 * hero's blue before the glow ever gets to trace it — the glow operates on
 * this already-faded alpha, so it tapers away with the photo instead of
 * ringing a hard line.
 *
 * Desktop only: under ~1024px there isn't room for a second column without
 * crowding the greeting text, so this stays a progressive enhancement.
 */
const BOTTOM_FADE_MASK = "linear-gradient(to bottom, #000 0%, #000 82%, transparent 97%)";
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
        initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full"
      >
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
              maskImage: BOTTOM_FADE_MASK,
              WebkitMaskImage: BOTTOM_FADE_MASK,
              filter: [
                "drop-shadow(0 14px 18px rgba(0,0,0,0.4))",
                "drop-shadow(0 0 5px color-mix(in srgb, var(--color-lime) 85%, transparent))",
                "drop-shadow(0 0 14px color-mix(in srgb, var(--color-lime) 60%, transparent))",
                "drop-shadow(0 0 30px color-mix(in srgb, var(--color-lime) 35%, transparent))",
              ].join(" "),
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
