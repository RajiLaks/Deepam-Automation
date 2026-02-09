const { test, expect } = require('@playwright/test');
const { language } = require('../../Pages/PharmacistPage/Language');
const { LoginPage } = require('/Deepam_Automation/Pages/BasePage/LoginPage');
const { ExcelReader } = require('../../Utils/ExcelReader');
const excelreader = new ExcelReader();
let page;
let context;
let browser;
test.beforeAll(async ({ browser: browserFixture }) => {
  browser = browserFixture;
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await context.close();
});
    test.describe.serial(' Pharmacist ', () => {
      test("TC001 - Login Page", async () => {
        const loginpage = new LoginPage(page);
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const { MobileNo, Password } = dataset[2];
        await loginpage.LaunchURL(dataset[0].URL);
        await loginpage.PharmacistLogin(MobileNo, Password);
        await page.waitForTimeout(1000);
      });

    test('TC002 - Language', async () => {
       // const { ChooseLang } = data[0];

        const Lang = new language(page);
        await Lang.Language("TA");
    });
})