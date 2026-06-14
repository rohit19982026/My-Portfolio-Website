"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "rohit-kumar-singh-a61746156", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

const engagementTypes = [
  {
    icon: "🏗️",
    title: "Platform Build or Migration",
    desc: "Snowflake, Databricks, AWS. PM end-to-end on the engagement — kickoff, sprint cadence, RAID, weekly status, financials, closure.",
  },
  {
    icon: "🤖",
    title: "GenAI Program Delivery",
    desc: "LLM integrations and AI agent builds. Same three-phase cadence and the same governance the rest of delivery gets — no special treatment because it's AI.",
  },
  {
    icon: "🔁",
    title: "Mid-Stream Pickup",
    desc: "Inherited engagements where the previous PM is rolling off. Standard PM transition — scope, team, cadence, financials, RAID, access — then back to the regular weekly rhythm.",
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
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #E2E8F0 20%, #E2E8F0 80%, transparent)" }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, background: "#1D4ED8", opacity: 0.03, filter: "blur(80px)", top: -100, left: "50%", transform: "translateX(-50%)" }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1D4ED8] block mb-5">08 / LET&apos;S TALK</span>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ type: "spring", stiffness: 65, damping: 16, delay: 0.1 }}
              className="font-display font-bold tracking-tight leading-[0.97] mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)", color: "#0F172A" }}
            >
              Got a{" "}
              <span className="font-normal" style={{ background: "linear-gradient(135deg, #60A5FA, #1D4ED8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>complex</span>
              <br />data &amp; AI program?
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-[16px] text-[#475569] max-w-xl leading-relaxed"
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
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <motion.div key={link.label} variants={linkItem} className="flex items-center gap-4 group">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#94A3B8] w-20 shrink-0">{link.label}</span>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="text-[14px] font-semibold text-[#475569] hover:text-[#1D4ED8] transition-colors"
                    target={link.label === "LINKEDIN" ? "_blank" : undefined}
                    rel={link.label === "LINKEDIN" ? "noopener noreferrer" : undefined}
                  >
                    {link.value}
                  </motion.a>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={linkItem}
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{ border: "1px solid rgba(110,231,183,0.25)", background: "rgba(110,231,183,0.06)" }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2.5 h-2.5 rounded-full bg-[#6EE7B7] shrink-0"
              />
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6EE7B7]">OPEN FOR PROGRAMS</p>
                <p className="font-mono text-[10px] text-[#94A3B8] mt-0.5">Kolkata, India · IST · Available globally</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — engagement cards */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {engagementTypes.map((e) => (
              <motion.div
                key={e.title}
                variants={cardItem}
                whileHover={{ x: 4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
                className="flex gap-4 p-5 rounded-2xl cursor-default"
                style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <span className="text-2xl shrink-0">{e.icon}</span>
                <div>
                  <p className="font-semibold text-[#0F172A] text-[14px] mb-1">{e.title}</p>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.a
              variants={cardItem}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              href="mailto:singhrohit.25119@gmail.com"
              className="w-full mt-2 py-3.5 rounded-full font-mono font-bold text-[12px] uppercase tracking-[0.12em] text-white flex items-center justify-center gap-2"
              style={{ background: "#1D4ED8", boxShadow: "0 0 24px rgba(30,64,175,0.25)" }}
            >
              Email Me Directly →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
