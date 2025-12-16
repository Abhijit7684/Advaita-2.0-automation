import { APIRequestContext, request } from '@playwright/test';
import { TokenManager } from '../utilities-api/tokenManager';

export class BaseApi {
  protected apiContext!: APIRequestContext;

  /**
   * Initialize APIRequestContext with default base URL
   */
  async init() {
    this.apiContext = await request.newContext({
      baseURL: 'https://authapi.wyzmindz.com/api'
    });
  }

  /**
   * Returns headers including Bearer token if available
   */
  protected getAuthHeaders(additionalHeaders: Record<string, string> = {}) {
    const token = TokenManager.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...additionalHeaders
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }
}
