export default function Footer() {
  return (
    <footer className="py-12 bg-[#F8FAFC] relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 20%, #E2E8F0 80%, transparent)" }}
      />
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-xs">
          <div>
            <p className="font-display font-bold text-[#0F172A] text-[22px] tracking-tight mb-3">
              Rohit<span className="text-[#1D4ED8]">.</span>
            </p>
            <p className="font-heading text-[#94A3B8] leading-relaxed text-[12px]">
              Technical Project Manager · 5+ years · phData (Snowflake Elite Partner).
              PSM1 · ITIL certified. phData Innovation Award for AI automation.
              Kolkata, India · working globally.
            </p>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest text-[#94A3B8] mb-3 text-[10px]">
              // EXPLORE
            </p>
            <ul className="space-y-2">
              {[["Work", "#work"], ["Tools", "#tools"], ["Exposure", "#exposure"], ["Trajectory", "#trajectory"]].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-mono text-[12px] text-[#94A3B8] hover:text-[#1D4ED8] transition-colors"
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest text-[#94A3B8] mb-3 text-[10px]">
              // CONNECT
            </p>
            <ul className="space-y-2">
              {[
                ["Email", "mailto:singhrohit.25119@gmail.com"],
                ["LinkedIn", "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/"],
                ["Call", "tel:+918967725119"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-mono text-[12px] text-[#94A3B8] hover:text-[#1D4ED8] transition-colors"
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest text-[#94A3B8] mb-3 text-[10px]">
              // AVAILABILITY
            </p>
            <div
              className="flex items-center gap-2 font-mono text-[11px] font-bold mb-1.5"
              style={{ color: "#059669" }}
            >
              <span
                className="w-2 h-2 rounded-full bg-[#6EE7B7]"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              Open for programs
            </div>
            <p className="font-mono text-[11px] text-[#94A3B8]">Kolkata, India · IST</p>
            <p className="font-mono text-[11px] text-[#94A3B8]">Available globally</p>
          </div>
        </div>
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] text-[#94A3B8] uppercase tracking-[0.16em]"
          style={{ borderTop: "1px solid #E2E8F0" }}
        >
          <p>© 2026 ROHIT KUMAR SINGH · ALL WORK ANONYMIZED</p>
          <p>KOLKATA · IST · WORKING GLOBALLY</p>
        </div>
      </div>
    </footer>
  );
}
