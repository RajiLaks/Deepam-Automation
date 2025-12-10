const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/Basepage/LoginPage');
const { Profile } = require('../../Pages/PharmacistPage/Profile');
const { ExcelReader } = require('../../Utils/ExcelReader');
const excelreader = new ExcelReader();

let page;
let context;
let browser;

test.describe.serial('Pharmacist Tests', () => {
  test.beforeAll(async ({ browser: browserFixture }) => {
    browser = browserFixture;
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('TC001 - Login Pharmacist', async () => {
    const loginpage = new LoginPage(page);
    const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
    const { MobileNo, Password } = dataset[2];
    await loginpage.LaunchURL(dataset[0].URL);
    await loginpage.PharmacistLogin(MobileNo, Password);
    await page.waitForTimeout(2000);
  });

  test("TC001 - Edit Profile", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    const { Firstname, Lastname, Gender, Date, Month, Year, Language, MobileNo, Email,
      Marital, EmergencyCon } = data[0];
    const profile = new Profile(page);

    await profile.Profileclick();
    await profile.Edit();
    await profile.Firstname(Firstname);
    await profile.Lastname(Lastname);
    await profile.Gender(Gender);
    await profile.Mobile(MobileNo);
    await profile.Emergency(EmergencyCon);
    await profile.Email(Email);
    await profile.MaritalStatus(Marital);
    await profile.Language(Language);
  });
});



