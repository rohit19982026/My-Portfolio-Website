import FlowDiagram, { roundedPath, type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Orchestrator-workers: the agent parses a brief and dispatches 5 workers
// that run in parallel — laid out as two horizontal rows (3 + 2) of
// side-by-side siblings, not a vertical stack, since that's what actually
// happens. One genuine external tool call (Jira) and four agent-drafted,
// brief-specific skills, converging on one output.
const nodes: DiagramNode[] = [
  { id: "start",  x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "brief",  x: 30,  y: 32,  w: 280, h: 46, label: "Program Brief", sub: "Signed SOW in",        tone: "ink" },
  { id: "agent",  x: 70,  y: 96,  w: 200, h: 44, label: "Setup Agent",   sub: "Glean Agent · Claude",  tone: "lime" },
  { id: "jira",   x: 25,  y: 160, w: 90,  h: 68, label: "Jira API",         sub: "", eyebrow: "TOOL CALL", tone: "blue" },
  { id: "sprint", x: 125, y: 160, w: 90,  h: 68, label: "Sprint\nCadence",  sub: "", eyebrow: "SKILL", tone: "white" },
  { id: "risk",   x: 225, y: 160, w: 90,  h: 68, label: "Risk Log",        sub: "", eyebrow: "SKILL", tone: "white" },
  { id: "raci",   x: 35,  y: 250, w: 125, h: 64, label: "RACI",            sub: "", eyebrow: "SKILL", tone: "white" },
  { id: "gov",    x: 180, y: 250, w: 125, h: 64, label: "Governance\nTemplates", sub: "", eyebrow: "SKILL", tone: "white" },
  { id: "ready",  x: 70,  y: 334, w: 200, h: 44, label: "Program Ready",   sub: "15 minutes, day one", tone: "lime" },
  { id: "end",    x: 160, y: 392, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

// Row A (Jira/Sprint/Risk) and row B (RACI/Governance) both dispatch
// straight from the agent — row A directly below it (clear gap, no
// obstruction), row B via a margin trunk on each side that clears row A's
// footprint entirely before dropping down. Convergence to "Program Ready"
// mirrors the same shape: row A routes around row B's footprint via the
// same margins, row B (already below, clear gap) connects directly, and
// the one node with no lateral obstruction (Sprint Cadence) runs straight
// down the natural gap between RACI and Governance.
const edges: DiagramEdge[] = [
  { d: roundedPath([[170, 22], [170, 32]]),  delay: 0.05 },
  { d: roundedPath([[170, 78], [170, 96]]),  delay: 0.15 },
  { d: roundedPath([[170, 140], [70, 160]]), delay: 0.3 },
  { d: roundedPath([[170, 140], [170, 160]]), delay: 0.35 },
  { d: roundedPath([[170, 140], [270, 160]]), delay: 0.4 },
  { d: roundedPath([[170, 140], [170, 150], [10, 150], [10, 282], [35, 282]]),   delay: 0.45 },
  { d: roundedPath([[170, 140], [170, 150], [330, 150], [330, 282], [305, 282]]), delay: 0.5 },
  { d: roundedPath([[70, 228], [70, 238], [10, 238], [10, 325], [100, 325], [100, 334]]),   delay: 0.65 },
  { d: roundedPath([[170, 228], [170, 334]]),                                              delay: 0.7 },
  { d: roundedPath([[270, 228], [270, 238], [330, 238], [330, 325], [240, 325], [240, 334]]), delay: 0.75 },
  { d: roundedPath([[98, 314], [130, 334]]),  delay: 0.8 },
  { d: roundedPath([[242, 314], [210, 334]]), delay: 0.85 },
  { d: roundedPath([[170, 378], [170, 392]]), delay: 0.95 },
];

export default function ProjectSetupDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 415"
      nodes={nodes}
      edges={edges}
      ariaLabel="Project setup agent architecture — phData Innovation Award"
    />
  );
}
