## 1. Goals & Audience

**Primary audience:** Recruiters and hiring managers (director/VP level), prospective clients at data-driven companies, conference organizers, and senior data/engineering peers.

**3 success metrics:**
- A recruiter spends ≥ 90 seconds on the site (scroll depth + time-on-page)
- ≥ 15% of visitors click to the Contact section or copy email
- At least 1 inbound opportunity (job, contract, or speaking) within 60 days of launch

**10-second conviction:** "This person ships data platforms at scale and knows how to lead the people, the AI tooling, and the business case — not just the pipeline."

---

## 2. Information Architecture

| # | Section | Nav label | One-line purpose |
|---|---------|-----------|-----------------|
| 1 | Hero | — | Immediate identity + headline value proposition |
| 2 | About | About | Brief professional story and what drives Rohit |
| 3 | Domain Knowledge | Expertise | Data platform domains: Redshift, Databricks, Snowflake, ELT |
| 4 | Technical Skills | Skills | Visual skill inventory with proficiency context |
| 5 | Experience | Experience | Timeline of roles with impact metrics |
| 6 | Projects | Projects | 3–5 case studies with diagrams |
| 7 | Data Flow Diagrams | Diagrams | Standalone gallery of migration/pipeline architectures |
| 8 | AI / PMO Skills | AI & PMO | Showcase of prompt engineering, AI skill builds, PMO frameworks |
| 9 | Writing / Insights | Writing | Optional: short posts or LinkedIn reposts |
| 10 | Contact | Contact | Single CTA with email + LinkedIn |

**Navigation order (sticky header):** About → Expertise → Skills → Experience → Projects → Diagrams → AI & PMO → Contact

---

## 3. Content Inventory

| Section | What is needed | Source |
|---------|---------------|--------|
| Hero | Headline (role + specialty), 1-line tagline, CTA button, optional photo | **Rohit to supply** photo; tagline can be drafted |
| About | 3–4 sentence bio, 2–3 values or principles | **Rohit to write**; structure can be templated |
| Domain Knowledge | 4–6 domain cards (Databricks, Snowflake, Redshift, ELT, Cloud Infra, AI/ML Ops) with 2-line descriptions | Draftable from project context |
| Technical Skills | Skill list grouped by category (tools, cloud, languages, frameworks) | **Rohit to validate** list |
| Experience | 3–5 roles: company, title, dates, 3 bullet outcomes with metrics | **Rohit to supply** metrics; structure draftable |
| Projects | **3 case studies minimum:** (1) Coursera Redshift→Databricks (~2,300 tables/views), (2) IR China Snowflake implementation, (3) EOM Billing AI Skill — each needs: problem, approach, outcome, architecture diagram | Narrative draftable; **Rohit to confirm metrics and diagrams** |
| Data Flow Diagrams | 3–6 architecture/pipeline diagrams (migration flow, ELT DAGs, AI skill architecture) | **Rohit to supply source diagrams** or whiteboard sketches to redraw |
| AI / PMO Skills | PMO AI skill descriptions, prompt engineering methodology, tools used (e.g., Copilot, custom LLM skills) | Partially draftable; **Rohit to validate** |
| Writing / Insights | 2–4 short articles or LinkedIn post reposts (optional for v1) | **Rohit to decide if included in v1** |
| Contact | Email address, LinkedIn URL, optional "open to" status badge | **Rohit to supply** |

---

## 4. Design System

**Primary direction: Dark-mode-first, data-terminal aesthetic**
- Rationale: Dominant premium aesthetic for senior technical portfolios in 2026; signals comfort with engineering tooling; sets Rohit apart from generic PM portfolios.
- **Palette:** Background `#0D0F14`, surface `#161A23`, border `#252A36`, text `#E8EAF0`, muted `#7A8099`, **accent `#3B82F6`** (electric blue), accent-hover `#60A5FA`
- **Typography:** `Inter` (body, UI) + `Cal Sans` or `DM Sans` (headings) — both free on Google Fonts
- **Spacing scale:** 4px base, scale ×1.5 (4, 6, 8, 12, 16, 24, 36, 48, 72px)
- **Visual tone:** Precise and confident; data-grid-inspired subtle textures, no gradients except on accent CTAs.

**Alternative direction: Light-mode, editorial minimal**
- Palette: `#F8F9FA` background, `#111827` text, `#2563EB` accent — cleaner for print/PDF resumes but less distinctive.

---

## 5. Animation & Interaction

| Section | Animation | Trigger |
|---------|-----------|---------|
| Hero | Headline word-by-word fade-up, tagline slide-in delay | Page load |
| About | Paragraph reveal on scroll | Intersection Observer |
| Skills | Bar/dot fill animation for each skill category | Scroll into view |
| Projects | Card lift + border-glow on hover; diagram zoom on click | Hover / click |
| Diagrams | Animated draw-on for SVG paths (pipeline flows) | Scroll into view |
| Contact | CTA button pulse on hover | Hover |

**Library recommendation: Framer Motion**
- Rationale: Tightest React integration, declarative API requires minimal JS expertise, excellent `whileInView` support for scroll-linked reveals. Satisfies "premium but not gimmicky" at default easing settings.
- **Alternative: CSS-only transitions** — zero dependency, sufficient for hover states and simple fades, but SVG draw-on and word-by-word reveals require custom keyframes (more brittle).

---

## 6. Tech Stack Recommendation

**Primary: Next.js (App Router) + Tailwind CSS + Framer Motion + MDX + static SVG diagrams**

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 14** | Free on Vercel, SSG for fast loads, excellent portfolio ecosystem |
| Styling | **Tailwind CSS** | Utility-first, no runtime CSS, fast iteration |
| Component lib | **shadcn/ui** (select components only) | Copy-paste, no dependency lock-in |
| Animation | **Framer Motion** | See §5 |
| Content layer | **MDX files** (co-located with components) | No CMS needed; Rohit edits markdown files; version-controlled |
| Diagrams | **Static SVG** (exported from Figma/Excalidraw) | Zero runtime dependency; fully styleable; no API calls |
| Analytics | **Vercel Analytics** (free tier: 2,500 events/month) | Zero config on Vercel |
| Forms | **Formspree free tier** (50 submissions/month) | No server needed; AJAX submit |

**Alternative: Astro + Tailwind + Alpine.js**
- Lower JS bundle, easier for a non-developer to maintain long-term, but weaker animation story and smaller ecosystem for data-viz components.

---

## 7. Database Decision

**No database needed.**

All content — case studies, skills, experience, diagrams — is static and changes infrequently (quarterly at most). MDX/JSON files committed to the repo serve as the content layer. The "dynamic-feeling" project cards, skill bars, and timeline are hydrated from local data files at build time, producing a fully static site. No user-generated content, no auth, no search requiring indexing. If a blog is added in v2, MDX files remain sufficient up to ~200 posts. A database would add operational overhead with zero user-facing benefit at this scale.

---

## 8. Hosting, Domain & Cost

**Vercel free (Hobby) tier covers the entire plan.**

| Service | Free tier limit | Failure mode if exceeded |
|---------|----------------|--------------------------|
| Vercel hosting | 100GB bandwidth/month | Build/deploy paused — negligible risk for personal portfolio |
| Vercel Analytics | 2,500 events/month | Analytics silently stops recording — site still works |
| Google Fonts | Unlimited | None |
| Formspree | 50 form submissions/month | Form returns error — upgrade to Formspree free+spam ($0) or swap to mailto link |
| Excalidraw / Figma export | Unlimited static SVG export | None (export is one-time) |

**Expected monthly cost: $0.** Optional custom domain (e.g., `rohitkumarsingh.com`): ~$12/year via Namecheap or Google Domains — not required for launch.

---

## 9. Build Phases

| Phase | Scope | Est. hours | Exit criteria |
|-------|-------|-----------|---------------|
| **1 — Scaffolding & Design Tokens** | Repo init, Tailwind config with color/type/spacing tokens, dark theme, layout shell, sticky nav | 4–6 hrs | Site loads at localhost with correct palette, fonts, and responsive nav |
| **2 — Static Sections** | Hero, About, Domain Knowledge, Technical Skills, Experience, Contact | 8–10 hrs | All above sections render correctly with placeholder content; mobile-responsive |
| **3 — Project Case Studies** | 3 project pages in MDX, project index grid, case study template | 6–8 hrs | Three case studies live with real content; diagrams are placeholder SVGs |
| **4 — Diagrams & AI/PMO Showcase** | Final SVGs integrated, animated draw-on, AI/PMO section, Writing section (if in scope) | 6–8 hrs | Diagrams animate on scroll; AI/PMO section complete with real content |
| **5 — Animations & Polish** | Framer Motion reveals on all sections, hover states, performance audit (Lighthouse ≥ 90), OG image, favicon | 4–6 hrs | Lighthouse score ≥ 90 on Performance + Accessibility; animations feel smooth |
| **6 — Deploy & Launch** | Vercel deploy, analytics wired, form tested, custom domain (if purchased), cross-browser QA | 2–3 hrs | Live URL resolves, form submits successfully, analytics firing |

---

## 10. Open Decisions for Rohit

1. **Theme direction:** Dark-mode-first (primary recommendation) vs. light editorial — or both with a toggle?
2. **Photo on Hero:** Include a professional headshot on the hero section (yes/no)?
3. **Blog / Writing in v1:** Include the Writing/Insights section at launch, or defer to v2?
4. **Custom domain:** Purchase a domain (e.g., `rohitkumarsingh.com`) before launch, or launch on `*.vercel.app` first?
5. **Diagrams source:** Will you provide existing architecture diagrams to redraw as SVGs, or create new ones during the build?
6. **"Open to opportunities" status:** Should the site signal active job searching, open to consulting, or neither?
7. **Case study depth:** Should each project page be a full long-form case study (~500 words + diagram), or a compact card-style summary (~150 words)?
