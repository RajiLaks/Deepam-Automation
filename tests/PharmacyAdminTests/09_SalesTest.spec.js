const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { SalesPage } = require('../../Pages/PharmacyAdminPage/SalesPage');
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

    //Navigate to Sales module
    test('TC001 - Navigate to sales module ', async () => {
        const salesPage = new SalesPage(page);
        await page.waitForTimeout(1000);
        await salesPage.navigateToSalesModule();

    });

    //select date for choosen the desired period 
    test('TC002 - View Sale Detail', async () => {
        const salesPage = new SalesPage(page);
        const excelreader = new ExcelReader();

        await salesPage.navigateToSalesModule();

        const SalesData = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Sales');
        const { Search } = SalesData[0];
        await salesPage.searchValue(Search);
        await salesPage.clickViewBtn();
        await page.waitForTimeout(1000);
        const details = await salesPage.getSalesDetail();
        console.log(details);
        await page.waitForTimeout(1000);

    });

    //select date for choosen the desired period 
    test('TC003 - View Sale Detail', async () => {
        const salesPage = new SalesPage(page);
        const excelreader = new ExcelReader();

        await salesPage.navigateToSalesModule();

        const SalesData = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Sales');
        const { Search } = SalesData[1];
        await salesPage.searchValue(Search);
        await salesPage.clickViewBtn();
        await salesPage.clickCloseBtn();


    });

    //Verify the application display the message "No Record Found". If the there is no sales detail
    test('TC004 - Verify the message no record found', async () => {
        const salesPage = new SalesPage(page);
        const excelreader = new ExcelReader();

        await salesPage.navigateToSalesModule();

        const SalesData = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Sales');
        const { Search } = SalesData[2];
        await salesPage.searchValue(Search);
        await salesPage.validateMessage();



    });






})