import FlowDiagram, { roundedPath, type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Sequential chain (trigger -> data -> agent) into a genuine
// parallelization section — 3 skills as horizontal siblings at one level,
// not a vertical stack, since they run at the same time — converging into
// a synthesis + human review step. Matches the card copy's own word
// "workflow," and the "6-step" count it names: pull, 3 skills, synthesize,
// route-to-review.
const nodes: DiagramNode[] = [
  { id: "start",    x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger",  x: 30,  y: 32,  w: 280, h: 42, label: "Month-End Trigger",         sub: "Runs 1st business day",       tone: "ink" },
  { id: "pull",     x: 30,  y: 90,  w: 280, h: 40, label: "Tool Call: PSA + Timecard", sub: "Budget & time data",          tone: "blue" },
  { id: "agent",    x: 70,  y: 146, w: 200, h: 44, label: "Billing Review Agent",      sub: "Glean Agent · Claude",        tone: "lime" },
  { id: "budget",   x: 10,  y: 210, w: 100, h: 70, label: "Budget vs.\nSpend",     sub: "", eyebrow: "SKILL", tone: "blue" },
  { id: "ready",    x: 120, y: 210, w: 100, h: 70, label: "Billing\nReadiness",    sub: "", eyebrow: "SKILL", tone: "blue" },
  { id: "timecard", x: 230, y: 210, w: 100, h: 70, label: "Timecard\nCompliance", sub: "", eyebrow: "SKILL", tone: "blue" },
  { id: "flag",     x: 70,  y: 300, w: 200, h: 44, label: "Flag Report",          sub: "Synthesized findings", tone: "lime" },
  { id: "review",   x: 70,  y: 360, w: 200, h: 44, label: "PM + Team Review",     sub: "Human sign-off",       tone: "white" },
  { id: "end",      x: 160, y: 414, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

// Straight fan-out / fan-in lines: the 3 skills sit at one shared level
// directly below the agent with nothing in between, so a clean diagonal
// from the single agent node to each of the 3, and back from each of the
// 3 into the single flag node, reads as genuine parallel branching — the
// standard "sectioning" shape for a parallelization step — with no
// crossing risk since the gaps above and below the row are empty.
const edges: DiagramEdge[] = [
  { d: roundedPath([[170, 22], [170, 32]]),   delay: 0.05 },
  { d: roundedPath([[170, 74], [170, 90]]),   delay: 0.15 },
  { d: roundedPath([[170, 130], [170, 146]]), delay: 0.25 },
  { d: roundedPath([[170, 190], [60, 210]]),  delay: 0.35 },
  { d: roundedPath([[170, 190], [170, 210]]), delay: 0.4 },
  { d: roundedPath([[170, 190], [280, 210]]), delay: 0.45 },
  { d: roundedPath([[60, 280], [170, 300]]),  delay: 0.6 },
  { d: roundedPath([[170, 280], [170, 300]]), delay: 0.65 },
  { d: roundedPath([[280, 280], [170, 300]]), delay: 0.7 },
  { d: roundedPath([[170, 344], [170, 360]]), delay: 0.85 },
  { d: roundedPath([[170, 404], [170, 414]]), delay: 0.95 },
];

export default function BillingSkillDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 445"
      nodes={nodes}
      edges={edges}
      phases={[{ x: 170, y: 202, label: "6-STEP AUTOMATED WORKFLOW" }]}
      ariaLabel="Month-end billing review agent architecture"
    />
  );
}
