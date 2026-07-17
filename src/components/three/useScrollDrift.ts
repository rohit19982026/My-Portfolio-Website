"use client";

import { useEffect, useRef } from "react";

// A ref-based, render-free accumulator of scroll motion — read imperatively
// inside a useFrame loop to add a slow, persistent rotation drift tied to
// how far/fast the user has scrolled, instead of a scene that only ever
// idles on its own clock. No re-renders: pure scroll listener → ref.
export function useScrollDrift() {
  const drift = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      drift.current += dy * 0.0006;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return drift;
}
