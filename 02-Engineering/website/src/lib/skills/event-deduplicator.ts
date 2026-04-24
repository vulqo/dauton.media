import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const EventDeduplicatorInput = z.object({
  event_a: z.record(z.string(), z.unknown()),
  event_b: z.record(z.string(), z.unknown()),
});

export const EventDeduplicatorOutput = z.object({
  are_same: z.boolean(),
  confidence: z.number().min(0).max(1),
  canonical: z.record(z.string(), z.unknown()).nullable(),
});

export type EventDeduplicatorInput = z.infer<typeof EventDeduplicatorInput>;
export type EventDeduplicatorOutput = z.infer<typeof EventDeduplicatorOutput>;

const PROMPT = `
Determina si dos eventos son el mismo. Responde SOLO con JSON válido:
{"are_same":false,"confidence":0.0,"canonical":null}
`.trim();

export async function deduplicateEvent(
  input: EventDeduplicatorInput,
  caller?: LLMCaller
): Promise<SkillResult<EventDeduplicatorOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: input as unknown as Record<string, unknown>,
    outputSchema: EventDeduplicatorOutput,
    skillName: 'event-deduplicator',
    caller,
  });
}
