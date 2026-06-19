// Case studies written in real TPM voice.
// Content strategy: every journey stage shows analysis → options considered → parallel coordination → decisive call.
// Not Scrum Master facilitation. Not relationship management narrative.
// TPM thinking: assess the blast radius, identify the options, run tracks in parallel, make the call.

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
  // 001
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
    capability: "Ran the EdTech Databricks migration end-to-end. Owned the client relationship, the scope process, the go/no-go, and the cutover.",

    scale: [
      { value: "6 years", label: "of decisions in the old estate" },
      { value: "1 person", label: "who knew why every table was named what it was" },
      { value: "18 weeks", label: "to migrate the data and the knowledge" },
      { value: "3 issues", label: "caught in parallel run before the board demo" },
      { value: "Zero", label: "undocumented objects in the platform after cutover" },
      { value: "1 contract", label: "extended because the data lead asked for it" },
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
      pipeline: ["Dependency + knowledge graph", "Sequenced by downstream reach", "Per-tool parity contracts", "Parallel run before cutover"],
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
      { label: "340 critical objects built by one engineer over six years, none of them documented. If he didn't actively transfer what he knew, the new platform would carry the same undocumented complexity forward, just on faster infrastructure.", severity: "high" },
      { label: "No agreed definition of done. Data lead's definition: objects work exactly as before. Sponsor's definition: board demo runs clean. Those weren't the same scope, and both had veto power.", severity: "high" },
      { label: "Cutover date set by a board demo, not delivery readiness. The demo couldn't move. Any quality issue found post-cutover would surface in front of the board.", severity: "high" },
      { label: "1,400 schema compatibility warnings from the migration tool. Two weeks of triage to find the 23 that actually mattered, not in the original timeline.", severity: "med" },
      { label: "EdTech student data classification requirements not covered by phData's standard Unity Catalog governance template. No policy to point to. Had to co-author with client legal.", severity: "med" },
      { label: "Scope additions coming in informally from the sponsor on a fixed-price contract. Every absorbed addition is margin erosion with no paper trail.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "First two weeks: a dependency map and a knowledge map. The sequence came from both.",
        detail: "Week one: mapped 2,300 objects to their downstream production consumers. 23 fed critical systems: executive dashboards, finance reporting, the board demo pipeline. Week two: mapped each object to its knowledge owner. 340 of those had one author: the data lead. Both maps together determined the migration sequence. Objects that fed high-value systems AND had single-author knowledge moved later, with more validation runway and more time to transfer the knowledge before cutover. That sequencing decision was risk management, not diplomacy.",
      },
      {
        stage: "02",
        title: "Scope additions required a decision process the contract didn't include. I built one.",
        detail: "Week three: first informal addition from the sponsor. On a fixed-price contract, absorbing scope informally is direct margin erosion. No paper trail, and no good point to surface it later. I introduced a formal scope log that week: every addition required a written decision before it moved anywhere. Ran the scope process and delivery tracks in parallel from week three onward. Six additions tracked. Four parked. Two priced and converted to change requests.",
      },
      {
        stage: "03",
        title: "Ran a 48-hour parallel window the schedule didn't have. Found three issues before the board saw anything.",
        detail: "Cutover was two days before a board demo. Cutting over without a parallel run meant any quality issue would surface live, in front of the board. That's not a recoverable failure mode. I made the case to the sponsor: the board demo runs on clean data, or we find out it doesn't live. Ran QA and cutover prep simultaneously: QA on the legacy system, cutover on Databricks. Found three data quality issues. Fixed two in the window. Scoped the third out of the demo. Demo ran clean.",
      },
      {
        stage: "04",
        title: "Exit planning ran as a parallel track from week ten. Three risks, three tracks.",
        detail: "Week ten of eighteen: identified three exit risks: governance model untrusted, US/India tribal knowledge non-transferable, renewal conversation too late. Ran three tracks in parallel: governance co-design with the data lead and client legal, runbook development with both engineering leads, renewal positioning with the sponsor. Didn't wait until the last three weeks to start documentation. By week eighteen, the data lead asked to extend the contract. What he'd built over six years was now documented and transferable, not tied to one person.",
      },
    ],

    orchestration: [
      { team: "Client Data Lead", role: "Built 340 of the most-used objects over six years, none documented. If he wasn't on board, the migration had no legitimate co-signer and every technical decision would face friction.", type: "client" },
      { team: "Client Sponsor", role: "Budget authority. Set the board demo date. Needed confidence in the go/no-go call.", type: "exec" },
      { team: "Client Legal", role: "Co-authored the EdTech data classification policy. phData template wouldn't have covered student data requirements.", type: "client" },
      { team: "US India Engineers", role: "Needed a shared definition of done and an async protocol that worked across an 11-hour gap.", type: "ic" },
      { team: "Solutions Architect", role: "Designed Unity Catalog governance with the data lead's input, not around him.", type: "arch" },
      { team: "Migration QA", role: "Triaged 1,400 schema compatibility warnings to find the 23 that actually mattered.", type: "internal" },
      { team: "Program Lead Me", role: "Owned the client relationship, scope process, and the cutover go/no-go call.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Sequenced migration by downstream reach and who built each object, not by technical complexity.",
        tradeoff: "More coordination overhead for the engineering team: harder dependency graph to work with.",
        risk: "If the knowledge map was off, I'd spent weeks on a sequencing bet that didn't pay off.",
        outcome: "Data lead co-designed the governance model. Signed off UAT without a fight. Asked for the contract extension.",
      },
      {
        decision: "Introduced a formal scope change process in week three that the contract didn't require.",
        tradeoff: "Friction with the sponsor, who didn't want the overhead of a formal process.",
        risk: "Without it, six informal additions accumulate as absorbed margin erosion on a fixed-price contract.",
        outcome: "Six additions tracked, priced, and decided in writing. Four parked. Two converted to paid change requests. Margin closed at plan.",
      },
      {
        decision: "Pushed for a 48-hour parallel run window the schedule didn't include.",
        tradeoff: "Two additional engineer-days. A sponsor who believed it wasn't necessary.",
        risk: "Skipping it meant the board demo was the first live test. A quality issue surfaces in front of the board.",
        outcome: "Found three data quality issues. Fixed two in the window. Scoped the third out of the demo. No incidents.",
      },
      {
        decision: "Co-authored the Unity Catalog policy with client legal instead of using a phData template.",
        tradeoff: "Three weeks slower. Significantly more stakeholders involved.",
        risk: "A generic template wouldn't cover EdTech compliance. Legal wouldn't have signed it.",
        outcome: "Policy signed without revisions. Data lead trusted the governance framework because he helped design it.",
      },
      {
        decision: "Started exit documentation at week ten, not at week sixteen.",
        tradeoff: "Engineer time to documentation instead of feature delivery for six weeks.",
        risk: "A surprise exit would have left the client unable to run the platform.",
        outcome: "Data lead asked to extend the contract. What he'd built over six years was now documented in the platform, not tied to him personally.",
      },
    ],

    impact: [
      { value: "1 person", label: "from silent resistance to internal champion", tone: "primary" },
      { value: "48 hrs", label: "parallel run window that wasn't in the original plan", tone: "ok" },
      { value: "3 issues", label: "caught in parallel run; invisible without it", tone: "ok" },
      { value: "6/6", label: "scope changes decided transparently", tone: "primary" },
      { value: "+1", label: "contract extended. The data lead asked for it.", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "340 objects, all authored by one engineer over six years. Nothing documented, no runbook, no handoff plan.",
        "No agreed definition of done. Data lead and sponsor using different success criteria.",
        "No parallel run in the plan. Cutover risk unmanaged against a fixed board demo date.",
        "Scope additions handled informally. No visibility into cost or margin impact on a fixed-price contract.",
      ],
      after: [
        "Data lead co-designed the governance model and asked for the contract extension.",
        "Shared definition of done negotiated and signed before migration work started.",
        "Parallel run caught three data quality issues before the board saw anything.",
        "Six scope changes logged, priced, and decided in writing. Zero margin erosion.",
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
    type: "DATA PLATFORM",
    model: "T&M",
    year: "2024–26",
    industry: "Enterprise SaaS",
    domain: "Enterprise SaaS · 3 years",

    headline: "First QBR, I walked in with a delivery summary. The CFO asked what the platform had saved them in dollars. I didn't have an answer. Almost lost the renewal right there.",
    capability: "Three-year marketing data platform, two renewals. Owned every QBR, every scope renegotiation, and the handoff that had to leave them self-sufficient.",

    scale: [
      { value: "3 years", label: "sustained relevance" },
      { value: "2 renewals", label: "earned by solving current problems" },
      { value: "40%", label: "scope growth: a sign the platform was working" },
      { value: "12 QBRs", label: "where relevance had to be proved in numbers" },
      { value: "Zero", label: "unannounced breakages in years 2–3" },
      { value: "4 wks", label: "for client team to operate independently after handoff" },
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
      pipeline: ["QBR framed around ROI, not velocity", "Scope signals surfaced as change requests", "Data contracts with upstream change notice", "Exit built into year-three scope"],
      platform: "Snowflake + dbt + MWAA",
      consumers: [
        { name: "Marketing ops", type: "MARKETING" },
        { name: "RevOps", type: "OPS" },
        { name: "Executive reporting", type: "EXEC" },
        { name: "Attribution analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "Year-one QBR nearly failed: I had a delivery summary, the CFO needed ROI in dollars. Answering the wrong question for eleven months.", severity: "high" },
      { label: "Embedded engineer was the team's actual data domain owner. Contract structure implicitly demoted his expertise. Treating him as a handoff recipient created friction in every technical decision for a year.", severity: "high" },
      { label: "40% scope growth mid-program on a contract sized for the original scope. Three ways to frame it. Two of them created legal or margin risk.", severity: "high" },
      { label: "Two teams editing the same dbt models without coordination. Silent breakages until a pipeline failed in production. No upstream change notification process.", severity: "med" },
      { label: "Campaign structure changed twice in year two. Each change silently broke three dbt models downstream. Found in production each time.", severity: "med" },
      { label: "Platform infrastructure upgrade during a six-week client change freeze. Required a shadow environment not in the project plan.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Year-one QBR had the wrong frame. Rebuilt it 48 hours before the call.",
        detail: "QBR deck: delivery summary. Sprints completed, velocity, features shipped. CFO's first question: 'What has the platform saved us?' Didn't have a dollar answer. Rebuilt the deck in 48 hours: cost-per-campaign-insight, analyst-hours-reclaimed, time-to-attribution. Got the renewal. Restructured the entire program scorecard from week one of year two around those metrics. Year-two QBR was a different conversation.",
      },
      {
        stage: "02",
        title: "Embedded engineer had domain knowledge I needed. Changed who owned the roadmap.",
        detail: "Year one: I ran the roadmap, he pushed back on most of it. The pushback wasn't obstruction: he knew the data better than anyone on our side. I could keep running the roadmap and manage the friction, or make him a co-author and accept that decisions would take longer. Made him co-author. He moved from friction to advocacy inside two quarters. Roadmap quality went up. Renewal was easier because his internal reputation was attached to the platform's success.",
      },
      {
        stage: "03",
        title: "40% scope growth mid-program. One framing closed year three. The other two would have killed it.",
        detail: "Year two: marketing team expanded, scope grew 40% above the original contract. Flagging it as unmanaged expansion would trigger an audit or put us into a renegotiation from a defensive position. Absorbing it silently was a T&M margin problem. I framed it as evidence the platform had outgrown the original scope, and built the data for it: usage metrics, team growth, features being requested outside the contract. Year-three contract included a scope expansion. The renewal pitch was built on the argument that we'd underestimated the platform's value, not that we'd lost control of scope.",
      },
      {
        stage: "04",
        title: "Built the exit into year-three scope before it was a conversation.",
        detail: "When re-entering year-three negotiations, added explicit exit milestones: documentation, runbook handoff, the embedded engineer presenting the platform architecture internally. Client didn't ask for these. Built them in because a clean exit was the clearest proof of value: if they couldn't operate it without us, everything before that was infrastructure dependency, not delivery. He presented at the client's internal data summit four weeks post-handoff. Team running independently in four weeks.",
      },
    ],

    orchestration: [
      { team: "Client CFO", role: "Renewal authority. Needed ROI in dollars, not delivery metrics. Year-one QBR nearly failed this test.", type: "exec" },
      { team: "Embedded Engineer", role: "The team's actual data owner. Needed to become roadmap co-owner, not handoff recipient.", type: "client" },
      { team: "Marketing Ops Lead", role: "Upstream data owner who changed campaign structures twice. Needed a change notification process.", type: "client" },
      { team: "Data Engineers", role: "Snowflake + dbt build across three years and two contract cycles.", type: "ic" },
      { team: "Platform Architect", role: "Platform design and dbt governance model.", type: "arch" },
      { team: "Client Infra", role: "Environment management. Worked around a six-week change freeze with a shadow environment.", type: "client" },
      { team: "Program Lead Me", role: "QBR ownership, scope renegotiation, renewal conversations.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Rebuilt the year-one QBR deck 48 hours before the call when I realized I had the wrong frame.",
        tradeoff: "Two days of prep under time pressure instead of one.",
        risk: "A delivery-focused QBR might have lost the renewal. The CFO was asking a different question.",
        outcome: "Renewal approved. Year two started with 40% more scope because the QBR answered the CFO's actual question.",
      },
      {
        decision: "Made the embedded engineer a roadmap co-owner instead of a handoff recipient.",
        tradeoff: "Slower decisions. More collaborative design sessions. More of his opinions in the process.",
        risk: "Treating him as a handoff recipient would have left a resistant expert inside the client at exactly the wrong moment.",
        outcome: "He presented the platform at the client's internal data summit. That was the real handoff.",
      },
      {
        decision: "Framed the year-two scope growth as evidence of platform adoption when bringing it to the renewal conversation.",
        tradeoff: "Required reframing a potential problem as a proof point, which is a harder argument to make.",
        risk: "Presenting it as unmanaged expansion could have triggered a contract audit from a defensive position.",
        outcome: "Got year three plus a contract expansion. Scope growth became the argument for continued investment.",
      },
      {
        decision: "Introduced a data contract process requiring 2-week upstream change notice after the second dbt breakage.",
        tradeoff: "Added overhead to the marketing ops team's workflow.",
        risk: "Without it, upstream changes would continue to break models silently until they failed in production.",
        outcome: "Zero unannounced breaking changes in years two and three.",
      },
      {
        decision: "Built the exit plan into the year-three contract scope from day one.",
        tradeoff: "Allocated engineer time to documentation and training instead of feature delivery.",
        risk: "A surprise exit would have left the client unable to run the platform.",
        outcome: "Client team operating independently within four weeks of handoff. The embedded engineer ran the platform.",
      },
    ],

    impact: [
      { value: "2 renewals", label: "because the CFO got dollar numbers, not delivery metrics", tone: "primary" },
      { value: "40%", label: "scope growth became the argument for renewal", tone: "ok" },
      { value: "Zero", label: "unannounced breakages in years 2–3", tone: "ok" },
      { value: "1 engineer", label: "from resistant to presenting at the client data summit", tone: "primary" },
      { value: "4 wks", label: "for client team to operate independently at handoff", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "QBR built around delivery metrics. Wrong question for the CFO.",
        "Embedded engineer treated as a handoff recipient. Passive resistance throughout year one.",
        "Scope growth absorbed informally. Growing hidden exposure on a T&M contract.",
        "Upstream changes broke dbt models silently. No notification process; found in production.",
      ],
      after: [
        "QBR rebuilt around ROI: cost per insight, analyst hours reclaimed, renewal secured.",
        "Embedded engineer as co-owner. Presented the platform architecture at the client's internal data summit.",
        "40% scope growth documented and contracted. Framed as evidence of adoption, not scope creep.",
        "Data contract process: 2-week upstream notice, zero silent breakages in years 2–3.",
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
    type: "FAST DELIVERY",
    model: "T&M",
    year: "2024",
    industry: "Industrial Manufacturing",
    domain: "Industrial Manufacturing · US + India + China",

    headline: "Six-week fixed deadline. Day three: US team and China factory team gave different answers to 'what counts as a unit produced.' That wasn't a data problem. It was business policy baked into two different ERPs.",
    capability: "Six-week Snowflake build across US, India, and China. Held three teams together, reconciled the data model disagreement, shipped on schedule.",

    scale: [
      { value: "6 weeks", label: "hard deadline" },
      { value: "1 policy gap", label: "disguised as a data problem" },
      { value: "4 days", label: "to resolve a business definition disagreement" },
      { value: "3 teams", label: "who couldn't coordinate directly" },
      { value: "Zero", label: "days behind at close" },
      { value: "1 near-miss", label: "caught in week two" },
    ],

    ecosystem: {
      sources: [
        { name: "SAP ECC", type: "ERP" },
        { name: "Oracle R12", type: "ERP" },
        { name: "Factory MES", type: "MES" },
        { name: "WMS", type: "OPS" },
        { name: "Supplier feeds", type: "API" },
      ],
      pipeline: ["Business policy decision before data model", "Lateral knowledge sourcing", "Written async handoffs enforced week 2", "Scope out of window → post-delivery addendum"],
      platform: "Snowflake on Azure",
      consumers: [
        { name: "China factory ops", type: "OPS" },
        { name: "HQ supply chain", type: "OPS" },
        { name: "Regional finance", type: "FINANCE" },
        { name: "China site leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "US and China teams had different answers to 'what is a unit produced.' Not different data, but different business logic in SAP and Oracle built independently over different timescales. A data engineering solution to a business policy question would have been wrong.", severity: "high" },
      { label: "10.5-hour gap between US and China. Every live decision had a 24-hour lag. The cadence design was the program architecture: wrong cadence meant compounding delay for six weeks.", severity: "high" },
      { label: "SAP ECC schema undocumented. The allocated IT contact couldn't explain it. The person who knew it wasn't on the project and didn't know they were needed.", severity: "high" },
      { label: "China team treated 'async coordination' as WeChat messages. Five days of decisions verbal and untracked before discovery in week two.", severity: "med" },
      { label: "Environment provisioning took eight days instead of three. Three teams had to be kept productive without the infrastructure they were supposed to be building on.", severity: "med" },
      { label: "Two dashboard requirements at week four. Absorbing them meant a slip or a quality cut in a six-week window with an immovable close date.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Week one: identified a business policy disagreement inside a technical requirement.",
        detail: "First stakeholder session: asked both US corporate and China factory teams to define 'production output.' Different answers. I could model around it and ship, but the discrepancy wasn't data noise: it was business logic baked into SAP and Oracle at different times by different teams. Treating it as a data engineering problem would have embedded the disagreement into the platform permanently. I stopped the data modeling work and escalated to the sponsor: this was a business policy question that had to be answered before we wrote a single transformation. Resolved in four days. Data model designed correctly from the start.",
      },
      {
        stage: "02",
        title: "SAP ECC schema knowledge wasn't in the allocated contacts. Found it laterally.",
        detail: "The allocated IT contact couldn't explain the SAP ECC schema. Going through the formal escalation chain would take two weeks in a six-week program. Not an option. I asked the factory ops manager, who wasn't on the project, who had originally built it. He pointed me to one engineer. Four hours with that engineer: everything documented, field by field. Extraction started the same week. The formal channel would have cost me two weeks. The lateral conversation cost one hour.",
      },
      {
        stage: "03",
        title: "Verification check in week two found the China team wasn't using the protocol.",
        detail: "Scheduled check-in in week two: asked the China team lead to walk me through the last three handoff documents. There weren't any. The team interpreted 'async coordination' as WeChat messages. Five days of decisions were undocumented and untraceable. Raising it in a group meeting would have been a public correction, and I needed the team lead's trust for another four weeks. Went direct to him one-on-one instead. Written handoffs enforced from week two. No cross-team blocker lasted more than 24 hours for the rest of the program.",
      },
      {
        stage: "04",
        title: "Week-four scope additions: three options. I gave the sponsor one decision.",
        detail: "Week four: two dashboard requirements outside scope. Absorbing them required either a delivery slip or a quality trade-off in a six-week window with a hard close date. Presented one option to the sponsor: post-delivery addendum, with the reason that absorbing changes the delivery date or breaks quality, and neither is acceptable at week four of six. He chose the addendum. Closed on original scope.",
      },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "Had to make the business policy decision on production output, not a technical one.", type: "exec" },
      { team: "China Factory IT", role: "Local system access. Initially treated async protocol as optional.", type: "client" },
      { team: "Factory Ops Manager", role: "Not on the project. Knew who built the SAP schema. The lateral relationship that unblocked week two.", type: "client" },
      { team: "US Engineers", role: "dbt + Snowflake build. Needed the data definition resolved before they could model correctly.", type: "ic" },
      { team: "India Engineers", role: "Azure ingestion + SAP extraction. Worked the 11-hour gap with written async handoffs.", type: "ic" },
      { team: "Solutions Architect", role: "Snowflake on Azure design. Adapted the data model once the policy decision was made.", type: "arch" },
      { team: "Program Lead Me", role: "The only person overlapping all three teams. Every cross-team decision routed through me.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Escalated the data definition disagreement to the client sponsor as a business policy risk in week one instead of treating it as a data engineering problem.",
        tradeoff: "Forced a difficult business conversation before anyone wanted to have it.",
        risk: "Treating it as a technical problem would have delayed the policy decision until it caused a production modeling error.",
        outcome: "Business policy resolved in week one. Data model designed correctly from the start.",
      },
      {
        decision: "Went outside the formal project contacts to find the one engineer who actually knew the SAP ECC schema.",
        tradeoff: "Required goodwill from the factory ops manager and four hours of an engineer who wasn't on the project.",
        risk: "Working within the allocated contacts would have made the SAP integration a two-week blocker in a six-week program.",
        outcome: "Schema documented and extraction unblocked in two days instead of two weeks.",
      },
      {
        decision: "Verified the China team was using the coordination protocol in week two instead of assuming they understood it.",
        tradeoff: "An uncomfortable check-in that felt like micromanagement to the team lead.",
        risk: "Five more weeks of informal verbal handoffs would have created untracked decisions and blockers.",
        outcome: "Found the gap in week two. Fixed it. No cross-team blocker lasted more than 24 hours for the remaining four weeks.",
      },
      {
        decision: "Gave the sponsor a single option on week-four scope additions instead of presenting trade-offs for him to weigh.",
        tradeoff: "Required saying no to a client sponsor mid-program in a directive way.",
        risk: "Absorbing the additions would require a delivery slip or quality trade-off; multiple options invitation to negotiate.",
        outcome: "Addendum signed for the two new dashboards after delivery. Closed the delivery window on original scope.",
      },
    ],

    impact: [
      { value: "1 policy", label: "resolved before it became a production error", tone: "primary" },
      { value: "Zero", label: "days behind schedule at close", tone: "ok" },
      { value: "2 days", label: "to unblock SAP by going outside the project org chart", tone: "ok" },
      { value: "1 gap", label: "in coordination protocol caught in week two not week five", tone: "primary" },
      { value: "2 adds", label: "scope additions handled as an addendum, not a slip", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Business policy disagreement about production output baked silently into two ERP systems. Invisible as a data engineering problem.",
        "Coordination protocol existed on paper. China team treating it as optional.",
        "SAP ECC schema undocumented. Knowledge held by one person not allocated to the project.",
        "Two dashboard requirements in reserve with no process to handle mid-sprint additions in a fixed window.",
      ],
      after: [
        "Business definition reconciled in week one. Data model designed correctly from the start.",
        "Written async handoffs enforced in week two. No undocumented decisions for the remaining four weeks.",
        "SAP schema documented and extraction unblocked in two days. Found the right engineer through the ops manager, not the project org chart.",
        "Scope additions cleanly negotiated to a post-delivery addendum. Delivery window closed on original scope.",
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
    type: "INTERNAL AI PROGRAM",
    model: "INTERNAL",
    year: "2024–25",
    industry: "Professional Services · Data & AI Consulting",
    domain: "phData PMO · self-initiated",

    headline: "The agent was ready in three weeks. Getting Finance to trust it took two months. The bottleneck wasn't the technology.",
    capability: "Designed and shipped six internal AI agents with no mandate. Built the governance case from scratch, ran cohort adoption, documented the pattern.",

    scale: [
      { value: "3 weeks", label: "to build the first agent" },
      { value: "2 months", label: "to get Finance's yes" },
      { value: "1 audit trail", label: "that changed the governance conversation" },
      { value: "14 PMs", label: "adopted the platform" },
      { value: "6 agents", label: "in production" },
      { value: "2 agents", label: "built by others after I documented the pattern" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce", type: "CRM" },
        { name: "Jira", type: "OPS" },
        { name: "Google Drive", type: "API" },
        { name: "Slack", type: "API" },
        { name: "Time-tracking", type: "API" },
      ],
      pipeline: ["Two billing cycles as proof before approval", "Audit trail built before Finance meeting", "Agents ordered lowest risk to highest", "Cohort rollout, not a full launch"],
      platform: "Internal agent fleet for delivery PMs",
      consumers: [
        { name: "Delivery PMs", type: "OPS" },
        { name: "Finance", type: "FINANCE" },
        { name: "Sales engineering", type: "EXEC" },
        { name: "Leadership briefings", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Finance didn't need the billing agent to be accurate. They needed to know who was accountable when it was wrong. Those are different requirements. I hadn't built for the second one.", severity: "high" },
      { label: "No corporate AI governance framework. No policy to point to. Had to define the accountability case myself: what the agent does, where human review happens, what the audit trail looks like.", severity: "high" },
      { label: "PM team heard 'AI agent for PM work' as 'replacement for PMs.' Reframing required individual conversations. A Slack announcement would have produced permanent resistance.", severity: "high" },
      { label: "No precedent for the billing consolidation workflow in Glean's agent builder. Architecture designed without a template or prior implementation to reference.", severity: "med" },
      { label: "Non-adopters don't report that they're re-doing work manually. Had to instrument usage to find who wasn't using what and diagnose why.", severity: "med" },
      { label: "Three MCP integrations with different auth models and rate limits. Integration surface was harder than the agent reasoning logic.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Built the billing agent on personal time. Two cycles of proof data before asking for anything.",
        detail: "First decision: build the proof point before asking for permission. Month-end billing: four hours, every PM, every month, error-prone. Built the agent on personal time, ran it in parallel with the manual process for two billing cycles, logged every output alongside the manual result. When I brought Finance and IT a before/after with two months of accuracy data, the conversation shifted from 'should we trust AI' to 'what are the controls.' Didn't ask for governance sign-off without proof. Built the proof first, then structured the governance conversation around it.",
      },
      {
        stage: "02",
        title: "Finance's first question was accountability, not accuracy. I'd prepared for it.",
        detail: "Finance's opening question about the billing agent: 'If it makes an error, who catches it, and who's responsible?' Not: 'What's the accuracy rate?' Anticipated this: accuracy is a technical question and accountability is a legal one. Came with an answer for both: the audit trail design, the human review step, the output format that made errors visible before they left the system. Conversation moved from 'can we trust this' to 'what are the approval controls' in the first meeting. Governance approval came without a follow-up call.",
      },
      {
        stage: "03",
        title: "Sequenced agents by what Finance and the PM team would sign off on quickest. Billing first, client-facing last.",
        detail: "After billing: Sprint Health Summarizer (low stakes, high frequency, visible value). Then Risk Scanner. Then Budget Forecaster, which touches EAC and margin data. Finance wouldn't engage with anything that touched margin numbers until three prior agents had been running cleanly. Deck Drafter last: touches client-facing output, needs the most PM judgment in review, highest reputational risk if wrong. Ran the governance track and the build track in parallel for each agent: governance conversation opened while the prior agent was in adoption, build started after sign-off. Wrong sequencing (highest-stakes agent first) would have put the most skeptical audience in front of the least-tested output.",
      },
      {
        stage: "04",
        title: "Ran adoption as a three-cohort program. Usage instrumented from week one.",
        detail: "Three cohorts. Cohort one (three PMs) went first. Their feedback changed the Sprint Health Summarizer output format before cohort two saw it. Non-adopters got a one-on-one, not to push usage but to diagnose whether the agent was solving the right problem. Tracked usage per agent per PM from week one. Two agents needed changes based on cohort feedback. Fixed them before the next cohort. By cohort three, PMs were asking when the next agent was coming. Adoption followed the fix, not the launch.",
      },
    ],

    orchestration: [
      { team: "Finance Team", role: "Billing data access. Needed an audit trail and clear accountability, not just an accuracy number.", type: "client" },
      { team: "IT Security", role: "Data access, MCP auth, governance sign-off. Needed controls defined upfront, not promised retroactively.", type: "client" },
      { team: "Delivery PMs", role: "End users. Needed to see agents as admin relief, not job threat. Required individual conversations.", type: "ic" },
      { team: "phData Leadership", role: "Informal sponsor after the billing proof point. Didn't need to be sold after seeing the before/after numbers.", type: "exec" },
      { team: "Delivery Ops", role: "Adopted the pattern, built two more agents using the documentation I wrote.", type: "ic" },
      { team: "Platform Engineer", role: "MCP integration. Auth complexity across three systems was harder than the agent reasoning logic.", type: "ic" },
      { team: "Program Lead Me", role: "Designed agents, built the governance case from scratch, ran cohort rollout, documented the pattern.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Built the billing agent on personal time and ran it for two billing cycles before asking for governance approval.",
        tradeoff: "Risk of building something that wouldn't be approved.",
        risk: "Asking for approval without a proof point would have been a much harder conversation: abstract governance questions vs. concrete before/after data.",
        outcome: "Two months of billing data changed the conversation from 'should we trust AI' to 'what are the controls.' Finance approved in the first meeting.",
      },
      {
        decision: "Anticipated the accountability question and built the audit trail before Finance asked about it.",
        tradeoff: "Extra weeks of work before the governance conversation.",
        risk: "Showing up without an answer to the accountability question would have ended the conversation at the first question.",
        outcome: "Finance asked about controls, not whether to proceed. Approval in the same meeting.",
      },
      {
        decision: "Sequenced agents by what Finance and the PM team would approve first: lowest stakes earliest, highest-impact last.",
        tradeoff: "Delayed the agents I most wanted to build. Budget Forecaster came fourth.",
        risk: "Wrong sequencing would have put a high-stakes agent in front of a skeptical audience before trust was established.",
        outcome: "By the fourth agent, the PM team was asking when the next one was coming.",
      },
      {
        decision: "Ran a three-cohort adoption rollout instead of a full-team launch.",
        tradeoff: "Slower adoption in the short term. More coordination overhead.",
        risk: "A full-team launch with rough edges would have created early bad impressions that were hard to reverse.",
        outcome: "Cohort one feedback changed the Sprint Health Summarizer format before the rest of the team saw it.",
      },
      {
        decision: "Documented the agent design pattern before anyone asked.",
        tradeoff: "Time spent on documentation instead of building more agents.",
        risk: "Without documentation, the platform would have been tied to my continued involvement.",
        outcome: "Delivery ops built two more agents using the pattern. The program outlasted my direct involvement.",
      },
    ],

    impact: [
      { value: "2 months", label: "to get Finance's yes. The technology was ready in 3 weeks.", tone: "ai" },
      { value: "14 PMs", label: "adopted the platform", tone: "ok" },
      { value: "60%", label: "faster month-end billing cycle", tone: "primary" },
      { value: "2 agents", label: "built by others using the documented pattern", tone: "ai" },
      { value: "1 audit trail", label: "that changed the entire governance conversation", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Month-end billing: four hours, every PM, every month, error-prone.",
        "No corporate AI governance framework. No basis for Finance or IT to approve anything.",
        "PM team heard 'AI agents' as 'replacement for PMs.'",
        "Sprint health, risk tracking, and status updates done from scratch each week.",
      ],
      after: [
        "Billing cycle: under 90 minutes, >95% accuracy before human review.",
        "Governance case built from proof data. Finance approved once the audit trail made every error visible before it left the system.",
        "PM team using the platform for admin work; spending reclaimed time on client-facing judgment.",
        "Agent design pattern documented. Delivery ops built two more agents without me.",
      ],
    },

    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Salesforce MCP", "Slack MCP", "Jira MCP"],

    agents: [
      {
        name: "Billing Agent",
        replaces: "4 hours of manual invoice consolidation at month-end",
        adopters: "All PMs and Finance reviewers",
        tools: ["Salesforce MCP", "Google Apps Script", "Claude"],
        output: "Draft invoice with line items, hours, and variance flags; ready for human review",
        status: "live",
      },
      {
        name: "Sprint Health Summarizer",
        replaces: "PM writing the weekly sprint report manually from Jira",
        adopters: "PMs and delivery leadership",
        tools: ["Jira MCP", "Slack MCP", "Claude"],
        output: "Sprint summary with velocity, blockers, and risk flags",
        status: "live",
      },
      {
        name: "Risk Scanner",
        replaces: "Informal risk identification surfaced in standups",
        adopters: "PMs, delivery ops, program leads",
        tools: ["Jira MCP", "Glean", "Claude"],
        output: "Weekly risk log with severity ratings and suggested owners",
        status: "live",
      },
      {
        name: "Status Note Composer",
        replaces: "PM writing client status updates from scratch weekly",
        adopters: "All client-facing PMs",
        tools: ["Jira MCP", "Glean", "Claude"],
        output: "Draft status note in the client's format, ready for PM review and send",
        status: "live",
      },
      {
        name: "Budget Forecaster",
        replaces: "Manual Salesforce pull and Excel model for budget variance",
        adopters: "PMs and Finance",
        tools: ["Salesforce MCP", "Google Sheets", "Claude"],
        output: "EAC vs. plan report with variance flags and plain-language narrative",
        status: "live",
      },
      {
        name: "Deck Drafter",
        replaces: "PM building QBR and status decks from scratch",
        adopters: "Senior PMs and account leads",
        tools: ["Glean", "Google Slides MCP", "Claude"],
        output: "Draft deck structure with content pulled from project history. PM edits and presents.",
        status: "beta",
      },
    ],
  },
];
