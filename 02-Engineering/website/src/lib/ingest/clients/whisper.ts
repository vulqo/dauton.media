import { BaseClient } from './_base';
export class WhisperClient extends BaseClient {
  protected source = 'whisper';
  protected baseUrl = 'https://api.openai.com/v1/audio';
}
export const whisperClient = new WhisperClient();
