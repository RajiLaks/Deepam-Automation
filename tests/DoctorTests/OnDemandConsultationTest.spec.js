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
        const dataset = await excelreader.readExcel('Utils/Deepam_Dataset.xlsx', 'Login');
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

<<<<<<< Updated upstream
    test('TC003 - Verify that the Ongoing screen', async()=>{
        
=======
    test('TC003 - Verify that the ongoing appointment screen', async()=>{
>>>>>>> Stashed changes
        const ongoing = new OnDemandConsultation(page);
        await ongoing.OngoingScreen();
    })

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
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
        const {diabeteseDetails, Subclinical_Hypothyroidism, asthma} = Data_MH[0];
        await medicalHistory.MedicalHistoryDropDown(diabeteseDetails, Subclinical_Hypothyroidism, asthma);
    })

    test('TC006 - Verify that the Surgery details field displays the data and it should be editable', async()=>{
        const surgeryhistory = new OnDemandConsultation(page);
        await surgeryhistory.Surgery_History();
    })

    test('TC007 - Verify that the Family details field displays the data and it should be editable', async()=>{
        const family_history = new OnDemandConsultation(page);
        await family_history.Family_History();
    })

    test('TC008 - Verify that the allergies details field displays the data and it should be editable', async()=>{
        const Allergieshistory = new OnDemandConsultation(page);
        await Allergieshistory.Allergies_Dropdown();
    })   
    
    test('TC009 - Verify that the OnExamination details field displays the data and it should be editable', async()=>{
        const onexamination = new OnDemandConsultation(page);
        await onexamination.On_Examination();
    }) 
    
    test('TC010 - Verify that the medicataion details field displays the data and it should be editable', async()=>{
        const medicaionDetails = new OnDemandConsultation(page);
        await medicaionDetails.Medicationdropdown();
    }) 

    test('TC011 - Verify that the life style details field displays the data and it should be editable', async()=>{
        const lifestyle = new OnDemandConsultation(page);
        await lifestyle.Life_Style();
    }) 

    test('TC012 - Verify that the appointment history details field displays the data and it should be editable', async()=>{
        const appointmenthistory = new OnDemandConsultation(page);
        await appointmenthistory.Appointment_History();
    }) 

    test('TC013 - Verify that the reports screen displays the data and it should be editable', async()=>{
        const reportsdetails = new OnDemandConsultation(page);
        await reportsdetails.Reports_Screen();
    }) 

    test('TC014 - Verify that the Notes screen displays the data and it should be editable', async()=>{
        const notesscreen = new OnDemandConsultation(page);
        const excelreader = new ExcelReader();
        const Data_Notes = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan} = Data_Notes[0];
        await notesscreen.NotesScreen(Cheif_Complaint, Symptoms, Diagnosis_data, treatment_plan);
    })

<<<<<<< Updated upstream
    test('TC015 - Verify that the RX screen displays the data and it should be editable', async()=>{
        const rxscreen = new OnDemandConsultation(page);
        const excelreader = new ExcelReader();
        const Data_RX = await excelreader.readExcel("Utils/Deepam_Dataset.xlsx", "Doctor-EHR");
        const {medicine} = Data_RX[0];
        await rxscreen.RX(medicine);
    })

})
=======
})
=======
} )
>>>>>>> Stashed changes
>>>>>>> Stashed changes
