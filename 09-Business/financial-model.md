# Financial Model

**Department:** Business
**Owner:** Luis Figuera
**Last updated:** April 22, 2026
**Status:** Planning v0.1

---

## 1. Summary

Culture Wiki is bootstrapped. No outside capital, no debt financing for operations. The project is designed to be capital-efficient in Year 1 and self-sustaining by end of Year 2.

This document models the costs, revenue targets, and runway implied by the roadmap.

**Headline numbers (12-month horizon):**

- Annual operating cost (Year 1, lean): ≈ $2,100
- Annual operating cost (Year 1, full): ≈ $4,800
- Revenue target end of Year 1: $1,000 MRR ≈ $12,000 ARR
- Break-even point: Q4 2026 — Q1 2027

## 2. Operating costs — Year 1

Monthly costs, broken down by category, in USD.

### 2.1 Infrastructure (software & hosting)

| Line item | Monthly | Annual | Notes |
|---|---|---|---|
| Vercel Pro (hosting, edge functions) | $20 | $240 | Pro tier needed for team seats and analytics |
| Supabase Pro (database, auth, storage) | $25 | $300 | Upgrade from free tier once active development starts |
| Cloudflare (DNS, CDN, R2 storage for media) | $5 | $60 | Mostly free tier, some R2 storage costs |
| Upstash (Redis for caching, rate limiting) | $10 | $120 | Pay-as-you-go, minimal usage |
| Domain registration | $1.50 | $18 | Single `.com` domain |
| Email (Resend or similar transactional) | $20 | $240 | 50k emails/mo |
| Newsletter (Beehiiv or Ghost) | $39 | $468 | Ghost Starter or Beehiiv Launch |
| Monitoring (Sentry, BetterUptime) | $26 | $312 | Error tracking + uptime |
| Backups | $5 | $60 | Offsite DB backups |
| **Subtotal infrastructure** | **$151.50** | **$1,818** | |

### 2.2 Data & API costs

| Line item | Monthly | Annual | Notes |
|---|---|---|---|
| Claude API (enrichment, summaries, draft generation) | $40 | $480 | Budgeted at scale, lower initially |
| Spotify API | $0 | $0 | Free |
| MusicBrainz API | $0 | $0 | Free |
| YouTube Data API | $0 | $0 | Free within quota |
| Genius API | $0 | $0 | Free |
| Firecrawl / web scraping services | $20 | $240 | Starter tier for press monitoring |
| OpenAI / other LLM (backup / evals) | $15 | $180 | Secondary for specific tasks |
| **Subtotal data** | **$75** | **$900** | |

### 2.3 Tooling

| Line item | Monthly | Annual | Notes |
|---|---|---|---|
| n8n Cloud (self-hosted possible, but simpler) | $20 | $240 | Starter tier for MVP |
| Figma (design) | $15 | $180 | Professional, 1 seat |
| GitHub (private repos) | $4 | $48 | Free for 1 dev, Pro for more features |
| 1Password (secrets management) | $3 | $36 | 1 seat |
| Notion or similar (internal docs) | $10 | $120 | Could use GitHub wiki instead |
| **Subtotal tooling** | **$52** | **$624** | |

### 2.4 Editorial (starts Month 4+)

| Line item | Monthly | Annual | Notes |
|---|---|---|---|
| Freelance editorial contributors | $300 | $3,600 | ≈ 2-3 pieces/month at $100-150 each |
| Copyediting / fact-check | $50 | $600 | Spot-check on longer pieces |
| Photography / media licensing | $25 | $300 | Occasional licensed images |
| **Subtotal editorial** | **$375** | **$4,500** | Only starts Month 4+ |

### 2.5 Legal & compliance (one-time & recurring)

| Line item | Annual | Notes |
|---|---|---|
| Attorney review of Terms + Privacy Policy | $1,500 | One-time, Year 1 |
| LLC annual fee (NJ or DE) | $75-300 | Depending on state |
| Trademark search + filing (project name) | $500 | One-time |
| Liability / E&O insurance (optional Year 1) | $800 | Recommended once editorial active |
| **Subtotal legal (Year 1)** | **$2,975** | Mostly one-time |

### 2.6 Marketing (minimal Year 1)

| Line item | Monthly | Annual | Notes |
|---|---|---|---|
| Paid acquisition (Google, Meta) | $0 | $0 | **Not doing paid in Year 1.** SEO + community only. |
| Newsletter platform | (included above) | — | |
| SEO tools (Ahrefs, SEMrush — already owned) | $0 | $0 | Luis has these via Vulqo LLC |
| Social scheduling (Metricool — already owned) | $0 | $0 | Luis has this |
| **Subtotal marketing** | **$0** | **$0** | |

### 2.7 Founder compensation

**Year 1: $0.** Luis does not draw salary from Culture Wiki in Year 1. Time is the investment. This is a bootstrap reality, not a statement about sustainability — Year 2+ must include compensation to be a real business.

### 2.8 Total Year 1 operating cost

| Scenario | Monthly (avg) | Annual |
|---|---|---|
| **Lean** (first 3 months, no editorial, minimal APIs) | $175 | $2,100 |
| **Normalized** (months 4-12 with editorial active) | $500 | $4,800 (plus one-time legal) |
| **Year 1 total** (realistic) | — | **≈ $6,500-8,000 all-in** |

This is the capital required to run Culture Wiki for 12 months with no revenue. Fundable out of pocket, not a blocker.

---

## 3. Revenue projections — Year 1

Conservative, moderate, and stretch scenarios.

### 3.1 Memberships

| Month | Conservative | Moderate | Stretch |
|---|---|---|---|
| End Q3 2026 (M6) | 0 | 10 | 25 |
| End Q4 2026 (M9) | 25 | 75 | 150 |
| End Q1 2027 (M12) | 50 | 150 | 300 |

Assumed mix: 70% at $5/mo, 25% at $15/mo, 5% at institution $40/mo equivalent.

**Moderate case end-of-Year-1:** 150 members × weighted avg ≈ $7.50 = **$1,125 MRR** = **$13.5k ARR**.

### 3.2 Sponsorships

Conservative: 0-1 sponsor active by end Y1. Moderate: 2 sponsors at $750/mo each = $1,500/mo.
Stretch: 3 sponsors + 2 newsletter slots = $2,500/mo.

### 3.3 Total revenue Year 1

| Scenario | End Y1 MRR | Y1 total revenue |
|---|---|---|
| Conservative | $300 | $1,200 |
| Moderate | $2,500 | $10,000 |
| Stretch | $5,000 | $22,000 |

The moderate case meets the Q1 2027 OKR of $1,000 MRR with margin to spare. The conservative case falls short and would require re-evaluation.

---

## 4. Year 2 projections (directional)

**Year 2 is when the business becomes real.** Key assumptions:

- 500-1,000 paid members
- 3-5 active sponsors
- First data licensing conversations
- First editorial hire (part-time contributor, paid monthly)
- Founder takes $2,000-3,000/month draw

**Year 2 revenue target:** $60,000-120,000 total.
**Year 2 cost:** $40,000-60,000 (incl. editorial hire + founder draw).
**Year 2 net:** $0 to $60,000 (breakeven to modestly profitable).

---

## 5. Key financial assumptions & risks

### Assumptions
- Luis invests ~20 hrs/week of his time in Year 1 (treated as founder equity, not cost).
- Infrastructure scales sub-linearly — doubling traffic doesn't double costs due to caching.
- First editorial contributors come from network, not cold outreach, keeping rates manageable.
- SEO traffic compounds through Year 1, hitting inflection point around Month 9-10.

### Risks
- **Claude API costs spike** with scale. Mitigated by hybrid routing (Gemini Flash / Groq for low-stakes, Claude for editorial). See [`02-Engineering/api-strategy.md`](../02-Engineering/api-strategy.md).
- **SEO takes longer than expected** — common in new publications. Mitigation: don't plan Y1 revenue around SEO traffic alone; direct/community/social compensate early.
- **Editorial quality / pace slips** without in-house editor, affecting membership conversion. Mitigation: keep editorial output realistic; don't promise weekly if monthly is sustainable.
- **Legal costs higher than projected** if dispute arises. Buffer: reserve $2,000 for unexpected legal in Year 1.

---

## 6. Capital plan

- **Initial investment:** ~$5,000 from Vulqo LLC operating cash, covering months 1-6.
- **Months 6-12:** Self-funded from remaining buffer + early membership revenue.
- **No outside capital raised in Year 1.** Culture Wiki is a wholly-owned product of Vulqo LLC.
- **Optionality preserved:** If the project proves out in Year 2, strategic options (spin-off, fundraise, acquihire, data-license partnership) are open.

---

## 7. Financial controls

- Separate bank account / sub-account for Culture Wiki within Vulqo LLC accounting.
- Monthly P&L review every 1st of the month.
- Quarterly deep review tied to OKR cycle (see [`00-Executive/okrs.md`](../00-Executive/okrs.md)).
- Annual CPA review (already engaged for Vulqo LLC).
- All revenue tracked in a single source of truth (Stripe dashboard → spreadsheet snapshot monthly).

---

*See also: [`monetization.md`](./monetization.md), [`partnerships.md`](./partnerships.md), [`00-Executive/okrs.md`](../00-Executive/okrs.md), [`00-Executive/strategy.md`](../00-Executive/strategy.md)*
