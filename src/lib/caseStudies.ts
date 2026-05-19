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
    outcome: "MWAA & dbt · $1.37M T&M · $831K Scope Expansion Won · 2-Year Engagement",
    industry: "ENTERPRISE SAAS · MARKETING TECH",
    year: "2024–26",
    model: "T&M",
    context:
      "$1.37M T&M engagement to build a marketing data platform using MWAA (Airflow on AWS) and dbt. By the end of Q1, 17 external approval workstreams — InfoSec reviews, IAM access grants, VPN provisioning — were sitting with no owners, no timelines, and no escalation path. They were consuming around 40% of planned sprint capacity. At that burn rate the program was tracking to exhaust its funding with 40% of scope still undelivered.",
    moves: [
      "I built a live dependency register with aging counters on each item, assigned named client-side owners, and made it the first agenda item in every steerco. Within 8 weeks all 17 were resolved. The last three — stuck for over 60 days each — were cleared through VP-level escalation I triggered with the aging data. Engineering velocity recovered within two sprints.",
      "Six weeks before SOW expiry, my EAC model showed the program had used 74% of budget with only 51% of scope delivered. Scope had grown 23% since kickoff with no change orders raised. I built the commercial case, mapped the growth to the client's own priorities, and presented to their CFO and VP Engineering. The $831K change order was approved in 10 business days.",
      "14 scope additions came through during the engagement without documentation. I set up a change control process requiring every addition to have a cost estimate, timeline impact, and risk sign-off before anyone started on it. All 14 went through it. Final budget execution: 99.98% of SOW target.",
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
      "$669K fixed-price migration of ~2,300 production data objects from Amazon Redshift to Databricks Unity Catalog. The deadline was 16 weeks, fixed by an M&A transaction cutover date. 11-engineer US-India pod across two time zones. On fixed-price, there is no renegotiation — so the delivery model had to account for risk from the start, not react to it later.",
    moves: [
      "I replaced velocity tracking with a factory model: per-pod weekly throughput targets by object complexity tier and a burndown anchored to week 16, not sprint end. The model flagged a pacing risk in week 5, with 11 weeks of runway still available. I adjusted the sprint plan. No engineer had flagged anything yet.",
      "Before Sprint 1, I mapped every critical-path role by name and built knowledge-transfer plans for the 7 highest-risk positions, with cross-training across both regions. When two senior engineers left mid-program, neither change caused a sprint delay.",
      "Partway through, the client's compliance team flagged AI-assisted code generation as an audit risk. I built a governance framework around it — review checklists, per-sprint productivity tracking, full audit trail — and documented a 30% velocity uplift. The risk review cleared it, and the output counted toward delivery pace.",
    ],
    result: "✓ M&A CUTOVER DELIVERED ON DATE · ~2,300 OBJECTS MIGRATED · FULL MARGIN PROTECTED · DUAL-REGION POD STABLE",
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
      "$180.5K fixed-price migration of 189 regulated reporting objects from SQL Server to Snowflake for an investment management firm. 19-week window with a 3-week year-end regulatory blackout in the middle and change-management approval gates on every production deployment. No buffer in the timeline. Every over-budget hour came directly out of margin.",
    moves: [
      "I decomposed the WBS into 6 parallel epic tracks with cross-track dependency maps and float allocations at every handoff. Three tracks stayed active through the blackout on non-production work so the team was never sitting idle waiting on a dependency. Float was maintained for 14 of 19 weeks.",
      "I built a weighted completion model on top of EVM — high-complexity regulated objects were weighted differently from routine ones, so finishing 60% of objects didn't mean 60% of risk was behind us. The model flagged a schedule risk four weeks before it would have shown up on velocity. I resequenced 11 stories across three tracks while there was still float to absorb it.",
      "Three weeks before the blackout I re-baselined: vendor development front-loaded to the pre-blackout sprint, client approvals and compliance gates back-loaded to post. The 15% working day loss was absorbed through float reallocation. Delivery date met, margin intact, client signed off the same day.",
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
      "$600K T&M engagement to migrate an identity resolution platform from Hadoop to Snowflake. I was handed a list of engineer names, an ungroomed Jira board, and a separate data platform program already running on the same client account with overlapping infrastructure scope. No Project Execution Plan, no WBS, no RAID log, no backlog. Sprint 1 was 11 days away.",
    moves: [
      "In 9 working days I built the full program foundation: project phasing, WBS decomposed to story level, Sprint 1–3 backlogs groomed and sized, acceptance criteria for every deliverable, a 23-item RAID log with named owners, a RACI covering 14 stakeholders, and a governance cadence from daily standup to monthly steerco. Sprint 1 started on schedule.",
      "I attended every architecture working session and logged each technical decision as a PM risk — schedule impact if the approach failed, ramp cost if rework was needed, rollback complexity for production changes. Engineering made every technical call. I kept each one documented and defensible before it was implemented.",
      "The parallel Snowflake program on the same account had already provisioned shared infrastructure that overlapped with this program's scope. I mapped the overlap, set up a fortnightly cross-program working group, and removed 3 infrastructure components from this scope — roughly 4 engineering weeks and ~$40K in avoided rework across both engagements.",
    ],
    result: "✓ SPRINT 1 ON PLAN · GREEN STATUS EVERY REVIEW · CROSS-PROGRAMME INFRASTRUCTURE DEDUPED",
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
      "T&M engagement to deploy a PIPL-compliant Snowflake platform for a global industrial manufacturer's China factory operations — connecting machine-level production data to plant management reporting. Three delivery teams across three time zones: US executive sponsors, India engineering, China operations validating and accepting. PIPL review gates on every production release, a 2-week Lunar New Year holiday inside the delivery window, and a 10.5-hour spread between Chicago and Bengaluru.",
    moves: [
      "I mapped every PIPL compliance checkpoint into the WBS before development started — data localisation validation, cross-border transfer documentation, consent framework review, security certification sign-off. Each gate had a named owner, an estimated cycle time, and documented entry/exit criteria. Client-side blockers that typically surface at review time were identified 3–4 weeks in advance.",
      "Two weeks of Lunar New Year inside a 6-week delivery window needed to be planned around. Three weeks before the holiday I re-baselined: vendor development front-loaded to pre-holiday, client validation and PIPL approvals back-loaded to post. We entered go-live week with nothing unresolved on the critical path.",
      "A 10.5-hour time zone gap meant synchronous decision-making would create 24–48 hour lag on any significant issue. I moved to async governance: every pending decision in a shared register with a named owner and deadline, steercos replaced with a written brief readable in under 5 minutes. US, India, and China were all on the same program state without waiting for a meeting.",
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
      "Ongoing managed data engineering retainer for a B2B SaaS Software Intelligence company — a dedicated pod ingesting 12+ source systems into a Snowflake medallion architecture. When I took over: backlog growing 3× faster than capacity, three stakeholders with incompatible priority lists and no shared framework, UAT sign-off averaging 11 days past SLA, and client leadership quietly considering bringing the function in-house.",
    moves: [
      "Every sprint started with a negotiation between three stakeholders about what to build. I replaced that with a weighted intake framework — RICE-style scoring with trade-off matrices visible to everyone. Within two sprints, intake decisions were taking 48 hours instead of 2 weeks. Stakeholders could see why work was sequenced the way it was.",
      "UAT latency wasn't showing up on any standard delivery report — stories were marked dev-complete and then sitting 11 days in client review with no accountability structure. I instrumented the full pipeline and published a weekly health metric covering UAT aging, approval latency, and blocker age by owner — visible to the client's own engineering leadership. Average UAT cycle dropped from 11 days to 4 within 6 weeks.",
      "At the 12-month mark, the engagement was renewed without a re-bid. During the year I had engineering leads run sprint reviews themselves, sent stakeholder pre-reads 48 hours in advance, published monthly metrics to client leadership, and kept decision rights documented so scope additions couldn't slip in undocumented.",
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
