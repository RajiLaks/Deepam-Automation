const {expect} = require ('@playwright/test');
class DoctorLoginPage{
    constructor(page){
        this.page = page;
        this.SignInDropdownButton = page.locator('//button[text()="Sign In"]');
        this.mobileNo = page.locator('//input[@id="input-74"]');
    }

    async LoginWithValidData(MobileNo){
        await this.SignInDropdownButton.click();
        await this.page.waitForTimeout(5000);
        await this.mobileNo.fill(MobileNo);
        await this.page.pause();
    }
}
module.exports = {DoctorLoginPage};