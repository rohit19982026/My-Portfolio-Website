// Case studies from real phData work. Every line here comes from Rohit's
// resume, his interview-prep notes or his meeting notes, and was confirmed
// before going live. Client names stay out; endings are only shown where
// he has confirmed them.

export type OwnerKind = "me" | "eng" | "client" | "lead";
export type CaseDiagramKind = "lanes" | "trade" | "fork" | "board";

export interface CaseStudy {
  id: string;
  number: string;
  tab: string;
  title: string;
  accent: string;
  tint: string;
  chips: string[];
  opening: string;
  owners: { who: string; kind: OwnerKind; items: string[] }[];
  steps: string[];
  ending?: string;
  keep?: string;
  diagram: CaseDiagramKind;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "platform-build",
    number: "01",
    tab: "Platform build",
    title: "Snowflake platform and data domain build",
    accent: "#6d3fe0",
    tint: "#f3efff",
    chips: ["Chemicals manufacturer", "Snowflake"],
    opening:
      "We were building a Snowflake platform and a new data domain for the same client, as two projects running side by side.",
    owners: [
      { who: "Me", kind: "me", items: ["Plans", "Budget", "Risks", "Updates to their leadership"] },
      { who: "Engineering", kind: "eng", items: ["Architecture", "Design"] },
      { who: "Client", kind: "client", items: ["Provisioning in their account", "Their source systems"] },
    ],
    steps: [
      "We started by documenting their existing Snowflake setup and access roles. That's when we found HR data that wasn't masked.",
      "I wrote it into the Information Architecture document, so the client decided how to handle it before we built on top of it.",
      "The client had to run the provisioning script and set up a service account themselves. I tracked those with a name and a date, the same as our own tasks.",
    ],
    diagram: "lanes",
  },
  {
    id: "migration",
    number: "02",
    tab: "Migration",
    title: "Redshift to Databricks migration",
    accent: "#d97a00",
    tint: "#fff4e2",
    chips: ["Ed-tech", "Databricks"],
    opening:
      "The client felt the migration was moving slowly. I couldn't show them why, because the team wasn't keeping Jira up to date.",
    owners: [
      { who: "Me", kind: "me", items: ["Delivery", "Reporting", "The client"] },
      { who: "Engineering lead", kind: "eng", items: ["The team", "How they worked"] },
      { who: "Client", kind: "client", items: ["Access", "Data", "Approvals"] },
    ],
    steps: [
      "The engineering lead told me Jira felt like extra admin on top of the migration work. I asked what else was taking his team's time, and he said status meetings.",
      "We agreed that if the team kept tickets current, I'd automate the status reports and cancel the meetings.",
      "I built a tracker with Google Apps Script and the Jira REST API. It pulls active tickets on a schedule, maps which ones block each other and counts the days they've been blocked.",
      "Because blocked time was counted on its own, I could show the client which items were waiting on their side.",
    ],
    ending: "The weekly status meetings stopped, and later the engineers asked me to track more.",
    keep: "Give before you ask.",
    diagram: "trade",
  },
  {
    id: "scope",
    number: "03",
    tab: "Scope",
    title: "Scope changes on a migration",
    accent: "#1f9d4a",
    tint: "#eaf8ec",
    chips: ["Data migration", "Change orders"],
    opening: "The work had been underestimated when it was sold, and partway through, the client asked for more.",
    owners: [
      { who: "Me", kind: "me", items: ["The SOW", "The budget", "The client"] },
      { who: "Architects", kind: "eng", items: ["Estimates, which I review with them before signing"] },
      { who: "Our leadership", kind: "lead", items: ["How to cover the original gap"] },
    ],
    steps: [
      "I checked each new request against the SOW. If it was in scope, we did it.",
      "If it was out of scope, I raised a change order with the cost and timeline.",
      "A few requests weren't feasible the way they were asked. I worked out an alternative with the engineers and took that to the client.",
      "For the gap in the original estimate, I went to our engineering directors early, with the numbers.",
    ],
    diagram: "fork",
  },
  {
    id: "escalation",
    number: "04",
    tab: "Escalation",
    title: "A client escalation",
    accent: "#2563eb",
    tint: "#e9f0ff",
    chips: ["Several programs", "India and US"],
    opening:
      "Each of my programs has its own engineering team, but I'm shared across all of them. When one client escalated, the other programs still had to keep moving.",
    owners: [
      { who: "Me", kind: "me", items: ["All the client relationships"] },
      { who: "Engineering", kind: "eng", items: ["The fix"] },
      { who: "Other clients", kind: "client", items: ["Kept informed"] },
    ],
    steps: [
      "I worked out which programs needed me that week and which could run without me, and told those clients where my time was going.",
      "On the escalation itself, I got a workable answer from the engineers first, then went back to the client with options.",
    ],
    diagram: "board",
  },
];
