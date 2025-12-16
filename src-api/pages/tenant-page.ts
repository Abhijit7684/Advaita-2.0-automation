import { APIRequestContext, expect } from "@playwright/test";
import tenantUtils from "../utilities-api/tenant-utils";
import excelUtils from "../utilities-api/excel-utils";
import jsonUtils from "../resource-api/jsonUtils";

class TenantPage {
  private request: APIRequestContext;
  private tenantEndpoint: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.tenantEndpoint = tenantUtils.getTenantEndpoint();
  }

  public async createTenant(
    token: string | null,
    payload: Record<string, any>,
    customHeaders?: Record<string, string>
  ) {
    const headers =
      token === null
        ? tenantUtils.getDefaultHeaders(undefined) // no token
        : tenantUtils.getDefaultHeaders(token);

    // console.log("Request Headers:", JSON.stringify(headers, null, 2));
    // console.log("Request Payload:", JSON.stringify(payload, null, 2));
    return await this.request.post(this.tenantEndpoint, {
      headers: customHeaders || headers,
      data: payload,
    });
  }

  public async validateTenantCreated(response: any) {
    // console.log("Response Body:", JSON.stringify(response, null, 2));

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    const tenantData = responseBody.data;
    // console.log('Response Body:', JSON.stringify(responseBody, null, 2));

    expect(tenantData).toHaveProperty("id");
    expect(tenantData.name).toBeDefined();
    expect(tenantData.domain).toBeDefined();

    console.log("tenantId : " + tenantData.id);

    // await excelUtils.saveResources(responseBody, ['id']);
    jsonUtils.saveValue("tenantId", tenantData.id);
  }

  public async validateTenantFailed(
    response: any,
    expectedStatus: number,
    expectedMessage?: string
  ) {
    expect(response.status()).toBe(expectedStatus);
    const responseBody = await response.json();
    if (expectedMessage) {
      expect(JSON.stringify(responseBody)).toContain(expectedMessage);
    }
  }
}

export default TenantPage;
