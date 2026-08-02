import { Bot, FileCheck, FileText, Zap } from "lucide-react";
import { SiJira } from "react-icons/si";
import SlackMark from "../icons/SlackMark";
import FlowDiagram, { type Step } from "./FlowDiagram";

const ACCENT = "#8B7FF0";

// Parallelization: three independent tool-call retrievals as horizontal
// siblings (they run at the same time, not one after another) synthesized
// by one reasoning step. No guardrail, no human-review step — the copy
// frames the brief as read directly ("30 seconds of reading"), not
// formally reviewed before use.
const steps: Step[] = [
  { kind: "step", id: "start", marker: "start", label: "", sub: "" },
  { kind: "step", id: "trigger", label: "Standup Trigger", sub: "Daily, before standup", tone: "card", icon: Zap },
  {
    kind: "branch",
    id: "tools",
    rows: [
      [
        { id: "jira", label: "Jira", sub: "", eyebrow: "TOOL CALL", icon: SiJira, iconColor: "#2684FF" },
        { id: "slack", label: "Slack", sub: "", eyebrow: "TOOL CALL", icon: SlackMark },
        { id: "notes", label: "Meeting Notes", sub: "", eyebrow: "TOOL CALL", icon: FileText },
      ],
    ],
  },
  { kind: "step", id: "agent", label: "Standup Agent", sub: "Claude", tone: "hero", icon: Bot },
  { kind: "step", id: "brief", label: "One-Page Brief", sub: "30-second read", tone: "card", icon: FileCheck },
  { kind: "step", id: "end", marker: "end", label: "", sub: "" },
];

export default function StandupBriefDiagram() {
  return <FlowDiagram steps={steps} accent={ACCENT} ariaLabel="Standup brief agent architecture" />;
}
