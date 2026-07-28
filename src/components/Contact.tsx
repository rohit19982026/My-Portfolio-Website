const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "GITHUB", value: "github.com/rohit19982026", href: "https://github.com/rohit19982026?tab=repositories" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

function GithubMark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}


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

        {/* Also a builder — GitHub callout */}
        <div
          className="mb-12 p-7 sm:p-9 rounded-2xl relative overflow-hidden max-w-3xl"
          style={{
            border: "1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)",
            background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 7%, transparent), color-mix(in srgb, var(--color-pink) 4%, transparent))",
          }}
        >
          <GithubMark
            className="absolute -right-4 -top-4 w-36 h-36 pointer-events-none"
            style={{ color: "var(--color-text)", opacity: 0.05 }}
          />
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-3">
            ALSO A BUILDER
          </p>
          <h3 className="font-display text-[26px] sm:text-[30px] font-bold leading-tight tracking-tight text-text mb-3 max-w-lg">
            Most technical project managers stop at the roadmap. I don&apos;t.
          </h3>
          <p className="text-[14.5px] text-text-2 leading-relaxed mb-6 max-w-lg">
            I write the automations and AI agents I run programs with — this site
            included. The code is public, not just the case studies.
          </p>
          <a
            href="https://github.com/rohit19982026?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-heading text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:brightness-110"
            style={{ background: "var(--color-text)", color: "var(--color-bg)" }}
          >
            <GithubMark className="w-4 h-4 shrink-0" />
            View my repositories →
          </a>
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
