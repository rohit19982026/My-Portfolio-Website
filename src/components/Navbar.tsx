"use client";

import { useState, useEffect } from "react";

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
          ? "bg-[rgba(10,10,18,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[#0A0A12] font-heading font-black text-sm relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #A78BFA, #8B5CF6)", boxShadow: "0 0 20px rgba(139,92,246,0.4)" }}
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
          <span className="font-heading text-sm font-semibold text-[#EDE9FE] tracking-wide">
            rohit.singh
          </span>
          <span className="font-heading text-[10px] text-[#6B6B8A] tracking-[0.18em] hidden sm:inline">
            PORTFOLIO &apos;26
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-[#A8A4C7] hover:text-[#EDE9FE] hover:bg-[rgba(255,255,255,0.05)] rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 px-4 py-2 text-[11px] font-heading font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-200 hover:brightness-110"
            style={{
              background: "#A78BFA",
              color: "#0A0A12",
              boxShadow: "0 0 20px rgba(167,139,250,0.3)",
            }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[#A8A4C7] hover:text-[#A78BFA] transition-colors"
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
        <div className="md:hidden bg-[#13131F] border-b border-[rgba(167,139,250,0.14)] px-6 pb-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-[#A8A4C7] hover:text-[#A78BFA] transition-colors border-b border-[rgba(255,255,255,0.04)] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-block px-5 py-2.5 text-[11px] font-heading font-bold uppercase tracking-[0.12em] rounded-full text-[#0A0A12]"
            style={{ background: "#A78BFA" }}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
