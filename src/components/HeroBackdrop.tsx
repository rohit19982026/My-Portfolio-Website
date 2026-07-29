"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decorative agent-orchestration loop sitting behind the hero content.
 *
 * The clip is composited with `screen` blending: its near-black field
 * contributes nothing over the blue backdrop (screen's identity color is
 * black regardless of the backdrop's hue), so only the neon graph adds
 * light and there is no visible video rectangle to give the trick away.
 *
 * The wrapper is pinned to exactly one viewport tall (`h-screen`), not
 * `inset-0` on the hero section. The section itself grows taller than one
 * screen on narrow viewports because the lead paragraph wraps to many lines —
 * an `inset-0` backdrop would stretch across that whole, variable height and
 * the composition below would land in a different place on every screen size.
 * Pinning to one screen keeps it consistent.
 *
 * Cost is kept deliberately low. The poster carries first paint everywhere,
 * and the 685KB video streams in on top of it on every viewport, including
 * phones. Playback pauses off-screen and on hidden tabs, and anyone who has
 * asked for reduced motion, turned on Data Saver, or is on a 2G-class
 * connection gets the still poster only.
 */

const DESKTOP_Q = "(min-width: 768px)";
const REDUCED_Q = "(prefers-reduced-motion: reduce)";
const SLOW_CONNECTIONS = new Set(["slow-2g", "2g"]);

// On mobile the graph sits behind the lead paragraph rather than beside it,
// so it's masked tighter and anchored higher than the desktop composition.
const MASK_MOBILE =
  "radial-gradient(90% 60% at 68% 30%, #000 40%, rgba(0,0,0,0.5) 70%, transparent 90%)";
const MASK_DESKTOP =
  "radial-gradient(100% 76% at 62% 44%, #000 42%, rgba(0,0,0,0.55) 72%, transparent 92%)";

const SCRIM_MOBILE =
  "linear-gradient(180deg, color-mix(in srgb, var(--color-blue) 50%, transparent) 0%, color-mix(in srgb, var(--color-blue) 12%, transparent) 24%, color-mix(in srgb, var(--color-blue) 35%, transparent) 46%, color-mix(in srgb, var(--color-blue) 94%, transparent) 68%, var(--color-blue) 88%)";
const SCRIM_DESKTOP = [
  "linear-gradient(90deg, var(--color-blue) 0%, var(--color-blue) 26%, color-mix(in srgb, var(--color-blue) 82%, transparent) 44%, color-mix(in srgb, var(--color-blue) 22%, transparent) 72%, color-mix(in srgb, var(--color-blue) 50%, transparent) 100%)",
  "linear-gradient(180deg, color-mix(in srgb, var(--color-blue) 85%, transparent) 0%, color-mix(in srgb, var(--color-blue) 8%, transparent) 22%, color-mix(in srgb, var(--color-blue) 42%, transparent) 58%, color-mix(in srgb, var(--color-blue) 88%, transparent) 78%, var(--color-blue) 92%)",
].join(", ");

export default function HeroBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);
  const [ready, setReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Composition differs enough between the mobile (behind-text) and desktop
  // (beside-text) layouts that the mask/scrim are picked in JS rather than
  // fought over with responsive Tailwind classes on gradient strings.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_Q);
    const evaluate = () => setIsDesktop(mq.matches);
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  // Load the clip everywhere except for visitors who've opted out of motion
  // or data usage — viewport size no longer gates it.
  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_Q);
    const conn = (
      navigator as Navigator & {
        connection?: EventTarget & {
          saveData?: boolean;
          effectiveType?: string;
        };
      }
    ).connection;

    const evaluate = () =>
      setAllowVideo(
        !reduced.matches &&
          !conn?.saveData &&
          !SLOW_CONNECTIONS.has(conn?.effectiveType ?? ""),
      );

    evaluate();
    reduced.addEventListener("change", evaluate);
    conn?.addEventListener?.("change", evaluate);
    return () => {
      reduced.removeEventListener("change", evaluate);
      conn?.removeEventListener?.("change", evaluate);
    };
  }, []);

  // Fetch and play once opted in, and keep playback tied to actual visibility.
  useEffect(() => {
    const el = videoRef.current;
    if (!allowVideo || !el) return;

    el.preload = "auto";
    el.load();

    const play = () => {
      void el.play().catch(() => {});
    };
    play();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) play();
        else el.pause();
      },
      { threshold: 0.01 },
    );
    io.observe(el);

    const onVisibility = () => (document.hidden ? el.pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [allowVideo]);

  const mask = isDesktop ? MASK_DESKTOP : MASK_MOBILE;
  const scrim = isDesktop ? SCRIM_DESKTOP : SCRIM_MOBILE;
  const position = isDesktop ? "50% 42%" : "68% 30%";

  const posterOpacity = isDesktop ? 0.34 : 0.22;
  const targetOpacity = isDesktop ? 0.46 : 0.34;

  return (
    <div
      className="absolute inset-x-0 top-0 h-screen pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Poster carries first paint, and is the whole backdrop for anyone who
          has asked for reduced motion. */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat"
        style={{
          backgroundImage: "url(/hero/orchestration-poster.jpg)",
          backgroundPosition: position,
          mixBlendMode: "screen",
          maskImage: mask,
          WebkitMaskImage: mask,
          opacity: posterOpacity,
        }}
      />

      {allowVideo && (
        <div
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-out"
          style={{
            opacity: ready ? 1 : 0,
            mixBlendMode: "screen",
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            style={{ opacity: targetOpacity, objectPosition: position }}
            poster="/hero/orchestration-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            disablePictureInPicture
            onCanPlay={() => setReady(true)}
          >
            <source src="/hero/orchestration.webm" type="video/webm" />
            <source src="/hero/orchestration.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <div className="absolute inset-0" style={{ background: scrim }} />
    </div>
  );
}
