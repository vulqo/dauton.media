import { BaseClient } from './_base';
export class YouTubeClient extends BaseClient {
  protected source = 'youtube';
  protected baseUrl = 'https://www.googleapis.com/youtube/v3';
}
export const youtubeClient = new YouTubeClient();
