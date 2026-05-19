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
  actions: string[];
  decisions: string[];
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
      "A $1.37M T&M engagement to modernise a marketing data platform for an Enterprise SaaS company using MWAA and dbt on AWS. By Q1 end, 17 unresolved external dependency workstreams were consuming ~40% of sprint capacity, and unchecked scope growth was eroding budget headroom faster than delivery was progressing. At the prevailing burn rate, the program was heading toward funding exhaustion with 40% of contracted scope undelivered.",
    role:
      "Led end-to-end program delivery with full commercial ownership of the $1.37M SOW. Accountable for dependency governance, executive stakeholder engagement at CFO and VP Engineering level, and leading the commercial recovery through an $831K scope expansion.",
    actions: [
      "Established a dependency governance framework with named client-side owners, aging counters, and steerco-level accountability — clearing all 17 blockers within 8 weeks and restoring full engineering velocity",
      "Identified a 23% scope growth exposure via EAC modelling 6 weeks before SOW expiry, built the commercial business case, and led the client executive presentation — $831K change order approved in 10 business days",
      "Instituted formal change control governance requiring cost estimate, timeline impact, and risk sign-off before any scope addition was actioned — processed 14 additions while protecting margin to 99.98% of SOW target",
    ],
    decisions: [
      "Escalating to VP-level on 3 critical blockers (60+ days stalled) before the client team raised it themselves — required data-backed justification and strong executive trust, but unblocked dependencies that had been invisible to leadership",
      "Framing the $831K commercial recovery around the client's own business priorities rather than as a PM-driven renegotiation — the difference between a change order being approved in 10 days versus a drawn-out commercial dispute",
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
      "Led a $669K fixed-price migration of ~2,300 production data objects from Amazon Redshift to Databricks Unity Catalog against an immovable 16-week M&A cutover deadline. An 11-engineer US-India pod operating across two time zones with zero schedule buffer on a hard contractual date. On fixed-price delivery, margin is the only buffer — there is no renegotiation.",
    role:
      "Governed fixed-price delivery end-to-end — delivery model architecture, risk governance, cross-regional team management, and commercial margin protection on an M&A-deadline-constrained program.",
    actions: [
      "Redesigned the delivery model from velocity-based to throughput-based tracking — per-pod weekly targets by object complexity tier anchored to the M&A cutover date, surfacing a pacing risk in Week 5 with 11 weeks of runway remaining",
      "Built knowledge resilience into the team structure before Sprint 1 — critical-path role mapping, knowledge transfer plans for 7 positions, and cross-regional training; when 2 engineers exited mid-program, no sprint was disrupted",
      "Governed AI-assisted development under compliance constraints — designed an audit-ready governance framework with review checklists and per-sprint productivity tracking, securing compliance clearance and documenting a 30% velocity uplift",
    ],
    decisions: [
      "Redesigning the tracking model at program start rather than discovering its limitations at week 10 — required upfront planning investment but eliminated the risk of a deadline miss that standard sprint velocity would never have predicted",
      "Absorbing the 2-engineer departure mid-program rather than escalating to client or requesting timeline relief — enabled by the knowledge transfer infrastructure built in advance, protecting both margin and the client relationship",
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
      "Governed a $180.5K fixed-price migration of 189 regulated reporting objects from SQL Server to Snowflake for an investment management firm operating under financial services change-management regulations. A 19-week window with a 3-week year-end blackout mid-program and compliance approval gates on every production deployment. No schedule buffer — every over-budget hour came directly out of margin.",
    role:
      "Led fixed-price delivery governance — WBS architecture, schedule risk management, compliance gate sequencing, and margin protection against a zero-buffer contractual deadline.",
    actions: [
      "Architected a parallel delivery structure — 6 concurrent epic tracks with float allocations and cross-track dependency mapping, sustaining 3 tracks through the regulatory blackout on non-production work with no idle time",
      "Built a weighted completion model layered on EVM — differentiating high-complexity regulated objects from routine ones, surfacing a schedule risk 4 weeks before it would have appeared on velocity, enabling proactive resequencing while float remained",
      "Orchestrated a pre-blackout re-baselining — front-loading vendor development and back-loading compliance gates, converting the fixed 3-week constraint into a managed schedule event with zero critical-path impact",
    ],
    decisions: [
      "Choosing a weighted EVM model over standard burndown — required upfront calibration effort but delivered early-warning capability that a completion count alone could not provide on a regulation-constrained migration",
      "Proactively re-baselining 3 weeks ahead of the blackout rather than absorbing it within existing plans — required transparent client communication but was the decision that protected both the delivery date and margin",
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
    outcome: "Hadoop → Snowflake · $600K T&M · Full Programme Baseline Established in 9 Days",
    industry: "MARTECH / ADTECH · B2B2C DATA PLATFORM",
    year: "2024",
    model: "T&M",
    context:
      "Assumed program leadership on a $600K T&M Hadoop-to-Snowflake migration with no delivery structure in place — no PEP, no WBS, no RAID log, no sprint backlog. A parallel data platform program on the same account had already provisioned overlapping infrastructure, creating unbudgeted duplicate build risk across both SOWs. Sprint 1 was eleven days away.",
    role:
      "Led program recovery — built the complete delivery framework from scratch, governed architecture risk across both programs, and orchestrated cross-program infrastructure deduplication to protect budget on both engagements.",
    actions: [
      "Established the full program delivery framework in 9 working days — WBS decomposed to story level, Sprint 1–3 backlogs groomed, 23-item RAID log with named owners, 14-stakeholder RACI, and governance cadence from daily standup to monthly steerco",
      "Governed architecture working sessions as a delivery risk exercise — translating each technical decision into schedule impact, ramp cost, and rollback complexity, ensuring every architectural call was commercially defensible before implementation",
      "Orchestrated a cross-program governance forum, mapping infrastructure overlap and eliminating 3 duplicate components — avoiding ~$40K in rework and recovering 4 engineering weeks across both SOWs",
    ],
    decisions: [
      "Investing 9 days in program foundation before authorising any engineering work — the short-term pressure to start delivery immediately would have created far more expensive structural failures mid-sprint",
      "Proactively surfacing the cross-program infrastructure overlap with account leadership rather than allowing both programs to build in parallel — required cross-team coordination and a difficult conversation, but protected budget and client trust on both engagements",
    ],
    result: "✓ SPRINT 1 ON PLAN · GREEN STATUS EVERY STEERCO · ~$40K INFRASTRUCTURE REWORK AVOIDED",
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
      "Governed a T&M deployment of a PIPL-compliant Snowflake platform for a global industrial manufacturer's China factory operations — connecting machine-level production data to plant management reporting. Three delivery teams across US, India, and China time zones. PIPL compliance review gates on every production release, a 2-week Lunar New Year holiday inside a 6-week delivery window, and a 10.5-hour time zone spread creating structural decision latency.",
    role:
      "Led multi-regional program delivery — compliance governance, go-live planning, and async stakeholder operating model design for a 3-timezone, regulation-constrained program with no schedule margin.",
    actions: [
      "Integrated compliance governance into the delivery model before development began — every PIPL checkpoint mapped into the WBS with named owners, cycle time estimates, and entry/exit criteria, converting reactive compliance risk into a managed schedule event",
      "Orchestrated a pre-Lunar New Year re-baselining — front-loading vendor development and back-loading client validation gates, absorbing the 2-week holiday with zero critical-path impact",
      "Designed an async-first stakeholder operating model — shared decision registers with named owners and resolution deadlines replacing synchronous steercos, enabling 3-timezone alignment without decision latency",
    ],
    decisions: [
      "Redesigning the stakeholder model to async-first rather than accepting 24–48 hour decision lag — required executive buy-in to change a familiar governance format, but eliminated a bottleneck that would have accumulated across the full 6-week window",
      "Treating Lunar New Year as a program design constraint to re-baseline around, not a scheduling exception to manage in real-time — the difference between entering go-live week with a clean critical path versus a backlog of unresolved approvals",
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
      "Took ownership of a managed data engineering retainer for a B2B SaaS Software Intelligence company — a dedicated pod ingesting 12+ source systems into a Snowflake medallion architecture. At handover: backlog growing 3× faster than capacity, stakeholder alignment broken across three business owners, UAT sign-off averaging 11 days past SLA, and the 12-month commercial renewal was at risk of a competitive re-bid.",
    role:
      "Led delivery operating model design and account retention — governing intake process, stakeholder alignment, delivery health reporting, and the commercial renewal strategy.",
    actions: [
      "Redesigned the intake governance model — replaced ad-hoc sprint negotiation with a weighted framework (RICE-style with visible trade-off matrices) that reduced intake decision time from 2 weeks to 48 hours and removed the PM as the de facto priority arbiter",
      "Instrumented the full delivery pipeline and launched a weekly health reporting cadence — UAT aging, approval latency, and blocker age by owner visible to client engineering leadership — reducing the average UAT cycle from 11 days to 4 within 6 weeks",
      "Built the account operating model for sustained partnership: engineering leads owning sprint reviews, 48-hour pre-read cadence for stakeholder syncs, monthly metrics published to client leadership, and documented decision rights eliminating undocumented scope additions",
    ],
    decisions: [
      "Making UAT latency data visible to the client's own leadership — required transparency about a process that reflected poorly on the client side, but drove the accountability needed to resolve a delay the delivery team could not fix on their own",
      "Investing PM capacity in building a renewal-oriented operating model rather than focusing exclusively on sprint delivery — the operating model, not delivery metrics alone, was what secured the renewal without re-bid",
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
