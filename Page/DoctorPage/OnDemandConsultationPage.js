const {expect} = require ('@playwright/test');

class OnDemandConsultation{
    constructor(page){
        this.page = page;
        this.ODC = page.locator('(//p[@class="icon-head"])[1]'); //ODC - OnDemand Consultation

    }

    async ODC_Screen(){
        await this.ODC.click();
        await this.page.waitForTimeout(1000);
    }

    
}