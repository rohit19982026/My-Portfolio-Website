"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Tools", href: "#tools" },
  { label: "Stack", href: "#stack" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-xl border-b border-line/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-bg font-heading font-black text-sm relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-glow))", boxShadow: "0 0 20px color-mix(in srgb, var(--color-glow) 40%, transparent)" }}
          >
            R
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                transform: "translateX(-100%)",
                animation: "shine 4s 1s ease-in-out infinite",
              }}
            />
          </div>
          <span className="font-heading text-sm font-semibold text-text tracking-wide">
            rohit.singh
          </span>
          <span className="font-heading text-[10px] text-text-3 tracking-[0.18em] hidden sm:inline">
            PORTFOLIO &apos;26
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-text-2 hover:text-text hover:bg-line/5 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle className="ml-1" />
          <a
            href="#contact"
            className="ml-3 px-4 py-2 text-[11px] font-heading font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-200 hover:brightness-110"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-bg)",
              boxShadow: "0 0 20px color-mix(in srgb, var(--color-accent) 30%, transparent)",
            }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-text-2 hover:text-accent transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-2 border-b border-accent/14 px-6 pb-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-text-2 hover:text-accent transition-colors border-b border-line/4 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-block px-5 py-2.5 text-[11px] font-heading font-bold uppercase tracking-[0.12em] rounded-full text-bg"
              style={{ background: "var(--color-accent)" }}
            >
              Contact
            </a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
