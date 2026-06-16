"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function MobileCarousel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const slides = React.Children.toArray(children);
  const count = slides.length;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const idx = Math.round((el.scrollLeft / max) * (count - 1));
    setActive(Math.min(Math.max(idx, 0), count - 1));
  }, [count]);

  const goTo = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (i / (count - 1)) * max, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Scroll track */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        style={{
          display: "flex",
          overflowX: "scroll",
          gap: 12,
          paddingBottom: 4,
          paddingLeft: 4,
          paddingRight: 4,
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 87%",
              minWidth: 0,
              scrollSnapAlign: "center",
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Dot pagination */}
      {count > 1 && (
        <div
          className="flex justify-center items-center gap-2 mt-4"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`Slide ${i + 1} of ${count}`}
              onClick={() => goTo(i)}
              className="flex items-center justify-center"
              style={{ padding: "4px 2px", background: "none", border: "none", cursor: "pointer" }}
            >
              <motion.span
                style={{ display: "block", height: 6, borderRadius: 999 }}
                animate={{
                  width: active === i ? 20 : 6,
                  backgroundColor:
                    active === i ? "var(--color-accent)" : "var(--color-border)",
                  opacity: active === i ? 1 : 0.5,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 42 }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
