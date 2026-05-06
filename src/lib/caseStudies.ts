export interface CaseStudy {
  id: string;
  number: string;
  type: string;
  title: string;
  outcome: string;
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
    type: "PLATFORM BUILD",
    title: "Marketing Data Pipeline Modernisation — Enterprise SaaS Client",
    outcome: "MWAA & dbt · $1.37M T&M · 2-Year Engagement · $831K Scope Expansion Won",
    industry: "ENTERPRISE SAAS · MARKETING TECH",
    year: "2024–26",
    model: "T&M",
    context:
      "A $1.37M T&M engagement to build and modernise a marketing data platform for an Enterprise SaaS company, using MWAA (Apache Airflow on AWS) and dbt. Distributed US-India engineering pod. Multiple security and compliance workstreams — InfoSec, IAM, VPN — created hard external blockers with no owners and no resolution timelines. The kind of invisible drag that quietly kills velocity while the burndown looks fine.",
    moves: [
      "Built a live dependency tracker for every InfoSec, IAM, and VPN approval — named owner, aging counter, escalation path. Used that data to drive client-side escalation in steerco weeks before any blocker could stall the team. Visibility replaced hope.",
      "Ran a real-time EAC-vs-SOW model throughout the engagement, caught a $831K funding gap six weeks before SOW expiry, and presented the executive business case that unlocked the change order — before the engineering team ever felt a constraint.",
      "Resequenced the entire WBS through formal change control — front-loaded vendor-owned work, back-loaded client-approval dependencies — so the team stayed productive through external approval cycles. 96% of scope delivered on budget.",
    ],
    result: "✓ 96% SCOPE DELIVERED · 99.98% BUDGET EXECUTION · ENGAGEMENT RENEWED",
    stack: ["MWAA (Airflow on AWS)", "dbt", "AWS", "Slack Alerting", "Jira"],
    metrics: [
      { label: "TOTAL VALUE", value: "$1.37M" },
      { label: "BUDGET EXEC.", value: "99.98%" },
      { label: "SCOPE EXPANSION", value: "$831K" },
      { label: "SCOPE DELIVERED", value: "96%" },
      { label: "DURATION", value: "2+ YRS" },
    ],
  },
  {
    id: "redshift-databricks",
    number: "002",
    type: "CLOUD MIGRATION",
    title: "Cloud Data Warehouse Migration — EdTech Platform",
    outcome: "Redshift → Databricks (Unity Catalog) · $669K Fixed-Price · 16-Week M&A Cutover",
    industry: "EDTECH · K-12 & HIGHER EDUCATION",
    year: "2025–26",
    model: "FIXED-PRICE",
    context:
      "A $669K fixed-price migration of ~2,300 production data objects from Amazon Redshift to Databricks with Unity Catalog, for an EdTech platform. The deadline was non-negotiable — set by an M&A cutover date. 11-person US-India engineering pod. In fixed-price delivery, every overrun comes directly out of margin, so the delivery model had to absorb risk structurally.",
    moves: [
      "Designed the sprint model from scratch — factory-style throughput targets per pod, UAT acceptance criteria based on functional parity (not story points), and a burndown anchored to the M&A date. The critical path was owned, not monitored.",
      "Built the onboarding runbook and cross-training plan before Sprint 1 — eliminating single points of failure on the critical path in both regions. Dependency mapping at the team level, not just the technical level.",
      "Introduced AI-Assisted Development as a governed SDLC lever — established review guardrails, tracked velocity uplift per sprint, and produced the audit trail required by the client's compliance team.",
    ],
    result: "✓ ON-PACE FOR 16-WEEK M&A CUTOVER · AHEAD OF TIMELINE",
    stack: ["Databricks", "Amazon Redshift", "Unity Catalog", "Spark SQL", "Jira"],
    metrics: [
      { label: "CONTRACT", value: "$669K" },
      { label: "OBJECTS MIGRATED", value: "~2,300" },
      { label: "TIMELINE", value: "16 WKS" },
      { label: "TEAM SIZE", value: "11 ENG" },
      { label: "REGIONS", value: "US + INDIA" },
    ],
  },
  {
    id: "sql-server-snowflake",
    number: "003",
    type: "DATA MIGRATION",
    title: "Regulated Reporting Migration — Investment Management Firm",
    outcome: "SQL Server → Snowflake · $180.5K Fixed-Price · 189 Regulated Reporting Objects",
    industry: "INVESTMENT MANAGEMENT · REGULATED FINANCIAL SERVICES",
    year: "2024",
    model: "FIXED-PRICE",
    context:
      "A $180.5K fixed-price migration of 189 regulated reporting objects from SQL Server to Snowflake for an investment management firm. Every over-hour came directly out of margin. A 19-week delivery window with a 3-week year-end regulatory blackout baked in, and change-management gates on every production deployment — no buffer, no flexibility on the contractual date.",
    moves: [
      "Decomposed the WBS into 6 parallel epic tracks with explicit cross-track dependency mapping and float allocation — the structural decision that turned a 19-week deadline with deep interdependencies into a plan the team could actually execute.",
      "Built a weighted % complete model on top of standard EVM — distinguishing 'easy stories closed' from 'hard stories lagging' — and surfaced schedule risk four weeks before it would have appeared on a standard burndown. Resequenced while float still existed.",
      "Ran formal change control around the 3-week year-end blackout — front-loaded vendor-owned work, back-loaded every client-approval gate. Absorbed the ~15% engineering day loss through float reallocation. Hit the contractual date with full margin and same-day client sign-off.",
    ],
    result: "✓ DELIVERED ON TIME · FULL MARGIN INTACT · CLIENT SIGN-OFF SAME DAY",
    stack: ["Snowflake", "SQL Server", "Qlik Replicate", "Power BI", "MS Project"],
    metrics: [
      { label: "CONTRACT", value: "$180.5K" },
      { label: "OBJECTS", value: "189" },
      { label: "TIMELINE", value: "19 WKS" },
      { label: "EPIC TRACKS", value: "6 PARALLEL" },
      { label: "MARGIN", value: "PROTECTED" },
    ],
  },
  {
    id: "identity-resolution",
    number: "004",
    type: "PLATFORM MIGRATION",
    title: "Identity Resolution Platform Migration — MarTech / AdTech Company",
    outcome: "Hadoop → Snowflake · $600K T&M · Full Program Baseline Built from Zero in 9 Days",
    industry: "MARTECH / ADTECH · B2B2C DATA PLATFORM",
    year: "2024",
    model: "T&M",
    context:
      "A $600K T&M engagement to migrate an identity resolution platform from Hadoop to Snowflake for a MarTech/AdTech company. Handed over with no Project Execution Plan, no WBS, no RAID log — and a parallel data-platform program already mid-flight with overlapping scope and shared infrastructure. Not inheriting a project; inheriting chaos.",
    moves: [
      "Authored the full Project Execution Plan from a blank page in 9 days — phases, WBS, sprint backlog, acceptance criteria, RAID log, RACI, governance cadence, and Sprint 1 stories ready to execute. From no baseline to a structured delivery programme in under two weeks.",
      "Embedded a risk lens into every early architecture conversation — reframed each technical trade-off in schedule slippage, ramp cost, and rollback complexity terms. Engineering owned the technical decisions; the PM made each one defensible in the next steerco.",
      "Mapped cross-program dependencies with the parallel Snowflake engagement, stood up a shared architecture working group, and eliminated duplicated infrastructure investment across both streams.",
    ],
    result: "✓ SPRINT 1 DELIVERED ON PLAN · GREEN STATUS THROUGH EVERY REVIEW",
    stack: ["Snowflake", "Hadoop", "Apache Spark", "Identity Graph", "Jira"],
    metrics: [
      { label: "CONTRACT", value: "$600K" },
      { label: "PEP TURNAROUND", value: "9 DAYS" },
      { label: "PROGRAM STATUS", value: "GREEN" },
      { label: "PROGRAMS SYNCED", value: "2" },
      { label: "MODEL", value: "T&M" },
    ],
  },
  {
    id: "snowflake-china",
    number: "005",
    type: "COMPLIANCE DEPLOYMENT",
    title: "PIPL-Compliant Data Platform Deployment — Industrial Manufacturer, China",
    outcome: "Snowflake · China Operations · PIPL Compliance · T&M · 3 Time Zones · 6-Week Go-Live",
    industry: "INDUSTRIAL MANUFACTURING · GLOBAL OPERATIONS",
    year: "2024",
    model: "T&M",
    context:
      "A T&M engagement to deploy a PIPL-compliant Snowflake data platform for a global industrial manufacturer's China operations — connecting plant-floor data to management reporting. Three time zones: US executive sponsors, India engineering team, China operations. Regulatory compliance gates on every release. A 2-week regional holiday inside the delivery window with no schedule buffer.",
    moves: [
      "Mapped the full critical path — provisioning → landing → validation → orchestration → compliance review — and built every client-side blocker into the RAID log with a named owner, resolution date, and escalation path. Issues surfaced weeks early, not days late.",
      "Re-baselined the sprint plan around the 2-week regional holiday through formal change control — front-loaded all vendor-owned work, back-loaded every client-approval gate. The team kept shipping through what would otherwise have been a full delivery stall.",
      "Designed a follow-the-sun governance model — async written summaries, time-zone-anchored decision logs, single source of truth — so executives in any geography could review status and make decisions without waiting for the next live session.",
    ],
    result: "✓ LIVE IN 6 WEEKS · PIPL-COMPLIANT · DATA DELIVERED TO PLANT MANAGERS",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "PIPL Compliance Framework"],
    metrics: [
      { label: "GO-LIVE", value: "6 WEEKS" },
      { label: "TIME ZONES", value: "3" },
      { label: "COMPLIANCE", value: "PIPL" },
      { label: "DELIVERY", value: "ON TIME" },
      { label: "REGIONS", value: "US · IN · CN" },
    ],
  },
  {
    id: "managed-de-pod",
    number: "006",
    type: "MANAGED SERVICE",
    title: "Managed Data Engineering Pod — Software Intelligence Company",
    outcome: "Snowflake Medallion Architecture · 12+ Source Systems · Ongoing · Annually Renewed",
    industry: "SOFTWARE INTELLIGENCE · B2B SAAS",
    year: "ONGOING",
    model: "MANAGED",
    context:
      "An embedded, ongoing data engineering managed service for a Software Intelligence SaaS company — ingesting 12+ source systems into a Snowflake medallion lakehouse. Multiple business stakeholders with competing priorities and no shared prioritisation framework. Backlog growing faster than capacity. UAT latency and approval lag creating invisible drag that no one was measuring.",
    moves: [
      "Stood up a weighted intake and prioritisation framework — RICE-style scoring with transparent trade-off visibility for every stakeholder. Decision velocity tripled, the PM was no longer the arbiter of every backlog disagreement, and stakeholders gained a shared language for competing priorities.",
      "Instrumented the full delivery pipeline — intake to engineering to UAT to release — and surfaced client-side bottlenecks (UAT aging, approval latency, blocker age) in every sprint review, with a named owner and escalation path.",
      "Built the operating model that let the pod function as a trusted internal extension of the client's BI team — sprint reviews owned by engineering, stakeholder syncs owned by PM, decision rights clear enough to earn year-on-year renewal without a re-bid.",
    ],
    result: "✓ RENEWED ANNUALLY · EMBEDDED AS TRUSTED INTERNAL CAPABILITY",
    stack: ["Snowflake", "dbt", "Airflow", "Sigma BI", "Medallion Architecture"],
    metrics: [
      { label: "SOURCE SYSTEMS", value: "12+" },
      { label: "ARCHITECTURE", value: "MEDALLION" },
      { label: "RENEWAL", value: "ANNUAL" },
      { label: "STATUS", value: "EMBEDDED" },
      { label: "MODEL", value: "MANAGED" },
    ],
  },
];
