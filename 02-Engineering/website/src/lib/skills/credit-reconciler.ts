import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const CreditReconcilerInput = z.object({
  track_title: z.string(),
  artist_name: z.string(),
  genius_credits: z.array(z.string()),
  spotify_credits: z.array(z.string()),
  mb_credits: z.array(z.string()),
});

export const CreditReconcilerOutput = z.object({
  producers: z.array(z.string()),
  writers: z.array(z.string()),
  engineers: z.array(z.string()),
  confidence: z.number().min(0).max(1),
  conflicts: z.array(z.string()),
});

export type CreditReconcilerInput = z.infer<typeof CreditReconcilerInput>;
export type CreditReconcilerOutput = z.infer<typeof CreditReconcilerOutput>;

const PROMPT = `
Reconcilia créditos de producción para "{{track_title}}" de {{artist_name}}.
Responde SOLO con JSON válido:
{"producers":[],"writers":[],"engineers":[],"confidence":0.0,"conflicts":[]}
`.trim();

export async function reconcileCredits(
  input: CreditReconcilerInput,
  caller?: LLMCaller
): Promise<SkillResult<CreditReconcilerOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: input as unknown as Record<string, unknown>,
    outputSchema: CreditReconcilerOutput,
    skillName: 'credit-reconciler',
    caller,
  });
}
