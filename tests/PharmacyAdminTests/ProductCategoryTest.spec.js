const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { ProductCategoryPage } = require('../../Pages/PharmacyAdminPage/ProductCategoryPage');
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
        const productCategoryPage = new ProductCategoryPage(page);
        const excelreader = new ExcelReader();
        await productCategoryPage.clickProductModule();
        await productCategoryPage.clickProductCategoryModule();
        await productCategoryPage.clickAddCategoryBtn();
        const categoryDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_ProductCategory');
        const { Name, Description } = categoryDataset[0];
        await productCategoryPage.enterManufacturerDetails(Name, Description);
        await productCategoryPage.clickSubmitBtn();
        await productCategoryPage.getToastMessage(categoryDataset[0].Toast);

    });

    //Add the Manufacturer details with Invalid data
    test('TC002_Manufacturer with Invalid data', async () => {
        const productCategoryPage = new ProductCategoryPage(page);
        const excelreader = new ExcelReader();
        await productCategoryPage.clickProductModule();
        await productCategoryPage.clickProductCategoryModule();
        await productCategoryPage.clickAddCategoryBtn();
        const categoryDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_ProductCategory');
        const { Name, Description } = categoryDataset[0];
        await productCategoryPage.enterManufacturerDetails(Name, Description);
        await productCategoryPage.clickSubmitBtn();
        const errorDetails = await productCategoryPage.validateErrorMessage();
        console.log(errorDetails);

    });

    //Add the Manufacturer details without data
    test('TC003_Manufacturer details without data', async () => {
        const productCategoryPage = new ProductCategoryPage(page);
        await productCategoryPage.clickProductModule();
        await productCategoryPage.clickProductCategoryModule();
        await productCategoryPage.clickAddCategoryBtn();
        await productCategoryPage.clickSubmitBtn();
        const errorDetails = await productCategoryPage.validateErrorMessage();
        console.log(errorDetails);

    });

    //Verify the cancel button while add the Manufacturer details
    test('TC004_verify the cancel button', async () => {
        const productCategoryPage = new ProductCategoryPage(page);
        const excelreader = new ExcelReader();
        await productCategoryPage.clickProductModule();
        await productCategoryPage.clickManufacturerModule();
        await productCategoryPage.clickAddManufacturerBtn();
        const categoryDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_ProductCategory');
        const { Name, Description} = categoryDataset[0];
        await productCategoryPage.enterManufacturerDetails(Name, Description);
        await productCategoryPage.clickCancelBtn();
        await productCategoryPage.clickConfirmationNo();
        await productCategoryPage.clickCancelBtn();
        await productCategoryPage.clickConfirmationYes();

    });


    //Edit the existing Manufacturer details
    test('TC005_Edit the Existing Manufacturer Details', async () => {
        const productCategoryPage = new ProductCategoryPage(page);
        const excelreader = new ExcelReader();
        await productCategoryPage.clickProductModule();
        await productCategoryPage.clickManufacturerModule();

        const categoryDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_ProductCategory');
        const { Name, Description} = categoryDataset[2];

        await productCategoryPage.searchValue(categoryDataset[2].Search);
        await productCategoryPage.clickEditBtn();
        await productCategoryPage.enterCategoryDetails(Name, Description);
        await productCategoryPage.clickCancelBtn();
        await productCategoryPage.clickConfirmationNo();
        await productCategoryPage.clickSubmitBtn();
        await productCategoryPage.getToastMessage(categoryDataset[1].Toast);
    });

    //Delete the existing Manufacturer details
    test('TC006_Delete the Existing Manufacturer Details', async () => {
        const productCategoryPage = new ProductCategoryPage(page);
        const excelreader = new ExcelReader();
        await productCategoryPage.clickProductModule();
        await productCategoryPage.clickManufacturerModule();

        const categoryDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_ProductCategory');

        await productCategoryPage.searchValue(categoryDataset[2].Search);
        await productCategoryPage.clickDeleteBtn();
        await productCategoryPage.clickConfirmationNo();
        await productCategoryPage.clickDeleteBtn();
        await productCategoryPage.clickConfirmationYes();
        await productCategoryPage.getToastMessage(categoryDataset[2].Toast);

    });




});