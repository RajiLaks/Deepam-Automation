const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/Basepage/LoginPage');
const { CreateNewOrder } = require('../../Pages/PharmacistPage/CreateNewOrder');
const { History } = require('../../Pages/PharmacistPage/History');
const { ExcelReader } = require('../../Utils/ExcelReader');
const excelreader = new ExcelReader();

let page;
let context;

test.describe('Pharmacist', () => {

    test.beforeEach('TC001 - Login with valid data', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const { MobileNo, Password } = dataset[2];
        await loginpage.LaunchURL(dataset[0].URL);
        await loginpage.PharmacistLogin(MobileNo, Password);
        await page.waitForTimeout(2000);
    });

    test.afterEach(async () => {
        // Close after each test
        await context.close();
    });
    test.skip('TC001 - Goto Create Order page and View Ordered_History', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await Create.History_Search(data[1].CustomerName)
        await His.View_History("", data[1].CustomerName)
        await His.Back()
    });
    test('TC002 - Goto Reorder page and order the same medicine', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await Create.History_Search(data[1].CustomerName)
        await His.View_History("", data[1].CustomerName)
        await His.Reorder_Button();
        await Create.PaymentMode(data[2].PaymentMode)
        await Create.Received(data[3].Received)
        await Create.Pay_Button();
        await Create.ConfirmYes();
        await His.Back()


    });
    test('TC003 - Goto Reorder page and Delete and add an medicine then reorder it', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Reorder_Button();
        await Create.Delete_Material(data[0].SearchMed, data[4].BatchNo);
        await Create.Search_Madicine(data[1].SearchMed);
        await Create.Batch(data[1].BatchNo);
        await Create.Quantity(data[1].Quantity);
        await Create.Add_button();
        await Create.PaymentMode(data[2].PaymentMode)
        await Create.Received("")
        await Create.Pay_Button()
        await Create.ConfirmNo()
    });
    test.skip('TC004 - Goto Reorder page and click the NewOrder module to Create a New Medicine order', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await His.View_History("", data[1].CustomerName)
        await His.Reorder_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();
        await Create.NewOrder(data[2].CustomerName, data[1].SearchMed, data[1].BatchNo, data[1].Quantity, "", data[0].Ref_Type, data[0].RefBy, data[1].PaymentMode, data[1].Received);
        await Create.ConfirmYes();



    });

    test.skip('TC005 - Goto Return the Purchased Medicine', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Return_Button()
        await His.Return_Quan(data[0].SearchMed, data[1].Quantity);
        await His.Return_Submit_Yes()
        await Create.ConfirmYes();

    });
    test.skip('TC006 - Goto Return page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Return_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();
        await Create.NewOrder(data[2].CustomerName, data[1].SearchMed, data[1].BatchNo, data[1].Quantity, "", data[0].Ref_Type, data[0].RefBy, data[1].PaymentMode, data[1].Received);
        await Create.ConfirmYes();

    });


    test.skip('TC007 - Goto Purchased Bill page ', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Bill_Button();
        await His.Back()


    });
});