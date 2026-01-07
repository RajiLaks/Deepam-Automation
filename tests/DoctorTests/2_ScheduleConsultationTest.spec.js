const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {ScheduleConsultaionPage} = require ('../../Pages/DoctorPage/ScheduleConsultationPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');

let page;
let context;    

test.describe('TS01', async()=>{
    test.beforeAll('On-Demand Consultation flow',async({browser})=>{
        context = await browser.newContext({
        viewport: { width: 1200, height: 580},
        });
        await context.grantPermissions(['camera', 'microphone']);
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL,MobileNo, Password} = dataset[0];
        await loginpage.LaunchURL(URL);    
        await loginpage.DoctorLogin(MobileNo, Password);
    })

    test('TC001 - Verify that the Application navigate to the schedule consultation screen', async()=>{
        const schedule_screen = new ScheduleConsultaionPage(page);
        await schedule_screen.Navigate_scheduleconsultationScreen();
    })

    test('TC002 - Verify that the schedule screen displays the data.', async()=>{
        const schedule_screen = new ScheduleConsultaionPage(page);
        await schedule_screen.Navigate_ScheduleScreen();
    })

    test('TC003 - Verify that the Waiting screen displays the data.', async()=>{
        const schedule_screen = new ScheduleConsultaionPage(page);
        await schedule_screen.waitingScreen();
    })

    test('TC004 - Check that the Ongoing screen displays the data or not', async()=>{
        const ongoing_screen = new ScheduleConsultaionPage(page);
        const excelreader = new ExcelReader();
        const Data_Notes = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan} = Data_Notes[0];
        const Data_RX = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {medicine, Dosage, M_Count} = Data_RX[0];
        await ongoing_screen.ongoingScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count);
    })
})