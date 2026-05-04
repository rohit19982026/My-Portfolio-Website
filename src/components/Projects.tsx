"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

function ProjectCard({ project, index }: { project: ProjectMeta; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <article className="h-full flex flex-col rounded-2xl border-2 border-[#bfdbfe] bg-white p-6 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
          style={{ "--hover-color": project.accentColor } as React.CSSProperties}
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: project.accentColor }}
            >
              {project.industry}
            </span>
            <span className="text-xs text-[#6b7280]">{project.duration}</span>
          </div>

          {/* Title */}
          <h3
            className="font-heading font-bold text-xl text-[#111827] mb-2 group-hover:transition-colors"
            style={{ color: undefined }}
          >
            <span className="group-hover:text-[var(--hover-color)] transition-colors">
              {project.title}
            </span>
          </h3>

          {/* Client + Role */}
          <p className="text-sm font-medium text-[#6b7280] mb-3">
            {project.client} · {project.role}
          </p>

          {/* Summary */}
          <p className="text-sm text-[#374151] leading-relaxed flex-1 mb-5">
            {project.summary}
          </p>

          {/* Outcome pill */}
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
            style={{ backgroundColor: `${project.accentColor}15`, color: project.accentColor }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {project.outcome}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-[#f0f9ff] text-[#2563eb] border border-[#bfdbfe]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-5 flex items-center gap-1 text-sm font-semibold transition-colors"
            style={{ color: project.accentColor }}
          >
            Read case study
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: ProjectMeta[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
            Projects
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3 mb-4">
            Case studies from{" "}
            <span className="gradient-text">real engagements</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Each project follows the same structure: the problem, the approach,
            key decisions, and measurable outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
