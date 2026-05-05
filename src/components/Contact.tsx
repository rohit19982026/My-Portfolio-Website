"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const links = [
  { label: "EMAIL", value: "singhrohit.25119@gmail.com", href: "mailto:singhrohit.25119@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rohit-kumar-singh-a61746156", href: "https://www.linkedin.com/in/rohit-kumar-singh-a61746156/" },
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

  return (
    <section id="contact" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-5xl font-bold text-[#e5e7eb]">06</span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">/ LET&apos;S BUILD SOMETHING</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#111827] mb-4">
            Got a complex{" "}
            <span className="gradient-text">data & AI program?</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl leading-relaxed">
            Let&apos;s talk. Whether it&apos;s a platform migration, a program rescue, or a
            managed delivery engagement — I&apos;d rather understand the problem first.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-5 mb-10">
              {links.map((link) => (
                <div key={link.label} className="flex items-center gap-4 group">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b7280] w-20 shrink-0">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-[#111827] group-hover:text-[#2563eb] transition-colors"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-[#10b981]/40 bg-[#ecfdf5]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#10b981]">● OPEN FOR PROGRAMS</p>
                <p className="text-xs text-[#6b7280] mt-0.5">Bengaluru, India · IST · Available globally</p>
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
              <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-[#ecfdf5] border border-[#10b981]/40 h-full">
                <span className="text-4xl mb-4">✅</span>
                <h3 className="font-heading font-bold text-[#111827] text-xl mb-2">Message received.</h3>
                <p className="text-sm text-[#6b7280]">I&apos;ll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">Name</label>
                    <input name="name" required type="text" placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">Email</label>
                    <input name="email" required type="email" placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">Engagement type</label>
                  <select name="type"
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm transition">
                    <option value="">Select commercial model</option>
                    <option>Fixed-Price Program</option>
                    <option>Time & Materials</option>
                    <option>Managed Services / Pod</option>
                    <option>Advisory / Consulting</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-1.5">Tell me about the program</label>
                  <textarea name="message" required rows={5} placeholder="Stack, scale, timeline, what's broken or what needs building..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm transition resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-white gradient-bg hover:opacity-90 transition-opacity disabled:opacity-60">
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
