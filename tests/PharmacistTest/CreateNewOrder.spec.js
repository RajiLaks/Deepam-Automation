const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/BasePage/LoginPage');
const { CreateNewOrder } = require('../../Pages/PharmacistPage/CreateNewOrder');
const { History } = require('../../Pages/PharmacistPage/History');
const { ExcelReader } = require('../../Utils/ExcelReader');
const excelreader = new ExcelReader();

let page;
let context;

test.describe.serial('Pharmacist', () => {

    test.beforeAll('TC001 - Login with valid data', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

    });
    test('TC001 - Login Pharmacist', async () => {
        const loginpage = new LoginPage(page);
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const { MobileNo, Password } = dataset[2];
        await loginpage.LaunchURL(dataset[0].URL);
        await loginpage.PharmacistLogin(MobileNo, Password);
        await page.waitForTimeout(2000);
    });

    test.skip('TC002 - Create a New Order with Valid Credential', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const { CustomerName, SearchMed, BatchNo, Quantity, Discount, Amount, Reference, PaymentMode, Received } = data[0]
        const Create = new CreateNewOrder(page);
        await Create.NewOrder(CustomerName, SearchMed, BatchNo, Quantity, PaymentMode, Received);
        await Create.ConfirmYes();
        await Create.Back();

    });
    test.skip('TC003 - Create a New Order with invalid Credential', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const { CustomerName, SearchMed, BatchNo } = data[0]
        const Create = new CreateNewOrder(page);
        await Create.NewOrder(CustomerName, SearchMed, BatchNo, data[1].Quantity, data[1].PaymentMode, data[1].Received);

    });
    test.skip('TC004 - Create and Edit the Medicine and pay', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        console.log("Excel data:", data[2]);

        const { CustomerName, SearchMed, BatchNo, Quantity, Received } = data[0]
        const Create = new CreateNewOrder(page);
        await Create.NewOrder(CustomerName, SearchMed, BatchNo, data[1].Quantity, data[1].PaymentMode, data[1].Received);
        await Create.Edit_Material(SearchMed, BatchNo)
        await Create.Quantity(Quantity)
        await Create.Add_button()
        await Create.Received(data[2].Received)
        await Create.Pay_Button()
        await Create.ConfirmYes()
    });
    test.skip('TC005 - Create New Order with Multiple Medicine and pay', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.CreateNewOrder();
        await Create.CustomerName(data[1].CustomerName);

        for (let i = 0; i < data.length; i++) {

            await Create.Search_Madicine(data[i].SearchMed);
            await Create.Batch(data[i].BatchNo);
            await Create.Quantity(data[i].Quantity);
            await Create.Add_button()
        }

        await Create.PaymentMode(data[2].PaymentMode);
        await Create.Received(data[2].PaymentMode);
        await Create.Pay_Button();
        await Create.ConfirmYes();

    });

    test.skip('TC006 - Add Multiple Medicine then delete a medicine and pay', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.CreateNewOrder();
        await Create.CustomerName(data[1].CustomerName);

        for (let i = 0; i < data.length; i++) {

            await Create.Search_Madicine(data[i].SearchMed);
            await Create.Batch(data[i].BatchNo);
            await Create.Quantity(data[i].Quantity);
            await Create.Add_button()
        }

        await Create.Delete_Material(data[1].SearchMed)
        await Create.PaymentMode(data[2].PaymentMode);
        await Create.Received(data[2].PaymentMode);
        await Create.Pay_Button();
        await Create.ConfirmYes();
    });
    test.skip('TC007 - Goto Create Order page and View Ordered_History', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await Create.Back()
    });
        test.skip('TC008 - Goto Reorder page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Reorder_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();

    });
       test('TC009 - Goto Reorder page and order the same medicine', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Reorder_Button();
        await Create.PaymentMode(data[2].PaymentMode)
        await Create.Received(data[3].Received)
        await Create.Pay_Button();
        await Create.ConfirmYes();



    });
        test.skip('TC010 - Goto Reorder page from there go to NewOrder page', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Reorder_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();

    });
    test.skip('TC011 - Goto Return page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Return_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();

    });

    
    test.skip('TC012 - Goto New Order page and Click the Latest Module then Comeback', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await Create.Latest_Button();
        await Create.CancelIcon();


    });
        test.skip('TC013 - Goto Create Order page and Come back to Dashboard', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.CreateNewOrder();
        await Create.Dashboard_Button();
        await Create.ConfirmYes();
    })
 
    test.skip('TC014 - Goto Reorder page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Reorder_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();

    });
    test.skip('TC015 - Goto Reorder page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Reorder_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();

    });
    test.skip('TC016 - Goto Reorder page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Reorder_Button();
        await Create.NewOrder_Button();
        await Create.ConfirmYes();

    });
});