const { expect } = require('@playwright/test');

class ManufacturerPage {

    constructor(page) {
         this.page = page;
  
        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Reports')]/../..");


        //Manufacturer elements
        this.manafacturerBtn = page.locator("//div[text()='Manufacturer']/../..");
        this.addManufacturerBtn = page.locator("//button[contains(@class,'addmanufacturer-btn')]");
        this.importManafacturerBtn = page.locator("//button[contains(@class,'importmanufacturer-btn')]");
        this.search = page.locator("#manufacturequickFilter");
        this.editBtn = page.locator("[class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("[class='btn delete-btn btn-secondary']");

        //Field list
        this.requiredFields = page.locator("span.required");


        //Add Manufacturer details element
        this.name = page.locator("#name");
        this.mobileNo = page.locator("#mobilenumber");
        this.email = page.locator("#email");
        this.address1 = page.locator("#address1");
        this.address2 = page.locator("#address2");
        this.city = page.locator(".autocomplete__inputs>input[placeholder='Search']");


        //closeIcon
        this.closeIcon = page.locator("button.close");

        //Cancel & Submit Button
        this.cancelBtn = page.locator("button[class='btn mr-3 secondary-btn cancel-btn-size btn-secondary']");
        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size btn-secondary']");

        //Confirmation Yes or No Button
        this.yesBtn = page.locator(".el-message-box__btns>button~button");
        this.noBtn = page.locator(".el-message-box__btns>button[class='el-button el-button--default el-button--small']");

        //Toast
        this.toast = page.locator("//p[@class='el-message__content']");




    }

    async clickProductModule() {
        await this.productBtn.click();
    }

    async clickManufacturerModule() {
        await this.manafacturerBtn.click();
    }

    async clickAddManufacturerBtn() {
        await this.addManufacturerBtn.click();
    }

    async clickSubmitBtn() {
        await this.submitBtn.click();
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
    }

    async clickCloseIcon() {
        await this.closeIcon.click();
    }


    async clickConfirmationYes() {
        await this.yesBtn.click();
    }

    async clickConfirmationNo() {
        await this.noBtn.click();
    }

    async getToastMessage(givenToast) {
        const toastMessage = await this.toast.textContent();
        await expect(toastMessage).toBe(givenToast);
    }

    async validateErrorMessage() {
        const mandatoryFields = await this.requiredFields.count();
        const error=[];
        for(let i=0; i<await this.page.locator("div.required").count(); i++){
           const errorContent= await this.page.locator("div.required").nth(i).textContent();
           error.push(errorContent);
        }
        return {mandatoryFields, error};
        

    }

     async clickEditBtn() {
        await this.editBtn.first().click();
    }

     async clickDeleteBtn() {
        await this.deleteBtn.click();
    }

     async searchValue(value) {
        await this.search.fill(value);
    }

    async enterManufacturerDetails(name, mobileNo, email, address1, address2, city) {
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
        await this.city.fill(city);
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//li[text()='${city}']`).click();
    }

    










}
module.exports={ManufacturerPage};