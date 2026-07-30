"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * `rohit-portrait-cutout.png` is a real background-removed asset (true
 * alpha transparency around the silhouette, generated once offline via
 * @imgly/background-removal-node — not shipped as a runtime dependency,
 * just the resulting PNG) — not a CSS mask trick. An earlier version tried
 * to fake this with a radial-gradient mask plus a grayscale+duotone recolor,
 * which left the studio backdrop visibly showing through as a white halo
 * and changed his actual photo colors. With true transparency neither
 * problem exists: no filter/recolor is needed, and shadow/glow below use
 * `filter: drop-shadow()`, which traces the image's real alpha silhouette
 * instead of a synthetic ellipse.
 *
 * The "clearing" div fades HeroBackdrop's orchestration line art in just
 * this column so it doesn't cut across his face/chest — HeroBackdrop.tsx
 * itself is untouched, this only adds a local scrim in front of it.
 *
 * Desktop only: under ~1024px there isn't room for a second column without
 * crowding the greeting text, so this stays a progressive enhancement.
 */
export default function HeroPortrait() {
  const [floatEnabled, setFloatEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setFloatEnabled(!mq.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  return (
    <div className="hidden lg:block relative h-full w-full" aria-hidden="true">
      {/* Clearing scrim — calms the orchestration graphic directly behind
          the portrait without touching HeroBackdrop anywhere else. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 50% 38%, color-mix(in srgb, var(--color-blue) 55%, transparent) 0%, color-mix(in srgb, var(--color-blue) 20%, transparent) 55%, transparent 85%)",
          filter: "blur(6px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full flex items-start justify-center"
      >
        <motion.div
          className="relative h-full w-full"
          animate={floatEnabled ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/hero/rohit-portrait-cutout.png"
            alt="Rohit Kumar Singh"
            fill
            priority
            sizes="(min-width: 1280px) 420px, 380px"
            className="object-contain object-top"
            style={{
              filter:
                "drop-shadow(0 22px 32px rgba(13,13,15,0.4)) drop-shadow(0 0 46px color-mix(in srgb, var(--color-lime) 32%, transparent))",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
