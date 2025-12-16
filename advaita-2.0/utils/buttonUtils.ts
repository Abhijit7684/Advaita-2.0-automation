import { Locator, expect } from '@playwright/test';
import { AssertUtils } from './assertUtils';


export class ButtonUtils {
  static async click(button: Locator) {
    // await expect(button).toBeVisible();
    AssertUtils.isVisible(button);
    await button.click();
  }

  static async clickIfVisible(button: Locator) {
    if (await button.isVisible()) {
      await button.click();
    }
  }
}
