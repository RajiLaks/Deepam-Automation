const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { ScrapPage } = require('../../Pages/PharmacyAdminPage/ScrapPage');
const { ExcelReader } = require('../../Utils/ExcelReader');


let page;
let context;
let pathone = "D:/excel/PetForAdmin.xlsx"

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


    // test('TC001_add scrap', async () => {
    //     const scrapPage = new ScrapPage(page);
    //     await scrapPage.navigateToScrapModule();
    //     await page.waitForTimeout(2000);
    //     await scrapPage.clickAddScrapBtn();

    //     //from excel
    //     const excelReader = new ExcelReader();
    //     const ScrapTestdata = await excelReader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Scrap');
    //     const { Medicine, Batch, Quantity, Reason } = ScrapTestdata[0];

    //     await scrapPage.addScrapDetails(Medicine, Batch, Quantity, Reason);
    //     await scrapPage.clickAddBtn();
    //     await page.waitForTimeout(500);
    //     await scrapPage.clickSubmitBtn();
    //     await scrapPage.clickConfirmationNo();
    //     await page.waitForTimeout(500);
    //     await scrapPage.clickSubmitBtn();
    //     await scrapPage.clickConfirmationYes();

    // })


    // test('TC002_Edit scrap details while add the scrap ', async () => {
    //     const scrapPage = new ScrapPage(page);
    //     await scrapPage.navigateToScrapModule();
    //     await page.waitForTimeout(2000);
    //     await scrapPage.clickAddScrapBtn();

    //     //from excel
    //     const excelReader = new ExcelReader();
    //     const ScrapTestdata = await excelReader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Scrap');
    //     const { Medicine, Batch, Quantity, Reason } = ScrapTestdata[0];

    //     await scrapPage.addScrapDetails(Medicine, Batch, Quantity, Reason);
    //     await scrapPage.clickAddBtn();
    //     await scrapPage.clickEditIcon();
    //     await scrapPage.editScrapDetails(ScrapTestdata[1].Medicine,ScrapTestdata[1].Batch, ScrapTestdata[1].Quantity, ScrapTestdata[1].Reason);
    //     await scrapPage.clickAddBtn();
    //     await page.waitForTimeout(1000);
    //     await scrapPage.clickSubmitBtn();
    //     await scrapPage.clickConfirmationYes();
    // })


    // test('TC003_Verify clear and Back button while add the scrap details ', async () => {
    //     const scrapPage = new ScrapPage(page);
    //     await scrapPage.navigateToScrapModule();
    //     await page.waitForTimeout(2000);
    //     await scrapPage.clickAddScrapBtn();

    //     //from excel
    //     const excelReader = new ExcelReader();
    //     const ScrapTestdata = await excelReader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Scrap');
    //     const { Medicine, Batch, Quantity, Reason } = ScrapTestdata[0];

    //     await scrapPage.addScrapDetails(Medicine, Batch, Quantity, Reason);
    //     await scrapPage.clickAddBtn();
    //     await scrapPage.clickEditIcon();
    //     await scrapPage.clickclearBtn();
    //     await scrapPage.editScrapDetails(ScrapTestdata[1].Medicine,ScrapTestdata[1].Batch, ScrapTestdata[1].Quantity, ScrapTestdata[1].Reason);
    //     await scrapPage.clickAddBtn();
    //     await page.waitForTimeout(500);
    //     await scrapPage.clickBackBtn();
    //      await page.waitForTimeout(500);
    // })



    // test('TC004 - search and view scrap order', async () => {
    //     const scrapPage = new ScrapPage(page);
    //     await scrapPage.navigateToScrapModule();
    //     await page.waitForTimeout(2000);
        
    //     const excelReader = new ExcelReader();
    //     const ScrapTestdata = await excelReader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Scrap');
    //     const { Medicine, Batch, Quantity, Reason, Search } = ScrapTestdata[0];

    //     await scrapPage.searchValue(Search);
    //     await scrapPage.clickViewBtn();
    //     await scrapPage.clickHistoryBackBtn();
    //     await page.waitForTimeout(500);
    // })

    test('TC005 - add scrap without mandatory fields', async () => {
        const scrapPage = new ScrapPage(page);
        await scrapPage.navigateToScrapModule();
        await page.waitForTimeout(2000);
        await scrapPage.clickAddScrapBtn();
        await scrapPage.clickAddBtn();
        const getAllErrorMessage=await scrapPage.getErrorMessage();
        console.log(getAllErrorMessage);
         await page.waitForTimeout(500);
    })






})