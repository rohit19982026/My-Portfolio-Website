import type Lenis from "lenis";

/** Lets the Lenis provider register its instance so any component can scroll
 *  the page programmatically without fighting it. Falls back to native
 *  scrolling when Lenis is off (reduced motion) or not mounted yet. */
let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export const NAV_OFFSET = 64;

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Absolute scroll position that puts `el` at `offset` px from the viewport
 *  top. Computed here (not by Lenis) so CSS scroll-margin is never counted twice. */
const yOf = (el: HTMLElement, offset: number) => el.getBoundingClientRect().top + window.scrollY + offset;

export function scrollToTarget(target: HTMLElement | number, offset = 0) {
  // Tells the header a jump is deliberate, so it stays put instead of hiding.
  window.dispatchEvent(new Event("scrolljump"));
  const to = () => (typeof target === "number" ? target : yOf(target, offset));
  if (lenis && !reduced()) {
    const instance = lenis;
    instance.scrollTo(to(), {
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      // Content above can change height while the glide runs (lazy images,
      // accordions). If we landed off the mark, settle onto it once.
      onComplete: () => {
        if (Math.abs(to() - window.scrollY) > 3) instance.scrollTo(to(), { duration: 0.35 });
      },
    });
    return;
  }
  window.scrollTo({ top: to(), behavior: "auto" });
}

export function scrollToTop() {
  scrollToTarget(0);
}
