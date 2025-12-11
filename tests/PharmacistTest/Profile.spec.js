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

test.describe.serial(' Pharmacist ', () => {


  test('TC001 - Login Pharmacist', async () => {
    const loginpage = new LoginPage(page);
    const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
    const { MobileNo, Password } = dataset[2];
    await loginpage.LaunchURL(dataset[0].URL);
    await loginpage.PharmacistLogin(MobileNo, Password);
    await page.waitForTimeout(2000);
  });

  test("TC002 - Edit All the Profile Details and Submit it ", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

    const { Firstname, Lastname, Gender, Date, Month, Year, Language, MobileNo, Email,
      Marital, EmergencyCon, BloopGroup,UploadProfile } = data[0];
    const profile = new Profile(page);
    await profile.Profileclick();
    await profile.Edit();
   // await page.pause()
    await profile.Firstname(Firstname);
    await profile.Lastname(Lastname);
    // await profile.DateOfBirth(Date, Month, Year);
    await profile.Gender(Gender);
    await profile.Emergency(EmergencyCon);
    await profile.Email(Email);
    await profile.MaritalStatus(Marital);
    await profile.Language(Language);
    await profile.BloodGroup(BloopGroup);
    await profile.Upload_ProfilePhoto(UploadProfile);
    await profile.Submit();

    await expect(page.locator("//p[@class='el-message__content']")).toHaveText('Personal profile updated successfully');

  });
  test("TC003 - Change mobile number in Profile verify with valid OTP ", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

    const { Firstname, Lastname, Gender, Date, Month, Year, Language, MobileNo, Email,
      Marital, EmergencyCon, BloopGroup,UploadProfile } = data[1];
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
    await profile.Upload_ProfilePhoto(data[0].UploadProfile);
    await profile.Submit();
    await profile.OTP_Verify(" ");
    await profile.Submit();

    //await expect(page.locator("//p[@class='el-message__content']")).toHaveText('Personal profile updated successfully');

  });
  test("TC004 - Change mobile number in Profile verify with invalid OTP", async () => {
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

    //await profile.Profileclick();
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
  test("TC006 - Check all the Validation error message", async () => {
    const profile = new Profile(page);
    await page.reload();

   // await profile.Profileclick();
    await profile.Edit();
    await profile.Firstname("");
    await profile.Submit();
    await expect(page.locator("//div[contains(text(),'First Name is required')]")).toContainText('First Name is required');
    await profile.Firstname(" qwert");
    await expect(page.locator("//div[@class='pl-3 col-md-6 col-lg-4']//div//div[@class='profile-align-style m-0']//div[@class='input-height-align']//div//div[@class='required'][normalize-space()='Alphabets only']")).toContainText('Alphabets only');
    await profile.Lastname("");
    await expect(page.locator("//div[contains(text(),'Last Name is required')]")).toContainText('Last Name is required');
    await profile.Lastname(" qwert");
    await expect(page.locator("//div[@class='pr-4 col-md-6 col-lg-4']//div//div[@class='profile-align-style m-0']//div[@class='input-height-align']//div//div[@class='required'][normalize-space()='Alphabets only']")).toContainText('Alphabets only');
    await profile.Clear_DOB()
    await expect(page.locator("//div[contains(text(),'Date of Birth is required')]")).toContainText('Date of Birth is required');
    await profile.Mobile(' ');
    await expect(page.locator("//div[contains(text(),'Mobile Number is required')]")).toContainText('Mobile Number is required');
    await profile.Mobile('12345');
    await expect(page.locator("//div[contains(text(),'Please give a valid mobile number')]")).toContainText('Please give a valid mobile number');
    await profile.Emergency("12345");
    await expect(page.locator("//div[contains(text(),'Please give valid number')]")).toContainText('Please give valid number');
    await profile.Emergency(" ");
    await expect(page.locator("//div[contains(text(),'Numbers only allowed')]")).toContainText('Numbers only allowed');
    await profile.Email("");
    await expect(page.locator("//div[contains(text(),'Email is required')]")).toContainText('Email is required');
    await profile.Email(" 1234");
    await expect(page.locator("//div[contains(text(),'Please give a valid email')]")).toContainText('Please give a valid email');

  });
   test("TC007 - Upload Invalid Profile formate,then Remove & submit  ", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

   
    const profile = new Profile(page);
    await page.reload();

   // await profile.Profileclick();
    await profile.Edit();
    await profile.UnsucessUpload(data[1].UploadProfile);
    await profile.Submit();
  
  });
   test("TC008 - Upload with more than 1 mb file Profile and sumbit it ", async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Profile');
    console.log("Excel:", data);

   
    const profile = new Profile(page);
    await page.reload();

   // await profile.Profileclick();
    await profile.Edit();
    await profile.Upload_ProfilePhoto(data[2].UploadProfile);
    await expect(page.locator("//p[@class='el-message__content']")).toContainText('File size exceeds the limit (1 MB). Please select a smaller file.');
    //await profile.Submit();
  
  });
});



