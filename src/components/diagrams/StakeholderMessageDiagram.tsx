import { Bot, FileText, Send, UserCheck } from "lucide-react";
import FlowDiagram, { type Step } from "./FlowDiagram";

const ACCENT = "#f59e0b";

// Simplest diagram in the set — a single-LLM-call agent, no external tool
// calls, matching the copy's own framing ("I describe what I need to say
// ... this agent drafts a first version"). Purely linear: context in,
// draft out, human edits and sends. No branch groups at all.
const steps: Step[] = [
  { kind: "step", id: "start", marker: "start", label: "", sub: "" },
  { kind: "step", id: "trigger", label: "Message Request", sub: "Context + audience", tone: "card", icon: Send },
  { kind: "step", id: "agent", label: "Message Drafter Agent", sub: "Claude", tone: "hero", icon: Bot },
  { kind: "step", id: "draft", label: "Draft Message", sub: "Ready to edit", tone: "card", icon: FileText },
  { kind: "step", id: "human", label: "I Edit + Send", sub: "Human final pass", tone: "card", icon: UserCheck },
  { kind: "step", id: "end", marker: "end", label: "", sub: "" },
];

export default function StakeholderMessageDiagram() {
  return <FlowDiagram steps={steps} accent={ACCENT} ariaLabel="Stakeholder message drafter agent architecture" />;
}
