const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { ManufacturerPage } = require('../../Pages/PharmacyAdminPage/ManufacturerPage');
const { ExcelReader } = require('../../Utils/ExcelReader');

let page;
let context;

//Test the supplier module functionaity
test.describe('Supplier Module Test', () => {

    //Launch the browser and login the application
    test.beforeEach('TC001 - Login with valid data', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const LoginDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const { URL, MobileNo, Password } = LoginDataset[5];
        await loginpage.LaunchURL(LoginDataset[0].URL);
        await loginpage.PharmacyAdminLogin(MobileNo, Password);
        await page.waitForTimeout(2000);
    });

    //Add the Manufacturer details with valid data
    test('TC001_Manufacturer with valid data', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelreader = new ExcelReader();
        await manufacturerPage.clickProductModule();
        await manufacturerPage.clickManufacturerModule();
        await manufacturerPage.clickAddManufacturerBtn();
        const ManufacturerDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Manufacturer');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = ManufacturerDataset[0];
        await manufacturerPage.enterManufacturerDetails(Name, MobileNo, EmailId, Address1, Address2, City);
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.getToastMessage(ManufacturerDataset[0].Toast);

    });

    //Add the Manufacturer details with Invalid data
    test('TC002_Manufacturer with Invalid data', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelreader = new ExcelReader();
        await manufacturerPage.clickProductModule();
        await manufacturerPage.clickManufacturerModule();
        await manufacturerPage.clickAddManufacturerBtn();
        const ManufacturerDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Manufacturer');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = ManufacturerDataset[1];
        await manufacturerPage.enterManufacturerDetails(Name, MobileNo, EmailId, Address1, Address2, City);
        await manufacturerPage.clickSubmitBtn();
        const errorDetails = await manufacturerPage.validateErrorMessage();
        console.log(errorDetails);

    });

    //Add the Manufacturer details without data
    test('TC003_Manufacturer details without data', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        await manufacturerPage.clickProductModule();
        await manufacturerPage.clickManufacturerModule();
        await manufacturerPage.clickAddManufacturerBtn();
        await manufacturerPage.clickSubmitBtn();
        const errorDetails = await manufacturerPage.validateErrorMessage();
        console.log(errorDetails);

    });

    //Verify the cancel button while add the Manufacturer details
    test('TC004_verify the cancel button', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelreader = new ExcelReader();
        await manufacturerPage.clickProductModule();
        await manufacturerPage.clickManufacturerModule();
        await manufacturerPage.clickAddManufacturerBtn();
        const ManufacturerDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Manufacturer');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = ManufacturerDataset[0];
        await manufacturerPage.enterManufacturerDetails(Name, MobileNo, EmailId, Address1, Address2, City);
        await manufacturerPage.clickCancelBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickCancelBtn();
        await manufacturerPage.clickConfirmationYes();

    });


    //Edit the existing Manufacturer details
    test('TC005_Edit the Existing Manufacturer Details', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelreader = new ExcelReader();
        await manufacturerPage.clickProductModule();
        await manufacturerPage.clickManufacturerModule();

        const ManufacturerDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Manufacturer');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = ManufacturerDataset[2];

        await manufacturerPage.searchValue(ManufacturerDataset[2].Search);
        await manufacturerPage.clickEditBtn();
        await manufacturerPage.enterManufacturerDetails(Name, MobileNo, EmailId, Address1, Address2, City);
        await manufacturerPage.clickCancelBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickSubmitBtn();
        await manufacturerPage.getToastMessage(ManufacturerDataset[1].Toast);
    });

    //Delete the existing Manufacturer details
    test('TC006_Delete the Existing Manufacturer Details', async () => {
        const manufacturerPage = new ManufacturerPage(page);
        const excelreader = new ExcelReader();
        await manufacturerPage.clickProductModule();
        await manufacturerPage.clickManufacturerModule();

        const ManufacturerDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Manufacturer');

        await manufacturerPage.searchValue(ManufacturerDataset[2].Search);
        await manufacturerPage.clickDeleteBtn();
        await manufacturerPage.clickConfirmationNo();
        await manufacturerPage.clickDeleteBtn();
        await manufacturerPage.clickConfirmationYes();
        await manufacturerPage.getToastMessage(ManufacturerDataset[2].Toast);

    });




});