import { AlertTriangle, Bot, Calendar, CheckCircle2, FileText, Users, Zap } from "lucide-react";
import { SiJira } from "react-icons/si";
import FlowDiagram, { type Step } from "./FlowDiagram";

const ACCENT = "#5B9BF0";

// Orchestrator-workers: the agent parses a brief and dispatches 5 workers
// that run in parallel — two rows (3 + 2) both fanning out from the same
// agent step and both converging into the same "Program Ready" step. One
// genuine external tool call (Jira) and four agent-drafted, brief-specific
// skills.
const steps: Step[] = [
  { kind: "step", id: "start", marker: "start", label: "", sub: "" },
  { kind: "step", id: "brief", label: "Program Brief", sub: "Signed SOW in", tone: "card", icon: Zap },
  { kind: "step", id: "agent", label: "Setup Agent", sub: "Glean Agent · Claude", tone: "hero", icon: Bot },
  {
    kind: "branch",
    id: "workers",
    rows: [
      [
        { id: "jira", label: "Jira API", sub: "", eyebrow: "TOOL CALL", icon: SiJira, iconColor: "#2684FF" },
        { id: "sprint", label: "Sprint Cadence", sub: "", eyebrow: "SKILL", icon: Calendar },
        { id: "risk", label: "Risk Log", sub: "", eyebrow: "SKILL", icon: AlertTriangle },
      ],
      [
        { id: "raci", label: "RACI", sub: "", eyebrow: "SKILL", icon: Users },
        { id: "gov", label: "Governance Templates", sub: "", eyebrow: "SKILL", icon: FileText },
      ],
    ],
  },
  { kind: "step", id: "ready", label: "Program Ready", sub: "15 minutes, day one", tone: "card", icon: CheckCircle2 },
  { kind: "step", id: "end", marker: "end", label: "", sub: "" },
];

export default function ProjectSetupDiagram() {
  return <FlowDiagram steps={steps} accent={ACCENT} ariaLabel="Project setup agent architecture — phData Innovation Award" />;
}
