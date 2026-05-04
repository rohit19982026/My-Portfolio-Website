"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Data Platforms",
    color: "#2563eb",
    skills: [
      { name: "Databricks", level: 90 },
      { name: "Snowflake", level: 85 },
      { name: "Amazon Redshift", level: 80 },
      { name: "Apache Spark", level: 75 },
    ],
  },
  {
    category: "ELT & Orchestration",
    color: "#06b6d4",
    skills: [
      { name: "dbt-core", level: 88 },
      { name: "Apache Airflow", level: 82 },
      { name: "Fivetran", level: 78 },
      { name: "SQL", level: 92 },
    ],
  },
  {
    category: "Cloud & Infra",
    color: "#10b981",
    skills: [
      { name: "AWS (S3, Glue, IAM)", level: 80 },
      { name: "Azure (ADF, ADLS)", level: 75 },
      { name: "Terraform", level: 65 },
      { name: "Git / CI-CD", level: 82 },
    ],
  },
  {
    category: "PM & AI Tools",
    color: "#f59e0b",
    skills: [
      { name: "Jira / Confluence", level: 95 },
      { name: "Prompt Engineering", level: 85 },
      { name: "Python (scripting)", level: 72 },
      { name: "LLM AI Skills (phData)", level: 80 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-[#374151]">{name}</span>
        <span className="text-[#6b7280]">{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-[#2563eb] uppercase tracking-widest">
            Technical Skills
          </span>
          <h2 className="font-heading text-4xl font-bold mt-3">
            Tools I work with <span className="gradient-text">every day</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="p-6 rounded-2xl border border-[#bfdbfe] bg-[#f0f9ff]"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }} />
                <h3 className="font-heading font-semibold text-[#111827]">{group.category}</h3>
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={group.color}
                  delay={gi * 0.1 + si * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
