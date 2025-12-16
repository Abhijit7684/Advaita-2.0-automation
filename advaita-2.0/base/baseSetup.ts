// // src/base/baseSetup.ts

// import { chromium, firefox, webkit, Browser, Page } from '@playwright/test';
// import { LoginPage } from '../pages/login-page';
// import { ProcessPage } from '../pages/processPage';
// import { config } from '../config/test.config';

// export class BaseSetup {
//   browser!: Browser;
//   page!: Page;
//   loginPage!: LoginPage;
//   processPage!: ProcessPage;

//   async launchApplication() {
//     const browserType = config.browser;
//     const launchOptions = {
//       headless: config.headless,
//       slowMo: config.slowMo,
//       args: ['--start-maximized'] // Start browser maximized
    
//     };

//     // Launch selected browser
    
//     if (browserType === 'firefox') {
//       this.browser = await firefox.launch(launchOptions);
//     } else if (browserType === 'webkit') {
//       this.browser = await webkit.launch(launchOptions);
//     } else {
//       this.browser = await chromium.launch(launchOptions);
//     }

//       // Create a new browser context with no fixed viewport (fullscreen)
//   const context = await this.browser.newContext({
//     viewport: config.viewport, // Let the browser decide the full size
//     deviceScaleFactor: undefined // explicitly unset it to avoid conflict
//   });

//     // const context = await this.browser.newContext();
//     this.page = await context.newPage();
//     this.loginPage = new LoginPage(this.page);
//     this.processPage = new ProcessPage(this.page);

//     await this.page.goto(config.url);
//   }

//   async closeApplication() {
//     await this.browser.close();
//   }
// }



// ================== New One ==================
// src/base/baseSetup.ts

// import { chromium, firefox, webkit, Browser, Page, BrowserContext } from '@playwright/test';
// import { LoginPage } from '../pages/login-page';
// import { ProcessPage } from '../pages/processPage';
// import { config } from '../config/test.config';

// export class BaseSetup {
//   browser!: Browser;
//   context!: BrowserContext;
//   page!: Page;

//   loginPage!: LoginPage;


//   async launchApplication() {

//     // 1️⃣ Select Browser
//     const browserType = config.browser;
//     const launchOptions = {
//       headless: config.headless,
//       slowMo: config.slowMo,
//       args: ['--start-maximized']
//     };

//     if (browserType === "firefox") {
//       this.browser = await firefox.launch(launchOptions);
//     } else if (browserType === "webkit") {
//       this.browser = await webkit.launch(launchOptions);
//     } else {
//       this.browser = await chromium.launch(launchOptions);
//     }

//     // 2️⃣ Create Context (with full-screen viewport)
//     this.context = await this.browser.newContext({
//       viewport: null,              // allows full-screen window
//       deviceScaleFactor: undefined
//     });

//     // 3️⃣ Create Page
//     this.page = await this.context.newPage();

//     // 4️⃣ Initialize Page Objects using SAME page
//     this.loginPage = new LoginPage(this.page);
   

//     // 5️⃣ Navigate to App URL
//     await this.page.goto(config.url);
//   }

//   async closeApplication() {
//     await this.browser.close();
//   }
// }


//New code Updated one_15_========================>>>>>

//src/base/baseSetup.ts

export class BaseSetup {

  // General wait helper
  async wait(seconds: number) {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  // Logging helper
  log(message: string) {
    console.log(`[BaseSetup] ${message}`);
  }

  // Generate Random Email
  generateRandomEmail() {
    return `user_${Date.now()}@test.com`;
  }

  // Common assertion wrapper (optional)
  async assertVisible(
    page: { locator: (selector: string) => { waitFor: (opts: { state: 'visible' | 'hidden' | 'attached' | 'detached' }) => Promise<void> } },
    locator: string
  ): Promise<void> {
    await page.locator(locator).waitFor({ state: 'visible' });
  }

}
