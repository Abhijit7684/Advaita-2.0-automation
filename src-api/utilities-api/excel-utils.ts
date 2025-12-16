import { Workbook, Worksheet } from 'exceljs';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

class ExcelUtils {
  private workbook: Workbook;
  private worksheet: Worksheet | undefined;
  private filePath: string;

  constructor() {
    this.workbook = new Workbook();
    this.filePath = process.env.EXCEL_FILE_PATH || './resource-api/api_resources.xlsx';
  }

  /**
   * Initialize sheet with "Attribute | Attribute Value" structure
   */
  private async initSheet(): Promise<void> {
    if (fs.existsSync(this.filePath)) {
      await this.workbook.xlsx.readFile(this.filePath);
      this.worksheet = this.workbook.getWorksheet('API_Resources') || undefined;
    }

    if (!this.worksheet) {
      this.worksheet = this.workbook.addWorksheet('API_Resources');
      this.worksheet.columns = [
        { header: 'Attribute', key: 'attribute', width: 30 },
        { header: 'Attribute Value', key: 'value', width: 50 },
      ];
    }
  }

  /**
   * Save/update resources in 2-column format:
   * Attribute | Attribute Value
   */
  public async saveResources(
  responseBody: any,
  keysToStore: string[] = ['token']
): Promise<void> {
  const dir = path.dirname(this.filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await this.initSheet();
  if (!this.worksheet) throw new Error('Worksheet not initialized');

  for (const key of keysToStore) {
    const value = responseBody[key] ? String(responseBody[key]) : '';

    console.log(`🔍 Trying to save key: ${key}, value: ${value}`);

    // Find existing row for this attribute
    let match = this.worksheet.getColumn(1).values
      .map((val, idx) => ({ val, idx }))
      .find((r) => r.val === key);

    if (match) {
      console.log(`✏️ Updating existing row for ${key}`);
      this.worksheet.getRow(match.idx).getCell(2).value = value;
      this.worksheet.getRow(match.idx).commit();
    } else {
      console.log(`➕ Adding new row for ${key}`);
      this.worksheet.addRow({ attribute: key, value });
    }
  }

  await this.workbook.xlsx.writeFile(this.filePath);
  console.log(`✅ Excel updated at: ${this.filePath}`);
}


  /**
   * Get stored value for a given attribute
   */
  public async getResource(attribute: string): Promise<string | null> {
    await this.initSheet();
    if (!this.worksheet) return null;

    const match = this.worksheet.getColumn(1).values
      .map((val, idx) => ({ val, idx }))
      .find((r) => r.val === attribute);

    if (!match) return null;

    const row = this.worksheet.getRow(match.idx);
    return row.getCell(2).value ? String(row.getCell(2).value) : null;
  }
}

export default new ExcelUtils();
