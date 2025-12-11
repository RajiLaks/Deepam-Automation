const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { SupplierPage } = require('../../Pages/PharmacyAdminPage/SupplierPage');
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

    //Add the supplier or Vendor details with valid data
    test('TC001_AddSupplier with valid data', async () => {
        const supplierPage = new SupplierPage(page);
        const excelreader = new ExcelReader();
        await supplierPage.clickPurchaseModule();
        await supplierPage.clickSupplierModule();
        await supplierPage.clickAddSupplierBtn();
        const SupplierDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Supplier');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = SupplierDataset[0];
        await supplierPage.enterSupplierDetails(Name, MobileNo, EmailId, Address1, Address2, City );
        await supplierPage.clickSubmitBtn();
        await supplierPage.getToastMessage(SupplierDataset[0].Toast);

    });

    //Add the supplier or Vendor details with Invalid data
    test('TC002_AddSupplier with Invalid data', async () => {
        const supplierPage = new SupplierPage(page);
        const excelreader = new ExcelReader();
        await supplierPage.clickPurchaseModule();
        await supplierPage.clickSupplierModule();
        await supplierPage.clickAddSupplierBtn();
        const SupplierDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Supplier');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = SupplierDataset[1];
        await supplierPage.enterSupplierDetails(Name, MobileNo, EmailId, Address1, Address2, City );
        await supplierPage.clickSubmitBtn();
        const errorDetails=await supplierPage.validateErrorMessage();
        console.log(errorDetails);

    });

    //Add the supplier or Vendor details without data
    test('TC003_AddSupplier details without data', async () => {
        const supplierPage = new SupplierPage(page);
        const excelreader = new ExcelReader();
        await supplierPage.clickPurchaseModule();
        await supplierPage.clickSupplierModule();
        await supplierPage.clickAddSupplierBtn();
        await supplierPage.clickSubmitBtn();
        const errorDetails=await supplierPage.validateErrorMessage();
        console.log(errorDetails);

    });

     //Verify the cancel button while add the supplier details
     test('TC004_verify the cancel button', async () => {
        const supplierPage = new SupplierPage(page);
        const excelreader = new ExcelReader();
        await supplierPage.clickPurchaseModule();
        await supplierPage.clickSupplierModule();
        await supplierPage.clickAddSupplierBtn();
        const SupplierDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Supplier');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = SupplierDataset[0];
        await supplierPage.enterSupplierDetails(Name, MobileNo, EmailId, Address1, Address2, City );
        await supplierPage.clickCancelBtn();
        await supplierPage.clickConfirmationNo();
        await supplierPage.clickCancelBtn();
        await supplierPage.clickConfirmationYes();
     });


    //Edit the existing supplier details
    test('TC005_Edit the Existing Supplier Details', async () => {
        const supplierPage = new SupplierPage(page);
        const excelreader = new ExcelReader();
        await supplierPage.clickPurchaseModule();
        await supplierPage.clickSupplierModule();

        const SupplierDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Supplier');
        const { Name, MobileNo, EmailId, Address1, Address2, City } = SupplierDataset[2];

        await supplierPage.searchValue(SupplierDataset[0].Search);
        await supplierPage.clickEditBtn();
        await supplierPage.enterSupplierDetails(Name, MobileNo, EmailId, Address1, Address2, City);
        await supplierPage.clickCancelBtn();
        await supplierPage.clickConfirmationNo();
        await supplierPage.clickSubmitBtn();
    });

    //Delete the existing supplier details
    test('TC006_Delete the Existing Supplier Details', async () => {
        const supplierPage = new SupplierPage(page);
        const excelreader = new ExcelReader();
        await supplierPage.clickPurchaseModule();
        await supplierPage.clickSupplierModule();

        const SupplierDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Supplier');

        await supplierPage.searchValue(SupplierDataset[0].Search);
        await supplierPage.clickDeleteBtn();
        await supplierPage.clickConfirmationNo();
        await supplierPage.clickDeleteBtn();
        await supplierPage.clickConfirmationYes();

    });





});