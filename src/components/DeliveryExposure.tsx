"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { Database, Cog, Laptop, Zap } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

/**
 * Dark-navy treatment matching Hero.tsx's reference-driven redesign — same
 * NAVY/CARD_BG/CARD_BORDER literals and the same #8B7FF0/#5B9BF0 accent pair
 * Hero's stat icons use, so the two sections share one visual system.
 */
const NAVY = "var(--color-surface-alt)";
const CARD_BG = "var(--color-card)";
const CARD_BORDER = "var(--color-card-border)";
const CATEGORY_ACCENT = "#8B7FF0";
const DOT_PATTERN = "radial-gradient(circle, rgba(140,160,255,0.16) 1px, transparent 1.6px)";

type IconComponent = ComponentType<{
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}>;

// Tool names inside a sentence: medium weight so they still scan.
function T({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-fg">{children}</span>;
}

type StackCategory = { label: [string, string]; HeaderIcon: IconComponent; blurb: ReactNode };

// Only things the rest of the site already says: which platforms and tools
// were involved and what my part in them was. No program types, outcomes
// or numbers.
const stacks: StackCategory[] = [
  {
    label: ["DATA PLATFORMS", "DELIVERED ON"],
    HeaderIcon: Database,
    blurb: (
      <>
        The data programs I&apos;ve managed ran on <T>Snowflake</T> and <T>Databricks</T>, along with <T>Redshift</T>,{" "}
        <T>SQL Server</T>, <T>Hadoop</T> and <T>Sigma</T>. I scope the work and follow the technical discussion; the
        engineers build it.
      </>
    ),
  },
  {
    label: ["ENGINEERING TOOLING", "ON THOSE PROGRAMS"],
    HeaderIcon: Cog,
    blurb: (
      <>
        The engineering teams built the pipelines with <T>dbt</T>, <T>Airflow</T>, <T>Spark SQL</T> and{" "}
        <T>Qlik Replicate</T>, on <T>AWS</T> and <T>Azure</T>. I plan and track that work rather than write it.
      </>
    ),
  },
  {
    label: ["PMO & DELIVERY", "TOOLS USED DAILY"],
    HeaderIcon: Laptop,
    blurb: (
      <>
        My everyday delivery stack: <T>Jira</T> and <T>Confluence</T> for backlog and documentation, <T>Kantata</T> as
        our PSA tool, and <T>Salesforce</T> for client and SOW records. <T>MS Project</T>, <T>Azure DevOps</T> or{" "}
        <T>Asana</T> when a client works in them, and <T>Slack</T> or <T>Teams</T> to stay in touch.
      </>
    ),
  },
  {
    label: ["AI & AUTOMATION", "BUILT & RUN"],
    HeaderIcon: Zap,
    blurb: (
      <>
        What I build with: <T>Glean Agent Builder</T> and <T>Claude</T> for the PMO agents, <T>Google Apps Script</T> and
        the <T>Jira REST API</T> for the dependency tracker, and <T>n8n</T> for workflow automation. MCP connections
        link them to <T>Salesforce</T>, <T>Slack</T> and <T>Google Drive</T>.
      </>
    ),
  },
];

function CategoryCard({ category, index, inView }: { category: StackCategory; index: number; inView: boolean }) {
  const { label, HeaderIcon, blurb } = category;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.1 }}
      className="relative p-6 rounded-2xl"
      style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
    >
      {/* Decorative dot-grid corner ornament */}
      <div
        className="absolute top-4 right-4 w-7 h-7 pointer-events-none"
        style={{ backgroundImage: DOT_PATTERN, backgroundSize: "8px 8px", opacity: 0.6 }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3 mb-3 pr-8">
        <HeaderIcon
          size={28}
          style={{
            color: CATEGORY_ACCENT,
            filter: `drop-shadow(0 0 6px color-mix(in srgb, ${CATEGORY_ACCENT} 65%, transparent))`,
          }}
        />
        <p className="font-heading text-[13px] font-bold uppercase tracking-[0.1em] leading-snug">
          <span className="text-fg">{label[0]} </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in srgb, #8B7FF0 var(--accent-text-mix), var(--color-fg)), color-mix(in srgb, #5B9BF0 var(--accent-text-mix), var(--color-fg)))",
            }}
          >
            {label[1]}
          </span>
        </p>
      </div>

      <div className="w-10 h-[3px] rounded-full mb-4" style={{ background: "var(--color-accent)" }} />
      <div className="h-px w-full mb-5" style={{ background: "var(--color-divider)" }} />

      <p className="text-[15px] leading-relaxed text-fg/70">{blurb}</p>
    </motion.div>
  );
}

export default function DeliveryExposure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="py-24" style={{ background: NAVY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="mb-12">
          <SectionHeading
            eyebrow="05 / STACK"
            segments={[
              { text: "The tools and platforms", style: "fill" },
              { text: "behind the programs.", style: "lime" },
            ]}
            className="mb-5"
          />
          <p className="text-[16px] text-fg/70 max-w-xl leading-relaxed">
            The platforms my programs have run on. I don&apos;t engineer on them, but I know
            them well enough to scope the work and keep up in technical discussions. The last
            group is different: those are the tools I build with.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {stacks.map((category, i) => (
            <CategoryCard key={category.label.join(" ")} category={category} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
