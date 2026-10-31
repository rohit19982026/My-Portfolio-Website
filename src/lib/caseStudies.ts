// Case studies from real phData work. Every line comes from Rohit's resume,
// his interview-prep notes or his meeting notes. Client names stay out, and
// an ending is only shown where it has been confirmed. Cases 03 and 04
// describe how he handles situations that come up across his programs, so
// they are written as "how I handle it", not as one dated project.

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
  /** What the project was, in plain words. */
  opening: string;
  /** What made it hard or what was at stake. */
  challenge?: string;
  owners: { who: string; kind: OwnerKind; items: string[] }[];
  stepsLabel?: string;
  steps: string[];
  ending?: string;
  endingLabel?: string;
  keep?: string;
  diagram: CaseDiagramKind;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "platform-build",
    number: "01",
    tab: "Snowflake setup",
    title: "Finding exposed HR data during a Snowflake setup",
    accent: "#6d3fe0",
    tint: "#f3efff",
    chips: ["Chemicals manufacturer", "Snowflake"],
    opening:
      "A chemicals manufacturer had two projects with us at the same time. One set up the foundations of their Snowflake account, the cloud system that holds their company data. The other brought data from three of their business systems, including SAP, into it.",
    challenge:
      "I was running both for the same leadership group, and we didn't yet know what was already sitting in the account or who could see it.",
    owners: [
      { who: "Me", kind: "me", items: ["Plans and budgets for both projects", "Risks", "Updates to their leadership"] },
      { who: "Our engineers and architects", kind: "eng", items: ["How it was designed and built"] },
      { who: "The client", kind: "client", items: ["Setting up access in their own systems", "Knowing their business systems"] },
    ],
    steps: [
      "Before designing anything, we documented how the account was set up and who had access to what. That's how we found HR records with personal details that weren't masked, so anyone with access could read them.",
      "I raised it with their leadership in our next status meeting, and we wrote it into the design document that sets out how their data is organised and protected. That way the decision on how to handle it was theirs, before we built anything on top.",
      "Some steps only the client could do in their own systems, like running the script that creates user accounts and setting up a system login for our tools. I tracked those with a name and a date, the same as our own tasks.",
      "When one of our engineers moved on mid-project, his replacement was already being onboarded and his work was handed over before he left. I told the client in the same update, along with what it meant for the timeline.",
    ],
    keep: "Raise it early, and let the client decide.",
    diagram: "lanes",
  },
  {
    id: "migration",
    number: "02",
    tab: "Migration",
    title: "Getting a busy engineering team to keep Jira current",
    accent: "#d97a00",
    tint: "#fff4e2",
    chips: ["Ed-tech", "Redshift to Databricks"],
    opening:
      "An ed-tech company was moving its data from Amazon Redshift to Databricks, two platforms for storing and analysing data. Every week I reported progress to the client, and those reports came from Jira, the team's task tracker.",
    challenge:
      "The tickets weren't being kept up to date, so my reports couldn't show what was really done or stuck. When I raised it, the engineering lead pushed back: his team was stretched on the migration, and Jira felt like admin on top.",
    owners: [
      { who: "Me", kind: "me", items: ["Delivery", "Weekly reporting", "The client relationship"] },
      { who: "Engineering lead", kind: "eng", items: ["His team and how they worked"] },
      { who: "The client", kind: "client", items: ["Access, data and approvals our work depended on"] },
    ],
    steps: [
      "Instead of pushing harder, I asked the lead what was taking his team's time that wasn't engineering. His answer was status meetings.",
      "So I offered a trade. If the team kept their tickets current, I'd produce the status reports automatically and drop the meetings.",
      "I built the tool myself with Google Apps Script and the Jira API. On a schedule, it pulls the open tickets, shows which ones are blocking others and counts how many days each one has been stuck.",
    ],
    ending:
      "Its reports replaced the weekly status meeting, and the engineers got that time back. Later, once they could see how long their work sat waiting on others, they asked me to track more.",
    keep: "Give before you ask.",
    diagram: "trade",
  },
  {
    id: "scope",
    number: "03",
    tab: "Scope changes",
    title: "Handling scope changes mid-project",
    accent: "#1f9d4a",
    tint: "#eaf8ec",
    chips: ["Data migrations", "Contracts"],
    opening:
      "Each program I run has a statement of work (SOW), the signed contract that lists what we'll deliver, by when and for how much. On migrations, the work sometimes turns out bigger than estimated when the deal was sold, and clients ask for more along the way.",
    challenge:
      "If we quietly absorb the extra work, the budget runs out before the job is done. If we just say no, the client stops trusting us. And some requests can't be built the way they're asked.",
    owners: [
      { who: "Me", kind: "me", items: ["The SOW", "The budget", "The client relationship"] },
      { who: "Our architects", kind: "eng", items: ["Estimates, which I review with them before the SOW is signed"] },
      { who: "Our leadership", kind: "lead", items: ["Deciding who covers a gap in the original estimate"] },
    ],
    stepsLabel: "How I handle it",
    steps: [
      "I check every new request against the SOW. If it's in scope, we do it without any back and forth.",
      "If it's outside the SOW, I raise a change order: a short add-on to the contract with the extra cost and time written down, so the client can decide with the numbers in front of them.",
      "If engineering says a request isn't feasible as asked, I work out with them what is possible and take that to the client as options.",
      "When the gap comes from the original estimate, I take it to our engineering directors early, with the numbers, so we agree how to cover it before it turns into a problem.",
    ],
    ending:
      "Three clients have extended into analytics or AI/ML work after their migration. I put that down to delivering reliably and being open about problems, including in our quarterly reviews.",
    endingLabel: "What it's led to",
    keep: "Put the numbers in front of people.",
    diagram: "fork",
  },
  {
    id: "escalation",
    number: "04",
    tab: "Escalations",
    title: "Keeping other programs moving during an escalation",
    accent: "#2563eb",
    tint: "#e9f0ff",
    chips: ["4–5 programs at once", "India and US teams"],
    opening:
      "I run four or five client programs at a time. Each one has its own engineering team, but I'm the one person shared across all of them.",
    challenge:
      "When a client escalates, meaning they're unhappy enough to take a problem to senior people and want it fixed now, it can take all of my time. The other programs still need their PM.",
    owners: [
      { who: "Me", kind: "me", items: ["Every client relationship", "Keeping all the programs on track"] },
      { who: "Our engineers", kind: "eng", items: ["The fix for the escalated issue"] },
      { who: "Other clients", kind: "client", items: ["Knowing where my time is going"] },
    ],
    stepsLabel: "How I handle it",
    steps: [
      "I work out which programs need me that week and which can run on their own process, and I tell those clients plainly where my time is going.",
      "On the escalated program, I go to our engineers first to find out what we can actually do, then go back to the client with options.",
      "If we can't agree on a way forward, I bring in our engineering directors and leadership for a second view.",
      "A weekly health check I built scores every program and posts the summary to Slack, so I can see early if one of the quieter programs starts to slip.",
    ],
    keep: "Tell people where your time is going.",
    diagram: "board",
  },
];
