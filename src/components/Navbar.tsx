"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Star from "./ui/Star";
import Button from "./ui/Button";
import ThemeToggle from "./ui/ThemeToggle";
import GithubMark from "./icons/GithubMark";
import { navLinks } from "@/lib/content";
import { useActiveSection } from "@/lib/useActiveSection";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b-2 border-fg/10 pt-[env(safe-area-inset-top)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex min-h-11 items-center gap-2.5 group">
          <Star className="star-spin w-4 h-4 text-accent" />
          <span className="font-heading text-sm font-bold text-fg tracking-[0.08em] uppercase">
            Rohit.Singh
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={`/${link.href}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative whitespace-nowrap px-2.5 py-3 text-[11px] font-heading font-semibold uppercase tracking-[0.14em] transition-colors xl:px-3.5 ${
                  isActive ? "text-accent" : "text-fg/70 hover:text-accent"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute left-1/2 bottom-0.5 w-1 h-1 rounded-full bg-accent"
                    style={{ x: "-50%" }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href="https://github.com/rohit19982026?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="ml-1 hidden h-11 w-11 items-center justify-center text-fg/70 hover:text-accent transition-colors xl:inline-flex"
          >
            <GithubMark className="w-[18px] h-[18px]" />
          </a>
          <ThemeToggle className="ml-1" />
          <Button href="/#contact" size="sm" className="ml-3 min-h-11 whitespace-nowrap">
            Get in touch
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden w-11 h-11 rounded-full bg-lime text-ink flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 bg-surface flex flex-col px-4 sm:px-6 pb-[env(safe-area-inset-bottom)] overflow-y-auto"
            style={{ top: "calc(4rem + env(safe-area-inset-top))", zIndex: 40 }}
          >
            <div className="flex-1 flex flex-col justify-center gap-1.5 py-6">
              {navLinks.map((link, i) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={`/${link.href}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                    className={`flex items-center gap-4 py-1.5 font-display text-[clamp(1.875rem,9vw,2.5rem)] uppercase tracking-[0.014em] transition-colors ${
                      isActive ? "text-accent" : "text-fg hover:text-accent"
                    }`}
                  >
                    <Star className="w-4 h-4 text-accent shrink-0" />
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
            <div className="pb-10 flex items-center gap-4">
              <a
                href="https://github.com/rohit19982026?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center text-fg/70 hover:text-accent transition-colors"
              >
                <GithubMark className="w-5 h-5" />
              </a>
              <ThemeToggle />
              <Button href="/#contact" onClick={() => setMenuOpen(false)} className="flex-1 justify-center">
                Get in touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
