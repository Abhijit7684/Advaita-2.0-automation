import { Locator, expect } from '@playwright/test';

export class DropdownUtils {
  static async selectByText(dropdown: Locator, text: string) {
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption({ label: text });
  }

  static async selectByValue(dropdown: Locator, value: string) {
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption({ value });
  }

  static async getSelectedValue(dropdown: Locator): Promise<string> {
    return await dropdown.inputValue();
  }
}
