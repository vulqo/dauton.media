# Privacy Policy — Dauton Media (Draft v2)

**Owner:** Business & Legal agent (Vulqo LLC)
**Última actualización:** 2026-04-25
**Status:** draft v2 — reemplaza draft v0.1 (era "Culture Wiki")
**Publicación:** pending pre-launch Fase 3.

---

> **Nota interna (remover pre-publish):**
> Esta policy cubre GDPR + CCPA + LatAm standards. El agent (yo) es la fuente de verdad por decisión del founder — no hay lawyer review antes de publish. Si aparece un trigger de abogado humano (ver `compliance-calendar.md` §3), pausar y consultar.
> Items placeholder a completar antes de publish: **[ADDRESS]**, **[DOMAIN]**, fecha efectiva.

---

## Política de Privacidad — Dauton Media

**Última actualización:** [Fecha de publicación]
**Efectiva desde:** [Fecha]

Esta Política de Privacidad describe cómo Dauton Media (operado por Vulqo LLC, una empresa registrada en los Estados Unidos) recopila, utiliza y protege tu información personal cuando utilizas nuestro sitio web.

Somos un archivo público y herramienta de la música urbana hispana. **Nuestro modelo no depende de vender tus datos — no lo hacemos ni lo haremos.**

---

## 1. Quiénes somos

Dauton Media es operado por:

**Vulqo LLC**
[BUSINESS ADDRESS]
hello@[DOMAIN]

Para asuntos de privacidad: **privacy@[DOMAIN]**
Para DMCA: **dmca@[DOMAIN]**
Para correcciones factuales: **corrections@[DOMAIN]**
Para asuntos legales generales: **legal@[DOMAIN]**

---

## 2. Qué información recopilamos

### 2.1 Información que vos proporcionás

- **Al registrarte:** email, password (cifrada), opcionalmente display name.
- **Si usás login social (Google):** nombre, email, foto de perfil de Google.
- **Si reclamás tu perfil como artista:** información adicional para verificación (ej. link a cuenta social oficial, foto + ID en process de verify, que **no almacenamos** — solo el resultado de verificación).
- **Correcciones y contribuciones:** el contenido que enviás (texto, URLs de fuentes).
- **Comunicaciones:** emails que nos mandás.
- **Suscripción (Artist Pro + otros tiers, post-MVP):** billing email + método de pago. El método de pago lo procesa Stripe, **nosotros nunca almacenamos datos de tarjeta.**

### 2.2 Información recopilada automáticamente

- **Datos de uso agregados:** páginas visitadas, duración aproximada, país de acceso. Recopilados mediante Plausible Analytics, que **no utiliza cookies** y **no rastrea usuarios individualmente**.
- **Información técnica:** tipo de navegador, sistema operativo, dirección IP (conservada temporalmente para seguridad y prevención de abuso, retention 90 días).
- **Errores:** cuando ocurren errores, Sentry registra el contexto técnico (sanitized, sin PII cuando posible), retention 90 días.

### 2.3 Información sobre artistas (figuras públicas en su rol profesional)

Si sos artista musical con carrera pública, Dauton Media puede mantener un **perfil factual** sobre tu carrera basado en fuentes públicas (Spotify, MusicBrainz, Wikipedia, Genius, prensa, redes oficiales). Esto incluye:

- Nombre artístico (y legal si es público).
- Ciudad de origen + fechas de carrera.
- Discografía.
- Colaboraciones documentadas.
- Eventos públicos.
- Links a tus plataformas oficiales.
- Estadísticas públicas (streams, followers) desde APIs oficiales con timestamp.

**Qué NUNCA incluimos automáticamente:** religión, orientación sexual/identidad de género (excepto si vos lo declaraste públicamente y es relevante profesionalmente), salud mental o física, vida privada no-profesional, opiniones políticas, adicciones, criminal record no confirmed por fuente oficial.

**Base legal para mantener tu perfil:** interés legítimo como archive cultural de la música urbana hispana, balanceado contra tus derechos. Si querés objetar o editar, ver §7.

### 2.4 Cookies

Usamos las cookies **mínimamente necesarias**:

- **Cookies esenciales:** para mantener tu sesión cuando iniciás sesión.
- **No usamos cookies de publicidad ni de rastreo de terceros.**
- **No usamos Google Analytics.**
- Plausible Analytics no usa cookies.

---

## 3. Cómo usamos tu información

- Para operar el servicio (autenticación, guardado de favoritos, listas, claim flow).
- Para procesar tus correcciones y contribuciones.
- Para enviarte email si optaste in (outreach informativo a artistas, newsletter opcional).
- Para responder a tus consultas.
- Para procesar suscripciones (Artist Pro + otros tiers cuando se activen).
- Para detectar y prevenir fraude, abuso y violaciones de términos.
- Para cumplir con obligaciones legales.

**No usamos tu información para publicidad dirigida. No vendemos tus datos. No los compartimos con terceros excepto como se describe en §5.**

---

## 4. Base legal para el procesamiento (si aplica GDPR / LatAm equivalents)

Procesamos tus datos bajo las siguientes bases legales:

- **Consentimiento:** para newsletter opcional, para features que requieren opt-in explícito.
- **Ejecución de contrato:** para operar tu cuenta, procesar suscripciones, mantener tus favoritos.
- **Interés legítimo:** para seguridad, prevención de abuso, mejora del servicio, y mantener el archive público de artistas (figuras públicas en rol profesional).
- **Obligación legal:** cuando una ley aplicable lo requiere.

Si sos residente UE y querés objetar a nuestro uso de interés legítimo, ver §7.

---

## 5. Con quién compartimos tu información

Compartimos información solo con proveedores de infraestructura necesarios para operar el servicio, bajo Data Processing Agreements (DPA):

| Proveedor | Qué procesa | Jurisdicción |
|---|---|---|
| **Supabase** | Database, auth, storage | US / EU (depending on project region) |
| **Vercel** | Hosting, edge functions | Global edge |
| **Cloudflare** | DNS, CDN, security | Global edge |
| **Stripe** | Procesamiento de pagos (si aplica) | US + compliant regions |
| **Ko-fi** | Donaciones voluntarias | UK / global |
| **Resend** | Emails transaccionales | US |
| **Plausible** | Analytics agregados (cookieless) | EU |

**Autoridades:** si una orden judicial legítima nos obliga. Resistiremos solicitudes demasiado amplias o sin base legal.

**Sucesores:** si Vulqo LLC es adquirida o fusionada, tus datos pueden transferirse a la entidad sucesora bajo las mismas protecciones.

**No compartimos tu información con:** anunciantes, data brokers, ni terceros con fines de marketing.

---

## 6. Contenido público vs. privado

Cuando interactuás con Dauton Media, parte de tu actividad es intrínsecamente pública:

- **Listas marcadas como públicas:** visibles para cualquiera (por default, las listas son privadas).
- **Correcciones aceptadas:** el contenido entra al archive; tu username aparece en edit history si optaste por crédito público.
- **Perfil de artista claim-ed:** la información que vos agregás es pública (por eso claim-eás).
- **Contribuyente destacado:** visible si sos aprobado como contribuyente regular.

Toda otra información (favoritos, listas privadas, email, historial de navegación, billing) es **privada**.

---

## 7. Tus derechos

### 7.1 Si sos user registrado

Dependiendo de tu jurisdicción (GDPR UE / LatAm / CCPA California / otros), tenés derechos que incluyen:

- **Acceso:** pedir copia de la información que tenemos sobre vos.
- **Rectificación:** corregir información inexacta.
- **Eliminación ("right to be forgotten"):** pedir que eliminemos tu cuenta y datos asociados.
- **Portabilidad:** recibir tus datos en formato legible por máquina (JSON export).
- **Oposición:** oponerte a ciertos usos de tus datos (ej. interés legítimo).
- **Retirar consentimiento:** cancelar newsletter u otros opt-ins.
- **Limitación del procesamiento:** en casos específicos.

**Para ejercer estos derechos:** escribinos a `privacy@[DOMAIN]`. Respondemos en máximo 30 días.

Residentes de California tienen derechos adicionales bajo CCPA/CPRA. Residentes UE tienen derechos completos bajo GDPR. Residentes de Argentina, México, Colombia, Brasil, España y otros países LatAm/UE tienen los derechos equivalentes bajo su legislación local — aplicamos el standard más alto (GDPR) a todo el tráfico.

### 7.2 Si sos artista con perfil público (no registrado)

Si sos artista cuyo perfil está en Dauton Media (auto-generado desde fuentes públicas) y querés modificarlo o removerlo:

- **Opción recomendada: reclamá tu perfil** en `/claim?artist={tu-slug}`. Es gratis, toma 5 minutos, y te da control sobre bio, links, contacto, próximos eventos.
- **Si querés remover un dato específico** (foto, afirmación): escribí a `corrections@[DOMAIN]` con el detalle + source si tenés. Evaluamos y respondemos en 48-72h.
- **Si querés remover tu perfil entero:** escribí a `privacy@[DOMAIN]` con reasoning. Evaluamos caso por caso. **Nota:** como figura pública en tu rol profesional, tenés derecho limitado de erasure completo en un archive cultural; pero evaluamos seriamente y transparentemente cualquier solicitud.

---

## 8. Retención de datos

| Tipo de data | Período |
|---|---|
| Cuenta de user activa | Indefinido mientras esté activa |
| Cuenta de user inactiva (sin login 2+ años) | Notificamos + eliminamos si no hay response en 30 días |
| Favoritos + listas privadas | Con tu cuenta (eliminados si eliminás cuenta) |
| Contribuciones aceptadas | Permanentes (parte del archive histórico) |
| Contribuciones rechazadas | 1 año, luego anonimizadas |
| Emails de contacto | 2 años |
| Logs de error (Sentry) | 90 días |
| Logs de acceso (seguridad) | 90 días |
| Perfil de artista público | Indefinido (archive cultural con base legal Art. 89 GDPR equivalent) |
| Data de Stripe (payments) | Per Stripe + 7 años para compliance fiscal |
| Takedown logs internos | Indefinido (para defensa legal) |

Si pedís eliminar tu cuenta, eliminamos:
- Tu perfil de user, email, password.
- Tus favoritos y listas privadas.
- Tus datos de sesión.

**Lo que conservamos después de delete:**
- Correcciones aceptadas al archive (son parte del historial público y no se retiran).
- Tu nombre como contribuyente en entradas que aprobaste públicas, excepto si pedís anonimización específica.

---

## 9. Menores

Dauton Media no está dirigido a menores de 13 años. No recopilamos conscientemente datos de menores de 13. Si descubrimos que hemos recopilado datos de un menor sin consentimiento parental, los eliminamos y notificamos.

Users entre 13 y 18 años pueden usar el sitio con permiso de sus padres o tutores.

Si sos padre/madre y creés que un menor a tu cargo se registró sin permiso, escribinos a `privacy@[DOMAIN]`.

---

## 10. Transferencias internacionales

Nuestros servidores pueden estar ubicados en Estados Unidos o Europa. Al usar el sitio, consentís en la transferencia de tu información a estas jurisdicciones, que pueden tener leyes de protección de datos diferentes.

Para users UE: usamos **Cláusulas Contractuales Estándar (SCCs)** con proveedores que operan fuera de UE/EEE. Esto cumple con los requisitos post-Schrems II.

---

## 11. Seguridad

Implementamos medidas razonables para proteger tu información:

- Conexiones HTTPS en todo el sitio.
- Passwords cifradas (hash) usando algoritmos estándar (Supabase Auth).
- Row-Level Security en database para limitar qué datos puede leer cada user.
- Acceso administrativo restringido con MFA.
- Monitoreo de seguridad continuo.
- Rotación periódica de secrets.

**Ningún sistema es 100% seguro.** Si ocurre una brecha de seguridad que afecte tus datos personales, te notificaremos dentro del plazo legal aplicable (72h en UE bajo GDPR).

---

## 12. Inteligencia artificial (AI)

Dauton Media usa AI asistida para:

- Generar drafts de biografías de artistas a partir de fuentes públicas documentadas (con source-grounding + review humano para tier high-profile).
- Procesar contribuciones de users para detectar spam o vandalism.
- Facilitar búsqueda y descubrimiento.

**Principios:**
- **No entrenamos AI con tus datos personales.**
- AI es asistencia, no reemplazo de fact-checking.
- Perfiles con contenido AI-generated tienen disclaimer visible.
- Podés reportar errores o solicitar review humano vía `corrections@[DOMAIN]`.

---

## 13. Do Not Sell / Do Not Share + GPC

**No vendemos tu información personal.** En el sentido de CCPA/CPRA, tampoco "sharing" para advertising cross-context. Respetamos automáticamente el header **Global Privacy Control (GPC)** cuando lo envía tu navegador.

---

## 14. Cambios en esta política

Podemos actualizar esta política. Cambios sustanciales serán notificados por:

- Email a users registrados (si tenés cuenta).
- Banner en el sitio durante al menos 14 días.
- Fecha de "última actualización" en esta página.

Tu uso continuado del sitio después de un cambio constituye aceptación de la política actualizada.

---

## 15. Contacto

Para preguntas sobre esta política o tus datos:

- **privacy@[DOMAIN]** — privacy requests + GDPR
- **dmca@[DOMAIN]** — DMCA notices
- **corrections@[DOMAIN]** — factual corrections
- **legal@[DOMAIN]** — legal inquiries generales

Postal:
**Vulqo LLC**
[BUSINESS ADDRESS]

Si no estás satisfecho con nuestra respuesta, podés presentar una queja ante la autoridad de protección de datos de tu país. Para UE: tu autoridad nacional (listadas en edpb.europa.eu).

---

*See also: [`terms-draft.md`](./terms-draft.md), [`ip-and-fair-use.md`](./ip-and-fair-use.md), [`takedown-disputes.md`](./takedown-disputes.md), [`privacy-framework.md`](./privacy-framework.md).*
