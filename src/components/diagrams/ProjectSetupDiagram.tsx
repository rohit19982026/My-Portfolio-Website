import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Orchestrator-workers: the agent parses a brief and dispatches to 5
// distinct workers, one genuine external tool call (Jira) and four
// agent-drafted, brief-specific skills — then converges on one output.
const nodes: DiagramNode[] = [
  { id: "brief",  x: 30, y: 20,  w: 280, h: 46, label: "Program Brief",             sub: "Signed SOW in",              tone: "ink" },
  { id: "agent",  x: 70, y: 94,  w: 200, h: 48, label: "Setup Agent",               sub: "Glean Agent · Claude",       tone: "lime" },
  { id: "jira",   x: 30, y: 180, w: 280, h: 40, label: "Tool Call: Jira API",       sub: "Creates board & epics",      tone: "blue" },
  { id: "sprint", x: 30, y: 228, w: 280, h: 40, label: "Skill: Sprint Cadence",     sub: "Agent-drafted structure",    tone: "white" },
  { id: "risk",   x: 30, y: 276, w: 280, h: 40, label: "Skill: Risk Log",           sub: "Agent-drafted, program-specific", tone: "white" },
  { id: "raci",   x: 30, y: 324, w: 280, h: 40, label: "Skill: RACI",               sub: "Agent-drafted ownership map", tone: "white" },
  { id: "gov",    x: 30, y: 372, w: 280, h: 40, label: "Skill: Governance Templates", sub: "Populated from brief",     tone: "white" },
  { id: "ready",  x: 70, y: 444, w: 200, h: 48, label: "Program Ready",             sub: "15 minutes, day one",       tone: "lime" },
];

const edges: DiagramEdge[] = [
  { d: "M 170 66  L 170 94",           delay: 0.1 },
  { d: "M 170 142 Q 60 160 30 200",    delay: 0.25 },
  { d: "M 170 142 Q 40 190 30 248",    delay: 0.3 },
  { d: "M 170 142 Q 25 220 30 296",    delay: 0.35 },
  { d: "M 170 142 Q 15 260 30 344",    delay: 0.4 },
  { d: "M 170 142 Q 10 300 30 392",    delay: 0.45 },
  { d: "M 300 200 Q 320 320 120 444",  delay: 0.65 },
  { d: "M 300 248 Q 320 350 140 444",  delay: 0.7 },
  { d: "M 300 296 Q 320 380 170 444",  delay: 0.75 },
  { d: "M 300 344 Q 320 400 200 444",  delay: 0.8 },
  { d: "M 300 392 Q 320 420 220 444",  delay: 0.85 },
];

export default function ProjectSetupDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 512"
      nodes={nodes}
      edges={edges}
      ariaLabel="Project setup agent architecture — phData Innovation Award"
    />
  );
}
