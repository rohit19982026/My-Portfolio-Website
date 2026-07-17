"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Building2, Bot, Repeat, ArrowRight, type LucideIcon } from "lucide-react";
import GlassSurface from "./GlassSurface";
import GlassButton from "./GlassButton";
import IconBadge from "./IconBadge";
import MobileCarousel from "./MobileCarousel";

const GlassBlobScene = dynamic(() => import("./three/GlassBlobScene"), { ssr: false });

function LinkedInIcon({ size = 16, color = "currentColor" }: { size?: number; strokeWidth?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const links: { label: string; value: string; href: string; icon: LucideIcon | typeof LinkedInIcon; color: string }[] = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com", icon: Mail, color: "var(--color-accent)" },
  { label: "LINKEDIN", value: "rohit-kumar-singh-a61746156", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/", icon: LinkedInIcon, color: "var(--color-purple)" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119", icon: Phone, color: "var(--color-green)" },
];

const engagementTypes = [
  {
    icon: Building2,
    color: "var(--color-accent)",
    title: "Platform Build or Migration",
    desc: "Snowflake, Databricks, AWS. I own the program end to end — kickoff through closure, covering the weekly delivery rhythm, risk management, stakeholder communication, and financials.",
  },
  {
    icon: Bot,
    color: "var(--color-purple)",
    title: "GenAI Program Delivery",
    desc: "LLM integrations and AI agent builds. Structured delivery, real governance, and the same stakeholder accountability as any other program — because \"it's AI\" isn't a reason to skip the controls.",
  },
  {
    icon: Repeat,
    color: "var(--color-orange)",
    title: "Mid-Stream Pickup",
    desc: "Programs where the previous PM is stepping off. I get current on scope, team, risk, and financials fast, and take the program from there without disrupting delivery.",
  },
];

const linkVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const linkItem = {
  hidden: { opacity: 0, x: -20, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

const cardVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
const cardItem = {
  hidden: { opacity: 0, x: 24, scale: 0.97, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 90, damping: 20 } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Closing visual — a soft green glass blob behind the "open for
          programs" pill, desktop only. A calm, low-key note to end the
          page on rather than a loud centerpiece. */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        style={{ position: "absolute", bottom: "-8%", left: "-6%", width: "420px", height: "420px", opacity: 0.4, filter: "blur(24px)", zIndex: 0 }}
      >
        <GlassBlobScene color="#30D158" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] block mb-5" style={{ color: "var(--color-accent-dk)" }}>08 / LET&apos;S TALK</span>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.1 }}
              className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "var(--color-text)" }}
            >
              Got a{" "}
              <span className="font-normal" style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>complex</span>
              <br />data &amp; AI program?
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-[16px] max-w-xl leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Platform build, GenAI delivery, or an engagement that needs picking
            up mid-stream — happy to talk through what the work actually is before
            anything else.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          {/* Left — contact links */}
          <motion.div
            variants={linkVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="space-y-3 mb-10">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={linkItem}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="glass flex items-center gap-4 px-4 py-3 rounded-2xl group"
                  target={link.label === "LINKEDIN" ? "_blank" : undefined}
                  rel={link.label === "LINKEDIN" ? "noopener noreferrer" : undefined}
                >
                  <IconBadge icon={link.icon} color={link.color} size={36} iconSize={15} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--color-faint)" }}>{link.label}</p>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--color-text)" }}>{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div variants={linkItem}>
              <GlassSurface accent="#30D158" radius="pill" className="inline-flex items-center gap-3 px-5 py-3.5">
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: "var(--color-green)" }}
                />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-green-text)" }}>OPEN FOR PROGRAMS</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--color-faint)" }}>Kolkata, India · IST · Available globally</p>
                </div>
              </GlassSurface>
            </motion.div>
          </motion.div>

          {/* Right — engagement cards */}
          <div>
            {/* Mobile: swipeable carousel */}
            <div className="md:hidden mb-4">
              <MobileCarousel>
                {engagementTypes.map((e) => {
                  const Icon = e.icon;
                  return (
                    <GlassSurface key={e.title} interactive radius="lg" className="flex gap-4 p-5 h-full">
                      <IconBadge icon={Icon} color={e.color} size={40} iconSize={18} />
                      <div>
                        <p className="font-semibold text-[14px] mb-1" style={{ color: "var(--color-text)" }}>{e.title}</p>
                        <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{e.desc}</p>
                      </div>
                    </GlassSurface>
                  );
                })}
              </MobileCarousel>
            </div>
            {/* Desktop: stacked list */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="hidden md:block space-y-4"
            >
              {engagementTypes.map((e) => {
                const Icon = e.icon;
                return (
                  <motion.div key={e.title} variants={cardItem}>
                    <GlassSurface interactive radius="lg" className="flex gap-4 p-5">
                      <IconBadge icon={Icon} color={e.color} size={40} iconSize={18} />
                      <div>
                        <p className="font-semibold text-[14px] mb-1" style={{ color: "var(--color-text)" }}>{e.title}</p>
                        <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{e.desc}</p>
                      </div>
                    </GlassSurface>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-4">
              <GlassButton href="mailto:singhrohit.25119@gmail.com" variant="primary" className="w-full justify-center" icon={<ArrowRight size={15} strokeWidth={2.5} />}>
                Email Me Directly
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
