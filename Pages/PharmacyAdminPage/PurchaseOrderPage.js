const { expect } = require('@playwright/test');

class PurchaseOrderPage {

    constructor(page) {
        this.page = page;

        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productBtn = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Reports')]/../..");


        //Purchase order elements

        this.purchaseOrderModule = page.locator("//div[text()='Purchase Order']/../..");
        this.addPurchaseOrderBtn = page.locator("//button[@class='btn primary-btn addpurchase-btn-size btn-secondary']");
        this.search = page.locator("#purchasequickFilter");
        this.viewBtn = page.locator("#history-view-rendered");
        this.backBtn = page.locator("button[class='btn secondary-btn  back-btn-size btn-secondary']");




        //Add purchase order elements
        this.supplierName = page.locator("[placeholder='Search']").nth(0);
        this.medicineName = page.locator("[placeholder='Search']").nth(1);
        this.purchaseDate = page.locator("//label[contains(text(),'Purchase Date')]/following-sibling::div//input");
        this.expiryDate = page.locator("//label[contains(text(),'Expiry Date')]/following-sibling::div//input");
        this.quantity = page.locator("//label[contains(text(),'Quantity')]/following-sibling::div/input");
        this.amount = page.locator("//label[contains(text(),'Amount')]/following-sibling::div/input");
        this.cgst = page.locator("//input[@type='number']").nth(0);
        this.sgst = page.locator("//input[@type='number']").nth(1);
        this.batch = page.locator("//label[contains(text(),'Batch')]/following-sibling::div/input");
        this.UOMPurchase = page.locator("//label[contains(text(),'UOM Purchase')]/following-sibling::div//input");
        this.clearBtn = page.locator("[class='btn secondary-btn clear-btn-size mr-3 btn-secondary']");
        this.addBtn = page.locator("[class='btn add-btn-size primary-btn btn-secondary']");
        this.editBtn = page.locator("[class='btn add-btn-size primary-btn btn-secondary']");
        this.editPurchaseBtn = page.locator("[role='group'] button[class='btn edit-btn btn-secondary']");
        this.deletePurchaseBtn = page.locator("[role='group'] button[class='btn delete-btn btn-secondary']");


        //closeIcon
        this.closeIcon = page.locator(".el-message-box__headerbtn");

        //Cancel & Submit Button
        this.cancelBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']");
        this.submitBtn = page.locator("button[class='btn secondary-btn cancel-btn-size mr-3 btn-secondary']~button");

        //Confirmation Yes or No Button
        this.yesBtn = page.locator(".el-message-box__btns>button~button");
        this.noBtn = page.locator(".el-message-box__btns>button[class='el-button el-button--default el-button--small']");

        //Toast
        this.toast = page.locator("[role='alert'] p");

        //Get error message
        this.errorFields=page.locator("[class='required m-0']");




    }

    async clickPurchaseModule() {
        await this.purchaseBtn.click();
    }

    async clickPurchaseOrderModule() {
        await this.purchaseOrderModule.click();
    }

    async clickAddPurchaseOrderBtn() {
        await this.addPurchaseOrderBtn.click();
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

    async getErrorMessage() {
        
        const value=[];
        for(let i=0; i<await this.errorFields.count(); i++){
            const errorMessage=await this.errorFields.nth(i).textContent();
            value.push(errorMessage);
        }
        return value;
    }


    async clickAddBtn() {
        await this.addBtn.click();
    }

    async clickEditBtn() {
        await this.editBtn.first().click();
    }

    async clickDeleteBtn() {
        await this.deleteBtn.first().click();
    }

    async clickClearBtn() {
        await this.clearBtn.click();
        await expect(this.page.locator(".search-grid-imagetwo")).toBeHidden();
    }

    async clickViewBtn() {
        await this.viewBtn.click();
    }

    async clickBackBtn() {
        await this.backBtn.click();
    }

    async searchValue(value) {
        await this.search.fill(value);
    }

    async enterPurchaseDetails(supplierName, PurchaseDate, Medicine, Quantity, Amount, CGST, SGST, Batch, ExpiryDate, UOMPurchase) {
        await this.supplierName.fill(supplierName);
        await this.page.waitForTimeout(500);
        await this.page.locator("#search-forminput li").click();
        await this.page.waitForTimeout(500);
        await this.purchaseDate.click();
        await this.page.locator("//td[@class='available']/div/span").nth(3).click();
        await this.page.waitForTimeout(500);
        await this.medicineName.fill(Medicine);
        await this.page.waitForTimeout(500);
        await this.page.locator("#search-forminput li").nth(1).click();
        await this.page.waitForTimeout(500);
        await this.quantity.fill(Quantity);
        await this.amount.fill(Amount);
        await this.cgst.fill(CGST);
        await this.sgst.fill(SGST);
        await this.page.waitForTimeout(500);
        await this.batch.fill(Batch);
        await this.page.waitForTimeout(500);
        await this.expiryDate.click();
        await this.page.waitForTimeout(500);
        await this.page.locator("//td[@class='available']/div/span").nth(22).click();
        await this.page.waitForTimeout(500);
        await this.UOMPurchase.fill(UOMPurchase);
        await this.page.waitForTimeout(500);
        await this.page.locator("#suggestionPurchaseUom ul li").click();
    }












}
module.exports = { PurchaseOrderPage }