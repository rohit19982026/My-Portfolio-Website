"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const LIGHT_QUERY = "(prefers-color-scheme: light)";

function resolveTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia(LIGHT_QUERY).matches ? "light" : "dark";
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia(LIGHT_QUERY);
  window.addEventListener("themechange", callback);
  mql.addEventListener("change", callback);
  return () => {
    window.removeEventListener("themechange", callback);
    mql.removeEventListener("change", callback);
  };
}

function getServerSnapshot(): Theme {
  // Matches the unconditional dark `:root` values the server renders —
  // the light-mode CSS only ever applies via a media query or an
  // explicit data-theme attribute, neither of which SSR can see.
  return "dark";
}

/** Live-reads the resolved theme (manual data-theme override, else OS
 *  preference, else dark) and re-renders on either a toggle click (the
 *  "themechange" event) or an OS preference change. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, resolveTheme, getServerSnapshot);
}

/** Sets the theme explicitly, persists it, and notifies same-tab
 *  subscribers. Pass null to clear the manual override and fall back to
 *  OS preference. */
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
