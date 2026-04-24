#!/usr/bin/env bash
# Commits semánticos de Sprints 2 (finish) + 3 + 4 + docs.
# Generado por Cowork 2026-04-24.
# Ejecutar: bash _Execution/commit-sprints-3-4.sh

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

echo "== Current branch: $(git rev-parse --abbrev-ref HEAD) =="
echo "== Unstaged files: $(git status --short | wc -l | tr -d ' ') =="
echo ""
read -p "Press ENTER to start (Ctrl+C to abort)..." _

# ─────────────────────────────────────────────────────────────────────
# Commit 1 — db migrations (Sprints 3+4)
# ─────────────────────────────────────────────────────────────────────
echo ""
echo "== Commit 1/4: db migrations =="
git add 02-Engineering/website/supabase/migrations/20260423010000_schema_fixes.sql
git add 02-Engineering/website/supabase/migrations/20260423020000_seed_pillars.sql
git add 02-Engineering/website/supabase/migrations/20260424000000_ingestion_infra.sql
git add 02-Engineering/website/supabase/migrations/20260424010000_rate_limit_rpc.sql
git add 02-Engineering/website/supabase/migrations/20260424020000_fuzzy_match_rpc.sql
git commit -m "feat(db): sprints 3-4 migrations — ingestion infra, schema fixes, seed pillars, rate-limit + fuzzy-match RPCs"

# ─────────────────────────────────────────────────────────────────────
# Commit 2 — frontend: App Router real + legacy purge
# (finish of Sprint 2 — part was already in f4bb2d7)
# ─────────────────────────────────────────────────────────────────────
echo ""
echo "== Commit 2/4: App Router real + legacy purge =="
git add 02-Engineering/website/src/app/layout.tsx
git add 02-Engineering/website/src/app/globals.css
git add 02-Engineering/website/src/app/page.tsx
git rm 02-Engineering/website/src/app/page.module.css 2>/dev/null || true
git add 02-Engineering/website/src/app/articles/
git add 02-Engineering/website/src/app/artists/
git add 02-Engineering/website/src/app/cities/
git add 02-Engineering/website/src/app/events/
git add 02-Engineering/website/src/app/join/
git add 02-Engineering/website/src/app/search/
git add 02-Engineering/website/src/components/ArtistPage.tsx
git add 02-Engineering/website/src/components/CommandPalette.tsx
git add 02-Engineering/website/src/components/HomePage.tsx
git add 02-Engineering/website/src/components/Nav.tsx
git add 02-Engineering/website/src/components/NavWrapper.tsx
git add 02-Engineering/website/src/components/OnboardingPageWrapper.tsx
git rm 02-Engineering/website/src/components/ShopPage.tsx 2>/dev/null || true
git rm 02-Engineering/website/src/components/ProductPage.tsx 2>/dev/null || true
git rm 02-Engineering/website/src/components/SellerDashboard.tsx 2>/dev/null || true
git commit -m "feat(website): App Router real with dynamic routes + purge legacy store components

- Migrate SPA view-switcher to Next.js App Router with /artists/[slug], /cities/[slug], /events/[slug], /articles/[slug], /search, /join routes
- Add NavWrapper and OnboardingPageWrapper for client/server split
- Remove ShopPage, ProductPage, SellerDashboard (not MVP per 01-Product/mvp-scope.md)
- Update Nav.tsx: remove TIENDA tab, change HAZTE MIEMBRO → ENTRAR
- Update HomePage.tsx: remove DROPS merch section and directory tile"

# ─────────────────────────────────────────────────────────────────────
# Commit 3 — ingestion infra (Sprints 3+4)
# ─────────────────────────────────────────────────────────────────────
echo ""
echo "== Commit 3/4: ingestion infrastructure =="
git add 02-Engineering/website/package.json
git add 02-Engineering/website/package-lock.json
git add 02-Engineering/website/src/lib/ingest/
git add 02-Engineering/website/src/lib/skills/
git add 02-Engineering/website/scripts/
git add .github/
git commit -m "feat(ingest): Spotify worker + dispatcher + Stage 1 bootstrap + skills stubs

- SpotifyClient with Client Credentials auth, token cache, retry, timeout via AbortController
- 5 worker operations: fetch_playlist_artists, search_artists_by_query, resolve_artist_by_name, fetch_artist_details, fetch_related_artists
- Queue dispatcher with rate-limit budget + circuit breaker
- Pipeline runStage1Bootstrap + CLI scripts/ingest/bootstrap-seed.ts
- CLI scripts/admin/approve-artist.ts for manual review approval
- Skill stubs (8) with Zod input/output + LLMCaller interface (Claude Max manual workflow by default, no Anthropic SDK yet)
- GitHub Actions workflow .github/workflows/ingest-dispatch.yml (schedule commented)

Known: entity_stats empty for Spotify followers/popularity — API restricted on Client Credentials. Documented in 05-Data/api-docs/spotify.md."

# ─────────────────────────────────────────────────────────────────────
# Commit 4 — docs + memory + .gitignore
# ─────────────────────────────────────────────────────────────────────
echo ""
echo "== Commit 4/4: docs + memory + .gitignore =="
git add .gitignore
git add CLAUDE.md
git add MEMORY.md
git add 05-Data/api-docs/
git add 05-Data/seed/
git add 05-Data/source-catalog.md
git add 07-Marketing-Growth/social-automation-plan.md
git add _Execution/
git add _Reference/
git commit -m "docs: api-docs, ingestion playbook, credentials checklist, memory, social plan

- 05-Data/api-docs/ — 9 API docs (Spotify, MusicBrainz, YouTube, Genius, Brave, Firecrawl, Wikipedia/Wikidata, Whisper, Supabase) with endpoints, rate limits, auth, caveats
- 05-Data/seed/spotify-playlists.json — k12jamz playlists with MVP priority
- 05-Data/source-catalog.md — add Seedcademy.io as future research source
- 07-Marketing-Growth/social-automation-plan.md — phased social presence + playlist automation plan
- _Execution/ — Cowork handoff prompt, credentials checklist, ingestion playbook, ingestion deployment, all Claude Code sprint prompts (1, 2, 3, 4, 5, design-sync-v3)
- _Reference/ — archived notes (company structure post-MVP)
- CLAUDE.md, MEMORY.md — Cowork memory + behavior rules
- .gitignore — add .claude/ and _Reference/design-system-v3/"

# ─────────────────────────────────────────────────────────────────────
# Push
# ─────────────────────────────────────────────────────────────────────
echo ""
echo "== All 4 commits done. Pushing to origin/main... =="
git push origin main

echo ""
echo "✓ Done. View on GitHub:"
echo "  https://github.com/vulqo/dauton.media/commits/main"
