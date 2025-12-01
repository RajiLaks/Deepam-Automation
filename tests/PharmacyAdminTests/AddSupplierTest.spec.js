const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { SupplierPage } = require('../../Pages/PharmacyAdminPage/AddSupplierPage');
const { ExcelReader } = require('../../Utils/ExcelReader');

let page;
let context;

test.describe('Supplier Module Test', () => {

    test.beforeAll('TC001 - Login with valid data', async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const { URL, MobileNo, Password } = dataset[5];
        await loginpage.LaunchURL(dataset[0].URL);
        await loginpage.PharmacyAdminLogin(MobileNo, Password);
        await page.waitForTimeout(2000);
    });

    test('TC002_AddSupplier', async () => {
        const supplierPage = new SupplierPage(page);
        await supplierPage.clickPurchaseModule();
        await supplierPage.clickSupplierModule();
        await supplierPage.clickAddSupplierBtn();
        await supplierPage.enterSupplierDetails("arun", "7082767623", "arun@gmail.com", "fghd", "ewdfewf", "Rajapalayam");

    });




});