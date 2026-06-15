import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gradient-mesh">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: "var(--color-accent)" }}>
        404 — ROUTE NOT FOUND
      </p>
      <div className="mb-6 text-7xl font-heading font-bold gradient-text">404</div>
      <h1 className="font-heading text-2xl font-bold mb-3" style={{ color: "var(--color-text)" }}>
        Page not found
      </h1>
      <p className="mb-8 max-w-sm" style={{ color: "var(--color-text-secondary)" }}>
        This route isn&apos;t on the map — but the rest of the portfolio is. Head back home.
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
