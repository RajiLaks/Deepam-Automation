const {expect} = require ('@playwright/test');
class LoginPage{
    constructor(page){
        this.page = page;

    }

    async LaunchURL(URL){
        await this.page.goto(URL);
        await this.page.waitForTimeout(2000);
        await this.page.pause();
    }

}

module.exports = {LoginPage};