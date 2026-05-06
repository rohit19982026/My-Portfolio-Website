"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Tools", href: "#tools" },
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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-heading font-bold text-sm">
            R
          </div>
          <span className="font-heading font-bold text-sm text-[#0F172A] tracking-tight">
            Rohit Kumar Singh
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#64748B] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:singhrohit.25119@gmail.com"
            className="ml-3 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-full gradient-bg hover:opacity-90 transition-opacity"
          >
            Hire Me →
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[#64748B] hover:text-[#2563EB] transition-colors"
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
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-6 pb-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-xs font-semibold uppercase tracking-wider text-[#64748B] hover:text-[#2563EB] transition-colors border-b border-[#F1F5F9] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:singhrohit.25119@gmail.com"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-block px-5 py-2 text-xs font-bold uppercase tracking-wider text-white rounded-full gradient-bg"
          >
            Hire Me →
          </a>
        </div>
      )}
    </header>
  );
}
