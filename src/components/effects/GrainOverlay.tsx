// Plain alpha noise, not mix-blend-mode: a full-screen blended layer forces the
// browser to re-blend the whole viewport whenever anything beneath it repaints,
// which made every scroll-driven effect on the page cost double. The noise is
// white at a few percent, so the look is the same.
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 100,
        opacity: 0.35,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='3'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
