export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#e5e7eb] bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-4 gap-8 mb-10 text-xs">
          <div>
            <p className="font-bold uppercase tracking-widest text-[#111827] mb-3">Rohit.</p>
            <p className="text-[#6b7280] leading-relaxed">
              Technical Project Manager. Data & AI delivery. Builder of agents and skills
              that compound throughput. Based in Bengaluru, working globally.
            </p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest text-[#6b7280] mb-3">// EXPLORE</p>
            <ul className="space-y-2">
              {[["Work", "#work"], ["Approach", "#approach"], ["Tools", "#tools"], ["Exposure", "#exposure"]].map(([label, href]) => (
                <li key={label}><a href={href} className="text-[#6b7280] hover:text-[#2563eb] transition-colors">→ {label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest text-[#6b7280] mb-3">// CONNECT</p>
            <ul className="space-y-2">
              {[
                ["Email", "mailto:rsingh@phdata.io"],
                ["LinkedIn", "#"],
                ["GitHub", "#"],
                ["Call", "tel:+918967725119"],
              ].map(([label, href]) => (
                <li key={label}><a href={href} className="text-[#6b7280] hover:text-[#2563eb] transition-colors">→ {label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest text-[#6b7280] mb-3">// AVAILABILITY</p>
            <div className="flex items-center gap-2 text-[#10b981] font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              Open for programs
            </div>
            <p className="text-[#6b7280]">Bengaluru, India · IST</p>
            <p className="text-[#6b7280]">Available globally</p>
          </div>
        </div>
        <div className="pt-6 border-t border-[#e5e7eb] flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#9ca3af]">
          <p>© 2026 ROHIT KUMAR SINGH · ALL WORK ANONYMIZED</p>
          <p>PORTFOLIO · MMXXVI</p>
        </div>
      </div>
    </footer>
  );
}
