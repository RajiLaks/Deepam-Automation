const {test} = require ('@playwright/test');
const {WaitingFlow} = require ('../../Pages/DoctorPage/WaitingPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');

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
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL,MobileNo, Password} = dataset[0];
        await loginpage.LaunchURL(URL);    
        await loginpage.DoctorLogin(MobileNo, Password);
    })

    test('TC001 - Navigate to the On-Demand consultation screen', async()=>{
        const ondemandconsultation = new WaitingFlow(page);
        await ondemandconsultation.ODC_Screen();
    })

    test('TC002 - Verify that the Waiting appointment screen', async()=>{
        const waiting = new WaitingFlow(page);
        await waiting.waitingScreen();
    })

    test('TC003 - Verify that the user can able to edit the NOTES details', async()=>{
        const notesflow = new WaitingFlow(page);
        const excelreader = new ExcelReader();
        const Data_Notes = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan} = Data_Notes[0];
        await notesflow.NotesScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan);
    })

    test('TC004 - Verify that the RX screen displays the data and it should be editable', async()=>{
        const rxscreen = new WaitingFlow(page);
        const excelreader = new ExcelReader();
        const Data_RX = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {medicine, Dosage, M_Count} = Data_RX[0];
        await rxscreen.RX_Flow(medicine, Dosage, M_Count);
    })

    test('TC005 - Verify that the Lab screen displays the data and it should be editable', async()=>{
        const labscreen = new WaitingFlow(page);
        await labscreen.LabFlow();
    })

    test('TC006 - Verify that the Summary screen displays the correct data.', async()=>{
        const summaryscreen = new WaitingFlow(page);
        await summaryscreen.SummaryFlow();
    })

})