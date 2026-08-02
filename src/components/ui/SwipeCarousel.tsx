"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Matches the NAVY literal duplicated in Hero.tsx/DeliveryExposure.tsx/
// ToolsBuilt.tsx — the edge fades need the section's own background color
// to blend in, not a token.
const NAVY = "#070b18";
const GAP_PX = 16; // must stay in sync with the track's gap-4 class

function DotRow({ count, activeIndex }: { count: number; activeIndex: number }) {
  if (count <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-center gap-1.5" role="presentation">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="h-1.5 rounded-full transition-all motion-safe:transition-all duration-300"
          style={{
            width: i === activeIndex ? 20 : 6,
            background: i === activeIndex ? "var(--color-lime)" : "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Mobile-only swipe carousel: native CSS scroll-snap, no library. Each
 * slide is a fixed percentage of the track's width so the next card
 * always visibly peeks at rest — the explicit fix for "it should not
 * hide, people should know there's more to slide to." Edge fades +
 * dot indicators reinforce that the set is bounded, not an infinite feed.
 */
export default function SwipeCarousel({
  children,
  ariaLabel,
  className = "",
}: {
  children: ReactNode[];
  ariaLabel: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafPending = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(children.length > 1);

  function updateFromScroll() {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const firstCard = el.children[0] as HTMLElement;
    const cardStep = firstCard.offsetWidth + GAP_PX;
    const rawIndex = Math.round(el.scrollLeft / cardStep);
    setActiveIndex(Math.max(0, Math.min(children.length - 1, rawIndex)));

    setShowLeftFade(el.scrollLeft > 8);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowRightFade(el.scrollLeft < maxScroll - 8);
  }

  function onScroll() {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      updateFromScroll();
    });
  }

  useLayoutEffect(() => {
    updateFromScroll();
    window.addEventListener("resize", onScroll);
    return () => window.removeEventListener("resize", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 transition-opacity duration-200"
        style={{ background: `linear-gradient(to right, ${NAVY}, transparent)`, opacity: showLeftFade ? 1 : 0 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 transition-opacity duration-200"
        style={{ background: `linear-gradient(to left, ${NAVY}, transparent)`, opacity: showRightFade ? 1 : 0 }}
      />
      <div
        ref={trackRef}
        onScroll={onScroll}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-6 no-scrollbar -mx-6 px-6"
      >
        {children.map((child, i) => (
          <div key={i} className="w-[84%] shrink-0 snap-start">
            {child}
          </div>
        ))}
      </div>
      <DotRow count={children.length} activeIndex={activeIndex} />
    </div>
  );
}
