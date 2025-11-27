const {expect} = require ('@playwright/test');
class UrlLaunchPage{
    constructor(page){
        this.page = page;

    }
    async LaunchURL(URL){
        await this.page.goto(URL);
        await this.page.waitForTimeout(2000);
    }
}

module.exports = {UrlLaunchPage};