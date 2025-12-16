import { test, expect } from '../base/fixtures';
import { config } from '../config/test.config';

test.describe('Tenant Module', () => {

  test.beforeEach(async ({ page, loginPage }) => {
    // Navigate to app
   // await page.goto('https://advaita-one.wyzmindz.com/login');
    await page.goto(config.url);

    // Login before every test
    await loginPage.login('admin@mail.com', 'admin');
  });

  test('Ten_001_Test Tenant Page', async ({ page, sideMenuNavigations }) => {

    // Navigate using side menu
    await sideMenuNavigations.goToSideMenu('/tenants/list');

    // Assertion
    await expect(page).toHaveURL(/tenants\/list/);
  });

});
