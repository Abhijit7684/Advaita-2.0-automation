// src/utils/excelUtils.ts
import * as xlsx from 'xlsx';

export class ExcelUtils {
    
  static writeKeyValue(filePath: string, sheetName: string, data: Record<string, string>) {
    const json = Object.entries(data).map(([key, value]) => ({ Key: key, Value: value }));
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(workbook, sheet, sheetName);
    xlsx.writeFile(workbook, filePath);
  }

  static getValueByKey(filePath: string, sheetName: string, key: string): string | undefined {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json<Record<string, string>>(sheet);
    return json.find(row => row.Key === key)?.Value;
  }
}
