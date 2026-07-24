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
      "$1.37M T&M program. Distributed engineering pod across US and India. Multiple security-gated workstreams — InfoSec, IAM, VPN — creating hard external dependencies that had no owner and no resolution timeline. Weekly steerco with VP-level sponsors and a hard SOW expiry on the horizon.",
    moves: [
      "Built a live dependency map across all InfoSec, IAM, and VPN approvals — assigned a named owner to each, tracked aging in every steerco, and used that visibility to force client-side escalation weeks before blockers would have killed velocity. Cross-functional alignment, not hope, is what kept the critical path alive.",
      "Ran a formal EAC-vs-SOW model mid-engagement, identified the funding gap six weeks before expiry, and built the executive business case that unlocked an $831K change order — before the engineering team ever felt the constraint. Financial governance closed the deal the delivery team didn't know was at risk.",
      "Re-sequenced the WBS through formal change control — vendor-only work front-loaded, client-gated tasks back-loaded — so sprint velocity held through external approval cycles. Structured change control, not heroics, is why 96% of scope landed on budget.",
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
      "$669K fixed-scope program. ~2,300 production objects. 11-person dual-region pod (US + India). 16-week non-negotiable window set by an M&A cutover date. No room to negotiate the deadline, only the delivery model.",
    moves: [
      "Designed the delivery framework from scratch — factory-style sprint model with per-pod throughput targets, parity-based UAT acceptance criteria, and a burndown calibrated to the M&A date rather than story-point velocity. The critical path was owned, not monitored.",
      "Built the onboarding runbook and cross-training plan for the 11-person dual-region pod — eliminating single points of failure on the critical path before Sprint 1 started. Dependency mapping at the team level, not just the tech level.",
      "Embedded AI-Assisted Development as a governed SDLC lever — established review guardrails, tracked productivity uplift per sprint, and documented the audit trail required for the client's risk and compliance review. Leadership communication that turned a novel approach into a defensible program decision.",
    ],
    result: "16-WEEK M&A CUTOVER DELIVERED · ~2,300 OBJECTS MIGRATED",
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
      "$180.5K fixed-price SOW — every over-hour came directly out of margin. 189 regulated reporting objects. 19-week window with a 3-week year-end blackout baked into the calendar and regulated change-management gates on every production deployment.",
    moves: [
      "Decomposed the WBS into 6 parallel epic tracks with explicit cross-track dependency mapping and float allocation — the structural decision that turned a 19-week deadline with deep interdependencies into a plan that engineering could actually execute without constant re-prioritization.",
      "Built a weighted % complete model layered onto EVM — distinguishing 'easy stories closed' from 'hard stories lagging' — and surfaced schedule risk four weeks before it would have appeared on a vanilla burndown. Re-sequenced recovery while the float still existed.",
      "Ran formal change control around the 3-week year-end blackout — front-loaded vendor-owned work, back-loaded client-approval gates, and absorbed the ~15% engineering day loss through float reallocation. Hit the contractual date with full margin intact and client sign-off the same day.",
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
      "$600K T&M engagement handed over with no Project Execution Plan, no WBS, no RAID log — and a parallel data-platform program already mid-flight with overlapping scope and shared infrastructure dependencies. The chaos was the starting condition.",
    moves: [
      "Authored the full Project Execution Plan from a blank page in 9 days — phases, WBS, sprint backlog, acceptance criteria, RAID log, RACI, governance cadence, and Sprint 1 stories ready to execute. Organized the chaos before the team experienced it. First sprint demo was on plan.",
      "Embedded a risk lens into early architecture decisions — reframed every technical trade-off in schedule slippage, ramp-up cost, and rollback complexity terms. Engineering owned the technical decisions; the PM made sure each one was defensible in the next steerco.",
      "Mapped cross-program dependencies with the parallel engagement, stood up a shared architecture working group, and eliminated duplicated infrastructure investment across two streams. Cross-functional alignment that saved measurable engineering days on both programs.",
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
      "PIPL-compliant Snowflake platform for a global industrial manufacturer's China operations. Three timezones — US sponsors, India engineering, China ops. Regulatory compliance gates on every release. A 2-week regional holiday landing inside the delivery window with no schedule buffer.",
    moves: [
      "Mapped the full critical path and dependency chain — provisioning → landing → validation → orchestration → compliance review — and built each client-side blocker into the RAID log with an owner, a resolution date, and an escalation path. Surface issues weeks early, not days late.",
      "Re-baselined the sprint plan around the 2-week regional holiday through formal change control — front-loaded all vendor-owned work, back-loaded every client-approval gate. Team kept shipping through what would have been a full delivery stall without structural re-sequencing.",
      "Designed a follow-the-sun governance cadence — async written summaries, time-zone-anchored decision logs, single source of truth — so executives in any geography could absorb program status and make decisions without waiting for the next live meeting.",
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
      "Embedded engineering pod ingesting 12+ source systems into a medallion lakehouse on Snowflake. Multiple competing business stakeholders with no shared prioritization framework. Backlog growing faster than capacity. UAT latency and approval lag creating invisible drag on velocity.",
    moves: [
      "Stood up a weighted intake and prioritization framework — RICE-style scoring with transparent trade-off visibility — that tripled decision velocity, removed PM-as-arbiter from every backlog conversation, and gave stakeholders a shared language for competing priorities.",
      "Instrumented the full delivery pipeline — intake → engineering → UAT → release — and surfaced client-side bottlenecks (UAT aging, approval latency, blocker age) in real time. Escalated each with data and a named owner, not anecdote. Accountability replaced guesswork.",
      "Built the operating model and governance rhythm that allowed the pod to function as a trusted internal extension of the client's BI team — sprint reviews owned by engineering, stakeholder syncs owned by PM, and decision rights clear enough to earn year-on-year renewal.",
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
