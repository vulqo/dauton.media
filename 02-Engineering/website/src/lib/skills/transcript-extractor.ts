import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const TranscriptExtractorInput = z.object({
  video_title: z.string(),
  transcript_raw: z.string(),
  subject_stage_name: z.string(),
});

export const TranscriptExtractorOutput = z.object({
  mentions: z.array(z.object({
    timestamp_seconds: z.number().nullable(),
    quote: z.string(),
    context: z.string(),
  })),
  facts: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

export type TranscriptExtractorInput = z.infer<typeof TranscriptExtractorInput>;
export type TranscriptExtractorOutput = z.infer<typeof TranscriptExtractorOutput>;

const PROMPT = `
Del transcript de "{{video_title}}", extrae menciones y hechos sobre {{subject_stage_name}}.
Responde SOLO con JSON válido:
{"mentions":[],"facts":[],"confidence":0.0}
`.trim();

export async function extractTranscript(
  input: TranscriptExtractorInput,
  caller?: LLMCaller
): Promise<SkillResult<TranscriptExtractorOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: input as unknown as Record<string, unknown>,
    outputSchema: TranscriptExtractorOutput,
    skillName: 'transcript-extractor',
    caller,
  });
}
