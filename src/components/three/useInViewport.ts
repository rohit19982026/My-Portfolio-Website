"use client";

import { useEffect, useRef, useState } from "react";

// Mounts a WebGL scene only while its container is near the viewport, and
// fully unmounts (frees the GPU context) once it scrolls away — a page with
// several decorative 3D scenes should never run more render loops than are
// actually visible.
export function useInViewport<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
