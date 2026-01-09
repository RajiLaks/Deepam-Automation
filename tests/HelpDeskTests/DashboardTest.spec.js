const { test,expect } = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');
const {DashboardPage} = require ('../../Pages/HelpDeskPage/DashboardPage');
import { searchAvailableDoctor } from '../../Pages/HelpDeskPage/Availability_Utils';
import { ScheduleAppointment } from '../../Pages/HelpDeskPage/CreateSchedule_Utils';
 
let page;
let context;
 
test.describe('Helpdesk Dashboard', ()=>{
 
    test.beforeAll('Dashboard Module', async({browser})=>{
        context = await browser.newContext({
        viewport: { width: 1280, height: 600},
        });
        page = await context.newPage();        
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/JV/Desktop/Deepam/Deepam-Automation/Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL} = dataset[0];
        await loginpage.LaunchURL(URL);
        const {MobileNo, Password} = dataset[1];
        await loginpage.HelpDeskLogin(MobileNo, Password);
    })
 
 
test("TC001 - Verify application loads the Dashboard Page correctly", async () => {    
 
    const dashboardPage = new DashboardPage(page)
    //Verify Dashboard page is correctly opened
    await dashboardPage.verifyDashboardPage()
 
    //Scroll down the entire page up and down to see all data
    await dashboardPage.ScrollDashboard()      
})
 
test("TC002 - Verify Scheduled Consulation navigates to and fro correctly", async () => {    
 
    const dashboardPage = new DashboardPage(page)
    //Verify Dashboard page is correctly opened
    await dashboardPage.verifyDashboardPage()
 
    //Select the Scheduled Consulation Option
    await dashboardPage.SCOpen()
   
    //Navigate back to the Dashboard Page
    await dashboardPage.DashboardClick()
    await dashboardPage.DashboardConfirmYes()
})
 
 
test("TC003 - Enter valid input and view the available doctor", async () => {
    const dashboardPage = new DashboardPage(page)
    const excelreader = new ExcelReader();
    const dataset = await excelreader.readExcel(
        'C:/Users/JV/Desktop/Deepam/Deepam-Automation/Utils/Deepam_Dataset.xlsx','Helpdesk_Dashboard')
   
    //Import Availability flow    
    await searchAvailableDoctor(dashboardPage, dataset)
 
    //Open the Doctor Schedule and Close
    await dashboardPage.clickView()
    await dashboardPage.CreateScheduleBoxClose()
})
 
test("TC004 - Select the available doctor and Schedule appointment", async () => {    
    const dashboardPage = new DashboardPage(page)
    const excelreader = new ExcelReader();
    const dataset = await excelreader.readExcel(
        'C:/Users/JV/Desktop/Deepam/Deepam-Automation/Utils/Deepam_Dataset.xlsx','Helpdesk_Dashboard');
   
    //Import Availability flow    
    await searchAvailableDoctor(dashboardPage, dataset)
   
    //Import Create Schedule flow
    await ScheduleAppointment(dashboardPage,dataset)
})
 
test.only("TC005 - Verify Error message when submitted with empty input in Get Started section", async () => {    
    test.setTimeout(45000)
    const dashboardPage = new DashboardPage(page)
    const excelreader = new ExcelReader();
    const dataset = await excelreader.readExcel(
        'C:/Users/JV/Desktop/Deepam/Deepam-Automation/Utils/Deepam_Dataset.xlsx','Helpdesk_Dashboard');
   
    //Import Availability flow    
    await searchAvailableDoctor(dashboardPage, dataset)
   
    //Import Create Schedule flow
    await ScheduleAppointment(dashboardPage,dataset)
 
    //Click Next without entering any fields
    await dashboardPage.clickNext()
})
 
 
})