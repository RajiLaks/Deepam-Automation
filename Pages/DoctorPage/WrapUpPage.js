const {expect} = require ('@playwright/test');

class WrapUp{
    constructor(page){
        this.page = page;
        this.WrapupButton = page.locator('(//div[@class="card type-card"])[4]/div');
        this.wrapupCount = page.locator('(//div[@class="text-center mt-2"])[4]/span');
        this.ContinueButton_Wrapup = page.locator('(//button[@class="btn primary-btn continue-btn-size btn-secondary"])[1]');
        this.video_Physical = page.locator('(//div[@class="ribbon ribbon_online ribbon-top-left"])[1]/span');
        
    }

    async WrapupFlow(){
        await this.WrapupButton.click();
        await this.page.waitForTimeout(1000);
        const WrapupCountText = await this.wrapupCount.innerText();
        const Wrapup_Count = parseInt(await WrapupCountText.trim(), 10);
        if(Wrapup_Count === 0){
            console.log("Raji");
        }
        else{
            await this.page.waitForTimeout(1000);
            await this.ContinueButton_Wrapup.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
        }
        const videoORphysical = await this.video_Physical.innerText();
        const checkAppointment = await videoORphysical.trim();
        console.log(checkAppointment);
        console.log(videoORphysical);
        if(checkAppointment == "VIDEO"){
            await this.ContinueButton_Wrapup.click();
        }
        else{
            console.log("Lakshmi");
        }

    }
}
module.exports = {WrapUp};