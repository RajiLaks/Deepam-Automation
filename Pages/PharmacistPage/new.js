
exports.CreateNewOrder = class CreateNewOrder {

    constructor(page) {
        this.page = page;
        this.createorder = page.locator("//button[@class='btn book-btn btn-secondary']");
        //
        this.cusName = page.locator("//div[@class='search-grid p-0 col']//div//input[@id='searchVal']")
        this.searchmad = page.locator("//div[@class='p-0 col']//div//input[@id='searchVal']")
        this.batch = page.locator("//select[@id='batchId']")
        this.quantity = page.locator("//input[@id='quantity']")
        this.add = page.locator("//button[@class='btn add-med-btn btn-secondary btn-sm']")
        this.clear_searchmat = page.locator("//img[@class='search-grid-imagetwo']")
        //
        this.discount = page.locator("//div[@id='percentGroup']//input")
        this.rupees = page.locator("//div[@id='amountGroup']//input")
        this.received = page.locator("//label[normalize-space()='Received']/following-sibling::input")
        this.p_button = page.locator("//button[@class='btn pay-btn-size primary-btn btn-primary']")

        //Confirm 
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");
        //
        this.letest = page.locator("//div[contains(@class,'options-div')]//button[@class='btn latest-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='sticky-note']")
        this.history = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='history']")
        this.dashbord = page.locator("//div[contains(@class,'options-div')]//button[@class='btn close-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='home']")

    }

    async CreateNewOrder() {
        await this.createorder.waitFor({ state: 'visible' })
        await this.createorder.click();

    }
    async NewOrder(Cusname, Smed, bat, quan, mode, Money) {

        await this.CreateNewOrder();
        await this.CustomerName(Cusname);
        await this.Search_Madicine(Smed);
        await this.Batch(bat);
        await this.Quantity(quan);
        await this.Add_button();
        await this.PaymentMode(mode)
        await this.Received(Money)
        await this.Pay_Button()
        await this.ConfirmYes()

        await this.page.waitForTimeout(3000)
    }

    async CustomerName(sh_cus) {
        await this.cusName.fill(sh_cus);
        const cus = sh_cus.toLowerCase();

        const locator = this.page.locator(`//ul[@id='search-forminput']/li[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus}')]`);
        await locator.waitFor({ state: 'visible' });
        await locator.click({ force: true });

        await this.page.waitForTimeout(500);
    }

    async Search_Madicine(medicine) {

        await this.searchmad.fill(medicine);
        const med = medicine.toLowerCase();
        const locator = this.page.locator(`//ul[@id='search-forminput-med']/li/div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]`);
        await locator.waitFor({ state: 'visible' });

        await locator.click();

        await this.page.waitForTimeout(500);
    }
    async Clear_Search() {
        await this.clear_searchmat.waitFor({ state: 'visible' });
        await this.clear_searchmat.click();
        await this.page.waitForTimeout(500);
    }
    //need to give Exact value : name 
    async Batch(batch) {
        await this.batch.selectOption({ value: batch });
        await this.page.waitForTimeout(500);
    }
    async Quantity(quan) {
        await this.quantity.fill(quan);
        await this.page.waitForTimeout(500);
    }
    async Add_button() {
        await this.add.click();
        await this.page.waitForTimeout(1000);
    }
    async Discount() {

        await this.Discount();

    }
    async PaymentMode(PM) {
        const mode = this.page.locator(`//div[@class='payment-card my-2']//div[@role='group']/button[contains(text(),'${PM}')]`)
        await mode.waitFor({ state: 'visible' });

        await mode.click();

    }
    async Received(rec) {
        await this.received.waitFor({ state: 'visible' });
        await this.received.fill(rec);

    }
    async Pay_Button() {
        await this.p_button.waitFor({ state: 'visible' });
        await this.p_button.click();
    }

    async Edit_Material(med, batch) {

        const edit_mat = [
            //Click edit by Medicine name
            {
                edit: this.page.locator(`//div[@col-id='medicine' and normalize-space()='${med}']/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)
            },
            //Click edit by Medicine and batch
            {
                edit: this.page.locator(`//div[@col-id='medicine' and normalize-space()='${med}']/following-sibling::div[@col-id='batchid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${batch}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)
            },
            //Click edit by batch
            {
                edit: this.page.locator(`//div[@col-id='batchid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${batch}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)
            }
        ]
        for (const { edit } of edits) {
            isvisible = await edit.isvisible();
            if (isvisible) {
                await edit.waitFor({ state: 'visible' });
                await edit.click()
                return;
            }

        }
        await edit_mat.waitFor({ state: 'visible' });

    }
    async Delete_Material(dele) {

        const dele_mat = dele.toLowerCase()
        const delete_mat = this.page.locator(`//div[@col-id='medicine' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${dele_mat}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn delete-btn btn-secondary"]`)

        await delete_mat.waitFor({ state: 'visible' });
        await delete_mat.click();
        await this.page.waitForTimeout(1000);
    }
    async Tick_Material(tick) {
        var tick_mat = this.page.locator(`//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']/*/div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${tick}')]/following-sibling::div[@col-id='action']/div/div/input`)

        await tick_mat.click(tick);
        await this.page.waitForTimeout(1000);

    }
    async Untick_Material(tick) {

        await this.Tick_Material(tick)
    }
    //Go to Latest
    async Latest_Button() {

        await this.letest.waitFor({ state: 'visible' });

        await this.letest.click();

        await this.page.waitForTimeout(1000);

    }
    //Go to History page.
    async History_Button() {

        await this.history.waitFor({ state: 'visible' });

        await this.history.click();
        const load = this.page.locator("//div[@id='overallmed-history']//div[@role='grid']")
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(1000);

    }
    //Get back to Home page.
    async Dashboard_Button() {

        await this.dashbord.waitFor({ state: 'visible' });

        await this.dashbord.click();
        await this.page.waitForTimeout(1000);
    }
    async ConfirmYes() {
        await this.confirmYes.waitFor({ state: 'visible' });

        await this.confirmYes.click();
        await this.page.waitForTimeout(1000);
    }
    async ConfirmNo() {
        await this.confirmNo.waitFor({ state: 'visible' });
        await this.confirmNo.click();
        await this.page.waitForTimeout(1000);
    }
    async CancelIcon() {
        const isVisible1 = this.page.locator("//strong[text()='latest OP appointments']")
        const isVisible2 = this.page.locator("//strong[text()='Sales History']")

        if (isVisible1) {

            const Latest = this.page.locator("//div[@id='sidebar-latest']//button[@class='close text-dark']/*")
            await Latest.waitFor({ state: 'visible' });
            await Latest.click();
        } else if (isVisible2) {
            const History = this.page.locator("//div[@id='sidebar-history']//button[@class='close text-dark']/*")
            await Latest.waitFor({ state: 'visible' });
            await History.click();
        } else {
            await this.cancelIcon.waitFor({ state: 'visible' });
            await this.cancelIcon.click();
        } await this.page.waitForTimeout(1000);
    }
}