"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { ArrowRight, Download, ExternalLink, Eye, FileText } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import GithubMark from "./icons/GithubMark";
import ResumePreview from "./ResumePreview";
import GitHubPreview from "./GitHubPreview";

const RESUME_PATH = "/resume/Rohit-Kumar-Singh-Resume.pdf";
const RESUME_FILENAME = "Rohit-Kumar-Singh-Resume.pdf";
const PREVIEW_PATH = "/resume/preview.webp";
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
  buttonShort,
  ariaLabel,
  onPreview,
  previewLabel,
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
  buttonShort: string;
  ariaLabel: string;
  onPreview?: () => void;
  previewLabel?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col overflow-hidden rounded-[1.5rem] p-3.5 sm:rounded-[2rem] sm:p-7"
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
        className="pointer-events-none absolute -right-8 -top-6 h-24 w-24 rounded-full sm:-right-14 sm:-top-10 sm:h-52 sm:w-52"
        style={{ background: "#ebe6fc" }}
      />
      {blobBottomLeft && (
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 bottom-14 h-24 w-24 rounded-full sm:-left-16 sm:bottom-28 sm:h-44 sm:w-44"
          style={{ background: "#eeeafd" }}
        />
      )}

      <span
        className="relative flex h-10 w-10 items-center justify-center rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl"
        style={{ background: LAVENDER }}
      >
        {icon}
      </span>

      <h3
        className="relative mt-3 font-sans font-extrabold leading-none tracking-[-0.035em] sm:mt-5"
        style={{ fontSize: "clamp(1.3rem, 6vw, 3rem)" }}
      >
        {title}
      </h3>
      <p className="relative mt-1.5 font-sans font-medium leading-snug sm:mt-2" style={{ color: MUTED, fontSize: "clamp(0.72rem, 3.1vw, 1.2rem)" }}>
        {subtitle}
      </p>

      <div className="relative my-2 flex flex-1 items-center justify-center sm:my-6">
        <Image
          src={image}
          alt={imageAlt}
          width={imageSize.width}
          height={imageSize.height}
          sizes="(min-width: 640px) 330px, 80vw"
          className="h-auto w-[94%] max-w-[360px] select-none sm:w-[82%]"
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

      {onPreview && (
        <button
          type="button"
          onClick={onPreview}
          aria-haspopup="dialog"
          aria-label={previewLabel ?? "Preview"}
          className="group relative mb-2 flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.04em] transition-[transform,box-shadow,border-color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-[#bdb3ee] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5] sm:mb-3 sm:h-14 sm:gap-3 sm:text-[13.5px] sm:tracking-[0.06em]"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1.5px solid #dcd5f3",
            boxShadow: "0 10px 22px -16px rgba(110,90,200,0.55)",
            color: INK,
          }}
        >
          <Eye className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" style={{ color: "#4a2fc4" }} />
          Preview
        </button>
      )}
      <a
        href={href}
        aria-label={ariaLabel}
        {...(download ? { download } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group relative flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.04em] transition-transform motion-safe:hover:-translate-y-0.5 sm:h-16 sm:gap-4 sm:px-6 sm:text-[13.5px] sm:tracking-[0.06em]"
        style={{
          background: "linear-gradient(180deg, #e3ff66 0%, #d7ff3f 100%)",
          boxShadow: "0 14px 26px -14px rgba(160,210,0,0.9), inset 0 1px 0 rgba(255,255,255,0.6)",
          color: INK,
        }}
      >
        <span className="flex shrink-0 items-center sm:border-r sm:border-[rgba(13,13,15,0.2)] sm:pr-4">{buttonIcon}</span>
        <span className="flex-1 text-left">
          <span className="sm:hidden">{buttonShort}</span>
          <span className="hidden sm:inline">{buttonLabel}</span>
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform motion-safe:group-hover:translate-x-1 sm:h-5 sm:w-5" />
      </a>
    </motion.article>
  );
}

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [githubOpen, setGithubOpen] = useState(false);

  return (
    <section id="resume" className="relative overflow-hidden py-14 bg-surface border-t-2 border-fg/10 sm:py-24">
      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="01 / RESUME & GITHUB"
          segments={[
            { text: "Resume", style: "fill" },
            { text: "and GitHub.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed mb-8 sm:mb-12">
          Download my resume, or look through my code on GitHub.
        </p>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-6">
          <Card
            delay={0}
            inView={inView}
            icon={<FileText strokeWidth={2} className="h-5 w-5 sm:h-7 sm:w-7" style={{ color: "#2a1f8f" }} />}
            title="Resume"
            subtitle="Download my resume"
            image="/cards/resume-illustration.png"
            imageAlt="Illustration of a resume page with a download button"
            imageSize={{ width: 470, height: 430 }}
            blobBottomLeft
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            buttonIcon={<Download className="h-4 w-4 sm:h-5 sm:w-5" />}
            buttonLabel="Download resume"
            buttonShort="Download"
            ariaLabel="Download my resume as a PDF"
            onPreview={() => setPreviewOpen(true)}
            previewLabel="Preview my resume"
          />
          <Card
            delay={0.12}
            inView={inView}
            icon={<GithubMark className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: INK }} />}
            title="GitHub"
            subtitle="Explore my work"
            image="/cards/github-illustration.png"
            imageAlt="Illustration of the GitHub logo orbited by a ring"
            imageSize={{ width: 490, height: 400 }}
            href={GITHUB_URL}
            external
            buttonIcon={<ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />}
            buttonLabel="View my GitHub"
            buttonShort="GitHub"
            ariaLabel="View my GitHub repositories (opens in a new tab)"
            onPreview={() => setGithubOpen(true)}
            previewLabel="Preview my GitHub profile"
          />
        </div>
      </div>

      <AnimatePresence>
        {previewOpen && (
          <ResumePreview
            onClose={() => setPreviewOpen(false)}
            previewSrc={PREVIEW_PATH}
            pdfHref={RESUME_PATH}
            downloadName={RESUME_FILENAME}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>{githubOpen && <GitHubPreview onClose={() => setGithubOpen(false)} />}</AnimatePresence>
    </section>
  );
}
