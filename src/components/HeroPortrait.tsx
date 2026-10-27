"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The hero portrait: a real alpha cutout standing inside a lime arch, with a
 * dot grid behind. The cutout's source photo is waist-up, so a bottom mask
 * fade dissolves the camera's own crop into the arch glow instead of leaving a
 * hard edge. Mask and filter live on different elements so render order is the
 * same in every engine.
 *
 * Depth: the arch/backdrop and the figure sit on separate planes. On a fine
 * pointer they shift a few pixels against each other as the cursor moves
 * across the hero (eased, paused offscreen, off for reduced motion). Touch
 * and keyboard visitors get the same composition, still. The arch itself
 * opens upward on load (see `data-intro="arch"` in Hero.tsx).
 */
const FADE_MASK =
  "linear-gradient(to bottom, #000 0%, #000 58%, rgba(0,0,0,0.78) 70%, rgba(0,0,0,0.48) 82%, rgba(0,0,0,0.18) 92%, transparent 100%)";

const DOT_GRID_LIME = "radial-gradient(circle, rgba(215,255,63,0.22) 1px, transparent 1.6px)";

export default function HeroPortrait() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, visible = false;
    const frame = () => {
      raf = 0;
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      root.style.setProperty("--px", x.toFixed(3));
      root.style.setProperty("--py", y.toFixed(3));
      if (visible && (Math.abs(tx - x) > 0.002 || Math.abs(ty - y) > 0.002)) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(root);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative h-full w-full" style={{ "--px": 0, "--py": 0 } as React.CSSProperties}>
      {/* far plane: dots, rings and the lime arch */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ translate: "calc(var(--px) * -9px) calc(var(--py) * -6px)" }}
      >
        <div className="absolute inset-[-14%]" style={{ backgroundImage: DOT_GRID_LIME, backgroundSize: "22px 22px" }} />
        <div
          className="absolute inset-0 rounded-t-[999px] border border-b-0"
          style={{
            borderColor: "rgba(170,215,20,0.6)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
          }}
        />
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

      {/* near plane: the figure */}
      <div
        className="absolute inset-x-[7%] bottom-0 top-[5%]"
        style={{
          maskImage: FADE_MASK,
          WebkitMaskImage: FADE_MASK,
          translate: "calc(var(--px) * 12px) calc(var(--py) * 7px)",
        }}
      >
        <Image
          src="/hero/rohit-portrait-cutout.png"
          alt="Rohit Kumar Singh"
          fill
          priority
          sizes="(min-width: 1280px) 440px, (min-width: 640px) 420px, 46vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
