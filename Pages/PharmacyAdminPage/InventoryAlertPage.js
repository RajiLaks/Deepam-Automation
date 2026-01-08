const { expect } = require('@playwright/test');

class InventoryAlertPage {

    constructor(page) {
         this.page = page;
  
        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Reports')]/../..");

        //Low Quantity Module Elements

        this.lowQuantityTab=page.locator("(//span[@class='badge badge-primary badge-pill'])[1]/..");
        this.getLowQunatityCount=page.locator("(//span[@class='badge badge-primary badge-pill'])[1]");
        this.getLowQuantityDetails=page.locator("//div[@col-id='productname' and @class='ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height align-name']");

        //Expiring Module Elements

        this.expiringQuantityTab=page.locator("(//span[@class='badge badge-primary badge-pill'])[2]/..");
        this.getExpiringCount=page.locator("(//span[@class='badge badge-primary badge-pill'])[2]");
        this.getExpiringDetails=page.locator("//div[@col-id='productname' and @class='ag-cell-value ag-cell ag-cell-not-inline-editing ag-cell-normal-height align-name']");
        this.search=page.locator("#productquickFilter");





    }

    async clickInventoryModule() {
        await this.inventoryBtn.click();
    }

    async clickLowQuantityTab() {
        await this.lowQuantityTab.click();
    }

    async clickExpiringTab() {
        await this.expiringQuantityTab.click();
    }

    async lowQuantityCount() {
       const value= await this.getLowQunatityCount.textContent();
       return console.log("Total Low Qty is:" +value);
    }

    async expiringCount() {
       const value= await this.getExpiringCount.textContent();
       return console.log("Total Expired Qty is:" +value);
    }
    
    async lowQuantityMedicineDetails() {
       const value= await this.getLowQuantityDetails.count();
       const printLowQuantityMedicine=[];
       for(let i=0; i<value; i++){
         const getValues=await this.getLowQuantityDetails.nth(i).textContent();
         printLowQuantityMedicine.push(getValues);
       }
       return {printLowQuantityMedicine}
    }

    async expiringMedicineDetails() {
       const value= await this.getExpiringDetails.count();
       const printExpiredMedicine=[];
       for(let i=0; i<value; i++){
         const getValues=await this.getExpiringDetails.nth(i).textContent();
         printExpiredMedicine.push(getValues);
       }
       return {printExpiredMedicine}
    }

   async searchValue(value) {
       await this.search.fill(value);
    }


    










}
module.exports={InventoryAlertPage};