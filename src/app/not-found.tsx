import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-bg">
      <div className="mb-6 font-display text-7xl font-bold gradient-text">404</div>
      <h1 className="font-display text-2xl font-bold text-text mb-3">
        This page doesn&apos;t exist
      </h1>
      <p className="text-text-2 mb-8 max-w-sm leading-relaxed">
        The link may be out of date, or the page has been removed.
      </p>
      <Link
        href="/"
        className="px-7 py-3 rounded-full font-heading text-[12px] font-bold uppercase tracking-[0.12em] text-bg transition-all duration-200 hover:brightness-110"
        style={{ background: "var(--color-accent)", boxShadow: "0 0 24px color-mix(in srgb, var(--color-accent) 30%, transparent)" }}
      >
        Back to home
      </Link>
    </div>
  );
}
