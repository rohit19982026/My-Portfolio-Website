"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot } from "lucide-react";
import GlassSurface from "./GlassSurface";

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
    <footer className="relative pt-24 pb-10 overflow-hidden section-alt">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-xs">
          <div>
            <p className="font-heading font-bold text-[22px] tracking-tight mb-3" style={{ color: "var(--color-text)" }}>
              Rohit<span style={{ color: "var(--color-accent)" }}>.</span>
            </p>
            <p className="leading-relaxed text-[12px]" style={{ color: "var(--color-text-secondary)" }}>
              Technical Project Manager · 5+ years · phData (Snowflake Elite Partner).
              PSM1 · ITIL certified. phData Innovation Award for AI automation.
              Kolkata, India · working globally.
            </p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "var(--color-accent)" }}>
              Explore
            </p>
            <ul className="space-y-2">
              {exploreLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 text-[12px] transition-colors hover-blue"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "var(--color-teal)" }}>
              Connect
            </p>
            <ul className="space-y-2">
              {connectLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 text-[12px] transition-colors hover-blue"
                    style={{ color: "var(--color-text-secondary)" }}
                    target={label === "LinkedIn" ? "_blank" : undefined}
                    rel={label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest mb-3 text-[10px]" style={{ color: "var(--color-orange)" }}>
              Location
            </p>
            <p className="text-[11px]" style={{ color: "var(--color-text-secondary)" }}>Kolkata, India · IST</p>
            <p className="text-[11px]" style={{ color: "var(--color-text-secondary)" }}>Available globally</p>
          </div>
        </div>

        {/* Status card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <GlassSurface radius="lg" className="flex items-center gap-4 px-5 py-4">
            <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(48,209,88,0.1)" }}>
              <Bot size={18} strokeWidth={2} style={{ color: "var(--color-green)" }} />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-green)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }} />
                Open for programs
              </div>
              <p className="text-[12px] mt-1" style={{ color: "var(--color-text-secondary)" }}>
                6 agents idle, PM online — replies within a day, usually faster.
              </p>
            </div>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider hover-blue"
              style={{ color: "var(--color-accent)" }}
            >
              Say hello <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </GlassSurface>
        </motion.div>

        <div
          className="h-px w-full mb-6"
          style={{ background: "linear-gradient(90deg, transparent, var(--glass-border) 20%, var(--glass-border) 80%, transparent)" }}
        />
        <div
          className="flex flex-col sm:flex-row justify-between gap-2 text-[10px] uppercase tracking-[0.16em]"
          style={{ color: "var(--color-faint)" }}
        >
          <p>© 2026 ROHIT KUMAR SINGH · ALL WORK ANONYMIZED</p>
          <p className="pr-14 sm:pr-0">KOLKATA · IST · WORKING GLOBALLY</p>
        </div>
      </div>
    </footer>
  );
}
