import * as fs from 'fs';
import * as path from 'path';

class JsonUtils {
  private filePath: string;

  constructor(fileName: string = 'api_resources.json') {
    this.filePath = path.join(process.cwd(), 'src-api', 'resource-api', fileName);

    // Ensure directory exists
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Create file if not exists
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({}, null, 2));
    }
  }

  /** Save or update a key-value pair without removing other keys */
  public saveValue(key: string, value: any) {
    let data: Record<string, any> = {};

    try {
      data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    } catch (err) {
      console.warn('⚠️ Could not read JSON file, initializing new object');
      data = {};
    }

    // Only update the value of existing key or add new key
    data[key] = value;

    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Updated ${key} = ${value}`);
  }

  /** Retrieve a value by key */
  public getValue(key: string): any {
    try {
      const data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      return data[key];
    } catch (err) {
      console.error('❌ Could not read JSON file');
      return null;
    }
  }
}

export default new JsonUtils();
