// Strategic case studies — written from the perspective of a Senior Technical PM
// for Data & AI initiatives. Every field carries program-level judgment, not
// task lists. Case 004 specifically reflects AI PM craft: agent product
// strategy, evaluation framework, trust engineering, fleet architecture.

export type SourceType = "ERP" | "CRM" | "OPS" | "API" | "MES" | "MARKETING" | "TELEMETRY" | "LAKE" | "WAREHOUSE";
export type ConsumerType = "EXEC" | "OPS" | "PRODUCT" | "ANALYTICS" | "FINANCE" | "MARKETING";
export type OrchestrationType = "client" | "internal" | "vendor" | "exec";

export interface AgentSpec {
  name: string;
  intent: string;
  reasoning: string;
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
  // 001 — Redshift → Databricks · Strategic Lakehouse Modernization
  // =========================================================================
  {
    id: "redshift-databricks",
    number: "001",
    variant: "data-platform",
    type: "DATA PLATFORM MODERNIZATION",
    model: "FIXED-PRICE",
    year: "2025–26",
    industry: "EdTech",
    domain: "Learner Analytics · Lakehouse Modernization",

    headline: "Global EdTech Modernizes a Six-Year Redshift Estate to a Governed Databricks Lakehouse — Without a Single Downstream Outage",
    capability: "A Unity Catalog–governed lakehouse that re-establishes analytics trust across product, marketing, and finance — and positions the platform for downstream ML and GenAI workloads",

    scale: [
      { value: "2,300+", label: "Data objects migrated" },
      { value: "Fixed-price", label: "Delivery risk on phData" },
      { value: "US + India", label: "Two-pod orchestration" },
      { value: "12+", label: "Upstream source feeds" },
      { value: "4 BI tools", label: "Downstream parity contracts" },
      { value: "Zero", label: "Production outages at cutover" },
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
      pipeline: ["Object + lineage inventory", "Unity Catalog tier design", "Migration in resilience-first order", "Per-consumer parity contracts"],
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
      { label: "Six years of organically grown Redshift SQL — no lineage, one owner", severity: "high" },
      { label: "Senior client data lead — gatekeeper, not sponsor — quietly skeptical of the migration", severity: "high" },
      { label: "Fixed-price commercial: phData carries the delivery risk, not the client", severity: "high" },
      { label: "Production / dev / sandbox objects entangled in a single estate", severity: "high" },
      { label: "Four BI tools, four different definitions of the same metric", severity: "med" },
      { label: "Unity Catalog governance had to be designed before sprints could be sequenced", severity: "med" },
      { label: "Downstream ML & GenAI roadmap blocked until lakehouse foundation in place", severity: "med" },
    ],

    journey: [
      { stage: "DISCOVER", title: "Inventory the estate · surface the political map", detail: "Led the 2,300-object inventory and lineage capture. Mapped object ownership and personal authorship. Identified which dashboards each consumer actually relied on. The political map turned out to be the program risk, not the technical one." },
      { stage: "ARCHITECT", title: "Design Unity Catalog as the governance spine, not a metadata layer", detail: "Worked the architect through tiered prod / curated / sandbox separation, audit-trail enforcement, and role-based access patterns before sequencing any migration sprint. Governance was a Week-2 program decision, not a post-cutover cleanup." },
      { stage: "EXECUTE", title: "Sequence migration around stakeholder validation, not the dependency graph", detail: "Moved the gatekeeper's marketing objects to sprint 6 so he could validate dashboards he personally cared about with his own hands. Held the line on dependency-graph pushback from the architect — the political risk outweighed the technical cost." },
      { stage: "GOVERN", title: "Cut over on per-consumer parity contracts, not blanket sign-off", detail: "Single rollback window. Signed parity contracts per BI tool. Audit trail in Unity Catalog live from day one. UAT closure ran as a documented sequence, not a meeting." },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "Executive owner · fixed-price counterparty", type: "exec" },
      { team: "Client Data Lead", role: "Gatekeeper · co-owner by week 4", type: "client" },
      { team: "BI Consumer Teams", role: "Per-tool parity sign-off", type: "client" },
      { team: "phData Architect", role: "Lakehouse + Unity Catalog design", type: "internal" },
      { team: "US Delivery Lead", role: "Migration engineering anchor", type: "internal" },
      { team: "India Pod", role: "Migration execution at scale", type: "internal" },
      { team: "Account Lead", role: "Commercial cover · escalation channel", type: "internal" },
    ],

    decisions: [
      {
        decision: "Sequence the gatekeeper's objects last — accept dependency-graph friction",
        tradeoff: "Cleaner technical convergence vs. stakeholder co-ownership at UAT",
        risk: "Late-program political stall is worse than a technical stall",
        outcome: "Gatekeeper signed off UAT as co-owner; was saying 'we' by week 4",
      },
      {
        decision: "Design Unity Catalog tiers before sequencing any migration sprint",
        tradeoff: "Two-week architecture investment vs. faster perceived velocity",
        risk: "Migrating into an ungoverned target is paying for the same work twice",
        outcome: "Governance baseline live at cutover — not retrofitted six months later",
      },
      {
        decision: "Hold status color honest — go yellow on client-side access stalls",
        tradeoff: "Sponsor friction vs. fixed-price margin protection",
        risk: "Burn absorbed silently on fixed-price is invisible until terminal",
        outcome: "Three-week stall escalated and cleared by sponsor inside a week",
      },
      {
        decision: "Route the hallway-request dashboard through formal change control",
        tradeoff: "Short-term client goodwill vs. fixed-price contract integrity",
        risk: "Scope absorbed silently erodes margin and renewal economics",
        outcome: "Captured as a paid change; fixed-price margin held intact",
      },
      {
        decision: "Cut over on per-BI-tool parity contracts, not blanket sign-off",
        tradeoff: "Cutover orchestration complexity vs. downstream trust",
        risk: "Blanket sign-off masks per-consumer parity gaps until production",
        outcome: "Zero downstream consumer outages at cutover",
      },
    ],

    impact: [
      { value: "2,300", label: "Objects migrated with parity", tone: "primary" },
      { value: "Zero", label: "Production outages at cutover", tone: "ok" },
      { value: "100%", label: "UAT sign-off including gatekeeper", tone: "ok" },
      { value: "Unity Catalog", label: "Governance baseline established" },
      { value: "ML-ready", label: "Lakehouse foundation in place", tone: "primary" },
    ],

    beforeAfter: {
      before: [
        "Six-year-old Redshift estate with no lineage and one effective owner",
        "Production / dev / sandbox objects entangled in a single workspace",
        "Same metric, four different definitions across the BI tools",
        "Single-owner access decisions throttling analytics velocity",
        "No governance scaffolding to support an ML / GenAI roadmap",
      ],
      after: [
        "Databricks Unity Catalog lakehouse with tiered, audit-trailed governance",
        "Production / curated / sandbox cleanly separated under one catalog",
        "Per-BI-tool parity contracts signed off at cutover",
        "Multi-owner access model with role-based controls and audit log",
        "Foundation in place for downstream ML & GenAI workloads",
      ],
    },

    stack: ["Databricks", "Unity Catalog", "Amazon Redshift", "Azure DevOps", "Jira"],
  },

  // =========================================================================
  // 002 — Marketing Data Product Factory · Multi-Year Strategic Account
  // =========================================================================
  {
    id: "marketing-data-platform",
    number: "002",
    variant: "data-platform",
    type: "DATA PRODUCT FACTORY",
    model: "T&M",
    year: "2024–26",
    industry: "Enterprise SaaS",
    domain: "Marketing Analytics · Self-Serve Enablement",

    headline: "Enterprise SaaS Provider Scales a Marketing Data Product Factory on Snowflake + dbt + MWAA — Earned Across Two Renewal Cycles",
    capability: "A governed dbt modeling layer over Snowflake that became the marketing source-of-truth — earned the trust of executive, marketing ops, and RevOps stakeholders across two contract renewals",

    scale: [
      { value: "2+ yrs", label: "Continuous program ownership" },
      { value: "×2", label: "Contract renewals earned" },
      { value: "5 → ~40", label: "dbt model layer growth" },
      { value: "8+", label: "Marketing source platforms ingested" },
      { value: "100+ wks", label: "Weekly status discipline" },
      { value: "Self-serve", label: "Marketing + RevOps enabled" },
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
      pipeline: ["Fivetran ingestion", "MWAA orchestration", "dbt modeling · peer-reviewed in CI", "Semantic layer documentation"],
      platform: "Snowflake warehouse",
      consumers: [
        { name: "Marketing ops", type: "MARKETING" },
        { name: "RevOps", type: "OPS" },
        { name: "Executive reporting", type: "EXEC" },
        { name: "Attribution analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "Fragmented marketing attribution across 8+ sources, no source-of-truth", severity: "high" },
      { label: "Long-retainer trust erosion is invisible until renewal — and then terminal", severity: "high" },
      { label: "Senior embedded client IC — three migrations in — structurally skeptical of consultants", severity: "high" },
      { label: "Scope-growth signals embedded in casual conversation, easy to absorb silently", severity: "high" },
      { label: "VP sponsor changed once over the program — re-onboarding risk at renewal", severity: "med" },
      { label: "Self-serve adoption requires marketing-ops-readable docs, not just data-eng docs", severity: "med" },
    ],

    journey: [
      { stage: "FOUNDATION", title: "Snowflake + MWAA + governance baseline in week 1", detail: "Warehouse stood up with security baseline from day one. MWAA orchestration patterns and DAG conventions established in week 1 — not retrofitted six months in. Governance was a starting condition, not a future-quarter problem." },
      { stage: "PIPELINE", title: "Integrate 8+ marketing sources through Fivetran", detail: "Fivetran ingestion patterns codified. Raw-layer schemas owned by the data eng pod. Source-system contracts documented in a way marketing ops could actually read — not as an afterthought." },
      { stage: "MODELING", title: "Grow the dbt layer from 5 to ~40 production models on a promotion gate", detail: "Peer-reviewed dbt models in CI, lineage-tracked, with semantic-layer documentation. Model growth happened on a documented promotion gate, not ad-hoc. Every new model was a deliberate addition, not a side-effect." },
      { stage: "ENABLEMENT", title: "Self-serve analytics for marketing ops, RevOps, and exec", detail: "Trained marketing ops and RevOps on the semantic layer. Built executive dashboards from a single source-of-truth instead of platform-by-platform exports. Data eng freed up for net-new modeling, not maintenance toil." },
    ],

    orchestration: [
      { team: "Client VP Sponsor", role: "Executive owner · changed once · re-onboarded clean", type: "exec" },
      { team: "Marketing Ops PO", role: "Day-to-day product owner", type: "client" },
      { team: "RevOps Lead", role: "Analytics consumer · adoption driver", type: "client" },
      { team: "Embedded Client IC", role: "Skeptical reviewer · year-2 reroute", type: "client" },
      { team: "phData Architect", role: "Platform + modeling pattern design", type: "internal" },
      { team: "Data Eng Pod", role: "Pipeline + dbt models", type: "internal" },
      { team: "Account Lead", role: "Renewal coverage · CR raising", type: "internal" },
    ],

    decisions: [
      {
        decision: "Same status note, same hour, every Friday — for 100+ weeks straight",
        tradeoff: "Predictability over polish; consistency over novelty",
        risk: "Trust erosion over a long retainer is invisible until renewal",
        outcome: "Two renewals earned on documented confidence — the audit trail did the persuading",
      },
      {
        decision: "Year 2 — accept the embedded IC is structurally unwinnable; reroute work around",
        tradeoff: "Personal investment vs. team velocity and credibility",
        risk: "Burning energy on structural conflict signals the wrong priorities to the team",
        outcome: "Velocity recovered visibly inside a quarter; engagement got measurably easier",
      },
      {
        decision: "Treat every scope-adjacent casual mention as a formal change request",
        tradeoff: "Slower short-term goodwill vs. retainer margin and scope integrity",
        risk: "Scope absorbed silently into hours erodes margin and renewal economics",
        outcome: "Multiple paid expansions captured; renewal cycles had clean numbers",
      },
      {
        decision: "Design the dbt layer with marketing-ops-readable docs, not just data-eng-readable",
        tradeoff: "Documentation overhead vs. self-serve adoption ceiling",
        risk: "An undocumented model layer creates dependency on data eng forever",
        outcome: "Marketing ops + RevOps self-serve; data eng freed for net-new modeling",
      },
      {
        decision: "Re-onboard the new VP sponsor with the audit trail, not the elevator pitch",
        tradeoff: "Time investment vs. speed of relationship build",
        risk: "Renewal-cycle sponsor turnover ends most retainers",
        outcome: "New sponsor inherited the documented story; renewal #2 closed without renegotiation",
      },
    ],

    impact: [
      { value: "×2", label: "Contract renewals earned", tone: "primary" },
      { value: "5 → ~40", label: "dbt models in production", tone: "primary" },
      { value: "100+", label: "Weekly status notes shipped" },
      { value: "SoT", label: "For campaign ROI decisions", tone: "ok" },
      { value: "Self-serve", label: "Marketing + RevOps enabled", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Manual exports between Salesforce, ad platforms, and product telemetry",
        "Campaign ROI calculated in spreadsheets — refresh cycles measured in days",
        "Spend decisions made on stale data with no defensible source-of-truth",
        "Marketing ops dependent on data eng for every new analytical view",
      ],
      after: [
        "Automated Fivetran + MWAA ingestion across 8+ marketing platforms",
        "~40 peer-reviewed, lineage-tracked dbt models in production",
        "Real-time campaign ROI from a governed semantic layer",
        "Marketing ops + RevOps self-serve; data eng freed for net-new modeling",
      ],
    },

    stack: ["Snowflake", "dbt", "MWAA (Airflow)", "Fivetran", "AWS", "Jira"],
  },

  // =========================================================================
  // 003 — China Snowflake · Strategic Cross-Region Delivery Design
  // =========================================================================
  {
    id: "snowflake-china",
    number: "003",
    variant: "data-platform",
    type: "REGIONAL DATA PLATFORM",
    model: "T&M",
    year: "2024",
    industry: "Industrial Manufacturing",
    domain: "Factory Operations · Cross-Region Analytics",

    headline: "Global Industrial Manufacturer Stands Up Snowflake for China Plant Operations in Six Weeks — Across Three Timezones and Through Lunar New Year",
    capability: "A unified Snowflake plant-operations layer that gives HQ supply chain live visibility into China factory operations — designed for async delivery across a 10.5-hour gap and a non-negotiable holiday window",

    scale: [
      { value: "6 weeks", label: "Fixed delivery window" },
      { value: "3 timezones", label: "US · India · China" },
      { value: "10.5 hr", label: "Working-window gap" },
      { value: "Lunar New Year", label: "Mid-program holiday absorbed" },
      { value: "SAP + Oracle", label: "Legacy source landscape" },
      { value: "Async-first", label: "Cadence as architectural choice" },
    ],

    ecosystem: {
      sources: [
        { name: "SAP ECC", type: "ERP" },
        { name: "Oracle R12", type: "ERP" },
        { name: "Factory MES", type: "MES" },
        { name: "WMS", type: "OPS" },
        { name: "Supplier feeds", type: "API" },
      ],
      pipeline: ["Source landscape mapping", "Ingestion patterns · ongoing-support ready", "Snowflake staging + transformation", "Semantic models for plant ops"],
      platform: "Snowflake",
      consumers: [
        { name: "China factory ops", type: "OPS" },
        { name: "HQ supply chain", type: "OPS" },
        { name: "Regional finance", type: "FINANCE" },
        { name: "China site leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Plant-floor data trapped across SAP ECC + Oracle R12 + MES + WMS silos", severity: "high" },
      { label: "10.5-hour gap between US delivery lead and China site — 24-hour decision-lag default", severity: "high" },
      { label: "Lunar New Year three weeks into a six-week window — non-negotiable, can't slip past", severity: "high" },
      { label: "China-site PO defers in groups, disagrees in private — wrong cadence design destroys trust", severity: "high" },
      { label: "HQ supply chain depends on factory visibility for decisions already in flight", severity: "high" },
      { label: "Three-language stakeholder spread, no shared collaboration baseline", severity: "med" },
    ],

    journey: [
      { stage: "DISCOVER", title: "Map the source landscape and the human landscape together", detail: "Inventoried plant systems across SAP ECC and Oracle R12. Identified the critical operational reports HQ supply chain needed. Mapped which decisions on each side blocked which on the other — the human dependency graph next to the technical one." },
      { stage: "ARCHITECT", title: "Async-first delivery design as a first-class architectural choice", detail: "Information architecture for the Snowflake plant-ops layer designed for async decision flow: shared decision register, written-first status at fixed points in each region's day, fortnightly live leadership instead of weekly." },
      { stage: "BUILD", title: "Pipeline + semantic layer sized for ongoing-support handover", detail: "Snowflake staging, transformation layer, semantic models for plant ops dashboards. Ingestion patterns designed for the ongoing support team to inherit cleanly — no black-box handover." },
      { stage: "CUTOVER", title: "Lunar New Year recovery via pre-conversation, not announcement", detail: "Pre-LNY re-baseline negotiated 1:1 with China-site PO first, then sponsor, then leadership. Same magnitude as the Week-2 cadence flip; fundamentally different reception. Clean closure inside the window." },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "HQ executive owner", type: "exec" },
      { team: "China Site PO", role: "On-site owner · trust-rebuild stakeholder", type: "client" },
      { team: "China Factory Ops", role: "Primary data-layer consumer", type: "client" },
      { team: "HQ Supply Chain", role: "Strategic cross-region consumer", type: "client" },
      { team: "US Delivery Lead", role: "Architecture + reasoning anchor", type: "internal" },
      { team: "India Pod", role: "Pipeline build execution", type: "internal" },
      { team: "Account Lead", role: "Regional commercial cover", type: "internal" },
    ],

    decisions: [
      {
        decision: "Flip live weekly cadence to async-first written cadence in week 2",
        tradeoff: "Engagement intimacy vs. timezone economics on a 10.5-hour gap",
        risk: "Lost decision rhythm with leadership across three regions",
        outcome: "Stopped a 24-hour decision-lag pattern — but I made the right call the wrong way; spent three weeks rebuilding trust",
      },
      {
        decision: "Pre-conversation with China-site PO before the LNY re-baseline announcement",
        tradeoff: "Calendar overhead vs. stakeholder trust on a critical schedule change",
        risk: "Repeating the Week-2 group-announcement mistake on a higher-stakes call",
        outcome: "Re-baseline became a co-decision, not a fait accompli; trust held through cutover",
      },
      {
        decision: "Front-load vendor / engineering work, back-load client validation around LNY",
        tradeoff: "Sequencing complexity vs. holiday risk",
        risk: "Cutover slipping past LNY — outside the six-week window",
        outcome: "Clean closure inside the window; KT to ongoing support team clean",
      },
      {
        decision: "Design the data layer for an ongoing-support handover from day 1, not at cutover",
        tradeoff: "Slightly heavier build vs. clean KT economics",
        risk: "Support team inherits a black box; replays our entire build to operate it",
        outcome: "Ongoing support team operational from day 1 post-cutover; no inheritance debt",
      },
    ],

    impact: [
      { value: "6 wks", label: "Delivered on time", tone: "primary" },
      { value: "3 TZ", label: "Async-first cadence held" },
      { value: "Plant ops", label: "Live for HQ supply chain", tone: "ok" },
      { value: "LNY", label: "Absorbed without slippage", tone: "ok" },
      { value: "Clean KT", label: "To ongoing support team" },
    ],

    beforeAfter: {
      before: [
        "Plant-floor data trapped in SAP ECC + Oracle R12 + MES + WMS silos",
        "HQ supply chain blind to China factory operations in flight",
        "24-hour decision-lag across three regions as the default",
        "Manual export-based reporting on critical operational data",
      ],
      after: [
        "Snowflake plant-operations data layer with semantic models",
        "HQ supply chain has live China visibility for decisions in flight",
        "Async-first written cadence as a documented delivery pattern",
        "Foundation for plant intelligence + IoT extensions",
      ],
    },

    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Azure DevOps", "Jira"],
  },

  // =========================================================================
  // 004 — Internal Agentic AI Practice · AI PM Strategic Build
  // =========================================================================
  {
    id: "pmo-ai-agent-platform",
    number: "004",
    variant: "ai-agents",
    type: "INTERNAL AGENTIC AI PRACTICE",
    model: "INTERNAL",
    year: "2024–25",
    industry: "Professional Services · Data & AI Consulting",
    domain: "Internal AI Product Line · Delivery Productivity",

    headline: "Standing Up an Internal Agentic AI Practice at phData — From a Single Billing Agent to a Six-Agent Production Fleet the Delivery Team Trusts With Live Client Work",
    capability: "An internal AI product line that converts repeatable PM workflows into governed, eval-gated, human-in-the-loop agents — freeing senior delivery capacity for account growth and strategic client work",

    scale: [
      { value: "6 agents", label: "In production fleet" },
      { value: ">95%", label: "Eval-set accuracy gate" },
      { value: "~8 hrs/wk", label: "Recovered per delivery PM" },
      { value: "1 month", label: "First-agent team-wide rollout" },
      { value: "Zero", label: "Production rollbacks across fleet" },
      { value: "Innovation Award", label: "phData internal recognition" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce", type: "CRM" },
        { name: "Jira", type: "OPS" },
        { name: "Google Drive", type: "API" },
        { name: "Slack", type: "API" },
        { name: "Time-tracking", type: "API" },
      ],
      pipeline: ["Glean RAG grounding", "Claude reasoning", "n8n orchestration", "JSON-schema validation", "Human-review fallback path"],
      platform: "Glean Agent Builder + Claude · shared reasoning stack",
      consumers: [
        { name: "Delivery PMs", type: "OPS" },
        { name: "Finance", type: "FINANCE" },
        { name: "Sales engineering", type: "EXEC" },
        { name: "Leadership briefings", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "No internal AI delivery pattern at phData to inherit — fleet would be six one-off integrations by default", severity: "high" },
      { label: "LLM outputs on live client invoices clear a trust threshold a generic chatbot never reaches", severity: "high" },
      { label: "Six PM workflows, six output schemas — one prompt template doesn't generalize", severity: "high" },
      { label: "Delivery team won't adopt an agent they can't audit after the fact", severity: "high" },
      { label: "RAG accuracy degrades silently as program data shifts week-over-week", severity: "med" },
      { label: "Fleet sprawl risk — six independent integrations collapse under their own maintenance cost", severity: "med" },
    ],

    journey: [
      { stage: "DISCOVER", title: "Map the manual-PM surface area · separate AI-tractable from judgment work", detail: "Two weeks observing my own delivery workflows by hand — billing, sprint health, risk scanning, briefings, forecasting — to identify which were genuinely AI-tractable (structured inputs, deterministic-ish outputs, clear accuracy bar) and which were judgment work no LLM should touch. The product roadmap was the output of that observation, not a feature list." },
      { stage: "ARCHITECT", title: "Design the reasoning + trust stack once · use it for every agent", detail: "Glean for RAG grounding (inherits permissions + audit trail), Claude for reasoning, n8n for orchestration, JSON-schema validation on every output, human-review fallback as a first-class path — not an afterthought. The platform was an architectural decision before agent one existed." },
      { stage: "EVALUATE", title: "Build the accuracy gate before the agent · the metric exists before the prompt", detail: "Held-out reconciliation test set built day one. Every prompt change re-run against it. A >95% gate before promotion to production. Adoption depends on a defensible accuracy number — and that number has to exist before the agent does." },
      { stage: "SCALE", title: "Ship billing first · codify the pattern · then the fleet", detail: "Billing agent team-wide in one month — highest-pain, most-measurable. Five more agents followed the same reasoning stack, eval harness, and promotion gate. Agents 2–6 cost a fraction of agent 1. The fleet was built on a pattern, not six bespoke builds." },
    ],

    orchestration: [
      { team: "Sole AI PM + Builder", role: "Product · architecture · eval · rollout", type: "internal" },
      { team: "Delivery PMs", role: "Primary adopters · usage feedback loop", type: "internal" },
      { team: "Finance Team", role: "Output consumers · accuracy stress-testers", type: "internal" },
      { team: "phData CTO Office", role: "Architecture review · model + data governance", type: "internal" },
      { team: "IT / Security", role: "Glean permissions · MCP server review", type: "internal" },
      { team: "Sales Engineering", role: "Later adopter cohort · agent ROI storytelling", type: "internal" },
      { team: "phData Leadership", role: "Innovation budget · executive air cover", type: "exec" },
    ],

    decisions: [
      {
        decision: "Glean RAG over a custom retrieval layer — accept capability ceiling for governance ceiling",
        tradeoff: "Bespoke flexibility vs. inherited permissions + audit trail",
        risk: "Glean caps reasoning depth on edge cases the team will eventually hit",
        outcome: "Day-one compliance posture; security review took weeks instead of quarters",
      },
      {
        decision: "Build the eval set before writing the first prompt",
        tradeoff: "Two-week ship delay vs. a defensible accuracy number",
        risk: "Trust gap kills adoption at the first wrong invoice — and nothing after recovers",
        outcome: ">95% gate held across all six agents; zero rollbacks in production",
      },
      {
        decision: "Schema-validate every LLM output; surface ambiguous outputs for human review",
        tradeoff: "Slower happy-path UX vs. trustworthy unhappy-path behavior",
        risk: "A silently-coerced number is worse than a flagged one",
        outcome: "Delivery team adopted because the failure mode was visible, not hidden",
      },
      {
        decision: "Ship the highest-pain, most-measurable agent first — billing, not the demo-able one",
        tradeoff: "Glamour and demo-ability vs. measurable trust",
        risk: "If the first agent fails to land, nothing after it gets adopted",
        outcome: "Billing recovered ~60% of month-end PM time; the next five shipped on an open door",
      },
      {
        decision: "Pattern over fleet — codify the reasoning stack so agents 2–6 cost a fraction of agent 1",
        tradeoff: "Upfront platform investment vs. a fast-feeling first ship",
        risk: "Each new agent re-pays the integration tax forever",
        outcome: "Agents 2–6 shipped on shared tooling, same eval harness, same promotion gate",
      },
      {
        decision: "Surface accuracy logs in delivery-team dashboards, not just my own",
        tradeoff: "Vulnerability of public failure metrics vs. trust earned",
        risk: "Agent quality stays opaque; adoption plateaus at curiosity",
        outcome: "Delivery team treats agents as production tooling, not experimental",
      },
    ],

    impact: [
      { value: "6", label: "Agents in production fleet", tone: "ai" },
      { value: ">95%", label: "Eval gate held across fleet", tone: "primary" },
      { value: "~8 hrs/wk", label: "Recovered per delivery PM", tone: "ok" },
      { value: "100%", label: "LLM outputs schema-validated" },
      { value: "Zero", label: "Production rollbacks", tone: "ok" },
      { value: "Innovation Award", label: "phData internal recognition", tone: "ai" },
    ],

    beforeAfter: {
      before: [
        "Manual PM admin consuming 3-4 hrs of senior delivery time per program, per month",
        "No internal AI delivery pattern — every agent would be a one-off integration",
        "Status notes, risk scans, briefings drafted from scratch every cycle",
        "No accuracy framework — LLM outputs trusted on vibes or distrusted entirely",
        "Senior PM capacity locked into admin, not account growth",
      ],
      after: [
        "Senior PM time recovered for account growth and stakeholder work",
        "Shared reasoning stack: Glean RAG · Claude · n8n · schema validation · human review",
        "Production agent fleet on a documented pattern other consultants now copy",
        "Eval-gated promotion: every agent ships with a defensible accuracy number",
        "Internal AI product line — not a side project, professional infrastructure",
      ],
    },

    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Jira MCP"],

    agents: [
      {
        name: "Month-End Billing Reconciler",
        intent: "Reconcile time-tracked hours vs. project budget · flag overage / underage anomalies for finance review",
        reasoning: "Glean RAG over Salesforce + time-tracking + Drive · schema-validated discrepancy table",
        tools: ["Glean", "Salesforce MCP", "Sheets"],
        output: "Finance-ready discrepancy summary with per-line audit trail",
        status: "live",
      },
      {
        name: "Sprint Health Scorer",
        intent: "Score sprint health across active programs · rank PM attention queue for the week",
        reasoning: "Velocity + blocker count + stakeholder signal weighted against historical baseline",
        tools: ["Jira MCP", "Slack MCP", "Glean"],
        output: "Ranked sprint scorecard + PM action queue",
        status: "live",
      },
      {
        name: "Project Risk Scanner",
        intent: "Cross-program weekly risk scan against historical risk markers",
        reasoning: "Pattern-match current program state to historical near-miss signatures",
        tools: ["Glean", "Jira MCP", "Salesforce MCP"],
        output: "Risk heatmap + escalation queue with owner and timing",
        status: "live",
      },
      {
        name: "Leadership Deck Drafter",
        intent: "Draft executive briefings tone-tuned to audience (CFO vs. VP Engineering vs. Client Sponsor)",
        reasoning: "Audience profile → narrative arc → evidence selection → tone calibration",
        tools: ["Glean", "Google Apps Script"],
        output: "Audience-tuned deck draft with cited data sources",
        status: "live",
      },
      {
        name: "Budget Forecaster",
        intent: "Forecast hours-burn against contract budget · surface variance early",
        reasoning: "Trailing-burn extrapolation + sprint-shape adjustment + scope-delta surfacing",
        tools: ["Glean", "Salesforce MCP"],
        output: "Monthly forecast + variance flags with owner",
        status: "beta",
      },
      {
        name: "Status Note Composer",
        intent: "Draft Friday status notes from sprint + risk + budget signals",
        reasoning: "Stakeholder profile → tone match → cite-as-evidence retrieval",
        tools: ["Glean", "Jira MCP", "Salesforce MCP"],
        output: "Stakeholder-tuned weekly status with embedded evidence links",
        status: "beta",
      },
    ],
  },
];
