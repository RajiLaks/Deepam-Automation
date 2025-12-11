const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {WaitingFlow} = require ('../../Pages/DoctorPage/WaitingPage');
const {OngoingFlow} = require ('../../Pages/DoctorPage/OngoingPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');

let page;
let context;

test.describe('TS01', async()=>{
    test.beforeEach('On-Demand Consultation flow',async({browser})=>{
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

    test('TC001 - Navigate to the On-Demand consultation screen', async()=>{
        const ondemandconsultation = new WaitingFlow(page);
        await ondemandconsultation.ODC_Screen();
    })

    test('TC002 - Check that the Ongoing screen displays the data or not', async()=>{
        const ongoing_screen = new OngoingFlow(page);
        const excelreader = new ExcelReader();
        const Data_Notes = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan} = Data_Notes[0];
        const Data_RX = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {medicine, Dosage, M_Count} = Data_RX[0];
        await ongoing_screen.ongoingScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count);
    })

})