# Ingestion Deployment Guide

## GitHub Actions Setup

### Add secrets to GitHub
Go to: https://github.com/vulqo/dauton.media/settings/secrets/actions

Add these secrets (values from .env.local):
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SPOTIFY_CLIENT_ID
- SPOTIFY_CLIENT_SECRET
- YOUTUBE_API_KEY
- GENIUS_CLIENT_ACCESS_TOKEN
- BRAVE_SEARCH_API_KEY
- FIRECRAWL_API_KEY
- MUSICBRAINZ_USER_AGENT

### Activate schedule (when Sprint 4 workers are ready)
In `.github/workflows/ingest-dispatch.yml`, uncomment the `schedule:` block and push.

### Manual trigger via CLI
```bash
gh workflow run ingest-dispatch.yml --repo vulqo/dauton.media
```

### View run logs
```bash
gh run list --workflow=ingest-dispatch.yml --repo vulqo/dauton.media
gh run view <run-id> --log --repo vulqo/dauton.media
```

### Manual trigger via GitHub UI
Go to: https://github.com/vulqo/dauton.media/actions/workflows/ingest-dispatch.yml
Click "Run workflow" -> "Run workflow"

## Local execution
```bash
cd 02-Engineering/website
npx tsx scripts/ingest/dispatch.ts
# with options:
MAX_ITEMS=5 SOURCES=spotify npx tsx scripts/ingest/dispatch.ts
```

## Architecture notes
- Queue items are fetched in priority order (higher = more urgent, 1-10 scale)
- Each source has a rate limit budget in `ingestion_rate_limits` table
- Failed items are retried with exponential backoff (max_attempts default: 5)
- Dead letter items (status='dead_letter') require manual review
- All raw API responses stored in `raw_responses` for replay without re-fetching
