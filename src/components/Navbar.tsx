"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import GlassButton from "./GlassButton";

const links = [
  { label: "Work",       href: "#work" },
  { label: "AI Skills",  href: "/ai-skills" },
  { label: "Trajectory", href: "#trajectory" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") router.push("/");
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-all duration-300">
      <div
        className="max-w-4xl mx-auto h-14 flex items-center justify-between gap-4 px-4 sm:px-5 glass transition-shadow duration-300"
        style={{
          borderRadius: "var(--radius-pill)",
          boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Brand */}
        <a href="/" onClick={goHome} className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), var(--color-purple))",
              boxShadow: "0 0 16px rgba(10,132,255,0.35)",
            }}
          >
            R
          </div>
          <span className="font-semibold text-[14px] tracking-tight hidden sm:inline" style={{ color: "var(--color-text)" }}>
            rohit.singh
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors duration-200"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-[12px] font-medium transition-colors duration-200"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Open command palette"
          >
            <Search size={15} strokeWidth={2} />
            <kbd className="font-semibold tracking-wide">⌘K</kbd>
          </button>
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Open command palette"
          >
            <Search size={18} strokeWidth={2} />
          </button>
          <GlassButton href="#contact" variant="primary" className="hidden md:inline-flex !px-5 !py-2 !text-[13px]" icon={<ArrowUpRight size={14} strokeWidth={2.5} />}>
            Hire Me
          </GlassButton>
        </div>
      </div>
    </header>
  );
}
