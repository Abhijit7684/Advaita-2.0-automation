// src/utils/testDataGenerator.ts
import { faker } from '@faker-js/faker';
import { ExcelUtils } from './excelUtils';

const filePath = 'src/testdata/processData.xlsx';
const sheetName = 'Process';

const fakeData = [
  { Key: 'fullName', Value: faker.person.fullName() },
  { Key: 'email', Value: faker.internet.email() },
  { Key: 'phone', Value: '+91-' + faker.string.numeric(10) },
  { Key: 'password', Value: faker.internet.password() },
];

// ExcelUtils.writeKeyValue(filePath, sheetName, fakeData);
console.log('✅ Fake data written to Excel');
