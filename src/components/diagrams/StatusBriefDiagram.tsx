import { BarChart3, Bot, CheckCircle2, PenLine, Zap } from "lucide-react";
import { SiJira } from "react-icons/si";
import SlackMark from "../icons/SlackMark";
import FlowDiagram, { type Step } from "./FlowDiagram";

const ACCENT = "#2DD4BF";

// Same fan-out/fan-in shape as the Standup diagram (3 parallel tool calls
// synthesized by one agent step), but with a further linear pair afterward
// (draft, then a human-gated publish) since a status update — unlike a
// read-only standup brief — actually goes out to stakeholders.
const steps: Step[] = [
  { kind: "step", id: "start", marker: "start", label: "", sub: "" },
  { kind: "step", id: "trigger", label: "Weekly Trigger", sub: "Every Monday morning", tone: "card", icon: Zap },
  {
    kind: "branch",
    id: "tools",
    rows: [
      [
        { id: "jira", label: "Jira", sub: "", eyebrow: "TOOL CALL", icon: SiJira, iconColor: "#2684FF" },
        { id: "slack", label: "Slack", sub: "", eyebrow: "TOOL CALL", icon: SlackMark },
        { id: "reports", label: "Reports", sub: "", eyebrow: "TOOL CALL", icon: BarChart3, iconColor: ACCENT },
      ],
    ],
  },
  { kind: "step", id: "agent", label: "Status Agent", sub: "Claude", tone: "hero", icon: Bot },
  { kind: "step", id: "draft", label: "Draft Status Update", sub: "Auto-generated", tone: "card", icon: PenLine },
  { kind: "step", id: "review", label: "Review + Publish", sub: "You review, you send", tone: "card", icon: CheckCircle2 },
  { kind: "step", id: "end", marker: "end", label: "", sub: "" },
];

export default function StatusBriefDiagram() {
  return <FlowDiagram steps={steps} accent={ACCENT} ariaLabel="Weekly status agent architecture" />;
}
