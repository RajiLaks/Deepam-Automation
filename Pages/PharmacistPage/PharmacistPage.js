const { log } = require("console");

exports.Pharmacist = class Pharmacist {

    constructor(page) {
        this.page = page;
        this.createorder = page.locator("//button[@class='btn book-btn btn-secondary']");
        //
        this.CusName=page.locator("//div[@class='search-grid p-0 col']//div//input[@id='searchVal']")
        this.madicine=page.locator("//div[@class='p-0 col']//div//input[@id='searchVal']")
        this.batch=page.locator("//select[@id='batchId']")
        this.quantity=page.locator("//input[@id='quantity']")
        this.add=page.locator("//button[@class='btn add-med-btn btn-secondary btn-sm']")
        


    }

    async CreateNewOrder() {
        await this.createorder.waitFor({ state: 'visible' })
        await this.createorder.click();

    }

    //Use this search in all the Searchbox field(Appointment, Latest and History)
    async search(data) {
        const locator = this.page("//div[(@class='latest-table')or(@class='search-grid px-0 py-1 pb-2 col')or(@class='search-grid px-0 col')]//input")
        await this.page.waitFor({ state: 'visible' })
        const length = await locator.count();
        const index = length ? 2 : 1
        const search = this.page(`(//div[(@class='latest-table')or(@class='search-grid px-0 py-1 pb-2 col')or(@class='search-grid px-0 col')]//input)[${index}]`)
        console.log(search);

        await search.fill(data)
    }
    //Go to Latest
       async Latest_Button() {

        await this.history.waitFor({ state: 'visible' });

        await this.history.click();
        const load = this.page.locator("//div[@id='overallmed-history']//div[@role='grid']")
        await load.waitFor({ state: 'visible' })

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
      async Edit_Material(edit) {
        const edit_mat = this.page.locator(`//div[@col-id='medicine' and normalize-space()='${edit}']/following-sibling::div[@col-id='action']/div/div/div/button[@class="btn edit-btn btn-secondary"]`)

        await edit_mat.waitFor({ state: 'visible' });

        await edit_mat.click(Edit);
        await this.page.waitForTimeout(1000);
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

}