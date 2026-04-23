# Admin Operations

**Department:** Operations
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Scope

Admin Operations covers the day-to-day work of running Culture Wiki: who does what, what tools they use, what the weekly cadence looks like, how decisions get logged, and how the operation scales.

This document is written for Luis as the current sole operator, with an eye toward handoff as the team grows.

---

## Roles

### Editor-in-Chief (currently Luis)
- Owns editorial direction, publishing calendar, style adherence.
- Final review on any public-facing writing.
- Point of contact for artist outreach and press inquiries.

### Data Lead (currently Luis)
- Owns ingestion pipeline reliability.
- Monitors data QA dashboards.
- Approves new sources, new taxonomies, new entity types.

### Engineering Lead (currently Luis)
- Owns platform infrastructure, deployments, monitoring.
- Reviews/approves schema changes.
- Responsible for incident response.

### Moderator (currently Luis; first hire candidate)
- Processes correction queue.
- Reviews ingestion results flagged for human review.
- Handles user support emails.

### Contributors (future)
- Writers (per-piece) — produce editorial content.
- Researchers (hourly or per-project) — fill gaps in pillar artist profiles, conduct interviews.
- Translators (Phase 3) — for English edition.

As team grows, document each hire's scope explicitly. No ambiguity about who owns what.

---

## Weekly operational rhythm

### Monday — Planning (1-2h)
- Review previous week's metrics: traffic, corrections processed, new entries, revenue (once applicable).
- Publish weekly plan in a running Notion doc: editorial calendar, data sprints, engineering focus.
- Check upcoming releases from tracked artists — note any that should trigger editorial coverage.

### Tuesday-Thursday — Execution
- Ingestion batches run in background.
- Editor does writing / editing.
- Data lead reviews queues (ingestion, corrections, dedup).
- Engineering lead ships bug fixes, features per roadmap.

### Friday — Review + publish (2-3h)
- Friday is the default publish day for editorial (aligns with weekend reading).
- Newsletter sends Friday afternoon.
- QA sweep: sample audit, fix issues.
- Review metrics, note anomalies.

### Sunday — Offline
- No admin activity. Protects sustainability.

---

## Monthly cadence

### First week of each month
- Close previous month financials (`09-Business/financial-model.md` actuals).
- Review OKRs progress.
- Plan upcoming month's editorial calendar in detail.
- External: outreach batch (3-5 artist/outlet contacts).

### Mid-month
- Mid-month metrics check.
- Pivot if needed.

### Last week
- Write monthly retrospective (internal doc).
- Close outstanding items.
- Back up critical data (full DB export to B2).

---

## Tools used

### Work coordination
- **ClickUp** — Luis's main workspace. Culture Wiki project lives here with folders for each department matching this docs structure.
- **Notion** — longer-form planning docs, weekly plans, retros.
- **GitHub** — code, issues, PRs. Linked from ClickUp tasks.

### Communication (future — when team grows)
- **Slack** — internal team chat.
- **Discord** — community (separate server).
- **Email (hello@...)** — external inquiries.

### Data work
- Admin dashboard (in-app) — primary tool for entity editing, ingestion control.
- Supabase Studio — for ad-hoc DB queries.
- n8n — pipeline orchestration.

### Monitoring
- Vercel dashboard.
- Supabase dashboard.
- Plausible analytics.
- Sentry (errors).
- Custom admin stats page.

---

## Decision logging

Decisions that affect scope, direction, or policy must be logged. Not every preference — only decisions.

### Logged in ClickUp or a running `decisions.md` file:
- What was decided.
- Date.
- Who decided.
- What alternatives were considered.
- What would trigger reconsideration.

Example entries:
- 2026-04-22: Decided to defer editorial launch to Phase 2. Alternatives: parallel launch. Rationale: too much for MVP timeline. Reconsider if editorial becomes urgent for audience building.

---

## Knowledge management

This documentation tree is the canonical source. Anyone joining the project reads:

1. `/README.md`
2. `/00-Executive/vision.md`
3. `/01-Product/prd.md`
4. Department-specific docs for their role.

When something changes, the doc updates. When something stays the same but the reason is no longer remembered, we add commentary. Docs are living.

---

## Artist and outlet relationships

### Artist outreach
- Tracked in a simple CRM (Notion database or Airtable):
  - Artist name, last contact date, status (cold / warm / active relationship / declined), notes.
- Outreach is never promotional / transactional — always from a place of "we document your work seriously, we'd love to verify / add context."
- No commercial entanglement. We never charge for profile inclusion or improvement.

### Outlet / press relationships
- Tracked similarly. Contact, last pitch, response.
- We actively want to be cited by press — every cited piece is a backlink and credibility signal.
- Offer: story tips, exclusive data access, quotes. Always free.

### Industry relationships
- Managers, labels, promoters.
- Posture: neutral, professional. Cooperate on factual matters. Decline all influence attempts.

---

## Incident response

### Categories

- **P0:** Site down, data loss, security breach.
- **P1:** Core feature broken (search, auth, publishing).
- **P2:** Bug affecting multiple users.
- **P3:** Bug affecting one user or cosmetic issue.
- **Q0:** Major data accuracy issue (wrong fact in public view, defamation risk).

### Response

- P0: Drop everything, fix in ≤2 hours. Status page if impact ≥30 min.
- P1: Same-day fix.
- P2: Within the week.
- P3: Next sprint.
- Q0: Within 24 hours. Public correction noted.

### Postmortem

Any P0 or Q0 gets a written postmortem: what happened, timeline, root cause, fix, prevention. Stored in `/incidents/`.

---

## Security operations

### Secrets
- All API keys in Vercel env vars (production) and `.env.local` (dev, gitignored).
- Never commit secrets to Git.
- Rotate quarterly or immediately on any suspected leak.
- 1Password (Luis's personal vault) as backup storage.

### Access control
- Admin role granted explicitly via database update.
- MFA required for admin accounts.
- Admin accounts reviewed quarterly — remove dormant.
- All admin actions logged to `edit_history`.

### Backups
- Supabase automatic daily backups (Pro tier — when on Pro).
- Manual weekly export of core tables to Backblaze B2.
- Monthly test restore to verify backups actually work.

### Incident procedure (security)
- Suspected breach: rotate all secrets immediately.
- Investigate logs.
- If user data affected, notify per legal obligations.
- Document in `/incidents/security/`.

---

## Financial operations

### Invoices / expenses
- Vulqo LLC handles invoicing and expense tracking.
- Culture Wiki costs tracked separately in spreadsheet (see `09-Business/financial-model.md`).
- Monthly reconciliation.

### Revenue (once applicable)
- Stripe handles payments.
- Revenue recorded monthly.
- Taxes handled per Vulqo's usual accountant relationship.

---

## Legal operations

### Ongoing legal touchpoints
- Terms and privacy policy reviewed annually.
- Any new country expansion: check legal implications.
- Any new monetization feature: check terms compatibility.
- DMCA / takedown requests: responded to per policy (see `08-Legal-Compliance/`).

### Legal inbox
- legal@... email.
- Initial response within 72 hours.
- Serious matters escalated to counsel.

---

## Growth ops

### Social accounts
- Instagram, Twitter/X, TikTok, YouTube (Phase 2).
- Posting cadence: defined in `07-Marketing-Growth/launch-plan.md`.
- Voice matches editorial style guide.

### Newsletter
- Resend. Weekly cadence initially.
- Template: new entries of the week + editorial piece if any + one cultural note.
- Analytics: open rate, click rate, unsubscribe rate.

### SEO monitoring
- Ahrefs (Luis subscription).
- Monthly review of keyword rankings.
- Identify SEO content opportunities for editorial.

### Community
- Discord server (Phase 2).
- Moderation: light-touch, values-aligned, kick for harassment.

---

## When to scale up operations

Clear signals that we need to hire:

| Signal | Hire |
|---|---|
| Corrections queue > 50 pending for 2+ weeks | Moderator (part-time) |
| Editorial backlog of ideas > 20, published pieces < 1/week | Contributing writer |
| Ingestion issues taking > 5h/week to debug | Part-time engineer |
| Revenue > $3k MRR | Designer (contract, for polish) |
| Revenue > $10k MRR | Full-time data / research lead |

Hiring pace is deliberately slow. Every hire should clearly unblock growth; no hires just because we can afford them.

---

## Documentation hygiene

- All docs in this repo reviewed and updated quarterly.
- Dead docs (obsolete plans) moved to `/archive/` with a note on why.
- New departments / roles added as needed.

---

*See also: [`moderation-workflow.md`](./moderation-workflow.md), [`09-Business/financial-model.md`](../09-Business/financial-model.md)*
