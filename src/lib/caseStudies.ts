// Strategic case studies — Senior TPM (Data & AI) framing, phData-voiced.
// Each case is a transformation story: capability created, ecosystem reshaped,
// orchestration led, decisions made, impact unlocked. Text is intentionally
// terse — visualizations carry the story.

export type SourceType = "ERP" | "CRM" | "OPS" | "API" | "MES" | "MARKETING" | "TELEMETRY" | "LAKE" | "WAREHOUSE";
export type ConsumerType = "EXEC" | "OPS" | "PRODUCT" | "ANALYTICS" | "FINANCE" | "MARKETING";
export type OrchestrationType = "client" | "internal" | "vendor" | "exec";

export interface AgentSpec {
  name: string;
  intent: string;
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

  // SCREEN 1 — Mission Control
  headline: string;
  capability: string;
  scale: { value: string; label: string }[];

  // SCREEN 2 — Data Ecosystem
  ecosystem: {
    sources: { name: string; type: SourceType }[];
    pipeline: string[];
    platform: string;
    consumers: { name: string; type: ConsumerType }[];
  };

  // SCREEN 3 — Challenge Landscape
  challenges: { label: string; severity: "high" | "med" | "low" }[];

  // SCREEN 4 — Transformation Journey
  journey: { stage: string; title: string; detail: string }[];

  // SCREEN 5 — Orchestration View
  orchestration: { team: string; role: string; type: OrchestrationType }[];

  // SCREEN 6 — Decision Engine
  decisions: { decision: string; tradeoff: string; risk: string; outcome: string }[];

  // SCREEN 7 — Impact Command Center
  impact: { value: string; label: string; tone?: "primary" | "ok" | "ai" }[];

  // SCREEN 8 — Before / After
  beforeAfter: { before: string[]; after: string[] };

  stack: string[];
  agents?: AgentSpec[];
}

export const caseStudies: CaseStudy[] = [

  // ---------- 001 ----------
  {
    id: "redshift-databricks",
    number: "001",
    variant: "data-platform",
    type: "DATA PLATFORM MODERNIZATION",
    model: "FIXED-PRICE",
    year: "2025–26",
    industry: "EdTech",
    domain: "Learner Analytics · Self-Serve Discovery",

    headline: "Global EdTech Modernizes Its Analytics Estate from Redshift to a Governed Databricks Lakehouse",
    capability: "A governed lakehouse foundation enabling self-serve analytics and downstream ML & GenAI workloads",

    scale: [
      { value: "2,300+", label: "Data objects migrated" },
      { value: "US + India", label: "Delivery pod" },
      { value: "12+", label: "Source feeds" },
      { value: "4 BI tools", label: "Downstream consumers" },
      { value: "Zero", label: "Consumer outages" },
      { value: "Fixed-price", label: "Engagement model" },
    ],

    ecosystem: {
      sources: [
        { name: "Redshift (legacy)", type: "WAREHOUSE" },
        { name: "S3 data lake", type: "LAKE" },
        { name: "Product telemetry", type: "TELEMETRY" },
        { name: "Marketing platforms", type: "MARKETING" },
        { name: "CRM", type: "CRM" },
        { name: "Finance systems", type: "ERP" },
      ],
      pipeline: ["Object inventory", "Lineage capture", "Migration tooling", "Unity Catalog governance"],
      platform: "Databricks Unity Catalog Lakehouse",
      consumers: [
        { name: "Product analytics", type: "PRODUCT" },
        { name: "Marketing", type: "MARKETING" },
        { name: "Content team", type: "ANALYTICS" },
        { name: "Finance reporting", type: "FINANCE" },
        { name: "Exec dashboards", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Six years of undocumented Redshift SQL", severity: "high" },
      { label: "Single-owner gatekeeper risk", severity: "high" },
      { label: "Mixed prod / dev / sandbox objects", severity: "med" },
      { label: "Dashboard parity drift across BI tools", severity: "med" },
      { label: "No governance scaffolding for ML/GenAI", severity: "high" },
      { label: "Access fragmentation slowing analytics", severity: "med" },
    ],

    journey: [
      { stage: "DISCOVER", title: "Assess the legacy estate", detail: "Inventoried 2,300 objects, mapped ownership, surfaced critical-path dashboards." },
      { stage: "ARCHITECT", title: "Design the target lakehouse", detail: "Unity Catalog as governance spine; tiered prod/curated/sandbox; downstream parity contracts." },
      { stage: "EXECUTE", title: "Migrate in resilience-first order", detail: "Sequenced sprints around stakeholder validation, not dependency-optimal order." },
      { stage: "GOVERN", title: "Cut over on a governance baseline", detail: "Single rollback window, signed-off parity, audit trail, UAT closure." },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "Executive owner", type: "exec" },
      { team: "Client Data Lead", role: "Gatekeeper · co-owner won", type: "client" },
      { team: "US Delivery Lead", role: "Architecture", type: "internal" },
      { team: "India Pod", role: "Migration engineering", type: "internal" },
      { team: "BI Consumers", role: "Parity sign-off", type: "client" },
      { team: "Account Lead", role: "Commercial cover", type: "internal" },
    ],

    decisions: [
      {
        decision: "Sequence around the gatekeeper's marketing objects, not the dependency graph",
        tradeoff: "Slower technical convergence vs. stakeholder validation",
        risk: "Political block at UAT",
        outcome: "Gatekeeper signed off as co-owner",
      },
      {
        decision: "Hold color status honest — go yellow on client-side access stalls",
        tradeoff: "Sponsor friction vs. fixed-price margin",
        risk: "Hidden burn absorbed silently",
        outcome: "Three-week stall escalated and cleared",
      },
      {
        decision: "Route a hallway-request dashboard through formal change control",
        tradeoff: "Short-term goodwill vs. contract integrity",
        risk: "Scope creep on a fixed contract",
        outcome: "Captured as paid change, not absorbed",
      },
    ],

    impact: [
      { value: "2,300", label: "Objects migrated", tone: "primary" },
      { value: "Zero", label: "Consumer outages", tone: "ok" },
      { value: "100%", label: "UAT sign-off", tone: "ok" },
      { value: "Unity Catalog", label: "Governance baseline" },
      { value: "ML-ready", label: "Lakehouse foundation", tone: "primary" },
    ],

    beforeAfter: {
      before: [
        "Six years of undocumented Redshift SQL",
        "Single-owner access decisions",
        "Mixed prod/dev objects in one estate",
        "Parity drift across four BI tools",
        "No governance for ML/GenAI",
      ],
      after: [
        "Governed Unity Catalog lakehouse",
        "Multi-owner access with audit trail",
        "Tiered prod / curated / sandbox",
        "Parity-validated dashboards",
        "Foundation for ML & GenAI workloads",
      ],
    },

    stack: ["Databricks", "Unity Catalog", "Amazon Redshift", "Azure DevOps", "Jira"],
  },

  // ---------- 002 ----------
  {
    id: "marketing-data-platform",
    number: "002",
    variant: "data-platform",
    type: "DATA PRODUCT FACTORY",
    model: "T&M",
    year: "2024–26",
    industry: "Enterprise SaaS",
    domain: "Marketing Analytics · Self-Serve Enablement",

    headline: "Enterprise SaaS Provider Builds a Marketing Data Product Factory on Snowflake, dbt, and MWAA",
    capability: "A trusted self-serve marketing data foundation that scaled across two renewal cycles",

    scale: [
      { value: "2+ yrs", label: "Continuous engagement" },
      { value: "×2", label: "Contract renewals earned" },
      { value: "~40", label: "dbt models in production" },
      { value: "8+", label: "Marketing source platforms" },
      { value: "100+ wks", label: "Weekly status discipline" },
      { value: "Retainer", label: "Engagement model" },
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
      pipeline: ["Fivetran ingestion", "MWAA orchestration", "dbt modeling layer", "CI / peer review"],
      platform: "Snowflake warehouse",
      consumers: [
        { name: "Marketing ops", type: "MARKETING" },
        { name: "RevOps", type: "OPS" },
        { name: "Executive reporting", type: "EXEC" },
        { name: "Attribution analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "Fragmented campaign attribution", severity: "high" },
      { label: "Manual export-based reporting", severity: "high" },
      { label: "No source-of-truth for marketing ROI", severity: "high" },
      { label: "Spend decisions on stale data", severity: "med" },
      { label: "Renewal-cycle stakeholder turnover", severity: "med" },
      { label: "Skeptical embedded IC counterpart", severity: "med" },
    ],

    journey: [
      { stage: "FOUNDATION", title: "Warehouse + orchestration scaffold", detail: "Snowflake stood up, MWAA orchestration baseline, ingestion patterns established." },
      { stage: "PIPELINE", title: "Source integration at scale", detail: "8+ marketing platforms ingested through Fivetran into raw layer." },
      { stage: "MODELING", title: "Governed dbt model layer", detail: "~40 dbt models in CI, peer-reviewed, lineage-tracked." },
      { stage: "ENABLEMENT", title: "Self-serve marketing analytics", detail: "RevOps + marketing ops trained, executive dashboards from a single semantic layer." },
    ],

    orchestration: [
      { team: "Client VP Sponsor", role: "Executive owner", type: "exec" },
      { team: "Marketing Ops PO", role: "Day-to-day owner", type: "client" },
      { team: "RevOps Lead", role: "Analytics consumer", type: "client" },
      { team: "Embedded IC", role: "Skeptical reviewer", type: "client" },
      { team: "Data Eng Pod", role: "Pipeline + models", type: "internal" },
      { team: "Architect", role: "Platform design", type: "internal" },
      { team: "Account Lead", role: "Renewal coverage", type: "internal" },
    ],

    decisions: [
      {
        decision: "Same status note, same hour, every week for 100+ weeks",
        tradeoff: "Predictability over polish",
        risk: "Trust erosion over a long retainer",
        outcome: "Two contract renewals earned on documented confidence",
      },
      {
        decision: "Year-2 reroute — stop investing in unwinnable embedded IC",
        tradeoff: "Personal investment vs. team velocity",
        risk: "Credibility burn on structural conflict",
        outcome: "Velocity recovered; engagement got measurably easier",
      },
      {
        decision: "Surface adjacent scope-growth signals as formal change requests",
        tradeoff: "Short-term goodwill vs. retainer integrity",
        risk: "Scope absorbed into hours, eroding margin",
        outcome: "Captured as paid expansions over two years",
      },
    ],

    impact: [
      { value: "×2", label: "Contract renewals", tone: "primary" },
      { value: "~40", label: "dbt models in production", tone: "primary" },
      { value: "100+", label: "Weekly status notes shipped" },
      { value: "SoT", label: "For campaign ROI", tone: "ok" },
      { value: "Self-serve", label: "Marketing analytics enabled", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Manual exports across Salesforce + ad platforms",
        "Marketing ROI calculated in spreadsheets",
        "Stale data driving spend decisions",
        "No governed modeling layer",
      ],
      after: [
        "Automated Fivetran + MWAA ingestion",
        "Governed dbt model layer with peer review",
        "Real-time ROI for executive decisions",
        "Self-serve analytics for marketing & RevOps",
      ],
    },

    stack: ["Snowflake", "dbt", "MWAA (Airflow)", "Fivetran", "AWS", "Jira"],
  },

  // ---------- 003 ----------
  {
    id: "snowflake-china",
    number: "003",
    variant: "data-platform",
    type: "REGIONAL DATA PLATFORM",
    model: "T&M",
    year: "2024",
    industry: "Industrial Manufacturing",
    domain: "Factory Operations · Cross-Region Analytics",

    headline: "Global Industrial Manufacturer Stands Up Snowflake for China Plant Operations in Six Weeks — Through Lunar New Year",
    capability: "A unified plant-operations data layer giving HQ live visibility into China factory operations",

    scale: [
      { value: "6 weeks", label: "Delivery window" },
      { value: "3 timezones", label: "US · India · China" },
      { value: "10.5 hr", label: "Working-window gap" },
      { value: "LNY", label: "Mid-program holiday" },
      { value: "SAP + Oracle", label: "Legacy source systems" },
      { value: "T&M", label: "Engagement model" },
    ],

    ecosystem: {
      sources: [
        { name: "SAP ECC", type: "ERP" },
        { name: "Oracle R12", type: "ERP" },
        { name: "Factory MES", type: "MES" },
        { name: "WMS", type: "OPS" },
        { name: "Supplier feeds", type: "API" },
      ],
      pipeline: ["Ingestion patterns", "Snowflake staging", "Transformation layer", "Semantic layer"],
      platform: "Snowflake",
      consumers: [
        { name: "China factory ops", type: "OPS" },
        { name: "HQ supply chain", type: "OPS" },
        { name: "Regional finance", type: "FINANCE" },
        { name: "China site leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Plant-floor data trapped in legacy ERP", severity: "high" },
      { label: "24-hour decision-lag across 3 regions", severity: "high" },
      { label: "Lunar New Year inside the 6-week window", severity: "high" },
      { label: "Three-language stakeholder spread", severity: "med" },
      { label: "Async decision-making mismatch", severity: "med" },
      { label: "China-site PO deferred in groups", severity: "med" },
    ],

    journey: [
      { stage: "DISCOVER", title: "Map source landscape", detail: "Inventoried plant systems across SAP and Oracle, identified critical operational reports for HQ." },
      { stage: "ARCHITECT", title: "Async-first delivery design", detail: "Information architecture, ingestion patterns, written-first cadence across three timezones." },
      { stage: "BUILD", title: "Pipeline + semantic layer", detail: "Snowflake staging, transformation, plant-ops dashboards for HQ visibility." },
      { stage: "CUTOVER", title: "Pre-Lunar-New-Year close-out", detail: "Re-baselined schedule, validated with China site, clean KT to ongoing support." },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "HQ executive", type: "exec" },
      { team: "US Delivery Lead", role: "Architecture", type: "internal" },
      { team: "India Pod", role: "Pipeline build", type: "internal" },
      { team: "China Site PO", role: "On-site owner", type: "client" },
      { team: "China Factory Ops", role: "Consumer", type: "client" },
      { team: "HQ Supply Chain", role: "Strategic consumer", type: "client" },
      { team: "Account Lead", role: "Regional coverage", type: "internal" },
    ],

    decisions: [
      {
        decision: "Flip live weekly cadence to async-first written cadence",
        tradeoff: "Engagement intimacy vs. timezone economics",
        risk: "Lost rhythm with leadership",
        outcome: "Stopped a 24-hour decision-lag pattern",
      },
      {
        decision: "Pre-conversation with China PO before group announcement on re-baseline",
        tradeoff: "Extra calendar overhead vs. stakeholder trust",
        risk: "Repeat of week-2 group-announcement mistake",
        outcome: "Re-baseline became a co-decision, not a fait accompli",
      },
      {
        decision: "Front-load vendor work, back-load client validation around the holiday",
        tradeoff: "Sequencing complexity vs. holiday risk",
        risk: "Cutover slipping past Lunar New Year",
        outcome: "Clean closure inside the six-week window",
      },
    ],

    impact: [
      { value: "6 wks", label: "Delivered on time", tone: "primary" },
      { value: "3 TZ", label: "Async-first cadence held" },
      { value: "Plant ops", label: "Live for HQ", tone: "ok" },
      { value: "LNY", label: "Handled without slippage", tone: "ok" },
      { value: "Clean KT", label: "To ongoing support" },
    ],

    beforeAfter: {
      before: [
        "Plant-floor data trapped in SAP + Oracle silos",
        "HQ blind to China factory operations",
        "24-hour decision-lag across three regions",
        "Manual export-based reporting",
      ],
      after: [
        "Snowflake plant-operations data layer",
        "HQ supply chain has live China visibility",
        "Async-first written cadence pattern",
        "Foundation for plant intelligence / IoT extensions",
      ],
    },

    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Azure DevOps", "Jira"],
  },

  // ---------- 004 ----------
  {
    id: "pmo-ai-agent-platform",
    number: "004",
    variant: "ai-agents",
    type: "INTERNAL AGENT PLATFORM",
    model: "INTERNAL",
    year: "2024–25",
    industry: "Professional Services · Data & AI Consulting",
    domain: "Internal AI Operations · Delivery Productivity",

    headline: "phData Builds an Internal Agentic Workforce on Glean + Claude + n8n — Recovering ~8 Hours Per Week Per PM",
    capability: "A repeatable pattern for shipping production-grade internal AI agents the delivery team trusts with live client work",

    scale: [
      { value: "6 agents", label: "In production" },
      { value: "~8 hrs/wk", label: "Recovered per PM" },
      { value: ">95%", label: "Billing reconciliation accuracy" },
      { value: "1 month", label: "First-agent team adoption" },
      { value: "Innovation Award", label: "phData recognition" },
      { value: "Self-initiated", label: "Engagement model" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce", type: "CRM" },
        { name: "Jira", type: "OPS" },
        { name: "Google Drive", type: "API" },
        { name: "Slack", type: "API" },
        { name: "Time-tracking", type: "API" },
      ],
      pipeline: ["Glean grounding", "Claude reasoning", "n8n orchestration", "Schema validation", "Human-review fallback"],
      platform: "Glean Agent Builder + Claude",
      consumers: [
        { name: "Delivery PMs", type: "OPS" },
        { name: "Finance", type: "FINANCE" },
        { name: "Sales engineering", type: "EXEC" },
        { name: "Leadership briefings", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "PMs spending 3-4 hrs/month on copy-paste billing", severity: "high" },
      { label: "No production-grade internal AI pattern to copy", severity: "high" },
      { label: "Live client invoices require paper-trail trust", severity: "high" },
      { label: "Schema-bounded outputs needed for LLM reliability", severity: "med" },
      { label: "Adoption depends on accuracy, not novelty", severity: "high" },
    ],

    journey: [
      { stage: "OBSERVE", title: "Watch own process by hand", detail: "Two weeks of notepad analysis on personal month-end before writing a prompt." },
      { stage: "BUILD", title: "Glean-first architecture", detail: "Build on the team's existing knowledge + permissions layer, not a custom integration." },
      { stage: "TRUST", title: "Schema validation + human-review fallback", detail: "Every LLM output schema-validated; ambiguous outputs surfaced for review, not silently passed." },
      { stage: "ADOPT", title: "Billing first, then platform", detail: "Billing agent team-wide in one month; five more followed an easier path." },
    ],

    orchestration: [
      { team: "Sole builder", role: "Design + build", type: "internal" },
      { team: "Delivery PMs", role: "Primary adopters", type: "internal" },
      { team: "Finance", role: "Output consumers", type: "internal" },
      { team: "Sales Engineering", role: "Later adopters", type: "internal" },
      { team: "phData Leadership", role: "Innovation Award sponsors", type: "exec" },
    ],

    decisions: [
      {
        decision: "Build on Glean, not a custom API integration",
        tradeoff: "Architectural flexibility vs. speed to adoption",
        risk: "Ceiling on agent capability",
        outcome: "Team-wide adoption in one month",
      },
      {
        decision: "Log per-run accuracy from day one against held-out test set",
        tradeoff: "Slower initial ship vs. defensible claim",
        risk: "Adoption blocked by trust gap",
        outcome: ">95% accuracy defensible in status meetings",
      },
      {
        decision: "Ship billing first, deliberately",
        tradeoff: "Glamour vs. measurability",
        risk: "Nothing else lands if first agent fails",
        outcome: "Five more agents followed an easier path",
      },
    ],

    impact: [
      { value: "6", label: "Agents in production", tone: "ai" },
      { value: "~8 hrs/wk", label: "Recovered per PM", tone: "ok" },
      { value: ">95%", label: "Billing accuracy", tone: "primary" },
      { value: "1 month", label: "First-agent adoption" },
      { value: "Innovation Award", label: "phData recognition", tone: "ai" },
    ],

    beforeAfter: {
      before: [
        "3-4 hrs/PM/month on copy-paste billing",
        "No internal AI pattern to copy",
        "Manual cross-program risk scanning",
        "Status notes drafted from scratch",
      ],
      after: [
        "Production-grade agent platform on Glean",
        "Repeatable pattern for shipping internal agents",
        "PM capacity freed for strategic work",
        "Pattern other consultants now copy",
      ],
    },

    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Jira MCP"],

    agents: [
      {
        name: "Month-End Billing Reconciler",
        intent: "Reconcile time-tracked hours vs. project budget",
        tools: ["Glean", "Salesforce MCP", "Sheets"],
        output: "Finance-ready discrepancy summary",
        status: "live",
      },
      {
        name: "Sprint Health Scorer",
        intent: "Score sprint health across active programs",
        tools: ["Jira MCP", "Slack MCP"],
        output: "Ranked sprint scorecard + PM actions",
        status: "live",
      },
      {
        name: "Project Risk Scanner",
        intent: "Surface risk patterns across portfolio",
        tools: ["Glean", "Jira MCP", "Salesforce MCP"],
        output: "Risk heatmap + escalation queue",
        status: "live",
      },
      {
        name: "Leadership Deck Drafter",
        intent: "Draft executive briefings from program data",
        tools: ["Glean", "Google Apps Script"],
        output: "Audience-tuned deck draft",
        status: "live",
      },
      {
        name: "Budget Forecaster",
        intent: "Forecast burn against contract budget",
        tools: ["Glean", "Salesforce MCP"],
        output: "Monthly forecast + variance flags",
        status: "beta",
      },
      {
        name: "Status Note Composer",
        intent: "Draft Friday status notes from sprint data",
        tools: ["Glean", "Jira MCP"],
        output: "Stakeholder-tuned weekly status",
        status: "beta",
      },
    ],
  },
];
