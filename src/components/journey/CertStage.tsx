"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { certs } from "@/lib/career";
import { scrollToTarget } from "@/lib/scrollTo";
import Art from "./certArt";

/*
 * Certifications and courses as a lens you look through.
 *
 * A pinned stage holds an index on one side and a lens on the other. As the
 * page scrolls, the lens iris opens from the centre onto the next credential's
 * drawing (each one shows what the credential is about) and the index lights
 * the matching line. Scrolling is never taken over: the stage is `sticky`, the
 * page keeps moving, and the whole act is about two and a half screens.
 *
 * Because credentials are information, you can also just ask for one: every
 * index line is a link that travels to its chapter, and on a pointer device
 * the lens leans toward the cursor while the drawing inside shifts a little
 * more than the frame, so it has depth.
 *
 * CareerLandscape's scroll loop writes `--ca` (the fractional chapter) on the
 * stage; CSS does the rest. Without that loop (reduced motion, no JS) the lens
 * and index are hidden and the same names show as a plain list.
 */


export default function CertStage() {
  const lensRef = useRef<HTMLDivElement>(null);

  // Pointer depth: ease the lens toward the cursor (fine pointers only).
  useEffect(() => {
    const lens = lensRef.current;
    if (!lens) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, inside = false;
    const set = () => {
      lens.style.setProperty("--px", x.toFixed(3));
      lens.style.setProperty("--py", y.toFixed(3));
    };
    const frame = () => {
      raf = 0;
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      set();
      if (Math.abs(tx - x) > 0.002 || Math.abs(ty - y) > 0.002) raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      const r = lens.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      inside = true;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      inside = false;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    lens.addEventListener("pointermove", move);
    lens.addEventListener("pointerleave", leave);
    return () => {
      lens.removeEventListener("pointermove", move);
      lens.removeEventListener("pointerleave", leave);
      if (raf) cancelAnimationFrame(raf);
      void inside;
    };
  }, []);

  // Travel to a chapter so it sits at the centre of the screen.
  const go = (i: number) => (e: React.MouseEvent) => {
    const el = document.getElementById(`cert-${i}`);
    if (!el) return;
    e.preventDefault();
    const r = el.getBoundingClientRect();
    scrollToTarget(window.scrollY + r.top + r.height / 2 - window.innerHeight / 2);
  };

  return (
    <div className="cl-certs-wrap">
      <div className="cl-certs-stage" style={{ "--ca": 0 } as CSSProperties}>
        <div className="cl-certs-left">
        <h3 className="cl-certs-t">Certifications and courses</h3>

        <ol className="cl-idx">
          {certs.map((c, i) => (
            <li key={c.name} style={{ "--i": i } as CSSProperties}>
              <a href={`#cert-${i}`} onClick={go(i)} aria-label={`${c.name}, ${c.issuer}`}>
                <span className="cl-idx-n" aria-hidden="true">
                  {c.short}
                </span>
                <span className="cl-idx-s" aria-hidden="true">
                  {c.issuer}
                </span>
              </a>
            </li>
          ))}
        </ol>
        </div>

        <div className="cl-lens-col">
          <div className="cl-lens" ref={lensRef}>
            <div className="cl-lens-in">
              {certs.map((c, i) => (
                <div key={c.name} className="cl-art" style={{ "--i": i } as CSSProperties}>
                  <Art index={i} />
                </div>
              ))}
            </div>
          </div>
          <ul className="cl-caps">
            {certs.map((c, i) => (
              <li key={c.name} className="cl-cap" style={{ "--i": i } as CSSProperties}>
                <strong>{c.name}</strong>
                <span>{c.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* scroll distance: one short chapter per credential, with run-in and run-out */}
      <div className="cl-chaps" aria-hidden="true">
        <div className="cl-chap cl-chap-lead" />
        {certs.map((c, i) => (
          <div key={c.name} id={`cert-${i}`} className="cl-chap" data-chap />
        ))}
        <div className="cl-chap cl-chap-tail" />
      </div>
    </div>
  );
}
