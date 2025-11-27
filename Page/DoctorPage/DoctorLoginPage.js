const {expect} = require ('@playwright/test');
class DoctorLoginPage{
    constructor(page){
        this.page = page;
        this.SignInDropdownButton = page.locator('//button[text()="Sign In"]');
    }

    async LoginWithValidData(){
        await this.SignInDropdownButton.click();
        await this.page.pause();
    }
}
module.exports = {DoctorLoginPage};