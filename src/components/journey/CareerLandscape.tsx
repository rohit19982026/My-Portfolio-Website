"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Star from "../ui/Star";
import { subscribeScroll } from "@/lib/scrollBus";
import { award, bt, degree, intro, phdata, school } from "@/lib/career";
import { BackScene, FrontScene } from "./scenes";
import Medals from "./Medals";
import "./career.css";

/*
 * "My journey" as one landscape you travel through, not a list of milestones.
 *
 * Two sticky stages (one behind the copy, one in front of it) hold a single
 * drawn landscape. The copy scrolls between them in ordinary flow, so touch
 * and wheel scrolling are never taken over, and the near ridge in front means
 * type rises from behind the hills. As the page moves, one number, `s`, says
 * which act you are in (0 to 6, fractional). From it we derive weights per act
 * and CSS does the rest: skies cross-fade, the sun and moon arc across, ridges
 * grow and flatten, and each landmark (school, university, a city, a data
 * city) rises out of the ground for its act and sinks away after. Only
 * transforms and opacity move, so the stage never repaints.
 *
 * Each act's type has its own mechanic, keyed to the element's position on
 * screen (`--y`, from lib/flow.ts): a digit reel, a numeral you travel into,
 * lines that compress into place, lit lettering, a rotating star.
 *
 * Reduced motion, or no JS: the stages are never shown and the acts are plain
 * stacked bands with their own colours. Same words, same order.
 */

const ACTS = 7;
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((c, i) => (
        <span key={i} className="cl-ch" style={{ "--i": i } as CSSProperties}>
          {c}
        </span>
      ))}
    </>
  );
}

export default function CareerLandscape() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const acts = Array.from(root.querySelectorAll<HTMLElement>("[data-act]"));
    let centers: number[] = [];
    let top = 0;
    let bottom = 0;
    let vh = window.innerHeight;
    let inRange: boolean | null = null;
    const last: Record<string, string> = {};

    const put = (name: string, v: number) => {
      const n = v.toFixed(3);
      if (last[name] !== n) {
        last[name] = n;
        root.style.setProperty(name, n);
      }
    };

    const measure = () => {
      const y = window.scrollY;
      vh = window.innerHeight;
      const r = root.getBoundingClientRect();
      top = r.top + y;
      bottom = top + r.height;
      centers = acts.map((a) => {
        const b = a.getBoundingClientRect();
        return b.top + y + b.height / 2;
      });
    };

    // which act are we in, as a fractional index: interpolate between the
    // screen-centre positions of neighbouring acts
    const update = (y: number) => {
      const near = y + vh > top - vh && y < bottom + vh;
      if (!near && inRange === false) return;
      inRange = near;
      const vc = y + vh * 0.5;
      let s = 0;
      if (vc <= centers[0]) s = 0;
      else if (vc >= centers[ACTS - 1]) s = ACTS - 1;
      else {
        for (let i = 0; i < ACTS - 1; i++) {
          if (vc < centers[i + 1]) {
            s = i + (vc - centers[i]) / (centers[i + 1] - centers[i]);
            break;
          }
        }
      }
      put("--cs", s);
      for (let i = 0; i < ACTS; i++) put(`--w${i}`, clamp(1 - Math.abs(s - i)));
      // sky K fades in over sky K-1 as you cross from act K-1 to act K
      for (let k = 1; k <= 4; k++) put(`--c${k}`, clamp(s - (k - 1)));
      // the sun climbs and sets across the first four acts, the moon takes over
      const sunT = clamp(s / 3.7);
      put("--sunx", 0.1 + 0.8 * sunT);
      put("--suny", Math.sin(Math.PI * sunT));
      const moonT = clamp((s - 3.2) / 1.9);
      put("--moonx", 0.08 + 0.84 * moonT);
      put("--moony", Math.sin(Math.PI * moonT));
      put("--night", clamp(s - 3));
      // for the certifications the land sinks, leaving the sky to the medals
      put("--lower", clamp(s - 5));
      // hand over to the next section as this one's bottom edge arrives
      put("--end", clamp((y + vh - (bottom - vh * 0.55)) / (vh * 0.55)));
    };

    measure();
    root.setAttribute("data-live", "");
    update(window.scrollY);
    const unsub = subscribeScroll(({ y }) => update(y));
    const ro = new ResizeObserver(() => {
      measure();
      inRange = null;
      update(window.scrollY);
    });
    ro.observe(document.body);
    return () => {
      unsub();
      ro.disconnect();
      root.removeAttribute("data-live");
    };
  }, []);

  return (
    <section id="credentials" ref={rootRef} className="cl" data-flow="sheet" data-sheet="corners" aria-labelledby="cl-title">
      {/* behind the copy */}
      <div className="cl-stage cl-back" aria-hidden="true">
        <div className="cl-sky cl-sky-0" />
        <div className="cl-sky cl-sky-1" />
        <div className="cl-sky cl-sky-2" />
        <div className="cl-sky cl-sky-3" />
        <div className="cl-sky cl-sky-4" />
        <div className="cl-body cl-sun" />
        <div className="cl-body cl-moon" />
        <BackScene v="wide" />
        <BackScene v="tall" />
      </div>
      {/* in front of the copy: type rises from behind this ridge */}
      <div className="cl-stage cl-front" aria-hidden="true">
        <FrontScene v="wide" />
        <FrontScene v="tall" />
      </div>

      <div className="cl-content">
        {/* 0 · arrival */}
        <header className="cl-act cl-intro" data-act>
          <div className="cl-intro-in" data-flow="head" style={{ "--n": 10 } as CSSProperties}>
            <h2 id="cl-title" className="cl-giant" aria-label="My journey.">
              <span className="cl-line" aria-hidden="true">
                <Letters text="MY" />
              </span>
              <span className="cl-line" aria-hidden="true">
                <Letters text="JOURNEY." />
              </span>
            </h2>
            <p className="cl-lede">{intro.lede}</p>
          </div>
        </header>

        {/* 1 · school: a digit reel rolls 2014 to 2016 */}
        <article className="cl-act cl-school" data-act>
          <div className="cl-school-in">
            <div className="cl-reel" data-flow="drift" role="img" aria-label="2014 to 2016">
              <span className="cl-reel-fixed" aria-hidden="true">
                20
              </span>
              <span className="cl-reel-win" aria-hidden="true">
                <span className="cl-reel-col">
                  <span>14</span>
                  <span>15</span>
                  <span>16</span>
                </span>
              </span>
            </div>
            <ul className="cl-school-list">
              {school.map((s) => (
                <li key={s.year}>
                  <span className="cl-yr">{s.year}</span>
                  <span className="cl-school-t">{s.title}</span>
                  <span className="cl-school-n">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* 2 · graduation: you travel into a hollow 2020 */}
        <article className="cl-act cl-degree" data-act>
          <div className="cl-degree-in">
            <p className="cl-zoom" data-flow="drift" aria-hidden="true">
              {degree.year}
            </p>
            <h3 className="cl-degree-t">
              {degree.title.map((l) => (
                <span key={l} className="cl-block">
                  {l}
                </span>
              ))}
            </h3>
            <p className="cl-degree-p">
              <span className="sr-only">{degree.year}, </span>
              {degree.place}
            </p>
          </div>
        </article>

        {/* 3 · first job: lines are stretched, then compress into place */}
        <article className="cl-act cl-bt" data-act>
          <div className="cl-bt-in">
            <p className="cl-yr cl-yr-bt">{bt.year}</p>
            <h3 className="cl-bt-t" data-flow="drift">
              {bt.lines.map((l) => (
                <span key={l} className="cl-block">
                  {l}
                </span>
              ))}
            </h3>
            <p className="cl-bt-p">
              <strong>{bt.role}</strong>
              <span>{bt.span}</span>
            </p>
          </div>
        </article>

        {/* 4 · phData: the wordmark is lit like a building at night */}
        <article className="cl-act cl-city" data-act>
          <div className="cl-city-in">
            <p className="cl-yr cl-yr-city">{phdata.when}</p>
            <h3 className="cl-lit" aria-label="Joined phData">
              <span className="cl-lit-small">Joined</span>
              <span className="cl-lit-word" aria-hidden="true">
                phData
              </span>
            </h3>
            <p className="cl-city-p">
              <span>{phdata.note}</span>
              <strong>{phdata.role}</strong>
            </p>
          </div>
        </article>

        {/* 5 · recognition: one star over a clear night sky */}
        <article className="cl-act cl-award-act" data-act>
          <div className="cl-award">
            <div className="cl-award-star-wrap" data-flow="drift" aria-hidden="true">
              <Star className="cl-award-star" />
            </div>
            <div>
              <p className="cl-award-k">Recognition</p>
              <h3 className="cl-award-t">{award.title}</h3>
              <p className="cl-award-d">{award.desc}</p>
            </div>
          </div>
        </article>

        {/* 6 · certifications and courses, as enamel medals on lanyards */}
        <article className="cl-act cl-certs" data-act>
          <div className="cl-certs-in">
            <h3 className="cl-certs-t">Certifications and courses</h3>
            <Medals />
          </div>
        </article>
      </div>
    </section>
  );
}
