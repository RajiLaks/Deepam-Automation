const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pages/Basepage/LoginPage');
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

    test('TC002 - Create a New Order with Valid Credential', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const { CustomerName, SearchMed, BatchNo, Quantity, Discount, Amount, Ref_Type, Reference, PaymentMode, Received } = data[0]
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await Create.NewOrder(CustomerName, SearchMed, BatchNo, Quantity, Discount, Amount, Ref_Type, Reference, PaymentMode, Received);
        await Create.ConfirmYes();
        await His.Back();

    });
    test('TC003 - Check Application displays Alert Message for Invalid Purchase of Medicine', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("exceldata:", data);

        const { CustomerName, Ref_Type, RefBy, Received } = data[0]
        const Create = new CreateNewOrder(page);
        // await Create.CreateNewOrder();
        await Create.NewOrder(CustomerName, data[1].SearchMed, data[1].BatchNo, data[1].Quantity, data[4].Discount, Ref_Type, RefBy, data[2].PaymentMode, Received);
        await expect(page.locator("//p[@class='el-message__content']")).toHaveText('Atleast one medicine required');

    });
    test.skip('TC004 - Create a New Order with 50% Discount', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const { CustomerName, SearchMed, BatchNo, Quantity, Discount, Amount, Ref_Type, RefBy, PaymentMode, Received } = data[0]
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        // await Create.CreateNewOrder();
        await page.reload()
        await Create.NewOrder(CustomerName, SearchMed, BatchNo, data[1].Quantity, data[4].Discount, Ref_Type, RefBy, PaymentMode, Received);
        await Create.ConfirmYes()
        await His.Back();


    });
    test.skip('TC005 - Create a New Order with 50% Discount and without entering Ref_By and Paymentmode', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        const { CustomerName, SearchMed, BatchNo, Quantity, Discount, Amount, Ref_Type, RefBy, PaymentMode, Received } = data[0]
        const Create = new CreateNewOrder(page);
        await Create.CreateNewOrder();
        await Create.NewOrder(CustomerName, SearchMed, BatchNo, data[1].Quantity, data[4].Discount, data[2].Ref_Type, RefBy, PaymentMode, Received);
        await page.reload()
    });
    test.skip('TC006 - Create and Edit the Medicine and pay', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        // console.log("Excel data:", data);
        // console.log("Excel data:", data[2]);

        const { CustomerName, SearchMed, BatchNo, Quantity, Received } = data[0]
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        // await Create.CreateNewOrder();
        await Create.NewOrder(CustomerName, SearchMed, BatchNo, data[2].Quantity, "", "", "", data[1].PaymentMode, Received);
        await Create.Edit_Material(SearchMed, BatchNo)
        await Create.Quantity(data[1].Quantity)
        await Create.Add_button()
        await Create.Received(Received)
        await Create.Pay_Button()
        await Create.ConfirmYes()
        await His.Back();

    });
    test.skip('TC007 - Create New Order with Multiple Medicine and pay', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        //     console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        //  await Create.CreateNewOrder();
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
        await His.Back();

    });

    test.skip('TC008 - Add Multiple Medicine then delete a medicine and pay', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        // console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        //  await Create.CreateNewOrder();
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
        await His.Back();
 
    });
    test.skip('TC009 - Goto Create Order page and View Ordered_History', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await Create.Search(data[1].CustomerName)
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Back()
    });
    test.skip('TC010 - Goto Reorder page and order the same medicine', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await His.View_History("", data[1].CustomerName)
        await His.Reorder_Button();
        await Create.PaymentMode(data[2].PaymentMode)
        await Create.Received(data[3].Received)
        await Create.Pay_Button();
        await Create.ConfirmYes();
        await Create.Back()


    });
    test.skip('TC011 - Goto Reorder page and Delete and add an medicine then reorder it', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
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
    test.skip('TC012 - Goto Reorder page and click the NewOrder module to Create a New Medicine order', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
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

    test.skip('TC013 - Goto Return the Purchased Medicine', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
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
    test.skip('TC014 - Goto Return page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
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


    test.skip('TC015 - Goto Purchased Bill page ', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await His.History_Button();
        await His.View_History(data[0].OrderID, data[1].CustomerName)
        await His.Bill_Button();
        await His.Back()


    });
    test.skip('TC016 - Goto New Order page and Click the Latest Module then Comeback', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await Create.Latest_Button();
        await Create.CloseIcon();


    });
    test.skip('TC017 - Goto Create Order page and Come back to Dashboard', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.CreateNewOrder();
        await Create.Dashboard_Button();
        await Create.ConfirmYes();
    })

    test.skip('TC018 - View the Appointment Orders and Click Create Cancel Icon', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.View_Appointment(data[0].CustomerName, data[0].OrderID, data[0].CusNumber);
        // await page.pause();
        await Create.CloseIcon();


    });
    test.skip('TC019 - View the Appointment Orders and pay the order', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.View_Appointment(data[0].CustomerName, data[0].OrderID, data[0].CusNumber);
        await Create.CreateRequest_Button();
        await Create.PaymentMode(data[2].PaymentMode);
        await Create.Received(data[0].PaymentMode);
        await Create.Pay_Button();
        await Create.ConfirmNo();

    });
    test.skip('TC020 - View the Appointment & goto Order page,then Reduce the Quantity and Pay', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.View_Appointment(data[0].CustomerName, data[0].OrderID, data[0].CusNumber);
        await Create.CreateRequest_Button();
        await His.Return_Quan(data[3].SearchMed, data[3].Quantity)
        await Create.PaymentMode(data[2].PaymentMode);
        await Create.Received(data[0].PaymentMode);
        await Create.Pay_Button();
        await Create.ConfirmNo();


    });
    test.skip('TC021 - Pay the Appointment order with Extra medicines', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.View_Appointment(data[0].CustomerName, data[0].OrderID, data[0].CusNumber);
        await Create.CreateRequest_Button();
        await Create.Search_Madicine(data[2].SearchMed);
        await Create.Batch(data[2].BatchNo);
        await Create.Quantity(data[2].Quantity);
        await Create.Add_button();
        await Create.PaymentMode(data[2].PaymentMode);
        await Create.Received(data[0].PaymentMode);
        await Create.Pay_Button();
        await Create.ConfirmNo();

    });
    test.skip('TC022 - Pay the Appointment order with Untick the Appointment medicine and add Extra medicines', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.View_Appointment(data[2].CustomerName, data[0].OrderID, data[0].CusNumber);
        await Create.CreateRequest_Button();
        await Create.Untick_Material(data[4].BatchNo);
        await Create.Search_Madicine(data[2].SearchMed);
        await Create.Batch(data[2].BatchNo);
        await Create.Quantity(data[2].Quantity);
        await Create.Add_button();
        await Create.PaymentMode(data[2].PaymentMode);
        await Create.Received(data[0].PaymentMode);
        await Create.Pay_Button();
        await Create.ConfirmNo();

    });
    test.skip('TC023 - Pay the Appointment Order', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateOrder_Appointment(data[0].CustomerName, data[0].OrderID, data[0].CusNumber);
        await Create.PaymentMode(data[2].PaymentMode);
        await Create.Received(data[0].PaymentMode);
        await Create.Pay_Button();
        await Create.ConfirmNo();
    });
    test.skip('TC024 - Go to Create Order page and Click the Latest module & Click CloseIcon', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        const His = new History(page);
        await Create.CreateNewOrder();
        await Create.Latest_Button();
        await Create.CloseIcon();

    });
    test.skip('TC025 - Goto Reorder page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.CreateNewOrder();
        await Create.Latest_Button();
        await Create.Search(data[3].OrderID)
        await Create.Viewlatest(data[0].CustomerName);
        await Create.Latest_Back();


    });
    test.skip('TC026 - Goto Reorder page and Click the Neworder Module', async () => {
        const data = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Pharmacist');
        console.log("Excel data:", data);
        const Create = new CreateNewOrder(page);
        await Create.CreateNewOrder();
        await Create.Latest_Button();
        await Create.Search(data[3].OrderID)
        await Create.Viewlatest(data[0].CustomerName); 
        await Create.CreateRequest_Button();
        await page.waitForTimeout(2000)

    });
});