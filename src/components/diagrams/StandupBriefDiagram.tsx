import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const nodes: DiagramNode[] = [
  { id: "jira",  x: 20,  y: 20,  w: 130, h: 40, label: "Jira",          sub: "Sprint board",     tone: "ink" },
  { id: "slack", x: 20,  y: 90,  w: 130, h: 40, label: "Slack",         sub: "Channel threads",  tone: "ink" },
  { id: "notes", x: 20,  y: 160, w: 130, h: 40, label: "Meeting Notes", sub: "Standup history",  tone: "ink" },
  { id: "orch",  x: 250, y: 90,  w: 150, h: 40, label: "Orchestrator",  sub: "Synthesis prompt",  tone: "lime" },
  { id: "brief", x: 470, y: 90,  w: 150, h: 40, label: "One-Page Brief", sub: "30-second read",  tone: "blue" },
];

const edges: DiagramEdge[] = [
  { d: "M 150 40 Q 200 60 250 100",  delay: 0.15 },
  { d: "M 150 110 L 250 110",         delay: 0.3 },
  { d: "M 150 180 Q 200 150 250 120", delay: 0.45 },
  { d: "M 400 110 L 470 110",         delay: 0.65 },
];

export default function StandupBriefDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 660 220"
      nodes={nodes}
      edges={edges}
      phases={[
        { x: 85, label: "Sources" },
        { x: 325, label: "Orchestration" },
        { x: 545, label: "Output" },
      ]}
      ariaLabel="Standup brief agent architecture"
    />
  );
}
