"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme, setTheme } from "@/lib/useTheme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className={`inline-flex h-11 w-11 items-center justify-center text-fg/70 hover:text-accent transition-colors ${className}`}
    >
      {isLight ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
    </button>
  );
}
