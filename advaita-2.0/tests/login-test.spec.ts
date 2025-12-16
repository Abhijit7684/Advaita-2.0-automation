// import { test, expect } from '../base/fixtures';
// import { BaseSetup } from '../base/baseSetup';
// import { config } from '../config/test.config';

// let base: BaseSetup;

// test.describe('Login Test Suite', () => {

//   test.beforeAll(async () => {
//     // Launch browser & page using BaseSetup
//     base = new BaseSetup();
//     await base.launchApplication();
//   });

//   test('Login Test', async ({ loginPage }) => {

//     // Now loginPage is created by FIXTURE, not BaseSetup

//     // If your BaseSetup already navigates to URL, no need to call goToLogin

//     await loginPage.enterUsername(config.credentials.username);
//     await loginPage.enterUsername(config.credentials.username);
//     await loginPage.enterPassword(config.credentials.password);
//     await loginPage.clickLogin();

//     // Expect dashboard or any post-login element
//     await expect(base.page).toHaveURL(/dashboard/); 
//   });

//   test.afterAll(async () => {
//     await base.closeApplication();
//   });

// });


//New Updated Code 
import { test, expect } from '../base/fixtures';
import { config } from '../config/test.config';

test('Login Test', async ({ page }) => {

  await page.goto(config.url);

  // Local page-object helper so test does not rely on a missing fixture
  const loginPage = {
    enterUsername: async (username: string) => {
      await page.fill('input[name="username"]', username);
    },
    enterPassword: async (password: string) => {
      await page.fill('input[name="password"]', password);
    },
    clickLogin: async () => {
      await page.click('button[type="submit"]');
    },
  };

  await loginPage.enterUsername(config.credentials.username);
  await loginPage.enterPassword(config.credentials.password);
  await loginPage.clickLogin();

  await expect(page).toHaveURL(/dashboard/);

});
