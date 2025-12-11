const {expect} = require ('@playwright/test');

class OnDemandConsultation{
    constructor(page){
        this.page = page;
        this.ODC = page.locator('(//p[@class="icon-head"])[1]'); //ODC - OnDemand Consultation
        this.waitingText = page.locator('(//div[@class="text-center mt-2"])[2]/span');
        this.WaitingNoData = page.locator('(//p[@class="patient-waiting-fontsize"])[3]');
        this.viewButton = page.locator('//button[@class="btn primary-btn view-btn-size btn-secondary"]');
    }

    async ODC_Screen(){
        await this.ODC.click();
        await this.page.waitForTimeout(1000);
    }

    async Waiting(){
        const WaitingCountText = await this.waitingText.innerText();
        const waiting_Count = parseInt(await WaitingCountText.trim(), 10);
        if(waiting_Count === 0){
            const NoPatient = await this.WaitingNoData.innerText();
            console.log(NoPatient);
        }
        else{
            await this.viewButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.viewButton.click();
        await this.page.pause();
        }
    }

}
module.exports = {OnDemandConsultation};