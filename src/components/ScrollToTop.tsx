"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const scrollingUp = y < lastY.current;
      // Only show once scrolled a meaningful distance down, and only while
      // actively scrolling back up — not on every downward scroll. A FAB
      // that's always on screen while scrolling down ends up floating
      // over whatever content or CTA happens to be in that corner (it
      // sat directly on top of the Resume section's Download button at
      // some viewport heights); gating it to the "heading back up"
      // gesture keeps it out of the way during normal forward reading.
      setVisible(y > 600 && scrollingUp);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:brightness-110"
          style={{
            background: "var(--color-lime)",
            boxShadow: "0 0 20px color-mix(in srgb, var(--color-lime) 40%, transparent)",
            color: "var(--color-ink)",
          }}
          aria-label="Scroll to top"
        >
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
