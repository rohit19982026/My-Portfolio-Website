import { Bot, CheckCircle2, FileCheck, FileCheck2, PieChart, UserCheck, Plug, Zap } from "lucide-react";
import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const ACCENT = "#d7ff3f";
const TOOL_BLUE = "#5B9BF0";

// Sequential chain (trigger -> data -> agent) into a genuine
// parallelization section — 3 skills as horizontal siblings at one level,
// not a vertical stack, since they run at the same time — converging into
// a synthesis + human review step. Matches the card copy's own word
// "workflow," and the "6-step" count it names: pull, 3 skills, synthesize,
// route-to-review. Two "hero" (accent-filled) steps — Agent and the
// synthesized Flag Report — since this is the featured card; every other
// diagram in this section only fills its one Agent node.
const nodes: DiagramNode[] = [
  { id: "start",    x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger",  x: 30,  y: 34,  w: 280, h: 42, label: "Month-End Trigger",         sub: "Runs 1st business day",       tone: "card", icon: Zap },
  { id: "pull",     x: 30,  y: 96,  w: 280, h: 40, label: "Tool Call: PSA + Timecard", sub: "Budget & time data",          tone: "card", icon: Plug, iconColor: TOOL_BLUE },
  { id: "agent",    x: 70,  y: 156, w: 200, h: 44, label: "Billing Review Agent",      sub: "Glean Agent · Claude",        tone: "hero", icon: Bot },
  { id: "budget",   x: 10,  y: 264, w: 100, h: 70, label: "Budget vs.\nSpend",     sub: "", eyebrow: "SKILL", tone: "card", icon: PieChart, iconColor: TOOL_BLUE },
  { id: "ready",    x: 120, y: 264, w: 100, h: 70, label: "Billing\nReadiness",    sub: "", eyebrow: "SKILL", tone: "card", icon: FileCheck2, iconColor: TOOL_BLUE },
  { id: "timecard", x: 230, y: 264, w: 100, h: 70, label: "Timecard\nCompliance", sub: "", eyebrow: "SKILL", tone: "card", icon: CheckCircle2, iconColor: TOOL_BLUE },
  { id: "flag",     x: 70,  y: 398, w: 200, h: 44, label: "Flag Report",          sub: "Synthesized findings", tone: "hero",  icon: FileCheck },
  { id: "review",   x: 70,  y: 460, w: 200, h: 44, label: "PM + Team Review",     sub: "Human sign-off",       tone: "card", icon: UserCheck },
  { id: "end",      x: 160, y: 522, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

// Fan-out / fan-in with a generous vertical drop (64px) between the agent
// and the skills row, and between the skills row and the flag node — a
// shallow drop over this much horizontal spread reads as flat, cluttered
// lines; a steeper angle reads as genuine, legible branching. No crossing
// risk since the gaps above and below the row stay empty.
const edges: DiagramEdge[] = [
  { points: [[170, 22], [170, 34]],   delay: 0.05 },
  { points: [[170, 76], [170, 96]],   delay: 0.15 },
  { points: [[170, 136], [170, 156]], delay: 0.25 },
  { points: [[170, 200], [60, 264]],  delay: 0.35 },
  { points: [[170, 200], [170, 264]], delay: 0.4 },
  { points: [[170, 200], [280, 264]], delay: 0.45 },
  { points: [[60, 334], [170, 398]],  delay: 0.6 },
  { points: [[170, 334], [170, 398]], delay: 0.65 },
  { points: [[280, 334], [170, 398]], delay: 0.7 },
  { points: [[170, 442], [170, 460]], delay: 0.85 },
  { points: [[170, 504], [170, 522]], delay: 0.95 },
];

export default function BillingSkillDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 550"
      nodes={nodes}
      edges={edges}
      accent={ACCENT}
      heroTextColor="#0d0d0f"
      ariaLabel="Month-end billing review agent architecture"
    />
  );
}
