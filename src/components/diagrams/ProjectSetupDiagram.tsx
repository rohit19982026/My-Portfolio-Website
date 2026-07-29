import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const nodes: DiagramNode[] = [
  { id: "brief",  x: 30, y: 20,  w: 280, h: 48, label: "Program Brief",    sub: "Signed SOW",             tone: "ink" },
  { id: "prov",   x: 70, y: 96,  w: 200, h: 48, label: "Setup Agent",      sub: "Provisioning",           tone: "lime" },
  { id: "jira",   x: 30, y: 180, w: 280, h: 42, label: "Jira Board",       sub: "Epics & backlog",        tone: "blue" },
  { id: "sprint", x: 30, y: 232, w: 280, h: 42, label: "Sprint Structure", sub: "Cadence & ceremonies",   tone: "white" },
  { id: "risk",   x: 30, y: 284, w: 280, h: 42, label: "Risk Log",         sub: "Tracked from day 1",     tone: "blue" },
  { id: "raci",   x: 30, y: 336, w: 280, h: 42, label: "RACI",             sub: "Ownership map",          tone: "white" },
  { id: "gov",    x: 30, y: 388, w: 280, h: 42, label: "Governance",       sub: "Templates & cadence",    tone: "blue" },
];

const edges: DiagramEdge[] = [
  { d: "M 170 68  L 170 96",          delay: 0.15 },
  { d: "M 170 144 Q 60 165 30 201",   delay: 0.35 },
  { d: "M 170 144 Q 40 200 30 253",   delay: 0.4 },
  { d: "M 170 144 Q 25 250 30 305",   delay: 0.45 },
  { d: "M 170 144 Q 15 300 30 357",   delay: 0.5 },
  { d: "M 170 144 Q 10 350 30 409",   delay: 0.55 },
];

export default function ProjectSetupDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 454"
      nodes={nodes}
      edges={edges}
      ariaLabel="Project setup agent architecture — phData Innovation Award"
    />
  );
}
