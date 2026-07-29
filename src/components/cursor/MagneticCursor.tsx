"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) {
      dot.style.display = "none";
      return;
    }

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const setX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3.out" });
    const setY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    const isHoverTarget = (el: EventTarget | null) =>
      el instanceof Element && el.closest("a, button, [data-cursor-hover]");

    const onOver = (e: MouseEvent) => {
      if (isHoverTarget(e.target)) gsap.to(dot, { scale: 2.5, duration: 0.25, ease: "power2.out" });
    };
    const onOut = (e: MouseEvent) => {
      if (isHoverTarget(e.target)) gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="hidden md:block fixed left-0 top-0 w-[10px] h-[10px] rounded-full pointer-events-none"
      style={{ backgroundColor: "var(--color-white)", mixBlendMode: "difference", zIndex: 9999 }}
    />
  );
}
