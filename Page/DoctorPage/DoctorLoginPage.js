const {expect} = require ('@playwright/test');
class DoctorLoginPage{
    constructor(page){
        this.page = page;
        this.SignInDropdownButton = page.locator('//button[@id="__BVID__19__BV_toggle_"]');
    }

    async LoginWithValidData(){
        await this.SignInDropdownButton.click();
        await this.page.pause();
    }
}
module.exports = {DoctorLoginPage};