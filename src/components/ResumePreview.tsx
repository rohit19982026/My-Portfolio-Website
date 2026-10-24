"use client";

import { motion, useDragControls, useReducedMotion, type PanInfo } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

/*
 * The resume, previewed in a popup. It shows a rendered image of the page
 * (public/resume/preview.webp, made by scripts/resume-preview.sh) instead of
 * embedding the PDF, because phones don't display embedded PDFs. A centred
 * panel on large screens, a bottom sheet you can drag down on phones.
 */

const INK = "#0d0d1f";
const MUTED = "#6b6880";
const EASE = [0.22, 1, 0.36, 1] as const;

const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia("(max-width: 639px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

type Props = {
  onClose: () => void;
  previewSrc: string;
  pdfHref: string;
  downloadName: string;
};

export default function ResumePreview({ onClose, previewSrc, pdfHref, downloadName }: Props) {
  const reduce = useReducedMotion();
  const mobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia("(max-width: 639px)").matches, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();
  const [failed, setFailed] = useState(false);

  // lock the page behind without a layout jump, and give focus back afterwards
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 600) onClose();
  };

  if (typeof document === "undefined") return null;

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : mobile
      ? {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%", transition: { duration: 0.28, ease: EASE } },
          transition: { duration: 0.5, ease: EASE },
        }
      : {
          initial: { opacity: 0, y: 24, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 12, scale: 0.98, transition: { duration: 0.24, ease: EASE } },
          transition: { duration: 0.45, ease: EASE },
        };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" onKeyDown={onKeyDown}>
      <motion.div
        aria-hidden
        className="absolute inset-0 backdrop-blur-[6px]"
        style={{ background: "rgba(18,14,44,0.46)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.24 } }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
        className="relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.75rem] sm:h-[min(90vh,980px)] sm:w-[min(94vw,760px)] sm:rounded-[1.75rem]"
        style={{ background: "#fbfaff", boxShadow: "0 40px 90px -30px rgba(30,20,90,0.55), 0 0 0 1px rgba(40,30,90,0.06)" }}
        drag={mobile && !reduce ? "y" : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={onDragEnd}
        {...panelMotion}
      >
        {/* phone: a handle to drag the sheet down */}
        <div
          className="flex h-6 shrink-0 cursor-grab touch-none items-center justify-center sm:hidden"
          onPointerDown={(e) => dragControls.start(e)}
          aria-hidden
        >
          <span className="h-1 w-10 rounded-full" style={{ background: "#d5d0e6" }} />
        </div>

        <motion.div
          className="flex shrink-0 items-center gap-3 px-4 py-3 sm:px-6 sm:py-4"
          style={{ borderBottom: "1px solid rgba(40,30,90,0.08)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: reduce ? 0 : 0.3 }}
        >
          <div className="min-w-0 flex-1">
            <h2 id="resume-preview-title" className="font-sans text-[16px] font-bold leading-tight tracking-[-0.01em]" style={{ color: INK }}>
              Resume
            </h2>
            <p className="font-sans text-[12.5px]" style={{ color: MUTED }}>
              <span className="hidden sm:inline">Rohit Kumar Singh · </span>Preview
            </p>
          </div>
          <a
            href={pdfHref}
            download={downloadName}
            className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-sans text-[12px] font-bold uppercase tracking-[0.05em] transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
            style={{ background: "linear-gradient(180deg, #e3ff66 0%, #d7ff3f 100%)", color: INK, boxShadow: "0 10px 20px -12px rgba(160,210,0,0.9)" }}
          >
            <Download size={15} />
            Download
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
            style={{ color: INK }}
          >
            <X size={19} />
          </button>
        </motion.div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-8 sm:py-6" style={{ background: "#efecf8" }}>
          {failed ? (
            <div className="mx-auto max-w-sm py-16 text-center font-sans" style={{ color: MUTED }}>
              <p className="text-[15px]">The preview couldn&apos;t load.</p>
              <p className="mt-2 text-[14px]">You can still open or download the PDF.</p>
            </div>
          ) : (
            <motion.div
              className="relative mx-auto max-w-[640px] overflow-hidden rounded-[6px] bg-white"
              style={{ transformPerspective: 1400, boxShadow: "0 24px 48px -26px rgba(30,20,90,0.5), 0 2px 6px rgba(30,20,90,0.1)" }}
              initial={reduce ? false : { opacity: 0, y: 14, rotateX: 6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: reduce ? 0 : 0.14 }}
            >
              <Image
                src={previewSrc}
                alt="Preview of Rohit Kumar Singh's resume, one page"
                width={1400}
                height={1980}
                sizes="(min-width: 640px) 640px, 94vw"
                priority
                className="block h-auto w-full select-none"
                onError={() => setFailed(true)}
              />
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
                  style={{ background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.7), transparent)" }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "420%" }}
                  transition={{ duration: 1.1, ease: "easeInOut", delay: 0.55 }}
                />
              )}
            </motion.div>
          )}

          <p className="mx-auto mt-5 max-w-[640px] text-center font-sans text-[13px]" style={{ color: MUTED }}>
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-[#3d36f5]/40 underline-offset-4 hover:text-[#3d36f5]"
            >
              Open the PDF in a new tab <ExternalLink size={13} />
            </a>
          </p>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
