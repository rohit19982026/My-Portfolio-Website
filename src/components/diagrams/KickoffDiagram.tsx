import { Bot, CheckCircle2, ClipboardList, Compass, FileText, Map } from "lucide-react";
import FlowDiagram, { type Step } from "./FlowDiagram";

const ACCENT = "#F0618B";

// Fan-out/fan-in like Billing, but shallower — no separate tool-call step
// first, since this agent works directly off the kickoff brief per its own
// copy ("I give this agent the kickoff brief and it outputs...").
const steps: Step[] = [
  { kind: "step", id: "start", marker: "start", label: "", sub: "" },
  { kind: "step", id: "trigger", label: "Kickoff Brief", sub: "New program intake", tone: "card", icon: FileText },
  { kind: "step", id: "agent", label: "Kickoff Agent", sub: "Claude", tone: "hero", icon: Bot },
  {
    kind: "branch",
    id: "outputs",
    rows: [
      [
        { id: "map", label: "Stakeholder Map", sub: "", eyebrow: "OUTPUT", icon: Map },
        { id: "guide", label: "Interview Guide", sub: "", eyebrow: "OUTPUT", icon: ClipboardList },
        { id: "plan", label: "Discovery Plan", sub: "", eyebrow: "OUTPUT", icon: Compass },
      ],
    ],
  },
  { kind: "step", id: "ready", label: "Sprint 1 Ready", sub: "Structure on day one", tone: "card", icon: CheckCircle2 },
  { kind: "step", id: "end", marker: "end", label: "", sub: "" },
];

export default function KickoffDiagram() {
  return <FlowDiagram steps={steps} accent={ACCENT} ariaLabel="Kickoff planning agent architecture" />;
}
