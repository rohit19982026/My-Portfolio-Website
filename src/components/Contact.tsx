"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
  { label: "PHONE", value: "+91 89677 25119", href: "tel:+918967725119" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    setLoading(false);
    setSubmitted(true);
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-[14px] font-heading text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all";
  const inputStyle = {
    background: "#ffffff",
    border: "1px solid #E2E8F0",
  };

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
              06 / LET&apos;S BUILD SOMETHING
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
            Let&apos;s talk. Whether it&apos;s a platform migration, a program rescue, or a
            managed delivery engagement — I&apos;d rather understand the problem first.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Contact info */}
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
                  ● OPEN FOR PROGRAMS
                </p>
                <p className="font-mono text-[10px] text-[#94A3B8] mt-0.5">
                  Bengaluru, India · IST · Available globally
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center text-center p-10 rounded-2xl h-full"
                style={{ border: "1px solid rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.05)" }}
              >
                <span className="text-4xl mb-4">✅</span>
                <h3 className="font-heading font-bold text-[#0F172A] text-[22px] mb-2 tracking-tight">
                  Message received.
                </h3>
                <p className="text-[14px] text-[#64748B]">I&apos;ll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">Name</label>
                    <input name="name" required type="text" placeholder="Your name"
                      className={inputClass} style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">Email</label>
                    <input name="email" required type="email" placeholder="your@email.com"
                      className={inputClass} style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">Engagement type</label>
                  <select name="type"
                    className={inputClass} style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }}>
                    <option value="">Select commercial model</option>
                    <option>Fixed-Price Program</option>
                    <option>Time &amp; Materials</option>
                    <option>Managed Services / Pod</option>
                    <option>Advisory / Consulting</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">Tell me about the program</label>
                  <textarea name="message" required rows={5}
                    placeholder="Stack, scale, timeline, what's broken or what needs building..."
                    className={`${inputClass} resize-none`} style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-bg w-full py-3.5 rounded-full font-mono font-bold text-[12px] uppercase tracking-[0.12em] text-white transition-all duration-200 disabled:opacity-60 hover:brightness-110"
                >
                  {loading ? "Sending..." : "Let's Talk →"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
