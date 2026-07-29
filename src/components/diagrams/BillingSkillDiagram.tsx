import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const nodes: DiagramNode[] = [
  { id: "psa",     x: 20,  y: 108, w: 100, h: 40, label: "PSA Tool",     sub: "Raw time data",      tone: "ink" },
  { id: "json",    x: 170, y: 108, w: 100, h: 40, label: "JSON Input",   sub: "Structured payload", tone: "ink" },
  { id: "orch",    x: 330, y: 108, w: 120, h: 40, label: "Prompt Chain", sub: "Orchestrator",       tone: "lime" },
  { id: "disc",    x: 510, y: 50,  w: 120, h: 40, label: "Discrepancy",  sub: "Detector prompt",    tone: "blue" },
  { id: "narr",    x: 510, y: 108, w: 120, h: 40, label: "Narrative",    sub: "Generator prompt",   tone: "blue" },
  { id: "expl",    x: 510, y: 166, w: 120, h: 40, label: "Exception",    sub: "Explainer prompt",   tone: "blue" },
  { id: "llm",     x: 690, y: 108, w: 100, h: 40, label: "LLM API",      sub: "Claude",             tone: "lime" },
  { id: "review",  x: 690, y: 60,  w: 100, h: 40, label: "PM Review",    sub: "Human gate",         tone: "white" },
  { id: "finance", x: 690, y: 156, w: 100, h: 40, label: "Finance Out",  sub: "Sign-off ready",     tone: "lime" },
];

const edges: DiagramEdge[] = [
  { d: "M 120 128 L 170 128", delay: 0.1 },
  { d: "M 270 128 L 330 128", delay: 0.25 },
  { d: "M 450 118 Q 480 88 510 70",   delay: 0.4 },
  { d: "M 450 128 L 510 128",         delay: 0.45 },
  { d: "M 450 138 Q 480 168 510 186", delay: 0.5 },
  { d: "M 630 70 Q 660 80 690 80",    delay: 0.65 },
  { d: "M 630 128 L 690 128",         delay: 0.7 },
  { d: "M 630 186 Q 660 176 690 176", delay: 0.75 },
  { d: "M 790 80 Q 800 90 790 118",   delay: 0.9 },
  { d: "M 790 148 Q 800 158 790 168", delay: 0.95 },
];

export default function BillingSkillDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 830 230"
      nodes={nodes}
      edges={edges}
      badge={{ x: 310, y: 165, w: 160, h: 26, label: "Schema validation guardrail" }}
      phases={[
        { x: 70, label: "Input" },
        { x: 220, label: "Prep" },
        { x: 390, label: "Prompts" },
        { x: 570, label: "LLM" },
        { x: 740, label: "Output" },
      ]}
      ariaLabel="Month-end billing review agent architecture"
    />
  );
}
