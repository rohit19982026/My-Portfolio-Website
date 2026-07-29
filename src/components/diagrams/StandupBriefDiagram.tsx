import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Parallelization: three independent tool-call retrievals as horizontal
// siblings at one level (they run at the same time, not one after another)
// synthesized by one reasoning step. No guardrail, no human-review node —
// the copy frames the brief as read directly ("30 seconds of reading"),
// not formally reviewed before use. n8n-style: icon-forward cards,
// connection-point dots, smooth rounded connectors.
const nodes: DiagramNode[] = [
  { id: "start",   x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger", x: 30,  y: 34,  w: 280, h: 42, label: "Standup Trigger", sub: "Daily, before standup", tone: "ink", icon: "trigger" },
  { id: "jira",    x: 10,  y: 140, w: 100, h: 64, label: "Jira",           sub: "", eyebrow: "TOOL CALL", tone: "blue", icon: "tool" },
  { id: "slack",   x: 120, y: 140, w: 100, h: 64, label: "Slack",          sub: "", eyebrow: "TOOL CALL", tone: "blue", icon: "tool" },
  { id: "notes",   x: 230, y: 140, w: 100, h: 64, label: "Meeting\nNotes", sub: "", eyebrow: "TOOL CALL", tone: "blue", icon: "tool" },
  { id: "agent",   x: 70,  y: 268, w: 200, h: 44, label: "Standup Agent",  sub: "Claude",         tone: "lime",  icon: "agent" },
  { id: "brief",   x: 50,  y: 332, w: 240, h: 48, label: "One-Page Brief", sub: "30-second read", tone: "white", icon: "output" },
  { id: "end",     x: 160, y: 398, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

// Fan-out / fan-in with a generous vertical drop (64px) between the trigger
// and the tool-call row, and between the tool-call row and the agent — a
// shallow drop over this much horizontal spread reads as flat, cluttered
// lines; a steeper angle reads as genuine, legible branching.
const edges: DiagramEdge[] = [
  { points: [[170, 22], [170, 34]],   delay: 0.05 },
  { points: [[170, 76], [60, 140]],   delay: 0.15 },
  { points: [[170, 76], [170, 140]],  delay: 0.2 },
  { points: [[170, 76], [280, 140]],  delay: 0.25 },
  { points: [[60, 204], [170, 268]],  delay: 0.4 },
  { points: [[170, 204], [170, 268]], delay: 0.45 },
  { points: [[280, 204], [170, 268]], delay: 0.5 },
  { points: [[170, 312], [170, 332]], delay: 0.65 },
  { points: [[170, 380], [170, 398]], delay: 0.75 },
];

export default function StandupBriefDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 425"
      nodes={nodes}
      edges={edges}
      ariaLabel="Standup brief agent architecture"
    />
  );
}
