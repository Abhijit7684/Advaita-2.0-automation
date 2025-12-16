// src/utils/assertUtils.ts
import { Locator, expect } from '@playwright/test';

export class AssertUtils {
  static async isVisible(locator: Locator, message: string = 'Element should be visible') {
    await expect(locator, message).toBeVisible();
  }

  static async isHidden(locator: Locator, message: string = 'Element should be hidden') {
    await expect(locator, message).toBeHidden();
  }

  static async hasText(locator: Locator, expectedText: string, message: string = '') {
    await expect(locator, message).toHaveText(expectedText);
  }

  static async hasValue(locator: Locator, expectedValue: string, message: string = '') {
    await expect(locator, message).toHaveValue(expectedValue);
  }

  static async isEnabled(locator: Locator, message: string = 'Element should be enabled') {
    await expect(locator, message).toBeEnabled();
  }

  static async isDisabled(locator: Locator, message: string = 'Element should be disabled') {
    await expect(locator, message).toBeDisabled();
  }

  static async count(locator: Locator, expectedCount: number, message: string = '') {
    await expect(locator, message).toHaveCount(expectedCount);
  }
}