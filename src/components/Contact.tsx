"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
            Contact
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3 mb-4">
            Let&apos;s build something{" "}
            <span className="gradient-text">great together</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Whether you&apos;re migrating a data platform, scaling your PMO, or
            exploring AI tooling — I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-2 space-y-6"
          >
            {[
              {
                icon: "✉️",
                label: "Email",
                value: "rohit@example.com",
                href: "mailto:rohit@example.com",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "linkedin.com/in/rohit",
                href: "#",
              },
              {
                icon: "📍",
                label: "Location",
                value: "Remote — Open to Global",
                href: null,
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[#2563eb] font-medium hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[#374151] font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-[#ecfdf5] border border-[#10b981]">
                <span className="text-4xl mb-3">✅</span>
                <h3 className="font-heading font-bold text-[#111827] text-xl mb-2">
                  Message sent!
                </h3>
                <p className="text-[#6b7280]">
                  Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">
                      Name
                    </label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#bfdbfe] bg-[#f0f9ff] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#bfdbfe] bg-[#f0f9ff] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#bfdbfe] bg-[#f0f9ff] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#bfdbfe] bg-[#f0f9ff] text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full font-semibold text-white gradient-bg hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
