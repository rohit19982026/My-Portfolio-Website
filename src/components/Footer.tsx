"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MapPin } from "lucide-react";

const EMAIL = "mailto:singhrohit.25119@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/";
const GITHUB = "https://github.com/rohit19982026?tab=repositories";

const INK = "#0d0d1f";
const MUTED = "#6b6880";
const LINE = "rgba(60,50,120,0.14)";


const FEATHER =
  "linear-gradient(to right, transparent 0, #000 14%, #000 100%), linear-gradient(to bottom, transparent 0, #000 14%, #000 100%)";
const FEATHER_L =
  "linear-gradient(to left, transparent 0, #000 14%, #000 100%), linear-gradient(to bottom, transparent 0, #000 14%, #000 100%)";
const maskOf = (m: string) => ({ WebkitMaskImage: m, maskImage: m, WebkitMaskComposite: "source-in", maskComposite: "intersect" }) as const;

// Soft shapes and the round icon buttons are cut from the supplied design
// (public/footer/); text, lines and small glyphs are real elements.
export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t-2 border-fg/10" style={{ background: "#fefdfb", color: INK }}>
      <Image
        src="/footer/blob-top-right.png"
        alt=""
        width={406}
        height={350}
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 w-[46%] max-w-[420px] select-none sm:w-[34%]"
        style={{ mixBlendMode: "multiply", ...maskOf(FEATHER) }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[46%] w-[60%] max-w-[560px]"
        style={{ background: "radial-gradient(70% 90% at 0% 100%, rgba(255,224,170,.55), rgba(255,214,200,.25) 55%, transparent 80%)" }}
      />
      <Image
        src="/footer/blob-bottom-left.png"
        alt=""
        width={520}
        height={152}
        aria-hidden
        className="pointer-events-none absolute bottom-[22%] left-0 hidden w-[36%] max-w-[520px] select-none lg:block"
        style={{ mixBlendMode: "multiply", ...maskOf(FEATHER_L) }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1px_0.85fr] lg:gap-14">
          {/* left */}
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center gap-3.5" aria-label="Rohit Singh, home">
              <Image src="/footer/logo-star.png" alt="" width={96} height={100} className="h-6 w-auto select-none" />
              <span className="font-sans text-[15px] font-semibold uppercase tracking-[0.2em]">Rohit.Singh</span>
            </Link>
            <h2
              className="mt-5 font-sans font-extrabold leading-[1.05] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2.4rem, 7.5vw, 4.4rem)" }}
            >
              Let&rsquo;s <span style={{ color: "#1a1aff" }}>connect</span>
              <span style={{ color: "#a8ff1a" }}>.</span>
            </h2>
            <p className="mt-4 max-w-md font-sans leading-relaxed" style={{ color: MUTED, fontSize: "clamp(1rem, 3.4vw, 1.3rem)" }}>
              Always open to interesting conversations and opportunities around data, AI and program delivery.
            </p>
            <a
              href={EMAIL}
              className="group mt-8 inline-flex h-16 w-full max-w-[28rem] items-center gap-5 rounded-full border bg-white/60 pl-7 pr-2.5 font-sans text-[18px] font-medium transition-shadow hover:shadow-[0_14px_30px_-18px_rgba(60,50,160,.45)] sm:h-[68px]"
              style={{ borderColor: LINE }}
            >
              <Mail size={24} strokeWidth={1.8} />
              <span className="flex-1">Get in touch</span>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 sm:h-[52px] sm:w-[52px]"
                style={{ background: "#e8e5fd" }}
              >
                <ArrowRight size={22} />
              </span>
            </a>
          </div>

          <span aria-hidden className="hidden lg:block" style={{ background: LINE }} />

          {/* right */}
          <div className="lg:pt-6">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#4a4766" }}>
              Find me on
            </p>
            <div className="mt-5 flex items-center gap-5">
              {[
                { href: LINKEDIN, label: "LinkedIn profile (opens in a new tab)", src: "/footer/icon-linkedin.png" },
                { href: GITHUB, label: "GitHub repositories (opens in a new tab)", src: "/footer/icon-github.png" },
              ].map((l) => (
                <a
                  key={l.src}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="block h-[58px] w-[58px] overflow-hidden rounded-full transition-transform motion-safe:hover:-translate-y-0.5 sm:h-16 sm:w-16"
                >
                  <Image src={l.src} alt="" width={100} height={102} className="h-full w-full select-none" />
                </a>
              ))}
            </div>

            <div className="mt-9 h-px" style={{ background: LINE }} />

            <p className="mt-8 font-sans text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#4a4766" }}>
              Location
            </p>
            <p className="mt-4 flex items-center gap-4 font-sans text-[17px]" style={{ color: MUTED }}>
              <MapPin size={24} strokeWidth={1.6} style={{ color: INK }} />
              <span>Bengaluru, India</span>
              <span aria-hidden className="h-6 w-px" style={{ background: LINE }} />
              <span>IST</span>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t py-6 sm:mt-20" style={{ borderColor: LINE }}>
          <p className="font-sans text-[15px]">&copy; 2026 Rohit Kumar Singh</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex min-h-11 items-center gap-3.5 font-sans text-[15px]"
            style={{ color: MUTED }}
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:-translate-y-0.5"
              style={{ background: "#e8e5fd", color: "#1a1aff" }}
            >
              <ArrowUp size={20} />
            </span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
