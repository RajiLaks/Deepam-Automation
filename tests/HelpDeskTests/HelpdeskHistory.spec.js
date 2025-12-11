/*Objective: To Verify History Module flow of Helpdesk for Deepam Hospital Web Application
Author: Vighnesh J
Created by: Vighnesh J
Created date: 09/12/2025
Objective of the Update: Nil
Updated by: Nil
Updated date: Nil
Application version/Env: QA Env
Remarks: nil */

const { test,expect } = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');
const {HistoryPage} = require ('../../Pages/HelpDeskPage/HistoryPage');

let page;
let context;

test.describe('Patient Details', async()=>{

    test.beforeAll('Patient Module', async({browser})=>{
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
  

test("TC001 - Verify application loads the History Page correctly", async () => {     

    const historyPage = new HistoryPage(page)
    //Select the History option in Top navbar 
    await historyPage.HistoryClick()

    //Verify application loads the History page correctly
    await historyPage.verifyHistoryPage()       
})

test("TC002 - Verify Back button works corectly in History Page", async () => {     

    const historyPage = new HistoryPage(page)
    //Select the History option in Top navbar 
    await historyPage.HistoryClick()

    //Click the back button and it should navigate to Dashboard page
    await historyPage.BackNavigation()  
    
    //Verify application has navigated back correctly
    await historyPage.verifyDashboardPage()
})

test("TC003 - Verify next,previous pagenation buttons works properly", async () => {     

    const historyPage = new HistoryPage(page)
    //Select the History option in Top navbar 
    await historyPage.HistoryClick()

    //Navigate to Next Pages
    await historyPage.Nextpage()
    await historyPage.Nextpage()

    //Navigate to Previous Pages
    await historyPage.Previouspage()
    await historyPage.Previouspage()   
})

test.only("TC004 - Verify View Box opens and closes correctly under Actions column", async () => {     

    const historyPage = new HistoryPage(page)
    //Select the History option in Top navbar 
    await historyPage.HistoryClick()

    //Click the View option under Action column
    await historyPage.ViewOpen()
    await historyPage.ScrollViewBox()
    await historyPage.ViewClose()
})

})