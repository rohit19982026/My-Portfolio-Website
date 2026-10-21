"use client";

import { Eye, Fingerprint, MousePointer2, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { scratchMove, scratchReveal, scratchStart, scratchStop } from "@/lib/scratchSound";

/*
 * A foil seal painted on a canvas over a case file. The case content stays in
 * the DOM underneath, so it can always be read and reached; the foil is only
 * a visual layer. Scratching erases it with a ragged brush, tracks progress on
 * a coarse grid (no pixel reads while moving), and past about half the
 * surface the rest peels away on a diagonal light sweep.
 */

const COLS = 24;
const THRESHOLD = 0.45;
const MAX_STAMPS = 6000;
const MAX_FLAKES = 40;
const CORNER = 28;
const SWEEP_MS = 560;

export type FoilPalette = [string, string, string];

type Flake = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; s: number; life: number; max: number };

type Props = {
  caseId: string;
  number: string;
  label: string;
  palette: FoilPalette;
  /** the parent has opened this case (by scratching, the button, or Reveal all) */
  open: boolean;
  /** the seal wants to open: `viaButton` is true for keyboard / button reveals */
  onReveal: (viaButton: boolean) => void;
  /** the peel has finished and the seal can be removed */
  onGone: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  coarse: boolean;
  /** show one silent demo stroke the first time a seal is seen this session */
  hint: boolean;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function makeTile(size: number, draw: (c: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d");
  if (x) draw(x);
  return c;
}

function paintFoil(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  o: { palette: FoilPalette; number: string; label: string; fontDisplay: string; fontSans: string; seed: number },
) {
  const rand = rng(o.seed);
  const [p0, p1, p2] = o.palette;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  roundRectPath(ctx, 0, 0, w, h, CORNER);
  ctx.clip();

  // base metal: three tones of the case colour
  const base = ctx.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, p0);
  base.addColorStop(0.5, p1);
  base.addColorStop(1, p2);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  // broad highlights give the sheet some curvature
  const hi = ctx.createRadialGradient(w * 0.22, h * 0.14, 0, w * 0.22, h * 0.14, Math.max(w, h) * 0.75);
  hi.addColorStop(0, "rgba(255,255,255,.5)");
  hi.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hi;
  ctx.fillRect(0, 0, w, h);
  const lo = ctx.createRadialGradient(w * 0.88, h * 0.95, 0, w * 0.88, h * 0.95, Math.max(w, h) * 0.6);
  lo.addColorStop(0, "rgba(60,40,120,.2)");
  lo.addColorStop(1, "rgba(60,40,120,0)");
  ctx.fillStyle = lo;
  ctx.fillRect(0, 0, w, h);

  // brushed lines at a slight angle
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-0.35);
  const L = Math.hypot(w, h);
  const lines = Math.round(L * 1.1);
  for (let i = 0; i < lines; i++) {
    const y = (rand() - 0.5) * L;
    const x0 = (rand() - 0.5) * L;
    const len = L * (0.12 + rand() * 0.55);
    ctx.strokeStyle = rand() < 0.5 ? `rgba(255,255,255,${0.04 + rand() * 0.08})` : `rgba(40,30,90,${0.03 + rand() * 0.05})`;
    ctx.lineWidth = 0.5 + rand() * 0.8;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x0 + len, y + (rand() - 0.5) * 1.5);
    ctx.stroke();
  }
  ctx.restore();

  // soft holographic bands
  ctx.globalCompositeOperation = "soft-light";
  const holo = ctx.createLinearGradient(0, h * 0.1, w, h * 0.9);
  holo.addColorStop(0, "rgba(255,150,220,0)");
  holo.addColorStop(0.16, "rgba(255,150,220,.6)");
  holo.addColorStop(0.3, "rgba(140,210,255,.6)");
  holo.addColorStop(0.44, "rgba(255,240,160,.5)");
  holo.addColorStop(0.56, "rgba(255,255,255,0)");
  holo.addColorStop(0.7, "rgba(160,255,220,.45)");
  holo.addColorStop(0.84, "rgba(190,160,255,.55)");
  holo.addColorStop(1, "rgba(255,150,220,0)");
  ctx.fillStyle = holo;
  ctx.fillRect(0, 0, w, h);

  // grain
  const grain = makeTile(96, (c) => {
    const img = c.createImageData(96, 96);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 90 + Math.floor(rand() * 120);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    c.putImageData(img, 0, 0);
  });
  const grainPat = ctx.createPattern(grain, "repeat");
  if (grainPat) {
    ctx.globalCompositeOperation = "overlay";
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = grainPat;
    ctx.fillRect(0, 0, w, h);
  }

  // security-print lattice of the site's four-point star
  const lattice = makeTile(44, (c) => {
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.moveTo(22, 8);
    c.quadraticCurveTo(22, 22, 36, 22);
    c.quadraticCurveTo(22, 22, 22, 36);
    c.quadraticCurveTo(22, 22, 8, 22);
    c.quadraticCurveTo(22, 22, 22, 8);
    c.fill();
  });
  const latPat = ctx.createPattern(lattice, "repeat");
  if (latPat) {
    ctx.globalCompositeOperation = "overlay";
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = latPat;
    ctx.fillRect(0, 0, w, h);
  }

  // vignette
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.hypot(w, h) / 2);
  vg.addColorStop(0, "rgba(40,25,90,0)");
  vg.addColorStop(1, "rgba(40,25,90,.2)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // engraved case number and name
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const fs = Math.min(h * 0.44, w * 0.36);
  const cx = w / 2;
  const cy = h * 0.4;
  ctx.font = `${fs}px ${o.fontDisplay}`;
  const deboss = (draw: (dx: number, dy: number) => void) => {
    ctx.fillStyle = "rgba(255,255,255,.85)";
    draw(1.6, 2);
    ctx.fillStyle = "rgba(45,25,100,.34)";
    draw(-1.2, -1.6);
  };
  deboss((dx, dy) => ctx.fillText(o.number, cx + dx, cy + dy));
  const body = ctx.createLinearGradient(0, cy - fs / 2, 0, cy + fs / 2);
  body.addColorStop(0, "rgba(70,50,130,.2)");
  body.addColorStop(1, "rgba(255,255,255,.14)");
  ctx.fillStyle = body;
  ctx.fillText(o.number, cx, cy);

  const labelSize = clamp(w * 0.034, 12, 15);
  ctx.font = `700 ${labelSize}px ${o.fontSans}`;
  const text = o.label.toUpperCase();
  const gap = labelSize * 0.34;
  const widths = [...text].map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (text.length - 1);
  const drawLabel = (dx: number, dy: number) => {
    let x = cx - total / 2 + dx;
    [...text].forEach((ch, i) => {
      ctx.textAlign = "left";
      ctx.fillText(ch, x, h * 0.62 + dy);
      x += widths[i] + gap;
    });
  };
  deboss(drawLabel);
  ctx.fillStyle = "rgba(60,40,120,.38)";
  drawLabel(0, 0);

  // edge: a lit top lip and a shaded bottom, so the foil has thickness
  roundRectPath(ctx, 1, 1, w - 2, h - 2, CORNER - 1);
  const edge = ctx.createLinearGradient(0, 0, 0, h);
  edge.addColorStop(0, "rgba(255,255,255,.95)");
  edge.addColorStop(0.5, "rgba(255,255,255,.12)");
  edge.addColorStop(1, "rgba(40,25,90,.3)");
  ctx.lineWidth = 2;
  ctx.strokeStyle = edge;
  ctx.stroke();
}

function makeBrush(r: number, dpr: number) {
  const d = Math.ceil(r * 2 * dpr * 1.12) + 2;
  const c = document.createElement("canvas");
  c.width = c.height = d;
  const x = c.getContext("2d");
  if (!x) return c;
  const mid = d / 2;
  const rad = r * dpr;
  x.beginPath();
  const n = 30;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 0.86 + Math.random() * 0.2;
    const px = mid + Math.cos(a) * rad * k;
    const py = mid + Math.sin(a) * rad * k;
    if (i) x.lineTo(px, py);
    else x.moveTo(px, py);
  }
  x.closePath();
  const g = x.createRadialGradient(mid, mid, rad * 0.2, mid, mid, rad);
  g.addColorStop(0, "rgba(0,0,0,1)");
  g.addColorStop(1, "rgba(0,0,0,.65)");
  x.fillStyle = g;
  x.fill();
  return c;
}

// a small coin as the mouse cursor over the foil
const COIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23fff7d6'/><stop offset='.55' stop-color='%23e3c26a'/><stop offset='1' stop-color='%23b98a2e'/></linearGradient></defs><circle cx='15' cy='15' r='12' fill='url(%23g)' stroke='%238a6420' stroke-width='1.4'/><circle cx='15' cy='15' r='8' fill='none' stroke='%23fff3c4' stroke-width='1' opacity='.8'/><path d='M15 9.5l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z' fill='%238a6420' opacity='.7'/></svg>\") 15 15, grab";

export default function ScratchSeal({
  caseId,
  number,
  label,
  palette,
  open,
  onReveal,
  onGone,
  soundOn,
  onToggleSound,
  coarse,
  hint,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const foilRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const [scratching, setScratching] = useState(false);

  // everything the draw loops need lives here, so pointer moves never re-render
  const S = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    stamps: [] as number[], // x, y, r in CSS px, flat
    rows: 1,
    grid: new Uint8Array(0),
    covered: 0,
    stroking: false,
    last: null as null | { x: number; y: number; t: number },
    queue: [] as { x: number; y: number; t: number }[],
    raf: 0,
    revealing: false,
    flakes: [] as Flake[],
    fxRaf: 0,
    fxLast: 0,
    sweep: -1,
    dist: 0,
    lastVib: 0,
    pointerType: "mouse",
    brushes: new Map<number, HTMLCanvasElement>(),
    userTouched: false,
    hintRaf: 0,
  });
  const props = useRef({ palette, open, onReveal, onGone, soundOn, caseId, number, label });
  useEffect(() => {
    props.current = { palette, open, onReveal, onGone, soundOn, caseId, number, label };
  });

  const fxFrame = useCallback(function frame(now: number) {
    const s = S.current;
    const fx = fxRef.current;
    const ctx = fx?.getContext("2d");
    if (!fx || !ctx) return;
    const dt = Math.min(0.05, (now - (s.fxLast || now)) / 1000);
    s.fxLast = now;
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    ctx.clearRect(0, 0, s.w, s.h);

    // the light edge that travels with the peel
    if (s.sweep >= 0 && s.sweep <= 1.25) {
      const L = s.w + s.h;
      const pos = s.sweep * L;
      const soft = Math.max(60, L * 0.14);
      const g = ctx.createLinearGradient((pos - soft) / 2, (pos - soft) / 2, (pos + soft * 0.15) / 2, (pos + soft * 0.15) / 2);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.7, "rgba(255,255,255,.75)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s.w, s.h);
    }

    const [, tone] = props.current.palette;
    for (let i = s.flakes.length - 1; i >= 0; i--) {
      const f = s.flakes[i];
      f.life -= dt;
      if (f.life <= 0 || f.y > s.h + 20) {
        s.flakes.splice(i, 1);
        continue;
      }
      f.vy += 900 * dt;
      f.vx *= 0.99;
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.rot += f.vr * dt;
      const a = clamp(f.life / (f.max * 0.6), 0, 1);
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      ctx.scale(1, 0.35 + Math.abs(Math.sin(f.rot * 1.7)) * 0.65);
      ctx.globalAlpha = a;
      ctx.fillStyle = tone;
      ctx.beginPath();
      ctx.moveTo(-f.s, 0);
      ctx.quadraticCurveTo(0, -f.s * 0.9, f.s, -f.s * 0.1);
      ctx.quadraticCurveTo(f.s * 0.2, f.s * 0.8, -f.s, 0);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.8)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    if (s.flakes.length > 0 || (s.sweep >= 0 && s.sweep <= 1.25)) {
      s.fxRaf = requestAnimationFrame(frame);
    } else {
      s.fxRaf = 0;
      s.fxLast = 0;
      ctx.clearRect(0, 0, s.w, s.h);
      if (s.revealing) props.current.onGone();
    }
  }, []);

  const kickFx = useCallback(() => {
    const s = S.current;
    if (!s.fxRaf) {
      s.fxLast = performance.now();
      s.fxRaf = requestAnimationFrame(fxFrame);
    }
  }, [fxFrame]);

  const spawnFlakes = useCallback(
    (x: number, y: number, count: number, spread = 1) => {
      const s = S.current;
      for (let i = 0; i < count && s.flakes.length < MAX_FLAKES; i++) {
        const max = 0.55 + Math.random() * 0.35;
        s.flakes.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 140 * spread,
          vy: -90 * Math.random() * spread,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 12,
          s: 2.5 + Math.random() * 4,
          life: max,
          max,
        });
      }
      kickFx();
    },
    [kickFx],
  );

  const markGrid = useCallback((x: number, y: number, r: number) => {
    const s = S.current;
    if (!s.w || !s.h) return;
    const cw = s.w / COLS;
    const ch = s.h / s.rows;
    const c0 = Math.max(0, Math.floor((x - r) / cw));
    const c1 = Math.min(COLS - 1, Math.floor((x + r) / cw));
    const r0 = Math.max(0, Math.floor((y - r) / ch));
    const r1 = Math.min(s.rows - 1, Math.floor((y + r) / ch));
    for (let ry = r0; ry <= r1; ry++) {
      for (let cx = c0; cx <= c1; cx++) {
        const idx = ry * COLS + cx;
        if (s.grid[idx]) continue;
        const dx = (cx + 0.5) * cw - x;
        const dy = (ry + 0.5) * ch - y;
        if (dx * dx + dy * dy <= r * r * 0.8) {
          s.grid[idx] = 1;
          s.covered++;
        }
      }
    }
  }, []);

  const brushFor = useCallback((r: number) => {
    const s = S.current;
    const key = Math.round(r / 2) * 2;
    let b = s.brushes.get(key);
    if (!b) {
      b = makeBrush(key, s.dpr);
      s.brushes.set(key, b);
    }
    return { b, key };
  }, []);

  const stamp = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, record: boolean) => {
      const s = S.current;
      const { b } = brushFor(r);
      // a worn rim just outside the cut: light on one side, shadow on the other
      ctx.globalCompositeOperation = "source-atop";
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(255,255,255,.26)";
      ctx.beginPath();
      ctx.arc(x, y, r * 1.03, Math.PI * 0.8, Math.PI * 1.8);
      ctx.stroke();
      ctx.strokeStyle = "rgba(30,20,70,.1)";
      ctx.beginPath();
      ctx.arc(x, y, r * 1.03, -Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();
      // the cut: partial each time, so a light pass thins the foil and a second removes it
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 0.55;
      const d = b.width / s.dpr;
      ctx.drawImage(b, x - d / 2, y - d / 2, d, d);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (record) {
        if (s.stamps.length < MAX_STAMPS * 3) s.stamps.push(x / s.w, y / s.w, r / s.w);
        markGrid(x, y, r);
      }
    },
    [brushFor, markGrid],
  );

  const sizeAndPaint = useCallback(() => {
    const s = S.current;
    const wrap = wrapRef.current;
    const foil = foilRef.current;
    const fx = fxRef.current;
    if (!wrap || !foil || !fx || s.revealing) return;
    const rect = wrap.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w < 40 || h < 40) return;
    if (w === s.w && h === s.h) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    s.w = w;
    s.h = h;
    s.dpr = dpr;
    s.brushes.clear();
    for (const c of [foil, fx]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    }
    const cs = getComputedStyle(wrap);
    const fontDisplay = cs.getPropertyValue("--font-anton").trim() || "Impact, 'Arial Narrow', sans-serif";
    const fontSans = cs.getPropertyValue("--font-inter").trim() || "system-ui, sans-serif";
    const p = props.current;
    let seed = 7;
    for (const ch of p.caseId) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const ctx = foil.getContext("2d");
    if (!ctx) return;
    const paint = () => {
      paintFoil(ctx, w, h, dpr, { palette: p.palette, number: p.number, label: p.label, fontDisplay, fontSans, seed });
      // replay earlier scratches after a resize
      s.rows = Math.max(1, Math.round((COLS * h) / w));
      s.grid = new Uint8Array(COLS * s.rows);
      s.covered = 0;
      const old = s.stamps;
      s.stamps = [];
      for (let i = 0; i < old.length; i += 3) stamp(ctx, old[i] * w, old[i + 1] * w, old[i + 2] * w, true);
    };
    paint();
    // repaint once the display font is surely loaded, if nothing has been scratched yet
    if (document.fonts?.load) {
      void Promise.race([document.fonts.load(`40px ${fontDisplay}`), new Promise((r) => setTimeout(r, 700))])
        .catch(() => {})
        .then(() => {
          if (S.current.stamps.length === 0 && !S.current.revealing && S.current.w === w) paint();
        });
    }
  }, [stamp]);

  const startReveal = useCallback(
    (viaButton: boolean, external = false) => {
      const s = S.current;
      if (s.revealing) return;
      s.revealing = true;
      s.stroking = false;
      cancelAnimationFrame(s.hintRaf);
      setScratching(false);
      scratchStop();
      if (!external) props.current.onReveal(viaButton);
      if (props.current.soundOn) scratchReveal();
      if (props.current.soundOn && "vibrate" in navigator && s.pointerType === "touch") navigator.vibrate(18);

      const foil = foilRef.current;
      const ctx = foil?.getContext("2d");
      if (!foil || !ctx) {
        props.current.onGone();
        return;
      }
      const t0 = performance.now();
      s.sweep = 0;
      kickFx();
      const L = s.w + s.h;
      const soft = Math.max(60, L * 0.14);
      const step = (now: number) => {
        const t = clamp((now - t0) / SWEEP_MS, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const pos = eased * (L + soft * 1.3);
        s.sweep = pos / L;
        ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
        ctx.globalCompositeOperation = "destination-out";
        const g = ctx.createLinearGradient((pos - soft) / 2, (pos - soft) / 2, pos / 2, pos / 2);
        g.addColorStop(0, "rgba(0,0,0,1)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s.w, s.h);
        ctx.globalCompositeOperation = "source-over";
        // shards come off along the moving edge
        if (t < 0.9) {
          const along = Math.random();
          const cx = clamp(pos * along - soft * 0.2, 0, s.w);
          const cy = clamp(pos * (1 - along) - soft * 0.2, 0, s.h);
          spawnFlakes(cx, cy, 1, 1.3);
        }
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          ctx.clearRect(0, 0, s.w, s.h);
          s.sweep = 99;
          kickFx();
        }
      };
      requestAnimationFrame(step);
    },
    [kickFx, spawnFlakes],
  );

  // flush queued pointer points once per frame
  const flush = useCallback(() => {
    const s = S.current;
    s.raf = 0;
    const foil = foilRef.current;
    const ctx = foil?.getContext("2d");
    if (!ctx || s.revealing) return;
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    const base = coarse ? 24 : 28;
    let lastSpeed = 0;
    for (const p of s.queue) {
      if (!s.last) {
        s.last = p;
        stamp(ctx, p.x, p.y, base, true);
        continue;
      }
      const dx = p.x - s.last.x;
      const dy = p.y - s.last.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(1, p.t - s.last.t);
      const speed = dist / dt;
      lastSpeed = speed;
      const r = base * (1 + Math.min(0.35, speed * 0.12));
      const steps = Math.max(1, Math.ceil(dist / (r * 0.65)));
      for (let i = 1; i <= steps; i++) {
        stamp(ctx, s.last.x + (dx * i) / steps, s.last.y + (dy * i) / steps, r, true);
      }
      if (dist > 2 && Math.random() < clamp(0.2 + speed * 0.25, 0, 0.7)) spawnFlakes(p.x, p.y, 1);

      // light taps on touch screens, spaced out and only where vibration exists
      s.dist += dist;
      if (s.pointerType === "touch" && props.current.soundOn && "vibrate" in navigator && s.dist > 54) {
        s.dist = 0;
        const now = performance.now();
        if (now - s.lastVib > 90) {
          s.lastVib = now;
          navigator.vibrate(7);
        }
      }
      s.last = p;
    }
    s.queue = [];
    if (props.current.soundOn) scratchMove(lastSpeed);
    if (s.covered / (COLS * s.rows) >= THRESHOLD) startReveal(false);
  }, [coarse, spawnFlakes, startReveal, stamp]);

  const endStroke = useCallback(() => {
    const s = S.current;
    if (!s.stroking) return;
    s.stroking = false;
    s.last = null;
    s.dist = 0;
    setScratching(false);
    scratchStop();
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const s = S.current;
    if (s.revealing) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    s.userTouched = true;
    cancelAnimationFrame(s.hintRaf);
    s.pointerType = e.pointerType;
    s.stroking = true;
    s.last = null;
    s.queue.push({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, t: e.timeStamp });
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setScratching(true);
    if (props.current.soundOn) scratchStart();
    if (!s.raf) s.raf = requestAnimationFrame(flush);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const s = S.current;
    const wrap = wrapRef.current;
    if (!s.stroking) {
      // the sheen follows the mouse while it hovers
      if (wrap && e.pointerType === "mouse") {
        wrap.style.setProperty("--mx", `${e.nativeEvent.offsetX}px`);
        wrap.style.setProperty("--my", `${e.nativeEvent.offsetY}px`);
      }
      return;
    }
    const native = e.nativeEvent;
    const events = typeof native.getCoalescedEvents === "function" ? native.getCoalescedEvents() : [];
    const list = events.length ? events : [native];
    for (const ev of list) s.queue.push({ x: ev.offsetX, y: ev.offsetY, t: ev.timeStamp });
    if (wrap) {
      wrap.style.setProperty("--mx", `${native.offsetX}px`);
      wrap.style.setProperty("--my", `${native.offsetY}px`);
    }
    if (!s.raf) s.raf = requestAnimationFrame(flush);
  };

  useEffect(() => {
    const s = S.current;
    const wrap = wrapRef.current;
    if (!wrap) return;
    sizeAndPaint();
    const ro = new ResizeObserver(() => sizeAndPaint());
    ro.observe(wrap);
    const stop = () => endStroke();
    window.addEventListener("blur", stop);
    window.addEventListener("pointerup", stop);
    return () => {
      ro.disconnect();
      window.removeEventListener("blur", stop);
      window.removeEventListener("pointerup", stop);
      cancelAnimationFrame(s.raf);
      cancelAnimationFrame(s.fxRaf);
      cancelAnimationFrame(s.hintRaf);
      s.fxRaf = 0;
      scratchStop();
    };
  }, [sizeAndPaint, endStroke]);

  // the parent opened this case some other way (Reveal all): peel the seal off
  useEffect(() => {
    if (open) startReveal(false, true);
  }, [open, startReveal]);

  // one silent demo stroke the first time a seal scrolls into view
  useEffect(() => {
    if (!hint) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const s = S.current;
    let started = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started || s.userTouched || s.revealing) return;
        started = true;
        io.disconnect();
        timer = setTimeout(() => {
          const ctx = foilRef.current?.getContext("2d");
          if (!ctx || s.userTouched || s.revealing || !s.w) return;
          const t0 = performance.now();
          const dur = 1000;
          let prev: { x: number; y: number } | null = null;
          const step = (now: number) => {
            if (s.userTouched || s.revealing) return;
            const t = clamp((now - t0) / dur, 0, 1);
            const e = t * t * (3 - 2 * t);
            const x = s.w * (0.14 + 0.34 * e);
            const y = s.h * (0.78 - 0.1 * e) + Math.sin(e * Math.PI * 3) * s.h * 0.025;
            ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
            const r = coarse ? 17 : 22;
            if (prev) {
              const dist = Math.hypot(x - prev.x, y - prev.y);
              const n = Math.max(1, Math.ceil(dist / (r * 0.65)));
              for (let i = 1; i <= n; i++) stamp(ctx, prev.x + ((x - prev.x) * i) / n, prev.y + ((y - prev.y) * i) / n, r, true);
            } else {
              stamp(ctx, x, y, r, true);
            }
            prev = { x, y };
            if (t < 1) s.hintRaf = requestAnimationFrame(step);
          };
          s.hintRaf = requestAnimationFrame(step);
        }, 700);
      },
      { threshold: 0.6 },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [hint, coarse, stamp]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 z-10 select-none overflow-hidden"
      style={{ borderRadius: CORNER, ["--mx" as string]: "50%", ["--my" as string]: "-40%" }}
    >
      <canvas
        ref={foilRef}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endStroke}
        onPointerCancel={endStroke}
        onLostPointerCapture={endStroke}
        onDragStart={(e) => e.preventDefault()}
        className="absolute left-0 top-0 block"
        style={{
          touchAction: "pan-y",
          cursor: COIN,
        }}
      />

      {/* light on the foil: a slow drifting band, and a soft spot that follows the pointer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-y-0 left-0 w-[55%] animate-[foilSheen_7s_ease-in-out_infinite]"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,.34) 50%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle 190px at var(--mx) var(--my), rgba(255,255,255,.3), transparent 70%)" }}
        />
      </div>

      <canvas ref={fxRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 block" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[22%] flex justify-center transition-all duration-300"
        style={{ opacity: scratching ? 0 : 1, transform: scratching ? "translateY(6px) scale(.97)" : "none" }}
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-sans text-[14px] font-semibold"
          style={{
            background: "rgba(255,255,255,.55)",
            color: "#2a2250",
            border: "1px solid rgba(255,255,255,.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow: "0 10px 24px -14px rgba(40,25,100,.55)",
            animation: "foilHint 2.4s ease-in-out infinite",
          }}
        >
          {coarse ? <Fingerprint size={17} /> : <MousePointer2 size={16} />}
          {coarse ? "Rub side to side to scratch" : "Drag to scratch"}
        </span>
      </div>

      <button
        type="button"
        onClick={onToggleSound}
        aria-pressed={soundOn}
        aria-label="Sound and vibration"
        title={soundOn ? "Sound and vibration on" : "Sound and vibration off"}
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
        style={{
          background: "rgba(255,255,255,.55)",
          color: "#2a2250",
          border: "1px solid rgba(255,255,255,.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
      </button>

      <button
        type="button"
        onClick={() => startReveal(true)}
        className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-sans text-[13.5px] font-semibold transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
        style={{
          background: "rgba(255,255,255,.55)",
          color: "#2a2250",
          border: "1px solid rgba(255,255,255,.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Eye size={16} />
        Reveal
      </button>
    </div>
  );
}
