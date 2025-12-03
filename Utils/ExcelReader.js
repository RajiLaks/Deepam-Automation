const {expect} = require('@playwright/test');
const xlsx = require('xlsx');
const path = require('path');
 
class ExcelReader {
   
 
    async readExcel(filePath, sheetName)
    {
    const workbook = xlsx.readFile(path.resolve(filePath));
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { raw: false,defval: ' '  });
    return data;
}
}
 
module.exports = { ExcelReader };