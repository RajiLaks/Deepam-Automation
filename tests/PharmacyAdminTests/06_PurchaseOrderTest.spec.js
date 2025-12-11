const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { PurchaseOrderPage } = require('../../Pages/PharmacyAdminPage/PurchaseOrderPage');
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
        await page.waitForTimeout(1000);
        await loginpage.PharmacyAdminLogin(MobileNo, Password);
        await page.waitForTimeout(1000);
    });

    // //Create purchase order details with valid data
    // test('TC001_Create purchase order with valid data', async () => {
    //     const purchaseOrderPage = new PurchaseOrderPage(page);
    //     const excelreader = new ExcelReader();
    //     await purchaseOrderPage.clickPurchaseModule();
    //     await page.waitForTimeout(1000);
    //     await purchaseOrderPage.clickPurchaseOrderModule();
    //     await page.waitForTimeout(1000);
    //     await purchaseOrderPage.clickAddPurchaseOrderBtn();
    //     await page.waitForTimeout(1000);
    //     const PurchaseOrderDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_PurchaseOrder');
    //     const { supplierName, PurchaseDate, Medicine, Quantity, Amount, CGST, SGST, Batch, ExpiryDate, UOMPurchase } = PurchaseOrderDataset[0];
    //     await purchaseOrderPage.enterPurchaseDetails(supplierName, PurchaseDate, Medicine, Quantity, Amount, CGST, SGST, Batch, ExpiryDate, UOMPurchase);
    //     await purchaseOrderPage.clickAddBtn();
    //     await purchaseOrderPage.clickSubmitBtn();
    //     await purchaseOrderPage.clickConfirmationNo();
    //     await purchaseOrderPage.clickSubmitBtn();
    //     await purchaseOrderPage.clickCloseIcon();
    //     await purchaseOrderPage.clickSubmitBtn();
    //     await purchaseOrderPage.clickConfirmationYes();
    //     await page.waitForTimeout(2000);
    //     await purchaseOrderPage.getToastMessage(PurchaseOrderDataset[0].Toast);

    // });

    // //Verify the cancel button is working or not while creating the purchase order
    // test('TC002_Verify the cancel button', async () => {
    //     const purchaseOrderPage = new PurchaseOrderPage(page);
    //     const excelreader = new ExcelReader();
    //     await purchaseOrderPage.clickPurchaseModule();
    //     await page.waitForTimeout(1000);
    //     await purchaseOrderPage.clickPurchaseOrderModule();
    //     await page.waitForTimeout(1000);
    //     await purchaseOrderPage.clickAddPurchaseOrderBtn();
    //     await page.waitForTimeout(1000);
    //     const PurchaseOrderDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_PurchaseOrder');
    //     const { supplierName, PurchaseDate, Medicine, Quantity, Amount, CGST, SGST, Batch, ExpiryDate, UOMPurchase } = PurchaseOrderDataset[0];
    //     await purchaseOrderPage.enterPurchaseDetails(supplierName, PurchaseDate, Medicine, Quantity, Amount, CGST, SGST, Batch, ExpiryDate, UOMPurchase);
    //     await purchaseOrderPage.clickAddBtn();
    //     await purchaseOrderPage.clickCancelBtn();
    //     await purchaseOrderPage.clickConfirmationYes();
    //     await page.waitForTimeout(2000);
    // });

    
    // //Verify the clear button is working or not while creating the purchase order
    // test('TC003_Verify the clear button', async () => {
    //     const purchaseOrderPage = new PurchaseOrderPage(page);
    //     const excelreader = new ExcelReader();
    //     await purchaseOrderPage.clickPurchaseModule();
    //     await page.waitForTimeout(1000);
    //     await purchaseOrderPage.clickPurchaseOrderModule();
    //     await page.waitForTimeout(1000);
    //     await purchaseOrderPage.clickAddPurchaseOrderBtn();
    //     await page.waitForTimeout(1000);
    //     const PurchaseOrderDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_PurchaseOrder');
    //     const { supplierName, PurchaseDate, Medicine, Quantity, Amount, CGST, SGST, Batch, ExpiryDate, UOMPurchase } = PurchaseOrderDataset[0];
    //     await purchaseOrderPage.enterPurchaseDetails(supplierName, PurchaseDate, Medicine, Quantity, Amount, CGST, SGST, Batch, ExpiryDate, UOMPurchase);
    //     await purchaseOrderPage.clickClearBtn();
    //     await page.waitForTimeout(2000);
    // });

    // //Verify to View the purchase order Details
    // test('TC004_Verify to View Order Details', async () => {
    //     const purchaseOrderPage = new PurchaseOrderPage(page);
    //     const excelreader = new ExcelReader();
    //     await purchaseOrderPage.clickPurchaseModule();
    //     await page.waitForTimeout(1000);
    //     await purchaseOrderPage.clickPurchaseOrderModule();
    //     await page.waitForTimeout(1000);
    //     const PurchaseOrderDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_PurchaseOrder');
    //     await purchaseOrderPage.searchValue(PurchaseOrderDataset[0].Search);
    //     await purchaseOrderPage.clickViewBtn();
    //     await purchaseOrderPage.clickBackBtn();
    //     await page.waitForTimeout(2000);

    // });

    test('TC005_Add purchase order without mandatory fields', async () => {
        const purchaseOrderPage = new PurchaseOrderPage(page);
        const excelreader = new ExcelReader();
        await purchaseOrderPage.clickPurchaseModule();
        await page.waitForTimeout(1000);
        await purchaseOrderPage.clickPurchaseOrderModule();
        await page.waitForTimeout(1000);
        await purchaseOrderPage.clickAddPurchaseOrderBtn();
        await page.waitForTimeout(1000);
        await purchaseOrderPage.clickAddBtn();
        const getAllErrorMessage=await purchaseOrderPage.getErrorMessage();
        console.log(getAllErrorMessage);
         await page.waitForTimeout(500);

    });




});