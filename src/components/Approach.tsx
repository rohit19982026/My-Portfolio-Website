const featured = [
  {
    num: "01 / ARCHITECTURE",
    title: "I architect delivery, not manage it.",
    titleEmphasis: "architect",
    body: "On a 19-week regulated migration with a 3-week compliance blackout in the middle, a flat delivery plan would have serialised work that could run in parallel. I decomposed the WBS into 6 parallel epic tracks with explicit float at every handoff. Float held for 14 of 19 weeks. The contractual date was met on the day it was signed for.",
    highlights: ["WBS decomposition", "Parallel epic tracks", "Float allocation"],
  },
  {
    num: "02 / FINANCE",
    title: "Margin is a feature.",
    titleEmphasis: "feature",
    body: "On a $1.37M T&M program, my EAC model flagged a 74%-budget / 51%-scope gap six weeks before SOW expiry. I built the commercial case, presented to the client CFO and VP Engineering, and closed an $831K change order in 10 business days. Budget execution: 99.98% of SOW target.",
    highlights: ["EAC / ETC / CPI / SPI", "Change-order business cases", "Rate-card governance"],
  },
  {
    num: "03 / RISK",
    title: "Anticipation beats escalation.",
    titleEmphasis: "Anticipation",
    body: "On a fixed-price M&A cutover, a factory-model burndown flagged a pacing risk in week 5 with 11 weeks of runway remaining — before any engineer felt it. On a managed retainer, publishing UAT aging metrics cut sign-off from 11 days to 4. The data surfaced the problem while there was still time to act.",
    highlights: ["Leading indicators", "UAT aging metrics", "Live RAID register"],
  },
];

const failurePatterns = [
  {
    pattern: "Programs that fail on blockers",
    signal: "Nobody owns them. They age silently.",
    fix: "A live dependency register with named owners and aging counters, made the first agenda item in every steerco. 17 blockers cleared in 8 weeks — the final three through VP-level escalation triggered with data, not complaints.",
    color: "#60A5FA",
  },
  {
    pattern: "Programs that fail on scope",
    signal: "Growth arrives undocumented and unpriced.",
    fix: "Change control framework requiring every addition to carry a cost estimate, timeline impact, and risk assessment before sponsor sign-off. 14 additions processed through it. Margin protected to 99.98% of SOW target.",
    color: "#34D399",
  },
  {
    pattern: "Programs that fail on stakeholders",
    signal: "Three people, three priority lists, zero shared language.",
    fix: "A weighted intake framework — RICE-style scoring with transparent trade-off matrices visible to all stakeholders. Intake decisions went from 2 weeks to 48 hours. The PM stopped being the bottleneck.",
    color: "#22D3EE",
  },
];

const philosophy = [
  { label: "Visibility", sub: "drives alignment" },
  { label: "Alignment", sub: "drives speed" },
  { label: "Speed", sub: "drives outcomes" },
];

export default function Approach() {
  return (
    <section id="approach" style={{ background: "#0F172A" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 reveal" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#60A5FA" }}>
              02 / APPROACH
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5 text-white"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Three things I do<br />
            that <span className="gradient-text italic font-normal">most PMs don&apos;t</span>.
          </h2>
          <p className="text-[16px] max-w-2xl leading-relaxed" style={{ color: "#94A3B8" }}>
            Applied across{" "}
            <strong className="font-semibold text-white">
              fixed-price, T&amp;M, and managed-services
            </strong>{" "}
            commercials, regardless of stack or industry.
          </p>
        </div>

        {/* 3 featured cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {featured.map((card, i) => (
            <div
              key={i}
              className="reveal p-7 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                animationDelay: `${0.1 + i * 0.1}s`,
              }}
            >
              <span
                className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded mb-7"
                style={{ color: "#60A5FA", border: "1px solid rgba(96,165,250,0.3)" }}
              >
                {card.num}
              </span>
              <h3 className="font-heading text-[24px] font-bold leading-tight tracking-tight mb-4 text-white">
                {card.title.split(card.titleEmphasis).map((part, j, arr) =>
                  j < arr.length - 1 ? (
                    <span key={j}>
                      {part}
                      <em className="not-italic" style={{ color: "#60A5FA" }}>{card.titleEmphasis}</em>
                    </span>
                  ) : part
                )}
              </h3>
              <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: "#94A3B8" }}>{card.body}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ background: "rgba(96,165,250,0.12)", color: "#93C5FD" }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Failure patterns */}
        <p
          className="reveal-in font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-5"
          style={{ color: "#60A5FA", animationDelay: "0.3s" }}
        >
          // THREE PATTERNS THAT KILL PROGRAMS — AND WHAT I DO ABOUT EACH
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {failurePatterns.map((item, i) => (
            <div
              key={item.pattern}
              className="reveal p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: `3px solid ${item.color}`,
                animationDelay: `${0.35 + i * 0.08}s`,
              }}
            >
              <p className="font-heading font-bold text-[13px] text-white mb-2">{item.pattern}</p>
              <p
                className="font-mono text-[10px] font-semibold mb-3 px-2 py-1 rounded w-fit"
                style={{ color: item.color, background: `${item.color}18` }}
              >
                {item.signal}
              </p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "#94A3B8" }}>{item.fix}</p>
            </div>
          ))}
        </div>

        {/* Execution philosophy */}
        <div
          className="reveal rounded-2xl p-8 md:p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            animationDelay: "0.5s",
          }}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-7" style={{ color: "#475569" }}>
            // EXECUTION PHILOSOPHY
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {philosophy.map((item, i) => (
              <div key={item.label} className="flex items-center gap-5 md:flex-1">
                <div>
                  <p className="font-heading text-[28px] font-bold gradient-text leading-none">
                    {item.label}
                  </p>
                  <p className="font-mono text-[11px] mt-1" style={{ color: "#64748B" }}>{item.sub}</p>
                </div>
                {i < 2 && (
                  <span className="text-[28px] font-light md:mx-2" style={{ color: "#334155" }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
