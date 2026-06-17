// TPM ship records — what I delivered, what I decided, who I aligned, how I ran it.
// Every field is first-person ownership: scope, sequence, escalation, stakeholder
// strategy, renewal positioning. Not an engineering recap.

export type SourceType = "ERP" | "CRM" | "OPS" | "API" | "MES" | "MARKETING" | "TELEMETRY" | "LAKE" | "WAREHOUSE";
export type ConsumerType = "EXEC" | "OPS" | "PRODUCT" | "ANALYTICS" | "FINANCE" | "MARKETING";
export type OrchestrationType = "client" | "internal" | "vendor" | "exec";

export interface AgentSpec {
  name: string;
  replaces: string;   // The manual workflow it eliminated — the delivery win
  adopters: string;   // Who uses it — the rollout reality
  tools: string[];
  output: string;
  status: "live" | "beta";
}

export interface CaseStudy {
  id: string;
  number: string;
  variant: "data-platform" | "ai-agents";
  type: string;
  model: "T&M" | "FIXED-PRICE" | "MANAGED" | "INTERNAL";
  year: string;
  industry: string;
  domain: string;

  headline: string;
  capability: string;
  scale: { value: string; label: string }[];

  ecosystem: {
    sources: { name: string; type: SourceType }[];
    pipeline: string[];
    platform: string;
    consumers: { name: string; type: ConsumerType }[];
  };

  challenges: { label: string; severity: "high" | "med" | "low" }[];
  journey: { stage: string; title: string; detail: string }[];
  orchestration: { team: string; role: string; type: OrchestrationType }[];
  decisions: { decision: string; tradeoff: string; risk: string; outcome: string }[];
  impact: { value: string; label: string; tone?: "primary" | "ok" | "ai" }[];
  beforeAfter: { before: string[]; after: string[] };

  stack: string[];
  agents?: AgentSpec[];
}

export const caseStudies: CaseStudy[] = [

  // =========================================================================
  // 001 — Redshift → Databricks · PM end-to-end, fixed-price commercial
  // =========================================================================
  {
    id: "redshift-databricks",
    number: "001",
    variant: "data-platform",
    type: "DATA PLATFORM MODERNIZATION",
    model: "FIXED-PRICE",
    year: "2025–26",
    industry: "EdTech",
    domain: "Program · Fixed-Price · US + India Pod",

    headline: "Delivered a Six-Year Redshift Estate to a Governed Databricks Lakehouse — Fixed-Price, Two Regions, Zero Downstream Outages, Skeptical Gatekeeper Signed Off UAT",
    capability: "Owned scope, budget, risk, and stakeholder strategy on a fixed-price migration where phData carried the delivery risk — and closed it with the toughest client stakeholder as a co-owner",

    scale: [
      { value: "2,300+", label: "Objects migrated under my plan" },
      { value: "Fixed-price", label: "phData delivery risk · I owned the burn" },
      { value: "US + India", label: "Two-pod cadence I ran" },
      { value: "12+", label: "Sign-off conversations led" },
      { value: "4 BI teams", label: "Per-tool parity I negotiated" },
      { value: "Zero", label: "Outages at cutover · I owned the runbook" },
    ],

    ecosystem: {
      sources: [
        { name: "Redshift (legacy)", type: "WAREHOUSE" },
        { name: "S3 data lake", type: "LAKE" },
        { name: "Product telemetry", type: "TELEMETRY" },
        { name: "Marketing platforms", type: "MARKETING" },
        { name: "Salesforce", type: "CRM" },
        { name: "Finance systems", type: "ERP" },
      ],
      pipeline: ["Inventory + ownership map", "Stakeholder-led sequencing", "Per-tool parity contracts", "Cutover runbook + rollback"],
      platform: "Databricks Unity Catalog Lakehouse",
      consumers: [
        { name: "Product analytics", type: "PRODUCT" },
        { name: "Marketing", type: "MARKETING" },
        { name: "Content team", type: "ANALYTICS" },
        { name: "Finance reporting", type: "FINANCE" },
        { name: "Executive dashboards", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Fixed-price commercial — every week of stall came out of phData's margin, not the client's", severity: "high" },
      { label: "Senior client data lead — gatekeeper, not sponsor — quietly skeptical of the migration", severity: "high" },
      { label: "Six years of Redshift SQL with one effective owner and no lineage — nobody could tell me what dependencies existed", severity: "high" },
      { label: "Four BI teams expecting per-tool parity sign-off — each with their own definition of the same metric", severity: "med" },
      { label: "US + India two-pod cadence across a 10.5-hour gap requiring async coordination", severity: "med" },
      { label: "Hallway-request scope creep from a friendly sponsor — easy to absorb, expensive to absorb", severity: "med" },
    ],

    journey: [
      { stage: "SCOPE", title: "Owned the inventory, mapped the stakeholders before the sprint plan", detail: "Led the 2,300-object inventory in week 1 — not delegated. Identified who actually owned what, who personally cared about which dashboards, and where the political risk sat. Built the stakeholder map before the dependency graph because that's what was going to drive sequencing." },
      { stage: "SEQUENCE", title: "Sequenced sprints around stakeholder validation, not the dependency graph", detail: "Moved the gatekeeper's marketing objects to sprint 6 so he could validate them with his own hands before cutover. Architect pushed back — said it made the dependency graph harder. I held the line, made the call, owned the consequence. Right call by week 4." },
      { stage: "RUN", title: "Ran weekly cadence with the gatekeeper speaking first, status color honest", detail: "Restructured the client meeting so the data lead spoke before the sponsor — 90 seconds of sponsor airtime, bought a stakeholder. Went yellow twice on client-side access stalls when sponsors wanted green; escalated one to sponsor and account lead at three weeks open." },
      { stage: "CLOSE", title: "Cut over on per-consumer parity contracts; closed clean", detail: "Negotiated parity sign-off with each BI team individually. Owned the cutover runbook, rollback window, and closeout sequence. Routed a hallway-request dashboard through formal change control — captured as a paid change, not absorbed into a fixed-price contract." },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "Executive owner · I ran the weekly", type: "exec" },
      { team: "Client Data Lead", role: "Gatekeeper → co-owner · I rebuilt the relationship", type: "client" },
      { team: "BI Consumer Teams", role: "Per-tool parity sign-off · I sequenced over 8 weeks", type: "client" },
      { team: "phData Architect", role: "Pushed back on my sequencing · I held the line", type: "internal" },
      { team: "US Delivery Lead", role: "Migration engineering · daily standups I chaired", type: "internal" },
      { team: "India Pod", role: "Execution at scale · cross-region cadence I designed", type: "internal" },
      { team: "Account Lead", role: "Escalation channel · I called when stalls crossed 3 wks", type: "internal" },
    ],

    decisions: [
      {
        decision: "I sequenced the gatekeeper's objects last — over the architect's objection",
        tradeoff: "A messier dependency graph vs. an UAT block that would have killed cutover",
        risk: "Architect pushback became sustained, then a credibility cost with the engineering team",
        outcome: "Gatekeeper signed off UAT as co-owner; was saying 'we' by week 4",
      },
      {
        decision: "I went yellow on client-side access stalls when the sponsor wanted green",
        tradeoff: "Sponsor friction now vs. invisible burn on a fixed-price contract later",
        risk: "Yellow status read as PM weakness; could have damaged sponsor confidence",
        outcome: "Three-week access stall escalated and cleared inside a week",
      },
      {
        decision: "I routed the hallway-request dashboard through formal change control",
        tradeoff: "Short-term sponsor goodwill vs. fixed-price contract integrity",
        risk: "Lost some sponsor goodwill in week 9 that took weeks to rebuild",
        outcome: "Captured as a paid change; fixed-price margin held intact for the year",
      },
      {
        decision: "I ran cutover on per-BI-tool parity contracts, not blanket sign-off",
        tradeoff: "More cutover orchestration overhead vs. trusting blanket sign-off",
        risk: "Could have closed on time at the cost of one BI team finding parity gaps in production",
        outcome: "Zero downstream consumer outages at cutover",
      },
      {
        decision: "I restructured the weekly so the data lead spoke first, not the sponsor",
        tradeoff: "Awkward week-1 reaction from a sponsor used to going first vs. building a co-owner",
        risk: "Sponsor reading it as a snub; tone-correct conversation needed",
        outcome: "By week 4 the data lead was saying 'we' instead of 'you'",
      },
    ],

    impact: [
      { value: "On time", label: "Fixed-price program · closed clean", tone: "primary" },
      { value: "On budget", label: "Margin held intact through year", tone: "ok" },
      { value: "Zero", label: "Downstream outages at cutover", tone: "ok" },
      { value: "100%", label: "UAT sign-off including gatekeeper", tone: "ok" },
      { value: "CR raised", label: "Hallway-request scope captured as paid" },
    ],

    beforeAfter: {
      before: [
        "Fixed-price program with delivery risk on phData, sponsor + skeptical gatekeeper, no lineage",
        "Architect-favored dependency-graph sequencing that would have hit a UAT block",
        "Hallway-request scope creep absorbing silently against a fixed-price contract",
        "Four BI teams with conflicting parity expectations and no contract for cutover",
      ],
      after: [
        "Program closed on time, on budget, zero outages, gatekeeper signed off as co-owner",
        "Stakeholder-led sequencing that turned political risk into political alignment",
        "Formal change-request hygiene; hallway scope captured as paid change",
        "Per-tool parity contracts at cutover; every consumer team signed off individually",
      ],
    },

    stack: ["Databricks", "Unity Catalog", "Amazon Redshift", "Azure DevOps", "Jira"],
  },

  // =========================================================================
  // 002 — Marketing Platform · Multi-year retainer · Two renewals earned
  // =========================================================================
  {
    id: "marketing-data-platform",
    number: "002",
    variant: "data-platform",
    type: "MULTI-YEAR RETAINER · 2 RENEWALS",
    model: "T&M",
    year: "2024–26",
    industry: "Enterprise SaaS",
    domain: "Program · Long Retainer · Renewal-Earned",

    headline: "Owned a Multi-Year Marketing Platform Retainer Across Two Renewal Cycles — Through a Sponsor Changeover, a Structural Skeptic, and 100+ Weeks of Cadence Discipline",
    capability: "Carried program-level ownership of a long-retainer engagement: stakeholder strategy, change-request hygiene, sponsor re-onboarding, renewal positioning — and turned solid delivery into two earned renewals",

    scale: [
      { value: "2+ yrs", label: "Continuous program I owned" },
      { value: "×2", label: "Contract renewals I positioned" },
      { value: "100+ wks", label: "Friday status notes I shipped" },
      { value: "1", label: "VP sponsor changeover I absorbed" },
      { value: "Multiple", label: "Paid change requests I captured" },
      { value: "Self-serve", label: "Adoption I drove with marketing ops" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce", type: "CRM" },
        { name: "HubSpot", type: "MARKETING" },
        { name: "Ad platforms", type: "MARKETING" },
        { name: "Attribution tools", type: "API" },
        { name: "Product telemetry", type: "TELEMETRY" },
        { name: "Finance feeds", type: "ERP" },
      ],
      pipeline: ["Cadence I held weekly", "Stakeholder map I maintained", "Change-request hygiene I owned", "Renewal evidence I documented"],
      platform: "Snowflake · the platform I delivered against",
      consumers: [
        { name: "Marketing ops", type: "MARKETING" },
        { name: "RevOps", type: "OPS" },
        { name: "Executive reporting", type: "EXEC" },
        { name: "Attribution analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "Long retainer trust erodes invisibly — by renewal it's terminal, and I had to spot it weekly", severity: "high" },
      { label: "Senior embedded client IC who had decided in week 3 they didn't trust consultants — and stayed that way", severity: "high" },
      { label: "Scope-growth signals embedded in casual conversation; easy to absorb silently against the retainer hours", severity: "high" },
      { label: "VP sponsor changed once over the program — re-onboarding risk right before renewal", severity: "high" },
      { label: "Marketing ops adoption depends on documentation, not just data — that's a PM-led training arc", severity: "med" },
      { label: "Renewal conversations need an audit trail · built one weekly before I needed it", severity: "med" },
    ],

    journey: [
      { stage: "STAND UP", title: "Set the cadence in week 1 — and held it for 100 weeks", detail: "I made the call early that the Friday status note was the program — not a deliverable on it. Same hour, same shape, every week. Boring on purpose. When the renewal conversations came around, the audit trail had already done the persuading." },
      { stage: "RUN", title: "Held weekly cadence, raised every scope-adjacent signal", detail: "Mapped stakeholders the slow way: sponsor needs three lines and a number, PO needs the blocker list, the skeptical IC needed to see I'd read their previous comments. Surfaced two adjacent problem areas the client mentioned in passing as scope-growth signals to the account lead — became formal CRs, not free work." },
      { stage: "TRIAGE", title: "Year 2 — made the hard stakeholder triage call", detail: "Spent two months in year 1 trying to win over the embedded IC. They weren't winnable — structural role conflict, not relationship problem. I should have routed around earlier; I did in year 2 and the engagement got measurably easier. Owned the call and the cost." },
      { stage: "RENEW", title: "Re-onboarded the new VP through the audit trail, closed renewal #2", detail: "When the VP sponsor changed, I re-onboarded the new one through the documented story — not the elevator pitch. Renewal #2 closed without renegotiation because the audit trail handed it to them." },
    ],

    orchestration: [
      { team: "Client VP Sponsor", role: "Exec owner · changed once · I re-onboarded the new one", type: "exec" },
      { team: "Marketing Ops PO", role: "Weekly working session · I owned the relationship", type: "client" },
      { team: "RevOps Lead", role: "Adoption driver · monthly check-in I held", type: "client" },
      { team: "Embedded Client IC", role: "Skeptical · I rerouted around in year 2", type: "client" },
      { team: "phData Architect", role: "Platform calls I sequenced", type: "internal" },
      { team: "Data Eng Pod", role: "Team I shielded · velocity I protected", type: "internal" },
      { team: "Account Lead", role: "Renewal partner · CR raising I drove", type: "internal" },
    ],

    decisions: [
      {
        decision: "I held the same status note, same hour, every Friday — for 100+ weeks",
        tradeoff: "Predictability over polish; consistency over novelty",
        risk: "Note becomes invisible furniture; trust erodes anyway",
        outcome: "Two renewals earned on documented confidence; audit trail did the persuading",
      },
      {
        decision: "Year 2 — I stopped investing in the unwinnable embedded IC",
        tradeoff: "My personal investment vs. team velocity and my credibility with the data eng pod",
        risk: "Engineers seeing me burn energy on the wrong thing eroded my standing with the team",
        outcome: "Velocity recovered inside a quarter; engagement got measurably easier in year 2",
      },
      {
        decision: "I treated every scope-adjacent casual mention as a change-request signal",
        tradeoff: "Short-term sponsor goodwill vs. retainer margin and renewal economics",
        risk: "Reading as a difficult PM; goodwill loss compounding over a 2-year program",
        outcome: "Multiple paid expansions captured; renewal numbers were clean every cycle",
      },
      {
        decision: "I re-onboarded the new VP sponsor with the audit trail, not the elevator pitch",
        tradeoff: "Time investment vs. faster relationship build",
        risk: "Renewal-cycle sponsor turnover ends most retainers; one shot to get this right",
        outcome: "Renewal #2 closed without renegotiation; new sponsor inherited the story",
      },
      {
        decision: "I drove marketing ops adoption as a training arc, not a rollout",
        tradeoff: "Slower self-serve curve vs. data eng staying in the loop forever",
        risk: "Marketing ops abandoning the semantic layer if it felt too engineered",
        outcome: "Marketing ops + RevOps self-serve; data eng freed for net-new modeling",
      },
    ],

    impact: [
      { value: "×2", label: "Contract renewals I positioned", tone: "primary" },
      { value: "100+", label: "Weekly status notes I shipped", tone: "ok" },
      { value: "Clean", label: "Renewal #2 without renegotiation", tone: "ok" },
      { value: "Multiple", label: "Paid CRs I raised over the program" },
      { value: "Self-serve", label: "Adoption I drove with marketing ops" },
    ],

    beforeAfter: {
      before: [
        "Multi-year retainer with sponsor turnover risk, structural-skeptic IC, scope drift exposure",
        "Status notes ad-hoc; renewal conversations starting from zero each cycle",
        "Year 1 — I was investing in a stakeholder relationship that wasn't winnable",
        "Scope-adjacent requests defaulted to free work absorbed into retainer hours",
      ],
      after: [
        "Two renewals earned · sponsor changeover absorbed · audit trail did the persuading",
        "100+ weeks of cadence discipline · renewal conversations had the evidence pre-built",
        "Year 2 — rerouted around the skeptic; recovered velocity inside a quarter",
        "Every scope-adjacent signal raised as CR; multiple paid expansions captured",
      ],
    },

    stack: ["Snowflake", "dbt", "MWAA (Airflow)", "Fivetran", "AWS", "Jira"],
  },

  // =========================================================================
  // 003 — China Snowflake · 6 weeks · 3 timezones · LNY mid-program
  // =========================================================================
  {
    id: "snowflake-china",
    number: "003",
    variant: "data-platform",
    type: "FIXED-WINDOW · CROSS-REGION PROGRAM",
    model: "T&M",
    year: "2024",
    industry: "Industrial Manufacturing",
    domain: "Program · 6 Weeks · Through Lunar New Year",

    headline: "Ran a 6-Week Snowflake Program for China Plant Operations — Across Three Timezones, Through Lunar New Year — and Closed Clean After Owning a Stakeholder Mistake in Week 2",
    capability: "Owned a fixed-window program across US, India, and China — designed the async cadence, made one expensive stakeholder mistake, corrected it the next week, and closed on time with an on-site stakeholder who still trusted me",

    scale: [
      { value: "6 weeks", label: "Fixed window I owned" },
      { value: "3 timezones", label: "US · India · China · cadence I designed" },
      { value: "10.5 hr", label: "Working-window gap I bridged" },
      { value: "LNY", label: "Mid-program holiday I sequenced around" },
      { value: "1 mistake", label: "Wk-2 stakeholder call I owned" },
      { value: "1 recovery", label: "Wk-3 correction I made" },
    ],

    ecosystem: {
      sources: [
        { name: "SAP ECC", type: "ERP" },
        { name: "Oracle R12", type: "ERP" },
        { name: "Factory MES", type: "MES" },
        { name: "WMS", type: "OPS" },
        { name: "Supplier feeds", type: "API" },
      ],
      pipeline: ["Cross-region cadence I designed", "Pre-conversation discipline I enforced", "LNY contingency I sequenced", "Day-1 KT design I led"],
      platform: "Snowflake · what I delivered against",
      consumers: [
        { name: "China factory ops", type: "OPS" },
        { name: "HQ supply chain", type: "OPS" },
        { name: "Regional finance", type: "FINANCE" },
        { name: "China site leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Fixed 6-week window with Lunar New Year three weeks in — non-negotiable, can't slip past", severity: "high" },
      { label: "10.5-hr gap between US delivery lead and China site — 24-hour decision-lag default I had to design out", severity: "high" },
      { label: "China-site PO defers in groups and disagrees in private — wrong cadence design would destroy trust", severity: "high" },
      { label: "Three-language stakeholder spread · no shared collaboration baseline", severity: "med" },
      { label: "HQ supply chain depending on factory visibility for in-flight decisions · failure had downstream cost", severity: "high" },
      { label: "Ongoing-support team inheriting the program at cutover · KT debt risk", severity: "med" },
    ],

    journey: [
      { stage: "SCOPE", title: "Mapped the human dependency graph alongside the technical one", detail: "Week 1: walked the source landscape across SAP and Oracle, but the more important map was the human one — who needed to be heard before what, who defers in groups, who needs a pre-conversation. Read the China-site PO's pattern correctly in scope, didn't use the read in week 2." },
      { stage: "DESIGN", title: "Designed async-first cadence as a delivery decision, not a logistics choice", detail: "Written status at fixed points in each region's day. Shared decision register. Live leadership cadence moved from weekly to fortnightly. The cadence was the architecture across a 10.5-hour gap." },
      { stage: "OWN", title: "Owned a stakeholder mistake in week 2 — corrected it in week 3", detail: "Announced the cadence flip in the live client leadership meeting with the China-site PO hearing it first in front of their leadership. Said the right things, weren't the right things. Did the opposite on the LNY re-baseline in week 3 — 1:1 with the China PO first, then sponsor, then group. Same magnitude of change, fundamentally different reception." },
      { stage: "CLOSE", title: "Sequenced around LNY, closed clean, KT clean from day 1", detail: "Front-loaded vendor work, back-loaded client validation, sequenced the holiday in the schedule from week 3. Designed the data layer for ongoing-support handover from week 1, not at cutover. Closed inside the six-week window with the China-site PO still in the conversation." },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "HQ exec · I held the relationship", type: "exec" },
      { team: "China Site PO", role: "Trust-rebuild stakeholder · the work", type: "client" },
      { team: "China Factory Ops", role: "Primary consumer · I aligned via the site PO", type: "client" },
      { team: "HQ Supply Chain", role: "Strategic consumer · weekly check-in I held", type: "client" },
      { team: "US Delivery Lead", role: "Engineering anchor · cadence I designed with", type: "internal" },
      { team: "India Pod", role: "Execution · async cadence I ran", type: "internal" },
      { team: "Account Lead", role: "Regional cover · escalation channel", type: "internal" },
    ],

    decisions: [
      {
        decision: "I flipped live weekly cadence to async-first written cadence in week 2",
        tradeoff: "Engagement intimacy vs. timezone economics on a 10.5-hour gap",
        risk: "Lost decision rhythm; I made the right call the wrong way and burned trust",
        outcome: "Stopped the 24-hour decision-lag pattern · spent three weeks rebuilding trust I shouldn't have burned",
      },
      {
        decision: "I made the LNY re-baseline a 1:1 conversation with the China PO before any group meeting",
        tradeoff: "Calendar overhead vs. learning from week 2 instead of repeating it",
        risk: "Repeating the week-2 group-announcement mistake on a higher-stakes decision",
        outcome: "Re-baseline became a co-decision, not a fait accompli; trust held through cutover",
      },
      {
        decision: "I sequenced vendor work first, client validation second, around the holiday",
        tradeoff: "Schedule complexity vs. holiday risk on a fixed window",
        risk: "Cutover slipping past Lunar New Year would push outside the 6-week window",
        outcome: "Clean closure inside the window with vendor and client work both complete",
      },
      {
        decision: "I designed for ongoing-support handover from week 1, not at cutover",
        tradeoff: "Slightly heavier weekly build vs. a clean KT story at closure",
        risk: "Support team inheriting a black box that replays our build to operate",
        outcome: "Ongoing support operational from day 1 post-cutover · zero inheritance debt",
      },
    ],

    impact: [
      { value: "6 wks", label: "Closed on time", tone: "primary" },
      { value: "3 TZ", label: "Async cadence I designed held" },
      { value: "Trust", label: "Rebuilt with China site PO", tone: "ok" },
      { value: "LNY", label: "Sequenced without slippage", tone: "ok" },
      { value: "Clean KT", label: "Support team I handed off to" },
    ],

    beforeAfter: {
      before: [
        "Fixed 6-week window across 3 timezones with LNY three weeks in",
        "Default 24-hour decision-lag pattern from live weekly across a 10.5-hour gap",
        "Week-2 mistake: cadence flip announced in the group, not pre-conversed",
        "Risk of ongoing-support team inheriting a black box at cutover",
      ],
      after: [
        "Closed on time, in the window, with the China-site PO still trusting me",
        "Async-first written cadence as a delivery pattern; decision-lag eliminated",
        "Week-3 correction: same magnitude of change, fundamentally different reception",
        "Day-1 KT design; ongoing support operational from cutover with no debt",
      ],
    },

    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Azure DevOps", "Jira"],
  },

  // =========================================================================
  // 004 — Internal AI Agent Platform · AI PM end-to-end ownership
  // =========================================================================
  {
    id: "pmo-ai-agent-platform",
    number: "004",
    variant: "ai-agents",
    type: "INTERNAL AI PROGRAM · SELF-INITIATED",
    model: "INTERNAL",
    year: "2024–25",
    industry: "Professional Services · Data & AI Consulting",
    domain: "Program · Internal AI Product Line",

    headline: "Stood Up an Internal AI Program From Scratch — Identified the Problem, Got Leadership, Security, and Finance Aligned, Shipped Six Agents the Delivery Team Trusts, and Earned phData's Innovation Award",
    capability: "Ran an internal AI program end-to-end: product strategy, governance alignment, adoption strategy, rollout sequencing, and trust-building with finance, security, and the delivery team — six agents in production, recovering senior PM time for account work",

    scale: [
      { value: "6 agents", label: "I shipped to production" },
      { value: "1 month", label: "Team-wide adoption I drove" },
      { value: "~8 hrs/wk", label: "PM time I freed for strategic work" },
      { value: "100%", label: "Stakeholder sign-offs before build" },
      { value: "Innovation Award", label: "Leadership recognition I earned" },
      { value: "Self-initiated", label: "Program I sponsored myself" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce", type: "CRM" },
        { name: "Jira", type: "OPS" },
        { name: "Google Drive", type: "API" },
        { name: "Slack", type: "API" },
        { name: "Time-tracking", type: "API" },
      ],
      pipeline: ["Problem discovery I led", "Governance alignment I drove", "Adoption strategy I designed", "Accuracy reporting I owned"],
      platform: "Internal agent fleet · what I delivered to the team",
      consumers: [
        { name: "Delivery PMs", type: "OPS" },
        { name: "Finance", type: "FINANCE" },
        { name: "Sales engineering", type: "EXEC" },
        { name: "Leadership briefings", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "No mandate, no budget, no sponsor — self-initiated · had to earn buy-in before building", severity: "high" },
      { label: "Live client invoices required finance team trust — they were the gatekeeper, not a customer", severity: "high" },
      { label: "Delivery team won't adopt internal tooling without a defensible accuracy number", severity: "high" },
      { label: "IT + Security needed to sign off on data access before any rollout — sequence matters", severity: "high" },
      { label: "No internal AI delivery pattern at phData — first one would set the standard for everyone", severity: "med" },
      { label: "Cross-team adoption requires a rollout strategy, not a product launch", severity: "med" },
    ],

    journey: [
      { stage: "DISCOVER", title: "Identified the problem before I touched a tool", detail: "Two weeks watching my own month-end by hand with a notepad — not building anything. Separated the work AI could actually do from the work that's judgment. The product roadmap came out of that observation, not a feature list. Without that, I'd have built six things nobody trusted." },
      { stage: "ALIGN", title: "Got leadership, security, finance bought in before the build", detail: "Took the proposal to CTO office for architecture sign-off, IT/Security for data-access review, finance for accuracy threshold negotiation, leadership for innovation budget. Sequencing: governance before build, not after. Without it, the first wrong number would have killed the program." },
      { stage: "SHIP TRUST", title: "Shipped billing first because it was the most measurable, not the most demo-able", detail: "Picked the highest-pain, hardest-to-fake workflow first. Built an accuracy gate before the agent — kept per-run logs from day 1. Surfaced accuracy logs in delivery-team dashboards, not just mine. Made the failure mode visible, not hidden. Adoption followed measurable trust." },
      { stage: "SCALE", title: "Sequenced rollout from billing → five more agents on a documented pattern", detail: "Billing agent team-wide in 1 month. Used that adoption to clear the path for the next five — sprint health, risk scanning, briefings, forecasting, status. Each one had an easier conversation with security and finance than the one before. Codified the pattern other consultants now follow." },
    ],

    orchestration: [
      { team: "phData Leadership", role: "Innovation budget · sponsor I earned", type: "exec" },
      { team: "phData CTO Office", role: "Architecture review · sign-off I got before build", type: "internal" },
      { team: "IT / Security", role: "Data access review · sequenced before rollout", type: "internal" },
      { team: "Finance Team", role: "Accuracy gatekeeper · co-designed the threshold", type: "internal" },
      { team: "Delivery PMs", role: "Primary adopter cohort · usage feedback I ran", type: "internal" },
      { team: "Sales Engineering", role: "Later adopter cohort · second-wave rollout I led", type: "internal" },
      { team: "Me · Sole AI PM", role: "Program owner · build, rollout, evangelism", type: "internal" },
    ],

    decisions: [
      {
        decision: "I aligned CTO office, IT/Security, and finance before the first prompt — not after the first demo",
        tradeoff: "Two weeks of stakeholder work vs. shipping faster and hoping for forgiveness",
        risk: "Building first → first wrong number kills the program before adoption starts",
        outcome: "Day-one compliance posture; security review took weeks, not quarters; finance was a partner",
      },
      {
        decision: "I shipped billing first — most-measurable workflow, not the most demo-able",
        tradeoff: "Glamour and demo-ability vs. defensible trust",
        risk: "Billing fails → program never gets a second look",
        outcome: "Billing team-wide in 1 month · cleared the path for the next five",
      },
      {
        decision: "I surfaced accuracy logs in delivery-team dashboards, not just mine",
        tradeoff: "Public vulnerability of every miss vs. trust I'd earn from being open",
        risk: "Visible failures cap adoption at curiosity instead of production use",
        outcome: "Delivery team treats the fleet as production tooling, not experimental",
      },
      {
        decision: "I sequenced rollout cohort by cohort, not big bang — billing PMs first, then full delivery, then sales eng",
        tradeoff: "Slower visible adoption curve vs. each cohort going well",
        risk: "Big-bang rollout fails at one cohort and stalls everywhere",
        outcome: "Each cohort had an easier conversation than the one before",
      },
      {
        decision: "I documented the build pattern as a phData internal standard — not just my own playbook",
        tradeoff: "Time I could have spent on the next agent vs. team-wide pattern other consultants could use",
        risk: "Pattern feels like an artifact, gets ignored",
        outcome: "Pattern other consultants are now copying for their own builds",
      },
      {
        decision: "I positioned the program to leadership as freeing PM time for account growth — not as cost savings",
        tradeoff: "Slower budget approval vs. a story leadership could actually invest in",
        risk: "Cost-savings framing reads as defensive; growth framing reads as strategic",
        outcome: "Innovation Award · ongoing executive air cover for fleet expansion",
      },
    ],

    impact: [
      { value: "6", label: "Agents in production", tone: "ai" },
      { value: "1 month", label: "Team-wide adoption I drove", tone: "primary" },
      { value: "~8 hrs/wk", label: "PM time recovered for accounts", tone: "ok" },
      { value: "Innovation Award", label: "Leadership recognition", tone: "ai" },
      { value: "Pattern", label: "Other consultants now copy", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Delivery PMs spending 3-4 hrs/program/month on manual admin",
        "No internal AI program at phData · no proof anyone here could ship one",
        "Senior PM capacity locked into admin, not account growth or client work",
        "Finance, IT/Security, leadership skeptical of LLM outputs touching client work",
      ],
      after: [
        "Six production agents · ~8 hrs/wk recovered per PM · Innovation Award",
        "Internal AI program with a documented pattern other consultants now follow",
        "Senior PM time freed for the strategic work account growth actually requires",
        "Finance + IT/Security as partners on the program · not blockers",
      ],
    },

    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Jira MCP"],

    agents: [
      {
        name: "Month-End Billing Reconciler",
        replaces: "3–4 hrs/program/month of manual time-tracking-vs-budget copy-paste",
        adopters: "Every delivery PM, every month-end · finance review queue",
        tools: ["Glean", "Salesforce MCP", "Sheets"],
        output: "Finance-ready discrepancy summary with audit trail",
        status: "live",
      },
      {
        name: "Sprint Health Scorer",
        replaces: "Weekly cross-program sprint review I used to run by hand",
        adopters: "Delivery PMs across active programs · weekly",
        tools: ["Jira MCP", "Slack MCP", "Glean"],
        output: "Ranked sprint scorecard + PM action queue",
        status: "live",
      },
      {
        name: "Project Risk Scanner",
        replaces: "2-hour Friday risk-scan checklist across 4+ active programs",
        adopters: "Delivery PMs + account leads · weekly escalation queue",
        tools: ["Glean", "Jira MCP", "Salesforce MCP"],
        output: "Risk heatmap + escalation queue with owner and timing",
        status: "live",
      },
      {
        name: "Leadership Deck Drafter",
        replaces: "Half-day of exec briefing prep before each leadership review",
        adopters: "Delivery PMs · sales eng · pre-leadership-meeting prep",
        tools: ["Glean", "Google Apps Script"],
        output: "Audience-tuned deck draft with cited data sources",
        status: "live",
      },
      {
        name: "Budget Forecaster",
        replaces: "Manual monthly hours-burn projection against contract budget",
        adopters: "Delivery PMs piloting · finance team review",
        tools: ["Glean", "Salesforce MCP"],
        output: "Monthly forecast + variance flags with owner",
        status: "beta",
      },
      {
        name: "Status Note Composer",
        replaces: "Friday status-note drafting from scratch by every PM",
        adopters: "Delivery PMs piloting · Friday cadence",
        tools: ["Glean", "Jira MCP", "Salesforce MCP"],
        output: "Stakeholder-tuned weekly status with evidence links",
        status: "beta",
      },
    ],
  },
];
