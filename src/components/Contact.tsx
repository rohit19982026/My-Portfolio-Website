"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  {
    label: "EMAIL",
    value: "singhrohit.25119@gmail.com",
    href: "mailto:singhrohit.25119@gmail.com",
  },
  {
    label: "LINKEDIN",
    value: "rohit-kumar-singh-a61746156",
    href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/",
  },
  {
    label: "PHONE",
    value: "+91 62945 15177",
    href: "tel:+916294515177",
  },
];

const engagementTypes = [
  {
    icon: "🏗️",
    title: "Platform Build / Migration",
    desc: "Snowflake, Databricks, AWS — end-to-end program ownership from scoping through delivery close.",
  },
  {
    icon: "🤖",
    title: "GenAI Program Delivery",
    desc: "LLM integrations, AI agent builds, and AI-augmented engineering programs with real delivery governance.",
  },
  {
    icon: "🚨",
    title: "Program Rescue",
    desc: "Scope drift, budget bleed, stalled delivery. I stabilise fast and restore exec confidence.",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.18), transparent 65%), #0A0A12",
        borderTop: "1px solid rgba(167,139,250,0.14)",
      }}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "#8B5CF6",
          opacity: 0.08,
          filter: "blur(80px)",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
              06 / LET&apos;S TALK
            </span>
          </div>
          <h2
            className="font-display font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Got a <span className="gradient-text italic font-normal">complex</span>
            <br />data &amp; AI program?
          </h2>
          <p className="text-[16px] text-[#A8A4C7] max-w-xl leading-relaxed">
            Whether it&apos;s a platform migration, a GenAI delivery, or a program that needs
            rescuing — I&apos;d rather understand the problem first before discussing engagement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Left — contact info + availability */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <div key={link.label} className="flex items-center gap-4 group">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B6B8A] w-20 shrink-0">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-[14px] font-semibold text-[#A8A4C7] hover:text-[#A78BFA] transition-colors"
                    target={link.label === "LINKEDIN" ? "_blank" : undefined}
                    rel={link.label === "LINKEDIN" ? "noopener noreferrer" : undefined}
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            <div
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{ border: "1px solid rgba(110,231,183,0.25)", background: "rgba(110,231,183,0.06)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#6EE7B7] shrink-0"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6EE7B7]">
                  OPEN FOR PROGRAMS
                </p>
                <p className="font-mono text-[10px] text-[#6B6B8A] mt-0.5">
                  Kolkata, India · IST · Available globally
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — engagement types */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {engagementTypes.map((e) => (
              <div
                key={e.title}
                className="flex gap-4 p-5 rounded-2xl"
                style={{
                  background: "rgba(167,139,250,0.05)",
                  border: "1px solid rgba(167,139,250,0.14)",
                }}
              >
                <span className="text-2xl shrink-0">{e.icon}</span>
                <div>
                  <p className="font-semibold text-[#EDE9FE] text-[14px] mb-1">{e.title}</p>
                  <p className="text-[13px] text-[#A8A4C7] leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}

            <a
              href="mailto:singhrohit.25119@gmail.com"
              className="w-full mt-2 py-3.5 rounded-full font-mono font-bold text-[12px] uppercase tracking-[0.12em] text-[#0A0A12] transition-all duration-200 hover:brightness-110 flex items-center justify-center gap-2"
              style={{ background: "#A78BFA", boxShadow: "0 0 24px rgba(167,139,250,0.3)" }}
            >
              Email Me Directly →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
