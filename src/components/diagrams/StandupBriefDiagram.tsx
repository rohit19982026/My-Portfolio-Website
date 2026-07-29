import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Parallelization: three independent tool-call retrievals synthesized by
// one reasoning step. No guardrail, no human-review node — the copy frames
// the brief as read directly ("30 seconds of reading"), not formally
// reviewed before use.
const nodes: DiagramNode[] = [
  { id: "trigger", x: 30, y: 20,  w: 280, h: 42, label: "Standup Trigger",         sub: "Daily, before standup",       tone: "ink" },
  { id: "jira",    x: 30, y: 90,  w: 280, h: 40, label: "Tool Call: Jira",         sub: "Sprint board status",         tone: "blue" },
  { id: "slack",   x: 30, y: 146, w: 280, h: 40, label: "Tool Call: Slack",        sub: "Channel threads",             tone: "blue" },
  { id: "notes",   x: 30, y: 202, w: 280, h: 40, label: "Tool Call: Meeting Notes", sub: "Prior standup notes",        tone: "blue" },
  { id: "agent",   x: 70, y: 278, w: 200, h: 48, label: "Standup Agent",           sub: "Claude",                     tone: "lime" },
  { id: "brief",   x: 50, y: 358, w: 240, h: 52, label: "One-Page Brief",          sub: "30-second read",             tone: "white" },
];

const edges: DiagramEdge[] = [
  { d: "M 170 62  L 170 90",           delay: 0.15 },
  { d: "M 170 62  Q 40 100 30 166",    delay: 0.2 },
  { d: "M 170 62  Q 15 140 30 222",    delay: 0.25 },
  { d: "M 170 130 Q 100 200 90 278",   delay: 0.45 },
  { d: "M 170 186 Q 170 230 170 278",  delay: 0.5 },
  { d: "M 170 242 Q 240 260 250 278",  delay: 0.55 },
  { d: "M 170 326 L 170 358",          delay: 0.75 },
];

export default function StandupBriefDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 430"
      nodes={nodes}
      edges={edges}
      ariaLabel="Standup brief agent architecture"
    />
  );
}
