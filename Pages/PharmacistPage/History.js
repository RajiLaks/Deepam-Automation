exports.History = class History {

    constructor(page) {
        this.page = page;

        this.history = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='history']")

        this.xicon = page.locator("//div[contains(@class,'b-sidebar-outer')]/div/following-sibling::div/header[@class='b-sidebar-header']//button[@aria-label='Close']//*[name()='svg']");

        //
        this.datepicker = page.locator("//div[@class='consumer-filter-date d-none d-md-block']//div[@class='vd-picker__input-icon']/following-sibling::input")
        this.dateclear = page.locator("//button[@aria-label='clearable icon']")

        //search and download
        this.search = page.locator("//input[@id='patientquickFilter' or @id='pharmacyhistoryFilter']")
        this.download = page.locator("//button[@data-test='download-button']")

        //for Page Load Locator
        this.loaded = page.locator("//div[@class='v-window__container']//div//div//div//div[@role='grid']")

        //Print button
        this.print = page.locator("//button[@class='submit_btn primary_btn submitbtn-color']")


        //Return button and Return Submit Button
        this.return = page.locator("//button[@class='btn reference-btn btn-one btn-secondary']")
        this.return_but = page.locator("//button[@class='btn return-btn-size primary-btn btn-primary']")
        this.return_reason = page.locator("//textarea[@id='cancelReason']")

        this.reorder = page.locator("//button[@class='btn reference-btn btn-secondary']")
        this.bill = page.locator("//button[@class='btn reference-btn btn-two btn-secondary']")

        //Confirm Message Box
        this.confirmNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confirmYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");



    }

    async History() {
        await this.history.waitFor({ state: 'visible' });

        await this.history.click()
        await this.page.waitForTimeout(500);
    }

    async XIcon() {


        await this.xicon.waitFor({ state: 'visible' });

        await this.xicon.click();
        await this.loaded.waitFor({ state: 'visible' });

        await this.page.waitForTimeout(1000);
    }
    async Download() {
        await this.download.waitFor({ state: 'visible' });

        await this.download.click()
        await this.page.waitForTimeout(500);
    }
    async Clear_Date() {

        await this.dateclear.click()
        await this.page.waitForTimeout(500);
    }
    async Search(Search) {
        await this.search.waitFor({ state: 'visible' });
        await this.loaded.waitFor({ state: 'visible' });

        await this.search.fill(Search);
        await this.page.waitForTimeout(1000);

    }
    async View_History(OrID, name) {
        const ID = OrID.toLowerCase();
        const pname = name.toLowerCase();


        const view_mat = [
            //View by Order ID and Patient name or Mobile num.
            {
                view: this.page.locator(`//div[@col-id='pharmacyid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${ID}')]/following-sibling::div[(@col-id='patientname' or @col-id='mobilenumber') and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pname}')]/following-sibling::div[@col-id='action']`)
            }

        ]
        for (const { view } of view_mat) {
            // console.log(view);
            await this.page.waitForTimeout(500);
            const count = await view.count();
            if (count > 1) {
                await view.first().waitFor({ state: 'visible' });
                await view.first().click()
                break;
            } else if (count == 1) {
                await view.waitFor({ state: 'visible' });
                await view.click()
                return;
            }

        }
        await this.bill.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(1000);


    }
    async Bill_Button() {
        await this.bill.waitFor({ state: 'visible' });

        await this.bill.click()
        const load = this.page.locator("//div[@class='col-12 col']")
        await load.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(500);
    }
    async Return_Button() {
        await this.return.waitFor({ state: 'visible' });

        await this.return.click()

        await this.history.waitFor({ state: 'visible' })
    }

    async Return_Quan(medi, RQ) {
        const med = medi.toLowerCase();

        const returnQ1 = this.page.locator(`//div[@col-id="medicine" and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]//following-sibling::div[@col-id="quantityupdate" or @col-id="quantity"]`)
        await returnQ1.waitFor({ state: 'visible' });
        await returnQ1.click()

        await this.page.waitForTimeout(500);

        const returnQ2 = this.page.locator(`//div[@col-id="medicine" and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]//following-sibling::div[@col-id="quantityupdate" or @col-id="quantity"]/div/input`)


        await returnQ2.fill(RQ, { force: true });
        await returnQ2.press(`Enter`, { force: true });

        await this.page.waitForTimeout(500);
    }
    async Return_Submit_Yes() {

        await this.return_but.click()

        await this.ConfirmYes()

        await this.page.waitForTimeout(500);
    }
    async Return_Submit_No() {
        await this.page.waitForTimeout(1000);

        await this.return_but.click()

        await this.ConfirmNo()


        await this.page.waitForTimeout(500);
    }


    async Reorder_Button() {
        await this.reorder.waitFor({ state: 'visible' });

        await this.reorder.click()
        await this.history.waitFor({ state: 'visible' });

        await this.page.waitForTimeout(500);
    }
    async ConfirmYes() {
        await this.confirmYes.click();
        await this.page.waitForTimeout(2000);
    }
    async ConfirmNo() {
        await this.confirmNo.click();
        await this.page.waitForTimeout(1000);
    }
    async CancelIcon() {

        await this.cancelIcon.click();
        await this.page.waitForTimeout(1000);
    }
     async Back() {
        const locator = this.page.locator("//button[(@class='btn back-btn-size secondary-btn btn-secondary')or(@class='btn cancelbtn-color btn-secondary')]")
        //Bill Page for visible purpose
        const isvis = await this.page.locator("//div[@id='payment-bill']").isVisible();
         if (isvis) {

            await this.page.locator("//button[@class='btn back-btn-size secondary-btn btn-secondary']").click();

        } else {
            await this.page.locator("//button[@class='btn cancelbtn-color btn-secondary']").click();

        }

        await this.page.waitForTimeout(1000);
    }
}