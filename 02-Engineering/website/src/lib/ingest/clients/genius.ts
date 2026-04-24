import { BaseClient } from './_base';
export class GeniusClient extends BaseClient {
  protected source = 'genius';
  protected baseUrl = 'https://api.genius.com';
}
export const geniusClient = new GeniusClient();
