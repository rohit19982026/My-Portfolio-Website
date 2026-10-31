"use client";

import { Clock, Code, FileCheck, Network, Zap } from "lucide-react";
import { SiJira } from "react-icons/si";
import FlowDiagram, { type Step } from "./FlowDiagram";

const ACCENT = "#22c55e";

// Linear pull from Jira, one Apps Script pass, then a two-way fan-out for
// the two things the report actually shows (what's blocking what, and for
// how long) before they merge into the report the team reads.
const steps: Step[] = [
  { kind: "step", id: "start", marker: "start", label: "", sub: "" },
  { kind: "step", id: "trigger", label: "Scheduled Trigger", sub: "Runs on a schedule", tone: "card", icon: Zap },
  { kind: "step", id: "pull", label: "Tool Call: Jira REST API", sub: "Active stories", tone: "card", icon: SiJira, iconColor: "#2684FF" },
  { kind: "step", id: "agent", label: "Dependency Tracker", sub: "Google Apps Script", tone: "hero", icon: Code },
  {
    kind: "branch",
    id: "outputs",
    rows: [
      [
        { id: "map", label: "Blocking Map", sub: "", eyebrow: "OUTPUT", icon: Network },
        { id: "days", label: "Days Blocked", sub: "", eyebrow: "OUTPUT", icon: Clock },
      ],
    ],
  },
  { kind: "step", id: "report", label: "Team Report", sub: "Replaced a status meeting", tone: "card", icon: FileCheck },
  { kind: "step", id: "end", marker: "end", label: "", sub: "" },
];

export default function DependencyTrackerDiagram() {
  return (
    <FlowDiagram steps={steps} accent={ACCENT} heroTextColor="#0d0d0f" ariaLabel="Jira dependency tracker architecture" />
  );
}
