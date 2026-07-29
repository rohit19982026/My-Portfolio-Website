export default function ArrowCircle({ open = false, className = "" }: { open?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-white/25 text-white transition-all duration-[var(--duration-base)] group-hover:border-lime group-hover:text-lime shrink-0 ${className}`}
      style={{ transform: open ? "rotate(45deg)" : "none" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
      </svg>
    </span>
  );
}
