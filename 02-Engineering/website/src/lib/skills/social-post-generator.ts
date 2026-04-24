import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult, type LLMCaller } from './_shared';

export const SocialPostGeneratorInput = z.object({
  entity_type: z.enum(['person', 'release', 'article']),
  entity_data: z.record(z.string(), z.unknown()),
  platform: z.enum(['twitter', 'instagram', 'threads']),
});

export const SocialPostGeneratorOutput = z.object({
  post: z.string().max(500),
  hashtags: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

export type SocialPostGeneratorInput = z.infer<typeof SocialPostGeneratorInput>;
export type SocialPostGeneratorOutput = z.infer<typeof SocialPostGeneratorOutput>;

const PROMPT = `
Genera un post para {{platform}} sobre este {{entity_type}} del archivo.
Sin hype. Sin emojis. Máximo 280 caracteres sin hashtags.
Responde SOLO con JSON válido:
{"post":"...","hashtags":[],"confidence":0.0}
`.trim();

export async function generateSocialPost(
  input: SocialPostGeneratorInput,
  caller?: LLMCaller
): Promise<SkillResult<SocialPostGeneratorOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input: input as unknown as Record<string, unknown>,
    outputSchema: SocialPostGeneratorOutput,
    skillName: 'social-post-generator',
    caller,
  });
}
