# Newsletter — Contenido Dinámico desde Archive + DB

**Department:** Marketing & Growth
**Owner:** Community & Outreach
**Last updated:** 2026-04-24
**Status:** v1 — Founder pidió foco prioritario en este canal.

---

## Tesis

El newsletter es nuestro canal más valioso porque:

1. **Lo poseemos.** No depende de algoritmo de TikTok/IG.
2. **Es retention pura.** Un sub vuelve cada semana sin esfuerzo del equipo.
3. **Personalizable a escala.** La DB ya tiene toda la data — convertirla en email personalizado es solo un query + plantilla.
4. **Monetizable.** Sponsorships marketplace en Beehiiv free tier (mes 6+), eventually paid tier.

Founder explícito: "el newsletter será esencial para nosotros. Recaps mensuales de qué hizo su artista favorito... no requiere mantenimiento porque todo se hace con contenido dinámico extraído de la database y gestionado por un AI agent."

Esto es exactamente lo que vamos a montar.

---

## 3 productos en el newsletter

| Producto | Cadencia | Audiencia | Source de data | Personalización |
|---|---|---|---|---|
| **"Archivo Abierto"** | semanal sábado | All subs | Events de la semana en archive | Genérico (con segmento ciudad opcional) |
| **"Tu Mes en Dauton"** | mensual primer lunes | Subs con favoritos | Per-user query de followed artists | Total — distinto cada user |
| **Alertas event-driven** | inmediato | Subs siguiendo artist específico | Trigger desde DB | Per-user, opt-in granular |

---

## Producto 1 — "Archivo Abierto" (semanal)

### Por qué semanal y no quincenal

Cambié mi propuesta inicial (quincenal) a semanal por el feedback. Razones:

- Volumen de events del archive es alto (releases nuevos, aniversarios, mentions): cada semana tenemos material.
- Generación es 100% auto = costo marginal $0.
- Cadencia semanal entrena al sub a esperarnos = retention sube.
- Beehiiv free unlimited sends, no penalty.

### Formato fijo (5 bloques)

```
SUBJECT: Archivo Abierto #N — [hook de la semana]

BLOQUE 1 — ESTA SEMANA EN EL ARCHIVO (3-5 bullets)
   Auto-extraído de events.
   
BLOQUE 2 — PROFUNDIDAD (1 spotlight)
   1 artist o release destacado, 150 words.
   Alterna semanas: par = artist, impar = release.

BLOQUE 3 — EL MAPA (eventos opcional)
   Si hay events VE/diáspora upcoming → 1-3 lines.
   Si no, el bloque se omite.

BLOQUE 4 — TOOL DE LA SEMANA
   Si hay tool nueva → spotlight.
   Si no, destacar tool existente con un use case.

BLOQUE 5 — LECTURA DEL EDITOR (3 links)
   Curated por Luis. Externos.

FOOTER:
   - "Respondi este mail. Lo leemos."
   - Unsubscribe
   - Privacy
```

### Pipeline de generación semanal

Cron domingo 18:00 ART:

```sql
-- Bloque 1: events de últimos 7 días
SELECT * FROM (
  SELECT 'new_release' as type, slug, title, artist_name, released_at as ts
  FROM releases JOIN people ON ...
  WHERE released_at > NOW() - 7 DAYS
  
  UNION ALL
  
  SELECT 'new_credit' as type, ...
  FROM production_credits ...
  WHERE created_at > NOW() - 7 DAYS
  
  UNION ALL
  
  SELECT 'press_mention' as type, ...
  FROM press_mentions ...
  WHERE published_at > NOW() - 7 DAYS
  
  UNION ALL
  
  SELECT 'milestone' as type, ...
  FROM career_events ...
  WHERE date_extract(month FROM occurred_at) = current_month
    AND date_extract(day FROM occurred_at) = current_day_of_week
)
ORDER BY relevance_score DESC
LIMIT 8;
```

Cron cron lunes 6:00 ART:

```
1. Run query → events list
2. Send to AI agent (Claude Max manual o Gemini API):
   PROMPT: "Estos son los events del archive esta semana. Selecciona los 5 más interesantes para audiencia hispana. Genera bloque 1 con bullet points sobrios. Genera bloque 2 (profundidad) sobre el más interesante. Tono: Dauton sobrio."
3. Output → React Email template
4. Schedule en Beehiiv para sábado 9 AM ART
5. Luis review opcional (10 min)
```

### Generación con Claude Max manual (etapa 1) o Gemini API (etapa 2+)

**Etapa 1 (sin presupuesto):**
- GitHub Actions corre query domingo, genera markdown con events.
- Output guardado en `_pending_newsletter/2026-XX-XX.md` con todos los events.
- Luis ejecuta prompt en Claude Max manual el sábado AM (5 min).
- Copy-paste en Beehiiv editor.
- Send.

**Etapa 2 (con Gemini API free tier):**
- Mismo flow pero step 3 automatizado con Gemini API.
- Luis solo review final + send.

**Etapa 3 (con Claude API si volumen lo justifica):**
- Full automation. Luis solo si quiere intervenir manualmente.

### Bloque 3 — segmentation por ciudad

Si el sub declaró ciudad en signup, recibe variant del bloque 3 con eventos en su ciudad. Si no declaró → bloque genérico de eventos VE/diáspora.

Implementación: Beehiiv soporta merge tags + segments en free tier. Suficiente.

---

## Producto 2 — "Tu Mes en Dauton" (mensual personalizado)

**Esta es la idea estrella del founder.** Newsletter personalizado donde cada sub recibe un email distinto, basado en los artistas que está siguiendo.

### Flow de signup mejorado

Cuando alguien se suscribe al newsletter:

```
PASO 1: Email + ciudad opcional.
PASO 2 (opcional): "¿Querés recap mensual personalizado?"
   - Si NO: solo recibe weekly genérico.
   - Si SÍ: ve picker de artistas.
        Selecciona hasta 10 artistas favoritos.
        Search dinámico contra archive.
   - Submit.
PASO 3: Welcome email confirmando setup.
```

### Estructura de "Tu Mes en Dauton"

**Subject line:**
- Si hubo actividad fuerte: "[Stage_name] tuvo un mes movido — tu recap"
- Si fue normal: "Tu mes con [N] artistas seguidos en Dauton"
- Si fue silencioso: "Mes tranquilo en tu lista — pero hay algo más"

**Body por user:**

```
Hola [user_first_name o "fan del archivo"],

Aquí lo que pasó en [mes] con tus [N] artistas seguidos:

[FOR EACH followed_artist WHERE had_activity_in_month:]

  ━━━━━━━━━━━━━━━━━━━━━━
  [stage_name]
  ━━━━━━━━━━━━━━━━━━━━━━
  
  Releases:
    → [release_title] · [date] · [streaming_link]
  
  Colaboraciones detectadas:
    → con [other_artist] en "[track_title]"
  
  Ciudades con actividad:
    → [city_name] · [event_type] · [date]
    → [city_name] · concierto · [date]
  
  Press mentions:
    → [outlet_name] · "[article_title]" · [date] · [link]
  
  Próximos eventos:
    → [date] · [city] · [venue] · [tickets_link]
  
  Perfil completo: dauton.media/artists/[slug]

[END FOR]

[IF some_artists_had_no_activity:]

  Sin actividad este mes: [comma-separated list of names]
  (Pero su archive sigue creciendo — visitalos.)

[END IF]

[CLOSURE]

Gracias por seguirlos en Dauton.

Este recap se generó automáticamente desde nuestro archive.
Si encontraste algo incorrecto, sugerí corrección desde el perfil.

Editar tu lista de artistas: [link]
```

### Query SQL — dinámica por user

```sql
WITH user_followed AS (
  SELECT person_id 
  FROM newsletter_user_followed_artists 
  WHERE user_id = $1
)

SELECT 
  p.stage_name,
  p.slug,
  -- Releases del mes
  json_agg(DISTINCT 
    jsonb_build_object('release_title', r.title, 'date', r.released_at, 'spotify_url', r.spotify_url) 
  ) FILTER (WHERE r.released_at >= $month_start AND r.released_at < $month_end) as releases,
  -- Colaboraciones detectadas
  json_agg(DISTINCT 
    jsonb_build_object('other_artist', other.stage_name, 'track', t.title)
  ) FILTER (WHERE coll.created_at >= $month_start) as collaborations,
  -- Press mentions
  json_agg(DISTINCT 
    jsonb_build_object('outlet', s.name, 'title', pm.title, 'url', pm.url, 'date', pm.published_at)
  ) FILTER (WHERE pm.published_at >= $month_start) as press,
  -- Eventos cercanos (futuros)
  json_agg(DISTINCT 
    jsonb_build_object('city', c.name, 'venue', e.venue, 'date', e.starts_at, 'url', e.tickets_url)
  ) FILTER (WHERE e.starts_at > NOW() AND e.starts_at < NOW() + INTERVAL '60 days') as upcoming_events,
  -- Ciudades con actividad reciente
  array_agg(DISTINCT c.name) FILTER (WHERE event_in_month) as cities_active

FROM user_followed uf
JOIN people p ON uf.person_id = p.id
LEFT JOIN releases r ON r.primary_person_id = p.id
LEFT JOIN collaborations coll ON ...
LEFT JOIN press_mentions pm ON pm.subject_person_id = p.id
LEFT JOIN events e ON e.primary_person_id = p.id
LEFT JOIN cities c ON ...
GROUP BY p.id, p.stage_name, p.slug;
```

(Pseudo-SQL — Engineering refina contra schema real).

### Pipeline mensual

Cron primer lunes del mes 6:00 ART:

```
1. Query users con personalized_recap = true.
2. Para cada user:
   a. Run query above con user_id + month range.
   b. Generate email body desde results (template React Email).
   c. Resend API: send personalized email.
3. Log en monthly_recap_sent_log.
```

**Volumen estimado:**
- Mes 3 post-launch: 200 subs × 5 artistas avg = 1000 queries + 200 emails.
- Mes 6: 1500 subs × 5 = 7500 queries + 1500 emails.
- Mes 12: 7000 subs × 5 = 35000 queries + 7000 emails.

Resend free tier: 3K/mes. Mes 6+ requiere upgrade ($20/mes Pro = 50K). Justificable.

### Reglas de "Tu Mes en Dauton"

- Si el user no tuvo NINGÚN artista con actividad en el mes: enviamos email tipo "Mes tranquilo en tu lista — esto sí pasó en el archive en general" con un mini-Archivo-Abierto en su lugar. No skip silencioso.
- Si el user sigue solo 1-2 artistas: email enriquecido con "puede que también te interese" basado en colabs/genre/ciudad.
- Si el user agregó artistas el mes pasado: bonus al final "Bienvenida lista que armaste — esto es lo que se construyó."

### Frecuencia adjustment

Por ahora mensual. Si los users responden positively, considerar:
- Quarterly recap especial (diciembre = "Tu año en Dauton" como Spotify Wrapped).
- Weekly highlights opt-in (super-fans).

---

## Producto 3 — Alertas event-driven

Subscriptions granulares: el user puede suscribirse a alertas específicas:

- **"Avísame si [artist] saca algo nuevo"** — trigger inmediato cuando ingestion detecta nuevo release.
- **"Avísame si [artist] toca cerca de [ciudad]"** — trigger cuando event detected con city match.
- **"Avísame si descubrimos colab nueva de [artist]"** — trigger por production_credits / collaborations.

Implementación:
- Tabla `user_alert_subscriptions` con (user_id, person_id, alert_type, params).
- Triggers Supabase (`pg_notify` o webhooks) cuando matching event aparece.
- Resend send inmediato del email transaccional.

**Restricción:** rate limit 1 alerta/día/user para evitar spam. Si 3 artistas seguidos liberan algo el mismo día → 1 email consolidado, no 3 separados.

---

## Welcome sequence (3 emails)

Inmediato al signup:

**Email 1 (T+0): "Bienvenida al archivo"**
- 3 perfiles para empezar.
- Link a archive.
- Onboarding al picker de artistas favoritos.

**Email 2 (T+3 días): "Cómo funciona"**
- Transparencia: de dónde sale la data.
- Cómo sugerir correcciones.
- Invita a Discord (cuando exista).

**Email 3 (T+7 días): "El por qué"**
- Carta corta de Luis.
- Visión.
- CTA sutil: Ko-fi cuando esté.

Después: entran en cadencia regular weekly + monthly.

---

## Plan de contenido mensual completo

### Newsletter outputs por mes (mes 6 post-launch escenario)

| Producto | Volumen mensual |
|---|---|
| Archivo Abierto weekly | 4-5 envíos |
| Tu Mes en Dauton | 1 envío personalizado por user |
| Welcome sequence | ~50-100 series triggered (signups del mes) |
| Event-driven alerts | ~20-50 triggered |

**Total emails enviados / sub avg:** 5 weekly + 1 monthly + ocasional event = 7-8 emails/mes/sub. Within healthy frequency, no spammy.

---

## Monetización del newsletter (etapa 4+)

A medida que crecemos:

| Trigger | Mecanismo | Estimado |
|---|---|---|
| 1K subs | "Reply para feedback" sin monetización aún | $0 |
| 2.5K subs | Activamos Beehiiv "Boost" (recommendation network) | $20-100/mes pasivo |
| 5K subs | Sponsorship marketplace de Beehiiv (1 sponsor por edition) | $100-500/edition |
| 10K subs | Curated sponsorships propios (sponsors alineados a misión) | $500-2K/edition |
| 25K subs | Paid tier opcional con archive deep dives | TBD |

**Reglas firmes:**
- Sponsor siempre relevante a música/cultura latina. Nunca crypto, gambling, dropshipping.
- Sponsor disclosed clearly al inicio de la sección.
- Editorial nunca compromised. Si un sponsor pide revisar copy editorial, declinamos.

---

## Métricas a monitorear

| Métrica | Target mes 1 | Target mes 6 | Target mes 12 |
|---|---|---|---|
| Subs total | 200 | 2,500 | 8,000 |
| Subs con favoritos | 50 | 1,000 | 4,000 |
| Open rate weekly | >55% | >45% | >40% |
| Open rate monthly recap | >65% | >55% | >50% |
| CTR weekly | >12% | >8% | >7% |
| CTR monthly recap | >15% | >10% | >8% |
| Unsub rate | <1% | <1.5% | <2% |
| Reply rate | >2% | >1% | >0.7% |

**El monthly recap personal tiene mejor open/CTR que weekly genérico.** Eso es porque hipersuper-personalizado. Es el formato premium.

---

## Tech stack consolidado del newsletter

```
Beehiiv:
  - Newsletter editor + scheduling
  - Subscriber management
  - Free tier 2.5K
  - Path a sponsorships marketplace

Resend:
  - Welcome sequence (3 emails)
  - Tu Mes en Dauton (per-user)
  - Event-driven alerts
  - Transaccionales (claim approved, etc.)
  - Free tier 3K/mes

React Email:
  - Templates compartidos entre productos
  - Branding consistente con DS

Supabase:
  - Tabla newsletter_subscribers
  - Tabla newsletter_user_followed_artists
  - Tabla user_alert_subscriptions
  - Tabla newsletter_send_log

GitHub Actions:
  - Cron domingo (gen weekly content)
  - Cron primer lunes mes (gen monthly recaps)

Claude Max manual / Gemini API:
  - Generación de copy semanal/mensual
```

---

## Schema additions necesarios (ticket [ENG])

```sql
CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY,
  email text NOT NULL UNIQUE,
  city text,
  primary_language text DEFAULT 'es',
  source text,
  personalized_recap_enabled boolean DEFAULT false,
  status text DEFAULT 'active', -- 'active' | 'paused' | 'unsubscribed'
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

CREATE TABLE newsletter_user_followed_artists (
  user_id uuid REFERENCES newsletter_subscribers,
  person_id uuid REFERENCES people,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, person_id)
);

CREATE TABLE user_alert_subscriptions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES newsletter_subscribers,
  person_id uuid REFERENCES people,
  alert_type text NOT NULL, -- 'new_release' | 'event_in_city' | 'new_collaboration'
  params jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE newsletter_send_log (
  id uuid PRIMARY KEY,
  product text NOT NULL, -- 'weekly' | 'monthly_recap' | 'welcome_1' | 'alert' | etc.
  user_id uuid,
  sent_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  bounced boolean DEFAULT false
);
```

RLS: solo service_role puede write. Read-only para user_id propio (cuando wired auth). Nunca exposure pública.

---

## Lo que NO hacemos en newsletter

- ❌ "Hola amigos" / saludos genéricos sin valor.
- ❌ Listicles tipo "27 cosas que no sabías".
- ❌ Forwards de news genéricas (somos archive, no aggregator).
- ❌ Sponsor en transaccionales (claim approved NO promueve nada externo).
- ❌ Plot twists clickbait en subjects.
- ❌ Pop-ups agresivos para capturar emails en site.
- ❌ Doble opt-in fricción excesiva (un opt-in claro + unsubscribe + transparencia es ético + legal).
- ❌ Re-engagement de subs inactivos > 6 meses (los movemos a segmento churned).
- ❌ Comprar listas. Nunca.

---

## Validation cycle

Antes de scale el monthly recap personalizado:

1. **Mes 1-2:** semanal genérico solo (Archivo Abierto), test cadencia + open rate baseline.
2. **Mes 3:** soft beta del monthly recap con 50 users early. Pedimos feedback explicit por reply.
3. **Mes 4:** ajustes según feedback.
4. **Mes 5+:** rollout total.

---

## Próximos pasos

1. Founder confirma decisión de Beehiiv + Resend stack.
2. [ENG] ticket: schema additions + signup flow + favorites picker UI.
3. Setup Beehiiv account + dominio email (`hola@dauton.media`).
4. Mes 1 mayo 2026: arranca weekly genérico (manual generation con Claude Max).
5. Mes 3 julio 2026: monthly recap personalizado en beta.

---

*See also: [`marketing-strategy-v1.md`](marketing-strategy-v1.md) · [`tools-and-apis.md`](tools-and-apis.md) · [`content-plan-by-platform.md`](content-plan-by-platform.md) · [`monetization-roadmap.md`](monetization-roadmap.md) · [`launch-plan.md`](launch-plan.md)*
