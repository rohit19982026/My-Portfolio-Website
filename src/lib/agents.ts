import {
  BarChart3,
  Compass,
  GitBranch,
  MessageSquare,
  Package,
  Rocket,
  Send,
  type LucideIcon,
} from "lucide-react";

export type AgentSlug = "billing" | "standup" | "setup" | "reports" | "messages" | "kickoff" | "tracker";

export type Agent = {
  slug: AgentSlug;
  title: string;
  /** One line, used on the home page card. */
  summary: string;
  cadence: string;
  builtWith: string;
  status: string;
  accent: string;
  icon: LucideIcon;
  problem: string;
  solved: string;
  /** Plain-word steps; read out for screen readers next to the diagram. */
  flow: string[];
  /** Only set where the site already states a real outcome. */
  result?: string;
};

// Facts here are the ones the resume or the site already states. No invented
// numbers: only the billing agent (17 checks, a 10-hour review cut to under 30
// minutes) and the tracker's dropped status meeting are outcomes; the other
// tools describe what they do. The tracker uses no AI, so it isn't called an agent.
export const agents: Agent[] = [
  {
    slug: "billing",
    title: "Month-end billing review",
    summary: "Runs 17 month-end checks and lists every mismatch.",
    cadence: "Monthly",
    builtWith: "Glean + Claude",
    status: "In production",
    accent: "#d7ff3f",
    icon: Package,
    problem: "Every month-end I had to check budget, billing, and timecards by hand, program by program.",
    solved:
      "An agent runs 17 checks and lists every mismatch with what to fix. A second agent adds up the numbers across all my programs.",
    flow: [
      "It starts on the first business day of the month.",
      "It pulls budget and time data.",
      "Three checks run side by side: budget against spend, billing readiness, and timecards.",
      "The findings come together in one report.",
      "I review it with the team.",
    ],
    result: "A month-end review that took about 10 hours by hand now takes under 30 minutes, and the 17 checks run every month.",
  },
  {
    slug: "standup",
    title: "Standup brief",
    summary: "One page before standup: what moved, what's stuck.",
    cadence: "Daily",
    builtWith: "Claude",
    status: "Built",
    accent: "#8B7FF0",
    icon: MessageSquare,
    problem: "Before standup I read Jira, Slack, and meeting notes to find out what had moved.",
    solved:
      "It reads them for me and gives one page: what moved, what is stuck, and whether the sprint is on track.",
    flow: [
      "It starts daily, before standup.",
      "It reads Jira, Slack, and meeting notes.",
      "It writes a one-page brief: done, blocked, on track.",
    ],
  },
  {
    slug: "setup",
    title: "Project setup",
    summary: "Sets up a new program the moment a SOW is signed.",
    cadence: "One-time",
    builtWith: "Glean + Claude",
    status: "Built",
    accent: "#5B9BF0",
    icon: Rocket,
    problem: "Every signed SOW meant the same setup work, done by hand.",
    solved:
      "When a SOW is signed in Salesforce, it sets up the Jira board, sprint cadence, risk log, RACI, and templates. It also sends the client status updates by email and Slack.",
    flow: [
      "A signed SOW comes in.",
      "The agent creates the Jira board and the sprint cadence.",
      "It adds the risk log, the RACI, and the governance templates.",
      "The program is ready to start.",
    ],
  },
  {
    slug: "reports",
    title: "Weekly status",
    summary: "Drafts the weekly client update and scores health.",
    cadence: "Weekly",
    builtWith: "Glean + Claude",
    status: "Built",
    accent: "#2DD4BF",
    icon: BarChart3,
    problem: "The weekly client update meant collecting data from Jira, Slack, and reports every Monday.",
    solved:
      "It collects it, scores each program's health, and drafts the update. I check it before it goes to Slack.",
    flow: [
      "It starts every Monday morning.",
      "It reads Jira, Slack, and reports.",
      "It drafts the status update.",
      "I review it, then I send it.",
    ],
  },
  {
    slug: "messages",
    title: "Stakeholder messages",
    summary: "A first draft for the messages that are hard to start.",
    cadence: "On demand",
    builtWith: "Claude",
    status: "Built",
    accent: "#f59e0b",
    icon: Send,
    problem: "Hard messages, like escalations and renewal talks, are slow to start.",
    solved: "I describe the situation and get a first draft to work from.",
    flow: [
      "I give it the context and the audience.",
      "The agent writes a draft.",
      "I edit it and send it.",
    ],
  },
  {
    slug: "kickoff",
    title: "Kickoff planning",
    summary: "Turns a kickoff brief into a discovery plan.",
    cadence: "Per kickoff",
    builtWith: "Claude",
    status: "Built",
    accent: "#F0618B",
    icon: Compass,
    problem: "A kickoff can start from a blank page.",
    solved:
      "It turns the kickoff brief into a stakeholder map, an interview guide, and a discovery plan, so the first sprint has a structure.",
    flow: [
      "I give it the kickoff brief.",
      "The agent builds a stakeholder map, an interview guide, and a discovery plan.",
      "Sprint 1 starts with a structure.",
    ],
  },
  {
    slug: "tracker",
    title: "Jira dependency tracker",
    summary: "Maps which Jira tickets block others, and for how long.",
    cadence: "Scheduled",
    builtWith: "Apps Script + Jira API",
    status: "Built",
    accent: "#22c55e",
    icon: GitBranch,
    problem: "It was hard to see which tickets block other tickets, and for how long.",
    solved: "A script checks Jira on a schedule, maps what blocks what, and counts the days.",
    flow: [
      "It runs on a schedule.",
      "It reads the active stories from Jira.",
      "It maps the blockers and counts the days blocked.",
      "It sends the team a report.",
    ],
    result: "One engineering team dropped its weekly status meeting because of the report.",
  },
];

export const getAgent = (slug: string) => agents.find((a) => a.slug === slug);
