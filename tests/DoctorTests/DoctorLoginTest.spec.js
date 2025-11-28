const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Page/LoginPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');

let page;
let context;

test.describe('Login', async()=>{
    test('TC001 - Login with valid data', async({page})=>{
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/RajalakshmiRajasekar/Desktop/Deepam_Automation/Deepam/Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL,MobileNo, Password} = dataset[0];
        await loginpage.LaunchURL(URL);    
        await loginpage.DoctorLogin(MobileNo, Password);
      });
  
});