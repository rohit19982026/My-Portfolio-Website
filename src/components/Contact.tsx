"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="py-24 section-alt relative overflow-hidden"
      style={{ borderTop: "1px solid #E2E8F0" }}
    >
      {/* Subtle glow orb */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "#2563EB",
          opacity: 0.04,
          filter: "blur(80px)",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              05 / LET&apos;S BUILD SOMETHING
            </span>
          </div>
          <h2
            className="font-heading font-bold tracking-tight leading-[0.97] mb-5"
            style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
          >
            Got a <span className="gradient-text italic font-normal">complex</span>
            <br />data &amp; AI program?
          </h2>
          <p className="text-[16px] text-[#64748B] max-w-xl leading-relaxed">
            Whether it&apos;s a platform migration, a program rescue, or a managed delivery
            engagement — reach out directly and I&apos;ll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <div key={link.label} className="flex items-center gap-4 group">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#94A3B8] w-20 shrink-0">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-[14px] font-semibold text-[#64748B] group-hover:text-[#2563EB] transition-colors"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{ border: "1px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.06)" }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#10B981]">
                  OPEN FOR PROGRAMS
                </p>
                <p className="font-mono text-[10px] text-[#94A3B8] mt-0.5">
                  Bengaluru, India · IST · Available globally
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                label: "PLATFORM MIGRATION",
                text: "Redshift → Databricks, SQL Server → Snowflake, Hadoop → Snowflake — scoped, governed, and delivered.",
              },
              {
                label: "PROGRAM RESCUE",
                text: "Stalled delivery, missing governance, budget overrun risk, or stakeholder misalignment — I've fixed all of them.",
              },
              {
                label: "MANAGED POD",
                text: "Ongoing data engineering retainer with embedded PMO governance, financial oversight, and renewal track record.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="p-5 rounded-xl"
                style={{ background: "#ffffff", border: "1px solid #E2E8F0" }}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563EB] mb-1.5">
                  {card.label}
                </p>
                <p className="text-[13px] text-[#64748B] leading-relaxed">{card.text}</p>
              </motion.div>
            ))}

            <a
              href="mailto:singhrohit.25119@gmail.com"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-mono font-bold text-[12px] uppercase tracking-[0.12em] text-white gradient-bg hover:opacity-90 transition-opacity mt-2"
            >
              Email Me Directly →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
