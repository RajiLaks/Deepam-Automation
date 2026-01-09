const { test, expect } = require('@playwright/test');
const { Changepass } = require('/Deepam/Pages/PharmacistPage/Change_Password');
const { LoginPage } = require('/Deepam/Pages/BasePage/LoginPage');
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


//Login Using Valid Credential.
test.describe.serial(' Pharmacist ', () => {
  //  test.setTimeout(120000);
  test("TC001 - Login Page", async () => {
    const loginpage = new LoginPage(page);
    const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
    const { MobileNo, Password } = dataset[2];
    await loginpage.LaunchURL(dataset[0].URL);
    await loginpage.PharmacistLogin(MobileNo, Password);
    await page.waitForTimeout(1000);
  });

  test('TC002 - ChangePassword with Valid Credential', async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'ChangePassword');
    const { CurrentPassword, NewPassword, ConfirmPassword } = data[0];

    const Changepassword = new Changepass(page);
    // Navigate to change password screen
    await Changepassword.NavToChangePassword();
    // Change password
    await Changepassword.ChangePassword(CurrentPassword, NewPassword, ConfirmPassword);
    await Changepassword.ProceedButton();
    await expect(page.locator("//p[@class='el-message__content']")).toContainText("Password changed successfully");
    await page.waitForTimeout(2000)


  });
  test('TC003 - ChangePassword with Invalid Credential with same password', async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'ChangePassword');
    const { CurrentPassword, NewPassword, ConfirmPassword } = data[1];

    const Changepassword = new Changepass(page);

    // Navigate to change password screen
    await Changepassword.NavToChangePassword();
    // Change password
    await Changepassword.ChangePassword(CurrentPassword, NewPassword, ConfirmPassword);
    await Changepassword.ProceedButton();
    await expect(page.locator("//p[@class='el-message__content']")).toContainText(/Old Password is wrong|Password 1 doesn't match with password 2 or Old password and new password is same/);
    await Changepassword.Backbutton();

  });
  test('TC004 - ChangePassword with Invalid Credential', async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'ChangePassword');
    const { CurrentPassword, NewPassword, ConfirmPassword } = data[0];

    const Changepassword = new Changepass(page);

    // Navigate to change password screen
    await Changepassword.NavToChangePassword();
    // Change password
    await Changepassword.ChangePassword(CurrentPassword, NewPassword, ConfirmPassword);
    await Changepassword.ProceedButton();
    await expect(page.locator("//p[@class='el-message__content']")).toContainText("Old Password is wrong");
   // await Changepassword.Backbutton();

  });
  test('TC005 - ChangePassword with old Credential', async () => {
    const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'ChangePassword');
    const { CurrentPassword, NewPassword, ConfirmPassword } = data[3];

    const Changepassword = new Changepass(page);
    await page.reload();
    await Changepassword.ChangePassword(CurrentPassword, NewPassword, ConfirmPassword);
    await Changepassword.ProceedButton();
    await page.waitForTimeout(2000)

  });
  test('TC006 - Validate All the Error Message', async () => {
    const Changepassword = new Changepass(page);
    // Navigate to change password screen
    //await page.reload();
    await Changepassword.NavToChangePassword();
    await Changepassword.ProceedButton();
    await expect(page.locator("//div[@class='required']")).toContainText("Current Password is required");
    await expect(page.locator("//label[normalize-space()='New Password']/../ancestor::div[@class='password-div']/following-sibling::div/div")).toContainText("New Password is required")
   
    await expect(page.locator("//div[contains(text(),'Confirm Password is required')]")).toContainText("Confirm Password is required")
    await Changepassword.ConfirmPass("1234")
    await expect(page.locator("//div[contains(text(),'Password does not match')]")).toContainText("Password does not match")


    await Changepassword.Backbutton();

  });


});



