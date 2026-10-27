import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Hydration-safe prefers-reduced-motion. framer-motion's own hook reads the
 *  media query during the first client render, so a visitor who prefers reduced
 *  motion rendered different markup from the server's and hydration failed
 *  (React error #418). This one reports `false` while hydrating, then the real
 *  value, so server and client agree and the preference is still honoured. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
