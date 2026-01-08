const { expect } = require('@playwright/test');

class SalesPage {

    constructor(page) {
        this.page = page;


        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseModuleBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.reportsBtn = page.locator("//div[contains(text(),'Reports')]/../..");

        //sales order dashboard elements
        this.search=page.locator("#saleshistoryFilter");
        this.viewBtn=page.locator(".view-btn");
        this.closeBtn=page.locator("button[aria-label='Close']");

        this.getDetails=page.locator("//div[@class='ag-center-cols-container']//div[@col-id='product']/../div");

        this.noRecordFound=page.locator("(//span[text()='No record found'])[1]");

    }

    async navigateToSalesModule(){
        await this.salesBtn.click();
        await this.page.waitForTimeout(1000);
    }

   

    async searchValue(value){
        await this.search.fill(value);
    }

    async clickViewBtn(){
        await this.viewBtn.first().click();
    }

    async clickCloseBtn(){
        await this.closeBtn.click();
    }

    async getSalesDetail(){
        const printdetails=[];
        for(let i=0; i<await this.getDetails.count(); i++){
              const value=await this.getDetails.nth(i).textContent();
              await this.page.waitForTimeout(1000);
              printdetails.push(value);
        }
        return printdetails;
    }

    async validateMessage(){
        if(await expect(this.noRecordFound).toBeVisible){

            return console.log("No Record Found");
        }else{
            return console.log("Sales details are displayed");
        }
    }




} module.exports = { SalesPage };