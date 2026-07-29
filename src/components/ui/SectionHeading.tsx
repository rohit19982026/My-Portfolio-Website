"use client";

import { motion } from "framer-motion";

export type HeadlineSegment = { text: string; style: "fill" | "outline" | "lime" };

const sizeClamp: Record<string, string> = {
  lg: "clamp(2.25rem, 5vw, 4.5rem)",
  xl: "clamp(3rem, 7vw, 8.5rem)",
};

function segmentClass(style: HeadlineSegment["style"], tone: "dark" | "light") {
  if (style === "outline") return tone === "light" ? "text-outline-ink" : "text-outline";
  // Lime fails contrast on the paper background, so light-tone sections
  // substitute blue for the accent instead.
  if (style === "lime") return tone === "light" ? "text-blue" : "text-lime";
  return tone === "light" ? "text-ink" : "text-white";
}

export default function SectionHeading({
  eyebrow,
  segments,
  tone = "dark",
  size = "lg",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  segments: HeadlineSegment[];
  tone?: "dark" | "light";
  size?: "lg" | "xl";
  align?: "left" | "center";
  className?: string;
}) {
  const eyebrowColor = tone === "light" ? "text-blue" : "text-lime";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      <p className={`font-heading text-[11px] font-bold uppercase tracking-[0.2em] mb-5 ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <h2
        className="font-display font-normal uppercase tracking-tight leading-[0.97]"
        style={{ fontSize: sizeClamp[size] }}
      >
        {segments.map((seg, i) => (
          <span key={i} className={segmentClass(seg.style, tone)}>
            {seg.text}{" "}
          </span>
        ))}
      </h2>
    </motion.div>
  );
}
