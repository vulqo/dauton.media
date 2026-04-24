import { BaseClient } from './_base';
export class MusicBrainzClient extends BaseClient {
  protected source = 'musicbrainz';
  protected baseUrl = 'https://musicbrainz.org/ws/2';
}
export const musicBrainzClient = new MusicBrainzClient();
