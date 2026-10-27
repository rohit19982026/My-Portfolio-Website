/** One passive scroll listener for the whole page. Everything that reacts to
 *  scrolling (progress bar, navbar, ticker, back-to-top, active section)
 *  subscribes here instead of adding its own listener, so scrolling costs one
 *  rAF-throttled pass no matter how many parts of the page care about it.
 *
 *  It reads the native scroll position, so it works the same whether Lenis is
 *  driving the scroll or the visitor has reduced motion and it is switched off.
 *  `velocity` is px per 60fps frame, signed (positive = scrolling down). After
 *  the last scroll event it keeps ticking for a short settle window so
 *  listeners see velocity fall back to 0 instead of freezing mid-value. */

export type ScrollState = { y: number; velocity: number };
type Listener = (s: ScrollState) => void;

const SETTLE_MS = 160;
const listeners = new Set<Listener>();
let attached = false;
let raf = 0;
let lastY = 0;
let lastT = 0;
let lastEventT = 0;

function tick(now: number) {
  raf = 0;
  const y = window.scrollY;
  const dt = Math.max(1, now - lastT);
  const velocity = ((y - lastY) / dt) * (1000 / 60);
  lastY = y;
  lastT = now;
  const state = { y, velocity };
  listeners.forEach((l) => l(state));
  if (now - lastEventT < SETTLE_MS) raf = requestAnimationFrame(tick);
}

function wake() {
  lastEventT = performance.now();
  if (!raf) {
    lastT = lastEventT - 16;
    raf = requestAnimationFrame(tick);
  }
}

export function subscribeScroll(listener: Listener): () => void {
  listeners.add(listener);
  if (!attached) {
    attached = true;
    lastY = window.scrollY;
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
  }
  // Give a new subscriber the current position straight away.
  listener({ y: window.scrollY, velocity: 0 });
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && attached) {
      attached = false;
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}
