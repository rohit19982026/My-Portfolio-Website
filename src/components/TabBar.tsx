"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { House, Briefcase, Bot, Mail, Search } from "lucide-react";

type TabId = "home" | "work" | "tools" | "contact";

const TABS: { id: TabId; label: string; href: string; icon: typeof House }[] = [
  { id: "home", label: "Home", href: "#top", icon: House },
  { id: "work", label: "Work", href: "#work", icon: Briefcase },
  { id: "tools", label: "AI", href: "#tools", icon: Bot },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

// iOS-style floating glass tab bar — mobile-only primary navigation,
// replacing the hamburger menu. Active tab uses a layoutId-shared pill
// highlight for a fluid morph between tabs.
export default function TabBar() {
  const [active, setActive] = useState<TabId>("home");
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.startsWith("/ai-skills") || pathname.startsWith("/agents") ? "tools" : "home");
      return;
    }

    const sectionIds: TabId[] = ["work", "tools", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as TabId);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (window.scrollY < 200) setActive("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const handleTab = (tab: typeof TABS[number]) => {
    if (tab.id === "home") {
      if (pathname !== "/") router.push("/");
      else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      setActive("home");
      return;
    }
    if (pathname !== "/") {
      router.push(`/${tab.href}`);
    } else {
      document.querySelector(tab.href)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-2 pointer-events-none">
      <div
        className="pointer-events-auto mx-auto max-w-sm flex items-center justify-around px-2 py-2"
        style={{
          borderRadius: "var(--radius-lg)",
          background: "rgba(14,14,16,0.84)",
          backdropFilter: "blur(32px) saturate(1.8)",
          WebkitBackdropFilter: "blur(32px) saturate(1.8)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 -1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.55), inset 0 0.5px 0 rgba(255,255,255,0.07)",
        }}
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab)}
              className="relative flex flex-col items-center gap-0.5 px-3.5 py-1.5 rounded-2xl"
              aria-label={tab.label}
              aria-current={isActive}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-highlight"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "rgba(10,132,255,0.22)", boxShadow: "0 0 14px rgba(10,132,255,0.18)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon size={20} strokeWidth={2} className="relative z-10" style={{ color: isActive ? "var(--color-accent)" : "rgba(175,175,190,0.78)" }} />
              <span className="relative z-10 text-[10px] font-medium" style={{ color: isActive ? "var(--color-accent)" : "rgba(175,175,190,0.78)" }}>
                {tab.label}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
          className="relative flex flex-col items-center gap-0.5 px-3.5 py-1.5 rounded-2xl"
          aria-label="Search"
        >
          <Search size={20} strokeWidth={2} style={{ color: "rgba(175,175,190,0.78)" }} />
          <span className="text-[10px] font-medium" style={{ color: "rgba(175,175,190,0.78)" }}>Search</span>
        </button>
      </div>
    </nav>
  );
}
