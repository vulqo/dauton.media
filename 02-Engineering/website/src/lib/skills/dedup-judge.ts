import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const DedupJudgeInput = z.object({
  entity_type: z.enum(['person', 'release', 'track']),
  candidate_a: z.record(z.string(), z.unknown()),
  candidate_b: z.record(z.string(), z.unknown()),
});

export const DedupJudgeOutput = z.object({
  are_same: z.boolean(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
});

export type DedupJudgeInput = z.infer<typeof DedupJudgeInput>;
export type DedupJudgeOutput = z.infer<typeof DedupJudgeOutput>;

const PROMPT = `
Determina si dos entidades de tipo {{entity_type}} son el mismo elemento.
Responde SOLO con JSON válido:
{"are_same":false,"confidence":0.0,"reasoning":"..."}
`.trim();

export async function judgeDedup(
  input: DedupJudgeInput,
  caller?: LLMCaller
): Promise<SkillResult<DedupJudgeOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: input as unknown as Record<string, unknown>,
    outputSchema: DedupJudgeOutput,
    skillName: 'dedup-judge',
    caller,
  });
}
