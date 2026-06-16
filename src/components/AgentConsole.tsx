"use client";

import { motion } from "framer-motion";
import { Bot, CircleDot, CheckCircle2, AlertTriangle } from "lucide-react";
import GlassSurface from "./GlassSurface";
import IconBadge from "./IconBadge";

type Status = "ok" | "warn";

const AGENTS: { name: string; detail: string; status: Status }[] = [
  { name: "Month-End Billing Reconciler", detail: "94.2% auto-matched · 3 flags routed to PM review", status: "ok" },
  { name: "Delivery Progress Monitor", detail: "4 on-track · 1 at-risk (China rollout — access delay, 3d)", status: "warn" },
  { name: "Risk & Escalation Scanner", detail: "0 unowned risks · 2 due for escalation", status: "ok" },
  { name: "Executive Briefing Writer", detail: "CFO tone ready · VP Eng tone ready", status: "ok" },
];

const STATUS_COLOR: Record<Status, string> = { ok: "var(--color-green)", warn: "var(--color-orange)" };

export default function AgentConsole() {
  return (
    <GlassSurface radius="lg" specular interactive className="w-full" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--glass-border)" }}>
        <div className="flex items-center gap-2">
          <Bot size={18} strokeWidth={2} style={{ color: "var(--color-accent)" }} />
          <span className="text-[13px] font-semibold" style={{ color: "var(--color-text)" }}>
            PMO Agent Fleet
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--color-green-text)" }}>
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--color-green)", animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          6 online
        </div>
      </div>

      <div className="px-3 py-3">
        {AGENTS.map((agent, i) => {
          const Icon = agent.status === "ok" ? CheckCircle2 : AlertTriangle;
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 px-3 py-3 rounded-2xl"
            >
              <IconBadge icon={Icon} color={STATUS_COLOR[agent.status]} size={32} className="mt-0.5" pulse={agent.status === "ok"} />
              <div>
                <p className="text-[13px] font-semibold mb-0.5" style={{ color: "var(--color-text)" }}>
                  {agent.name}
                </p>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {agent.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div
        className="px-5 py-3 flex items-center gap-2 text-[11px]"
        style={{ borderTop: "1px solid var(--glass-border)", color: "var(--color-text-secondary)" }}
      >
        <CircleDot size={12} strokeWidth={2} style={{ color: "var(--color-accent)" }} />
        Run complete in 1.84s — 1 item flagged for human judgment
      </div>
    </GlassSurface>
  );
}
