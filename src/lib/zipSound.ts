/*
 * Zipper sound, generated live with the Web Audio API (no audio files).
 * Each call to zipTick() is one tooth passing: a tiny filtered-noise burst and
 * a short metallic click. A quiet looping noise bed rides underneath and
 * follows the slider speed so fast pulls sound brighter and busier.
 */

const KEY = "zip-sound";

type Pref = "on" | "off";
type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let bed: GainNode | null = null;
let bedFilter: BiquadFilterNode | null = null;
let noise: AudioBuffer | null = null;

const listeners = new Set<() => void>();
let memoryPref: Pref | null = null;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.2;
    master.connect(ctx.destination);

    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    bedFilter = ctx.createBiquadFilter();
    bedFilter.type = "bandpass";
    bedFilter.frequency.value = 2400;
    bedFilter.Q.value = 0.8;
    bed = ctx.createGain();
    bed.gain.value = 0;
    src.connect(bedFilter).connect(bed).connect(master);
    src.start();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Call from a user gesture so the browser lets the audio start. */
export function primeZipSound() {
  ensure();
}

export function zipTick(speed: number, dir: 1 | -1) {
  const c = ensure();
  if (!c || !master || !noise || !bed || !bedFilter) return;
  const t = c.currentTime;
  const s = clamp(speed / 1400, 0, 1);

  const osc = c.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime((dir > 0 ? 1550 : 1300) + s * 700 + Math.random() * 140, t);
  osc.frequency.exponentialRampToValueAtTime(560, t + 0.018);
  const og = c.createGain();
  og.gain.setValueAtTime(0.0001, t);
  og.gain.exponentialRampToValueAtTime(0.5 - s * 0.15, t + 0.001);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 900;
  osc.connect(og).connect(hp).connect(master);
  osc.start(t);
  osc.stop(t + 0.03);

  const burst = c.createBufferSource();
  burst.buffer = noise;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 3800 + s * 2600;
  bp.Q.value = 1.3;
  const ng = c.createGain();
  ng.gain.setValueAtTime(0.0001, t);
  ng.gain.exponentialRampToValueAtTime(0.5, t + 0.001);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.011);
  burst.connect(bp).connect(ng).connect(master);
  burst.start(t, Math.random() * 0.8, 0.02);

  bed.gain.setTargetAtTime(0.02 + s * 0.09, t, 0.02);
  bedFilter.frequency.setTargetAtTime(1800 + s * 3600, t, 0.03);
}

/** Fade the noise bed out once the slider stops. */
export function zipRest() {
  if (ctx && bed) bed.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
}

/** The slider hitting either end stop. */
export function zipThunk() {
  const c = ensure();
  if (!c || !master) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(190, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.09);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.9, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + 0.14);
  zipTick(500, 1);
}

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
