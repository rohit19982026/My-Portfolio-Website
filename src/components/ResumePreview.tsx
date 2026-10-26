"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Download, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import PreviewModal, { EASE, INK, MUTED } from "./PreviewModal";
import slides from "@/lib/resumeSlides.json";

/*
 * The resume as a full-screen viewer. The page is cut into four slides along
 * its sections (public/resume/slide-*.webp, made by scripts/resume-preview.sh),
 * and scrolling snaps one slide at a time so each one lands centred and fully
 * in view. Tap a slide to zoom in for small screens. Phones can't show an
 * embedded PDF, so the slides are images of the real page.
 */

const ZOOM = 2.2;
const N = slides.length;

type Props = {
  onClose: () => void;
  pdfHref: string;
  downloadName: string;
};

function Slide({
  i,
  scrollerRef,
  zoomed,
  onZoom,
  reduce,
  pdfHref,
}: {
  i: number;
  scrollerRef: RefObject<HTMLDivElement | null>;
  zoomed: boolean;
  onZoom: () => void;
  reduce: boolean;
  pdfHref: string;
}) {
  const s = slides[i];
  const ref = useRef<HTMLElement>(null);
  // 0 as the slide enters at the bottom, 0.5 when it is centred, 1 as it leaves at the top
  const { scrollYProgress } = useScroll({ container: scrollerRef, target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.2, 0.8, 1, 0.8, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);

  return (
    <section
      ref={ref}
      aria-label={`${s.label}, part ${i + 1} of ${N}`}
      className="flex h-full snap-center snap-always flex-col items-center justify-center sm:px-8"
    >
      <motion.div
        className="w-full"
        style={{
          ...(reduce ? {} : { opacity, scale }),
          // never taller than the screen, so a slide is always seen whole
          maxWidth: `min(1000px, calc((100dvh - 11rem) * ${s.w / s.h}))`,
        }}
      >
        <div className="mb-2.5 flex items-center justify-between gap-3 px-3 sm:px-0">
          <span
            className="inline-flex h-8 items-center rounded-full bg-white px-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.1em]"
            style={{ color: "#4a2fc4", boxShadow: "0 6px 14px -10px rgba(40,30,120,0.45)" }}
          >
            {s.label}
          </span>
          <button
            type="button"
            onClick={onZoom}
            aria-pressed={zoomed}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 font-sans text-[12.5px] font-semibold transition-colors hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
            style={{ color: INK }}
          >
            {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            {zoomed ? "Fit" : "Zoom"}
          </button>
        </div>

        <div
          className="overflow-x-auto overflow-y-hidden bg-white sm:rounded-xl"
          style={{ boxShadow: "0 24px 48px -28px rgba(30,20,90,0.5), 0 2px 6px rgba(30,20,90,0.1)", touchAction: "pan-x pan-y" }}
        >
          <Image
            src={s.src}
            alt={`Resume: ${s.label}`}
            width={s.w}
            height={s.h}
            unoptimized
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
            onClick={onZoom}
            className="block h-auto max-w-none select-none"
            style={{
              width: `${zoomed ? ZOOM * 100 : 100}%`,
              cursor: zoomed ? "zoom-out" : "zoom-in",
              transition: reduce ? "none" : "width 450ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>

        {!zoomed && (
          <p className="mt-3 text-center font-sans text-[12.5px] sm:hidden" style={{ color: MUTED }}>
            Tap the page to zoom in
          </p>
        )}

        {i === N - 1 && (
          <p className="mt-3 text-center font-sans text-[13px]" style={{ color: MUTED }}>
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-[#3d36f5]/40 underline-offset-4 hover:text-[#3d36f5]"
            >
              Open the PDF in a new tab <ExternalLink size={13} />
            </a>
          </p>
        )}
      </motion.div>
    </section>
  );
}

export default function ResumePreview({ onClose, pdfHref, downloadName }: Props) {
  const reduce = !!useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState<boolean[]>(() => slides.map(() => false));
  const { scrollYProgress } = useScroll({ container: scrollerRef });

  const go = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const next = Math.max(0, Math.min(N - 1, i));
      el.scrollTo({ top: next * el.clientHeight, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !el.clientHeight) return;
    const i = Math.max(0, Math.min(N - 1, Math.round(el.scrollTop / el.clientHeight)));
    setActive((prev) => (prev === i ? prev : i));
  }, []);

  // arrow keys, page keys, Home and End move one slide at a time
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const map: Record<string, number> = { ArrowDown: active + 1, PageDown: active + 1, ArrowUp: active - 1, PageUp: active - 1, Home: 0, End: N - 1 };
      if (!(e.key in map)) return;
      e.preventDefault();
      go(map[e.key]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  // One wheel gesture or one swipe moves exactly one slide. The browser's own snapping
  // returns to the nearest slide after a short scroll, which would put you back where
  // you started, so paging is done here and the snap points only keep slides centred.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const index = () => Math.round(el.scrollTop / Math.max(1, el.clientHeight));
    let lockedUntil = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || Math.abs(e.deltaY) < 4) return; // sideways pans stay native
      e.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;
      lockedUntil = now + 650;
      go(index() + (e.deltaY > 0 ? 1 : -1));
    };
    let t0: { x: number; y: number; i: number } | null = null;
    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return void (t0 = null);
      t0 = { x: e.touches[0].clientX, y: e.touches[0].clientY, i: index() };
    };
    const onEnd = (e: TouchEvent) => {
      if (!t0 || e.changedTouches.length !== 1) return;
      const dy = t0.y - e.changedTouches[0].clientY;
      const dx = t0.x - e.changedTouches[0].clientX;
      const start = t0.i;
      t0 = null;
      if (Math.abs(dy) < 40 || Math.abs(dy) < Math.abs(dx)) return;
      go(start + (dy > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [go]);

  return (
    <PreviewModal
      onClose={onClose}
      size="full"
      scroll={false}
      maxWidth={1180}
      title="Resume"
      subtitle={`${active + 1} / ${N}`}
      subtitleDesktopOnly="Rohit Kumar Singh"
      actions={
        <a
          href={pdfHref}
          download={downloadName}
          className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-sans text-[12px] font-bold uppercase tracking-[0.05em] transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
          style={{ background: "linear-gradient(180deg, #e3ff66 0%, #d7ff3f 100%)", color: INK, boxShadow: "0 10px 20px -12px rgba(160,210,0,0.9)" }}
        >
          <Download size={15} />
          Download
        </a>
      }
    >
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 top-0 z-10 h-[2px] origin-left"
        style={{ scaleX: scrollYProgress, background: "linear-gradient(90deg, #6d3fe0, #3d36f5)" }}
      />

      <motion.div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Resume slides, scroll to move between them"
        onScroll={onScroll}
        className="h-full snap-y snap-mandatory overflow-y-auto overscroll-contain outline-none"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.18 }}
      >
        {slides.map((_, i) => (
          <Slide
            key={i}
            i={i}
            scrollerRef={scrollerRef}
            zoomed={zoomed[i]}
            onZoom={() => setZoomed((z) => z.map((v, k) => (k === i ? !v : v)))}
            reduce={reduce}
            pdfHref={pdfHref}
          />
        ))}
      </motion.div>

      {/* where you are, and a way to jump */}
      <div
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1 sm:bottom-auto sm:left-auto sm:right-3 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:flex-col"
        style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", boxShadow: "0 8px 20px -12px rgba(30,20,90,0.5)" }}
      >
        {slides.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to part ${i + 1}: ${s.label}`}
            aria-current={i === active || undefined}
            className="grid h-7 w-7 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3d36f5]"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{ width: 9, height: 9, background: i === active ? "#6d3fe0" : "#cdc6e6", transform: i === active ? "scale(1.35)" : "scale(1)" }}
            />
          </button>
        ))}
      </div>
    </PreviewModal>
  );
}
