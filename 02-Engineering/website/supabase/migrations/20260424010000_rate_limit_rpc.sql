create or replace function increment_rate_limit_counters(p_source text)
returns void
language sql
security definer
as $$
  update ingestion_rate_limits
  set
    requests_used_current_min = requests_used_current_min + 1,
    requests_used_today       = requests_used_today + 1,
    updated_at                = now()
  where source = p_source;
$$;
