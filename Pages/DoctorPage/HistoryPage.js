const {expect} = require ('@playwright/test');

class HistoryScreen{
    constructor(page){
        this.page = page;
        this.historyText = page.locator('(//a[@class="nav-link"])[1]');
        this.Searchfield = page.locator('//input[@id="patientquickFilter"]');
        this.History_ViewButton = page.locator('(//div[@id="patient-history-rendered"])[1]/div/a');
        this.instruction = page.locator('(//div[@class="modal-gridsummary"])[6]/b');
        this.prescription = page.locator('//div[@class="row btnalign m-0"]/div[1]/div/button');
        this.labButton = page.locator('//div[@class="row btnalign m-0"]/div[2]/div/button');
        this.address = page.locator('(//div[@class="addressSpan"])[4]');
        this.backButton = page.locator('//button[@class="btn secondary-btn backto-btn-size btn-secondary"]');
        this.printButton = page.locator('//button[@class="btn dropdown-toggle btn-primary"]');
        this.closeButton = page.locator('//header[@id="historyDetails___BV_modal_header_"]/button');
        this.HistoryBackButton = page.locator('//button[@class="btn secondary-btn back-btn-size btn-secondary"]');
    }

    async Nav_History(){
        await this.page.waitForTimeout(2000);
        await this.historyText.click();
        await this.page.waitForTimeout(3000);
    }

    async HistoryFlow(){
        await this.History_ViewButton.click();
        await this.page.waitForTimeout(1000);
        await this.instruction.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.prescription.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.prescription.click();
        await this.page.waitForTimeout(2000);
        await this.address.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.backButton.click();
        /*await this.page.waitForTimeout(2000);
        await this.prescription.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.labButton.click();
        await this.page.waitForTimeout(2000);
        await this.backButton.click();*/
        await this.page.waitForTimeout(1000);
        await this.closeButton.click();
        await this.page.waitForTimeout(1000); 
    }
    async SearchFunctionality(){
        await this.Searchfield.fill('Maaran');
        await this.page.waitForTimeout(1000);  
        await this.History_ViewButton.click();
        await this.page.waitForTimeout(1000);
        await this.instruction.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.prescription.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        await this.prescription.click();
        await this.page.waitForTimeout(2000);
        await this.address.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await this.backButton.click(); 
        await this.page.waitForTimeout(1000);
        await this.closeButton.click();
        
    }

    async SearchInvalidFlow(){
        await this.Searchfield.clear();
        await this.Searchfield.fill('@#@#@#@');
        await this.page.waitForTimeout(1000);
        console.log("No Reports Found");
        await this.page.waitForTimeout(1000);
        await this.HistoryBackButton.click();
        await this.page.pause();
    }
        
    
}
module.exports = {HistoryScreen};