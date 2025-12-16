import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';

test.describe('Login API Tests', () => {

  test('TC-Login-001: Login with valid credentials', async ({ request }) => {
    const loginPage = new LoginPage(request);

    const response = await loginPage.login();

    await loginPage.validateSuccessfulLogin(response);
  });

  test('TC-Login-002: Login with valid username & invalid password', async ({ request }) => {
    const loginPage = new LoginPage(request);

    const response = await loginPage.login("admin@wyzmindz.com", "Qwerty@123!");

    await loginPage.validateFailedLogin(response, 400, "Invalid credentials");
  });

  test('TC-Login-003: Login with invalid username & valid password', async ({ request }) => {
    const loginPage = new LoginPage(request);

    const response = await loginPage.login("Super@wyzmindz.com", "Welcome@123!");

    await loginPage.validateFailedLogin(response, 400, "Invalid credentials");
  });

  test('TC-Login-004: Login with invalid username & invalid password', async ({ request }) => {
    const loginPage = new LoginPage(request);

    const response = await loginPage.login("xyz@wyz.com", "Comewel@123!");

    await loginPage.validateFailedLogin(response, 400, "Invalid credentials");
  });

  test('TC-Login-005: Login with blank username & valid password', async ({ request }) => {
    const loginPage = new LoginPage(request);

    const response = await loginPage.login(null, "Welcome@123!");

    await loginPage.validateFailedLogin(response, 400, "Invalid credentials");
  });

  test('TC-Login-006: Login with valid username & blank password', async ({ request }) => {
    const loginPage = new LoginPage(request);

    const response = await loginPage.login("admin@wyzmindz.com", null);

    await loginPage.validateFailedLogin(response, 400, "Invalid credentials");
  });

  test('TC-Login-014: Login without headers', async ({ request }) => {
    const loginPage = new LoginPage(request);

    const response = await loginPage.login("admin@wyzmindz.com", "Welcome@123!", null); // empty headers

    await loginPage.validateFailedLogin(response, 400);
  });

  test('TC-Login-015: Login with invalid Content-Type', async ({ request }) => {
    const loginPage = new LoginPage(request);

     // custom headers override default headers
  const customHeaders = {
    "Content-Type": "text/plain"
  };

    const response = await loginPage.login("admin@wyzmindz.com", "Welcome@123!",customHeaders);

    console.log('Login with invalid Content-Type : '+response);

    await loginPage.validateFailedLogin(response, 415);
  });

  test('TC-Login-018: Login without request body', async ({ request }) => {
    const loginPage = new LoginPage(request);

   const response = await loginPage.login(null, null, undefined, true);
   await loginPage.validateFailedLogin(response, 400);

  });

});
