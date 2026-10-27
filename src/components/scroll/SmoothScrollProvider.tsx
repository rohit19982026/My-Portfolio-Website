"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { NAV_OFFSET, registerLenis, scrollToTarget } from "@/lib/scrollTo";

/** Hands the Lenis instance to scrollTo.ts, or switches smoothing off entirely
 *  for visitors who ask for reduced motion. Lives inside <ReactLenis> because
 *  the instance only exists once that has mounted. */
function LenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Native scrolling only. (stop() would freeze the page, so destroy.)
      lenis.destroy();
      registerLenis(null);
      return;
    }
    registerLenis(lenis);
    return () => registerLenis(null);
  }, [lenis]);
  return null;
}

/** Smooth wheel scrolling for pointer devices. Touch keeps the browser's own
 *  momentum scrolling (Lenis' default), which is what a phone user expects. */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // In-page links ("/#experience") land with the section heading just below
  // the sticky header, glide there, and keep the URL hash in sync. Links to
  // other pages, new tabs and modified clicks are left alone.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToTarget(el, -NAV_OFFSET + 1);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.11, wheelMultiplier: 0.95, allowNestedScroll: true }}>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
