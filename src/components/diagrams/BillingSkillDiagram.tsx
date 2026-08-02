import { Bot, CheckCircle2, FileCheck, FileCheck2, PieChart, UserCheck, Plug, Zap } from "lucide-react";
import FlowDiagram, { type Step } from "./FlowDiagram";

const ACCENT = "#d7ff3f";
const TOOL_BLUE = "#5B9BF0";

// Sequential chain (trigger -> data -> agent) into a genuine
// parallelization step — 3 skills as horizontal siblings, not a vertical
// stack, since they run at the same time — converging into a synthesis +
// human review step. Two "hero" (accent-filled) steps — Agent and the
// synthesized Flag Report — since this is the featured card; every other
// diagram in this section only fills its one Agent step.
const steps: Step[] = [
  { kind: "step", id: "start", marker: "start", label: "", sub: "" },
  { kind: "step", id: "trigger", label: "Month-End Trigger", sub: "Runs 1st business day", tone: "card", icon: Zap },
  { kind: "step", id: "pull", label: "Tool Call: PSA + Timecard", sub: "Budget & time data", tone: "card", icon: Plug, iconColor: TOOL_BLUE },
  { kind: "step", id: "agent", label: "Billing Review Agent", sub: "Glean Agent · Claude", tone: "hero", icon: Bot },
  {
    kind: "branch",
    id: "skills",
    rows: [
      [
        { id: "budget", label: "Budget vs. Spend", sub: "", eyebrow: "SKILL", icon: PieChart, iconColor: TOOL_BLUE },
        { id: "ready", label: "Billing Readiness", sub: "", eyebrow: "SKILL", icon: FileCheck2, iconColor: TOOL_BLUE },
        { id: "timecard", label: "Timecard Compliance", sub: "", eyebrow: "SKILL", icon: CheckCircle2, iconColor: TOOL_BLUE },
      ],
    ],
  },
  { kind: "step", id: "flag", label: "Flag Report", sub: "Synthesized findings", tone: "hero", icon: FileCheck },
  { kind: "step", id: "review", label: "PM + Team Review", sub: "Human sign-off", tone: "card", icon: UserCheck },
  { kind: "step", id: "end", marker: "end", label: "", sub: "" },
];

export default function BillingSkillDiagram() {
  return <FlowDiagram steps={steps} accent={ACCENT} heroTextColor="#0d0d0f" ariaLabel="Month-end billing review agent architecture" />;
}
