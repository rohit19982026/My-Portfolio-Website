export interface ImpactStat {
  value: string;
  label: string;
  detail: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "4–5",
    label: "Concurrent Programs",
    detail: "The phData steady-state — part-time on each, switching fast between them to keep all of them healthy.",
  },
  {
    value: "15+",
    label: "Programs End-to-End",
    detail: "Kickoff → execution → closure on each — the standard three-phase phData lifecycle.",
  },
  {
    value: "5",
    label: "Industries",
    detail: "EdTech, MarTech/AdTech, Investment Management, Industrial Manufacturing, B2B SaaS.",
  },
  {
    value: "3",
    label: "Countries Delivered Across",
    detail: "US, India, and a China-site program — up to a 10.5-hour timezone spread on a single engagement.",
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
