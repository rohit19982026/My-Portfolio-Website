"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenisRef.current?.lenis?.destroy();
    }
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
