export interface ImpactStat {
  value: string;
  label: string;
  detail: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "4–5",
    label: "Programs Run Concurrently",
    detail: "Each at a different stage — one in kickoff, one mid-cadence, one heading into closure — switching context fast enough that none of them feel like the neglected one.",
  },
  {
    value: "10.5 HRS",
    label: "Widest Timezone Gap Navigated",
    detail: "A US delivery lead to a client's factory site in China, on a single program — redesigned the whole cadence around the gap instead of fighting it.",
  },
  {
    value: "100%",
    label: "Team Adoption of My AI Agents",
    detail: "Built to solve my own problem first. Every PM on the team was using it within a month — because it solved theirs too.",
  },
  {
    value: "3",
    label: "Programs, 3 Different Definitions of 'On Track'",
    detail: "Fixed-price delivery, long-term retainer, and an internal build — each needs a different conversation about risk, budget, and what 'green' actually means.",
  },
];

export const transformation = {
  label: "TEAM-WIDE AI AUTOMATION",
  before: {
    heading: "Before",
    body: "About 8 hours per week of PM time across active programs went into the repeatable parts of the job — month-end billing reconciliation, sprint health scoring, project health scans, leadership deck drafting — done manually, program by program.",
  },
  after: {
    heading: "After",
    body: "6 agents I designed and built now run across the delivery team on Glean, Claude, and n8n — recovering ~8 hours per week, with the billing agent accurate above 95% on its discrepancy check. Built because I wanted those hours back. Adopted because the rest of the team wanted theirs back too.",
  },
};
