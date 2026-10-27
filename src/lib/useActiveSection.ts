"use client";

import { useEffect, useState } from "react";
import { subscribeScroll } from "./scrollBus";

/** Tracks which of the given section ids is currently the one a reader
 *  would call "the current section" — the top of the viewport (just
 *  below the sticky navbar), not just "any pixel of it visible". Used to
 *  highlight the matching nav link, so the nav communicates where you
 *  are, not just where you can go. */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        // Several sections can intersect this thin band at once near a
        // boundary — the one closest to the top wins, matching whichever
        // section a reader's eye is actually on just under the navbar.
        const top = intersecting.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        setActiveId(top.target.id);
      },
      // A thin horizontal band starting just below the sticky 64px
      // navbar — a section only counts as "current" while it occupies
      // that band, not the moment any part of it enters the viewport.
      { rootMargin: "-80px 0px -75% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    // The observer only reports changes, so nothing tells it the reader has
    // scrolled back up above the first section (the hero). Clear the highlight
    // there instead of leaving the first link lit on the hero.
    // (The first section's position is cached, not re-read every frame.)
    let firstTop = Infinity;
    const measure = () => {
      firstTop = elements[0].getBoundingClientRect().top + window.scrollY;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const unsub = subscribeScroll(({ y }) => {
      if (y < firstTop - 160) setActiveId(null);
    });
    return () => {
      observer.disconnect();
      ro.disconnect();
      unsub();
    };
  }, [ids]);

  return activeId;
}
