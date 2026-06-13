const featured = [
  {
    num: "01 / ARCHITECTURE",
    title: "Build the structure around the constraints.",
    titleEmphasis: "structure",
    body: "Compliance windows, blackout periods, and fixed cutover dates aren't risks to route around later — they're inputs to the work breakdown structure from day one. I map every external constraint into the plan before development starts, then build float at the handoffs that absorb slippage. When a regulatory blackout or an immovable deadline arrives, it's already priced into the schedule — not a fire drill three weeks before it hits.",
  },
  {
    num: "02 / FINANCE",
    title: "Own the commercial numbers.",
    titleEmphasis: "commercial",
    body: "Most PMs treat budget-vs-scope drift as someone else's problem until it's a write-off. I track Estimate-at-Completion against delivered scope every sprint, not just at milestones — so a widening gap shows up as a conversation to have with the client now, not a loss to absorb later. A gap caught early is a change-order opportunity; a gap caught late is a margin problem with your name on it.",
  },
  {
    num: "03 / RISK",
    title: "Track what sprint velocity won't show you.",
    titleEmphasis: "velocity",
    body: "Velocity tells you the team is busy. It doesn't tell you whether you'll land on the date, or whether the client still trusts the plan. I run a second signal alongside it — a throughput-vs-runway model, or sign-off aging shared directly with client leadership — so the slip is visible while there's still runway to correct it, and the client is seeing the same data I am.",
  },
];

const ACCENT_COLORS = ["#1D4ED8", "#0891B2", "#D97706"];

export default function Approach() {
  return (
    <section id="approach" style={{ background: "#F8FAFC" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 reveal" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#1D4ED8" }}>
              05 / APPROACH
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5 text-[#0F172A]"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            How I run{" "}
            <span className="gradient-text font-normal">programs</span>.
          </h2>
        </div>

        {/* 3 featured cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((card, i) => (
            <div
              key={i}
              className="reveal p-7 rounded-2xl"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                animationDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              <span
                className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-md mb-7"
                style={{ color: ACCENT_COLORS[i], border: `1px solid ${ACCENT_COLORS[i]}40` }}
              >
                {card.num}
              </span>
              <h3 className="font-heading text-[24px] font-bold leading-tight tracking-tight mb-4 text-[#0F172A]">
                {card.title.split(card.titleEmphasis).map((part, j, arr) =>
                  j < arr.length - 1 ? (
                    <span key={j}>
                      {part}
                      <em className="not-italic" style={{ color: ACCENT_COLORS[i] }}>{card.titleEmphasis}</em>
                    </span>
                  ) : part
                )}
              </h3>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "#475569" }}>{card.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
