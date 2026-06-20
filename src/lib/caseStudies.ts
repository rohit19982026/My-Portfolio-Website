export type SourceType = "ERP" | "CRM" | "OPS" | "API" | "MES" | "MARKETING" | "TELEMETRY" | "LAKE" | "WAREHOUSE";
export type ConsumerType = "EXEC" | "OPS" | "PRODUCT" | "ANALYTICS" | "FINANCE" | "MARKETING";
export type OrchestrationType = "client" | "internal" | "vendor" | "exec" | "ic" | "arch" | "pm";

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
  // 001 — Legacy data warehouse migration, large insurance brokerage
  // ===========================================================================
  {
    id: "fdw-snowflake-migration",
    number: "001",
    variant: "data-platform",
    type: "DATA MIGRATION",
    model: "T&M",
    year: "2023–24",
    industry: "Insurance",
    domain: "Insurance · US",

    headline: "The legacy code was undocumented, the engineer who wrote it had left, and nobody had scoped it. The migration shipped. The budget did not hold.",

    capability: "Ran this engagement end to end — delivery, client relationship, and budget. The project went over budget. This is the one I point to when explaining why unknown dependencies go on the risk log before sprint one, and why the EAC conversation happens the week the number moves, not the week the margin is gone.",

    scale: [
      { value: "Unscoped", label: "legacy .NET code inside a six-year-old data warehouse — no documentation, no one at the client who could explain it" },
      { value: "3", label: "factors hit at once: unscoped code, no SME available, client-driven delay" },
      { value: "Zero", label: "change orders raised before the overrun — the exact gap between what happened and what process required" },
      { value: "Late", label: "EAC flag — the client conversation happened after options had already narrowed" },
      { value: "Delivered", label: "— the data warehouse moved to Snowflake and client reporting came back up on the new platform" },
      { value: "1 rule", label: "applied to every engagement since: any system with no SME and no documentation goes on the risk log at kickoff" },
    ],

    ecosystem: {
      sources: [
        { name: "Legacy data warehouse", type: "WAREHOUSE" },
        { name: "Insurance operations", type: "OPS" },
        { name: "Finance reporting", type: "ERP" },
        { name: "Claims processing", type: "API" },
      ],
      pipeline: [
        "SOW scoped without visibility into legacy .NET code complexity",
        "Risk log missing the SME dependency at kickoff",
        "EAC climbed sprint by sprint as undocumented complexity surfaced",
        "Migration completed — financial escalation process updated going forward",
      ],
      platform: "Snowflake",
      consumers: [
        { name: "Finance reporting", type: "FINANCE" },
        { name: "Operations teams", type: "OPS" },
        { name: "Executive dashboards", type: "EXEC" },
        { name: "Analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "The data warehouse had six years of business logic in .NET code written by one engineer who had since left the company. No documentation existed. Nobody at the client could explain what the code did or why it was built that way. That complexity was not visible in the SOW and was not scoped before delivery started.", severity: "high" },
      { label: "The missing SME — the person who understood the legacy system — was never flagged as a project risk at kickoff. It should have been on the risk log from day one. When complexity surfaced sprint by sprint, there was no pre-agreed process to handle it.", severity: "high" },
      { label: "A client-driven delay hit at the same time as the unscoped code. Both together pushed hours above what the contract anticipated. EAC (Estimate at Completion — the forward projection of total project cost) started climbing over bookings.", severity: "high" },
      { label: "PMO process requires a dedicated overrun message the moment EAC turns red. That message reached the client later than it should have — after options had narrowed rather than while they were still open.", severity: "med" },
      { label: "Scope additions that surfaced while untangling the unscoped code were not consistently routed through change control. Some were absorbed without a formal decision or a paper trail.", severity: "med" },
      { label: "The project delivered — migration completed, reporting moved to Snowflake. The financial outcome was the piece that did not match the plan, and the cause was identifiable from the first week.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "The unscoped code was not on the risk log. It needed to be there before sprint one.",
        detail: "The SOW was built on the assumption that the legacy data warehouse was a known system. It was not. Six years of business logic sat inside .NET code written by one engineer who had left. No documentation at the client side explained what it did. The right move at kickoff was to flag 'legacy system with no SME and no documentation' as a project risk — with a discovery workstream, a timeline estimate for reverse-engineering the code, and a change control process pre-agreed with the client for when complexity surfaced. Delivery started instead on a scoped plan that had not accounted for the unknown.",
      },
      {
        stage: "02",
        title: "EAC climbed every sprint as the hidden complexity came to the surface.",
        detail: "Sprint by sprint, the team found more undocumented behavior — custom business rules, edge cases, integrations not in any spec. Each discovery added hours. EAC crossed bookings while the client-driven delay was also adding burn. On a T&M engagement, EAC over bookings is the signal to flag health Yellow immediately, send a financial update to leadership and the account team, and open the change order conversation with the client that week. That conversation happened, but not that week.",
      },
      {
        stage: "03",
        title: "The overrun conversation with the client happened — after the options had already narrowed.",
        detail: "The client was told about the budget trajectory. The conversation was honest. But it came later in the overrun than process required — and later than needed to preserve options. An earlier flag would have created room for a formal change order on the unscoped work, a scope reduction to stay within budget, or an agreed timeline extension. By the time the conversation happened, the project was deep enough into the overrun that it was about what had already occurred rather than what could still be done. Health moved to Yellow. The go-to-green plan went into the status report. The migration continued.",
      },
      {
        stage: "04",
        title: "Migration delivered. The lessons are applied to every engagement since.",
        detail: "The Snowflake migration completed. Client reporting moved to the new platform. The financial outcome did not match the plan. What changed after: any system with no SME and no documentation goes on the risk log before sprint one, with a note on what discovery will cost. EAC is checked in the weekly health scan and the client conversation happens the same week it trends over. Change orders are opened the first time scope additions appear — not after several have been absorbed. These are not principles. They are the specific decisions that would have changed the outcome on this one.",
      },
    ],

    orchestration: [
      { team: "Client Data Lead", role: "Closest person to the legacy system. Should have been formally confirmed as the SME resource for the undocumented .NET code from kickoff — not treated as available on request.", type: "client" },
      { team: "Client Sponsor", role: "Budget authority. Received the overrun conversation after options had already narrowed. Would have benefited from an earlier flag while a change order or scope cut was still on the table.", type: "exec" },
      { team: "Data Engineers", role: "Surfaced the undocumented complexity sprint by sprint. Delivering at pace against a scope that had not accounted for what they kept finding.", type: "ic" },
      { team: "Solutions Architect", role: "Designed the Snowflake target environment. Adapted the architecture as the legacy system kept revealing itself.", type: "arch" },
      { team: "Account Executive", role: "Commission is margin-based on T&M. An earlier EAC flag gives the AE earlier visibility and earlier options to respond commercially.", type: "internal" },
      { team: "Delivery Leadership", role: "The dedicated overrun message — required by PMO process the moment EAC turns red — should have reached them earlier in the overrun window.", type: "internal" },
      { team: "Program Lead", role: "Single point of accountability. The decisions that would have changed the financial outcome — earlier risk flagging, earlier escalation, change control from the first addition — sat here.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Did not flag legacy code with no SME and no documentation as an explicit risk at kickoff.",
        tradeoff: "Project moved forward on a scoped plan that treated the legacy system as a known quantity.",
        risk: "Unknown complexity in a legacy system is not a risk to monitor — it is a risk to scope explicitly, with a contingency and a process ready for when it surfaces.",
        outcome: "When complexity surfaced, there was no pre-agreed change control process, no budget contingency, and no formal basis for the scope conversation.",
      },
      {
        decision: "The EAC overrun message went to the client later than PMO process requires.",
        tradeoff: "The team was still moving through scope and there was reasonable hope the hours might stabilize.",
        risk: "Every week of delay on an overrun conversation is a week of options that disappear — change order, scope reduction, and extension all become harder to negotiate the later they are raised.",
        outcome: "Conversation happened after options had already narrowed. The margin absorbed what remained.",
      },
      {
        decision: "Scope additions from the unscoped code discovery were absorbed without change orders.",
        tradeoff: "Routing each addition through formal change control felt slow mid-sprint when the team was already behind.",
        risk: "Informal absorption on a T&M engagement with no paper trail means no basis for financial reconciliation and no visibility to the AE or commercial team.",
        outcome: "No documentation on the absorbed additions. Nothing to reference in the post-project financial review.",
      },
      {
        decision: "Completed the migration to the committed scope despite the overrun.",
        tradeoff: "The alternative — stopping and renegotiating mid-project — was available and was not taken.",
        risk: "Finishing a project over budget without formal client acknowledgment means the entire margin hit is absorbed internally with no commercial record.",
        outcome: "Client received a working Snowflake migration. Reporting moved platforms. The overrun was absorbed. Every engagement since has started with the lessons from this one.",
      },
    ],

    impact: [
      { value: "Delivered", label: "data warehouse migrated to Snowflake — client reporting operational on the new platform", tone: "ok" },
      { value: "Overrun", label: "three factors compounding: undocumented legacy code, no SME, client-driven delay", tone: "primary" },
      { value: "Zero", label: "change orders before the overrun — the gap between what happened and what PMO process requires", tone: "ok" },
      { value: "Late", label: "EAC flag — client conversation came after the options had narrowed, not while they were open", tone: "ok" },
      { value: "Applied", label: "to every engagement since — unknown systems on the risk log at kickoff, EAC conversation the week it moves", tone: "primary" },
    ],

    beforeAfter: {
      before: [
        "Legacy .NET code off the risk log — no documentation, no SME confirmed, no change control process ready for when the complexity surfaced.",
        "EAC tracked weekly but the overrun flag reached the client after options had already narrowed.",
        "Scope additions from legacy discovery absorbed informally — no change orders, no paper trail, no visibility for AE or commercial team.",
        "Budget conversation happened when the overrun was already baked in, not while a change order or scope cut was still possible.",
      ],
      after: [
        "Migration delivered — data warehouse moved to Snowflake, client reporting back operational on the new platform.",
        "Unknown legacy systems go on the risk log at kickoff on every engagement, SME availability confirmed before sprint one.",
        "EAC overrun message goes to the client the week EAC first crosses bookings — not later.",
        "Change control opened the first time scope additions appear, regardless of size.",
      ],
    },

    stack: ["Snowflake", "Legacy .NET", "Certinia", "Jira", "Sigma PMO Dashboard"],
  },

  // ===========================================================================
  // 002 — Multi-workstream intelligence program, construction and engineering firm
  // ===========================================================================
  {
    id: "construction-intelligence-program",
    number: "002",
    variant: "data-platform",
    type: "PROGRAM DELIVERY",
    model: "T&M",
    year: "2024",
    industry: "Construction & Engineering",
    domain: "Construction · US",

    headline: "Multiple workstreams, multiple teams, and executives who needed one coherent answer to 'how is the program going' — not five separate project updates.",

    capability: "Ran this as a program, not a project. Owned the cross-workstream dependencies, the roadmap across all delivery tracks, and the executive communication that kept senior leadership bought in through a phased multi-year build.",

    scale: [
      { value: "Multi-phase", label: "program spanning multiple workstreams with separate teams and overlapping timelines" },
      { value: "1 roadmap", label: "owned across all workstreams — what kept separate teams oriented to the same outcome" },
      { value: "Weekly", label: "executive communication cadence — one program view instead of per-project status updates" },
      { value: "Pre-sprint", label: "dependency resolution — cross-team blockers surfaced in planning, not mid-sprint" },
      { value: "Phased", label: "delivery with roadmap updated at each boundary based on what the prior phase revealed" },
      { value: "Expanded", label: "— program grew as each phase delivered and leadership confidence in the roadmap held" },
    ],

    ecosystem: {
      sources: [
        { name: "Project management systems", type: "OPS" },
        { name: "Field operations data", type: "OPS" },
        { name: "Finance and cost tracking", type: "ERP" },
        { name: "Engineering systems", type: "API" },
        { name: "Procurement data", type: "OPS" },
      ],
      pipeline: [
        "Cross-workstream dependency map built before each phase started",
        "Weekly program health check across all workstreams",
        "Executive communication built around program outcomes, not workstream-level status",
        "Roadmap updated at each phase boundary based on what delivery revealed",
      ],
      platform: "Snowflake + analytics layer",
      consumers: [
        { name: "Operations leadership", type: "OPS" },
        { name: "Executive sponsors", type: "EXEC" },
        { name: "Finance", type: "FINANCE" },
        { name: "Project managers (client side)", type: "OPS" },
      ],
    },

    challenges: [
      { label: "Multiple workstreams with separate teams meant every team was making decisions that affected the others. Without someone explicitly owning the dependencies between them, blockers showed up mid-sprint instead of being surfaced before the sprint started.", severity: "high" },
      { label: "Executive stakeholders needed a single program-level view — where the whole thing was, what was at risk, and what decision was needed from them. What existed before was per-project status updates that did not add up to a coherent program picture.", severity: "high" },
      { label: "Each workstream team had its own interpretation of the roadmap. Without a program-level roadmap that superseded individual team plans, the teams were orienting to different versions of what the program was trying to accomplish.", severity: "high" },
      { label: "Cross-workstream dependencies were being identified by teams after they had already become blockers. The program needed a dependency review that surfaced them before sprints started, not during.", severity: "med" },
      { label: "Phased delivery created recurring decision points: what to carry forward, what to cut, and how to update the roadmap based on what was learned. Those decisions needed program-level input, not just workstream-level.", severity: "med" },
      { label: "Executive confidence in the program depended on consistent communication that reflected reality — including when things were at risk, not just when they were green.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Mapped the cross-workstream dependencies before phase one started, not after.",
        detail: "Before any workstream started its first sprint, I built the cross-workstream dependency map — which teams' output was input for which other teams, and where timing overlaps created exposure. This was not a one-time artifact. It was updated before each phase and reviewed weekly in the program health check. Dependencies found in that mapping determined sprint sequencing across workstreams. When a dependency existed, the upstream workstream's sprint was staged ahead of the downstream one — not run in parallel and hoped to align. Blockers that would have shown up mid-sprint were showing up in planning instead.",
      },
      {
        stage: "02",
        title: "Built the executive communication around program outcomes, not workstream status.",
        detail: "Senior leadership did not need to know which sprint each workstream was in. They needed to know whether the program was on track to deliver the capability it had promised, what was at risk, and what needed a decision from them. I built the executive communication cadence around that frame — one program view per week, structured around outcomes against the roadmap, risks with a plan attached, and a clear ask when a decision was needed. When something was yellow or red, leadership heard about it from me before the color changed in the system. The goal was to arm them to act, not to update them on what had already happened.",
      },
      {
        stage: "03",
        title: "Owned the decisions that fell between workstreams — the ones that did not belong to any single team.",
        detail: "The hardest part of a multi-workstream program is not running any individual workstream — it is owning the decisions that fall in the gaps between them. When two teams had conflicting interpretations of a shared data standard, that was a program-level decision. When a workstream needed to accelerate to unblock another, that was a resourcing call at the program level. When a dependency created a timing conflict between two sprints, it needed resolution before either sprint started. These decisions did not belong to any team lead. They sat at the program level, and they needed an answer before they became mid-sprint blockers or escalations.",
      },
      {
        stage: "04",
        title: "Updated the roadmap at each phase boundary based on what the prior phase actually revealed.",
        detail: "Each phase produced new information — about what the client's data actually looked like, what stakeholders actually needed, what the next phase should focus on. At each phase boundary I ran a structured review: what did we learn, what does it imply for the roadmap, and what decisions do we need from leadership to move forward. The roadmap was updated before the next phase started — not carried forward because it would have been uncomfortable to revisit it. That kept the program oriented to current reality rather than to the plan as it was written before delivery began.",
      },
    ],

    orchestration: [
      { team: "Executive Sponsors", role: "Needed one coherent program view per week — outcomes against the roadmap, risks with plans attached, and a clear ask when a decision was needed from them.", type: "exec" },
      { team: "Client Program Team", role: "Client-side stakeholders managing their own workstreams. Needed a shared dependency map and one program-level roadmap to orient to.", type: "client" },
      { team: "Workstream Leads", role: "Each leading a separate delivery track. Dependencies between tracks had to be surfaced at the program level before they became sprint-level blockers for individual teams.", type: "ic" },
      { team: "Data Engineers", role: "Delivering across multiple workstreams. Cross-workstream coordination had to be resolved before their sprint planning — not handed to them as mid-sprint surprises.", type: "ic" },
      { team: "Solutions Architect", role: "Owned the technical architecture across workstreams — the one person who had to understand all the technical dependencies at the program level.", type: "arch" },
      { team: "Account Executive", role: "Phase expansions required commercial conversations. Kept informed of program health and roadmap evolution so renewal conversations were never cold starts.", type: "internal" },
      { team: "Program Lead", role: "Owned the program roadmap, the cross-workstream dependency map, and the executive communication. The connective tissue between all the teams.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Built the cross-workstream dependency map before phase one started rather than letting teams surface dependencies as they hit them.",
        tradeoff: "Required a structured planning session with all workstream leads before any delivery started — time that teams wanted to spend on sprint work.",
        risk: "Without it, dependencies surface mid-sprint as blockers and force reactive replanning under delivery pressure.",
        outcome: "Dependencies found in mapping determined sprint sequencing across teams. Mid-sprint blockers driven by cross-team dependencies dropped significantly through the program.",
      },
      {
        decision: "Structured executive communication around program outcomes and decisions needed — not workstream-level status reports.",
        tradeoff: "Synthesizing multiple workstreams into one coherent program view took more work than forwarding status reports from each team.",
        risk: "Per-workstream updates do not give leadership what they need to make program-level decisions — and erode executive confidence in the PM's grasp of the whole.",
        outcome: "Executives had one place to see program health, one escalation point, and one clear ask when a decision was needed. Program confidence held through phases where individual workstreams had yellow status.",
      },
      {
        decision: "Updated the roadmap at each phase boundary based on what the prior phase revealed rather than carrying the original plan forward unchanged.",
        tradeoff: "Phase boundary roadmap reviews created a recurring conversation with leadership about changing the plan — which some stakeholders resisted.",
        risk: "Carrying a roadmap forward that no longer reflects reality is a governance fiction — the team is executing against a plan that stopped matching the situation.",
        outcome: "Each phase started with a roadmap that reflected what was actually known at that point. The program did not deliver against an outdated plan.",
      },
      {
        decision: "Took ownership of decisions that fell between workstreams rather than leaving them for teams to resolve.",
        tradeoff: "Inserting program-level decisions into workstream dynamics required team leads to accept that some calls sat above their team.",
        risk: "Decisions between workstreams left to teams resolve slowly or not at all — the natural bias is to defer to whoever has the more urgent delivery pressure.",
        outcome: "Cross-workstream conflicts resolved at the program level before they created sprint-level blockers.",
      },
    ],

    impact: [
      { value: "1 roadmap", label: "owned across all workstreams — executives and teams oriented to the same plan", tone: "primary" },
      { value: "Weekly", label: "program view to executives — one coherent picture, not per-project status", tone: "ok" },
      { value: "Pre-sprint", label: "dependency resolution — cross-team blockers caught in planning, not mid-sprint", tone: "ok" },
      { value: "Expanded", label: "— program grew phase by phase as delivery held and executive confidence stayed intact", tone: "primary" },
      { value: "Phase-by-phase", label: "roadmap updates — plan reflected current reality at each boundary, not original scope", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Multiple teams running separate workstreams with no program-level dependency map — blockers showing up mid-sprint instead of in planning.",
        "Executives receiving per-workstream status updates with no coherent program view connecting them.",
        "No single program roadmap — each workstream oriented to its own interpretation of what the program was trying to accomplish.",
        "Phase decisions made workstream by workstream with no structured review of what the prior phase had actually revealed.",
      ],
      after: [
        "Cross-workstream dependency map built before each phase — sprint sequencing determined by dependencies, not discovered during sprints.",
        "Weekly executive communication structured around program outcomes, risks with plans, and decisions needed — not workstream-level status.",
        "One program roadmap owned at the program level, updated at each phase boundary based on delivery reality.",
        "Program expanded phase by phase as delivery held and executive confidence in the roadmap stayed intact.",
      ],
    },

    stack: ["Snowflake", "Tableau", "dbt", "Certinia", "Jira", "Sigma PMO Dashboard"],
  },

  // ===========================================================================
  // 003 — Analytics delivery, global restaurant chain, no runway
  // ===========================================================================
  {
    id: "analytics-delivery-zero-runway",
    number: "003",
    variant: "data-platform",
    type: "FAST DELIVERY",
    model: "T&M",
    year: "2024",
    industry: "Restaurant & Hospitality",
    domain: "QSR · US",

    headline: "No discovery phase. No knowledge transfer from the prior team. The client needed value by the end of sprint one. We delivered it.",

    capability: "Owned the delivery structure on an engagement that had none of the preparation a normal project starts with. Sequenced the work to create momentum from day one and absorbed the pressure of the rushed start so the team could focus on the work.",

    scale: [
      { value: "Zero", label: "knowledge transfer from the prior team — delivery started from cold" },
      { value: "Zero", label: "discovery phase in the contract — no window to understand the environment before building" },
      { value: "Sprint 1", label: "value delivered — working output before the normal onboarding window would have closed" },
      { value: "Day 1", label: "team productive and sequenced without a prepared environment or clean handoff" },
      { value: "On track", label: "throughout — delivery rhythm held from a standing start" },
      { value: "Recognized", label: "— client praised the team for delivering without the runway a normal engagement would have" },
    ],

    ecosystem: {
      sources: [
        { name: "POS systems", type: "OPS" },
        { name: "Supply chain data", type: "OPS" },
        { name: "Marketing platforms", type: "MARKETING" },
        { name: "Finance systems", type: "ERP" },
        { name: "Franchise operations", type: "OPS" },
      ],
      pipeline: [
        "Discovery and delivery run in parallel from day one — not sequentially",
        "Sprint one sequenced around highest-confidence scope, not the most logical technical order",
        "Context gaps triaged in hours — block, work around, or escalate",
        "Team shielded from pressure of rushed start so delivery rhythm held",
      ],
      platform: "Snowflake + analytics layer",
      consumers: [
        { name: "Operations teams", type: "OPS" },
        { name: "Marketing", type: "MARKETING" },
        { name: "Finance", type: "FINANCE" },
        { name: "Franchise leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "No knowledge transfer from the prior team. The work started without the context a normal handoff provides — existing architecture, data models, past decisions, known limitations. The team had to build that understanding while delivering at the same time.", severity: "high" },
      { label: "No discovery phase was in the contract. The engagement started directly in delivery. Understanding the client's environment had to happen in parallel with building — not before it.", severity: "high" },
      { label: "The client expected working output by the end of sprint one. Not a status update, not a design doc — working analytics on their data. On an engagement with no runway, that required sequencing work so the highest-value piece came first, not the most technically logical piece.", severity: "high" },
      { label: "The team was under pressure from the rushed start. Without a PM absorbing that pressure, the natural response is to surface it as a blocker: 'we cannot deliver until we have the context.' That response is not wrong. It is also not useful.", severity: "med" },
      { label: "Context gaps discovered mid-sprint risked disrupting delivery rhythm. Each unknown had to be triaged fast: work around it, block and wait, or escalate. Those decisions needed to happen in hours, not days.", severity: "med" },
      { label: "The client's environment had constraints that were not documented anywhere. Some only surfaced when the team ran into them in delivery.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Ran discovery and delivery in parallel from day one — not sequentially.",
        detail: "A normal engagement has a discovery phase before sprint one. This one did not. The work was sequenced so the team was delivering on the best-understood pieces of scope while discovery was running in parallel on the rest. That required a specific decision at the start: which parts of scope could be started safely without the full context picture, and which needed to wait until more was known. The high-confidence pieces went into sprint one. The ambiguous pieces went into a discovery queue running alongside. The team produced value in sprint one without waiting for an onboarding window the contract had not budgeted.",
      },
      {
        stage: "02",
        title: "Absorbed the pressure of the rushed start so the team could focus on the work.",
        detail: "This engagement had all the conditions for a team to feel behind before they had started — no KT, no discovery window, immediate delivery expectations. Without a PM sitting between those conditions and the team, the natural response is to surface them as blockers. My job was to hold that space. I managed the client's discovery questions directly, made the sequencing calls that gave sprint one a clear path, and held the team's right to not be in conversations about things they did not need to know yet. The team stayed focused on the work. The pressure stayed at the PM level.",
      },
      {
        stage: "03",
        title: "Triaged context gaps in hours — block, work around, or escalate, not sit in ambiguity.",
        detail: "On an engagement with no KT and no discovery runway, context gaps were a daily occurrence. Something in a data pipeline with no documentation. A system behaving differently from what the architecture diagram implied. A data quality issue that changed the sprint assumptions. Each one needed a fast decision: could the team work around it, or did it need to block? Could someone at the client answer it within the sprint, or would it take longer? I ran those triage calls quickly. The goal was to resolve or reroute within a few hours, not let ambiguity sit for days while the sprint stalled. Gaps that could not be resolved fast were scoped out of the sprint and logged.",
      },
      {
        stage: "04",
        title: "Value delivered from sprint one. Client recognized the team for it specifically.",
        detail: "By the end of sprint one, the team had delivered working output on the client's data. The client noticed and named it specifically — the team's ability to deliver without a prepared runway was the thing they had not expected. Engagements with a rushed start usually produce one of two results: a team that slows down and demands preparation it is not going to get, or a team that rushes past quality and creates debt. This one produced a third: a team that delivered well from day one because the delivery structure made it possible.",
      },
    ],

    orchestration: [
      { team: "Client Stakeholders", role: "Expecting value from sprint one. Needed to be managed toward realistic sprint commitments while the team built context in parallel with delivery.", type: "client" },
      { team: "Client Data Team", role: "Holders of the undocumented institutional knowledge. Had to be drawn into knowledge-sharing while delivery was already underway — not in a sequential KT window.", type: "client" },
      { team: "Data Engineers", role: "Delivering without a full context picture. Needed sequencing decisions that put them on work they could move without the knowledge gaps slowing them down.", type: "ic" },
      { team: "Analytics Engineers", role: "Building the analytics layer while the data model was still being discovered. Required close coordination on assumptions made under uncertainty.", type: "ic" },
      { team: "Solutions Architect", role: "Made early architectural calls on limited information — then held them open enough to adjust as the full picture emerged.", type: "arch" },
      { team: "Account Executive", role: "Managed the commercial expectations on the client side — what was realistic for sprint one given the actual start conditions.", type: "internal" },
      { team: "Program Lead", role: "Ran discovery and delivery simultaneously. Owned the sequencing calls, absorbed the pressure of the rushed start, and triaged context gaps fast enough not to lose sprint rhythm.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Ran discovery and delivery in parallel from day one rather than delaying sprint one until a discovery window completed.",
        tradeoff: "Parallel tracks created coordination overhead and some rework when discovery findings contradicted sprint one assumptions.",
        risk: "Waiting for a discovery window the contract had not budgeted meant missing the client's sprint one expectations and stalling momentum that had no good restart.",
        outcome: "Working output delivered in sprint one. Discovery findings fed into sprint two sequencing without blocking sprint one.",
      },
      {
        decision: "Sequenced sprint one around the highest-confidence scope items rather than the most technically logical order.",
        tradeoff: "The technically correct sequence would have started with foundational components that were not yet understood.",
        risk: "A technically-ordered sequence on a no-KT engagement stalls on foundational unknowns before anything valuable reaches the client.",
        outcome: "Sprint one delivered value on the best-understood pieces of scope. Foundational work followed once the context picture was clearer.",
      },
      {
        decision: "Triaged context gaps in hours — block, work around, or escalate — rather than letting them accumulate.",
        tradeoff: "Fast triage decisions made without full information occasionally led to rework when the full picture emerged.",
        risk: "Letting gaps sit unresolved for days kills sprint momentum on a short-cycle engagement where the client expects a sprint one result.",
        outcome: "Sprint rhythm held throughout. The team rarely sat in ambiguity for more than a few hours on a blocking question.",
      },
      {
        decision: "Absorbed the pressure of the rushed start rather than surfacing it as a team-level blocker.",
        tradeoff: "Absorbing upward meant carrying more uncertainty at the PM level while the team was delivering.",
        risk: "Passing the pressure to the delivery team on a high-expectations engagement is a fast path to quality problems and team frustration.",
        outcome: "Team stayed focused. Client received the delivery they were expecting. Recognition came specifically for performing under conditions designed to make that hard.",
      },
    ],

    impact: [
      { value: "Sprint 1", label: "working output delivered before the normal KT window would have closed", tone: "primary" },
      { value: "Zero", label: "discovery phase — team built context and delivered at the same time", tone: "ok" },
      { value: "On track", label: "throughout — delivery rhythm held from a standing start with no prepared runway", tone: "ok" },
      { value: "Recognized", label: "by the client specifically for delivering without the preparation a normal engagement would have", tone: "primary" },
      { value: "Day 1", label: "team productive and sequenced — no waiting for ideal conditions that were not coming", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "No KT from the prior team. Work started cold with no context about existing architecture, data models, or past decisions.",
        "No discovery phase. Understanding the client's environment had to happen at the same time as delivery.",
        "Team under pressure from the rushed start — conditions set up to produce either a slowdown or a quality cut.",
        "Context gaps discovered mid-sprint with no process for triaging them fast enough not to lose sprint momentum.",
      ],
      after: [
        "Discovery and delivery run in parallel from day one — high-confidence scope in sprint one, ambiguous pieces in a parallel discovery queue.",
        "Sprint one delivered working output. Client's expectation was met without the preparation a normal engagement would have had.",
        "Team stayed focused on delivery. PM absorbed the pressure of the rushed start and managed it upward.",
        "Context gaps triaged in hours. Sprint rhythm held throughout the engagement.",
      ],
    },

    stack: ["Snowflake", "dbt", "Fivetran", "Tableau", "Certinia", "Jira"],
  },

  // ===========================================================================
  // 004 — Data platform, healthcare benefits technology company
  // ===========================================================================
  {
    id: "healthcare-platform-partnership",
    number: "004",
    variant: "data-platform",
    type: "DATA PLATFORM",
    model: "T&M",
    year: "2023–25",
    industry: "Healthcare Technology",
    domain: "Healthcare Tech · US",

    headline: "The project was scoped to build a platform. The client ended the engagement using the word 'partner' instead of 'vendor.' That word does not come from shipping tickets.",

    capability: "Ran this as more than a delivery engagement from the start. Owned the value story, the senior client relationships, and the commercial conversations that converted a one-time build into a long-term account.",

    scale: [
      { value: "Delivered", label: "committed scope on time — the foundation that made everything else possible" },
      { value: "Expanded", label: "— engagement grew beyond the original scope as trust and relationship deepened" },
      { value: "Strategic partner", label: "— the phrase the client used to describe the relationship at engagement end" },
      { value: "Senior", label: "client relationships built at the leadership level during delivery, not saved for QBR time" },
      { value: "Recurring", label: "account — delivery converted to continued partnership, not a one-and-done project" },
      { value: "Business terms", label: "value story — outcomes the client's leadership could see, not sprint metrics" },
    ],

    ecosystem: {
      sources: [
        { name: "Benefits administration", type: "OPS" },
        { name: "Claims data", type: "OPS" },
        { name: "Provider network data", type: "API" },
        { name: "Member data", type: "API" },
        { name: "Finance systems", type: "ERP" },
      ],
      pipeline: [
        "Delivery structured to build trust at the client's senior level, not just project team",
        "Value story built in business outcome terms throughout — not introduced at QBR",
        "Senior relationship investment alongside delivery from the start",
        "Commercial expansion conversation positioned while delivery was underway",
      ],
      platform: "Snowflake + analytics layer",
      consumers: [
        { name: "Operations teams", type: "OPS" },
        { name: "Finance", type: "FINANCE" },
        { name: "Executive leadership", type: "EXEC" },
        { name: "Product team", type: "PRODUCT" },
      ],
    },

    challenges: [
      { label: "The engagement was scoped as a build project. Without deliberate work to position it differently, it would end as one — delivered, closed, done. The commercial opportunity was an ongoing platform partnership. That outcome required PM work that was not in the SOW.", severity: "high" },
      { label: "The client relationship existed at the working team level. Senior stakeholders were briefed at milestones but not deeply engaged in the value story. Building the trust that produces a 'strategic partner' designation required reaching people who had not been part of day-to-day delivery.", severity: "high" },
      { label: "The value story was being told in delivery terms — sprints completed, features shipped, timelines met. The client's senior leadership needed to hear it in business outcome terms: what changed for their operations, their costs, their ability to make decisions. Those are different narratives.", severity: "high" },
      { label: "Every build engagement has a natural close point — scope done, project ends. Creating the conditions for expansion required starting the commercial conversation before that close, with a business case built during delivery, not assembled at the end.", severity: "med" },
      { label: "The account team needed visibility into the senior relationship health and the value story to position expansion commercially. That required deliberate communication from the PM — not just status updates from the project.", severity: "med" },
      { label: "Without a deliberate account growth strategy, the relationship momentum built during delivery would dissipate at close. Renewals do not happen by default.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Delivered the committed scope — then went further, because delivery alone does not produce 'partner.'",
        detail: "The starting point was the same as any engagement: deliver what was scoped, on time, at the quality the client expected. That happened. But delivery is the table stakes — it produces a 'good vendor' result, not a 'strategic partner' result. The extra work was deliberate. Every sprint demo was framed around what the feature meant for the business, not just what was built. Every status report led with the outcome, not the activity. The goal from day one was to make the client's senior stakeholders understand — in terms they cared about — what the platform was doing for their business.",
      },
      {
        stage: "02",
        title: "Built senior client relationships during delivery — not as something to start at QBR time.",
        detail: "The project relationship was at the working team level. Executive stakeholders were briefed at milestones but had not been deeply engaged in the value story. I invested in those relationships during delivery. The conversations were not project updates. They were questions about what the business was trying to accomplish, what decisions the platform would affect, and what success looked like to leadership. Those conversations changed how senior stakeholders thought about the engagement — and built the trust that made the expansion conversation possible when it came.",
      },
      {
        stage: "03",
        title: "Positioned the expansion conversation while delivery was underway, not at the close meeting.",
        detail: "Every build engagement has natural gravity toward close — scope completed, project ends. Creating a different outcome required active work during delivery to build the commercial case for what came next. I worked with the account team to develop the expansion story while delivery was still running — what the platform could do in its next phase, what the client's business would gain, and why continuing made sense in terms the CFO could evaluate. The expansion conversation was already underway by the time the original scope was three-quarters done. By close, it was not a new idea.",
      },
      {
        stage: "04",
        title: "The client used the word 'partner.' That is the outcome that does not come from the SOW.",
        detail: "At the end of the engagement, the client described the relationship as a long-term strategic partnership. The engagement expanded. That outcome came from the combination of delivery quality and the work that ran alongside it: the senior relationship investment, the value story told in the client's terms, and the commercial positioning started during delivery rather than at the close meeting. The SOW said build a platform. The actual job was to build a platform and make the client want to keep working with us. Those are different scopes.",
      },
    ],

    orchestration: [
      { team: "Client Executive Leadership", role: "Senior stakeholders who needed the value story in business outcome terms — what the platform changed for their operations, costs, and decision-making. Built that relationship during delivery, not at QBR.", type: "exec" },
      { team: "Client Project Team", role: "Day-to-day delivery counterparts. Working relationship was strong. The gap was at the executive level — and closing it required going above the project team.", type: "client" },
      { team: "Account Executive", role: "Commercial lead for the expansion. Kept in sync on the senior relationship and value story so the expansion conversation was positioned before the close meeting.", type: "internal" },
      { team: "Technical Account Lead", role: "Partner on roadmap positioning for expansion. Needed visibility into what the platform's next phase could deliver before the commercial conversation started.", type: "internal" },
      { team: "Data Engineers", role: "Built the platform the value story was about. Delivery quality was the foundation everything else depended on.", type: "ic" },
      { team: "Solutions Architect", role: "Shaped the technical roadmap for the expansion phase alongside delivery of the original scope.", type: "arch" },
      { team: "Program Lead", role: "Owned the delivery, the value story, the senior relationships, and the commercial positioning for expansion. The job that was not in the SOW.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Framed every sprint demo and status report around business outcomes from day one, not delivery activity.",
        tradeoff: "Translating technical delivery into business-outcome language requires more work per communication than a standard status update.",
        risk: "Delivery language keeps the relationship at the project team level. Business outcome language reaches senior stakeholders and builds the case for expansion.",
        outcome: "Senior stakeholders understood what the platform was doing for their business before the expansion conversation started — it was not an introduction at that point.",
      },
      {
        decision: "Invested in senior client relationships during delivery rather than reserving relationship work for QBR.",
        tradeoff: "Senior relationship conversations during delivery take time that could be spent on delivery management.",
        risk: "A senior relationship that only activates at QBR time is not strong enough to support a strategic partner designation or an expansion request.",
        outcome: "Senior stakeholders were already engaged when the expansion conversation happened. The relationship existed before the commercial ask did.",
      },
      {
        decision: "Started the expansion commercial conversation while delivery was three-quarters done, not at the close meeting.",
        tradeoff: "Requires asking the client to think about the next engagement while the current one is not finished.",
        risk: "Waiting until project close to start the expansion conversation is too late — the relationship momentum from delivery has already started to dissipate.",
        outcome: "Expansion conversation was underway before the original scope closed. The client's decision was not made under time pressure at a close meeting.",
      },
      {
        decision: "Coordinated the value story and commercial positioning with the account team during delivery, not at the handoff.",
        tradeoff: "Account team coordination during delivery creates overhead for a PM who is also running the project.",
        risk: "An AE who only hears the value story at the renewal conversation does not have the time or context to position the expansion effectively.",
        outcome: "Account team was aligned on the value story and expansion narrative before the commercial conversation started. The renewal was a coordinated move, not a reactive one.",
      },
    ],

    impact: [
      { value: "Strategic partner", label: "— the phrase the client used to describe the relationship at engagement end", tone: "primary" },
      { value: "Expanded", label: "one-time build engagement converted to ongoing partnership", tone: "ok" },
      { value: "Senior", label: "executive relationships built during delivery — trust in place before the expansion ask", tone: "ok" },
      { value: "Business terms", label: "value story — outcomes the CFO could evaluate, not sprint metrics", tone: "primary" },
      { value: "Pre-close", label: "expansion conversation — commercial positioning started while delivery was still underway", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Build engagement with natural gravity toward close — deliver the scope, project ends.",
        "Value story in delivery terms — sprints completed, features shipped. Senior stakeholders not hearing the business outcome version.",
        "Client relationship at the working team level only — no executive-level engagement during delivery.",
        "Account team learning the value story at QBR time, when the commercial conversation was already underway.",
      ],
      after: [
        "Platform delivered on time. Engagement expanded into a long-term strategic partnership.",
        "Value story in business outcome terms — senior leadership understood what the platform changed before the renewal conversation started.",
        "Senior executive relationships built during delivery — the trust that produced 'strategic partner' was in place before the expansion ask.",
        "Account team aligned on value story and commercial positioning during delivery. Renewal was coordinated, not reactive.",
      ],
    },

    stack: ["Snowflake", "dbt", "Fivetran", "Tableau", "Certinia", "Sigma PMO Dashboard", "Jira"],
  },
];
