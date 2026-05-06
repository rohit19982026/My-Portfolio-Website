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

  const headerBg = scrolled
    ? "rgba(10,10,18,0.92)"
    : "rgba(250,250,248,0.92)";
  const headerBorder = scrolled
    ? "rgba(255,255,255,0.06)"
    : "#EAE6F4";
  const linkColor = scrolled ? "#A8A4C7" : "#4A4A62";
  const linkHoverColor = scrolled ? "#EDE9FE" : "#111118";
  const brandTextColor = scrolled ? "#EDE9FE" : "#111118";
  const brandSubColor = scrolled ? "#6B6B8A" : "#9090A8";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300"
      style={{
        background: headerBg,
        borderBottom: `1px solid ${headerBorder}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center font-mono font-black text-sm relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #A78BFA, #6D28D9)",
              color: "#FFFFFF",
              boxShadow: "0 0 18px rgba(109,40,217,0.35)",
            }}
          >
            R
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                transform: "translateX(-100%)",
                animation: "shine 4s 1s ease-in-out infinite",
              }}
            />
          </div>
          <span
            className="font-mono text-sm font-semibold tracking-wide"
            style={{ color: brandTextColor, transition: "color 0.3s" }}
          >
            rohit.singh
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.18em] hidden sm:inline"
            style={{ color: brandSubColor, transition: "color 0.3s" }}
          >
            // TPM · &apos;26
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] rounded-full transition-all duration-200"
              style={{ color: linkColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-3 px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-200 hover:opacity-90"
            style={{
              background: "#6D28D9",
              color: "#FFFFFF",
              boxShadow: "0 2px 12px rgba(109,40,217,0.3)",
            }}
          >
            Let&apos;s Talk ↗
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 transition-colors"
          style={{ color: linkColor }}
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
        <div
          className="md:hidden px-6 pb-5"
          style={{
            background: scrolled ? "#13131F" : "#FAFAF8",
            borderBottom: `1px solid ${headerBorder}`,
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] transition-colors"
              style={{
                color: scrolled ? "#A8A4C7" : "#4A4A62",
                borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.04)" : "#F0EDF8"}`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-block px-5 py-2.5 text-[11px] font-mono font-bold uppercase tracking-[0.12em] rounded-full text-white"
            style={{ background: "#6D28D9" }}
          >
            Let&apos;s Talk ↗
          </a>
        </div>
      )}
    </header>
  );
}
