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
  // 001 — Fixed-bid Databricks migration, EdTech
  // ===========================================================================
  {
    id: "redshift-databricks",
    number: "001",
    variant: "data-platform",
    type: "DATA MIGRATION",
    model: "FIXED-PRICE",
    year: "2025–26",
    industry: "EdTech",
    domain: "EdTech · US + India",

    headline: "Six-year data estate, 340 objects with one author, and a cutover date locked to a board demo. The migration was the easy part.",

    capability: "Ran this engagement end to end as the single point of accountability — budget, scope, client relationship, and the cutover call. Fixed-price contract, which meant every absorbed scope addition and every environment delay came out of margin.",

    scale: [
      { value: "10 days", label: "environment access delayed — team kept productive with pre-work, not bench time" },
      { value: "6", label: "informal scope additions that needed formal decisions on a fixed-price contract" },
      { value: "Zero", label: "scope absorbed informally — all six logged, priced, and decided in writing" },
      { value: "3", label: "data quality issues found in the validation window before the board saw anything" },
      { value: "Green", label: "health status at close — budget, schedule, and scope all within the contract" },
      { value: "Extended", label: "contract — client initiated the renewal conversation before we did" },
    ],

    ecosystem: {
      sources: [
        { name: "Redshift (legacy)", type: "WAREHOUSE" },
        { name: "S3 data lake", type: "LAKE" },
        { name: "Product telemetry", type: "TELEMETRY" },
        { name: "Marketing platforms", type: "MARKETING" },
        { name: "Salesforce CRM", type: "CRM" },
        { name: "Finance systems", type: "ERP" },
      ],
      pipeline: ["Sprint 0: backlog + access plan", "Pre-work during environment delay", "Change order process from week 3", "Parallel validation before cutover"],
      platform: "Databricks Unity Catalog",
      consumers: [
        { name: "Product analytics", type: "PRODUCT" },
        { name: "Marketing team", type: "MARKETING" },
        { name: "Finance reporting", type: "FINANCE" },
        { name: "Executive dashboards", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "The Databricks environment wasn't ready for the first ten days. On a fixed-price contract, access delays are the client's responsibility — but the team still burns time against the engagement budget. Keeping them productive without the infrastructure they were supposed to be building on was the first real PM problem.", severity: "high" },
      { label: "The client's senior data engineer had built the legacy Redshift estate over six years. He wasn't sold on the migration and hadn't been looped into the SOW scoping. Without his buy-in, every sprint demo would face friction and the migration governance wouldn't have a legitimate client co-author.", severity: "high" },
      { label: "No agreed definition of success at kickoff. The sponsor's definition — the board demo runs cleanly — and the engineering team's definition — objects behave identically to the old system — weren't the same target. Both had effective veto power over the go/no-go decision.", severity: "high" },
      { label: "Scope additions started arriving informally once execution was underway. On a fixed-price engagement where the account team's commission is margin-based, absorbed scope with no paper trail is a silent problem that compounds over a project.", severity: "med" },
      { label: "The projected total cost (EAC) started trending upward in week four as pre-work hours from the environment delay spilled into execution sprints. The forward signal needed to be addressed before it became a budget conversation with the sponsor.", severity: "med" },
      { label: "The cutover date was locked to a board presentation the client couldn't move. Any quality problem found after switching systems would surface at the board level, not in a safe QA environment.", severity: "high" },
    ],

    journey: [
      {
        stage: "01",
        title: "Internal kickoff before the client saw us. Sprint 0 to set expectations, not just tooling.",
        detail: "Before the external kickoff, I ran the internal team alignment: everyone's Agile experience, the escalation process, the biggest risks to delivery, and what the SOW actually said versus what the client thought they were getting. I also set bill rates in Certinia correctly for a fixed-price engagement — bill rate $0 on assignments, margin tracked in the Fixed Bid tracker and reported to the AE regularly since their commission is margin-based. Sprint 0 with the client covered the product owner, sprint cadence, access plan, and — critically — the definition of success. Getting the sponsor and the data engineer to agree on what done meant was harder than it sounds and needed to happen before sprint one started.",
      },
      {
        stage: "02",
        title: "Environment access ten days late. Pulled pre-work forward instead of sitting.",
        detail: "Databricks environment wasn't provisioned when delivery was supposed to start. On a fixed-price engagement, access delays are the client's responsibility — but that doesn't help if the team is sitting non-billable against the project budget. I pulled pre-work forward: cataloguing all legacy Redshift objects and their downstream consumers, mapping each object to who built it and whether anyone else knew what it did, drafting the Unity Catalog governance framework in parallel with the data engineer rather than after access. When the environment came up, we were staged and ready. The EAC impact of the delay was flagged in the weekly health update with a note on how we'd absorbed it.",
      },
      {
        stage: "03",
        title: "Scope additions arrived informally in week three. Introduced change order process immediately.",
        detail: "The sponsor sent a Slack message asking for something that wasn't in the SOW backlog. On a fixed-price engagement, items not in the approved backlog are out of scope until formally added through change control — and absorbed adds cut the margin that drives the account team's commission. I introduced a scope log that week: every addition required a written decision before it moved. I surfaced the cumulative impact, not each ask individually. By program close, six additions had been tracked: four parked, two converted to formal change orders. The budget closed at plan.",
      },
      {
        stage: "04",
        title: "Built a validation window into the cutover. Found three issues before the board saw anything.",
        detail: "The cutover was two days before a board presentation the client couldn't move. Standard practice on migrations is to run the old and new systems in parallel before switching — but it wasn't in the original schedule. I made the case to the sponsor: we run validation before we cut over, or we find out what's wrong live in front of the board. The window ran quality checks against the legacy system while the new environment was staged. Three data quality issues surfaced. Two were fixed before the switch. The third was scoped out of the board demo and flagged in the status report. The presentation ran without incidents. After close, I ran the project closure checklist: final billing, access removed within 24 hours, knowledge transfer to support, NPS.",
      },
    ],

    orchestration: [
      { team: "Client Data Engineer", role: "Built the legacy estate over six years. Needed to co-author the governance model, not receive a handoff — or every sprint demo would face friction.", type: "client" },
      { team: "Client Sponsor", role: "Budget authority. Set the board demo date. Needed clarity on the go/no-go criteria and confidence in the cutover decision.", type: "exec" },
      { team: "Client Legal", role: "Reviewed the data classification requirements for EdTech student data — not covered by standard governance templates.", type: "client" },
      { team: "US India Engineers", role: "Delivery team across two time zones. Needed an agreed definition of done and a written handoff process for the 11-hour gap.", type: "ic" },
      { team: "Solutions Architect", role: "Designed the Unity Catalog governance framework — with the data engineer's input built in from Sprint 0.", type: "arch" },
      { team: "Account Executive", role: "Commission is margin-based on fixed-price. Kept informed of EAC and scope change status weekly so no surprises at billing.", type: "internal" },
      { team: "Program Lead", role: "Single point of accountability: budget, scope, health status, client relationship, and the cutover go/no-go call.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Pulled work forward during the ten-day environment delay instead of pursuing a formal Working At Risk approval.",
        tradeoff: "Kept the team occupied on pre-work that wasn't in the original sprint sequence — created some rework when the environment came up differently than expected.",
        risk: "A formal WAR approval conversation with the client for a ten-day delay would have created friction early with a sponsor who was already slow on provisioning.",
        outcome: "Team delivered value during the delay window. EAC impact was absorbed within the sprint buffer without a budget conversation.",
      },
      {
        decision: "Introduced change order discipline in week three before the scope log grew any larger.",
        tradeoff: "The sponsor didn't want the paperwork overhead of a formal process for what he saw as small asks.",
        risk: "Without it, cumulative informal adds on a fixed-price contract erode margin with no paper trail — and no good moment to surface it later.",
        outcome: "Six additions tracked and decided formally. Four parked. Two converted to paid change orders. Budget closed at plan. AE's commission protected.",
      },
      {
        decision: "Argued for a parallel validation window before cutover even though it wasn't in the original schedule.",
        tradeoff: "Two additional engineer-days and a sponsor who felt the schedule was already tight.",
        risk: "Skipping it meant the board presentation was the first real quality test of the new system.",
        outcome: "Three data quality issues found and addressed before the switch. Board presentation ran clean.",
      },
      {
        decision: "Started the renewal conversation at week twelve of eighteen, not after program close.",
        tradeoff: "Brought the AE and TAL into a commercial conversation while the team was still heads-down on delivery.",
        risk: "Waiting until after close is too late to shape the next SOW with delivery context still fresh.",
        outcome: "Client initiated the contract extension before we formally proposed it. The data engineer's involvement in the governance design was the credibility that made that conversation easy.",
      },
    ],

    impact: [
      { value: "Green", label: "health status at close — budget, schedule, and scope all within contract", tone: "primary" },
      { value: "6/6", label: "scope additions decided formally — zero absorbed informally on a fixed-price contract", tone: "ok" },
      { value: "3", label: "data quality issues caught in validation before the board saw anything", tone: "ok" },
      { value: "Zero", label: "incidents at the board presentation", tone: "primary" },
      { value: "+1", label: "contract extended — client asked before we proposed", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "No internal kickoff — delivery team hadn't aligned on risks, escalation process, or what the SOW actually said before the client saw them.",
        "No definition of success agreed between the sponsor and the engineering team — both had different targets and effective veto power.",
        "Scope additions handled informally with no paper trail on a fixed-price contract where every absorbed add cuts margin.",
        "No validation window planned before cutover — a hard date tied to a board presentation the client couldn't move.",
      ],
      after: [
        "Internal kickoff ran before the external one. Team aligned on SOW scope, escalation path, and definition of success before sprint one.",
        "Shared definition of done signed off by both the sponsor and the data engineer before migration work started.",
        "Six scope additions tracked, priced, and decided in writing. Budget and margin closed at plan.",
        "Parallel validation window caught three data quality issues before the switch. Board presentation ran without incidents.",
      ],
    },

    stack: ["Databricks", "Unity Catalog", "Amazon Redshift", "Certinia", "Jira", "Sigma PMO Dashboard"],
  },

  // ===========================================================================
  // 002 — T&M marketing data platform, 3-year account
  // ===========================================================================
  {
    id: "marketing-data-platform",
    number: "002",
    variant: "data-platform",
    type: "DATA PLATFORM",
    model: "T&M",
    year: "2024–26",
    industry: "Enterprise SaaS",
    domain: "Enterprise SaaS · 3 years",

    headline: "First QBR, I walked in with a delivery summary. The CFO asked what the platform had saved them in dollars. I didn't have an answer. Almost lost the renewal right there.",

    capability: "Three-year T&M marketing data platform, two renewals. Owned the client relationship, the quarterly business reviews, every scope renegotiation, and the account growth work that turned one engagement into three.",

    scale: [
      { value: "48 hrs", label: "to rebuild the year-one quarterly review around the CFO's actual question" },
      { value: "2 renewals", label: "earned by tying delivery outcomes to the client's business strategy, not just shipping tickets" },
      { value: "40%", label: "scope growth in year two — converted to a formal change order, not absorbed" },
      { value: "Zero", label: "unannounced pipeline failures after the upstream change notice process was introduced" },
      { value: "1 engineer", label: "moved from blocking every roadmap decision to presenting the platform at the client's internal data summit" },
      { value: "4 wks", label: "for the client team to run independently after handoff" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce CRM", type: "CRM" },
        { name: "HubSpot", type: "MARKETING" },
        { name: "Ad platforms", type: "MARKETING" },
        { name: "Attribution tools", type: "API" },
        { name: "Product telemetry", type: "TELEMETRY" },
        { name: "Finance systems", type: "ERP" },
      ],
      pipeline: ["QBR reframed around ROI, not sprint velocity", "EAC tracked weekly — change order when scope grew", "Upstream change notice process after second silent failure", "Exit milestones written into year-three contract"],
      platform: "Snowflake + dbt + MWAA",
      consumers: [
        { name: "Marketing ops", type: "MARKETING" },
        { name: "RevOps", type: "OPS" },
        { name: "Executive reporting", type: "EXEC" },
        { name: "Attribution analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "Year-one quarterly review: I had a delivery summary — sprints completed, features shipped, velocity trend. The CFO's first question was what the platform had saved them in dollars. I hadn't prepared that answer. I had been measuring the wrong thing for eleven months.", severity: "high" },
      { label: "The client's embedded engineer had built and owned their data systems for years. The engagement structure implicitly treated him as someone to hand work off to rather than someone with domain authority. That friction showed up in every technical decision for the first year.", severity: "high" },
      { label: "In year two, the marketing team expanded and the scope grew 40% above the original T&M contract. On T&M, that means EAC starts trending over bookings — which is the forward signal that you need a change order conversation, not something to absorb silently.", severity: "high" },
      { label: "Two teams were making changes to the same data pipelines without notifying each other. Pipeline failures only showed up in production. There was no upstream change notification process in place.", severity: "med" },
      { label: "Resources were rolling off one project track while another was still ramping. Assignments weren't extended to the project close date, which created gaps in coverage and required emergency backfill twice.", severity: "med" },
      { label: "Platform infrastructure needed an upgrade during a six-week client change freeze. Needed a shadow test environment that wasn't in the project plan.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Year-one QBR had the wrong frame. Rebuilt the deck 48 hours before the call.",
        detail: "The quarterly review I'd prepared was a delivery summary: sprints completed, velocity trend, what we'd shipped. The CFO's opening question was what the platform had saved them in dollar terms. I didn't have that answer. I rebuilt the deck in 48 hours — cost per marketing insight produced, analyst hours recovered, attribution turnaround time. Got the renewal. The lesson was immediate: on a T&M engagement, the client pays for outcomes, not cadence. I restructured the program scorecard from week one of year two around business value metrics. Every QBR after that led with the value story, not the delivery update.",
      },
      {
        stage: "02",
        title: "Embedded engineer needed to be a co-owner of the roadmap, not a handoff recipient.",
        detail: "Year one: I ran the roadmap. He pushed back on most of it. The pushback wasn't obstruction — he understood the data better than anyone on our team. The issue was structural: the engagement had positioned him as someone to receive deliverables, and he had expert-level domain knowledge that the SOW hadn't accounted for. I changed his role from recipient to co-author of the roadmap. Slower decisions in the short term. But his internal credibility became attached to the platform's success. Within two quarters he shifted from friction to advocacy. The year-two renewal was easier because he was championing the platform internally.",
      },
      {
        stage: "03",
        title: "Scope grew 40% in year two. Had the EAC conversation before it became a Red.",
        detail: "The marketing team expanded and the work grew well past the original T&M contract. EAC (total projected cost) started trending over bookings. On T&M, that's the forward signal that a change order conversation is needed — not a problem to absorb and hope the hours even out. I flagged the health status Yellow, had the conversation with the sponsor before changing the color (the process requires a client discussion before any status change), and framed the growth as evidence the platform was working — the team had grown into it faster than the original scope anticipated. The year-three contract included a formal scope expansion. The renewal pitch was built on the argument that we'd underestimated the platform's value, not that we'd lost control of scope.",
      },
      {
        stage: "04",
        title: "Built the handoff into the year-three contract scope before anyone asked for it.",
        detail: "When negotiating year three, I added explicit exit milestones: full documentation, an operating guide, and the client's engineer presenting the platform architecture to his own team. They didn't ask for these. I added them because a clean handoff at the end of a three-year engagement is the clearest proof that we delivered something the client owns, not something they depend on us to maintain. The closure checklist ran: final billing, access removed, knowledge transfer to support, NPS survey. He presented at the company's internal data event four weeks after handoff. The team was operating independently within a month.",
      },
    ],

    orchestration: [
      { team: "Client CFO", role: "Renewal decision maker. Needed ROI in dollars, not delivery metrics. Year-one quarterly review nearly failed this test.", type: "exec" },
      { team: "Embedded Engineer", role: "Domain authority on the client's data. Needed a roadmap co-owner role, not a handoff-recipient role — or every technical decision would face friction.", type: "client" },
      { team: "Marketing Ops Lead", role: "Upstream data owner whose campaign structure changes broke pipelines twice without warning. Needed a formal change notification process.", type: "client" },
      { team: "Account Executive", role: "Renewal authority. Looped in on EAC status and the value story quarterly so commercial conversations weren't surprises.", type: "internal" },
      { team: "Data Engineers", role: "Built and maintained the platform across three years. Resource assignments had to be tracked against project end dates weekly.", type: "ic" },
      { team: "Platform Architect", role: "Platform and pipeline governance design. Involved in the upstream change notification process after the second silent failure.", type: "arch" },
      { team: "Program Lead", role: "Ran every quarterly review, every scope negotiation, and the account growth conversations that produced two renewals.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Rebuilt the year-one quarterly review deck 48 hours before the call when I realized it answered the wrong question.",
        tradeoff: "Two days of prep under time pressure instead of one.",
        risk: "A delivery-focused quarterly review might have lost the renewal. The CFO was measuring value in dollars, not in sprints.",
        outcome: "Renewal approved. Year two started with 40% more scope. Changed the program scorecard from that point forward.",
      },
      {
        decision: "Changed the embedded engineer's role from handoff recipient to roadmap co-author.",
        tradeoff: "Slower decisions. More design sessions. More of his opinions in the process.",
        risk: "Keeping the vendor framing would have left the most knowledgeable person on the client side as a persistent critic through three years and two renewals.",
        outcome: "He presented the platform at the client's internal data summit four weeks after handoff. That was the real proof the delivery had worked.",
      },
      {
        decision: "Flagged health Yellow and had the EAC conversation with the sponsor before scope growth reached a crisis point.",
        tradeoff: "Required surfacing a difficult financial conversation before the sponsor was ready for it.",
        risk: "Letting EAC trend over silently on T&M creates a Red-status conversation at the worst possible moment — usually close to month-end or renewal.",
        outcome: "Change order negotiated before it became a budget emergency. Scope growth framed as a proof of platform value, not loss of control.",
      },
      {
        decision: "Introduced a two-week upstream change notification requirement after the second silent pipeline failure.",
        tradeoff: "Added overhead to the marketing ops team's workflow.",
        risk: "Without it, upstream changes would continue to break pipelines silently until they failed in production.",
        outcome: "Zero unannounced pipeline failures in years two and three.",
      },
    ],

    impact: [
      { value: "2 renewals", label: "driven by the value story — ROI in dollars, not delivery metrics", tone: "primary" },
      { value: "40%", label: "scope growth converted to a change order — not absorbed on T&M", tone: "ok" },
      { value: "Zero", label: "unannounced pipeline failures after the change notice process", tone: "ok" },
      { value: "1 engineer", label: "from roadmap critic to presenting the platform at the client data summit", tone: "primary" },
      { value: "4 wks", label: "to client operating independently at handoff", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Quarterly reviews built around delivery metrics — sprints, velocity, features. The CFO was asking about ROI in dollars.",
        "Embedded engineer structured as a handoff recipient. Passive friction in every technical decision throughout year one.",
        "Scope growth in year two absorbed informally. EAC trending over T&M bookings with no formal action.",
        "Upstream pipeline changes made without notification. Failures only discovered in production.",
      ],
      after: [
        "Quarterly reviews rebuilt around business value: cost per insight, analyst hours saved, attribution turnaround. Two renewals followed.",
        "Embedded engineer as roadmap co-owner. Presented the platform architecture at the client's internal data event.",
        "40% scope growth converted to a formal change order. Health flagged Yellow before the conversation happened, not after.",
        "Upstream change notification process in place. Zero silent pipeline failures in years two and three.",
      ],
    },

    stack: ["Snowflake", "dbt", "MWAA (Airflow)", "Fivetran", "Certinia", "Sigma PMO Dashboard", "Jira"],
  },

  // ===========================================================================
  // 003 — Fixed-bid Snowflake build, 6 weeks, US + India + China
  // ===========================================================================
  {
    id: "snowflake-china",
    number: "003",
    variant: "data-platform",
    type: "FAST DELIVERY",
    model: "FIXED-PRICE",
    year: "2024",
    industry: "Industrial Manufacturing",
    domain: "Industrial Manufacturing · US + India + China",

    headline: "Six-week fixed deadline. Day three: US team and China factory team gave different answers to 'what counts as a unit produced.' That wasn't a data problem. It was business policy baked into two different ERPs.",

    capability: "Fixed-price, six-week delivery across three teams and three time zones. Owned the scope, the budget, the cross-team coordination, and the decision that turned a data disagreement into a business policy conversation before anyone built the wrong thing.",

    scale: [
      { value: "Day 3", label: "US and China teams gave different answers to the same definition question" },
      { value: "4 days", label: "to get the business decision made before any data modeling started" },
      { value: "10.5 hrs", label: "time zone gap managed with a written handoff process designed around it, not against it" },
      { value: "Zero", label: "days behind at close on a fixed-price engagement with a hard deadline" },
      { value: "Week 2", label: "coordination gap caught before it compounded across four more weeks" },
      { value: "2", label: "scope additions handled as a post-delivery contract, not absorbed into the fixed price" },
    ],

    ecosystem: {
      sources: [
        { name: "SAP ECC", type: "ERP" },
        { name: "Oracle R12", type: "ERP" },
        { name: "Factory MES", type: "MES" },
        { name: "WMS", type: "OPS" },
        { name: "Supplier feeds", type: "API" },
      ],
      pipeline: ["Business definition resolved before data modeling started", "Pre-work staged during environment delay", "Written handoffs enforced from week 2", "Scope additions moved to post-delivery contract"],
      platform: "Snowflake on Azure",
      consumers: [
        { name: "China factory ops", type: "OPS" },
        { name: "HQ supply chain", type: "OPS" },
        { name: "Regional finance", type: "FINANCE" },
        { name: "China site leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Day three of a six-week fixed-price engagement: the US and China teams had different answers to what counted as a unit produced. It wasn't a data formatting difference — each team had built their own business logic into separate ERP systems over years. Building a data model around the gap would have locked the wrong answer into the platform permanently.", severity: "high" },
      { label: "The US and China teams were 10.5 hours apart. Any decision that needed both sides on a live call had a 24-hour turnaround. On a six-week fixed-price engagement, that's not a scheduling inconvenience — it's a structural risk to the delivery timeline. How the daily coordination was designed was effectively the program architecture.", severity: "high" },
      { label: "The SAP system structure had never been documented. The IT contact allocated to the project couldn't explain it. The engineer who originally built it wasn't assigned to the project and didn't know they were needed.", severity: "high" },
      { label: "The China team was using informal messages for decisions that needed to be documented. Five days into the engagement, no written handoff records existed for decisions made across time zones.", severity: "med" },
      { label: "The technical environment took eight days to provision instead of three. On a fixed-price engagement with a hard deadline, that compresses the actual delivery window — and under the SOW, it's the client's responsibility, not phData's.", severity: "med" },
      { label: "At week four of six, two dashboard requirements appeared that weren't in the SOW backlog. On a fixed-price contract, items not in the approved backlog are out of scope until formally added through change control.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Day three: the data disagreement was a business policy question. Stopped modeling until it was answered.",
        detail: "First stakeholder session with both the US corporate team and the China factory team. I asked each side to define 'production output.' They gave different answers — not different data, different business logic embedded in SAP and Oracle at different times by different teams. On a six-week fixed-price engagement, the instinct is to work around it and keep moving. That would have been wrong. Engineering around a business policy gap doesn't resolve it — it embeds it into the platform permanently. I stopped the data modeling work and escalated to the project sponsor: this was a business decision that had to be made before we built anything. Decision made in four days. Data model designed correctly from the start.",
      },
      {
        stage: "02",
        title: "SAP system structure undocumented. Found the right person outside the project org chart.",
        detail: "The IT contact we'd been given couldn't explain how the SAP system was structured. Going through the formal escalation chain for a replacement contact would have taken more time than the delivery window could absorb. I asked the factory operations manager — not part of the project — who had originally built it. He pointed me to one engineer who wasn't on the project. Four hours with that engineer and we had the full structure documented, field by field. Extraction work started the same week. The formal route would have cost us time we didn't have on a six-week engagement.",
      },
      {
        stage: "03",
        title: "Week two: verification check found the China team wasn't using the written coordination process.",
        detail: "At a check-in in week two, I asked the China team lead to walk me through the last three handoff documents. There weren't any. The team had been using informal messages for everything — five days of cross-team decisions were undocumented and untraceable. On a six-week engagement with a 10.5-hour time zone gap, undocumented decisions become blockers that no one can resolve cleanly. I raised it directly with the team lead one-on-one rather than in a group setting — needed his cooperation for four more weeks. Written records required from week two onward. No coordination gap lasted more than 24 hours for the rest of the program.",
      },
      {
        stage: "04",
        title: "Week four: two scope additions arrived. Gave the sponsor one recommendation, not options.",
        detail: "At week four, two dashboard requirements appeared that weren't in the SOW backlog. On a fixed-price contract, items outside the approved backlog need to go through change control — absorbing them means taking on cost with no mechanism to recover it. With two weeks left, absorbing them also meant either missing the deadline or cutting quality. I brought one recommendation to the sponsor: add them to a separate contract after delivery. The reason: absorbing them now either moves the date or reduces quality, and neither is acceptable at week four of six. He agreed. We delivered on the original scope. The post-delivery contract was signed within a week of close.",
      },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "Had to make the business call on what 'production output' means across two ERP systems — a management decision, not a data engineering one.", type: "exec" },
      { team: "China Factory IT", role: "Controlled local system access. Initially treating the written coordination process as optional — caught and corrected in week two.", type: "client" },
      { team: "Factory Ops Manager", role: "Not on the project. Knew who built the SAP system. One conversation that unblocked an otherwise multi-week delay.", type: "client" },
      { team: "US Engineers", role: "Built the data pipelines. Couldn't start modeling correctly until the business definition was resolved in week one.", type: "ic" },
      { team: "India Engineers", role: "Handled data ingestion and SAP extraction. Coordinated across an 11-hour gap using the written handoff process.", type: "ic" },
      { team: "Solutions Architect", role: "Designed the Snowflake data model on Azure. Updated the design once the business definition decision was made.", type: "arch" },
      { team: "Program Lead", role: "The only person with visibility across all three teams and both time zones. All cross-team decisions routed through me.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Stopped data modeling work on day three and escalated the production output disagreement as a business decision, not a data engineering problem.",
        tradeoff: "Required a difficult client conversation in week one when the sponsor wanted to see momentum.",
        risk: "Engineering around the gap would have locked the business disagreement into the data model permanently.",
        outcome: "Business definition resolved in four days. Data model designed correctly from the start. Zero rework needed later.",
      },
      {
        decision: "Went outside the official project contacts to find the engineer who understood the SAP system.",
        tradeoff: "Required goodwill from a manager not assigned to the project and four hours from an engineer who wasn't allocated to us.",
        risk: "Working through the formal escalation chain would have consumed more time than a six-week fixed-price engagement could absorb.",
        outcome: "SAP structure documented and extraction unblocked in two days instead of weeks.",
      },
      {
        decision: "Verified the China team was using the coordination process in week two instead of assuming they understood it.",
        tradeoff: "An uncomfortable conversation with the team lead that felt like micromanagement.",
        risk: "Four more weeks of undocumented cross-team decisions would have created blockers with no clear resolution path.",
        outcome: "Gap found in week two, not week five. No coordination gap lasted more than 24 hours for the remaining four weeks.",
      },
      {
        decision: "Gave the sponsor one recommendation on the week-four scope additions — not options to weigh.",
        tradeoff: "Required telling a client sponsor 'no' clearly in the middle of the engagement.",
        risk: "Absorbing them meant either missing the deadline or cutting quality. Offering multiple options would have opened a negotiation we didn't have time for.",
        outcome: "Post-delivery contract signed for both additions within a week of close. Original scope delivered on time.",
      },
    ],

    impact: [
      { value: "4 days", label: "to resolve the business definition before any data modeling started", tone: "primary" },
      { value: "Zero", label: "days behind schedule at close on a fixed-price, hard-deadline engagement", tone: "ok" },
      { value: "2 days", label: "to unblock SAP — found the right person outside the project org chart", tone: "ok" },
      { value: "Week 2", label: "coordination gap caught before it compounded across four more weeks", tone: "primary" },
      { value: "2", label: "scope additions handled as a post-delivery contract — not absorbed into the fixed price", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "US and China teams had different definitions of 'production output' embedded in separate ERP systems. No one had noticed — it looked like a data formatting gap.",
        "Written coordination process existed on paper. China team using informal messages instead — five days of cross-team decisions undocumented.",
        "SAP system structure undocumented. The one person who understood it wasn't assigned to the project.",
        "Two dashboard requirements in reserve with no process for handling out-of-scope additions on a fixed-price contract.",
      ],
      after: [
        "Business definition resolved in week one. Data model designed correctly from day one — no rework.",
        "Written handoffs required from week two. No undocumented cross-team decisions for the remaining four weeks.",
        "SAP structure documented and extraction unblocked in two days — found the right engineer through the operations manager.",
        "Scope additions moved to a post-delivery contract. Original scope delivered on time.",
      ],
    },

    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Azure", "Certinia", "Jira"],
  },

  // ===========================================================================
  // 004 — Internal AI agent platform, phData PMO
  // ===========================================================================
  {
    id: "pmo-ai-agent-platform",
    number: "004",
    variant: "ai-agents",
    type: "INTERNAL AI PROGRAM",
    model: "INTERNAL",
    year: "2024–25",
    industry: "Professional Services · Data & AI Consulting",
    domain: "phData PMO · self-initiated",

    headline: "The agent was ready in three weeks. Getting Finance to trust it took two months. The bottleneck wasn't the technology.",

    capability: "Designed and shipped six internal AI tools to automate the manual admin work that every phData PM does: month-end billing, sprint health reporting, risk tracking, client status notes, budget forecasting, and QBR decks. No mandate. Built the approval case from scratch, rolled out in phases, and documented the design so others could build more.",

    scale: [
      { value: "3 weeks", label: "to build and test the billing tool" },
      { value: "2 months", label: "to get Finance's approval — the tool was ready long before they were" },
      { value: "1 audit trail", label: "that changed the entire approval conversation with Finance" },
      { value: "14 PMs", label: "on the delivery team adopted the platform" },
      { value: "6 agents", label: "in production across the PMO" },
      { value: "2 agents", label: "built by other team members using the design I documented" },
    ],

    ecosystem: {
      sources: [
        { name: "Certinia (billing)", type: "ERP" },
        { name: "Jira (project tracking)", type: "OPS" },
        { name: "Salesforce CRM", type: "CRM" },
        { name: "Slack", type: "API" },
        { name: "Google Drive", type: "API" },
      ],
      pipeline: ["Two billing cycles as proof before asking for approval", "Audit trail built before Finance meeting", "Tools sequenced by risk — billing first, client-facing last", "Phased rollout to three PMs before full team"],
      platform: "Internal AI platform for phData delivery PMs",
      consumers: [
        { name: "Delivery PMs", type: "OPS" },
        { name: "Finance team", type: "FINANCE" },
        { name: "Delivery leadership", type: "EXEC" },
        { name: "Account leads", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Finance didn't need the billing tool to be accurate. They needed to know who was responsible when it was wrong. Accuracy is a technical question. Accountability is a legal one. I had prepared for the first and hadn't built for the second.", severity: "high" },
      { label: "No company policy on using AI tools for billing or client-facing work. Finance and IT had no framework to approve anything. I had to build the approval case from first principles: what the tool does, where a human reviews the output, and what records are kept if something goes wrong.", severity: "high" },
      { label: "When the PM team heard 'AI tools for PM work,' they heard 'replacing PMs.' A Slack announcement would have created permanent resistance. The reframing required individual conversations.", severity: "high" },
      { label: "The month-end billing process at phData is manual: PMs pull hours from Certinia, reconcile against the SOW, build the invoice, and send it to Finance. Four hours per PM every month. Error-prone. The most obvious place to start.", severity: "med" },
      { label: "People who don't adopt a new tool don't report that they're doing the work manually instead. I had to track usage per person per tool from day one to find the gaps, then have conversations to understand why.", severity: "med" },
      { label: "Connecting to three external systems — each with different authentication methods and rate limits — was technically harder than building the AI reasoning logic itself.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Built the billing tool on personal time. Two months of proof data before asking anyone to approve it.",
        detail: "The month-end billing process was four hours per PM every month: pull hours from Certinia, reconcile against the SOW, check for $0 bill rates, remove PTO from billable time, build the invoice. Error-prone and repetitive. I built a tool to automate it on my own time and ran it alongside the manual process for two billing cycles, logging every output against what the manual process produced. When I brought Finance and IT two months of side-by-side data, the conversation shifted from 'should we trust this' to 'what controls do we need.' I didn't ask for approval without evidence. I built the evidence first.",
      },
      {
        stage: "02",
        title: "Finance's first question was who's responsible when it's wrong. I had an answer ready.",
        detail: "Finance's opening question: 'If this makes an error, who catches it and who's responsible?' Not the accuracy rate. Accountability. Accuracy is something you test. Accountability is something you design. I came prepared for both: a complete record of every output, a mandatory human review step before anything left the system, and an output format that made any error visible before it reached a client or got logged in Certinia. The conversation moved from 'can we trust this' to 'what are the approval steps' in the first meeting. Sign-off came without a follow-up.",
      },
      {
        stage: "03",
        title: "Sequenced the tools by risk level. Billing first. Client-facing work last.",
        detail: "After billing, I built the Sprint Health Summarizer — it pulls from Jira and surfaces velocity, blockers, and risk flags that PMs were previously building manually from the board. Low stakes, high frequency, easy to evaluate. Then the Risk Scanner, which mirrors the RAID log work PMs do at every leadership sync. Then the Budget Forecaster, which builds the EAC calculation PMs track weekly — Finance wouldn't engage with anything near financial projections until three prior tools had been running cleanly. The Deck Drafter came last: it touches client-facing QBR presentations, requires the most PM judgment in review, and has the highest cost if something goes wrong. For each tool, I opened the approval conversation while the previous one was in adoption, and started building only after sign-off.",
      },
      {
        stage: "04",
        title: "Rolled out to three PMs first. Tracked usage from day one. Fixed what didn't work before the next group saw it.",
        detail: "Three PMs went first. Their feedback changed the Sprint Health Summarizer's output format before anyone else saw it. When someone wasn't using a tool, I had a one-on-one conversation — not to push adoption, but to find out whether the tool was solving the right problem. Tracked usage by person and by tool from day one; non-adopters don't announce themselves. Two tools needed changes before the second group. Fixed them before that rollout started. By the third group, PMs were asking when the next tool was coming. After the sixth tool shipped, I documented the full design pattern — the architecture, the governance steps, the adoption sequence. Delivery ops used that documentation to build two more tools without me.",
      },
    ],

    orchestration: [
      { team: "Finance Team", role: "Controlled billing data access. Needed a full record of every output and a clear accountability chain before approving anything — not just an accuracy number.", type: "client" },
      { team: "IT Security", role: "Controlled data access and system connections. Required security controls defined before approval, not promised afterward.", type: "client" },
      { team: "Delivery PMs", role: "End users. Needed to see the tools as admin relief that gave back time for client-facing work — not as job replacement. One conversation per person.", type: "ic" },
      { team: "phData Leadership", role: "Informal sponsor after seeing the billing before/after numbers. No selling required after the proof data was visible.", type: "exec" },
      { team: "Delivery Ops", role: "Used the design documentation to build two more tools independently after the sixth agent shipped.", type: "ic" },
      { team: "Platform Engineer", role: "Built the external system connections. Authentication complexity across three different systems was harder than the AI reasoning logic.", type: "ic" },
      { team: "Program Lead", role: "Designed all six tools, built the approval case from scratch, ran the phased rollout, and documented the pattern.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Built the billing tool on personal time and tested it through two complete billing cycles before asking Finance to approve it.",
        tradeoff: "Risk of spending significant time on something that might not be approved.",
        risk: "Asking for approval without data would have been a theoretical conversation about AI risk. With two months of before/after data, it became a conversation about controls.",
        outcome: "Finance approved in the first meeting. The conversation was about safeguards, not whether to proceed.",
      },
      {
        decision: "Built the complete audit trail and human review step before Finance asked about them.",
        tradeoff: "Several extra weeks of design work before the approval conversation.",
        risk: "Showing up without an answer to the accountability question would have ended the conversation at the first question.",
        outcome: "Finance's opening question was 'who's responsible.' I had a designed answer. Approval came without a follow-up call.",
      },
      {
        decision: "Sequenced the tools by institutional trust-building potential — billing first, client-facing work last.",
        tradeoff: "Delayed building the tools I most wanted to ship. The Budget Forecaster came fourth.",
        risk: "Building the highest-stakes tool first would have put the most skeptical reviewers in front of the least-tested output.",
        outcome: "By the fourth tool, the PM team was asking when the next one was coming. Trust had been earned incrementally.",
      },
      {
        decision: "Rolled out to three PMs first instead of launching to the full team.",
        tradeoff: "Slower adoption in the short term. More coordination overhead.",
        risk: "A full-team launch with rough edges would have left lasting first impressions that were hard to reverse.",
        outcome: "First group's feedback changed the Sprint Health Summarizer format before anyone else saw it.",
      },
      {
        decision: "Documented the full design pattern before anyone asked for documentation.",
        tradeoff: "Time spent writing instead of building the next tool.",
        risk: "Without documentation, the platform's continued growth depended entirely on my availability.",
        outcome: "Delivery ops built two more tools using the documented pattern. The platform outlasted my direct involvement.",
      },
    ],

    impact: [
      { value: "2 months", label: "to get Finance's approval — the tool was ready in 3 weeks", tone: "ai" },
      { value: "14 PMs", label: "on the delivery team adopted the platform", tone: "ok" },
      { value: "60%", label: "faster month-end billing cycle", tone: "primary" },
      { value: "2 agents", label: "built by other team members using the design I documented", tone: "ai" },
      { value: "1 audit trail", label: "that changed the entire approval conversation with Finance", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Month-end billing: four hours per PM, every month — pulling hours from Certinia, reconciling against SOW, checking bill rates, removing PTO, building the invoice. Error-prone.",
        "No company policy on using AI tools for billing or PM work. Finance and IT had no framework to approve anything.",
        "Sprint health, risk tracking, status notes, budget forecasting, and QBR decks built manually from scratch each week.",
        "PM team interpreted 'AI tools for PM work' as job replacement — no shared frame for what these tools were actually for.",
      ],
      after: [
        "Billing cycle under 90 minutes, with human review built in. Finance approved because every output was traceable before it left the system.",
        "Governance case built from two billing cycles of proof data. IT and Finance had defined controls before sign-off.",
        "Sprint Health Summarizer, Risk Scanner, Status Note Composer, Budget Forecaster, and Deck Drafter in production.",
        "PM team using the tools for the repetitive admin work; time reclaimed for client-facing decisions and account growth.",
      ],
    },

    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Certinia", "Salesforce MCP", "Slack MCP", "Jira MCP"],

    agents: [
      {
        name: "Billing Agent",
        replaces: "4 hours of manual month-end billing per PM — pulling hours from Certinia, reconciling against the SOW, checking bill rates, removing PTO",
        adopters: "All delivery PMs and Finance reviewers",
        tools: ["Certinia", "Salesforce MCP", "Google Apps Script", "Claude"],
        output: "Draft invoice with line items, hours, variance flags, and a bill-rate check — ready for PM review before it goes to Finance",
        status: "live",
      },
      {
        name: "Sprint Health Summarizer",
        replaces: "PM manually building the weekly sprint health update from the Jira board",
        adopters: "PMs and delivery leadership",
        tools: ["Jira MCP", "Slack MCP", "Claude"],
        output: "Sprint summary with velocity, blockers, and risk flags — mirrors the leadership sync agenda",
        status: "live",
      },
      {
        name: "Risk Scanner",
        replaces: "Informal risk identification surfaced ad hoc in standups and leadership syncs",
        adopters: "PMs, delivery ops, program leads",
        tools: ["Jira MCP", "Glean", "Claude"],
        output: "Weekly risk log with severity ratings and suggested owners — feeds directly into the RAID log",
        status: "live",
      },
      {
        name: "Status Note Composer",
        replaces: "PM writing the weekly client status report from scratch — health color, budget, accomplishments, risks",
        adopters: "All client-facing PMs",
        tools: ["Jira MCP", "Glean", "Claude"],
        output: "Draft status note in the client's format, ready for PM review and send",
        status: "live",
      },
      {
        name: "Budget Forecaster",
        replaces: "Manual EAC calculation — pulling hours from Certinia, applying bill rates, projecting to completion",
        adopters: "PMs and Finance",
        tools: ["Certinia", "Salesforce MCP", "Google Sheets", "Claude"],
        output: "EAC vs bookings report with variance flags and a plain-language narrative for the status note",
        status: "live",
      },
      {
        name: "Deck Drafter",
        replaces: "PM building the quarterly business review deck from scratch",
        adopters: "Senior PMs and account leads",
        tools: ["Glean", "Google Slides MCP", "Claude"],
        output: "Draft QBR structure with content pulled from project history — PM edits, adds the value story, and presents",
        status: "beta",
      },
    ],
  },
];
