const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { ReportPage } = require('../../Pages/PharmacyAdminPage/ReportPage');
const { ExcelReader } = require('../../Utils/ExcelReader');


let page;
let context;


test.describe('TS03 - Scrap', () => {

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

    //Navigate to Report module
    test('TC001 - Navigate to report module ', async () => {
        const reportPage = new ReportPage(page);
        await page.waitForTimeout(1000);
        await reportPage.navigateToReportModule();


    });

    //select date for choosen the desired period 
    test('TC002 - select From date ', async () => {
        const reportPage = new ReportPage(page);
        await reportPage.navigateToReportModule();

        const excelreader = new ExcelReader();
        const ReportDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Report');

        await reportPage.selectFromdate(ReportDataset[0].Date, ReportDataset[0].Month, ReportDataset[0].Year);
        await reportPage.selectTodate(ReportDataset[1].Date, ReportDataset[1].Month, ReportDataset[1].Year);
        await reportPage.reportType(ReportDataset[0].ReportType);
        await reportPage.clickSubmitBtn();
        await page.waitForTimeout(1000);

    });

    // test('TC003 - select To date ', async () => {
    //     const reportPage=new ReportPage(page);
    //     await reportPage.navigateToReportModule();
    //     await reportPage.selectTodate('12',"Dec",'2024');

    // });





})