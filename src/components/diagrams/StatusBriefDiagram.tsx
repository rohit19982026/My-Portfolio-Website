import { BarChart3, Bot, CheckCircle2, PenLine, Zap } from "lucide-react";
import { SiJira } from "react-icons/si";
import SlackMark from "../icons/SlackMark";
import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const ACCENT = "#2DD4BF";

// Same fan-out/fan-in shape as the Standup diagram (3 parallel tool calls
// synthesized by one agent step), but with a further linear pair afterward
// (draft, then a human-gated publish) since a status update — unlike a
// read-only standup brief — actually goes out to stakeholders.
const nodes: DiagramNode[] = [
  { id: "start",   x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "trigger", x: 30,  y: 34,  w: 280, h: 42, label: "Weekly Trigger", sub: "Every Monday morning", tone: "card", icon: Zap },
  { id: "jira",    x: 10,  y: 140, w: 100, h: 64, label: "Jira",    sub: "", eyebrow: "TOOL CALL", tone: "card", icon: SiJira, iconColor: "#2684FF" },
  { id: "slack",   x: 120, y: 140, w: 100, h: 64, label: "Slack",   sub: "", eyebrow: "TOOL CALL", tone: "card", icon: SlackMark },
  { id: "reports", x: 230, y: 140, w: 100, h: 64, label: "Reports", sub: "", eyebrow: "TOOL CALL", tone: "card", icon: BarChart3, iconColor: ACCENT },
  { id: "agent",   x: 70,  y: 268, w: 200, h: 44, label: "Status Agent", sub: "Claude", tone: "hero", icon: Bot },
  { id: "draft",   x: 50,  y: 332, w: 240, h: 48, label: "Draft Status Update", sub: "Auto-generated", tone: "card", icon: PenLine },
  { id: "review",  x: 50,  y: 404, w: 240, h: 48, label: "Review + Publish", sub: "You review, you send", tone: "card", icon: CheckCircle2 },
  { id: "end",     x: 160, y: 470, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

const edges: DiagramEdge[] = [
  { points: [[170, 22], [170, 34]],   delay: 0.05 },
  { points: [[170, 76], [60, 140]],   delay: 0.15 },
  { points: [[170, 76], [170, 140]],  delay: 0.2 },
  { points: [[170, 76], [280, 140]],  delay: 0.25 },
  { points: [[60, 204], [170, 268]],  delay: 0.4 },
  { points: [[170, 204], [170, 268]], delay: 0.45 },
  { points: [[280, 204], [170, 268]], delay: 0.5 },
  { points: [[170, 312], [170, 332]], delay: 0.65 },
  { points: [[170, 380], [170, 404]], delay: 0.75 },
  { points: [[170, 452], [170, 470]], delay: 0.85 },
];

export default function StatusBriefDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 494"
      nodes={nodes}
      edges={edges}
      accent={ACCENT}
      ariaLabel="Weekly status agent architecture"
    />
  );
}
