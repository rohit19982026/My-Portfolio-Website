import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import GithubMark from "./icons/GithubMark";

const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "GITHUB", value: "github.com/rohit19982026", href: "https://github.com/rohit19982026?tab=repositories" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-ink border-t-2 border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="05 / CONTACT"
          segments={[
            { text: "Get in", style: "fill" },
            { text: "touch.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-white/70 max-w-xl leading-relaxed mb-14">
          Email is the most reliable way to reach me. I work on fixed-price, time
          and materials, and managed retainer engagements.
        </p>

        {/* Also a builder — GitHub callout */}
        <div
          className="mb-12 p-7 sm:p-9 rounded-card relative overflow-hidden max-w-3xl"
          style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)" }}
        >
          <GithubMark
            className="absolute -right-4 -top-4 w-36 h-36 pointer-events-none"
            style={{ color: "var(--color-white)", opacity: 0.06 }}
          />
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-lime mb-3">
            ALSO A BUILDER
          </p>
          <h3 className="font-heading text-[22px] sm:text-[26px] font-bold leading-snug text-white mb-3 max-w-lg">
            Most technical project managers stop at the roadmap. I don&apos;t.
          </h3>
          <p className="text-[14.5px] text-white/70 leading-relaxed mb-6 max-w-lg">
            I write the automations and AI agents I run programs with — this site
            included. The code is public, not just the case studies.
          </p>
          <Button href="https://github.com/rohit19982026?tab=repositories" target="_blank" rel="noopener noreferrer">
            <GithubMark className="w-4 h-4 shrink-0" />
            View my repositories →
          </Button>
        </div>

        <div className="max-w-xl">
          {/* Contact info */}
          <div>
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <div key={link.label} className="flex items-center gap-4 group">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-white/45 w-20 shrink-0">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-[14px] font-semibold text-white/75 group-hover:text-lime transition-colors"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-card"
              style={{ border: "1px solid color-mix(in srgb, var(--color-lime) 30%, transparent)", background: "color-mix(in srgb, var(--color-lime) 8%, transparent)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-lime shrink-0"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-wider text-lime">
                  Open for programs
                </p>
                <p className="font-heading text-[10px] text-white/50 mt-0.5">
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
