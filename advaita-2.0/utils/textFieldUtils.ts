import { Locator, expect } from '@playwright/test';

export class TextFieldUtils {
  static async fillText(field: Locator, text: string) {
    await expect(field).toBeVisible();
    await field.fill(text);
  }

  static async appendText(field: Locator, text: string) {
    await expect(field).toBeVisible();
    const current = await field.inputValue();
    await field.fill(current + text);
  }

  static async clearField(field: Locator) {
    await expect(field).toBeVisible();
    await field.fill('');
  }

  static async getText(field: Locator): Promise<string> {
    return await field.inputValue();
  }
}
