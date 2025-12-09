
exports.CreateNewOrder = class CreateNewOrder {

    constructor(page) {
        this.page = page;
        this.createorder = page.locator("//button[@class='btn book-btn btn-secondary']");
        //
        this.crequest = page.locator("//button[contains(@class,'btn create')][contains(text(),'Create')]")
        this.cusName = page.locator("//div[@class='search-grid p-0 col']//div//input[@id='searchVal']")
        this.searchmad = page.locator("//div[@class='p-0 col']//div//input[@id='searchVal']")
        this.batch = page.locator("//select[@id='batchId']")
        this.quantity = page.locator("//input[@id='quantity']")
        this.add = page.locator("//button[@class='btn add-med-btn btn-secondary btn-sm']/*[@data-icon='plus']")
        this.clear_searchmat = page.locator("//img[@class='search-grid-imagetwo']")
        //
        this.discount = page.locator("//div[@id='percentGroup']//input")
        this.rupees = page.locator("//div[@id='amountGroup']//input")
        this.received = page.locator("//label[normalize-space()='Received']/following-sibling::input")
        this.p_button = page.locator("//button[@class='btn pay-btn-size primary-btn btn-primary']")

        //Confirm 
        this.confNo = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small']")
        this.confYes = page.locator("//span[text()='Confirm']/../../following-sibling::div/button[@class='el-button el-button--default el-button--small el-button--primary ']")
        this.cancelIcon = page.locator("//span[text()='Confirm']/../following-sibling::button[@class='el-message-box__headerbtn']");

        //
        this.letest = page.locator("//div[contains(@class,'options-div')]//button[@class='btn latest-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='sticky-note']")
        this.history = page.locator("//div[contains(@class,'options-div')]//button[@class='btn history-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='history']")
        this.dashbord = page.locator("//div[contains(@class,'options-div')]//button[@class='btn close-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='home']")
        this.newOrder = page.locator("//div[contains(@class,'options-div')]//button[@class='btn add-cancel-btn btn-secondary btn-sm']//*[name()='svg' and @data-icon='check']")

        //
        this.back = this.page.locator("//button[@class='btn back-btn-size secondary-btn btn-secondary']")
    }
    async View_Appointment(Cus, ord, num) {

        const cus_name = Cus.toLowerCase()
        const ord_num = ord.toLowerCase()
        const mb_num = num.toLowerCase()

        //view locator with Patient name, Patient Id, Order ID & Mobile number

        const view = this.page.locator(`//div[(@col-id='patientname' or @col-id='displayid') and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}')]/following-sibling::div[@col-id='orderid' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${ord_num}')]/following-sibling::div[@col-id='mobilenumber' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${mb_num}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn edit-btn btn-secondary']`)

        //console.log(view);
        await this.page.waitForTimeout(500);
        const count = await view.count();
        if (count > 1) {
            await view.first().waitFor({ state: 'visible' });
            await view.first().click()
        } else if (count == 1) {
            await view.waitFor({ state: 'visible' });
            await view.click()
            return;
        }
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']").first()
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(500)
    }
    async CreateOrder_Appointment(Cus, ord, num) {

        const cus_name = Cus.toLowerCase()
        const ord_num = ord.toLowerCase()
        const mb_num = num.toLowerCase()

        //CreatePay locator with Patient name, Patient Id, Order ID & Mobile number

        const CreatePay = this.page.locator(`//div[(@col-id='patientname' or @col-id='displayid') and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${cus_name}')]/following-sibling::div[@col-id='orderid' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${ord_num}')]/following-sibling::div[@col-id='mobilenumber' and contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${mb_num}')]/following-sibling::div[@col-id='action']/div/div/button[@class='btn active-btn btn-secondary']`)

        //console.log(CreatePay);
        await this.page.waitForTimeout(500);
        const count = await CreatePay.count();
        if (count > 1) {
            await CreatePay.first().waitFor({ state: 'visible' });
            await CreatePay.first().click()
        } else if (count == 1) {
            await CreatePay.waitFor({ state: 'visible' });
            await CreatePay.click()
            return;
        }
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']").first()
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(500)
    }


    async CreateNewOrder() {
        await this.createorder.waitFor({ state: 'visible' })
        await this.createorder.click();

    }
    async NewOrder(Cusname, Smed, bat, quan, dis, Rtype, Rdata, mode, Money) {

        await this.CustomerName(Cusname);
        await this.Search_Madicine(Smed);
        await this.Batch(bat);
        await this.Quantity(quan);
        await this.Add_button();
        await this.Discount(dis);
        // await this.page.pause()
        await this.Reference(Rtype, Rdata);
        await this.PaymentMode(mode)
        await this.Received(Money)
        await this.Pay_Button()

        await this.page.waitForTimeout(1000)
    }
    async CreateRequest_Button() {
        await this.crequest.waitFor({ state: 'visible' });

        await this.crequest.click()
        await this.page.waitForTimeout(500);
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
        await this.page.waitForTimeout(500)
        const count = await locator.count()
        //  console.log("Count", count);

        if (count == 0) {

            await locator.waitFor({ state: 'visible' });
            await locator.click();
        } else {
            await locator.first().waitFor({ state: 'visible' });
            await locator.first().click();

        }

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
        await this.page.waitForTimeout(500);
        await this.add.click();
        await this.page.waitForTimeout(1000);
    }
    async Discount(fill) {
        await this.discount.waitFor({ state: 'visible' });
        if (fill != null) {
            await this.discount.fill(fill)
        }
    }
    async Rupees$(fill) {
        await this.rupees.waitFor({ state: 'visible' });
        if (fill != null) {
            await this.rupees.fill(fill)
        }
    }
    async Reference(type, fill) {

        const selecttype = this.page.locator(`//label[text()='Reference']/following-sibling::div/button[contains(text(),'${type}')]`)
        await this.page.waitForTimeout(500);
        const Text = this.page.locator(`//div[@class='refform-height']/input`)
        if (type != null) {
            const clickable = await Text.isDisabled()
            console.log("isEnable:", clickable);

            if (clickable == false) {
                await selecttype.waitFor({ state: 'visible' });
                await selecttype.click();
            } else if (clickable == true) {
                await selecttype.dblclick();
                await Text.fill(type);
            }
        }
        if (fill != null && await Text.isEnabled()) {
            await Text.waitFor({ state: 'visible' });
            await this.Text.fill(fill)
        }
        await this.page.waitForTimeout(500);
    }
    async PaymentMode(PM) {
        const mode = this.page.locator(`//div[@class='payment-card my-2']//div[@role='group']/button[contains(text(),'${PM}')]`)
        await mode.waitFor({ state: 'visible' });
        await mode.click();

    }
    async Received(rec) {
        const locator = this.page.locator("//label[contains(normalize-space(),'Balance')]/following-sibling::div")
        const Auto = await locator.getAttribute('class')
        console.log(Auto);
        async function getInt(locator) {
            const text = await locator.textContent();
            return text ? parseInt(text.replace(/\D/g, ''), 10) : 0;
        }
        const Text = await getInt(locator)
        console.log(Text);

        await this.received.waitFor({ state: 'visible' });

        if (Auto == 'negative' && (rec == ' ' || rec == undefined)) {

            await this.received.fill(String(Text));
        }
        else if (Auto == 'negative' && rec != ' ') {
            await this.received.fill(String(Text));
        } else {
            await this.received.fill(rec);

        }

    }
    async Pay_Button() {
        await this.p_button.waitFor({ state: 'visible' });
        await this.p_button.click();
    }
    async Tick_Material(tick) {
        //use anyone medicine name, batch, quantity and etc... 
        var tick_mat = this.page.locator(`//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']/*/div[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${tick}')]/following-sibling::div[@col-id='action']/div/div/input`)

        await tick_mat.click(tick);
        await this.page.waitForTimeout(1000);

    }
    async Untick_Material(tick) {

        await this.Tick_Material(tick)
    }

    async Edit_Material(medi, bat) {
        const med = medi.toLowerCase();
        const batch = bat.toLowerCase();

        const edit_mat = [
            //Click edit by Medicine name
            {
                edit: this.page.locator(`//div[@col-id='medicine' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)
            },
            //Click edit by Medicine and batch
            {
                edit: this.page.locator(`//div[@col-id='medicine' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]/following-sibling::div[@col-id='batchid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${batch}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)
            },
            //Click edit by batch
            {
                edit: this.page.locator(`//div[@col-id='batchid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${batch}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)
            }
        ]
        for (const { edit } of edit_mat) {
            const isvisible = await edit.isVisible();
            console.log(isvisible);

            if (isvisible) {
                await edit.waitFor({ state: 'visible' });
                await edit.click()
                return;
            }

        }

    }
    async Delete_Material(medi, bat) {
        const med = medi.toLowerCase();
        const batch = bat.toLowerCase();

        const delete_mat = [
            //Click delete by Medicine name
            {
                Delete: this.page.locator(`//div[@col-id='medicine' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn delete-btn btn-secondary"]`)
            },
            //Click delete by Medicine and batch
            {
                Delete: this.page.locator(`//div[@col-id='medicine' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${med}')]/following-sibling::div[@col-id='batchid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${batch}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn delete-btn btn-secondary"]`)
            },
            //Click delete by batch
            {
                Delete: this.page.locator(`//div[@col-id='batchid' and contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${batch}')]/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn delete-btn btn-secondary"]`)
            }
        ]
        for (const { Delete } of delete_mat) {
            const isvisible = await Delete.isVisible();
            console.log(isvisible);

            if (isvisible) {
                await Delete.waitFor({ state: 'visible' });
                await Delete.click()
                return;
            }

        }
    }

    //Go to Latest
    async Latest_Button() {

        await this.letest.waitFor({ state: 'visible' });

        await this.letest.click();

        await this.page.waitForTimeout(1000);

    }
    async Viewlatest(latest) {
        const Viewlatest = this.page.locator(`//p//b[normalize-space()='${latest}']/../../ancestor-or-self::div[@class="ag-cell-wrapper"]/parent::div[@col-id="description"]/following-sibling::div[@col-id="action"]//button`)

        //console.log(CreatePay);
        await this.page.waitForTimeout(500);
        const count = await Viewlatest.count();
        if (count > 1) {
            await Viewlatest.first().waitFor({ state: 'visible' });
            await Viewlatest.first().click()
        } else if (count == 1) {
            await Viewlatest.waitFor({ state: 'visible' });
            await Viewlatest.click()
            return;
        }
        const load = this.page.locator("//div[@class='ag-center-cols-viewport']//div[@role='rowgroup']").first()
        await load.waitFor({ state: 'visible' })

        await this.page.waitForTimeout(500)

    }
    //Go to NewOrder Page
    async NewOrder_Button() {

        await this.newOrder.waitFor({ state: 'visible' });

        await this.newOrder.click();

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
        await this.confYes.waitFor({ state: 'visible' });

        await this.confYes.click();
        await this.page.waitForTimeout(1000);
    }
    async ConfirmNo() {
        await this.confNo.waitFor({ state: 'visible' });
        await this.confNo.click();
        await this.page.waitForTimeout(1000);
    }
    async CloseIcon() {
        const isVisible1 = await this.page.locator("//strong[text()='latest OP appointments']").isVisible()
        const isVisible2 = await this.page.locator("//strong[text()='Sales History']").isVisible()
        const isVisible3 = await this.page.locator("//h5[@id='pharmacyModal___BV_modal_title_']").isVisible()

        await this.page.waitForTimeout(500)
        if (isVisible1) {
            const Latest = this.page.locator("//div[@id='sidebar-latest']//button[@class='close text-dark']/*")
            await Latest.waitFor({ state: 'visible' });
            await Latest.click();
        } else if (isVisible2) {
            const History = this.page.locator("//div[@id='sidebar-history']//button[@class='close text-dark']/*")
            await History.waitFor({ state: 'visible' });
            await History.click();
        } else if (isVisible3) {
            const App = this.page.locator("//header[@id='pharmacyModal___BV_modal_header_']//button[@class='close']")
            await App.waitFor({ state: 'visible' });
            await App.click();

        }
        else {
            await this.cancelIcon.waitFor({ state: 'visible' });
            await this.cancelIcon.click();
        } await this.page.waitForTimeout(1000);
    }
    async search(data) {
        const locator = this.page("//div[(@class='latest-table')or(@class='search-grid px-0 py-1 pb-2 col')or(@class='search-grid px-0 col')]//input")
        const length = await locator.count();
        const index = length <= 2 ? 2 : 1
        const search = this.page(`(//div[(@class='latest-table')or(@class='search-grid px-0 py-1 pb-2 col')or(@class='search-grid px-0 col')]//input)[${index}]`)
        await search.waitFor({ state: 'visible' })
        console.log(search);

        await search.fill(data)
    }



}