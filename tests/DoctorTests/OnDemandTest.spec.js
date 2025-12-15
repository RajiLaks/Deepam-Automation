const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {OnDemandPage} = require ('../../Pages/DoctorPage/OnDemandPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');
const { on } = require('events');

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
        const ondemandconsultation = new OnDemandPage(page);
        await ondemandconsultation.nav_OndemandScreen();
    })

    test('TC001 - Verify that the waiting appointment are displaying correctly', async()=>{
        const waitingroom = new OnDemandPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level, diabeteseDetails, Subclinical_Hypothyroidism, asthma, Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count} = dataset[0];
        await waitingroom.Waitingroom();
        await waitingroom.Vitals(Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level);
        await waitingroom.MedicalHistoryDropDown(diabeteseDetails, Subclinical_Hypothyroidism, asthma);
        await waitingroom.Surgery_History();
        await waitingroom.Family_History();
        await waitingroom.Allergies_Dropdown();
        await waitingroom.On_Examination();
        await waitingroom.Medicationdropdown();
        await waitingroom.Life_Style();
        await waitingroom.Appointment_History();
        await waitingroom.Reports_Screen();
        await waitingroom.NotesScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan);
        await waitingroom.RX_Flow(medicine, Dosage, M_Count);
        await waitingroom.LabFlow();
        await waitingroom.SummaryFlow();
    });

    test('TC002 - Verify that the ongoing appointment details should display the correct data', async()=>{
        const waitingroom = new OnDemandPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count} = dataset[0];
        await waitingroom.ongoingScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan, medicine, Dosage, M_Count);
    })

    test('TC003 - Verify that the accepted waiting appointment should navigate to the ongoing screen', async()=>{
        const waitingroom = new OnDemandPage(page);
        await waitingroom.AcceptOnly();
    })

  /*  test('TC004 - Check the Ongoing appointment', async()=>{
        const ongoingroom = new OnDemandPage(page);
        await ongoingroom.
    })
     */

})