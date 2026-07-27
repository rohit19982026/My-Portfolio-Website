export interface Decision {
  problem: string; // the systemic/root problem — the fog, the gap, the wrong default
  action: string;  // the call I made + how it set the team/program up to succeed
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  industry: string;
  year: string;
  model: "T&M" | "FIXED-PRICE" | "MANAGED";
  context: string;
  decisions: Decision[];
  tradeoff: string;
  result: string;
  stack: string[];
  metrics: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "marketing-data-platform",
    number: "001",
    title: "Marketing Data Platform — MWAA & dbt",
    industry: "ENTERPRISE SAAS",
    year: "2024–26",
    model: "T&M",
    context:
      "$1.37M T&M program. Distributed engineering pod across US and India. Multiple security-gated workstreams — InfoSec, IAM, VPN — creating hard external dependencies that had no owner and no resolution timeline. Weekly steerco with VP-level sponsors and a hard SOW expiry on the horizon.",
    decisions: [
      {
        problem:
          "Seventeen external approvals — InfoSec, IAM, VPN — had sat open for weeks, several for six, with no single owner and no due date. Engineers were finishing their work and then going idle; the delay wasn't in the team, it was in the gaps between organizations.",
        action:
          "The blocker wasn't effort — it was that nobody could see what the waiting cost. So I put every open item in front of the steering committee each week with an owner's name and a day-count beside it, so the people who could actually clear them saw the aging in their own terms. Once the cost was visible, they moved — and the team stopped bleeding days to dependencies it couldn't control.",
      },
      {
        problem:
          "Six weeks out, the run-rate showed the budget would run dry before the full scope was done. The default ask — \"we need more money\" — starts an argument about cost, not value.",
        action:
          "I built the decision the sponsors actually needed: what we'd shipped, what remained, and what stopping half-finished would cost their business. Framed against outcomes instead of spend, the extension was an easy yes — and we kept delivering with no gap in funding.",
      },
      {
        problem:
          "Velocity kept sagging, and it wasn't the engineers. Client-side approvals were landing mid-sprint, so work would finish and then stall waiting on a sign-off nobody had scheduled.",
        action:
          "I stopped treating the client's approvals as an outside event and re-sequenced them as part of the production line — vendor-controlled work first, client-gated steps queued deliberately. Throughput recovered and held.",
      },
    ],
    tradeoff:
      "I caught the funding gap with six weeks to spare — but only because I'd started forecasting the burn-down instead of just reporting spend. On the spend view alone it wouldn't have surfaced until there was maybe a week left, far too late to build a case and get a $831K change order signed. That near-miss is why I now forecast where a program will land, not just where it's been.",
    result: "96% of scope delivered, and the contract extended.",
    stack: ["MWAA", "Airflow", "dbt", "AWS", "Slack Alerting"],
    metrics: [
      { label: "CONTRACT", value: "$1.37M" },
      { label: "EXTENSION", value: "$831K" },
      { label: "SCOPE DELIVERED", value: "96%" },
      { label: "DURATION", value: "2+ YRS" },
    ],
  },
  {
    id: "redshift-databricks",
    number: "002",
    title: "Cloud DW Migration — Redshift → Databricks",
    industry: "EDTECH",
    year: "2025–26",
    model: "FIXED-PRICE",
    context:
      "$669K fixed-scope program. ~2,300 production objects. 11-person dual-region pod (US + India). 16-week non-negotiable window set by an M&A cutover date. No room to negotiate the deadline, only the delivery model.",
    decisions: [
      {
        problem:
          "The deadline was an M&A cutover — a hard date with no version that slips. We were tracking progress in story points, which tells you about a sprint's rhythm but nothing about whether a fixed pile of work lands by a fixed day.",
        action:
          "So I changed what we measured to the only thing that answered the real question: objects completed per team per week, counted down against the cutover. The moment a team drifted off the line to the date, everyone could see it — including the team, which is what let them self-correct before I had to.",
      },
      {
        problem:
          "Two regions, a tight window, and several critical capabilities that lived in exactly one person's head. Any one of them out at the wrong moment could stall the critical path with nobody to pick it up.",
        action:
          "Before Sprint 1 I mapped every critical skill to who could do it, and where only one person held it, I built cross-training into the first two weeks. It cost early velocity — but when availability gaps hit later, and they did, the team absorbed them instead of stalling, because the knowledge was no longer single-threaded.",
      },
      {
        problem:
          "The team was using AI to accelerate migration code. In an M&A deal, the acquirer's reviewers will eventually ask exactly how the deliverable was built — and \"we're not sure\" is the kind of answer that reopens a closed diligence.",
        action:
          "I had us keep a running log of what was AI-assisted and how it was reviewed, sprint by sprint, rather than reconstructing it under pressure later. When diligence asked, the answer was already written down, and it never became a thread anyone had to pull.",
      },
    ],
    tradeoff:
      "Both the objects-per-week count and the AI-assist logging were overhead the team pushed back on early — it felt like bookkeeping on top of the real work. I kept them anyway, because a missed M&A date had no recovery path and a diligence surprise even less. Predictability was worth the friction.",
    result: "Hit the M&A cutover date with roughly 2,300 objects migrated.",
    stack: ["Databricks", "Redshift", "Unity Catalog", "Spark SQL"],
    metrics: [
      { label: "CONTRACT", value: "$669K" },
      { label: "OBJECTS", value: "~2,300" },
      { label: "TIMELINE", value: "16 WKS" },
      { label: "TEAM", value: "11 ENGINEERS" },
    ],
  },
  {
    id: "sql-server-snowflake",
    number: "003",
    title: "Reporting Platform — SQL Server → Snowflake",
    industry: "INVESTMENT MGMT",
    year: "2024",
    model: "FIXED-PRICE",
    context:
      "$180.5K fixed-price SOW — every over-hour came directly out of margin. 189 regulated reporting objects. 19-week window with a 3-week year-end blackout baked into the calendar and regulated change-management gates on every production deployment.",
    decisions: [
      {
        problem:
          "189 regulated reporting objects in a 19-week fixed-price window — every hour over came straight out of margin. Run the object types one after another and the arithmetic simply didn't close.",
        action:
          "I split the work into six tracks running at once, each with a clear owner and defined handoffs, so six parts of the migration advanced in parallel instead of queuing behind one another. That's what turned a schedule that didn't close on paper into one that closed in practice.",
      },
      {
        problem:
          "Every migration hides the same trap: the easy objects go first, so early progress flatters you, and by mid-project only the hard ones are left — with the schedule suddenly short and no room to react.",
        action:
          "So I refused to trust raw completion count and tracked progress weighted by object complexity instead. That surfaced a real gap about four weeks before a plain count would have — while there was still time to re-sequence rather than just report the slip.",
      },
      {
        problem:
          "A regulated year-end freeze took three untouchable weeks out of an already-tight window.",
        action:
          "I built the plan around the freeze from day one rather than treating it as a surprise: everything the team controlled scheduled before it, everything needing client sign-off staged for after. The freeze cost us nothing we hadn't already planned to lose.",
      },
    ],
    tradeoff:
      "Six parallel tracks meant standing up six capable leads and carrying more coordination overhead up front — real cost on a thin-margin fixed-price SOW. I spent it deliberately, because on this contract a blown date and a blown margin were the same failure, and parallelism was the only way to protect both.",
    result: "Delivered on the contract date, within budget, signed off the same day.",
    stack: ["Snowflake", "MSSQL", "Qlik Replicate", "Power BI"],
    metrics: [
      { label: "CONTRACT", value: "$180.5K" },
      { label: "OBJECTS", value: "189" },
      { label: "TIMELINE", value: "19 WKS" },
      { label: "PARALLEL TRACKS", value: "6" },
    ],
  },
  {
    id: "identity-resolution",
    number: "004",
    title: "Identity Resolution — Hadoop → Snowflake",
    industry: "MARTECH / ADTECH",
    year: "2024",
    model: "T&M",
    context:
      "$600K T&M engagement handed over with no Project Execution Plan, no WBS, no RAID log — and a parallel data-platform program already mid-flight with overlapping scope and shared infrastructure dependencies. The chaos was the starting condition.",
    decisions: [
      {
        problem:
          "The engagement landed on me with a $600K contract, eleven people, and no plan of any kind — no execution plan, no work breakdown, no risk log. The temptation is to start delivering immediately and look busy.",
        action:
          "But the worst time to impose structure is after a team's already moving, once assumptions have hardened. So I spent nine days up front writing it all from scratch — phases, breakdown, acceptance criteria, risk log, who owns what — before anyone touched Sprint 1. The team started on a plan instead of into a fog, and the first demo landed on it.",
      },
      {
        problem:
          "Architecture calls look purely technical until they land on the schedule — a component that takes three weeks to stand up instead of one, a choice that's painful to unwind eight sprints later. Engineering rightly owned those calls; the schedule risk inside them was invisible at the moment they were made.",
        action:
          "I didn't take the technical decisions — I just made \"what does this do to the timeline?\" a standing question next to every one, so the second-order cost was on the table while the choice was live instead of discovered later. The team kept ownership; the surprises stopped.",
      },
      {
        problem:
          "A second program was running for the same client on overlapping scope and shared infrastructure, and both teams were quietly making independent decisions about the same systems.",
        action:
          "I mapped where the two overlapped, got both engineering leads into one conversation, and made ownership explicit. Work that would have been built twice got cut from one of the plans before either team spent on it.",
      },
    ],
    tradeoff:
      "Nine days on planning before a single sprint made the visible start look slow, and on a T&M clock that's a fair thing for a client to question. I chose the slower start on purpose — retrofitting governance onto a team already in motion costs far more than the nine days did — and I said as much to the sponsor up front.",
    result: "First sprint demo landed on plan, and the program stayed on plan through every review.",
    stack: ["Snowflake", "Hadoop", "Spark", "Identity Graph"],
    metrics: [
      { label: "CONTRACT", value: "$600K" },
      { label: "TEAM", value: "11 PEOPLE" },
      { label: "PLAN WRITTEN IN", value: "9 DAYS" },
    ],
  },
  {
    id: "snowflake-china",
    number: "005",
    title: "Regional Data Platform — Snowflake, China",
    industry: "INDUSTRIAL MFG",
    year: "2024",
    model: "T&M",
    context:
      "PIPL-compliant Snowflake platform for a global industrial manufacturer's China operations. Three timezones — US sponsors, India engineering, China ops. Regulatory compliance gates on every release. A 2-week regional holiday landing inside the delivery window with no schedule buffer.",
    decisions: [
      {
        problem:
          "The platform had a long serial compliance chain — each step waiting on the one before, and several of them needing action from client teams in three different timezones. Miss a single handoff and everything downstream just sits.",
        action:
          "I mapped the whole chain end to end, put a named owner and a due date on every client-side step, and walked the list every sprint. Turning a vague \"someone should do this\" into \"this person, by this day\" was what kept a chain that easily stalls actually moving.",
      },
      {
        problem:
          "A two-week regional holiday fell squarely inside the delivery window, with no buffer to absorb it.",
        action:
          "I re-sequenced around it before it arrived: everything the team could build independently front-loaded ahead of the break, everything needing client input staged for after. The team shipped straight through the holiday and we didn't forfeit the two weeks.",
      },
      {
        problem:
          "Three stakeholder groups across three timezones — US sponsors, India engineering, China ops — and no hour of the day when all three were awake. Decisions were stacking up waiting for a live call that could never be scheduled.",
        action:
          "So I changed how the group decided rather than trying to force everyone into a meeting: written summaries after every significant call, one shared document always kept current, state visible to anyone without waiting for a handoff. Decisions stopped queuing behind calendars.",
      },
    ],
    tradeoff:
      "Making async the default meant individual decisions got slower — writing something down and waiting for reads is less immediate than settling it live. I took that trade knowingly: a slightly slower single decision beat decisions that waited days for a slot all three timezones could share.",
    result: "Live in 6 weeks, PIPL-compliant, with local data reaching plant managers.",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "PIPL"],
    metrics: [
      { label: "GO-LIVE", value: "6 WEEKS" },
      { label: "TIMEZONES", value: "3" },
      { label: "COMPLIANCE", value: "PIPL" },
    ],
  },
  {
    id: "managed-de-pod",
    number: "006",
    title: "Managed DE Pod — Medallion on Snowflake",
    industry: "SOFTWARE INTEL",
    year: "ONGOING",
    model: "MANAGED",
    context:
      "Embedded engineering pod ingesting 12+ source systems into a medallion lakehouse on Snowflake. Multiple competing business stakeholders with no shared prioritization framework. Backlog growing faster than capacity. UAT latency and approval lag creating invisible drag on velocity.",
    decisions: [
      {
        problem:
          "Several business stakeholders were feeding competing priorities into one backlog with no shared way to compare them. Without a common yardstick, prioritization becomes a volume contest — the loudest voice wins — and the PM ends up refereeing trade-offs the business owners are far better placed to make.",
        action:
          "I put a simple scoring model in front of everyone — impact, effort, urgency — visible before any meeting started. It pushed the trade-off down to the people who actually understood the business impact, and they began resolving priorities among themselves before anything reached my agenda. The mechanism kept running without me in the room, and it outlasted every individual planning cycle.",
      },
      {
        problem:
          "The backlog was clearing slower than it filled, and I couldn't see where the work was actually getting stuck.",
        action:
          "I measured time-in-stage across the whole pipeline and the drag showed itself: sign-offs sitting in client inboxes for an average of eleven days. I took the specific items, owners, and wait times to the people who could act — naming an invisible cost is usually most of the fix — and the cycle fell to four days.",
      },
      {
        problem:
          "A managed retainer renews on predictability, not just good work. Clients re-sign when they know who handles what, how decisions get made, and when they'll hear about a problem — and lose confidence when all of that lives only in the PM's head.",
        action:
          "I wrote the operating model down and ran to it — engineering owned sprint reviews, I owned stakeholder communication, decision rights were explicit — so the way the engagement ran was a capability the client could count on rather than something they had to trust me to remember. It's renewed every year since.",
      },
    ],
    tradeoff:
      "The scoring model took away the oldest way to win a priority fight — pushing hardest — and the louder stakeholders felt that early. I accepted the friction on purpose: a prioritization everyone could see and check was worth more to the engagement than keeping a few strong voices comfortable.",
    result: "Renewed every year since it started. UAT approvals went from 11 days to 4.",
    stack: ["Snowflake", "dbt", "Airflow", "Sigma", "Medallion"],
    metrics: [
      { label: "SOURCE SYSTEMS", value: "12+" },
      { label: "UAT CYCLE", value: "11 → 4 DAYS" },
      { label: "RENEWALS", value: "ANNUAL" },
    ],
  },
];
