const { expect } = require('@playwright/test');

class ScrapPage {

    constructor(page) {

        this.page = page;

        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseModuleBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Reports')]/../..");


        //Scrap order elements

        this.scrapModule = page.locator("//div[text()='Scrap']/../..");
        this.addScrapBtn = page.locator(".text-end button");
        this.search = page.locator("#scrapquickFilter");
        this.viewBtn = page.locator(".view-btn");
        this.backBtn = page.locator("//button[@class='btn secondary-btn back-btn-size btn-secondary']");

        //Add scrap 
        this.medicine = page.locator("#searchVal");
        this.material = page.locator("#searchInput");
        this.batch = page.locator("#batchId");
        this.scrapQuantity = page.locator("#scarpquantity");
        this.reason = page.locator(".form-text-area textarea");
        this.clearBtn = page.locator("button[class='btn secondary-btn clear-btn-size mr-3 btn-secondary']");
        this.addBtn = page.locator(".add-med-btndiv button~button");

        this.editBtn = page.locator("button[class='btn edit-btn btn-secondary']");

        this.submitBtn = page.locator(".text-center button~button");
        this.backBtn = page.locator("//button[@class='btn secondary-btn back-btn-size mr-3 btn-secondary']");
        this.historyBackBtn = page.locator("//button[@class='btn secondary-btn back-btn-size btn-secondary']");

        //Confirmation Yes or No Button
        this.yesBtn = page.locator(".el-message-box__btns>button~button");
        this.noBtn = page.locator(".el-message-box__btns>button[class='el-button el-button--default el-button--small']");
        this.closeIcon = page.locator("//i[@class='el-message-box__close el-icon-close']");

        //Toast
        this.toast = page.locator("[role='alert'] p");

        //Errors
        this.errorFields=page.locator("[class='required m-0']");


    }

    async navigateToScrapModule() {

        await this.purchaseModuleBtn.click();
        await this.page.waitForTimeout(1000);
        await this.scrapModule.click();

    }

    async clickAddScrapBtn() {
        await this.addScrapBtn.click();

    }

    async addScrapDetails(medicine, batch, quantity, reason) {

        await this.medicine.fill(medicine);
        await this.page.waitForTimeout(1000);
        await this.page.locator("#suggesionLists ul li").first().click();
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(1000);
        await this.scrapQuantity.fill(quantity);
        await this.page.waitForTimeout(1000);
        await this.reason.fill(reason);
        await this.page.waitForTimeout(1000);

    }

    async editScrapDetails(medicine, batch, quantity, reason) {

        await this.medicine.fill(medicine);
        await this.page.waitForTimeout(1000);
        await this.page.locator("#suggesionLists ul li").first().click();
        await this.page.waitForTimeout(1000);
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(1000);
        await this.scrapQuantity.fill(quantity);
        await this.page.waitForTimeout(1000);
        await this.reason.fill(reason);
        await this.page.waitForTimeout(1000);
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

    async validateToastMessage(expectedMessage) {
        const toast = await this.getToastMessage.textContent();
        await expect(toast).toBe(expectedMessage);
    }

    async searchValue(searchValue) {
        await this.search.fill(searchValue);
        await this.page.waitForTimeout(500);

    }
    async clickViewBtn() {
        await this.viewBtn.click();

    }
    async clickEditIcon() {
        await this.editBtn.click();
    }
    async clickBackBtn() {
        await this.backBtn.click();

    }
    async clickHistoryBackBtn() {
        await this.historyBackBtn.click();

    }

    async clickclearBtn() {
        await this.clearBtn.click();

    }

    async clickAddBtn() {
        await this.addBtn.click();
    }

    
    async getErrorMessage() {
        
        const value=[];

        for(let i=0; i<await this.errorFields.count(); i++){
            const errorMessage=await this.errorFields.nth(i).textContent();
            value.push(errorMessage);
        }
        return value;
    }








}
module.exports = { ScrapPage };