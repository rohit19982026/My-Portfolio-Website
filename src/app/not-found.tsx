import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
      <div className="mb-6 text-7xl font-heading font-bold gradient-text">404</div>
      <h1 className="font-heading text-2xl font-bold text-[#111827] mb-3">
        Page not found
      </h1>
      <p className="text-[#6b7280] mb-8 max-w-sm">
        This page doesn&apos;t exist — but the portfolio does. Head back home.
      </p>
      <Link
        href="/"
        className="px-7 py-3 rounded-full text-white font-semibold gradient-bg hover:opacity-90 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  );
}
