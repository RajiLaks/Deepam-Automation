const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { InventoryAlertPage } = require('../../Pages/PharmacyAdminPage/InventoryAlertPage');
const { ExcelReader } = require('../../Utils/ExcelReader');


let page;
let context;


test.describe('TS03 - Sales', () => {

    //Launch the browser and login the application
    test.beforeEach('TC001 - Login with valid data', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const LoginDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const { URL, MobileNo, Password } = LoginDataset[5];
        await loginpage.LaunchURL(LoginDataset[0].URL);
        await page.waitForTimeout(1000);
        await loginpage.PharmacyAdminLogin(MobileNo, Password);
        await page.waitForTimeout(1000);
    });

    //Navigate to Inventory module
    test('TC001 - Navigate to Inventory module ', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
        await page.waitForTimeout(1000);
        await inventoryAlertPage.clickInventoryModule();

    });

    //Verify the Low quantity medicine details and print the medicine list
    test('TC002 - Verify the low quantity medicine details', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
        const excelreader = new ExcelReader();

        await inventoryAlertPage.clickInventoryModule();
        await page.waitForTimeout(500);

        await inventoryAlertPage.clickLowQuantityTab();
        await page.waitForTimeout(500);

        await inventoryAlertPage.lowQuantityCount();

        const overallDetails = await inventoryAlertPage.lowQuantityMedicineDetails();
        console.log(overallDetails);

        const InventoryAlert = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_InventoryAlert');
        const { Search } = InventoryAlert[1];
        await inventoryAlertPage.searchValue(Search);
        await page.waitForTimeout(500);
        await inventoryAlertPage.lowQuantityMedicineDetails();

    });

    //Verify the Expiring medicine details and print the medicine list
    test('TC003 - Verify the Expiring medicine details', async () => {
        const inventoryAlertPage = new InventoryAlertPage(page);
        const excelreader = new ExcelReader();
        
        await inventoryAlertPage.clickInventoryModule();
        await page.waitForTimeout(500);

        await inventoryAlertPage.clickExpiringTab();
        await page.waitForTimeout(500);

        await inventoryAlertPage.expiringCount();

        const overallDetails = await inventoryAlertPage.expiringMedicineDetails();
        console.log(overallDetails);


        const InventoryAlert = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_InventoryAlert');
        const { Search } = InventoryAlert[0];
        await inventoryAlertPage.searchValue(Search);
        await page.waitForTimeout(500);

        const specificDetails = await inventoryAlertPage.expiringMedicineDetails();
        console.log(specificDetails);

    });








})