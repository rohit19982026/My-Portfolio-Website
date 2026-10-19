"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Real alpha-transparent cutout (from @imgly/background-removal-node),
 * true colors, no recolor. Per the user's own reference design: a soft
 * blue ambient glow + a faint dot-grid sit behind him (replacing the
 * earlier neon-lime rim-glow treatment) — brand-accent color moves to the
 * floating info cards and buttons instead of the portrait itself.
 *
 * The source photo is a waist-up shot — its bottom edge is where the
 * camera's own framing cut him off, not a natural taper. A bottom mask
 * fade (linear-gradient to transparent over the last ~14% of the frame)
 * dissolves that edge into the background before any effect gets to trace
 * it, so it never reads as a hard cut.
 *
 * Two variants share this recipe (mask + glow/dot backdrop +
 * reduced-motion-gated float) at two sizes with two different entrance
 * owners — "desktop" (its own grid column, self-contained entrance timing)
 * and "mobile" (inline in the text stack, entrance owned by Hero.tsx's
 * stagger via variants={fadeBlurUp}). Visibility classes are owned by the
 * caller in Hero.tsx.
 *
 * mask-image and filter/drop-shadow live on different elements (mask on a
 * wrapper, filter on the <Image>) so the render order is deterministic
 * across browser engines rather than depending on how any one engine
 * resolves two effects stacked on a single element.
 */
const BOTTOM_FADE_MASK = "linear-gradient(to bottom, #000 0%, #000 82%, transparent 97%)";
// Phone/tablet: a longer, eased fade so the jacket melts into the arch glow
// instead of turning into a grey-white band.
const MOBILE_FADE_MASK =
  "linear-gradient(to bottom, #000 0%, #000 58%, rgba(0,0,0,0.78) 70%, rgba(0,0,0,0.48) 82%, rgba(0,0,0,0.18) 92%, transparent 100%)";

const IMAGE_SIZES = {
  desktop: "(min-width: 1280px) 440px, 400px",
  mobile: "(min-width: 640px) 420px, 46vw",
} as const;

const GROUND_SHADOW = {
  desktop: "drop-shadow(0 18px 22px rgba(0,0,0,0.5))",
} as const;

const DOT_GRID = "radial-gradient(circle, rgba(147,181,255,0.4) 1px, transparent 1.6px)";
// Lime-tinted counterpart to DOT_GRID, used only by the mobile ring backdrop
// below — mobile's new reference design moves the ambient glow from blue to
// lime, matching the accent color used everywhere else in the new mobile
// hero rather than desktop's blue.
const DOT_GRID_LIME = "radial-gradient(circle, rgba(215,255,63,0.22) 1px, transparent 1.6px)";

export default function HeroPortrait({ variant }: { variant: "desktop" | "mobile" }) {
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setMotionEnabled(!mq.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  const desktopBackdrop = (
    <div className="absolute inset-[-14%] pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: DOT_GRID, backgroundSize: "20px 20px" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 56% at 52% 40%, rgba(64,96,224,0.4) 0%, rgba(64,96,224,0.14) 55%, transparent 78%)",
        }}
      />
    </div>
  );

  // Mobile's reference design: two concentric lime ring outlines + a soft
  // centered lime glow + the same dot-grid technique (just re-tinted) +
  // one small "port dot" marker on the outer ring's circumference — the
  // exact dark-fill/accent-stroke marker already used for edge endpoints
  // in FlowDiagram.tsx, reused here instead of inventing a new dot style.
  const mobileBackdrop = (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-[-14%]"
        style={{ backgroundImage: DOT_GRID_LIME, backgroundSize: "22px 22px" }}
      />
      {/* thin outer arch, concentric with the filled one */}
      <div
        className="absolute inset-0 rounded-t-[999px] border border-b-0"
        style={{
          borderColor: "rgba(170,215,20,0.6)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
        }}
      />
      {/* soft filled arch the portrait stands in */}
      <div
        className="absolute inset-x-[5%] bottom-0 top-[5%] rounded-t-[999px]"
        style={{
          background:
            "radial-gradient(80% 65% at 50% 32%, rgba(205,245,60,0.6) 0%, rgba(215,255,63,0.26) 55%, rgba(215,255,63,0.05) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
        }}
      />
    </div>
  );

  const backdrop = variant === "mobile" ? mobileBackdrop : desktopBackdrop;

  const photo = (
    <motion.div
      animate={motionEnabled ? { y: [0, -10, 0] } : {}}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative h-full w-full"
    >
      {backdrop}
      <div
        // mobile: keep the whole figure inside the arch instead of cropping the shoulders at the box edge
        className={variant === "mobile" ? "absolute inset-x-[7%] bottom-0 top-[5%]" : "relative h-full w-full"}
        style={{
          maskImage: variant === "mobile" ? MOBILE_FADE_MASK : BOTTOM_FADE_MASK,
          WebkitMaskImage: variant === "mobile" ? MOBILE_FADE_MASK : BOTTOM_FADE_MASK,
        }}
      >
        <Image
          src="/hero/rohit-portrait-cutout.png"
          alt="Rohit Kumar Singh"
          fill
          priority
          sizes={IMAGE_SIZES[variant]}
          className={variant === "mobile" ? "object-cover object-top" : "object-contain object-bottom"}
          style={variant === "mobile" ? undefined : { filter: GROUND_SHADOW[variant] }}
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
