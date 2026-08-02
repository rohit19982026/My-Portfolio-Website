import { Bot, FileText, Send, UserCheck } from "lucide-react";
import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const ACCENT = "#f59e0b";

// Simplest diagram in the set — a single-LLM-call agent, no external tool
// calls, matching the copy's own framing ("I describe what I need to say
// ... this agent drafts a first version"). Purely linear: context in,
// draft out, human edits and sends.
const nodes: DiagramNode[] = [
  { id: "start",   x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger", x: 30,  y: 34,  w: 280, h: 42, label: "Message Request", sub: "Context + audience", tone: "card", icon: Send },
  { id: "agent",   x: 70,  y: 100, w: 200, h: 44, label: "Message Drafter Agent", sub: "Claude", tone: "hero", icon: Bot },
  { id: "draft",   x: 50,  y: 168, w: 240, h: 48, label: "Draft Message", sub: "Ready to edit", tone: "card", icon: FileText },
  { id: "human",   x: 50,  y: 240, w: 240, h: 48, label: "I Edit + Send", sub: "Human final pass", tone: "card", icon: UserCheck },
  { id: "end",     x: 160, y: 312, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

const edges: DiagramEdge[] = [
  { points: [[170, 22], [170, 34]],   delay: 0.05 },
  { points: [[170, 76], [170, 100]],  delay: 0.2 },
  { points: [[170, 144], [170, 168]], delay: 0.4 },
  { points: [[170, 216], [170, 240]], delay: 0.6 },
  { points: [[170, 288], [170, 312]], delay: 0.8 },
];

export default function StakeholderMessageDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 336"
      nodes={nodes}
      edges={edges}
      accent={ACCENT}
      ariaLabel="Stakeholder message drafter agent architecture"
    />
  );
}
