const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

const engagements = [
  {
    label: "PLATFORM MIGRATION",
    text: "Redshift → Databricks, SQL Server → Snowflake, Hadoop → Snowflake — scoped, governed, and delivered.",
  },
  {
    label: "PROGRAM RESCUE",
    text: "Stalled delivery, missing governance, budget overrun risk, or stakeholder misalignment — I've fixed all of them.",
  },
  {
    label: "MANAGED POD",
    text: "Ongoing data engineering retainer with embedded PMO governance, financial oversight, and renewal track record.",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0D2456 0%, #0F172A 60%)" }}
    >
      {/* Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "#2563EB",
          opacity: 0.08,
          filter: "blur(100px)",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-14 reveal" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#60A5FA" }}>
              05 / LET&apos;S BUILD SOMETHING
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5 text-white"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Got a{" "}
            <span className="gradient-text italic font-normal">complex</span>
            <br />data &amp; AI program?
          </h2>
          <p className="text-[16px] max-w-xl leading-relaxed" style={{ color: "#94A3B8" }}>
            Whether it&apos;s a platform migration, a program rescue, or a managed delivery
            engagement — reach out directly and I&apos;ll respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Contact links */}
          <div className="reveal" style={{ animationDelay: "0.15s" }}>
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <div key={link.label} className="flex items-center gap-4 group">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] w-20 shrink-0" style={{ color: "#475569" }}>
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-[14px] font-semibold transition-colors"
                    style={{ color: "#94A3B8" }}
                    onMouseOver={e => (e.currentTarget.style.color = "#ffffff")}
                    onMouseOut={e => (e.currentTarget.style.color = "#94A3B8")}
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#10B981]">
                  OPEN FOR PROGRAMS
                </p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: "#475569" }}>
                  Bengaluru, India · IST · Available globally
                </p>
              </div>
            </div>
          </div>

          {/* Engagement cards + CTA */}
          <div className="reveal space-y-3" style={{ animationDelay: "0.2s" }}>
            {engagements.map((card, i) => (
              <div
                key={card.label}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  animationDelay: `${0.25 + i * 0.07}s`,
                }}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: "#60A5FA" }}>
                  {card.label}
                </p>
                <p className="text-[13px] leading-relaxed" style={{ color: "#94A3B8" }}>{card.text}</p>
              </div>
            ))}

            <a
              href="mailto:singhrohit.25119@gmail.com"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-mono font-bold text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-90 mt-1"
              style={{ background: "#ffffff", color: "#0F172A" }}
            >
              Email Me Directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
