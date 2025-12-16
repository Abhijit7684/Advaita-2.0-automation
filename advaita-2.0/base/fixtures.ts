// import { test as base, expect, Page } from '@playwright/test';
// import { LoginPage } from '../pages/login-page';
// import { ProcessPage } from '../pages/processPage';
// import { config } from '../config/test.config';

// // Extend Playwright base fixtures
// export const test = base.extend<{
//   loginPage: LoginPage;
 
// }>({

//   // Create loginPage using Playwright's built-in page
//   loginPage: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);
//     await use(loginPage);
//   },

 

// });

// export { expect };


// // new Updated code==============
// import { test as base, expect } from '@playwright/test';
// import { LoginPage } from '../pages/login-page';
// import TenantPage from '../pages/tenant/page/tenanat-page';


// export const test = base.extend<{ loginPage: LoginPage }>({
//   loginPage: async ({ page }, use) => {
//     await use(new LoginPage(page));
//   },
// });



// export { expect };


import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import TenantPage from '../pages/tenant/page/tenanat-page';
import { SideMenuNavigations } from '../utils/side-menus-navigations';

/**
 * 1️⃣ Define all custom fixtures here
 */
export type AppFixtures = {
  page: Page;
  loginPage: LoginPage;
 // tenantPage: TenantPage;
  sideMenuNavigations: SideMenuNavigations;
};

/**
 * 2️⃣ Extend Playwright test with custom fixtures
 */
export const test = base.extend<AppFixtures>({

  /**
   * Base page fixture (Playwright already provides page,
   * but we keep this for clarity & future customization)
   */
  page: async ({ page }, use) => {
    await use(page);
  },

  /**
   * Login Page fixture
   */
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  /**
   * Side menu navigation fixture
   */
  sideMenuNavigations: async ({ page }, use) => {
    await use(new SideMenuNavigations(page));
  },

  /**
   * Tenant Page fixture
   */
  // tenantPage: async ({ page }, use) => {
  //   await use(new TenantPage(page));
  // },

});

export { expect };

