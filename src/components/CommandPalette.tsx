"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  House,
  History,
  TrendingUp,
  Briefcase,
  Bot,
  Layers,
  Workflow,
  Mail,
  Sparkles,
  PlayCircle,
  FileText,
  Phone,
  Link2,
} from "lucide-react";

type Item = {
  id: string;
  label: string;
  group: "Navigate" | "Pages" | "Connect";
  href: string;
  icon: typeof House;
};

const ITEMS: Item[] = [
  { id: "hero", label: "Top — Hero / Agent Console", group: "Navigate", href: "#top", icon: House },
  { id: "trajectory", label: "Trajectory — Where I've worked", group: "Navigate", href: "#trajectory", icon: History },
  { id: "impact", label: "Impact — What actually moved", group: "Navigate", href: "#impact", icon: TrendingUp },
  { id: "work", label: "Work — Case studies", group: "Navigate", href: "#work", icon: Briefcase },
  { id: "tools", label: "AI Tooling — Agents I've shipped", group: "Navigate", href: "#tools", icon: Bot },
  { id: "exposure", label: "Delivery Exposure — Stacks & scope", group: "Navigate", href: "#exposure", icon: Layers },
  { id: "solution-design", label: "Solution Design — Deal Desk Agent", group: "Navigate", href: "#solution-design", icon: Workflow },
  { id: "contact", label: "Contact — Get in touch", group: "Navigate", href: "#contact", icon: Mail },
  { id: "ai-skills", label: "AI Skills — Capability diagrams", group: "Pages", href: "/ai-skills", icon: Sparkles },
  { id: "deal-desk", label: "Deal Desk Agent — Live demo", group: "Pages", href: "/agents/deal-desk", icon: PlayCircle },
  { id: "cv", label: "Download CV (PDF)", group: "Connect", href: "/resume.pdf", icon: FileText },
  { id: "email", label: "Email — singhrohit.25119@gmail.com", group: "Connect", href: "mailto:singhrohit.25119@gmail.com", icon: Mail },
  { id: "phone", label: "Call — +91 89677 25119", group: "Connect", href: "tel:+918967725119", icon: Phone },
  { id: "linkedin", label: "LinkedIn profile", group: "Connect", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/", icon: Link2 },
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
          className="fixed inset-0 z-[100] flex items-end sm:items-start justify-center sm:px-4 sm:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "var(--color-overlay-dim)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 40, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 40, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-xl overflow-hidden glass-heavy rounded-t-[var(--radius-lg)] sm:rounded-[var(--radius-lg)]"
            style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}
          >
            {/* Mobile grabber handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <span className="w-9 h-1.5 rounded-full" style={{ background: "var(--color-border)" }} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--glass-border)" }}>
              <Search size={18} strokeWidth={2} style={{ color: "var(--color-text-secondary)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search sections, pages, contact..."
                className="flex-1 bg-transparent outline-none text-[15px]"
                style={{ color: "var(--color-text)" }}
                spellCheck={false}
                autoComplete="off"
              />
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                esc
              </span>
            </div>

            {/* Results */}
            <div className="max-h-[55vh] sm:max-h-[50vh] overflow-y-auto px-2 py-2">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center">
                  <p className="text-[14px]" style={{ color: "var(--color-text)" }}>
                    No results for <span style={{ color: "var(--color-pink)" }}>&ldquo;{query}&rdquo;</span>
                  </p>
                  <p className="text-[12px] mt-1.5" style={{ color: "var(--color-text-secondary)" }}>
                    Try a section, a page, or press esc.
                  </p>
                </div>
              )}
              {GROUP_ORDER.map((group) => {
                const groupItems = filtered.filter((i) => i.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--color-text-secondary)" }}>
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      flatIndex += 1;
                      const isActive = flatIndex === activeIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          onClick={() => activate(item)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left text-[14px] transition-colors"
                          style={{
                            background: isActive ? "rgba(10,132,255,0.1)" : "transparent",
                            color: isActive ? "var(--color-text)" : "var(--color-text-secondary)",
                          }}
                        >
                          <Icon size={16} strokeWidth={2} style={{ color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)" }} />
                          {item.label}
                          {isActive && <span className="ml-auto text-[11px]" style={{ color: "var(--color-accent)" }}>↵</span>}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer hint */}
            <div
              className="px-5 py-2.5 flex items-center gap-4 text-[10px] uppercase tracking-wider"
              style={{ borderTop: "1px solid var(--glass-border)", color: "var(--color-text-secondary)" }}
            >
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span className="hidden sm:inline">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
