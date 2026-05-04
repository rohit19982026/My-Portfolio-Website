"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563eb]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#06b6d4]/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-[#f59e0b]/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#bfdbfe] bg-[#f0f9ff] text-sm font-medium text-[#2563eb] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          Open to new opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          Technical Project Manager{" "}
          <span className="gradient-text block mt-1">
            for Data at Scale
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg md:text-xl text-[#6b7280] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I ship cloud data platform migrations, ELT pipelines, and AI-powered
          PMO tools — leading cross-functional teams from discovery to production.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full text-white font-semibold gradient-bg hover:opacity-90 transition-opacity shadow-lg shadow-blue-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full font-semibold border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#f0f9ff] transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "2,300+", label: "Tables Migrated" },
            { value: "3+", label: "Cloud Platforms" },
            { value: "5+", label: "Years Experience" },
            { value: "10+", label: "Projects Delivered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-[#6b7280] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6b7280]"
      >
        <span className="text-xs">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-0.5 h-6 bg-[#bfdbfe] rounded-full"
        />
      </motion.div>
    </section>
  );
}
