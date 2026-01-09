const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {AppointmentPage} = require ('../../Pages/DoctorPage/AppointmentPage');
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
        const dataset = await excelreader.readExcel('C:/Users/Rajalakshmi/OneDrive - Datayaan Solutions Private Limited/Desktop/Deepam_Dataset.xlsx', 'Login');
        const {URL} = dataset[0];
        const {MobileNo, Password} = dataset[1];
        await loginpage.LaunchURL(URL);    
        await loginpage.HelpDeskLogin(MobileNo, Password);
    })

    test('TC001 - Verify that the Application navigate to the schedule consultation screen', async()=>{
        const schedule_appointmentpage = new AppointmentPage(page);
        await schedule_appointmentpage.navigateToScheduleConsult();
    })
    
    test('TC002 - Verify that the user can select the available doctor from the schedule consultation screen', async()=>{
        const schedule_appointmentpage = new AppointmentPage(page);
        await schedule_appointmentpage.ScheduleAvailableDoctor();
    })
})