import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const EntityResolverInput = z.object({
  query: z.string(),
  entity_type: z.enum(['person', 'release', 'track', 'crew', 'label']),
  candidates: z.array(z.record(z.string(), z.unknown())),
});

export const EntityResolverOutput = z.object({
  resolved_id: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
});

export type EntityResolverInput = z.infer<typeof EntityResolverInput>;
export type EntityResolverOutput = z.infer<typeof EntityResolverOutput>;

const PROMPT = `
Resuelve qué entidad de tipo {{entity_type}} corresponde a "{{query}}".
Responde SOLO con JSON válido:
{"resolved_id":null,"confidence":0.0,"reasoning":"..."}
`.trim();

export async function resolveEntity(
  input: EntityResolverInput,
  caller?: LLMCaller
): Promise<SkillResult<EntityResolverOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: input as unknown as Record<string, unknown>,
    outputSchema: EntityResolverOutput,
    skillName: 'entity-resolver',
    caller,
  });
}
