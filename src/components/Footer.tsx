export default function Footer() {
  return (
    <footer
      className="py-12"
      style={{ background: "#080F1E", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-4 gap-8 mb-10 text-xs">
          <div>
            <p className="font-heading font-bold text-[22px] tracking-tight mb-3 text-white">
              Rohit<span style={{ color: "#60A5FA" }}>.</span>
            </p>
            <p className="font-heading leading-relaxed text-[12px]" style={{ color: "#475569" }}>
              Technical Project Manager · 5+ years · phData (Snowflake Elite Partner).
              PSM1 · ITIL certified. phData Innovation Award for AI automation.
              Bengaluru, India · working globally.
            </p>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "#334155" }}>// EXPLORE</p>
            <ul className="space-y-2">
              {[["Work", "#work"], ["Approach", "#approach"], ["Tools", "#tools"], ["Trajectory", "#trajectory"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="font-mono text-[12px] transition-colors" style={{ color: "#475569" }}
                    onMouseOver={e => (e.currentTarget.style.color = "#60A5FA")}
                    onMouseOut={e => (e.currentTarget.style.color = "#475569")}
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "#334155" }}>// CONNECT</p>
            <ul className="space-y-2">
              {[
                ["Email", "mailto:singhrohit.25119@gmail.com"],
                ["LinkedIn", "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/"],
                ["Call", "tel:+918967725119"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="font-mono text-[12px] transition-colors" style={{ color: "#475569" }}
                    onMouseOver={e => (e.currentTarget.style.color = "#60A5FA")}
                    onMouseOut={e => (e.currentTarget.style.color = "#475569")}
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "#334155" }}>// AVAILABILITY</p>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold mb-1.5" style={{ color: "#10B981" }}>
              <span className="w-2 h-2 rounded-full bg-[#10B981]" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
              Open for programs
            </div>
            <p className="font-mono text-[11px]" style={{ color: "#475569" }}>Bengaluru, India · IST</p>
            <p className="font-mono text-[11px]" style={{ color: "#475569" }}>Available globally</p>
          </div>
        </div>
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#334155" }}
        >
          <p>© 2026 ROHIT KUMAR SINGH · ALL WORK ANONYMIZED</p>
          <p>BENGALURU · IST · WORKING GLOBALLY</p>
        </div>
      </div>
    </footer>
  );
}
