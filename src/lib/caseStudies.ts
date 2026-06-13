export interface CaseStudy {
  id: string;
  number: string;
  type: string;
  title: string;
  outcome: string;
  industry: string;
  year: string;
  model: "T&M" | "FIXED-PRICE" | "MANAGED" | "INTERNAL";
  entry: {
    mode: "kickoff" | "assigned" | "inherited" | "built";
    narrative: string;
  };
  spotlight: "decisions" | "metrics" | "timeline" | "scale" | "stakeholder";
  timeline?: { label: string; detail: string }[];
  headlineMetrics?: [number, number];
  context: string;
  role: string;
  actions: string[];
  decisions: string[];
  result: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  learnings: {
    worked: string;
    differently: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "marketing-data-platform",
    number: "001",
    type: "PLATFORM BUILD",
    title: "Turning Dependency Gridlock Into a Funded Scope Expansion",
    outcome: "MWAA & dbt · $1.37M T&M · $831K Scope Expansion · 2-Year Engagement",
    industry: "ENTERPRISE SAAS · MARKETING TECH",
    year: "2024–26",
    model: "T&M",
    entry: {
      mode: "kickoff",
      narrative:
        "Staffed as PM when the $1.37M SOW was signed — the delivery plan and team were already in motion. By the end of Q1, 17 unresolved external dependencies and unchecked scope growth were the first signs that the plan I'd inherited needed a governance layer it didn't have.",
    },
    spotlight: "decisions",
    context:
      "By Q1 end, 17 unresolved external dependency workstreams were consuming ~40% of sprint capacity, and unchecked scope growth was eroding budget headroom faster than delivery was progressing. At the prevailing burn rate, the program was heading toward funding exhaustion with 40% of contracted scope undelivered.",
    role:
      "Led end-to-end program delivery with full commercial ownership of the $1.37M SOW. Accountable for dependency governance, executive stakeholder engagement at CFO and VP Engineering level, and leading the commercial recovery through an $831K scope expansion.",
    actions: [
      "Established a dependency governance framework with named client-side owners, aging counters, and steerco-level accountability — clearing all 17 blockers within 8 weeks and restoring full engineering velocity",
      "Identified a 23% scope growth exposure via EAC modelling 6 weeks before SOW expiry, built the commercial business case, and led the client executive presentation — $831K change order approved in 10 business days",
      "Instituted formal change control governance requiring cost estimate, timeline impact, and risk sign-off before any scope addition was actioned — processed 14 additions while protecting margin to 99.98% of SOW target",
    ],
    decisions: [
      "Escalating to VP-level on 3 blockers stalled 60+ days before the client team raised them — required hard data on aging and days-to-deadline to make the case, and a willingness to create short-term discomfort in the relationship. All 3 were resolved in the same meeting.",
      "Framing the $831K change order as a scope expansion the client needed, not a budget problem the vendor had — required structuring the commercial case around their business priorities, not our exposure",
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
    learnings: {
      worked:
        "Building the dependency governance framework with named owners and aging counters first — having hard data on aging gave the leverage that informal escalations on 3 stalled blockers hadn't.",
      differently:
        "Stand up the dependency aging tracker from day one of the program rather than after Q1 — by the time it existed, 17 items had already accumulated 60+ days of staleness that then took 8 weeks to clear.",
    },
  },
  {
    id: "redshift-databricks",
    number: "002",
    type: "CLOUD MIGRATION",
    title: "Migrating to Databricks Against an Immovable M&A Deadline",
    outcome: "Redshift → Databricks Unity Catalog · $669K Fixed-Price · 16-Week M&A Hard Deadline",
    industry: "EDTECH · K-12 & HIGHER EDUCATION",
    year: "2025–26",
    model: "FIXED-PRICE",
    entry: {
      mode: "kickoff",
      narrative:
        "Brought on as PM at signature of the $669K fixed-price SOW, with a 16-week M&A cutover deadline already locked in and an 11-engineer US-India pod still to be stood up and structured from scratch.",
    },
    spotlight: "timeline",
    timeline: [
      { label: "WEEK 1", detail: "Redesigned the tracking model — throughput-based, anchored to the M&A cutover date" },
      { label: "WEEK 5", detail: "Pacing risk surfaced with 11 weeks of runway remaining" },
      { label: "WEEK 16", detail: "M&A cutover delivered on date, full margin protected" },
    ],
    context:
      "A $669K fixed-price migration of ~2,300 production data objects from Amazon Redshift to Databricks Unity Catalog against an immovable cutover deadline. Two time zones, zero schedule buffer.",
    role:
      "Governed fixed-price delivery end-to-end — delivery model architecture, risk governance, cross-regional team management, and commercial margin protection on an M&A-deadline-constrained program.",
    actions: [
      "Redesigned the delivery model from velocity-based to throughput-based tracking — per-pod weekly targets by object complexity tier anchored to the M&A cutover date, surfacing a pacing risk in Week 5 with 11 weeks of runway remaining",
      "Built knowledge resilience into the team structure before Sprint 1 — critical-path role mapping, knowledge transfer plans for 7 positions, and cross-regional training; when 2 engineers exited mid-program, no sprint was disrupted",
      "Governed AI-assisted development (GitHub Copilot) under client compliance constraints — per-sprint code review checklists, output audit trails, and productivity tracking. Secured compliance sign-off and documented a 30% story-point velocity uplift across the migration sprints",
    ],
    decisions: [
      "Redesigning the tracking model at program start rather than discovering its limitations at week 10 — required upfront investment and a conversation with engineering leads who were used to velocity-based tracking",
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
    learnings: {
      worked:
        "Redesigning the tracking model to throughput-based before Sprint 1 — it surfaced the Week 5 pacing risk with 11 weeks of runway remaining, early enough to course-correct without touching the M&A cutover date.",
      differently:
        "Build knowledge-transfer plans for all 11 roles at kickoff, not just the 7 flagged as critical-path — the 2 engineers who exited mid-program weren't on that original list, and only existing KT infrastructure absorbed the gap without disrupting a sprint.",
    },
  },
  {
    id: "sql-server-snowflake",
    number: "003",
    type: "DATA MIGRATION",
    title: "Migrating Regulated Reporting Around a Compliance Blackout",
    outcome: "SQL Server → Snowflake · $180.5K Fixed-Price · 189 Regulated Objects · Delivered on Contractual Date",
    industry: "INVESTMENT MANAGEMENT · REGULATED FINANCIAL SERVICES",
    year: "2024",
    model: "FIXED-PRICE",
    entry: {
      mode: "kickoff",
      narrative:
        "Assigned as PM when this $180.5K fixed-price SOW was signed, with the 19-week regulated migration window and compliance gate structure already set by the client's change-management calendar — including a 3-week year-end blackout I'd have to plan around from day one.",
    },
    spotlight: "metrics",
    context:
      "A $180.5K fixed-price migration of 189 regulated reporting objects from SQL Server to Snowflake for an investment management firm operating under financial services change-management regulations. Compliance approval gates on every production deployment, zero schedule buffer.",
    role:
      "Led fixed-price delivery governance — WBS architecture, schedule risk management, compliance gate sequencing, and margin protection against a zero-buffer contractual deadline.",
    actions: [
      "Architected a parallel delivery structure — 6 concurrent epic tracks with float allocations and cross-track dependency mapping, sustaining 3 tracks through the regulatory blackout on non-production work with no idle time",
      "Built a weighted completion model layered on EVM — differentiating high-complexity regulated objects from routine ones, surfacing a schedule risk 4 weeks before it would have appeared on velocity, enabling proactive resequencing while float remained",
      "Orchestrated a pre-blackout re-baselining 3 weeks in advance — front-loading vendor development, back-loading compliance gates, and entering the blackout with no open critical-path dependencies",
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
    learnings: {
      worked:
        "Re-baselining 3 weeks ahead of the blackout — front-loading vendor development and back-loading compliance gates — meant the team entered the blackout with no open critical-path dependencies.",
      differently:
        "Introduce the weighted EVM model at kickoff instead of partway through — a plain completion-count view wouldn't have surfaced the schedule risk 4 weeks early, and earlier visibility would have created even more room to re-sequence around the blackout.",
    },
  },
  {
    id: "identity-resolution",
    number: "004",
    type: "PLATFORM MIGRATION",
    title: "Standing Up a Delivery Framework From Zero, Fast",
    outcome: "Hadoop → Snowflake · $600K T&M · Full Programme Baseline Established in 9 Days",
    industry: "MARTECH / ADTECH · B2B2C DATA PLATFORM",
    year: "2024",
    model: "T&M",
    entry: {
      mode: "assigned",
      narrative:
        "Assumed program leadership on this $600K T&M migration with no delivery structure in place — no PEP, no WBS, no RAID log, no sprint backlog — and Sprint 1 eleven days away.",
    },
    spotlight: "timeline",
    timeline: [
      { label: "DAY 0", detail: "Assigned — no PEP, no WBS, no RAID log, Sprint 1 eleven days out" },
      { label: "DAY 9", detail: "Full delivery framework built — WBS, backlogs, RAID, RACI, governance cadence" },
      { label: "SPRINT 1", detail: "Delivered on plan — green status at every steerco" },
    ],
    context:
      "A parallel data platform program on the same account had already provisioned overlapping infrastructure, creating unbudgeted duplicate build risk across both SOWs.",
    role:
      "Led program recovery — built the complete delivery framework from scratch, governed architecture risk across both programs, and orchestrated cross-program infrastructure deduplication to protect budget on both engagements.",
    actions: [
      "Established the full program delivery framework in 9 working days — WBS decomposed to story level, Sprint 1–3 backlogs groomed, 23-item RAID log with named owners, 14-stakeholder RACI, and governance cadence from daily standup to monthly steerco",
      "Governed architecture working sessions as a delivery risk exercise — translating each technical decision into schedule impact, ramp cost, and rollback complexity, ensuring every architectural call was commercially defensible before implementation",
      "Orchestrated a cross-program governance forum, mapping infrastructure overlap and eliminating 3 duplicate components — avoiding ~$40K in rework and recovering 4 engineering weeks across both SOWs",
    ],
    decisions: [
      "Investing 9 days in program foundation before authorising any engineering work — there was pressure to start development on day one, and holding that line required strong account-level buy-in",
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
    learnings: {
      worked:
        "Holding the line on 9 days of foundation-building before authorising engineering work — despite pressure to start day one, it meant Sprint 1 landed on plan with a 23-item RAID log and full RACI already in place.",
      differently:
        "Surface cross-program infrastructure overlaps in week 1 as a standing check, not just when architecture sessions happen to reveal them — the ~$40K avoided and 4 engineering weeks recovered here suggest earlier visibility compounds further on accounts running multiple parallel programs.",
    },
  },
  {
    id: "snowflake-china",
    number: "005",
    type: "COMPLIANCE DEPLOYMENT",
    title: "Going Live Across Three Time Zones Under PIPL Compliance Gates",
    outcome: "Snowflake · China Factory Operations · PIPL Compliance · 3 Time Zones · 6-Week Go-Live",
    industry: "INDUSTRIAL MANUFACTURING · GLOBAL OPERATIONS",
    year: "2024",
    model: "T&M",
    entry: {
      mode: "kickoff",
      narrative:
        "Assigned as PM at SOW signature for this T&M Snowflake deployment — a 6-week go-live window, PIPL compliance gates, and a 3-timezone US/India/China delivery team were already defined before delivery planning began.",
    },
    spotlight: "scale",
    context:
      "A Snowflake platform for a global industrial manufacturer's China factory operations — connecting machine-level production data to plant management reporting. PIPL compliance review gates on every production release, a 2-week Lunar New Year holiday inside the 6-week window, and a 10.5-hour time zone spread creating structural decision latency.",
    role:
      "Led multi-regional program delivery — compliance governance, go-live planning, and async stakeholder operating model design for a 3-timezone, regulation-constrained program with no schedule margin.",
    actions: [
      "Integrated compliance governance into the delivery model before development began — every PIPL checkpoint mapped into the WBS with named owners, cycle time estimates, and entry/exit criteria, so no production release reached a compliance gate unprepared",
      "Orchestrated a pre-Lunar New Year re-baselining — front-loading vendor development and back-loading client validation gates, absorbing the 2-week holiday with zero critical-path impact",
      "Designed an async-first stakeholder operating model — shared decision registers with named owners and resolution deadlines replacing synchronous steercos, enabling 3-timezone alignment without decision latency",
    ],
    decisions: [
      "Redesigning the stakeholder model to async-first rather than accepting 24–48 hour decision lag — required executive buy-in to change a familiar governance format, but eliminated a bottleneck that would have accumulated across the full 6-week window",
      "Treating Lunar New Year as a program design constraint to re-baseline around, not a scheduling exception to absorb in real-time — that decision was made in week 1, when there was still time to restructure the schedule",
    ],
    result: "✓ LIVE IN 6 WEEKS · PIPL-COMPLIANT · ZERO COMPLIANCE FAILURES · 3-TIMEZONE DELIVERY",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Kantata", "MS Project"],
    metrics: [
      { label: "GO-LIVE", value: "6 WEEKS" },
      { label: "TIME ZONES", value: "3" },
      { label: "COMPLIANCE", value: "PIPL" },
      { label: "COMP. FAILURES", value: "ZERO" },
      { label: "REGIONS", value: "US · IN · CN" },
    ],
    learnings: {
      worked:
        "Redesigning the stakeholder model to async-first with decision registers in week 1 — it eliminated the 24–48 hour decision lag before it could accumulate across the 6-week window.",
      differently:
        "Map PIPL checkpoints into the WBS during SOW negotiation rather than at kickoff — locking in compliance cycle times before the schedule is finalised would have created extra runway around the Lunar New Year holiday baked into this 6-week window.",
    },
  },
  {
    id: "pmo-ai-agent-platform",
    number: "007",
    type: "AI AUTOMATION",
    title: "Building an AI Agent Platform Nobody Asked For",
    outcome: "Glean + Claude + n8n · 6 Agents in Production · ~8hrs/week Recovered · phData Innovation Award",
    industry: "PROFESSIONAL SERVICES · DATA & AI CONSULTING",
    year: "2024–25",
    model: "INTERNAL",
    entry: {
      mode: "built",
      narrative:
        "Self-initiated. No one assigned this — I identified that ~8 hours per week of PM time across active programs was going into billing reconciliation, status reporting, steerco deck drafting, and sprint health scoring, then designed and built the platform to recover it.",
    },
    spotlight: "metrics",
    context:
      "A PMO AI agent platform for the phData delivery organisation — 6 agents running on Glean Agent Builder, Claude, n8n, and Google Apps Script, covering billing reconciliation, status report generation, steerco deck drafting, and sprint health scoring.",
    role:
      "Sole designer and builder of the agent platform. Identified the automation candidates, built and tested each agent, governed the PMO-wide deployment, and owned the ongoing iteration.",
    actions: [
      "Built the Billing Compliance Agent to automate end-of-month invoicing reconciliation — deployed PMO-wide within 1 month, achieving >95% accuracy and recovering 60% of the time previously spent on billing compliance per program",
      "Built the Velocity & Blocker Tracker to ingest sprint CSV data and output a ranked scorecard with PM action items — a 20–30 minute manual review per program replaced with a 2-minute automated output",
      "Built the Project Health Scanner — runs a full health check across 4+ active programs simultaneously, surfacing RAG status and escalation candidates in the time the manual checklist took for one",
      "Built the Steerco Comms Engine — drafts a steerco deck from program data inputs in under 20 minutes, with separate tone variants for CFO and VP Engineering audiences, replacing 2–3 hours of manual preparation per steerco",
    ],
    decisions: [
      "Building on Glean Agent Builder rather than the Claude API directly — Glean was already the PMO's knowledge and search layer; native integration meant agents could draw on live program data, Salesforce, and Google Drive without a separate integration build",
      "Sequencing with the Billing Compliance Agent first — highest PM pain, most measurable accuracy, fastest to validate. Getting the first agent to PMO-wide deployment in 1 month established credibility for the remaining builds",
    ],
    result: "✓ 6 AGENTS IN PRODUCTION · ~8HRS/WEEK RECOVERED · 60% BILLING TIME SAVED · phData INNOVATION AWARD",
    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Salesforce MCP", "Slack MCP"],
    metrics: [
      { label: "AGENTS BUILT", value: "6" },
      { label: "TIME RECOVERED", value: "~8 HRS/WK" },
      { label: "BILLING SAVED", value: "60%" },
      { label: "ACCURACY", value: ">95%" },
      { label: "DEPLOYMENT", value: "1 MONTH" },
    ],
    learnings: {
      worked:
        "Sequencing the Billing Compliance Agent first — highest PM pain, most measurable accuracy — built the credibility from a 1-month PMO-wide deployment and >95% accuracy that made the next 5 agents an easier sell.",
      differently:
        "Build the Velocity & Blocker Tracker and Project Health Scanner against a shared program-data layer from the start instead of sequentially — both ingest similar sprint and program data, and a shared foundation built once would have sped up both.",
    },
  },
  {
    id: "managed-de-pod",
    number: "006",
    type: "MANAGED SERVICE",
    title: "Redesigning Intake Governance Ahead of a Renewal at Risk",
    outcome: "Snowflake Medallion Architecture · 12+ Source Systems · UAT Cycle Cut from 11 to 4 Days · Annually Renewed",
    industry: "SOFTWARE INTELLIGENCE · B2B SAAS",
    year: "ONGOING",
    model: "MANAGED",
    entry: {
      mode: "inherited",
      narrative:
        "Took ownership of this managed retainer mid-stream, at handover. Backlog growing 3× faster than capacity, stakeholder alignment broken across three business owners, UAT sign-off averaging 11 days past SLA, and the 12-month renewal at risk of a competitive re-bid.",
    },
    spotlight: "stakeholder",
    headlineMetrics: [1, 3],
    context:
      "A managed data engineering retainer for a B2B SaaS Software Intelligence company — a dedicated pod ingesting 12+ source systems into a Snowflake medallion architecture.",
    role:
      "Led delivery operating model design and account retention — governing intake process, stakeholder alignment, delivery health reporting, and the commercial renewal strategy.",
    actions: [
      "Redesigned the intake governance model — replaced ad-hoc sprint negotiation with a weighted framework (RICE-style with visible trade-off matrices) that reduced intake decision time from 2 weeks to 48 hours and removed the PM as the de facto priority arbiter",
      "Instrumented the full delivery pipeline and launched a weekly health reporting cadence — UAT aging, approval latency, and blocker age by owner visible to client engineering leadership — reducing the average UAT cycle from 11 days to 4 within 6 weeks",
      "Built the account operating model with the renewal in mind: engineering leads owning sprint reviews, 48-hour pre-read cadence for stakeholder syncs, monthly metrics to client leadership, and a formal decision rights document that stopped undocumented scope additions",
    ],
    decisions: [
      "Making UAT latency data visible to the client's own leadership — required transparency about a process that reflected poorly on the client side, but drove the accountability needed to resolve a delay the delivery team could not fix on their own",
      "Investing PM capacity in building the renewal operating model rather than focusing exclusively on sprint delivery — the renewal conversation started 4 months early, and the operating model was the evidence that made it straightforward",
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
    learnings: {
      worked:
        "Making UAT aging visible to the client's own leadership through a weekly health reporting cadence — it cut the cycle from 11 days to 4 within 6 weeks and built the trust that carried into the renewal conversation.",
      differently:
        "Put the renewal-focused operating model — decision rights doc, engineering leads owning sprint reviews — in place from day one of the retainer rather than waiting for handover; it took until 4 months before renewal to build, and an embedded retainer benefits from that structure from the start.",
    },
  },
];
