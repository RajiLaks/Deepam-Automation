const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage')
const {HistoryScreen} = require ('../../Pages/DoctorPage/HistoryPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');

let page;
let context;

test.describe('TS03', async()=>{
    test.beforeAll('On-Demand Consultation flow',async({browser})=>{
        context = await browser.newContext({
        viewport: { width: 1200, height: 580},
        });
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL,MobileNo, Password} = dataset[0];
        await loginpage.LaunchURL(URL);    
        await loginpage.DoctorLogin(MobileNo, Password);
    })

    test('TC001 - Navigate to the History screen in Doctor flow', async()=>{
        const history = new HistoryScreen(page);
        await history.Nav_History();
    })

    test('TC002 - Check the history data correctly', async()=>{
        const history = new HistoryScreen(page);
        await history.HistoryFlow();
    })

    test('TC003 - Check the Search functionality works correctly or not', async()=>{
        const history = new HistoryScreen(page);
        await history.SearchFunctionality();
    })

    test('TC004 - Check the Search functionality with invalid data', async()=>{
        const history = new HistoryScreen(page);
        await history.SearchInvalidFlow();
    })

})