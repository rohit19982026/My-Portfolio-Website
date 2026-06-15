"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type Item = {
  id: string;
  label: string;
  group: "Navigate" | "Pages" | "Connect";
  href: string;
  accent: string;
};

const ITEMS: Item[] = [
  { id: "hero", label: "Top — Hero / Agent Console", group: "Navigate", href: "#top", accent: "#60A5FA" },
  { id: "trajectory", label: "Trajectory — Where I've worked", group: "Navigate", href: "#trajectory", accent: "#60A5FA" },
  { id: "impact", label: "Impact — What actually moved", group: "Navigate", href: "#impact", accent: "#60A5FA" },
  { id: "work", label: "Work — Case studies", group: "Navigate", href: "#work", accent: "#60A5FA" },
  { id: "tools", label: "AI Tooling — Agents I've shipped", group: "Navigate", href: "#tools", accent: "#60A5FA" },
  { id: "exposure", label: "Delivery Exposure — Stacks & scope", group: "Navigate", href: "#exposure", accent: "#60A5FA" },
  { id: "solution-design", label: "Solution Design — Deal Desk Agent", group: "Navigate", href: "#solution-design", accent: "#60A5FA" },
  { id: "contact", label: "Contact — Get in touch", group: "Navigate", href: "#contact", accent: "#60A5FA" },
  { id: "ai-skills", label: "AI Skills — Capability diagrams", group: "Pages", href: "/ai-skills", accent: "#22D3EE" },
  { id: "deal-desk", label: "Deal Desk Agent — Live demo", group: "Pages", href: "/agents/deal-desk", accent: "#22D3EE" },
  { id: "cv", label: "Download CV (PDF)", group: "Connect", href: "/resume.pdf", accent: "#34D399" },
  { id: "email", label: "Email — singhrohit.25119@gmail.com", group: "Connect", href: "mailto:singhrohit.25119@gmail.com", accent: "#34D399" },
  { id: "phone", label: "Call — +91 89677 25119", group: "Connect", href: "tel:+918967725119", accent: "#34D399" },
  { id: "linkedin", label: "LinkedIn profile", group: "Connect", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/", accent: "#34D399" },
];

const GROUP_ORDER: Item["group"][] = ["Navigate", "Pages", "Connect"];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();

  const filtered = ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const openHandler = () => setOpen(true);
    window.addEventListener("keydown", handler);
    window.addEventListener("open-command-palette", openHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("open-command-palette", openHandler);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), reduced ? 0 : 80);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open, reduced]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const activate = (item: Item) => {
    setOpen(false);
    if (item.href === "#top") {
      if (pathname !== "/") router.push("/");
      else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      return;
    }
    if (item.href.startsWith("#")) {
      if (pathname !== "/") {
        router.push(`/${item.href}`);
      } else {
        document.querySelector(item.href)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }
      return;
    }
    if (item.href.startsWith("http") || item.href.startsWith("mailto") || item.href.startsWith("tel") || item.href.endsWith(".pdf")) {
      window.open(item.href, item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : "_self");
      return;
    }
    router.push(item.href);
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) activate(item);
    }
  };

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(10,14,20,0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : -16, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -16, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-ink-2)",
              border: "1px solid var(--color-ink-border)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--color-ink-border)" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F87171" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FBBF24" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#34D399" }} />
                <span className="ml-3 font-mono text-[11px]" style={{ color: "var(--color-ink-text-2)" }}>
                  command-palette — zsh
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--color-ink-text-2)" }}>
                esc to close
              </span>
            </div>

            {/* Input */}
            <div className="px-5 py-4 flex items-center gap-2 font-mono text-[14px]" style={{ borderBottom: "1px solid var(--color-ink-border)" }}>
              <span className="shrink-0" style={{ color: "#34D399" }}>
                <span className="hidden sm:inline">rohit@pmo-agents:~$</span>
                <span className="sm:hidden">~$</span>
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="search sections, pages, contact..."
                className="flex-1 bg-transparent outline-none"
                style={{ color: "var(--color-ink-text)" }}
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto px-2 py-2 font-mono text-[12.5px]">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center" style={{ color: "var(--color-ink-text-2)" }}>
                  No matches.
                </p>
              )}
              {GROUP_ORDER.map((group) => {
                const groupItems = filtered.filter((i) => i.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--color-ink-text-2)" }}>
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      flatIndex += 1;
                      const isActive = flatIndex === activeIndex;
                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          onClick={() => activate(item)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                          style={{
                            background: isActive ? "rgba(96,165,250,0.1)" : "transparent",
                            color: isActive ? "var(--color-ink-text)" : "var(--color-ink-text-2)",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.accent }} />
                          {item.label}
                          {isActive && <span className="ml-auto text-[11px]" style={{ color: item.accent }}>↵</span>}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer hint */}
            <div
              className="px-5 py-2.5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider"
              style={{ borderTop: "1px solid var(--color-ink-border)", color: "var(--color-ink-text-2)" }}
            >
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
