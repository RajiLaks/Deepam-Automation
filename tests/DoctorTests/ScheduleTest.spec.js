const {test} = require ('@playwright/test');
const {scheduleScreen} = require ('../../Pages/DoctorPage/SchedulePage');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
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
        const schedule_flow = new scheduleScreen(page);
        await schedule_flow.SC();
    })

    test('TC002 - Verify that the Schedule screen displays the data.', async()=>{
        const schedule_flow = new scheduleScreen(page);
        await schedule_flow.ScheduleFlow();
    })

    test('TC003 - Verify that the Edit functionality', async()=>{
        const Schedule_flow = new scheduleScreen(page);
        await Schedule_flow.EditSchedule();
        const waiting_flow = new scheduleScreen(page);
        const excelreader = new ExcelReader();
        const Data = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count} = Data[0];
        await waiting_flow.waitingScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count);
    })

    /*test('TC004 - Verify that the Waiting screen displays the data.', async()=>{
        
    })*/
 })