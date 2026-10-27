"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeScroll } from "@/lib/scrollBus";
import { scrollToTop } from "@/lib/scrollTo";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    // Only show once scrolled a meaningful distance down, and only while
    // heading back up. A button that's always on screen while scrolling down
    // floats over whatever content or CTA sits in that corner.
    return subscribeScroll(({ y }) => {
      const dy = y - lastY.current;
      if (Math.abs(dy) < 4) return;
      setVisible(y > 600 && dy < 0);
      lastY.current = y;
    });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:brightness-110"
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
