"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

function resolveTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function getServerSnapshot(): Theme {
  // Matches the unconditional light `:root` values the server renders —
  // light is the site's fixed default, so SSR markup and the client's
  // first hydration pass always agree without checking anything.
  return "light";
}

/** Live-reads the resolved theme (the manual data-theme override if one
 *  was set, else light — the site's fixed default, independent of OS
 *  preference) and re-renders on a toggle click ("themechange"). */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, resolveTheme, getServerSnapshot);
}

/** Sets the theme explicitly and persists it, notifying same-tab
 *  subscribers. */
export function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private browsing / storage disabled — the attribute above still
    // works for this page view, it just won't persist across reloads.
  }
  window.dispatchEvent(new Event("themechange"));
}
