/*Objective: To Verify Patient Details Module of Deepam Hospital Web Application
Author: Vighnesh J
Created by: Vighnesh J
Created date: 27/11/2025
Objective of the Update: Nil
Updated by: Nil
Updated date: Nil
Application version/Env: QA Env
Remarks: nil */

const { test,expect } = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');
const {PatientPage} = require ('../../Pages/HelpDeskPage/PatientPage')

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
  

test("TC001 - Verify application opens and closes the Add Patient Box", async () => {     

    const patientPage = new PatientPage(page)
    //Select the Patient Details option in Top navbar 
    await patientPage.PDClick()

    //Click the Add Patient button
    await patientPage.APClick()
    
    
})

})