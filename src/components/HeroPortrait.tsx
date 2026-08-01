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
 * Two variants share this exact recipe (mask + silhouette-hugging glow +
 * reduced-motion-gated float) at two different sizes and with two different
 * entrance owners:
 * - "desktop": its own grid column in Hero.tsx, self-contained explicit
 *   entrance timing (it isn't a stagger child of the text column).
 * - "mobile": inline in the text stack, sized as a modest supporting
 *   element (not the lead visual) — Hero.tsx wraps it in a
 *   `variants={fadeBlurUp}` motion.div so it reveals in the same stagger
 *   cascade as the surrounding copy instead of on an independent timeline.
 * Visibility (`hidden lg:block` / `lg:hidden`) is owned by the caller in
 * Hero.tsx, not hard-coded here.
 *
 * The mask and the glow filter live on two DIFFERENT elements (mask on the
 * wrapper, filter on the `<Image>`) rather than both on the `<Image>`'s own
 * `style`. Per spec, the composition order between `mask` and `filter` on a
 * single element isn't consistently implemented across browser engines —
 * on a real phone this showed up as a boxy artifact around the glow (the
 * glow tracing the photo's original hard bottom edge, then the mask cutting
 * through the already-rendered glow), invisible in this project's Chromium
 * testing. Splitting them onto parent/child forces a deterministic order in
 * every engine: the glow is fully computed on the child first, then the
 * parent's mask fades that already-glowing result.
 */
const BOTTOM_FADE_MASK = "linear-gradient(to bottom, #000 0%, #000 82%, transparent 97%)";

const IMAGE_SIZES = {
  desktop: "(min-width: 1280px) 440px, 400px",
  mobile: "(min-width: 640px) 150px, 130px",
} as const;

const GLOW_FILTER = {
  desktop: [
    "drop-shadow(0 14px 18px rgba(0,0,0,0.4))",
    "drop-shadow(0 0 5px color-mix(in srgb, var(--color-lime) 85%, transparent))",
    "drop-shadow(0 0 14px color-mix(in srgb, var(--color-lime) 60%, transparent))",
    "drop-shadow(0 0 30px color-mix(in srgb, var(--color-lime) 35%, transparent))",
  ].join(" "),
  mobile: [
    "drop-shadow(0 7px 9px rgba(0,0,0,0.4))",
    "drop-shadow(0 0 3px color-mix(in srgb, var(--color-lime) 85%, transparent))",
    "drop-shadow(0 0 7px color-mix(in srgb, var(--color-lime) 60%, transparent))",
    "drop-shadow(0 0 14px color-mix(in srgb, var(--color-lime) 35%, transparent))",
  ].join(" "),
} as const;

export default function HeroPortrait({ variant }: { variant: "desktop" | "mobile" }) {
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setMotionEnabled(!mq.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  const photo = (
    <motion.div
      animate={motionEnabled ? { y: [0, -10, 0] } : {}}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-full w-full"
    >
      <div
        className="relative h-full w-full"
        style={{ maskImage: BOTTOM_FADE_MASK, WebkitMaskImage: BOTTOM_FADE_MASK }}
      >
        <Image
          src="/hero/rohit-portrait-cutout.png"
          alt="Rohit Kumar Singh"
          fill
          priority
          sizes={IMAGE_SIZES[variant]}
          className="object-contain object-bottom"
          style={{ filter: GLOW_FILTER[variant] }}
        />
      </div>
    </motion.div>
  );

  if (variant === "mobile") {
    return photo;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full w-full"
    >
      {photo}
    </motion.div>
  );
}
