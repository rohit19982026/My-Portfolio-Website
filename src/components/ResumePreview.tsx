"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PreviewModal, { EASE, INK, MUTED } from "./PreviewModal";

/*
 * The resume, previewed in a popup. It shows a rendered image of the page
 * (public/resume/preview.webp, made by scripts/resume-preview.sh) instead of
 * embedding the PDF, because phones don't display embedded PDFs.
 */

type Props = {
  onClose: () => void;
  previewSrc: string;
  pdfHref: string;
  downloadName: string;
};

export default function ResumePreview({ onClose, previewSrc, pdfHref, downloadName }: Props) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <PreviewModal
      onClose={onClose}
      title="Resume"
      subtitle="Preview"
      subtitleDesktopOnly="Rohit Kumar Singh"
      actions={
        <a
          href={pdfHref}
          download={downloadName}
          className="inline-flex h-10 items-center gap-2 rounded-full px-4 font-sans text-[12px] font-bold uppercase tracking-[0.05em] transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d36f5]"
          style={{ background: "linear-gradient(180deg, #e3ff66 0%, #d7ff3f 100%)", color: INK, boxShadow: "0 10px 20px -12px rgba(160,210,0,0.9)" }}
        >
          <Download size={15} />
          Download
        </a>
      }
    >
      <div className="px-3 py-4 sm:px-8 sm:py-6">
        {failed ? (
          <div className="mx-auto max-w-sm py-16 text-center font-sans" style={{ color: MUTED }}>
            <p className="text-[15px]">The preview couldn&apos;t load.</p>
            <p className="mt-2 text-[14px]">You can still open or download the PDF.</p>
          </div>
        ) : (
          <motion.div
            className="relative mx-auto max-w-[640px] overflow-hidden rounded-[6px] bg-white"
            style={{ transformPerspective: 1400, boxShadow: "0 24px 48px -26px rgba(30,20,90,0.5), 0 2px 6px rgba(30,20,90,0.1)" }}
            initial={reduce ? false : { opacity: 0, y: 14, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: reduce ? 0 : 0.14 }}
          >
            <Image
              src={previewSrc}
              alt="Preview of Rohit Kumar Singh's resume, one page"
              width={1400}
              height={1980}
              sizes="(min-width: 640px) 640px, 94vw"
              priority
              className="block h-auto w-full select-none"
              onError={() => setFailed(true)}
            />
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3"
                style={{ background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.7), transparent)" }}
                initial={{ x: "-120%" }}
                animate={{ x: "420%" }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 0.55 }}
              />
            )}
          </motion.div>
        )}

        <p className="mx-auto mt-5 max-w-[640px] text-center font-sans text-[13px]" style={{ color: MUTED }}>
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-[#3d36f5]/40 underline-offset-4 hover:text-[#3d36f5]"
          >
            Open the PDF in a new tab <ExternalLink size={13} />
          </a>
        </p>
      </div>
    </PreviewModal>
  );
}
