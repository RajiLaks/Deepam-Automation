const { expect } = require('@playwright/test');

class ProductCategoryPage {

    constructor(page) {
        this.page = page;

        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Reports')]/../..");


        //Product category elements
        this.productCategoryBtn = page.locator("//div[text()='Product Category']/../..");
        this.addCategoryBtn = page.locator("//button[contains(@class,'addcategory-btn')]");
        this.importCategoryBtn= page.locator("//button[contains(@class,'importcategory-btn')]");
        this.search = page.locator("#supplierquickFilter");
        this.editBtn = page.locator("[class='btn edit-btn btn-secondary']");
        this.deleteBtn = page.locator("[class='btn delete-btn btn-secondary']");

        //Field list
        this.requiredFields = page.locator("span.required");


        //Add category details element
        this.name = page.locator("#categoryName");
        this.description = page.locator("#descValue");
        

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

    async clickProductCategoryModule() {
        await this.productCategoryBtn.click();
    }

    async clickAddCategoryBtn() {
        await this.addCategoryBtn.click();
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

    async enterCategoryDetails(name, description) {
        await this.name.fill(name);
        await this.page.waitForTimeout(1000);
        await this.description.fill(description);
    
    }

    










}
module.exports = { ProductCategoryPage }