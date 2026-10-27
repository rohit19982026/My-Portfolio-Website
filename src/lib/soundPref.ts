/*
 * The visitor's sound on/off choice, stored in localStorage and shared by every
 * sound on the site (currently the scratch-card foil in the case studies).
 * The storage key keeps its old name so an existing choice carries over.
 */

const KEY = "zip-sound";

type Pref = "on" | "off";

const listeners = new Set<() => void>();
let memoryPref: Pref | null = null;

export function subscribeSoundPref(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSoundPref(): Pref | null {
  if (memoryPref) return memoryPref;
  try {
    const v = localStorage.getItem(KEY);
    return v === "on" || v === "off" ? v : null;
  } catch {
    return null;
  }
}

export function setSoundPref(v: Pref) {
  memoryPref = v;
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  listeners.forEach((f) => f());
}
