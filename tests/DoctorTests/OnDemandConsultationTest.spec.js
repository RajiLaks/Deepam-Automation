const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');
const {OnDemandConsultation} = require ('../../Pages/DoctorPage/OnDemandConsultationPage');

let page;
let context;

test.describe('TS01', async()=>{
    test.beforeAll('On-Demand Consultation flow',async({browser})=>{
        context = await browser.newContext({
        viewport: { width: 1200, height: 580},
        });
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/Deepam_Automation/Deepam/Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL,MobileNo, Password} = dataset[0];
        await loginpage.LaunchURL(URL);    
        await loginpage.DoctorLogin(MobileNo, Password);
    })

    test('TC001 - Navigate to the On-Demand consultation screen', async()=>{
        const ondemandconsultation = new OnDemandConsultation(page);
        await ondemandconsultation.ODC_Screen();
    })

    test('TC002 - Verify that the Waiting appointment screen', async()=>{
        const waiting = new OnDemandConsultation(page);
        await waiting.Waiting();
    })

    test('TC003 - Verify that the ongoing appointment screen', async()=>{
        const ongoing = new OnDemandConsultation(page);
        await ongoing.OngoingScreen();
    })

    test('TC004 - Verify that the Vitals screen displays the all data and it should be editable.', async()=>{
        const vitals = new OnDemandConsultation(page);
        const excelreader = new ExcelReader();
        const vitals_data = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level} = vitals_data[0];
        await vitals.Vitals(Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level);
    })
    
    test('TC005 - Verify that the Medical History fields should be present and editable', async()=>{
        const medicalHistory = new OnDemandConsultation(page);
        const excelreader = new ExcelReader();
        const Data_MH = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {diabeteseDetails} = Data_MH[0];
        await medicalHistory.MedicalHistoryDropDown(diabeteseDetails);
    })

})
