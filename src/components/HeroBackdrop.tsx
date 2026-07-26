"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Decorative agent-orchestration loop sitting behind the hero content.
 *
 * The clip is composited with `screen` blending: its near-black field
 * contributes nothing over the page background, so only the neon graph adds
 * light and there is no visible video rectangle to give the trick away.
 *
 * Cost is kept deliberately low. The poster carries first paint, and the video
 * is only fetched on wider viewports where the graph actually has room to read
 * as a diagram — phones get the still alone, so no one downloads 685KB of
 * decoration over cellular. Playback also pauses off-screen and on hidden tabs,
 * and reduced-motion or save-data visitors never load the video at all.
 */

const DESKTOP_Q = "(min-width: 768px)";
const REDUCED_Q = "(prefers-reduced-motion: reduce)";

// Softens the clip into the page so its edges never read as a hard boundary.
const MASK =
  "radial-gradient(100% 76% at 62% 44%, #000 42%, rgba(0,0,0,0.55) 72%, transparent 92%)";

// Holds copy legible on the left, lets the graph breathe right of centre, and
// clears the stats panel so it never sits on top of moving light.
const SCRIM = [
  "linear-gradient(90deg, #0A0A12 0%, #0A0A12 26%, rgba(10,10,18,0.82) 44%, rgba(10,10,18,0.22) 72%, rgba(10,10,18,0.5) 100%)",
  "linear-gradient(180deg, rgba(10,10,18,0.85) 0%, rgba(10,10,18,0.08) 22%, rgba(10,10,18,0.42) 58%, rgba(10,10,18,0.88) 78%, #0A0A12 92%)",
].join(", ");

export default function HeroBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);
  const [ready, setReady] = useState(false);

  // Load the clip only where it earns its bytes.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_Q);
    const reduced = window.matchMedia(REDUCED_Q);
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    const evaluate = () =>
      setAllowVideo(desktop.matches && !reduced.matches && !conn?.saveData);

    evaluate();
    desktop.addEventListener("change", evaluate);
    reduced.addEventListener("change", evaluate);
    return () => {
      desktop.removeEventListener("change", evaluate);
      reduced.removeEventListener("change", evaluate);
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

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Poster carries first paint, and is the whole backdrop on phones and
          for anyone who has asked for reduced motion. */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-[center_18%] opacity-[0.18] md:bg-[center_42%] md:opacity-[0.34]"
        style={{
          backgroundImage: "url(/hero/orchestration-poster.jpg)",
          mixBlendMode: "screen",
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      />

      {allowVideo && (
        <div
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-out"
          style={{
            opacity: ready ? 1 : 0,
            mixBlendMode: "screen",
            maskImage: MASK,
            WebkitMaskImage: MASK,
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain object-[50%_42%]"
            style={{ opacity: 0.46 }}
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

      <div className="absolute inset-0" style={{ background: SCRIM }} />
    </div>
  );
}
