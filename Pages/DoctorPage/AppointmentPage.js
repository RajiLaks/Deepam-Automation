const {expect} = require ('@playwright/test');
class AppointmentPage {
    constructor(page){
        this.page = page;
        this.scheduleConsult = page.locator('//div[@class="row"]/div/div[@class="card type-of-consulation v-step-3"]');

        //Schedule Consultation Screen Locators
        this.scrollDown1 = page.locator('//div[@class="Appointment"]/div[3]');
        this.selectSpeciality = page.locator('(//select[@class="search-doctor col-12 custom-select"])[1]');
        this.selectGender = page.locator('(//select[@class="search-doctor col-12 custom-select"])[2]');
        this.ClickDateField = page.locator('//div[@class="row helpdeskBox"]/div[2]/div/form/div');
        this.selectToday = page.locator('(//td[@class="available today"])[1]');
        this.clickTime = page.locator('//div[@class="row helpdeskBox"]/div[3]/div/form/div');
        this.select11AM = page.locator('//div[text()="11:00"]');
        this.searchbutton = page.locator('//div[@class="col-6"]');

    }

    async navigateToScheduleConsult(){
        //await this.page.waitForTimeout(1000);
        await this.scheduleConsult.click();
        await this.page.waitForTimeout(2000);
    }

    async ScheduleAvailableDoctor(){
        await this.scrollDown1.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.selectSpeciality.selectOption('ENT');
        await this.page.waitForTimeout(1000);
        await this.selectGender.selectOption('Female');
        await this.page.waitForTimeout(1000);
        await this.ClickDateField.click();
        await this.page.waitForTimeout(1000);
        await this.selectToday.click();
        await this.clickTime.click();
        await this.page.waitForTimeout(1000);
        await this.select11AM.click();
        await this.page.waitForTimeout(1000);
        await this.searchbutton.click();
        await this.page.pause();

    }
}
module.exports = {AppointmentPage};