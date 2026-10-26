"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/content";
import { subscribeScroll } from "@/lib/scrollBus";
import { useActiveSection } from "@/lib/useActiveSection";

/** Desktop wayfinding: a hairline down the left edge that fills as you read,
 *  with one tick per chapter at its true position in the page and a lime
 *  playhead riding the line. The current chapter's tick lights up; hover or
 *  focus any tick for its name, click to travel there. Wide screens only
 *  (the gutter is empty there); on phones the header label does this job. */
export default function ChapterSpine() {
  const pathname = usePathname();
  const ids = useMemo(() => navLinks.map((l) => l.href.slice(1)), []);
  const active = useActiveSection(ids);
  const navRef = useRef<HTMLElement>(null);
  const [marks, setMarks] = useState<number[]>([]);

  // Where each chapter starts, as a fraction of the scrollable distance.
  useEffect(() => {
    if (pathname !== "/") return;
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setMarks(
        ids.map((id) => {
          const el = document.getElementById(id);
          return el ? Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY - 64) / max)) : 0;
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [ids, pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    let max = 1;
    const ro = new ResizeObserver(() => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    });
    ro.observe(document.body);
    const unsub = subscribeScroll(({ y }) => {
      navRef.current?.style.setProperty("--prog", Math.min(1, Math.max(0, y / max)).toFixed(4));
    });
    return () => {
      ro.disconnect();
      unsub();
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav
      ref={navRef}
      aria-label="Page chapters"
      className="chapter-spine pointer-events-none fixed left-5 top-1/2 z-40 hidden h-[56vh] w-3 -translate-y-1/2 xl:block"
    >
      <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-fg/15" />
      <span aria-hidden className="spine-fill absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-fg" />
      <span aria-hidden className="spine-head absolute left-1/2 top-0 h-2.5 w-2.5 rounded-full bg-lime ring-1 ring-ink/70" />
      {navLinks.map((link, i) => {
        const on = active === link.href.slice(1);
        return (
          <a
            key={link.href}
            href={`/${link.href}`}
            aria-current={on ? "true" : undefined}
            aria-label={link.label}
            className="group pointer-events-auto absolute left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ top: `${(marks[i] ?? i / navLinks.length) * 100}%` }}
          >
            <span
              aria-hidden
              className={`block rounded-[2px] border transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                on ? "h-2.5 w-2.5 scale-125 border-ink bg-lime" : "h-1.5 w-1.5 border-fg/40 bg-surface group-hover:scale-150 group-hover:border-fg"
              }`}
            />
            <span
              aria-hidden
              className={`pointer-events-none absolute left-7 whitespace-nowrap rounded-full bg-fg px-2.5 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-surface opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                on ? "2xl:opacity-100" : ""
              }`}
            >
              {link.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
