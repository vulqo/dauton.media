import { z } from 'zod';

export type SkillResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; raw_response?: string };

export interface LLMCaller {
  call(prompt: string): Promise<string>;
}

/**
 * ClaudeMaxManualCaller: writes input to _pending_skills/{skill}/{id}.input.json
 * and waits for Luis to execute via Claude Code session, then reads .output.json
 */
export class ClaudeMaxManualCaller implements LLMCaller {
  constructor(private skillName: string, private itemId: string) {}
  async call(_prompt: string): Promise<string> {
    throw new Error(
      `Manual execution required. Write input to _pending_skills/${this.skillName}/${this.itemId}.input.json and run the skill manually in Claude Code.`
    );
  }
}

/** MockCaller for tests */
export class MockCaller implements LLMCaller {
  constructor(private response: string) {}
  async call(_prompt: string): Promise<string> {
    return this.response;
  }
}

/** AnthropicAPICaller: placeholder for future API access */
export class AnthropicAPICaller implements LLMCaller {
  async call(_prompt: string): Promise<string> {
    throw new Error('AnthropicAPICaller not configured. Set ANTHROPIC_API_KEY and implement.');
  }
}

export async function callClaudeWithSchema<T>(args: {
  prompt: string;
  input: Record<string, unknown>;
  outputSchema: z.ZodType<T>;
  skillName: string;
  caller?: LLMCaller;
}): Promise<SkillResult<T>> {
  const caller = args.caller ?? new ClaudeMaxManualCaller(args.skillName, crypto.randomUUID());
  const filledPrompt = args.prompt.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    JSON.stringify(args.input[key] ?? null)
  );
  let raw: string;
  try {
    raw = await caller.call(filledPrompt);
  } catch (e: any) {
    return { success: false, error: e.message };
  }
  // Parse JSON from response
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return { success: false, error: 'No JSON found in response', raw_response: raw };
  try {
    const parsed = JSON.parse(jsonMatch[0]);
    const validated = args.outputSchema.safeParse(parsed);
    if (!validated.success) {
      return { success: false, error: validated.error.message, raw_response: raw };
    }
    return { success: true, data: validated.data };
  } catch (e: any) {
    return { success: false, error: `JSON parse error: ${e.message}`, raw_response: raw };
  }
}
