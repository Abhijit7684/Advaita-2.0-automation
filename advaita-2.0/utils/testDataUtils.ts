// src/utils/testDataUtils.ts
import { faker } from '@faker-js/faker';
import { ExcelUtils } from './excelUtils';

export class TestDataUtils {

  static generateRealisticFakerData(filePath: string, sheetName: string) {
    // Generate process data
    const processName = faker.company.buzzPhrase(); // e.g. "Optimize Customer Solutions"
    const processDesc = "P Desc"; // e.g. "Empowering seamless experiences"

    // Generate subprocess
    const subProcessName = faker.hacker.verb() + ' ' + faker.commerce.department(); // e.g. "navigate Tools"
    const subProcessDesc = "SP Desc" // e.g. "Use the neural SMS feed, then you can transmit the online alarm!"

    // Generate sub-sub process
    const subSubProcessName = faker.commerce.productName(); // e.g. "AI Compliance Scanner"
    const subSubProcessDesc = "SSP Desc" // e.g. "Ensure proper validation of submitted documents."

    // Write to Excel
    ExcelUtils.writeKeyValue(filePath, sheetName, {
      processName,
      processDesc,
      subProcessName,
      subProcessDesc,
      subSubProcessName,
      subSubProcessDesc
    });

    return {
      processName,
      processDesc,
      subProcessName,
      subProcessDesc,
      subSubProcessName,
      subSubProcessDesc
    };
  }

  static getValue(key: string): string {
    return ExcelUtils.getValueByKey('src/testdata/processData.xlsx', 'Process', key) ?? '';
  }
}
