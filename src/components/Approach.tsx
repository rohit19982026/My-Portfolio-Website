const featured = [
  {
    num: "01 / ARCHITECTURE",
    title: "Delivery structure over delivery hope.",
    titleEmphasis: "structure",
    body: "On a 19-week regulated migration with a 3-week compliance blackout in the middle, a flat delivery plan would have serialised work that could run in parallel. I decomposed the WBS into 6 parallel epic tracks with explicit float at every handoff. Float held for 14 of 19 weeks. The contractual date was met on the day it was signed for.",
  },
  {
    num: "02 / FINANCE",
    title: "The commercial model is part of the job.",
    titleEmphasis: "commercial",
    body: "On a $1.37M T&M program, my EAC model flagged a 74%-budget / 51%-scope gap six weeks before SOW expiry. I built the commercial case, presented to the client CFO and VP Engineering, and closed an $831K change order in 10 business days. Budget execution: 99.98% of SOW target.",
  },
  {
    num: "03 / RISK",
    title: "Catching risk early.",
    titleEmphasis: "early",
    body: "On a fixed-price M&A cutover, a factory-model burndown flagged a pacing risk in week 5 with 11 weeks of runway remaining — before any engineer felt it. On a managed retainer, publishing UAT aging metrics cut sign-off from 11 days to 4. The data surfaced the problem while there was still time to act.",
  },
];

export default function Approach() {
  return (
    <section id="approach" style={{ background: "#F7F4FF" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 reveal" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#7C3AED" }}>
              02 / APPROACH
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5 text-[#1A0A2E]"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            How I run{" "}
            <span className="gradient-text italic font-normal">programs</span>.
          </h2>
        </div>

        {/* 3 featured cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((card, i) => (
            <div
              key={i}
              className="reveal p-7 rounded-2xl"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(124,58,237,0.12)",
                animationDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              <span
                className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded mb-7"
                style={{ color: "#7C3AED", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                {card.num}
              </span>
              <h3 className="font-heading text-[24px] font-bold leading-tight tracking-tight mb-4 text-[#1A0A2E]">
                {card.title.split(card.titleEmphasis).map((part, j, arr) =>
                  j < arr.length - 1 ? (
                    <span key={j}>
                      {part}
                      <em className="not-italic" style={{ color: "#7C3AED" }}>{card.titleEmphasis}</em>
                    </span>
                  ) : part
                )}
              </h3>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "#3D3358" }}>{card.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
