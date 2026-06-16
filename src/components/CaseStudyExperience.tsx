"use client";

import { motion } from "framer-motion";
import {
  Database, Cable, Cpu, Cloud, Factory, ShoppingCart, Megaphone, Activity, Warehouse,
  Users, Crown, Wrench, GitBranch, AlertTriangle, Wand2, ArrowRight,
  CircleDot, type LucideIcon,
} from "lucide-react";
import type { CaseStudy, SourceType, ConsumerType, OrchestrationType } from "@/lib/caseStudies";

// ---------- shared tokens ----------

const SEVERITY_COLOR = { high: "#FF375F", med: "#FF9F0A", low: "#64D2FF" };
const SOURCE_ICON: Record<SourceType, LucideIcon> = {
  ERP: Factory, CRM: Users, OPS: Activity, API: Cable, MES: Cpu,
  MARKETING: Megaphone, TELEMETRY: Activity, LAKE: Cloud, WAREHOUSE: Warehouse,
};
const CONSUMER_ICON: Record<ConsumerType, LucideIcon> = {
  EXEC: Crown, OPS: Activity, PRODUCT: ShoppingCart,
  ANALYTICS: Database, FINANCE: Database, MARKETING: Megaphone,
};
const ORCH_COLOR: Record<OrchestrationType, string> = {
  exec: "#BF5AF2", client: "#0A84FF", internal: "#30D158", vendor: "#FF9F0A",
};

// Section label — consistent header for each screen
function ScreenLabel({ num, title, accent }: { num: string; title: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[10px] font-bold tabular-nums px-2 py-1 rounded"
        style={{ background: `${accent}14`, color: accent, letterSpacing: "0.1em" }}>
        {num}
      </span>
      <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--color-text)" }}>
        {title}
      </p>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
    </div>
  );
}

// ---------- SCREEN 1: Mission Control ----------

function MissionControl({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  return (
    <div>
      <ScreenLabel num="01" title="Mission Control" accent={accentText} />
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
            style={{ color: accentText, background: `${accent}15`, border: `1px solid ${accent}30` }}>
            {study.type}
          </span>
          <span className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest"
            style={{ color: "var(--color-text-secondary)", background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
            {study.industry}
          </span>
          <span className="text-[10px]" style={{ color: "var(--color-faint)" }}>{study.year}</span>
        </div>
        <p className="text-[11px] font-medium mb-2" style={{ color: accentText }}>
          {study.domain}
        </p>
        <h3 className="font-heading font-bold leading-[1.2] mb-3"
          style={{ fontSize: "clamp(18px, 2.4vw, 26px)", color: "var(--color-text)" }}>
          {study.headline}
        </h3>
        <p className="text-[13px] leading-[1.6] max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
          {study.capability}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {study.scale.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
            className="px-3 py-3 rounded-xl"
            style={{ background: `linear-gradient(150deg, ${accent}10, ${accent}04)`, border: `1px solid ${accent}1E` }}>
            <div className="font-heading font-black tabular-nums leading-none text-[15px] mb-1.5" style={{ color: accentText }}>
              {s.value}
            </div>
            <div className="text-[9px] font-medium uppercase tracking-wider leading-tight" style={{ color: "var(--color-text-secondary)" }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------- SCREEN 2: Data Ecosystem (animated flow) ----------

function EcosystemMap({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  const sources = study.ecosystem.sources.slice(0, 6);
  const consumers = study.ecosystem.consumers.slice(0, 5);
  const W = 720, H = 360;
  const srcX = 80, platX = W / 2, consX = W - 80;
  const srcY = (i: number) => 50 + (i * (H - 100)) / Math.max(sources.length - 1, 1);
  const consY = (i: number) => 50 + (i * (H - 100)) / Math.max(consumers.length - 1, 1);

  return (
    <div>
      <ScreenLabel num="02" title="The Data Ecosystem" accent={accentText} />
      <div className="rounded-2xl p-3 sm:p-4 overflow-hidden"
        style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 380 }}>
          {/* Source → platform flows */}
          {sources.map((_, i) => (
            <motion.path key={`s-${i}`}
              d={`M${srcX + 40} ${srcY(i)} C${(srcX + platX) / 2} ${srcY(i)}, ${(srcX + platX) / 2} ${H / 2}, ${platX - 50} ${H / 2}`}
              stroke={`${accent}55`} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08 }} />
          ))}
          {/* Platform → consumer flows */}
          {consumers.map((_, i) => (
            <motion.path key={`c-${i}`}
              d={`M${platX + 50} ${H / 2} C${(platX + consX) / 2} ${H / 2}, ${(platX + consX) / 2} ${consY(i)}, ${consX - 40} ${consY(i)}`}
              stroke={accent} strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.08 }} />
          ))}
          {/* Animated data packets */}
          {sources.map((_, i) => (
            <motion.circle key={`p-${i}`} r="3" fill={accent}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, delay: 1.4 + i * 0.3, repeat: Infinity, repeatDelay: 1.5 }}>
              <animateMotion dur="2.4s" begin={`${1.4 + i * 0.3}s`} repeatCount="indefinite"
                path={`M${srcX + 40} ${srcY(i)} C${(srcX + platX) / 2} ${srcY(i)}, ${(srcX + platX) / 2} ${H / 2}, ${platX - 50} ${H / 2}`} />
            </motion.circle>
          ))}

          {/* Sources */}
          {sources.map((s, i) => {
            const Icon = SOURCE_ICON[s.type];
            const y = srcY(i);
            return (
              <motion.g key={s.name}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}>
                <rect x={srcX - 36} y={y - 14} width="76" height="28" rx="8"
                  fill="white" stroke={`${accent}40`} strokeWidth="1" />
                <foreignObject x={srcX - 30} y={y - 9} width="18" height="18">
                  <div style={{ color: accentText }}><Icon size={14} strokeWidth={2} /></div>
                </foreignObject>
                <text x={srcX - 8} y={y + 4} fontSize="9" fontWeight="600" fill="#1D1D1F">{s.name}</text>
              </motion.g>
            );
          })}

          {/* Pipeline column */}
          <motion.rect x={platX - 70} y={H / 2 - 40} width="140" height="80" rx="14"
            fill={`${accent}18`} stroke={accent} strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 110, damping: 18 }} />
          <text x={platX} y={H / 2 - 14} textAnchor="middle" fontSize="9" fontWeight="700" fill={accentText}
            style={{ letterSpacing: "0.1em" }}>PIPELINE</text>
          <text x={platX} y={H / 2 + 3} textAnchor="middle" fontSize="11" fontWeight="800" fill="#1D1D1F">
            {study.ecosystem.platform.length > 24 ? study.ecosystem.platform.slice(0, 22) + "…" : study.ecosystem.platform}
          </text>
          <text x={platX} y={H / 2 + 22} textAnchor="middle" fontSize="8" fill="var(--color-text-secondary)">
            {study.ecosystem.pipeline.length} stages · governed
          </text>

          {/* Consumers */}
          {consumers.map((c, i) => {
            const Icon = CONSUMER_ICON[c.type];
            const y = consY(i);
            return (
              <motion.g key={c.name}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.06, duration: 0.4 }}>
                <rect x={consX - 40} y={y - 14} width="80" height="28" rx="8"
                  fill="white" stroke={accent} strokeWidth="1" />
                <foreignObject x={consX - 34} y={y - 9} width="18" height="18">
                  <div style={{ color: accentText }}><Icon size={14} strokeWidth={2} /></div>
                </foreignObject>
                <text x={consX - 12} y={y + 4} fontSize="9" fontWeight="600" fill="#1D1D1F">{c.name}</text>
              </motion.g>
            );
          })}

          {/* Column headers */}
          <text x={srcX + 2} y={26} fontSize="8" fontWeight="700" fill="var(--color-text-secondary)" style={{ letterSpacing: "0.15em" }}>SOURCES</text>
          <text x={platX} y={26} textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--color-text-secondary)" style={{ letterSpacing: "0.15em" }}>PLATFORM</text>
          <text x={consX} y={26} textAnchor="end" fontSize="8" fontWeight="700" fill="var(--color-text-secondary)" style={{ letterSpacing: "0.15em" }}>CONSUMERS</text>
        </svg>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {study.ecosystem.pipeline.map((p, i) => (
          <span key={i} className="text-[10px] font-medium px-2.5 py-1 rounded-full"
            style={{ color: "var(--color-text-secondary)", background: `${accent}08`, border: `1px solid ${accent}20` }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- SCREEN 3: Challenge Landscape ----------

function ChallengeLandscape({ challenges, accent, accentText }: { challenges: CaseStudy["challenges"]; accent: string; accentText: string }) {
  return (
    <div>
      <ScreenLabel num="03" title="Challenge Landscape" accent={accentText} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {challenges.map((c, i) => (
          <motion.div key={c.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="relative px-3 py-3 rounded-xl flex items-start gap-2.5"
            style={{
              background: "var(--color-bg-secondary)",
              border: `1px solid ${SEVERITY_COLOR[c.severity]}25`,
            }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
              className="shrink-0 mt-0.5"
              style={{ color: SEVERITY_COLOR[c.severity] }}>
              <AlertTriangle size={14} strokeWidth={2.5} />
            </motion.div>
            <p className="text-[12px] leading-[1.45]" style={{ color: "var(--color-text)" }}>
              {c.label}
            </p>
            <div className="absolute top-2 right-2 text-[7px] font-bold uppercase tracking-widest"
              style={{ color: SEVERITY_COLOR[c.severity] }}>
              {c.severity}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------- SCREEN 4: Transformation Journey ----------

function TransformationJourney({ journey, accent, accentText }: { journey: CaseStudy["journey"]; accent: string; accentText: string }) {
  return (
    <div>
      <ScreenLabel num="04" title="Transformation Journey" accent={accentText} />
      <div className="relative">
        {/* Vertical connector */}
        <div className="absolute left-[18px] top-2 bottom-2 w-px hidden sm:block"
          style={{ background: `linear-gradient(to bottom, ${accent}50, ${accent}20, ${accent}50)` }} />
        <div className="space-y-3">
          {journey.map((j, i) => (
            <motion.div key={j.stage}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 items-start">
              <motion.div className="shrink-0 relative z-10 flex items-center justify-center font-heading font-black tabular-nums text-[12px] tracking-tight"
                style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: `linear-gradient(140deg, ${accent}, ${accent}CC)`,
                  color: "white",
                  boxShadow: `0 4px 12px ${accent}40`,
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
                {String(i + 1).padStart(2, "0")}
              </motion.div>
              <div className="flex-1 pt-1 pb-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-1" style={{ color: accentText }}>
                  {j.stage}
                </p>
                <p className="text-[14px] font-semibold mb-1.5" style={{ color: "var(--color-text)" }}>
                  {j.title}
                </p>
                <p className="text-[12px] leading-[1.6]" style={{ color: "var(--color-text-secondary)" }}>
                  {j.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- SCREEN 5: TPM Orchestration View ----------

function OrchestrationView({ orchestration, accent, accentText }: { orchestration: CaseStudy["orchestration"]; accent: string; accentText: string }) {
  const cx = 180, cy = 180, R = 130;
  const n = orchestration.length;
  return (
    <div>
      <ScreenLabel num="05" title="TPM Orchestration View" accent={accentText} />
      <div className="grid lg:grid-cols-[360px_1fr] gap-5 items-start">
        <div className="rounded-2xl p-2 mx-auto lg:mx-0"
          style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)", width: 360, maxWidth: "100%" }}>
          <svg viewBox="0 0 360 360" className="w-full">
            {/* Connection lines */}
            {orchestration.map((_, i) => {
              const angle = (i * 360) / n - 90;
              const rad = (angle * Math.PI) / 180;
              const x = cx + R * Math.cos(rad);
              const y = cy + R * Math.sin(rad);
              return (
                <motion.line key={i} x1={cx} y1={cy} x2={x} y2={y}
                  stroke={`${accent}45`} strokeWidth="1" strokeDasharray="3 3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }} />
              );
            })}
            {/* Center: PM */}
            <motion.circle cx={cx} cy={cy} r="32" fill={`${accent}1A`} stroke={accent} strokeWidth="1.5"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }} />
            <text x={cx} y={cy - 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={accentText} style={{ letterSpacing: "0.1em" }}>PM</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fill="var(--color-text-secondary)">orchestration</text>

            {/* Nodes */}
            {orchestration.map((o, i) => {
              const angle = (i * 360) / n - 90;
              const rad = (angle * Math.PI) / 180;
              const x = cx + R * Math.cos(rad);
              const y = cy + R * Math.sin(rad);
              const color = ORCH_COLOR[o.type];
              return (
                <motion.g key={o.team}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 + i * 0.05 }}>
                  <circle cx={x} cy={y} r="22" fill="white" stroke={color} strokeWidth="1.5" />
                  <circle cx={x} cy={y} r="22" fill={`${color}18`} />
                  <text x={x} y={y + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill={color}>
                    {o.team.split(" ").map(w => w[0]).join("").slice(0, 3)}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {orchestration.map((o, i) => (
            <motion.div key={o.team}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.35 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: ORCH_COLOR[o.type] }} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold leading-tight" style={{ color: "var(--color-text)" }}>{o.team}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{o.role}</p>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest"
                style={{ color: ORCH_COLOR[o.type] }}>{o.type}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- SCREEN 6: Decision Engine ----------

function DecisionEngine({ decisions, accent, accentText }: { decisions: CaseStudy["decisions"]; accent: string; accentText: string }) {
  return (
    <div>
      <ScreenLabel num="06" title="Decision Engine" accent={accentText} />
      <div className="grid lg:grid-cols-2 gap-3">
        {decisions.map((d, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative rounded-2xl p-4"
            style={{
              background: `linear-gradient(155deg, ${accent}08, var(--color-bg-secondary))`,
              border: `1px solid ${accent}25`,
            }}>
            <div className="flex items-center gap-2 mb-3">
              <GitBranch size={14} strokeWidth={2.5} style={{ color: accentText }} />
              <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: accentText }}>
                DECISION · {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-[13px] font-semibold leading-[1.45] mb-3" style={{ color: "var(--color-text)" }}>
              {d.decision}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-3" style={{ borderTop: `1px dashed ${accent}30` }}>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-faint)" }}>Tradeoff</p>
                <p className="text-[10px] leading-[1.4]" style={{ color: "var(--color-text-secondary)" }}>{d.tradeoff}</p>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: "#FF375F" }}>Risk</p>
                <p className="text-[10px] leading-[1.4]" style={{ color: "var(--color-text-secondary)" }}>{d.risk}</p>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: "#30D158" }}>Outcome</p>
                <p className="text-[10px] leading-[1.4]" style={{ color: "var(--color-text-secondary)" }}>{d.outcome}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------- SCREEN 7: Impact Command Center ----------

const TONE_COLOR = { primary: "var(--color-accent)", ok: "#30D158", ai: "#BF5AF2" };

function ImpactCommandCenter({ impact, accent, accentText }: { impact: CaseStudy["impact"]; accent: string; accentText: string }) {
  return (
    <div>
      <ScreenLabel num="07" title="Impact Command Center" accent={accentText} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {impact.map((m, i) => {
          const c = m.tone ? TONE_COLOR[m.tone] : accentText;
          return (
            <motion.div key={m.label}
              initial={{ opacity: 0, scale: 0.85, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 110, damping: 18, delay: i * 0.06 }}
              className="relative px-3 py-4 rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(155deg, ${accent}10, ${accent}03)`,
                border: `1px solid ${accent}28`,
              }}>
              <motion.div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                style={{ background: c }} />
              <div className="font-heading font-black tabular-nums leading-none mb-2"
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: c }}>
                {m.value}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider leading-snug"
                style={{ color: "var(--color-text-secondary)" }}>
                {m.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- SCREEN 8: Before / After ----------

function BeforeAfter({ ba, accent, accentText }: { ba: CaseStudy["beforeAfter"]; accent: string; accentText: string }) {
  return (
    <div>
      <ScreenLabel num="08" title="Before → After" accent={accentText} />
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,55,95,0.04)", border: "1px solid rgba(255,55,95,0.2)" }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#C7174A" }}>
            ▣ Before
          </p>
          <ul className="space-y-2">
            {ba.before.map((b, i) => (
              <li key={i} className="flex gap-2 text-[12px] leading-[1.5]" style={{ color: "var(--color-text-secondary)" }}>
                <span className="shrink-0 mt-2 w-1 h-1 rounded-full" style={{ background: "#FF375F", opacity: 0.6 }} />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }}
          className="hidden md:flex items-center justify-center px-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)`, boxShadow: `0 4px 12px ${accent}40` }}>
            <ArrowRight size={16} strokeWidth={2.5} color="white" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-4"
          style={{ background: `${accent}08`, border: `1px solid ${accent}30` }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: accentText }}>
            ▣ After
          </p>
          <ul className="space-y-2">
            {ba.after.map((a, i) => (
              <li key={i} className="flex gap-2 text-[12px] leading-[1.5]" style={{ color: "var(--color-text)" }}>
                <span className="shrink-0 mt-2 w-1 h-1 rounded-full" style={{ background: accent }} />
                {a}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// ---------- AI AGENT CONTROL CENTER (variant for case 004) ----------

function AgentControlCenter({ study, accent, accentText }: { study: CaseStudy; accent: string; accentText: string }) {
  const agents = study.agents ?? [];
  return (
    <div>
      <ScreenLabel num="02" title="AI Control Center · Live Agent Fleet" accent={accentText} />

      {/* Reasoning flow strip */}
      <div className="rounded-2xl p-4 mb-4"
        style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--glass-border)" }}>
        <div className="flex flex-wrap items-center gap-2 justify-between">
          {["User Intent", "Glean Grounding", "Claude Reasoning", "Tool Selection", "Schema Validation", "Human Review", "Output"].map((step, i) => (
            <motion.div key={step}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-2">
              <motion.div
                animate={{ boxShadow: [`0 0 0 0 ${accent}50`, `0 0 0 6px ${accent}00`] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold"
                style={{ background: `${accent}14`, color: accentText, border: `1px solid ${accent}30` }}>
                {step}
              </motion.div>
              {i < 6 && <ArrowRight size={12} style={{ color: "var(--color-faint)" }} />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Agent fleet grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {agents.map((a, i) => (
          <motion.div key={a.name}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="rounded-2xl p-3.5 relative overflow-hidden"
            style={{
              background: `linear-gradient(155deg, ${accent}0B, var(--color-bg-secondary))`,
              border: `1px solid ${accent}25`,
            }}>
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: a.status === "live" ? [1, 1.3, 1] : 1, opacity: a.status === "live" ? 1 : 0.5 }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: a.status === "live" ? "#30D158" : "#FF9F0A" }} />
                <span className="text-[8px] font-bold uppercase tracking-widest"
                  style={{ color: a.status === "live" ? "#248A3D" : "#B25C00" }}>
                  {a.status}
                </span>
              </div>
              <Wand2 size={11} style={{ color: accentText, opacity: 0.6 }} />
            </div>
            <p className="font-heading font-bold text-[13px] leading-tight mb-2" style={{ color: "var(--color-text)" }}>
              {a.name}
            </p>
            <p className="text-[10.5px] leading-[1.5] mb-2.5" style={{ color: "var(--color-text-secondary)" }}>
              {a.intent}
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {a.tools.map(t => (
                <span key={t} className="text-[8px] font-medium px-1.5 py-0.5 rounded font-mono"
                  style={{ background: `${accent}12`, color: accentText, border: `1px solid ${accent}25` }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 pt-2" style={{ borderTop: `1px dashed ${accent}25` }}>
              <ArrowRight size={9} style={{ color: accentText }} />
              <p className="text-[9.5px] italic" style={{ color: "var(--color-text-secondary)" }}>
                {a.output}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------- ROOT EXPERIENCE ----------

export default function CaseStudyExperience({ study, accent, accentText }: {
  study: CaseStudy; accent: string; accentText: string;
}) {
  return (
    <div className="space-y-10 pt-2">
      <MissionControl study={study} accent={accent} accentText={accentText} />

      {study.variant === "ai-agents"
        ? <AgentControlCenter study={study} accent={accent} accentText={accentText} />
        : <EcosystemMap study={study} accent={accent} accentText={accentText} />
      }

      <ChallengeLandscape challenges={study.challenges} accent={accent} accentText={accentText} />
      <TransformationJourney journey={study.journey} accent={accent} accentText={accentText} />
      <OrchestrationView orchestration={study.orchestration} accent={accent} accentText={accentText} />
      <DecisionEngine decisions={study.decisions} accent={accent} accentText={accentText} />
      <ImpactCommandCenter impact={study.impact} accent={accent} accentText={accentText} />
      <BeforeAfter ba={study.beforeAfter} accent={accent} accentText={accentText} />

      {/* Stack — final strip */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "var(--color-text-secondary)" }}>
          Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {study.stack.map(s => (
            <span key={s} className="inline-flex items-center gap-1.5 text-[10.5px] font-medium px-2.5 py-1 rounded-full font-mono"
              style={{ background: "var(--color-bg-secondary)", color: "var(--color-text-secondary)", border: "1px solid var(--glass-border)" }}>
              <Wrench size={10} strokeWidth={2} style={{ color: accentText, opacity: 0.7 }} />
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Footer status line */}
      <div className="flex flex-wrap items-center gap-3 pt-4 mt-2 text-[10px] font-mono"
        style={{ borderTop: "1px dashed var(--glass-border)", color: "var(--color-faint)" }}>
        <span className="flex items-center gap-1.5">
          <CircleDot size={10} style={{ color: "#30D158" }} />
          CASE {study.number} · {study.industry.toUpperCase()}
        </span>
        <span>·</span>
        <span>{study.domain}</span>
        <span>·</span>
        <span>{study.year}</span>
      </div>
    </div>
  );
}
