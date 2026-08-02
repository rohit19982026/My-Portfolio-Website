import { Bot, CheckCircle2, ClipboardList, Compass, FileText, Map } from "lucide-react";
import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const ACCENT = "#F0618B";

// Fan-out/fan-in like Billing, but shallower — no separate tool-call step
// first, since this agent works directly off the kickoff brief per its own
// copy ("I give this agent the kickoff brief and it outputs...").
const nodes: DiagramNode[] = [
  { id: "start",   x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger", x: 30,  y: 34,  w: 280, h: 42, label: "Kickoff Brief", sub: "New program intake", tone: "card", icon: FileText },
  { id: "agent",   x: 70,  y: 100, w: 200, h: 44, label: "Kickoff Agent", sub: "Claude", tone: "hero", icon: Bot },
  { id: "map",     x: 10,  y: 188, w: 100, h: 68, label: "Stakeholder\nMap",  sub: "", eyebrow: "OUTPUT", tone: "card", icon: Map },
  { id: "guide",   x: 120, y: 188, w: 100, h: 68, label: "Interview\nGuide", sub: "", eyebrow: "OUTPUT", tone: "card", icon: ClipboardList },
  { id: "plan",    x: 230, y: 188, w: 100, h: 68, label: "Discovery\nPlan",  sub: "", eyebrow: "OUTPUT", tone: "card", icon: Compass },
  { id: "ready",   x: 70,  y: 312, w: 200, h: 44, label: "Sprint 1 Ready", sub: "Structure on day one", tone: "card", icon: CheckCircle2 },
  { id: "end",     x: 160, y: 376, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

const edges: DiagramEdge[] = [
  { points: [[170, 22], [170, 34]],   delay: 0.05 },
  { points: [[170, 76], [170, 100]],  delay: 0.2 },
  { points: [[170, 144], [60, 188]],  delay: 0.35 },
  { points: [[170, 144], [170, 188]], delay: 0.4 },
  { points: [[170, 144], [280, 188]], delay: 0.45 },
  { points: [[60, 256], [170, 312]],  delay: 0.6 },
  { points: [[170, 256], [170, 312]], delay: 0.65 },
  { points: [[280, 256], [170, 312]], delay: 0.7 },
  { points: [[170, 356], [170, 376]], delay: 0.85 },
];

export default function KickoffDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 396"
      nodes={nodes}
      edges={edges}
      accent={ACCENT}
      ariaLabel="Kickoff planning agent architecture"
    />
  );
}
