import FlowDiagram, { roundedPath, type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Sequential chain (trigger -> data -> agent) with a parallelization
// section (3 skills) re-converging into a synthesis + human review step —
// matches the card copy's own word "workflow," and the "6-step" count it
// names: pull, 3 skills, synthesize, route-to-review. Graph-style start/end
// marker nodes bookend the flow; edges are smooth rounded elbow connectors
// routed through a margin "trunk" so a curve never crosses a node it isn't
// connecting to (see roundedPath in FlowDiagram.tsx).
const nodes: DiagramNode[] = [
  { id: "start",    x: 160, y: 5,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger",  x: 30, y: 36,  w: 280, h: 44, label: "Month-End Trigger",       sub: "Runs 1st business day",      tone: "ink" },
  { id: "pull",     x: 30, y: 100, w: 280, h: 44, label: "Tool Call: PSA + Timecard", sub: "Budget & time data",       tone: "blue" },
  { id: "agent",    x: 70, y: 164, w: 200, h: 48, label: "Billing Review Agent",    sub: "Glean Agent · Claude",      tone: "lime" },
  { id: "budget",   x: 30, y: 232, w: 280, h: 42, label: "Skill: Budget vs. Spend", sub: "Plan vs. actuals",          tone: "blue" },
  { id: "ready",    x: 30, y: 284, w: 280, h: 42, label: "Skill: Billing Readiness", sub: "Unbilled time, WIP",       tone: "blue" },
  { id: "timecard", x: 30, y: 336, w: 280, h: 42, label: "Skill: Timecard Compliance", sub: "Missing or late entries", tone: "blue" },
  { id: "flag",     x: 70, y: 408, w: 200, h: 48, label: "Flag Report",            sub: "Synthesized findings",       tone: "lime" },
  { id: "review",   x: 70, y: 480, w: 200, h: 48, label: "PM + Team Review",       sub: "Human sign-off",             tone: "white" },
  { id: "end",      x: 160, y: 542, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

const edges: DiagramEdge[] = [
  { d: roundedPath([[170, 22], [170, 36]]),                                          delay: 0.05 },
  { d: roundedPath([[170, 80], [170, 100]]),                                         delay: 0.15 },
  { d: roundedPath([[170, 144], [170, 164]]),                                        delay: 0.25 },
  { d: roundedPath([[170, 212], [170, 232]]),                                        delay: 0.35 },
  { d: roundedPath([[170, 212], [170, 222], [15, 222], [15, 305], [30, 305]]),       delay: 0.4 },
  { d: roundedPath([[170, 212], [170, 222], [15, 222], [15, 357], [30, 357]]),       delay: 0.45 },
  { d: roundedPath([[310, 253], [325, 253], [325, 400], [170, 400], [170, 408]]),    delay: 0.6 },
  { d: roundedPath([[310, 305], [325, 305], [325, 400], [170, 400], [170, 408]]),    delay: 0.65 },
  { d: roundedPath([[310, 357], [325, 357], [325, 400], [170, 400], [170, 408]]),    delay: 0.7 },
  { d: roundedPath([[170, 456], [170, 480]]),                                        delay: 0.85 },
  { d: roundedPath([[170, 528], [170, 545]]),                                        delay: 0.95 },
];

export default function BillingSkillDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 565"
      nodes={nodes}
      edges={edges}
      phases={[{ x: 170, y: 30, label: "6-STEP AUTOMATED WORKFLOW" }]}
      ariaLabel="Month-end billing review agent architecture"
    />
  );
}
