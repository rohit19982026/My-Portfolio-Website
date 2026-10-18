import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolCaseStudy from "@/components/ToolCaseStudy";
import { agents, getAgent } from "@/lib/agents";

export const dynamicParams = false;

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return {};
  return {
    title: `${agent.title} — Case study | Rohit Kumar Singh`,
    description: `${agent.problem} ${agent.solved}`,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();
  return <ToolCaseStudy agent={agent} />;
}
