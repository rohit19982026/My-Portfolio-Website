"use client";

import { motion } from "framer-motion";

const exploreLinks: [string, string][] = [
  ["Work", "#work"],
  ["Tools", "#tools"],
  ["Exposure", "#exposure"],
  ["Trajectory", "#trajectory"],
];

const connectLinks: [string, string][] = [
  ["Email", "mailto:singhrohit.25119@gmail.com"],
  ["LinkedIn", "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/"],
  ["Call", "tel:+918967725119"],
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 overflow-hidden" style={{ background: "var(--color-ink)" }}>
      <div className="absolute inset-0 console-grid pointer-events-none" />
      {/* Fade in from the light Contact section above */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #FFFFFF, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-xs">
          <div>
            <p className="font-display font-bold text-[22px] tracking-tight mb-3" style={{ color: "var(--color-ink-text)" }}>
              Rohit<span style={{ color: "#60A5FA" }}>.</span>
            </p>
            <p className="font-heading leading-relaxed text-[12px]" style={{ color: "var(--color-ink-text-2)" }}>
              Technical Project Manager · 5+ years · phData (Snowflake Elite Partner).
              PSM1 · ITIL certified. phData Innovation Award for AI automation.
              Kolkata, India · working globally.
            </p>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "#60A5FA" }}>
              // EXPLORE
            </p>
            <ul className="space-y-2">
              {exploreLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-mono text-[12px] transition-colors hover:text-[#60A5FA]"
                    style={{ color: "var(--color-ink-text-2)" }}
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "#22D3EE" }}>
              // CONNECT
            </p>
            <ul className="space-y-2">
              {connectLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-mono text-[12px] transition-colors hover:text-[#22D3EE]"
                    style={{ color: "var(--color-ink-text-2)" }}
                    target={label === "LinkedIn" ? "_blank" : undefined}
                    rel={label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  >
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "#FBBF24" }}>
              // LOCATION
            </p>
            <p className="font-mono text-[11px]" style={{ color: "var(--color-ink-text-2)" }}>Kolkata, India · IST</p>
            <p className="font-mono text-[11px]" style={{ color: "var(--color-ink-text-2)" }}>Available globally</p>
          </div>
        </div>

        {/* Terminal sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden mb-10"
          style={{ background: "var(--color-ink-2)", border: "1px solid var(--color-ink-border)" }}
        >
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--color-ink-border)" }}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F87171" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FBBF24" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#34D399" }} />
              <span className="ml-3 font-mono text-[11px]" style={{ color: "var(--color-ink-text-2)" }}>
                pmo-agents — zsh
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#34D399" }}>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#34D399", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              Open for programs
            </div>
          </div>
          <div className="px-5 py-4 font-mono text-[12px] leading-[1.9]" style={{ color: "var(--color-ink-text-2)" }}>
            <div style={{ color: "#E2E8F0" }}>rohit@pmo-agents:~$ contact --reach-out</div>
            <div>→ 6 agents idle, PM online — replies within a day, usually faster.</div>
            <div className="flex items-center gap-1" style={{ color: "#E2E8F0" }}>
              rohit@pmo-agents:~$ <span className="caret" />
            </div>
          </div>
        </motion.div>

        <div
          className="h-px w-full mb-6"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-ink-border) 20%, var(--color-ink-border) 80%, transparent)" }}
        />
        <div
          className="flex flex-col sm:flex-row justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ color: "var(--color-ink-text-2)" }}
        >
          <p>© 2026 ROHIT KUMAR SINGH · ALL WORK ANONYMIZED</p>
          <p className="pr-14 sm:pr-0">KOLKATA · IST · WORKING GLOBALLY</p>
        </div>
      </div>
    </footer>
  );
}
