import { Page, Locator, expect } from '@playwright/test';


export class SideMenuNavigations {

  //Final Locators
  readonly page: Page;
  readonly sidebar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('nav.sidebar-nav');
  }

  /**
   * Navigate using href value
   * Example: /users/list
   */
  async goToSideMenu(href: string) {

    //Side navigation WEB ELEMENT
    const menuItem = this.sidebar.locator(`a[href="${href}"]`);

    await expect(menuItem).toBeVisible();

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      menuItem.click()
    ]);
  }
}
