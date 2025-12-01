const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');

const { ExcelReader } = require('../../Utils/ExcelReader');

let page;
let context;

test.describe('Login', async () => {

    test.beforeAll('TC001 - Login with valid data', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const { URL, MobileNo, Password } = dataset[0];
        await loginpage.LaunchURL(URL);
        await loginpage.DoctorLogin(MobileNo, Password);
    });



});