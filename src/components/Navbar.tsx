"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search, ArrowUpRight,
  House, Sparkles, TrendingUp, Mail,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import GlassButton from "./GlassButton";

const LINKS = [
  { label: "Home",       href: "#top",        icon: House,       section: "home" },
  { label: "AI Skills",  href: "/ai-skills",   icon: Sparkles,    section: "tools" },
  { label: "Trajectory", href: "#trajectory",  icon: TrendingUp,  section: "trajectory" },
  { label: "Contact",    href: "#contact",     icon: Mail,        section: "contact" },
] as const;

type Section = typeof LINKS[number]["section"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<Section>("home");
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();

  // Scroll depth → opacity change
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 200) setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver → active section
  useEffect(() => {
    if (pathname !== "/") return;
    const ids: Section[] = ["tools", "trajectory", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as Section);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") router.push("/");
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    setActive("home");
  };

  const handleLink = (e: React.MouseEvent, link: typeof LINKS[number]) => {
    if (!link.href.startsWith("#")) return;
    e.preventDefault();
    if (link.section === "home") { goHome(e); return; }
    if (pathname !== "/") { router.push(`/${link.href}`); return; }
    document.querySelector(link.href)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none">
      <div
        className="pointer-events-auto max-w-4xl mx-auto h-14 flex items-center justify-between gap-4 px-4 sm:px-5 transition-all duration-500"
        style={{
          borderRadius: "var(--radius-pill)",
          // Liquid glass: very subtle tint, heavy blur, hairline border
          background: scrolled
            ? "rgba(255,255,255,0.09)"
            : "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.13)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.08)"
            : "0 2px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Brand */}
        <a href="/" onClick={goHome} className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), var(--color-purple))",
              boxShadow: "0 0 16px rgba(10,132,255,0.4)",
            }}
          >
            R
          </div>
          <span
            className="font-semibold text-[14px] tracking-tight hidden sm:inline"
            style={{ color: "var(--color-text)" }}
          >
            rohit.singh
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = active === link.section;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLink(e, link)}
                className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors duration-200"
                style={{
                  color: isActive ? "var(--color-text)" : "var(--color-text-secondary)",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.11)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <Icon
                  size={13}
                  strokeWidth={2}
                  className="relative z-10 shrink-0"
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search — desktop */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-medium transition-all duration-200"
            style={{
              color: "var(--color-text-secondary)",
              background: "rgba(255,255,255,0.0)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.0)"; }}
            aria-label="Open command palette"
          >
            <Search size={14} strokeWidth={2} />
            <kbd className="font-semibold tracking-wide">⌘K</kbd>
          </button>

          {/* Search — mobile */}
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Open command palette"
          >
            <Search size={17} strokeWidth={2} />
          </button>

          <GlassButton
            href="#contact"
            variant="primary"
            className="!px-3.5 !py-1.5 !text-[12px] md:!px-5 md:!py-2 md:!text-[13px]"
            icon={<ArrowUpRight size={13} strokeWidth={2.5} />}
          >
            Hire Me
          </GlassButton>
        </div>
      </div>
    </header>
  );
}
