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
      "$1.37M T&M engagement to build a marketing data platform using MWAA (Airflow on AWS) and dbt for an Enterprise SaaS company. From day one the program had an invisible problem: 17 external approval workstreams — InfoSec reviews, IAM access grants, VPN provisioning — sat outside engineering's control with no owners, no timelines, and no escalation path. Averaged across the first quarter, these blockers were consuming 40% of planned sprint capacity. Meanwhile the SOW budget was burning. Without PM intervention, the program would have hit its funding ceiling with over a third of contracted scope still undelivered.",
    moves: [
      "17 open blockers, zero owners, no resolution timelines — I built a live dependency register with aging counters on every item, assigned named client-side owners, and made it the first agenda item in every weekly steerco. Within eight weeks all 17 items were resolved. The final three — stuck for over 60 days each — were unblocked through VP-level client escalation I triggered with data, not complaints. Engineering velocity recovered within two sprints of the last blocker closing.",
      "Six weeks before SOW expiry, my EAC model showed the program had consumed 74% of budget while only 51% of contracted scope was delivered — not due to overruns, but because scope had grown 23% since kickoff with no formal change orders. I built the commercial case, mapped the growth directly to the client's own business priorities, and presented to the client CFO and VP Engineering. The $831K change order was approved in 10 business days. Without that six-week lead time, the delivery team would have had to choose between cutting scope and absorbing the cost — neither was acceptable.",
      "14 scope additions arrived during the engagement undocumented. I stood up a change control framework requiring every addition to carry a cost estimate, timeline impact, and risk assessment before sponsor sign-off. All 14 were processed through it. Margin on the engagement was protected to 99.98% of SOW target — not because we avoided scope growth, but because every addition was paid for and baselined before a single engineer picked it up.",
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
      "$669K fixed-price migration of ~2,300 production data objects from Amazon Redshift to Databricks Unity Catalog for an EdTech platform. The deadline: 16 weeks, set by an M&A transaction cutover date. Non-negotiable, not compressible, not movable. In fixed-price delivery there is no commercial safety net — every hour over estimate comes directly out of margin, and no one calls the client to renegotiate. 11-engineer US-India pod across two time zones. The delivery model had to be designed to absorb risk structurally. Standard agile tracking would not tell you if you were going to hit a hard calendar date 16 weeks out.",
    moves: [
      "Story points don't tell you whether you'll make an M&A cutover date. I replaced velocity tracking with a factory model: per-pod weekly throughput targets based on object complexity tier, UAT acceptance criteria defined around functional parity not story closure, and a burndown anchored to week 16 rather than sprint end. Every Friday the question was not 'did we close stories?' — it was 'are we on pace for the cutover?' The model caught a pacing risk in week 5, before any engineer felt it, and the sprint plan was adjusted with 11 weeks of runway remaining.",
      "Cross-region single points of failure are the silent killer on dual-timezone fixed-price programmes. Before Sprint 1 I mapped every critical path role by name, built knowledge-transfer plans for the 7 highest-risk positions, and ran cross-training across both regions. When two senior engineers exited mid-programme, the pod absorbed both changes without a sprint delay — because the knowledge had been distributed before it was needed.",
      "The client's compliance team flagged AI-assisted code generation as an audit risk midway through the programme. Most teams would have quietly shelved it. I treated it as a delivery variable: designed a governance framework for AI-assisted development with review checklists, per-sprint productivity tracking, and a full audit trail. A 30% velocity uplift was documented and counted toward delivery pace — not hidden — and the client's risk review cleared it without delays or scope cuts.",
    ],
    result: "✓ ON PACE FOR 16-WEEK M&A CUTOVER · DUAL-REGION POD STABLE · FULL MARGIN PROTECTED",
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
      "$180.5K fixed-price migration of 189 regulated reporting objects from SQL Server to Snowflake for an investment management firm operating under financial services change-management regulations. 19-week delivery window with a 3-week year-end regulatory blackout baked into the middle, and change-management approval gates on every production deployment. No schedule buffer. No ability to negotiate the contractual delivery date. Every over-budget hour came directly out of margin — and the client's regulatory calendar was not going to move for a delivery issue.",
    moves: [
      "A flat sequential delivery plan would have serialised work that could run in parallel — and in 19 weeks with a 3-week blackout in the middle, serial dependency chains are schedule killers. I decomposed the WBS into 6 parallel epic tracks with explicit cross-track dependency maps and float allocations at every handoff point. Three tracks stayed active through the blackout period handling non-production work. At no point did the full engineering team sit idle waiting on a dependency to clear. Float was maintained for 14 of 19 weeks.",
      "Standard burndown charts measure completions — they do not tell you whether you will make a contractual date. I built a weighted % complete model layered on top of EVM, treating high-complexity regulated objects differently from routine ones: finishing 60% of objects did not mean 60% of risk was behind us. The model flagged a schedule risk four weeks before it would have appeared on any velocity chart. I resequenced 11 stories across three tracks while float still existed to absorb the change.",
      "The year-end blackout was a fixed constraint — it could not be shortened, moved, or worked around. Three weeks before it began I ran a formal re-baselining: all vendor-owned development front-loaded to the pre-blackout sprint, all client-approval and compliance gates back-loaded to post-blackout. The 15% engineering day loss was absorbed entirely through float reallocation. The contractual delivery date was met, margin was intact, and the client signed off the same day delivery completed.",
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
      "$600K T&M engagement to migrate an identity resolution platform from Hadoop to Snowflake for a B2B2C MarTech company. Handed over with no Project Execution Plan, no WBS, no RAID log, no sprint backlog — just a list of engineer names, a Jira board with ungroomed stories, and a parallel data platform programme already mid-flight on the same client account with overlapping infrastructure scope. Sprint 1 was 11 days away. Technically, a $600K programme existed. In practice, there was no delivery structure at all.",
    moves: [
      "Sprint 1 was 11 days away when I joined with nothing to run it. In 9 working days I built the entire programme foundation: project phasing, full WBS decomposed to story level, Sprint 1–3 backlogs groomed and sized, acceptance criteria for every deliverable, a 23-item RAID log with assigned owners, a RACI covering 14 stakeholders, and a governance cadence from daily standup through monthly steerco. Sprint 1 started on schedule. The team never felt the chaos that preceded it — because by the time they saw the programme, it already had structure.",
      "Every major architecture decision on a T&M programme is a PM risk: the larger and more ambiguous the decision, the harder it is to defend in the next steerco when the client asks why the budget moved. I attended every architecture working session and translated each technical option into a PM risk entry — schedule impact if the approach failed, ramp cost if the implementation needed reworking, rollback complexity if production deployment went wrong. Engineering owned every technical call. I made each one defensible to the client VP before it was implemented.",
      "The parallel Snowflake platform programme on the same account had already provisioned shared infrastructure that directly overlapped with this programme's scope. Without a PM coordinating between them, both programmes would have built duplicate components — wasted budget on both SOWs. I mapped the overlap, stood up a fortnightly cross-programme architecture working group, and eliminated 3 infrastructure components from this scope. Estimated saving: 4 engineering weeks and approximately $40K in avoided rework across both engagements.",
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
      "T&M engagement to deploy a PIPL (Personal Information Protection Law) compliant Snowflake data platform for a global industrial manufacturer's China factory operations — connecting machine-level production data to plant management reporting. Three delivery teams across three time zones: US executive sponsors making decisions, India engineering team building, China operations validating and accepting. PIPL compliance review gates on every production release. A 2-week Lunar New Year holiday landing directly inside the delivery window. No schedule buffer. A 10.5-hour time zone spread between Chicago and Bengaluru.",
    moves: [
      "PIPL compliance gates are not optional and do not move to accommodate engineering timelines. I mapped every compliance checkpoint into the WBS before coding began: data localisation validation, cross-border transfer documentation, consent framework review, security certification sign-off. Each gate had a named owner, an estimated cycle time, and documented entry and exit criteria. Client-side blockers that typically surface at review time were identified 3–4 weeks in advance — early enough to resolve without creating a schedule impact.",
      "Two weeks of Lunar New Year holiday inside a 6-week delivery window is a 33% schedule risk if unmanaged. Three weeks before the holiday I ran a formal re-baselining: all vendor-owned development tasks front-loaded to the pre-holiday sprint, all client validation and PIPL approval gates back-loaded to the post-holiday sprint. The team had a full sprint of productive, unblocked work through the holiday period. We entered go-live week with zero unresolved items on the critical path.",
      "10.5-hour time zone spread between Chicago and Bengaluru meant synchronous decision-making would create 24–48 hour lag on every significant issue. I replaced real-time dependency with structured async governance: every pending decision logged in a shared register with a named owner and a resolution deadline, every steerco replaced by a written brief readable in under 5 minutes, status always current for any time zone. US sponsors, India engineers, and China operations were all on the same programme state — without a single missed decision waiting for a meeting.",
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
      "Ongoing managed data engineering retainer for a B2B SaaS Software Intelligence company — a dedicated pod ingesting 12+ source systems into a Snowflake medallion architecture serving BI reporting and product analytics. When the engagement started: backlog growing 3× faster than capacity, three business stakeholders with incompatible priority lists and no shared framework, UAT sign-off averaging 11 days past SLA, and client leadership privately questioning whether to bring the function in-house. The commercial risk was renewal. The operational risk was a team being seen as a vendor, not a partner.",
    moves: [
      "Three stakeholders, three priority lists, zero shared language, one pod. Every sprint began with a negotiation about what to build and the PM was the de facto arbiter of every disagreement — which meant nothing was truly prioritised, everyone was partially unhappy, and the team was context-switching constantly. I replaced the negotiation with a weighted intake framework: RICE-style scoring with transparent trade-off matrices visible to all stakeholders. Within two sprints, intake decisions took 48 hours instead of 2 weeks. The PM was no longer the bottleneck. Stakeholders could see exactly why work was sequenced the way it was.",
      "UAT latency was invisible on any standard delivery report — stories were being marked 'dev complete' and then sitting an average of 11 days in client-side review with no accountability structure around the process. I instrumented the full delivery pipeline from intake to production release and published a weekly health metric covering UAT aging, approval latency, and blocker age by owner — visible to the client's own engineering leadership. Within 6 weeks the average UAT cycle dropped from 11 days to 4. Not because of better testing, but because the data was visible to people with authority to act on it.",
      "At the 12-month renewal conversation the client had a choice: re-bid the work or renew. I had spent the year building the operating model that would make the answer obvious. Engineering sprint reviews owned and presented by engineering leads — not the PM. Business stakeholder syncs run by PM with pre-read materials sent 48 hours in advance. Monthly metrics published to client leadership covering throughput, UAT health, and backlog burn. Decision rights documented and respected — no scope creep, no unilateral additions. The engagement was renewed without a re-bid. The client's Head of Engineering described the pod as a 'trusted internal team' — the exact outcome the operating model was designed to produce.",
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
