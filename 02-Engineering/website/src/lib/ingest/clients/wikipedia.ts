import { BaseClient } from './_base';
export class WikipediaClient extends BaseClient {
  protected source = 'wikipedia';
  protected baseUrl = 'https://es.wikipedia.org/api/rest_v1';
}
export const wikipediaClient = new WikipediaClient();
