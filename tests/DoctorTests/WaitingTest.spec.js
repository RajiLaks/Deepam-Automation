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

    test('TC003 - Verify that the Vitals screen displays the all data and it should be editable.', async()=>{
        const vitals = new WaitingFlow(page);
        const excelreader = new ExcelReader();
        const vitals_data = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level} = vitals_data[0];
        await vitals.Vitals(Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level);
    })
    
    test('TC004 - Verify that the Medical History fields should be present and editable', async()=>{
        const medicalHistory = new WaitingFlow(page);
        const excelreader = new ExcelReader();
        const Data_MH = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {diabeteseDetails, Subclinical_Hypothyroidism, asthma} = Data_MH[0];
        await medicalHistory.MedicalHistoryDropDown(diabeteseDetails, Subclinical_Hypothyroidism, asthma);
    })

    test('TC005 - Verify that the Surgery details field displays the data and it should be editable', async()=>{
        const surgeryhistory = new WaitingFlow(page);
        await surgeryhistory.Surgery_History();
    })

    test('TC006 - Verify that the Family details field displays the data and it should be editable', async()=>{
        const family_history = new WaitingFlow(page);
        await family_history.Family_History();
    })

    test('TC007 - Verify that the allergies details field displays the data and it should be editable', async()=>{
        const Allergieshistory = new WaitingFlow(page);
        await Allergieshistory.Allergies_Dropdown();
    })   
    
    test('TC008 - Verify that the OnExamination details field displays the data and it should be editable', async()=>{
        const onexamination = new WaitingFlow(page);
        await onexamination.On_Examination();
    }) 
    
    test('TC009 - Verify that the medicataion details field displays the data and it should be editable', async()=>{
        const medicaionDetails = new WaitingFlow(page);
        await medicaionDetails.Medicationdropdown();
    }) 

    test('TC010 - Verify that the life style details field displays the data and it should be editable', async()=>{
        const lifestyle = new WaitingFlow(page);
        await lifestyle.Life_Style();
    }) 

    test('TC011 - Verify that the appointment history details field displays the data and it should be editable', async()=>{
        const appointmenthistory = new WaitingFlow(page);
        await appointmenthistory.Appointment_History();
    }) 

    test('TC012 - Verify that the reports screen displays the data and it should be editable', async()=>{
        const reportsdetails = new WaitingFlow(page);
        await reportsdetails.Reports_Screen();
    }) 

    test('TC013 - Verify that the user can able to edit the NOTES details', async()=>{
        const notesflow = new WaitingFlow(page);
        const excelreader = new ExcelReader();
        const Data_Notes = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan} = Data_Notes[0];
        await notesflow.NotesScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan);
    })

    test('TC014 - Verify that the RX screen displays the data and it should be editable', async()=>{
        const rxscreen = new WaitingFlow(page);
        const excelreader = new ExcelReader();
        const Data_RX = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {medicine, Dosage, M_Count} = Data_RX[0];
        await rxscreen.RX_Flow(medicine, Dosage, M_Count);
    })

    test('TC015 - Verify that the Lab screen displays the data and it should be editable', async()=>{
        const labscreen = new WaitingFlow(page);
        await labscreen.LabFlow();
    })

    test('TC016 - Verify that the Summary screen displays the correct data.', async()=>{
        const summaryscreen = new WaitingFlow(page);
        await summaryscreen.SummaryFlow();
    })

})