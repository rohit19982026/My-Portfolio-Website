"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ComponentType, type CSSProperties } from "react";
import {
  Database,
  Cog,
  Laptop,
  Zap,
  Server,
  Sigma,
  Cloud,
  Infinity as InfinityIcon,
  GanttChart,
  Workflow,
  ScanEye,
  Braces,
} from "lucide-react";
import {
  SiSnowflake,
  SiDatabricks,
  SiApachehadoop,
  SiApacheairflow,
  SiQlik,
  SiApachespark,
  SiJira,
  SiConfluence,
  SiAsana,
  SiClaude,
  SiN8N,
  SiGoogleappsscript,
  SiGoogledrive,
} from "react-icons/si";
import SectionHeading from "./ui/SectionHeading";
import SalesforceMark from "./icons/SalesforceMark";
import SlackMark from "./icons/SlackMark";
import GleanMark from "./icons/GleanMark";
import SwipeCarousel from "./ui/SwipeCarousel";

/**
 * Dark-navy treatment matching Hero.tsx's reference-driven redesign this
 * session — same NAVY/CARD_BG/CARD_BORDER literals and the same #8B7FF0/
 * #5B9BF0 accent pair Hero's stat icons use, so the two dark sections share
 * one visual system instead of introducing a second one. (This does mean
 * the page has no light-background section left between Hero and Footer
 * while Work.tsx stays unmounted — a real, visible consequence of this
 * change, not a silent side effect.)
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

// `wordmark: true` items ARE their own label (e.g. the styled "aws" text
// below already reads as the name) — ItemChip skips the separate label in
// that case instead of showing the name twice.
type StackItem = { name: string; Icon: IconComponent; color: string | null; wordmark?: boolean };
type StackCategory = { label: [string, string]; HeaderIcon: IconComponent; items: StackItem[] };

// AWS's real mark is essentially a wordmark, not a glyph — styled text
// reads truer to the actual logo than an invented icon shape. Marked
// wordmark: true below so ItemChip doesn't also render a separate "AWS"
// label next to it.
function AwsText({ size = 16, style }: { size?: number; style?: CSSProperties }) {
  return (
    <span style={{ fontSize: size, fontWeight: 800, color: "#FF9900", lineHeight: 1, ...style }}>
      aws
    </span>
  );
}
// No public brand mark for this one — a clean initial badge instead of
// guessing at an unofficial logo.
function KantataBadge({ size = 16, style }: { size?: number; style?: CSSProperties }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        fontSize: size * 0.62,
        fontWeight: 800,
        color: "#8B7FF0",
        border: "1.5px solid currentColor",
        borderRadius: 4,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        ...style,
      }}
    >
      K
    </span>
  );
}

const stacks: StackCategory[] = [
  {
    label: ["DATA PLATFORMS", "DELIVERED ON"],
    HeaderIcon: Database,
    items: [
      { name: "Snowflake", Icon: SiSnowflake, color: "#29B5E8" },
      { name: "Databricks", Icon: SiDatabricks, color: "#FF3621" },
      { name: "Amazon Redshift", Icon: Server, color: "#8C4FFF" },
      { name: "SQL Server", Icon: Database, color: "#CC2927" },
      { name: "Hadoop / HDFS", Icon: SiApachehadoop, color: "#66CCFF" },
      { name: "Sigma", Icon: Sigma, color: "var(--color-fg)" },
    ],
  },
  {
    label: ["ENGINEERING TOOLING", "ON THOSE PROGRAMS"],
    HeaderIcon: Cog,
    items: [
      { name: "dbt", Icon: Braces, color: "#FF694A" },
      { name: "Airflow / MWAA", Icon: SiApacheairflow, color: "#017CEE" },
      { name: "ETL / ELT Pipelines", Icon: Workflow, color: "#5B9BF0" },
      { name: "Qlik Replicate", Icon: SiQlik, color: "#009845" },
      { name: "Spark SQL", Icon: SiApachespark, color: "#E25A1C" },
      { name: "LandingAI / Computer Vision", Icon: ScanEye, color: "#5B9BF0" },
      { name: "AWS", Icon: AwsText, color: "#FF9900", wordmark: true },
      { name: "Azure", Icon: Cloud, color: "#0078D4" },
    ],
  },
  {
    label: ["PMO & DELIVERY", "TOOLS USED DAILY"],
    HeaderIcon: Laptop,
    items: [
      { name: "Jira", Icon: SiJira, color: "#2684FF" },
      { name: "Confluence", Icon: SiConfluence, color: "#2684FF" },
      { name: "Kantata (PSA)", Icon: KantataBadge, color: "#8B7FF0" },
      { name: "MS Project", Icon: GanttChart, color: "#31752F" },
      { name: "Azure DevOps", Icon: InfinityIcon, color: "#0078D4" },
      { name: "Asana", Icon: SiAsana, color: "#F06A6A" },
      { name: "Salesforce", Icon: SalesforceMark, color: "#00A1E0" },
      { name: "Slack / Teams", Icon: SlackMark, color: null },
    ],
  },
  {
    label: ["AI & AUTOMATION", "BUILT & RUN"],
    HeaderIcon: Zap,
    items: [
      { name: "Glean Agent Builder", Icon: GleanMark, color: "#8B7FF0" },
      { name: "Claude (Anthropic)", Icon: SiClaude, color: "#D97757" },
      { name: "n8n (workflow automation)", Icon: SiN8N, color: "#EA4B71" },
      { name: "Google Apps Script", Icon: SiGoogleappsscript, color: "#4285F4" },
      { name: "Salesforce MCP", Icon: SalesforceMark, color: "#00A1E0" },
      { name: "Slack MCP", Icon: SlackMark, color: null },
      { name: "Google Drive MCP", Icon: SiGoogledrive, color: "#4285F4" },
    ],
  },
];

function ItemChip({ item }: { item: StackItem }) {
  const { Icon, color, name, wordmark } = item;
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-2 rounded-card"
      style={{ border: `1px solid ${CARD_BORDER}`, background: "var(--color-card-subtle)" }}
    >
      <Icon size={16} color={color ?? undefined} style={{ color: color ?? undefined }} />
      {!wordmark && (
        <span className="font-heading text-[12.5px] text-fg/80 whitespace-nowrap">{name}</span>
      )}
    </div>
  );
}

function CategoryCard({ category, index, inView }: { category: StackCategory; index: number; inView: boolean }) {
  const { label, HeaderIcon, items } = category;
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

      <div className="flex items-center gap-3 mb-3">
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

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <ItemChip key={item.name} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

export default function DeliveryExposure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="py-24" style={{ background: NAVY }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="mb-14">
          <SectionHeading
            eyebrow="05 / STACK"
            segments={[
              { text: "The tools and platforms", style: "fill" },
              { text: "behind the programs.", style: "lime" },
            ]}
          />
          <p className="text-[15px] text-fg/65 max-w-2xl leading-relaxed mt-5">
            The platforms my programs have run on. I don&apos;t engineer on them, but I know
            them well enough to scope the work and keep up in technical discussions. The last
            group is different: those are the tools I build with.
          </p>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 gap-5">
          {stacks.map((category, i) => (
            <CategoryCard key={category.label.join(" ")} category={category} index={i} inView={inView} />
          ))}
        </div>
        <SwipeCarousel ariaLabel="Tools and platforms delivered on, swipeable carousel" className="sm:hidden">
          {stacks.map((category, i) => (
            <CategoryCard key={category.label.join(" ")} category={category} index={i} inView={inView} />
          ))}
        </SwipeCarousel>
      </div>
    </section>
  );
}
