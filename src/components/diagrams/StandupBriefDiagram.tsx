import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const nodes: DiagramNode[] = [
  { id: "jira",  x: 30, y: 20,  w: 280, h: 44, label: "Jira",           sub: "Sprint board",     tone: "ink" },
  { id: "slack", x: 30, y: 76,  w: 280, h: 44, label: "Slack",          sub: "Channel threads",  tone: "ink" },
  { id: "notes", x: 30, y: 132, w: 280, h: 44, label: "Meeting Notes",  sub: "Standup history",  tone: "ink" },
  { id: "orch",  x: 70, y: 204, w: 200, h: 48, label: "Orchestrator",   sub: "Synthesis prompt", tone: "lime" },
  { id: "brief", x: 50, y: 284, w: 240, h: 52, label: "One-Page Brief", sub: "30-second read",   tone: "blue" },
];

const edges: DiagramEdge[] = [
  { d: "M 170 64  Q 100 140 140 204", delay: 0.15 },
  { d: "M 170 120 Q 170 160 170 204", delay: 0.3 },
  { d: "M 170 176 Q 240 190 200 204", delay: 0.45 },
  { d: "M 170 252 L 170 284",         delay: 0.65 },
];

export default function StandupBriefDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 360"
      nodes={nodes}
      edges={edges}
      ariaLabel="Standup brief agent architecture"
    />
  );
}
