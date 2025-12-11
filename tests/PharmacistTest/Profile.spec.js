const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/Basepage/LoginPage');
const { Profile } = require('../../Pages/PharmacistPage/Profile');
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

test.describe.serial('Pharmacist Tests', () => {


  test('TC001 - Login Pharmacist', async () => {
    const loginpage = new LoginPage(page);
    const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
    const { MobileNo, Password } = dataset[2];
    await loginpage.LaunchURL(dataset[0].URL);
    await loginpage.PharmacistLogin(MobileNo, Password);
    await page.waitForTimeout(2000);
  });

  test.skip("TC002 - Edit All the Profile Details and Submit it ", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

    const { Firstname, Lastname, Gender, Date, Month, Year, Language, MobileNo, Email,
      Marital, EmergencyCon, BloopGroup } = data[0];
    const profile = new Profile(page);
    await profile.Profileclick();
    await profile.Edit();
    await page.pause()
    await profile.Firstname(Firstname);
    await profile.Lastname(Lastname);
    // await profile.DateOfBirth(Date, Month, Year);
    await profile.Gender(Gender);
    await profile.Emergency(EmergencyCon);
    await profile.Email(Email);
    await profile.MaritalStatus(Marital);
    await profile.Language(Language);
    await profile.BloodGroup(BloopGroup);
    await profile.Submit();

    await expect(page.locator("//p[@class='el-message__content']")).toHaveText('Personal profile updated successfully');

  });
  test.skip("TC003 - Change mobile number in Profile verify with valid OTP ", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

    const { Firstname, Lastname, Gender, Date, Month, Year, Language, MobileNo, Email,
      Marital, EmergencyCon, BloopGroup } = data[1];
    const profile = new Profile(page);

    await page.reload();
    // await profile.Profileclick();
    await profile.Edit();
    await profile.Firstname(Firstname);
    await profile.Lastname(Lastname);
    await profile.Gender(Gender);
    await profile.Mobile(MobileNo);
    await profile.Emergency(EmergencyCon);
    await profile.Email(Email);
    await profile.MaritalStatus(Marital);
    await profile.Language(Language);
    await profile.BloodGroup(BloopGroup);
    await profile.Submit();
    await profile.OTP_Verify(" ");
    await profile.Submit();

    //await expect(page.locator("//p[@class='el-message__content']")).toHaveText('Personal profile updated successfully');

  });
  test.skip("TC004 - Change mobile number in Profile verify with invalid OTP", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

    const { Firstname, Lastname, Gender, Date, Month, Year, Language, MobileNo, Email,
      Marital, EmergencyCon, BloopGroup } = data[1];
    const profile = new Profile(page);
    await page.reload();

    // await profile.Profileclick();
    await profile.Edit();
    await profile.Firstname(Firstname);
    await profile.Lastname(Lastname);
    await profile.Gender(Gender);
    await profile.Mobile(MobileNo);
    await profile.Emergency(EmergencyCon);
    await profile.Email(Email);
    await profile.MaritalStatus(Marital);
    await profile.Language(Language);
    await profile.BloodGroup(BloopGroup);
    await profile.Submit();
    await profile.OTP_Verify(" ");
    await profile.Submit();
    await expect(page.locator("//p[(@class='el-message__content') and text()='Not found']")).toHaveText('Not found');
    await profile.OTP_Verify("123456");
    await profile.Submit();
    await expect(page.locator("//p[(@class='el-message__content') and text()='OTP is invalid ']")).toHaveText('OTP is invalid');
    await profile.CloseIcon();
  });
  test("TC005 - Change mobile number in Profile click the Resend OTP Before and After the Time", async () => {
   test.setTimeout(1200000); 
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

    const { Firstname, Lastname, Gender, Date, Month, Year, Language, MobileNo, Email,
      Marital, EmergencyCon, BloopGroup } = data[1];
    const profile = new Profile(page);
    await page.reload();

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
    await profile.BloodGroup(BloopGroup);
    await profile.Submit();
    await page.waitForTimeout(61000);
    await profile.Resent_OTP();

  });
});



