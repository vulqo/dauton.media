-- Requires pg_trgm (already enabled in 0001)
create or replace function fuzzy_match_person(
  p_name      text,
  p_threshold float default 0.5,
  p_limit     int   default 5
)
returns table(id uuid, slug text, stage_name text, similarity float)
language sql
security definer
stable
as $$
  select
    p.id,
    p.slug,
    p.stage_name,
    similarity(
      lower(
        regexp_replace(
          translate(lower(p.stage_name), 'áéíóúàèìòùäëïöüâêîôûñç', 'aeiouaeiouaeiouaeiouaeiounç'),
          '[^a-z0-9 ]', ' ', 'g'
        )
      ),
      p_name
    ) as similarity
  from people p
  where
    p.deleted_at is null
    and similarity(
      lower(
        regexp_replace(
          translate(lower(p.stage_name), 'áéíóúàèìòùäëïöüâêîôûñç', 'aeiouaeiouaeiouaeiouaeiounç'),
          '[^a-z0-9 ]', ' ', 'g'
        )
      ),
      p_name
    ) >= p_threshold
  order by similarity desc
  limit p_limit;
$$;
