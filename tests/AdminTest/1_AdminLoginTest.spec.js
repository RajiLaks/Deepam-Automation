const {test} = require ('@playwright/test');
const {LoginPage} = require ('../../Pages/BasePage/LoginPage');
const {ExcelReader} = require ('../../Utils/ExcelReader');

// let page;
// let context;

test.describe('Login', async()=>{
    test('TC001 - Login with valid data', async({page})=>{
        const loginpage = new LoginPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('Utils//Deepam_Dataset.xlsx', 'Login');
        const {MobileNo, Password} = dataset[4];
        await loginpage.LaunchURL(dataset[0].URL);    
        await loginpage.AdminLogin(MobileNo, Password);
      });
  
});