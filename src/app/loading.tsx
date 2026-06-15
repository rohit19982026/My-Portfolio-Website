export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg)" }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-heading font-bold text-lg"
        >
          R
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--color-accent)",
                animation: "pulse-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
