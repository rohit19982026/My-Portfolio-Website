"use client";

import { useEffect, useRef } from "react";
import Star from "./Star";
import { subscribeScroll } from "@/lib/scrollBus";

type MarqueeProps = {
  items: string[];
  variant?: "lime" | "ink" | "blue";
  reverse?: boolean;
  tilt?: boolean;
  className?: string;
};

const variantClasses: Record<string, string> = {
  lime: "bg-lime text-ink",
  ink: "bg-ink text-white border-y-2 border-white/10",
  blue: "bg-blue text-white",
};

export default function Marquee({
  items,
  variant = "lime",
  reverse = false,
  tilt = false,
  className = "",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  // The ticker is the page's speedometer: it drifts at its own pace, speeds up
  // while you scroll down, and runs backwards while you scroll up, easing back
  // to its idle pace when you stop. Playback rate on the existing CSS animation
  // only, so it costs no layout work. Skipped for reduced motion and while the
  // band is offscreen.
  useEffect(() => {
    const track = trackRef.current;
    const band = bandRef.current;
    if (!track || !band || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // CSS already flips direction for `reverse`, so idle playback rate is 1.
    let target = 1;
    let rate = 1;
    let raf = 0;
    let visible = false;

    const apply = () => {
      raf = 0;
      rate += (target - rate) * 0.09;
      const anim = track.getAnimations()[0];
      if (anim) anim.playbackRate = rate;
      if (visible && Math.abs(target - rate) > 0.01) raf = requestAnimationFrame(apply);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) {
        // leaving the screen: drop back to idle pace so it is never left reversed
        target = rate = 1;
        const anim = track.getAnimations()[0];
        if (anim) anim.playbackRate = 1;
      }
    });
    io.observe(band);
    const unsub = subscribeScroll(({ velocity }) => {
      if (!visible) return;
      const boost = Math.max(-5, Math.min(5, velocity / 9));
      // Down: faster. Up: slows, then reverses once you scroll up quickly.
      target = 1 + boost;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    return () => {
      io.disconnect();
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const strip = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center gap-5 pr-5 font-display text-2xl uppercase leading-none tracking-wide sm:gap-8 sm:pr-8 sm:text-4xl"
        >
          {item}
          <Star className="h-5 w-5 sm:h-7 sm:w-7" />
        </span>
      ))}
    </div>
  );

  const band = (
    <div
      ref={bandRef}
      className={`relative z-10 overflow-hidden py-4 sm:py-5 ${variantClasses[variant]} ${
        tilt ? "-rotate-2 scale-x-105" : ""
      } ${className}`}
    >
      <div ref={trackRef} className={`marquee-track flex w-max ${reverse ? "marquee-track-reverse" : ""}`}>
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );

  // The tilted band is wider than the screen on purpose; clip it here so it
  // never becomes page-level horizontal scroll.
  return tilt ? <div className="overflow-x-clip">{band}</div> : band;
}
