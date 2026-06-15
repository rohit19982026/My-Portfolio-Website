"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LineKind = "cmd" | "info" | "ok" | "warn" | "agent" | "muted";

interface ConsoleLine {
  text: string;
  kind: LineKind;
  delay?: number; // ms before this line starts typing
}

const SCRIPT: ConsoleLine[] = [
  { text: "rohit@pmo-agents:~$ run scan --all-programs", kind: "cmd" },
  { text: "Initializing 4 agents... done", kind: "muted", delay: 250 },
  { text: "[Billing Compliance Agent]   checking EOM reconciliation...", kind: "agent", delay: 350 },
  { text: "  └─ 94.2% auto-matched · 3 flags routed to PM review", kind: "ok", delay: 150 },
  { text: "[Sprint Velocity Tracker]    scanning 5 active boards...", kind: "agent", delay: 350 },
  { text: "  └─ 4 on-track · 1 at-risk (China rollout — access delay, 3d)", kind: "warn", delay: 150 },
  { text: "[Program Health Scanner]     cross-checking RAID logs...", kind: "agent", delay: 350 },
  { text: "  └─ 0 unowned risks · 2 due for escalation", kind: "ok", delay: 150 },
  { text: "[Steerco Comms Engine]       drafting Friday update...", kind: "agent", delay: 350 },
  { text: "  └─ CFO tone ready · VP Eng tone ready", kind: "ok", delay: 150 },
  { text: "", kind: "muted", delay: 200 },
  { text: "Run complete in 1.84s — 1 item flagged for human judgment", kind: "info", delay: 100 },
];

const KIND_COLOR: Record<LineKind, string> = {
  cmd:   "#E2E8F0",
  info:  "#60A5FA",
  ok:    "#34D399",
  warn:  "#FBBF24",
  agent: "#7DD3FC",
  muted: "#7B8794",
};

const TYPE_SPEED = 14; // ms per character
const LOOP_PAUSE = 2600; // ms to hold the finished state before restarting

export default function AgentConsole() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVisibleLines(SCRIPT.map((l) => l.text));
      setDone(true);
      return;
    }

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function run() {
      setVisibleLines([]);
      setDone(false);

      let cumulativeDelay = 400;
      SCRIPT.forEach((line, i) => {
        cumulativeDelay += line.delay ?? 0;
        const charCount = Math.max(line.text.length, 1);

        for (let c = 0; c <= charCount; c++) {
          const t = setTimeout(() => {
            if (cancelled) return;
            setVisibleLines((prev) => {
              const next = [...prev];
              next[i] = line.text.slice(0, c);
              return next;
            });
          }, cumulativeDelay + c * TYPE_SPEED);
          timeouts.push(t);
        }
        cumulativeDelay += charCount * TYPE_SPEED;
      });

      const finishT = setTimeout(() => {
        if (!cancelled) setDone(true);
      }, cumulativeDelay + 100);
      timeouts.push(finishT);

      const restartT = setTimeout(() => {
        if (!cancelled) run();
      }, cumulativeDelay + 100 + LOOP_PAUSE);
      timeouts.push(restartT);
    }

    run();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden w-full"
      style={{
        background: "var(--color-ink-2)",
        border: "1px solid var(--color-ink-border)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-ink-border)" }}
      >
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
          Agents online · 6
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5 font-mono text-[12.5px] leading-[1.85] min-h-[300px]" style={{ background: "var(--color-ink)" }}>
        {SCRIPT.map((line, i) => {
          const text = visibleLines[i] ?? "";
          const isTyping = !done && text.length > 0 && text.length < line.text.length;
          const isCurrent = !done && i === visibleLines.findIndex((t, idx) => (t ?? "").length < SCRIPT[idx].text.length);
          return (
            <div key={i} style={{ color: KIND_COLOR[line.kind], whiteSpace: "pre" }}>
              {text}
              {(isTyping || isCurrent) && text.length < line.text.length && <span className="caret" />}
              {text.length === 0 && line.text.length === 0 ? " " : null}
            </div>
          );
        })}
        {done && (
          <div className="flex items-center gap-1 mt-1" style={{ color: "#E2E8F0" }}>
            rohit@pmo-agents:~$ <span className="caret" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
