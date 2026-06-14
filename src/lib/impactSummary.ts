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
    label: "PMO Adoption of My AI Agents",
    detail: "Within about a month of the first one going live — built to get my own hours back, kept because the rest of the PMO wanted theirs back too.",
  },
  {
    value: "3",
    label: "Engagement Models, 3 Different Definitions of 'On Track'",
    detail: "Fixed-price, multi-year T&M, and internal builds — each one needs a different conversation about risk, and a different read on what 'green' actually means.",
  },
];

export const transformation = {
  label: "PMO-WIDE AI AUTOMATION",
  before: {
    heading: "Before",
    body: "About 8 hours per week of PM time across active programs went into the repeatable parts of the job — month-end billing reconciliation, sprint health scoring, project health scans, steerco deck drafting — done manually, program by program.",
  },
  after: {
    heading: "After",
    body: "6 agents I designed and built run PMO-wide on Glean, Claude, and n8n — recovering that ~8 hours/week, with the billing agent at a >95% accuracy check on its discrepancy detection. Built because I wanted those hours back, kept because the rest of the PMO wanted them back too.",
  },
};
