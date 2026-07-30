"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * The source photo has a plain light-grey studio backdrop, which would read
 * as a mismatched rectangle if just faded at the edges over the hero's
 * saturated blue. Instead the whole frame — subject and backdrop alike — is
 * pushed into the same blue duotone the rest of the hero lives in (desaturate
 * to grayscale, then recolor with `mix-blend-mode: color` so luminance is
 * kept but hue/saturation become the brand blue), the same "no visible photo
 * rectangle" goal HeroBackdrop reaches for the orchestration clip via screen
 * blending — just solved differently here because a screen blend would blow
 * a light backdrop out to white instead of hiding it.
 *
 * The mask sits on a wrapper sized to the photo's own aspect ratio (not the
 * outer square slot), so its percentages describe the actual photo bounds —
 * masking the outer square directly left most of the visible photo sitting
 * inside the mask's fully-opaque core (object-contain letterboxes it well
 * inside that box), which read as a hard rectangle with barely any fade.
 * Desktop only: under ~1024px there isn't room for a second column without
 * crowding the greeting text, so this stays a progressive enhancement for
 * larger screens.
 */
const MASK =
  "radial-gradient(56% 72% at 50% 30%, #000 32%, rgba(0,0,0,0.6) 52%, transparent 88%)";

export default function HeroPortrait() {
  return (
    <div className="hidden lg:block relative h-full w-full" aria-hidden="true">
      {/* Soft lime glow, ties the portrait to the brand accent color */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 46% at 50% 40%, color-mix(in srgb, var(--color-lime) 20%, transparent), transparent 72%)",
          filter: "blur(28px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full flex items-start justify-center"
      >
        <div
          className="relative h-full"
          style={{
            aspectRatio: "9 / 16",
            isolation: "isolate",
            maskImage: MASK,
            WebkitMaskImage: MASK,
          }}
        >
          <Image
            src="/hero/rohit-portrait.png"
            alt="Rohit Kumar Singh"
            fill
            priority
            sizes="(min-width: 1280px) 320px, 280px"
            className="object-cover object-top"
            style={{ filter: "grayscale(1) contrast(1.15) brightness(1.08)" }}
          />

          {/* Duotone recolor — keeps the photo's luminance, replaces its
              hue/saturation with the hero's blue so backdrop and subject
              read as one surface instead of a photo dropped on a color. */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--color-blue)", mixBlendMode: "color" }}
          />

          {/* A touch of the brand accent in the highlights, upper-left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(155deg, color-mix(in srgb, var(--color-lime) 26%, transparent) 0%, transparent 46%)",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
