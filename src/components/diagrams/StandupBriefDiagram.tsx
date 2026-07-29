import FlowDiagram, { roundedPath, type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Parallelization: three independent tool-call retrievals synthesized by
// one reasoning step. No guardrail, no human-review node — the copy frames
// the brief as read directly ("30 seconds of reading"), not formally
// reviewed before use. Graph-style start/end markers bookend the flow;
// edges are rounded elbow connectors through a margin trunk (see
// roundedPath in FlowDiagram.tsx) so curves never cross an unrelated node.
const nodes: DiagramNode[] = [
  { id: "start",   x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger", x: 30, y: 32,  w: 280, h: 42, label: "Standup Trigger",         sub: "Daily, before standup",       tone: "ink" },
  { id: "jira",    x: 30, y: 102, w: 280, h: 40, label: "Tool Call: Jira",         sub: "Sprint board status",         tone: "blue" },
  { id: "slack",   x: 30, y: 158, w: 280, h: 40, label: "Tool Call: Slack",        sub: "Channel threads",             tone: "blue" },
  { id: "notes",   x: 30, y: 214, w: 280, h: 40, label: "Tool Call: Meeting Notes", sub: "Prior standup notes",        tone: "blue" },
  { id: "agent",   x: 70, y: 290, w: 200, h: 48, label: "Standup Agent",           sub: "Claude",                     tone: "lime" },
  { id: "brief",   x: 50, y: 370, w: 240, h: 52, label: "One-Page Brief",          sub: "30-second read",             tone: "white" },
  { id: "end",     x: 160, y: 440, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

const edges: DiagramEdge[] = [
  { d: roundedPath([[170, 22], [170, 32]]),                                       delay: 0.05 },
  { d: roundedPath([[170, 74], [170, 102]]),                                      delay: 0.15 },
  { d: roundedPath([[170, 74], [170, 84], [15, 84], [15, 178], [30, 178]]),       delay: 0.2 },
  { d: roundedPath([[170, 74], [170, 84], [15, 84], [15, 234], [30, 234]]),       delay: 0.25 },
  { d: roundedPath([[310, 122], [325, 122], [325, 272], [170, 272], [170, 290]]), delay: 0.45 },
  { d: roundedPath([[310, 178], [325, 178], [325, 272], [170, 272], [170, 290]]), delay: 0.5 },
  { d: roundedPath([[310, 234], [325, 234], [325, 272], [170, 272], [170, 290]]), delay: 0.55 },
  { d: roundedPath([[170, 338], [170, 370]]),                                     delay: 0.75 },
  { d: roundedPath([[170, 422], [170, 440]]),                                     delay: 0.85 },
];

export default function StandupBriefDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 470"
      nodes={nodes}
      edges={edges}
      ariaLabel="Standup brief agent architecture"
    />
  );
}
