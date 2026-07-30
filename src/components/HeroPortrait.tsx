"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Earlier versions tried to make the photo disappear into the hero — a
 * soft mask, then a transparent cutout floating alone over the backdrop.
 * Neither read as "native to this page": every other piece of content here
 * (the stats panel below, the tool cards, the work cards) is a defined
 * rounded card with a border and a translucent-dark fill — nothing floats
 * edge-free over the backdrop. A photorealistic cutout with no boundary
 * was the actual anomaly, not the fix. So this is a card like every other
 * card on the site (same `rounded-card` radius, same border treatment, same
 * top lime accent line as the stats panel), and the card's own fill is
 * opaque enough to fully block HeroBackdrop's orchestration graphic behind
 * it — not fade it, hide it — while the cutout itself (real alpha
 * transparency, generated via @imgly/background-removal-node) keeps its
 * natural silhouette inside that frame instead of a hard photo rectangle.
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
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full w-full"
      >
        <motion.div
          animate={floatEnabled ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full w-full rounded-card overflow-hidden"
          style={{
            background:
              "linear-gradient(175deg, color-mix(in srgb, var(--color-ink) 42%, var(--color-blue)) 0%, color-mix(in srgb, var(--color-ink) 68%, var(--color-blue)) 100%)",
            border: "1px solid color-mix(in srgb, var(--color-white) 16%, transparent)",
          }}
        >
          {/* Top accent line — identical treatment to the stats panel below */}
          <span
            className="absolute top-0 left-0 right-0 h-px z-10"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-lime), transparent)" }}
          />

          <div className="absolute inset-x-4 top-6 bottom-0">
            <Image
              src="/hero/rohit-portrait-cutout.png"
              alt="Rohit Kumar Singh"
              fill
              priority
              sizes="(min-width: 1280px) 400px, 360px"
              className="object-contain object-bottom"
              style={{ filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.4))" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
