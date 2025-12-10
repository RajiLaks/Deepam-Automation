const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { ProductPage } = require('../../Pages/PharmacyAdminPage/ProductPage');
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

    // //Add the new product in the Product Master
    // test('TC001 Product with valid data', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.clickAddProductBtn();
    //     await productPage.clickCloseIcon();
    //     await productPage.clickAddProductBtn();
    //     const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
    //     const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[0];
    //     await productPage.enterProductDetails(Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired);
    //     await productPage.fileUpload("C:/Users/ArunkumarRagavan/Pictures/Screenshots/Screenshot 2025-12-01 100053.png");
    //     await productPage.clickSubmitBtn();
    //     await productPage.getToastMessage(productDataset[0].Toast);
    //     await page.waitForTimeout(2000);

    // });

    // //Cancel the process of add product 
    // test('TC002_Cancel the add product process', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.clickAddProductBtn();
    //     await productPage.clickCloseIcon();
    //     await productPage.clickAddProductBtn();
    //     const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
    //     const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[0];
    //     await productPage.enterProductDetails(Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired);
    //     await productPage.fileUpload("C:/Users/ArunkumarRagavan/Pictures/Screenshots/Screenshot 2025-12-01 100053.png");
    //     await productPage.clickCancelBtn();
    //     await productPage.clickConfirmationNo();
    //     await productPage.clickCancelBtn();
    //     await productPage.clickConfirmationYes();
    //     await page.waitForTimeout(2000);
    // });

    // //Add the product in the product master list with invalid data
    // test('TC003_Add product with invalid data', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.clickAddProductBtn();
    //     await productPage.clickCloseIcon();
    //     await productPage.clickAddProductBtn();
    //     const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
    //     const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[1];
    //     await productPage.enterProductDetails(Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired);
    //     await productPage.fileUpload("C:/Users/ArunkumarRagavan/Pictures/Screenshots/Screenshot 2025-12-01 100053.png");
    //     await productPage.clickSubmitBtn();
    //     console.log(await productPage.validateErrorMessage());

    // });

    // //Add the product in the product master list without data
    // test('TC004_Add product without data', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.clickAddProductBtn();
    //     await productPage.clickSubmitBtn();
    //     console.log(await productPage.validateErrorMessage());
<<<<<<< Updated upstream
    // });

    // //Add the product in the product master list without data
    // test('TC005_Edit the existing product details', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
    //     const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[2];
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.searchValue(productDataset[0].Search);
    //     await productPage.clickEditBtn();
    //     await productPage.enterProductDetails(Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired);
    //     await productPage.clickSubmitBtn();
    //     await productPage.getToastMessage(productDataset[1].Toast);
    //     await page.waitForTimeout(1000);

    // });

    // //Delete the existing product details
    // test('TC006_Delete the existing product details', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
    //     const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[2];
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.searchValue(productDataset[0].Search);
    //     await productPage.clickDeleteBtn();
    //     await productPage.clickConfirmationYes();
    //     await productPage.getToastMessage(productDataset[2].Toast);
    //     await page.waitForTimeout(1000);

    // });

    // //User can able to delete the product details, if that product is mapped with orders
    // test('TC007_Delete the product details if the product is mapped with orders', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
    //     const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[2];
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.searchValue(productDataset[0].Search);
    //     await productPage.clickDeleteBtn();
    //     await productPage.clickConfirmationYes();
    //     await productPage.getToastMessage(productDataset[3].Toast);
    //     await page.waitForTimeout(1000);
    // });

 //Batch Tab

    // //User can able to dleete the product details, if that product is mapped with orders
    // test('TC008_Delete the product details if the product is mapped with orders', async () => {
    //     const productPage = new ProductPage(page);
    //     const excelreader = new ExcelReader();
    //     const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
    //     const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[2];
    //     await productPage.clickProductModule();
    //     await productPage.clickProductBtn();
    //     await productPage.clickBatchTab();
    //     await productPage.searchValue(productDataset[0].Search);
    //     await productPage.clickDeleteBtn();
    //     await productPage.clickConfirmationYes();
    //     await productPage.getToastMessage(productDataset[4].Toast);
    //     await page.waitForTimeout(1000);
    // });


    //Get the overall  purchase and mrp values
    test('TC009_Get the purchase and MRP amount', async () => {
=======

    // });

    //Add the product in the product master list without data
    test('TC005_Edit the existing product details', async () => {
>>>>>>> Stashed changes
        const productPage = new ProductPage(page);
        const excelreader = new ExcelReader();
        const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
        const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[2];
        await productPage.clickProductModule();
        await productPage.clickProductBtn();
<<<<<<< Updated upstream
        await page.waitForTimeout(1000);
        const amount=await productPage.getTotalAmount();
        console.log(amount);
       
    });

    //Get the overall  purchase and mrp values
    test('TC010_Get the purchase and MRP amount', async () => {
        const productPage = new ProductPage(page);
        const excelreader = new ExcelReader();
        const productDataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'PharmacyAdmin_Product');
        const { Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired } = productDataset[2];
        await productPage.clickProductModule();
        await productPage.clickProductBtn();
        await productPage.clickBatchTab();
        await page.waitForTimeout(1000);
        const amount=await productPage.getTotalAmount();
        console.log(amount);
       
=======
        await productPage.searchValue(productDataset[0].Search);
        await productPage.clickEditBtn();
        await productPage.enterProductDetails(Name, Manufacturer, MRP, BestPrice, ProductCategory, ProductType, UOMPurchase, HSNCode, CGST, SGST, GenericName, PrescriptionRequired);
        await productPage.clickSubmitBtn();
        await productPage.getToastMessage(productDataset[1].Toast);
        await page.waitForTimeout(1000);

>>>>>>> Stashed changes
    });



});