import { AlertTriangle, Bot, Calendar, CheckCircle2, FileText, Users, Zap } from "lucide-react";
import { SiJira } from "react-icons/si";
import FlowDiagram, { type DiagramNode, type DiagramEdge } from "./FlowDiagram";

const ACCENT = "#5B9BF0";

// Orchestrator-workers: the agent parses a brief and dispatches 5 workers
// that run in parallel — laid out as two horizontal rows (3 + 2) of
// side-by-side siblings, not a vertical stack, since that's what actually
// happens. One genuine external tool call (Jira) and four agent-drafted,
// brief-specific skills, converging on one output.
const nodes: DiagramNode[] = [
  { id: "start",  x: 160, y: 2,   w: 20,  h: 20, label: "", sub: "", shape: "marker" },
  { id: "brief",  x: 30,  y: 34,  w: 280, h: 46, label: "Program Brief", sub: "Signed SOW in",        tone: "card", icon: Zap },
  { id: "agent",  x: 70,  y: 100, w: 200, h: 44, label: "Setup Agent",   sub: "Glean Agent · Claude",  tone: "hero", icon: Bot },
  { id: "jira",   x: 25,  y: 208, w: 90,  h: 68, label: "Jira API",         sub: "", eyebrow: "TOOL CALL", tone: "card", icon: SiJira, iconColor: "#2684FF" },
  { id: "sprint", x: 125, y: 208, w: 90,  h: 68, label: "Sprint\nCadence",  sub: "", eyebrow: "SKILL", tone: "card", icon: Calendar },
  { id: "risk",   x: 225, y: 208, w: 90,  h: 68, label: "Risk Log",        sub: "", eyebrow: "SKILL", tone: "card", icon: AlertTriangle },
  { id: "raci",   x: 35,  y: 350, w: 125, h: 64, label: "RACI",            sub: "", eyebrow: "SKILL", tone: "card", icon: Users },
  { id: "gov",    x: 180, y: 350, w: 125, h: 64, label: "Governance\nTemplates", sub: "", eyebrow: "SKILL", tone: "card", icon: FileText },
  { id: "ready",  x: 70,  y: 474, w: 200, h: 44, label: "Program Ready",   sub: "15 minutes, day one", tone: "card", icon: CheckCircle2 },
  { id: "end",    x: 160, y: 536, w: 20,  h: 20, label: "", sub: "", shape: "marker" },
];

// Row A (Jira/Sprint/Risk) and row B (RACI/Governance) both dispatch
// straight from the agent — row A directly below it with a generous 64px
// drop (a shallow drop over this much horizontal spread reads as flat,
// cluttered lines), row B via a margin trunk on each side that clears row
// A's footprint entirely before dropping down. Convergence to "Program
// Ready" mirrors the same shape: row A routes around row B's footprint via
// the same margins, row B (already below, clear gap) connects directly, and
// the one node with no lateral obstruction (Sprint Cadence) runs straight
// down the natural gap between RACI and Governance.
const edges: DiagramEdge[] = [
  { points: [[170, 22], [170, 34]],  delay: 0.05 },
  { points: [[170, 80], [170, 100]],  delay: 0.15 },
  { points: [[170, 144], [70, 208]], delay: 0.3 },
  { points: [[170, 144], [170, 208]], delay: 0.35 },
  { points: [[170, 144], [270, 208]], delay: 0.4 },
  { points: [[170, 144], [170, 154], [10, 154], [10, 340], [98, 340], [98, 350]],   delay: 0.45 },
  { points: [[170, 144], [170, 154], [330, 154], [330, 340], [242, 340], [242, 350]], delay: 0.5 },
  { points: [[70, 276], [70, 286], [10, 286], [10, 460], [100, 460], [100, 474]],   delay: 0.65 },
  { points: [[170, 276], [170, 474]],                                              delay: 0.7 },
  { points: [[270, 276], [270, 286], [330, 286], [330, 460], [240, 460], [240, 474]], delay: 0.75 },
  { points: [[98, 414], [130, 474]],  delay: 0.8 },
  { points: [[242, 414], [210, 474]], delay: 0.85 },
  { points: [[170, 518], [170, 536]], delay: 0.95 },
];

export default function ProjectSetupDiagram() {
  return (
    <FlowDiagram
      viewBox="0 0 340 556"
      nodes={nodes}
      edges={edges}
      accent={ACCENT}
      ariaLabel="Project setup agent architecture — phData Innovation Award"
    />
  );
}
