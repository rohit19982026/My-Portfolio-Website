import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Logos are cropped straight from the supplied reference design
// (public/tools/*.png), not redrawn, so they match it exactly.
const tools = [
  { name: "Claude", src: "/tools/claude.png" },
  { name: "Jira", src: "/tools/jira.png" },
  { name: "GitHub", src: "/tools/github.png" },
  { name: "Azure DevOps", src: "/tools/azure-devops.png" },
  { name: "Salesforce", src: "/tools/salesforce.png" },
  { name: "Certinia", src: "/tools/certinia.png" },
  { name: "Glean", src: "/tools/glean.png" },
  { name: "Cursor", src: "/tools/cursor.png" },
] as const;

const INK = "#0d0d0f";
const BLUE = "#0d22ee";

// Fixed light panel in both themes, like the resume cards.
export default function ToolsPanel() {
  return (
    <section
      aria-labelledby="tools-panel-title"
      className="rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-10"
      style={{
        background: "#fffefd",
        border: "1px solid rgba(40,30,90,0.07)",
        boxShadow: "0 28px 50px -34px rgba(110,90,200,0.4)",
        color: INK,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div className="min-w-0 flex-1 basis-[22rem]">
          <p className="flex items-center gap-4 font-sans text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: "#4a4766" }}>
            My toolkit
            <span aria-hidden className="h-[3px] w-12 rounded-full" style={{ background: BLUE }} />
          </p>
          <h3
            id="tools-panel-title"
            className="mt-4 font-sans font-extrabold leading-[1.1] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.55rem, 5.2vw, 2.7rem)" }}
          >
            The tools I work with <span style={{ color: BLUE }}>every day</span>
            <span style={{ color: "#d7ff3f" }}>.</span>
          </h3>
          <p className="mt-3 max-w-3xl font-sans leading-relaxed" style={{ color: "#6b6880", fontSize: "clamp(0.88rem, 2.6vw, 1.15rem)" }}>
            Jira, Salesforce and Azure DevOps for delivery. Claude, Glean and Cursor for building tools. GitHub for the code.
          </p>
        </div>
        <a
          href="#stack"
          className="group inline-flex h-11 items-center gap-3 rounded-full px-5 font-sans text-[15px] font-medium transition-transform motion-safe:hover:-translate-y-0.5 sm:h-12 sm:px-6 sm:text-[17px]"
          style={{ background: "#ebe9fc", color: BLUE }}
        >
          View All Tools
          <ArrowRight size={18} className="transition-transform motion-safe:group-hover:translate-x-1" />
        </a>
      </div>

      <ul className="mt-6 grid grid-cols-4 gap-2.5 sm:mt-9 sm:grid-cols-8 sm:gap-3">
        {tools.map((t) => (
          <li
            key={t.name}
            className="flex flex-col items-center justify-start gap-2 rounded-2xl px-1.5 pb-3 pt-3 text-center sm:gap-3 sm:pb-4 sm:pt-4"
            style={{ background: "#fcfbfa", border: "1px solid rgba(40,30,90,0.07)" }}
          >
            <Image
              src={t.src}
              alt=""
              width={112}
              height={112}
              sizes="(min-width: 640px) 64px, 52px"
              className="h-[52px] w-[52px] select-none rounded-xl sm:h-16 sm:w-16"
            />
            <span className="font-sans text-[11.5px] font-medium leading-tight sm:text-[14px]">{t.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
