"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { ArrowRight, Download, ExternalLink, FileText } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GithubMark from "./icons/GithubMark";

const RESUME_PATH = "/resume/Rohit-Kumar-Singh-Resume.pdf";
const RESUME_FILENAME = "Rohit-Kumar-Singh-Resume.pdf";
const GITHUB_URL = "https://github.com/rohit19982026?tab=repositories";

// The two cards are a fixed light "paper" design in both themes, built from
// the supplied reference: the illustrations are cropped from it
// (public/cards/*.png) and sit on a near-white card with multiply blending so
// their white background disappears and only the soft shadows remain.
const CARD_BG = "linear-gradient(180deg, #fffefd 0%, #faf7f6 100%)";
const LAVENDER = "#e9e5fb";
const INK = "#0d0d0f";
const FEATHER =
  "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)";
const MUTED = "#6b6880";

function Card({
  delay,
  inView,
  icon,
  title,
  subtitle,
  image,
  imageAlt,
  imageSize,
  blobBottomLeft,
  href,
  external,
  download,
  buttonIcon,
  buttonLabel,
  ariaLabel,
}: {
  delay: number;
  inView: boolean;
  icon: ReactNode;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  imageSize: { width: number; height: number };
  blobBottomLeft?: boolean;
  href: string;
  external?: boolean;
  download?: string;
  buttonIcon: ReactNode;
  buttonLabel: string;
  ariaLabel: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col overflow-hidden rounded-[2rem] p-6 sm:p-7"
      style={{
        background: CARD_BG,
        border: "1px solid rgba(40,30,90,0.06)",
        boxShadow: "0 28px 50px -30px rgba(110,90,200,0.45), 0 2px 0 rgba(255,255,255,0.9) inset",
        color: INK,
      }}
    >
      {/* soft lavender shapes behind the content */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-10 h-44 w-44 rounded-full sm:h-52 sm:w-52"
        style={{ background: "#ebe6fc" }}
      />
      {blobBottomLeft && (
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 bottom-28 h-44 w-44 rounded-full"
          style={{ background: "#eeeafd" }}
        />
      )}

      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
        style={{ background: LAVENDER }}
      >
        {icon}
      </span>

      <h3
        className="relative mt-5 font-sans font-extrabold leading-none tracking-[-0.035em]"
        style={{ fontSize: "clamp(2.1rem, 8vw, 3rem)" }}
      >
        {title}
      </h3>
      <p className="relative mt-2 font-sans font-medium" style={{ color: MUTED, fontSize: "clamp(1rem, 4vw, 1.2rem)" }}>
        {subtitle}
      </p>

      <div className="relative my-4 flex flex-1 items-center justify-center sm:my-6">
        <Image
          src={image}
          alt={imageAlt}
          width={imageSize.width}
          height={imageSize.height}
          sizes="(min-width: 640px) 330px, 80vw"
          className="h-auto w-[82%] max-w-[360px] select-none"
          style={{
            mixBlendMode: "multiply",
            // feather every edge so the crop's own background never shows as a box
            WebkitMaskImage: FEATHER,
            maskImage: FEATHER,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />
      </div>

      <a
        href={href}
        aria-label={ariaLabel}
        {...(download ? { download } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group relative flex h-14 items-center gap-3 whitespace-nowrap rounded-full px-5 font-sans text-[12.5px] font-bold uppercase tracking-[0.06em] transition-transform motion-safe:hover:-translate-y-0.5 sm:h-16 sm:gap-4 sm:px-6 sm:text-[13.5px]"
        style={{
          background: "linear-gradient(180deg, #e3ff66 0%, #d7ff3f 100%)",
          boxShadow: "0 14px 26px -14px rgba(160,210,0,0.9), inset 0 1px 0 rgba(255,255,255,0.6)",
          color: INK,
        }}
      >
        <span className="flex shrink-0 items-center pr-3 sm:pr-4" style={{ borderRight: "1px solid rgba(13,13,15,0.2)" }}>
          {buttonIcon}
        </span>
        <span className="flex-1 text-left">{buttonLabel}</span>
        <ArrowRight size={20} className="shrink-0 transition-transform motion-safe:group-hover:translate-x-1" />
      </a>
    </motion.article>
  );
}

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" className="relative overflow-hidden py-24 bg-surface border-t-2 border-fg/10">
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 / RESUME & CODE"
          segments={[
            { text: "The resume.", style: "fill" },
            { text: "The code.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed mb-12">
          Everything on one page if you&apos;d rather read it that way, and where my code lives on GitHub.
        </p>

        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2 sm:gap-6">
          <Card
            delay={0}
            inView={inView}
            icon={<FileText size={28} strokeWidth={2} style={{ color: "#2a1f8f" }} />}
            title="Resume"
            subtitle="Download my resume"
            image="/cards/resume-illustration.png"
            imageAlt="Illustration of a resume page with a download button"
            imageSize={{ width: 470, height: 430 }}
            blobBottomLeft
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            buttonIcon={<Download size={20} />}
            buttonLabel="Download resume"
            ariaLabel="Download my resume as a PDF"
          />
          <Card
            delay={0.12}
            inView={inView}
            icon={<GithubMark className="h-8 w-8" style={{ color: INK }} />}
            title="GitHub"
            subtitle="Explore my work"
            image="/cards/github-illustration.png"
            imageAlt="Illustration of the GitHub logo orbited by a ring"
            imageSize={{ width: 490, height: 400 }}
            href={GITHUB_URL}
            external
            buttonIcon={<ExternalLink size={20} />}
            buttonLabel="View my GitHub"
            ariaLabel="View my GitHub repositories (opens in a new tab)"
          />
        </div>
      </div>
    </section>
  );
}
