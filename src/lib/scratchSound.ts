/*
 * Scratch-card sound, generated live with the Web Audio API (no audio files).
 * Nothing is running while the visitor isn't scratching: a stroke creates a
 * short-lived noise source, shapes it with the pointer speed, and tears it
 * down a moment after the pointer stops. The audio context is only created
 * from a pointer-down, so browser autoplay rules are respected.
 */

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;

type Stroke = { src: AudioBufferSourceNode; band: BiquadFilterNode; gain: GainNode; lastGrain: number; stopTimer?: ReturnType<typeof setTimeout> };
let stroke: Stroke | null = null;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Call from the pointer-down that begins a scratch. */
export function scratchStart() {
  const c = ensure();
  if (!c || !master || !noise) return;
  if (stroke) {
    clearTimeout(stroke.stopTimer);
    return;
  }
  const src = c.createBufferSource();
  src.buffer = noise;
  src.loop = true;
  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 3200;
  band.Q.value = 0.9;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1200;
  const gain = c.createGain();
  gain.gain.value = 0;
  src.connect(band).connect(hp).connect(gain).connect(master);
  src.start(0, Math.random() * 0.8);
  stroke = { src, band, gain, lastGrain: 0 };
}

/** Call as the pointer moves; `speed` is in px per ms. */
export function scratchMove(speed: number) {
  const c = ctx;
  if (!c || !stroke) return;
  clearTimeout(stroke.stopTimer);
  const t = c.currentTime;
  const s = clamp(speed / 2.2, 0, 1);
  stroke.gain.gain.setTargetAtTime(0.018 + s * 0.11, t, 0.012);
  stroke.band.frequency.setTargetAtTime(2400 + s * 3200, t, 0.02);

  // tiny grit clicks, a few per second, so it sounds like foil and not wind
  if (t - stroke.lastGrain > 0.045 && Math.random() < 0.55) {
    stroke.lastGrain = t;
    grain(c, t, s);
  }
  stroke.stopTimer = setTimeout(scratchStop, 90);
}

function grain(c: AudioContext, t: number, s: number) {
  if (!master || !noise) return;
  const burst = c.createBufferSource();
  burst.buffer = noise;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 4200 + Math.random() * 2600 + s * 1500;
  bp.Q.value = 1.6;
  const g = c.createGain();
  const peak = 0.05 + s * 0.09;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.014 + Math.random() * 0.01);
  burst.connect(bp).connect(g).connect(master);
  burst.start(t, Math.random() * 0.8, 0.03);
}

/** Fade out and release the stroke's noise source. */
export function scratchStop() {
  const c = ctx;
  const s = stroke;
  if (!c || !s) return;
  clearTimeout(s.stopTimer);
  stroke = null;
  const t = c.currentTime;
  s.gain.gain.cancelScheduledValues(t);
  s.gain.gain.setTargetAtTime(0, t, 0.025);
  try {
    s.src.stop(t + 0.18);
  } catch {}
  s.src.onended = () => {
    s.src.disconnect();
    s.band.disconnect();
    s.gain.disconnect();
  };
}

/** A soft low swell as the last of the foil comes away. */
export function scratchReveal() {
  const c = ensure();
  if (!c || !master || !noise) return;
  const t = c.currentTime;

  const src = c.createBufferSource();
  src.buffer = noise;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.8;
  bp.frequency.setValueAtTime(900, t);
  bp.frequency.exponentialRampToValueAtTime(3200, t + 0.38);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.16, t + 0.16);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
  src.connect(bp).connect(g).connect(master);
  src.start(t, Math.random() * 0.4, 0.55);

  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(210, t);
  osc.frequency.exponentialRampToValueAtTime(110, t + 0.3);
  const og = c.createGain();
  og.gain.setValueAtTime(0.0001, t);
  og.gain.exponentialRampToValueAtTime(0.12, t + 0.03);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
  osc.connect(og).connect(master);
  osc.start(t);
  osc.stop(t + 0.38);
}
