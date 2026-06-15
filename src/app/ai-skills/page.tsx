"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── colour tokens ──────────────────────────────────────────────── */
const P  = "#0A84FF";   // primary accent (system blue)
const P2 = "#0066CC";   // deep accent
const PA = "#64D2FF";   // teal accent
const PB = "#EAF4FF";   // pale blue bg
const BL = "#BF5AF2";   // purple accent
const GR = "#30D158";   // green accent
const T1 = "#1D1D1F";   // dark text
const T2 = "#6E6E73";   // mid text
const T3 = "#757579";   // light text

/* ─── sidebar nav items ──────────────────────────────────────────── */
const NAV = [
  { id: "hero",      num: "00", label: "Overview" },
  { id: "sprint",    num: "01", label: "Sprint Intelligence" },
  { id: "billing",   num: "02", label: "Billing Compliance" },
  { id: "agent",     num: "03", label: "Agent Orchestration" },
  { id: "optimizer", num: "04", label: "Token Optimizer" },
  { id: "stack",     num: "05", label: "Tech Stack" },
];

/* ─── inline global styles (no CSS module needed) ───────────────── */
const GLOBAL_CSS = `
  html { scroll-behavior: smooth; }
  .aisk-body { font-family: var(--font-body); background: #F8FAFC; color: ${T2}; }
  .aisk-sidebar-link { display: flex; align-items: center; gap: 12px; padding: 9px 12px; font-size: 13px; color: ${T3}; text-decoration: none; border-radius: 8px; transition: all 0.18s; border-left: 2px solid transparent; margin-left: -2px; font-weight: 500; cursor: pointer; }
  .aisk-sidebar-link:hover { color: ${T1}; background: rgba(10,132,255,0.06); }
  .aisk-sidebar-link.active { color: ${P}; background: ${PB}; border-left-color: ${P}; }
  .aisk-sidebar-link .num { font-family: monospace; font-size: 11px; color: ${T3}; min-width: 22px; }
  .aisk-sidebar-link.active .num { color: ${P}; }

  @keyframes aisk-dash { to { stroke-dashoffset: -24; } }
  @keyframes aisk-pulse { 0%,100%{opacity:1;r:4px} 50%{opacity:0.4;r:2.5px} }
  @keyframes aisk-drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,60px)} }
  @keyframes aisk-drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,-40px)} }
  @keyframes aisk-rise { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes aisk-progress { from{width:0} to{width:100%} }
  @keyframes aisk-phase { 0%{opacity:0;left:6%} 10%{opacity:1} 90%{opacity:1;left:92%} 100%{opacity:0;left:92%} }

  .aisk-reveal { opacity:0; transform:translateY(28px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .aisk-reveal.in { opacity:1; transform:translateY(0); }
  .aisk-reveal.d1 { transition-delay:0.1s; }
  .aisk-reveal.d2 { transition-delay:0.2s; }
  .aisk-reveal.d3 { transition-delay:0.3s; }

  .aisk-flow-card { background:#fff; border:1.5px solid rgba(10,132,255,0.18); border-radius:14px; padding:16px 14px; transition:all 0.35s; }
  .aisk-flow-card:hover, .aisk-flow-card.lit { border-color:${P}; box-shadow:0 0 0 4px ${PB}, 0 4px 20px rgba(10,132,255,0.2); transform:translateY(-3px); }

  .aisk-takeaway { background:rgba(10,132,255,0.06); border-left:3px solid ${P}; padding:14px 20px; border-radius:6px 12px 12px 6px; margin:24px 0; font-size:14px; color:${T2}; line-height:1.6; }
  .aisk-takeaway strong { color:${P}; }

  .aisk-phase-dot { width:32px; height:32px; border-radius:50%; background:#fff; border:1.5px solid rgba(10,132,255,0.22); display:inline-flex; align-items:center; justify-content:center; font-family:monospace; font-size:10px; font-weight:600; color:${T3}; margin-bottom:8px; }
  .aisk-phase-item.lit .aisk-phase-dot { border-color:${P}; background:${P}; color:#fff; box-shadow:0 0 0 4px ${PB}; }

  .aisk-cap-row { display:flex; gap:12px; align-items:flex-start; padding:10px 0; border-bottom:1px solid rgba(10,132,255,0.08); }
  .aisk-cap-row:last-child { border-bottom:none; }

  .rf-arrow-el { transition: all 0.35s; }
  .rf-node-el { transition: all 0.35s; }
  .rf-node-el.active rect { filter: drop-shadow(0 4px 16px rgba(10,132,255,0.28)); }
  .rf-node-el.dim { opacity: 0.45; }

  @media(max-width:960px){
    .aisk-sidebar{display:none!important;}
    .aisk-main{margin-left:0!important;}
  }
`;

/* ─── Capability list item ───────────────────────────────────────── */
function Cap({ n, text, color = P }: { n: number; text: string; color?: string }) {
  return (
    <div className="aisk-cap-row">
      <span style={{ width:22, height:22, borderRadius:"50%", background:color, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, marginTop:1 }}>{n}</span>
      <span style={{ fontSize:13.5, color:T2, lineHeight:1.55 }}>{text}</span>
    </div>
  );
}

/* ─── Section header ─────────────────────────────────────────────── */
function SectionHead({ num, title, accent, lede }: { num: string; title: string; accent: string; lede: string }) {
  return (
    <div>
      <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontFamily:"monospace", fontSize:11, letterSpacing:"0.22em", textTransform:"uppercase", color:P, marginBottom:14 }}>
        <span style={{ width:28, height:1, background:P, display:"inline-block" }} />
        {num}
      </div>
      <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(30px,4vw,48px)", fontWeight:700, lineHeight:1.05, letterSpacing:"-0.03em", color:T1, marginBottom:14 }}>
        {title}{" "}
        <span style={{ background:`linear-gradient(135deg,${P},${P2},${PA})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{accent}</span>
      </h2>
      <p style={{ fontSize:17, color:T2, lineHeight:1.55, maxWidth:600, marginBottom:32 }}>{lede}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SVG DIAGRAM 1 — Sprint Intelligence
   ══════════════════════════════════════════════════════════════════ */
function SprintDiagram() {
  return (
    <div style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.14)`, borderRadius:18, padding:"28px 24px", boxShadow:"0 4px 20px rgba(10,132,255,0.06)", margin:"24px 0" }}>
      <svg viewBox="0 0 820 260" style={{ width:"100%", height:"auto", display:"block", overflow:"visible" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="s-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill={P} />
          </marker>
          <marker id="s-arrow-gr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill={GR} />
          </marker>
          {/* particle paths */}
          <path id="sp1" d="M170 80 L230 80" />
          <path id="sp2" d="M390 80 L450 80" />
          <path id="sp3" d="M610 80 L670 80" />
          <path id="sp4" d="M530 130 L530 180" />
          <path id="sp5" d="M530 180 L440 220" />
          <path id="sp6" d="M530 180 L620 220" />
        </defs>

        {/* ── Node 1: CSV Input ── */}
        <g>
          <rect x="20" y="52" width="150" height="56" rx="12" fill={PB} stroke={P} strokeWidth="1.8"/>
          <text x="95" y="75" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:13, fontWeight:600, fill:T1 }}>CSV Input</text>
          <text x="95" y="94" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P }}>ticket_export.csv</text>
          <circle cx="155" cy="75" r="4" fill={P}>
            <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Arrow 1 */}
        <line x1="170" y1="80" x2="228" y2="80" stroke={P} strokeWidth="2" markerEnd="url(#s-arrow)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite"/>
        </line>
        <circle r="4.5" fill={P} style={{ filter:`drop-shadow(0 0 6px ${P})` }}>
          <animateMotion dur="1.8s" repeatCount="indefinite"><mpath xlinkHref="#sp1"/></animateMotion>
        </circle>

        {/* ── Node 2: Parser + Router ── */}
        <g>
          <rect x="230" y="40" width="160" height="80" rx="12" fill="#fff" stroke={PA} strokeWidth="1.5"/>
          <text x="310" y="68" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:13, fontWeight:600, fill:T1 }}>Parser + Router</text>
          <text x="310" y="86" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>week detection</text>
          <text x="310" y="103" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>assignee mapping</text>
        </g>

        {/* Arrow 2 */}
        <line x1="390" y1="80" x2="448" y2="80" stroke={P} strokeWidth="2" markerEnd="url(#s-arrow)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
        </line>
        <circle r="4.5" fill={P} style={{ filter:`drop-shadow(0 0 6px ${P})` }}>
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.6s"><mpath xlinkHref="#sp2"/></animateMotion>
        </circle>

        {/* ── Node 3: Velocity Engine ── */}
        <g>
          <rect x="450" y="30" width="180" height="100" rx="12" fill={PB} stroke={P} strokeWidth="2" style={{ filter:`drop-shadow(0 4px 16px rgba(10,132,255,0.18))` }}/>
          <text x="540" y="58" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:14, fontWeight:700, fill:T1 }}>Velocity Engine</text>
          <text x="540" y="76" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P }}>scorecard ranking</text>
          <text x="540" y="92" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P }}>blocker age tiers</text>
          <text x="540" y="108" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P }}>cascade detection</text>
        </g>

        {/* Arrow 3: to Report */}
        <line x1="630" y1="80" x2="668" y2="80" stroke={P} strokeWidth="2" markerEnd="url(#s-arrow)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin="0.6s"/>
        </line>
        <circle r="4.5" fill={P} style={{ filter:`drop-shadow(0 0 6px ${P})` }}>
          <animateMotion dur="1.8s" repeatCount="indefinite" begin="1.2s"><mpath xlinkHref="#sp3"/></animateMotion>
        </circle>

        {/* ── Node 4: Report ── */}
        <g>
          <rect x="670" y="52" width="130" height="56" rx="12" fill="#fff" stroke={PA} strokeWidth="1.5"/>
          <text x="735" y="75" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:13, fontWeight:600, fill:T1 }}>PM Report</text>
          <text x="735" y="94" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>markdown + table</text>
        </g>

        {/* Down arrow: Velocity → Branches */}
        <line x1="540" y1="130" x2="540" y2="178" stroke={P} strokeWidth="1.5" markerEnd="url(#s-arrow)" strokeDasharray="5 4">
          <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.2s" repeatCount="indefinite" begin="0.4s"/>
        </line>

        {/* ── Branch hub ── */}
        <circle cx="540" cy="185" r="8" fill={P} style={{ filter:`drop-shadow(0 0 10px ${P})` }}>
          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
        </circle>

        {/* Left branch: Blocker Age */}
        <line x1="532" y1="190" x2="430" y2="225" stroke={GR} strokeWidth="1.5" markerEnd="url(#s-arrow-gr)" strokeDasharray="5 4">
          <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.2s" repeatCount="indefinite" begin="0.2s"/>
        </line>
        <circle r="4" fill={GR}>
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s"><mpath xlinkHref="#sp5"/></animateMotion>
        </circle>
        <rect x="340" y="228" width="180" height="50" rx="10" fill="#E8FBEE" stroke={GR} strokeWidth="1.5"/>
        <text x="430" y="249" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:600, fill:"#1B7A33" }}>Blocker Analysis</text>
        <text x="430" y="266" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:GR }}>Fresh→Monitor→Critical</text>

        {/* Right branch: PM Actions */}
        <line x1="548" y1="190" x2="630" y2="225" stroke={BL} strokeWidth="1.5" strokeDasharray="5 4">
          <animate attributeName="stroke-dashoffset" values="0;-18" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
        </line>
        <g>
          <rect x="620" y="228" width="180" height="50" rx="10" fill="rgba(8,145,178,0.08)" stroke={BL} strokeWidth="1.5"/>
          <text x="710" y="249" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:600, fill:"#0A6E8A" }}>PM Action Items</text>
          <text x="710" y="266" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:BL }}>escalations · nudges</text>
        </g>
      </svg>

      {/* Step labels */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginTop:16 }}>
        {[
          { n:"01", t:"Import", s:"CSV upload or path reference" },
          { n:"02", t:"Parse", s:"Week detection, assignee map" },
          { n:"03", t:"Compute", s:"Scorecards, trends, blockers" },
          { n:"04", t:"Output", s:"Ranked PM report + action items" },
        ].map(s => (
          <div key={s.n} style={{ background:"#F8FAFC", border:`1px solid rgba(10,132,255,0.1)`, borderRadius:10, padding:"12px", textAlign:"center" }}>
            <div style={{ fontFamily:"monospace", fontSize:10, color:P, letterSpacing:"0.14em", fontWeight:700, marginBottom:4 }}>STEP {s.n}</div>
            <div style={{ fontFamily:"var(--font-heading)", fontSize:13, fontWeight:600, color:T1, marginBottom:4 }}>{s.t}</div>
            <div style={{ fontSize:11, color:T3, lineHeight:1.4 }}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SVG DIAGRAM 2 — Billing Compliance (phase pipeline)
   ══════════════════════════════════════════════════════════════════ */
function BillingDiagram() {
  const phases = [
    { id:"P1", label:"Identify", sub:"Contact ID" },
    { id:"P2", label:"Projects", sub:"T&M discovery" },
    { id:"P4", label:"Rates", sub:"Validation rules" },
    { id:"P5", label:"Opp X-Val", sub:"OTD discount" },
    { id:"P6", label:"Timecards", sub:"Gap analysis" },
    { id:"P8", label:"PO Check", sub:"Invoice ready?" },
    { id:"P7", label:"Dashboard", sub:"HTML output" },
  ];
  const W = 820, nodeW = 96, nodeH = 70, y = 80, gapX = (W - phases.length * nodeW) / (phases.length + 1);

  return (
    <div style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.14)`, borderRadius:18, padding:"28px 24px", boxShadow:"0 4px 20px rgba(10,132,255,0.06)", margin:"24px 0" }}>
      <svg viewBox={`0 0 ${W} 200`} style={{ width:"100%", height:"auto", display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="b-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill={P} />
          </marker>
          {/* Traveling particle path (full pipeline) */}
          <path id="pipeline-path" d={`M ${gapX + nodeW} ${y + nodeH/2} ` +
            phases.slice(1).map((_, i) => `L ${gapX + (i+2)*(gapX + nodeW)} ${y + nodeH/2}`).join(" ")} />
        </defs>

        {phases.map((ph, i) => {
          const x = gapX + i * (gapX + nodeW);
          const isLast = i === phases.length - 1;
          const cx = x + nodeW / 2;
          return (
            <g key={ph.id}>
              {/* node */}
              <rect x={x} y={y} width={nodeW} height={nodeH} rx="12"
                fill={isLast ? P : PB}
                stroke={P} strokeWidth={isLast ? 2 : 1.5}
                style={isLast ? { filter:`drop-shadow(0 4px 16px rgba(10,132,255,0.3))` } : {}}
              />
              <text x={cx} y={y + 24} textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:isLast?"#fff":P, fontWeight:700, letterSpacing:"0.1em" }}>{ph.id}</text>
              <text x={cx} y={y + 42} textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:600, fill:isLast?"#fff":T1 }}>{ph.label}</text>
              <text x={cx} y={y + 57} textAnchor="middle" style={{ fontFamily:"monospace", fontSize:9.5, fill:isLast?"rgba(255,255,255,0.8)":T3 }}>{ph.sub}</text>
              {/* arrow to next */}
              {i < phases.length - 1 && (
                <>
                  <line
                    x1={x + nodeW} y1={y + nodeH/2}
                    x2={x + nodeW + gapX} y2={y + nodeH/2}
                    stroke={P} strokeWidth="1.8" markerEnd="url(#b-arrow)"
                    strokeDasharray="6 4"
                  >
                    <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.15}s`}/>
                  </line>
                  {/* animated dot */}
                  <circle r="4" fill={P} style={{ filter:`drop-shadow(0 0 6px ${P})` }}>
                    <animateMotion
                      dur="5s"
                      begin={`${i * 0.7}s`}
                      repeatCount="indefinite"
                      path={`M ${x + nodeW} ${y + nodeH/2} L ${x + nodeW + gapX} ${y + nodeH/2}`}
                    />
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {/* severity legend below */}
        {[
          { x:80,  color:"#FF375F", bg:"rgba(255,55,95,0.1)",   label:"🔴 Critical" },
          { x:230, color:"#FF9F0A", bg:"rgba(255,159,10,0.1)",   label:"⚠️ Warning" },
          { x:380, color:GR,        bg:"rgba(5,150,105,0.1)",   label:"✅ OK" },
        ].map(s => (
          <g key={s.label}>
            <rect x={s.x} y="168" width="130" height="24" rx="8" fill={s.bg} stroke={s.color} strokeWidth="1"/>
            <text x={s.x + 65} y="184" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:11, fill:s.color, fontWeight:600 }}>{s.label}</text>
          </g>
        ))}
        <text x="570" y="183" style={{ fontFamily:"monospace", fontSize:11, fill:T3 }}>severity tier applied per phase</text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SVG DIAGRAM 3 — Agent Orchestration (mode split + step types)
   ══════════════════════════════════════════════════════════════════ */
function AgentDiagram() {
  return (
    <div style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.14)`, borderRadius:18, padding:"28px 24px", boxShadow:"0 4px 20px rgba(10,132,255,0.06)", margin:"24px 0" }}>
      <svg viewBox="0 0 820 280" style={{ width:"100%", height:"auto", display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="a-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill={P} />
          </marker>
          <marker id="a-arrow-bl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill={BL} />
          </marker>
          <path id="ag1" d="M185 80 L240 80"/>
          <path id="ag2" d="M185 80 L240 175"/>
          <path id="ag3a" d="M380 80 L435 80"/>
          <path id="ag3b" d="M600 80 L655 80"/>
          <path id="ag4" d="M380 175 L580 175"/>
        </defs>

        {/* ── Intent node ── */}
        <g>
          <rect x="20" y="55" width="165" height="50" rx="12" fill={PB} stroke={P} strokeWidth="2"/>
          <text x="102" y="76" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:13, fontWeight:700, fill:T1 }}>Intent Received</text>
          <text x="102" y="94" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P }}>user prompt / trigger</text>
          <circle cx="175" cy="80" r="4" fill={P}>
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Branch arrow: Auto */}
        <path d="M185 80 Q215 80 240 55" stroke={P} strokeWidth="1.8" fill="none" markerEnd="url(#a-arrow)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite"/>
        </path>
        <text x="218" y="62" style={{ fontFamily:"monospace", fontSize:10, fill:P, fontWeight:600 }}>simple</text>

        {/* Branch arrow: Workflow */}
        <path d="M185 80 Q215 80 240 175" stroke={BL} strokeWidth="1.8" fill="none" markerEnd="url(#a-arrow-bl)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
        </path>
        <text x="218" y="148" style={{ fontFamily:"monospace", fontSize:10, fill:BL, fontWeight:600 }}>complex</text>

        {/* ── Auto Mode box ── */}
        <g>
          <rect x="240" y="30" width="140" height="80" rx="12" fill="rgba(10,132,255,0.06)" stroke={PA} strokeWidth="1.5"/>
          <text x="310" y="55" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P, letterSpacing:"0.12em", fontWeight:600 }}>AUTO MODE</text>
          <text x="310" y="73" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:600, fill:T1 }}>Plan & Execute</text>
          <text x="310" y="90" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>adaptive reasoning</text>
          <text x="310" y="103" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>+ tool selection</text>
        </g>

        {/* Arrow: Auto → Output */}
        <line x1="380" y1="70" x2="433" y2="70" stroke={P} strokeWidth="1.8" markerEnd="url(#a-arrow)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin="0.2s"/>
        </line>
        <circle r="4" fill={P} style={{ filter:`drop-shadow(0 0 6px ${P})` }}>
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.4s"><mpath xlinkHref="#ag3a"/></animateMotion>
        </circle>

        {/* ── Auto output ── */}
        <g>
          <rect x="435" y="44" width="150" height="52" rx="12" fill="#fff" stroke={PA} strokeWidth="1.5"/>
          <text x="510" y="67" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:600, fill:T1 }}>Inline Response</text>
          <text x="510" y="85" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>formatted answer</text>
        </g>

        {/* ── Workflow Mode box ── */}
        <g>
          <rect x="240" y="148" width="140" height="100" rx="12" fill="rgba(8,145,178,0.07)" stroke={BL} strokeWidth="1.5"/>
          <text x="310" y="172" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:BL, letterSpacing:"0.12em", fontWeight:600 }}>WORKFLOW</text>
          <text x="310" y="190" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:600, fill:T1 }}>Deterministic</text>
          <text x="310" y="208" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>Think → Bridge</text>
          <text x="310" y="224" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>→ Respond</text>
          <text x="310" y="240" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>memory managed</text>
        </g>

        {/* Arrow: Workflow → Step types */}
        <line x1="380" y1="198" x2="433" y2="198" stroke={BL} strokeWidth="1.8" markerEnd="url(#a-arrow-bl)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin="0.5s"/>
        </line>

        {/* ── Step types: Think / Respond / Branch / Sub-agent ── */}
        {[
          { label:"Think", sub:"reasoning", y:155 },
          { label:"Respond", sub:"user output", y:188 },
          { label:"Branch", sub:"conditions", y:221 },
          { label:"Sub-agent", sub:"isolated ctx", y:254 },
        ].map((s, i) => (
          <g key={s.label}>
            <rect x="435" y={s.y - 14} width="130" height="26" rx="8" fill={i===0 ? PB : "#F8FAFC"} stroke={i===0 ? P : "rgba(10,132,255,0.18)"} strokeWidth="1.2"/>
            <text x="500" y={s.y + 4} textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:11.5, fontWeight:600, fill:i===0 ? P : T1 }}>{s.label}</text>
            <text x="620" y={s.y + 4} style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>{s.sub}</text>
          </g>
        ))}

        {/* Memory limit badge */}
        <g>
          <rect x="650" y="155" width="150" height="100" rx="12" fill="rgba(255,159,10,0.07)" stroke="#FF9F0A" strokeWidth="1.5"/>
          <text x="725" y="182" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:"#FF9F0A", fontWeight:700, letterSpacing:"0.1em" }}>MEMORY</text>
          <text x="725" y="200" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:600, fill:T1 }}>128K limit</text>
          <text x="725" y="218" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>all prev / prev only</text>
          <text x="725" y="234" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T3 }}>/ no memory</text>
          <text x="725" y="248" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:"#FF9F0A" }}>↳ prevents crash</text>
        </g>
      </svg>

      {/* Model routing table */}
      <div style={{ marginTop:16, background:"#F8FAFC", borderRadius:12, border:`1px solid rgba(10,132,255,0.1)`, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:`1px solid rgba(10,132,255,0.1)`, background:PB }}>
          {["Task Complexity","Model","Mode"].map(h => (
            <div key={h} style={{ padding:"8px 14px", fontFamily:"monospace", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:P, fontWeight:600 }}>{h}</div>
          ))}
        </div>
        {[
          ["Simple retrieval / Respond", "GPT-5.1", "Fast"],
          ["Moderate reasoning (3–4 conditions)", "Sonnet 4.6", "Thinking"],
          ["Complex / portfolio-wide / EOM audit", "Opus 4.6", "Deep Reasoning"],
        ].map((row, i) => (
          <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom: i<2 ? `1px solid rgba(10,132,255,0.07)` : "none" }}>
            <div style={{ padding:"9px 14px", fontSize:13, color:T2, borderRight:`1px solid rgba(10,132,255,0.07)` }}>{row[0]}</div>
            <div style={{ padding:"9px 14px", fontFamily:"monospace", fontSize:12, color:P, fontWeight:600, borderRight:`1px solid rgba(10,132,255,0.07)` }}>{row[1]}</div>
            <div style={{ padding:"9px 14px", fontFamily:"monospace", fontSize:12, color:T3 }}>{row[2]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SVG DIAGRAM 4 — Token Optimizer (triage gate + 5 levers funnel)
   ══════════════════════════════════════════════════════════════════ */
function TokenDiagram() {
  return (
    <div style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.14)`, borderRadius:18, padding:"28px 24px", boxShadow:"0 4px 20px rgba(10,132,255,0.06)", margin:"24px 0" }}>
      <svg viewBox="0 0 820 240" style={{ width:"100%", height:"auto", display:"block" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="t-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill={P} />
          </marker>
          <marker id="t-arrow-gr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill={GR} />
          </marker>
          <marker id="t-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="#FF375F" />
          </marker>
          <path id="tp1" d="M155 100 L200 100"/>
          <path id="tp2" d="M340 100 L385 100"/>
          <path id="tp3" d="M570 100 L630 100"/>
        </defs>

        {/* ── Input: Skill/Prompt ── */}
        <g>
          <rect x="15" y="70" width="140" height="60" rx="12" fill={PB} stroke={P} strokeWidth="1.8"/>
          <text x="85" y="94" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:13, fontWeight:600, fill:T1 }}>Skill / Prompt</text>
          <text x="85" y="112" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P }}>input artifact</text>
          <circle cx="145" cy="100" r="4" fill={P}>
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Arrow → triage */}
        <line x1="155" y1="100" x2="198" y2="100" stroke={P} strokeWidth="1.8" markerEnd="url(#t-arrow)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite"/>
        </line>
        <circle r="4" fill={P} style={{ filter:`drop-shadow(0 0 6px ${P})` }}>
          <animateMotion dur="2s" repeatCount="indefinite"><mpath xlinkHref="#tp1"/></animateMotion>
        </circle>

        {/* ── Triage Gate ── */}
        <g>
          <rect x="200" y="55" width="140" height="90" rx="12" fill={PB} stroke={P} strokeWidth="2" style={{ filter:`drop-shadow(0 4px 16px rgba(10,132,255,0.2))` }}/>
          <text x="270" y="80" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P, fontWeight:700, letterSpacing:"0.14em" }}>TRIAGE GATE</text>
          <text x="270" y="97" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T2 }}>≥400 lines?</text>
          <text x="270" y="112" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T2 }}>≥5× / week?</text>
          <text x="270" y="127" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:T2 }}>arch sound?</text>
        </g>

        {/* SKIP branch (down) */}
        <path d="M270 145 L270 180" stroke="#FF375F" strokeWidth="1.5" fill="none" markerEnd="url(#t-arrow-red)" strokeDasharray="5 4">
          <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.2s" repeatCount="indefinite" begin="0.5s"/>
        </path>
        <rect x="195" y="182" width="150" height="28" rx="8" fill="rgba(255,55,95,0.08)" stroke="#FF375F" strokeWidth="1"/>
        <text x="270" y="200" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:11, fill:"#FF375F", fontWeight:600 }}>SKIP — not worth it</text>

        {/* PROCEED arrow */}
        <line x1="340" y1="100" x2="383" y2="100" stroke={GR} strokeWidth="1.8" markerEnd="url(#t-arrow-gr)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
        </line>
        <text x="362" y="93" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:GR, fontWeight:600 }}>PROCEED</text>
        <circle r="4" fill={GR}>
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s"><mpath xlinkHref="#tp2"/></animateMotion>
        </circle>

        {/* ── 5 Levers ── */}
        <g>
          <rect x="385" y="40" width="185" height="120" rx="12" fill="rgba(5,150,105,0.06)" stroke={GR} strokeWidth="1.8"/>
          <text x="478" y="62" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:GR, fontWeight:700, letterSpacing:"0.12em" }}>5 LEVERS</text>
          {[
            "① Progressive disclosure",
            "② Cache-first ordering",
            "③ Scripts > instructions",
            "④ Right-size model",
            "⑤ Kill ritual prose",
          ].map((l, i) => (
            <text key={i} x="395" y={79 + i * 16} style={{ fontFamily:"monospace", fontSize:10, fill:T2 }}>{l}</text>
          ))}
        </g>

        {/* Arrow → Report */}
        <line x1="570" y1="100" x2="628" y2="100" stroke={P} strokeWidth="1.8" markerEnd="url(#t-arrow)" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" begin="0.5s"/>
        </line>
        <circle r="4" fill={P} style={{ filter:`drop-shadow(0 0 6px ${P})` }}>
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.2s"><mpath xlinkHref="#tp3"/></animateMotion>
        </circle>

        {/* ── BEFORE/AFTER Report ── */}
        <g>
          <rect x="630" y="55" width="175" height="90" rx="12" fill="#fff" stroke={P} strokeWidth="1.5"/>
          <text x="718" y="80" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:10, fill:P, fontWeight:700, letterSpacing:"0.1em" }}>REPORT</text>
          <text x="718" y="98" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:11, fill:"#FF375F", fontWeight:600 }}>BEFORE: 1,240 tok</text>
          <text x="718" y="115" textAnchor="middle" style={{ fontFamily:"monospace", fontSize:11, fill:GR, fontWeight:600 }}>AFTER:  390 tok</text>
          <text x="718" y="132" textAnchor="middle" style={{ fontFamily:"var(--font-heading)", fontSize:12, fontWeight:700, fill:P }}>68.5% saved ↓</text>
        </g>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function AISkillsPage() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const revealRefs = useRef<HTMLElement[]>([]);

  /* scroll progress + active section */
  const onScroll = useCallback(() => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    setProgress(max > 0 ? (scrolled / max) * 100 : 0);

    for (const { id } of NAV) {
      const el = sectionRefs.current[id];
      if (el && el.getBoundingClientRect().top <= 120) setActive(id);
    }

    /* reveal animations */
    revealRefs.current.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add("in");
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run after paint so all refs are registered
    const raf = requestAnimationFrame(() => onScroll());
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [onScroll]);

  const registerReveal = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="aisk-body" style={{ minHeight:"100vh" }}>

        {/* ── background aurora ── */}
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
          <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", filter:"blur(120px)", background:"radial-gradient(circle,rgba(10,132,255,0.12),transparent 65%)", top:"5%", right:"-5%", animation:"aisk-drift1 28s ease-in-out infinite", opacity:0.6 }}/>
          <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", filter:"blur(120px)", background:"radial-gradient(circle,rgba(191,90,242,0.1),transparent 65%)", bottom:"5%", left:"-5%", animation:"aisk-drift2 32s ease-in-out infinite", opacity:0.5 }}/>
          <div style={{ position:"fixed", inset:0, backgroundImage:"linear-gradient(rgba(10,132,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(10,132,255,0.025) 1px,transparent 1px)", backgroundSize:"56px 56px", WebkitMaskImage:"radial-gradient(ellipse 80% 80% at center,black 0%,transparent 75%)", maskImage:"radial-gradient(ellipse 80% 80% at center,black 0%,transparent 75%)" }}/>
        </div>

        {/* ── topbar ── */}
        <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, background:"rgba(248,247,255,0.88)", backdropFilter:"blur(20px)", borderBottom:`1px solid rgba(10,132,255,0.1)`, padding:"14px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <a href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
            <div style={{ width:30, height:30, background:`linear-gradient(135deg,${PA},${P2})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontWeight:800, fontSize:14, color:"#fff", boxShadow:`0 4px 14px rgba(10,132,255,0.3)` }}>R</div>
            <span style={{ fontFamily:"monospace", fontWeight:700, fontSize:13, color:T1, letterSpacing:"0.12em", textTransform:"uppercase" }}>rohit.singh</span>
          </a>
          <div style={{ fontFamily:"monospace", fontSize:11, color:T3, letterSpacing:"0.1em", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:P, boxShadow:`0 0 10px ${P}`, display:"inline-block", animation:"aisk-pulse 2s ease-in-out infinite" }}/>
            AI Skills Field Guide
          </div>
        </header>

        {/* ── read progress bar ── */}
        <div style={{ position:"fixed", top:58, left:0, right:0, height:2, background:`rgba(10,132,255,0.1)`, zIndex:40 }}>
          <div style={{ height:"100%", background:`linear-gradient(90deg,${P},${PA})`, width:`${progress}%`, transition:"width 0.1s linear", boxShadow:`0 0 8px rgba(10,132,255,0.4)` }}/>
        </div>

        {/* ── layout ── */}
        <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", minHeight:"100vh", paddingTop:60, position:"relative", zIndex:2 }}>

          {/* SIDEBAR */}
          <aside className="aisk-sidebar" style={{ position:"fixed", top:60, bottom:0, left:0, width:280, padding:"36px 24px 36px 32px", borderRight:`1px solid rgba(10,132,255,0.1)`, overflowY:"auto", background:"rgba(248,247,255,0.75)", backdropFilter:"blur(12px)" }}>
            <div style={{ fontFamily:"monospace", fontSize:10, fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:T3, marginBottom:16 }}>On this page</div>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:2 }}>
              {NAV.map(n => (
                <li key={n.id}>
                  <div className={`aisk-sidebar-link${active === n.id ? " active" : ""}`} onClick={() => scrollTo(n.id)}>
                    <span className="num">{n.num}</span>
                    {n.label}
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* MAIN */}
          <main className="aisk-main" style={{ gridColumn:2, marginLeft:280, paddingBottom:120 }}>

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section id="hero" ref={el => { sectionRefs.current.hero = el; }} style={{ padding:"52px 0 40px", borderBottom:`1px solid rgba(10,132,255,0.1)` }}>
              <div style={{ maxWidth:820, margin:"0 auto", padding:"0 56px" }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontFamily:"monospace", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:P, fontWeight:500, padding:"6px 14px", background:PB, border:`1px solid rgba(10,132,255,0.25)`, borderRadius:100, marginBottom:28 }}>
                  <span style={{ width:6, height:6, background:P, borderRadius:"50%", boxShadow:`0 0 8px ${P}` }}/>
                  AI Engineering · PM Tooling
                </div>
                <h1 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(52px,7vw,100px)", fontWeight:800, lineHeight:0.97, letterSpacing:"-0.04em", color:T1, marginBottom:24 }}>
                  AI Agent<br/>
                  <span style={{ background:`linear-gradient(135deg,${P},${P2},${PA})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Skills.</span>
                </h1>
                <p style={{ fontSize:18, color:T2, lineHeight:1.55, maxWidth:560, marginBottom:36 }}>
                  A suite of four custom agent skills encoding PM domain knowledge — sprint velocity, billing compliance, agent orchestration, and token optimization. Real flows. Real outputs.
                </p>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {["→ Sprint Intelligence","→ Billing Compliance","→ Agent Orchestration","→ Token Optimizer"].map(l => (
                    <span key={l} style={{ fontFamily:"monospace", fontSize:11, padding:"6px 12px", background:"#fff", border:`1px solid rgba(10,132,255,0.18)`, borderRadius:100, color:T2, boxShadow:"0 1px 4px rgba(10,132,255,0.06)" }}>{l}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* ══ § 01 — SPRINT INTELLIGENCE ════════════════════════ */}
            <section id="sprint" ref={el => { sectionRefs.current.sprint = el; }} style={{ padding:"52px 0", borderBottom:`1px solid rgba(10,132,255,0.08)`, scrollMarginTop:80 }}>
              <div style={{ maxWidth:820, margin:"0 auto", padding:"0 56px" }}>
                <div ref={registerReveal} className="aisk-reveal">
                  <SectionHead num="01 — Sprint Intelligence" title="Velocity &" accent="Blocker Analytics" lede="Parses raw ticket export CSVs into ranked team scorecards, week-on-week trend arrows, blocker age escalations, and auto-generated PM action items — all in under 2 minutes." />
                </div>

                <div ref={registerReveal} className="aisk-reveal d1"><SprintDiagram /></div>

                <h3 ref={registerReveal} className="aisk-reveal d1" style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:600, color:T1, margin:"20px 0 10px" }}>Key capabilities</h3>
                <div ref={registerReveal} className="aisk-reveal d2" style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.12)`, borderRadius:14, padding:"4px 20px 4px", boxShadow:"0 2px 12px rgba(10,132,255,0.05)" }}>
                  {[
                    "Ranked scorecards sorted by gap-to-weekly-target with week-on-week trend arrows (↑↓→)",
                    "Blocker age tiers — Fresh (0–6d) / Monitor (7–29d) / Escalate (30–89d) / Critical (90d+) — using status-change timestamps, never ticket-created dates",
                    "Cascade unblock detection: identifies which this-week closes freed downstream blocked tickets",
                    "Delivery pattern health: detects end-of-sprint bunching (all closes on single day) vs steady throughput",
                    "Stale In-Progress detection (3+ days no activity) with validation coverage check",
                    "Auto PM action items: escalation drafts, coaching nudges, 1-on-1 flags, and recognition",
                  ].map((c,i) => <Cap key={i} n={i+1} text={c} />)}
                </div>

                <div ref={registerReveal} className="aisk-reveal d3 aisk-takeaway">
                  <strong>Output: </strong>Weekly markdown report + ranked per-person scorecard table with ticket IDs, smart context notes, and cumulative all-time totals.
                </div>
              </div>
            </section>

            {/* ══ § 02 — BILLING COMPLIANCE ═════════════════════════ */}
            <section id="billing" ref={el => { sectionRefs.current.billing = el; }} style={{ padding:"52px 0", borderBottom:`1px solid rgba(10,132,255,0.08)`, scrollMarginTop:80, background:"rgba(248,247,255,0.5)" }}>
              <div style={{ maxWidth:820, margin:"0 auto", padding:"0 56px" }}>
                <div ref={registerReveal} className="aisk-reveal">
                  <SectionHead num="02 — Billing Compliance" title="End-of-Month" accent="Financial Audit" lede="Multi-phase audit that queries live PSA/CRM data, validates rate card alignment, surfaces timecard approval gaps, checks purchase order compliance, and produces an action-first compliance dashboard." />
                </div>

                <div ref={registerReveal} className="aisk-reveal d1"><BillingDiagram /></div>

                <h3 ref={registerReveal} className="aisk-reveal d1" style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:600, color:T1, margin:"20px 0 10px" }}>Key capabilities</h3>
                <div ref={registerReveal} className="aisk-reveal d2" style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.12)`, borderRadius:14, padding:"4px 20px 4px", boxShadow:"0 2px 12px rgba(10,132,255,0.05)" }}>
                  {[
                    "Rate card validation: flags zero rates, bill-above-list anomalies, and OTD discount consistency across all billable assignments",
                    "Opportunity cross-validation: assignment rates checked against original sold rates, with OTD % verified uniformly applied",
                    "Timecard approval gap analysis: classifies approved-not-in-financials, submitted-not-approved, saved, rejected, and missing timecards",
                    "BE-aware budget affordability: avoids false-positives by computing pending-for-next-BE against real headroom, not raw bookings minus billings",
                    "Purchase order verification across opportunity, project details, and budget records",
                    "Structured HTML compliance dashboard with severity tiers (Critical / Warning / Info / OK) and financial impact per flag",
                  ].map((c,i) => <Cap key={i} n={i+1} text={c} color={GR} />)}
                </div>

                <div ref={registerReveal} className="aisk-reveal d3 aisk-takeaway">
                  <strong>Output: </strong>HTML audit dashboard + inline action table grouped by financial impact — 60%+ time saved vs. manual EOM validation.
                </div>
              </div>
            </section>

            {/* ══ § 03 — AGENT ORCHESTRATION ════════════════════════ */}
            <section id="agent" ref={el => { sectionRefs.current.agent = el; }} style={{ padding:"52px 0", borderBottom:`1px solid rgba(10,132,255,0.08)`, scrollMarginTop:80 }}>
              <div style={{ maxWidth:820, margin:"0 auto", padding:"0 56px" }}>
                <div ref={registerReveal} className="aisk-reveal">
                  <SectionHead num="03 — Agent Orchestration" title="Agentic Workflow" accent="Design System" lede="Complete reference for designing, prompting, and debugging multi-step AI agents — covering mode selection, step-type rules, memory management, model routing, and data verification patterns." />
                </div>

                <div ref={registerReveal} className="aisk-reveal d1"><AgentDiagram /></div>

                <h3 ref={registerReveal} className="aisk-reveal d1" style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:600, color:T1, margin:"20px 0 10px" }}>Key capabilities</h3>
                <div ref={registerReveal} className="aisk-reveal d2" style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.12)`, borderRadius:14, padding:"4px 20px 4px", boxShadow:"0 2px 12px rgba(10,132,255,0.05)" }}>
                  {[
                    "Mode selection guide: Auto vs Workflow with a production-readiness checklist before publishing",
                    "Step-type decision matrix: Think / Respond / Plan & Execute / Branch / Wait / Sub-agent with crash rules (never two consecutive Think steps)",
                    "Memory management: 128K token limit, per-step isolation for large data retrieval, sub-agent isolation rules",
                    "Model routing table: cost-vs-capability assignment for 5 frontier models with breakeven math",
                    "Count-Then-Verify pattern: anchor count before reading multi-row tables — catches rows missed by 'read all'",
                    "List-Then-Sum-Then-Recount pattern: forces explicit row listing before summing to prevent silent aggregation hallucination",
                  ].map((c,i) => <Cap key={i} n={i+1} text={c} color={BL} />)}
                </div>

                <div ref={registerReveal} className="aisk-reveal d3 aisk-takeaway">
                  <strong>Output: </strong>Step-by-step agent blueprint + 15-point QA checklist verified before any workflow goes to production.
                </div>
              </div>
            </section>

            {/* ══ § 04 — TOKEN OPTIMIZER ════════════════════════════ */}
            <section id="optimizer" ref={el => { sectionRefs.current.optimizer = el; }} style={{ padding:"52px 0", borderBottom:`1px solid rgba(10,132,255,0.08)`, scrollMarginTop:80, background:"rgba(248,247,255,0.5)" }}>
              <div style={{ maxWidth:820, margin:"0 auto", padding:"0 56px" }}>
                <div ref={registerReveal} className="aisk-reveal">
                  <SectionHead num="04 — Token Optimizer" title="AI Workflow" accent="Cost Engine" lede="Audits skills, prompts, and Claude Code workflows for token efficiency — applying a 4-question triage gate and 5 optimization levers. Reports realized vs theoretical savings with honest trade-off disclosure." />
                </div>

                <div ref={registerReveal} className="aisk-reveal d1"><TokenDiagram /></div>

                <h3 ref={registerReveal} className="aisk-reveal d1" style={{ fontFamily:"var(--font-heading)", fontSize:18, fontWeight:600, color:T1, margin:"20px 0 10px" }}>Key capabilities</h3>
                <div ref={registerReveal} className="aisk-reveal d2" style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.12)`, borderRadius:14, padding:"4px 20px 4px", boxShadow:"0 2px 12px rgba(10,132,255,0.05)" }}>
                  {[
                    "Triage gate: 4-question gate (size, frequency, architecture, cache reuse) before any optimization work begins",
                    "Progressive disclosure: pushes reference content out of always-loaded layer into on-demand files — biggest single lever",
                    "Cache-friendly structure: stable-before-volatile ordering; validates reuse window and block size before recommending cache restructuring",
                    "Scripts over instructions: deterministic work routed to scripts/ = zero context cost until called",
                    "Model right-sizing: Opus 4.7 / Sonnet 4.6 / Haiku 4.5 decision matrix with per-task breakeven cost math",
                    "BEFORE/AFTER token delta report with realized vs theoretical savings clearly separated — no inflated numbers",
                  ].map((c,i) => <Cap key={i} n={i+1} text={c} color="#FF9F0A" />)}
                </div>

                <div ref={registerReveal} className="aisk-reveal d3 aisk-takeaway">
                  <strong>Output: </strong>Optimization report + rewritten skill/prompt with preserved judgment context — average 60–90% token reduction on bloated SKILL.md files.
                </div>
              </div>
            </section>

            {/* ══ § 05 — TECH STACK ════════════════════════════════ */}
            <section id="stack" ref={el => { sectionRefs.current.stack = el; }} style={{ padding:"52px 0", scrollMarginTop:80 }}>
              <div style={{ maxWidth:820, margin:"0 auto", padding:"0 56px" }}>
                <div ref={registerReveal} className="aisk-reveal">
                  <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontFamily:"monospace", fontSize:11, letterSpacing:"0.22em", textTransform:"uppercase", color:P, marginBottom:14 }}>
                    <span style={{ width:28, height:1, background:P, display:"inline-block" }} />
                    05
                  </div>
                  <h2 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(30px,4vw,48px)", fontWeight:700, lineHeight:1.05, letterSpacing:"-0.03em", color:T1, marginBottom:14 }}>
                    Tech Stack
                  </h2>
                </div>

                <div ref={registerReveal} className="aisk-reveal d1" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:12, marginTop:16 }}>
                  {[
                    { name:"Claude Code",     cat:"Runtime",    color:P  },
                    { name:"Anthropic SDK",   cat:"LLM API",    color:P  },
                    { name:"Glean Platform",  cat:"Agent Host", color:BL },
                    { name:"Python 3",        cat:"Scripting",  color:BL },
                    { name:"SOQL",            cat:"Data Query", color:GR },
                    { name:"SVG + CSS Anim",  cat:"Diagrams",   color:GR },
                    { name:"Framer Motion",   cat:"UI",         color:"#FF9F0A" },
                    { name:"Prompt Caching",  cat:"Efficiency", color:"#FF9F0A" },
                    { name:"Markdown / HTML", cat:"Output",     color:P  },
                    { name:"Next.js",         cat:"Portfolio",  color:T2 },
                  ].map(t => (
                    <div key={t.name} style={{ background:"#fff", border:`1px solid rgba(10,132,255,0.12)`, borderRadius:12, padding:"14px 16px", boxShadow:"0 2px 8px rgba(10,132,255,0.04)", transition:"all 0.25s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px rgba(10,132,255,0.12)`; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(10,132,255,0.04)"; }}>
                      <div style={{ fontFamily:"var(--font-heading)", fontSize:13.5, fontWeight:600, color:T1, marginBottom:4 }}>{t.name}</div>
                      <div style={{ fontFamily:"monospace", fontSize:10, color:t.color, letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500 }}>{t.cat}</div>
                    </div>
                  ))}
                </div>

                {/* closing CTA */}
                <div ref={registerReveal} className="aisk-reveal d2" style={{ marginTop:48, textAlign:"center", padding:"60px 24px", background:`linear-gradient(135deg,rgba(10,132,255,0.07),rgba(191,90,242,0.05))`, border:`1px solid rgba(10,132,255,0.18)`, borderRadius:20 }}>
                  <h3 style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(26px,3.5vw,42px)", fontWeight:700, color:T1, letterSpacing:"-0.025em", lineHeight:1.1, marginBottom:14 }}>
                    Built by a PM.<br/>
                    <span style={{ background:`linear-gradient(135deg,${P},${PA})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Runs like engineering.</span>
                  </h3>
                  <p style={{ color:T2, fontSize:16, maxWidth:520, margin:"0 auto 28px", lineHeight:1.6 }}>
                    These skills encode domain logic that used to live only in people's heads — now they run on demand, in seconds, with the same output every time.
                  </p>
                  <a href="/#contact" style={{ display:"inline-block", padding:"12px 28px", background:`linear-gradient(135deg,${P},${P2})`, color:"#fff", borderRadius:100, fontFamily:"monospace", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", textDecoration:"none", boxShadow:`0 4px 20px rgba(10,132,255,0.35)` }}>
                    Talk to me ↗
                  </a>
                </div>

                {/* footer */}
                <div style={{ marginTop:40, paddingTop:20, borderTop:`1px solid rgba(10,132,255,0.1)`, display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:"monospace", fontSize:11, color:T3, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                  <span>rohit.singh · AI Skills</span>
                  <a href="/" style={{ color:P, textDecoration:"none" }}>← Back to portfolio</a>
                </div>
              </div>
            </section>

          </main>
        </div>

        {/* scroll-to-top */}
        <button
          onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          style={{ position:"fixed", bottom:32, right:32, width:44, height:44, background:P, color:"#fff", border:"none", borderRadius:"50%", cursor:"pointer", fontSize:18, boxShadow:`0 8px 24px rgba(10,132,255,0.35)`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, opacity: progress > 10 ? 1 : 0, transform: progress > 10 ? "translateY(0)" : "translateY(20px)", transition:"all 0.3s", zIndex:40 }}
        >↑</button>
      </div>
    </>
  );
}
