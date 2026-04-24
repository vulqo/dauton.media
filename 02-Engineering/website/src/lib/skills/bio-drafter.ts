import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const BioDrafterInput = z.object({
  stage_name: z.string(),
  wikipedia_summary: z.string().nullable(),
  spotify_genres: z.array(z.string()).default([]),
  active_since: z.string().nullable(),
  active_until: z.string().nullable(),
  top_collaborators: z.array(z.string()).max(5).default([]),
});

export const BioDrafterOutput = z.object({
  bio_short: z.string().max(500),
  claims_used: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

export type BioDrafterInput = z.infer<typeof BioDrafterInput>;
export type BioDrafterOutput = z.infer<typeof BioDrafterOutput>;

const PROMPT = `
Eres un editor sobrio que escribe bios cortas para un archivo de rap hispanohablante.
Tono: autoritativo, factual, sin hype, sin emojis.

REGLAS:
1. Nunca inventes datos. Si no tienes evidencia, no lo menciones.
2. Máximo 80 palabras.
3. Español formal pero accesible.
4. Si falta data crítica, el bio puede ser de 30 palabras. Mejor corto y sólido.

INPUT:
- stage_name: {{stage_name}}
- wikipedia_summary: {{wikipedia_summary}}
- spotify_genres: {{spotify_genres}}
- active_since: {{active_since}}
- active_until: {{active_until}}
- top_collaborators: {{top_collaborators}}

Responde SOLO con JSON válido:
{"bio_short":"...","claims_used":["..."],"confidence":0.0}
`.trim();

export async function draftBio(
  input: BioDrafterInput,
  caller?: LLMCaller
): Promise<SkillResult<BioDrafterOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: input as unknown as Record<string, unknown>,
    outputSchema: BioDrafterOutput,
    skillName: 'bio-drafter',
    caller,
  });
}
