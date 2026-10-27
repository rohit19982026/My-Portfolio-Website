"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { agents, type AgentSlug } from "@/lib/agents";

/** Sticky row of chips to jump between the seven case studies. */
export default function CaseNav({ current }: { current: AgentSlug }) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // keep the current chip in view on narrow screens
    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [current]);

  return (
    <nav
      aria-label="Case studies"
      className="sticky top-[calc(4rem+2px+env(safe-area-inset-top))] z-30 -mx-4 border-b border-fg/10 bg-surface/95 px-4 backdrop-blur sm:-mx-6 sm:px-6"
    >
      <ul className="no-scrollbar flex gap-2 overflow-x-auto py-2.5">
        {agents.map((a) => {
          const active = a.slug === current;
          return (
            <li key={a.slug} className="shrink-0">
              <Link
                ref={active ? activeRef : undefined}
                href={`/tools/${a.slug}`}
                aria-current={active ? "page" : undefined}
                className="flex min-h-11 items-center gap-2 rounded-full px-3.5 font-heading text-[11px] font-bold whitespace-nowrap transition-colors"
                style={{
                  border: `1px solid ${active ? a.accent : "var(--color-card-border)"}`,
                  background: active ? `color-mix(in srgb, ${a.accent} 16%, transparent)` : "transparent",
                  color: active ? "var(--color-fg)" : "color-mix(in srgb, var(--color-fg) 65%, transparent)",
                }}
              >
                <a.icon size={14} style={{ color: a.accent }} />
                {a.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
