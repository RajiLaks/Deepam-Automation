exports.language = class language {
    constructor(page) {
        this.page = page;
        this.lang = page.locator("//*[name()='path' and contains(@d,'M0 8a8 8 0')]")
    }

    async Language(ChooseLang) {
        await this.lang.waitFor({ state: 'visible' });
        await this.lang.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`//a[contains(normalize-space(),'${ChooseLang}')]`).click()
        await this.page.waitForTimeout(1000);
    }
}