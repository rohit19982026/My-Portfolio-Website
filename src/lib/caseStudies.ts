export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  industry: string;
  year: string;
  model: "T&M" | "FIXED-PRICE" | "MANAGED";
  context: string;
  moves: string[];
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
    moves: [
      "External approvals — InfoSec, IAM, VPN — had been sitting open for weeks, some for six weeks, with no owner and no deadline. I've learned that people in large organizations don't move on things nobody is watching — accountability requires visibility. I put every open item on the executive agenda each week with a name and a day count next to it. 17 blockers cleared in 8 weeks.",
      "Six weeks before the contract ended, I saw we'd run out of budget before finishing the full scope. The way you frame an extension request matters more than most people realize — \"we need more money\" starts a negotiation about cost; showing what was delivered, what's left, and what stopping halfway costs the business is a different conversation. I built that view and took it to the client's CFO and VP Engineering. $831K extension approved in 10 business days.",
      "Velocity kept dropping, and it wasn't the team. Client approval tasks were landing mid-sprint — engineers would finish their work and then wait idle, like a factory line that stops because the inspector hasn't shown up yet. I restructured the schedule so vendor-controlled work came first and client-gated steps came last. Velocity came back and held: 96% of scope, 99.98% of budget.",
    ],
    result: "96% SCOPE · 99.98% BUDGET · ENGAGEMENT EXTENDED",
    stack: ["MWAA", "Airflow", "dbt", "AWS", "Slack Alerting"],
    metrics: [
      { label: "TOTAL VALUE", value: "$1.37M" },
      { label: "EXECUTION", value: "99.98%" },
      { label: "SCOPE EXPANSION", value: "$831K" },
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
    moves: [
      "The deadline was an M&A cutover — hard date, ~2,300 objects to migrate. We were tracking progress in story points, which is fine for an ongoing sprint cadence but tells you nothing about whether you'll hit a specific date with a specific deliverable count. I changed the metric to what actually mattered: objects completed per team per week against the M&A date. If a team fell behind, it showed immediately.",
      "11 engineers across two regions, 16 weeks, no room for a single point of failure on the critical path. Before Sprint 1 I mapped every critical skill to who could do it. Wherever only one person held a key capability, I built cross-training into the first two weeks. When availability issues came up — and they did — the work kept moving.",
      "The team used AI tools to accelerate migration code. In an M&A context, the client's legal team would eventually review the deliverable and ask questions about it. I kept a log of what was AI-assisted and what the review process looked like at every sprint. When they asked during due diligence, the documentation was already there — it didn't become an issue.",
    ],
    result: "16-WEEK M&A CUTOVER DELIVERED · ~2,300 OBJECTS MIGRATED",
    stack: ["Databricks", "Redshift", "Unity Catalog", "Spark SQL", "AIAD"],
    metrics: [
      { label: "CONTRACT", value: "$669K" },
      { label: "OBJECTS", value: "~2,300" },
      { label: "TIMELINE", value: "16 WKS" },
      { label: "POD", value: "11 ENG" },
      { label: "REGIONS", value: "US + IN" },
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
    moves: [
      "189 regulated reporting objects, 19 weeks, fixed price. Running them sequentially — one type at a time — meant the timeline didn't work. I split the work into 6 parallel tracks running simultaneously, each with its own lead and clear handoffs between them. Six parts of the migration moved at once instead of waiting in line.",
      "Every migration has the same trap: easy objects go first, so early progress looks better than reality. By mid-project you're only left with the complex ones, and the schedule suddenly looks wrong with no time to recover — like a student who does all the easy exam questions first and runs out of time on the hard ones. I tracked completion weighted by object complexity, not raw count. That surfaced a gap 4 weeks before standard tracking would have, with time to re-sequence.",
      "A regulated year-end freeze took three weeks out of our 19-week window — non-negotiable. I built the schedule around it from day one: everything the team controlled before the freeze, everything needing client sign-off after. Hit the contract date, full margin, client signed off the same day.",
    ],
    result: "ON TIME · ON BUDGET · CLIENT SIGN-OFF SAME DAY",
    stack: ["Snowflake", "MSSQL", "Qlik Replicate", "Power BI"],
    metrics: [
      { label: "CONTRACT", value: "$180.5K" },
      { label: "OBJECTS", value: "189" },
      { label: "TIMELINE", value: "19 WKS" },
      { label: "EPICS", value: "6 PARALLEL" },
      { label: "MARGIN", value: "PROTECTED" },
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
    moves: [
      "The engagement was handed over with a $600K contract, 11 people, and no plan at all. The worst time to build project structure is after a team has started — they've already made assumptions, and you end up retrofitting governance onto a moving train. I spent 9 days writing everything from scratch before Sprint 1: phases, task breakdown, acceptance criteria, risk log, who-does-what. The first sprint demo ran on plan.",
      "Architecture decisions look purely technical until they hit the schedule — a tool that takes three weeks to configure instead of one, a schema that's painful to change in Sprint 8, a dependency another team hits in week 12. Engineering owned the technical calls on this project. I just made it standard to ask \"what does this mean for the timeline?\" alongside every technical trade-off, so the project impact was visible when the decision was made.",
      "A parallel program was running for the same client on overlapping scope and shared infrastructure. Both teams were making independent decisions about the same systems without knowing it. I mapped the overlap, got both engineering leads into the same conversation, and established who owned what. Work that would have been built twice was cut from one plan.",
    ],
    result: "FIRST SPRINT DEMO ON PLAN · GREEN THROUGH EVERY REVIEW",
    stack: ["Snowflake", "Hadoop", "Spark", "Identity Graph"],
    metrics: [
      { label: "CONTRACT", value: "$600K" },
      { label: "MODEL", value: "T&M" },
      { label: "PEP TURNAROUND", value: "9 DAYS" },
      { label: "HEALTH", value: "GREEN" },
      { label: "SYNERGY", value: "2 PROGRAMS" },
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
    moves: [
      "A PIPL-compliant Snowflake platform has a long delivery chain — provisioning, data landing, validation, orchestration, compliance review — where each step depends on the one before, and several require client teams in different timezones to take action. Miss one step and everything downstream waits. I mapped the full chain, assigned named owners and due dates to every client-side action, and reviewed the list every sprint.",
      "A two-week regional holiday fell inside the delivery window. I re-sequenced the sprint plan around it: everything the team could build independently front-loaded before the break, everything needing client input scheduled after. The team kept shipping through the holiday. We didn't lose the two weeks.",
      "Three stakeholder groups, three timezones — US sponsors, India engineering, China operations. No meeting time works across all three, and decisions were stacking up waiting for live calls. The fix wasn't more meetings — it was making async the default. Written summaries after every significant call, one shared document kept current, anyone could see the state without waiting. Decisions stopped waiting for meetings.",
    ],
    result: "LIVE IN 6 WEEKS · PIPL-COMPLIANT · LOCAL DATA TO PLANT MANAGERS",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "PIPL"],
    metrics: [
      { label: "GO-LIVE", value: "6 WEEKS" },
      { label: "REGIONS", value: "3 ZONES" },
      { label: "COMPLIANCE", value: "PIPL" },
      { label: "STAKEHOLDERS", value: "EXEC + OPS" },
      { label: "DELIVERY", value: "ON-TIME" },
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
    moves: [
      "Multiple stakeholders were feeding competing priorities into the same backlog with no shared framework to compare them. Without one, prioritization becomes a political negotiation — whoever pushes hardest wins — and the PM ends up arbitrating trade-offs that should be made by the people who understand the business impact. I introduced a scoring model — impact, effort, urgency — visible to everyone before any meeting. Stakeholders started resolving trade-offs before they reached the agenda.",
      "The backlog was growing faster than it was clearing, but I couldn't see where work was stalling. I tracked time-in-stage across the full pipeline and found the problem: UAT approvals sitting in client inboxes for an average of 11 days. I brought the data — specific items, owners, wait times — to the people who could act on it. The cycle dropped to 4 days.",
      "A managed retainer earns renewal by being predictable, not just by doing good work. Clients renew when they know what to expect: who handles what, how decisions get made, when they'll hear about problems. I wrote the operating model down and ran to it — engineering owned sprint reviews, I owned stakeholder communication, decision rights were explicit. The engagement has renewed every year.",
    ],
    result: "RENEWED ANNUALLY · EMBEDDED AS TRUSTED INTERNAL CAPABILITY",
    stack: ["Snowflake", "dbt", "Airflow", "Sigma", "Medallion"],
    metrics: [
      { label: "SOURCES", value: "12+" },
      { label: "ARCH", value: "MEDALLION" },
      { label: "RENEWAL", value: "ANNUAL" },
      { label: "STATUS", value: "EMBEDDED" },
      { label: "MODE", value: "MANAGED" },
    ],
  },
];
