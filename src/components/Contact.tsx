const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

const engagementTypes = [
  { label: "Fixed-Price Program", desc: "Defined scope, hard deadline, margin matters" },
  { label: "Time & Materials", desc: "Ongoing delivery, evolving scope" },
  { label: "Managed Services / Pod", desc: "Embedded team, retainer model" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.18), transparent 65%), #0A0A12",
        borderTop: "1px solid rgba(167,139,250,0.14)",
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "#8B5CF6",
          opacity: 0.08,
          filter: "blur(80px)",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              06 / LET&apos;S BUILD SOMETHING
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Got a <span className="gradient-text italic font-normal">complex</span>
            <br />data &amp; AI program?
          </h2>
          <p className="text-[16px] text-[#A8A4C7] max-w-xl leading-relaxed">
            Let&apos;s talk. Whether it&apos;s a platform migration, a program rescue, or a
            managed delivery engagement — I&apos;d rather understand the problem first.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Contact info */}
          <div>
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <div key={link.label} className="flex items-center gap-4 group">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B8A] w-20 shrink-0">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-[14px] font-semibold text-[#A8A4C7] group-hover:text-[#A78BFA] transition-colors"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{ border: "1px solid rgba(110,231,183,0.25)", background: "rgba(110,231,183,0.06)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#6EE7B7] shrink-0"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6EE7B7]">
                  ● OPEN FOR PROGRAMS
                </p>
                <p className="font-mono text-[10px] text-[#6B6B8A] mt-0.5">
                  Bengaluru, India · IST · Available globally
                </p>
              </div>
            </div>
          </div>

          {/* Engagement types + CTA */}
          <div className="space-y-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A78BFA] mb-4">
              // I WORK ON
            </p>
            {engagementTypes.map((type) => (
              <div
                key={type.label}
                className="p-4 rounded-xl"
                style={{ border: "1px solid rgba(167,139,250,0.14)", background: "#1B1B2A" }}
              >
                <p className="font-heading text-[14px] font-semibold text-[#EDE9FE] mb-1">{type.label}</p>
                <p className="font-mono text-[11px] text-[#6B6B8A]">{type.desc}</p>
              </div>
            ))}

            <a
              href="mailto:singhrohit.25119@gmail.com"
              className="mt-6 w-full flex items-center justify-center py-3.5 rounded-full font-mono font-bold text-[12px] uppercase tracking-[0.12em] text-[#0A0A12] transition-all duration-200 hover:brightness-110"
              style={{ background: "#A78BFA", boxShadow: "0 0 24px rgba(167,139,250,0.3)" }}
            >
              Email me directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
