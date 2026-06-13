export interface ImpactStat {
  value: string;
  label: string;
  detail: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "15+",
    label: "Programs Led",
    detail: "7 documented in detail below",
  },
  {
    value: "7",
    label: "Industries Spanned",
    detail: "Enterprise SaaS, EdTech, Investment Mgmt, MarTech/AdTech, Manufacturing, B2B SaaS, AI/Professional Services",
  },
  {
    value: "2",
    label: "Programs Rescued Mid-Stream",
    detail: "Zero structure to green-status delivery; a renewal saved without a competitive re-bid",
  },
  {
    value: "15–30",
    label: "Engineers Per Program",
    detail: "Concurrent teams across US and India, with China added on one regulated deployment",
  },
  {
    value: "3",
    label: "Countries Delivered Across",
    detail: "US · India · China — including a 10.5-hour timezone spread on a single program",
  },
];

export const transformation = {
  label: "PMO-WIDE AI AUTOMATION SHIFT",
  before: {
    heading: "Before",
    body: "~8 hours per week of PM time across active programs went into billing reconciliation, status report generation, steerco deck drafting, and sprint health scoring — done manually, program by program.",
  },
  after: {
    heading: "After",
    body: "6 agents I designed and built now run PMO-wide on Glean, Claude, and n8n — recovering that ~8 hours/week with >95% accuracy and a 60% cut in billing reconciliation time, audited and in production since 2024.",
  },
};
