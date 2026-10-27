"use client";

import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scrollBus";

/** Thin reading-progress line. Driven by transform (compositor only) rather
 *  than width, and by the shared scroll bus rather than its own listener. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let max = 1;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const unsub = subscribeScroll(({ y }) => {
      const bar = barRef.current;
      if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, y / max))})`;
    });
    return () => {
      unsub();
      ro.disconnect();
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
