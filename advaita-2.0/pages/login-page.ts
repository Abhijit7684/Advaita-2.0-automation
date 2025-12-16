import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[name="username"]'); // Update selector as per your app
    this.passwordInput = page.locator('[name="password"]'); // Update selector as per your app
    this.loginButton = page.locator('button[type="submit"]'); // Update if needed
  }


  // Navigate to login URL (optional if baseSetup navigates already)
  async navigateToLogin(url: string) {
    await this.page.goto(url);
  }

  //Username
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  //Password
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  //Click Login Button
  async clickLogin() {
    await this.loginButton.click();

  }

  // Perform login with provided credentials
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

}
