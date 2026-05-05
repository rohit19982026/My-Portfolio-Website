"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Tools", href: "#tools" },
  { label: "Exposure", href: "#exposure" },
  { label: "Trajectory", href: "#trajectory" },
  { label: "Contact", href: "#contact" },
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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e5e7eb]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-heading font-bold text-sm tracking-widest uppercase text-[#111827]">
          PORTFOLIO <span className="text-[#2563eb]">·</span> MMXXVI
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#6b7280] hover:text-[#2563eb] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:rsingh@phdata.io"
            className="ml-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-full gradient-bg hover:opacity-90 transition-opacity"
          >
            Email Me
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-[#6b7280] hover:text-[#2563eb] transition-colors"
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

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-[#e5e7eb] px-6 pb-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-xs font-semibold uppercase tracking-wider text-[#6b7280] hover:text-[#2563eb] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:rsingh@phdata.io"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-block px-5 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-full gradient-bg"
          >
            Email Me
          </a>
        </div>
      )}
    </header>
  );
}
