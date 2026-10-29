import { subscribeScroll } from "./scrollBus";

/** The page's one motion system.
 *
 *  Everything on the page moves through the same three states as it crosses a
 *  "reading line" (about 62% down the screen): backlog (muted, below the line),
 *  in progress (developing as it crosses), done (full colour, above it). That
 *  is the vocabulary of the work the page describes, and it means a heading, a
 *  card and a paragraph all behave as parts of one machine instead of each
 *  carrying its own entrance.
 *
 *  Markup opts in with `data-flow`; this file turns scroll position into CSS
 *  custom properties and does nothing else. All visuals live in globals.css,
 *  so the cost per frame is a handful of rect reads and style writes on the
 *  elements near the viewport. Scrubbed, not triggered: scroll back up and it
 *  un-develops, scroll slowly and you can hold it half way.
 *
 *    data-flow="ink"   text: --p
 *    data-flow="dev"   blocks and cards: --p
 *    data-flow="head"  section headings: --p (words rise), --f (outline fills)
 *    data-flow="sheet" a section's top edge opening up: --s
 *    data-flow="drift" depth: --y, +1 entering at the bottom to -1 leaving at the top
 *
 *  Without this running (no JS, reduced motion, failed bundle) every variable
 *  falls back to "complete" in CSS, so nothing is ever left hidden. */

type Kind = "ink" | "dev" | "head" | "sheet" | "drift";

// Where on screen (fraction of viewport height, from the top) progress starts
// and ends. An element's top edge travelling from `from` to `to` takes it from
// 0 to 1.
const RANGES: Record<Kind, { from: number; to: number }> = {
  ink: { from: 0.96, to: 0.66 },
  dev: { from: 0.98, to: 0.62 },
  head: { from: 0.94, to: 0.64 },
  sheet: { from: 1.0, to: 0.4 },
  drift: { from: 1, to: 0 },
};
// The headline fill runs longer than its entrance, finishing high on screen.
const FILL = { from: 0.82, to: 0.3 };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const set = (el: HTMLElement, name: string, v: number) => {
  const next = v.toFixed(3);
  if (el.style.getPropertyValue(name) !== next) el.style.setProperty(name, next);
};

export function startFlow(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const root = document.documentElement;
  root.classList.add("flow-on");

  const live = new Set<HTMLElement>(); // near the viewport, updated every frame
  const known = new Set<HTMLElement>();
  // Document-space box of every tracked element, so a big jump in scroll (a
  // nav click, back to top, End key) can settle elements that were never
  // "near" the viewport without touching layout each frame.
  const box = new Map<HTMLElement, { top: number; h: number }>();
  const rested = new Map<HTMLElement, 0 | 1>();
  let vh = window.innerHeight;
  let maxScroll = 1;

  const measure = () => {
    vh = window.innerHeight;
    maxScroll = Math.max(1, root.scrollHeight - vh);
  };
  const measureBoxes = () => {
    const y = window.scrollY;
    known.forEach((el) => {
      const r = el.getBoundingClientRect();
      box.set(el, { top: r.top + y, h: r.height });
    });
  };

  type Vals = { kind: Kind; p?: number; f?: number; s?: number; y?: number };

  /** Pure read: turn an element's current box into its variable values. */
  function calc(el: HTMLElement, rect: DOMRect, y: number): Vals | null {
    const kind = el.dataset.flow as Kind;
    const range = RANGES[kind];
    if (!range) return null;
    const top = rect.top;
    if (kind === "drift") {
      // +1 as it enters at the bottom, 0 mid-screen, -1 as it leaves at the top.
      return { kind, y: Math.max(-1, Math.min(1, (top + rect.height / 2 - vh / 2) / ((vh + rect.height) / 2))) };
    }
    // An element near the end of the page can never scroll up to the line, so
    // pull its finish line down to the highest spot it can actually reach.
    const reachable = (top + y - maxScroll) / vh;
    const to = Math.max(range.to, reachable + 0.03);
    const p = clamp01((range.from - top / vh) / Math.max(0.05, range.from - to));
    if (kind === "sheet") return { kind, s: p };
    let f = 1;
    if (kind === "head") {
      const fto = Math.max(FILL.to, reachable + 0.03);
      f = clamp01((FILL.from - top / vh) / Math.max(0.05, FILL.from - fto));
    }
    return { kind, p, f };
  }

  /** Pure write. Always run after every read of the frame is done, so the
   *  browser lays the page out once per frame instead of once per element. */
  function apply(el: HTMLElement, v: Vals) {
    if (v.kind === "drift") {
      set(el, "--y", v.y!);
      return;
    }
    if (v.kind === "sheet") {
      set(el, "--s", v.s!);
      if (v.s! >= 0.999) el.setAttribute("data-flow-done", "");
      else el.removeAttribute("data-flow-done");
      return;
    }
    set(el, "--p", v.p!);
    if (v.kind === "head") set(el, "--f", v.f!);
    // Finished: CSS drops every transform/filter so a completed element is
    // ordinary, un-layered content again.
    if (v.p! >= 0.999 && v.f! >= 0.999) el.setAttribute("data-flow-done", "");
    else el.removeAttribute("data-flow-done");
  }

  function update(els: Iterable<HTMLElement>, y: number) {
    const out: [HTMLElement, Vals][] = [];
    for (const el of els) {
      const v = calc(el, el.getBoundingClientRect(), y);
      if (v) out.push([el, v]);
    }
    for (const [el, v] of out) apply(el, v);
  }

  // Elements outside the live band snap to their resting value (below the
  // line = 0, above = 1) the moment they leave it, then cost nothing.
  const io = new IntersectionObserver(
    (entries) => {
      const y = window.scrollY;
      const left: HTMLElement[] = [];
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) {
          live.add(el);
          rested.delete(el);
        } else {
          live.delete(el);
          left.push(el);
          rested.set(el, e.boundingClientRect.top < 0 ? 1 : 0);
        }
      }
      if (left.length) update(left, y);
    },
    { rootMargin: "25% 0px 25% 0px" }
  );

  const scan = () => {
    const fresh: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-flow]").forEach((el) => {
      if (known.has(el)) return;
      known.add(el);
      io.observe(el);
      fresh.push(el);
    });
    if (fresh.length) {
      update(fresh, window.scrollY);
      measureBoxes();
    }
  };

  measure();
  scan();

  const unsub = subscribeScroll(({ y }) => {
    if (document.documentElement.scrollHeight - vh !== maxScroll) {
      measure();
      measureBoxes();
    }
    // Anything outside the live band must sit at its resting value: 0 if it is
    // still below the screen, 1 once it is above it. Cheap arithmetic on cached
    // boxes; only elements that changed side are touched.
    const settle: HTMLElement[] = [];
    known.forEach((el) => {
      if (live.has(el)) return;
      const b = box.get(el);
      if (!b) return;
      const rel = b.top - y;
      const want: 0 | 1 | null = rel + b.h < -vh * 0.3 ? 1 : rel > vh * 1.3 ? 0 : null;
      if (want !== null && rested.get(el) !== want) {
        rested.set(el, want);
        settle.push(el);
      }
    });
    update(settle.length ? [...live, ...settle] : live, y);
  });

  // Pages and client-side route changes add elements after first paint.
  let scanQueued = false;
  const mo = new MutationObserver(() => {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(() => {
      scanQueued = false;
      for (const el of [...known]) if (!el.isConnected) { known.delete(el); live.delete(el); box.delete(el); rested.delete(el); }
      scan();
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });

  const onResize = () => {
    measure();
    measureBoxes();
    rested.clear();
    update(known, window.scrollY);
  };
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    root.classList.remove("flow-on");
    unsub();
    io.disconnect();
    mo.disconnect();
    window.removeEventListener("resize", onResize);
    known.forEach((el) => {
      el.style.removeProperty("--p");
      el.style.removeProperty("--f");
      el.style.removeProperty("--s");
      el.style.removeProperty("--y");
      el.removeAttribute("data-flow-done");
    });
  };
}
