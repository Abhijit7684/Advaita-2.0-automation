import { APIRequestContext, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import apiUtils from "../utilities-api/api-utils";
import excelUtils from "../utilities-api/excel-utils";
import jsonUtils from "../resource-api/jsonUtils";

dotenv.config();

class LoginPage {
  private request: APIRequestContext;
  private loginEndpoint: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.loginEndpoint = apiUtils.getLoginEndpoint();
  }

  public async login(
    username?: string | null,
    password?: string | null,
    headers?: Record<string, string> | null,
    forceEmptyPayload: boolean = false
  ): Promise<any> {
    // Force empty payload scenario
    if (forceEmptyPayload) {
      return await this.request.post(this.loginEndpoint, {
        headers:
          headers === null ? undefined : headers ?? apiUtils.getDefaultHeader(),
        data: {},
      });
    }

    // Build payload: no fallback to env vars if explicit null is passed
    const loginPayload: Record<string, any> = {
      emailOrUsername:
        username === undefined
          ? process.env.TEST_USERNAME ?? "admin@wyzmindz.com" // only when undefined
          : username ?? "", // if null -> blank
      password:
        password === undefined
          ? process.env.TEST_PASSWORD ?? "Welcome@123!"
          : password ?? "", // if null -> blank
    };

    let finalHeaders: Record<string, string> | undefined;
    if (headers === null) {
      // no headers at all
      finalHeaders = undefined;
    } else if (headers) {
      // custom headers
      finalHeaders = headers;
    } else {
      // default headers
      finalHeaders = apiUtils.getDefaultHeader();
    }

    return await this.request.post(this.loginEndpoint, {
      headers: finalHeaders,
      data: loginPayload,
    });
  }

  public async validateSuccessfulLogin(response: any): Promise<void> {
    console.log("Response Body:", JSON.stringify(response, null, 2));
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("token");
    expect(typeof responseBody.token).toBe("string");
    expect(responseBody.token.length).toBeGreaterThan(0);

    // ✅ Save token only for successful login
    // await excelUtils.saveResources(responseBody, ['token']);
    jsonUtils.saveValue("token", responseBody.token);
  }

  public async validateFailedLogin(
    response: any,
    expectedStatus: number,
    expectedMessage?: string
  ): Promise<void> {
    // console.log(response.status());
    expect(response.status()).toBe(expectedStatus);
    const responseBody = await response.json();
    if (expectedMessage) {
      expect(responseBody.error || responseBody.message).toContain(
        expectedMessage
      );
    }
  }
}

export default LoginPage;
