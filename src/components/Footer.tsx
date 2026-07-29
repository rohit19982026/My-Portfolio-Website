export default function Footer() {
  return (
    <footer className="py-12 bg-ink border-t-2 border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-4 gap-8 mb-10 text-xs">
          <div>
            <p className="font-display text-white text-[22px] tracking-tight mb-3">
              Rohit<span className="text-lime">.</span>
            </p>
            <p className="font-heading text-white/50 leading-relaxed text-[12px]">
              Technical Project Manager at phData — data and AI delivery for enterprise
              clients. Six years in delivery. PSM1 · ITIL · phData Innovation Award. Bengaluru.
            </p>
          </div>
          <div>
            <p className="font-heading font-bold uppercase tracking-widest text-white/50 mb-3 text-[10px]">EXPLORE</p>
            <ul className="space-y-2">
              {[["Experience", "#experience"], ["Work", "#work"], ["Tools", "#tools"], ["Stack", "#stack"]].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-heading text-[12px] text-white/50 hover:text-lime transition-colors"
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading font-bold uppercase tracking-widest text-white/50 mb-3 text-[10px]">CONNECT</p>
            <ul className="space-y-2">
              {[
                ["Email", "mailto:singhrohit.25119@gmail.com"],
                ["LinkedIn", "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/"],
                ["Call", "tel:+918967725119"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-heading text-[12px] text-white/50 hover:text-lime transition-colors"
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading font-bold uppercase tracking-widest text-white/50 mb-3 text-[10px]">AVAILABILITY</p>
            <div
              className="flex items-center gap-2 font-heading text-[11px] font-bold mb-1.5"
              style={{ color: "var(--color-lime)" }}
            >
              <span
                className="w-2 h-2 rounded-full bg-lime"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              Open for programs
            </div>
            <p className="font-heading text-[11px] text-white/50">Bengaluru, India · IST</p>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-2 font-heading text-[10px] text-white/45 uppercase tracking-[0.16em] border-t border-white/10">
          <p>© 2026 ROHIT KUMAR SINGH · ALL WORK ANONYMIZED</p>
          <p>BENGALURU · IST · WORKING GLOBALLY</p>
        </div>
      </div>
    </footer>
  );
}
