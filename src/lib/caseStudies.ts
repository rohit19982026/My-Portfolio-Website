// Case studies in real TPM voice. Conversational, specific, no consulting jargon,
// no AI-bot parallelism. How Rohit would actually describe these programs
// to a senior VP in an interview, not how a marketing page would.

export type SourceType = "ERP" | "CRM" | "OPS" | "API" | "MES" | "MARKETING" | "TELEMETRY" | "LAKE" | "WAREHOUSE";
export type ConsumerType = "EXEC" | "OPS" | "PRODUCT" | "ANALYTICS" | "FINANCE" | "MARKETING";
export type OrchestrationType = "client" | "internal" | "vendor" | "exec";

export interface AgentSpec {
  name: string;
  replaces: string;
  adopters: string;
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

  // ===========================================================================
  // 001
  // ===========================================================================
  {
    id: "redshift-databricks",
    number: "001",
    variant: "data-platform",
    type: "REDSHIFT → DATABRICKS",
    model: "FIXED-PRICE",
    year: "2025–26",
    industry: "EdTech",
    domain: "Fixed-price · US + India pod",

    headline: "Fixed-price Redshift to Databricks migration. The hard part wasn't the data. It was the client's data lead, who'd built the old estate over six years and wasn't sold on replacing it.",
    capability: "PM end-to-end. phData was on the hook for delivery, not the client. About 2,300 objects. The inventory was straightforward. Reading the client side took longer.",

    scale: [
      { value: "~2,300", label: "Objects in the estate" },
      { value: "Fixed-price", label: "phData on the hook" },
      { value: "US + India", label: "Two delivery pods" },
      { value: "12+", label: "Sources feeding in" },
      { value: "4 BI tools", label: "Each wanted parity proof" },
      { value: "Zero", label: "Outages at cutover" },
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
      pipeline: ["Inventory the estate", "Sequence around the people", "Per-tool parity contracts", "Cutover runbook + rollback"],
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
      { label: "Fixed-price. Every week of stall comes out of our margin, not theirs.", severity: "high" },
      { label: "Senior data lead on the client side wasn't sold on the migration.", severity: "high" },
      { label: "Six years of Redshift SQL with one owner and no docs.", severity: "high" },
      { label: "Four BI teams. Four different definitions of the same metric.", severity: "med" },
      { label: "US and India teams, ten and a half hours apart.", severity: "med" },
      { label: "Sponsor kept asking for adjacent things in hallway conversations.", severity: "med" },
    ],

    journey: [
      {
        stage: "SCOPE",
        title: "Inventory in week one. Then the people.",
        detail: "Walked through all 2,300 objects in the first two weeks. Who built what, who used what. The dependency graph mattered. The ownership map mattered more, and nobody had drawn it.",
      },
      {
        stage: "SEQUENCE",
        title: "Sprint order followed the people, not the graph.",
        detail: "Put the data lead's marketing objects in sprint 6 instead of sprint 2. Meant he got to validate them himself before cutover. The architect pushed back. Dependencies got messier. I took the call. By week four the data lead was using 'we' in the weekly instead of 'you'.",
      },
      {
        stage: "RUN",
        title: "Changed who spoke first in the weekly.",
        detail: "Sponsor used to open the client meeting. Switched it to the data lead. Cost the sponsor about ninety seconds of airtime. Status went yellow twice when client access stalled. Sponsor would've preferred green. Escalated one of those when it crossed three weeks open.",
      },
      {
        stage: "CLOSE",
        title: "Cutover was four sign-offs, not one.",
        detail: "Each BI team signed off on parity for their own tool. Probably saved us a production fire. The sponsor's hallway dashboard request went through formal change control. Got captured as paid work instead of absorbed into a fixed-price contract.",
      },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "On the contract. Weekly was mine to run.", type: "exec" },
      { team: "Client Data Lead", role: "The actual job. Skeptic in week one, co-owner by week four.", type: "client" },
      { team: "BI Consumer Teams", role: "Four of them. Per-tool parity, in sequence.", type: "client" },
      { team: "phData Architect", role: "Disagreed with my sprint order. Got overruled.", type: "internal" },
      { team: "US Delivery Lead", role: "Lead on the US side. Daily standups.", type: "internal" },
      { team: "India Pod", role: "Doing the work, ten hours offset.", type: "internal" },
      { team: "Account Lead", role: "Backup for the hard escalations.", type: "internal" },
    ],

    decisions: [
      {
        decision: "Held the data lead's objects back to sprint 6 against the architect's call.",
        tradeoff: "Worse dependency graph for the engineering team.",
        risk: "If I was wrong about the politics, I'd burned the team for nothing.",
        outcome: "Data lead validated those objects himself. Signed off UAT without a fight.",
      },
      {
        decision: "Went yellow on status when the sponsor would've preferred green.",
        tradeoff: "Made the sponsor uncomfortable in the weekly.",
        risk: "Reads as PM weakness if you can't justify the call.",
        outcome: "Three-week access stall got escalated and cleared inside seven days.",
      },
      {
        decision: "Pushed the sponsor's hallway dashboard request through formal change control.",
        tradeoff: "Cost some goodwill in the week the change request landed.",
        risk: "Sponsor relationship cooling on a year-long engagement.",
        outcome: "Captured as paid work. On fixed-price, that matters.",
      },
      {
        decision: "Got every BI team to sign off parity for their own tool, separately.",
        tradeoff: "Cutover took longer to organize.",
        risk: "Could've closed on time and found a parity gap in production a week later.",
        outcome: "No production fires. Closed on time anyway.",
      },
      {
        decision: "Switched who spoke first in the weekly client meeting.",
        tradeoff: "Awkward first week. Sponsor wasn't expecting it.",
        risk: "Sponsor reads it as a snub. Took a 1:1 to walk him through it.",
        outcome: "Data lead started saying 'we' by week four. That's the thing that closed the program.",
      },
    ],

    impact: [
      { value: "On time", label: "Closed in the window", tone: "primary" },
      { value: "On budget", label: "Margin held through the year", tone: "ok" },
      { value: "Zero", label: "Production outages at cutover", tone: "ok" },
      { value: "100%", label: "UAT sign-off, gatekeeper included", tone: "ok" },
      { value: "Paid CR", label: "Hallway request didn't get absorbed" },
    ],

    beforeAfter: {
      before: [
        "Fixed-price job. Delivery risk on phData.",
        "Six-year Redshift estate. One owner. No docs.",
        "Skeptical data lead on the client side.",
        "Four BI teams expecting parity sign-off, no contracts in place.",
      ],
      after: [
        "Closed on time, on budget, no outages.",
        "Data lead signed off UAT clean. Was using 'we' by week four.",
        "Per-tool parity, sign-off team by team.",
        "Hallway scope captured as a paid CR, not absorbed.",
      ],
    },

    stack: ["Databricks", "Unity Catalog", "Amazon Redshift", "Azure DevOps", "Jira"],
  },

  // ===========================================================================
  // 002
  // ===========================================================================
  {
    id: "marketing-data-platform",
    number: "002",
    variant: "data-platform",
    type: "MULTI-YEAR RETAINER",
    model: "T&M",
    year: "2024–26",
    industry: "Enterprise SaaS",
    domain: "Long retainer · Two renewals",

    headline: "Multi-year marketing data platform on Snowflake, dbt, MWAA. Two renewals. The thing I got wrong was spending year one trying to convince an embedded engineer I was on his side.",
    capability: "PM on a long retainer. Status notes, change requests, stakeholder management, renewal positioning. Year one was learning who was actually worth winning over.",

    scale: [
      { value: "2+ years", label: "Continuous engagement" },
      { value: "Two", label: "Renewals earned" },
      { value: "100+", label: "Weekly status notes" },
      { value: "1", label: "VP sponsor turnover absorbed" },
      { value: "Multiple", label: "Paid change requests" },
      { value: "Stack", label: "MWAA + dbt + Snowflake" },
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
      pipeline: ["Friday status note, same hour", "Stakeholder map, kept current", "Change requests, not absorption", "Renewal evidence, built weekly"],
      platform: "Snowflake",
      consumers: [
        { name: "Marketing ops", type: "MARKETING" },
        { name: "RevOps", type: "OPS" },
        { name: "Executive reporting", type: "EXEC" },
        { name: "Attribution analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "Long retainers fail at renewal if trust erodes weekly. You can't see it until it's too late.", severity: "high" },
      { label: "Senior client engineer decided in week three he didn't trust consultants. Stayed that way for two years.", severity: "high" },
      { label: "Scope creep on a retainer is easy to absorb. Easy to lose margin too.", severity: "high" },
      { label: "VP sponsor changed once. Renewal was three months later.", severity: "high" },
      { label: "Marketing ops adoption needed docs they could actually read, not data eng docs.", severity: "med" },
      { label: "Renewal conversations need evidence. You build it weekly or you don't have it.", severity: "med" },
    ],

    journey: [
      {
        stage: "STAND UP",
        title: "Set the cadence in week one and held it.",
        detail: "Friday status note, same hour, every week. Boring on purpose. When renewals came around, the note had done the persuading. Took me a while to figure out that was the program — not a deliverable on it.",
      },
      {
        stage: "RUN",
        title: "Read every passing scope mention as a change request.",
        detail: "Sponsor would mention adjacent things in hallway conversations. Easy to absorb on a retainer. Surfaced two of those as scope-growth signals to the account lead. Became formal CRs instead of free work.",
      },
      {
        stage: "TRIAGE",
        title: "Year two. Stopped trying to win over the senior engineer.",
        detail: "Spent year one writing extra context and taking 1:1s with him. He wasn't going to come around. Structural thing — his role didn't allow it. Routed around him in year two and the engagement got measurably easier.",
      },
      {
        stage: "RENEW",
        title: "Re-onboarded the new VP through the audit trail.",
        detail: "Sponsor changed three months before renewal #2. Walked the new one through two years of status notes, not a pitch deck. Renewal closed without renegotiation.",
      },
    ],

    orchestration: [
      { team: "Client VP Sponsor", role: "Executive owner. Changed once over the program.", type: "exec" },
      { team: "Marketing Ops PO", role: "Day-to-day. Weekly working session was mine.", type: "client" },
      { team: "RevOps Lead", role: "Analytics consumer. Drove adoption with me.", type: "client" },
      { team: "Embedded Client IC", role: "Skeptic. Year one I tried to win him over. Year two I stopped.", type: "client" },
      { team: "phData Architect", role: "Platform calls.", type: "internal" },
      { team: "Data Eng Pod", role: "The team I was shielding.", type: "internal" },
      { team: "Account Lead", role: "Raised the change requests with me.", type: "internal" },
    ],

    decisions: [
      {
        decision: "Same status note, same hour, every Friday. For 100+ weeks.",
        tradeoff: "Boring. Nobody compliments you for consistency.",
        risk: "Note becomes invisible furniture and trust erodes anyway.",
        outcome: "Two renewals. The audit trail did the persuading.",
      },
      {
        decision: "Year two — stopped investing in the embedded engineer.",
        tradeoff: "Wrote off the relationship I'd been working on for a year.",
        risk: "He could've escalated to the sponsor that I'd disengaged.",
        outcome: "Engagement got measurably easier. Team velocity recovered inside a quarter.",
      },
      {
        decision: "Routed every scope-adjacent hallway comment through the account lead as a CR signal.",
        tradeoff: "Slower on the friendly response. Felt unhelpful in the moment.",
        risk: "Sponsor reading us as rigid. Goodwill erosion over two years.",
        outcome: "Multiple paid expansions. Renewal numbers stayed clean.",
      },
      {
        decision: "Re-onboarded the new VP through two years of status notes, not a deck.",
        tradeoff: "Took more of his time. Decks are easier to consume.",
        risk: "New VP doesn't want the history lesson. Wants the pitch.",
        outcome: "Renewal #2 closed without renegotiation.",
      },
      {
        decision: "Pushed marketing ops adoption through docs they could actually read.",
        tradeoff: "Heavier documentation lift. Data eng wanted to write it their way.",
        risk: "Marketing ops abandons the model layer if it feels engineered.",
        outcome: "Marketing ops and RevOps self-serve. Data eng moved to net-new work.",
      },
    ],

    impact: [
      { value: "Two", label: "Renewals earned", tone: "primary" },
      { value: "100+", label: "Friday status notes shipped", tone: "ok" },
      { value: "Clean", label: "Renewal #2, no renegotiation", tone: "ok" },
      { value: "Paid", label: "Multiple CRs captured" },
      { value: "Self-serve", label: "Marketing ops + RevOps" },
    ],

    beforeAfter: {
      before: [
        "Long retainer. Skeptical embedded engineer. Sponsor turnover risk.",
        "Status notes ad-hoc, renewal conversations starting from zero.",
        "Spent year one trying to win over the wrong stakeholder.",
        "Scope-adjacent requests defaulting to free work.",
      ],
      after: [
        "Two renewals. Sponsor changeover absorbed clean.",
        "100+ weeks of status discipline. Renewal evidence pre-built.",
        "Year two, routed around the skeptic. Velocity came back.",
        "Every scope signal raised as a CR. Multiple paid expansions.",
      ],
    },

    stack: ["Snowflake", "dbt", "MWAA (Airflow)", "Fivetran", "AWS", "Jira"],
  },

  // ===========================================================================
  // 003
  // ===========================================================================
  {
    id: "snowflake-china",
    number: "003",
    variant: "data-platform",
    type: "6-WEEK BUILD · 3 TIMEZONES",
    model: "T&M",
    year: "2024",
    industry: "Industrial Manufacturing",
    domain: "6 weeks · US, India, China · LNY mid-program",

    headline: "Six-week Snowflake build for a manufacturer's China factory. Three timezones, ten and a half hour gap, Lunar New Year three weeks in. The thing I got wrong was a fifteen-minute conversation I didn't have.",
    capability: "Fixed-window program across three regions. Designed the async cadence. Made one expensive stakeholder mistake in week two and corrected it in week three. Closed on time.",

    scale: [
      { value: "6 weeks", label: "Fixed window" },
      { value: "3 TZ", label: "US, India, China" },
      { value: "10.5 hr", label: "US to China gap" },
      { value: "LNY", label: "Three weeks in" },
      { value: "Wk 2", label: "I made the call wrong" },
      { value: "Wk 3", label: "Did the same call right" },
    ],

    ecosystem: {
      sources: [
        { name: "SAP ECC", type: "ERP" },
        { name: "Oracle R12", type: "ERP" },
        { name: "Factory MES", type: "MES" },
        { name: "WMS", type: "OPS" },
        { name: "Supplier feeds", type: "API" },
      ],
      pipeline: ["Async-first cadence", "1:1 before group on big calls", "LNY contingency in week 3", "Day-1 KT design"],
      platform: "Snowflake",
      consumers: [
        { name: "China factory ops", type: "OPS" },
        { name: "HQ supply chain", type: "OPS" },
        { name: "Regional finance", type: "FINANCE" },
        { name: "China site leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Six weeks, Lunar New Year three in. Couldn't push the cutover past it.", severity: "high" },
      { label: "Ten and a half hour gap between US and China. Live cadence meant 24-hour decision lag.", severity: "high" },
      { label: "China-site PO defers in groups and disagrees in private. Wrong cadence design kills trust.", severity: "high" },
      { label: "Three-language stakeholder spread, no shared collaboration baseline.", severity: "med" },
      { label: "HQ supply chain needed the visibility for decisions already in flight.", severity: "high" },
      { label: "Ongoing-support team inheriting at cutover. Couldn't hand them a black box.", severity: "med" },
    ],

    journey: [
      {
        stage: "SCOPE",
        title: "Walked the source landscape and the people landscape.",
        detail: "SAP, Oracle, MES, WMS — that took a week. Reading the China-site PO took longer. He defers in groups, disagrees in private. I read it correctly in week one. Didn't use the read in week two. That's on me.",
      },
      {
        stage: "DESIGN",
        title: "Async-first cadence was the architecture, not a logistics choice.",
        detail: "Written status at fixed points in each region's day. Shared decision register. Live leadership moved from weekly to fortnightly. Across a 10.5-hour gap, the cadence design was the program.",
      },
      {
        stage: "OWN",
        title: "Made the cadence call right. Made it the wrong way.",
        detail: "Announced the cadence flip in the live client leadership meeting. China-site PO heard it for the first time in front of his own leadership. He said the right things. His face said something else. Spent three weeks rebuilding that trust.",
      },
      {
        stage: "CLOSE",
        title: "LNY re-baseline was the same call. I made it the right way.",
        detail: "Walked the China PO through it 1:1 before the leadership meeting. Then the sponsor. Then the group. Same magnitude of change, completely different reception. Closed inside the window, ongoing support clean from day 1.",
      },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "HQ executive. Relationship I held.", type: "exec" },
      { team: "China Site PO", role: "The trust-rebuild work. The actual job.", type: "client" },
      { team: "China Factory Ops", role: "Primary consumer. Reached them through the site PO.", type: "client" },
      { team: "HQ Supply Chain", role: "Strategic consumer. Weekly check-in.", type: "client" },
      { team: "US Delivery Lead", role: "Engineering anchor. Designed the cadence with me.", type: "internal" },
      { team: "India Pod", role: "Execution. Async cadence I ran.", type: "internal" },
      { team: "Account Lead", role: "Regional cover.", type: "internal" },
    ],

    decisions: [
      {
        decision: "Flipped live weekly cadence to async-first written in week two.",
        tradeoff: "Lost the engagement rhythm leadership liked.",
        risk: "Across three timezones, the alternative was 24-hour decision lag.",
        outcome: "Got the cadence call right. Did it the wrong way. Spent three weeks rebuilding trust I'd burned.",
      },
      {
        decision: "LNY re-baseline went to the China PO 1:1 before the group meeting.",
        tradeoff: "Added calendar overhead on top of a tight schedule.",
        risk: "Repeating the week-two mistake on a higher-stakes call.",
        outcome: "Re-baseline became a co-decision. Trust held through cutover.",
      },
      {
        decision: "Front-loaded vendor work, back-loaded client validation around LNY.",
        tradeoff: "Added schedule complexity in an already tight window.",
        risk: "Cutover slipping past Lunar New Year, outside the six weeks.",
        outcome: "Closed inside the window. Vendor and client work both complete.",
      },
      {
        decision: "Designed for ongoing-support handover from week one, not at cutover.",
        tradeoff: "Heavier weekly build.",
        risk: "Support team inherits a black box, replays our work to operate it.",
        outcome: "Ongoing support operational from day 1 post-cutover. No inheritance debt.",
      },
    ],

    impact: [
      { value: "On time", label: "Closed inside six weeks", tone: "primary" },
      { value: "3 TZ", label: "Async cadence held" },
      { value: "Rebuilt", label: "Trust with China-site PO", tone: "ok" },
      { value: "LNY", label: "Sequenced without slippage", tone: "ok" },
      { value: "Clean KT", label: "Support team day 1" },
    ],

    beforeAfter: {
      before: [
        "Six-week window. Three timezones. LNY three weeks in.",
        "Live weekly cadence meant 24-hour decision lag across the gap.",
        "Week 2 — made the right call the wrong way. Burned trust.",
        "Risk of support team inheriting a black box at cutover.",
      ],
      after: [
        "Closed on time. China PO still in the conversation.",
        "Async-first written cadence. Decision lag gone.",
        "Week 3 — same kind of call, completely different reception.",
        "Support team operational from day 1 of cutover.",
      ],
    },

    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Azure DevOps", "Jira"],
  },

  // ===========================================================================
  // 004
  // ===========================================================================
  {
    id: "pmo-ai-agent-platform",
    number: "004",
    variant: "ai-agents",
    type: "INTERNAL AI · SELF-INITIATED",
    model: "INTERNAL",
    year: "2024–25",
    industry: "Professional Services · Data & AI Consulting",
    domain: "Self-initiated · Built, sold, rolled out",

    headline: "Built six AI agents for the phData delivery team. Nobody asked me to. The hard part wasn't building them. It was getting finance, IT, and the PM team to trust an LLM anywhere near a live invoice.",
    capability: "Self-initiated. No mandate, no budget, no sponsor until I'd earned them. AI PM on what turned into a six-agent product line that other consultants now copy.",

    scale: [
      { value: "6 agents", label: "In production" },
      { value: "1 month", label: "First-agent team adoption" },
      { value: "~8 hrs/wk", label: "PM time freed" },
      { value: "100%", label: "Sign-offs before build" },
      { value: "Innovation Award", label: "Leadership recognition" },
      { value: "Self-initiated", label: "Mine to run" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce", type: "CRM" },
        { name: "Jira", type: "OPS" },
        { name: "Google Drive", type: "API" },
        { name: "Slack", type: "API" },
        { name: "Time-tracking", type: "API" },
      ],
      pipeline: ["Problem discovery (no code)", "Governance alignment first", "Billing-first rollout", "Accuracy logs in public"],
      platform: "Internal agent fleet for delivery PMs",
      consumers: [
        { name: "Delivery PMs", type: "OPS" },
        { name: "Finance", type: "FINANCE" },
        { name: "Sales engineering", type: "EXEC" },
        { name: "Leadership briefings", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "No mandate, no budget, no sponsor until I'd earned them.", severity: "high" },
      { label: "Finance had to trust the output before any agent touched a live invoice.", severity: "high" },
      { label: "PM team won't adopt internal tools without a real accuracy number.", severity: "high" },
      { label: "IT and Security had to sign off on data access. Sequence matters.", severity: "high" },
      { label: "First internal AI build at phData. The pattern I set would be the one everyone copied.", severity: "med" },
      { label: "Cross-team adoption is a rollout problem, not a product launch.", severity: "med" },
    ],

    journey: [
      {
        stage: "DISCOVER",
        title: "Watched my own work for two weeks before touching a tool.",
        detail: "Month-end was three to four hours of copy-paste for me, every program. Watched it by hand with a notepad. Separated what AI could actually do from what was judgment. The roadmap came out of that observation. Without it I would've built six things nobody trusted.",
      },
      {
        stage: "ALIGN",
        title: "Got leadership, security, finance bought in before writing a prompt.",
        detail: "Took the proposal to the CTO office for architecture. To IT and Security for data access. To finance for the accuracy threshold. To leadership for the budget. Governance first, build second. If the first wrong invoice surfaces, the program is over.",
      },
      {
        stage: "SHIP TRUST",
        title: "Billing first. Most measurable, not most demo-able.",
        detail: "Picked the highest-pain, hardest-to-fake workflow. Built an accuracy gate before the agent. Logged every run from day one. Put the accuracy log in the delivery team's dashboard, not just mine. Made the failure mode visible.",
      },
      {
        stage: "SCALE",
        title: "Billing went team-wide. Five more agents followed on the same pattern.",
        detail: "Once billing was running team-wide, the next five had an easier conversation with security and finance. Each one was shorter than the one before. Wrote the build pattern up as a phData internal standard so other consultants could use it.",
      },
    ],

    orchestration: [
      { team: "phData Leadership", role: "Sponsor I earned. Innovation budget.", type: "exec" },
      { team: "phData CTO Office", role: "Architecture sign-off before build.", type: "internal" },
      { team: "IT / Security", role: "Data access review. Sequenced before rollout.", type: "internal" },
      { team: "Finance Team", role: "Accuracy gatekeeper. Co-designed the threshold.", type: "internal" },
      { team: "Delivery PMs", role: "Primary adopters. Usage feedback I ran weekly.", type: "internal" },
      { team: "Sales Engineering", role: "Second-wave adopter cohort.", type: "internal" },
      { team: "Me · Sole AI PM", role: "Built, sold, rolled out.", type: "internal" },
    ],

    decisions: [
      {
        decision: "Walked through CTO, IT/Security, and finance before writing the first prompt.",
        tradeoff: "Two weeks of meetings before any code.",
        risk: "Building first means the first wrong number kills the program.",
        outcome: "Day-one compliance. Security review took weeks instead of quarters. Finance was a partner, not a blocker.",
      },
      {
        decision: "Built billing first because it was measurable, not because it was demo-able.",
        tradeoff: "No flashy demo. Billing isn't a showcase agent.",
        risk: "If billing fails, nothing else gets a second look.",
        outcome: "Billing went team-wide in a month. Cleared the path for everything after it.",
      },
      {
        decision: "Put the accuracy logs in the delivery team's dashboard, not just mine.",
        tradeoff: "Every miss became visible to the whole team.",
        risk: "Visible failures cap adoption at curiosity.",
        outcome: "Team treats the fleet as production tooling instead of an experiment.",
      },
      {
        decision: "Rolled out cohort by cohort. Billing PMs first, then full delivery, then sales eng.",
        tradeoff: "Slower visible adoption.",
        risk: "Big-bang rollout fails at one cohort and stalls everywhere.",
        outcome: "Each cohort had an easier conversation than the one before.",
      },
      {
        decision: "Wrote the build pattern up as a phData internal standard, not just my notes.",
        tradeoff: "Time I could've spent on the next agent.",
        risk: "Standard sits on a wiki and nobody reads it.",
        outcome: "Other consultants are copying the pattern for their own builds now.",
      },
      {
        decision: "Pitched the program to leadership as freeing PM time for account growth, not as cost savings.",
        tradeoff: "Slower budget approval.",
        risk: "Cost savings is a defensive story. Growth is the one leadership invests in.",
        outcome: "Innovation Award. Ongoing executive cover for the fleet.",
      },
    ],

    impact: [
      { value: "6", label: "Agents in production", tone: "ai" },
      { value: "1 month", label: "First-agent team adoption", tone: "primary" },
      { value: "~8 hrs/wk", label: "PM time freed for accounts", tone: "ok" },
      { value: "Innovation Award", label: "phData internal recognition", tone: "ai" },
      { value: "Pattern", label: "Other consultants now using", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "PMs spending three to four hours per program, per month, on manual admin.",
        "No internal AI program at phData. Nobody had shipped one.",
        "Senior PM time locked into admin, not account growth.",
        "Finance and Security skeptical of LLM outputs near client work.",
      ],
      after: [
        "Six agents in production. ~8 hours/week recovered per PM.",
        "Documented internal AI pattern other consultants now copy.",
        "PM time freed for account growth and stakeholder work.",
        "Finance and Security as partners on the program, not blockers.",
      ],
    },

    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Jira MCP"],

    agents: [
      {
        name: "Month-End Billing Reconciler",
        replaces: "Three to four hours of time-tracking-vs-budget copy-paste every month, every program.",
        adopters: "Every delivery PM at month-end. Finance reviews the output.",
        tools: ["Glean", "Salesforce MCP", "Sheets"],
        output: "Finance-ready discrepancy summary with audit trail.",
        status: "live",
      },
      {
        name: "Sprint Health Scorer",
        replaces: "Cross-program sprint review I used to do by hand each week.",
        adopters: "Delivery PMs across active programs. Weekly.",
        tools: ["Jira MCP", "Slack MCP", "Glean"],
        output: "Ranked sprint scorecard with PM action queue.",
        status: "live",
      },
      {
        name: "Project Risk Scanner",
        replaces: "Two-hour Friday risk checklist across four-plus active programs.",
        adopters: "Delivery PMs and account leads. Weekly escalation queue.",
        tools: ["Glean", "Jira MCP", "Salesforce MCP"],
        output: "Risk heatmap with owner and timing.",
        status: "live",
      },
      {
        name: "Leadership Deck Drafter",
        replaces: "Half a day of exec briefing prep before each leadership review.",
        adopters: "Delivery PMs and sales eng. Pre-meeting prep.",
        tools: ["Glean", "Google Apps Script"],
        output: "Audience-tuned deck draft with cited sources.",
        status: "live",
      },
      {
        name: "Budget Forecaster",
        replaces: "Manual monthly burn projection against contract budget.",
        adopters: "PMs piloting. Finance reviews.",
        tools: ["Glean", "Salesforce MCP"],
        output: "Monthly forecast with variance flags.",
        status: "beta",
      },
      {
        name: "Status Note Composer",
        replaces: "Friday status notes drafted from scratch by every PM.",
        adopters: "PMs piloting on Friday cadence.",
        tools: ["Glean", "Jira MCP", "Salesforce MCP"],
        output: "Stakeholder-tuned status with evidence links.",
        status: "beta",
      },
    ],
  },
];
