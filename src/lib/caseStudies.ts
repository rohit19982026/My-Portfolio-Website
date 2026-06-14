export interface CaseStudy {
  id: string;
  number: string;
  type: string;
  title: string;
  outcome: string;
  industry: string;
  year: string;
  model: "T&M" | "FIXED-PRICE" | "MANAGED" | "INTERNAL";
  entry: {
    mode: "kickoff" | "assigned" | "inherited" | "built";
    narrative: string;
  };
  spotlight: "decisions" | "metrics" | "timeline" | "scale" | "stakeholder";
  timeline?: { label: string; detail: string }[];
  headlineMetrics?: [number, number];
  context: string;
  role: string;
  actions: string[];
  decisions: string[];
  result: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  learnings: {
    worked: string;
    differently: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "redshift-databricks",
    number: "001",
    type: "DATA MIGRATION",
    title: "Migrating Redshift to Databricks, Around the Access That Wasn't Granted Yet",
    outcome: "Redshift → Databricks Unity Catalog · ~2,300 production objects · Fixed-price, US + India pod",
    industry: "EDTECH",
    year: "2025–26",
    model: "FIXED-PRICE",
    entry: {
      mode: "kickoff",
      narrative:
        "Picked this up in the sales Slack channel at SOW signature — fixed-price migration with the cutover already in the deck and a US-India pod to stand up while the engineers had to wait on source-system access I couldn't pre-grant.",
    },
    spotlight: "decisions",
    context:
      "A fixed-price migration of ~2,300 production data objects from Amazon Redshift to Databricks Unity Catalog. Two pods across US and India. The architecture (Unity Catalog setup, the medallion layering, SQL dialect translation tooling) was the engineering team's and the architect's call. My job was the kickoff, the weekly cadence, the access escalations, the cutover comms, and the closure.",
    role:
      "PM end-to-end on the engagement. Internal kickoff with AE/SE/delivery lead, external kickoff with the client product owner and sponsor, sprint cadence and ceremonies, weekly status to AE/SE and client sponsor, RAID log, Certinia financials, and the cutover plan with the architect.",
    actions: [
      "Worked the Project Initiation Checklist on day one — Certinia setup checked against the SOW (dates, rates, roles, budget, PO coding), PMO peer review confirmed in #pmo-peer-review, Slack channel up, internal and external kickoff decks rehearsed, welcome email out with the access asks because access was always going to be the blocker.",
      "Held the weekly cadence — status report to AE/SE/delivery lead and the client sponsor on the same day each week, the 30-minute internal leadership prep, then the client-facing leadership meeting (timeline, accomplishments, blockers, risks). Kept the Certinia color status honest — went yellow on access delays the client side owned, even when it was easier to leave it green.",
      "Live RAID log on access requests, environment readiness, and cutover dependencies. Two access requests stalled long enough that I escalated to the client sponsor and our AE in the same conversation rather than wait — both unblocked the next week.",
      "Worked the cutover plan with the architect and the client engineering team — comms timeline, rollback window, who was paged, downstream owner sign-offs. Then the Project Closure Checklist: final invoicing reconciled in Certinia, final status report, NPS, knowledge transfer to the client team taking it forward, access removed.",
    ],
    decisions: [
      "Flagged the program yellow in week 4 when an access request had been open three weeks and the client SME had gone quiet — not because anything had broken yet, but because on fixed-price every week of access delay is a week you can't get back, and naming it gave the AE room to talk to the client side. Unblocked the next week.",
      "Pushed back on a mid-program scope addition by getting the architect's estimate in writing, taking it to the AE, and routing it through change-order rather than absorbing it inside the SOW. Short conversation because the math was clear.",
    ],
    result: "✓ ~2,300 OBJECTS MIGRATED · CUTOVER DELIVERED · CLOSURE CHECKLIST RUN · KT'D TO CLIENT TEAM",
    stack: ["Databricks", "Amazon Redshift", "Unity Catalog", "Azure DevOps", "Jira", "Certinia"],
    metrics: [
      { label: "OBJECTS", value: "~2,300" },
      { label: "TEAM", value: "US + INDIA" },
      { label: "MODEL", value: "FIXED-PRICE" },
      { label: "RAID", value: "LIVE" },
      { label: "PHASE", value: "CLOSED" },
    ],
    learnings: {
      worked:
        "Putting access requests in the welcome email on day one and escalating the stuck ones at week 3 rather than week 6. On fixed-price work, every week of access delay is a week you don't get back — and the AE needs to know early enough to act on the client side.",
      differently:
        "I underestimated how much PM time the two-region pod would take in the first three weeks. The standup and grooming rhythm I'd planned for one pod had to be doubled, and the other program I was covering felt the squeeze. Next time I'd either run thinner ceremony in the second region for the ramp window, or get coverage on the other program while a new pod is setting up.",
    },
  },
  {
    id: "marketing-data-platform",
    number: "002",
    type: "PLATFORM BUILD",
    title: "Two Years on a Marketing Data Platform — and the Conversations That Kept It Going",
    outcome: "MWAA + dbt + Snowflake on AWS · Multi-year T&M · Renewed",
    industry: "ENTERPRISE SAAS · MARKETING TECH",
    year: "2024–26",
    model: "T&M",
    entry: {
      mode: "kickoff",
      narrative:
        "Joined at SOW signature on a multi-year T&M build. T&M means burn is the constant conversation, and on something that runs for two years, the relationship with the AE and the client sponsor matters as much as anything on the sprint board.",
    },
    spotlight: "stakeholder",
    headlineMetrics: [1, 2],
    context:
      "A multi-year T&M engagement building a marketing data platform on MWAA (Airflow), dbt, and Snowflake. Multiple stakeholders on the client side with different priorities, a sponsor who needed VP-level updates, and an engineer counterpart on the client team who held the keys to half the source-system access.",
    role:
      "PM end-to-end. Certinia, weekly status, internal and client leadership meetings, RAID, change-order surfacing, the renewal-adjacent conversations. The engineers and architect owned the build; I held the cadence steady and read the room on the client side.",
    actions: [
      "Ran a steady weekly cadence — status to AE/SE/delivery lead and the client sponsor at the same time each week, the 30-min internal prep before the client leadership meeting, and the client leadership meeting itself with the timeline / accomplishments / blockers / risks frame.",
      "Mapped the stakeholders the slow way. Who actually held decisions vs. influenced them. Which engineer's pings the client took seriously. What the sponsor needed in their report to their own boss. Adjusted the form of the weekly update to fit each audience instead of sending the same note to everyone.",
      "Surfaced scope-growth signals to the AE in the weekly leadership prep — flagged two adjacent problem areas the client mentioned in passing that turned into formal change-order conversations rather than free work.",
      "Kept Certinia clean every week — timecards in, color status honest, burn vs. SOW tracked alongside the Sigma PMO dashboard so my numbers and leadership's numbers always told the same story.",
    ],
    decisions: [
      "Told the client engineering counterpart, on a fixed-bid adjacent piece, that the six-week wait we'd had on their access grant was the reason a sub-deliverable was going to slip — not as a complaint, as a clean ownership statement. Uncomfortable in the moment; cleared a recurring access-delay pattern for the rest of the engagement.",
      "Held the line on a hallway request for an out-of-scope dashboard. Got the engineer's estimate, sized the change-order with the AE, either it went in officially or it didn't. Lost a small bit of client goodwill that week; kept the budget honest for the year.",
    ],
    result: "✓ MULTI-YEAR T&M · COLOR STATUS HONEST · CHANGE-ORDERS RAISED · ENGAGEMENT RENEWED",
    stack: ["MWAA (Airflow on AWS)", "dbt", "Snowflake", "AWS", "Jira", "Certinia"],
    metrics: [
      { label: "MODEL", value: "T&M" },
      { label: "DURATION", value: "2+ YRS" },
      { label: "STATUS", value: "RENEWED" },
      { label: "CADENCE", value: "WEEKLY" },
      { label: "BURN", value: "TRACKED WEEKLY" },
    ],
    learnings: {
      worked:
        "Putting the same status report out at the same time every week. Boring, easy to skip, single most important thing for staying trusted over a multi-year T&M. When the hard conversations came, the AE and the client sponsor already had the context.",
      differently:
        "I waited too long on one client engineer who was a quiet blocker — kept routing access requests through the same channel hoping it would unstick, when an earlier escalation to my AE and theirs would have shortened the pattern by a quarter. Default to escalating earlier than feels comfortable.",
    },
  },
  {
    id: "snowflake-china",
    number: "003",
    type: "REGIONAL DEPLOYMENT",
    title: "Running a 3-Timezone Snowflake Program Around Lunar New Year",
    outcome: "Snowflake build · China factory operations · US / India / China site · Lunar New Year mid-window",
    industry: "INDUSTRIAL MANUFACTURING",
    year: "2024",
    model: "T&M",
    entry: {
      mode: "kickoff",
      narrative:
        "Assigned in the sales Slack channel. T&M Snowflake build for a global manufacturer's China factory operations. A 10.5-hour timezone spread between the US delivery lead and the client site, with Lunar New Year sitting three weeks into a six-week window.",
    },
    spotlight: "timeline",
    timeline: [
      { label: "WEEK 1", detail: "Internal + external kickoff. Welcome email out, access requests escalated through the client product owner because synchronous channels weren't going to work" },
      { label: "WEEK 2", detail: "Cadence flipped async-first — status at a fixed point in each region's day, shared decision register replacing live decisions" },
      { label: "WEEK 3", detail: "Re-baselined around Lunar New Year — vendor work front-loaded, client validation back-loaded, no open critical-path through the holiday" },
      { label: "WEEK 6", detail: "Closure checklist run — final status, NPS, KT to ongoing support, access removed" },
    ],
    context:
      "A Snowflake platform build for a global industrial manufacturer's China factory operations. 3-timezone delivery (US, India, China site) with a 10.5-hour spread between the US delivery lead and the client. Lunar New Year sat 3 weeks into the 6-week window.",
    role:
      "PM across the timezone spread and the holiday — kickoff, async-first cadence design, weekly status that worked in all three regions, RAID, financials, and closure.",
    actions: [
      "Worked the kickoff sequence on day one — Certinia setup, PMO peer review confirmed, the Slack channel and Drive folder up, internal kickoff with AE/SE/delivery lead, external kickoff scheduled to work for everyone (the China site joined first thing in their day; the US lead late afternoon theirs).",
      "Redesigned the weekly cadence as async-first by week two when it became clear two of the three regions wouldn't reliably be in the same live meeting. Written status went out at the same point in each region's day; a shared decision register people could comment on replaced the synchronous decision moments; the live leadership meeting moved from weekly to fortnightly.",
      "Re-baselined the schedule around Lunar New Year three weeks in — front-loaded vendor development, back-loaded client validation, and walked the AE and the client sponsor through the new plan so nobody hit the holiday with open critical-path work.",
      "Owned the RAID log, the color status in Certinia, the weekly burn vs. the Sigma PMO dashboard, and the closure checklist (final status, NPS, KT to the client's ongoing support team, access removed).",
    ],
    decisions: [
      "Moved the client leadership meeting from weekly synchronous to fortnightly async — felt risky with a client used to live meetings, but stopped a 24-hour decision-lag pattern from compounding across the window.",
      "Treated Lunar New Year as a program design constraint to re-baseline around in week 3, not a thing to absorb in real time — required a transparent conversation with the client about reshaping the schedule, but kept us off any open critical-path work during the holiday.",
    ],
    result: "✓ DELIVERED ACROSS 3 TIMEZONES · LUNAR NEW YEAR ABSORBED · CLOSURE COMPLETE",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Jira", "Certinia"],
    metrics: [
      { label: "TIMEZONES", value: "3" },
      { label: "SPREAD", value: "10.5 HRS" },
      { label: "MODEL", value: "T&M" },
      { label: "REGIONS", value: "US · IN · CN" },
      { label: "STATUS", value: "CLOSED" },
    ],
    learnings: {
      worked:
        "Going async-first early — written status at a fixed point in each region's day, shared decision register people could comment on. Stopped the 24-hour decision-lag pattern from accumulating over the engagement.",
      differently:
        "I should have walked the China-site client product owner through the async cadence change in a 1:1 before announcing it in the leadership meeting. They were on board after the fact, but it briefly felt like the rhythm had changed without consultation. 15 minutes of pre-conversation would have made it a co-decision.",
    },
  },
  {
    id: "pmo-ai-agent-platform",
    number: "004",
    type: "AI AUTOMATION",
    title: "Building Agents to Take the Grindy Parts of PM Off the Plate",
    outcome: "Glean + Claude + n8n · 6 agents in production PMO-wide · phData Innovation Award",
    industry: "PROFESSIONAL SERVICES · DATA & AI CONSULTING",
    year: "2024–25",
    model: "INTERNAL",
    entry: {
      mode: "built",
      narrative:
        "Self-initiated. The repeatable parts of running a PM portfolio — EOM billing reconciliation, sprint health checks, project health scans, steerco deck drafting — were eating about 8 hours a week across active programs. None of it required judgment. So I built the agents.",
    },
    spotlight: "metrics",
    context:
      "A PMO AI agent platform for the phData delivery organisation. 6 agents on Glean Agent Builder, Claude, and n8n — covering EOM billing reconciliation, sprint health scoring, project health scanning, and steerco deck drafting.",
    role:
      "Sole designer and builder. Identified the automation candidates by watching what I and other PMs did every week, built and tested each agent, governed the PMO-wide rollout, and owned the ongoing iteration.",
    actions: [
      "Built the Billing Compliance Agent first — EOM invoicing reconciliation, the most measurable PM pain. Deployed PMO-wide inside a month, recovering about 60% of the time previously spent on billing per program, with a >95% accuracy figure backed by per-run accuracy logs against a test set.",
      "Built the Velocity & Blocker Tracker — ingests sprint CSV data and outputs a ranked scorecard with PM action items. A 20–30 minute manual review per program replaced with a 2-minute automated output.",
      "Built the Project Health Scanner — runs a full health check across all active programs at once, surfacing color-status and escalation candidates in the time the manual checklist took for one program.",
      "Built the Steerco Comms Engine — drafts a steerco deck from program data in under 20 minutes, with separate tone variants for different audiences (CFO vs. VP Engineering), replacing 2–3 hours of manual deck prep.",
    ],
    decisions: [
      "Built on Glean Agent Builder rather than a direct Claude API integration — Glean was already the PMO's knowledge and search layer, so agents could draw on live program data, Salesforce, and Drive without building separate integrations. Less impressive on paper, much faster to ship.",
      "Sequenced the billing agent first — highest pain, most measurable accuracy, fastest to validate. Getting the first agent to PMO-wide deployment in a month gave the next five the trust they needed to land.",
    ],
    result: "✓ 6 AGENTS IN PRODUCTION PMO-WIDE · ~8 HRS/WEEK RECOVERED · phData INNOVATION AWARD",
    stack: ["Glean Agent Builder", "Claude (Anthropic)", "n8n", "Google Apps Script", "Salesforce MCP", "Slack MCP"],
    metrics: [
      { label: "AGENTS BUILT", value: "6" },
      { label: "TIME RECOVERED", value: "~8 HRS/WK" },
      { label: "BILLING SAVED", value: "~60%" },
      { label: "ACCURACY", value: ">95%" },
      { label: "RECOGNITION", value: "INNOVATION AWARD" },
    ],
    learnings: {
      worked:
        "Watching my own week before building anything. The automation candidates were the things I was tired of doing, and the accuracy bar each one needed was the bar I'd accept from my own work.",
      differently:
        "I built the Velocity & Blocker Tracker and the Project Health Scanner against separate data pulls before noticing they ingest almost the same sprint and program data. A shared data layer built once would have sped both up. That's a detour you only notice once you've shipped one — but I'd build the data layer second next time instead of in parallel.",
    },
  },
];
