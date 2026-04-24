import { BaseClient } from './_base';
export class FirecrawlClient extends BaseClient {
  protected source = 'firecrawl';
  protected baseUrl = 'https://api.firecrawl.dev/v0';
}
export const firecrawlClient = new FirecrawlClient();
