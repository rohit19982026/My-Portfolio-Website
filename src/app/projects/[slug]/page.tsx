import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Rohit Kumar Singh`,
    description: project.summary,
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-heading text-2xl font-bold text-[#1D1D1F] mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-heading text-xl font-semibold text-[#1D1D1F] mt-7 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[#6E6E73] leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-4 ml-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-[#6E6E73] leading-relaxed flex gap-2 before:content-['▸'] before:text-[#0A84FF] before:shrink-0" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[#1D1D1F]" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse rounded-xl overflow-hidden" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-[#EAF4FF]" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left font-semibold text-[#1D1D1F] border border-[#CFE7FF]" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-[#6E6E73] border border-[#CFE7FF]" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="even:bg-[#F2F8FF]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="border-l-4 border-[#0A84FF] pl-4 my-4 text-[#757579] italic" {...props} />
  ),
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Header band */}
      <div className="relative overflow-hidden" style={{ backgroundColor: `${project.accentColor}10` }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#757579] hover:text-[#0A84FF] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span
              className="text-xs font-bold px-3 py-1 rounded-md text-white"
              style={{ backgroundColor: project.accentColor }}
            >
              {project.industry}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-md bg-white border border-[#CFE7FF] text-[#757579]">
              {project.duration}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-md bg-white border border-[#CFE7FF] text-[#757579]">
              {project.role}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-[#6E6E73] max-w-2xl leading-relaxed mb-8">
            {project.summary}
          </p>

          {/* Outcome highlight */}
          <div
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm"
            style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Key outcome: {project.outcome}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-5 rounded-2xl border border-[#CFE7FF] bg-[#EAF4FF]">
                <h4 className="font-heading font-semibold text-[#1D1D1F] text-sm mb-4">Project Details</h4>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-[#757579] text-xs uppercase tracking-wide">Client</dt>
                    <dd className="font-medium text-[#1D1D1F] mt-0.5">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-[#757579] text-xs uppercase tracking-wide">Industry</dt>
                    <dd className="font-medium text-[#1D1D1F] mt-0.5">{project.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-[#757579] text-xs uppercase tracking-wide">Duration</dt>
                    <dd className="font-medium text-[#1D1D1F] mt-0.5">{project.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-[#757579] text-xs uppercase tracking-wide">Role</dt>
                    <dd className="font-medium text-[#1D1D1F] mt-0.5">{project.role}</dd>
                  </div>
                </dl>
              </div>

              <div className="p-5 rounded-2xl border border-[#CFE7FF] bg-[#EAF4FF]">
                <h4 className="font-heading font-semibold text-[#1D1D1F] text-sm mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-white border border-[#CFE7FF] text-[#0A84FF] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/#contact"
                className="block w-full text-center py-3 rounded-full text-white text-sm font-semibold gradient-bg hover:opacity-90 transition-opacity"
              >
                Discuss a similar project
              </Link>
            </div>
          </aside>

          {/* MDX body */}
          <div className="lg:col-span-3 order-1 lg:order-2 min-w-0">
            <MDXRemote source={project.content} components={mdxComponents} />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[#CFE7FF] flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#757579] hover:text-[#0A84FF] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All projects
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-2.5 rounded-full text-white text-sm font-semibold gradient-bg hover:opacity-90 transition-opacity"
          >
            Work with me
          </Link>
        </div>
      </div>
    </div>
  );
}
