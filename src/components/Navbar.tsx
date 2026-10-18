"use client";

import { useMemo, useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 bg-surface border-b-2 border-fg/10">
      <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Star className="star-spin w-4 h-4 text-accent" />
          <span className="font-heading text-sm font-bold text-fg tracking-[0.08em] uppercase">
            Rohit.Singh
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3.5 py-2 text-[11px] font-heading font-semibold uppercase tracking-[0.14em] transition-colors ${
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
            className="ml-1 p-2 text-fg/70 hover:text-accent transition-colors"
          >
            <GithubMark className="w-[18px] h-[18px]" />
          </a>
          <ThemeToggle className="ml-1" />
          <Button href="#contact" size="sm" className="ml-3">
            Start a project
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 rounded-full bg-lime text-ink flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
            className="md:hidden fixed inset-0 bg-surface flex flex-col px-6"
            style={{ top: 64, zIndex: 40 }}
          >
            <div className="flex-1 flex flex-col justify-center gap-1.5">
              {navLinks.map((link, i) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                    className={`flex items-center gap-4 py-1.5 font-display text-4xl uppercase transition-colors ${
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
                className="p-2 text-fg/70 hover:text-accent transition-colors"
              >
                <GithubMark className="w-5 h-5" />
              </a>
              <ThemeToggle />
              <Button href="#contact" onClick={() => setMenuOpen(false)} className="flex-1 justify-center">
                Start a project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
