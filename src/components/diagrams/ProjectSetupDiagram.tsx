import FlowDiagram, { roundedPath, type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Orchestrator-workers: the agent parses a brief and dispatches to 5
// distinct workers, one genuine external tool call (Jira) and four
// agent-drafted, brief-specific skills — then converges on one output.
// Graph-style start/end markers bookend the flow; edges are rounded elbow
// connectors through a margin trunk (see roundedPath in FlowDiagram.tsx)
// so curves never cross an unrelated node.
const nodes: DiagramNode[] = [
  { id: "start", x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "brief",  x: 30, y: 32,  w: 280, h: 46, label: "Program Brief",             sub: "Signed SOW in",              tone: "ink" },
  { id: "agent",  x: 70, y: 106, w: 200, h: 48, label: "Setup Agent",               sub: "Glean Agent · Claude",       tone: "lime" },
  { id: "jira",   x: 30, y: 192, w: 280, h: 40, label: "Tool Call: Jira API",       sub: "Creates board & epics",      tone: "blue" },
  { id: "sprint", x: 30, y: 240, w: 280, h: 40, label: "Skill: Sprint Cadence",     sub: "Agent-drafted structure",    tone: "white" },
  { id: "risk",   x: 30, y: 288, w: 280, h: 40, label: "Skill: Risk Log",           sub: "Agent-drafted, program-specific", tone: "white" },
  { id: "raci",   x: 30, y: 336, w: 280, h: 40, label: "Skill: RACI",               sub: "Agent-drafted ownership map", tone: "white" },
  { id: "gov",    x: 30, y: 384, w: 280, h: 40, label: "Skill: Governance Templates", sub: "Populated from brief",     tone: "white" },
  { id: "ready",  x: 70, y: 456, w: 200, h: 48, label: "Program Ready",             sub: "15 minutes, day one",       tone: "lime" },
  { id: "end",   x: 160, y: 522, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

const edges: DiagramEdge[] = [
  { d: roundedPath([[170, 22], [170, 32]]),                                          delay: 0.05 },
  { d: roundedPath([[170, 78], [170, 106]]),                                         delay: 0.15 },
  { d: roundedPath([[170, 154], [170, 164], [15, 164], [15, 212], [30, 212]]),       delay: 0.25 },
  { d: roundedPath([[170, 154], [170, 164], [15, 164], [15, 260], [30, 260]]),       delay: 0.3 },
  { d: roundedPath([[170, 154], [170, 164], [15, 164], [15, 308], [30, 308]]),       delay: 0.35 },
  { d: roundedPath([[170, 154], [170, 164], [15, 164], [15, 356], [30, 356]]),       delay: 0.4 },
  { d: roundedPath([[170, 154], [170, 164], [15, 164], [15, 404], [30, 404]]),       delay: 0.45 },
  { d: roundedPath([[310, 212], [325, 212], [325, 442], [170, 442], [170, 456]]),    delay: 0.6 },
  { d: roundedPath([[310, 260], [325, 260], [325, 442], [170, 442], [170, 456]]),    delay: 0.65 },
  { d: roundedPath([[310, 308], [325, 308], [325, 442], [170, 442], [170, 456]]),    delay: 0.7 },
  { d: roundedPath([[310, 356], [325, 356], [325, 442], [170, 442], [170, 456]]),    delay: 0.75 },
  { d: roundedPath([[310, 404], [325, 404], [325, 442], [170, 442], [170, 456]]),    delay: 0.8 },
  { d: roundedPath([[170, 504], [170, 522]]),                                        delay: 0.9 },
];

export default function ProjectSetupDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 555"
      nodes={nodes}
      edges={edges}
      ariaLabel="Project setup agent architecture — phData Innovation Award"
    />
  );
}
