import { Page, Locator, expect } from '@playwright/test';
import { DropdownUtils } from '../utils/dropdownUtils';
import { TextFieldUtils } from '../utils/textFieldUtils';
import { ButtonUtils } from '../utils/buttonUtils';
import { config } from '../config/test.config';

export class ProcessPage {
  readonly page: Page;

  // Locators
  readonly createProcessButton: Locator;
  readonly addProcessPopup: Locator;
  readonly processNameField: Locator;
  readonly processDescField: Locator;
  readonly processStatusDropdown: Locator;
  readonly saveAndContinueButton: Locator;
  readonly confirmationMessage: Locator;
  readonly continueButton: Locator;

  readonly subProcessTab: Locator;
  readonly selectProcessDropdown: Locator;
  readonly subProcessNameField: Locator;
  readonly subProcessDescField: Locator;
  readonly subProcessStatusDropdown: Locator;
  readonly saveAndContinueButtonInSubProcess: Locator;

  readonly subSubProcessTab: Locator;
  readonly subSubProcessNameField: Locator;
  readonly subSubProcessDescField: Locator;
  readonly subSubProcessDropdown: Locator;
  readonly saveUpdateButtonInSubSubProcess: Locator;
  readonly createSuccessMessage: Locator;

  readonly dataSetUpButton: Locator;
  readonly processTab: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.createProcessButton = page.locator('#create_process');

    //Process
    this.addProcessPopup = page.locator('xpath=(//div[@class="modal-dialog modal-md"]//div[@class="modal-content"])[1]');
    this.processNameField = page.locator('#process_name');
    this.processDescField = page.locator('#process_desc');
    this.processStatusDropdown = page.locator('#process_status');
    this.saveAndContinueButton = page.locator('#save_and_continnue');

    
    this.confirmationMessage = page.locator('.confirmationMessage');
    this.continueButton = page.locator('#continueButton');

    // Sub Process
    this.subProcessTab = page.locator('#subProcessTab');
    this.selectProcessDropdown = page.locator('#selectProcessDropdown');
    this.subProcessNameField = page.locator('#subProcessName');
    this.subProcessDescField = page.locator('#subProcessDescription');
    this.subProcessStatusDropdown = page.locator('#subProcessStatus');
    this.saveAndContinueButtonInSubProcess = page.locator('#saveAndContinueSubProcess');

    //Sub Sub Process
    this.subSubProcessTab = page.locator('#subSubProcessTab');
    this.subSubProcessNameField = page.locator('#subSubProcessName');
    this.subSubProcessDescField = page.locator('#subSubProcessDescription');
    this.subSubProcessDropdown = page.locator('#subSubProcessStatus');
    this.saveUpdateButtonInSubSubProcess = page.locator('#saveUpdateSubSubProcess');
    this.createSuccessMessage = page.locator('.createSuccessMessage');

    this.dataSetUpButton = page.locator('xpath=//span[normalize-space()="Data Setup"]');
    this.processTab = page.locator('#pills-Process-tab');
  }

  async createProcess(processName: string, processDesc: string) {
    await ButtonUtils.click(this.createProcessButton);
    await expect(this.addProcessPopup).toBeVisible();

    await TextFieldUtils.fillText(this.processNameField, processName);
    await TextFieldUtils.fillText(this.processDescField, processDesc);
    await DropdownUtils.selectByText(this.processStatusDropdown, 'Active');
    await ButtonUtils.click(this.saveAndContinueButton);

    if (await this.confirmationMessage.isVisible()) {
      await expect(this.confirmationMessage).toBeVisible();
      await ButtonUtils.click(this.continueButton);
    }

    await this.page.waitForTimeout(1000);
  }

  async createSubProcess(subProcessName: string, subProcessDesc: string) {
    await ButtonUtils.click(this.subProcessTab);
    await expect(this.selectProcessDropdown).toBeVisible(); // For dropdown validation if required

    await TextFieldUtils.fillText(this.subProcessNameField, subProcessName);
    await TextFieldUtils.fillText(this.subProcessDescField, subProcessDesc);
    await DropdownUtils.selectByText(this.subProcessStatusDropdown, 'Active');
    await ButtonUtils.click(this.saveAndContinueButtonInSubProcess);

    await this.page.waitForTimeout(1000);
  }

  async createSubSubProcess(subSubProcessName: string, subSubProcessDesc: string) {
    await ButtonUtils.click(this.subSubProcessTab);

    await TextFieldUtils.fillText(this.subSubProcessNameField, subSubProcessName);
    await TextFieldUtils.fillText(this.subSubProcessDescField, subSubProcessDesc);
    await DropdownUtils.selectByText(this.subSubProcessDropdown, 'Active');
    await ButtonUtils.click(this.saveUpdateButtonInSubSubProcess);

    await expect(this.createSuccessMessage).toBeVisible();
    await ButtonUtils.click(this.continueButton);

    await this.page.waitForTimeout(2000);
  }

  async navToProcess() {

  const expectedUrl = config.url+'en/data_management/process/';
  const currentUrl = this.page.url();

  // Only click the navigation buttons if you're not already on the process page
  if (!(await currentUrl).includes('/data_management/process')) {
    await ButtonUtils.click(this.dataSetUpButton);
    await ButtonUtils.click(this.processTab);

    // Optionally wait for the URL to change
    await this.page.waitForURL(expectedUrl, { timeout: 5000 });
  }
}
}
