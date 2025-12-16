import * as dotenv from 'dotenv';
import { config } from '../resource-api/api.config';

// src-api\resource-api\api.config.ts


dotenv.config();

interface TenantPayload {
  name: string;
  displayName?: string;
  description?: string;
  domain: string;
  allowedDomains?: string[];
  keycloakSettings?: {
    realmId?: string;
    clientId?: string;
    clientSecret?: string;
  };
}

class TenantUtils {
  private baseUrl: string;
  private tenantEndpoint: string;

  constructor() {
    this.baseUrl = config.url;
    this.tenantEndpoint = `${this.baseUrl}/Tenant`;
  }

  public getTenantEndpoint(): string {
    return this.tenantEndpoint;
  }

  public getDefaultHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  public buildTenantPayload(
    overrides: Partial<TenantPayload> = {}
  ): TenantPayload {
    return {
      name: overrides.name || 'TestTenantA01',
      displayName: overrides.displayName || 'Test Tenant 001',
      description: overrides.description || 'First Test Tenant',
      domain: overrides.domain || 'testtenantA01.com',
      allowedDomains: overrides.allowedDomains || ['testtenant.com', 'demotenant.com'],
      keycloakSettings: overrides.keycloakSettings || {
        realmId: 'testRealm',
        clientId: 'testClientId',
        clientSecret: 'testClientSecret',
      },
    };
  }
}

export default new TenantUtils();
