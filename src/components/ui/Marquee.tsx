import Star from "./Star";

type MarqueeProps = {
  items: string[];
  variant?: "lime" | "ink" | "blue";
  reverse?: boolean;
  tilt?: boolean;
  className?: string;
};

const variantClasses: Record<string, string> = {
  lime: "bg-lime text-ink",
  ink: "bg-ink text-white border-y-2 border-white/10",
  blue: "bg-blue text-white",
};

export default function Marquee({
  items,
  variant = "lime",
  reverse = false,
  tilt = false,
  className = "",
}: MarqueeProps) {
  const strip = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center gap-5 pr-5 font-display text-2xl uppercase leading-none tracking-wide sm:gap-8 sm:pr-8 sm:text-4xl"
        >
          {item}
          <Star className="h-5 w-5 sm:h-7 sm:w-7" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative z-10 overflow-hidden py-4 sm:py-5 ${variantClasses[variant]} ${
        tilt ? "-rotate-2 scale-x-105" : ""
      } ${className}`}
    >
      <div className={`marquee-track flex w-max ${reverse ? "marquee-track-reverse" : ""}`}>
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
