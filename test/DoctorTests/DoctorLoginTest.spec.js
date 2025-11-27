const {test} = require ('@playwright/test');
const {UrlLaunchPage} = require ('../../Page/UrlLaunchPage');
const {DoctorLoginPage} = require ('../../Page/DoctorPage/DoctorLoginPage');
const {ExcelReader} = require ('../../ExcelReader');

let page;
let context;

test.describe('Login', async()=>{
    test.beforeAll('TC001 - URL launched successfully', async({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginpage = new UrlLaunchPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/Deepam_Automation/Deepam/Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL} = dataset[0];
        await loginpage.LaunchURL(URL);
        const signin = new DoctorLoginPage(page);
        await signin.DoctorLoginPage();
      })

      test('TC002 - Verify the user login the application with valid data', async()=>{
        const loginpage = new DoctorLoginPage(page);
        await loginpage.DoctorLoginPage();

      })
  
})