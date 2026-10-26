import type { CSSProperties } from "react";

export type HeadlineSegment = { text: string; style: "fill" | "outline" | "lime" };

const sizeClamp: Record<string, string> = {
  lg: "clamp(2.25rem, 5vw, 4.5rem)",
  xl: "clamp(3rem, 7vw, 8.5rem)",
};

type Word = { text: string; accent: boolean; outline: boolean };

function words(segments: HeadlineSegment[]): Word[] {
  return segments.flatMap((seg) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, accent: seg.style === "lime", outline: seg.style === "outline" }))
  );
}

/** The shared section headline. Words rise out of a mask in sequence as the
 *  heading crosses the reading line, and the accent word is drawn hollow, then
 *  fills with colour left to right a little later (all scrubbed by scroll, see
 *  lib/flow.ts). Static markup is the finished heading, so with no motion it is
 *  just a heading.
 *
 *  `variant="display"` is the Anton uppercase look; `variant="sans"` is the
 *  extrabold sans used by the lighter sections, with explicit colours. */
export default function SectionHeading({
  eyebrow,
  segments,
  tone = "dark",
  size = "lg",
  align = "left",
  className = "",
  variant = "display",
  ink,
  accent,
  fontSize,
  eyebrowColor,
  as: Tag = "h2",
  tail,
}: {
  eyebrow?: string;
  segments: HeadlineSegment[];
  tone?: "dark" | "light";
  size?: "lg" | "xl";
  align?: "left" | "center";
  className?: string;
  variant?: "display" | "sans";
  ink?: string;
  accent?: string;
  fontSize?: string;
  eyebrowColor?: string;
  as?: "h1" | "h2";
  /** Punctuation set in its own colour on the last word, e.g. the lime full stop. */
  tail?: { text: string; color: string };
}) {
  const list = words(segments);
  const inkColor = ink ?? (tone === "light" ? "var(--color-ink)" : "var(--color-fg)");
  const accentColor = accent ?? (tone === "light" ? "var(--color-blue)" : "var(--color-accent)");
  const eyebrowTone = eyebrowColor ?? (tone === "light" ? "var(--color-blue)" : "var(--color-accent)");
  const display = variant === "display";

  return (
    <div
      data-flow="head"
      style={{ "--n": list.length } as CSSProperties}
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p
          className={
            display
              ? "mb-5 flex items-center gap-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em]"
              : "mb-4 flex items-center gap-4 font-sans text-[12px] font-semibold uppercase tracking-[0.24em] sm:text-[13px]"
          }
          style={{ color: display ? eyebrowTone : eyebrowColor ?? "#6b7083" }}
        >
          <span aria-hidden className="fe-line block h-[2px] w-9" style={{ background: display ? eyebrowTone : accentColor }} />
          <span>{eyebrow}</span>
        </p>
      )}
      <Tag
        className={display ? "heading-display" : "font-sans font-extrabold leading-[1.05] tracking-[-0.035em]"}
        style={{ fontSize: fontSize ?? sizeClamp[size], color: inkColor }}
      >
        {list.map((w, i) => (
          <span key={i}>
            <span className="hw" style={{ "--i": i } as CSSProperties}>
              <span className="hw-in">
                {w.accent ? (
                  <span className="fw" style={{ "--ac": accentColor } as CSSProperties}>
                    <span className="fw-base">{w.text}</span>
                    <span className="fw-fill" aria-hidden="true">
                      {w.text}
                    </span>
                  </span>
                ) : (
                  <span className={w.outline ? (tone === "light" ? "text-outline-ink" : "text-outline") : undefined}>
                    {w.text}
                  </span>
                )}
                {tail && i === list.length - 1 && <span style={{ color: tail.color }}>{tail.text}</span>}
              </span>
            </span>{" "}
          </span>
        ))}
      </Tag>
    </div>
  );
}
