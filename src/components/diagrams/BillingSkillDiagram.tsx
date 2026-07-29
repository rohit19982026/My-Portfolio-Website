import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Compact portrait layout — reads natively at ~340px (this site's Tools
// cards are ~340-390px wide on both mobile and desktop), no horizontal
// scroll needed on either.
const nodes: DiagramNode[] = [
  { id: "psa",     x: 15,  y: 20,  w: 150, h: 48, label: "PSA Tool",     sub: "Raw time data",      tone: "ink" },
  { id: "json",    x: 175, y: 20,  w: 150, h: 48, label: "JSON Input",   sub: "Structured payload", tone: "ink" },
  { id: "orch",    x: 70,  y: 96,  w: 200, h: 48, label: "Prompt Chain", sub: "Orchestrator",       tone: "lime" },
  { id: "disc",    x: 30,  y: 180, w: 280, h: 44, label: "Discrepancy",  sub: "Detector prompt",    tone: "blue" },
  { id: "narr",    x: 30,  y: 236, w: 280, h: 44, label: "Narrative",    sub: "Generator prompt",   tone: "blue" },
  { id: "expl",    x: 30,  y: 292, w: 280, h: 44, label: "Exception",    sub: "Explainer prompt",   tone: "blue" },
  { id: "llm",     x: 90,  y: 396, w: 160, h: 48, label: "LLM API",      sub: "Claude",             tone: "lime" },
  { id: "review",  x: 15,  y: 468, w: 150, h: 48, label: "PM Review",    sub: "Human gate",         tone: "white" },
  { id: "finance", x: 175, y: 468, w: 150, h: 48, label: "Finance Out",  sub: "Sign-off ready",     tone: "lime" },
];

const edges: DiagramEdge[] = [
  { d: "M 90 68 Q 90 84 140 96",     delay: 0.1 },
  { d: "M 250 68 Q 250 84 200 96",   delay: 0.15 },
  { d: "M 170 144 L 170 180",        delay: 0.3 },
  { d: "M 170 144 Q 40 190 60 236",  delay: 0.35 },
  { d: "M 170 144 Q 20 220 60 292",  delay: 0.4 },
  { d: "M 170 224 Q 150 320 140 396", delay: 0.55 },
  { d: "M 170 280 Q 220 330 200 396", delay: 0.6 },
  { d: "M 170 336 Q 220 365 200 396", delay: 0.65 },
  { d: "M 170 444 Q 130 456 90 468",  delay: 0.8 },
  { d: "M 170 444 Q 210 456 250 468", delay: 0.85 },
];

export default function BillingSkillDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 540"
      nodes={nodes}
      edges={edges}
      badge={{ x: 30, y: 344, w: 280, h: 28, label: "Schema validation guardrail" }}
      ariaLabel="Month-end billing review agent architecture"
    />
  );
}
