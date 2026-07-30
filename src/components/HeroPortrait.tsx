"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * No independent shape behind the photo — the previous gradient aura was
 * still "an oval sitting near him," not something that reads as part of
 * him. This version has no positioned shape at all: the glow and the
 * graphic-blocking layer are both the *same cutout image*, reused as its
 * own silhouette (scaled up slightly from its own base, brightness(0) to
 * flatten it to a solid shape, blurred). Because it's literally his own
 * alpha channel, the resulting glow/blocker traces his real outline — hair,
 * shoulders, crossed arms — with a uniform margin, instead of an ellipse
 * that happens to be positioned near him.
 *
 * Two stacked <Image>s, same src:
 * 1. "Blocker" — scaled ~1.15x from its own bottom-center, flattened to
 *    solid black via `brightness(0)`, blurred — fully hides HeroBackdrop's
 *    orchestration graphic in that silhouette-shaped region, and doubles
 *    as a soft dark grounding shadow.
 * 2. The real photo on top, true colors and untouched, with a stacked
 *    `drop-shadow()` glow in the site's neon-lime accent (not blue — lime
 *    is the "opposite," high-contrast brand color against this blue hero)
 *    — `drop-shadow` inherently traces the actual alpha silhouette, so the
 *    glow hugs his outline rather than sitting behind him as a shape.
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
          {/* Blocker — his own silhouette, scaled up and flattened, hides
              the orchestration graphic without being an independent shape.
              Two passes: a tight, dense core for solid coverage close to
              the outline, and a bigger, softer pass so the edge of that
              coverage fades out rather than stopping abruptly. */}
          <Image
            src="/hero/rohit-portrait-cutout.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 440px, 400px"
            className="object-contain object-bottom"
            style={{
              filter: "brightness(0) blur(34px)",
              opacity: 0.9,
              transform: "scale(1.65)",
              transformOrigin: "bottom center",
            }}
          />
          <Image
            src="/hero/rohit-portrait-cutout.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 440px, 400px"
            className="object-contain object-bottom"
            style={{
              filter: "brightness(0) blur(11px)",
              opacity: 1,
              transform: "scale(1.26)",
              transformOrigin: "bottom center",
            }}
          />

          {/* The real photo — true colors, neon-lime rim glow that traces
              its own alpha silhouette via stacked drop-shadow */}
          <Image
            src="/hero/rohit-portrait-cutout.png"
            alt="Rohit Kumar Singh"
            fill
            priority
            sizes="(min-width: 1280px) 440px, 400px"
            className="object-contain object-bottom"
            style={{
              filter: [
                "drop-shadow(0 14px 18px rgba(0,0,0,0.4))",
                "drop-shadow(0 0 5px color-mix(in srgb, var(--color-lime) 90%, transparent))",
                "drop-shadow(0 0 14px color-mix(in srgb, var(--color-lime) 70%, transparent))",
                "drop-shadow(0 0 30px color-mix(in srgb, var(--color-lime) 50%, transparent))",
                "drop-shadow(0 0 52px color-mix(in srgb, var(--color-lime) 30%, transparent))",
              ].join(" "),
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
