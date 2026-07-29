import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Parallelization: three independent tool-call retrievals as horizontal
// siblings at one level (they run at the same time, not one after another)
// synthesized by one reasoning step. No guardrail, no human-review node —
// the copy frames the brief as read directly ("30 seconds of reading"),
// not formally reviewed before use. n8n-style: icon-forward cards,
// connection-point dots, smooth rounded connectors.
const nodes: DiagramNode[] = [
  { id: "start",   x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger", x: 30,  y: 32,  w: 280, h: 42, label: "Standup Trigger", sub: "Daily, before standup", tone: "ink", icon: "trigger" },
  { id: "jira",    x: 10,  y: 94,  w: 100, h: 64, label: "Jira",           sub: "", eyebrow: "TOOL CALL", tone: "blue", icon: "tool" },
  { id: "slack",   x: 120, y: 94,  w: 100, h: 64, label: "Slack",          sub: "", eyebrow: "TOOL CALL", tone: "blue", icon: "tool" },
  { id: "notes",   x: 230, y: 94,  w: 100, h: 64, label: "Meeting\nNotes", sub: "", eyebrow: "TOOL CALL", tone: "blue", icon: "tool" },
  { id: "agent",   x: 70,  y: 178, w: 200, h: 44, label: "Standup Agent",  sub: "Claude",         tone: "lime",  icon: "agent" },
  { id: "brief",   x: 50,  y: 242, w: 240, h: 48, label: "One-Page Brief", sub: "30-second read", tone: "white", icon: "output" },
  { id: "end",     x: 160, y: 304, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

// Straight fan-out / fan-in: the 3 tool calls sit at one shared level
// directly below the trigger with nothing in between, so a clean diagonal
// fan reads as genuine simultaneous retrieval, not a sequential chain.
const edges: DiagramEdge[] = [
  { points: [[170, 22], [170, 32]],   delay: 0.05 },
  { points: [[170, 74], [60, 94]],    delay: 0.15 },
  { points: [[170, 74], [170, 94]],   delay: 0.2 },
  { points: [[170, 74], [280, 94]],   delay: 0.25 },
  { points: [[60, 158], [170, 178]],  delay: 0.4 },
  { points: [[170, 158], [170, 178]], delay: 0.45 },
  { points: [[280, 158], [170, 178]], delay: 0.5 },
  { points: [[170, 222], [170, 242]], delay: 0.65 },
  { points: [[170, 290], [170, 304]], delay: 0.75 },
];

export default function StandupBriefDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 330"
      nodes={nodes}
      edges={edges}
      ariaLabel="Standup brief agent architecture"
    />
  );
}
