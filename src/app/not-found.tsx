import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#0A0A12]">
      <div className="mb-6 font-display text-7xl font-bold gradient-text">404</div>
      <h1 className="font-display text-2xl font-bold text-[#EDE9FE] mb-3">
        This page doesn&apos;t exist
      </h1>
      <p className="text-[#A8A4C7] mb-8 max-w-sm leading-relaxed">
        The link may be out of date, or the page has been removed.
      </p>
      <Link
        href="/"
        className="px-7 py-3 rounded-full font-heading text-[12px] font-bold uppercase tracking-[0.12em] text-[#0A0A12] transition-all duration-200 hover:brightness-110"
        style={{ background: "#A78BFA", boxShadow: "0 0 24px rgba(167,139,250,0.3)" }}
      >
        Back to home
      </Link>
    </div>
  );
}
