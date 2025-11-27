const {test} = require ('@playwright/test');
const {UrlLaunchPage} = require ('../../Page/UrlLaunchPage');
const {ExcelReader} = require ('../../ExcelReader');

let page;
let context;

test.describe('Login', async()=>{
    test('TC001 - Login with valid data', async({page})=>{
        const loginpage = new UrlLaunchPage(page);
        const excelreader = new ExcelReader();
        const dataset = await excelreader.readExcel('C:/Users/JV/Desktop/Deepam/Deepam-Automation/Utils/Deepam_Dataset.xlsx', 'Login');
        const {URL} = dataset[0];
        await loginpage.LaunchURL(URL);
    })
  
})