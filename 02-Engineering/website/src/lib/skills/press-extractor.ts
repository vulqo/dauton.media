import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const PressExtractorInput = z.object({
  url: z.string().url(),
  raw_html: z.string(),
  subject_stage_name: z.string(),
});

export const PressExtractorOutput = z.object({
  title: z.string().nullable(),
  author_name: z.string().nullable(),
  published_date: z.string().nullable(),
  excerpt: z.string().max(500).nullable(),
  prominence: z.enum(['main', 'mentioned', 'quoted']),
  quote_es: z.string().nullable(),
  confidence: z.number().min(0).max(1),
});

export type PressExtractorInput = z.infer<typeof PressExtractorInput>;
export type PressExtractorOutput = z.infer<typeof PressExtractorOutput>;

const PROMPT = `
Extrae información de prensa de este artículo sobre {{subject_stage_name}}.
URL: {{url}}

Responde SOLO con JSON válido:
{"title":null,"author_name":null,"published_date":null,"excerpt":null,"prominence":"mentioned","quote_es":null,"confidence":0.0}
`.trim();

export async function extractPress(
  input: PressExtractorInput,
  caller?: LLMCaller
): Promise<SkillResult<PressExtractorOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: { url: input.url, subject_stage_name: input.subject_stage_name } as Record<string, unknown>,
    outputSchema: PressExtractorOutput,
    skillName: 'press-extractor',
    caller,
  });
}
