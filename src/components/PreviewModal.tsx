"use client";

import { motion, useDragControls, useReducedMotion, type PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";

/*
 * Shared popup shell for the Resume and GitHub previews: a dimmed, blurred
 * backdrop, a centred panel on large screens and a bottom sheet (drag the
 * handle down to close) on phones. Handles focus, Escape, scroll lock and
 * reduced motion; the content goes in as children.
 */

export const INK = "#0d0d1f";
export const MUTED = "#6b6880";
export const EASE = [0.22, 1, 0.36, 1] as const;

const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia("(max-width: 639px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

type Props = {
  onClose: () => void;
  title: string;
  /** shown under the title; the part inside `desktopOnly` is hidden on phones */
  subtitle: string;
  subtitleDesktopOnly?: string;
  /** buttons in the top bar, left of the close button */
  actions?: ReactNode;
  /** panel width on large screens */
  maxWidth?: number;
  children: ReactNode;
};

export default function PreviewModal({ onClose, title, subtitle, subtitleDesktopOnly, actions, maxWidth = 760, children }: Props) {
  const reduce = useReducedMotion();
  const mobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia("(max-width: 639px)").matches, () => false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragControls = useDragControls();

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
        aria-label={title}
        className="relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.75rem] sm:h-[min(90vh,980px)] sm:w-[min(94vw,var(--pm-w))] sm:rounded-[1.75rem]"
        style={{
          ["--pm-w" as string]: `${maxWidth}px`,
          background: "#fbfaff",
          boxShadow: "0 40px 90px -30px rgba(30,20,90,0.55), 0 0 0 1px rgba(40,30,90,0.06)",
        }}
        drag={mobile && !reduce ? "y" : false}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={onDragEnd}
        {...panelMotion}
      >
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
            <h2 className="font-sans text-[16px] font-bold leading-tight tracking-[-0.01em]" style={{ color: INK }}>
              {title}
            </h2>
            <p className="font-sans text-[12.5px]" style={{ color: MUTED }}>
              {subtitleDesktopOnly && <span className="hidden sm:inline">{subtitleDesktopOnly} · </span>}
              {subtitle}
            </p>
          </div>
          {actions}
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

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" style={{ background: "#efecf8" }}>
          {children}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
