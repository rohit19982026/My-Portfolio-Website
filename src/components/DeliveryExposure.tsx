"use client";

import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";

/*
 * Section 05 follows the supplied design: three tinted cards (number, 3D
 * illustration, kicker, title, one plain sentence, tool pills). The
 * illustrations, the corner swoosh and every tool icon are crops of that
 * design (public/stack/); the text, lines and pills are real elements.
 * A fixed light section in both themes so the design stays exact.
 */

const INK = "#031536";
const MUTED = "#5f6477";
const BLUE = "#3d36f5";
const MASK =
  "linear-gradient(to right, transparent 0, #000 14%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%)";
const SWOOSH_MASK =
  "linear-gradient(to right, transparent 0, #000 40%), linear-gradient(to bottom, #000 55%, transparent 100%)";

type Chip = { name: string; icon: string };
type Card = {
  n: string;
  kicker: string;
  title: string;
  accent: string;
  numColor: string;
  tint: string;
  art: { src: string; w: number; h: number };
  blurb: string;
  chips: Chip[];
};

// Only things the rest of the site already says: which platforms and tools
// were involved and what my part in them was. No program types, outcomes
// or numbers.
const cards: Card[] = [
  {
    n: "01",
    kicker: "Used daily",
    title: "PMO & Delivery Tools",
    accent: "#7956fb",
    numColor: "#bcaef7",
    tint: "#f4f2ff",
    art: { src: "/stack/art-laptop.png", w: 225, h: 215 },
    blurb:
      "My everyday delivery stack: Jira and Confluence for backlog and documentation, Kantata as our PSA tool, and Salesforce for client and SOW records. MS Project, Azure DevOps or Asana when a client works in them, and Slack or Teams to stay in touch.",
    chips: [
      { name: "Jira", icon: "jira" },
      { name: "Confluence", icon: "confluence" },
      { name: "Kantata", icon: "kantata" },
      { name: "Salesforce", icon: "salesforce" },
      { name: "MS Project", icon: "msproject" },
      { name: "Asana", icon: "asana" },
      { name: "Slack", icon: "slack" },
      { name: "Teams", icon: "teams" },
    ],
  },
  {
    n: "02",
    kicker: "Built & run",
    title: "AI & Automation",
    accent: "#f0a200",
    numColor: "#f7c566",
    tint: "#fff7e8",
    art: { src: "/stack/art-bolt.png", w: 210, h: 190 },
    blurb:
      "What I build with: Glean Agent Builder and Claude for the PMO agents, Google Apps Script and the Jira REST API for the dependency tracker, and n8n for workflow automation. MCP connections link them to Salesforce, Slack and Google Drive.",
    chips: [
      { name: "Glean", icon: "glean" },
      { name: "Claude", icon: "claude" },
      { name: "Google Apps Script", icon: "gas" },
      { name: "Jira REST API", icon: "jira" },
      { name: "n8n", icon: "n8n" },
      { name: "Salesforce", icon: "salesforce" },
      { name: "Slack", icon: "slack" },
      { name: "Google Drive", icon: "drive" },
    ],
  },
  {
    n: "03",
    kicker: "Delivered on",
    title: "Data Platforms",
    accent: "#2a8ef0",
    numColor: "#7db6f5",
    tint: "#eef6ff",
    art: { src: "/stack/art-db.png", w: 225, h: 195 },
    blurb:
      "The data programs I've managed ran on Snowflake and Databricks, along with Redshift, SQL Server, Hadoop and Sigma. I scope the work and follow the technical discussion; the engineers build it.",
    chips: [
      { name: "Snowflake", icon: "snowflake" },
      { name: "Databricks", icon: "databricks" },
      { name: "Redshift", icon: "redshift" },
      { name: "SQL Server", icon: "sqlserver" },
      { name: "Hadoop", icon: "hadoop" },
      { name: "Sigma", icon: "sigma" },
    ],
  },
];

function StackCard({ card, index }: { card: Card; index: number }) {
  return (
    <li
      data-flow="dev"
      className="grid grid-cols-[clamp(78px,22%,200px)_1fr] gap-x-4 rounded-[1.7rem] p-4 transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_var(--glow)] sm:gap-x-7 sm:p-7"
      style={
        {
          "--glow": card.accent,
          background: `linear-gradient(135deg, ${card.tint}, #ffffff 92%)`,
          border: `1px solid color-mix(in srgb, ${card.accent} 14%, #ffffff)`,
          boxShadow: `0 22px 44px -34px color-mix(in srgb, ${card.accent} 55%, transparent)`,
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col border-r pr-3 sm:pr-6" style={{ borderColor: `color-mix(in srgb, ${card.accent} 16%, #ffffff)` }}>
        <p className="flex items-center gap-2.5 font-sans text-[22px] font-extrabold leading-none sm:text-[32px]" style={{ color: card.numColor }}>
          {card.n}
          <span aria-hidden className="h-px w-7 origin-left sm:w-11" style={{ background: card.numColor }} />
        </p>
        <div className="flex flex-1 items-center justify-center pt-2 sm:pt-3">
          {/* the illustration sits on its own plane: it travels a little
              against the card as the card crosses the screen (see .art-drift) */}
          <div data-flow="drift" className="art-drift w-full" style={{ "--tilt": index % 2 ? -1 : 1 } as React.CSSProperties}>
            <Image
              src={card.art.src}
              alt=""
              width={card.art.w}
              height={card.art.h}
              className="pointer-events-none -mr-2 h-auto w-[150%] max-w-none select-none sm:mr-0 sm:w-full sm:max-w-[190px]"
              style={{ mixBlendMode: "multiply", WebkitMaskImage: MASK, maskImage: MASK, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] sm:text-[13px]" style={{ color: card.accent }}>
          {card.kicker}
        </p>
        <h3 className="mt-1.5 font-sans font-bold leading-tight tracking-[-0.02em]" style={{ fontSize: "clamp(1.2rem, 5.2vw, 1.75rem)", color: INK }}>
          {card.title}
        </h3>
        <p className="mt-2 font-sans text-[13.5px] leading-relaxed sm:text-[15.5px]" style={{ color: MUTED }}>
          {card.blurb}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {card.chips.map((c) => (
            <li
              key={c.name}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 transition-transform duration-200 motion-safe:hover:-translate-y-[3px]  font-sans text-[12.5px] font-medium sm:px-3.5 sm:py-2 sm:text-[14px]"
              style={{ color: INK, border: "1px solid rgba(110,100,180,.13)", boxShadow: "0 6px 14px -9px rgba(80,70,160,.35)" }}
            >
              <Image src={`/stack/i-${c.icon}.png`} alt="" width={20} height={20} className="h-[18px] w-[18px] select-none sm:h-5 sm:w-5" />
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function DeliveryExposure() {
  return (
    <section id="stack" data-flow="sheet" className="relative overflow-hidden py-20 sm:py-24" style={{ background: "#fefdfd", color: INK }}>
      <div aria-hidden data-flow="drift" className="swoosh-drift pointer-events-none absolute right-0 top-0 w-[clamp(200px,38vw,380px)]">
        <Image
          src="/stack/swoosh.png"
          alt=""
          width={344}
          height={270}
          className="w-full select-none"
          style={{ mixBlendMode: "multiply", WebkitMaskImage: SWOOSH_MASK, maskImage: SWOOSH_MASK, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-9 sm:mb-12">
          <SectionHeading
            variant="sans"
            eyebrow="Tools & Platforms"
            segments={[
              { text: "Behind the", style: "fill" },
              { text: "Programs", style: "lime" },
            ]}
            ink={INK}
            accent={BLUE}
            fontSize="clamp(2.2rem, 9.5vw, 3.7rem)"
          />
          <p data-flow="ink" className="mt-4 max-w-2xl font-sans text-[15px] leading-relaxed sm:text-[17px]" style={{ color: MUTED }}>
            The platforms my programs have run on. I don&apos;t engineer on them, but I know them well enough to scope the
            work and keep up in technical discussions. The last group is different: those are the tools I build with.
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-5">
          {cards.map((card, i) => (
            <StackCard key={card.n} card={card} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
