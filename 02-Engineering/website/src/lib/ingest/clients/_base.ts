export abstract class BaseClient {
  protected abstract source: string;
  protected abstract baseUrl: string;

  protected async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await globalThis.fetch(url, options);
    if (!response.ok) throw new Error(`${this.source} API error: ${response.status} ${response.statusText}`);
    return response.json() as Promise<T>;
  }
}
