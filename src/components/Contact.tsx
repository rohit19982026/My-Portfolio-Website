const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];


export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 65%), var(--color-bg)",
        borderTop: "1px solid color-mix(in srgb, var(--color-accent) 14%, transparent)",
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "var(--color-glow)",
          opacity: "calc(var(--orb-opacity) * 0.67)",
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
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              05 / CONTACT
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Get in <span className="gradient-text font-normal">touch</span>.
          </h2>
          <p className="text-[16px] text-text-2 max-w-xl leading-relaxed">
            Email is the most reliable way to reach me. I work on fixed-price, time
            and materials, and managed retainer engagements.
          </p>
        </div>

        <div className="max-w-xl">
          {/* Contact info */}
          <div>
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <div key={link.label} className="flex items-center gap-4 group">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-text-3 w-20 shrink-0">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-[14px] font-semibold text-text-2 group-hover:text-accent transition-colors"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{ border: "1px solid color-mix(in srgb, var(--color-mint) 25%, transparent)", background: "color-mix(in srgb, var(--color-mint) 6%, transparent)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-mint shrink-0"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-wider text-mint">
                  Open for programs
                </p>
                <p className="font-heading text-[10px] text-text-3 mt-0.5">
                  Bengaluru, India · IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
