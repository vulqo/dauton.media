import { BaseClient } from './_base';
export class BraveClient extends BaseClient {
  protected source = 'brave';
  protected baseUrl = 'https://api.search.brave.com/res/v1';
}
export const braveClient = new BraveClient();
