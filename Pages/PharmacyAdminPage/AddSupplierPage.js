const {expect} =require('@playwright/test');

class SupplierPage{
    
    constructor(page){
        this.page=page;

        //Sidebar module elements
        this.inventoryBtn=page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn=page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn=page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseBtn=page.locator("//div[contains(text(),'Purchase')]/../..");
        this.salesBtn=page.locator("//div[contains(text(),'Reports')]/../..");


        //Supplier elements
        this.supplierBtn=page.locator("//div[text()='Supplier / Vendor']/../..");
        this.addSupplierBtn=page.locator("//button[contains(@class,'addsupplier-btn')]");
        this.importSupplierBtn=page.locator("//button[contains(@class,'importsupplier-btn')]");
        this.search=page.locator("#supplierquickFilter");
        this.editBtn=page.locator("[class='btn edit-btn btn-secondary']");
        this.deleteBtn=page.locator("[class='btn delete-btn btn-secondary']");


        //Add Supplier details element
        this.name=page.locator("#name");
        this.mobileNo=page.locator("#mobilenumber");
        this.email=page.locator("#email");
        this.address1=page.locator("#address1");
        this.address2=page.locator("#address2");
        this.city=page.locator(".autocomplete__inputs>input[placeholder='Search']");
        

        //closeIcon
        this.closeIcon=page.locator("button.close");
        
        //Cancel & Submit Button
        this.cancelBtn=page.locator("button[class='btn mr-3 secondary-btn cancel-btn-size btn-secondary']");
        this.submitBtn=page.locator("button[class='btn primary-btn submit-btn-size btn-secondary']");

        //Confirmation Yes or No Button
        this.yesBtn=page.locator(".el-message-box__btns>button~button");
        this.noBtn=page.locator(".el-message-box__btns>button[class='el-button el-button--default el-button--small']");

       
     

        

    }

    async clickPurchaseModule(){
        await this.purchaseBtn.click();
    }

    async clickSupplierModule(){
        await this.supplierBtn.click();
    }

    async clickAddSupplierBtn(){
        await this.addSupplierBtn.click();
    }

 
    async enterSupplierDetails(name,mobileNo,email,address1,address2,city){
        await this.name.fill(name);
        await this.page.waitForTimeout(1000);
        await this.mobileNo.fill(mobileNo);
        await this.page.waitForTimeout(1000);
        await this.email.fill(email);
        await this.page.waitForTimeout(1000);
        await this.address1.fill(address1);
        await this.page.waitForTimeout(1000);
        await this.address2.fill(address2);
        await this.page.waitForTimeout(1000);
        await this.city.type(city);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//li[text()='${city}']`).click();
    }















}
module.exports={SupplierPage}