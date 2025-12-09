const {expect} = require ('@playwright/test');
const { allowedNodeEnvironmentFlags } = require('process');

class scheduleScreen{
    constructor(page){
        this.page = page;
        this.ScheduleConsultation = page.locator('(//p[@class="icon-head"])[2]');
        this.scheduleButton = page.locator('(//div[@class="card type-card"])[3]/div');
        this.scheduleCount = page.locator('(//div[@class="text-center mt-2"])[3]/span');
        this.NoScheduleText = page.locator('//div[@class="card-body text-center"]/p');
        this.detailsButton = page.locator('(//div[@class="col"])[1]/button[1]');
        this.EditButton = page.locator('(//div[@class="col"])[1]/button[2]');
        this.ViewEHR = page.locator('(//div[@class="rectangle-view"])/button');
        this.Reports = page.locator('//a[text()="Reports"]');
        this.MedicalHistory = page.locator('//a[text()="Medical History"]');
        this.SurgeryHistory = page.locator('//a[text()="Surgery History"]');
        this.FamilyHistory = page.locator('//a[text()="Family History"]');
        this.Allergies = page.locator('//a[text()="Allergies"]');
        this.Medications = page.locator('//a[text()="Medications"]');
        this.LifeStyle = page.locator('//a[text()="Life Style"]');
        this.closeEHR = page.locator('//div[@class="rectangle-view"]/button');
        this.backButton = page.locator('(//div[@class="textfloat"])/button');
        this.dateField = page.locator('//input[@placeholder="Select Date"]');
    
    }

    async SC(){
        await this.page.waitForTimeout(1000);
        await this.ScheduleConsultation.click();
        await this.page.waitForTimeout(1000);
    }

    async ScheduleFlow(){
        await this.scheduleButton.click();
        await this.page.waitForTimeout(1000);
        const scheduleCountText = await this.scheduleCount.innerText();
        const schedule_Count = parseInt(await scheduleCountText.trim(), 10);
        if(schedule_Count === 0){
            const NoSchedule = await this.NoScheduleText.innerText();
            console.log(NoSchedule);
        }
        else{
            await this.page.waitForTimeout(1000);
            await this.detailsButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            await this.detailsButton.click();
            await this.ViewEHR.click();
            await this.page.waitForTimeout(1000);
            await this.Reports.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.MedicalHistory.click();
            await this.page.waitForTimeout(1000);
            await this.SurgeryHistory.click();
            await this.page.waitForTimeout(1000);
            await this.FamilyHistory.click();
            await this.page.waitForTimeout(1000);
            await this.Allergies.click();
            await this.page.waitForTimeout(1000);
            await this.Medications.click();
            await this.page.waitForTimeout(1000);
            await this.LifeStyle.click();
            await this.page.waitForTimeout(1000);
            await this.Reports.click();
            await this.page.waitForTimeout(1000);
            await this.closeEHR.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(1000);
            await this.closeEHR.click();
            await this.page.waitForTimeout(1000);
            await this.backButton.click();
            await this.page.pause();
        }
        
    }

    async EditSchedule(){
        await this.scheduleButton.click();
        await this.page.waitForTimeout(1000);
        await this.detailsButton.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        await this.EditButton.click();
        await this.page.waitForTimeout(1000);
        await this.dateField.click();

    }
}
module.exports = {scheduleScreen};