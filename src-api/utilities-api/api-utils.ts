import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  baseUrl: string;
  loginEndpoint: string;
}

class ApiUtils {
  private baseUrl: string;
  private loginEndpoint: string;

  constructor(config: Partial<Config> = {}) {
    this.baseUrl = config.baseUrl || process.env.BASE_URL || 'https://authapi.wyzmindz.com/api';
    this.loginEndpoint = config.loginEndpoint || process.env.LOGIN_ENDPOINT || '/Auth/login';
  }

  public getLoginEndpoint(): string {
    return `${this.baseUrl}${this.loginEndpoint}`;
  }

  public getDefaultHeader(): Record<string, string> {
    return { 'Content-Type': 'application/json' };
  }

  public getDefaultHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  public buildLoginPayload(username?: string, password?: string): Record<string, string> {
    return {
      emailOrUsername: username || process.env.TEST_USERNAME || 'admin@wyzmindz.com',
      password: password || process.env.TEST_PASSWORD || 'Welcome@123!',
    };
  }
}

export default new ApiUtils();