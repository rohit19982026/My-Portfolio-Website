import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, Cpu, Sparkles } from "lucide-react";
import { agents, type Agent } from "@/lib/agents";
import { diagrams } from "./diagrams/registry";
import CaseNav from "./CaseNav";

const CARD_BG = "var(--color-card)";
const CARD_BORDER = "var(--color-card-border)";

const accentText = (accent: string) => `color-mix(in srgb, ${accent} var(--accent-text-mix), var(--color-fg))`;

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`case-${n}`} className="mt-10 sm:mt-12">
      <p className="mb-2 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{n}</p>
      <h2 id={`case-${n}`} className="mb-3 font-heading text-[22px] font-bold leading-snug text-fg sm:text-[26px]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Fact({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div
      className="flex min-w-0 items-center gap-3 rounded-card px-4 py-3"
      style={{ border: `1px solid ${CARD_BORDER}`, background: "var(--color-card-subtle)" }}
    >
      <span style={{ color }}>{icon}</span>
      <span className="min-w-0">
        <span className="block font-heading text-[9.5px] font-bold uppercase tracking-[0.14em] text-fg/50">{label}</span>
        <span className="block truncate font-heading text-[13px] font-bold text-fg">{value}</span>
      </span>
    </div>
  );
}

export default function ToolCaseStudy({ agent }: { agent: Agent }) {
  const Diagram = diagrams[agent.slug];
  const i = agents.findIndex((a) => a.slug === agent.slug);
  const prev = agents[(i - 1 + agents.length) % agents.length];
  const next = agents[(i + 1) % agents.length];
  const color = accentText(agent.accent);

  return (
    <article className="bg-surface pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/#tools"
          className="inline-flex min-h-11 items-center gap-1.5 pt-3 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-fg/60 transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} /> All tools
        </Link>
        <CaseNav current={agent.slug} />

        <header className="mt-8 sm:mt-10">
          <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color }}>
            Case study {String(i + 1).padStart(2, "0")} of {agents.length}
          </p>
          <h1 className="font-heading text-[30px] font-bold leading-tight text-fg sm:text-[40px]">{agent.title}</h1>
          <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-fg/70">{agent.summary}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Fact icon={<Clock size={18} />} label="Runs" value={agent.cadence} color={color} />
            <Fact icon={<Cpu size={18} />} label="Built with" value={agent.builtWith} color={color} />
            <Fact icon={<Check size={18} />} label="Status" value={agent.status} color={color} />
          </div>
        </header>

        <Block n="01" title="What was the problem?">
          <p className="max-w-2xl text-[16px] leading-relaxed text-fg/75">{agent.problem}</p>
        </Block>

        <Block n="02" title="What did I solve?">
          <p className="max-w-2xl text-[16px] leading-relaxed text-fg/75">{agent.solved}</p>
        </Block>

        <Block n="03" title="What was the flow?">
          <div
            className="rounded-2xl p-4 sm:p-6"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderTop: `3px solid ${agent.accent}` }}
          >
            <Diagram />
          </div>
          <ol className="sr-only">
            {agent.flow.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </Block>

        {agent.result && (
          <Block n="04" title="What changed?">
            <p
              className="flex max-w-2xl items-start gap-3 rounded-card p-4 text-[16px] leading-relaxed text-fg"
              style={{ border: `1px solid color-mix(in srgb, ${agent.accent} 40%, transparent)`, background: `color-mix(in srgb, ${agent.accent} 8%, transparent)` }}
            >
              <Sparkles size={18} className="mt-1 shrink-0" style={{ color }} />
              {agent.result}
            </p>
          </Block>
        )}

        <nav aria-label="More case studies" className="mt-14 grid gap-3 sm:grid-cols-2">
          {[
            { a: prev, label: "Previous", Icon: ArrowLeft, align: "text-left" },
            { a: next, label: "Next", Icon: ArrowRight, align: "sm:text-right" },
          ].map(({ a, label, Icon, align }) => (
            <Link
              key={label}
              href={`/tools/${a.slug}`}
              className={`group flex min-h-11 flex-col gap-1 rounded-card p-4 transition-colors hover:border-accent ${align}`}
              style={{ border: `1px solid ${CARD_BORDER}`, background: CARD_BG }}
            >
              <span className={`flex items-center gap-1.5 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-fg/50 ${label === "Next" ? "sm:justify-end" : ""}`}>
                {label === "Previous" && <Icon size={13} />}
                {label}
                {label === "Next" && <Icon size={13} />}
              </span>
              <span className="font-heading text-[15px] font-bold text-fg group-hover:text-accent">{a.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}
