const { expect } = require('@playwright/test');

class ReportPage {

    constructor(page) {
        this.page = page;


        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseModuleBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.reportsBtn = page.locator("//div[contains(text(),'Reports')]/../..");

        //Report Dashboard elements
        this.fromDate=page.locator("#startDate");
        this.toDate=page.locator("#endDate");
        this.reportsType=page.locator("#reportType");
        this.submitBtn=page.locator(".text-center>button[class='btn primary-btn submit-btn-size mr-3 btn-secondary']");
        this.downloadBtn=page.locator(".text-center>button~button");




    }

    async navigateToReportModule(){
        await this.reportsBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async selectFromdate(date,month,year){
        await this.fromDate.click();
        await this.page.locator("//span[@class='el-date-picker__header-label']").nth(0).click();
        const availableYearList=await this.page.locator("//td[@class='available' or 'available current today' ]/a");
        const availableMonthList=await this.page.locator("//td//div//a");
        
        for(let i=0; i<await availableYearList.count(); i++){
            const pickYear=await availableYearList.nth(i).textContent();

            if(pickYear===year){
              await this.page.locator(`//td[@class='available' or 'available current today' ]/a[text()='${year}']`).click();
              break;
            }
        }

        for(let j=0; j<await availableMonthList.count(); j++){
            const pickMonth=await availableMonthList.nth(j).textContent();

            if(pickMonth===month){
              await this.page.locator(`//td//div//a[text()='${month}']`).click();
              await this.page.locator(`//td//div//span[contains(text(),'${date}')]`).click();
              break;
            }
        }
    }


    async selectTodate(date,month,year){
        await this.toDate.click();
         await this.page.waitForTimeout(500);
        await this.page.locator("//span[@class='el-date-picker__header-label']").nth(2).click();
        const availableYearList=await this.page.locator("//td[@class='available' or 'available current today' ]/a");
        const availableMonthList=await this.page.locator("//td//div//a");
        
        for(let i=0; i<await availableYearList.count(); i++){
            const pickYear=await availableYearList.nth(i).textContent();

            if(pickYear===year){
              await this.page.locator(`//td[@class='available' or 'available current today' ]/a[text()='${year}']`).nth(1).click();
              break;
            }
        }

        for(let j=0; j<await availableMonthList.count(); j++){
            const pickMonth=await availableMonthList.nth(j).textContent();

            if(pickMonth===month){
              await this.page.locator(`//td//div//a[text()='${month}']`).nth(1).click();
              await this.page.locator(`//td//div//span[contains(text(),'${date}')]`).nth(1).click();
              break;
            }
        }
    }

   

    async reportType(type){
        await this.reportsType.selectOption({value : type});
    }
    async clickSubmitBtn(){
        await this.submitBtn.click();
    }
    async clickDownloadBtn(){
        await this.downloadBtn.click();
    }




} module.exports = { ReportPage };