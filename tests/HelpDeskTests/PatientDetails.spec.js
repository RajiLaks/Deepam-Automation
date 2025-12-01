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

    //Close the Add Patient box by clicking Cancel button
    await patientPage.APClose()
    await patientPage.APCloseYes()   
})

test("TC002 - Verify application displays Red Asterisk symbol across mandatory fields in Add Patient Box", async () => {     

    const patientPage = new PatientPage(page)
    //Select the Patient Details option in Top navbar 
    await patientPage.PDClick()

    //Click the Add Patient button
    await patientPage.APClick()

    //Verify Mandatory fields have Red Asterisk symbol across their field names
    await patientPage.VerifyMandatoryFields() 
})

test("TC003 - Verify application displays error message across all mandatory fields when user submits empty input in Add Patient Box", async () => {     

    const patientPage = new PatientPage(page)
    //Select the Patient Details option in Top navbar 
    await patientPage.PDClick()

    //Click the Add Patient button
    await patientPage.APClick()

    //Verify Error message is displayed across Mandatory fields when users enters empty values
    await patientPage.APSubmit()
    await patientPage.VerifyMandatoryErrorMessages() 

})

test("TC004 - Verify application adds patient when user submits with correct input fields", async () => {

    const patientPage = new PatientPage(page);
    const excelreader = new ExcelReader();
    const dataset = await excelreader.readExcel(
        'C:/Users/JV/Desktop/Deepam/Deepam-Automation/Utils/Deepam_Dataset.xlsx','Helpdesk_Patient');

    const raw = dataset[0];
    const data = {
        firstName: raw["First Name"],
        lastName: raw["Last Name"],
        gender: raw["Gender"],
        dob: raw["Date of Birth"] ? raw["Date of Birth"].replace(/-/g, "/") : "",
        mobileNumber: raw["Mobile Number"],
        email: raw["Email"],
        bloodGroup: raw["Blood Group"],
        companyName: raw["Company Name"]
    };

    await patientPage.PDClick();   // Open Patient Details
    await patientPage.APClick();   // Click Add Patient

    // Positive case – adding a valid patient
    await patientPage.AddPatient(data);
    await patientPage.APSubmit();
});

test.only("TC005 - Verify Search functionality works correctly for both valid and invalid inputs", async () => {     

    const patientPage = new PatientPage(page)
    const excelreader = new ExcelReader();
    const dataset = await excelreader.readExcel(
        'C:/Users/JV/Desktop/Deepam/Deepam-Automation/Utils/Deepam_Dataset.xlsx','Helpdesk_Patient')
    
    //Select the Patient Details option in Top navbar 
    await patientPage.PDClick()

    for (const row of dataset) {
        const searchText = row.searchText;
        const expected = row.expected == true || row.expected === "true";

        const result = await patientPage.SearchPatient(searchText);

        // Assert based on Excel expected value
        expect(result).toBe(expected);
    
    }
    })


})