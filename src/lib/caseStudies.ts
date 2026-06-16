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
    title: "The Redshift Migration the Client's Data Lead Quietly Wanted to Slow Down",
    outcome: "Redshift → Databricks Unity Catalog · US + India pod · ~2,300 objects · the political work was the real work",
    industry: "EDTECH",
    year: "2025–26",
    model: "FIXED-PRICE",
    entry: {
      mode: "kickoff",
      narrative:
        "Picked it up at contract signing, with the cutover date already in the deck. The architecture call was made. The team was assembled. The thing nobody had budgeted for was the senior person on the client side who'd built the Redshift estate over six years and didn't fully believe the migration was a good idea.",
    },
    spotlight: "stakeholder",
    headlineMetrics: [0, 2],
    context:
      "A fixed-price migration of a client's analytics estate from Amazon Redshift to Databricks Unity Catalog. Two pods across US and India. The technical work was the engineering team's; the unspoken job was navigating a senior client-side data lead who hadn't been the decision-maker on the migration but was going to be the gatekeeper on every access grant, every legacy-table question, and every UAT sign-off.",
    role:
      "PM end-to-end. The official scope was the standard list — kickoff, weekly cadence, status, risk tracking, cutover, closure. The actual scope, once I'd sat through two meetings, was figuring out how to make the client's data lead a co-owner of the project rather than its quiet skeptic.",
    actions: [
      "Set the program up clean against the contract scope in the first week — budget and roles checked, a second PM's eyes on the plan before anything went external, both kickoff decks rehearsed. Access requests went out the same day, because access was always going to be the blocker.",
      "Asked the architect for an hour the second week so I could understand which legacy Redshift objects the client's data lead had personally built. The answer was: most of the ones the marketing team still ran their weekly reporting off. That changed how I sequenced the migration sprints — those objects went to the back, not the front.",
      "Restructured the weekly client meeting so the data lead spoke first, not the sponsor. Cost the sponsor about 90 seconds of airtime; bought us a stakeholder who started saying 'we' instead of 'you' by week four.",
      "Held the color status honest on access delays the client side owned — went yellow twice. Escalated one access stall to the client sponsor and our account lead in the same conversation when it crossed three weeks open.",
      "Ran the cutover with the architect and the client engineering team — comms timeline, rollback window, downstream sign-offs, the closeout the same way every program closes.",
    ],
    decisions: [
      "Moved a tranche of marketing-owned objects from sprint 2 to sprint 6, deliberately, so the client's data lead got to validate the dashboards they cared most about with their own hands before the cutover deadline. The architect pushed back — it made the dependency graph harder. I held the line because the political risk of getting it wrong was bigger than the technical cost of getting it later.",
      "Flagged a sub-deliverable yellow in week 4 not because anything had broken yet, but because on a fixed contract every week of access delay is a week you can't earn back. The account lead used the yellow to open a client-side conversation that had been overdue.",
      "Said no to a hallway-request adjacent dashboard in week 9. Got the architect's estimate in writing, took it to the account lead, routed it through a formal change request. Lost a small bit of client goodwill that week; protected the margin on a fixed contract for the rest of the year.",
    ],
    result: "✓ MIGRATION DELIVERED · DATA LEAD SIGNED OFF UAT · CHANGE-ORDER RAISED CLEAN · CLOSURE COMPLETE",
    stack: ["Databricks", "Amazon Redshift", "Unity Catalog", "Azure DevOps", "Jira"],
    metrics: [
      { label: "MODEL", value: "FIXED-PRICE" },
      { label: "TEAM", value: "US + INDIA" },
      { label: "STAKEHOLDER", value: "WON OVER" },
      { label: "PHASE", value: "CLOSED" },
    ],
    learnings: {
      worked:
        "Spending the second week understanding who owned what emotionally, not just technically. The Redshift estate had been one person's six-year project. Treating that as program data — not as politics to manage around — changed every sequencing decision for the better.",
      differently:
        "I assumed the sponsor's sign-off on the migration meant the data lead was bought in too. Took me three weeks to notice that wasn't the same thing. Cost us a sprint of velocity and a difficult week-five conversation that could have been a week-one one. The lesson I keep relearning: when a senior IC has been somewhere a long time, their alignment is not a derivative of their manager's.",
    },
  },
  {
    id: "marketing-data-platform",
    number: "002",
    type: "PLATFORM BUILD",
    title: "Two Years of Delivery, and the One Stakeholder I Never Won Over",
    outcome: "MWAA + dbt + Snowflake · multi-year · renewed twice · one stakeholder I read wrong the whole time",
    industry: "ENTERPRISE SAAS · MARKETING TECH",
    year: "2024–26",
    model: "T&M",
    entry: {
      mode: "kickoff",
      narrative:
        "Joined at contract signing on a two-year build. Budget and hours consumed are the constant conversation on a long retainer — but so is the relationship with the account lead and the client sponsor. And so was the one client-side engineer who decided in week three they didn't trust consultants, and stayed that way for two years.",
    },
    spotlight: "decisions",
    context:
      "A two-year build delivering a marketing data platform on MWAA, dbt, and Snowflake. The sponsor needed VP-language updates. The product owner needed weekly delivery confidence. And the client-side senior data engineer — six years in their role, three platform migrations under their belt — needed reasons to believe we weren't going to make their life worse. We got two out of three right for most of the engagement.",
    role:
      "PM end-to-end. Financial tracking, weekly status, internal and client leadership meetings, risk tracking, change-order surfacing, the renewal-adjacent conversations. The engineers and architect owned the build; I held the cadence steady and read the room — sometimes wrongly — on the client side.",
    actions: [
      "Ran the same status note out at the same hour every week for two years. Boring, easy to skip, the single most important thing for staying trusted over a long T&M.",
      "Mapped the stakeholders the slow way and adjusted the form of the update to the audience. The sponsor needed three lines and a number; the product owner needed the blocker list; the senior engineer needed to see we'd actually read their previous comments before we wrote new ones.",
      "Surfaced two adjacent problem areas the client mentioned in passing as scope-growth signals to the account lead — they turned into formal change requests rather than free work absorbed into the hours.",
      "Held the line on a hallway request for an out-of-scope dashboard. Got the architect's estimate, sized the change request with the account lead, either it went in officially or it didn't.",
      "Kept hours consumed vs. contract budget reconciled every Friday against the team's own reporting so my numbers and leadership's numbers always told the same story when the quarterly renewal conversations came around.",
      "Had the hard week-fourteen conversation with the client engineer counterpart about a six-week access stall — not as a complaint, as a clean ownership statement. Uncomfortable in the moment. Cleared a recurring pattern for the rest of the engagement.",
    ],
    decisions: [
      "Spent about two months in the first half of the engagement trying to bring the senior client-side engineer around — extra context in writing, extra time in 1:1s, accommodating their reviews of our PRs even when it cost us a sprint of velocity. They were never going to be brought around; the political shape of their role didn't allow it. I should have routed around them earlier and accepted the cost — that's what I did in year two and the engagement got measurably easier.",
    ],
    result: "✓ TWO-YEAR BUILD · RENEWED TWICE · CHANGE REQUESTS RAISED CLEAN · ONE LESSON IN STAKEHOLDER TRIAGE",
    stack: ["MWAA (Airflow on AWS)", "dbt", "Snowflake", "AWS", "Jira"],
    metrics: [
      { label: "MODEL", value: "RETAINER" },
      { label: "DURATION", value: "2+ YRS" },
      { label: "STATUS", value: "RENEWED ×2" },
      { label: "CADENCE", value: "WEEKLY" },
      { label: "BURN", value: "TRACKED FRIDAY" },
    ],
    learnings: {
      worked:
        "The Friday status note. Boring, predictable, identical every week. When the hard conversations came around — change-orders, scope, the access stall — the AE and the client sponsor already had the full context. The note had done the persuading for me before I got to the room.",
      differently:
        "I spent two months trying to win over the senior client engineer when the right move, in retrospect, was to accept they weren't winnable and route the work around them. I read it as a relationship problem I could solve with enough patience; it was a structural problem about their role and incentives. The cost was a sprint of velocity and the slow erosion of my own credibility with the team, who could see I was burning energy on the wrong thing. Default to triaging stakeholder investment earlier than feels fair.",
    },
  },
  {
    id: "snowflake-china",
    number: "003",
    type: "REGIONAL DEPLOYMENT",
    title: "The Cadence Change That Should Have Been a Conversation First",
    outcome: "Snowflake build · China factory operations · US / India / China site · the timezone wasn't the hard part",
    industry: "INDUSTRIAL MANUFACTURING",
    year: "2024",
    model: "T&M",
    entry: {
      mode: "kickoff",
      narrative:
        "Assigned in the sales channel. A six-week Snowflake build for a global manufacturer's China factory operations, with a 10.5-hour gap between the US delivery lead and the client site. People will tell you the timezone was the hard part. The timezone was easy. The hard part was a fifteen-minute pre-conversation I didn't have.",
    },
    spotlight: "timeline",
    timeline: [
      { label: "WEEK 1", detail: "Kickoff. Access requests escalated through the client product owner. I noticed the China-site product owner spoke last in every meeting — and that I'd done nothing about that yet" },
      { label: "WEEK 2", detail: "Decided the live weekly meeting wasn't going to hold across three regions. Announced the cadence flip to async-first in the leadership meeting. The China-site PO said the right things; their face said something else" },
      { label: "WEEK 3", detail: "Re-baselined around Lunar New Year. The technically harder call; the easier one socially, because I'd walked the sponsor through it first this time" },
      { label: "WEEK 6", detail: "Closed clean. The cadence change had worked. The trust I'd burned in week two took the rest of the engagement to rebuild" },
    ],
    context:
      "A Snowflake build for a global manufacturer's China factory operations. 3-timezone delivery, a 10.5-hour gap. Six-week window with Lunar New Year sitting three weeks in. The structural challenges (timezone, holiday) were design problems with reasonable answers. The actual hard moment of the engagement was a fifteen-minute decision I made in a leadership meeting that should have been a 1:1 conversation an hour earlier.",
    role:
      "PM across the timezone spread and the holiday — kickoff, cadence design, weekly status across all three regions, risk tracking, financials, closure. And — the part I should have understood faster — bridging between a US delivery lead and a China-site client whose default mode was to defer in groups and disagree in private.",
    actions: [
      "Worked the kickoff sequence in week one — financials and tracking set up against the SOW, a second PM's review of the plan, the team workspace stood up, internal kickoff with the account team, external kickoff scheduled to actually work across three timezones.",
      "Redesigned the weekly cadence as async-first in week two — written status at a fixed point in each region's day, a shared decision register, the live leadership meeting moved from weekly to fortnightly. Technically the right call. Made it the wrong way.",
      "Re-baselined the schedule around Lunar New Year in week three — front-loaded vendor work, back-loaded client validation, walked the sponsor and the AE through it before announcing it. Did this one right.",
      "Ran the close-out the same way every program ends — final status, NPS, KT to the ongoing support team, access removed.",
    ],
    decisions: [
      "Announced the async cadence change in the live client leadership meeting in week two, with the China-site product owner hearing it for the first time in front of their leadership. They were on board after the fact — they said all the right things — but the texture of the meeting was that I'd changed the rhythm of their working relationship with us without consulting them.",
      "Made the opposite decision in week three on the Lunar New Year re-baselining — 1:1 with the China-site PO first, then the sponsor, then the leadership meeting. Same magnitude of change, fundamentally different reception.",
    ],
    result: "✓ DELIVERED ACROSS 3 TIMEZONES · LUNAR NEW YEAR HANDLED CLEAN · ONE EXPENSIVE LESSON ABOUT WHO HEARS WHAT FIRST",
    stack: ["Snowflake", "SAP ECC", "Oracle R12", "Jira"],
    metrics: [
      { label: "TIMEZONES", value: "3" },
      { label: "SPREAD", value: "10.5 HRS" },
      { label: "MODEL", value: "T&M" },
      { label: "STATUS", value: "CLOSED" },
      { label: "TRUST", value: "REBUILT" },
    ],
    learnings: {
      worked:
        "The async-first cadence was, structurally, exactly right — it stopped a 24-hour decision-lag pattern from compounding across the six-week window. Once it was running, it was running well. The mechanic of the decision was sound.",
      differently:
        "I made the right call the wrong way and learned the same lesson twice in two weeks. The China-site product owner didn't need to be persuaded that async was the answer; they needed to be the second person in the room to know we were considering it, not the eighth. Fifteen minutes of pre-conversation would have made it a co-decision instead of a fait accompli. The cost wasn't the cadence working or not — it was a quarter of trust I had to rebuild over the next three weeks. Now I treat any change to a working rhythm as a stakeholder conversation before it's a process change.",
    },
  },
  {
    id: "pmo-ai-agent-platform",
    number: "004",
    type: "AI AUTOMATION",
    title: "The Agent I Built Because I Was Tired of My Own Month-End",
    outcome: "Glean + Claude + n8n · 6 agents in production · recovered ~8 hrs/week team-wide · phData Innovation Award",
    industry: "PROFESSIONAL SERVICES · DATA & AI CONSULTING",
    year: "2024–25",
    model: "INTERNAL",
    entry: {
      mode: "built",
      narrative:
        "Self-initiated. End-of-month billing reconciliation was three or four hours of copy-paste between the time-tracking export and the project budget, every program, every month. I'd done it by hand for nearly two years. None of it required judgment — which is the same as saying it was waiting to be automated. The hard part wasn't building the first agent. It was building something the rest of the delivery team would actually trust with a live client invoice.",
    },
    spotlight: "metrics",
    headlineMetrics: [0, 1],
    context:
      "An AI agent platform for the phData delivery team. The first agent was a month-end billing reconciliation tool I built for myself. It got noticed. Five more followed — sprint health scoring, project health scanning, leadership deck drafting, and two narrower utilities. By the end, the platform was running team-wide on every active program.",
    role:
      "Sole designer and builder. The technical part was the easy part. The harder part was earning the trust of a delivery team that — reasonably — does not want an LLM anywhere near a client invoice without a paper trail behind every number.",
    actions: [
      "Spent the first two weeks watching my own month-end process by hand, again, with a notepad — not building anything. Listed everything the agent would need to do: pull time data, compare against project budget, flag overages and underages, produce a finance-ready summary in plain English, and — critically — surface anything weird for human review rather than silently produce a number that looked clean.",
      "Built on Glean rather than a direct API integration. Glean was already the team's knowledge and permissions layer. Building there meant the agent could see live program data, Salesforce, and Drive without a separate integration build. Less impressive on paper; far faster to ship; far easier for a non-technical PM to trust.",
      "Wrote schema validation into every LLM output. If the model produced something that didn't parse cleanly, the agent surfaced the raw numbers for human review instead of generating a malformed summary anyone could mistake for clean output. Lost some elegance; bought trust.",
      "Shipped the billing agent first, deliberately. It was the highest-pain, most-measurable use case — if it didn't hold up, nothing after it would land either. Once it was running team-wide inside a month, the next five had an easier path in.",
    ],
    decisions: [
      "Built on Glean and accepted the ceiling that comes with that — instead of building a more flexible custom API integration that would have taken three times as long. Right call. Speed to a working tool the PMO trusted was worth more than a more elegant architecture nobody would adopt.",
      "Logged per-run accuracy against a held-out test set of past EOM reconciliations from the start. Slowed the first version down by a couple of weeks. Meant the >95% number on the discrepancy check was backed by something I'd actually want to defend in a status meeting, not a marketing line.",
    ],
    result: "✓ 6 AGENTS IN PRODUCTION · ~8 HRS/WEEK RECOVERED · phData INNOVATION AWARD · TEAM-WIDE ADOPTION",
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
        "Watching my own week with a notepad before writing a line of prompt. The candidates for automation were exactly the things I was tired of doing, and the accuracy bar each one needed was the bar I'd accept from my own work. Building from frustration produced a sharper spec than building from a feature list ever would have.",
      differently:
        "I built the Velocity & Blocker Tracker and the Project Health Scanner in parallel against separate data pulls before noticing they ingest almost the same sprint and program data. A shared data layer built once would have sped both up and made the third agent on top of them trivial. That's a detour you only notice once you've shipped one — but I'd build the data layer second next time, not in parallel with the second agent.",
    },
  },
];
