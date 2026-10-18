import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import GithubMark from "./icons/GithubMark";

const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh-a61746156", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "GITHUB", value: "github.com/rohit19982026", href: "https://github.com/rohit19982026?tab=repositories" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface border-t-2 border-fg/10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="06 / CONTACT"
          segments={[
            { text: "Get in", style: "fill" },
            { text: "touch.", style: "lime" },
          ]}
          className="mb-5"
        />
        <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed mb-14">
          I&apos;m looking for my next Technical Project or Program Manager role in data
          and AI. Email is the quickest way to reach me.
        </p>

        {/* Also a builder — GitHub callout */}
        <div
          className="mb-12 p-7 sm:p-9 rounded-card relative overflow-hidden max-w-3xl"
          style={{ border: "1px solid var(--color-card-border)", background: "var(--color-card)" }}
        >
          <GithubMark
            className="absolute -right-4 -top-4 w-36 h-36 pointer-events-none"
            style={{ color: "var(--color-fg)", opacity: 0.06 }}
          />
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-3">
            ALSO A BUILDER
          </p>
          <h3 className="font-heading text-[22px] sm:text-[26px] font-bold leading-snug text-fg mb-3 max-w-lg">
            I build things outside work too.
          </h3>
          <p className="text-[14.5px] text-fg/70 leading-relaxed mb-6 max-w-lg">
            This site, and an online store running on Vercel and Supabase, both built
            with Claude Code. The code for this site is on GitHub.
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
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-fg/45 w-20 shrink-0">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-[14px] font-semibold text-fg/75 group-hover:text-accent transition-colors"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-card"
              style={{ border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)", background: "color-mix(in srgb, var(--color-accent) 8%, transparent)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: "var(--color-accent)", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent">
                  Open to new roles
                </p>
                <p className="font-heading text-[10px] text-fg/50 mt-0.5">
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
