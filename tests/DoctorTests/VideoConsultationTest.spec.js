const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');
const {VideoConsultationPage} = require ('../../Pages/DoctorPage/VideoConsultationPage');
const { on } = require('events');

let page;
let context;

test.describe('Video Consultation Tests for Doctor', () => {
    test.beforeEach('TC001 - Login with valid credentials', async ({browser}) => {
        context = await browser.newContext({viewport: { width: 1200, height: 580}});
        await context.grantPermissions(['camera', 'microphone']);
        page = await context.newPage();
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/Rajalakshmi/OneDrive - Datayaan Solutions Private Limited/Desktop/Deepam_Dataset.xlsx', 'Login');
        const {URL} = dataset[0];
        const {MobileNo, Password} = dataset[0];
        await loginpage.LaunchURL(URL);    
        await loginpage.DoctorLogin(MobileNo, Password);
        const scheudle_Consultation = new VideoConsultationPage(page);
        await scheudle_Consultation.click_ScheduleConsultation();
    });

    test.afterEach('Close Browser', async () => {
        await context.close();
    });

  /*  test('TC002 - Verify that the waiting appointments', async () => {
        const waitingScreen = new VideoConsultationPage(page);
        await waitingScreen.verify_WaitingAppointments();
        await waitingScreen.close_EditPage();
    });

    test('TC003 - Verify that the doctor is able to join the waiting video consultation call', async () => {
        const joinCall = new VideoConsultationPage(page);
        await joinCall.verify_WaitingAppointments();
        await joinCall.close_EditPage();
        await joinCall.join_WaitingCall();
        await joinCall.Mute_Unmute();
        await joinCall.VideoOff_On();
        await joinCall.joincall();
        await joinCall.click_EHR_screen();
        await joinCall.click_Vitals();
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/Rajalakshmi/OneDrive - Datayaan Solutions Private Limited/Desktop/Deepam_Dataset.xlsx', 'Doctor_EHR');
        const {Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level,diabeteseDetails, Subclinical_Hypothyroidism, asthma} = dataset[0];
        await joinCall.EditVitals(Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level);
        await joinCall.click_MedicalHistory();
        await joinCall.EditMedicalHistory_selectOptions(diabeteseDetails, Subclinical_Hypothyroidism, asthma);
    });*/

    test('TC004 - Verify that the Ongoing Appointments', async () => {
        const ongoingScreen = new VideoConsultationPage(page);
        await ongoingScreen.click_OngoingScreen();
        await ongoingScreen.verify_OngoingAppointments();
        await ongoingScreen.Mute_Unmute();
        await ongoingScreen.VideoOff_On();
        await ongoingScreen.joincall();
        await ongoingScreen.click_EHR_screen();
        await ongoingScreen.click_Vitals();
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/Rajalakshmi/OneDrive - Datayaan Solutions Private Limited/Desktop/Deepam_Dataset.xlsx', 'Doctor_EHR');
        const {Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level,diabeteseDetails, Subclinical_Hypothyroidism, asthma} = dataset[0];
        await ongoingScreen.EditVitals(Systolic, Diastolic, height, weight, Temp, pulseRate, SpO2Level);
        await ongoingScreen.click_MedicalHistory();
        await ongoingScreen.EditMedicalHistory_selectOptions(diabeteseDetails, Subclinical_Hypothyroidism, asthma);
        await ongoingScreen.click_SurgicalHistory();
        await ongoingScreen.Edit_SurgicalHistory();
        await ongoingScreen.click_FamilyHistory();
        await ongoingScreen.Edit_FamilyHistory();

    });

});
