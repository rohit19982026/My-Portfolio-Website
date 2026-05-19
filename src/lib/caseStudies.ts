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
  role: string;
  challenges: string[];
  actions: string[];
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
    outcome: "MWAA & dbt · $1.37M T&M · $831K Scope Expansion · 2-Year Engagement",
    industry: "ENTERPRISE SAAS · MARKETING TECH",
    year: "2024–26",
    model: "T&M",
    context:
      "$1.37M T&M engagement to build a marketing data platform using MWAA (Airflow on AWS) and dbt for an Enterprise SaaS company. By the end of Q1, the team was losing ~40% of planned sprint capacity to 17 external approval workstreams — InfoSec reviews, IAM access grants, VPN provisioning — all sitting with no owners and no resolution timelines. At that burn rate the program was heading toward budget exhaustion with 40% of scope still undelivered.",
    role:
      "Program Manager with full commercial ownership — $1.37M SOW plus the $831K expansion. Responsible for blocker governance, change control, EAC modeling, and exec-level client engagement.",
    challenges: [
      "17 external approval workstreams with no named owners, no timelines, and no escalation path — consuming 40% of sprint capacity",
      "Scope had grown 23% from kickoff with no change orders raised, only surfaced by EAC modeling 6 weeks before SOW expiry",
      "No change control process in place — scope additions being absorbed silently into the backlog",
    ],
    actions: [
      "Built a live dependency register with aging counters on every item, assigned named client-side owners, and made it the first agenda item in every steerco",
      "Triggered VP-level escalation on 3 blockers stuck for 60+ days, using aging data rather than verbal complaints as the basis",
      "Modeled the commercial gap (74% budget used / 51% scope delivered), built the business case, and presented to the client CFO and VP Engineering — $831K change order approved in 10 business days",
      "Stood up a change control process requiring every scope addition to carry a cost estimate, timeline impact, and risk sign-off before any engineer picked it up — 14 additions processed through it",
    ],
    result: "✓ 96% SCOPE DELIVERED · 99.98% BUDGET EXECUTION · $831K EXPANSION APPROVED · ENGAGEMENT RENEWED",
    stack: ["MWAA (Airflow on AWS)", "dbt", "AWS", "Snowflake", "Jira / Confluence"],
    metrics: [
      { label: "TOTAL VALUE", value: "$1.37M" },
      { label: "SCOPE EXPANSION", value: "$831K" },
      { label: "BUDGET EXEC.", value: "99.98%" },
      { label: "SCOPE DELIVERED", value: "96%" },
      { label: "BLOCKERS CLEARED", value: "17" },
    ],
  },
  {
    id: "redshift-databricks",
    number: "002",
    type: "CLOUD MIGRATION",
    title: "Cloud Data Warehouse Migration — EdTech Platform",
    outcome: "Redshift → Databricks Unity Catalog · $669K Fixed-Price · 16-Week M&A Hard Deadline",
    industry: "EDTECH · K-12 & HIGHER EDUCATION",
    year: "2025–26",
    model: "FIXED-PRICE",
    context:
      "$669K fixed-price migration of ~2,300 production data objects from Amazon Redshift to Databricks Unity Catalog. The deadline was 16 weeks, fixed by an M&A transaction cutover date. 11-engineer US-India pod across two time zones. On fixed-price, there's no renegotiation when you go over estimate, so the delivery model had to be built around risk absorption from the start.",
    role:
      "Program Manager — fixed-price delivery ownership, risk governance, delivery model design, and cross-region team management across a US-India pod.",
    challenges: [
      "Hard 16-week deadline set by an M&A cutover — not movable under any circumstance",
      "Standard velocity tracking can't predict whether a specific calendar date will be hit",
      "Cross-timezone team with single points of failure on several critical-path roles",
      "Client compliance team flagged AI-assisted code generation as an audit risk mid-program",
    ],
    actions: [
      "Replaced story-point velocity with a factory model: per-pod weekly throughput targets by object complexity tier, with burndown anchored to week 16 — model flagged a pacing risk in week 5, sprint plan adjusted with 11 weeks of runway still available",
      "Before Sprint 1, mapped every critical-path role by name, built knowledge-transfer plans for 7 highest-risk positions, and ran cross-training across both regions — when 2 engineers left mid-program, no sprint was delayed",
      "Designed a governance framework for AI-assisted development (review checklists, per-sprint productivity tracking, full audit trail) — 30% velocity uplift documented, cleared by compliance review, counted toward delivery pace",
    ],
    result: "✓ M&A CUTOVER DELIVERED ON DATE · ~2,300 OBJECTS MIGRATED · FULL MARGIN PROTECTED",
    stack: ["Databricks", "Amazon Redshift", "Unity Catalog", "Spark SQL", "Azure DevOps"],
    metrics: [
      { label: "CONTRACT", value: "$669K" },
      { label: "OBJECTS", value: "~2,300" },
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
    outcome: "SQL Server → Snowflake · $180.5K Fixed-Price · 189 Regulated Objects · Delivered on Contractual Date",
    industry: "INVESTMENT MANAGEMENT · REGULATED FINANCIAL SERVICES",
    year: "2024",
    model: "FIXED-PRICE",
    context:
      "$180.5K fixed-price migration of 189 regulated reporting objects from SQL Server to Snowflake for an investment management firm. 19-week delivery window with a 3-week year-end regulatory blackout baked into the middle and change-management approval gates on every production deployment. No schedule buffer built into the timeline.",
    role:
      "Program Manager — fixed-price delivery ownership, WBS design, schedule governance, and compliance gate management.",
    challenges: [
      "3-week regulatory blackout mid-program consuming 15% of working time, with no buffer in the overall schedule",
      "Regulated objects had unequal risk weight — standard burndown couldn't distinguish high-complexity from routine objects",
      "Change-management approval gates on every production deployment adding cycle time outside PM control",
    ],
    actions: [
      "Decomposed the WBS into 6 parallel epic tracks with cross-track dependency maps and float at every handoff — 3 tracks stayed active through the blackout on non-production work so the team was never idle",
      "Built a weighted completion model on top of EVM — high-complexity regulated objects weighted differently, flagged a schedule risk 4 weeks before it appeared on any velocity chart — resequenced 11 stories while float still existed",
      "Re-baselined 3 weeks before the blackout: vendor development front-loaded to pre-blackout sprint, client approvals and compliance gates back-loaded to post — 15% working day loss absorbed through float",
    ],
    result: "✓ DELIVERED ON CONTRACTUAL DATE · FULL MARGIN INTACT · CLIENT SIGN-OFF SAME DAY",
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
    outcome: "Hadoop → Snowflake · $600K T&M · Full Programme Baseline Built from Zero in 9 Days",
    industry: "MARTECH / ADTECH · B2B2C DATA PLATFORM",
    year: "2024",
    model: "T&M",
    context:
      "$600K T&M engagement to migrate an identity resolution platform from Hadoop to Snowflake. Handed over with a list of engineer names, an ungroomed Jira board, and a separate data platform program already running on the same account with overlapping infrastructure scope. No Project Execution Plan, no WBS, no RAID log. Sprint 1 was 11 days away.",
    role:
      "Program Manager — built the full program foundation from scratch, managed architecture risk governance, and coordinated dependencies with a parallel program on the same account.",
    challenges: [
      "No delivery structure existed at handover — no WBS, no sprint backlog, no RAID log, no governance cadence",
      "Sprint 1 was 11 days away with nothing ready to run it",
      "A parallel Snowflake program on the same account had already provisioned shared infrastructure that overlapped with this program's scope, creating duplicate build risk across both SOWs",
    ],
    actions: [
      "Built the full program foundation in 9 working days: WBS decomposed to story level, Sprint 1–3 backlogs groomed and sized, 23-item RAID log with named owners, RACI covering 14 stakeholders, governance cadence from daily standup to monthly steerco",
      "Attended every architecture working session and translated each technical decision into a PM risk entry — schedule impact if approach failed, ramp cost if rework needed, rollback complexity for production changes",
      "Mapped infrastructure overlap with the parallel program, set up a fortnightly cross-program working group, and removed 3 duplicate components from this scope — roughly 4 engineering weeks and ~$40K in avoided rework",
    ],
    result: "✓ SPRINT 1 ON PLAN · GREEN STATUS EVERY REVIEW · ~$40K INFRASTRUCTURE REWORK AVOIDED",
    stack: ["Snowflake", "Hadoop", "Apache Spark", "Identity Graph", "Jira / Confluence"],
    metrics: [
      { label: "CONTRACT", value: "$600K" },
      { label: "PEP IN", value: "9 DAYS" },
      { label: "RAID ITEMS", value: "23" },
      { label: "INFRA SAVED", value: "~$40K" },
      { label: "STATUS", value: "GREEN" },
    ],
  },
  {
    id: "snowflake-china",
    number: "005",
    type: "COMPLIANCE DEPLOYMENT",
    title: "PIPL-Compliant Data Platform Deployment — Industrial Manufacturer, China",
    outcome: "Snowflake · China Factory Operations · PIPL Compliance · 3 Time Zones · 6-Week Go-Live",
    industry: "INDUSTRIAL MANUFACTURING · GLOBAL OPERATIONS",
    year: "2024",
    model: "T&M",
    context:
      "T&M deployment of a PIPL-compliant Snowflake platform for a global industrial manufacturer's China factory operations — connecting machine-level production data to plant management reporting. Three delivery teams across three time zones: US executive sponsors, India engineering, China operations. PIPL review gates on every production release. A 2-week Lunar New Year holiday landed inside the 6-week delivery window.",
    role:
      "Program Manager — compliance gate governance, multi-timezone delivery coordination, go-live planning, and async stakeholder management across US, India, and China.",
    challenges: [
      "PIPL compliance review gates on every production release — if unmanaged, these surface at review time and delay deployment",
      "2-week Lunar New Year holiday inside a 6-week window — 33% schedule impact if unplanned",
      "10.5-hour time zone spread between Chicago and Bengaluru creating 24–48 hour lag on any synchronous decision",
    ],
    actions: [
      "Mapped every PIPL checkpoint into the WBS before development started — named owners, estimated cycle times, and documented entry/exit criteria for each gate so blockers were identified 3–4 weeks before they would surface at review",
      "Re-baselined 3 weeks before the Lunar New Year: vendor development front-loaded to pre-holiday, client validation and PIPL approvals back-loaded to post — entered go-live week with nothing unresolved on the critical path",
      "Replaced synchronous steercos with async governance: shared decision register with named owners and deadlines, written briefs replacing meetings, program status always current for any time zone — no missed decisions waiting for a call",
    ],
    result: "✓ LIVE IN 6 WEEKS · PIPL-COMPLIANT · ZERO COMPLIANCE FAILURES · 3-TIMEZONE DELIVERY",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "PIPL Compliance Framework", "Kantata"],
    metrics: [
      { label: "GO-LIVE", value: "6 WEEKS" },
      { label: "TIME ZONES", value: "3" },
      { label: "COMPLIANCE", value: "PIPL" },
      { label: "COMP. FAILURES", value: "ZERO" },
      { label: "REGIONS", value: "US · IN · CN" },
    ],
  },
  {
    id: "managed-de-pod",
    number: "006",
    type: "MANAGED SERVICE",
    title: "Managed Data Engineering Pod — Software Intelligence Company",
    outcome: "Snowflake Medallion Architecture · 12+ Source Systems · UAT Cycle Cut from 11 to 4 Days · Annually Renewed",
    industry: "SOFTWARE INTELLIGENCE · B2B SAAS",
    year: "ONGOING",
    model: "MANAGED",
    context:
      "Ongoing managed data engineering retainer for a B2B SaaS Software Intelligence company — a dedicated pod ingesting 12+ source systems into a Snowflake medallion architecture serving BI and product analytics. At handover: backlog growing 3× faster than capacity, three stakeholders with incompatible priority lists, UAT sign-off averaging 11 days past SLA, and client leadership quietly considering insourcing the function.",
    role:
      "Program Manager — delivery operating model design, stakeholder governance, intake process ownership, and annual renewal management.",
    challenges: [
      "Three business stakeholders with incompatible priority lists — every sprint started with a negotiation, PM was the de facto arbiter of every disagreement",
      "UAT sign-off averaging 11 days past SLA with no visibility into where the delay was sitting",
      "Client leadership considering insourcing at the 12-month renewal mark",
    ],
    actions: [
      "Replaced the sprint negotiation with a weighted intake framework — RICE-style scoring with trade-off matrices visible to all stakeholders — intake decisions went from 2 weeks to 48 hours",
      "Instrumented the full pipeline from intake to production and published a weekly health metric covering UAT aging, approval latency, and blocker age by owner, visible to the client's engineering leadership — UAT cycle dropped from 11 days to 4 within 6 weeks",
      "Built the operating model for renewal: engineering leads ran their own sprint reviews, stakeholder pre-reads sent 48 hours in advance, monthly metrics published to client leadership, decision rights documented to prevent undocumented scope additions",
    ],
    result: "✓ RENEWED WITHOUT RE-BID · UAT CYCLE 11 DAYS → 4 DAYS · INTAKE VELOCITY 3× FASTER",
    stack: ["Snowflake", "dbt", "Airflow", "Sigma BI", "Jira / Confluence"],
    metrics: [
      { label: "SOURCE SYSTEMS", value: "12+" },
      { label: "UAT CYCLE", value: "11→4 DAYS" },
      { label: "INTAKE SPEED", value: "3× FASTER" },
      { label: "RENEWAL", value: "NO RE-BID" },
      { label: "STATUS", value: "EMBEDDED" },
    ],
  },
];
