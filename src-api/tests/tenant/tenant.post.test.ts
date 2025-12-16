import { test } from "@playwright/test";
import LoginPage from "../../pages/login-page";
import TenantPage from "../../pages/tenant-page";
import tenantUtils from "../../utilities-api/tenant-utils";
import jsonUtils from "../../resource-api/jsonUtils";

let token: string;

test.beforeAll(async ({ request }) => {
  const loginPage = new LoginPage(request);
  const response = await loginPage.login();
  await loginPage.validateSuccessfulLogin(response);
  token = jsonUtils.getValue("token");
});

test.describe("Tenant API Tests", () => {
  test("TC-Tenant-001: Create Tenant with valid credentials", async ({
    request,
  }) => {
    const tenantPage = new TenantPage(request);
    const payload = tenantUtils.buildTenantPayload({
      name: "TestTenantAA09",
      domain: "testtenantAA09.com",
    });

    const response = await tenantPage.createTenant(token, payload);

    // console.log(await response.text());
    await tenantPage.validateTenantCreated(response);
  });

  test("TC-Tenant-005: Create Tenant with duplicate data", async ({
    request,
  }) => {
    const tenantPage = new TenantPage(request);
    const payload = tenantUtils.buildTenantPayload({
      name: "TestTenantAA09",
      domain: "testtenantAA09.com",
    });

    const response = await tenantPage.createTenant(token, payload);
    await tenantPage.validateTenantFailed(response, 400, "already exists");
  });

  test("TC-Tenant-011: Create Tenant without Bearer token", async ({
    request,
  }) => {
    const tenantPage = new TenantPage(request);
    const payload = tenantUtils.buildTenantPayload({ name: "TestTenantX" });

    const response = await tenantPage.createTenant(null, payload);
    await tenantPage.validateTenantFailed(response, 401, "Unauthorized");
  });

  test("TC-Tenant-012: Create Tenant with empty Bearer token", async ({
    request,
  }) => {
    const tenantPage = new TenantPage(request);
    const payload = tenantUtils.buildTenantPayload({ name: "TestTenantY" });

    const headers = tenantUtils.getDefaultHeaders("");
    const response = await tenantPage.createTenant("", payload, headers);
    await tenantPage.validateTenantFailed(response, 401, "Unauthorized");
  });
});
