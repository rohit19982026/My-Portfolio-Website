"use client";

import { motion, MotionConfig, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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

const EASE = [0.2, 0.7, 0.2, 1] as const;
const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const cardV: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE, staggerChildren: 0.09, delayChildren: 0.12 } },
};
const artV: Variants = {
  hidden: { opacity: 0, scale: 0.55, rotate: -9 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 110, damping: 11, mass: 0.9 } },
};
const lineV: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: EASE, delay: 0.1 } },
};
const chipsV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
const chipV: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 18 } },
};
const iconV: Variants = {
  hidden: { rotate: -80, scale: 0.4 },
  show: { rotate: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 12, delay: 0.08 } },
};

function StackCard({ card, index }: { card: Card; index: number }) {
  return (
    <motion.li
      variants={cardV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
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
        <motion.p variants={rise} className="flex items-center gap-2.5 font-sans text-[22px] font-extrabold leading-none sm:text-[32px]" style={{ color: card.numColor }}>
          {card.n}
          <motion.span variants={lineV} aria-hidden className="h-px w-7 origin-left sm:w-11" style={{ background: card.numColor }} />
        </motion.p>
        <motion.div variants={artV} className="flex flex-1 items-center justify-center pt-2 sm:pt-3">
          {/* idle drift, offset per card so the three never move together */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, index % 2 ? -1.5 : 1.5, 0] }}
            transition={{ duration: 5 + index * 0.9, repeat: Infinity, ease: "easeInOut" }}
            className="w-full"
          >
            <Image
              src={card.art.src}
              alt=""
              width={card.art.w}
              height={card.art.h}
              className="pointer-events-none -mr-2 h-auto w-[150%] max-w-none select-none sm:mr-0 sm:w-full sm:max-w-[190px]"
              style={{ mixBlendMode: "multiply", WebkitMaskImage: MASK, maskImage: MASK, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="min-w-0">
        <motion.p variants={rise} className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] sm:text-[13px]" style={{ color: card.accent }}>
          {card.kicker}
        </motion.p>
        <motion.h3 variants={rise} className="mt-1.5 font-sans font-bold leading-tight tracking-[-0.02em]" style={{ fontSize: "clamp(1.2rem, 5.2vw, 1.75rem)", color: INK }}>
          {card.title}
        </motion.h3>
        <motion.p variants={rise} className="mt-2 font-sans text-[13.5px] leading-relaxed sm:text-[15.5px]" style={{ color: MUTED }}>
          {card.blurb}
        </motion.p>
        <motion.ul variants={chipsV} className="mt-4 flex flex-wrap gap-2">
          {card.chips.map((c) => (
            <motion.li
              key={c.name}
              variants={chipV}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 15 } }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-sans text-[12.5px] font-medium sm:px-3.5 sm:py-2 sm:text-[14px]"
              style={{ color: INK, border: "1px solid rgba(110,100,180,.13)", boxShadow: "0 6px 14px -9px rgba(80,70,160,.35)" }}
            >
              <motion.span variants={iconV} className="inline-flex">
                <Image src={`/stack/i-${c.icon}.png`} alt="" width={20} height={20} className="h-[18px] w-[18px] select-none sm:h-5 sm:w-5" />
              </motion.span>
              {c.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.li>
  );
}

const WORDS = ["Behind", "the", "Programs"];

export default function DeliveryExposure() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const swooshY = useTransform(scrollYProgress, [0, 1], [-24, 70]);
  const swooshX = useTransform(scrollYProgress, [0, 1], [20, -14]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={sectionRef} id="stack" className="relative overflow-hidden py-20 sm:py-24" style={{ background: "#fefdfd", color: INK }}>
        <motion.div aria-hidden className="pointer-events-none absolute right-0 top-0 w-[clamp(200px,38vw,380px)]" style={{ y: swooshY, x: swooshX }}>
          <Image
            src="/stack/swoosh.png"
            alt=""
            width={344}
            height={270}
            className="w-full select-none"
            style={{ mixBlendMode: "multiply", WebkitMaskImage: SWOOSH_MASK, maskImage: SWOOSH_MASK, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
          />
        </motion.div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            className="mb-9 sm:mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p variants={rise} className="flex items-center gap-4 font-sans text-[12px] font-semibold uppercase tracking-[0.24em] sm:text-[13px]" style={{ color: "#6b7083" }}>
              <motion.span variants={lineV} aria-hidden className="h-[2px] w-9 origin-left" style={{ background: BLUE }} />
              Tools &amp; Platforms
            </motion.p>
            <h2 className="mt-4 font-sans font-extrabold leading-[1.04] tracking-[-0.035em]" style={{ fontSize: "clamp(2.2rem, 9.5vw, 3.7rem)", color: INK }}>
              {WORDS.map((w, i) => (
                <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: "110%" },
                      show: { y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.08 * i } },
                    }}
                  >
                    {i === 2 ? (
                      <motion.span
                        style={{
                          backgroundImage: `linear-gradient(100deg, ${BLUE} 40%, #9a95ff 50%, ${BLUE} 60%)`,
                          backgroundSize: "250% 100%",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                        variants={{
                          hidden: { backgroundPositionX: "100%" },
                          show: { backgroundPositionX: "0%", transition: { duration: 1.6, ease: "easeInOut", delay: 0.9 } },
                        }}
                      >
                        {w}
                      </motion.span>
                    ) : (
                      w
                    )}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.span
              aria-hidden
              variants={{ hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 0.5, delay: 0.7, ease: EASE } } }}
              className="absolute right-[12%] top-[4.2rem] hidden h-9 w-[2px] origin-top -rotate-45 sm:block"
              style={{ background: BLUE }}
            />
            <motion.p variants={rise} className="mt-4 max-w-2xl font-sans text-[15px] leading-relaxed sm:text-[17px]" style={{ color: MUTED }}>
              The platforms my programs have run on. I don&apos;t engineer on them, but I know them well enough to scope the
              work and keep up in technical discussions. The last group is different: those are the tools I build with.
            </motion.p>
          </motion.div>

          <ol className="grid gap-4 sm:gap-5">
            {cards.map((card, i) => (
              <StackCard key={card.n} card={card} index={i} />
            ))}
          </ol>
        </div>
      </section>
    </MotionConfig>
  );
}
