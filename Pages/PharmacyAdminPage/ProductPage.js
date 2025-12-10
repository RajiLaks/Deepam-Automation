const { expect } = require('@playwright/test');

class ProductPage {

    constructor(page) {
        this.page = page;

        //Sidebar module elements
        this.inventoryBtn = page.locator("//div[contains(text(),'Inventory Alerts')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Sales')]/../..");
        this.productModule = page.locator("//div[contains(text(),'Product')]/../..");
        this.purchaseBtn = page.locator("//div[contains(text(),'Purchase')]/../..");
        this.salesBtn = page.locator("//div[contains(text(),'Reports')]/../..");

        //ProductBtn
        this.productBtn = page.locator("//div[text()='Product']");

        //Tabs
        this.productTab = page.locator("//a[@class='nav-link active']");
        this.batchTab = page.locator("//a[@class='nav-link']");

<<<<<<< Updated upstream
        //Total Amounts about purchase and Mrp
        this.amount=page.locator("div.text-center span");

=======
>>>>>>> Stashed changes
        //Add Product or Import Product
        this.addProductBtn = page.locator(".product-btn-align button[class='btn primary-btn addproduct-btn-size mr-3 btn-secondary']");
        this.importProductBtn = page.locator(".product-btn-align button[class='btn secondary-btn importproduct-btn-size btn-secondary']");
        this.search = page.locator("#productquickFilter");

        //Edit and Delete Icons
        this.editIcon = page.locator("button[class='btn edit-btn btn-secondary']");
        this.deleteIcon = page.locator("button[class='btn delete-btn btn-secondary']");

        //Add Product Details
        this.name = page.locator("#name");
        this.manufacturer = page.locator("#searchVal");
        this.mrpValue = page.locator("#mrpValue");
        this.bestPrice = page.locator("#bestPrice");
        this.productCategoryfield = page.locator("#productCategory");
        this.productType = page.locator("#productType");
        this.uomPurchase = page.locator("#uomPurchase");
        this.hsnCode = page.locator("#hsnCode");
        this.cgst = page.locator("#cgstPercent");
        this.sgst = page.locator("#sgstPercent");
        this.genericName = page.locator("#composition");
        this.img = page.locator("#dropzone");

        //cancel and submit
        this.cancelBtn = page.locator("button[class='btn mr-3 secondary-btn cancel-btn-size btn-secondary']");
        this.submitBtn = page.locator("button[class='btn primary-btn submit-btn-size btn-secondary']");
        this.closeIcon = page.locator(".close");


        //Confirmation Yes or No Button
        this.yesBtn = page.locator(".el-message-box__btns>button~button");
        this.noBtn = page.locator(".el-message-box__btns>button[class='el-button el-button--default el-button--small']");

        //Toast
        this.toast = page.locator("//p[@class='el-message__content']");

        //Error Message
        this.requiredFields=page.locator("div.required");

    }

    async clickProductModule() {
        await this.productModule.click();
    }

    async clickProductBtn() {
        await this.productBtn.click();
    }

    async clickAddProductBtn() {
        await this.addProductBtn.click();
    }

    async enterProductDetails(name, manufacturer, MRP, bestPrice, productCategory, productType, UOMPurchase, HSNCode, CGST, SGST, genericName, prescriptionRequired) {
        await this.name.fill(name);
        await this.page.waitForTimeout(500);

        await this.manufacturer.fill(manufacturer);
        await this.page.waitForTimeout(500);
        await this.page.locator('#suggesionLists li').click();
        await this.page.waitForTimeout(500);

        await this.mrpValue.fill(MRP);

        await this.bestPrice.fill(bestPrice);
        await this.page.waitForTimeout(1000);

        await this.page.selectOption('#productCategory', { label: productCategory });
        await this.page.waitForTimeout(1000);
        await this.page.selectOption('#productType', { label: productType });
        await this.page.waitForTimeout(500);
        await this.uomPurchase.fill(UOMPurchase);
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");
        await this.page.waitForTimeout(500);

        await this.hsnCode.fill(HSNCode);
        await this.cgst.fill(CGST);
        await this.sgst.fill(SGST);
        await this.genericName.fill(genericName);

        if (prescriptionRequired==="Yes") 
            {
            await this.page.locator("//label//span[text()='Yes']").click();
        } else {
            await this.page.locator("//label//span[text()='No']").click();
        }

    }

    async fileUpload(path) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent("filechooser"),
            this.page.locator('#dropzone').click(), // button that opens the file dialog
        ])
        await fileChooser.setFiles(path);
        //await fileChooser.setFiles("C:/Users/ArunkumarRagavan/Pictures/Screenshots/Screenshot 2025-12-01 100053.png");
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

<<<<<<< Updated upstream
    async clickProductTab() {
        await this.productTab.click();
    }

    async clickBatchTab() {
        await this.batchTab.click();
    }

=======
>>>>>>> Stashed changes
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

    async searchValue(value){
        await this.search.fill(value);
        await this.page.waitForTimeout(1000);
    }

    async clickEditBtn(){
        await this.editIcon.click();
    }

    async clickDeleteBtn(){
        await this.deleteIcon.click();
    }

<<<<<<< Updated upstream
    async getTotalAmount(){
        const elements=await this.amount.count();
        const amount=[];
        for(let i=0; i<elements; i++){
            const text= await this.page.locator("div.text-center p").nth(i).textContent();
            const value= await this.amount.nth(i).textContent();
            amount.push(text);
            amount.push(value);
        }
        return {amount};
    }

=======
>>>>>>> Stashed changes













}
module.exports = { ProductPage }
