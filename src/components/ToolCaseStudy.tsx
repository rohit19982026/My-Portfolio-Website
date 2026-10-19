import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CircleAlert, CircleCheck, Clock, Cpu, Sparkles, Workflow } from "lucide-react";
import { agents, type Agent } from "@/lib/agents";
import { diagrams } from "./diagrams/registry";
import CaseNav from "./CaseNav";

const BORDER = "var(--color-card-border)";
const DOTS = "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)";

const accentText = (accent: string) => `color-mix(in srgb, ${accent} var(--accent-text-mix), var(--color-fg))`;
const mix = (accent: string, pct: number) => `color-mix(in srgb, ${accent} ${pct}%, transparent)`;

// Shared card recipe: soft accent wash in the top corner, hairline border,
// a long low shadow tinted by the tool's own color.
function cardStyle(accent: string, wash = 10): CSSProperties {
  return {
    background: `radial-gradient(120% 90% at 0% 0%, ${mix(accent, wash)}, transparent 60%), var(--color-card)`,
    border: `1px solid ${BORDER}`,
    boxShadow: `0 18px 40px -26px ${mix(accent, 60)}`,
  };
}

function IconBubble({ accent, children, size = 40 }: { accent: string; children: ReactNode; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: mix(accent, 16), color: accentText(accent) }}
    >
      {children}
    </span>
  );
}

function SpecStrip({ agent }: { agent: Agent }) {
  const items = [
    { Icon: Clock, label: "Runs", value: agent.cadence },
    { Icon: Cpu, label: "Built with", value: agent.builtWith },
    { Icon: CircleCheck, label: "Status", value: agent.status, dot: agent.status === "In production" },
  ];
  return (
    <dl className="mt-6 grid grid-cols-3 divide-x overflow-hidden rounded-3xl" style={{ ...cardStyle(agent.accent, 8), borderColor: BORDER }}>
      {items.map(({ Icon, label, value, dot }) => (
        <div key={label} className="flex min-w-0 flex-col gap-2 px-3 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6" style={{ borderColor: BORDER }}>
          <IconBubble accent={agent.accent} size={36}>
            <Icon size={16} />
          </IconBubble>
          <div className="min-w-0">
            <dt className="font-heading text-[9.5px] font-bold uppercase tracking-[0.14em] text-fg/50">{label}</dt>
            <dd className="mt-0.5 flex items-start gap-1.5 font-heading text-[13px] font-bold leading-snug text-fg">
              {dot && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#22c55e" }} />}
              {value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

function StoryCard({
  n,
  title,
  text,
  accent,
  tone,
}: {
  n: string;
  title: string;
  text: string;
  accent: string;
  tone: "problem" | "solved";
}) {
  const solved = tone === "solved";
  const Icon = solved ? CircleCheck : CircleAlert;
  return (
    <section
      aria-labelledby={`case-${n}`}
      className="relative flex flex-col gap-3 rounded-3xl p-5 sm:p-7"
      style={
        solved
          ? { ...cardStyle(accent, 18), border: `1px solid ${mix(accent, 45)}` }
          : { background: "var(--color-card-subtle)", border: `1px solid ${BORDER}` }
      }
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          {solved ? (
            <IconBubble accent={accent} size={34}>
              <Icon size={17} />
            </IconBubble>
          ) : (
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-fg/10 text-fg/60">
              <Icon size={17} />
            </span>
          )}
          <h2 id={`case-${n}`} className="font-heading text-[18px] font-bold leading-snug text-fg sm:text-[20px]">
            {title}
          </h2>
        </span>
        <span className="font-heading text-[11px] font-bold tracking-[0.18em] text-fg/35">{n}</span>
      </div>
      <p className="text-[15.5px] leading-relaxed text-fg/80">{text}</p>
    </section>
  );
}

function FlowCard({ agent, children }: { agent: Agent; children: ReactNode }) {
  return (
    <section aria-labelledby="case-03" className="relative mt-5 overflow-hidden rounded-3xl p-4 sm:p-7" style={cardStyle(agent.accent, 12)}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${agent.accent}, transparent)` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 h-12 w-16 opacity-60"
        style={{ backgroundImage: DOTS, backgroundSize: "8px 8px" }}
      />
      <div className="mb-5 flex items-center gap-3">
        <IconBubble accent={agent.accent} size={34}>
          <Workflow size={16} />
        </IconBubble>
        <div className="min-w-0">
          <h2 id="case-03" className="font-heading text-[18px] font-bold leading-snug text-fg sm:text-[20px]">
            What was the flow?
          </h2>
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-fg/45">
            {agent.flow.length} steps
          </p>
        </div>
        <span className="ml-auto mr-12 hidden font-heading text-[11px] font-bold tracking-[0.18em] text-fg/35 sm:block">03</span>
      </div>
      {children}
      <ol className="sr-only">
        {agent.flow.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </section>
  );
}

function ResultCard({ agent }: { agent: Agent }) {
  return (
    <section
      aria-labelledby="case-04"
      className="mt-5 flex items-start gap-4 rounded-3xl p-5 sm:items-center sm:gap-5 sm:p-7"
      style={{ ...cardStyle(agent.accent, 22), border: `1px solid ${mix(agent.accent, 45)}` }}
    >
      <IconBubble accent={agent.accent} size={48}>
        <Sparkles size={22} />
      </IconBubble>
      <div className="min-w-0">
        <h2 id="case-04" className="font-heading text-[18px] font-bold leading-snug text-fg sm:text-[20px]">
          What changed?
        </h2>
        <p className="mt-1.5 text-[15.5px] leading-relaxed text-fg/80">{agent.result}</p>
      </div>
    </section>
  );
}

function NeighborCard({ agent, direction }: { agent: Agent; direction: "prev" | "next" }) {
  const next = direction === "next";
  const Icon = agent.icon;
  return (
    <Link
      href={`/tools/${agent.slug}`}
      className="group flex min-h-16 items-center gap-4 rounded-3xl p-4 transition-all motion-safe:hover:-translate-y-0.5 hover:border-accent sm:p-5"
      style={cardStyle(agent.accent, 8)}
    >
      {!next && (
        <ArrowLeft size={18} className="shrink-0 text-fg/40 transition-transform motion-safe:group-hover:-translate-x-1" />
      )}
      <IconBubble accent={agent.accent} size={44}>
        <Icon size={19} />
      </IconBubble>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-fg/50">
          {next ? "Next case study" : "Previous case study"}
        </span>
        <span className="mt-0.5 block truncate font-heading text-[15px] font-bold text-fg group-hover:text-accent">{agent.title}</span>
      </span>
      {next && (
        <ArrowRight size={18} className="shrink-0 text-fg/40 transition-transform motion-safe:group-hover:translate-x-1" />
      )}
    </Link>
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
          <h1
            className="heading-display text-fg"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {agent.title}
          </h1>
          <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-fg/70">{agent.summary}</p>
          <SpecStrip agent={agent} />
        </header>

        <div className="mt-8 grid items-stretch gap-3 sm:mt-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
          <StoryCard n="01" title="What was the problem?" text={agent.problem} accent={agent.accent} tone="problem" />
          <span
            aria-hidden
            className="mx-auto -my-1 flex h-9 w-9 items-center justify-center self-center rounded-full sm:my-0"
            style={{ background: mix(agent.accent, 18), color: color, border: `1px solid ${mix(agent.accent, 40)}` }}
          >
            <ArrowDown size={16} className="sm:hidden" />
            <ArrowRight size={16} className="hidden sm:block" />
          </span>
          <StoryCard n="02" title="What did I solve?" text={agent.solved} accent={agent.accent} tone="solved" />
        </div>

        <FlowCard agent={agent}>
          <div className="mx-auto max-w-xl">
            <Diagram />
          </div>
        </FlowCard>

        {agent.result && <ResultCard agent={agent} />}

        <nav aria-label="More case studies" className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <NeighborCard agent={prev} direction="prev" />
          <NeighborCard agent={next} direction="next" />
        </nav>
      </div>
    </article>
  );
}
