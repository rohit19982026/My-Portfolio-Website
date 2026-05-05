export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  industry: string;
  year: string;
  model: "T&M" | "FIXED-PRICE" | "MANAGED";
  context: string;
  moves: string[];
  result: string;
  stack: string[];
  metrics: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "marketing-data-platform",
    number: "001",
    title: "Marketing Data Platform — MWAA & dbt",
    industry: "ENTERPRISE SAAS",
    year: "2024–26",
    model: "T&M",
    context:
      "Enterprise SaaS leader modernizing their marketing analytics platform. $1.37M T&M program, distributed engineering pod across two regions, multiple security-gated workstreams, weekly steerco with VP-level sponsors and a hard SOW expiry on the horizon.",
    moves: [
      "Re-baselined the remaining backlog mid-engagement, modeled EAC vs. SOW ceiling, and built the executive business case that unlocked an $831K change order six weeks before SOW expiry — closed before the team ever saw a funding cliff.",
      "Re-sequenced the critical path around InfoSec, IAM and VPN dependencies through formal change control — vendor-only work front-loaded, client-gated tasks back-loaded — so velocity held even when external approvals stalled. Structural reason 96% of scope landed.",
      "Owned the resource management plan end-to-end — rate-card governance, PO coverage, onboarding/offboarding RACI, and contractual safeguards on every cross-border allocation. Zero margin leakage across the engagement.",
    ],
    result: "96% SCOPE · 99.98% BUDGET · ENGAGEMENT EXTENDED",
    stack: ["MWAA", "Airflow", "dbt", "AWS", "Slack Alerting"],
    metrics: [
      { label: "TOTAL VALUE", value: "$1.37M" },
      { label: "EXECUTION", value: "99.98%" },
      { label: "SCOPE EXPANSION", value: "$831K" },
      { label: "SCOPE DELIVERED", value: "96%" },
      { label: "DURATION", value: "2+ YRS" },
    ],
  },
  {
    id: "redshift-databricks",
    number: "002",
    title: "Cloud DW Migration — Redshift → Databricks",
    industry: "EDTECH",
    year: "2025–26",
    model: "FIXED-PRICE",
    context:
      "Global EdTech platform migrating ~2,300 production objects ahead of an M&A-driven hard cutover. $669K fixed-scope program, dual-region pod (US + India), 16-week window, parity-based UAT acceptance, weekly executive steerco against a non-negotiable date.",
    moves: [
      "Designed a factory-style delivery model — two-week sprints, throughput targets per pod, parity-based UAT acceptance criteria, and a burndown calibrated to the M&A cutover, not story-point optimism.",
      "Built the resource management plan and onboarding runbook for an 11-person dual-region pod — productive inside Sprint 1 with no ramp tax on velocity. Cross-trained capacity on the critical path to eliminate single-points-of-failure.",
      "Embedded AI-Assisted Development into the SDLC as a governed delivery lever — code-review guardrails, measurable productivity uplift, and a defensible audit trail for the client's risk & compliance review.",
    ],
    result: "ON-PACE FOR 16-WEEK CUTOVER · AHEAD OF M&A TIMELINE",
    stack: ["Databricks", "Redshift", "Unity Catalog", "Spark SQL", "AIAD"],
    metrics: [
      { label: "CONTRACT", value: "$669K" },
      { label: "OBJECTS", value: "~2,300" },
      { label: "TIMELINE", value: "16 WKS" },
      { label: "POD", value: "11 ENG" },
      { label: "REGIONS", value: "US + IN" },
    ],
  },
  {
    id: "sql-server-snowflake",
    number: "003",
    title: "Reporting Platform — SQL Server → Snowflake",
    industry: "INVESTMENT MGMT",
    year: "2024",
    model: "FIXED-PRICE",
    context:
      "Global investment management firm migrating 189 regulated reporting objects. $180.5K fixed-price SOW — every over-hour came directly out of margin. 19-week window with a 3-week year-end blackout baked into the calendar, plus regulated change-management gates on every production deployment.",
    moves: [
      "Decomposed the WBS into 6 parallel epic tracks with explicit cross-track dependencies and float — the structural decision that turned a 19-week deadline into a reachable plan on a stack with deep interdependencies.",
      "Built a weighted % complete + earned-value model that distinguished 'easy stories closed' from 'hard stories lagging' — surfaced schedule risk four weeks before it would have shown on a vanilla burndown. Triggered re-sequencing while recovery was still cheap.",
      "Re-baselined the schedule around a 3-week year-end blackout — lost ~15% of engineering days, absorbed it through float reallocation and parallelization, hit the contractual date with full margin intact.",
    ],
    result: "ON TIME · ON BUDGET · CLIENT SIGN-OFF SAME DAY",
    stack: ["Snowflake", "MSSQL", "Qlik Replicate", "Power BI"],
    metrics: [
      { label: "CONTRACT", value: "$180.5K" },
      { label: "OBJECTS", value: "189" },
      { label: "TIMELINE", value: "19 WKS" },
      { label: "EPICS", value: "6 PARALLEL" },
      { label: "MARGIN", value: "PROTECTED" },
    ],
  },
  {
    id: "identity-resolution",
    number: "004",
    title: "Identity Resolution — Hadoop → Snowflake",
    industry: "MARTECH / ADTECH",
    year: "2024",
    model: "T&M",
    context:
      "B2B2C identity resolution rebuild for a global MarTech leader. $600K T&M engagement handed over with no Project Execution Plan, no WBS, no RAID — and a parallel data-platform program already mid-flight with overlapping scope and shared infra dependencies.",
    moves: [
      "Authored the full Project Execution Plan from a blank page in 9 days — phases, WBS, sprint backlog, acceptance criteria, RAID log, RACI, governance cadence, and Sprint 1 stories ready to execute. Turned an SOW objective into a buildable plan.",
      "Embedded a delivery-risk lens into early architecture decisions — framed trade-offs in schedule slippage, ramp-up cost, and rollback complexity, not technical preference. Engineering owned the decisions; PM made sure they were defensible to the steerco.",
      "Mapped cross-program dependencies with the parallel engagement, stood up a shared architecture working group, and prevented duplicated infrastructure investment across two streams. Saved measurable engineering days on both sides.",
    ],
    result: "FIRST SPRINT DEMO ON PLAN · GREEN THROUGH EVERY REVIEW",
    stack: ["Snowflake", "Hadoop", "Spark", "Identity Graph"],
    metrics: [
      { label: "CONTRACT", value: "$600K" },
      { label: "MODEL", value: "T&M" },
      { label: "PEP TURNAROUND", value: "9 DAYS" },
      { label: "HEALTH", value: "GREEN" },
      { label: "SYNERGY", value: "2 PROGRAMS" },
    ],
  },
  {
    id: "snowflake-china",
    number: "005",
    title: "Regional Data Platform — Snowflake, China",
    industry: "INDUSTRIAL MFG",
    year: "2024",
    model: "T&M",
    context:
      "Global industrial manufacturer launching a PIPL-compliant Snowflake platform for their China operations. Three timezones (US sponsors, India engineering, China ops), strict data-residency and regulatory gates on every release, and a 2-week regional holiday landing inside the delivery window.",
    moves: [
      "Mapped the end-to-end critical path and dependency chain — provisioning → landing → validation → orchestration → compliance review — surfacing client-side blockers in the RAID weeks ahead, not days.",
      "Re-baselined the sprint plan around the 2-week regional holiday through formal change control — vendor-only work front-loaded, client-gated tasks back-loaded. Team kept shipping through what would have been a full delivery stall.",
      "Designed a follow-the-sun governance cadence — async written summaries, time-zone-anchored decision logs, and a single source of truth so executives in any geography could catch up without waiting for the next live meeting.",
    ],
    result: "LIVE IN 6 WEEKS · PIPL-COMPLIANT · LOCAL DATA TO PLANT MANAGERS",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "PIPL"],
    metrics: [
      { label: "GO-LIVE", value: "6 WEEKS" },
      { label: "REGIONS", value: "3 ZONES" },
      { label: "COMPLIANCE", value: "PIPL" },
      { label: "STAKEHOLDERS", value: "EXEC + OPS" },
      { label: "DELIVERY", value: "ON-TIME" },
    ],
  },
  {
    id: "managed-de-pod",
    number: "006",
    title: "Managed DE Pod — Medallion on Snowflake",
    industry: "SOFTWARE INTEL",
    year: "ONGOING",
    model: "MANAGED",
    context:
      "Software intelligence leader. Managed services engagement — embedded engineering pod ingesting 12+ source systems into a medallion lakehouse on Snowflake. Multiple competing business stakeholders, no shared prioritization framework, and a backlog growing faster than capacity.",
    moves: [
      "Stood up a weighted intake & prioritization framework across competing business stakeholders — RICE-style scoring, transparent tradeoffs, and a defensible work queue that tripled decision velocity and removed PM-as-arbiter from every conversation.",
      "Instrumented end-to-end velocity across intake → engineering → UAT → release — surfaced client-side bottlenecks (UAT aging, approval latency) in real time and escalated them to the right executive sponsor with data, not anecdote.",
      "Built the operating model and trust required for the pod to function as an independent extension of the internal BI team — earning year-on-year renewal and continuous scope expansion.",
    ],
    result: "RENEWED ANNUALLY · EMBEDDED AS TRUSTED INTERNAL CAPABILITY",
    stack: ["Snowflake", "dbt", "Airflow", "Sigma", "Medallion"],
    metrics: [
      { label: "SOURCES", value: "12+" },
      { label: "ARCH", value: "MEDALLION" },
      { label: "RENEWAL", value: "ANNUAL" },
      { label: "STATUS", value: "EMBEDDED" },
      { label: "MODE", value: "MANAGED" },
    ],
  },
];
