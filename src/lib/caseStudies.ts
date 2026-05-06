export interface CaseStudy {
  id: string;
  number: string;
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
    title: "Enterprise Marketing Platform — Budget Expanded, Engagement Renewed",
    outcome: "$1.37M delivered · $831K scope expansion won · 2+ years running",
    industry: "ENTERPRISE SAAS",
    year: "2024–26",
    model: "T&M",
    context:
      "A $1.37M engagement with a distributed US-India engineering team building a marketing data platform. Multiple security and compliance workstreams (InfoSec, IAM, VPN) created hard external blockers with no owners and no resolution timelines — the kind of invisible drag that quietly kills velocity while the burndown looks fine.",
    moves: [
      "Built a live dependency tracker for every InfoSec, IAM, and VPN approval — named owner, aging counter, escalation path. Used that data to push client-side escalation in steerco weeks before any blocker could stall the team. Visibility replaced hope.",
      "Ran a real-time EAC-vs-SOW model throughout the engagement, caught a $831K funding gap six weeks before the SOW expiry, and presented the executive business case that unlocked the change order — before the engineering team ever felt a constraint.",
      "Resequenced the entire WBS through formal change control — front-loaded vendor-owned work, back-loaded client-approval dependencies — so the team stayed productive through external approval cycles. 96% of scope delivered on budget.",
    ],
    result: "✓ 96% SCOPE DELIVERED · 99.98% BUDGET EXECUTION · ENGAGEMENT RENEWED",
    stack: ["MWAA", "Airflow", "dbt", "AWS", "Slack Alerting"],
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
    title: "Cloud Data Migration — Fixed-Price, Hard Deadline, On Track",
    outcome: "$669K · 2,300 objects · 16-week M&A cutover · 11-person pod",
    industry: "EDTECH",
    year: "2025–26",
    model: "FIXED-PRICE",
    context:
      "A $669K fixed-price migration of ~2,300 production data objects from Redshift to Databricks. The deadline was non-negotiable — set by an M&A cutover date. An 11-person US-India pod. In fixed-price delivery, every overrun comes out of margin, so the delivery model had to be designed to absorb risk structurally, not heroically.",
    moves: [
      "Designed the sprint model from scratch — factory-style throughput targets per pod, UAT acceptance criteria based on functional parity (not just story points), and a burndown anchored to the M&A date. The critical path was owned, not monitored.",
      "Built the onboarding runbook and cross-training plan before Sprint 1 started — eliminating single points of failure on the critical path in both regions. Dependency mapping at the team level, not just the technical level.",
      "Introduced AI-Assisted Development as a governed lever in the SDLC — established review guardrails, tracked velocity uplift per sprint, and produced the audit trail required by the client's compliance team. Turned a novel approach into a defensible delivery decision.",
    ],
    result: "✓ ON-PACE FOR 16-WEEK CUTOVER · AHEAD OF M&A TIMELINE",
    stack: ["Databricks", "Redshift", "Unity Catalog", "Spark SQL"],
    metrics: [
      { label: "CONTRACT", value: "$669K" },
      { label: "OBJECTS", value: "~2,300" },
      { label: "TIMELINE", value: "16 WKS" },
      { label: "TEAM SIZE", value: "11 ENG" },
      { label: "REGIONS", value: "US + IN" },
    ],
  },
  {
    id: "sql-server-snowflake",
    number: "003",
    title: "Regulated Reporting Migration — On Time, Full Margin Protected",
    outcome: "$180.5K fixed-price · 189 regulated objects · client sign-off same day",
    industry: "INVESTMENT MANAGEMENT",
    year: "2024",
    model: "FIXED-PRICE",
    context:
      "A $180.5K fixed-price migration of 189 regulated reporting objects for an investment management firm. Every over-hour came directly out of margin. A 19-week window with a 3-week year-end blackout and regulated change-management gates on every production deployment — no buffer, no flexibility on the contractual date.",
    moves: [
      "Decomposed the WBS into 6 parallel epic tracks with explicit cross-track dependency mapping and float allocation. That structural decision turned a 19-week deadline with deep interdependencies into a plan the team could actually execute — without constant re-prioritisation.",
      "Built a weighted % complete model on top of standard EVM — distinguishing 'easy stories closed' from 'hard stories lagging' — and surfaced schedule risk four weeks before it would have appeared on a standard burndown. Resequenced recovery while float still existed.",
      "Ran formal change control around the 3-week year-end blackout — front-loaded all vendor-owned work, back-loaded every client-approval gate. Absorbed the ~15% engineering day loss through float reallocation. Hit the contractual date with full margin and client sign-off the same day.",
    ],
    result: "✓ DELIVERED ON TIME · FULL MARGIN INTACT · CLIENT SIGN-OFF SAME DAY",
    stack: ["Snowflake", "SQL Server", "Qlik Replicate", "Power BI"],
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
    title: "Identity Resolution Platform — Zero to Sprint 1 in 9 Days",
    outcome: "$600K T&M · No baseline handed over · Green through every review",
    industry: "MARTECH / ADTECH",
    year: "2024",
    model: "T&M",
    context:
      "A $600K engagement handed over with no Project Execution Plan, no WBS, no RAID log — and a parallel program already mid-flight with overlapping scope and shared infrastructure. The PM wasn't inheriting a project; they were inheriting chaos. The first job was to impose structure before the team felt the disorder.",
    moves: [
      "Authored the full Project Execution Plan from a blank page in 9 days — phases, WBS, sprint backlog, acceptance criteria, RAID log, RACI, governance cadence, and Sprint 1 stories ready to execute. The team went from no baseline to a structured delivery programme in under two weeks.",
      "Embedded a risk lens into every early architecture conversation — reframed each technical trade-off in schedule slippage, ramp cost, and rollback complexity terms. Engineering owned the technical decisions; the PM made each one defensible in the next steerco.",
      "Mapped the cross-program dependency between this engagement and the parallel platform program, stood up a shared architecture working group, and eliminated duplicated infrastructure investment across both streams.",
    ],
    result: "✓ SPRINT 1 DELIVERED ON PLAN · GREEN STATUS EVERY REVIEW",
    stack: ["Snowflake", "Hadoop", "Spark", "Identity Graph"],
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
    title: "PIPL-Compliant Global Platform — Live in 6 Weeks, 3 Time Zones",
    outcome: "Industrial manufacturer · China ops · US sponsors · India engineering",
    industry: "INDUSTRIAL MANUFACTURING",
    year: "2024",
    model: "T&M",
    context:
      "A PIPL-compliant Snowflake data platform for a global industrial manufacturer's China operations. Three time zones — US sponsors, India engineering, China ops. Regulatory compliance gates on every release. A 2-week regional holiday falling inside the delivery window, with no schedule buffer to absorb it.",
    moves: [
      "Mapped the full critical path end-to-end — provisioning, landing, validation, orchestration, compliance review — and built every client-side blocker into the RAID log with a named owner, resolution date, and escalation path. Issues surfaced weeks early, not days late.",
      "Re-baselined the sprint plan around the 2-week regional holiday through formal change control — front-loaded all vendor-owned work, back-loaded every client-approval gate. The team kept shipping through what would otherwise have been a full delivery stall.",
      "Designed a follow-the-sun governance model — async written summaries, time-zone-anchored decision logs, single source of truth — so executives in any geography could review status and make decisions without waiting for the next live session.",
    ],
    result: "✓ LIVE IN 6 WEEKS · PIPL-COMPLIANT · DATA DELIVERED TO PLANT MANAGERS",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "PIPL Compliance"],
    metrics: [
      { label: "GO-LIVE", value: "6 WEEKS" },
      { label: "TIME ZONES", value: "3" },
      { label: "COMPLIANCE", value: "PIPL" },
      { label: "DELIVERY", value: "ON TIME" },
      { label: "TEAMS", value: "3 REGIONS" },
    ],
  },
  {
    id: "managed-de-pod",
    number: "006",
    title: "Managed Data Engineering Pod — Renewed Annually, Trusted Partner",
    outcome: "12+ source systems · Medallion architecture · Multi-year engagement",
    industry: "SOFTWARE INTELLIGENCE",
    year: "ONGOING",
    model: "MANAGED",
    context:
      "An embedded data engineering pod ingesting 12+ source systems into a medallion lakehouse on Snowflake. Multiple business stakeholders with competing priorities and no shared framework for deciding what gets built next. Backlog growing faster than capacity. UAT latency and approval lag creating invisible drag that no one was measuring.",
    moves: [
      "Stood up a weighted intake and prioritisation framework — transparent RICE-style scoring with trade-off visibility for every stakeholder. Decision velocity tripled, the PM stopped being the arbiter of every backlog disagreement, and stakeholders gained a shared language for competing priorities.",
      "Instrumented the full delivery pipeline — intake to engineering to UAT to release — and surfaced client-side bottlenecks (UAT aging, approval latency, blocker age) in every sprint review. Escalated each with data and a named owner. Accountability replaced guesswork.",
      "Built the operating model that let the pod function as a trusted internal capability — sprint reviews owned by engineering, stakeholder syncs owned by PM, decision rights clear enough to earn year-on-year renewal without a formal re-bid.",
    ],
    result: "✓ RENEWED ANNUALLY · EMBEDDED AS TRUSTED INTERNAL CAPABILITY",
    stack: ["Snowflake", "dbt", "Airflow", "Sigma", "Medallion Architecture"],
    metrics: [
      { label: "SOURCE SYSTEMS", value: "12+" },
      { label: "ARCHITECTURE", value: "MEDALLION" },
      { label: "RENEWAL", value: "ANNUAL" },
      { label: "STATUS", value: "EMBEDDED" },
      { label: "ENGAGEMENT", value: "MANAGED" },
    ],
  },
];
