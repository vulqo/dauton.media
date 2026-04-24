-- =============================================================================
-- Dauton Media · Seed Pillar Artists · Sprint 0
-- Applied: 2026-04-23
-- Source: 01-Product/mvp-scope.md — "Pillar artists" section
-- Layer 1 only: slug, stage_name, origin_city_id, is_venezuelan,
--               status, visibility, bio_short.
-- Everything else (releases, tracks, credits, social handles, bios long)
-- populated later via ingestion pipeline.
-- =============================================================================

insert into people
  (slug, stage_name, origin_city_id, is_venezuelan, status, visibility, bio_short)
values
  (
    'canserbero',
    'Canserbero',
    (select id from cities where slug = 'maracay'),
    true,
    'deceased',
    'public',
    'Figura central del rap venezolano. Artista de Maracay cuya obra marcó una generación. Fallecido en 2015.'
  ),
  (
    'apache',
    'Apache',
    (select id from cities where slug = 'maracay'),
    true,
    'active',
    'public',
    'Veterano del rap venezolano, referente de Maracay y uno de los MC más influyentes de la escena de los 2000s.'
  ),
  (
    'akapellah',
    'Akapellah',
    (select id from cities where slug = 'maracay'),
    true,
    'active',
    'public',
    'MC y productor de Maracay. Trayectoria internacional con presencia en el rap latino de los 2010s y 2020s.'
  ),
  (
    'gabylonia',
    'Gabylonia',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'Artista caraqueña con una de las voces más distintivas del rap venezolano contemporáneo.'
  ),
  (
    'mcklopedia',
    'McKlopedia',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'MC y gestor cultural venezolano. Referente del rap consciente y cronista de la escena underground de Caracas.'
  ),
  (
    'lil-supa',
    'Lil Supa',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'MC caraqueño con presencia sostenida en la escena independiente venezolana desde los 2010s.'
  ),
  (
    'nerza',
    'Nerza',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'Una de las MC más representativas del rap femenino venezolano. Voz del underground caraqueño.'
  ),
  (
    'cayro',
    'Cayro',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'MC venezolano con obra que conecta el rap clásico con la narrativa urbana contemporánea.'
  ),
  (
    'oldtape',
    'Oldtape',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'Productor venezolano con catálogo extenso. Referente del boom-bap y lo-fi en la escena local.'
  ),
  (
    'micro-tdh',
    'Micro TDH',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'Artista venezolano que transita entre el rap y el trap latino con proyección internacional.'
  ),
  (
    'lil-goofy',
    'Lil Goofy',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'MC venezolano representativo de la nueva generación del rap independiente nacional.'
  ),
  (
    'rxnde-akozta',
    'Rxnde Akozta',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'MC de origen cubano-venezolano. Caso de referencia del modelo de diáspora en el archivo.'
  ),
  (
    'neutro-shorty',
    'Neutro Shorty',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'Artista venezolano con uno de los catálogos más consistentes del rap nacional de los 2010s.'
  ),
  (
    'jeiby',
    'Jeiby',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'MC venezolano con trayectoria en la escena independiente y colaboraciones transversales.'
  ),
  (
    'trainer',
    'Trainer',
    (select id from cities where slug = 'caracas'),
    true,
    'active',
    'public',
    'Referente del rap venezolano con presencia sostenida desde los primeros años de la escena moderna.'
  )
on conflict (slug) do nothing;
