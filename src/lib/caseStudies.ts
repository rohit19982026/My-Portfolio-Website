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
    capability: "Ran the EdTech data migration from start to finish. Owned the client relationship, every scope decision, and the final call on when to switch systems.",

    scale: [
      { value: "340", label: "objects with one author and nothing written down" },
      { value: "1 person", label: "who held six years of decisions in his head" },
      { value: "23 of 1,400", label: "automated warnings that actually needed fixing — two weeks to find them" },
      { value: "3 issues", label: "caught running both systems side by side before the board saw anything" },
      { value: "Zero", label: "problems at the board demo" },
      { value: "Extended", label: "contract at close — the client asked for it" },
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
      pipeline: ["Dependency + knowledge graph", "Sequenced by risk and ownership", "Per-object validation contracts", "Side-by-side run before cutover"],
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
      { label: "340 pieces of the data system were built by one engineer over six years, and none of it was written down. If he didn't share what he knew, the new system would carry the same hidden problems as the old one — just on faster hardware.", severity: "high" },
      { label: "No one had agreed on what 'finished' meant. The engineer wanted everything to work exactly as before. The executive wanted the board presentation to go smoothly. Those weren't the same target — and either one could block the project.", severity: "high" },
      { label: "The date to switch systems was tied to a board presentation, not to whether the work was ready. The presentation couldn't move. Any data problem found after the switch would surface in front of the board.", severity: "high" },
      { label: "The migration software flagged 1,400 potential problems. Two weeks of manual checking to find the 23 that actually needed fixing — time that wasn't in the original plan.", severity: "med" },
      { label: "Student data in EdTech has privacy requirements that standard data governance templates don't cover. There was no existing policy we could use. We had to write one from scratch with the client's legal team.", severity: "med" },
      { label: "The sponsor kept asking for extras informally. On a fixed-budget contract, saying yes without tracking means absorbing the cost with no record of it.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "First two weeks: mapped what everything depended on, and who built what. The order of migration followed from both.",
        detail: "Week one: mapped all 2,300 pieces of the data system to everything that depended on them. Twenty-three fed the most critical systems — executive dashboards, finance reports, and the board presentation. Week two: mapped each piece to who originally built it. Three hundred and forty had only one author: the data lead. Both maps together set the migration order. Anything that was widely relied on AND known only by one person moved to the end — with more time to test and more time to transfer the knowledge before we switched systems. That wasn't a diplomatic decision. It was the safest order given what was at risk.",
      },
      {
        stage: "02",
        title: "Extra requests kept coming in. The contract had no process for handling them. I built one.",
        detail: "Week three: the sponsor asked for something that wasn't in the contract. On a fixed-budget project, accepting extras without tracking means losing money quietly — with no record to show later. I introduced a scope log that week: every addition had to be written down and decided before anything moved. From week three onward, I tracked new requests separately from the main delivery. Six requests total. Four set aside. Two formally priced and added to the contract.",
      },
      {
        stage: "03",
        title: "Ran both systems side by side for 48 hours — time the schedule didn't have. Found three problems before the board saw anything.",
        detail: "The switch to the new system was two days before the board presentation. If we didn't check the data was clean first, any problem would show up in the boardroom. I told the sponsor: the demo runs on verified data, or we find out it doesn't in front of the board. We ran quality checks on the old system while preparing the new one at the same time. Found three data problems. Fixed two in time. Cut the third from the demo scope. The presentation ran without issues.",
      },
      {
        stage: "04",
        title: "Started planning the handoff at week ten — not at the end. Three separate risks, three tracks running at once.",
        detail: "Week ten of eighteen: I spotted three things that could make the handoff fail. First, the new data governance approach wasn't fully trusted yet. Second, a lot of what worked was still only in the data lead's head. Third, we hadn't started the renewal conversation. I ran all three at once: governance design sessions with the data lead and legal, documentation work with both engineering teams, and early renewal conversations with the sponsor. By week eighteen, the data lead had what he'd built over six years documented and shareable — and asked us to extend the contract.",
      },
    ],

    orchestration: [
      { team: "Client Data Lead", role: "Built most of the data system over six years, with nothing written down. Without his buy-in, every technical decision would face pushback and the migration would have no real co-owner on the client side.", type: "client" },
      { team: "Client Sponsor", role: "Budget holder. Set the board presentation date. Needed to trust the call on when to switch systems.", type: "exec" },
      { team: "Client Legal", role: "Helped write the student data policy from scratch. A standard template would not have covered what EdTech privacy rules require.", type: "client" },
      { team: "US India Engineers", role: "Needed an agreed definition of 'finished' and a written coordination process that worked across an 11-hour time difference.", type: "ic" },
      { team: "Solutions Architect", role: "Designed the new data governance model with the data lead's input built in — not handed to him after the fact.", type: "arch" },
      { team: "Migration QA", role: "Checked 1,400 automated warnings from the migration software to find the 23 that actually needed fixing.", type: "internal" },
      { team: "Program Lead", role: "Owned the client relationship, scope tracking, and the final decision on when to switch systems.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Chose the order of migration based on what was most relied on and who built it — not based on what was technically easiest to move.",
        tradeoff: "More coordination work for the engineering team — a more complex order of operations to manage.",
        risk: "If I had mapped who knew what incorrectly, we'd have spent weeks in the wrong order.",
        outcome: "The data lead helped design the new governance model. Signed off on testing without objection. Asked us to extend the contract.",
      },
      {
        decision: "Set up a formal process for tracking extra requests in week three, even though the contract didn't require one.",
        tradeoff: "The sponsor didn't want the extra paperwork.",
        risk: "Without it, six extra requests would have been absorbed silently at our cost.",
        outcome: "Six requests tracked and decided in writing. Four set aside. Two added to the contract as paid work. Budget closed as planned.",
      },
      {
        decision: "Pushed for 48 hours of running both systems at the same time — time the schedule didn't have.",
        tradeoff: "Two extra days of engineering time and a sponsor who didn't think it was needed.",
        risk: "Skipping it meant the board presentation would be the first real test. Any data problem would show up in the boardroom.",
        outcome: "Found three data quality issues. Fixed two in time. Cut the third from the demo scope. No incidents.",
      },
      {
        decision: "Wrote the data governance policy with the client's legal team instead of using a standard template.",
        tradeoff: "Three weeks slower and more people to coordinate.",
        risk: "A standard template would not have covered student data privacy requirements. Legal would have rejected it.",
        outcome: "Policy signed without revisions. The data lead trusted the governance framework because he helped design it.",
      },
      {
        decision: "Started writing handoff documentation at week ten instead of waiting until the end.",
        tradeoff: "Engineers spent time on documentation instead of building for six weeks.",
        risk: "Leaving without proper documentation would have left the client unable to run the system on their own.",
        outcome: "The data lead asked to extend the contract. What he'd built over six years was now documented — no longer tied to one person.",
      },
    ],

    impact: [
      { value: "1 person", label: "from quiet resistance to internal champion", tone: "primary" },
      { value: "48 hrs", label: "running both systems side by side — time the schedule didn't have", tone: "ok" },
      { value: "3 issues", label: "caught before the board saw anything; invisible without it", tone: "ok" },
      { value: "6/6", label: "extra requests decided transparently, in writing", tone: "primary" },
      { value: "+1", label: "contract extended. The data lead asked for it.", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "340 pieces of the system built by one person over six years. Nothing written down, no guide, no handoff plan.",
        "No agreed definition of 'finished.' The engineer and the executive were measuring success differently.",
        "No plan to run both systems at the same time before switching. Any problem would first show up at the board presentation.",
        "Extra requests handled informally, with no tracking of what they were costing on a fixed-budget contract.",
      ],
      after: [
        "The data lead helped design the new governance model and asked for the contract extension.",
        "Both sides agreed on what 'finished' meant before migration work began.",
        "Running both systems side by side caught three data problems before the board saw anything.",
        "Six extra requests logged, priced, and decided in writing. Budget closed as planned.",
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
    capability: "Three-year marketing data platform, two renewals. Owned every quarterly business review, every scope renegotiation, and a handoff designed to leave them able to run it without us.",

    scale: [
      { value: "48 hrs", label: "to rebuild the quarterly review around the CFO's actual question" },
      { value: "2 renewals", label: "because the review answered the question Finance was actually asking" },
      { value: "40%", label: "scope growth renegotiated as a contract expansion, not a problem" },
      { value: "Zero", label: "silent pipeline failures after the 2-week change notice rule" },
      { value: "1 engineer", label: "from blocking every roadmap decision to presenting the platform internally" },
      { value: "4 wks", label: "for the client team to run independently after handoff" },
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
      pipeline: ["Reviews framed around ROI, not delivery", "Scope signals surfaced as formal change requests", "Change notice process with upstream teams", "Exit built into year-three contract"],
      platform: "Snowflake + dbt + MWAA",
      consumers: [
        { name: "Marketing ops", type: "MARKETING" },
        { name: "RevOps", type: "OPS" },
        { name: "Executive reporting", type: "EXEC" },
        { name: "Attribution analytics", type: "ANALYTICS" },
      ],
    },

    challenges: [
      { label: "The year-one quarterly business review nearly cost us the renewal. I came with a progress summary. The CFO wanted to know what the platform had saved them in dollars. I had been answering the wrong question for eleven months.", severity: "high" },
      { label: "The client's engineer knew their data better than anyone on our team. But the contract treated him as someone to hand work off to, not someone to lead technical decisions. That friction showed up in every decision for a year.", severity: "high" },
      { label: "The work grew 40% above what the contract originally covered. There were three ways to present that to leadership. Two of them created legal or financial risk.", severity: "high" },
      { label: "Two teams were changing the same data pipelines without telling each other. Errors only showed up when something broke in production. There was no process for warning downstream teams about changes.", severity: "med" },
      { label: "The marketing team restructured their campaigns twice in year two. Each time, it quietly broke three data pipelines. Both times we only found out when something failed.", severity: "med" },
      { label: "We needed to upgrade the platform during a period when the client had frozen all system changes. We had to build a separate test environment that wasn't in the original plan.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "The year-one review had the wrong frame. Rebuilt the presentation 48 hours before the meeting.",
        detail: "The review deck was a progress summary — features built, work completed. The CFO's first question: 'What has this platform actually saved us?' I didn't have a dollar answer. I rebuilt the presentation in 48 hours around numbers the CFO cared about: cost per marketing insight, analyst hours saved, how much faster attribution had become. Got the renewal. Rebuilt the entire program scorecard from the start of year two around those metrics. The year-two review was a completely different conversation.",
      },
      {
        stage: "02",
        title: "The client's engineer understood the data better than I did. Changed who owned the roadmap.",
        detail: "Year one: I set the roadmap, he pushed back on most of it. The pushback wasn't obstruction — he understood their data better than anyone on our team. I could keep running the roadmap and manage the friction, or make him a co-owner and accept slower decisions. I made him co-owner. Within two quarters he shifted from critic to advocate. Roadmap quality improved. The renewal was easier because his reputation inside the company was now tied to the platform's success.",
      },
      {
        stage: "03",
        title: "The work grew 40% above the original contract. How I framed that determined whether we got year three.",
        detail: "Year two: the marketing team expanded and the work grew 40% beyond what the contract covered. Calling it unmanaged growth would have put us into a defensive renegotiation. Absorbing it quietly was a billing problem. I framed it as evidence the platform was working — the team had grown into it faster than expected — and built the numbers to support that: usage data, team headcount growth, features being requested outside the contract. Year three included a formal scope expansion. The renewal argument was that we'd underestimated how valuable the platform would become, not that we'd lost track of scope.",
      },
      {
        stage: "04",
        title: "Added handoff milestones to the year-three contract before anyone asked for them.",
        detail: "When negotiating year three, I added specific milestones for handing the platform over: full documentation, a step-by-step operating guide, and the client's engineer presenting the system to his own team. They didn't ask for these. I added them because a clean handoff was the clearest proof that we'd delivered something real — not just something they'd need us to maintain forever. He presented at the company's internal data event four weeks after handoff. The team ran independently within a month.",
      },
    ],

    orchestration: [
      { team: "Client CFO", role: "Renewal decision maker. Needed to see what the platform had saved in dollars, not how much work we'd delivered. The year-one review nearly failed on this.", type: "exec" },
      { team: "Embedded Engineer", role: "The person who knew the client's data best. Needed to become a co-owner of the roadmap — not someone we handed decisions to.", type: "client" },
      { team: "Marketing Ops Lead", role: "Owned the marketing data that fed our pipelines. Changed campaign structures twice without warning. Needed a formal change notice process.", type: "client" },
      { team: "Data Engineers", role: "Built and maintained the data platform across three years.", type: "ic" },
      { team: "Platform Architect", role: "Designed the platform architecture and the rules for how data pipelines were managed.", type: "arch" },
      { team: "Client Infra", role: "Managed the technical environment. Helped work around a six-week system change freeze.", type: "client" },
      { team: "Program Lead", role: "Ran every quarterly review, every scope renegotiation, and the renewal conversations.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Rebuilt the year-one review presentation 48 hours before the meeting when I realized I was answering the wrong question.",
        tradeoff: "Two days of prep under time pressure instead of one.",
        risk: "A delivery-focused review might have lost the renewal. The CFO cared about cost and ROI, not project velocity.",
        outcome: "Renewal approved. Year two started with 40% more scope because the review answered the CFO's actual question.",
      },
      {
        decision: "Made the client's engineer a co-owner of the roadmap instead of someone we handed decisions to.",
        tradeoff: "Slower decisions. More collaborative design sessions. More of his opinions in the process.",
        risk: "Treating him as a handoff recipient would have left the most knowledgeable person on the client side resisting the platform at renewal time.",
        outcome: "He presented the platform at the client's internal data event. That was the real handoff.",
      },
      {
        decision: "Presented the 40% scope growth as evidence the platform was working — not as a problem we'd failed to control.",
        tradeoff: "Required making a harder argument: turning a potential problem into a proof point.",
        risk: "Calling it unmanaged growth could have triggered a contract audit or put us into a defensive renegotiation.",
        outcome: "Got year three plus a contract expansion. Scope growth became the argument for continued investment.",
      },
      {
        decision: "After the second time an upstream change broke our pipelines without warning, I required two weeks' notice for any changes to shared data.",
        tradeoff: "Added overhead to the marketing ops team's workflow.",
        risk: "Without it, upstream changes would keep breaking our pipelines quietly until something failed.",
        outcome: "Zero unannounced pipeline failures in years two and three.",
      },
      {
        decision: "Wrote the handoff plan into the year-three contract from the start.",
        tradeoff: "Engineers spent time on documentation and training instead of building new features.",
        risk: "Leaving without a clear handoff plan would have left the client dependent on us — and given them a reason to question the whole engagement.",
        outcome: "Client team running independently within four weeks of handoff. The embedded engineer ran the platform.",
      },
    ],

    impact: [
      { value: "2 renewals", label: "because the CFO got dollar numbers, not delivery metrics", tone: "primary" },
      { value: "40%", label: "scope growth became the argument for renewal", tone: "ok" },
      { value: "Zero", label: "unannounced pipeline failures in years 2–3", tone: "ok" },
      { value: "1 engineer", label: "from resistant to presenting at the client data summit", tone: "primary" },
      { value: "4 wks", label: "for the client team to run independently at handoff", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "The quarterly review was built around progress — how much work was done. The CFO wanted to know what the platform had saved in dollars.",
        "The client's most knowledgeable engineer was treated as someone to hand work to, not lead on it. Passive resistance throughout year one.",
        "Scope growth absorbed informally, with no tracking of what it was costing.",
        "Upstream data changes would silently break our pipelines. Found out each time something failed.",
      ],
      after: [
        "Quarterly review rebuilt around ROI: cost per marketing insight, analyst hours saved, renewal secured.",
        "Embedded engineer as co-owner. Presented the platform architecture at the client's internal data event.",
        "40% scope growth documented and contracted. Framed as evidence of adoption, not a loss of control.",
        "Two-week change notice required for shared data. Zero silent pipeline failures in years 2–3.",
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
    capability: "Six-week data build across US, India, and China. Kept three teams coordinated, resolved a business definition disagreement disguised as a data problem, and shipped on time.",

    scale: [
      { value: "Day 3", label: "US and China teams gave different answers to the same question" },
      { value: "4 days", label: "to get a business decision that unblocked the data design" },
      { value: "10.5 hrs", label: "time zone gap managed with a schedule designed around it, not against it" },
      { value: "Zero", label: "days behind at close" },
      { value: "Week 2", label: "coordination gap found before five weeks of silent drift" },
      { value: "2 adds", label: "scope additions handled as a separate contract after delivery, not a slip" },
    ],

    ecosystem: {
      sources: [
        { name: "SAP ECC", type: "ERP" },
        { name: "Oracle R12", type: "ERP" },
        { name: "Factory MES", type: "MES" },
        { name: "WMS", type: "OPS" },
        { name: "Supplier feeds", type: "API" },
      ],
      pipeline: ["Business decision before data design", "Found the right expert outside the org chart", "Written handoffs required from week 2", "New scope moved to post-delivery contract"],
      platform: "Snowflake on Azure",
      consumers: [
        { name: "China factory ops", type: "OPS" },
        { name: "HQ supply chain", type: "OPS" },
        { name: "Regional finance", type: "FINANCE" },
        { name: "China site leadership", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "The US and China teams had different answers to one question: what counts as a unit produced? It wasn't a data formatting issue — each team had built their own definition into their own systems over the years. Solving it technically would have locked in the wrong answer permanently.", severity: "high" },
      { label: "The US and China teams were 10.5 hours apart. Any decision that needed both sides online had a 24-hour turnaround. How we structured the daily schedule was effectively the design of the program — get it wrong and delays would pile up across six weeks.", severity: "high" },
      { label: "The structure of the client's SAP system had never been documented. The IT contact we'd been given couldn't explain it. The person who actually understood it wasn't part of the project.", severity: "high" },
      { label: "The China team was making decisions over WeChat messages that needed to be formally documented. Five days of decisions were untracked before we found out in week two.", severity: "med" },
      { label: "Setting up the technical environment took eight days instead of three. All three teams needed to stay productive without access to the systems they were supposed to be building on.", severity: "med" },
      { label: "At week four, two new dashboard requirements appeared that weren't in the original scope. Taking them on meant either delivering late or cutting quality — in a project with a hard six-week deadline.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Week one: what looked like a data problem was actually a business decision that no one had made.",
        detail: "In the first stakeholder meeting, I asked both teams to define 'production output.' They gave different answers. I could engineer around the gap and ship — but the difference wasn't noise in the data. Each team had built their own definition into their own systems over years. Building around it would have locked the disagreement into the platform permanently. I stopped the data design work and brought it to the project sponsor: this needed to be a business decision, not a technical one. Decision made in four days. The data design started correctly from day one.",
      },
      {
        stage: "02",
        title: "The person who understood the SAP system wasn't on the project. I found them anyway.",
        detail: "The IT contact we'd been assigned couldn't explain how the SAP system was structured. Following the official escalation process would have taken two weeks in a six-week program. I asked the factory operations manager — not part of the project — who had originally set it up. He knew exactly who to call. Four hours with that engineer and everything was documented, field by field. Work started the same week. The official route would have cost two weeks. One conversation sideways cost one hour.",
      },
      {
        stage: "03",
        title: "In week two, I checked whether the China team was following the coordination process. They weren't.",
        detail: "At a week-two check-in, I asked the China team lead to walk me through the last three written handoffs. There weren't any. The team had been using WeChat for everything. Five days of decisions were gone. Raising it in a group call would have publicly embarrassed the team lead — and I needed his cooperation for four more weeks. I went directly to him, one-on-one. Written records required from week two onward. For the remaining four weeks, no coordination gap lasted more than 24 hours.",
      },
      {
        stage: "04",
        title: "At week four, new requirements came in. I gave the sponsor one clear recommendation, not options to weigh.",
        detail: "Week four: two dashboard requirements appeared that weren't in the contract. Taking them on meant either missing the deadline or cutting quality — neither was acceptable with two weeks left. I went to the sponsor with one recommendation: add them to a separate contract after delivery. The reason: absorbing them now moves the date or reduces quality, and this close to the deadline, neither is an option. He agreed. We delivered on the original scope.",
      },
    ],

    orchestration: [
      { team: "Client Sponsor", role: "Had to make the business call on what 'production output' means — not a data question, a management one.", type: "exec" },
      { team: "China Factory IT", role: "Controlled local system access. Initially treating the written coordination process as optional.", type: "client" },
      { team: "Factory Ops Manager", role: "Not on the project. Knew who originally built the SAP system. The one conversation that unblocked week two.", type: "client" },
      { team: "US Engineers", role: "Built the data pipelines. Needed the business definition resolved before they could design anything correctly.", type: "ic" },
      { team: "India Engineers", role: "Handled data ingestion and SAP extraction. Coordinated with US and China teams across an 11-hour gap using written handoffs.", type: "ic" },
      { team: "Solutions Architect", role: "Designed the data platform on Azure. Updated the data model once the business definition was settled.", type: "arch" },
      { team: "Program Lead", role: "The only person overlapping all three teams. Every cross-team decision routed through me.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Escalated the production output disagreement to the project sponsor in week one as a business decision — not a technical problem to engineer around.",
        tradeoff: "Required a difficult conversation before either side was ready for it.",
        risk: "Treating it as a data problem would have deferred the business decision until we'd shipped something wrong.",
        outcome: "Business definition resolved in week one. Data design started correctly from the beginning.",
      },
      {
        decision: "Went outside the official project contacts to find the one person who actually understood the SAP system.",
        tradeoff: "Required goodwill from a manager not on the project and four hours from an engineer who wasn't allocated to us.",
        risk: "Staying within the official contacts would have created a two-week delay in a six-week program.",
        outcome: "SAP system documented and extraction unblocked in two days instead of two weeks.",
      },
      {
        decision: "Checked whether the China team was actually following the coordination process in week two instead of assuming they were.",
        tradeoff: "An uncomfortable check-in that felt like micromanagement to the team lead.",
        risk: "Four more weeks of undocumented decisions would have created gaps we couldn't trace or fix.",
        outcome: "Found the gap in week two. Fixed it. No coordination gap lasted more than 24 hours for the remaining four weeks.",
      },
      {
        decision: "Brought the sponsor one clear recommendation on the week-four additions instead of options to weigh.",
        tradeoff: "Required telling a client sponsor 'no' clearly, mid-project.",
        risk: "Absorbing them would mean a late delivery or lower quality. Offering options would open a negotiation we didn't have time for.",
        outcome: "Separate contract signed for the two new dashboards after delivery. Original scope delivered on time.",
      },
    ],

    impact: [
      { value: "1 policy", label: "resolved before it became a production error", tone: "primary" },
      { value: "Zero", label: "days behind schedule at close", tone: "ok" },
      { value: "2 days", label: "to unblock SAP extraction by going outside the official project contacts", tone: "ok" },
      { value: "1 gap", label: "coordination gap caught in week two, not week five", tone: "primary" },
      { value: "2 adds", label: "scope additions handled as a separate contract, not a slip", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "The US and China teams had different definitions of 'production output,' each embedded in their own systems over years. No one had noticed — it looked like a data formatting issue.",
        "Written coordination process existed on paper. The China team was using WeChat instead.",
        "The SAP system structure was undocumented. The one person who understood it wasn't assigned to the project.",
        "Two dashboard requirements held back with no agreed process for handling additions in a fixed six-week window.",
      ],
      after: [
        "Business definition resolved in week one. Data design started correctly from the beginning.",
        "Written handoffs required from week two. No undocumented decisions for the remaining four weeks.",
        "SAP system documented and extraction unblocked in two days — found the right person through the operations manager, not the project org chart.",
        "Scope additions cleanly handled as a separate post-delivery contract. Original delivery closed on time.",
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
    capability: "Designed and shipped six internal AI tools with no official directive. Built the approval case from scratch, rolled them out in phases, and documented the design so others could build more.",

    scale: [
      { value: "3 weeks", label: "to build and test the first tool" },
      { value: "2 months", label: "to get Finance's yes" },
      { value: "1 audit trail", label: "that changed the entire approval conversation" },
      { value: "14 PMs", label: "on the delivery team adopted the platform" },
      { value: "6 agents", label: "in production" },
      { value: "2 agents", label: "built by other team members after I documented the design" },
    ],

    ecosystem: {
      sources: [
        { name: "Salesforce", type: "CRM" },
        { name: "Jira", type: "OPS" },
        { name: "Google Drive", type: "API" },
        { name: "Slack", type: "API" },
        { name: "Time-tracking", type: "API" },
      ],
      pipeline: ["Two billing cycles as proof before approval", "Audit trail built before Finance meeting", "Tools ordered lowest risk to highest", "Phased rollout, not a full-team launch"],
      platform: "Internal AI tool platform for delivery PMs",
      consumers: [
        { name: "Delivery PMs", type: "OPS" },
        { name: "Finance", type: "FINANCE" },
        { name: "Sales engineering", type: "EXEC" },
        { name: "Leadership briefings", type: "EXEC" },
      ],
    },

    challenges: [
      { label: "Finance didn't need the billing tool to be accurate. They needed to know who was accountable when it was wrong. Those are different requirements. I hadn't built for the second one.", severity: "high" },
      { label: "There was no company policy on using AI tools. I had to build the approval case from first principles: what the tool does, where a human reviews the output, and what records are kept if something goes wrong.", severity: "high" },
      { label: "When the PM team heard 'AI tools for PM work,' they heard 'replacing PMs.' Fixing that required a one-on-one conversation with each person. A company-wide announcement would have created permanent resistance.", severity: "high" },
      { label: "No one had built the billing workflow before in the tool I was using. The design had to be created from scratch with no reference or template.", severity: "med" },
      { label: "People who don't adopt a new tool don't tell you. I had to track usage data to find who wasn't using what, then have individual conversations to understand why.", severity: "med" },
      { label: "Connecting to three external systems — each with different login methods and usage limits — was technically harder than building the AI logic itself.", severity: "low" },
    ],

    journey: [
      {
        stage: "01",
        title: "Built the first tool on my own time. Two months of proof before asking anyone to approve it.",
        detail: "Month-end billing took four hours per PM every month, and errors were common. I built the tool on my own time and ran it alongside the manual process for two billing cycles, logging every result next to what the manual process produced. When I brought Finance and IT two months of side-by-side data, the conversation shifted from 'should we trust this?' to 'what controls do we need?' I didn't ask for sign-off without evidence. I built the evidence first, then had the approval conversation around it.",
      },
      {
        stage: "02",
        title: "Finance's first question wasn't 'is it accurate?' It was 'who's responsible when it's wrong?' I had an answer ready.",
        detail: "Finance's first question: 'If this makes an error, who catches it and who's responsible?' Not the accuracy rate — who's accountable. I'd expected this. Accuracy is a technical question; accountability is a legal one. I came prepared for both: a complete record of every output, a mandatory human review step, and an output format that made any error visible before it reached a client. In the first meeting, the conversation moved from 'can we trust this' to 'what are the approval steps.' Sign-off came without a follow-up.",
      },
      {
        stage: "03",
        title: "Built the lowest-risk tools first. The one that touched client work came last.",
        detail: "After billing, I built the Sprint Health Summarizer — low stakes, used every week, easy to evaluate. Then the Risk Scanner. Then the Budget Forecaster, which touches financial projections. Finance wouldn't approve anything near financial data until three prior tools had been running cleanly. The Deck Drafter came last: it touches client-facing presentations, needs the most human judgment in review, and has the highest cost if something goes wrong. For each tool, I started the approval conversation while the previous one was being rolled out, and started building only after sign-off. Building the highest-stakes tool first would have put the most skeptical reviewers in front of the least-tested output.",
      },
      {
        stage: "04",
        title: "Rolled out in three groups. Tracked who was using what from day one.",
        detail: "I rolled out to three PMs first. Their feedback changed the Sprint Health Summarizer's output format before the second group ever saw it. When someone wasn't using a tool, I had a one-on-one — not to push adoption, but to find out if the tool was solving the right problem. Tracked usage by person and by tool from day one. Two tools needed changes based on the first group's feedback. Fixed them before the second group started. By the third group, PMs were asking when the next tool was coming. Adoption followed the fixes, not the launch.",
      },
    ],

    orchestration: [
      { team: "Finance Team", role: "Controlled billing data access. Needed a complete record of every output and a clear accountability chain — not just an accuracy number.", type: "client" },
      { team: "IT Security", role: "Controlled data access and system connections. Needed security controls defined before approval, not promised after.", type: "client" },
      { team: "Delivery PMs", role: "The people using the tools every day. Needed to see them as time-savers, not job replacements. Each required a separate conversation.", type: "ic" },
      { team: "phData Leadership", role: "Became an informal sponsor after seeing the billing before/after numbers. No sales pitch needed after that.", type: "exec" },
      { team: "Delivery Ops", role: "Adopted the design pattern and used my documentation to build two more tools independently.", type: "ic" },
      { team: "Platform Engineer", role: "Built the connections to external systems. The auth complexity across three different systems was harder than building the AI logic.", type: "ic" },
      { team: "Program Lead", role: "Designed all six tools, built the approval case from scratch, ran the phased rollout, and documented the design pattern.", type: "pm" },
    ],

    decisions: [
      {
        decision: "Built the billing tool on my own time and tested it through two billing cycles before asking Finance to approve it.",
        tradeoff: "Risk of spending time on something that might not get approved.",
        risk: "Going to Finance without data would have been a much harder conversation — hypothetical risks versus two months of concrete before/after results.",
        outcome: "Two months of billing data changed the conversation from 'should we trust AI' to 'what are the controls.' Finance approved in the first meeting.",
      },
      {
        decision: "Built the complete record of every output and the human review step before Finance asked about them.",
        tradeoff: "Extra weeks of work before the approval conversation.",
        risk: "Showing up without an answer to the accountability question would have ended the conversation at the first question.",
        outcome: "Finance asked about controls, not whether to proceed. Approval in the same meeting.",
      },
      {
        decision: "Built the tools in the order most likely to earn approval — lowest risk first, highest impact last.",
        tradeoff: "Delayed the tools I most wanted to build. The Budget Forecaster came fourth.",
        risk: "Building the most sensitive tool first would have put the most skeptical reviewers in front of the least-tested output.",
        outcome: "By the fourth tool, the PM team was asking when the next one was coming.",
      },
      {
        decision: "Rolled out to three PMs first instead of launching to the whole team at once.",
        tradeoff: "Slower adoption in the short term. More coordination overhead.",
        risk: "A full-team launch with rough edges would have left lasting bad impressions that were hard to undo.",
        outcome: "The first group's feedback changed the Sprint Health Summarizer format before the rest of the team saw it.",
      },
      {
        decision: "Documented how the tools were built before anyone asked for it.",
        tradeoff: "Time spent on documentation instead of building more tools.",
        risk: "Without documentation, the tools only worked as long as I was still around to support them.",
        outcome: "Delivery ops built two more tools using the design I documented. The platform outlasted my direct involvement.",
      },
    ],

    impact: [
      { value: "2 months", label: "to get Finance's yes. The technology was ready in 3 weeks.", tone: "ai" },
      { value: "14 PMs", label: "of the delivery team adopted the platform", tone: "ok" },
      { value: "60%", label: "faster month-end billing cycle", tone: "primary" },
      { value: "2 agents", label: "built by others using the design I documented", tone: "ai" },
      { value: "1 audit trail", label: "that changed the entire approval conversation", tone: "ok" },
    ],

    beforeAfter: {
      before: [
        "Month-end billing: four hours, every PM, every month, error-prone.",
        "No company policy on AI tools. Finance and IT had no framework to approve anything.",
        "PM team heard 'AI tools for PM work' as 'replacing PMs.'",
        "Sprint updates, risk tracking, and status notes done from scratch each week.",
      ],
      after: [
        "Billing cycle: under 90 minutes, >95% accuracy before human review.",
        "Approval case built from two months of proof data. Finance approved once they could see every error before it left the system.",
        "PM team using the tools for admin work; using the time saved for client-facing decisions.",
        "Tool design documented. Delivery ops built two more without me.",
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
        output: "Budget vs. plan report with variance flags and plain-language narrative",
        status: "live",
      },
      {
        name: "Deck Drafter",
        replaces: "PM building quarterly review and status decks from scratch",
        adopters: "Senior PMs and account leads",
        tools: ["Glean", "Google Slides MCP", "Claude"],
        output: "Draft deck structure with content pulled from project history. PM edits and presents.",
        status: "beta",
      },
    ],
  },
];
