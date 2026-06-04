"use client";

import Link from "next/link";

/* ─── colour tokens ─────────────────────────────────────────────── */
const P  = "#7C3AED";
const P2 = "#6D28D9";
const PA = "#A78BFA";
const PB = "#EDE9FF";
const SF = "#3B6EF0";
const SP = "#129B86";
const EM = "#E0743A";
const OK = "#1F9D57";
const BAD = "#D5503E";
const WARN = "#B07D12";
const VIOLET = "#9B59D0";
const T1 = "#1A0A2E";
const T2 = "#3D3358";
const T3 = "#7A6E9A";
const BG = "#FBFBFD";
const SURFACE = "#F5F6F9";
const BORDER = "#E6E8EE";
const BORDER_STRONG = "#D3D7E0";

const GLOBAL_CSS = `
  .dd-body { font-family: 'Inter', system-ui, sans-serif; background: ${BG}; color: ${T1}; line-height: 1.6; -webkit-font-smoothing: antialiased; letter-spacing: -0.005em; }
  .dd-mono { font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; }
  .dd-disp { font-family: 'Plus Jakarta Sans', 'Space Grotesk', system-ui, sans-serif; }

  .dd-card { background: linear-gradient(180deg, ${SURFACE}, color-mix(in srgb, ${SURFACE} 70%, ${BG})); border: 1px solid ${BORDER}; border-radius: 16px; transition: transform .2s, box-shadow .2s; }
  .dd-card:hover { transform: translateY(-3px); box-shadow: 0 4px 14px rgba(20,22,28,.06), 0 16px 40px rgba(20,22,28,.07); }

  .dd-tile { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .dd-tile svg { width: 21px; height: 21px; }

  @keyframes dd-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  .dd-reveal { animation: dd-rise .7s cubic-bezier(.2,.7,.2,1) both; }

  @keyframes dd-dash { to { stroke-dashoffset: -28; } }
  .dd-dash { stroke-dasharray: 6 8; animation: dd-dash 1.4s linear infinite; }

  @media (prefers-reduced-motion: reduce) {
    .dd-reveal { animation: none; }
    .dd-dash { animation: none; }
  }
`;

/* ─── small components ──────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="dd-disp" style={{ display: "flex", alignItems: "center", gap: 13, fontSize: "clamp(22px,3.4vw,33px)", fontWeight: 600, letterSpacing: "-0.02em", color: P, marginBottom: 12, lineHeight: 1.1 }}>
      <span style={{ width: 30, height: 4, background: `linear-gradient(90deg, ${P}, ${VIOLET})`, borderRadius: 3, flexShrink: 0 }} />
      {children}
    </div>
  );
}
function SubH({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="dd-disp" style={{ fontWeight: 500, fontSize: "clamp(18px, 2.3vw, 23px)", letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: 14, color: T2 }}>
      {children}
    </h2>
  );
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 16, color: T2, maxWidth: "68ch", marginBottom: 32 }}>{children}</p>;
}

/* ─── PAGE ──────────────────────────────────────────────────────── */
export default function DealDeskPage() {
  return (
    <main className="dd-body" style={{ minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* Top nav back to portfolio */}
      <div style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(251,251,253,0.82)", backdropFilter: "saturate(180%) blur(16px)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "12px 28px", display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T2, textDecoration: "none", fontWeight: 500 }}>
            <span style={{ fontSize: 16 }}>←</span>
            <span>Back to portfolio</span>
          </Link>
          <div style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 11, color: T3, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Solution Design · Case Study
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px" }}>

        {/* ─── COVER ─── */}
        <header className="dd-reveal" style={{ padding: "50px 0 64px" }}>
          <div
            style={{
              position: "relative", overflow: "hidden", border: `1px solid ${BORDER}`, borderRadius: 24,
              background: `radial-gradient(120% 120% at 100% 0%, ${PB} 0%, transparent 45%), radial-gradient(120% 120% at 0% 100%, #D9F3EE 0%, transparent 45%), ${SURFACE}`,
              boxShadow: "0 4px 14px rgba(20,22,28,.06), 0 16px 40px rgba(20,22,28,.07)", padding: "46px 44px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 22, marginBottom: 30, borderBottom: `1px solid ${BORDER_STRONG}` }}>
              <span className="dd-mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: P2, background: PB, padding: "6px 13px", borderRadius: 999 }}>
                Solution Design Case Study
              </span>
              <span className="dd-mono" style={{ fontSize: 12, color: T3, letterSpacing: "0.03em" }}>
                Glean Agent · Workflow Mode
              </span>
            </div>
            <h1 className="dd-disp" style={{ fontWeight: 600, fontSize: "clamp(34px, 5.4vw, 58px)", lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: 8 }}>
              Deal Desk Acceleration
              <span style={{ color: P, display: "block" }}>Agent</span>
            </h1>
            <p style={{ fontSize: 16.5, color: T2, maxWidth: "62ch", marginTop: 18, lineHeight: 1.6 }}>
              A sales rep needs three answers before closing a deal — what we discounted on similar deals, who has to approve it, and which contract template applies.
              Each one lives somewhere different. This case study designs a Glean agent that returns all three with sources in minutes, and lays out the architecture, workflow, trust model, and rollout.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 38, borderTop: `1px solid ${BORDER_STRONG}`, paddingTop: 22 }}>
              {[
                ["Domain", "Enterprise Sales / Deal Desk"],
                ["Platform", "Glean Agent (Workflow)"],
                ["Sources", "Salesforce · SharePoint · Email"],
                ["Status", "Solution Design"],
              ].map(([k, v], i) => (
                <div key={k} style={{ padding: "0 20px", borderLeft: i === 0 ? "none" : `1px solid ${BORDER}` }}>
                  <div className="dd-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", color: T3, marginBottom: 6 }}>{k}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: T1, lineHeight: 1.4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ─── PROBLEM ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>The Problem</Eyebrow>
          <SubH>The answers a rep needs before saying yes are scattered across three systems</SubH>
          <Lead>
            Before agreeing to a customer&apos;s ask, a sales rep needs to know things like &ldquo;Can we offer this client a 15% discount?&rdquo;, &ldquo;Has legal approved this kind of contract before?&rdquo;, and &ldquo;Is there a template for this deal size?&rdquo; Each answer lives somewhere different.
          </Lead>

          {/* Source tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 26 }} className="dd-grid-3">
            {[
              { color: SF, name: "Salesforce", stored: "Past deals, customer history", task: "Search for similar past deals" },
              { color: SP, name: "SharePoint", stored: "Legal docs, contract templates", task: "Dig for the right template" },
              { color: EM, name: "Email", stored: "Approval threads, one-off decisions", task: "Hunt threads for who approved what" },
            ].map((s) => (
              <div key={s.name} className="dd-card" style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span className="dd-tile" style={{ background: `${s.color}1A`, color: s.color }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</span>
                </div>
                <div style={{ fontSize: 13.5, color: T3, marginBottom: 14 }}>{s.stored}</div>
                <div style={{ fontSize: 13, padding: "9px 12px", borderRadius: 10, background: "#EDEFF4", color: T2 }}>
                  → {s.task}
                </div>
              </div>
            ))}
          </div>

          {/* Pain points */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="dd-grid-3">
            {[
              { color: BAD, title: "Deals slip at quarter-end", body: "The questions pile up exactly when the pipeline is heaviest. Approvals chased manually push signatures into the next quarter." },
              { color: WARN, title: "Margin quietly leaks", body: "Without precedent in front of them, reps discount defensively to be safe. Inconsistent discounting erodes margin one deal at a time." },
              { color: VIOLET, title: "Ramp takes months", body: "Precedent and the &lsquo;who to ask&rsquo; live in tenured reps&apos; heads and old email. New hires take months to learn what a 30-second lookup could tell them." },
            ].map((p) => (
              <div key={p.title} className="dd-card" style={{ padding: 22 }}>
                <span className="dd-tile" style={{ background: `${p.color}1A`, color: p.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
                </span>
                <h3 style={{ fontSize: 15.5, fontWeight: 600, margin: "14px 0 6px" }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: T3 }} dangerouslySetInnerHTML={{ __html: p.body }} />
              </div>
            ))}
          </div>
        </section>

        {/* ─── BUSINESS CASE ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>The Business Case</Eyebrow>
          <SubH>What the time recovery looks like at a representative team size</SubH>
          <Lead>
            Selling time recovered = reps × deals per quarter × hours lost searching per deal × time the agent removes.
            For a 40-rep team working 6 deals each per quarter, with 4 hours of search per deal and 70% of that recovered by the agent:
          </Lead>

          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 18 }} className="dd-grid-2">
            <div className="dd-card" style={{ padding: 26 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Inputs</h3>
              {[
                ["Sales reps", "40"],
                ["Deals worked / rep / quarter", "6"],
                ["Hours lost searching / deal", "4"],
                ["Time the agent removes", "70%"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px dashed ${BORDER}`, fontSize: 13.5 }}>
                  <span style={{ color: T2 }}>{k}</span>
                  <span className="dd-mono" style={{ color: P2, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="dd-card" style={{ padding: 26, display: "flex", flexDirection: "column", justifyContent: "center", background: `radial-gradient(120% 120% at 100% 0%, ${PB} 0%, transparent 50%), ${SURFACE}` }}>
              <div className="dd-disp" style={{ fontSize: "clamp(40px, 6vw, 58px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, color: P }}>
                672
              </div>
              <div style={{ fontSize: 14, color: T3, marginTop: 8 }}>hours of selling time recovered per quarter</div>
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BORDER}`, fontSize: 14, color: T2 }}>
                ≈ <b>84 selling days</b> returned to the field — about <b>one selling week back per rep</b>, every quarter.
              </div>
            </div>
          </div>

          {/* Two levers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18 }} className="dd-grid-2">
            <div className="dd-card" style={{ padding: 20, display: "flex", gap: 14 }}>
              <span className="dd-tile" style={{ background: `${SP}1A`, color: SP }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              </span>
              <div>
                <h4 style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>Deals close 2–4 days sooner</h4>
                <p style={{ fontSize: 13, color: T3 }}>One approval chased by email can take days. The agent identifies who signs off and drafts the request in minutes.</p>
              </div>
            </div>
            <div className="dd-card" style={{ padding: 20, display: "flex", gap: 14 }}>
              <span className="dd-tile" style={{ background: `${PB}`, color: P }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </span>
              <div>
                <h4 style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>Less margin lost to over-discounting</h4>
                <p style={{ fontSize: 13, color: T3 }}>Reps often discount high to be safe. With precedent in front of them, they price to the range similar deals actually closed at.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOLUTION STRIP ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>What the Agent Does</Eyebrow>
          <SubH>One question in. One sourced answer out.</SubH>
          <Lead>The rep asks. The agent searches all three systems, pulls precedent, template, and approval, and replies in minutes — every fact linked to its source.</Lead>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "stretch", gap: 14 }} className="dd-strip">
            {[
              { color: P, title: "Ask", body: "“Has a deal like this been approved before? What discount did we give, and who signs off?”" },
              { color: SP, title: "Fetch", body: "Searches all three systems at once — only what the rep is already allowed to see." },
              { color: OK, title: "Answer", body: "One recommendation: precedent, discount range, the template, and who must approve." },
            ].map((c, i) => (
              <div key={c.title} style={{ display: "contents" }}>
                <div className="dd-card" style={{ padding: "26px 22px", textAlign: "center" }}>
                  <span className="dd-tile" style={{ background: `${c.color}1A`, color: c.color, margin: "0 auto 14px" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.title}</h3>
                  <p style={{ fontSize: 13.5, color: T3 }}>{c.body}</p>
                </div>
                {i < 2 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${P}, ${VIOLET})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─── WHY GLEAN ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>Why Build It on Glean</Eyebrow>
          <SubH>The hard part is connecting the systems — Glean already did that</SubH>
          <Lead>The whole problem is scattered knowledge, and connecting it is what Glean exists to do. The job is to assemble a smart assistant on top of Glean, not build a data pipeline from scratch.</Lead>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="dd-grid-2">
            {[
              { color: SF, title: "Already connected", body: "Glean indexes Salesforce, SharePoint, and email out of the box. No new database to build." },
              { color: SP, title: "Existing permissions respected", body: "Glean inherits each source's access controls, so a rep only sees what they could already open themselves." },
              { color: EM, title: "Citations by default", body: "Every answer comes with its source, so the rep can trust it and verify in one click." },
              { color: VIOLET, title: "Agent framework", body: "Glean's workflow steps, search actions, and per-step model choices let us assemble this fast." },
            ].map((f) => (
              <div key={f.title} className="dd-card" style={{ padding: 22, display: "flex", gap: 16 }}>
                <span className="dd-tile" style={{ background: `${f.color}1A`, color: f.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 5 }}>{f.title}</h3>
                  <p style={{ fontSize: 13.5, color: T3 }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ARCHITECTURE ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>Architecture</Eyebrow>
          <SubH>Sources feed Glean. Glean powers the agent. The agent answers the rep.</SubH>
          <Lead>Four layers, one direction of flow. Glean sits in the middle as the unified, permission-aware search layer.</Lead>

          <div className="dd-card" style={{ padding: "30px 24px", overflowX: "auto" }}>
            <svg viewBox="0 0 1000 300" role="img" style={{ width: "100%", minWidth: 760, height: "auto", display: "block" }}>
              <defs>
                <linearGradient id="ddGGlean" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor={P} />
                  <stop offset="1" stopColor={VIOLET} />
                </linearGradient>
              </defs>
              <text x="105" y="22" textAnchor="middle" fill={T3} fontSize="12" fontWeight="600">DATA SOURCES</text>
              <text x="420" y="22" textAnchor="middle" fill={T3} fontSize="12" fontWeight="600">GLEAN</text>
              <text x="700" y="22" textAnchor="middle" fill={T3} fontSize="12" fontWeight="600">THE AGENT</text>
              <text x="915" y="22" textAnchor="middle" fill={T3} fontSize="12" fontWeight="600">REP</text>

              <path className="dd-dash" d="M195 78 C 270 78, 285 140, 335 152" fill="none" stroke={SF} strokeWidth="2" />
              <path className="dd-dash" d="M195 150 C 265 150, 285 150, 335 158" fill="none" stroke={SP} strokeWidth="2" />
              <path className="dd-dash" d="M195 222 C 270 222, 285 175, 335 165" fill="none" stroke={EM} strokeWidth="2" />
              <path className="dd-dash" d="M505 158 C 560 158, 560 158, 600 158" fill="none" stroke={P} strokeWidth="2.4" />
              <path className="dd-dash" d="M800 158 C 845 158, 845 158, 862 158" fill="none" stroke={VIOLET} strokeWidth="2.4" />

              <g>
                <rect x="20" y="52" width="175" height="52" rx="13" fill={BG} stroke={SF} strokeWidth="1.6" />
                <text x="42" y="76" fill={T1} fontSize="14" fontWeight="600">Salesforce</text>
                <text x="42" y="93" fill={T3} fontSize="11.5">Deals, customers</text>
              </g>
              <g>
                <rect x="20" y="124" width="175" height="52" rx="13" fill={BG} stroke={SP} strokeWidth="1.6" />
                <text x="42" y="148" fill={T1} fontSize="14" fontWeight="600">SharePoint</text>
                <text x="42" y="165" fill={T3} fontSize="11.5">Docs, templates</text>
              </g>
              <g>
                <rect x="20" y="196" width="175" height="52" rx="13" fill={BG} stroke={EM} strokeWidth="1.6" />
                <text x="42" y="220" fill={T1} fontSize="14" fontWeight="600">Email</text>
                <text x="42" y="237" fill={T3} fontSize="11.5">Approvals</text>
              </g>

              <rect x="335" y="108" width="170" height="100" rx="18" fill="url(#ddGGlean)" />
              <text x="420" y="158" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700">Unified Index</text>
              <text x="420" y="178" textAnchor="middle" fill="#fff" fontSize="10.5" opacity="0.92">connectors · permissions · citations</text>

              <rect x="600" y="113" width="200" height="90" rx="18" fill={BG} stroke={P} strokeWidth="2" />
              <text x="700" y="155" textAnchor="middle" fill={T1} fontSize="15" fontWeight="700">Workflow</text>
              <text x="700" y="175" textAnchor="middle" fill={T3} fontSize="10.5">understand · search · reason · answer</text>

              <rect x="862" y="126" width="118" height="64" rx="16" fill={BG} stroke={VIOLET} strokeWidth="1.8" />
              <text x="921" y="163" textAnchor="middle" fill={T1} fontSize="13" fontWeight="600">Chat / Slack</text>
            </svg>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 22, justifyContent: "center" }}>
              {[
                { color: SF, label: "Salesforce" },
                { color: SP, label: "SharePoint" },
                { color: EM, label: "Email" },
                { color: P, label: "Glean / Agent" },
                { color: VIOLET, label: "Rep delivery" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: T3 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 4, background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WORKFLOW ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>Workflow</Eyebrow>
          <SubH>How the agent works — and the model picked for each step</SubH>
          <Lead>Built in Glean Workflow mode so steps run in a fixed, auditable order. Each step has a clear job, a Glean step type, the sources it touches, and a model chosen for that job.</Lead>

          <div>
            {[
              { n: 1, title: "Capture the question", body: "Rep asks in plain language. The question and the linked deal are pulled into agent memory as starting context.", tags: ["Trigger / Wait for Input", "Slack or Glean chat"], color: P },
              { n: 2, title: "Understand the deal", body: "Reads intent, works out what “a deal like this” means, then pulls deal size, segment, industry, discount, and terms from Salesforce — rep types nothing extra.", tags: ["Plan & Execute", "Claude Sonnet 4.6", "reads Salesforce"], color: SF },
              { n: 3, title: "Search all three systems in parallel", body: "One question fans out into three searches at once: similar past deals, the right contract template, the matching approval thread.", tags: ["Company Search", "GPT-5.4 Fast", "Salesforce · SharePoint · Email"], color: SP },
              { n: 4, title: "Read the key documents", body: "Opens the exact template and approval email that matter, so the answer quotes the real content rather than a snippet.", tags: ["Read Document", "GPT-5.1", "template + approval"], color: EM },
              { n: 5, title: "Reason and decide", body: "The judgement step: rank comparable deals, compute the discount range, apply the approval rule. Rules are applied exactly — never guessed. Runs on prior-step memory only.", tags: ["Think · Deep Reasoning", "Claude Opus 4.6", "memory: previous step only"], color: VIOLET },
              { n: 6, title: "Compose the answer", body: "Turns the decision into one sourced answer card — precedent, discount range, template, and the approval note with links. Formats only; it does no math.", tags: ["Respond", "GPT-5.1"], color: P },
              { n: 7, title: "Offer the next step", body: "If sign-off is needed, the agent asks the rep to confirm before doing anything. Nothing is sent without a person saying go.", tags: ["Wait for User Input", "human confirms"], color: SP },
              { n: 8, title: "Draft and route the approval", body: "On confirmation, drafts the approval request — pre-filled with deal details and precedent as justification — and routes it to the right approver. A person still approves.", tags: ["Respond → Write action", "GPT-5.1", "Slack / Email"], color: EM },
            ].map((s, i, arr) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start", position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "stretch" }}>
                  <div
                    style={{
                      width: 54, height: 54, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1.5px solid ${s.color}`, background: BG, color: s.color, fontWeight: 700, fontSize: 16,
                      position: "relative", zIndex: 2,
                    }}
                    className="dd-mono"
                  >
                    {s.n}
                  </div>
                  {i < arr.length - 1 && <div style={{ flex: 1, width: 3, margin: "6px 0", borderRadius: 3, background: BORDER_STRONG }} />}
                </div>
                <div className="dd-card" style={{ padding: "20px 22px", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: T3, marginTop: 8 }}>{s.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
                    {s.tags.map((t, ti) => (
                      <span key={ti} className="dd-mono" style={{
                        fontSize: 11.5, fontWeight: 500, padding: "5px 11px", borderRadius: 999,
                        background: ti === 1 && t.match(/Claude|GPT/) ? PB : "#EDEFF4",
                        color: ti === 1 && t.match(/Claude|GPT/) ? P2 : T3,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── WORKED EXAMPLE ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>Worked Example</Eyebrow>
          <SubH>One real question, answered</SubH>
          <Lead>A rep is working a $300K mid-market retail deal and asks the agent a single question. Here&apos;s exactly what comes back.</Lead>

          <div style={{ maxWidth: 640, borderRadius: 24, border: `1px solid ${BORDER}`, background: BG, boxShadow: "0 10px 30px rgba(20,22,28,.1), 0 30px 70px rgba(20,22,28,.12)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "15px 20px", background: "#EDEFF4", borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${P}, ${VIOLET})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>?</span>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>&ldquo;Has a deal like this been approved before? What discount did we give, and who signs off?&rdquo;</span>
            </div>
            <div style={{ padding: "22px 20px" }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 8, color: T1 }}>
                <span style={{ color: OK }}>✓</span> Yes — 3 similar deals (mid-market retail, ~$300K)
              </div>
              {[
                { name: "Acme Retail", disc: "22%", by: "approved by VP Sales", outcome: "Won", oc: OK },
                { name: "Cira Retail", disc: "18%", by: "approved by VP Sales", outcome: "Won", oc: OK },
                { name: "Dryfoos Retail", disc: "20%", by: "priced too high", outcome: "Lost", oc: BAD },
              ].map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: `1px dashed ${BORDER}`, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, fontSize: 14, minWidth: 120 }}>{d.name}</span>
                  <span className="dd-mono" style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, background: PB, color: P2 }}>{d.disc}</span>
                  <span style={{ fontSize: 12.5, color: T3, flex: 1 }}>{d.by}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, background: `${d.oc}1A`, color: d.oc }}>{d.outcome}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "13px 15px", borderRadius: 10, background: SURFACE, border: `1px solid ${BORDER}`, fontSize: 13.5, display: "flex", gap: 18, flexWrap: "wrap" }}>
                <span><b>Typical discount:</b> 18–22%</span>
                <span><b>Contract to use:</b> Mid-Market MSA template (v3)</span>
              </div>
              <div style={{ marginTop: 11, display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: WARN, background: "#F8EFD6", padding: "10px 14px", borderRadius: 10 }}>
                <span>⚠</span> Discounts above 20% need VP Sales sign-off.
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="dd-mono" style={{ fontSize: 11.5, padding: "5px 11px", borderRadius: 999, background: `${SF}1A`, color: SF }}>Salesforce · 3 deals</span>
                <span className="dd-mono" style={{ fontSize: 11.5, padding: "5px 11px", borderRadius: 999, background: `${SP}1A`, color: SP }}>SharePoint · MSA v3</span>
                <span className="dd-mono" style={{ fontSize: 11.5, padding: "5px 11px", borderRadius: 999, background: `${EM}1A`, color: EM }}>Email · approvals</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRUST ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>Why It&apos;s Safe to Trust</Eyebrow>
          <SubH>Accurate by design, not by hope</SubH>

          <div style={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 820 }}>
            {[
              ["Existing permissions are respected.", "Glean inherits the access controls each source enforces, so a rep only sees deals and documents they can already open. The agent never grants or widens access."],
              ["Every fact is cited.", "Each number ties back to a real deal, template, or email. No source, no answer shown."],
              ["Rules are applied, not guessed.", "The decision step states the approval rule; the model only writes the wording — it can&apos;t invent a price or an approver."],
              ["It admits gaps.", "If there&apos;s no truly similar deal, it says “no clear precedent” instead of making one up."],
              ["A human still decides.", "The agent informs and drafts; it never sends or commits anything on its own."],
            ].map(([hd, bd], i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 0", borderBottom: i < 4 ? `1px solid ${BORDER}` : "none" }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, background: `${OK}1A`, color: OK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700 }}>✓</span>
                <p style={{ fontSize: 14.5, color: T2 }}><b style={{ color: T1 }}>{hd}</b> <span dangerouslySetInnerHTML={{ __html: bd }} /></p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BIGGER PICTURE ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>The Bigger Picture</Eyebrow>
          <SubH>What changes after a year of using it</SubH>
          <Lead>Saving time on each deal is the start. The compound effect is what makes this worth building.</Lead>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="dd-grid-3">
            {[
              { label: "01", title: "Captured deal memory", body: "Every closed deal teaches the agent what wins — the right price, the right terms, the right approver. The longer it runs, the sharper the precedent gets.", mech: "What it means: years of real deal history get encoded into the lookup, not stored in tenured reps' heads.", colors: [P, VIOLET] },
              { label: "02", title: "Experts stop being a queue", body: "Legal and VP Sales stop fielding the same questions repeatedly. The judgement they applied once answers hundreds of later deals.", mech: "What it means: the team handles more volume without adding headcount on the scarce expert side.", colors: [SP, P] },
              { label: "03", title: "Reusable pattern", body: "&lsquo;Trusted answers from scattered company data&rsquo; isn&apos;t only a deal-desk problem. The same agent pattern repeats elsewhere.", mech: "What it means: prove it here, repeat the build for legal intake, HR knowledge, IT support — any team buried in tools and tribal knowledge.", colors: [EM, WARN] },
            ].map((c) => (
              <div key={c.label} className="dd-card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ height: 5, background: `linear-gradient(90deg, ${c.colors[0]}, ${c.colors[1]})` }} />
                <div style={{ padding: 22 }}>
                  <span className="dd-mono" style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, marginBottom: 12, background: PB, color: P2 }}>{c.label}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.title}</h3>
                  <p style={{ fontSize: 13.5, color: T3, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: c.body }} />
                  <div style={{ fontSize: 12.5, padding: "10px 12px", borderRadius: 10, background: "#EDEFF4", color: T1 }}>{c.mech}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ROLLOUT ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>Build &amp; Rollout</Eyebrow>
          <SubH>Solve the most expensive problem first, prove the time saved, then expand</SubH>
          <Lead>The real setup work is making sure the connectors are indexed and the pricing and approval rules are findable. Rollout leads with approvals — the biggest time sink — not just precedent lookup.</Lead>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="dd-grid-4">
            {[
              ["Phase 1", "Precedent + approval answer", "Launch with the questions reps ask most — what did we give, and who has to approve it, surfaced from day one."],
              ["Phase 2", "Contract templates", "Add template selection so the answer also returns the right contract for the deal size and type."],
              ["Phase 3", "Route the request", "Let the agent draft and route the approval request to the approver — still with a human signing off."],
              ["Phase 4", "Expand the surface", "Same agent, more questions: terms, clauses, SLAs — and more segments over time."],
            ].map(([pn, title, body]) => (
              <div key={pn} className="dd-card" style={{ padding: 22, position: "relative" }}>
                <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${P}, ${VIOLET})`, borderRadius: "3px 3px 0 0" }} />
                <div className="dd-mono" style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.04em", color: P }}>{pn}</div>
                <h4 style={{ fontSize: 15.5, fontWeight: 600, margin: "12px 0 7px" }}>{title}</h4>
                <p style={{ fontSize: 13.5, color: T3 }}>{body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 14, padding: "20px 24px", borderRadius: 16, background: `linear-gradient(120deg, ${PB}, transparent)`, border: `1px solid ${BORDER}` }}>
            <span className="dd-tile" style={{ background: `linear-gradient(135deg, ${P}, ${VIOLET})`, color: "#fff" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>
            </span>
            <p style={{ fontSize: 14.5, color: T2 }}>
              <b style={{ color: T1 }}>Measure it simply:</b> time-to-answer before vs after, and days-earlier a deal closes. Those two numbers are the whole business case.
            </p>
          </div>
        </section>

        {/* ─── APPENDIX: model assignment ─── */}
        <section style={{ padding: "58px 0", borderTop: `1px solid ${BORDER}` }}>
          <Eyebrow>Appendix · Model Assignment</Eyebrow>
          <SubH>The right model for each job</SubH>
          <Lead>Retrieval and formatting use fast, precise models. The one step that weighs several conditions at once gets the most capable model — speed where it&apos;s a lookup, depth where it&apos;s a decision.</Lead>

          <div style={{ border: `1px solid ${BORDER}`, borderRadius: 16, overflowX: "auto", boxShadow: "0 1px 2px rgba(20,22,28,.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 720 }}>
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "24%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "36%" }} />
              </colgroup>
              <thead>
                <tr style={{ background: "#EDEFF4" }}>
                  {["Step", "Glean step type", "Model", "Why this model"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "14px 16px", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: T3 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Understand the deal", "Plan & Execute (Thinking)", "Claude Sonnet 4.6", "Reads a messy question and fills the gaps from context"],
                  ["Search 3 systems", "Company Search", "GPT-5.4 Fast", "Fast retrieval, runs the three searches in parallel"],
                  ["Read documents", "Read Document", "GPT-5.1", "Precise single-document extraction"],
                  ["Reason & decide", "Think (Deep Reasoning)", "Claude Opus 4.6", "Weighs several conditions and precedent at once — the critical step"],
                  ["Compose the answer", "Respond", "GPT-5.1", "Clean, faithful formatting of the decided answer"],
                  ["Draft & route", "Respond → Write action", "GPT-5.1", "Reliable, instruction-following draft for the request"],
                ].map((row, i, arr) => (
                  <tr key={i}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: "14px 16px", fontSize: 13.5, borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none", verticalAlign: "middle" }}>
                        {ci === 2 ? (
                          <span className="dd-mono" style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 500, background: PB, color: P2 }}>{cell}</span>
                        ) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <div style={{ padding: "46px 0 64px", textAlign: "center", color: T3, fontSize: 13, borderTop: `1px solid ${BORDER}` }}>
          <p style={{ marginBottom: 10 }}>
            Solution design case study · Deal Desk Acceleration Agent on Glean. Business-case figures are illustrative until calibrated with real before/after timings.
          </p>
          <Link href="/" style={{ color: P, fontWeight: 600, textDecoration: "none" }}>
            ← Back to portfolio
          </Link>
        </div>
      </div>

      {/* responsive grid fallback */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 760px) {
          .dd-grid-3, .dd-grid-4, .dd-grid-2 { grid-template-columns: 1fr !important; }
          .dd-strip { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </main>
  );
}
