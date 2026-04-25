# Email Marketing Strategy

**Department:** Marketing & Growth
**Owner:** Community & Outreach
**Last updated:** 2026-04-24
**Status:** draft v1 — propuesta.

---

## Scope

Este doc cubre email marketing hacia **fans y general audience**. Email hacia **artistas** (outreach de claim) vive en `../06-Operations/artist-outreach.md`. Email hacia **press** vive en `launch-plan.md` sección Press.

---

## Objetivo

Construir una newsletter que funcione como:

1. **Canal de retención.** El fan se suscribe una vez, vuelve cada 2 semanas automático.
2. **Prueba de vitalidad.** Con cada envío se refleja que el archivo está vivo (adiciones reales).
3. **Traffic driver.** Cada email genera 15-30% click-through al site.
4. **Feedback loop.** Replies son telemetría cualitativa de qué importa a la audiencia.

**Target a 12 meses:** 5-10K subs engaged. Relevante, no masivo.

---

## La newsletter: "Archivo Abierto"

**Cadencia:** bi-semanal (domingo a.m., hora Madrid — cubre Europa + Américas wake-up windows).

**Duración:** ≤5 min read. Scroll breve. Sin walls of text.

**Subject line pattern:** `Archivo Abierto #N — [hook]`
- Ejemplo: `Archivo Abierto #3 — 43 nuevos tracks, Apache expande su red`
- Ejemplo: `Archivo Abierto #7 — Hoy hace 14 años salió Apocalipsis`

**Formato fijo (5 bloques):**

### Bloque 1: Esta quincena en el archivo (3-5 bullets)

Top adiciones. Formato:
```
— Apache: nueva colaboración detectada con Nerza (2015).
— +12 tracks de La Revolución en la DB.
— Kpú verificó perfil y agregó 3 créditos de producción.
```

Linkeado al entity page.

### Bloque 2: Profundidad (150-200 palabras)

1 artista o release destacado. Criterio: semana par = artist spotlight, semana impar = release spotlight.

Formato: 1 párrafo de contexto + 3-5 hechos duros + link al perfil.

Ejemplo:
```
**Canserbero — Apocalipsis I (2010)**

14 años después, Apocalipsis sigue siendo el álbum de referencia
para medir rap hispano conceptual. Grabado en una laptop prestada,
mezclado en 2 meses. 15 tracks. 0 radio singles oficiales. Tuvo
que esperar 2 años para que el hype lo alcanzara.

→ Productores: Bekman, DJ Wide
→ Colaboradores: 4 (todos caraqueños)
→ Press mentions: 23 entre 2010-2013
→ Sample detectado en: "Es Épico"

Perfil completo: dauton.media/releases/apocalipsis-i
```

### Bloque 3: El mapa (1 evento corto, opcional)

Si hay evento VE/diáspora upcoming: formato short.
```
19 nov · Madrid · Apache + Akapellah · Sala But · tickets externos
```

Si no hay evento relevante, se omite el bloque. No rellenar con filler.

### Bloque 4: Tool / feature de la quincena

Si hay tool nueva o destacada:
```
Lanzamos esta semana la Calculadora de Ingresos Spotify.
Proba con tu artista favorito: dauton.media/tools/spotify-ingresos
```

Si no hay tool nueva, destacar una existente o se omite.

### Bloque 5: Lectura del editor (3 links externos)

Curada por Luis. No nuestro content. Links culturales interesantes:
- Podcast episode relevante.
- Artículo de medio latino.
- Post largo en X thread.

Tono: "esto me pareció bueno esta quincena" — 1 frase por link.

### Footer

- Unsubscribe claro.
- Forward-to-friend link.
- "Respondí este mail — lo leemos todos."
- Privacy policy link.

---

## Welcome sequence (nuevos subscribers)

Al suscribirse, enviamos 3 emails en secuencia:

**Email 1 (inmediato): "Bienvenido al archivo"**
- Qué es Dauton en 5 líneas.
- 3 perfiles de artistas "para empezar".
- Link a explorar el archivo.
- Link a Discord.

**Email 2 (+3 días): "Cómo usamos las fuentes"**
- Transparencia: de dónde sale la data.
- Qué es un "pillar".
- Cómo sugerir correcciones.
- Invita a seguir Spotify playlists.

**Email 3 (+7 días): "El equipo y el por qué"**
- Carta corta de founder (Luis).
- Visión a 12 meses.
- Invita a dar feedback directo.
- CTA sutil: Ko-fi si conviene.

Después de este welcome, entran en la cadencia regular bi-semanal.

---

## Segmentation

### Segmento A: General subs (default)

Todos los signups. Reciben "Archivo Abierto" regular.

### Segmento B: Alta engagement

Opens > 60% last 10 emails + click-throughs > 20%. Potential "supporters":
- Invites a Discord con rol especial.
- Early access a tools.
- Pedir feedback específico.

### Segmento C: Diáspora por ciudad

Al signup pedimos ciudad (opcional). Si dice Miami, Madrid, Bogotá, etc. → reciben además un email mensual con "eventos VE en tu ciudad este mes".

### Segmento D: Artistas verificados (crossover de artist-outreach)

Artistas con claim completado entran a pool separado. Reciben updates de:
- Su perfil específico (data nueva, correcciones).
- Releases de artistas que han colaborado con ellos.

### Segmento E: Press / journalists

Lista aparte gestionada manualmente. Reciben:
- Story angles quarterly.
- Embargoed previews cuando hay launches grandes.

---

## Tech stack

Ver `ai-marketing-stack.md`.

- **Sender:** Resend (transaccionales + outreach) + Beehiiv (newsletter con editor visual).
- **Rationale:** Beehiiv es mejor para el editor + subscribe page + referral tools nativas. Resend es mejor para código-first (welcome sequence via Supabase triggers).
- **Hybrid approach:** Beehiiv para envíos regulares "Archivo Abierto". Resend para transaccionales (welcome, claim approval, etc.).

**Integration flow:**
```
SUPABASE USER TABLE
  → trigger on insert where signup_source='newsletter'
    → Resend: send welcome email #1
    → queue email #2 en +3 days
    → queue email #3 en +7 days
    → Beehiiv API: add to list

SEMANAL CRON (Sunday 6am ART):
  → query Supabase: events last 2 weeks
  → Claude API: draft newsletter sections
  → Luis review 1h max
  → Beehiiv API: schedule send Sunday 10am ART

ARTIST CLAIM APPROVED:
  → Resend: send claim-approved email
  → move user from 'general' segment to 'artist_verified' in Beehiiv

UNSUBSCRIBE from any email:
  → Resend webhook → update suppression in both Resend + Beehiiv
```

---

## Copy principles

1. **Tono sobrio.** Como el resto del marketing.
2. **Bilingual capable.** ES por default. Si el sub eligió EN como primary, version EN.
3. **No "hola amig@s".** Empezar con data o con contexto.
4. **Scroll-friendly.** Bloques cortos, espacios blancos, no walls.
5. **Headings en mayúscula minimalista.** Ej. "ESTA QUINCENA", no "🎉 ¡ESTA SEMANA EN DAUTON! 🎉".
6. **Zero emojis decorativos.** Únicos permitidos: flechas `→`, dashes `—`, guiones `-`.
7. **Links directos.** Sin "click aquí". El link tiene texto descriptivo.

---

## A/B tests (post-launch, no antes)

Cuando tengamos 1K+ subs, empezamos a A/B testar:

- Subject line formato (`#N — hook` vs `hook — #N` vs solo hook).
- Hora de envío (domingo 10am vs domingo 6pm vs lunes 9am ART).
- Bloque 2 con párrafo largo vs bullets.
- CTA único al final vs múltiples CTAs.

Un test a la vez. Ganador se confirma con 95% significance + min 500 emails por cohorte. No test sin hipótesis clara.

---

## KPIs

| Métrica | Target mes 1 | Target mes 6 | Target mes 12 |
|---|---|---|---|
| Subs | 200 | 2.5K | 7K |
| Open rate | >50% | >45% | >40% |
| CTR | >10% | >8% | >7% |
| Unsubscribe rate | <1% | <1.5% | <2% |
| Forward rate | n/a | >3% | >5% |
| Reply rate | >2% | >1% | >0.7% |
| Conversion to Ko-fi donation | n/a | >0.5% | >1% |

**Open rate bajando y CTR subiendo** = OK (más gente no abre pero los que abren hacen click = audiencia más segmentada).

**Open rate subiendo y CTR bajando** = problema. Subject line engaña pero contenido decepciona.

---

## Crisis email (defensive templates)

Ver también `../06-Operations/artist-outreach.md` sección crisis.

Templates adicionales para newsletter:
- Corrección pública: si el newsletter difundió data incorrecta, email correctivo al next batch + pin en admin.
- Comunicación de data breach: inmediato, con plan de acción.
- Takedown público notable: nota breve + contexto en next newsletter.

---

## Lo que NO hacemos en email

- ❌ Popups agresivos en el site para capturar emails.
- ❌ "Enter your email to read more" gating.
- ❌ "Sorteo" / "gana X si te suscribís".
- ❌ Cross-sell de Vulqo / SHO / otras entidades del founder.
- ❌ Email transaccional con ads (email de claim approved NO promueve Ko-fi).
- ❌ Comprar listas.
- ❌ "Double opt-in" innecesariamente fricciónico — un opt-in claro + unsubscribe + transparencia es suficiente ética + legalmente.
- ❌ Re-engagement campaigns tipo "te extrañamos!" agresivas. Si alguien no abre en 6 meses, lo movemos a segment inactivo, no insistimos.

---

*See also: `marketing-strategy-v1.md` · `launch-plan.md` · `ai-marketing-stack.md` · `../06-Operations/artist-outreach.md` · `../06-Operations/email-discovery-playbook.md`*
