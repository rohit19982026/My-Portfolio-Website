import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

// Sequential chain (trigger -> data -> agent) with a parallelization
// section (3 skills) re-converging into a synthesis + human review step —
// matches the card copy's own word "workflow," and the "6-step" count it
// names: pull, 3 skills, synthesize, route-to-review.
const nodes: DiagramNode[] = [
  { id: "trigger",  x: 30, y: 36,  w: 280, h: 44, label: "Month-End Trigger",       sub: "Runs 1st business day",      tone: "ink" },
  { id: "pull",     x: 30, y: 100, w: 280, h: 44, label: "Tool Call: PSA + Timecard", sub: "Budget & time data",       tone: "blue" },
  { id: "agent",    x: 70, y: 164, w: 200, h: 48, label: "Billing Review Agent",    sub: "Glean Agent · Claude",      tone: "lime" },
  { id: "budget",   x: 30, y: 232, w: 280, h: 42, label: "Skill: Budget vs. Spend", sub: "Plan vs. actuals",          tone: "blue" },
  { id: "ready",    x: 30, y: 284, w: 280, h: 42, label: "Skill: Billing Readiness", sub: "Unbilled time, WIP",       tone: "blue" },
  { id: "timecard", x: 30, y: 336, w: 280, h: 42, label: "Skill: Timecard Compliance", sub: "Missing or late entries", tone: "blue" },
  { id: "flag",     x: 70, y: 408, w: 200, h: 48, label: "Flag Report",            sub: "Synthesized findings",       tone: "lime" },
  { id: "review",   x: 70, y: 480, w: 200, h: 48, label: "PM + Team Review",       sub: "Human sign-off",             tone: "white" },
];

const edges: DiagramEdge[] = [
  { d: "M 170 80  L 170 100",         delay: 0.1 },
  { d: "M 170 144 L 170 164",         delay: 0.2 },
  { d: "M 170 212 L 170 232",         delay: 0.3 },
  { d: "M 170 212 Q 30 246 60 305",   delay: 0.35 },
  { d: "M 170 212 Q 15 296 60 357",   delay: 0.4 },
  { d: "M 300 253 Q 320 320 270 408", delay: 0.55 },
  { d: "M 300 305 Q 320 350 250 408", delay: 0.6 },
  { d: "M 300 357 Q 320 380 230 408", delay: 0.65 },
  { d: "M 170 456 L 170 480",         delay: 0.8 },
];

export default function BillingSkillDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 550"
      nodes={nodes}
      edges={edges}
      phases={[{ x: 170, y: 18, label: "6-STEP AUTOMATED WORKFLOW" }]}
      ariaLabel="Month-end billing review agent architecture"
    />
  );
}
