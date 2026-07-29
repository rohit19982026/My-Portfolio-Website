import Star from "./Star";

const toneClasses: Record<string, string> = {
  blue: "bg-blue text-outline-lime",
  lime: "bg-ink text-outline-lime",
  white: "bg-ink text-outline",
};

export default function CardCover({
  number,
  label,
  tone = "blue",
  size = "lg",
  className = "",
}: {
  number: string;
  label: string;
  tone?: "blue" | "lime" | "white";
  size?: "sm" | "lg";
  className?: string;
}) {
  if (size === "sm") {
    return (
      <div
        className={`relative flex flex-col items-center justify-center shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-card overflow-hidden ${toneClasses[tone]} ${className}`}
      >
        <Star className="star-spin h-3 w-3 text-lime absolute top-1.5 right-1.5" />
        <p className="font-display text-[26px] sm:text-[30px] leading-none">{number}</p>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center gap-3 py-10 px-6 overflow-hidden ${toneClasses[tone]} ${className}`}>
      <Star className="star-spin h-6 w-6 text-lime absolute top-4 right-4" />
      <p className="font-display text-[64px] sm:text-[88px] leading-none">{number}</p>
      <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">{label}</p>
    </div>
  );
}
