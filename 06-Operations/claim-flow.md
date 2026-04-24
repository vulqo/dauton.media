# Claim Flow — Artista reclama su perfil

**Owner:** Community & Outreach agent
**Status:** 🔴 skeleton — pendiente
**Última actualización:** 2026-04-25

---

## Contexto

Un artista ve su perfil en Dauton Media auto-generado. Quiere reclamar control editorial. Este es el flujo.

Según founder: **"Verificación = badge. Artistas auto-registrados = clientes directos = tag especial. Sensación VIP vs regular."**

---

## Los 2 casos

### Caso A: Artista auto-registrado (clientes directos)

Artista descubre Dauton y crea cuenta directamente (no vino desde un perfil auto-generado nuestro). Su perfil se crea desde su registro.

- Tag especial: `is_direct_customer = true`.
- UX VIP desde día 1.

### Caso B: Artista reclama perfil auto-generado (outreach flow)

Perfil ya existe en DB (poblado por ingestion). Artista recibe email outreach o descubre perfil en búsqueda. Quiere reclamarlo.

- Flow de verificación (48h target).
- Si verificado: badge VIP + acceso de edición.
- `claimed_by_user_id` se popula en `people` table.

---

## Flujo Caso B (a detallar)

### Paso 1 — Artista inicia claim

UI: en el perfil del artista hay botón "Este soy yo — Reclamar perfil".
Modal aparece pidiendo:
- Email de contacto.
- Link a cuenta oficial (Spotify / Instagram verified / Twitter verified / Bandcamp) para verificar identidad.
- Opcional: código a publicar en su bio para verificación manual (48h max).

### Paso 2 — Verificación

**Métodos posibles (por seguridad + fricción):**

a) **Link match**: artista provee su Spotify artist URL oficial. Si matchea el `spotify_id` del perfil en DB → auto-verify.

b) **Social verify**: artista publica código único de Dauton en su bio de IG/Twitter (código de 6 chars). Crawler nuestro verifica en 24h → auto-verify.

c) **Manual review**: si a) y b) fallan, humano revisa (Luis o editor). 48h target.

### Paso 3 — Verification granted

- `user_profiles.claimed_person_id` = id del perfil.
- `people.claimed_by_user_id` = user id.
- Badge VIP en perfil: ✓ Verified.
- Acceso a edición/agregado en panel privado.

### Paso 4 — Qué puede editar el artista verificado

**Edita sin review:**
- Bio long.
- Photo de hero.
- Social handles.
- Website URL.
- Fechas de tour / próximos eventos.
- Merch links.

**Requiere review del admin:**
- Stage_name (rara vez cambia).
- Origen geográfico.
- Fechas históricas (signing con label, etc.).
- Relaciones con otras personas (collabs, crews).

**No puede editar:**
- Fechas de release oficiales (vienen de Spotify/MB).
- Credits públicos en tracks (vienen de MB/Genius).
- Streams / popularity stats.

---

## UX del panel privado

Cuando artista verified loguea:
- Dashboard con: "Tu perfil", "Correcciones pendientes", "Analytics" (v1.5+ stats privados).
- Section "Tu merch" → UI para agregar links.
- Section "Próximos eventos" → UI para agregar manual + sync con Bandsintown opcional.

---

## Takedown / right-to-be-forgotten

Si un artista NO quiere estar en Dauton:
- Opción en panel: "Eliminar mi perfil".
- Warning: perfil queda cached 30 días, después se borra permanente.
- Lo que se borra: bio, photos, handles, eventos futuros.
- Lo que NO se borra: discografía (es data pública licensed), credits en tracks de otros artistas.

---

## Coordinación

- **Product Architecture:** diseña UX exacta del modal + panel privado.
- **Engineering:** endpoints `/api/claim/initiate`, `/api/claim/verify`, `/api/profile/edit`.
- **Business & Legal:** política de takedown + terms cuando artista acepta claim.
- **Data & SEO:** crawler que verifica códigos en IG/Twitter bios.

---

## Reglas operativas

- SLA: 48h para verification manual (si hace falta).
- 0 friction para match automático vía Spotify URL.
- Claim gratis en MVP. Post-MVP: tier premium con analytics + custom domain + features pro.
