import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const nodes: DiagramNode[] = [
  { id: "brief",  x: 20,  y: 130, w: 150, h: 40, label: "Program Brief", sub: "Signed SOW",       tone: "ink" },
  { id: "prov",   x: 210, y: 130, w: 150, h: 40, label: "Setup Agent",   sub: "Provisioning",     tone: "lime" },
  { id: "jira",   x: 420, y: 10,  w: 160, h: 40, label: "Jira Board",    sub: "Epics & backlog",  tone: "blue" },
  { id: "sprint", x: 420, y: 70,  w: 160, h: 40, label: "Sprint Structure", sub: "Cadence & ceremonies", tone: "white" },
  { id: "risk",   x: 420, y: 130, w: 160, h: 40, label: "Risk Log",      sub: "Tracked from day 1", tone: "blue" },
  { id: "raci",   x: 420, y: 190, w: 160, h: 40, label: "RACI",          sub: "Ownership map",    tone: "white" },
  { id: "gov",    x: 420, y: 250, w: 160, h: 40, label: "Governance",    sub: "Templates & cadence", tone: "blue" },
];

const edges: DiagramEdge[] = [
  { d: "M 170 150 L 210 150", delay: 0.15 },
  { d: "M 360 145 Q 390 70 420 30",   delay: 0.4 },
  { d: "M 360 148 Q 390 105 420 90",  delay: 0.45 },
  { d: "M 360 150 L 420 150",         delay: 0.5 },
  { d: "M 360 152 Q 390 185 420 210", delay: 0.55 },
  { d: "M 360 155 Q 390 220 420 270", delay: 0.6 },
];

export default function ProjectSetupDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 600 310"
      nodes={nodes}
      edges={edges}
      phases={[
        { x: 95, label: "Input" },
        { x: 285, label: "Agent" },
        { x: 500, label: "Provisioned in 15 min" },
      ]}
      ariaLabel="Project setup agent architecture — phData Innovation Award"
    />
  );
}
